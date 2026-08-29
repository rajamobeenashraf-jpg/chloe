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
// the original clip10 generation; owner decided to fix it a different
// way instead of regenerating -- see CLIP10_GAP_FILLER below.

// Owner decision, 2026-08-26: clip9's confirmed ~1.0s frozen tail
// (creative-direction.md §30) gets trimmed rather than regenerated, even
// though this cuts into the tail end of the "aftermath, still unfolding"
// beat. Original trim point was the exact last pre-freeze frame boundary
// measured by freezedetect on the raw source (8.04167s of clip9's
// 9.041667s runtime). clip9's own caption ("NO—", 1.50-1.78s) is well
// before this point and unaffected.
//
// SECOND owner trim, 2026-08-27: after the freeze fix, the owner watched
// the assembled cut and flagged the span from absolute 1:20 to 1:23
// (80.0s-83.0s) as a held, static reaction that drags -- confirmed by
// reviewing the actual frames: clip9's last ~2.4s is an unchanging
// hands-over-mouth hold, and clip10's first ~0.6s (before her line
// starts around 2.7s local) is another held beat before anything new
// happens. Reverified the exact absolute timestamps against the owner
// before cutting, per their explicit request. Tightened clip9's trim
// further (5.61667s -> now 5.625s local, i.e. absolute 80.0s) and added
// a head-trim to clip10 (removing its first 0.58333s, i.e. up to
// absolute 83.0s in the old timeline) -- both land well clear of any
// dialogue/caption timing in either clip.
// Owner decision, 2026-08-27: after "Wait— they're retreating?" (ends
// 5.2s), cut the rest of clip3 -- drops the "No. Watch. This is what
// they do..." trap explanation entirely (confirmed with the owner this
// removes content clip4/clip5 narratively lean on; they chose to cut
// anyway). Frame-checked 5.2-6.7s: she stays turned away from camera
// the whole window (no return-to-lens beat exists to cut on), so picked
// the earliest natural post-line reaction frame instead of holding on
// a meaningless back-of-head shot -- landed on 5.333333s (frame 128 of
// 24fps), a clear 3/4-profile reaction beat, mouth settled, still
// facing enough toward the lens to read naturally on its own.
// clip9's frozen-tail trim (5.625) no longer applies: clip9 was fully
// rewritten and regenerated 2026-08-29 (merged with the old clip10 into
// one continuous fight/fall/reaction shot) and no longer has that defect.
const CLIP_TRIM = {
  clip3: 5.333333,
};

// Owner decision, 2026-08-27: clip5 opens on ~4.5s of near-static
// standing-crowd footage before Hazel's line starts (dialogue measured
// at local 4.56s) -- doesn't deliver the "sprinting/wheel-around/volley"
// action the script called for during that window, reads as dead time.
// Head-trim 3.0s off the start (owner's explicit instruction) rather
// than regenerate; this lands her line at local ~1.56s instead of 4.56s.
// clip10B's old head-trim (5.833333, applied 2026-08-29 to skip past
// Hazel in the earlier version of this clip's opening) NO LONGER
// APPLIES: clip10B was fully recreated 2026-08-29 (second/third
// generation) specifically to open on a precise BEAT 1 match to clip 9's
// last frame -- applying the old trim to the new footage would skip
// straight past that entire continuity-matched opening (and BEAT 2's
// camera lift) into the middle of BEAT 3, defeating the whole point of
// the recreation. Removed; the new clip10B uses its own frame 0.
// clip10's head-trim (0.58333) no longer applies either: clip10 was
// removed entirely 2026-08-29, merged into the rewritten clip9.
const CLIP_HEAD_TRIM = {
  clip5: 3.0,
};

