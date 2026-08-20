// Episode 2 (Salem 1692) — QC pass: burn in synced captions (grounded in
// real silencedetect timing off each clip's actual audio, text taken
// verbatim from each clip's own generation prompt — see captions_data.mjs
// header) and loudnorm each clip's audio so dialogue levels don't jump
// between clips once stitched. Rebuilt from scratch this session per
// creative-direction.md §11 (the original tooling was lost with the old
// container); style/architecture choices follow that section's documented
// lessons (asymmetric crossfade-safe caption margins, scene-cut vs.
// continuous-action dissolve treatment, no silent truncation).
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS, SUB_STYLE } from "./captions_data.mjs";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const QC_DIR = path.join(PROJECT_DIR, "qc");

function assColor(hexRGB, alphaHex = "00") {
  // ASS wants &HAABBGGRR — hexRGB is "RRGGBB".
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

function buildAss(captions) {
  const style = SUB_STYLE;
  const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 720
PlayResY: 1280
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${style.fontName},${style.fontSize},${assColor("FFFFFF")},${assColor("FFFFFF")},${assColor("000000")},${assColor("000000")},-1,0,0,0,100,100,0,0,1,${style.outline},${style.shadow},2,${style.marginLR},${style.marginLR},${style.marginV},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
  const lines = captions
    .map((c) => `Dialogue: 0,${assTime(c.start)},${assTime(c.end)},Default,,0,0,0,,${escapeAssText(c.text)}`)
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
  const srcPath = path.join(PROJECT_DIR, `${clip.id}.mp4`);
  const outPath = path.join(QC_DIR, `${clip.id}_qc.mp4`);

  // loudnorm's two-pass analysis pads the audio stream by tens of ms
  // relative to the video stream — and the two are already a frame or so
  // apart even in the raw source (video quantizes to whole frames, audio
  // doesn't). Left alone this drifts further with every clip and compounds
  // across all 12 into an audio-ahead-of-video sync error by the end.
  // Fix: probe the SOURCE clip's real video-stream duration (frame-exact,
  // not the container's audio-driven duration) and cap output to exactly
  // that, so every QC'd clip's audio and video streams end on the same
  // frame. build_final_cut.mjs's xfade/acrossfade offsets depend on this.
  const videoDuration = await probeVideoDuration(srcPath);
  if (clip.captions.length === 0) {
    // No dialogue — just loudnorm, no subtitle filter needed.
    console.log(`[qc] ${clip.id}: no captions, loudnorm only`);
    await run("ffmpeg", [
      "-y", "-i", srcPath,
      "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
      "-c:v", "copy",
      "-c:a", "aac", "-b:a", "192k",
      "-t", String(videoDuration),
      outPath,
    ]);
    return { outPath, videoDuration };
  }

  const assPath = path.join(QC_DIR, `${clip.id}.ass`);
  await fs.writeFile(assPath, buildAss(clip.captions));

  console.log(`[qc] ${clip.id}: burning ${clip.captions.length} caption(s) + loudnorm`);
  await run("ffmpeg", [
    "-y", "-i", srcPath,
    "-vf", `ass=${assPath}`,
    "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
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
  for (const clip of CLIPS) {
    const { videoDuration } = await qcOneClip(clip);
    manifest[clip.id] = videoDuration;
    console.log(`[qc]   ${clip.id}: frame-exact video duration = ${videoDuration}s`);
  }
  // build_final_cut.mjs reads this instead of re-probing or re-deriving —
  // one source of truth for the exact durations its xfade/acrossfade
  // offset math depends on.
  const manifestPath = path.join(QC_DIR, "durations.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[qc] done — ${CLIPS.length} clips written to ${QC_DIR}, manifest at ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
