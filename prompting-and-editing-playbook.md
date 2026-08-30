# Prompting & Editing Playbook — reverse-engineered from @cosminacreates (2026-08-30)

**Source:** machine watch-throughs of all 11 reachable reels (6 story passes in
`cosminacreates-reel-study.md`, plus this session: Caesar 2.6M, Churchill 149K,
Romania POV 113K, Pegasus 104K, the workflow tutorial, and 2 editing-only passes on
Elizabeth I and Catherine Howard). **This file is wired into the MASTER RULE: consult
it at prompt-writing and at script-writing time, alongside `PROMPT_LEARNINGS.md`.**
Validated in-project once already: the Elizabeth-reel recreation test
(`42662376-ed9f-4746-b6e0-4be3c30596a2`, S13) applied the interview-scene grammar and
rendered correctly on the first attempt.

---

## PART 1 — HER ACTUAL PROMPT (captured verbatim from the tutorial reel's screen)

From reel DcO-UnQtpAQ ("Bringing Elizabeth I painting to life"), Magnific AI app,
model Seedance 2.5, settings 9:16 · 1080P:

```
Nothing in the scene moves or animates. Only the camera moves.

Surreal, dreamlike, sweeping motion with natural motion blur. Shot on
Leica glass, 4K, 9:16, shallow depth of field, dramatic chiaroscuro,
candlelit key from frame left, fine film grain. Zero AI aesthetic, zero
painterly smearing.

DURATION: 15 seconds.
```

**Her workflow:** take the source image → draw the camera path DIRECTLY ON IT (red
arrows tracing the move, numbered points: `1` = camera start, `2` = camera end) →
upload the annotated image as the reference → short prompt → generate.

**What her prompt style teaches (adopt into ours):**
1. **Hardest constraint first, as a short declarative:** "Nothing in the scene moves.
   Only the camera moves." Not buried in a constraints list — the FIRST line.
2. **Lens/film-stock vocabulary instead of adjectives:** "Shot on Leica glass,
   shallow depth of field, chiaroscuro, candlelit key from frame left, fine film
   grain" — concrete photography language the model can execute, vs. "cinematic".
3. **Anti-AI negatives, blunt and short:** "Zero AI aesthetic, zero painterly
   smearing." (Same instinct as our realism block, far more compressed.)
4. **Draw the camera path on the reference image** — a visual-spatial instruction the
   model follows better than any text geometry. This is her version of our S2
   start-frame method, extended to CAMERA MOVEMENT, and it directly attacks our S12
   camera-geometry problem class. **New standard practice: for any shot needing a
   specific camera move, annotate the start still with the numbered path + arrows
   before generating.**

## PART 2 — THE STORY FORMULA (pattern across all watched reels, view-weighted)

Why Caesar (2.6M) beat everything: universal figure + facts anchored in things the
viewer touches every day (July on your phone's calendar, a salad, office slang) + a
myth-bust (comment bait) + comedy that turns into genuine emotion at the end. The
rest of the series confirms the same skeleton:

1. **The figure speaks FIRST, to her, in second 0 — always mid-interaction** (grabbed,
   caught, challenged, or poking the lens). Never a solo narration intro. A top
   banner pill ("Visiting X in YEAR") carries the premise so dialogue never explains.
2. **Power-dynamic hook:** the figure's authority vs. her calm modern frankness
   ("not remotely scared of you, if that helps") — tension or comedy in one line.
3. **Question-driven chapters, 10–25s each.** Every chapter opens with her direct
   question; each question is a fresh mini-hook. Chapter order ESCALATES:
   novelty/gross-out trivia → wealth/power → the personal wound → THE HARDEST
   QUESTION (saved for ~70–80%) → legacy.
4. **Fact-on-prop:** every fact is staged on an object, action, or place (candy →
   rotten teeth; ring → executed mother; phone calendar → July; salad → myth-bust).
   Facts are never recited into air.
5. **Daily-life anchors:** at least one fact the viewer physically touches in their
   own life. This is the single biggest shareability driver (Caesar).
6. **A myth-bust or "wait, WHAT?" stat** = designed comment bait.
7. **Countdown irony in plain numbers:** "May 1536. Anne has 15 days left. Nobody in
   this room has told her."
8. **Emotional whiplash architecture:** comedy/absurdity front half → one slow, quiet
   tragic beat placed late → philosophical close. The tonal DROP is the retention
   payoff; pure comedy or pure tragedy both underperform her mixed reels.
9. **The figure notices HER strangeness** (premise reflected back in-world): "You have
   looked at me all day like a woman reading a book she has already finished."
10. **The figure gets the final quotable monologue** (what viewers quote in comments),
    then the host gets a 1–2 line poetic coda ("We still wake up inside his calendar
    every single morning").

## PART 3 — THE EDIT GRAMMAR (from the two editing-only passes)

- **Every transition is a HARD CUT** (confirmed cut-by-cut on both reels — matches
  our own locked §16 rule; her "smoothness" is sound design, not dissolves).
- **Visual punctuation:** crash zoom / snap punch-in + bass-drop SFX lands exactly ON
  the gross/shock fact (the rotten-teeth beat). Whip-pan blur + whoosh enters/exits
  high-energy chapters. Both are compatible with our hard-cut lock: punch-ins are
  within-clip (edit-stage digital zoom), whips end clip A in motion blur → hard cut.
- **Shot/idea changes every 2–10s** in energetic chapters; **shot length GROWS and
  framing TIGHTENS as emotion rises** (final monologues run 14–25s in close-up).
  Proximity escalation = the emotional dial.
- **Per-chapter music themes:** tense drone → playful harpsichord/period theme →
  dance energy → somber cello → warm resolving strings. The music SHIFTS at every
  chapter boundary; SFX list per clip (cloth, foley, sub-drops, whooshes).
- **Flashbacks/inserts enter on clean hard cuts sold by AUDIO** (the next scene's
  soundscape starts at the cut) — exactly our §6 J-cut discipline.
- **Captions:** bottom-center bold all-caps, 1–4 words, word-synced, active word
  highlighted gold/yellow; top banner pill only during the hook (~first 6–10s);
  small static watermark top-right.

## PART 4 — WHAT WE ALREADY HAD RIGHT (don't relearn)

Hard cuts only (§16) · word-synced chunk captions · audio continuity across cuts ·
per-character speech pacing · identity via reference images, never text · the
empathy-core beat (§2) — her tragic reels are our empathy beat stretched to a whole
video.

## PART 5 — ADOPTION CHECKLIST (used when writing any script/prompt from now on)

- Script level: figure-speaks-first cold open · banner carries premise ·
  question-driven escalating chapters · fact-on-prop for every fact · one daily-life
  anchor + one myth-bust/shock stat · countdown numbers · hardest question at
  ~70–80% · figure notices her · figure's closing monologue + her short coda.
- Prompt level: hardest constraint as line 1 · lens/film-stock vocabulary · blunt
  anti-AI negatives · annotated-image camera paths for any directed move · the
  S13-validated @-tag role template for multi-reference scenes.
- Edit level: crash-zoom + SFX on the shock stat · whip-into-hard-cut for chapter
  changes · per-chapter music themes · proximity escalation · gold keyword captions
  (gold variant still pending owner decision).
