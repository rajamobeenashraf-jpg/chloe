#!/usr/bin/env python3
"""Word-synced chunk caption generator (Episode 7 pipeline, owner-locked 2026-08-23).

Replicates the reference-reel caption pattern: 1-2 word ALL-CAPS chunks, each
replacing the previous, on screen only while its words are spoken; pauses
>= PAUSE_BREAK leave the screen caption-free; sub-FLICKER_FIX gaps are bridged.

Timing source: faster-whisper measured per-word timestamps (script-biased).
Script text is ground truth -- whisper text only carries timing; words are
fuzzy-matched back to the script so a mis-recognition can never change what
is displayed. Unmatched script words are interpolated between matched
neighbors AND clamped to their source line's window (from the line-level
captions file), which keeps interpolation from stretching across known
silence.

Usage:
  python3 make_word_chunks.py <lines.json> <assets_dir> <out_chunks.json> [corrections.json]

  lines.json      : [{id, duration, captions:[{start,end,text,speaker?}]}]
                    (dump of the line-level captions_data via node)
  corrections.json: optional {clip_id: [[start,end,"TEXT"],...]} full per-clip
                    overrides for clips where whisper fails against stronger
                    (frame-verified) evidence -- chaos-noise clips mainly.

Env: needs faster-whisper (pip) + HF hub access (huggingface.co, hf.co and
its CDN subdomains allowlisted; HF_HUB_DISABLE_XET=1 is set automatically).
First run downloads the model (~460MB, cached in ~/.cache/huggingface).

Review the printed per-clip report before shipping: check the match %, and
eyeball any clip whose whisper transcript disagrees with the script.
"""
import difflib
import json
import os
import re
import subprocess
import sys

os.environ.setdefault("HF_HUB_DISABLE_XET", "1")

PAUSE_BREAK = 0.35
FLICKER_FIX = 0.15
MODEL = "small.en"  # bump to medium.en if a clip's report looks weak


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


def main():
    lines_path, assets_dir, out_path = sys.argv[1:4]
    corrections = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else {}
    clips = json.load(open(lines_path))

    from faster_whisper import WhisperModel

    model = WhisperModel(MODEL, device="cpu", compute_type="int8")

    all_out = {}
    for clip in clips:
        cid, dur = clip["id"], clip["duration"]
        if cid in corrections:
            all_out[cid] = corrections[cid]
            print(f"== {cid}: using supplied correction ({len(corrections[cid])} cues)")
            continue

        wav = f"/tmp/{cid}_chunks.wav"
        subprocess.run(
            ["ffmpeg", "-y", "-i", f"{assets_dir}/{cid}.mp4",
             "-vn", "-ac", "1", "-ar", "16000", wav],
            capture_output=True, check=True)
        script_text = " ".join(c["text"] for c in clip["captions"])
        segments, _ = model.transcribe(
            wav, word_timestamps=True, language="en",
            initial_prompt=f"Dialogue: {script_text}")
        wh = [(w.start, w.end, w.word.strip()) for s in segments for w in s.words]

        # script tokens (punctuation-only tokens glue onto the previous word),
        # each remembering its source line's window for interpolation clamping
        stoks, line_win = [], []
        for line in clip["captions"]:
            for t in line["text"].split():
                if norm(t) == "" and stoks:
                    stoks[-1] = stoks[-1] + " " + t
                else:
                    stoks.append(t)
                    line_win.append((line["start"], line["end"]))
        sn = [norm(t) for t in stoks]
        wn = [norm(w[2]) for w in wh]
        sm = difflib.SequenceMatcher(a=sn, b=wn, autojunk=False)
        times = [None] * len(stoks)
        for op, a0, a1, b0, b1 in sm.get_opcodes():
            if op == "equal":
                for k in range(a1 - a0):
                    times[a0 + k] = (wh[b0 + k][0], wh[b0 + k][1])
        matched = sum(1 for t in times if t)

        for i, t in enumerate(times):
            if t is not None:
                continue
            prev_i = next((j for j in range(i - 1, -1, -1) if times[j]), None)
            next_i = next((j for j in range(i + 1, len(times)) if times[j]), None)
            lo = 0.0 if prev_i is None else times[prev_i][1]
            hi = dur if next_i is None else times[next_i][0]
            # clamp interpolation to the word's own line window
            lo = max(lo, line_win[i][0])
            hi = min(hi, line_win[i][1]) if hi > line_win[i][0] else hi
            if hi <= lo:
                hi = min(dur, lo + 0.4)
            span = [j for j in range(len(times)) if times[j] is None
                    and (prev_i is None or j > prev_i)
                    and (next_i is None or j < next_i)]
            w_len = sum(len(stoks[j]) for j in span) or 1
            t0 = lo
            for j in span:
                frac = len(stoks[j]) / w_len
                times[j] = (t0, t0 + (hi - lo) * frac)
                t0 += (hi - lo) * frac

        words = [(times[i][0], times[i][1], stoks[i]) for i in range(len(stoks))]
        chunks, cur = [], []
        for s, e, w in words:
            if cur and (s - cur[-1][1] >= PAUSE_BREAK):
                chunks.append(cur); cur = []
            cur.append((s, e, w))
            if len(cur) == 2 or (norm(w) and w.rstrip('"')[-1] in ".!?…"):
                chunks.append(cur); cur = []
        if cur:
            chunks.append(cur)
        events = [[c[0][0], c[-1][1], " ".join(x[2] for x in c).upper()] for c in chunks]
        for a, b in zip(events, events[1:]):
            if 0 < b[0] - a[1] < FLICKER_FIX:
                a[1] = b[0]
        for ev in events:
            ev[0] = max(0.0, round(ev[0], 3))
            ev[1] = min(dur, round(ev[1], 3))
        all_out[cid] = events

        wh_text = " ".join(w[2] for w in wh)
        print(f"== {cid}  words:{len(stoks)} matched:{matched} "
              f"({matched / len(stoks) * 100:.0f}%)")
        print(f"   script : {script_text}")
        print(f"   whisper: {wh_text}")
        for s, e, t in events:
            print(f"   {s:7.2f} - {e:7.2f}  {t}")

    json.dump(all_out, open(out_path, "w"), indent=1)
    print("DONE ->", out_path)


if __name__ == "__main__":
    main()
