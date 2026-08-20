#!/usr/bin/env python3
"""gemini-eyes — video/image QC and study tool built on the Gemini API.

Watches a video (YouTube URL, any https URL, or local file) or a still image
and reports flaws with timestamps: character identity drift, garbled on-screen
text/captions, anatomy and physics errors, continuity jumps, audio problems.

Two-pass by default: a full sweep finds candidate flaws, then each serious
finding is re-watched as a short clip at 5 fps / high resolution to confirm or
dismiss it — machine single-pass reads hallucinate, the verify pass kills those.

Usage:
  gemini_eyes.py qc      VIDEO [options]     flaw hunt (sweep + verify)
  gemini_eyes.py captions VIDEO [options]    on-screen text / caption check only
  gemini_eyes.py study   VIDEO [options]     craft study (beat sheet, structure)
  gemini_eyes.py ask     VIDEO -q "..."      free-form question about the video

  VIDEO: youtube.com/youtu.be URL, https URL to a media file, or local path
         (local files and non-YouTube URLs are uploaded via the Files API;
          images work too — QC stills before animating them)

Options:
  --character FILE   character lock doc to check identity against
                     (default: CHARACTER_LOCK.md if found in repo root)
  --srt FILE         caption file to cross-check timing/spelling against speech
  --clip MM:SS MM:SS analyze only this window
  --fps N            sampling fps for the sweep (default: model default, ~1)
  --res LEVEL        low|medium|high media resolution for sweep (default high)
  --no-verify        skip the second confirm/dismiss pass
  --model NAME       force a model (default ladder: 3.7-flash -> 3.6-flash)
  --out DIR          output dir for findings.json + report.md (default .)
  -q TEXT            question text for `ask` mode

Requires: GEMINI_API_KEY in the environment; curl on PATH.
"""

import json
import os
import re
import subprocess
import sys
import time

BASE = "https://generativelanguage.googleapis.com"
MODEL_LADDER = ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-flash-latest"]
RETRIABLE = {429, 500, 503}
MAX_VERIFIES = 12
VERIFY_PAD_S = 6

QC_CATEGORIES = [
    "identity", "text", "anatomy", "physics", "continuity",
    "background", "audio", "edit",
]

FINDINGS_SCHEMA = {
    "type": "object",
    "properties": {
        "findings": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "timestamp": {"type": "string", "description": "mm:ss where the flaw is visible"},
                    "end_timestamp": {"type": "string", "description": "mm:ss where it ends, if a range"},
                    "category": {"type": "string", "enum": QC_CATEGORIES},
                    "severity": {"type": "integer", "description": "1 nitpick .. 5 unshippable"},
                    "description": {"type": "string"},
                    "fix": {"type": "string", "description": "concrete suggested fix"},
                },
                "required": ["timestamp", "category", "severity", "description"],
            },
        },
        "overall_score": {"type": "number", "description": "0-10 shippability"},
        "summary": {"type": "string"},
    },
    "required": ["findings", "summary"],
}

VERDICT_SCHEMA = {
    "type": "object",
    "properties": {
        "verdict": {"type": "string", "enum": ["CONFIRMED", "DISMISSED", "UNSURE"]},
        "exact_timestamp": {"type": "string"},
        "refined_description": {"type": "string"},
    },
    "required": ["verdict", "refined_description"],
}

SWEEP_PROMPT = """You are a ruthless QC inspector for AI-generated video. Watch this {kind} \
end-to-end and report every flaw a viewer could screenshot and mock in the comments. \
AI-video channels live and die by artifact discipline — do not be polite.

Hunt these categories:
- identity: the main character's face, hair, eye color, freckles/marks, build, or costume drifting between shots{character_clause}
- text: ANY on-screen text — signs, props, labels, burned-in captions/subtitles — garbled, misspelled, mirrored, or historically wrong. Transcribe each piece of text you check.
- anatomy: hands, fingers, teeth, eyes, limbs doing impossible things
- physics: clipping through objects, floating, morphing props, liquid/cloth behaving wrongly
- continuity: costume/prop/lighting/time-of-day jumps between adjacent shots
- background: extras frozen, duplicated, morphing, or walking unnaturally
- audio: lip-sync drift, voice changing character, music level jumps, abrupt cuts
- edit: dead air, pacing stalls, shots held too long/short, jarring transitions

For every flaw: timestamp (mm:ss), category, severity 1-5 (5 = unshippable), a specific
description of what is visibly wrong, and a concrete fix. Only report what you actually
observe — no speculation. Also give an overall 0-10 shippability score and a 3-sentence summary."""