// Owner decision, 2026-08-26: fix clip10's dead-silence tail (confirmed
// genuine digital silence, not fixable by any gain filter -- see NOTE
// above) WITHOUT regenerating the clip. Approach: mix a very low-level
// synthesized ambient bed (brown noise, heavily lowpassed to read as
// distant wind/rumble rather than hiss/static) underneath clip10's own
// audio for its full duration. Verified this raises the dead tail from
// true silence (-inf/-46.7dB) to a plausible continuing ambient floor
// (~-28dB) with silencedetect finding zero silent stretches afterward,
// while leaving the louder dialogue portions untouched in practice (the
// bed sits well under any real content, only becoming audible where
// nothing else is). This is the §29 "audio must never touch silence at
// a cut" principle applied via synthesis instead of a source regeneration.
// Empty as of 2026-08-29: clip10 (the clip this bed was built for) was
// removed, merged into the rewritten clip9. Mechanism kept in case a
// future clip needs the same dead-silence fix.
const CLIP_AMBIENT_BED = new Set();

// Owner decision, 2026-08-29: clip10B's recreated audio (silent/ambient-only
// per the no-music generation instruction) carries a faint low-frequency
// rumble artifact below ~150Hz (verified via spectrogram: a smeared
// broadband band under ~1.5kHz, constant for the clip's full duration -- a
// synthesis artifact, not real wind/ambient texture). At its native level
// (~-61 to -64dB raw) this would be inaudible, but the universal
// loudnorm=I=-16 step below tries to bring EVERY clip's integrated loudness
// up to the same -16 LUFS target regardless of how quiet its actual content
// is -- on a clip this quiet, that means a large gain boost, which turned
// the faint rumble into a loud broadband hiss across nearly the whole
// spectrum (measured -17.8dB mean after loudnorm, vs -61.6dB raw). THIS,
// not the raw artifact itself, is the actual root cause of the "noise in
// the background" the owner reported. Root-caused and fixed below by
// skipping loudnorm entirely for this clip (see CLIP_SKIP_LOUDNORM) rather
// than trying to filter around a problem loudnorm itself was creating.
// The highpass still runs as a light safety net against the underlying
// rumble at its native (now un-amplified) level.
const CLIP_HIGHPASS = {
  clip10B: 150,
};

// See CLIP_HIGHPASS above: clips that are deliberately near-silent
// (diegetic-audio-free, relying entirely on the shared score) must not be
// run through loudnorm's fixed -16 LUFS integrated-loudness target, which
// otherwise amplifies whatever quiet noise floor exists into an audible
// hiss. These clips get the highpass (if any) and fade/click-guard only.
const CLIP_SKIP_LOUDNORM = new Set(["clip10B"]);

function ambientBedFilterComplex(inputDuration, dialogueLabel) {
  return (
    `[1:a]lowpass=f=500,lowpass=f=500,volume=0.025,asetpts=PTS-STARTPTS[bed];` +
    `${dialogueLabel}asetpts=PTS-STARTPTS[dial2];` +
    `[dial2][bed]amix=inputs=2:duration=longest:dropout_transition=0:normalize=0,` +
    `aresample=async=1:first_pts=0,asetpts=PTS-STARTPTS[aout]`
  );
}

