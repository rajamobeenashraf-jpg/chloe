// Episode "The Fall of Constantinople 1453" — caption cue data for
// qc_pass.mjs / make_word_chunks.py.
//
// STAGE: these are ROUGH LINE-WINDOW cues (word-count-proportional guesses
// within each clip's measured duration), the input to the word-chunk
// pipeline -- analogous to Troy's captions_data_lines_backup.mjs, not
// Troy's current (already-chunked) captions_data.mjs. Text is verbatim
// from episode-constantinople-1453-script.md's dialogue column for clips
// 1-13 and the two owner-approved rewritten final lines for clips 14-15
// (see episode-constantinople-production-log.md's "FULL REWRITE" and
// "pacing fix" entries) -- script text is ground truth, never edited to
// match what whisper hears.
//
// Word-synced CHUNK caption system (owner-locked 2026-08-23, CLAUDE.md):
// 1-2 word ALL-CAPS chunks, each REPLACING the previous (no accumulation),
// on screen only while spoken, pauses >=0.35s = no caption, hard cut
// in/out, no animation, serif (see SUB_STYLE), no speaker tags. Real
// per-word timing comes from make_word_chunks.py (faster-whisper,
// script-biased) run against each clip's own rendered audio -- NOT from
// the start/end windows below, which only bound interpolation for any
// word whisper can't hear. Output of that run: word_chunks_constantinople.json
// + word_chunks_constantinople_report.txt (this directory).
//
// Per-clip notes:
// - clip07b: dedicated wide impact insert, no character on screen and no
//   dialogue (ambient SFX only) -- empty captions array, still QC'd for
//   loudnorm/fade by qc_pass.mjs's no-captions branch.
// - clip04b, clip12, clip13a-1, clip03: narration delivered as VO (no
//   on-camera lip-sync needed) rather than lip-synced dialogue -- word-chunk
//   timing is generated identically for these; only the lip-sync frame
//   verification step (not applicable) differs.
// - clip06a: includes one line each from NPCs Giustiniani ("The Sultan has
//   one big cannon." / "I have ten thousand hands.") -- no speaker tag per
//   the no-speaker-tags rule above.
// - clip08a: includes one line from Constantine XI ("Because the city is
//   still here.") -- same no-speaker-tag treatment.
// - clip14: dialogue is the FINAL rewritten single-continuous-shot version
//   (job 5243859d, round 2, owner-approved 2026-08-29) -- a ~2.4s door-open
//   beat precedes any speech, reflected in the first line's start offset.
// - CORRECTIONS found via the whisper match report (script-to-clip
//   assignment fixed, not the words themselves -- see
//   word_chunks_constantinople_report.txt for the evidence): the master
//   script table's clip-10 dialogue was originally split guessing
//   clip10b="They're carrying...ships. Every man...leave." / clip10c="The
//   wall...standing. The men...broke." -- the first whisper pass showed
//   clip10b's audio actually ends after "...to the ships." (35% match, the
//   rest interpolation-squeezed into <0.5s) while clip10c's audio contains
//   ALL of "Every man on that wall just watched their best hope leave. The
//   wall is still standing. The men just broke." (its own whisper transcript
//   said so verbatim). Reassigned accordingly, now both match 100%. Also:
//   clip13a-1's guessed text included "The biggest church on Earth." but
//   neither clip13a-1 nor clip13a-2's audio contains it anywhere (clean 100%
//   match on clip13a-2 without it, and clip13a-1 only reaches 64% with it
//   in) -- this clause appears to have been dropped from the final render
//   at some point in clip 13's many iteration rounds and isn't in this
//   episode's actual footage; removed from clip13a-1's captions so the
//   burned captions match what's really said. Flagged to the owner in the
//   QC report rather than silently assumed.
// - clip15: dialogue is the FINAL pacing-fixed v2 version (job 176944a7,
//   owner-approved 2026-08-29), 22.04s total including the whispered
//   "Hazel... out of time." sign-off as its own trailing line.

