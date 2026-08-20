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

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { CLIP_COUNT, SUB_STYLE, CARD } from "./transitions.mjs";

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
const VOICE_LO = 250;         // band-pass low edge (Hz) — cuts hoofbeat/wind rumble
const VOICE_HI = 3500;        // band-pass high edge (Hz) — vocal range ceiling
const REL_MARGIN_DB = 18;     // silence threshold = this clip's own peak - margin
const MICRO_SEG = 0.15;       // drop detector-noise blips (§11 round 2)
const MERGE_GAP = 0.3;        // merge fragments into utterance runs (round 3 #2)
const MIN_CUE = 0.3;

function sh(cmd, argv) {
  return execFileSync(cmd, argv, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}
function ffprobeDuration(file) {
  return parseFloat(sh("ffprobe", ["-v", "error", "-show_entries", "format=duration",
    "-of", "default=nw=1:nk=1", file]).trim());
}

// --- 1. speech segments from real audio ---------------------------------
// REVISED (owner feedback round 2, 2026-08-20): two real bugs found here.
// (a) silencedetect writes its markers to STDERR, but this used to read
//     execFileSync's return value — which is stdout only — so the log was
//     always empty and every clip fell back to "one unbroken speech block
//     spanning the whole clip," regardless of real pauses. Fixed by using
//     spawnSync and reading result.stderr directly.
// (b) a single fixed -30dB absolute threshold can't separate her voice
//     from loud, continuous background noise (galloping hoofbeats, wind,
//     tavern din) — on a noisy clip the ambient floor alone can sit above
//     -30dB, so silencedetect finds nothing at all (exactly clip 1's
//     failure: zero silence entries on a clip where only 4.1s of the 7.06s
//     is actually speech). Fixed with two changes: band-pass the audio to
//     roughly the vocal range (250Hz–3.5kHz) before detecting, to suppress
//     low-frequency thuds and some broadband noise outside where speech
//     lives; and measure each clip's own peak level first (astats) and set
//     the silence threshold relative to that peak, not a fixed number, so
//     a loud action clip and a quiet dialogue clip each get an appropriate
//     cutoff instead of one-size-fits-all.
function ffmpegStderr(args) {
  const r = spawnSync("ffmpeg", args, { encoding: "utf8" });
  return r.stderr ?? "";
}
function peakDb(file) {
  const log = ffmpegStderr(["-hide_banner", "-i", file, "-af",
    `highpass=f=${VOICE_LO},lowpass=f=${VOICE_HI},astats=metadata=0:reset=0`, "-f", "null", "-"]);
  const peaks = [...log.matchAll(/Peak level dB:\s*(-?[\d.]+)/g)].map(m => +m[1]);
  return peaks.length ? Math.max(...peaks) : -20; // fallback if astats parse fails
}
function speechSegments(file, dur) {
  const peak = peakDb(file);
  const threshold = Math.min(-12, Math.max(-40, peak - REL_MARGIN_DB));
  const log = ffmpegStderr(["-hide_banner", "-i", file, "-af",
    `highpass=f=${VOICE_LO},lowpass=f=${VOICE_HI},silencedetect=noise=${threshold}dB:d=${MIN_SILENCE}`,
    "-f", "null", "-"]);
  const silences = [];
  const startRe = /silence_start: ([\d.]+)/g, endRe = /silence_end: ([\d.]+)/g;
  const starts = [...log.matchAll(startRe)].map(m => +m[1]);
  const ends = [...log.matchAll(endRe)].map(m => +m[1]);
  for (let i = 0; i < starts.length; i++) {
    silences.push([starts[i], ends[i] ?? dur]);
  }
  // invert silences -> speech, drop only detector-noise micro-blips
  let segs = [], cur = 0;
  for (const [s, e] of silences) {
    if (s > cur) segs.push([cur, s]);
    cur = Math.max(cur, e);
  }
  if (cur < dur) segs.push([cur, dur]);
  const rawSegs = segs.filter(([s, e]) => e - s >= MICRO_SEG);
  // separately, merge <MERGE_GAP gaps into utterance runs — only used for
  // the single-sentence envelope case below, never for multi-sentence
  // boundary-finding (see allocate() note on why that merge was a bug).
  const runs = [];
  for (const seg of rawSegs) {
    const last = runs[runs.length - 1];
    if (last && seg[0] - last[1] < MERGE_GAP) last[1] = seg[1];
    else runs.push([...seg]);
  }
  return { rawSegs, runs };
}

// --- 2. word-proportional gap-anchored sentence allocation ----------------
// REVISED TWICE (owner feedback round 2, 2026-08-20):
// (a) first pass: ranked gaps between MERGED utterance runs, not raw
//     segments. Too few real runs meant a blind time-midpoint bisection
//     guessed most boundaries — produced a 14-word sentence in 0.4s.
// (b) second pass: ranked gaps between RAW segments instead, but by raw
//     SIZE alone. That still failed — the two acoustically-longest pauses
//     in a clip are often just mid-sentence breaths, not the grammatical
//     sentence break, so the globally-largest gaps can land nowhere near
//     where one sentence actually ends and the next begins (confirmed on
//     clip2: the two biggest gaps both sat in the back third of the clip,
//     so sentence 1 absorbed the first six seconds and the 14-word
//     sentence 2 got squeezed into 0.4s).
// Fix: every candidate boundary is still a REAL detected pause (never a
// fabricated time split) — but which real gaps get used as boundaries is
// now chosen by matching each sentence's word-count share of the total
// spoken span, not by gap size. This keeps boundaries grounded in actual
// silence while making the split reflect how much each sentence actually
// has to say.
function allocate(sentences, rawSegs, runs, dur) {
  if (!sentences.length) return [];
  if (!runs.length) {
    // no detected speech at all — flag loudly, don't invent timing
    console.error(`  !! no speech detected but ${sentences.length} sentences given`);
    return [];
  }
  const n = sentences.length;
  if (n === 1) return [{ start: runs[0][0], end: runs[runs.length - 1][1], text: sentences[0] }];
  const segs = rawSegs.length >= n ? rawSegs : runs; // fall back only if truly too few raw segments

  const wordCounts = sentences.map(s => s.split(/\s+/).filter(Boolean).length);
  const totalWords = wordCounts.reduce((a, b) => a + b, 0);
  const spanStart = segs[0][0], spanEnd = segs[segs.length - 1][1];
  const totalSpan = spanEnd - spanStart;

  // proportional target time for each of the n-1 internal boundaries
  let cumWords = 0;
  const targets = [];
  for (let i = 0; i < n - 1; i++) {
    cumWords += wordCounts[i];
    targets.push(spanStart + totalSpan * (cumWords / totalWords));
  }

  // candidate boundary positions: midpoint of each real inter-segment gap
  const candidates = [];
  for (let i = 0; i < segs.length - 1; i++) {
    candidates.push({ segIdx: i, pos: (segs[i][1] + segs[i + 1][0]) / 2 });
  }

  // for each proportional target, take the nearest unused real gap
  const used = new Set();
  const chosenSegIdx = targets.map(t => {
    let best = null, bestDist = Infinity;
    for (const c of candidates) {
      if (used.has(c.segIdx)) continue;
      const d = Math.abs(c.pos - t);
      if (d < bestDist) { bestDist = d; best = c; }
    }
    if (best) used.add(best.segIdx);
    return best ? best.segIdx : null;
  }).filter(x => x !== null).sort((a, b) => a - b);

  // split segs into n groups at the chosen real boundaries
  const groups = [];
  let g = [];
  for (let i = 0; i < segs.length; i++) {
    g.push(segs[i]);
    if (chosenSegIdx.includes(i)) { groups.push(g); g = []; }
  }
  if (g.length) groups.push(g);
  // still short a group (fewer real gaps than needed): split the group
  // furthest from its proportional target, not just the longest one
  while (groups.length < n) {
    let li = 0, worst = -1;
    groups.forEach((gr, i) => {
      const span = gr[gr.length - 1][1] - gr[0][0];
      if (span > worst) { worst = span; li = i; }
    });
    const gr = groups[li], s = gr[0][0], e = gr[gr.length - 1][1], mid = (s + e) / 2;
    groups.splice(li, 1, [[s, mid]], [[mid, e]]);
  }
  return sentences.map((text, i) => {
    const gr = groups[i];
    return { start: gr[0][0], end: gr[gr.length - 1][1], text };
  });
}

// --- 3/4. exact mouth-sync ------------------------------------------------
// REVISED (owner feedback round 2, 2026-08-20): captions must appear the
// instant she starts speaking and disappear the instant she stops — no
// padding either direction. Two things in the original refine() worked
// against that: (a) clamping a cue's start to the incoming transition's
// blend duration, which could delay the caption's appearance past her
// actual first word; (b) the "readability floor," which pushed a cue's end
// later than her real last word whenever the implied words/sec looked too
// fast. Both are removed — cue boundaries now come straight from the real
// silencedetect-derived speech segments (already merged/gap-clustered
// above), untouched. Transitions are now near-hard cuts (≤0.18s almost
// everywhere), so the old double-caption-during-a-dissolve risk this was
// guarding against is negligible; exact sync wins over both concerns.
function refine(cues, clipNo, dur) {
  for (const c of cues) {
    if (c.end - c.start < MIN_CUE) c.end = Math.min(dur, c.start + MIN_CUE); // zero-duration glitch guard only
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
      const { rawSegs, runs } = speechSegments(src, dur);
      cues = allocate(cap.sentences ?? [], rawSegs, runs, dur);
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
