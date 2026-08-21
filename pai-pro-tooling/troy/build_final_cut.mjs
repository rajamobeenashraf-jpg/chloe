// Episode 7 (Troy) — final cut assembly. Simpler than the Salem/Ep2
// tooling this is adapted from: every transition is a TRUE HARD CUT
// (creative-direction.md §16) and the OPENING LAW retires title cards for
// every episode from Ep5 onward, so this is a single ffmpeg `concat`
// pass — no dissolve-chain / mixed-filter-graph complexity needed.
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
  const clipPaths = CLIPS.map((c) => path.join(QC_DIR, `${c.id}_qc.mp4`));

  const expectedTotal = CLIPS.reduce((sum, c) => sum + manifest[c.id], 0);
  console.log(`[cut] ${CLIPS.length} clips, expected total runtime ${expectedTotal.toFixed(2)}s`);

  const concatListPath = path.join(QC_DIR, "concat_list.txt");
  const concatList = clipPaths.map((p) => `file '${p}'`).join("\n");
  await fs.writeFile(concatListPath, concatList);

  const masterPath = path.join(ASSETS_DIR, "troy_final_cut.mp4");

  // Re-encode (not stream-copy concat) so every clip's slightly different
  // encode params normalize into one consistent output — matches prior
  // episodes' practice and avoids concat-demuxer stream-mismatch failures.
  const inputs = clipPaths.flatMap((p) => ["-i", p]);
  const filterParts = [];
  for (let i = 0; i < clipPaths.length; i++) {
    filterParts.push(`[${i}:v][${i}:a]`);
  }
  const filterComplex = `${filterParts.join("")}concat=n=${clipPaths.length}:v=1:a=1[outv][outa]`;

  console.log(`[cut] concatenating ${clipPaths.length} clips via single filter_complex concat...`);
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

  // Sanity check: ffmpeg has been known to silently truncate output while
  // exiting 0 (caught in Ep4) -- verify frame count against expectation.
  const expectedFrames = Math.round(expectedTotal * 24); // all clips generated at 24fps
  const actualFrames = await probeFrameCount(masterPath);
  console.log(`[cut] frame count: ${actualFrames} (expected ~${expectedFrames})`);
  if (Math.abs(actualFrames - expectedFrames) > 24) {
    throw new Error(`FRAME COUNT MISMATCH: got ${actualFrames}, expected ~${expectedFrames} -- possible silent truncation, do not ship`);
  }

  const compressedPath = path.join(ASSETS_DIR, "troy_final_cut_compressed.mp4");
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
