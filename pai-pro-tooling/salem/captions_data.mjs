// Episode 2 (Salem 1692) — caption cue data for qc_pass.mjs.
// Every cue's [start, end] is grounded in real ffmpeg silencedetect speech
// boundaries measured directly off each clip's actual rendered audio (not
// guessed from the generation prompt) — see session notes. Text is the
// verbatim quoted dialogue from each clip's own generate_clipN.mjs prompt
// (the exact words the model was instructed to speak), used only to label
// segments whose timing was independently confirmed against real audio.
// Clip 11's cue was additionally cross-checked against a frame-by-frame
// mouth-movement pass (Goodwife Ann's face is visible/speaking throughout
// the confirmed window).

export const CLIPS = [
  {
    id: "clip1_coldopen",
    duration: 7.058866,
    captions: [
      { start: 1.702, end: 3.532, text: "She touched her! I saw it!" },
    ],
  },
  {
    id: "clip2_rewind",
    duration: 9.055782,
    captions: [
      { start: 0.175, end: 6.386, text: "Salem, 1692. Nineteen people die here — and I have exactly one rule: don't get noticed." },
      { start: 8.182, end: 9.056, text: "Should be easy." },
    ],
  },
  {
    id: "clip3_costume",
    duration: 8.057007,
    captions: [
      { start: 0.163, end: 7.811, text: "There is a correct way to tie this and I will not be finding it today." },
    ],
  },
  {
    id: "clip4_wateryoke",
    duration: 12.050998,
    captions: [
      { start: 4.622, end: 6.436, text: "Bless you, child." },
      { start: 6.542, end: 10.887, text: "Don't thank me yet — I've never done this." },
    ],
  },
  {
    id: "clip5_wellgossip",
    duration: 12.050998,
    captions: [
      { start: 5.324, end: 6.150, text: "Two out of ten." },
      { start: 6.354, end: 7.090, text: "Tastes like guilt." },
      { start: 8.813, end: 11.724, text: "What's wrong with the Parris girls, then?" },
    ],
  },
  {
    id: "clip6_thefit",
    duration: 10.053991,
    captions: [
      { start: 2.572, end: 4.305, text: "She's THERE! Behind you — don't you SEE her?!" },
    ],
  },
  {
    id: "clip7_shecalms_v2",
    duration: 12.050998,
    captions: [
      { start: 8.011, end: 9.393, text: "I know exactly what this is —" },
      { start: 10.054, end: 11.846, text: "and I cannot say one word of it out loud." },
    ],
  },
  {
    id: "clip8_theturn",
    duration: 10.053991,
    captions: [
      { start: 4.397, end: 5.692, text: "How does she know to calm her so?" },
      { start: 6.137, end: 6.789, text: "Who taught her that?" },
    ],
  },
  {
    id: "clip9_defense",
    duration: 12.050998,
    captions: [
      { start: 3.712, end: 6.132, text: "I've calmed frightened animals my whole life—" },
      { start: 6.619, end: 9.048, text: "that is ALL this is—" },
    ],
  },
  {
    id: "clip10_escape_v2",
    duration: 14.070998,
    captions: [], // no dialogue — pure action beat
  },
  {
    id: "clip11_rescue_v2",
    duration: 13.072834,
    captions: [
      { start: 9.198, end: 12.772, text: "She's my sister's girl — up from Ipswich. Leave her be!" },
    ],
  },
  {
    id: "clip12_outro",
    duration: 12.050998,
    captions: [
      { start: 1.996, end: 4.864, text: "Nineteen people didn't have a woman with a water bucket to lie for them." },
      { start: 8.571, end: 9.687, text: "Back to 2026." },
      { start: 10.452, end: 11.272, text: "Follow for the next trip." },
    ],
  },
];

// Per-transition treatment between clip[i] and clip[i+1], indexed by the
// gap after that clip (11 entries for 12 clips). Scene/location changes
// cut; genuinely continuous action (the fit -> calming -> the turn ->
// defense -> escape -> rescue, clips 6-11, one unbroken escalation) dissolves.
// A hard cut (blend: 0) also sidesteps every caption/crossfade margin
// question outright, since there is no blend window for a caption to bleed
// into — used deliberately wherever a caption runs close to a clip's edge
// (clip2's last cue ends exactly on its last frame; clip11's captioned
// rescue plea runs to within 0.3s of clip end).
// ALL transitions are TRUE zero-blend hard cuts (plain concat, no xfade
// anywhere) — not even a very short dissolve. Two rounds of visual QC on
// the actual rendered midpoints forced this: first a 0.12s xfade on the
// scene-change transitions produced visible double-exposure ghosting
// (clips 2->3, 3->4); then, on the theory that "continuous action" clips
// (6-11) would dissolve cleanly the way Ep 1's did, a 0.25-0.35s xfade was
// tried there too and produced the SAME ghosting, arguably worse (checked
// at the literal midpoint of clip10->11's blend: a legible double-exposure
// of two unrelated framings). Root cause, and why this differs from Ep 1:
// every clip here is an independently generated shot with its own camera
// angle/composition, not continuous footage from one real camera — a
// dissolve only reads as smooth when the two frames it blends are already
// close in framing, which is never guaranteed generation-to-generation
// here. A hard cut has no blend window, so there is nothing to ghost,
// regardless of how different the framing is — the reliably clean choice
// for this pipeline, and standard professional practice for fast-paced
// vlog/action cutting besides.
export const TRANSITIONS = [
  { after: "clip1_coldopen", type: "card", cardText: "EARLIER THAT DAY" },
  { after: "clip2_rewind", type: "cut" },
  { after: "clip3_costume", type: "cut" },
  { after: "clip4_wateryoke", type: "cut" },
  { after: "clip5_wellgossip", type: "cut" },
  { after: "clip6_thefit", type: "cut" },
  { after: "clip7_shecalms_v2", type: "cut" },
  { after: "clip8_theturn", type: "cut" },
  { after: "clip9_defense", type: "cut" },
  { after: "clip10_escape_v2", type: "cut" },
  { after: "clip11_rescue_v2", type: "cut" },
];

// Shared caption style (ASS), tuned for 720x1280 delivery and verified by
// rendering + frame inspection before the full batch ran: white bold text,
// black outline, bottom-safe-area placement clear of platform UI overlays.
export const SUB_STYLE = {
  fontName: "Liberation Sans",
  fontSize: 42,
  outline: 2.6,
  shadow: 1.2,
  marginV: 150,
  marginLR: 60,
};

export const CARD_STYLE = {
  fontSize: 56,
  borderw: 4,
  bordercolor: "black@0.85",
  fontcolor: "white",
  durationSec: 1.3,
};
