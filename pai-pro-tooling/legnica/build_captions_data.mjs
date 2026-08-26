import fs from "node:fs/promises";

const chunks = JSON.parse(await fs.readFile(new URL("./word_chunks_legnica.json", import.meta.url), "utf8"));
const durations = JSON.parse(await fs.readFile(new URL("./qc/durations.json", import.meta.url), "utf8"));
const order = ["clip1","clip1B","clip2","clip3","clip4","clip5","clip6","clip7","clip8","clip9","clip10","clip10B","clip11"];
const CLIPS = order.map((id) => ({
  id,
  duration: durations[id],
  captions: (chunks[id] || []).map(([start, end, text]) => ({ start, end, text })),
}));

const header = `// Legnica episode — caption cue data for qc_pass.mjs.
// Word-synced CHUNK captions per the owner-locked caption system
// (CLAUDE.md): 1-2 word ALL-CAPS chunks, each replacing the previous,
// on screen only while spoken; pauses >= 0.35s leave the screen
// caption-free; hard cut in/out, no animation, serif style (SUB_STYLE).
//
// TIMING SOURCE: measured per-word timestamps from faster-whisper
// (small.en, int8, script-biased initial_prompt), run via
// make_word_chunks.py on each clip's own rendered audio. Script text is
// ground truth; whisper only carries timing. Manual correction applied
// to clip2 (corrections.json) after frame-verification found the
// interpolated opening-line window compressed/mistimed against actual
// visible speech, plus a zero-duration "ENOUGH." cue that would not
// have displayed at all — see production log for the full diagnosis.
// clip6 and clip10B have no dialogue (music/visual-only clips).

export const CLIPS = ${JSON.stringify(CLIPS, null, 2)};

export const SUB_STYLE = {
  fontName: "Liberation Serif",
  fontSize: 50,
  outline: 2,
  shadow: 1,
  marginV: 320,
  marginLR: 60,
  spacing: 2.5,
};
`;

await fs.writeFile(new URL("./captions_data.mjs", import.meta.url), header);
console.log("wrote captions_data.mjs");