CAPTIONS_PROMPT = """You are proofreading every piece of text in this {kind}. Go through it and:
1. Transcribe ALL on-screen text with timestamps: burned-in captions/subtitles, signs, props, \
labels, title cards, end cards.
2. Flag every error: misspellings, garbled AI text, wrong/inconsistent names, punctuation, \
captions out of sync with speech, captions that paraphrase instead of matching, text unreadable \
against the background, anachronistic fonts or wording for the period.
3. Where dialogue is audible, check the caption against the actual spoken words and flag mismatches.
Report each problem as a finding: timestamp, category "text" (or "audio" for sync issues), \
severity 1-5, description quoting the exact text, and a fix with the corrected wording.{srt_clause}"""

STUDY_PROMPT = """STUDY MODE — full craft study of this video. Watch it end-to-end and break down \
exactly how it works, with mm:ss timestamps for every claim. Produce markdown with:
1. BEAT SHEET — every scene: timestamp range, location, visual action, speech gist, shot types, \
and the scene's job in the retention structure.
2. HOOK ANATOMY — the first 45 seconds shot by shot.
3. STRUCTURE MATH — act boundaries, pacing rhythm, average scene length, where the climax lands \
as a % of runtime, how the ending is handled.
4. PERSONA PERFORMANCE — how the on-camera character plays it, energy by act, mannerisms.
5. PRODUCTION CRAFT — costume/continuity, lighting by act, VO vs sync speech, music shifts, \
camera language.
6. AI TELLS — every visible artifact with timestamps; rate artifact discipline /10.
7. ENGAGEMENT ENGINEERING — irony/empathy beats, Easter eggs, comment-bait moments.
8. STEAL / AVOID — transferable techniques with timestamps; mistakes to avoid.
Be specific and evidence-based. No praise filler."""

VERIFY_PROMPT = """You are re-watching a short clip to verify one suspected flaw in an AI-generated video.

Suspected flaw (from a lower-resolution sweep):
  at {ts}: [{category}] {description}

Watch this clip frame by frame. Is the flaw really there, exactly as described?
- CONFIRMED: you can see it; give the exact mm:ss (clip timestamps = original video timestamps) \
and a refined description of what is visibly wrong.
- DISMISSED: the described flaw is not actually present; say what is actually there.
- UNSURE: cannot tell at this resolution.
Judge only the described flaw, not new ones."""


def die(msg):
    print(f"gemini-eyes: {msg}", file=sys.stderr)
    sys.exit(1)


def curl_json(args, body=None):
    cmd = ["curl", "-sS", "--max-time", "570"] + args
    if body is not None:
        cmd += ["-d", json.dumps(body)]
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        return None, {"error": {"code": -1, "message": p.stderr.strip()[:300]}}
    try:
        d = json.loads(p.stdout)
    except json.JSONDecodeError:
        return None, {"error": {"code": -2, "message": p.stdout[:300]}}
    if "error" in d:
        return None, d
    return d, None


def api_key():
    k = os.environ.get("GEMINI_API_KEY")
    if not k:
        die("GEMINI_API_KEY is not set")
    return k


def ts_to_s(ts):
    parts = [int(p) for p in re.split(r"[:.]", ts.strip()) if p != ""][:3]
    if not parts:
        return 0
    s = 0
    for p in parts:
        s = s * 60 + p
    return s


def s_to_ts(s):
    return f"{s // 60:02d}:{s % 60:02d}"


def guess_mime(path):
    ext = os.path.splitext(path)[1].lower()
    return {
        ".mp4": "video/mp4", ".mov": "video/quicktime", ".webm": "video/webm",
        ".mkv": "video/x-matroska", ".png": "image/png", ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif",
        ".mp3": "audio/mpeg", ".wav": "audio/wav", ".m4a": "audio/mp4",
    }.get(ext)


