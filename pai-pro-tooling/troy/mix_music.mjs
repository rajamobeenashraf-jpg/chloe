// Episode 7 (Troy) — mixes the owner-approved episode score into the final
// cut. Music enters as a separate audio layer under the existing
// dialogue+captions cut (troy_final_cut.mp4, produced by build_final_cut.mjs)
// per EDITING_HANDOFF.md §3: ONE continuous generated score, ducked under
// dialogue via sidechain compression rather than manual volume automation
// (dialogue stays forward everywhere it's present; music fills the gaps).
//
// Usage: node mix_music.mjs
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs/promises";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const ASSETS_DIR = path.join(PROJECT_DIR, "assets");
const QC_DIR = path.join(PROJECT_DIR, "qc");

const CUT_PATH = path.join(ASSETS_DIR, "troy_final_cut.mp4");
const SCORE_RAW = "/tmp/claude-0/-home-user-chloe/7ac2ab27-846b-513a-a43d-cf2fae9c942b/scratchpad/score/score_scene_matched.mp3";
const DIALOGUE_WAV = path.join(ASSETS_DIR, "_dialogue_extract.wav");
const SCORE_TRIMMED = path.join(ASSETS_DIR, "_score_trimmed.wav");
const GATE_WAV = path.join(ASSETS_DIR, "_duck_gate.wav");
const MIXED_AUDIO = path.join(ASSETS_DIR, "_mixed_audio.wav");
const OUT_PATH = path.join(ASSETS_DIR, "troy_final_cut_scored.mp4");

async function probeDuration(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1", filePath,
  ]);
  return parseFloat(stdout.trim());
}

async function probeVideoStreamDuration(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=duration",
    "-of", "default=noprint_wrappers=1:nokey=1", filePath,
  ]);
  return parseFloat(stdout.trim());
}

async function probeFrameCount(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-count_frames", "-show_entries", "stream=nb_read_frames",
    "-of", "default=noprint_wrappers=1:nokey=1", filePath,
  ]);
  return parseInt(stdout.trim(), 10);
}

