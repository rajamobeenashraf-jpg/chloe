// Episode 2 (Salem 1692) — final cut assembly. Rebuilt from scratch this
// session per creative-direction.md §11 (original tooling lost with the
// old container). Stitches the 12 QC'd clips (qc/*.mp4, captions + loudnorm
// already applied) plus one inserted title card into a single Short:
// - Two distinct join types, per-transition (captions_data.mjs
//   TRANSITIONS): TRUE zero-blend hard cuts (plain concat) across scene/
//   location changes, xfade+acrossfade dissolves across genuinely
//   continuous action (clips 6-11, one unbroken fit->calm->turn->defend->
//   escape->rescue escalation). This was tightened mid-build: an initial
//   pass used a very short (0.12s) xfade for the "cut" category, matching
//   Ep 1's precedent, but visual QC caught real double-exposure ghosting
//   on several of those joins — this footage swings framing/background far
//   more between consecutive clips than Ep 1's did, so even a 0.12s blend
//   visibly overlapped two mismatched faces. A true hard cut has no blend
//   window, so there's nothing to ghost.
// - Offsets/durations are computed from qc/durations.json (frame-exact
//   per-clip video durations written by qc_pass.mjs), not re-measured or
//   guessed, so the dissolve chain stays frame-locked without drifting
//   across the accumulated transitions.
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { CLIPS, TRANSITIONS, CARD_STYLE } from "./captions_data.mjs";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const QC_DIR = path.join(PROJECT_DIR, "qc");
const ASSETS_DIR = path.join(PROJECT_DIR, "assets");
const CARD_PATH = path.join(QC_DIR, "card_earlier_that_day.mp4");

async function probeVideoDuration(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    filePath,
  ]);
  return parseFloat(stdout.trim());
}

async function buildCard() {
  const fontPath = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf";
  const text = TRANSITIONS.find((t) => t.type === "card").cardText;
  console.log(`[cut] building title card: "${text}"`);
  await run("ffmpeg", [
    "-y",
    "-f", "lavfi", "-i", `color=c=black:s=720x1280:d=${CARD_STYLE.durationSec}:r=24`,
    "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
    "-vf", `drawtext=text='${text}':fontfile=${fontPath}:fontsize=${CARD_STYLE.fontSize}:fontcolor=${CARD_STYLE.fontcolor}:borderw=${CARD_STYLE.borderw}:bordercolor=${CARD_STYLE.bordercolor}:x=(w-text_w)/2:y=(h-text_h)/2`,
    "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k",
    "-t", String(CARD_STYLE.durationSec),
    CARD_PATH,
  ]);
  return CARD_PATH;
}

