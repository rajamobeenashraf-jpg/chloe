#!/usr/bin/env node
// Episode 3 QC pass — rebuilt from creative-direction.md §11 specs
// (the original qc_pass.mjs was lost with the old container).
//
// Per clip:
//   1. Detect real speech segments: ffmpeg silencedetect (min silence 0.12s),
//      invert to speech, drop micro-segments (<0.15s detector noise), merge
//      fragments separated by <0.3s gaps into utterance runs.
//   2. Allocate transcribed sentences to time via gap-clustering: the (N-1)
//      LARGEST gaps between utterance runs are the sentence boundaries.
//      (Never proportional char-time guessing — §11 round 3 bugs 2/3.)
//   3. Asymmetric crossfade margins: only the INCOMING clip withholds
//      captions during its opening blend; outgoing cues run to their real,
//      detected end (§11 round 3 bug 4).
//   4. Readability floor: a cue implying >4.5 words/sec is extended into
//      adjacent real silence; the slow end is never compressed (round 3 #5).
//   5. Burn ASS captions with the locked style; drawtext card on clip 2.
//
// Inputs (in ASSETS dir):
//   clip<N>.mp4                     source clips (1..12)
//   captions/clip<N>.json           {"sentences":[".."], "manualCues":[{start,end,text}]?}
//     sentences MUST come from real transcription of the clip's audio —
//     never from the generation prompt (§11 round 1 rule).
// Output: qc/clip<N>_qc.mp4
//
// Usage: node qc_pass.mjs [--assets /path/to/assets] [--clips 1,2,...]

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { TRANSITIONS, CLIP_COUNT, SUB_STYLE, CARD } from "./transitions.mjs";

const args = process.argv.slice(2);
function argVal(flag, dflt) {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt;
}
const ASSETS = argVal("--assets", "/home/user/pai-pro/projects/boston1775/assets");
const ONLY = argVal("--clips", "").split(",").filter(Boolean).map(Number);
const QC_DIR = path.join(ASSETS, "qc");
fs.mkdirSync(QC_DIR, { recursive: true });

const MIN_SILENCE = 0.12;     // silencedetect d= (§11 round 3 #1)
const NOISE_DB = "-30dB";
const MICRO_SEG = 0.15;       // drop detector-noise blips (§11 round 2)
const MERGE_GAP = 0.3;        // merge fragments into utterance runs (round 3 #2)
const MAX_WPS = 4.5;          // readability floor (round 3 #5)
const MIN_CUE = 0.3;

