// Episode 4 QC pass — rebuilt from creative-direction.md §11 (rounds 1-6),
// then re-tuned per owner round 7 (2026-08-20): captions must appear exactly
// when she starts speaking and disappear exactly when she stops — no
// readability-floor extension past real speech, ever. This REVERSES the
// §11 round-3 "sync accuracy... extend into silence, don't cap the slow
// end" policy on the disappear-side: extending into trailing silence is
// now explicitly wrong, because it means the caption outlives the speech.
//
// Captions are timed from REAL audio, never from generation prompts:
//   1. ffmpeg silencedetect (min silence 0.12s) → raw speech segments
//   2. drop micro-segments (<0.15s detector noise)
//   3. merge segments separated by <0.3s gaps into utterance runs
//   4. sentence cues keep whole sentences (mid-clause breaks are bad
//      captioning), but timing is computed on a "virtual" timeline built
//      by concatenating only the real runs (silence collapsed out) — each
//      sentence's word-position maps to that virtual timeline and back to
//      a real in-run clip-time. This replaces the old sentence-to-run
//      matching, whose fallback branch spanned the ENTIRE multi-run
//      speech range for one short sentence, producing multi-second cues
//      for two-word lines — the exact bug behind the "California, 1849."
//      4s-window defect. A first attempt at the fix (one cue per detected
//      run, word-count-proportional) fixed the sync but broke readability
//      by splitting sentences mid-clause across cues; the virtual-timeline
//      approach keeps sentences whole while still landing every boundary
//      on real speech.
//   5. asymmetric crossfade margins: only the INCOMING clip's captions wait
//      for the blend window; the outgoing clip's last cue keeps its real
//      detected end
//
// Trade-off, stated plainly: a short, word-dense run now flashes fast
// rather than lingering — that is what "disappears when she's finished"
// requires, and it is the owner's stated priority for this round.
//
// Transcript text comes from real transcription (captions/clipNN.json as
// {"sentences": [...]}, concatenated into one word stream); manual
// overrides go in captions/clipNN.json as {"manualCues": [{text,start,end}]}.
//
// Style: §11 round-3/round-5 confirmed values. Card: "EARLIER TODAY" at the
// head of clip 2 (46pt, borderw=3, black@0.8).
//
// KEEP IN SYNC with build_final_cut.mjs TRANSITIONS.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PROJ = "/home/user/pai-pro/projects/goldrush49";
// Re-tuned round 7 (2026-08-20): the old near-uniform 0.12s value produced
// a ~3-frame micro-blend on almost every cut — too short to read as either
// a clean instant cut or a real dissolve, so it looked like a glitchy
// flash rather than an edit. Reclassified per actual story continuity:
// genuine scene/time/location breaks (including the cold-open smash-cut,
// 1->2) get a clean quick cut (0.2s, ~5 frames — enough to not flash,
// still reads as a cut); pairs that are truly continuous action in the
// SAME scene get a real dissolve (0.3-0.5s). A near-instant 0.04s was
// tried for the smash-cut specifically but triggers a real ffmpeg
// xfade/encoder frame-drop bug (see build_final_cut.mjs) — 0.2s avoids it.
// index: 1-2  2-3  3-4  4-5   5-6  6-7  7-8  8-9   9-10  10-11 11-12
export const TRANSITIONS = [0.2, 0.2, 0.2, 0.35, 0.4, 0.2, 0.2, 0.3, 0.45, 0.2, 0.5];

const SUB_STYLE = "FontName=DejaVu Sans,FontSize=8,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=1.1,Shadow=0.4,Bold=1,Alignment=2,MarginV=55,MarginL=70,MarginR=70";

const N = 12;
const pad2 = (n) => String(n).padStart(2, "0");
const rawClip = (n) => {
  const dir = path.join(PROJ, "assets/videos");
  const cands = fs.readdirSync(dir).filter((f) => f.startsWith(`clip${pad2(n)}_v`) && f.endsWith(".mp4")).sort();
  if (!cands.length) throw new Error(`no raw clip ${n}`);
  return path.join(dir, cands[cands.length - 1]);
};

function ffprobeDuration(f) {
  return parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
}

// --- speech segmentation off real audio ---------------------------------
function speechSegments(file, clipDur) {
  const log = execFileSync("bash", ["-c", `ffmpeg -i ${JSON.stringify(file)} -af silencedetect=noise=-32dB:d=0.12 -f null - 2>&1 | cat`]).toString();
  const starts = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => parseFloat(m[1]));
  const ends = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => parseFloat(m[1]));
  // Build speech intervals as the complement of silence.
  const silences = starts.map((s, i) => [s, ends[i] ?? clipDur]).sort((a, b) => a[0] - b[0]);
  const segs = [];
  let cur = 0;
  for (const [s, e] of silences) {
    if (s - cur > 0.01) segs.push([cur, s]);
    cur = Math.max(cur, e);
  }
  if (clipDur - cur > 0.01) segs.push([cur, clipDur]);
  // Step 2: drop detector-noise micro-segments.
  const clean = segs.filter(([s, e]) => e - s >= 0.15);
  // Step 3: merge runs separated by <0.3s.
  const runs = [];
  for (const seg of clean) {
    const last = runs[runs.length - 1];
    if (last && seg[0] - last[1] < 0.3) last[1] = seg[1];
    else runs.push([...seg]);
  }
  return runs;
}