def is_youtube(url):
    return bool(re.match(r"https://((www\.|m\.)?youtube\.com/|youtu\.be/)", url))


def upload_file(path):
    """Upload a local file via the resumable Files API; return (uri, mime)."""
    mime = guess_mime(path) or "application/octet-stream"
    size = os.path.getsize(path)
    name = os.path.basename(path)
    print(f"  uploading {name} ({size} bytes, {mime}) ...")
    p = subprocess.run(
        ["curl", "-sS", "-i", "-X", "POST", f"{BASE}/upload/v1beta/files",
         "-H", f"x-goog-api-key: {api_key()}",
         "-H", "X-Goog-Upload-Protocol: resumable",
         "-H", "X-Goog-Upload-Command: start",
         "-H", f"X-Goog-Upload-Header-Content-Length: {size}",
         "-H", f"X-Goog-Upload-Header-Content-Type: {mime}",
         "-H", "Content-Type: application/json",
         "-d", json.dumps({"file": {"display_name": name}})],
        capture_output=True, text=True)
    m = re.search(r"^x-goog-upload-url:\s*(\S+)", p.stdout, re.I | re.M)
    if not m:
        die(f"Files API did not return an upload URL: {p.stdout[:300]}")
    up_url = m.group(1)
    p = subprocess.run(
        ["curl", "-sS", "-X", "PUT", up_url,
         "-H", f"Content-Length: {size}",
         "-H", "X-Goog-Upload-Offset: 0",
         "-H", "X-Goog-Upload-Command: upload, finalize",
         "--data-binary", f"@{path}"],
        capture_output=True, text=True)
    try:
        f = json.loads(p.stdout)["file"]
    except (json.JSONDecodeError, KeyError):
        die(f"upload finalize failed: {p.stdout[:300]}")
    while f.get("state") == "PROCESSING":
        print("  processing ...")
        time.sleep(5)
        d, err = curl_json([f"{BASE}/v1beta/{f['name']}",
                            "-H", f"x-goog-api-key: {api_key()}"])
        if err:
            die(f"file poll failed: {err['error']['message']}")
        f = d
    if f.get("state") != "ACTIVE":
        die(f"file state is {f.get('state')}, expected ACTIVE")
    return f["uri"], mime


def resolve_source(video):
    """Return (file_uri, mime_or_None, is_video)."""
    if is_youtube(video):
        return video, None, True
    if video.startswith("https://") or video.startswith("http://"):
        tmp = os.path.join(os.environ.get("TMPDIR", "/tmp"),
                           "gemini_eyes_" + re.sub(r"\W+", "_", video[-60:]))
        print(f"  downloading {video} ...")
        p = subprocess.run(["curl", "-sSL", "--max-time", "570", "-o", tmp, video])
        if p.returncode != 0:
            die("download failed")
        uri, mime = upload_file(tmp)
        return uri, mime, mime.startswith("video/")
    if not os.path.exists(video):
        die(f"no such file: {video}")
    uri, mime = upload_file(video)
    return uri, mime, mime.startswith("video/")


def build_request(file_uri, mime, prompt, *, schema=None, clip=None, fps=None,
                  res=None, is_video=True):
    fd = {"file_uri": file_uri}
    if mime:
        fd["mime_type"] = mime
    part = {"file_data": fd}
    if is_video and (clip or fps):
        vm = {}
        if clip:
            vm["start_offset"] = f"{clip[0]}s"
            vm["end_offset"] = f"{clip[1]}s"
        if fps:
            vm["fps"] = fps
        part["video_metadata"] = vm
    gc = {"temperature": 0.2, "maxOutputTokens": 60000}
    if schema:
        gc["responseMimeType"] = "application/json"
        gc["responseSchema"] = schema
    if res:
        gc["mediaResolution"] = f"MEDIA_RESOLUTION_{res.upper()}"
    return {"contents": [{"parts": [part, {"text": prompt}]}],
            "generationConfig": gc}


