// Episode 7 (Troy) — QC pass: burn in synced captions (timing grounded in
// real silencedetect + mandatory mouth-frame cross-check on clip 10, see
// captions_data.mjs header), loudnorm each clip's audio, and apply a short
// audio-only fade in/out at every clip's edges so the hard cuts in
// build_final_cut.mjs don't snap audio at full volume. Adapted from the
// Episode 2 (Salem) tooling per creative-direction.md §16.
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS, SUB_STYLE } from "./captions_data.mjs";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
// Legnica's runtime assets live in the PAI Pro project dir, not a local
// assets/ subfolder — point there directly (already holds the correctly
// approved/locked {id}_v1.mp4 for every clip, including clip10/clip10B
// after the owner's lock decisions).
const ASSETS_DIR = "/home/user/pai-pro/projects/legnica/assets";
const QC_DIR = path.join(PROJECT_DIR, "qc");

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

// creative-direction.md §29 (owner mandate, 2026-08-26, reverse-engineered
// from Chloe vs History): audio must never dip toward silence at a clip
// join -- her editing never has an audible gap at a cut, either pre-lapping
// the next scene's sound or running one continuous bed underneath both
// shots. The old per-clip 0.08s fade-out/fade-in at every edge guaranteed
// a ~0.16s audible dip at every single cut, which is the opposite of that
// technique and was the confirmed root cause of the "bad transitions"
// complaint. Nearly every Legnica clip's own sound field is already
// written as an explicit continuous bridge into/out of its neighbor
// ("no reset", "continues UNINTERRUPTED", "carries...over the cut") --
// so the correct fix is a true hard audio join matching the hard video
// cut for every INTERNAL clip boundary, with only a minimal click-guard
// fade at the two true outer edges of the whole program (into the cold
// open, out of the final clip before the text card) where there is
// nothing on the other side to bridge to.
const CLICK_GUARD = 0.02; // imperceptible, only prevents a waveform-discontinuity pop

// NOTE 2026-08-26: investigated a targeted volume-lift patch on clip10's
// trailing ~0.6s to address the confirmed dead-silence gap at the
// clip10->clip10B join (see production log). Abandoned: measurement
// showed clip10's tail is genuine digital silence (no signal at all, not
// just quiet), so no gain filter can recover it -- confirmed by testing
// the `volume` filter's `enable` time-gate on this exact file, which
// produced zero measurable change on the near-zero tail while working
// correctly elsewhere in the same clip. This is a content-level gap in
// the original clip10 generation, not fixable at the edit layer without
// either a small regeneration or a sourced/generated ambient bed to
// bridge the specific gap -- reported to the owner rather than shipped
// as an unverified "fix."

async function qcOneClip(clip, { isFirst, isLast }) {
  const srcPath = path.join(ASSETS_DIR, `${clip.id}_v1.mp4`);
  const outPath = path.join(QC_DIR, `${clip.id}_qc.mp4`);

  const videoDuration = await probeVideoDuration(srcPath);

  const fadeParts = [];
  if (isFirst) fadeParts.push(`afade=t=in:st=0:d=${CLICK_GUARD}`);
  if (isLast) fadeParts.push(`afade=t=out:st=${(videoDuration - CLICK_GUARD).toFixed(3)}:d=${CLICK_GUARD}`);
  const fadeSuffix = fadeParts.length ? `,${fadeParts.join(",")}` : "";
  const fadeNote = fadeParts.length ? `outer-edge click-guard (${CLICK_GUARD * 1000}ms)` : "no fade -- true hard audio join per §29";

  if (clip.captions.length === 0) {
    console.log(`[qc] ${clip.id}: no captions, loudnorm + ${fadeNote}`);
    await run("ffmpeg", [
      "-y", "-i", srcPath,
      "-af", `loudnorm=I=-16:TP=-1.5:LRA=11${fadeSuffix}`,
      "-c:v", "copy",
      "-c:a", "aac", "-b:a", "192k",
      "-t", String(videoDuration),
      outPath,
    ]);
    return { outPath, videoDuration };
  }

  const assPath = path.join(QC_DIR, `${clip.id}.ass`);
  await fs.writeFile(assPath, buildAss(clip.captions));

  console.log(`[qc] ${clip.id}: burning ${clip.captions.length} caption(s) + loudnorm + ${fadeNote}`);
  await run("ffmpeg", [
    "-y", "-i", srcPath,
    "-vf", `ass=${assPath}`,
    "-af", `loudnorm=I=-16:TP=-1.5:LRA=11${fadeSuffix}`,
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
  for (let i = 0; i < CLIPS.length; i++) {
    const clip = CLIPS[i];
    const { videoDuration } = await qcOneClip(clip, { isFirst: i === 0, isLast: i === CLIPS.length - 1 });
    manifest[clip.id] = videoDuration;
    console.log(`[qc]   ${clip.id}: frame-exact video duration = ${videoDuration}s`);
  }
  const manifestPath = path.join(QC_DIR, "durations.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[qc] done — ${CLIPS.length} clips written to ${QC_DIR}, manifest at ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
