// Episode 5 (Hell Creek) — final cut assembly. All 10 QC'd clips (captions +
// loudnorm + edge fades already applied by qc_pass.mjs), TRUE HARD CUTS only
// (creative-direction.md §16 — no dissolves anywhere; two prior episodes
// confirmed independently generated clips never blend clean regardless of
// duration). No title card — Ep5 is fully linear (OPENING LAW), no rewind.
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

async function main() {
  await fs.mkdir(ASSETS_DIR, { recursive: true });

  const manifest = JSON.parse(await fs.readFile(path.join(QC_DIR, "durations.json"), "utf8"));

  const segments = CLIPS.map((clip) => ({
    path: path.join(QC_DIR, `${clip.id}_qc.mp4`),
    duration: manifest[clip.id],
    label: clip.id,
  }));

  console.log(`[cut] ${segments.length} segments, all hard cuts:`);
  segments.forEach((s) => console.log(`  [${s.label}] (${s.duration.toFixed(3)}s)`));

  const outPath = path.join(ASSETS_DIR, "dino_final_cut.mp4");
  const inputs = segments.flatMap((s) => ["-i", s.path]);
  const n = segments.length;
  const vLabels = segments.map((_, i) => `[${i}:v][${i}:a]`).join("");
  const filter = `${vLabels}concat=n=${n}:v=1:a=1[v][a]`;

  await run("ffmpeg", [
    "-y", ...inputs,
    "-filter_complex", filter,
    "-map", "[v]", "-map", "[a]",
    "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    outPath,
  ], { maxBuffer: 1024 * 1024 * 64 });

  console.log(`[cut] master written: ${outPath}`);

  const actualDuration = await probeVideoDuration(outPath);
  console.log(`[cut] actual final runtime: ${actualDuration.toFixed(2)}s`);

  const compressedPath = path.join(ASSETS_DIR, "dino_final_cut_compressed.mp4");
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
