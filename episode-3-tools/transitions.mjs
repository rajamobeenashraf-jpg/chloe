// Episode 3 — per-join transition durations (seconds).
// Shared by qc_pass.mjs (caption crossfade margins) and build_final_cut.mjs
// (xfade/acrossfade) so caption margins always match the actual blends.
//
// REVISED (owner feedback round 2, 2026-08-20): the first cut used a 0.4s
// video crossfade on every "continuous action" join. That reads as a real
// dissolve only when both halves are the same physical camera move — these
// clips are each independently generated, so adjacent clips don't share an
// exact frame, and a 0.4s dissolve exposed the mismatch as visible
// ghosting/blur instead of smooth motion. Fix, matching the discipline that
// actually worked on Episode 1: keep video and audio blend on the SAME
// short duration per join (equal duration is what keeps the final video
// and audio tracks the same length — decoupling them drifts audio out of
// sync with picture over 11 joins), default nearly everything to a quick,
// clean cut (0.10–0.18s — enough to avoid a jump-cut, too short to ghost),
// and reserve a real, slower dissolve for the one join that's meant to
// read as a deliberate time-jump (10→11, night → dawn).
//
// TRANSITIONS[i] is the join between clip i+1 and clip i+2 (1-based clips).
export const TRANSITIONS = [
  0.10, // 1→2  smash cut: cold open → rewind (card on clip 2)
  0.10, // 2→3  scene change: day wharf → tavern evening
  0.15, // 3→4  same tavern, time-continuous
  0.15, // 4→5  same table, continuous
  0.10, // 5→6  scene change: tavern → night church
  0.18, // 6→7  continuous action: crate → tower stairs
  0.10, // 7→8  position jump: tower top → churchyard
  0.10, // 8→9  scene change: churchyard → farm lane
  0.15, // 9→10 continuous night flight
  0.50, // 10→11 time passing: night barn → dawn hilltop — deliberate dissolve
  0.15, // 11→12 same dawn, continuous
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
