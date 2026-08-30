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

## PART 6 — OFFICIAL SEEDANCE 2.5 DOCTRINE (Higgsfield/ByteDance guide, learned 2026-08-30)

**Source + access note:** `higgsfield.ai` itself is egress-blocked from this environment.
The doctrine below comes from a complete, provenance-labelled mirror of the official
Dreamina/ByteDance Seedance 2.5 Prompt Guide + Higgsfield's platform catalog: the
`OSideMedia/higgsfield-ai-prompt-skill` repo (cloned locally this session — SKILL.md,
MODE-PLAYBOOKS.md, VFX-PIPELINE.md, and 10 paste-ready templates). Items marked
[OFFICIAL] are the vendor's own doctrine. The one thing NOT reachable is the blog's
video examples gallery — the owner can open higgsfield.ai/blog/seedance-2-5-prompting-guide
and higgsfield.ai/seedance-2-5-community directly, or add higgsfield.ai to this
environment's network allowlist.

### The core formula [OFFICIAL]
```
<Subject> performs <primary action> in <scene and environment>.
The visuals feature <visual style>.
Use <shot size, camera angle, camera movement>.
Audio includes <dialogue, ambience, SFX, music>.
```
Four modes chosen BEFORE writing: `t2v` · `omni_reference` · `video_edit` ·
`video_extension`. **We have only ever used the first two — the last two are new
capabilities for this project:** `video_edit` changes ONE scoped thing inside an
existing clip (sole-master + edit scope + preserve list + Timeline Inheritance for
subject swaps) without regenerating it; `video_extension` adds 4–30s before or after
an approved clip (align the boundary frame FIRST; chain ceiling ~60s).

### Corrections to how WE have been prompting (each verified against the S13 test prompt)
1. **Dialogue belongs ONLY in the audio clause, in `{}` brackets** — never inside
   action/timeline prose. Official syntax: `()` music · `<>` SFX · `{}` dialogue ·
   `【】` subtitles, plus a language line: "Dialogue language: <variety>. <Character>
   says: {line}". We have always written dialogue inside the beats — change this.
2. **The subtext trap:** ANY readable text in action prose is a voicing request — a
   quoted glance-meaning, a remembered line, a sign — the model SPEAKS it. Write
   visible behavior instead.
