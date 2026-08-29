// Builds legnica_final_cut.srt from the current captions_data.mjs + the
// current qc/durations.json clip order/durations, using global timeline
// offsets. Run whenever captions or clip durations change, before any
// Gemini-eyes `captions` cross-check -- the .srt must reflect the CURRENT
// assembled cut, not a stale snapshot from an earlier point in editing.
import fs from "node:fs/promises";
import path from "node:path";
import { CLIPS } from "./captions_data.mjs";

const PROJECT_DIR = new URL(".", import.meta.url).pathname;

function srtTime(t) {
  const ms = Math.round(t * 1000);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const msRem = ms % 1000;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(msRem).padStart(3, "0")}`;
}

async function main() {
  const manifest = JSON.parse(await fs.readFile(path.join(PROJECT_DIR, "qc", "durations.json"), "utf8"));
  let offset = 0;
  let idx = 1;
  const blocks = [];
  for (const clip of CLIPS) {
    const duration = manifest[clip.id];
    for (const cue of clip.captions) {
      const start = offset + cue.start;
      const end = offset + Math.min(cue.end, duration);
      blocks.push(`${idx}\n${srtTime(start)} --> ${srtTime(end)}\n${cue.text}\n`);
      idx++;
    }
    offset += duration;
  }
  const outPath = path.join(PROJECT_DIR, "legnica_final_cut.srt");
  await fs.writeFile(outPath, blocks.join("\n"));
  console.log(`wrote ${outPath} (${idx - 1} cues, total timeline ${offset.toFixed(3)}s)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
