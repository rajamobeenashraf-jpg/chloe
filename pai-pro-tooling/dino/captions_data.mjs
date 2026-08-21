// Episode 5 (Hell Creek, 66,000,000 BC) — caption cue data for qc_pass.mjs.
//
// Ep5 has NO human NPC speech (solo carry, Tank doesn't talk) — every caption
// is hers, so unlike Salem/other episodes there is no [Speaker] tag need.
//
// TIMING METHOD (documented per creative-direction.md §16's "never guessed"
// rule): started from ffmpeg silencedetect on each clip's real rendered
// audio. The naive "N-1 largest silence gaps = sentence breaks" algorithm
// (the method that worked cleanly in prior episodes) produced physically
// impossible results here on several clips (up to 132 words/sec) because
// these clips are directed at a much brisker, more continuous delivery
// pace with fewer clean internal pauses than prior episodes' dialogue —
// confirmed by direct visual mouth-frame inspection (dense frame grids
// pulled at 0.3-0.5s intervals) on every flagged clip, which showed
// genuinely continuous talking through the disputed windows rather than a
// missed pause. Where a real visual anchor exists (a chew/swallow, a
// held-hand silent beat, a physical interruption like Tank's beak lunge),
// that anchor is used directly; otherwise time is split proportionally by
// word count within the confirmed real-speech window — grounded in real
// evidence at the edges, not proportional guessing across the whole clip.
//
// NOTE: Gemini eyes (the tool built for exactly this job) was unavailable
// this session — free-tier daily quota exhausted (RESOURCE_EXHAUSTED across
// the whole model ladder) partway through this episode's edit stage. Local
// Whisper ASR was also attempted as a fallback and blocked (model-weights
// host unreachable through this environment's proxy, same class of block
// documented on a prior episode). This is the manual mouth-frame method
// used before Gemini was wired up, applied rigorously; flagged to the owner
// in the production log. Re-verify with Gemini once quota/billing allows.

export const CLIPS = [
  {
    id: "clip1_vista_v5",
    duration: 15.069002,
    captions: [
      { start: 0.0, end: 2.73, text: "Sixty-six million years BC. Hell Creek. Tuesday." },
      { start: 2.90, end: 6.43, text: "This is the whole world right now — no cities, no roads, no smoke on any horizon." },
      { start: 6.76, end: 11.98, text: "And in about four hours, a rock six miles wide hits Mexico, and today becomes the worst day in the history of life on Earth." },
      { start: 12.46, end: 14.95, text: "Nobody here knows. Nobody here even knows what a Mexico is." },
    ],
  },
  {
    id: "clip2_mudgear",
    duration: 8.057007,
    captions: [
      { start: 0.0, end: 4.42, text: "No costume department in the Cretaceous. Mud — it's SPF, it's bug spray, it's couture." },
      { start: 4.42, end: 7.96, text: "And I brought a bike bell. For herding. You laugh — wait." },
    ],
  },
  {
    id: "clip3_tankrescue_v2",
    duration: 12.050998,
    captions: [
      { start: 0.0, end: 3.22, text: "You're built like a coffee table and you fight like one. Tank. Your name is Tank." },
      { start: 11.0, end: 11.78, text: "Don't eat that." },
    ],
  },
  {
    id: "clip4_foodreview",
    duration: 10.053991,
    captions: [
      { start: 2.8, end: 4.3, text: "Fruit is BRAND new this era. I'm eating the beta version." },
      { start: 4.6, end: 8.2, text: "5/10 — mostly seeds and ambition." },
      { start: 8.3, end: 9.8, text: "Don't eat that either. It's MINE." },
    ],
  },
  {
    id: "clip5_rexsighting",
    duration: 8.057007,
    captions: [
      { start: 0.0, end: 4.55, text: "That's the celebrity. And the entire reason we are not going that way." },
      { start: 4.55, end: 8.06, text: "You are the worst hiding partner in sixty-six million years." },
    ],
  },
  {
    id: "clip6_walkingaside",
    duration: 10.053991,
    captions: [
      { start: 0.133, end: 4.69, text: "Everyone here is having a completely normal Tuesday. The rock is already closer than the Moon." },
      { start: 4.69, end: 9.825, text: "I did the math, rang my little bell, and kept walking — because what ELSE do you do?" },
    ],
  },
  {
    id: "clip7_pivot_v3",
    duration: 10.053991,
    captions: [
      { start: 0.0, end: 8.449, text: "...That was three thousand kilometers away." },
      { start: 8.727, end: 9.606, text: "It's starting." },
    ],
  },
  {
    id: "clip8_skyturn",
    duration: 12.050998,
    captions: [
      { start: 0.3, end: 8.6, text: "Move. MOVE. Under the bank — GO." },
    ],
  },
  {
    id: "clip9_shelter",
    duration: 12.050998,
    captions: [
      { start: 3.5, end: 5.7, text: "We stay." },
      { start: 8.292, end: 11.533, text: "We stay till it stops." },
    ],
  },
  {
    id: "clip10_outro",
    duration: 14.070998,
    captions: [
      { start: 0.180, end: 2.068, text: "It's snowing. It isn't snow." },
      { start: 3.047, end: 9.068, text: "This exact day becomes a one-centimeter line in the rocks — walk into any museum in 2026 and you can touch this Tuesday." },
      { start: 9.793, end: 10.257, text: "Hi, grandma." },
      { start: 10.770, end: 12.410, text: "Hazel — out of time." },
    ],
  },
];

// Ep5 = one continuous linear day (OPENING LAW, no rewind card), every
// transition is a TRUE HARD CUT per creative-direction.md §16 — no dissolves
// anywhere (confirmed root cause on 2 prior episodes: independently
// generated clips never blend clean regardless of duration).
export const TRANSITIONS = [
  { after: "clip1_vista_v5", type: "cut" },
  { after: "clip2_mudgear", type: "cut" },
  { after: "clip3_tankrescue_v2", type: "cut" },
  { after: "clip4_foodreview", type: "cut" },
  { after: "clip5_rexsighting", type: "cut" },
  { after: "clip6_walkingaside", type: "cut" },
  { after: "clip7_pivot_v3", type: "cut" },
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