def generate(req, model=None):
    """Call generateContent with a model ladder + backoff. Returns text."""
    models = [model] if model else MODEL_LADDER
    delays = [0, 10, 25]
    last = None
    for m in models:
        for delay in delays:
            if delay:
                print(f"  ({m} busy, retrying in {delay}s)")
                time.sleep(delay)
            d, err = curl_json(
                [f"{BASE}/v1beta/models/{m}:generateContent",
                 "-H", f"x-goog-api-key: {api_key()}",
                 "-H", "Content-Type: application/json"],
                body=req)
            if err:
                last = err["error"]
                code = last.get("code")
                # strip mediaResolution and retry once if a model rejects it
                if code == 400 and "mediaResolution" in str(last.get("message", "")):
                    req["generationConfig"].pop("mediaResolution", None)
                    continue
                if code in RETRIABLE or code == -1:
                    continue
                die(f"{m}: {code} {last.get('message', '')[:300]}")
            cand = d.get("candidates", [{}])[0]
            fr = cand.get("finishReason")
            txt = "".join(p.get("text", "")
                          for p in cand.get("content", {}).get("parts", []))
            if not txt:
                die(f"{m}: empty response (finishReason={fr})")
            u = d.get("usageMetadata", {})
            print(f"  [{m}] in={u.get('promptTokenCount')} out={u.get('candidatesTokenCount')} finish={fr}")
            return txt
        print(f"  {m} unavailable, trying next model")
    die(f"all models failed; last error: {last}")


def parse_json_text(txt):
    txt = re.sub(r"^```(json)?|```$", "", txt.strip(), flags=re.M).strip()
    return json.loads(txt)


def load_character(path):
    if path == "none":
        return ""
    if not path:
        for cand in ("CHARACTER_LOCK.md",
                     os.path.join(os.path.dirname(os.path.dirname(
                         os.path.dirname(os.path.abspath(__file__)))), "CHARACTER_LOCK.md")):
            if os.path.exists(cand):
                path = cand
                break
    if not path or not os.path.exists(path):
        return ""
    text = open(path, encoding="utf-8").read()[:6000]
    print(f"  using character lock: {path}")
    return ("\n  The main character MUST match this lock at all times — flag ANY deviation "
            "(eye color, hair, freckles, costume) as an identity finding:\n---\n"
            + text + "\n---")


def load_srt(path):
    if not path:
        return ""
    if not os.path.exists(path):
        die(f"no such caption file: {path}")
    return ("\n\nThe intended captions are below — cross-check the burned-in text and the "
            "spoken audio against them and flag every mismatch:\n---\n"
            + open(path, encoding="utf-8").read()[:15000] + "\n---")


def run_findings_mode(args, prompt):
    file_uri, mime, is_video = resolve_source(args.video)
    print("pass 1/2: sweep ...")
    req = build_request(file_uri, mime, prompt, schema=FINDINGS_SCHEMA,
                        clip=args.clip, fps=args.fps, res=args.res,
                        is_video=is_video)
    data = parse_json_text(generate(req, args.model))
    findings = data.get("findings", [])
    if args.clip:
        in_window = [f for f in findings
                     if args.clip[0] <= ts_to_s(f["timestamp"]) <= args.clip[1] + 5]
        if len(in_window) != len(findings):
            print(f"  dropped {len(findings) - len(in_window)} finding(s) timestamped outside the clip window")
            findings = in_window
            data["findings"] = findings
    print(f"  {len(findings)} candidate finding(s)")

    if is_video and not args.no_verify and findings:
        serious = [f for f in findings if f.get("severity", 0) >= 3][:MAX_VERIFIES]
        print(f"pass 2/2: verifying {len(serious)} finding(s) at 5 fps / high res ...")
        for f in serious:
            s = ts_to_s(f["timestamp"])
            clip = (max(0, s - VERIFY_PAD_S), s + VERIFY_PAD_S)
            vp = VERIFY_PROMPT.format(ts=f["timestamp"], category=f["category"],
                                      description=f["description"])
            vreq = build_request(file_uri, mime, vp, schema=VERDICT_SCHEMA,
                                 clip=clip, fps=5, res="high")
            try:
                v = parse_json_text(generate(vreq, args.model))
            except SystemExit:
                raise
            except Exception as e:  # keep sweep result if one verify fails
                v = {"verdict": "UNSURE", "refined_description": f"verify failed: {e}"}
            f["verdict"] = v.get("verdict", "UNSURE")
            f["refined_description"] = v.get("refined_description", "")
            if v.get("exact_timestamp"):
                f["timestamp"] = v["exact_timestamp"]
            print(f"  {f['timestamp']} [{f['category']}] -> {f['verdict']}")

    os.makedirs(args.out, exist_ok=True)
    jpath = os.path.join(args.out, "findings.json")
    json.dump(data, open(jpath, "w"), indent=2)
    rpath = os.path.join(args.out, "report.md")
    write_report(rpath, args.video, data)
    print(f"\nwrote {jpath} and {rpath}")
    confirmed = [f for f in findings if f.get("verdict") == "CONFIRMED"]
    dismissed = [f for f in findings if f.get("verdict") == "DISMISSED"]
    print(f"summary: {len(findings)} found, {len(confirmed)} confirmed, "
          f"{len(dismissed)} dismissed"
          + (f", score {data['overall_score']}/10" if data.get("overall_score") is not None else ""))
    print(data.get("summary", ""))


