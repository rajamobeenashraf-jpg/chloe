#!/usr/bin/env node
// Episode 3 final assembly — rebuilt from creative-direction.md §11 specs
// (original build_final_cut.mjs lost with the old container).
//
// Pipeline (§11): normalize every QC'd clip (720x1280, 24fps, yuv420p,
// 48kHz stereo, loudnorm) → chain video xfade + audio acrossfade with the
// per-join durations in transitions.mjs → master at CRF 16 → ~1.5Mbps
// compressed delivery copy for chat.
//
// Usage: node build_final_cut.mjs [--assets /path/to/assets]
//   expects assets/qc/clip<N>_qc.mp4 (from qc_pass.mjs); falls back to
//   assets/clip<N>.mp4 for any clip without a QC output.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { TRANSITIONS, CLIP_COUNT } from "./transitions.mjs";

const args = process.argv.slice(2);
const i = args.indexOf("--assets");
const ASSETS = i >= 0 && args[i + 1] ? args[i + 1] : "/home/user/pai-pro/projects/boston1775/assets";
const NORM_DIR = path.join(ASSETS, "norm");
fs.mkdirSync(NORM_DIR, { recursive: true });

const W = 720, H = 1280, FPS = 24, AR = 48000;

function sh(cmd, argv) {
  return execFileSync(cmd, argv, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}
function dur(file) {
  return parseFloat(sh("ffprobe", ["-v", "error", "-show_entries", "format=duration",
    "-of", "default=nw=1:nk=1", file]).trim());
}

// 1. normalize + loudnorm each clip
const files = [];
for (let n = 1; n <= CLIP_COUNT; n++) {
  const qc = path.join(ASSETS, "qc", `clip${n}_qc.mp4`);
  const src = fs.existsSync(qc) ? qc : path.join(ASSETS, `clip${n}.mp4`);
  if (!fs.existsSync(src)) { console.error(`FATAL: missing clip${n}`); process.exit(1); }
  const out = path.join(NORM_DIR, `clip${n}_n.mp4`);
  sh("ffmpeg", ["-y", "-i", src,
    "-vf", `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2,fps=${FPS},format=yuv420p`,
    "-af", `loudnorm=I=-16:TP=-1.5:LRA=11,aresample=${AR}`,
    "-ac", "2", "-ar", String(AR),
    "-c:v", "libx264", "-crf", "16", "-preset", "medium",
    "-c:a", "aac", "-b:a", "192k", out]);
  files.push(out);
  console.log(`normalized clip${n} (${dur(out).toFixed(2)}s)`);
}

// 2. chained xfade/acrossfade
const durs = files.map(dur);
if (TRANSITIONS.length !== CLIP_COUNT - 1) { console.error("TRANSITIONS length mismatch"); process.exit(1); }

let vPrev = "[0:v]", aPrev = "[0:a]", elapsed = durs[0];
const fc = [];
for (let k = 1; k < files.length; k++) {
  const blend = TRANSITIONS[k - 1];
  const offset = (elapsed - blend).toFixed(3);
  const vOut = k === files.length - 1 ? "[vout]" : `[v${k}]`;
  const aOut = k === files.length - 1 ? "[aout]" : `[a${k}]`;
  fc.push(`${vPrev}[${k}:v]xfade=transition=fade:duration=${blend}:offset=${offset}${vOut}`);
  fc.push(`${aPrev}[${k}:a]acrossfade=d=${blend}${aOut}`);
  vPrev = vOut; aPrev = aOut;
  elapsed = elapsed - blend + durs[k];
}
console.log(`assembling ${files.length} clips, projected runtime ${elapsed.toFixed(1)}s`);

const master = path.join(ASSETS, "boston1775_final_cut.mp4");
const argv = ["-y"];
for (const f of files) argv.push("-i", f);
argv.push("-filter_complex", fc.join(";"),
  "-map", "[vout]", "-map", "[aout]",
  "-c:v", "libx264", "-crf", "16", "-preset", "medium",
  "-c:a", "aac", "-b:a", "192k", master);
sh("ffmpeg", argv);
console.log(`master: ${master} (${dur(master).toFixed(1)}s)`);

// 3. compressed delivery copy (~1.5Mbps) for chat
const delivery = path.join(ASSETS, "boston1775_final_cut_compressed.mp4");
sh("ffmpeg", ["-y", "-i", master,
  "-c:v", "libx264", "-b:v", "1500k", "-maxrate", "1800k", "-bufsize", "3000k",
  "-preset", "medium", "-c:a", "aac", "-b:a", "128k", delivery]);
console.log(`delivery: ${delivery} (${(fs.statSync(delivery).size / 1e6).toFixed(1)}MB)`);
