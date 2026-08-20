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

// TARGETED FIX (owner correction, 2026-08-20): clip 11's raw source has a
// baked-in generation artifact — the last ~0.6s (from local 10.42s to its
// 11.05s end) are literally duplicate frames (frame-to-frame luminance
// diff measured at exactly 0.00 for that whole span), not narrative
// stillness. That dead tail was landing right at the 11→12 join and read
// as a frozen/held frame before the final clip started. Trimming it here
// — before normalization — means the join lands on real motion instead of
// masking a frozen source with a bigger blend. REVISED (owner round 4):
// 10.40 kept the true generation-defect frames out, but left ~1.4s of a
// genuinely near-static real hold (8.958-10.375, confirmed by frame-level
// motion analysis — YDIF drops from 1.5-8 down to 0.05-0.4 right at 8.958)
// right before the cut into clip 12, which still read as a freeze even
// though the frames technically differ. Her actual dialogue (per the fixed
// caption timing) ends at 6.7s; real natural reaction motion continues
// through 8.92s. Trimming to 8.95 keeps all of that and cuts before the
// static hold begins, landing the transition on visible motion instead of
// a near-frozen frame. No other clip is trimmed.
const TRIM_OUT = { 11: 8.95 };

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
  const trimArgs = TRIM_OUT[n] ? ["-t", String(TRIM_OUT[n])] : [];
  sh("ffmpeg", ["-y", "-i", src, ...trimArgs,
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

const body = path.join(ASSETS, "boston1775_body.mp4");
const argv = ["-y"];
for (const f of files) argv.push("-i", f);
argv.push("-filter_complex", fc.join(";"),
  "-map", "[vout]", "-map", "[aout]",
  "-c:v", "libx264", "-crf", "16", "-preset", "medium",
  "-c:a", "aac", "-b:a", "192k", body);
sh("ffmpeg", argv);
console.log(`body: ${body} (${dur(body).toFixed(1)}s)`);

// 2b. end card — "Part One" / series-continuation tag (owner request,
// round 4). Clip 12 already fades to true black in-camera (her hand
// covers the lens, per the scripted outro), so the card is built as a
// continuation of that same black rather than a hard cut into a new
// graphic — it reads as one unbroken fade, not an inserted screen. Text
// uses DejaVu Serif (distinct from the DejaVu Sans caption font) for a
// period-appropriate, cinematic feel; a thin rule separates the "PART
// ONE" tag from the continuation line, in the muted-warm tone of the
// episode's grade rather than pure white. Centered in the safe area, well
// clear of the caption zone. Silent (no music tool available); a short
// audio crossfade from clip 12's tail avoids a hard silence-to-silence
// cut into it.
const CARD_DUR = 3.2;
const endcard = path.join(ASSETS, "endcard.mp4");
sh("ffmpeg", ["-y", "-f", "lavfi", "-i", `color=c=black:s=${W}x${H}:d=${CARD_DUR}:r=${FPS}`,
  "-f", "lavfi", "-i", `anullsrc=r=${AR}:cl=stereo`, "-t", String(CARD_DUR),
  "-vf",
    "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:" +
      "text='PART ONE':fontsize=34:fontcolor=0xC9B98A:" +
      "x=(w-text_w)/2:y=h/2-90:alpha='if(lt(t,0.3),0,if(lt(t,1.0),(t-0.3)/0.7,1))'," +
    "drawbox=x=(iw-140)/2:y=h/2-42:w=140:h=2:color=0xC9B98A@0.85:t=fill:" +
      "enable='gte(t,0.9)'," +
    "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf:" +
      "text='The Story Continues…':fontsize=44:fontcolor=0xF0E6D2:" +
      "x=(w-text_w)/2:y=h/2-10:alpha='if(lt(t,1.0),0,if(lt(t,1.8),(t-1.0)/0.8,1))'," +
    "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:" +
      "text='Part Two — Coming Soon':fontsize=22:fontcolor=0xC9B98A:" +
      "x=(w-text_w)/2:y=h/2+55:alpha='if(lt(t,1.6),0,if(lt(t,2.4),(t-1.6)/0.8,1))'",
  "-c:v", "libx264", "-crf", "16", "-preset", "medium",
  "-c:a", "aac", "-b:a", "192k", endcard]);
console.log(`endcard: ${endcard} (${CARD_DUR}s)`);

// 2c. append: short video xfade (0.3s, matches clip12's own fade-to-black
// so the seam is invisible) + audio acrossfade (0.3s) so the transition
// into the silent card isn't an abrupt digital cut.
const bodyDur = dur(body);
const CARD_BLEND = 0.30;
const master = path.join(ASSETS, "boston1775_final_cut.mp4");
sh("ffmpeg", ["-y", "-i", body, "-i", endcard,
  "-filter_complex",
    `[0:v][1:v]xfade=transition=fade:duration=${CARD_BLEND}:offset=${(bodyDur - CARD_BLEND).toFixed(3)}[vout];` +
    `[0:a][1:a]acrossfade=d=${CARD_BLEND}[aout]`,
  "-map", "[vout]", "-map", "[aout]",
  "-c:v", "libx264", "-crf", "16", "-preset", "medium",
  "-c:a", "aac", "-b:a", "192k", master]);
console.log(`master: ${master} (${dur(master).toFixed(1)}s)`);

// 3. compressed delivery copy (~1.5Mbps) for chat
const delivery = path.join(ASSETS, "boston1775_final_cut_compressed.mp4");
sh("ffmpeg", ["-y", "-i", master,
  "-c:v", "libx264", "-b:v", "1500k", "-maxrate", "1800k", "-bufsize", "3000k",
  "-preset", "medium", "-c:a", "aac", "-b:a", "128k", delivery]);
console.log(`delivery: ${delivery} (${(fs.statSync(delivery).size / 1e6).toFixed(1)}MB)`);