def write_report(path, video, data):
    lines = [f"# gemini-eyes QC report", "", f"**Source:** `{video}`",
             f"**Score:** {data.get('overall_score', '—')}/10", "",
             data.get("summary", ""), "",
             "| ⏱ | Cat | Sev | Verdict | Problem | Fix |",
             "|---|-----|-----|---------|---------|-----|"]
    for f in sorted(data.get("findings", []),
                    key=lambda x: -x.get("severity", 0)):
        desc = f.get("refined_description") or f["description"]
        lines.append("| {ts} | {cat} | {sev} | {v} | {d} | {fix} |".format(
            ts=f["timestamp"], cat=f["category"], sev=f.get("severity", "—"),
            v=f.get("verdict", "—"),
            d=desc.replace("|", "\\|"),
            fix=f.get("fix", "").replace("|", "\\|")))
    open(path, "w").write("\n".join(lines) + "\n")


def main():
    import argparse
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("mode", choices=["qc", "captions", "study", "ask"])
    ap.add_argument("video")
    ap.add_argument("--character")
    ap.add_argument("--srt")
    ap.add_argument("--clip", nargs=2, metavar=("START", "END"))
    ap.add_argument("--fps", type=int)
    ap.add_argument("--res", choices=["low", "medium", "high"])
    ap.add_argument("--no-verify", action="store_true")
    ap.add_argument("--model")
    ap.add_argument("--out", default=".")
    ap.add_argument("-q", "--question")
    args = ap.parse_args()

    if args.clip:
        args.clip = (ts_to_s(args.clip[0]), ts_to_s(args.clip[1]))
    if args.res is None and args.mode in ("qc", "captions"):
        args.res = "high"

    if args.mode == "qc":
        prompt = SWEEP_PROMPT.format(kind="video",
                                     character_clause=load_character(args.character))
        prompt += load_srt(args.srt)
        run_findings_mode(args, prompt)
    elif args.mode == "captions":
        prompt = CAPTIONS_PROMPT.format(kind="video",
                                        srt_clause=load_srt(args.srt))
        run_findings_mode(args, prompt)
    elif args.mode == "study":
        file_uri, mime, is_video = resolve_source(args.video)
        req = build_request(file_uri, mime, STUDY_PROMPT, clip=args.clip,
                            fps=args.fps, res=args.res, is_video=is_video)
        txt = generate(req, args.model)
        os.makedirs(args.out, exist_ok=True)
        p = os.path.join(args.out, "study.md")
        open(p, "w").write(txt)
        print(f"wrote {p}")
    elif args.mode == "ask":
        if not args.question:
            die("ask mode needs -q \"your question\"")
        file_uri, mime, is_video = resolve_source(args.video)
        req = build_request(file_uri, mime, args.question, clip=args.clip,
                            fps=args.fps, res=args.res, is_video=is_video)
        print(generate(req, args.model))


if __name__ == "__main__":
    main()
