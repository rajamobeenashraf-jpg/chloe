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

## PART 8 — THE COMPLETE DIMENSION LEDGER (owner mandate 2026-08-30: EVERYTHING she does, verified — no assumed dimensions)

Process rule (permanent): a dimension counts as LEARNED only when a dedicated,
question-specific study has measured it and its doctrine is written in this
playbook. General walkthroughs do not count — they only answer what was asked.
Any dimension below marked PENDING blocks "we have applied everything" claims.
Discovered-by-owner gaps (pacing, framing) are the failure mode this ledger
exists to prevent.

| # | Dimension | Status | Where |
|---|---|---|---|
| 1 | Story structure, hooks, chapters, beats | MEASURED | Parts 2, 29-video corpus |
| 2 | Edit grammar: cut rhythm, punch-ins, whips, J-cuts | MEASURED | Part 3 |
| 3 | Camera movements (crane, push, orbit, tracking) | MEASURED | Parts 2-4 |
| 4 | Official Seedance prompting doctrine | MEASURED | Part 4 |
| 5 | Speech pacing per situation | MEASURED | Part 6 |
| 6 | Framing/composition (shot sizes, crops, headroom) | MEASURED | Part 7 |
| 7 | Captions system (chunks, gold karaoke, no tags) | MEASURED + owner-locked | CLAUDE.md, scripts |
| 8 | Portal/time-travel transition device | MEASURED + upgraded | Part 1 scripts, study doc |
| 9 | Continuity/scene-connection (no-jumps system) | MEASURED | Part 9 |
| 10 | Music system (cues, per-chapter states, silence) | MEASURED | Part 10 |
| 11 | Sound design (ambience, SFX, bridges) | MEASURED | Part 10 |
| 12 | Graphics/overlays (banner, secondary text, effects) | MEASURED | Part 10 |
| 13 | Figure/host VOICE character + accents | MEASURED | Part 11 |
| 14 | Color & grade (era vs modern, palette, grain) | MEASURED | Part 11 |
| 15 | Motion quality (blur, slow-mo, stabilization, artifact-hiding) | MEASURED | Part 11 |

| 16 | Emotion-to-camera mapping (what earns a zoom/drone/hold) | MEASURED | Part 12 |
| 17 | Performance patterns per emotion (micro-sequences) | MEASURED | Part 12 |
| 18 | Wardrobe/environment/host styling (era dressing, two modes, cry-scene realism spec) | MEASURED | Part 13 |
| 19 | Humor: joke taxonomy + delivery grammar (expressions, timing, roles) | MEASURED | Part 14 |

MASTER RULE hook: before any prompt is finalized, walk this ledger — every
MEASURED dimension must appear as concrete prompt text where applicable; a
PENDING dimension relevant to the shot must be studied first, not guessed.

## PART 9 — HER CONTINUITY SYSTEM, MEASURED (2026-08-30; Socrates, William, Anne studies)

The five rules that make 6-8 location jumps feel like one continuous day:

1. **Topic chains the location.** Every jump is motivated by the conversation
   itself: talk of lineage → the portrait gallery; writing-vs-speech → the museum;
   reading texts → the bookstore; "I can take you to see her" → the coronation.
   The line BEFORE the cut names or implies the destination — the audience arrives
   already knowing why.
2. **Zero-lag arrival.** Dialogue or motivated ambience starts at 0-1s after
   nearly every cut (tour-guide voice, lecture in progress, café room tone).
   Longer silent establishes (3-8s) are spent ONLY on emotional resets (the Thames
   bench, the coronation reveal). Never dead air after a jump.
3. **Invariants carry identity across every cut:** wardrobe 100% frozen (the 'B'
   necklace, the toga, the crown — never changes across centuries), screen
   geography frozen (host camera-left, figure camera-right in virtually every
   two-shot, all video long — a hard 180° discipline), consistent light family
   per act.
