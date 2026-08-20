// Episode 3 — per-join transition durations (seconds).
// Shared by qc_pass.mjs (caption crossfade margins) and build_final_cut.mjs
// (xfade/acrossfade) so caption margins always match the actual blends.
// Technique per creative-direction.md §11: scene changes CUT (0.12s),
// continuous motion DISSOLVES (0.4s), time-passing goes slower (0.5s).
//
// TRANSITIONS[i] is the join between clip i+1 and clip i+2 (1-based clips).
export const TRANSITIONS = [
  0.12, // 1→2  smash cut: cold open → rewind (card on clip 2)
  0.12, // 2→3  scene change: day wharf → tavern evening
  0.4,  // 3→4  same tavern, time-continuous
  0.4,  // 4→5  same table, continuous
  0.12, // 5→6  scene change: tavern → night church
  0.4,  // 6→7  continuous action: crate → tower stairs
  0.12, // 7→8  position jump: tower top → churchyard
  0.12, // 8→9  scene change: churchyard → farm lane
  0.4,  // 9→10 continuous night flight
  0.5,  // 10→11 time passing: night barn → dawn hilltop
  0.4,  // 11→12 same dawn, continuous
];

export const CLIP_COUNT = 12;

// Locked caption style (creative-direction.md §11 rounds 2/3/5 — round 4's
// TikTok-style enlargement was explicitly reverted by the owner).
export const SUB_STYLE =
  "FontName=DejaVu Sans,FontSize=8,PrimaryColour=&H00FFFFFF," +
  "OutlineColour=&H00000000,BorderStyle=1,Outline=1.1,Shadow=0.4," +
  "Bold=1,Alignment=2,MarginV=55,MarginL=70,MarginR=70";

// "EARLIER TODAY" card on clip 2 (round 3 sizing; round 5 confirmed border).
export const CARD = {
  clip: 2,
  text: "EARLIER TODAY",
  fontsize: 46,
  borderw: 3,
  bordercolor: "black@0.8",
  showSeconds: 2.0,
};
