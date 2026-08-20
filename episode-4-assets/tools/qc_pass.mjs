// Episode 4 QC pass — rebuilt from creative-direction.md §11 (rounds 1-6).
//
// Captions are timed from REAL audio, never from generation prompts:
//   1. ffmpeg silencedetect (min silence 0.12s) → raw speech segments
//   2. drop micro-segments (<0.15s detector noise) BEFORE any matching
//   3. merge segments separated by <0.3s gaps into utterance runs
//   4. sentence cues: exact 1:1 run-anchoring when counts match; otherwise
//      "biggest pauses are the real breaks" gap-clustering — the (N-1)
//      largest inter-run gaps are the sentence boundaries
//   5. readability floor: a cue implying >4.5 words/sec extends into
//      adjacent real silence; the slow end is deliberately NOT capped
//   6. asymmetric crossfade margins: only the INCOMING clip's captions wait
//      for the blend window; the outgoing clip's last cue runs to its
//      real detected end
//
// Sentence text comes from real transcription (curated into
// captions/clipNN.json as {"sentences": ["...", ...]}); manual overrides go
// in captions/clipNN.json as {"manualCues": [{text,start,end}]}.
//
// Style: §11 round-3/round-5 confirmed values. Card: "EARLIER TODAY" at the
// head of clip 2 (46pt, borderw=3, black@0.8).
//
// KEEP IN SYNC with build_final_cut.mjs TRANSITIONS.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PROJ = "/home/user/pai-pro/projects/goldrush49";
export const TRANSITIONS = [0.12, 0.12, 0.12, 0.12, 0.4, 0.12, 0.12, 0.12, 0.12, 0.12, 0.5];

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

// --- cue allocation -------------------------------------------------------
function allocateCues(sentences, runs, clipDur) {
  if (!sentences.length) return [];
  let cues;
  if (runs.length === sentences.length) {
    cues = sentences.map((text, i) => ({ text, start: runs[i][0], end: runs[i][1] }));
  } else if (runs.length > sentences.length) {
    // Gap-clustering: (N-1) largest gaps between runs are sentence boundaries.
    const gaps = [];
    for (let i = 1; i < runs.length; i++) gaps.push({ i, gap: runs[i][0] - runs[i - 1][1] });
    const boundaries = gaps.sort((a, b) => b.gap - a.gap).slice(0, sentences.length - 1).map((g) => g.i).sort((a, b) => a - b);
    cues = [];
    let from = 0;
    for (let k = 0; k < sentences.length; k++) {
      const to = k < boundaries.length ? boundaries[k] : runs.length;
      cues.push({ text: sentences[k], start: runs[from][0], end: runs[to - 1][1] });
      from = to;
    }
  } else {
    // Fewer runs than sentences: split runs proportionally by char count.
    const totalChars = sentences.reduce((a, s) => a + s.length, 0);
    const totalSpeech = runs.reduce((a, [s, e]) => a + (e - s), 0);
    cues = [];
    let runIdx = 0, posInRun = runs.length ? runs[0][0] : 0;
    for (const text of sentences) {
      let need = (text.length / totalChars) * totalSpeech;
      const start = posInRun;
      let end = start;
      while (need > 0 && runIdx < runs.length) {
        const avail = runs[runIdx][1] - posInRun;
        if (avail >= need) { end = posInRun + need; posInRun = end; need = 0; }
        else { need -= avail; runIdx++; if (runIdx < runs.length) posInRun = runs[runIdx][0]; end = runs[runIdx - 1][1]; }
      }
      if (end <= start) end = Math.min(start + 0.8, clipDur);
      cues.push({ text, start, end });
    }
  }
  // Step 5: readability floor (>4.5 words/sec extends into adjacent silence).
  for (let i = 0; i < cues.length; i++) {
    const c = cues[i];
    const words = c.text.split(/\s+/).length;
    const minDur = words / 4.5;
    if (c.end - c.start < minDur) {
      const nextStart = i + 1 < cues.length ? cues[i + 1].start : clipDur;
      c.end = Math.min(c.start + minDur, nextStart - 0.05, clipDur);
    }
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

  // Step 6: asymmetric crossfade margin — INCOMING side only.
  if (n > 1) {
    const blend = TRANSITIONS[n - 2];
    for (const c of cues) if (c.start < blend) c.start = blend;
  }
  for (const c of cues) { c.start = Math.max(0, c.start); c.end = Math.min(dur, Math.max(c.end, c.start + 0.2)); }

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