// --- cue allocation ---------------------------------------------------
// Cues stay whole SENTENCES (real captioning craft — mid-clause breaks
// are unreadable), but their timing is computed on a "virtual" timeline
// built by concatenating only the real detected speech runs (silence
// collapsed out). A sentence's word-position within the full transcript
// maps to a position on that virtual timeline, which maps straight back
// to a real clip-time INSIDE some speech run — never into a silence gap.
// That guarantees every cue's start/end lands on real speech: no caption
// appears before she starts that line, none lingers after she's said it,
// and normal short breath-pauses inside one sentence stay bridged (a cue
// can span a small gap mid-sentence — that's correct captioning, not the
// defect the owner flagged).
function virtualToReal(vt, runs) {
  let acc = 0;
  for (const [s, e] of runs) {
    const d = e - s;
    if (vt <= acc + d) return s + (vt - acc);
    acc += d;
  }
  return runs[runs.length - 1][1];
}

function allocateCues(sentences, runs, clipDur) {
  if (!sentences.length || !runs.length) return [];
  const totalSpeech = runs.reduce((a, [s, e]) => a + (e - s), 0);
  const wordCounts = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const totalWords = wordCounts.reduce((a, c) => a + c, 0);

  const cues = [];
  let wordsBefore = 0;
  for (let k = 0; k < sentences.length; k++) {
    const wordsThrough = wordsBefore + wordCounts[k];
    const vtStart = (wordsBefore / totalWords) * totalSpeech;
    const vtEnd = (wordsThrough / totalWords) * totalSpeech;
    cues.push({
      text: sentences[k],
      start: virtualToReal(vtStart, runs),
      end: virtualToReal(vtEnd, runs),
    });
    wordsBefore = wordsThrough;
  }
  return cues;
}

// --- srt + burn-in --------------------------------------------------------
const ts = (t) => {
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = Math.floor(t % 60), ms = Math.round((t % 1) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
};

function writeSrt(cues, file) {
  fs.writeFileSync(file, cues.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.text}\n`).join("\n"));
}

const only = process.argv.includes("--clip") ? Number(process.argv[process.argv.indexOf("--clip") + 1]) : null;

for (let n = 1; n <= N; n++) {
  if (only && n !== only) continue;
  const src = rawClip(n);
  const dur = ffprobeDuration(src);
  const capFile = path.join(PROJ, "captions", `clip${pad2(n)}.json`);
  if (!fs.existsSync(capFile)) { console.log(`clip ${n}: no captions file, skipping`); continue; }
  const cap = JSON.parse(fs.readFileSync(capFile, "utf8"));

  let cues;
  if (cap.manualCues) {
    cues = cap.manualCues;
  } else {
    const runs = speechSegments(src, dur);
    cues = allocateCues(cap.sentences, runs, dur);
  }

  // Asymmetric crossfade margin — INCOMING side only. A cue that starts
  // inside the blend window is clamped forward to clear it; if that
  // clamp would erase the cue entirely (blend outlasts the whole run),
  // drop it rather than show a caption with no time left to read.
  if (n > 1) {
    const blend = TRANSITIONS[n - 2];
    for (const c of cues) if (c.start < blend) c.start = blend;
    cues = cues.filter((c) => c.end - c.start > 0.05);
  }
  for (const c of cues) { c.start = Math.max(0, c.start); c.end = Math.min(dur, c.end); }

  const srt = path.join(PROJ, "captions", `clip${pad2(n)}.srt`);
  writeSrt(cues, srt);

  const out = path.join(PROJ, "assets/videos", `clip${pad2(n)}_qc.mp4`);
  let vf = `subtitles=${srt}:force_style='${SUB_STYLE}'`;
  if (n === 2) {
    // "EARLIER TODAY" card, §11 round-3 spec: 46pt bold, borderw=3, black@0.8, first 1.6s.
    vf = `drawtext=text='EARLIER TODAY':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=46:fontcolor=white:borderw=3:bordercolor=black@0.8:x=(w-text_w)/2:y=h*0.18:enable='lt(t,1.6)',${vf}`;
  }
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", src, "-vf", vf, "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-c:a", "copy", out]);
  console.log(`clip ${n}: ${cues.length} cues -> ${path.basename(out)}`);
  for (const c of cues) console.log(`   ${c.start.toFixed(2)}-${c.end.toFixed(2)}  ${c.text}`);
}
