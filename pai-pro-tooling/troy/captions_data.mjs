// Episode 7 (Troy) — caption cue data for qc_pass.mjs.
//
// Timing grounded in real `ffmpeg silencedetect` (noise=-30dB, d=0.12)
// speech-boundary data measured off each clip's own rendered audio (see
// detect_silence.sh output, 2026-08-21) — never guessed from the
// generation prompt. Method: gaps >=0.3s treated as real sentence/speaker
// breaks; gaps <0.3s collapsed as in-line breath pauses (same "biggest
// pauses are the real breaks" approach as prior episodes). Per
// creative-direction.md §16: cues are whole sentences on a virtual
// timeline with silence collapsed out.
//
// MANDATORY mouth-frame cross-check applied to clip 10: its background
// fire/chaos noise never dropped below the silence threshold at all (zero
// silencedetect markers across all 13s), so audio energy alone could not
// localize its one line. Extracted dense 3fps frames and confirmed by eye:
// mouth is open and moving continuously from ~7.4s to ~8.7s (the exact
// moment she's mid-carry hauling the hide beside Krethon), closing right
// as she shifts into helping him walk — matches the script's "gasping a
// line to the lens mid-carry" staging.
//
// Clip 4's early stretch (0-2.85s) has many small (<0.3s) silence blips —
// most plausibly camp-ambience/room-tone triggering the detector rather
// than real speech pauses, not treated as sentence breaks.
// Clip 9's middle section (1.66-6.15s) is one continuous speech run
// covering overlapping reactions/laughter from multiple soldiers plus her
// line — genuinely ambiguous without audio; allocated proportionally by
// expected line length and flagged here as lower-confidence, consistent
// with how prior episodes documented the same limitation (no
// forced-alignment tool available in this environment — aeneas/Whisper
// were tried and found unavailable in this environment class, per
// creative-direction.md §11).
//
// Text is verbatim from `clips.json`'s dialogue field for each clip
// (episodes-5-9-scripts.md's own script text). `speaker` is set only for
// non-protagonist lines — qc_pass.mjs prefixes those with an italicized
// bracketed name per creative-direction.md §16.
//
// REVISION ROUND (owner creative review, 2026-08-21): clips 5, 7, 10, 12
// regenerated per owner direction after watching the first assembled cut
// (Achilles given a real named exchange, Krethon named aloud, clip 12's
// rushed pacing fixed, a bridge beat added between clips 9 and 10, and a
// real object-permanence bug in clip 5's arrow prop fixed). Each revised
// clip's caption timing below is freshly re-derived from its own new
// render (real silencedetect where available, mouth-frame cross-check
// where the clip's background noise defeats silencedetect entirely) — not
// carried over from the pre-revision version. See
// episode-7-production-log.md for the full revision history.

