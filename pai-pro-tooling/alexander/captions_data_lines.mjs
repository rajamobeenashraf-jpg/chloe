// Alexander/Gaugamela episode — LINE-level caption windows (input to
// make_word_chunks.py, which does the precise word-level alignment via
// faster-whisper against these as ground-truth text + rough windows).
// Per CLAUDE.md's caption system: windows here are the clip's own
// `timeline` field from clips.json (already derived for wpm/duration math,
// so already a reasonable per-line approximation), cross-checked against
// real `ffmpeg silencedetect` output on the downloaded clip audio where
// available. Text is verbatim from clips.json's `dialogue` field (Clip 5b's
// text corrected to match its accepted video's actual delivered audio —
// see clips.json's Clip 5b `_status`).
//
// Clip 2's video was regenerated 2026-08-31 to match the current 17s
// script (its only previously-recovered take was a stale 9s pre-pacing-
// override version); windows below are for the CURRENT script, verify
// against the new render once QC'd.

export const CLIPS = [
  {
    id: "1",
    duration: 9.056,
    captions: [
      { start: 0.20, end: 6.80, text: "Gaugamela. 331 BC. Tonight, an empire two hundred and twenty years old gets a new owner — and the man who's about to take it—" },
      { start: 7.81, end: 9.00, text: "—is still asleep." },
    ],
  },
  {
    id: "2",
    duration: 9.056,
    captions: [
      { start: 0.00, end: 1.10, text: "My lord. MY LORD.", speaker: "PARMENION" },
      { start: 1.50, end: 5.40, text: "You could have taken them in the dark last night. Why do you STILL refuse a night attack?", speaker: "PARMENION" },
      { start: 5.40, end: 7.40, text: "I will not steal a victory, Parmenion. Let it be daylight, and let it be earned.", speaker: "ALEXANDER" },
      { start: 7.40, end: 7.90, text: "You write quickly?", speaker: "ALEXANDER" },
      { start: 7.90, end: 9.00, text: "...Apparently— —as of right now, yes." },
    ],
  },
  {
    id: "3",
    duration: 18,
    captions: [
      { start: 0.10, end: 0.90, text: "What's that?" },
      { start: 0.90, end: 6.70, text: "Homer. Aristotle's own copy — he corrected it himself. Sleeps under my pillow. With the dagger.", speaker: "ALEXANDER" },
      { start: 6.70, end: 8.80, text: "You brought a book to a war." },
      { start: 8.80, end: 16.10, text: "I brought the only book that matters. Achilles didn't get old either. I intend to beat that record too.", speaker: "ALEXANDER" },
    ],
  },
  {
    id: "4",
    duration: 13.056,
    captions: [
      { start: 0.00, end: 3.80, text: "Darius pulled soldiers from more than twenty different peoples for this. Twenty." },
      { start: 3.80, end: 7.30, text: "This is Bucephalus. Only he's ever been allowed to ride him." },
      { start: 7.30, end: 13.00, text: "That one — Darius's own mother and wife. Captured two years ago. Still here." },
    ],
  },
  { id: "5a-aerial", duration: 4.064, captions: [] },
  { id: "5a", duration: 7.041667, captions: [] },
  {
    id: "5b",
    duration: 4.041667,
    captions: [
      { start: 0.80, end: 2.90, text: "We're not staying back. We're going WITH them." },
    ],
  },
  { id: "5c", duration: 4.064, captions: [] },
  { id: "6a", duration: 6.080, captions: [] },
  { id: "6b", duration: 4.064, captions: [] },
  {
    id: "7",
    duration: 10.080,
    captions: [
      { start: 6.20, end: 10.00, text: "...That's him. He's LEAVING. And now everyone else is too." },
    ],
  },
  {
    id: "8",
    duration: 9.056,
    captions: [
      { start: 3.00, end: 4.90, text: "Get all of it down?", speaker: "ALEXANDER" },
      { start: 6.00, end: 9.00, text: "Every word. Even the ones about stealing victories." },
    ],
  },
  {
    id: "9a",
    duration: 15.072,
    captions: [
      { start: 1.00, end: 13.60, text: "Cyrus built that empire two hundred and twenty years ago. It ended today, because a man who overslept his own war refused to win it in the dark — and because one king turned his chariot around." },
    ],
  },
  {
    id: "9b",
    duration: 14.080,
    captions: [
      { start: 0.50, end: 10.10, text: "He keeps Homer under his pillow. He wants to outlive Achilles. Eight years from today, he's dead at thirty-two — and somehow that's still longer than he thought he'd get." },
      { start: 10.90, end: 13.30, text: "Hazel — out of time." },
    ],
  },
];