async function main() {
  // The video STREAM's own duration (not the container's format=duration,
  // which can read slightly longer off the audio track) is the authoritative
  // target -- same principle build_final_cut.mjs's own frame-count check
  // uses. A first pass here (see episode-7-production-log.md) trusted
  // format=duration, let ffmpeg's -shortest pick the audio track instead,
  // and silently dropped ~0.45s / 11 frames off the end -- exactly the
  // silent-truncation failure mode build_final_cut.mjs already guards
  // against on the dialogue-only cut. This pass verifies frame count the
  // same way rather than trusting any single duration probe.
  const targetDuration = await probeVideoStreamDuration(CUT_PATH);
  const targetFrames = await probeFrameCount(CUT_PATH);
  console.log(`[mix] target: ${targetDuration.toFixed(3)}s / ${targetFrames} frames (video stream, authoritative)`);

  console.log("[mix] extracting dialogue track...");
  await run("ffmpeg", ["-y", "-i", CUT_PATH, "-vn", "-acodec", "pcm_s16le", "-ar", "48000", DIALOGUE_WAV]);

  // Build a clean sidechain trigger from the MEASURED caption windows
  // (build_duck_envelope.mjs) instead of the real dialogue+ambient audio.
  // qc_pass.mjs's loudnorm runs per-clip on the whole clip (dialogue +
  // ambient together), so ambient bed reads at a fairly constant level
  // whether or not anyone is speaking -- keying the sidechain off that
  // signal ducks the score almost uniformly across a clip instead of only
  // during actual speech (measured: <0.6dB difference between a real 2s
  // caption-free pause and a dense-dialogue window on the first attempt).
  // A single volume expression summing between(t,start,end) over every
  // merged speech window turns a full-scale tone on only during real
  // speech and off during real gaps; sidechaincompress's own attack/
  // release then gives the music a smooth, not stepped, duck/recover.
  // Built by concatenating silence/tone segments rather than a single
  // volume='between(t,a,b)+between(t,c,d)+...':eval=frame expression --
  // that expression approach was tried first and is broken in this ffmpeg
  // build: isolated test showed a two-term sum staying "on" (gate=1) past
  // the end of the SECOND window instead of returning to silence, i.e. it
  // doesn't cleanly re-close after the first true gap. Concatenating real
  // anullsrc/sine segments sidesteps whatever that per-frame eval quirk is.
  const duckWindows = JSON.parse(await fs.readFile(path.join(QC_DIR, "duck_windows.json"), "utf8"));
  console.log(`[mix] building duck-gate track from ${duckWindows.length} measured speech windows (segment concat)...`);
  const segDir = path.join(QC_DIR, "_gate_segments");
  await fs.mkdir(segDir, { recursive: true });
  const segFiles = [];
  let cursor = 0;
  let segN = 0;
  const MIN_SEG = 0.02;
  for (const [s, e] of duckWindows) {
    if (s - cursor > MIN_SEG) {
      const f = path.join(segDir, `seg${segN++}_silence.wav`);
      await run("ffmpeg", ["-y", "-f", "lavfi", "-i", `anullsrc=r=48000:cl=mono:d=${(s - cursor).toFixed(3)}`, f]);
      segFiles.push(f);
    }
    const f = path.join(segDir, `seg${segN++}_tone.wav`);
    await run("ffmpeg", ["-y", "-f", "lavfi", "-i", `sine=frequency=200:sample_rate=48000:duration=${(e - s).toFixed(3)}`, f]);
    segFiles.push(f);
    cursor = e;
  }
  if (targetDuration - cursor > MIN_SEG) {
    const f = path.join(segDir, `seg${segN++}_silence.wav`);
    await run("ffmpeg", ["-y", "-f", "lavfi", "-i", `anullsrc=r=48000:cl=mono:d=${(targetDuration - cursor).toFixed(3)}`, f]);
    segFiles.push(f);
  }
  // The concat DEMUXER (text-file-list) was tried first and produced a
  // constant near-tone level throughout regardless of segment content --
  // each WAV segment carries its own self-contained RIFF header, which the
  // demuxer doesn't reliably splice across for this format. The concat
  // FILTER (same mechanism build_final_cut.mjs already uses for video)
  // decodes real samples instead, which is what actually respects each
  // segment's content.
  const gateInputs = segFiles.flatMap((f) => ["-i", f]);
  const gateFilter = segFiles.map((_, i) => `[${i}:a]`).join("") + `concat=n=${segFiles.length}:v=0:a=1[out]`;
  await run("ffmpeg", ["-y", ...gateInputs, "-filter_complex", gateFilter, "-map", "[out]", "-ar", "48000", GATE_WAV]);

  const fadeStart = Math.max(0, targetDuration - 1.5);
  console.log(`[mix] trimming score to ${targetDuration.toFixed(3)}s with a ${(targetDuration - fadeStart).toFixed(2)}s tail fade...`);
  await run("ffmpeg", [
    "-y", "-i", SCORE_RAW,
    "-af", `afade=t=in:st=0:d=1.5,afade=t=out:st=${fadeStart.toFixed(3)}:d=${(targetDuration - fadeStart).toFixed(3)},apad=whole_dur=${targetDuration.toFixed(3)}`,
    "-t", targetDuration.toFixed(3),
    "-ar", "48000", "-ac", "2",
    SCORE_TRIMMED,
  ]);

  // Sidechain-duck the score against the clean gate track (not the noisy
  // dialogue+ambient audio -- see comment above) then mix the ducked score
  // under the untouched, already-loudnorm'd dialogue. apad+-t guarantees
  // the mixed output is never shorter than the video target regardless of
  // the dialogue extract's own (observed slightly-short) length.
  //
  // Owner (round 4): the music is too loud overall, AND two specific clips
  // (clip1's opening thesis statement, clip9's multi-voice horse-joke
  // scene) should have NO music at all -- a clean opening hook and a
  // dense, fast, overlapping-dialogue comedy scene both read better
  // against a dry background than under a musical bed. Base volume cut
  // 0.55->0.32 (~-4.7dB further reduction) and duck ratio deepened 6->9
  // for a more subordinate presence during speech; MUTE_WINDOWS zeroes
  // the score entirely (not just ducked) across those two clips'
  // absolute-timeline spans, verified in isolation via a throwaway
  // enable=between() test before trusting it here (execFile passes argv
  // with no shell, so the comma inside between(t,a,b) needs a literal
  // backslash -- "\\," in the JS source -- to survive as an escape
  // character in ffmpeg's OWN filtergraph grammar, not a shell one).
  const MUTE_WINDOWS = [
    [0, 9.041667], // clip1 -- opening thesis statement
    [83.333336, 91.375003], // clip9 -- horse-joke scene, multi-voice
  ];
  const muteFilters = MUTE_WINDOWS
    .map(([s, e]) => `,volume=0:enable=between(t\\,${s.toFixed(6)}\\,${e.toFixed(6)})`)
    .join("");

  console.log("[mix] building sidechain-ducked mix (gated on measured speech windows, muted on clip1/clip9)...");
  await run("ffmpeg", [
    "-y",
    "-i", DIALOGUE_WAV,
    "-i", SCORE_TRIMMED,
    "-i", GATE_WAV,
    "-filter_complex",
    `[1:a]volume=0.32${muteFilters}[music_quiet];` +
      "[music_quiet][2:a]sidechaincompress=threshold=0.05:ratio=9:attack=120:release=600:makeup=1[music_ducked];" +
      `[0:a][music_ducked]amix=inputs=2:duration=longest:normalize=0[premix];` +
      `[premix]apad=whole_dur=${targetDuration.toFixed(3)}[aout]`,
    "-map", "[aout]",
    "-t", targetDuration.toFixed(3),
    "-ar", "48000",
    MIXED_AUDIO,
  ]);

  console.log("[mix] remuxing scored audio onto the video (video stream untouched, no -shortest)...");
  await run("ffmpeg", [
    "-y", "-i", CUT_PATH, "-i", MIXED_AUDIO,
    "-map", "0:v", "-map", "1:a",
    "-c:v", "copy",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    OUT_PATH,
  ]);

  const outFrames = await probeFrameCount(OUT_PATH);
  const outDuration = await probeVideoStreamDuration(OUT_PATH);
  console.log(`[mix] done -> ${OUT_PATH} (${outDuration.toFixed(3)}s, ${outFrames} frames; expected ${targetDuration.toFixed(3)}s / ${targetFrames} frames)`);
  if (outFrames !== targetFrames) {
    throw new Error(`FRAME COUNT MISMATCH after music mix: got ${outFrames}, expected ${targetFrames} -- do not ship`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