export const CLIPS = [
  {
    id: "clip1",
    duration: 9.055782,
    captions: [
      { start: 0.0, end: 4.578, text: "The Trojan War. Homer says: ten years, a thousand ships, one big wooden horse." },
      { start: 4.578, end: 6.906, text: "I'm here to fact-check the most famous story ever told." },
      { start: 7.334, end: 9.056, text: "Rule one — stay off the plain." },
    ],
  },
  {
    id: "clip2",
    duration: 8.057007,
    captions: [
      { start: 0.0, end: 2.870, text: "One rectangle of wool. Four ways to wear it." },
      { start: 3.557, end: 4.519, text: "All of them itchy." },
      { start: 5.172, end: 7.771, text: "Second era in a row I have been defeated by a rectangle." },
    ],
  },
  {
    id: "clip3",
    duration: 9.055782,
    captions: [
      { start: 0.776, end: 2.140, text: "The wine has been watered five times.", speaker: "Soldier" },
      { start: 2.666, end: 3.740, text: "So it's a rumor of wine." },
      { start: 3.889, end: 5.097, text: "It is a MEMORY of wine.", speaker: "Soldier" },
      { start: 6.328, end: 8.403, text: "4/10. The cake could stop an arrow. I'm keeping it." },
    ],
  },
  {
    id: "clip4",
    duration: 11.051995,
    captions: [
      { start: 2.85, end: 4.81, text: "You tie knots like a sailor.", speaker: "Quartermaster" },
      { start: 5.52, end: 6.13, text: "Thank you." },
      { start: 6.55, end: 7.46, text: "Sailors drown.", speaker: "Quartermaster" },
      { start: 8.04, end: 9.53, text: "Water to the shield line at dawn. Stay low.", speaker: "Quartermaster" },
    ],
  },
  {
    id: "clip5",
    duration: 6.060000,
    captions: [
      // OWNER DECISION: reverted to v4's actual footage (v5 verified clean
      // but owner prefers v4's take) — see clips.json's clip5 craft note.
      // No silencedetect markers at all on v4 (chaos/battle noise never
      // drops below threshold) — timing from a fresh dense mouth-frame
      // cross-check (8fps across the full clip, not assumed from the
      // pre-session cached numbers): soldier's mouth open/shouting during
      // the grab ~1.0-2.2s; her mouth closed/settling from ~2.2-3.0s
      // (catching her breath, not yet speaking), then open continuously
      // from ~3.5s toward the lens through to the last frame of the clip
      // (~5.9s) — this pass moved her line's start ~0.3s earlier than the
      // previously cached estimate.
      { start: 1.0, end: 2.2, text: "Water girl! DOWN!", speaker: "Soldier" },
      { start: 3.5, end: 5.9, text: "Okay. That's new." },
    ],
  },
  {
    id: "clip6",
    duration: 12.050998,
    captions: [
      { start: 0.326, end: 2.081, text: "The food was better the first three years.", speaker: "Krethon" },
      { start: 3.422, end: 4.116, text: "He walks now.", speaker: "Krethon" },
      { start: 4.812, end: 5.278, text: "My son.", speaker: "Krethon" },
      { start: 6.302, end: 6.779, text: "Somewhere...", speaker: "Krethon" },
      { start: 7.865, end: 8.348, text: "he walks.", speaker: "Krethon" },
      // 8.348-12.051: scripted silence (DO NOT RUSH beat) — no caption.
    ],
  },
  {
    id: "clip7",
    duration: 14.070998,
    captions: [
      // v5 (owner-directed rewrite: Krethon removed, she approaches
      // Achilles directly and says his name herself, real strategy
      // dialogue). Timing from real silencedetect on the v5 render.
      { start: 0.0, end: 0.456, text: "Achilles." },
      { start: 1.322, end: 4.263, text: "Nine years. They say you could end this war tomorrow, if you fought. Why don't you?" },
      { start: 4.386, end: 7.725, text: "Agamemnon took what was mine. I won't hand him my sword too.", speaker: "Achilles" },
      { start: 8.795, end: 9.745, text: "That's not strategy." },
      { start: 10.353, end: 14.071, text: "That's a grudge with an army behind it. I have never been more scared of anyone in my life." },
    ],
  },
  {
    id: "clip8",
    duration: 12.050998,
    captions: [
      // v2 (lighting-only regen — dialogue/action untouched, but a fresh
      // take naturally shifts word timing, so re-derived rather than kept
      // as-is). silencedetect gaps re-checked against the dialogue's own
      // sentence structure and cross-checked with mouth-frame sampling at
      // the cue3/4/5 region; cue1/cue2's exact split is the lower-confidence
      // boundary here (no single decisive gap, inferred from word-count
      // pacing either side) — everything else corroborated by frames.
      { start: 0.0, end: 3.21, text: "Burial truce. One afternoon — both sides collect their dead." },
      { start: 3.33, end: 6.38, text: "And I'm walking water to the WALLS, because apparently that's who I am now." },
      { start: 6.67, end: 7.84, text: "Same water. Both sides." },
      { start: 8.13, end: 8.85, text: "[calls down, in his own tongue]", speaker: "Trojan Boy" },
      { start: 10.50, end: 12.051, text: "He's about the age Krethon's son would be." },
    ],
  },
  {
    id: "clip9",
    duration: 8.057007,
    captions: [
      { start: 0.0, end: 0.326, text: "Okay." },
      { start: 0.751, end: 1.660, text: "The horse plan..." },
      { start: 1.660, end: 3.2, text: "Giant wooden horse — soldiers hiding inside. Yes?" },
      { start: 3.2, end: 4.3, text: "A WHAT?", speaker: "Soldier" },
      { start: 4.3, end: 5.0, text: "Who would DRAG it?", speaker: "Soldier" },
      { start: 5.0, end: 6.149, text: "...How many soldiers?", speaker: "Soldier" },
      { start: 6.408, end: 6.668, text: "No horse." },
      { start: 6.941, end: 8.057, text: "YET. Remember I said it here first." },
    ],
  },
  {
    id: "clip10",
    duration: 15.069002,
    captions: [
      // v5 (smoke-trail-only fix on top of v4's trajectory fix — every
      // other beat untouched, but the whole clip was regenerated so
      // timing was re-checked fresh rather than assumed identical). No
      // silencedetect data during the dialogue beat (fire/chaos noise
      // defeats threshold, same as v3/v4) — mouth-frame cross-check:
      // mouth open/moving toward the lens ~9.6-10.3s during the
      // hide-hauling beat with Krethon, closing as she turns away right after.
      { start: 9.6, end: 10.3, text: "—stay with me—" },
    ],
  },
  {
    id: "clip11",
    duration: 9.055782,
    captions: [
      { start: 0.137, end: 1.111, text: "Nine years of this." },
      { start: 2.364, end: 2.920, text: "Every night." },
      { start: 3.890, end: 5.248, text: "On BOTH sides of that wall." },
      { start: 6.814, end: 9.056, text: "And Homer is going to make it sound GLORIOUS." },
    ],
  },
  {
    id: "clip12",
    duration: 13.072834,
    captions: [
      // v2 (Krethon named in the "Get home" line; pacing fixed — extended
      // duration + explicit per-sentence pause direction). Timing from
      // real silencedetect on the v2 render.
      { start: 0.0, end: 0.746, text: "Get home, Krethon." },
      { start: 1.125, end: 1.914, text: "Count them out loud to him." },
      { start: 2.787, end: 6.256, text: "In three thousand years, a man finds this city with a shovel in one hand and Homer in the other." },
      { start: 6.771, end: 7.566, text: "The poem is the MAP." },
      { start: 8.762, end: 11.055, text: "Whether it happened like the song says — it happened for THEM." },
      { start: 11.913, end: 12.215, text: "Hazel —" },
      { start: 12.530, end: 13.073, text: "out of time." },
    ],
  },
];

