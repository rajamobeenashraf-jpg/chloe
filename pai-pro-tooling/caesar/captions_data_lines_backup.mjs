// Episode 6 (Julius Caesar, Rome 44 BC) — caption cue data for qc_pass.mjs.
// Adapted from the Salem (Ep 2) reference implementation per
// creative-direction.md §16 (canonical style + mandatory rules below).
//
// Timing methodology: every cue's start/end comes from real ffmpeg
// silencedetect (noise=-30dB:d=0.25) run on each clip's OWN current,
// owner-accepted audio file — never from the generation-prompt text or
// guessed pacing, per §16. Where one detected speech run covers more than
// one scripted line (no silence gap between them), the run was split
// proportionally by word count into per-sentence cues — a documented
// estimate, not a re-measurement, flagged here rather than presented as
// exact. Two genuinely ambiguous long single-segment runs (clip 1's final
// line, clip 6's opening shout+push) got a dedicated mouth-frame
// cross-check per §16's mandatory rule; the rest use the segment timing
// directly. All of this is a first pass — real sync issues will be easiest
// to actually spot once captions are burned in and visible on the real cut,
// so treat this as ready-to-review, not beyond correction.
//
// Speaker tags: set only for lines that are NOT the protagonist's, so a
// caption never reads as her own mismatched dialogue. Clip 4's two Roman
// men were never given proper names in the script (just "Anxious Roman" /
// "Second Roman" descriptively) — used as the tags since no better name
// exists.
//
// Clip 11b content note: independent transcription (4 passes total, 3 of 4
// agreeing, including the most targeted forced-choice attempt) indicates
// the actually-rendered line is "The sun's setting" — NOT the scripted
// "The soothsayer" — meaning the intended callback to Spurinna (clip 5)
// did not make it into the final render. Captioned to match what is
// actually said, per §16's rule that captions reflect real audio, not
// intent. Flagged to the owner separately; not fixed here.
//
// Full-episode transcript-first verification sweep (owner-requested,
// applying the same method used to catch clip 3's phantom caption to every
// dialogue clip): each clip was independently re-checked against (a) a
// fresh Gemini `ask`-mode transcript and (b) a fresh re-run of the real
// silencedetect measurement above — never trusting either alone, since
// Gemini's raw timestamps carry their own ~0.3-0.5s imprecision and
// silencedetect can't resolve a pause inside one continuous speech run
// that's shorter than its detection threshold. Confirmed real errors found
// and fixed:
//   - clip 3: a phantom caption for a line never actually spoken (fixed
//     earlier; see git history).
//   - clip 6: Artemidorus's echo is actually three separate speech bursts
//     ("Red." / "Read first." / "A fine system."), not two — the previous
//     data merged the first two into one caption and left the third
//     entirely uncaptioned. Separately, the opening line's guessed 1.5s
//     split point was off by ~2s from where the audio actually breaks (two
//     independent, converging Gemini passes placed it at 3.25s/3.85s).
// Every other dialogue clip (1, 2, 4, 5, 7, 7b, 8, 10, 11) was re-verified
// this same way and its existing content/timing confirmed correct — no
// changes needed. A disputed exact-wording question (clip 8: "big enough
// to stop it" vs. a Gemini free-transcript mis-paraphrase) was resolved
// with a forced binary-choice re-ask rather than trusting the free-form
// transcript's wording verbatim.
//
// Owner-requested editorial trims/removal (post-review, after the caption
// sweep above — verified against the actual footage before being applied,
// per the owner's own explicit "verify first" instruction):
//   - clip 4: trimmed from 10.054s to 5.75s, dropping the "he said that
//     like a weather report / cloudy, with a chance of coup" ending
//     entirely per owner request. Verified first: the shot is one
//     continuous unbroken take from ~4.5s to the old end, so there was no
//     invisible mid-shot edit point available — the new end (5.743s, right
//     where the real audio for "...decline Decius" stops, before the next
//     line's silence gap) is a clean AUDIO cut but a hard visual stop, not
//     a scene change. Original full clip preserved as
//     `clip4_full_pretrim.mp4`.
//   - clip 8: removed from the episode entirely, per owner request —
//     confirmed its two lines ("And the one man big enough to stop it—" /
//     "—just got invited to a very convenient chat.") span nearly the
//     whole clip, so this is a full-clip removal, not a partial trim.
//     clip 7b now cuts directly into clip 9.
//   - clip 9: trimmed from 9.208s to 5.917s, removing the
//     push-to-the-side / hold-against-the-wall action entirely per owner
//     request (this was the same shelter beat root-caused and fixed
//     earlier this session — identity, then ending-pose trim — but the
//     owner's later call was to cut the beat altogether, not adjust it).
//     Verified the physical action first (push 6-7s, hold 7-8s of the old
//     9.208s clip) and picked 5.917s as the new end: the latest point
//     before Artemidorus's hand makes contact with her, inside one
//     continuous held "spots him, reacts" beat (5.3-5.9s all read as the
//     same sustained expression, so there was flexibility in exactly
//     where to cut). Original full clip preserved as
//     `clip9_v3_full_pretrim.mp4`.
// Both new adjacent transitions this creates (clip 7b -> clip 9, clip 9 ->
// clip 10) were independently re-measured, not assumed:
//   - clip 7b -> clip 9: real ~11.3-point YAVG gap (clip 9 brighter),
//     color channels essentially matched (no temperature shift) — same
//     brightness-only easing treatment as the other cross-clip gaps this
//     episode, applied to clip 9's opening.
//   - clip 9 -> clip 10: with clip 9's NEW (brighter, sunlit-plaza) ending
//     the real gap dropped to only ~4.3 YAVG points, color channels
//     matched — small enough that it no longer needs correction. The
//     PREVIOUS custom grade on clip 10's opening (tuned against clip 9's
//     OLD, dimmer colonnade-shadow ending) is now stale and was reset back
//     to plain rather than left in place to over-correct a gap that no
//     longer exists.
//
// Clip 9, second pass: also trimmed from the FRONT (2.80s cut, on top of
// the 5.917s end-trim above), per a further owner request to open the clip
// on the crowd's arrival rather than the woman's own intro. This surfaced
// a real gap in the original caption sweep: she actually speaks in the
// first ~1.7s ("I'm just in..." / "...was that screaming?") — dialogue
// that had never been transcribed or captioned at all, because this whole
// clip had incorrectly been marked dialogue-free from the start, which
// excluded it from the transcript-first sweep entirely. Now moot since
// that whole span is cut, but worth recording as a real methodology gap,
// not just a timing one. Cut point verified by direct frame inspection,
// not assumed: initially judged (wrongly — corrected here rather than
// silently) that the shot would settle into a clean profile+crowd
// composition by ~3.0-3.2s; closer frame-by-frame inspection showed that
// whole span (3.0s to at least 4.4s) is actually a sustained back-of-head/
// hair-obscured hold as the camera follows her turn, with no clean
// composition anywhere in it. The real best point is earlier, at 2.80s:
// a clear profile shot with the panicked crowd just becoming recognizable
// at the temple steps, right before the hair-swing obscures her face.
// Final clip: 3.125s (was 9.208s originally, now covers only the
// turn-and-spot beat, ending at the same 5.917s point as before, before
// contact with Artemidorus). Original full clip remains preserved as
// `clip9_v3_full_pretrim.mp4`; the intermediate back-trim-only state
// wasn't separately kept since it's fully reproducible from the pretrim
// master plus the documented cut points above.
//
// This second trim moves clip 9's opening frame yet again, so the clip 7b
// -> clip 9 brightness correction above was re-measured a third time
// against the new 2.80s reference frame (not carried forward from the
// previous fix) — see the applied correction in qc_pass output / build
// history for the exact params used.

