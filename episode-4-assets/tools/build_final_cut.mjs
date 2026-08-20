// Episode 4 final-cut assembler — rebuilt from creative-direction.md §11 specs
// (original lost with Episode 1's container).
//
// Pipeline: per-clip loudnorm → chained xfade (video) + acrossfade (audio)
// with per-transition durations → CRF16 master + ~1.5Mbps delivery copy.
//
// Transition technique per §11 round 2: hard scene/location/lighting changes
// CUT on a 0.12s blend; genuinely continuous action dissolves at 0.4s;
// time-passing (into the dusk outro) gets 0.5s. Dissolving between
// differently-lit locations ghosts — that's why day/night shifts cut.
//
// KEEP IN SYNC with qc_pass.mjs TRANSITIONS (caption crossfade margins must
// match these blend durations).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PROJ = "/home/user/pai-pro/projects/goldrush49";
const VID = (n) => {
  const dir = path.join(PROJ, "assets/videos");
  // Prefer the QC'd (captioned) copy when present, else the raw clip.
  const qc = path.join(dir, `clip${String(n).padStart(2, "0")}_qc.mp4`);
  if (fs.existsSync(qc)) return qc;
  const cands = fs.readdirSync(dir).filter((f) => f.startsWith(`clip${String(n).padStart(2, "0")}_v`)).sort();
  if (!cands.length) throw new Error(`no file for clip ${n}`);
  return path.join(dir, cands[cands.length - 1]);
};

// TRANSITIONS[i] = blend duration between clip i+1 and clip i+2.
// 1→2 rewind card cut · 2→3 · 3→4 · 4→5 scene changes · 5→6 continuous action
// 6→7 day→night · 7→8 night→day · 8→9 scene change · 9→10 day→night
// 10→11 night→day (all cuts) · 11→12 time-passing into dusk outro.
export const TRANSITIONS = [0.12, 0.12, 0.12, 0.12, 0.4, 0.12, 0.12, 0.12, 0.12, 0.12, 0.5];

const N = 12;
const W = 720, H = 1280, FPS = 24;

const durations = [];
for (let i = 1; i <= N; i++) {
  const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", VID(i)]).toString().trim();
  durations.push(parseFloat(out));
}
console.log("clip durations:", durations.map((d) => d.toFixed(2)).join(" "));

// Build one filter graph: normalize every input (fps/scale/format + loudnorm),
// then chain xfade/acrossfade with computed offsets.
const inputs = [];
for (let i = 1; i <= N; i++) inputs.push("-i", VID(i));

let filters = [];
for (let i = 0; i < N; i++) {
  filters.push(`[${i}:v]fps=${FPS},scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2,format=yuv420p,settb=AVTB[v${i}]`);
  filters.push(`[${i}:a]aresample=48000,loudnorm=I=-16:TP=-1.5:LRA=11[a${i}]`);
}

let vPrev = "v0", aPrev = "a0", elapsed = durations[0];
for (let i = 1; i < N; i++) {
  const d = TRANSITIONS[i - 1];
  const offset = (elapsed - d).toFixed(3);
  const vOut = i === N - 1 ? "vout" : `vx${i}`;
  const aOut = i === N - 1 ? "aout" : `ax${i}`;
  filters.push(`[${vPrev}][v${i}]xfade=transition=fade:duration=${d}:offset=${offset}[${vOut}]`);
  filters.push(`[${aPrev}][a${i}]acrossfade=d=${d}[${aOut}]`);
  vPrev = vOut; aPrev = aOut;
  elapsed = elapsed - d + durations[i];
}
console.log("expected runtime:", elapsed.toFixed(1), "s");

const master = path.join(PROJ, "assets/goldrush_final_cut.mp4");
execFileSync("ffmpeg", [
  "-loglevel", "error", "-y", ...inputs,
  "-filter_complex", filters.join(";"),
  "-map", "[vout]", "-map", "[aout]",
  "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-c:a", "aac", "-b:a", "192k",
  master,
], { stdio: ["ignore", "inherit", "inherit"] });
console.log("master:", master);

const delivery = path.join(PROJ, "assets/goldrush_final_cut_compressed.mp4");
execFileSync("ffmpeg", [
  "-loglevel", "error", "-y", "-i", master,
  "-c:v", "libx264", "-b:v", "1500k", "-maxrate", "1800k", "-bufsize", "3000k", "-preset", "medium",
  "-c:a", "aac", "-b:a", "96k",
  delivery,
], { stdio: ["ignore", "inherit", "inherit"] });
console.log("delivery:", delivery);