// Cross-episode pipeline rule (creative-direction.md §16, owner-locked
// 2026-08-20): every transition is a TRUE HARD CUT — no dissolves, no
// blend window. No title card either: the OPENING LAW (chloe-craft-study
// §4.1) retires the "EARLIER TODAY" card convention for every episode
// from Ep5 onward — Episode 7 is fully linear, so build_final_cut.mjs
// needs no card logic at all.
export const TRANSITIONS = [
  { after: "clip1", type: "cut" },
  { after: "clip2", type: "cut" },
  { after: "clip3", type: "cut" },
  { after: "clip4", type: "cut" },
  { after: "clip5", type: "cut" },
  { after: "clip6", type: "cut" },
  { after: "clip7", type: "cut" },
  { after: "clip8", type: "cut" },
  { after: "clip9", type: "cut" },
  { after: "clip10", type: "cut" },
  { after: "clip11", type: "cut" },
];

// Canonical caption style (creative-direction.md §16, owner-locked
// 2026-08-20 position update): MarginV=320 in 720x1280 PlayRes units —
// clears the YouTube Shorts UI overlay, stays below her chin, keeps
// separation from center-screen kinetic-caption territory.
export const SUB_STYLE = {
  fontName: "DejaVu Sans",
  fontSize: 42,
  outline: 2.6,
  shadow: 1.2,
  marginV: 320,
  marginLR: 60,
};