export const CLIPS = [
  {
    id: "clip01",
    duration: 12.064,
    captions: [
      { start: 0.0, end: 3.067, text: "This is the last morning of the Roman Empire." },
      { start: 3.367, end: 4.389, text: "This is Constantinople." },
      { start: 4.689, end: 7.415, text: "No army has ever broken these land walls." },
      { start: 7.715, end: 8.397, text: "Not once." },
      { start: 8.697, end: 9.719, text: "In 1,100 years." },
      { start: 10.019, end: 12.064, text: "They have about three hours left." },
    ],
  },
  {
    id: "clip02",
    duration: 12.064,
    captions: [
      { start: 0.0, end: 1.996, text: "So the whole city is under siege." },
      { start: 2.296, end: 3.151, text: "But see that?" },
      { start: 3.451, end: 4.306, text: "That's a chain." },
      { start: 4.606, end: 6.887, text: "A real iron chain, across the whole harbor." },
      { start: 7.187, end: 9.183, text: "No enemy ship can get past it." },
      { start: 9.483, end: 11.194, text: "Everyone sleeps fine on this side." },
      { start: 11.494, end: 12.064, text: "Remember that." },
    ],
  },
  {
    id: "clip03",
    duration: 6.08,
    captions: [
      { start: 0.0, end: 1.566, text: "Triple walls on the land side." },
      { start: 1.866, end: 3.692, text: "A locked harbor on the sea side." },
      { start: 3.992, end: 6.08, text: "For a thousand years, that has been enough." },
    ],
  },
  {
    id: "clip04a",
    duration: 6.08,
    captions: [
      { start: 0.0, end: 0.398, text: "No." },
      { start: 0.698, end: 1.495, text: "No way." },
      { start: 1.795, end: 4.186, text: "He's moving his ships over LAND." },
      { start: 4.486, end: 6.08, text: "Over a whole hill." },
    ],
  },
  {
    id: "clip04b",
    duration: 5.056,
    captions: [
      { start: 0.0, end: 0.865, text: "Seventy ships." },
      { start: 1.165, end: 5.056, text: "On logs, greased with fat, oxen pulling all night." },
    ],
  },
  {
    id: "clip04c",
    duration: 5.056,
    captions: [
      { start: 0.0, end: 1.782, text: "The chain locks the front door." },
      { start: 2.082, end: 3.568, text: "Nobody ever locked the back." },
      { start: 3.868, end: 5.056, text: "By sunrise... they're in." },
    ],
  },
  {
    id: "clip05",
    duration: 9.056,
    captions: [
      { start: 0.0, end: 3.915, text: "So the city wakes up... and there are enemy ships behind them." },
      { start: 4.215, end: 6.172, text: "The safe side just stopped existing." },
      { start: 6.472, end: 7.125, text: "Same men." },
      { start: 7.425, end: 9.056, text: "Twice the wall to hold." },
    ],
  },
  {
    id: "clip06a",
    duration: 16.064,
    captions: [
      { start: 0.5, end: 1.294, text: "That's Giovanni Giustiniani." },
      { start: 1.594, end: 6.359, text: "He's not even from here \u2014 he sailed from Genoa with 700 men, just to defend this city." },
      { start: 6.659, end: 8.511, text: "Every night the cannon breaks the wall." },
      { start: 8.811, end: 10.4, text: "Every night he builds it back." },
      { start: 10.7, end: 12.552, text: "Honestly \u2014 can you hold this wall?" },
      { start: 12.852, end: 14.441, text: "The Sultan has one big cannon." },
      { start: 14.741, end: 16.064, text: "I have ten thousand hands." },
    ],
  },
  {
    id: "clip06b",
    duration: 6.08,
    captions: [
      { start: 0.0, end: 2.302, text: "The whole city believes he can save it." },
      { start: 2.602, end: 3.466, text: "And he does." },
      { start: 3.766, end: 4.629, text: "Night after night." },
      { start: 4.929, end: 6.08, text: "Until the last morning." },
    ],
  },
  {
    id: "clip07a",
    duration: 14.08,
    captions: [
      { start: 0.0, end: 2.279, text: "Okay \u2014 this is what's breaking the city." },
      { start: 2.579, end: 4.003, text: "The biggest cannon ever built." },
      { start: 4.303, end: 5.728, text: "The ball weighs 1,200 pounds." },
      { start: 6.028, end: 7.167, text: "Heavier than a piano." },
      { start: 7.467, end: 11.171, text: "One shot every three hours \u2014 that's how long it takes to load." },
      { start: 11.471, end: 11.756, text: "Okay." },
      { start: 12.056, end: 12.625, text: "They're loading." },
      { start: 12.925, end: 13.495, text: "I think\u2014" },
      { start: 13.795, end: 14.08, text: "\u2014WHOA." },
    ],
  },
  {
    id: "clip07b",
    duration: 4.042,
    captions: [], // no character/dialogue in this shot -- ambient SFX only (dedicated wide impact insert, no lip-sync)
  },
  {
    id: "clip08a",
    duration: 8.042,
    captions: [
      { start: 0.0, end: 0.652, text: "Your Majesty." },
      { start: 0.952, end: 2.255, text: "The harbor is gone." },
      { start: 2.555, end: 3.858, text: "The wall is open." },
      { start: 4.158, end: 5.787, text: "Why are you still here?" },
      { start: 6.087, end: 8.042, text: "Because the city is still here." },
    ],
  },
  {
    id: "clip08b",
    duration: 4.042,
    captions: [
      { start: 0.0, end: 0.838, text: "That's Constantine the Eleventh." },
      { start: 1.138, end: 1.976, text: "The last Roman emperor." },
      { start: 2.276, end: 3.323, text: "He doesn't know that yet." },
      { start: 3.623, end: 4.042, text: "You do." },
    ],
  },
  {
    id: "clip09",
    duration: 11.072,
    captions: [
      { start: 0.0, end: 0.872, text: "This is it." },
      { start: 1.172, end: 5.822, text: "The first waves are the irregulars \u2014 hired fighters, sent in to make the defenders tired." },
      { start: 6.122, end: 6.994, text: "Wave after wave." },
      { start: 7.294, end: 11.072, text: "And the bells \u2014 every church in the city is ringing at once." },
    ],
  },
  {
    id: "clip10a",
    duration: 4.064,
    captions: [
      { start: 0.0, end: 0.396, text: "No." },
      { start: 0.696, end: 1.882, text: "No no no." },
      { start: 2.182, end: 2.973, text: "That's Giustiniani." },
      { start: 3.273, end: 4.064, text: "He's hit." },
    ],
  },
  {
    id: "clip10b",
    duration: 4.042,
    captions: [
      { start: 0.0, end: 4.042, text: "They're carrying him to the ships." },
    ],
  },
  {
    id: "clip10c",
    duration: 4.042,
    captions: [
      { start: 0.0, end: 1.893, text: "Every man on that wall just watched their best hope leave." },
      { start: 2.193, end: 3.053, text: "The wall is still standing." },
      { start: 3.353, end: 4.042, text: "The men just broke." },
    ],
  },
  {
    id: "clip11",
    duration: 11.072,
    captions: [
      { start: 0.0, end: 1.189, text: "Wait \u2014 that's the emperor." },
      { start: 1.489, end: 3.628, text: "He's taking off everything that says who he is." },
      { start: 3.928, end: 6.306, text: "And he walks into the fight like a common soldier." },
      { start: 6.606, end: 7.795, text: "Nobody ever sees him again." },
      { start: 8.095, end: 8.57, text: "No body." },
      { start: 8.87, end: 9.346, text: "No grave." },
      { start: 9.646, end: 11.072, text: "The last Roman emperor just disappears." },
    ],
  },
  {
    id: "clip12",
    duration: 7.072,
    captions: [
      { start: 0.0, end: 2.942, text: "Those flags mean it's over." },
      { start: 3.242, end: 4.419, text: "1,100 years." },
      { start: 4.719, end: 7.072, text: "It took one morning." },
    ],
  },
  {
    id: "clip13a-1",
    duration: 4.064,
    captions: [
      { start: 0.0, end: 2.509, text: "Everyone is running to one building." },
      { start: 2.809, end: 4.064, text: "The Hagia Sophia." },
    ],
  },
  {
    id: "clip13a-2",
    duration: 4.042,
    captions: [
      { start: 0.0, end: 4.042, text: "There's a story \u2014 an angel comes down at its doors and saves the city at the last second." },
    ],
  },
  {
    id: "clip13b",
    duration: 5.042,
    captions: [
      { start: 0.3, end: 0.99, text: "Listen." },
      { start: 1.29, end: 3.361, text: "They're not screaming." },
      { start: 3.661, end: 5.042, text: "They're praying." },
    ],
  },
  {
    id: "clip14",
    duration: 19.072,
    captions: [
      { start: 2.4, end: 3.052, text: "That's him." },
      { start: 3.352, end: 4.33, text: "That's Sultan Mehmed." },
      { start: 4.63, end: 5.934, text: "He's 21 years old." },
      { start: 6.234, end: 10.473, text: "This city was the capital of the Roman Empire for over 1,100 years." },
      { start: 10.773, end: 11.751, text: "Today, that ends." },
      { start: 12.051, end: 18.572, text: "It becomes the new capital of the Ottoman Empire instead \u2014 and stays that way for the next 470 years." },
    ],
  },
  {
    id: "clip15",
    duration: 22.042,
    captions: [
      { start: 0.0, end: 1.844, text: "The city gets a new name." },
      { start: 2.144, end: 3.066, text: "You know it." },
      { start: 3.366, end: 3.674, text: "Istanbul." },
      { start: 3.974, end: 6.125, text: "But the Hagia Sophia is still standing." },
      { start: 6.425, end: 9.806, text: "This dome above me \u2014 you can walk under it today." },
      { start: 10.106, end: 10.721, text: "Same floor." },
      { start: 11.021, end: 11.636, text: "Same doors." },
      { start: 11.936, end: 13.165, text: "The empire ended here." },
      { start: 13.465, end: 14.387, text: "The building didn't." },
      { start: 14.687, end: 18.683, text: "Nobody who stood here that morning is alive to tell you about it." },
      { start: 18.983, end: 20.212, text: "This building still can." },
      { start: 20.512, end: 21.742, text: "Hazel... out of time." },
    ],
  },
];
// Owner-locked 2026-08-23: serif chunk style copied verbatim from Troy
// (pai-pro-tooling/troy/captions_data.mjs) -- fixed project-wide style
// spec, not per-episode.
export const SUB_STYLE = {
  fontName: "Liberation Serif",
  fontSize: 50,
  outline: 2,
  shadow: 1,
  marginV: 320,
  marginLR: 60,
  spacing: 2.5,
};
