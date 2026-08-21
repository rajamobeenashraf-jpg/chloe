// Episode 5 (Hell Creek) — QC pass: burn in synced captions (timing must be
// filled into captions_data.mjs from real ffmpeg silencedetect + mouth-frame
// cross-check before this runs meaningfully), loudnorm each clip's audio,
// and apply a short audio-only fade in/out at every clip's edges so the hard
// cuts in build_final_cut.mjs don't snap audio at full volume. Structure
// adapted from pai-pro-tooling/salem/qc_pass.mjs (creative-direction.md §16).
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS, SUB_STYLE, FACT_STYLE, ID_CARD_STYLE } from "./captions_data.mjs";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const ASSETS_DIR = path.join(PROJECT_DIR, "assets");
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

// Ep5 has no human NPC speech, so no [Speaker] tag is ever needed -- kept
// for structural parity with the other episodes' tooling in case a future
// pass adds one (e.g. a caption for Tank's bleat/roar sound-effect label).
function captionText(c) {
  const text = escapeAssText(c.text);
  if (!c.speaker) return text;
  return `{\\i1}[${escapeAssText(c.speaker)}]{\\i0} ${text}`;
}

function buildAss(captions, facts = [], idCards = []) {
  const style = SUB_STYLE;
  const factStyle = FACT_STYLE;
  const idStyle = ID_CARD_STYLE;
  const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 720
PlayResY: 1280
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${style.fontName},${style.fontSize},${assColor("FFFFFF")},${assColor("FFFFFF")},${assColor("000000")},${assColor("000000")},-1,0,0,0,100,100,0,0,1,${style.outline},${style.shadow},2,${style.marginLR},${style.marginLR},${style.marginV},1
Style: Fact,${factStyle.fontName},${factStyle.fontSize},${assColor("FFFFFF")},${assColor("FFFFFF")},${assColor("000000")},${assColor("000000", factStyle.boxAlphaHex)},-1,0,0,0,100,100,0,0,3,${factStyle.outline},${factStyle.shadow},8,${factStyle.marginLR},${factStyle.marginLR},${factStyle.marginV},1
Style: Id,${idStyle.fontName},${idStyle.fontSize},${assColor("FFFFFF")},${assColor("FFFFFF")},${assColor("000000")},${assColor("000000", idStyle.boxAlphaHex)},-1,0,0,0,100,100,0,0,3,${idStyle.outline},${idStyle.shadow},8,${idStyle.marginLR},${idStyle.marginLR},${idStyle.marginV},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
  const dialogueLines = captions
    .map((c) => `Dialogue: 0,${assTime(c.start)},${assTime(c.end)},Default,,0,0,0,,${captionText(c)}`);
  // Top-of-screen fact overlays (Layer 1, "Fact" style, Alignment 8 =
  // top-center) — rendered on their own layer so they never compete with
  // Layer 0 dialogue captions even if their time ranges overlap.
  const factLines = facts
    .map((c) => `Dialogue: 1,${assTime(c.start)},${assTime(c.end)},Fact,,0,0,0,,${captionText(c)}`);
  // Species-ID cards (Layer 2, "Id" style, BorderStyle 3 = opaque box) —
  // more visually prominent than a plain fact overlay, own layer so it
  // never competes with dialogue or fact-overlay layers.
  const idLines = idCards
    .map((c) => `Dialogue: 2,${assTime(c.start)},${assTime(c.end)},Id,,0,0,0,,${captionText(c)}`);
  return header + [...dialogueLines, ...factLines, ...idLines].join("\n") + "\n";
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

  const videoDuration = await probeVideoDuration(srcPath);

  const FADE = 0.08;
  const fade = `afade=t=in:st=0:d=${FADE},afade=t=out:st=${(videoDuration - FADE).toFixed(3)}:d=${FADE}`;

  const facts = clip.facts || [];
  const idCards = clip.idCards || [];
  const hasCaptions = clip.captions.some((c) => c.start != null && c.end != null);
  const hasFacts = facts.some((c) => c.start != null && c.end != null);
  const hasIdCards = idCards.some((c) => c.start != null && c.end != null);
  if (!hasCaptions && !hasFacts && !hasIdCards) {
    console.log(`[qc] ${clip.id}: no timed captions yet, loudnorm + fade only`);
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
  await fs.writeFile(assPath, buildAss(clip.captions, facts, idCards));

  const factNote = hasFacts ? ` + ${facts.length} fact card(s)` : "";
  const idNote = hasIdCards ? ` + ${idCards.length} ID card(s)` : "";
  console.log(`[qc] ${clip.id}: burning ${clip.captions.length} caption(s)${factNote}${idNote} + loudnorm + fade`);
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
  for (const clip of CLIPS) {
    const { videoDuration } = await qcOneClip(clip);
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
