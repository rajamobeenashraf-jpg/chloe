// Episode 8 ("The Night the Berlin Wall Fell") — caption cue data for
// qc_pass.mjs. Timing grounded in real ffmpeg silencedetect boundaries
// measured off each clip's actual rendered audio (never guessed from the
// generation prompts — creative-direction.md §16). Speech-run boundaries
// were collapsed into whole-sentence cues per the "virtual timeline"
// policy (internal sub-0.3s/mid-sentence pauses absorbed into one cue;
// gaps of real length treated as sentence/beat boundaries).
//
// Two clips (clip01_open, clip10_reunion) returned almost no silencedetect
// hits even down to -25dB — street/Trabant ambience and crowd
// cheering/hammering respectively stay above the noise floor for most of
// the clip. clip01 was resolved by hunting at -25dB (worked well — 6 clean
// segments matching the 6 scripted phrase-beats). clip10 has no usable
// silence data at all; its single cue ("MARGOT?!", spoken by Hanne, not
// Hazel — she has no dialogue in this clip per the script) is timed from a
// frame-by-frame visual read (Hanne's entrance/turn) rather than audio, and
// is flagged low-confidence pending the edit-stage Gemini captions-mode
// pass. clip09_gate's long undifferentiated 0-6.85s run was split
// proportionally by scripted content length and cross-checked against a
// contact sheet showing continuous mouth movement across that span.
// clip11_outro's tail (9.164s to clip end) also showed continuous mouth
// movement on every sampled frame with no internal silence gap — the two
// final lines are estimated within that window, also flagged for the
// Gemini pass.
//
// clip07_empathycore has NO Hazel dialogue at all (the script's mandated
// silent core beat) — real audio confirms this: continuous
// ambience/crowd-chant 0-8.245s then 3.8s of true silence to clip end,
// exactly matching "DO NOT RUSH... a full unhurried silent beat" from the
// script. One background crowd-chant caption only, per the episode header's
// translation note.

