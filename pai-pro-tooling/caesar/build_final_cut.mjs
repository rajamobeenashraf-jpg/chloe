// Episode 6 (Julius Caesar, Rome 44 BC) — final cut assembly. Stitches the
// 13 QC'd clips (qc/*_qc.mp4, captions + loudnorm + edge-fades already
// applied by qc_pass.mjs) into a single Short with TRUE hard cuts only
// (plain concat, zero blend) — the project's mandatory rule (§16) and
// independently re-confirmed this session: a crossfade between two
// independently generated frames that aren't pixel-aligned produces real
// ghosting regardless of duration, not a smooth blend. No dissolves, no
// title cards in this episode — every transition is the same type, so
// (unlike Salem's mixed cut/dissolve chain) this is one single
// filter_complex concat pass, not a multi-run pipeline.
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS } from "./captions_data.mjs";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const ASSETS_DIR = path.join(PROJECT_DIR, "assets");
const QC_DIR = path.join(ASSETS_DIR, "qc");

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
  const manifest = JSON.parse(await fs.readFile(path.join(QC_DIR, "durations.json"), "utf8"));

  const segments = CLIPS.map((clip) => ({
    path: path.join(QC_DIR, `${clip.id}_qc.mp4`),
    duration: manifest[clip.id],
    label: clip.id,
  }));

  const predictedDuration = segments.reduce((sum, s) => sum + s.duration, 0);
  console.log(`[cut] ${segments.length} segments, all hard cuts, predicted runtime ${predictedDuration.toFixed(3)}s:`);
  segments.forEach((s, i) => console.log(`  [${i}] ${s.label} (${s.duration.toFixed(3)}s)`));

  const inputs = segments.flatMap((s) => ["-i", s.path]);
  const concatInputs = segments.map((_, i) => `[${i}:v][${i}:a]`).join("");
  const filter = `${concatInputs}concat=n=${segments.length}:v=1:a=1[outv][outa]`;

  const masterPath = path.join(ASSETS_DIR, "episode6_final_cut.mp4");
  await run("ffmpeg", [
    "-y", ...inputs,
    "-filter_complex", filter,
    "-map", "[outv]", "-map", "[outa]",
    "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    masterPath,
  ], { maxBuffer: 1024 * 1024 * 64 });

  console.log(`[cut] master written: ${masterPath}`);

  // Mandatory verification (§16): confirm ffmpeg didn't silently truncate
  // (it has exited 0 while doing this before) by checking the actual frame
  // count / duration against the predicted runtime, not just trusting the
  // exit code.
  const actualDuration = await probeVideoDuration(masterPath);
  const drift = Math.abs(actualDuration - predictedDuration);
  console.log(`[cut] actual runtime: ${actualDuration.toFixed(3)}s (predicted ${predictedDuration.toFixed(3)}s, drift ${drift.toFixed(3)}s)`);
  if (drift > 0.5) {
    throw new Error(`Runtime drift ${drift.toFixed(3)}s exceeds 0.5s tolerance — possible silent truncation, do not treat this build as valid.`);
  }

  const compressedPath = path.join(ASSETS_DIR, "episode6_final_cut_compressed.mp4");
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