async function qcOneClip(clip, { isFirst, isLast }) {
  const srcPath = path.join(ASSETS_DIR, `${clip.id}_v1.mp4`);
  const outPath = path.join(QC_DIR, `${clip.id}_qc.mp4`);

  const videoDuration = await probeVideoDuration(srcPath);
  const headTrim = CLIP_HEAD_TRIM[clip.id] || 0;
  const availableDuration = videoDuration - headTrim;
  const outputDuration = CLIP_TRIM[clip.id] ? Math.min(CLIP_TRIM[clip.id], availableDuration) : availableDuration;
  const trimNote = CLIP_TRIM[clip.id] ? ` (trimmed from ${videoDuration}s to ${outputDuration}s per owner request)` : "";
  const headTrimNote = headTrim ? ` (head-trimmed ${headTrim}s per owner request)` : "";
  // -ss before -i re-bases the stream's own PTS to 0 at the seek point, so
  // any caption times burned via the ass filter must shift by the same
  // amount to stay synced to the actual (now-shifted) dialogue audio.
  const seekArgs = headTrim ? ["-ss", String(headTrim)] : [];

  const fadeParts = [];
  if (isFirst) fadeParts.push(`afade=t=in:st=0:d=${CLICK_GUARD}`);
  if (isLast) fadeParts.push(`afade=t=out:st=${(outputDuration - CLICK_GUARD).toFixed(3)}:d=${CLICK_GUARD}`);
  const fadeSuffix = fadeParts.length ? `,${fadeParts.join(",")}` : "";
  const hasBed = CLIP_AMBIENT_BED.has(clip.id);
  const highpassHz = CLIP_HIGHPASS[clip.id];
  const highpassPrefix = highpassHz ? `highpass=f=${highpassHz},` : "";
  const skipLoudnorm = CLIP_SKIP_LOUDNORM.has(clip.id);
  const audioChain = skipLoudnorm
    ? `${highpassPrefix}anull${fadeSuffix}`
    : `${highpassPrefix}loudnorm=I=-16:TP=-1.5:LRA=11${fadeSuffix}`;
  const noteParts = [];
  if (fadeParts.length) noteParts.push(`outer-edge click-guard (${CLICK_GUARD * 1000}ms)`);
  if (hasBed) noteParts.push("synthesized ambient-bed mix to kill dead-silent tail");
  if (highpassHz) noteParts.push(`${highpassHz}Hz highpass to remove a low-frequency noise artifact`);
  if (skipLoudnorm) noteParts.push("loudnorm SKIPPED (deliberately near-silent clip -- loudnorm would amplify it into audible noise)");
  const fadeNote = noteParts.length ? noteParts.join(" + ") : "no fade -- true hard audio join per §29";

  const bedInputArgs = hasBed
    ? ["-f", "lavfi", "-i", `anoisesrc=color=brown:amplitude=1:sample_rate=44100:duration=${outputDuration + 1}`]
    : [];

  if (clip.captions.length === 0) {
    console.log(`[qc] ${clip.id}: no captions, ${skipLoudnorm ? "" : "loudnorm + "}${fadeNote}${trimNote}${headTrimNote}`);
    if (hasBed) {
      await run("ffmpeg", [
        "-y", ...seekArgs, "-i", srcPath, ...bedInputArgs,
        "-filter_complex", `[0:a]${audioChain}[dial];${ambientBedFilterComplex(outputDuration, "[dial]")}`,
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
        "-t", String(outputDuration),
        outPath,
      ]);
    } else {
      await run("ffmpeg", [
        "-y", ...seekArgs, "-i", srcPath,
        "-af", `${audioChain}`,
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k",
        "-t", String(outputDuration),
        outPath,
      ]);
    }
    return { outPath, videoDuration: outputDuration };
  }

  const assPath = path.join(QC_DIR, `${clip.id}.ass`);
  const shiftedCaptions = headTrim
    ? clip.captions.map((c) => ({ ...c, start: Math.max(0, c.start - headTrim), end: Math.max(0, c.end - headTrim) }))
    : clip.captions;
  await fs.writeFile(assPath, buildAss(shiftedCaptions));

  console.log(`[qc] ${clip.id}: burning ${clip.captions.length} caption(s) + ${skipLoudnorm ? "" : "loudnorm + "}${fadeNote}${trimNote}${headTrimNote}`);
  if (hasBed) {
    await run("ffmpeg", [
      "-y", ...seekArgs, "-i", srcPath, ...bedInputArgs,
      "-filter_complex",
      `[0:v]ass=${assPath}[vout];[0:a]${audioChain}[dial];${ambientBedFilterComplex(outputDuration, "[dial]")}`,
      "-map", "[vout]", "-map", "[aout]",
      "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "192k",
      "-t", String(outputDuration),
      outPath,
    ]);
  } else {
    await run("ffmpeg", [
      "-y", ...seekArgs, "-i", srcPath,
      "-vf", `ass=${assPath}`,
      "-af", `${audioChain}`,
      "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "192k",
      "-t", String(outputDuration),
      outPath,
    ]);
  }
  return { outPath, videoDuration: outputDuration };
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
