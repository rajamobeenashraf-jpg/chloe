// Episode 7 (Troy) — assembles the 10 scene-matched music cues (generated
// after the owner rejected the single-continuous-guess-the-proportions
// score as not matching scene mood) into one continuous score via chained
// acrossfade, so it still plays as one throughline while each section was
// actually composed and time-boxed to its own scene.
//
// Usage: node assemble_score.mjs
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);
const CUE_DIR = "/tmp/claude-0/-home-user-chloe/7ac2ab27-846b-513a-a43d-cf2fae9c942b/scratchpad/score_cues";
const OUT_PATH = "/tmp/claude-0/-home-user-chloe/7ac2ab27-846b-513a-a43d-cf2fae9c942b/scratchpad/score/score_scene_matched.mp3";

const CUES = [
  "cue01_opening.mp3",
  "cue02_comedy1.mp3",
  "cue03_tension.mp3",
  "cue04_intimacy.mp3",
  "cue05_awe.mp3",
  "cue06_mourning.mp3",
  "cue07_comedy2.mp3",
  "cue08_climax.mp3",
  "cue09_aftermath.mp3",
  "cue10_resolution.mp3",
];
const CROSSFADE = 1.8;
// Each cue was generated at its scene's target length + ~1.6s buffer, so
// the crossfade needs to consume close to (raw_sum - target_sum)/9 to land
// near the true target -- computed as 1.8s; the final apad+-t trim (same
// approach as mix_music.mjs) absorbs whatever small drift remains rather
// than relying on this number being exact.

async function probeDuration(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1", filePath,
  ]);
  return parseFloat(stdout.trim());
}

async function main() {
  const inputs = CUES.flatMap((f) => ["-i", path.join(CUE_DIR, f)]);

  // Chain acrossfade pairwise: [0][1]acrossfade[a1]; [a1][2]acrossfade[a2]; ...
  let filter = "";
  let prevLabel = "0:a";
  for (let i = 1; i < CUES.length; i++) {
    const outLabel = `a${i}`;
    filter += `[${prevLabel}][${i}:a]acrossfade=d=${CROSSFADE}:c1=tri:c2=tri[${outLabel}];`;
    prevLabel = outLabel;
  }
  filter = filter.slice(0, -1); // drop trailing semicolon

  console.log(`[assemble] chaining ${CUES.length} cues with ${CROSSFADE}s crossfades...`);
  await run("ffmpeg", [
    "-y", ...inputs,
    "-filter_complex", filter,
    "-map", `[${prevLabel}]`,
    "-ar", "48000", "-ac", "2",
    OUT_PATH,
  ]);

  const outDuration = await probeDuration(OUT_PATH);
  console.log(`[assemble] done -> ${OUT_PATH} (${outDuration.toFixed(3)}s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