4. **Contrast cuts define new space:** extreme close-up → wide establish (or
   reverse) at scene changes; landmark + on-screen place/year text ("Westminster
   Abbey 1559") grounds the viewer in one second.
5. **Emotional punctuation = transition license.** A laugh, a tear, or a
   punchline lands, THEN the cut — the beat's closure is what makes the jump feel
   earned rather than abrupt.

APPLICATION CHECK (Escobar scripts): topic-chaining largely present (hippo line →
lakeshore; money question → warehouse; "Were you always rich?" → memory) — but
audit each seam for rule 1 and add rule 3's fixed screen geography: HAZEL =
frame-LEFT, PABLO = frame-RIGHT in every two-shot of both episodes (matches the
already-shot 7.1a spec). Wardrobe already frozen. Zero-lag arrival to be written
into every scene's first shot.

## PART 10 — HER MUSIC, SOUND & GRAPHICS SYSTEM, MEASURED (Joan, Genghis studies)

MUSIC: per-chapter cues, each location/beat gets its own motif (somber pads →
triumphant brass → festive parade → intimate piano → final crescendo); music DUCKS
low under every line (≈ -18dB feel), swells only BETWEEN dialogue; deliberate
dropouts/silence on punchlines and on the portal moment; comedy videos ride one
light pizzicato bed with a sad-slide gag variation; final line often lands on an
unresolved low hit. → Our per-scene music states match this; add: duck-under-
dialogue as an edit rule, swell-only-between-lines, dropout ON punchlines.
SOUND: every location has a distinct ambience bed (reverb character changes:
stone hall wet → street dry → cathedral huge); SFX punctuate actions and cuts
(paper rustle, door slide, hoofbeats); portal = deep whoosh + resonant hum;
dialogue always clean and front. → matches our diegetic-only prefix; keep
per-location reverb character as an explicit prompt line.
GRAPHICS: top-center white pill banner with emoji, visible ONLY until the first
scene change (~10s), then gone permanently; 1-3 word ALL-CAPS white bold captions,
bottom-center, word-pop synced; landmark place/year serif overlays on era jumps;
portal VFX overlay; rapid fade-to-black endings. → Banner duration rule is NEW:
our banner should die at the first location change, not persist.

## PART 11 — HER VOICE, GRADE & MOTION RULES, MEASURED (Washington study)

VOICES: strict binary — figure = lower pitch, measured cadence, formal
era-appropriate diction, faint period/regional accent; host = bright modern
conversational GenAm. Never let the figure sound modern. → Pablo's soft, low,
unhurried voice with gentle Colombian accent conforms; Hazel's lock conforms.
GRADE: period/past scenes = warm low-key amber, muted earth, painterly grain;
modern scenes = clean daylight high-key, natural skin; golden-hour finales;
recurring palette anchored by wardrobe colors. → matches our style prefix +
memory-grade rule; Part 2's 2026 scenes should grade CLEANER/brighter than
Part 1's 1987 (add to Part 2 style prefix when shooting).
MOTION: smooth gimbal/dolly energy, organic 24fps blur, no erratic handheld;
speed-ramps softened at portal moments; AI-artifact hygiene = stable torsos in
dialogue, subtle head turns, real prop interactions grounding hands, clear
subject/background separation. → matches S12/§8.2 and our prop-contact habit;
keep "stable torso, subtle head movement" as dialogue-shot prompt text.

## PART 12 — EMOTION-TO-CAMERA MAP + PERFORMANCE PATTERNS, MEASURED (2026-08-30, owner-ordered 10-video study: Anne, Victoria, Genghis, William, Joan, Marilyn, Washington, Socrates, Mary, Van Gogh)

### A. The camera-per-emotion map (dimension 16)

| Emotion | Camera treatment | Edit/sound |
|---|---|---|
| Shock/revelation | Sudden push-in or CRASH ZOOM to CU/ECU (crash zoom reserved for temporal/dimensional shock) | hold 2-3s on the frozen face; sting or breath-whoosh |
| Sincere grief/tears | Camera goes DEAD STATIC at tight CU/ECU — never moves during peak sadness | LONGEST holds of the video (3-5s); soft piano/strings swell or near-silence; background chatter faded |
| Awe/scale | Low angle + upward tilt with the character's rising gaze; DRONE/AERIAL only when the scale of legacy cannot fit an eye-level frame | ~4s reveal sequences; swelling score |
| Gravitas (heavy question/answer) | Two-shot → cut to tight CU, architectural scale behind; long lingering holds | near-silence or low drone swell |
| Laughter | Static MCU/OTS; DO NOT cut on the punchline — let it play | natural chuckle unmasked; ambient only |
| Deadpan comedy | Locked-off frame; refuse to cut; let the silence hang | dialogue dry and front; micro music dropouts on punchlines |
| Dignity/defiance/exit | Static profile two-shot; hold until the character has fully left frame | portal hum/score resolution |
| Catharsis peak | Shot-size LADDER: medium → tighter → centered ECU at the single-tear peak; handheld stops moving exactly at the vulnerability peak | longest uninterrupted hold (~4.5s); score crescendo timed to the answering line |
| Direct-address coda | Centered MCU, slow smooth push-in, unbroken lens eye contact | swelling score; end on the punch + fast black |
| Slow push-in generally | = intimacy/realization. Crash zoom = shock only. Orbit = coda. Aerial = legacy scale. Every move must be EARNED by its beat. |

### B. Performance micro-sequences (dimension 17) — write these INTO prompts, in order

- **SINCERE CRY:** eyes soften → well with unshed tears → ONE tear spills and runs → lips press/tremble subtly → slow blink → head stays STILL or drops a fraction. Shoulders never heave; stillness carries it. (Full sobbing exists only at joy-grief peaks: hands rise to mouth → caught gasp → face crumples → embrace.)
- **SHOCK:** eyes snap wide → lips part in a silent intake → total body freeze 2-3s → only then speech.
- **AWE:** head tilts back as eyes track UP the object → mouth drops open → a grounding touch (rail, ledge, prop clutched to chest) → whispered fragment line.
- **GRAVITAS:** posture locks → voice drops a register → slow horizontal gaze turn → heavy swallow → pauses BETWEEN clauses; eyes never leave the listener.
- **LAUGH (3-phase):** onset — blink, stare softens, mouth corners twitch; peak — head tips back, chest expands, audible breathy laugh; settle — chin lowers, voice returns lower, warm eye contact resumes.
- **DEADPAN:** TOTAL stillness, locked eyeline, no blink, flat inflection, a timed beat of silence before and after the line.
- **DIGNITY EXIT:** chin lifts → steady unblinking eye contact → deliberate turn on the heel → walks away WITHOUT looking back, posture unbent.
- **BEING-MOVED (vindication):** downcast gaze → slow blinks fighting welling → subtle chin micro-tremor → quiet fragment line; camera static tight, golden light if available.
- Host-vs-figure comedy law: the figure stays 100% committed and grave (never plays for laughs); the HOST carries the reaction energy (eyebrow raises, open-palm gestures, fourth-wall glance).

Both dimensions are prompt-text requirements: an emotional beat's shot prompt must
carry its micro-sequence and its earned camera treatment explicitly.

## PART 13 — WARDROBE, ENVIRONMENT & HOST-STYLING DOCTRINE, MEASURED (2026-08-30, 10-video study: Catherine Howard, Elizabeth 1575, Anne of Cleves, Henry VIII, Anne Boleyn 1536, Mary I, Marie Antoinette, NY 1925, Georgian makeover, Met Gala 1948)

### A. Host styling — TWO MODES (the governing discovery)
- **MODE A — VISITING THE PAST:** she is FULLY era-costumed as a high-status
  in-world figure (Tudor gowns with French hoods, flapper dress with finger-wave
  bob, 1948 satin gown with victory rolls, Georgian brocade with towering updo).
  Era headwear, era JEWELRY (pearls, period pendants, drop earrings, rings),
  era hair architecture — a DIFFERENT hairstyle per era/video.
- **MODE B — BRINGING TO 2026:** she stays modern (sundress/streetwear/casual
  polish) while the FIGURE keeps era dress — the costume mismatch IS the comedy
  engine and the "he is really here" marker.
- **IDENTITY ANCHOR ACROSS ALL LOOKS:** her signature makeup never changes —
  clean luminous base, sharp winged black liner, defined brows, satin rosy-nude
  lip (era-modified only when the era demands: 1920s dark lip, 1948 red lip,
  Georgian rouge) — plus her recognizable face. Hair color constant; STYLE varies.
- **Hazel application:** Part 1 (visiting 1987) = MODE A, era-blended dressed-up
  1987 look; Part 2 (2026) = MODE B, modern dressed-up. Per the owner workflow
  lock: 3 dress options (each w/ jewelry + shoes) → owner picks → Claude styles
  hair + makeup to the dress and moment.

### B. Era environment dressing laws
1. Architecture sells the era first: oak linenfold paneling, leaded diamond
   windows, tapestries, stone vaults / art-deco marquees, coffered speakeasy
   ceilings / gilded Rococo mirrors — named explicitly in prompts.
2. Light is always MOTIVATED and period-true: beeswax candles in candelabras,
   window god-rays with dust, firelight; volumetric haze for luxury interiors.
3. Era-specific LUXURY props anchor status: sugar-tower centerpieces, silver
   cigarette cases, parchment + wax seals + quills, crystal chandeliers, vintage
   cars, live-band instruments. One or two per scene, historically loaded.
4. Background extras carry social stratification in period dress (servants vs
   nobles; waiters vs patrons); figures are costumed from PORTRAITURE (Holbein
   silhouettes for Henry, the 'B' necklace for Anne).
5. Materials vocabulary in prompts: velvet, damask, brocade, fur trim, bullion
   embroidery, pearls — weight and texture read as wealth on camera.
6. Era-transition device: costume/makeup change shown as story (the Georgian
   makeover) when the format allows.

### C. The Catherine Howard realism findings (crying + naturalism reference)
- Crying built in LAYERS: pink-rimmed waterlines and inner-corner redness first,
  glassy welling with meniscus highlights, ONE irregular tear path (never
  uniform), pressure-flushed cheek after a face-rub, chin-wrinkle + lip tremble,
  grief-muscle brow (inner corners pulled up and in), breath hitches and a
  cracking voice; full sob (teeth visible, clenched fists) reserved for the
  panic peak. Redness is subsurface (eyes/nose/cheeks), not surface makeup.
- Physical co-regulation sells it: hand-holding with real weight over the stone,
  a cheek caress, foreheads leaning in — contact with anatomical resistance.
- Realism stack: pore-level skin with peach fuzz, shallow DOF (~f/2 portrait
  lens feel), organic handheld breathing, motivated window/candle light with
  haze, 3-6s shots in shot/reverse-shot continuity, J/L-cut audio, voice track
  with real vocal fry and mid-sentence gasps driving the lip sync.
- These are now the CRY-SCENE PROMPT SPEC for any future heavy-crying beat.

## PART 14 — HUMOR: JOKE TAXONOMY + DELIVERY GRAMMAR, MEASURED (2026-08-30, 10-video study: Mozart, Napoleon, Henry VIII, Casanova, Beethoven, Elizabeth-dentist, Newton, Karl Marx, Shakespeare, Tesla)

### A. Her joke types (dimension: what the joke IS)
1. **Anachronistic misread** — the figure interprets a modern thing through era
   logic (tube map = battle plan; "This man McDonald is a great general";
   "Execution with a gesture?"; server room caressed like a sacred organ).
2. **Deadpan literalism** — flat factual answers to grand questions ("Cow. Just
   cooked cow." / "Gravity still appears to be functioning.").
3. **Understatement deflation** — the host punctures era grandeur with modern
   banality ("No one cares." / "Now it costs £35 to get in." / "We've been here
   four minutes.").
4. **Absurd sincerity** — total commitment to the ridiculous (waltzing at a
   rave with one tear; weeping over the dog film Beethoven; "I was born for
   this" at a war game).
5. **Ego/legacy beat** — the figure meets their own fame ("I said that in 470 BC
   for free. 22 euros?!" / "I wrote this!" / "My head is huge.").
6. **Status inversion** — history's giant treated as an unruly toddler; the
   host as exhausted babysitter ("I'm not explaining." / "He does this
   everywhere.").
7. **Smash-cut contradiction** — a to-camera claim cut in 0.2s to its opposite
   ("I think he's feeling it." → primal terror).
8. **Zero-beat ping-pong** — clipped Q/A volleys with no gaps ("They train for
   war?" "No." / "For free?" "Also yes.").
9. **Dark-history deadpan** — era brutality stated calmly, the host's shocked
   take IS the punchline ("I prefer my method.").
10. **Fourth-wall conspiracy** — whispered asides making the viewer accomplice
    ("He's not letting go of the phone.").

### B. Delivery grammar (dimension: how it's PLAYED)
- **Expression vocabulary (host):** the asymmetric one-corner smirk; the
  eyebrow flash on punchlines; the flat-lidded deadpan drop (smile collapses to
  flat mouth + half-lidded stare); the empathetic cringe (hunched shoulders,
  hand to clavicle, darting eyes); the patronizing head-tilt; the GENUINE
  laughter break reserved for peak absurdity (validates the audience's laugh).
- **Expression vocabulary (figure):** 100% sincere commitment — unblinking
  wide-eyed conviction or heavy-lidded flat stare; NEVER winks at the joke;
  aristocratic stillness amplifies absurdity.
- **Timing rules:** 0.5–1s frozen beat BEFORE a dry punchline; 1–2 beat HOLD on
  the absurd image after it (frozen Oreo, oil bottle mid-air) — never cut on
  the punchline; zero-beat confirmations for ping-pong; smash-cut contradictions
  at 0.2s; the silent tag (an expression, not a line, closes the beat).
- **Role law:** figure = in-scene, era-serious, the chaos engine; host = the
  modern anchor who mediates to camera. Visual punchline precedes verbal.
- **PLAIN-LANGUAGE COMPATIBILITY (project lock):** her sarcasm/irony is carried
  by FACES, CUTS, and VOICE — instantly readable, never coded language the
  viewer must decode. Our plain-language rule and her humor grammar are fully
  compatible: jokes stay plainly WORDED (literal word choice); the irony lives
  in expression, timing, edit, AND vocal delivery. Plain-language governs word
  choice ONLY — it does NOT mean toneless/monotone delivery (see axis C below,
  added 2026-08-30 after this exact confusion produced a flat, un-ironic
  Escobar take).

### C. Vocal delivery grammar (dimension: how the VOICE plays it) — verified 2026-08-30, targeted cross-check of 3 videos (Caesar, Henry VIII, Elizabeth I) specifically isolating vocal tone on ironic/dry lines vs sincere lines
**Even her flattest, most deadpan dark-humor lines are never actually toneless.** Every ironic/sarcastic/dry line found across all three videos does at least one of these exactly on the punch word, with zero exceptions:
- **A deliberate pause** immediately before and/or after the ironic word/phrase (the "milking it" beat).
- **A controlled pitch shift ON the key word** — a RISE for overt wit/absurdity ("acceptable," "the most Roman thing I have ever witnessed," "underbothered" — pitch leaps to mimic or puncture pomposity), or a controlled DROP for dry understatement/dark-history-deadpan ("gift shop," "about that," "oopsie," and even her darkest line — "I kept her under head for nineteen years" — delivered "relatively flat" but still with composed, deliberate downward pitch and rhythmic control, never genuine zero-inflection monotone).
- **A distinct vocal texture**: dry glottal quality, suppressed audible amusement/smirk in the resonance, or (for colder sarcasm) a sneer/bite — contrasted sharply against her sincere lines in the SAME videos, which are breathier, warmer, slower-cadenced, with soft vocal fry and no punch-word pitch event.
**Rule: any prompt for an ironic/dry-humor beat must specify a deliberate pause + pitch-shift (rise for overt wit, drop for dry/dark understatement) on the specific punch word(s), in addition to the plain word choice and the facial delivery grammar (axis B) — "flat vocal tone" and "zero inflection" must never be used as blanket instructions for an ironic line, even a dark-deadpan one.** This is now a permanent, project-wide requirement for every future humor/irony beat, this episode and all others — not a one-off fix.

- **Escobar application:** Pablo already sits in her deadpan-commitment lane
  ("The rats are a business expense." / "…How much?" / "That one is true.") —
  his delivery spec = era-serious flatness, zero wink, post-line stillness (his
  irony, if any, is axis-B-only per the figure rule below — figures never wink).
  Hazel's lens asides get the host repertoire (deadpan drop on "He bought
  hippos.", cringe/flat looks on "I'm not explaining.", eyebrow-flash beats)
  PLUS axis C vocal treatment, and the money scene runs zero-beat ping-pong
  with the crash-zoom reserved for "A week."
  **Camera/addressee correction (2026-08-30):** the Role law above — "host =
  the modern anchor who mediates to camera" — was already documented from the
  original 10-video study and applies directly to Hazel's "Silver is money.
  Lead is a bullet." aside (7.1c): as the host delivering a wry, dark-humor
  TRANSLATION of what a figure just said, this is a to-camera mediation beat
  by her own established grammar, not an addressed-to-the-figure line — yet
  the first three 7.1c generations all locked her eyeline on Pablo instead.
  Confirmed independently: her own directly-analogous self-aware dry asides
  ("I might be in trouble... Oopsie.") are explicitly described as
  "fourth-wall-breaking confession[s]," while in-scene figure-to-figure dark
  lines (Elizabeth's own dialogue) stay addressed within the scene — the
  distinguishing factor is WHO is delivering the irony: the host mediating/
  translating goes to camera; a figure's own in-scene dialogue stays in-scene.
  This was a second instance of an already-documented rule not being checked
  against the specific beat before writing the prompt — flagged the same way
  as the plain-language/irony miss, for the same reason: check EVERY
  applicable rule against the specific beat, not just the ones that come to
  mind first.

### D. Camera-address weight tier + the CAMERA-ADDRESS FREEZE TECHNIQUE (verified 2026-08-30, cross-checked against her own BTS-revealed method, Part 1 above)
Her to-camera addresses split into two tiers by emotional weight, confirmed by direct frame comparison of two examples:
- **Light/comedic reaction aside** (e.g. the Caesar-salad "acceptable... Roman" beat): camera stays completely STATIC; the in-scene figure keeps moving/reacting naturally, not frozen at all. Use this tier for zero-beat ping-pong, deadpan-literalism, and other light joke types.
- **Tense/weighty confessional aside** (e.g. "I might be in trouble... Oopsie."): the camera performs a continuous slow PUSH-IN toward her face, and the in-scene figure goes completely motionless — zero blink, zero breath, zero micro-movement — for the full beat, isolating her private address from the frozen world around her. Use this tier for dark-history-deadpan and any beat where the irony carries real stakes (this is Escobar 7.1c's tier).

**Frozen background figure's FOCUS STATE (sharp vs. soft) is a separate creative call from the freeze itself — owner override 2026-08-30, Escobar 7.1c:** freeze (motion) and focus/blur (depth of field) are independent axes; do not assume soft-focus/shallow-DOF is required just because a figure is frozen for this tier. Escobar 7.1c's script originally called for Pablo "soft at the frame edge," but the owner explicitly rejected a blurred rendering for this beat and locked him fully sharp/in-focus, same clarity as the speaking host, for the entire freeze. Treat the background figure's focus state as a per-scene decision the script must state explicitly — sharp or soft — rather than defaulting to shallow-DOF as an assumed part of "frozen background presence."

**Push-in mechanics, precisely measured (2026-08-30, targeted re-analysis of the same beat, isolating the camera move only) — CORRECTED same day after being cross-checked against Part 1's directly-captured evidence:** the earlier version of this entry claimed the push-in is a post-process editing effect and instructed "do not ask Seedance to perform this camera move." That was an unverified leap from the parallax measurement, not something the measurement actually proved, and it directly contradicted the already-documented, verbatim-captured BTS evidence in Part 1 (her own screen-recorded prompt: "Nothing in the scene moves or animates. Only the camera moves," fed to Seedance 2.5 as a generation instruction, with the camera path drawn directly on the reference still). Corrected finding: **this IS achieved via prompting the model — zero parallax + uniform 2D scaling is exactly what a model-generated optical ZOOM looks like, as distinct from a DOLLY (which would show parallax as the camera physically travels through the scene).** The two are different real cinematographic techniques, not "model-generated vs. edited" — a zoom changes apparent framing by focal length/scaling with no parallax; a dolly changes it by physically moving the camera through space with parallax. Exact arc, still measured and valid: starts at waist-up/mid-shot framing → ends at chest-up medium-close-up framing; smooth digital ease-in, then a gentle ease-out/deceleration timed to land right as the punchline lands; no jitter, no handheld quality; total duration ~3.5-4.0 seconds. **Execution method (corrected): generate the beat via Seedance using the still-plus-annotated-camera-path method from Part 1** — annotate the reference still with the zoom's start point (waist-up frame line) and end point (chest-up frame line), and in the prompt name the technical term explicitly per the cinematographic-technical-terms rule: "camera performs a slow optical ZOOM-IN, not a dolly — zero parallax, uniform frame scaling around center, ease-in then ease-out timed to the punchline, ~3.5-4.0s" alongside the "nothing in the scene moves except [Hazel's face delivering the line] — everything else remains completely static like a photograph" freeze constraint as the first line. Do not build this as a separate ffmpeg/PyAV crop-zoom pass — that was the incorrect method; the annotated-still + zoom-prompt method is how she actually produces it and is what this pipeline should use.

**How to achieve the freeze WITHOUT fighting the video model (the key technical unlock):** do not instruct a full-motion generation to animate one figure while freezing another — that fights Seedance's motion bias and is exactly the mechanism behind the S14 static-pose-freeze bug in reverse (uncontrolled freeze) as well as the risk of an uncontrolled unfreeze. Instead, use her own verified technique (Part 1: the Elizabeth-painting-to-life BTS reel, same Seedance 2.5 pipeline we already run): generate the beat as a single photoreal STILL first — Hazel at her mid-line expression, the other figure captured naturally still behind her, because it is a photograph, not a video — then animate ONLY camera movement from that still, with her own validated prompt pattern as the template: the hardest constraint ("nothing in the scene moves except Hazel's face delivering the line — everything and everyone else, including [figure], remains completely static like a photograph") stated as a short declarative FIRST line, lens/film-stock vocabulary (not adjectives), and the camera path optionally annotated directly on the reference still (numbered points, arrows) the same way she draws hers. This makes the freeze structural — guaranteed by the source image — rather than an instruction the model has to obey against its own tendencies, and this is achievable on our exact pipeline because it is HER exact pipeline (Magnific AI's Seedance 2.5, per the tool-stack research in the production log).

**Applies project-wide, this episode and all others**: before writing any to-camera address beat, classify its weight tier (light/static vs. tense/push-in-freeze) per the list above, and for the tense tier, use the still-plus-camera-only method rather than a full multi-figure motion generation.

### E. CAMERA TECHNIQUE MENU (owner lock 2026-08-30, permanent, no exceptions) — verified across Elizabeth I, Catherine Howard, Caesar, and Henry VIII reels

**Why this exists:** camera-technique research on her channel was previously done ad hoc, per immediate need (the push-in was studied when we needed a push-in; Catherine Howard's realism was studied when we needed a crying scene) — no standing catalogue of her distinct camera techniques existed, so each new scene defaulted to whichever technique was already in front of Claude rather than a deliberate choice from the full set. This is exactly the failure mode the MASTER RULE warns against (extracting one dimension from a source and not the others), and it is why this entry did not already exist despite the source material having been referenced repeatedly. Corrected now, permanently:

Before writing any clip's camera direction, name which of these techniques the scene's dramatic register actually calls for — do not default to repeating whichever technique was used in the immediately preceding clip:

1. **Static lock (two-shot or single)** — camera never moves. Broader than one register: grounded conversational beats and the light/comedic camera-address tier (Section D above), but equally the default for menace/danger held by stillness (Escobar 7.1a/7.1b, "locked off — menace = stillness"), grief (5.1, "DEAD STATIC — the camera never moves on sadness"), a shock freeze (10.4), and a dignity/defiance exit (hold static until the character has fully left frame). The common thread is not "conversation" specifically — it is any beat where camera movement would compete with or undercut a performance that must carry the moment alone.
2. **Zoom-in freeze (optical zoom, not dolly)** — continuous zero-parallax push toward a speaker's face while a second figure holds completely motionless; used for the tense/weighty confessional-aside tier (Section D above). This is Escobar 7.1c's technique.
3. **Full 360° orbit with real parallax** — a physical camera orbit around a subject (rig/gimbal-style move, background sweeps past confirming true 3D travel, not a flat rotation); triggered by a broad comedic shock-reveal; subject is actively moving/reacting throughout, never frozen. Verified once (Elizabeth I reel, the teeth-laugh beat) — this is NOT the same technique as the zoom-in freeze and must not be substituted for it or vice versa.
4. **Partial arc (180° half-orbit, or a 45-90° micro-arc)** — a shorter rotational move around one or more subjects. Three distinct verified triggers, not one: (a) reframe a second figure (often the host) into view from behind/beside a first figure — verified repeatedly in the Catherine Howard reel around dancing and dialogue pairs, and Escobar 6.1 (Rosa stepping in); (b) reveal more of an environment's scale/architecture around a static or near-static subject rather than a second figure — Escobar 7.2 (the chamber memory); (c) carry a subject's own physical turn — a reflective/narrating beat pivoting into direct-to-camera address — so the camera's rotation and the character's turn land together as one motion, arriving on a tighter, closer frame exactly as the turn completes — Escobar 7.4 (Hazel turning from watching the chamber to addressing camera on the punch line). Distinct from both the full orbit and the zoom in all three cases.
5. **Slow dolly-in through a scene's center axis** — camera physically travels forward between two close subjects toward a third (often the host) positioned behind/between them; used for secrecy/intimacy beats (verified: Catherine Howard's clandestine-meeting beat).
6. **Rapid whip-zoom / crash push** — a fast, sharp snap-in to a tight close-up; used for a sudden fear/panic/shock trigger landing on a single word or name (verified: Catherine Howard's panic beat).
7. **Whip-pan** — fast horizontal pan with motion blur; used for hard scene-to-scene transitions, not within a single dramatic beat.
8. **Lateral Steadicam/arc tracking** — smooth constant-speed lateral glide around active movement (e.g. dancing, or two figures walking together — verified: Escobar 4.5); used to keep a background figure entering/exiting frame naturally during sustained motion, or to hold a steady witnessing distance alongside walking subjects without the "camera as a third character" weight of a dolly/arc.
9. **Crash zoom to extreme macro** (e.g. an eye/pupil) — a jarring, fast push to an extreme close-up of a small detail, used as a pattern-interrupt emphasis beat, not a normal reveal (Part 15.C).
10. **Fisheye/barrel-distortion POV** — an in-scene object (e.g. a thrown weapon) aimed directly at the lens with wide-angle distortion, breaking the fourth wall physically rather than through address (Part 15.C).
11. **Vertical crane pull-up into darkness** — a rising, receding camera move used SPECIFICALLY as an episode-ending device for a final farewell/resolution beat; distinct from any push-in/zoom and never used mid-episode as a transition (Part 15.C).
12. **Single-subject slow push-in (realization/intimacy/gravitas)** — a smooth push toward one speaker with no second figure required and no freeze mechanic — distinct from #2 (which requires a frozen second figure) and #5 (which requires travel toward a third figure). This is the plain "slow push-in = intimacy/realization" move named in Part 12's emotion-to-camera map, given its own row here because it is one of the most-used techniques in practice (Escobar 1.3 — first realization the man by the pool is Pablo; 8.2 — the grave-line gravitas beat; 9.2 — the episode's single longest shot, the monologue). Gap closed 2026-08-30: this existed conceptually in Part 12 but had no row in this menu, so it was not actually part of the pre-generation checklist despite being used three times in one episode.
13. **Crane-up for scale/geography resolve (mid-episode)** — camera rises smoothly to reveal a scene's full geography/scale from above eye-level; used for a "take in the whole picture" resolve beat (Escobar 1.6, the full-party geography shot). Distinct from #11: this is a mid-scene establishing/resolve move, never a darkness-fade, never an episode-ending device, and does not preclude further scenes after it.
14. **Drone/aerial establishing** — a true aerial view, reserved for scale that cannot fit an eye-level frame (a legacy/estate/battlefield too large to read from the ground). Named in Part 12's emotion map ("DRONE/AERIAL only when the scale of legacy cannot fit an eye-level frame") but, like #12, had no row here — folded in now so it is part of the same pre-generation check rather than a rule that only lived in a different Part.
15. **Rack focus** — the camera itself may be static or moving; focus shifts from one plane to another (foreground to background or back) to redirect attention within a single continuous shot, without a cut. Used for an unmoved figure's reaction while something else in the frame changes focus-plane (Escobar 3.3, "HIS UNMOVED SINGLE, RACK FOCUS"). This is a focus decision layered onto whatever movement/lock the shot already has, not a movement type in its own right — name it as an addition to whichever of #1-14 governs the shot's actual camera movement.
16. **Static/calm macro insert** — a still or near-still extreme close-up on a small tactile or contemplative detail (hands wrapping a brick of cash, rain beading on a child's curls); used for texture and grounding, not shock. Explicitly distinct from #9 (crash zoom to extreme macro), which is the jarring, fast-push version of a macro shot reserved for a pattern-interrupt emphasis beat — the same shot SIZE (extreme macro) serves two opposite registers depending on how the camera arrives there (a hard fast push vs. holding still/settling calmly), so always specify which register a macro insert is serving.

**CAMERA ANGLE / HEIGHT — a separate axis from movement, cross-referenced here for one-stop consultation (governing rule: Part 7, Law 5).** Angle and movement are independent decisions — any of the sixteen techniques above can be shot at any of these heights — so both must be checked, not just one:
- **Eye-level** — the default for ALL dialogue (seated scenes drop to seated eye-line). No arbitrary angle changes inside a single exchange.
- **Low angle** — monuments/authority/grandeur beats only (Escobar 10.1, the gate).
- **High/selfie angle** — vlog-style direct-address frames only (Escobar 2.1).

**Multi-scene proximity escalation (not a per-shot pick — cross-referenced, not duplicated here).** Shot size/distance tightening as tension rises across a run of consecutive scenes (Escobar S8-S10) is an episode-arc-level pattern already governed by the edit grammar (Part 2/3, "the emotional dial") — it belongs beside Part 15's other episode-arc doctrines (music arc, per-location color grade), not as a row in this per-shot table. Flagged here only so a camera decision doesn't miss it by looking solely at this menu.

**TRIGGER TABLE — dramatic register → technique** (the fast-lookup version of the above; use this first, then confirm against the fuller description if the register is ambiguous):

| Dramatic register / story moment | Technique |
|---|---|
| Grounded conversation, menace/danger stillness, grief, shock freeze, or dignity/defiance exit — anything performance must carry alone | 1. Static lock |
| Tense/weighty confessional aside, private stakes, world freezes around the speaker | 2. Zoom-in freeze |
| Broad comedic shock-reveal, subject actively moving/reacting | 3. Full 360° orbit |
| A second figure needs to be reframed into an existing shot | 4a. Partial arc |
| Revealing environmental scale/architecture around a subject | 4b. Partial arc |
| A character's own turn from reflective/narrating into direct-camera address | 4c. Partial arc |
| Secrecy/intimacy, camera closing distance toward a hidden or private moment | 5. Slow dolly-in |
| Sudden fear/panic/shock landing on one word or name | 6. Rapid whip-zoom / crash push |
| Hard scene-to-scene transition (not a within-beat move) | 7. Whip-pan |
| Sustained walking/dancing motion, holding a steady witnessing distance | 8. Lateral Steadicam/arc tracking |
| Jarring emphasis on one small detail, pattern-interrupt beat | 9. Crash zoom to extreme macro |
| Breaking the fourth wall physically via an in-scene object, not address | 10. Fisheye/barrel POV |
| Episode-ending farewell/resolution, and ONLY there | 11. Vertical crane pull-up |
| Realization/intimacy/gravitas on one speaker, no second figure, no freeze | 12. Single-subject slow push-in |
| Take-in-the-whole-picture resolve, mid-episode, not an ending | 13. Crane-up for scale/geography |
| Scale too large for an eye-level frame (a legacy/estate/battlefield) | 14. Drone/aerial establishing |
| An unmoved figure's reaction while another element shifts focus-plane | 15. Rack focus (layered on #1-14) |
| Calm tactile/contemplative detail, not shock | 16. Static/calm macro insert |

This table is a starting default per register, not a rigid substitute for judgment — per the MASTER RULE's "force nothing that does not belong," a register match is where to start looking, not a license to insert movement a beat hasn't earned. **Where a beat doesn't cleanly match a row, this is NOT a self-resolved judgment call — stop and ask the owner before applying anything, every time, with the closest candidate register(s) and the reasoning laid out for his decision** (owner lock 2026-08-30, permanent, no exceptions). This mirrors the standing regeneration-approval rule (CLAUDE.md's QC rule) rather than the general "use best judgment" default: an ambiguous camera-register match gets a check-in, not a silent pick, even when a defensible reasoned choice is available.

**Applies project-wide, this episode and all others**: this menu is a mandatory pre-generation check, not a reference to consult only when stuck — before writing any clip's camera direction, state which of these sixteen techniques (using the trigger table first), plus the separate angle/height decision, the scene calls for and why, as an explicit line in the production log, before generating. This check is also now MASTER RULE checklist item (CLAUDE.md): "Made the camera decision deliberately" now means naming the specific register match AND angle/height from this table, not just asserting a decision was made.

### F. CROSS-CLIP TRANSITION BRIDGING (owner lock 2026-08-30, permanent, no exceptions) — found on Escobar 7.1a→7.1b→7.1c, verified against Caesar and Henry VIII reels

**Finding:** stitching independently-generated clips into a sequence produced a visible "jump" at each cut (owner-flagged, 2026-08-30) even though each individual clip QC'd clean. Targeted transition-mechanics research on two of her reels (Caesar, Henry VIII) shows her cuts are almost always HARD CUTS, not continuous unbroken shots — the "one continuous scene" feeling does not come from avoiding cuts, it comes from what bridges each cut. Verified bridging mechanisms, present in every analyzed transition:

1. **Audio bridging across the cut, universal.** Laughter, ambient tone, dialogue, or narration continues UNBROKEN through the hard cut in every single analyzed instance ("Henry's booming laughter audio continues under and through the cuts"; "ambient chamber resonance and candle flicker maintain unbroken atmosphere"). The audio track is never independently reset at a cut boundary.
2. **The frozen/held figure's pose in the shot AFTER the cut is an exact replica of their pose in the instant BEFORE the cut** — not a fresh, generically "still-looking" rendering of the same character. Her own documented mechanism: "Henry's head angle, open-mouthed expression, and hand position... perfectly replicate his position from the preceding close-up, creating the illusion that he was caught and paused in time." A close-but-different pose (a different expression, a different head angle) breaks the illusion even if the character's identity and wardrobe are correct.
3. **Matched lighting/environment** across the cut, always.
4. Where the freeze itself needs zero seam at all, she sometimes avoids the cut entirely — the host is composited or rack-focus-revealed INTO THE SAME shot as the frozen figure (verified: the Jane Seymour deathbed beat, the jousting mid-air freeze) rather than cutting to a new setup.

**Root cause on 7.1a→7.1b→7.1c:** (a) no audio bridging existed — each clip independently synthesized its own "similar-sounding" ambient bed (insects, ice, party murmur) rather than sharing one continuous track, so the ear registers a reset at each cut even when the eye doesn't; (b) 7.1c's Pablo was generated fresh from identity/wardrobe reference images "continuing from" 7.1b's last frame as a loose stylistic reference, not literally locked to reproduce 7.1b's actual captured last-frame pose pixel-for-pixel — this produced a generic "frozen-looking" Pablo rather than the same man caught mid-moment, reading as a static insert rather than a continuation of the same instant. The existing continuity-chaining rule (N8) requires USING the prior clip's last frame as a reference; it did not yet require LOCKING the held figure's exact pose to that frame rather than allowing the model to reinterpret it — that gap is closed by this rule.

**Applies project-wide, this episode and all others, mandatory before any clip in a sequence is finalized:**
1. Any figure who is frozen/held going into or out of a cut must have their pose in the adjoining clip's boundary frame locked to an EXACT reproduction of their actual last/first captured frame from the neighboring clip — stated explicitly in the prompt as reproducing that literal frame, not merely "continuing from" it as a style reference.
2. Every clip in a sequence that shares one continuous scene must carry either the same literal ambient audio bed (reused across clips, not independently resynthesized per clip) or an edit-stage overlay of one continuous ambient track under the whole stitched sequence, ducking each clip's own native audio — a hard reset of "similar-sounding" ambience at each cut is not sufficient bridging.
3. Before finalizing any multi-clip sequence, verify both (1) and (2) against the actual boundary frames/audio, not just against the individual clips' own internal QC.

## PART 15 — FULL-EPISODE PRODUCTION ARC DOCTRINE (2026-08-30, exhaustive multi-dimension study of the Anne Boleyn reel)

Prior research in this file mostly extracted ONE dimension per pass (a camera technique, a realism finding, a delivery grammar). This section is the first EXHAUSTIVE, all-dimension pass on a single reel, done at the owner's explicit direction ("learn each and everything... every dimension possible"). It reveals that a full episode is not a flat sequence of interchangeable beats — sound, color, and pacing all shift DELIBERATELY scene-to-scene, tracking the story's emotional arc, and this needs to be planned at the episode/script level, not decided per-clip in isolation.

### A. Sound/music arc across a whole episode (not per-beat)
The score is NOT a single mood held throughout — it shifts with each scene's emotional register: tense ambient drone (opening hook/stakes) → rhythmic tension score with low strings and percussive pulses (antagonist/betrayal intro) → melancholy string melody (the room turning against her) → sustained high-tension strings (a strength/defiance beat) → poignant piano/cello swelling into a sorrowful muted register (the tragic-irony climax) → tender orchestral swell with a resonant fading chord (farewell/resolution). Layered on top of the score: **transition SFX timed to cuts** (sub-bass drops, whooshes, crash-zoom whoosh), and **diegetic foley used as texture** (a bowstring creak and arrow release, a baby's giggle) that grounds a scene physically, separate from the score. **Applies going forward:** when planning a multi-scene sequence, map the full score arc across scenes before generating any of them — do not decide music mood per-clip in isolation from the scenes before and after it.

### B. Color grade is a per-location decision, not one blanket look
Each distinct location/set in the reel carries its OWN grade, not a single episode-wide LUT: an interior chamber gets high-contrast chiaroscuro with warm candlelight against cool shadow and visible lens flare through windows; a great hall gets desaturated stone tones with volumetric haze and saturated costume color cutting through it; an exterior gets a cool, low-contrast, overcast naturalistic grade. **Applies going forward:** name the grade explicitly per location when a script has more than one setting, rather than reusing one "amber dusk warmth" default across every environment regardless of location.

### C. Editing/pacing benchmarks and pattern-interrupt techniques
Average shot length runs ~2.5-3.5 seconds for a fast-retention edit. Beyond the camera-technique menu already in Part 14.E, this study adds: a **crash zoom into an extreme macro close-up** (an eye/pupil) as a jarring emphasis beat, a **fisheye/barrel-distortion POV shot** breaking the fourth wall by aiming an in-scene object (an arrow) directly at the lens, and a **vertical crane pull-up into darkness used specifically as an episode-ending device** — a distinct technique from any push-in/zoom, reserved for a final farewell/resolution beat, not a mid-episode transition.

### D. Narrative structure template (episode-level, not per-clip)
The reel's story arc follows a repeatable shape: **(1) Hook** — open in medias res with the figure already mid-confrontation, state the ticking-clock stakes fast; **(2) Antagonist/betrayal setup** — introduce what's working against her; **(3) The room turns** — name specific people/forces who will betray her; **(4) Strength/subversion beat** — show her defying the narrow role history remembers her for; **(5) Tragic-irony climax** — contrast what the audience knows with what the figure doesn't, usually via a second figure (here, an infant) who embodies the irony; **(6) Farewell/resolution** — a quiet, intimate closing beat, often a whispered direct line to the figure. **Applies going forward:** when structuring a multi-clip episode (not just one beat), check the script against this six-stage shape before writing individual clip prompts — it is a planning-level template, not a per-clip rule.

### E. Corroborated (no change needed)
Graphics/captions matched our own already-implemented system exactly: a title hook-card pill at the open, then word-synced all-caps kinetic lower-third captions throughout — confirms the caption system in CLAUDE.md rather than requiring any change. Vocal delivery shifting per scene (conspiratorial whisper for exposition, sharp/punchy for a strength beat, tender for the emotional climax, hushed direct-address for a farewell) is the same host-role-law principle already documented in Part 14.B, applied across a full arc rather than a single beat — reinforces rather than revises that rule.