3. **No negation stacks.** Seedance has no negative-embedding architecture; a bare
   constraints list ("No cuts. No music. No...") parses as scene description. Legal
   form: positive declarations with short lock tails ("single continuous take, one
   camera angle"; "Diegetic dialogue and environmental SFX only. NO BGM. No
   subtitles."). Our standard CONSTRAINTS block must be rewritten this way.
4. **Age-blind rule [OFFICIAL house]: never write age words** — the content filter
   tightens on age language; write role + build + clothing instead ("a stocky ranch
   owner in an open-collar shirt", not "37 years old"). ⚠ CONFLICT with our locks:
   the v5 frozen identity string contains "early twenties" and my Pablo draft lock
   contains "37 years old". The identity string is OWNER-LOCKED — changing it needs
   the owner's decision; flag raised, not changed.
5. **Beat lines name characters by name + one visible marker, never by @handle** —
   a handle used as a sentence subject is the classic cause of one character
   rendering as two people. (Our S13 prompt said "at @Audio2's tempo" inside a beat.)
6. **Reference roles get role + exclusion + a FIDELITY GRADE:** full-preserve /
   partial-preserve / attribute-transfer (name the target) / loose-guide.
7. **Multi-view reference sets must include ONE strong-expression view** — all-neutral
   sets teach the face at rest, and "the first line of dialogue invents a mouth."
   Canonical four: front · back · facial details neutral · facial dynamics + teeth
   under strong emotion. ⚠ Hazel's v5 canon set is all-neutral — proposing a
   strong-expression addition is an owner decision (canon change).
8. **First/last frames are PROMPT STATEMENTS on 2.5** ("@Image 1 is the first
   frame...") — there is no start_image role; this upgrades our S2/S6 start-frame
   method: declare the role in prose, one sentence per anchor, never merged, matching
   aspect ratios. Multi-keyframe: "Use @Image 1 through N as keyframes in this order."
9. **2.5 caps at 720p** (no 1080p/4K lane — explains our render size); 4K comes from
   the separate upscale step (post-approval, per the standing rule) or Seedance 2.0.

### Structure doctrine [OFFICIAL]
- **Stage long clips**: `[Generation Goal]` → `[Stage N]: Initial state / ONE primary
  event / explicit visible End state` → `[Maintain Consistency]` (identity, count,
  clothing, prop ownership, spatial direction, audio).
- **Split by JOB, not only length:** physics vs performance, action vs dialogue, and
  "the beat that needs room" are separate generations stitched in post. "A perfect
  30s render does not exist" — generate per job, assemble.
- **Spatial anchor blocks** (multi-character template): per character — screen
  position (thirds + x/y%), frame occupancy, depth layer, body orientation, pose,
  gaze, CONTACT POINTS (prevents floating), state lock; cross-character — distance,
  eyeline, crossing rule, negative space; then one dominant camera move and a FINAL
  FRAME line. This is our eyeline rule generalized into full blocking.
- **Emotion = 2–4 observable cues** in a trigger→reaction→feature-change→expressed
  form; FACS AU codes exist for muscle-level facial beats.
- **Camera:** one dominant move per shot; FOV in degrees beats mm; niche terms get
  translated into the visible result.
- **Engine rules (shared 2.0/2.5):** exit-frame = implicit cut · off-screen =
  nonexistent · ≤3 tracked characters · avoid reflection/mirror shots.
- **Episode Style Prefix:** one frozen global style block glued verbatim to every
  prompt of a production (format, lighting, color 60:30:10, skin realism, acting,
  physics, continuity, audio policy) — edit once, applies everywhere; per-scene
  override = replace one line locally. This formalizes our per-episode palette lock;
  adopt as standard for the Escobar episode.
- **Material budget:** 30 images / 10 videos (≤30s total) / 10 audio (≤30s total),
  50 max; stable ranges much lower (1–8 image subjects).

### Cross-check with her method (Part 1)
Her drawn camera-path annotation (numbered points + arrows on the reference image) is
not in the official guide — it is her own technique on top of it, and it complements
the official first-frame prompt statement: annotated start frame carries the PATH,
the prose carries the role. Use both together.

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

## PART 6 — HER PACING DOCTRINE, MEASURED (2026-08-30, owner-ordered pacing study)

Source: 8 timestamped line-by-line machine watch-throughs (Socrates 784K, Victoria,
William, Wild West, Genghis, Anne Boleyn, Washington, Joan — pacing-study jobs
job_81caac55 / job_702bb83a / job_2db27e24 / job_1b104f5f / job_62024d8c /
job_e9b732fe / job_a9a9ffb2 / job_de89dded). Every spoken line transcribed with
start/end times; wpm computed per line (±20-30% timestamp noise; patterns are
consistent across ~170 lines, individual numbers are approximate).

### The seven measured laws of her pacing

1. **Baseline is fast-natural: ~180–260 wpm, median ≈ 200-210.** She is NEVER slow.
   Informational/factual host runs are her fastest sustained delivery (190–275).
   Codas run 204–296 — fast, with 0.3–0.4s clause pauses, never dragged.
2. **"Slow" is never slow phonemes — it is SHORT LINES plus PLACED PAUSES.** Every
   moment that reads slow measures 67–150 wpm only because the line is 1–4 words
   ("Considerably." / "A saint." / "All of them?" / "Release her.") or carries one
   0.3–0.6s pause. Phoneme rate stays natural throughout. Gravity = brevity.
3. **Emotion accelerates, gravity shortens.** Tearful/agitated/panicked lines are
   FAST (Anne tearful ≈260, agitated ≈257; Victoria panic ≈300). The weighty
   figure-lines slow only via structure: William's "was it worth it? The blood…
   the crossing… all of it?" ≈180 overall carried by three 0.3–0.4s pauses.
4. **Command register (our Pablo): two/three-word sentences + authority pause,
   ≈90–170 overall.** "Release her." ≈92. "Not today. Walk away." ≈109. Fast
   phonemes, one dominant pause. Our accepted Holden pacing ref (151 wpm overall,
   pauses at "…Silver" and "or lead", phonemes ≈250) sits exactly on this pattern.
5. **Speaker-to-speaker gaps are TIGHT: 0.1–0.4s (mode 0.2–0.3s).** The exchange
   is ping-pong. Long silences (1.5–8.8s) are never between lines of one exchange —
   they are chapter transitions, reaction holds, and music/b-roll beats.
6. **Line-length discipline: median 7–10 words (1.5–3.5s).** 20–36-word lines
   exist only as educational runs and codas, delivered fast. The pace FEELING of a
   dialogue scene comes from turn rate (short lines, tight gaps), not speech rate.
7. **The micro-line reaction beat is her signature:** the figure's awe/shock is a
   1–3 word line + a gap ("A horse?" / "4 seconds?" / "…How much?"). Cheap to
   render, huge retention value.

### What this means for our pipeline (validation + correction)

- **VALIDATED: the owner's locked wpm formula lands inside her real bands.** Hazel
  neutral 211 / urgent 264 and figure-deliberate ~168 match her measured registers.
  The formula stays.
- **CORRECTED USE OF THE TARGET:** the target governs PHONEME-RATE + pause budget,
  not a stretched read. Achieve a register her way: (a) write the line SHORT,
  (b) keep phonemes fast-natural, (c) place 1–2 deliberate pauses (0.3–0.6s) on the
  weightiest boundary, (d) keep speaker gaps 0.2–0.3s in the TIMELINE, (e) reserve
  long holds for transitions/reactions, never mid-exchange. A 6-word command line
  measuring ~150 overall with correct pause placement IS her pattern — do not chase
  a higher overall number by deleting its pauses.
- **Pacing-reference recipe (updates the ElevenLabs/seed_audio rule's step 1):**
  calibrate the reference take to fast-natural phonemes + the line's designed
  pauses, then verify BOTH numbers with faster-whisper: overall wpm (with pauses)
  against the register examples above, and pause placement/duration against the
  script's design. Tempo-only refs whose pauses land wrong are re-made.
- **TIMELINE prompts now state gap lengths explicitly** (e.g. "0.2s beat, then…",
  "he lets 0.4s of silence sit before 'Silver'") — her tight-gap exchange rhythm is
  a promptable, verifiable spec.

## PART 7 — HER FRAMING DOCTRINE, MEASURED (2026-08-30, owner-ordered 10-video framing study)

Source: shot-by-shot framing passes on 10 videos (William, Washington, Anne Boleyn,
Socrates, Victoria, Joan, Genghis, Wild West, Marilyn, Mary Queen of Scots — jobs
job_a7d7a194 / job_8a35685b / job_b96100a9 / job_2124d0ad / job_6e747cfd /
job_18be65d8 / job_901e6650 / job_ecf46ac1 / job_41fdbf8c / job_8ade2789).
~300 shots catalogued: size, placement, headroom, edge crops, camera height.

### The measured framing laws

1. **Two-shot sizes are LOCKED to medium or looser.** When both characters must be
   fully in frame together, she shoots WAIST-UP or MID-THIGH-UP, side-by-side in
   the left/right thirds, standing unnaturally close ("proximity cheating") so
   faces stay in the central width; outer elbows may graze the edges but faces and
   torsos are complete. Never a chest-up two-shot with the two spread to opposite
   edges.
2. **At chest-up and tighter, both NEVER fit — she switches to the DIRTY SINGLE:**
   the speaker gets 70–85% of the frame, the listener is deliberately reduced to a
   10–20% slice on one edge (cheek/shoulder/hair). The aggressive crop reads as
   style because the speaker's face owns the center. The rare tight two-shots pack
   the two faces into the central 70% (cheeks nearly touching), shoulders sliced.
3. **Headroom is bimodal.** Singles/close-ups: 0–8% — hats, crowns, hair graze or
   are sliced by the top edge to maximize the face; faces sit in the UPPER THIRD
   so captions land clean in the center/lower third. Two-shots/masters: 15–40%
   (up to 65% in cathedrals) — the vertical surplus is spent on environment and
   landmark stacking, never on empty air.
4. **Bottom cuts are standardized:** close-up → collarbone/upper chest;
   medium → waist/belt; medium-full → mid-thigh above the knee. Feet are
   sacrificed except in full-body master/portal/architecture shots.
5. **Camera height: eye-level for ALL dialogue** (seated scenes drop to seated
   eye-line). Low angles only for monuments/authority beats; high/selfie angle
   only for vlog-style frames. No arbitrary angle changes inside an exchange.
6. **Depth beats width.** To fit more than two people, or a listener + speaker at
   close size, she stages along the Z-axis (foreground slice, midground subject,
   background context) — never by shrinking people side-by-side.
7. **The escalation rhythm per scene:** master/two-shot establishes geography →
   ping-pong of dirty singles / clean singles for the exchange → clean close-up or
   ECU only at the climax beat. Two-shot ratio varies by video (55–85%) but the
   SIZES above are invariant.

### Application ruling on our clip 7.1 (the owner's catch)

7.1 v1 broke law 1: a chest-up two-shot with Hazel and Pablo spread to opposite
edges — both edge-cropped with dead space (the glass) in the center, which reads
as an accident, not her style. Two compliant options for the locked-frame menace
beat: (a) LOCKED WAIST-UP two-shot, the two closer together, both fully inside
the width, veranda headroom above; or (b) keep the lock but cover the exchange
her way — waist-up two-shot for Hazel's question, hard cut to a DIRTY SINGLE on
Pablo (Hazel's shoulder slicing one edge, his face owning the center, zero
headroom) for "Everyone accepts something. Silver… or lead." Option (b) is the
more-her choice: her close menace beats are always dirty singles.

**Framing spec is now a MASTER-RULE checklist item:** every shot's prompt states
shot size + which body line the bottom edge cuts + headroom % + who owns the
center + what the edges are allowed to crop, per the laws above.
