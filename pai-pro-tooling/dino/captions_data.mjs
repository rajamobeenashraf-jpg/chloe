// Episode 5 (Hell Creek, 66,000,000 BC) — caption cue data for qc_pass.mjs.
//
// Ep5 has NO human NPC speech (solo carry, Tank doesn't talk) — every caption
// is hers, so unlike Salem/other episodes there is no [Speaker] tag need.
// Timing MUST be filled in from real ffmpeg silencedetect + mouth-frame
// cross-check against each clip's actual rendered audio once all 10 clips
// are generated — per creative-direction.md §16, never guessed from the
// generation-prompt text below. The `text` fields ARE the exact words each
// clip's prompt requested (source of truth for what she should be saying);
// `start`/`end` are placeholders (TODO) to be replaced with measured times.

export const CLIPS = [
  {
    id: "clip1_vista_v2",
    duration: null, // TODO: ffprobe
    captions: [
      { start: null, end: null, text: "Sixty-six million years BC. Hell Creek. Tuesday." },
      { start: null, end: null, text: "This is the whole world right now — no cities, no roads, no smoke on any horizon." },
      { start: null, end: null, text: "And in about four hours, a rock six miles wide hits Mexico, and today becomes the worst day in the history of life on Earth." },
      { start: null, end: null, text: "Nobody here knows. Nobody here even knows what a Mexico is." },
    ],
  },
  {
    id: "clip2_mudgear",
    duration: null,
    captions: [
      { start: null, end: null, text: "No costume department in the Cretaceous. Mud — it's SPF, it's bug spray, it's couture." },
      { start: null, end: null, text: "And I brought a bike bell. For herding. You laugh — wait." },
    ],
  },
  {
    id: "clip3_tankrescue",
    duration: null,
    captions: [
      { start: null, end: null, text: "You're built like a coffee table and you fight like one. Tank. Your name is Tank." },
      { start: null, end: null, text: "Don't eat that." },
    ],
  },
  {
    id: "clip4_foodreview",
    duration: null,
    captions: [
      { start: null, end: null, text: "Fruit is BRAND new this era. I'm eating the beta version." },
      { start: null, end: null, text: "5/10 — mostly seeds and ambition." },
      { start: null, end: null, text: "Don't eat that either. It's MINE." },
    ],
  },
  {
    id: "clip5_rexsighting",
    duration: null,
    captions: [
      { start: null, end: null, text: "That's the celebrity. And the entire reason we are not going that way." },
      { start: null, end: null, text: "You are the worst hiding partner in sixty-six million years." },
    ],
  },
  {
    id: "clip6_walkingaside",
    duration: null,
    captions: [
      { start: null, end: null, text: "Everyone here is having a completely normal Tuesday. The rock is already closer than the Moon." },
      { start: null, end: null, text: "I did the math, rang my little bell, and kept walking — because what ELSE do you do?" },
    ],
  },
  {
    id: "clip7_pivot",
    duration: null,
    captions: [
      { start: null, end: null, text: "...That was three thousand kilometers away." },
      { start: null, end: null, text: "It's starting." },
    ],
  },
  {
    id: "clip8_skyturn",
    duration: null,
    captions: [
      { start: null, end: null, text: "Move. MOVE. Under the bank — GO." },
    ],
  },
  {
    id: "clip9_shelter",
    duration: null,
    captions: [
      { start: null, end: null, text: "We stay." },
      { start: null, end: null, text: "We stay till it stops." },
    ],
  },
  {
    id: "clip10_outro",
    duration: null,
    captions: [
      { start: null, end: null, text: "It's snowing. It isn't snow." },
      { start: null, end: null, text: "This exact day becomes a one-centimeter line in the rocks — walk into any museum in 2026 and you can touch this Tuesday." },
      { start: null, end: null, text: "Hi, grandma." },
      { start: null, end: null, text: "Hazel — out of time." },
    ],
  },
];

// Ep5 = one continuous linear day (OPENING LAW, no rewind card), every
// transition is a TRUE HARD CUT per creative-direction.md §16 — no dissolves
// anywhere (confirmed root cause on 2 prior episodes: independently
// generated clips never blend clean regardless of duration).
export const TRANSITIONS = [
  { after: "clip1_vista_v2", type: "cut" },
  { after: "clip2_mudgear", type: "cut" },
  { after: "clip3_tankrescue", type: "cut" },
  { after: "clip4_foodreview", type: "cut" },
  { after: "clip5_rexsighting", type: "cut" },
  { after: "clip6_walkingaside", type: "cut" },
  { after: "clip7_pivot", type: "cut" },
  { after: "clip8_skyturn", type: "cut" },
  { after: "clip9_shelter", type: "cut" },
];

// Canonical caption style, owner-locked 2026-08-20 (creative-direction.md §16).
export const SUB_STYLE = {
  fontName: "DejaVu Sans",
  fontSize: 42,
  outline: 2.6,
  shadow: 1.2,
  marginV: 320,
  marginLR: 60,
};

// No title card in Ep5 — OPENING LAW retired the "EARLIER TODAY" convention;
// the whole episode is linear, one continuous day, no rewind.
export const CARD_STYLE = null;
