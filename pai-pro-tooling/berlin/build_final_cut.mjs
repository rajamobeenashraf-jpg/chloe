// Episode 8 (Berlin Wall, 1989) — final cut assembly. Stitches the 11 QC'd
// clips (qc/*.mp4, captions + loudnorm already applied) into a single
// Short, all TRUE zero-blend hard cuts (creative-direction.md §16 — no
// xfade/dissolve anywhere, no title card: the episode is fully linear per
// the OPENING LAW, so there's no flashback moment for a card to mark).
// Adapted from the Ep 2 (Salem) tooling; simplified since every transition
// here is the same type (hard cut) — one run, no dissolve-chain branching
// needed — but kept the general run-based structure for parity/future
// episodes that might mix transition types again.
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS, TRANSITIONS } from "./captions_data.mjs";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const QC_DIR = path.join(PROJECT_DIR, "qc");
const ASSETS_DIR = path.join(PROJECT_DIR, "assets");

async function probeVideoDuration(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    filePath,
  ]);
  return parseFloat(stdout.trim());
}

async function main() {
  await fs.mkdir(ASSETS_DIR, { recursive: true });

  const manifest = JSON.parse(await fs.readFile(path.join(QC_DIR, "durations.json"), "utf8"));

  const segments = CLIPS.map((clip) => ({
    path: path.join(QC_DIR, `${clip.id}_qc.mp4`),
    duration: manifest[clip.id],
    label: clip.id,
  }));

  const blendDurations = CLIPS.slice(0, -1).map((clip) => {
    const t = TRANSITIONS.find((t) => t.after === clip.id);
    return t?.blend ?? 0; // every entry here is type "cut", blend 0
  });

  if (segments.length !== blendDurations.length + 1) {
    throw new Error(`segment/transition count mismatch: ${segments.length} segments, ${blendDurations.length} transitions`);
  }

  console.log(`[cut] ${segments.length} segments, all hard cuts:`);
  segments.forEach((s, i) => {
    const label = i < blendDurations.length ? "  --hard cut-->" : "";
    console.log(`  [${i}] ${s.label} (${s.duration.toFixed(3)}s)${label}`);
  });

  // All-hard-cut episode: one run, plain concat filter across all 11
  // inputs in a single ffmpeg pass.
  const outPath = path.join(ASSETS_DIR, "berlin_final_cut.mp4");
  const inputs = segments.flatMap((s) => ["-i", s.path]);
  const concatInputs = segments.map((_, i) => `[${i}:v][${i}:a]`).join("");
  const filter = `${concatInputs}concat=n=${segments.length}:v=1:a=1[v][a]`;

  console.log(`[cut] hard-cut concat: ${segments.map((s) => s.label).join(" -> ")}`);

  await run("ffmpeg", [
    "-y", ...inputs,
    "-filter_complex", filter,
    "-map", "[v]", "-map", "[a]",
    "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    outPath,
  ], { maxBuffer: 1024 * 1024 * 64 });

  const actualDuration = await probeVideoDuration(outPath);
  const predictedDuration = segments.reduce((sum, s) => sum + s.duration, 0);
  console.log(`[cut] master written: ${outPath}`);
  console.log(`[cut] actual final runtime: ${actualDuration.toFixed(2)}s (predicted ${predictedDuration.toFixed(2)}s, sum of clip durations)`);

  // ffprobe frame-count sanity check (creative-direction.md §16 — Ep 4
  // caught ffmpeg silently truncating a 128s cut to ~14s while exiting 0).
  if (Math.abs(actualDuration - predictedDuration) > 1.0) {
    throw new Error(`[cut] SANITY CHECK FAILED: actual duration ${actualDuration}s deviates from predicted ${predictedDuration}s by more than 1s — possible silent truncation, do not ship this cut.`);
  }

  const compressedPath = path.join(ASSETS_DIR, "berlin_final_cut_compressed.mp4");
  await run("ffmpeg", [
    "-y", "-i", outPath,
    "-c:v", "libx264", "-b:v", "1500k", "-maxrate", "1600k", "-bufsize", "3000k", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k", "-ar", "48000",
    compressedPath,
  ]);
  console.log(`[cut] delivery copy written: ${compressedPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
