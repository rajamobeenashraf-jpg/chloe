// Episode 7 (Troy) — computes absolute-timeline "speech active" windows
// from the measured caption cue data, for precise music ducking.
//
// Why not audio-signal sidechain: qc_pass.mjs's loudnorm runs per-clip on
// the WHOLE clip (dialogue + ambient together), so ambient bed (fire
// crackle, surf) reads at a fairly constant level throughout each clip
// whether or not anyone is speaking -- a sidechain keyed off that signal
// ducks the score almost uniformly across a clip instead of only during
// actual speech (confirmed empirically: measured level in a real 2s
// caption-free pause was within 0.6dB of a dense-dialogue window). The
// caption cue timestamps ARE the actual measured speech windows (faster-
// whisper per-word data), so use those directly instead.
//
// Adjacent cues within MERGE_GAP of each other are joined into one
// continuous speech window -- ducking shouldn't flutter up/down for a
// normal 0.4-0.6s breath mid-line; only real pauses should let the score
// swell back up.
import { CLIPS } from "./captions_data.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const PROJECT_DIR = new URL(".", import.meta.url).pathname;
const QC_DIR = path.join(PROJECT_DIR, "qc");
const MERGE_GAP = 1.0;

async function main() {
  const manifest = JSON.parse(await fs.readFile(path.join(QC_DIR, "durations.json"), "utf8"));
  let offset = 0;
  const windows = [];
  for (const clip of CLIPS) {
    for (const c of clip.captions) {
      windows.push([offset + c.start, offset + c.end]);
    }
    offset += manifest[clip.id];
  }
  windows.sort((a, b) => a[0] - b[0]);

  const merged = [];
  for (const [s, e] of windows) {
    if (merged.length && s - merged[merged.length - 1][1] <= MERGE_GAP) {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], e);
    } else {
      merged.push([s, e]);
    }
  }

  const totalSpeech = merged.reduce((sum, [s, e]) => sum + (e - s), 0);
  console.log(`[duck] ${windows.length} caption cues -> ${merged.length} merged speech windows (gap<=${MERGE_GAP}s joined)`);
  console.log(`[duck] total speech-active time: ${totalSpeech.toFixed(1)}s of ${offset.toFixed(1)}s`);

  const outPath = path.join(QC_DIR, "duck_windows.json");
  await fs.writeFile(outPath, JSON.stringify(merged, null, 1));
  console.log(`[duck] windows -> ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
