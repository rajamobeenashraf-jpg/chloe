// Episode 4 final-cut assembler — rebuilt from creative-direction.md §11 specs
// (original lost with Episode 1's container).
//
// Pipeline: per-clip loudnorm → chained xfade (video) + acrossfade (audio)
// with per-transition durations → CRF16 master + ~1.5Mbps delivery copy.
//
// Transition technique, re-tuned round 7 (2026-08-20 owner note: cuts read
// as "not smooth and natural"). The original near-uniform 0.12s blend was
// too short to read as either a clean cut or a real dissolve on almost
// every transition — a 3-frame cross-blend reads as a flash/glitch, not
// an edit. Reclassified per actual story continuity instead of a flat
// default: genuine scene/time/location breaks (including the cold-open
// smash-cut, 1→2) get a clean quick cut (0.2s, ~5 frames — long enough to
// not flash), pairs that are truly continuous action in the same scene
// get a real dissolve (0.3-0.5s). A first pass tried a near-instant 0.04s
// for the smash-cut specifically — that duration triggers a real ffmpeg
// xfade/encoder bug (a runaway frame-drop loop that truncates the whole
// output to ~14s while audio stays full length); 0.2s avoids it entirely
// and the visual difference at a smash-cut is imperceptible anyway.
// Dissolving between differently-lit locations still ghosts — that's why
// day/night shifts stay clean cuts, not dissolves.
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
// 1→2 smash-cut cold open (quick cut, see note above re: the 0.04s bug) ·
// 2→3 store interior, scene cut ·
// 3→4 diggings exterior, scene cut · 4→5 SAME location, costume change
// flows into joining the crew — continuous, dissolve · 5→6 continuous
// riffle action, dissolve · 6→7 day→night time jump, cut · 7→8 night→day
// jump, cut · 8→9 same day/camp, cholera into claim-jump moments later —
// continuous, dissolve · 9→10 the alarm bell literally causes the meeting,
// the strongest continuity in the episode — dissolve · 10→11 new crisis
// (rain/river) starting, quick cut · 11→12 time-passing into dusk outro.
export const TRANSITIONS = [0.2, 0.2, 0.2, 0.35, 0.4, 0.2, 0.2, 0.3, 0.45, 0.2, 0.5];

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
