// Episode "The Fall of Constantinople 1453" — final cut assembly.
// Adapted from pai-pro-tooling/troy/build_final_cut.mjs. Every transition
// is a TRUE HARD CUT (creative-direction.md §16) — single ffmpeg
// filter_complex concat pass, no dissolve/mixed-filter-graph complexity --
// EXCEPT two deliberate, owner-approved one-off exceptions:
//  1. clip11->clip12: a full fade to black, picture AND sound, at the
//     moment the emperor goes to fight (2026-08-30). Implemented as a
//     fade-out baked onto clip11's own video+audio streams (at its tail)
//     and a fade-in baked onto clip12's (at its head).
//  2. clip01->clip02: a short 0.4s cross-dissolve (picture AND sound),
//     added 2026-08-30 to soften a real, previously-documented color-grade
//     mismatch (clip1's warm golden-hour siege tone vs clip2's cool
//     overcast maritime tone) that read as an awkward jump cut at a hard
//     cut. Implemented via true xfade/acrossfade between the two clips'
//     own streams (not a fade to black -- the picture blends directly),
//     which shortens the combined runtime by the dissolve duration since
//     the two clips' tail/head frames overlap rather than concatenate.
// Every other adjacent pair still meets at a true hard cut.
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

  const XFADE_DUR = 0.4; // seconds, short cross-dissolve (clip01->clip02)
  const expectedTotal = CLIPS.reduce((sum, c) => sum + manifest[c.id], 0) - XFADE_DUR;
  console.log(`[cut] ${CLIPS.length} clips, expected total runtime ${expectedTotal.toFixed(2)}s (includes -${XFADE_DUR}s for the clip01/02 cross-dissolve overlap)`);

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
  const XFADE_PAIR = ["clip01", "clip02"];

  const inputs = clipPaths.flatMap((p) => ["-i", p]);
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
    // xfade/acrossfade require an explicit constant frame rate on both
    // inputs to compute the overlap correctly.
    vChain += ",fps=24";
    scaleLines.push(`${vChain}[v${i}]`);
    audioLines.push(`${aChain}[a${i}]`);
  }

  const xfadeIdx0 = CLIPS.findIndex((c) => c.id === XFADE_PAIR[0]);
  const xfadeIdx1 = CLIPS.findIndex((c) => c.id === XFADE_PAIR[1]);
  if (xfadeIdx1 !== xfadeIdx0 + 1) {
    throw new Error(`XFADE_PAIR ${XFADE_PAIR.join(",")} must be adjacent in CLIPS -- got indices ${xfadeIdx0},${xfadeIdx1}`);
  }
  const clip01Dur = manifest[XFADE_PAIR[0]];
  const xfadeOffset = Math.max(0, clip01Dur - XFADE_DUR);

  const crossfadeLines = [
    `[v${xfadeIdx0}][v${xfadeIdx1}]xfade=transition=fade:duration=${XFADE_DUR}:offset=${xfadeOffset.toFixed(3)}[vxfade01]`,
    `[a${xfadeIdx0}][a${xfadeIdx1}]acrossfade=d=${XFADE_DUR}[axfade01]`,
  ];

  const filterParts = ["[vxfade01][axfade01]"];
  for (let i = 0; i < clipPaths.length; i++) {
    if (i === xfadeIdx0 || i === xfadeIdx1) continue;
    filterParts.push(`[v${i}][a${i}]`);
  }
  const concatCount = clipPaths.length - 1; // the xfaded pair collapses into one segment
  const filterComplex = `${scaleLines.join(";")};${audioLines.join(";")};${crossfadeLines.join(";")};${filterParts.join("")}concat=n=${concatCount}:v=1:a=1[outv][outa]`;

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