export const CLIPS = [
  {
    id: "clip1",
    duration: 11.051995,
    captions: [
      { start: 0, end: 2.155, text: "Rome. March 15th, 44 BC. The Ides." },
      { start: 3.457, end: 6.698, text: "Sixty senators are walking through this city right now with knives hidden under their togas." },
      { start: 7.172, end: 8.494, text: "By noon, Caesar is dead." },
      { start: 9.175, end: 9.507, text: "And me?" },
      { start: 10.220, end: 11.051995, text: "I'm right in the middle of it." },
    ],
  },
  {
    id: "clip2",
    duration: 8.057007,
    captions: [
      { start: 0, end: 0.843, text: "One rectangle." },
      { start: 1.164, end: 1.77, text: "Six meters." },
      { start: 1.77, end: 3.602, text: "Zero pins where I need pins." },
      { start: 3.997, end: 6.571, text: "They invented CONCRETE before the safety pin." },
      { start: 7.308, end: 7.68, text: "Stay." },
      { start: 7.68, end: 8.057007, text: "STAY." },
    ],
  },
  {
    id: "clip3",
    duration: 10.053991,
    captions: [
      { start: 0.613, end: 1.700, text: "Okay, when in Rome —" },
      { start: 3.190, end: 4.693, text: "It's vinegar. Why is it vinegar?" },
      { start: 5.081, end: 6.35, text: "What lives in the water?" },
      { start: 6.35, end: 7.540, text: "Best not to know, domina.", speaker: "Posca Vendor" },
      { start: 7.894, end: 10.053991, text: "3/10. Builds character, dissolves teeth." },
    ],
  },
  {
    id: "clip4",
    duration: 5.75,
    captions: [
      { start: 0, end: 0.755, text: "Is he coming or not?" },
      { start: 1.075, end: 2.725, text: "He is not. Calpurnia dreamt him dead.", speaker: "Anxious Roman" },
      { start: 2.725, end: 5.743, text: "Decius has gone to fetch him. One does not decline Decius.", speaker: "Second Roman" },
    ],
  },
  {
    id: "clip5",
    duration: 8.057007,
    captions: [
      { start: 1.669, end: 2.233, text: "You told him." },
      { start: 2.591, end: 3.393, text: "Beware the Ides." },
      { start: 4.288, end: 5.576, text: "The Ides are not yet ended.", speaker: "Spurinna" },
      { start: 6.497, end: 8.057007, text: "...Right. I'm going to go stand in the road." },
    ],
  },
  {
    id: "clip6",
    duration: 12.050998,
    captions: [
      { start: 0, end: 3.25, text: "Make way — petitions for Caesar!" },
      { start: 3.85, end: 6.049, text: "In my time, when a letter can't wait, we mark it." },
      { start: 6.399, end: 6.861, text: "Red." },
      { start: 7.253, end: 8.888, text: "Means read-this-FIRST." },
      { start: 9.409, end: 9.668, text: "Red.", speaker: "Artemidorus" },
      { start: 10.314, end: 10.887, text: "Read first.", speaker: "Artemidorus" },
      { start: 11.408, end: 12.050998, text: "A fine system.", speaker: "Artemidorus" },
    ],
  },
  {
    id: "clip7",
    duration: 13.072834,
    captions: [
      { start: 0, end: 2.5, text: "Read it yourself — ALONE!", speaker: "Artemidorus" },
      { start: 2.5, end: 6.359, text: "THE RED ONE! RED MEANS FIRST—" },
      { start: 7.303, end: 13.072834, text: "The sheriff in 1875 at least tipped his hat." },
    ],
  },
  {
    id: "clip7b",
    duration: 9.055782,
    captions: [
      { start: 0, end: 1.499, text: "You should take your guards today." },
      { start: 2.034, end: 4.485, text: "I've had guards enough for one lifetime.", speaker: "Caesar" },
      { start: 4.748, end: 9.055782, text: "Better to die once than live afraid of it.", speaker: "Caesar" },
    ],
  },
  {
    id: "clip9",
    duration: 3.125,
    captions: [], // no dialogue — pure sound/faces/physical action
  },
  {
    id: "clip10",
    duration: 8.057007,
    captions: [
      { start: 0.429, end: 0.910, text: "He held it." },
      { start: 2.765, end: 4.697, text: "He held the warning in his HAND." },
      { start: 6.329, end: 8.057007, text: "He just never opened his hand." },
    ],
  },
  {
    id: "clip11",
    duration: 13.072834,
    captions: [
      { start: 0, end: 1.569, text: "They did it to save the Republic." },
      { start: 2.999, end: 7.489, text: "It dies in there with him — what comes next is emperors, for five hundred years." },
      { start: 8.344, end: 13.072834, text: "And they're renaming a month for him. You've said his name every July of your life." },
    ],
  },
  {
    id: "clip11b",
    duration: 10.041667,
    captions: [
      // REGENERATED 2026-08-24 (owner-directed): new closing line + a
      // specific emotional performance (glassy/welling eyes, at most 1-2
      // tears falling, on the edge of crying). Owner approved the take.
      // Content/timing below re-derived from scratch against the NEW
      // audio, since this is entirely new dialogue never checked before.
      // First line matched the submitted script exactly (real
      // silencedetect: 0.714-1.772, 2.195-3.810).
      //
      // Second line's exact wording took real back-and-forth to settle,
      // recorded here rather than smoothed over: four independent Gemini
      // passes (free transcript, forced binary choice, an acoustic-only
      // isolated re-listen, a full-phrase isolated re-listen) gave FOUR
      // different readings, and 3 of 4 leaned toward NOT "Hazel" —
      // seemingly corroborated by dense mouth-frame sampling showing one
      // sustained mouth shape. That conclusion turned out to be wrong:
      // the frame check only covered the first third of the actual word
      // window (a sampling error, not a real finding), and running the
      // word-chunk pipeline itself — the same tool used for the rest of
      // the episode, and normally more reliable than an ad-hoc Gemini ask
      // — told a different story. Biased toward "He's out of time." via
      // the initial_prompt, it still transcribed "Hazel" independently
      // (a biased model going AGAINST its own bias is a strong signal).
      // Re-run biased toward "Hazel — out of time." instead: 92% match,
      // whisper's free transcript came back matching the script exactly,
      // word for word. Verdict: it IS "Hazel — out of time." — the
      // sign-off survived this generation after all. Corrected here
      // rather than left standing on the earlier, weaker conclusion.
      { start: 0.714, end: 1.772, text: "Twenty-three wounds." },
      { start: 2.195, end: 3.810, text: "Only one of them was necessary." },
      { start: 6.847, end: 8.035, text: "Hazel — out of time." },
    ],
  },
];

