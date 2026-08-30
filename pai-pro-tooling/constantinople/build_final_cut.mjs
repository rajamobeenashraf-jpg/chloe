// Episode "The Fall of Constantinople 1453" — final cut assembly.
// Adapted from pai-pro-tooling/troy/build_final_cut.mjs. Every transition
// is a TRUE HARD CUT (creative-direction.md §16) — single ffmpeg
// filter_complex concat pass, no dissolve/mixed-filter-graph complexity --
// EXCEPT the clip11->clip12 transition, a deliberate one-off owner-approved
// exception (2026-08-30): a full fade to black, picture AND sound, at the
// moment the emperor goes to fight. Implemented as a fade-out baked onto
// clip11's own video+audio streams (at its tail) and a fade-in baked onto
// clip12's (at its head), before the same single hard-cut concat -- every
// other adjacent pair still meets at a true hard cut.
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS } from "./captions_data.mjs";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const QC_DIR = path.join(PROJECT_DIR, "captioned");
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
  const manifest = JSON.parse(await fs.readFile(path.join(QC_DIR, "durations.json"), "utf8"));
  const clipPaths = CLIPS.map((c) => path.join(QC_DIR, `${c.id}_qc.mp4`));

  const expectedTotal = CLIPS.reduce((sum, c) => sum + manifest[c.id], 0);
  console.log(`[cut] ${CLIPS.length} clips, expected total runtime ${expectedTotal.toFixed(2)}s`);

  const masterPath = path.join(ASSETS_DIR, "constantinople_final_cut.mp4");

  // Re-encode (not stream-copy concat) so every clip's slightly different
  // encode params normalize into one consistent output. Clips in this
  // episode were generated across two resolutions (1080x1920 and 720x1280,
  // both 9:16) -- normalize every input to 1080x1920 (the episode's
  // engine-decision spec) before concat, or the concat filter's output pad
  // fails to configure on the first dimension mismatch.
  const FADE_DUR = 0.5; // seconds, both picture and sound
  const FADE_OUT_CLIP = "clip11";
  const FADE_IN_CLIP = "clip12";

  const inputs = clipPaths.flatMap((p) => ["-i", p]);
  const filterParts = [];
  const scaleLines = [];
  const audioLines = [];
  for (let i = 0; i < clipPaths.length; i++) {
    const clip = CLIPS[i];
    let vChain = `[${i}:v]scale=1080:1920:flags=lanczos,setsar=1`;
    let aChain = `[${i}:a]anull`;
    if (clip.id === FADE_OUT_CLIP) {
      const dur = manifest[clip.id];
      const st = Math.max(0, dur - FADE_DUR);
      vChain += `,fade=t=out:st=${st.toFixed(3)}:d=${FADE_DUR}:color=black`;
      aChain += `,afade=t=out:st=${st.toFixed(3)}:d=${FADE_DUR}`;
    } else if (clip.id === FADE_IN_CLIP) {
      vChain += `,fade=t=in:st=0:d=${FADE_DUR}:color=black`;
      aChain += `,afade=t=in:st=0:d=${FADE_DUR}`;
    }
    scaleLines.push(`${vChain}[v${i}]`);
    audioLines.push(`${aChain}[a${i}]`);
    filterParts.push(`[v${i}][a${i}]`);
  }
  const filterComplex = `${scaleLines.join(";")};${audioLines.join(";")};${filterParts.join("")}concat=n=${clipPaths.length}:v=1:a=1[outv][outa]`;

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
  // exiting 0 -- verify frame count against expectation.
  const expectedFrames = Math.round(expectedTotal * 24); // all clips generated at 24fps
  const actualFrames = await probeFrameCount(masterPath);
  console.log(`[cut] frame count: ${actualFrames} (expected ~${expectedFrames})`);
  if (Math.abs(actualFrames - expectedFrames) > 48) {
    throw new Error(`FRAME COUNT MISMATCH: got ${actualFrames}, expected ~${expectedFrames} -- possible silent truncation, do not ship`);
  }

  const compressedPath = path.join(ASSETS_DIR, "constantinople_final_cut_compressed.mp4");
  await run("ffmpeg", [
    "-y", "-i", masterPath,
    "-c:v", "libx264", "-b:v", "1500k", "-maxrate", "1600k", "-bufsize", "3000k", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k", "-ar", "48000",
    compressedPath,
  ]);
  console.log(`[cut] delivery copy written: ${compressedPath}`);

  if (actualDuration > 179) {
    console.warn(`[cut] WARNING: runtime ${actualDuration.toFixed(2)}s exceeds the 179s YouTube Shorts ceiling noted in the script -- trim needed before publish.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
