// Legnica episode — final cut assembly. Every transition is a TRUE HARD
// CUT (creative-direction.md §16); a single ffmpeg filter_complex concat
// pass over the 13 captioned/loudnorm'd clips from qc_pass.mjs.
//
// Owner decision, 2026-08-27: drop the end text card entirely -- the
// episode now ends on clip11 itself, fading naturally to black/silence
// (FADE_OUT_DURATION) instead of cutting to a title card.
const FADE_OUT_DURATION = 1.0;

// Owner decision, 2026-08-27 (same session, later): bring the battle
// name/year back, but as an ON-SCREEN card burned over the last 5s of
// live footage (not a separate black card scene) -- reuses the same
// wording as the old text card. Positioned near the TOP of frame
// (SUB_STYLE's dialogue captions sit near the bottom, MarginV 320) so
// it never collides with clip11's own word-synced dialogue captions,
// which are still playing during part of this window.
const TITLE_CARD_DURATION = 5.0;
const TITLE_CARD_LINE1 = "BATTLE OF LEGNICA";
const TITLE_CARD_LINE2 = "1241 · MONGOL VICTORY";
const FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf";

// Owner decision, 2026-08-29 (EDITING_HANDOFF.md §3): one continuous
// generated score across the whole episode, edit-stage only -- clips
// themselves stay generated music-free. Layered UNDER the existing
// diegetic clip audio (never replacing it), auto-ducked via
// sidechaincompress keyed off the dialogue/ambient mix so it drops
// under dialogue without needing per-caption volume scheduling.
const SCORE_FILENAME = "legnica_score_v1.wav";
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
  const titleCardStart = (expectedTotal - TITLE_CARD_DURATION).toFixed(3);
  const escText = (s) => s.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\u2019");
  const drawText = (text, y) =>
    `drawtext=fontfile=${FONT_BOLD}:text='${escText(text)}':fontcolor=white:fontsize=44:` +
    `borderw=3:bordercolor=black@0.85:x=(w-text_w)/2:y=${y}:enable='gte(t\\,${titleCardStart})'`;
  const scoreInputIndex = clipPaths.length;

  // Owner decision, 2026-08-29: clip10B is now almost entirely diegetic-silent
  // (its own generation was deliberately scripted with no music/effects, per
  // the owner's request, to stop it fighting the shared score) -- with
  // nothing else in the mix, the score there reads as noticeably thinner than
  // clip9's fuller mix (dialogue + crying + battle ambient + score together),
  // even though the score's own ducked level measures the same in both
  // clips. Boost the score specifically during clip10B's span so that clip
  // doesn't play back feeling quieter than its neighbors.
  let clip10BStart = 0;
  for (const id of ids) {
    if (id === "clip10B") break;
    clip10BStart += manifest[id];
  }
  const clip10BEnd = clip10BStart + (manifest.clip10B || 0);
  const hasClip10B = ids.includes("clip10B");
  const SCORE_BOOST_DB = 5;
  const scoreBoostFilter = hasClip10B
    ? `,volume=${SCORE_BOOST_DB}dB:enable='between(t,${clip10BStart},${clip10BEnd})'`
    : "";

  const filterComplex =
    `${filterParts.join("")}concat=n=${clipPaths.length}:v=1:a=1[catv][cata];` +
    `[catv]${drawText(TITLE_CARD_LINE1, 130)},${drawText(TITLE_CARD_LINE2, 195)}[titled];` +
    `[titled]fade=t=out:st=${fadeStart}:d=${FADE_OUT_DURATION}[outv];` +
    // Score: normalize loudness, pad/trim to the episode's exact length, then
    // duck it via sidechaincompress keyed off cata (drops under dialogue/loud
    // diegetic sound automatically, no per-caption volume scheduling needed).
    // cata feeds two downstream filters (the sidechain key and the final
    // mix), so it must be split first -- ffmpeg only lets a label be
    // consumed once otherwise.
    `[cata]asplit=2[cata_key][cata_mix];` +
    `[${scoreInputIndex}:a]loudnorm=I=-23:TP=-2:LRA=11,atrim=0:${expectedTotal},apad=whole_dur=${expectedTotal},asetpts=PTS-STARTPTS[score_norm];` +
    `[score_norm][cata_key]sidechaincompress=threshold=0.04:ratio=10:attack=15:release=400:makeup=1${scoreBoostFilter}[score_ducked];` +
    `[cata_mix][score_ducked]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[mixed_a];` +
    `[mixed_a]afade=t=out:st=${fadeStart}:d=${FADE_OUT_DURATION}[outa]`;

  console.log(`[cut] concatenating ${clipPaths.length} pieces via single filter_complex concat, on-screen title card for the last ${TITLE_CARD_DURATION}s, mixing the continuous score (ducked under dialogue), fading out the last ${FADE_OUT_DURATION}s...`);
  await run("ffmpeg", [
    "-y", ...inputs, "-i", path.join(ASSETS_DIR, SCORE_FILENAME),
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
