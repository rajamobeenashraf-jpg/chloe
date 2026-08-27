// Legnica episode — final cut assembly. Every transition is a TRUE HARD
// CUT (creative-direction.md §16); a single ffmpeg filter_complex concat
// pass over the 13 captioned/loudnorm'd clips from qc_pass.mjs.
//
// Owner decision, 2026-08-27: drop the end text card entirely -- the
// episode now ends on clip11 itself, fading naturally to black/silence
// (FADE_OUT_DURATION) instead of cutting to a title card.
const FADE_OUT_DURATION = 1.0;
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS } from "./captions_data.mjs";

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

async function probeFrameCount(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-count_frames", "-show_entries", "stream=nb_read_frames",
    "-of", "default=noprint_wrappers=1:nokey=1",
    filePath,
  ]);
  return parseInt(stdout.trim(), 10);
}

async function main() {
  await fs.mkdir(ASSETS_DIR, { recursive: true });

  const manifest = JSON.parse(await fs.readFile(path.join(QC_DIR, "durations.json"), "utf8"));
  const ids = CLIPS.map((c) => c.id);
  const clipPaths = ids.map((id) => path.join(QC_DIR, `${id}_qc.mp4`));

  const expectedTotal = ids.reduce((sum, id) => sum + manifest[id], 0);
  console.log(`[cut] ${ids.length} clips, expected total runtime ${expectedTotal.toFixed(2)}s (ending on a ${FADE_OUT_DURATION}s fade to black/silence, no text card)`);

  const masterPath = path.join(ASSETS_DIR, "legnica_final_cut.mp4");

  const inputs = clipPaths.flatMap((p) => ["-i", p]);
  const filterParts = [];
  for (let i = 0; i < clipPaths.length; i++) {
    filterParts.push(`[${i}:v][${i}:a]`);
  }
  const fadeStart = (expectedTotal - FADE_OUT_DURATION).toFixed(3);
  const filterComplex =
    `${filterParts.join("")}concat=n=${clipPaths.length}:v=1:a=1[catv][cata];` +
    `[catv]fade=t=out:st=${fadeStart}:d=${FADE_OUT_DURATION}[outv];` +
    `[cata]afade=t=out:st=${fadeStart}:d=${FADE_OUT_DURATION}[outa]`;

  console.log(`[cut] concatenating ${clipPaths.length} pieces via single filter_complex concat, fading out the last ${FADE_OUT_DURATION}s...`);
  await run("ffmpeg", [
    "-y", ...inputs,
    "-filter_complex", filterComplex,
    "-map", "[outv]", "-map", "[outa]",
    "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    masterPath,
  ], { maxBuffer: 1024 * 1024 * 64 });

  const actualDuration = await probeVideoDuration(masterPath);
  console.log(`[cut] master written: ${masterPath}`);
  console.log(`[cut] actual final runtime: ${actualDuration.toFixed(2)}s (expected ${expectedTotal.toFixed(2)}s)`);

  const expectedFrames = Math.round(expectedTotal * 24);
  const actualFrames = await probeFrameCount(masterPath);
  console.log(`[cut] frame count: ${actualFrames} (expected ~${expectedFrames})`);
  if (Math.abs(actualFrames - expectedFrames) > ids.length) {
    throw new Error(`FRAME COUNT MISMATCH: got ${actualFrames}, expected ~${expectedFrames} -- possible silent truncation, do not ship`);
  }

  const compressedPath = path.join(ASSETS_DIR, "legnica_final_cut_compressed.mp4");
  await run("ffmpeg", [
    "-y", "-i", masterPath,
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
