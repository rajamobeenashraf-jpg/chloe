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
//
// clip5a/5b + clip8_skyturn_v2 (reshoot round) additionally hit a case
// silencedetect alone could not resolve: heavy in-scene ambient sound (a
// T-Rex family thundering past at close range in 5b; fire/water/running in
// 8v2) sat above the -30dB noise floor even while she was not vocalizing,
// so "no detected silence" did NOT mean "continuous speech" for these
// clips' outer edges — confirmed by direct visual mouth-frame inspection,
// which found real non-speech spans silencedetect had missed entirely (5b
// opens on a ~4.8s SCRIPTED SILENT beat with no dialogue at all, watching
// the adult pass overhead). Where a real internal pause was visually
// confirmed it's used as a hard boundary; where two adjacent lines showed
// continuous talking with no closed-mouth gap between them (5a's last two
// lines, 5b's last two lines), they're kept as ONE caption card rather than
// an invented split point — consistent with this file's existing style of
// combining continuously-delivered sentences into a single card.

export const CLIPS = [
  {
    id: "clip1a_vista",
    duration: 10.041667,
    captions: [
      { start: 0.0, end: 2.26, text: "Sixty-six million years BC. Hell Creek. Tuesday." },
      { start: 2.94, end: 8.9, text: "This is the whole world right now — no cities, no roads, no smoke on any horizon." },
    ],
  },
  {
    id: "clip1b_doomclock",
    duration: 10.041667,
    captions: [
      { start: 0.0, end: 5.42, text: "And in about four hours, a rock six miles wide hits Mexico, and today becomes the worst day in the history of life on Earth." },
      { start: 6.46, end: 7.33, text: "Nobody here knows." },
      { start: 8.25, end: 10.0, text: "Nobody here even knows what a Mexico is." },
    ],
  },
  {
    id: "clip2_mudgear_v2",
    duration: 9.041667,
    captions: [
      { start: 0.0, end: 4.39, text: "No costume department in the Cretaceous. Mud — it's SPF, it's bug spray, it's couture." },
      { start: 4.56, end: 9.0, text: "And I brought a bike bell. The herd hears it, and they've learned it just means me." },
    ],
  },
  {
    id: "clip3_tankrescue_v2",
    duration: 12.050998,
    // TIMING FIX (2026-08-22, owner-flagged then Gemini-confirmed):
    // this clip's captions were anchored to a naive 0.0 start from an early,
    // unverified pass and never re-checked — the actual take opens with an
    // unscripted ad-libbed line, then ~6s of pure physical struggle (heaving
    // on the branch-lever, no dialogue) before she ever says "You're built
    // like a coffee table..." Real timing confirmed via independent Gemini
    // transcription (twice) + direct dense visual mouth/action verification:
    // talking 0.3-1.3s, then straining/effort face (not talking) through
    // ~6.5s, a relieved smile at Tank popping free ~7.0s, speech resuming
    // ~7.3s. This was off by 7+ seconds — the most severe timing bug found
    // in the full re-audit prompted by the owner's "almost throughout the
    // video" complaint; every other clip cross-checked clean.
    captions: [
      { start: 0.3, end: 1.3, text: "Hold on, I see a branch." },
      { start: 7.3, end: 9.41, text: "You're built like a coffee table and you fight like one." },
      { start: 9.79, end: 9.97, text: "Tank." },
      { start: 10.21, end: 11.0, text: "Your name is Tank." },
      { start: 11.0, end: 11.78, text: "Don't eat that." },
    ],
    // Owner-directed species-ID card (2026-08-22): Tank's first clear
    // on-screen appearance, confirmed via dense frame check at 2.3s.
    idCards: [
      { start: 2.3, end: 4.8, text: "TRICERATOPS — a plant-eating dinosaur" },
    ],
  },
  {
    id: "clip4_foodreview",
    duration: 10.053991,
    captions: [
      { start: 2.8, end: 4.3, text: "Fruit is BRAND new this era. I'm eating the beta version." },
      { start: 5.25, end: 8.2, text: "5/10 — mostly seeds and ambition." },
      { start: 8.3, end: 9.8, text: "Don't eat that either. It's MINE." },
    ],
  },
  {
    id: "clip5a_rexfamily",
    duration: 10.041667,
    captions: [
      { start: 0.67, end: 1.14, text: "Down. Down, down—" },
      { start: 1.40, end: 3.05, text: "That's a T-Rex. We're hiding from them." },
      { start: 3.05, end: 5.51, text: "That's not just one. A family. One big, two small." },
      { start: 5.71, end: 8.97, text: "Nobody agrees they lived like that. Guess today they did." },
    ],
  },
  {
    id: "clip5b_rexfear_v3",
    duration: 12.041667,
    captions: [
      { start: 4.3, end: 4.82, text: "Hell Creek skulls." },
      { start: 5.06, end: 6.04, text: "T-Rex bite marks." },
      { start: 6.23, end: 6.61, text: "Some healed." },
      { start: 6.94, end: 7.67, text: "Some didn't." },
      { start: 8.27, end: 8.69, text: "He could eat you." },
      { start: 9.12, end: 11.95, text: "You are the worst hiding partner in sixty-six million years." },
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
    id: "clip7_pivot_v4",
    duration: 10.053991,
    captions: [
      { start: 6.6, end: 8.8, text: "...That was three thousand kilometers away." },
      { start: 9.3, end: 10.0, text: "It's starting." },
    ],
  },
  {
    id: "clip8_skyturn_v4",
    duration: 12.041667,
    captions: [
      { start: 0.0, end: 6.8, text: "Okay— okay, go, GO—" },
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
    // Owner-directed fact overlay (2026-08-22): clarifies why she calls the
    // bird "grandma" — birds are the one dinosaur lineage that survives this
    // extinction event, a real fact the line doesn't explain on its own.
    // Rendered top-of-screen via FACT_STYLE, distinct from the bottom-of-
    // screen dialogue captions above so the two never visually compete.
    // Starts exactly when the "Hi, grandma" line starts, owner-specified
    // fixed 2s duration (not tied to caption timing).
    facts: [
      { start: 9.793, end: 11.793, text: "Birds are the only dinosaurs alive today." },
    ],
  },
];

// Ep5 = one continuous linear day (OPENING LAW, no rewind card), every
// transition is a TRUE HARD CUT per creative-direction.md §16 — no dissolves
// anywhere (confirmed root cause on 2 prior episodes: independently
// generated clips never blend clean regardless of duration).
export const TRANSITIONS = [
  { after: "clip1a_vista", type: "cut" },
  { after: "clip1b_doomclock", type: "cut" },
  { after: "clip2_mudgear_v2", type: "cut" },
  { after: "clip3_tankrescue_v2", type: "cut" },
  { after: "clip4_foodreview", type: "cut" },
  { after: "clip5a_rexfamily", type: "cut" },
  { after: "clip5b_rexfear_v3", type: "cut" },
  { after: "clip6_walkingaside", type: "cut" },
  { after: "clip7_pivot_v4", type: "cut" },
  { after: "clip8_skyturn_v4", type: "cut" },
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

// Top-of-screen fact-overlay style, owner-directed 2026-08-22 (clip10's
// "grandma" clarification, see that clip's `facts` array) — a burned-in
// text overlay on an existing clip, NOT the full-screen interstitial
// CARD_STYLE below (that's a different, still-unused-in-Ep5 mechanism).
// Kept visually distinct from SUB_STYLE (smaller, top-positioned) so the
// two never compete for the same screen space.
export const FACT_STYLE = {
  fontName: "DejaVu Sans",
  fontSize: 36,
  outline: 2.2,
  shadow: 1.0,
  marginV: 100,
  marginLR: 60,
};

// Species-ID card style, owner-directed 2026-08-22 ("a little more
// prominent" than FACT_STYLE) — same top position, but bigger/bolder text
// on an opaque background box (BorderStyle 3 in qc_pass.mjs) rather than
// plain outlined text, so it reads as a distinct "info tag" at a glance.
export const ID_CARD_STYLE = {
  fontName: "DejaVu Sans",
  fontSize: 44,
  outline: 3,
  shadow: 0,
  marginV: 100,
  marginLR: 50,
  boxAlphaHex: "30", // ASS alpha is inverted: 00=opaque, FF=transparent
};

// No title card in Ep5 — OPENING LAW retired the "EARLIER TODAY" convention;
// the whole episode is linear, one continuous day, no rewind. (This is a
// full-screen interstitial card mechanism, distinct from FACT_STYLE above.)
export const CARD_STYLE = null;
