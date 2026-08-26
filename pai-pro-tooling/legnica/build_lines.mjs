// Builds lines.json (rough line-level windows) for make_word_chunks.py.
// Rough windows only -- whisper does the precise per-word alignment;
// these just seed initial_prompt matching and clamp interpolation.
import fs from "node:fs/promises";

const DURATIONS = JSON.parse(await fs.readFile(new URL("./qc/durations.json", import.meta.url), "utf8"));

const LINES = {
  clip1: [
    { start: 0.2, end: 5.5, text: "April, 1241. Europe is about to face the Mongols." },
  ],
  clip1B: [
    { start: 1.0, end: 3.0, text: "Grandsons of Genghis Khan..." },
    { start: 3.2, end: 6.0, text: "You already burned Beijing to the ground. Why are you here?" },
    { start: 7.0, end: 9.5, text: "The world is not so easily finished." },
  ],
  clip2: [
    { start: 0.5, end: 2.5, text: "Duke Henry the Second. He's leading them." },
    { start: 3.0, end: 4.5, text: "How many are we fighting?" },
    { start: 5.0, end: 6.2, text: "Enough." },
    { start: 9.0, end: 10.8, text: "Hold the line!" },
  ],
  clip3: [
    { start: 0.3, end: 1.4, text: "They're moving—" },
    { start: 5.0, end: 6.6, text: "Wait— they're retreating?" },
    { start: 7.5, end: 11.6, text: "No. Watch. This is what they do — they lure you into chasing them, then they turn back and finish you." },
  ],
  clip4: [
    { start: 0.5, end: 2.0, text: "They're fleeing! After them!" },
    { start: 2.3, end: 4.2, text: "No— don't chase them!" },
  ],
  clip5: [
    { start: 3.5, end: 8.0, text: "They pulled them straight out of formation. Just like I told them—" },
  ],
  clip6: [],
  clip7: [
    { start: 1.0, end: 4.8, text: "They aren't fighting us head-on—they're SURROUNDING us!" },
  ],
  clip8: [
    { start: 1.0, end: 4.8, text: "Henry's still fighting... they're surrounding him." },
  ],
  clip9: [
    { start: 1.4, end: 2.4, text: "No—" },
  ],
  clip10: [
    { start: 1.8, end: 4.2, text: "Henry II is dead." },
  ],
  clip10B: [],
  clip11: [
    { start: 2.3, end: 4.8, text: "Legnica... 1241." },
  ],
};

const order = ["clip1","clip1B","clip2","clip3","clip4","clip5","clip6","clip7","clip8","clip9","clip10","clip10B","clip11"];
const out = order.map((id) => ({ id, duration: DURATIONS[id], captions: LINES[id] }));
await fs.writeFile(new URL("./lines.json", import.meta.url), JSON.stringify(out, null, 2));
console.log("wrote lines.json:", out.length, "clips");