// Every transition is a TRUE hard cut (plain concat, zero blend) — the
// project's own mandatory rule (§16), and independently re-confirmed this
// session on clip 11b: a crossfade between two independently generated
// frames that aren't pixel-aligned produces real ghosting, not a smooth
// blend, regardless of duration. No direct dissolves anywhere in this cut.
//
// ONE exception: clip 9 -> clip 10 is a brief (0.2s) fade-to-black-and-back
// instead of a hard cut, per explicit owner request. Verified the direct
// crossfade alternative first — generated an actual test blend and it
// produced the same ghosting as clip 11b's (visibly doubled faces, temple/
// birds bleeding through), so it was rejected with evidence, not just cited
// as a rule. Fade-to-black avoids that failure mode entirely: each clip
// fades independently to/from black (a neutral color, not the OTHER clip's
// pixels), so there's no misaligned-frame blend to ghost. Implemented as a
// baked-in `fade`/`afade` on the tail of qc/clip9_qc.mp4 and the head of
// qc/clip10_qc.mp4 (video + matching audio fade, both clips' concat-facing
// durations unchanged) rather than a build_final_cut.mjs filter-graph
// change, consistent with how this episode's other per-clip corrections
// (brightness/color ramps) are layered on top of the standard QC pass.
export const TRANSITIONS = [
  { after: "clip1", type: "cut" },
  { after: "clip2", type: "cut" },
  { after: "clip3", type: "cut" },
  { after: "clip4", type: "cut" },
  { after: "clip5", type: "cut" },
  { after: "clip6", type: "cut" },
  { after: "clip7", type: "cut" },
  { after: "clip7b", type: "cut" },
  { after: "clip9", type: "fade" },
  { after: "clip10", type: "cut" },
  { after: "clip11", type: "cut" },
];

// Canonical caption style, verbatim from creative-direction.md §16
// (owner directive 2026-08-20, position-updated, 720x1280 PlayRes units).
export const SUB_STYLE = {
  fontName: "DejaVu Sans",
  fontSize: 42,
  outline: 2.6,
  shadow: 1.2,
  marginV: 320,
  marginLR: 60,
};
