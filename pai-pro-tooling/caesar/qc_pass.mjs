// Episode 6 (Julius Caesar, Rome 44 BC) — QC pass: burn in synced captions,
// loudnorm each clip's audio, and apply a short audio-only fade in/out at
// every clip's edges so the hard cuts in build_final_cut.mjs don't snap
// audio at full volume. Ported from the Salem (Ep 2) reference
// implementation, same logic, pointed at this episode's clips.
//
// Migrated to word-CHUNK captions (owner-locked 2026-08-23, see CLAUDE.md
// "Caption system" + pai-pro-tooling/troy/ reference) — buildAss() is
// unchanged (still one Dialogue event per entry in clip.captions; a chunk
// is just a 1-2 word entry instead of a full sentence), only SUB_STYLE and
// the caption DATA changed. The old sentence-level cues are preserved at
// captions_data_lines_backup.mjs as the ground-truth input the chunk
// pipeline (make_word_chunks.py) validates its whisper timing against.
//
// Targeted-clip-id support (`node qc_pass.mjs clip4`) and the
// merge-into-durations.json behavior are a caesar-specific addition, not
// present in the troy reference — kept because several clips here
// (clip9-11b) carry hand-graded transition corrections layered on qc_pass's
// output by separate one-off ffmpeg commands, which a full non-targeted
// re-run would silently clobber back to plain.
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS, SUB_STYLE } from "./captions_data.mjs";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const ASSETS_DIR = path.join(PROJECT_DIR, "assets");
const QC_DIR = path.join(ASSETS_DIR, "qc");

function assColor(hexRGB, alphaHex = "00") {
  const r = hexRGB.slice(0, 2), g = hexRGB.slice(2, 4), b = hexRGB.slice(4, 6);
  return `&H${alphaHex}${b}${g}${r}`;
}

function assTime(t) {
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return `${h}:${String(m).padStart(2, "0")}:${s.toFixed(2).padStart(5, "0")}`;
}

function escapeAssText(text) {
  return text.replace(/\\/g, "\\\\").replace(/\{/g, "\\{").replace(/\}/g, "\\}");
}

function captionText(c) {
  const text = escapeAssText(c.text);
  if (!c.speaker) return text;
  return `{\\i1}[${escapeAssText(c.speaker)}]{\\i0} ${text}`;
}

function buildAss(captions) {
  const style = SUB_STYLE;
  const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 720
PlayResY: 1280
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${style.fontName},${style.fontSize},${assColor("FFFFFF")},${assColor("FFFFFF")},${assColor("000000")},${assColor("000000")},-1,0,0,0,100,100,${style.spacing ?? 0},0,1,${style.outline},${style.shadow},2,${style.marginLR},${style.marginLR},${style.marginV},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
  const lines = captions
    .map((c) => `Dialogue: 0,${assTime(c.start)},${assTime(c.end)},Default,,0,0,0,,${captionText(c)}`)
    .join("\n");
  return header + lines + "\n";
}

async function probeVideoDuration(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    filePath,
  ]);
  return parseFloat(stdout.trim());
}

async function qcOneClip(clip) {
  const srcPath = path.join(ASSETS_DIR, `${clip.id}.mp4`);
  const outPath = path.join(QC_DIR, `${clip.id}_qc.mp4`);

  // Cap output to the SOURCE clip's frame-exact video-stream duration (not
  // the container's audio-driven duration) so audio and video end on the
  // same frame — loudnorm's two-pass analysis pads the audio stream by
  // tens of ms otherwise, which compounds across 13 clips into real drift.
  const videoDuration = await probeVideoDuration(srcPath);

  // Short audio-only fade in/out at every clip boundary so the hard cuts
  // (video AND audio, zero blend) don't snap sound at full volume at every
  // one of the 12 cuts. Never a crossfade across the cut itself — that
  // would consume the incoming clip's own audio into the blend and desync
  // it from its video from that point on.
  const FADE = 0.08;
  const fade = `afade=t=in:st=0:d=${FADE},afade=t=out:st=${(videoDuration - FADE).toFixed(3)}:d=${FADE}`;

  if (clip.captions.length === 0) {
    console.log(`[qc] ${clip.id}: no captions, loudnorm + fade only`);
    await run("ffmpeg", [
      "-y", "-i", srcPath,
      "-af", `loudnorm=I=-16:TP=-1.5:LRA=11,${fade}`,
      "-c:v", "copy",
      "-c:a", "aac", "-b:a", "192k",
      "-t", String(videoDuration),
      outPath,
    ]);
    return { outPath, videoDuration };
  }

  const assPath = path.join(QC_DIR, `${clip.id}.ass`);
  await fs.writeFile(assPath, buildAss(clip.captions));

  console.log(`[qc] ${clip.id}: burning ${clip.captions.length} caption(s) + loudnorm + fade`);
  await run("ffmpeg", [
    "-y", "-i", srcPath,
    "-vf", `ass=${assPath}`,
    "-af", `loudnorm=I=-16:TP=-1.5:LRA=11,${fade}`,
    "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k",
    "-t", String(videoDuration),
    outPath,
  ]);
  return { outPath, videoDuration };
}

async function main() {
  await fs.mkdir(QC_DIR, { recursive: true });
  const manifest = {};
  // Optional: `node qc_pass.mjs clip4` re-processes only that clip (used
  // for targeted caption-text fixes) instead of the full batch — merges
  // into the existing durations.json rather than overwriting it, so a
  // targeted run doesn't wipe out other clips' entries or clobber any
  // custom-graded qc file (e.g. clip8/clip11b's transition brightness
  // ramps, which live outside this script's own captions+loudnorm+fade
  // treatment and must not be silently regenerated back to plain).
  const requestedIds = process.argv.slice(2);
  const clipsToRun = requestedIds.length ? CLIPS.filter((c) => requestedIds.includes(c.id)) : CLIPS;

  for (const clip of clipsToRun) {
    const { videoDuration } = await qcOneClip(clip);
    manifest[clip.id] = videoDuration;
    console.log(`[qc]   ${clip.id}: frame-exact video duration = ${videoDuration}s`);
  }
  const manifestPath = path.join(QC_DIR, "durations.json");
  let finalManifest = manifest;
  if (requestedIds.length) {
    try {
      const prior = JSON.parse(await fs.readFile(manifestPath, "utf8"));
      finalManifest = { ...prior, ...manifest };
    } catch {
      // no prior manifest to merge with — fall through with just this run's results
    }
  }
  await fs.writeFile(manifestPath, JSON.stringify(finalManifest, null, 2));
  console.log(`[qc] done — ${clipsToRun.length} clip(s) written to ${QC_DIR}, manifest at ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