export const CLIPS = [
  {
    id: "clip01_open",
    duration: 9.055782,
    captions: [
      { start: 0.838, end: 2.105, text: "East Berlin. November 9th, 1989." },
      { start: 2.292, end: 3.599, text: "This wall has stood twenty-eight years." },
      { start: 3.710, end: 5.513, text: "It falls TONIGHT — and right now nobody knows." },
      { start: 5.956, end: 6.431, text: "Not them." },
      { start: 6.744, end: 7.606, text: "Not the guards." },
      { start: 7.736, end: 8.887, text: "ESPECIALLY not the government." },
    ],
  },
  {
    id: "clip02_costume",
    duration: 8.057007,
    captions: [
      { start: 0.258, end: 2.766, text: "The eighties happened on BOTH sides of the wall." },
      { start: 3.284, end: 5.012, text: "Warmth: 8 out of 10." },
      { start: 5.482, end: 7.578, text: "Volume of this jacket: also 8." },
    ],
  },
  {
    id: "clip03_food",
    duration: 8.057007,
    captions: [
      { start: 1.719, end: 3.503, text: "So it's a hot dog... inside the bread?" },
      { start: 3.642, end: 4.586, text: "It is engineering.", speaker: "Vendor" },
      { start: 4.738, end: 6.256, text: "6 out of 10. The ketchup carries." },
      { start: 6.379, end: 7.4, text: "The engineering is load-bearing." }, // low-confidence tail, no clean silence boundary after 6.701s — flag for Gemini pass
    ],
  },
  {
    id: "clip04_pressconf",
    duration: 11.051995,
    captions: [
      { start: 0.207, end: 1.205, text: "...sofort... unverzüglich.", speaker: "TV — Schabowski" },
      { start: 1.398, end: 1.957, text: "He is reading it wrong.", speaker: "Patron" },
      { start: 2.294, end: 3.113, text: "How do you know?" },
      { start: 3.269, end: 4.850, text: "He is Politburo. They are never accidentally generous.", speaker: "Patron" },
      { start: 5.845, end: 8.790, text: "He just ended the Cold War by accident. Live on television." },
      { start: 9.927, end: 10.664, text: "And he doesn't know." },
    ],
  },
  {
    id: "clip05_streetfill",
    duration: 10.053991,
    captions: [
      { start: 0.310, end: 4.668, text: "It said 'immediately.' I heard it. Come — I'll walk with you." },
      { start: 5.037, end: 6.580, text: "Twenty-eight years I have waited.", speaker: "Margot" },
      { start: 6.927, end: 9.3, text: "I can wait for you to find your glove.", speaker: "Margot" }, // tail estimated past 7.671s, no further silence detected — flag for Gemini pass
    ],
  },
  {
    id: "clip06_walk",
    duration: 9.055782,
    captions: [
      { start: 0.149, end: 3.320, text: "In 2026. The telephones. What are they like?", speaker: "Werner" },
      { start: 3.654, end: 5.264, text: "Everyone carries one. Nobody calls." },
      { start: 6.382, end: 7.291, text: "...So the Stasi won.", speaker: "Werner" },
      // 7.291-8.984: her silent two-second delighted-horror reaction — no caption, matches script exactly.
    ],
  },
  {
    id: "clip07_empathycore",
    duration: 12.050998,
    captions: [
      { start: 1.360, end: 2.882, text: "TOR AUF! (Open the gate!)", speaker: "Crowd" },
      // 8.245-12.051 (3.8s): the empathy-core silence — Margot's photo, no dialogue, no caption. DO NOT add text here.
    ],
  },
  {
    id: "clip08_standoff",
    duration: 12.050998,
    captions: [
      { start: 0, end: 3.754, text: "NOBODY pushes. We win by STANDING here." },
      { start: 9.545, end: 9.983, text: "Corks." },
      { start: 11.145, end: 11.837, text: "Just corks." },
    ],
  },
  {
    id: "clip09_gate",
    duration: 10.053991,
    captions: [
      // The 0-6.851s run showed continuous mouth movement on every sampled
      // frame (contact-sheet check) with no internal silence — split
      // proportionally to the two scripted sentences.
      { start: 1.8, end: 4.0, text: "Thousands of rabbits live between the walls." },
      { start: 4.0, end: 6.3, text: "Safest place in Berlin — if you're a rabbit." },
      { start: 7.051, end: 7.833, text: "Their kingdom ends tonight." },
    ],
  },
  {
    id: "clip10_reunion",
    duration: 12.050998,
    captions: [
      // No usable silencedetect data anywhere in this clip (continuous
      // crowd cheering/hammering). Timed from a visual frame read of
      // Hanne's entrance/turn instead of audio — LOW CONFIDENCE, flagged
      // for the Gemini captions-mode pass to verify/correct.
      { start: 6.3, end: 7.2, text: "MARGOT?!", speaker: "Hanne" },
    ],
  },
  {
    id: "clip11_outro",
    duration: 11.051995,
    captions: [
      { start: 0, end: 1.397, text: "No shots. No plan." },
      { start: 1.920, end: 4.790, text: "One bureaucrat's bad note cards, and a hundred thousand people who took him at his word." },
      { start: 5.016, end: 7.1, text: "At least a hundred and forty people died trying to cross this wall." }, // fast for the word count (real audio, sober delivery) — flag for Gemini pass
      { start: 7.359, end: 8.993, text: "Tonight, everyone just... walked." },
      // 9.164-11.052: continuous mouth movement on every sampled frame, no internal silence detected — split estimated, LOW CONFIDENCE, flag for Gemini pass.
      { start: 9.164, end: 10.2, text: "I didn't think it would hit like this." },
      { start: 10.2, end: 11.0, text: "Hazel — out of time." },
    ],
  },
];

// All transitions are TRUE zero-blend hard cuts (creative-direction.md
// §16, current governing rule — supersedes any earlier per-episode
// dissolve experiments). Episode 8 is fully linear per the OPENING LAW; no
// flashback structure means no title card anywhere (the "EARLIER
// TODAY"/"EARLIER THAT DAY" convention is retired for this episode's shape
// regardless).
export const TRANSITIONS = [
  { after: "clip01_open", type: "cut" },
  { after: "clip02_costume", type: "cut" },
  { after: "clip03_food", type: "cut" },
  { after: "clip04_pressconf", type: "cut" },
  { after: "clip05_streetfill", type: "cut" },
  { after: "clip06_walk", type: "cut" },
  { after: "clip07_empathycore", type: "cut" },
  { after: "clip08_standoff", type: "cut" },
  { after: "clip09_gate", type: "cut" },
  { after: "clip10_reunion", type: "cut" },
];

// Canonical caption style (creative-direction.md §16, owner-locked
// 2026-08-20): DejaVu Sans Bold, MarginV=320 in 720x1280 PlayRes units —
// clears the Shorts UI overlay, stays below her chin, separated from
// center-screen.
export const SUB_STYLE = {
  fontName: "DejaVu Sans",
  fontSize: 42,
  outline: 2.6,
  shadow: 1.2,
  marginV: 320,
  marginLR: 60,
};

// No title cards this episode (see TRANSITIONS note above), so CARD_STYLE
// is unused but kept for structural parity with build_final_cut.mjs.
export const CARD_STYLE = {
  fontSize: 56,
  borderw: 4,
  bordercolor: "black@0.85",
  fontcolor: "white",
  durationSec: 1.3,
};