function sh(cmd, argv) {
  return execFileSync(cmd, argv, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}
function ffprobeDuration(file) {
  return parseFloat(sh("ffprobe", ["-v", "error", "-show_entries", "format=duration",
    "-of", "default=nw=1:nk=1", file]).trim());
}

// --- 1. speech segments from real audio ---------------------------------
function speechSegments(file, dur) {
  let log = "";
  try {
    execFileSync("ffmpeg", ["-hide_banner", "-i", file, "-af",
      `silencedetect=noise=${NOISE_DB}:d=${MIN_SILENCE}`, "-f", "null", "-"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) { log = e.stderr?.toString() ?? ""; }
  // silencedetect logs to stderr even on success
  if (!log) {
    const r = execFileSync("ffmpeg", ["-hide_banner", "-i", file, "-af",
      `silencedetect=noise=${NOISE_DB}:d=${MIN_SILENCE}`, "-f", "null", "-"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).toString();
    log = r;
  }
  const silences = [];
  const startRe = /silence_start: ([\d.]+)/g, endRe = /silence_end: ([\d.]+)/g;
  const starts = [...log.matchAll(startRe)].map(m => +m[1]);
  const ends = [...log.matchAll(endRe)].map(m => +m[1]);
  for (let i = 0; i < starts.length; i++) {
    silences.push([starts[i], ends[i] ?? dur]);
  }
  // invert silences -> speech
  let segs = [], cur = 0;
  for (const [s, e] of silences) {
    if (s > cur) segs.push([cur, s]);
    cur = Math.max(cur, e);
  }
  if (cur < dur) segs.push([cur, dur]);
  // drop micro-segments, then merge <MERGE_GAP gaps into utterance runs
  segs = segs.filter(([s, e]) => e - s >= MICRO_SEG);
  const runs = [];
  for (const seg of segs) {
    const last = runs[runs.length - 1];
    if (last && seg[0] - last[1] < MERGE_GAP) last[1] = seg[1];
    else runs.push([...seg]);
  }
  return runs;
}

// --- 2. gap-clustering sentence allocation -------------------------------
function allocate(sentences, runs, dur) {
  if (!sentences.length) return [];
  if (!runs.length) {
    // no detected speech at all — flag loudly, don't invent timing
    console.error(`  !! no speech detected but ${sentences.length} sentences given`);
    return [];
  }
  const n = sentences.length;
  if (n === 1) return [{ start: runs[0][0], end: runs[runs.length - 1][1], text: sentences[0] }];
  // gaps between consecutive runs, ranked by size
  const gaps = [];
  for (let i = 0; i < runs.length - 1; i++) {
    gaps.push({ idx: i, size: runs[i + 1][0] - runs[i][1] });
  }
  const boundaries = gaps
    .slice().sort((a, b) => b.size - a.size)
    .slice(0, Math.min(n - 1, gaps.length))
    .map(g => g.idx).sort((a, b) => a - b);
  // split runs into n groups at those boundaries
  const groups = [];
  let g = [];
  for (let i = 0; i < runs.length; i++) {
    g.push(runs[i]);
    if (boundaries.includes(i)) { groups.push(g); g = []; }
  }
  if (g.length) groups.push(g);
  // fewer groups than sentences (not enough gaps): pad by splitting the longest group evenly
  while (groups.length < n) {
    let li = 0, lspan = -1;
    groups.forEach((gr, i) => {
      const span = gr[gr.length - 1][1] - gr[0][0];
      if (span > lspan) { lspan = span; li = i; }
    });
    const gr = groups[li], s = gr[0][0], e = gr[gr.length - 1][1], mid = (s + e) / 2;
    groups.splice(li, 1, [[s, mid]], [[mid, e]]);
  }
  return sentences.map((text, i) => {
    const gr = groups[i];
    return { start: gr[0][0], end: gr[gr.length - 1][1], text };
  });
}

// --- 3/4. margins + readability floor ------------------------------------
function refine(cues, clipNo, dur) {
  const inBlend = clipNo > 1 ? TRANSITIONS[clipNo - 2] : 0; // incoming-side blend
  for (const c of cues) {
    if (c.start < inBlend) c.start = inBlend;              // asymmetric: incoming only
    const words = c.text.split(/\s+/).filter(Boolean).length;
    const need = words / MAX_WPS;
    if (c.end - c.start < need) c.end = Math.min(dur, c.start + need);
    if (c.end - c.start < MIN_CUE) c.end = Math.min(dur, c.start + MIN_CUE);
  }
  // never overlap neighbours
  for (let i = 1; i < cues.length; i++) {
    if (cues[i].start < cues[i - 1].end) cues[i].start = cues[i - 1].end + 0.01;
    if (cues[i].end <= cues[i].start) cues[i].end = cues[i].start + MIN_CUE;
  }
  return cues.filter(c => c.end > c.start && c.start < dur);
}

// --- 5. burn ---------------------------------------------------------------
function toSrtTime(t) {
  const h = String(Math.floor(t / 3600)).padStart(2, "0");
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
  const s = String(Math.floor(t % 60)).padStart(2, "0");
  const ms = String(Math.round((t % 1) * 1000)).padStart(3, "0");
  return `${h}:${m}:${s},${ms}`;
}
function writeSrt(cues, file) {
  fs.writeFileSync(file, cues.map((c, i) =>
    `${i + 1}\n${toSrtTime(c.start)} --> ${toSrtTime(c.end)}\n${c.text}\n`).join("\n"));
}

const clips = ONLY.length ? ONLY : Array.from({ length: CLIP_COUNT }, (_, i) => i + 1);
for (const n of clips) {
  const src = path.join(ASSETS, `clip${n}.mp4`);
  if (!fs.existsSync(src)) { console.error(`skip clip${n}: no source`); continue; }
  const capFile = path.join(ASSETS, "captions", `clip${n}.json`);
  const dur = ffprobeDuration(src);
  let cues = [];
  if (fs.existsSync(capFile)) {
    const cap = JSON.parse(fs.readFileSync(capFile, "utf8"));
    if (cap.manualCues?.length) {
      cues = cap.manualCues.map(c => ({ ...c }));           // hand-timed overrides win
    } else {
      const runs = speechSegments(src, dur);
      cues = allocate(cap.sentences ?? [], runs, dur);
    }
    cues = refine(cues, n, dur);
  } else {
    console.error(`  clip${n}: no captions file — passing through style-only`);
  }
  const srt = path.join(QC_DIR, `clip${n}.srt`);
  const out = path.join(QC_DIR, `clip${n}_qc.mp4`);
  const vf = [];
  if (cues.length) {
    writeSrt(cues, srt);
    vf.push(`subtitles=${srt.replace(/([:\\])/g, "\\$1")}:force_style='${SUB_STYLE}'`);
  }
  if (n === CARD.clip) {
    vf.push(`drawtext=text='${CARD.text}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:` +
      `fontsize=${CARD.fontsize}:fontcolor=white:borderw=${CARD.borderw}:bordercolor=${CARD.bordercolor}:` +
      `x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,${CARD.showSeconds})'`);
  }
  const argv = ["-y", "-i", src];
  if (vf.length) argv.push("-vf", vf.join(","));
  argv.push("-c:v", "libx264", "-crf", "16", "-preset", "medium", "-c:a", "copy", out);
  console.log(`clip${n}: ${cues.length} cues, dur ${dur.toFixed(2)}s -> ${path.basename(out)}`);
  sh("ffmpeg", argv);
}
console.log("QC pass done.");