async function main() {
  await fs.mkdir(ASSETS_DIR, { recursive: true });

  const manifest = JSON.parse(await fs.readFile(path.join(QC_DIR, "durations.json"), "utf8"));
  const cardPath = await buildCard();
  const cardDuration = await probeVideoDuration(cardPath);
  console.log(`[cut] card duration: ${cardDuration}s`);

  // Build the ordered segment list: clip1, card, clip2, clip3, ... clip12,
  // with the transition duration that PRECEDES each segment (segment 0 has
  // none). This mirrors captions_data.mjs's TRANSITIONS array, which is
  // indexed by "the clip after which this transition happens" — splice the
  // card in right after clip1's entry.
  const segments = [];
  for (const clip of CLIPS) {
    segments.push({ path: path.join(QC_DIR, `${clip.id}_qc.mp4`), duration: manifest[clip.id], label: clip.id });
    if (clip.id === "clip1_coldopen") {
      segments.push({ path: cardPath, duration: cardDuration, label: "card" });
    }
  }
  // blendDurations[i] = transition between segments[i] and segments[i+1].
  // 0 (or absent) means a true hard cut (concat, no blend window at all);
  // >0 means an xfade/acrossfade dissolve of that duration.
  const blendDurations = [];
  for (const clip of CLIPS) {
    const t = TRANSITIONS.find((t) => t.after === clip.id);
    if (!t) continue;
    if (t.type === "card") {
      blendDurations.push(0); // clip1 -> card, hard cut (both sides already black)
      blendDurations.push(0); // card -> clip2, hard cut
    } else {
      blendDurations.push(t.blend ?? 0);
    }
  }

  if (segments.length !== blendDurations.length + 1) {
    throw new Error(`segment/transition count mismatch: ${segments.length} segments, ${blendDurations.length} transitions`);
  }

  console.log(`[cut] ${segments.length} segments, ${blendDurations.length} transitions:`);
  segments.forEach((s, i) => {
    const t = blendDurations[i];
    const label = i < blendDurations.length ? (t > 0 ? `  --xfade ${t}s-->` : "  --hard cut-->") : "";
    console.log(`  [${i}] ${s.label} (${s.duration.toFixed(3)}s)${label}`);
  });

  // Mixing the concat filter and xfade in one filter_complex graph fails
  // outright (ffmpeg: "Failed to configure output pad on Parsed_xfade" /
  // "Error reinitializing filters") — confirmed by hitting it directly on
  // this exact chain. So: split into RUNS of consecutive same-type
  // transitions (all-cut or all-dissolve), render each run as its own
  // ffmpeg pass to an intermediate file, and feed that file in as the
  // first input of the next run — each run internally is a single
  // homogeneous filter_complex (proven to work), and runs themselves chain
  // via plain file handoff rather than a shared graph.
  const runs = [];
  let runStart = 0;
  for (let i = 1; i <= blendDurations.length; i++) {
    const prevType = blendDurations[i - 1] > 0;
    const curType = i < blendDurations.length ? blendDurations[i] > 0 : null;
    if (curType === null || curType !== prevType) {
      runs.push({ startSeg: runStart, endSeg: i, isDissolve: prevType });
      runStart = i;
    }
  }
  console.log(`[cut] ${runs.length} run(s): ${runs.map((r) => `[${r.startSeg}-${r.endSeg}]${r.isDissolve ? "dissolve" : "cut"}`).join(", ")}`);

  let carrySegment = segments[0]; // either the raw first segment, or the previous run's output file
  for (let r = 0; r < runs.length; r++) {
    const { startSeg, endSeg, isDissolve } = runs[r];
    const runSegments = [carrySegment, ...segments.slice(startSeg + 1, endSeg + 1)];
    const runBlends = blendDurations.slice(startSeg, endSeg);
    const isLastRun = r === runs.length - 1;
    const outPath = isLastRun ? path.join(ASSETS_DIR, "salem_final_cut.mp4") : path.join(QC_DIR, `stage${r}.mp4`);

    console.log(`[cut] run ${r} (${isDissolve ? "dissolve chain" : "hard-cut concat"}): ${runSegments.map((s) => s.label).join(" -> ")} => ${path.basename(outPath)}`);

    const inputs = runSegments.flatMap((s) => ["-i", s.path]);
    const filters = [];
    let vLabel = "0:v", aLabel = "0:a";
    let dur = runSegments[0].duration;
    for (let i = 1; i < runSegments.length; i++) {
      const t = runBlends[i - 1];
      const vOut = `v${i}`, aOut = `a${i}`;
      if (isDissolve) {
        const offset = dur - t;
        filters.push(`[${vLabel}][${i}:v]xfade=transition=fade:duration=${t}:offset=${offset.toFixed(6)}[${vOut}]`);
        filters.push(`[${aLabel}][${i}:a]acrossfade=d=${t}[${aOut}]`);
        dur = dur + runSegments[i].duration - t;
      } else {
        filters.push(`[${vLabel}][${aLabel}][${i}:v][${i}:a]concat=n=2:v=1:a=1[${vOut}][${aOut}]`);
        dur = dur + runSegments[i].duration;
      }
      vLabel = vOut; aLabel = aOut;
    }

    await run("ffmpeg", [
      "-y", ...inputs,
      "-filter_complex", filters.join(";\n"),
      "-map", `[${vLabel}]`, "-map", `[${aLabel}]`,
      "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
      outPath,
    ], { maxBuffer: 1024 * 1024 * 64 });

    const outDuration = await probeVideoDuration(outPath);
    console.log(`[cut]   -> ${outDuration.toFixed(3)}s (predicted ${dur.toFixed(3)}s)`);
    carrySegment = { path: outPath, duration: outDuration, label: `stage${r}` };
  }

  const masterPath = path.join(ASSETS_DIR, "salem_final_cut.mp4");
  console.log(`[cut] master written: ${masterPath}`);

  const actualDuration = await probeVideoDuration(masterPath);
  console.log(`[cut] actual final runtime: ${actualDuration.toFixed(2)}s`);

  // Delivery/review copy — lower bitrate, smaller file for chat delivery.
  const compressedPath = path.join(ASSETS_DIR, "salem_final_cut_compressed.mp4");
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
