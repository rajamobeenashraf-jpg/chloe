# Episode 6 Production Log — "The Day Julius Caesar Was Assassinated"
**Branch: `claude/episode-6-production-t57q3j` · Started 2026-08-20**

Script source: `episodes-5-9-scripts.md` §Episode 6 (v3, linear, 11 clips, ~107s).
Per the parallel-chat rules in `NEW_CHAT_HANDOFF.md`, this file is Episode 6's
own log — shared docs (`PROJECT_HANDOFF.md`, `creative-direction.md`,
`CHARACTER_LOCK.md`, `chloe-craft-study-2026-08-20.md`,
`episodes-5-9-scripts.md`) are not edited here.

**OWNER INSTRUCTION, 2026-08-21 (supersedes CLAUDE.md's "Claude fixes flagged
issues independently" language for THIS episode, going forward):** after 5
clips were regenerated across several rounds (1 self-QC round, then a
Gemini-QC round) without a check-in, the owner asked why they weren't
consulted first. Standing answer for the rest of this episode: **ask before
submitting ANY clip regeneration**, from here forward, whether the finding
comes from my own review or from Gemini eyes — report the confirmed issue
and the proposed fix, wait for explicit go-ahead, then submit. This applies
per regeneration attempt, not just per clip (i.e. if a first fix attempt
doesn't land, check in again before trying a second one, rather than
iterating independently).

## Setup
- PAI Pro engine already provisioned by the SessionStart hook (cloned, patches
  applied, `PAI_KEY` present).
- `.active_project` set to `caesar`; working dir
  `/home/user/pai-pro/projects/caesar/assets` (generated media lives here,
  outside this git repo, per standing rule — not committed).
- Read (binding, before any creative work): `PROJECT_HANDOFF.md`,
  `CHARACTER_LOCK.md`, `creative-direction.md` §1–§16,
  `chloe-craft-study-2026-08-20.md`, `episodes-5-9-scripts.md` Episode 6.

## Gate 1 — character-in-costume stills (awaiting owner approval)
Generated 2 stills against the v4 lock: Roman stola + palla, Forum street,
flat noon light, per the episode's palette lock ("neutral-white URBAN marble
city at flat noon").

- `ep6_costume_hero_front.png` — full/mid shot, direct eye contact, mid-adjust
  of the slipping palla (plants the running gag from clip 2).
- `ep6_costume_detail_palla.png` — tight chest-up, both hands re-pinning the
  palla, wry expression.

Refs used (5, per CHARACTER_LOCK.md v4 usage rule 1 — "ALL FIVE master
reference images"): both PAI character sheets (turnaround `cdde55af-...`,
face-detail `ef2a1822-...`) + the 3 named Tier-2 movie frames (clip 9
aftermath `f8a3e22d-...`, clip 3 costume `d35989c6-...`, clip 5 irony
`d11009b5-...`). Frozen identity string, matte/gritty clause, and realism
block pasted verbatim from `CHARACTER_LOCK.md`, unmodified.

Script: `pai-pro/projects/caesar/generate_costume_stills.mjs` (calls PAI raw
`image-edit-pro` directly, bypassing the local canvas/viewer app — same
headless workaround `PROJECT_HANDOFF.md` §4 used for Episode 1).

**Self-QC against CHARACTER_LOCK.md before sending for owner review:**
- Identity match (face shape, eyes, brows, lips, hair): reads consistent with
  the v4 lock on both stills.
- **Flagged concern — possible matte/gritty clause violation.** Both stills
  show more skin sheen/glow (cheekbones, nose bridge, glossy-styled hair) than
  the owner-mandated matte standard calls for ("zero highlighter shine, zero
  glam sheen... a candid photograph of a real woman having a hard day," per
  `CHARACTER_LOCK.md` usage rule 5 — the same drift the Salem costume stills
  round 2 fix was written for). Not auto-regenerated; holding for owner
  confirmation before committing to this look across 11 clips, since a
  wardrobe/lighting choice here propagates through the whole episode.
- Not flagged as an error, but worth the owner's eye: her hair is worn fully
  loose. `CHARACTER_LOCK.md` usage rule 3 says costume changes must leave the
  hair clause untouched, so this wasn't altered — but a Roman woman of this
  status would more typically wear it bound up. Owner's call whether that's a
  detail worth an on-record deviation (character consistency) or worth
  addressing with an updo styled around the locked hair description.

**Engine-fact addendum (this session, not yet in `creative-direction.md`):**
`image-edit-pro` returned a third, previously-undocumented response shape on
every call this session: DALL-E-style `{ data: [{ b64_json }] }` (in addition
to the two shapes already logged in `creative-direction.md` §16 —
`outcome.media_urls[]` and the OpenAI-chat-passthrough shape). No hosted CDN
URL was returned with this shape — only inline base64 — so there is no job ID
to retrieve these two stills by; the only durable copies are the local PNGs
and whatever the owner saves from the chat delivery. Flagging for the shared
doc merge at episode-branch-merge time (`creative-direction.md` §16 already
notes "parsers must handle both" shapes — now three).

## Gate 1, round 2 — owner feedback: premium costume + episode-6-only updo
Owner asked for (1) a more premium costume and (2) hair in an updo instead of
loose, scoped to this episode only. Result after 5 attempts documented in
`pai-pro/projects/caesar/assets/costume_stills_manifest.json`:

- **PAI `image-edit-pro` could not deliver the hair-up change across 4
  consecutive attempts**, despite: (a) folding the instruction into one
  coherent wardrobe paragraph instead of a bolted-on note (per
  `creative-direction.md` §16's "don't stack critical/never blocks" rule),
  (b) an explicit deviation-permission clause naming the exact identity-string
  line it needed to override, and (c) dropping the 3 movie-frame refs to only
  the 2 identity-anchor character sheets. Root cause read: this engine's
  reference-image conditioning treats "her hair" as an identity trait to
  preserve from the reference PIXELS, not a styling choice governed by text —
  every one of the 5 locked references shows loose hair, and text couldn't
  override that. Dropping refs to fight this made it worse, not better: with
  only the 2 identity sheets, the model lost the Roman-costume grounding
  entirely (one shot drifted to a Western-style corset dress). One attempt
  also tripped the content-safety filter on a tight chest-up crop.
- **Higgsfield `soul_2` with the trained Soul (`soul_id`
  `1b738001-5526-4038-8cf3-f2c136841b55`, from `CHARACTER_LOCK.md`) succeeded
  on the first try**, both the premium costume (deep madder-red dyed stola,
  woven geometric border, gold fibula) and the hair updo. Because identity is
  baked into trained weights rather than matched against reference pixels at
  generation time, text governs styling normally — no fighting the refs.
  **New engine fact for the shared docs merge:** when a wardrobe/hair change
  needs to visibly deviate from what the locked reference images themselves
  depict, prefer `soul_2` + the trained `soul_id` over `image-edit-pro` +
  raw references. Keep `image-edit-pro` for everything that should closely
  track the references (most costume-only changes have worked fine there
  across every past episode — this was specifically a hair-STATE change,
  the first one ever asked for).
- **Current candidates, awaiting owner sign-off:** `ep6_costume_soul_test1.png`
  (hero, full body) and `ep6_costume_soul_test2.png` (detail, re-pinning the
  palla). Self-QC: identity reads consistent with the v4 lock on both; skin
  has a bit more sheen on the collarbone/chest in the detail shot than the
  matte clause ideally wants, worth a look but far closer than earlier
  rounds. Job IDs and durable CDN URLs recorded in the manifest (unlike the
  `image-edit-pro` attempts, which returned inline base64 with no durable
  URL — noted in round 1 above).

## Gate 1, round 3 — owner: another matte pass, then "use PAI Pro, not Higgsfield"
Pushed the matte/gritty enforcement harder (full verbatim clause plus explicit
anti-perspiration/anti-specular/anti-blush language naming the collarbone and
chest specifically, since that's where sheen kept showing) via Higgsfield
`soul_2` — improved but still visibly imperfect on round 1 of this push, and
that round's hero shot also grew an unrequested cross/crucifix pendant
(flagged and excluded going forward — anachronistic for pre-Christian 44 BC
Rome). A second push with even stronger anti-sheen wording and a no-pendant
instruction was already in flight when the owner asked why Higgsfield was
being used at all and to generate through PAI Pro instead — that round's
result was captured for the record (`ep6_costume_*_matte_v3.png`) since it
was already paid for, but is not being treated as the primary candidate.

**Returned to PAI Pro as instructed** and made one more attempt, hypothesizing
that the 4-panel character sheets (which repeat "loose hair" across 4 panels
in a single reference image) were compounding the anchoring problem — swapped
to 3 single-view individual portrait refs instead. **This made things worse,
not better**: hair was still loose (6th consecutive PAI failure on this
attribute across 5 distinct techniques), and the costume/setting drifted
entirely to the Western-style corset dress and ranch fence from Episode 1.
Root cause: those single-view refs were themselves generated FROM Wild West
movie frames (per `CHARACTER_LOCK.md`'s own description of how they were
made), so swapping to them carried that association in even more strongly
than the original 5-ref set did.

**Honest status: PAI `image-edit-pro` has not been able to deliver the
hair-state change in 6 attempts.** Working theory (stated plainly, not
proven): `image-edit-pro` is fundamentally an edit-in-place model — it's
designed to preserve most of the input and change a targeted region, which
plausibly explains why ordinary wardrobe swaps work fine (every past episode)
but a broad attribute like hairstyle state resists text override so
consistently. Higgsfield `soul_2` (trained identity weights, no
reference-image conditioning to fight) got both the costume and hair changes
right on its first try and held up under a second, stronger matte push.
Full round-by-round detail with every file, job ID, and URL:
`pai-pro/projects/caesar/assets/costume_stills_manifest.json`.

**Awaiting owner direction** on how to proceed given this constraint —
options laid out in chat rather than decided unilaterally here.

## Gate 1 final decision (owner, 2026-08-21)
Owner reviewed the original round-1 PAI stills (`ep6_costume_hero_front.png`,
`ep6_costume_detail_palla.png` — plain undyed-wool stola, loose hair, the
locked v4 look as-is) and accepted them as final, superseding the
premium-costume/updo detour entirely. No further matte pass requested on the
stills. This is the locked Episode 6 costume/hair going forward.

## Gate 2 — clip generation started
Infra check before spending on 11 real generations: this container had no
ffmpeg/ffprobe installed at all (`apt-get install --no-install-recommends
ffmpeg` fixed it — a plain `apt-get install ffmpeg` failed on unrelated
unavailable mesa/video-driver mirror packages pulled in by recommends).
Needed for the manifest sanity-checks now and for the whole assembly/QC
stage later (`creative-direction.md` §16 mandates an `ffprobe` frame-count
check after every build) — flagging as an engine fact since a fresh
container may hit this again.

Validated the PAI video pipeline live before committing to the full batch:
uploaded a reference image via `uploadReferenceUrl` (CreateAssetGroup ->
CreateAsset -> poll GetAsset, per `creative-direction.md` §16), then
`submitVideo` + `pollVideo` end-to-end on a throwaway 6s test prompt —
QUEUED -> PROCESSING -> TRANSFERRING -> SUCCESS in ~173s wall time, real
`output_url`. Pulled two frames from the result: identity matched the v4
lock, costume/hair matched the accepted plain-stola/loose-hair look, period
setting and background extras read correctly. Confident to proceed.

Script: `pai-pro/projects/caesar/generate_clips.mjs` — builds all 11 clip
prompts from `episodes-5-9-scripts.md` Episode 6 (durations exactly as
scripted: 9/8/10/10/8/12/13/8/10/8/11s, all under the 15.2s PAI cap), applies
every standing rule per prompt: frozen identity string + matte clause +
realism block verbatim, single-continuous-take language, explicit
no-camera-visible selfie framing, embedded-not-sequential drama phrasing,
physical-state-gated pacing (posca sip in clip 3), §10 pre-generation
self-check (dialogue-action causality, crowd population matching "crush"/
"panic wave", spatial staging for the colonnade push and the lictor's sweep),
§12 active-participant staging (she wedges a path, hauls Artemidorus to
safety), §14 forward-walking language for clip 6's crowd push, consistent
NPC descriptions for Spurinna/Artemidorus/the posca vendor reused verbatim
across every clip they appear in, background-anachronism guard on every
clip, and wardrobe continuity (palla intact -> slipping -> torn away in the
clip 9 stampede -> gone for the rest of the episode, per the script's own
stage directions). Submits all 11 up front, polls concurrently (polling is
the slow part; independent per-clip), downloads each to `assets/clip<N>.mp4`,
writes `assets/clips_manifest.json` with every job ID + URL.

## Gate 2 — all 11 clips generated, self-QC'd, 3 fixed; ready for owner review
All 11 clips generated successfully on the first submission (~255s wall time,
run concurrently). Mandatory verification per `creative-direction.md` §16:
`ffprobe` duration + frame count + audio-stream check on every clip — all 11
matched their requested duration exactly (e.g. clip 7 requested 13s, measured
13.07s), every clip carries both an h264 video stream and an aac audio
stream, no truncation (the Ep 4 silent-truncation bug this check exists for
did not recur).

**Self-QC (Claude-eyes, per creative-direction.md §16 — machine/Gemini QC
stays edit-stage-only per the owner's rule in CLAUDE.md):** extracted 3
frames per clip (33 total) and reviewed every one against identity lock,
costume continuity, NPC consistency, crowd population/staging, and
background-anachronism risk. Found 3 real, confirmed issues, all now fixed:

1. **Clip 1 (opening) — CONFIRMED anachronism, fixed in 1 round.** The dawn
   skyline showed St. Peter's Basilica's dome, unmistakable, from the very
   first frame — a 1626 AD building in a 44 BC establishing shot. Added a
   `REPUBLIC_ROME_GUARD` prompt block (intact/inhabited 44 BC city, no domes,
   named exclusions) and regenerated. Result: the dome is gone, replaced by a
   period-plausible skyline (terracotta roofs, a small round tholos-style
   temple silhouette, consistent with real Republic-era round temples).
2. **Clip 6 (colonnade push) — CONFIRMED anachronism, fixed in 2 rounds.**
   The "red ochre" marking tool Artemidorus uses rendered as an unmistakable
   modern felt-tip marker (matte barrel, conical tip). Round 1 fix explicitly
   said "NOT a pen, marker, crayon" — this made it WORSE (a clearly
   Sharpie-style marker, more obviously modern than the original). Round 2
   dropped all negation and used pure positive physical description instead
   (an irregular handheld lump of red-brown mineral clay, rubbed against the
   scroll with a thumb) — this worked cleanly, no manufactured object of any
   kind in the result.
3. **Clip 11 (outro) — CONFIRMED anachronism, fixed in 3 rounds.** The dusk
   overlook showed the modern excavated/ruined Forum archaeological park
   (broken roofless columns, a paved tourist walkway with path lighting).
   Round 1 (the same `REPUBLIC_ROME_GUARD`, naming St. Peter's/Colosseum as
   exclusions) fixed the "ruined" look but the skyline became the Pantheon
   instead (also anachronistic — a 2nd-century-AD building). Round 2
   (broadened the guard to ban domes/rotundas generically AND named the
   Pantheon as a further exclusion) made it WORSE — the result showed BOTH
   the Pantheon AND St. Peter's Basilica in the same frame. Round 3 abandoned
   named exclusions entirely and changed the shot itself: tight chest-up
   framing with the background described as soft-focus/bokeh-blurred dusk
   light, no legible architecture at all. This worked — no specific building
   is identifiable, and the tighter, more intimate framing arguably serves
   the eulogy-register beat better than the original wide vista.

**Engine fact worth carrying into future episodes (confirmed twice, on two
unrelated shots):** naming a specific real-world landmark or object in a
negative constraint ("NOT the Pantheon," "NOT a pen or marker") appears to
*prime* this model toward rendering exactly that thing, not suppress it —
the opposite of the intended effect. When a generation risks drifting toward
a specific real/famous/iconic reference, prefer (a) pure positive physical
description with zero naming, even negatively, or (b) a compositional fix
(tighter framing, shallower depth of field, obscuring the risky region)
over a named exclusion list. `creative-direction.md` §16's existing
prompt-craft notes should get this added at the shared-doc merge.

All 11 final clips: `pai-pro/projects/caesar/assets/clip1.mp4` … `clip11.mp4`.
Full round-by-round detail, every job ID and URL:
`pai-pro/projects/caesar/assets/clips_manifest.json`.

## Gate 2, round 2 — Gemini eyes QC on the full clip set (owner: "try again gemini")
Per the owner's QC rule in `CLAUDE.md`, Gemini eyes runs at the editing
stage once all of an episode's clips are generated — this is exactly that
point, so ran `tools/gemini-eyes/gemini_eyes.py qc` on all 11 clips
individually (the "full clip set entering the edit," §1 of the rule).
Two-pass sweep+verify on each; only CONFIRMED (post-verify) findings acted
on, per the standing rule that unverified findings are hints, not facts.

**16 CONFIRMED findings across 9 of 11 clips** (only clip 2 came back clean).
Full detail in `pai-pro/projects/caesar/assets/gemini_qc/clip<N>/report.md`
for every clip. Triaged into fix-now vs. accept-as-typical-AI-video-artifact:

**Fixed (visually cross-checked, not just trusted blind):**
- **Clip 9 — the big one, severity 4/5.** Gemini caught a hard, unscripted
  scene break in the last ~1s: cut from the Roman street to an unrelated
  interior wooden room with her in a Wild-West-style corset dress. My own
  earlier self-QC frame sampling (3 frames/clip) landed just before this and
  missed it entirely — this is exactly the failure mode a full-video machine
  sweep catches that sparse sampling doesn't. Root cause, found across 3
  regen attempts: the default reference set includes an image labeled "clip
  9 aftermath frame" in `CHARACTER_LOCK.md` — a chaos-aftermath still from
  the ORIGINAL Wild West episode's own clip 9. This episode's clip 9 is also
  a chaos-aftermath beat, and that thematic match seems to pull the
  reference's Wild-West costume/setting through harder than the other refs
  (attempt 1: reinforcing single-continuous-take language fixed the cut but
  didn't stop a corset/holster/saloon-backdrop drift; attempt 2 also added a
  shallow-depth-of-field instruction to hide an unrelated Pantheon-background
  issue, no better). Attempt 3: swapped that one reference image for a
  neutral non-aftermath movie frame, keeping everything else — this fully
  resolved both problems. New engine fact: watch for thematic matches between
  a clip's own content and any reference image's labeled content, not just
  overall identity coverage.
- **Clip 1 — baked-in wrong on-screen text ("44 AB" instead of "44 BC"),
  confirmed.** Same PAI auto-caption quirk documented for Episode 1's clip 1
  in `creative-direction.md` §11 round 3. Fixed with an explicit
  caption/signage-only text ban (scoped narrowly so it doesn't fight the
  scroll/document handwriting-texture other clips legitimately need).
- **Clip 7 — baked-in garbled mirrored text on the litter's front plaque,
  confirmed.** Same fix pattern: explicit ban + "plain unmarked wood panel."
- **Clip 10 — the red mark on the scroll rendered as an actual cross/plus
  shape, confirmed** (Gemini's "physics" finding: "a red cross symbol
  suddenly materializes"). Same family as the earlier unrequested crucifix
  pendant from the Gate-1 costume stills — the model has some pull toward
  cross shapes for red marks specifically. Fixed by describing the mark as a
  single straight stripe, one direction only, in both clip 6 (where it's
  first drawn) and clip 10 (where it reappears).
- **Clip 6 — extraneous hand near Artemidorus's chest during the scroll
  handoff, confirmed.** Given light-touch treatment (positive framing: "only
  her hands and his own hands are near the scroll," no explicit "no extra
  hands" negative, per the naming-primes-it lesson below) rather than a
  bigger rewrite — visually clean on re-check.

**Accepted as-is (real per Gemini, but common/inherent AI-video artifacts,
lower visual impact, or ambiguous on visual cross-check) — not chased
further, left for the owner's watch-through to weigh:** clip 3's exaggerated
eye reaction during the posca sip (script calls for a big reaction here
anyway); clip 4 and clip 9's freckle-density shift between shots (a texture
continuity nitpick the tool mislabeled "identity" — not real face drift);
clip 5's background-NPC lip-sync lag (Spurinna, not the protagonist); clip
7's hand-blend during the busy scroll handoff; clip 8's arm elongation
(borderline vs. normal wide-angle selfie framing) and crowd foot-sliding;
clip 9's crowd foot-sliding; clip 10's white nose-blemish artifact and
illegible background-parchment lettering (I'd flagged this exact thing
myself in my own round-1 self-QC too, at the time judged too minor to chase
— independently confirmed now, still judged minor: scattered background
prop, not focal); clip 11's brief warping during a profile head-turn.

**Engine fact confirmed a second time this episode (first seen in the
costume-stills rounds):** naming a specific unwanted thing in a negative
instruction ("NOT a pen," "NOT the Pantheon") tends to *prime* this model
toward rendering it rather than suppressing it. Every successful fix this
round used either pure positive physical description or a compositional
change (soft focus, reference-image substitution) instead. Worth codifying
in `creative-direction.md` §16's prompt-craft notes at the shared-doc merge.

All 11 final clips re-verified after every fix round (duration/frame-count
exact match every time, no truncation). Current final set:
`pai-pro/projects/caesar/assets/clip1.mp4` … `clip11.mp4`. Full history,
every job ID and URL: `pai-pro/projects/caesar/assets/clips_manifest.json`.

## Gate 2, round 3 — unmotivated speech-rate acceleration (owner-caught, 3 clips)
Owner caught something neither prior QC pass checked for: in clip 1, she
starts at a natural measured pace and partway through becomes noticeably
rushed, with nothing in the scene to justify it. Root cause of the miss,
stated plainly: my own self-QC was static frame sampling (no audio-timing
information at all), and Gemini's `qc` mode's audio category checks
lip-sync (does mouth match audio), not delivery-rate naturalness — if
speech and mouth both speed up together, that trips no lip-sync finding
even though the pacing itself is wrong. A real gap in coverage, not a
finding that was checked and missed.

Verified the report before acting on it: ran `gemini_eyes.py ask` (free-form
audio/pacing question, not the qc rubric) on all 11 clips individually.
**3 of 11 — clips 1, 8, and 11 — showed the identical pattern**: measured
for the first few seconds, then an unmotivated speedup with words running
together for the rest of the clip; clip 11 additionally showed the mouth
movements failing to match the accelerated audio (a visible lip-sync break,
not just a rate problem). 8 clips (2, 3, 4, 6, 7, 9, 10) came back clean.
Clip 5 showed a milder pace increase but tied to an in-scene alarm
reaction — a possible tone mismatch against the script's "subdued" intent,
not the same bug, left as a lower-confidence note rather than fixed.

**Pattern spotted before proposing a fix:** clips 1, 8, and 11 are the only
three clips that are one uninterrupted person talking solo for the full
duration — no back-and-forth dialogue, no physical business (drinking,
adjusting costume, wading through a crowd) breaking up delivery the way
every clean clip has. Read: the model can hold a slow register briefly but
drifts back toward a faster default across a longer uninterrupted monologue
unless told explicitly to hold the pace for the *whole* clip, not just
establish it at the start.

**Per the owner's locked regeneration-approval rule:** reported the finding,
the pattern, and the proposed fix, and waited for explicit go-ahead
("do it") before submitting anything. Added `PACE_HOLD` — a positive
instruction that the established pace holds steady start-to-finish, applied
only to clips 1, 8, 11 (the other 8 clips' pacing was independently
confirmed clean, so left untouched). Regenerated those three; durations
matched exactly (9.06s / 8.06s / 11.05s, no truncation); re-ran the same
`ask`-mode pacing check on all three post-fix — all three now confirmed
consistent, natural pacing start to finish, mouth movements matched to
audio throughout. Fix verified, not just assumed.

**One thing worth flagging plainly rather than repeating uncritically:**
clip 11's post-fix response included a false aside claiming the dialogue
was "a lip-sync to dialogue from the TV series *Succession*" — a clear
hallucination (this clip is 100% original content from our own script; it
has no connection to any TV show). Didn't affect the actual pacing verdict,
which was corroborated by the other two clips' independent responses using
the same consistent language, but noted here as a reminder that even a
verified-sounding machine answer can contain a confidently-stated, entirely
fabricated aside — read the actual content, don't just trust the verdict
line.

**Secondary item flagged but not chased:** clip 1's dialogue was
transcribed by Gemini as "every schoolkid in 2025" against the script's
"2026" — unclear whether this is Gemini mishearing a close-sounding number
or a genuine dialogue slip in the generated audio. Deferred to the captions
stage, where real transcription against the .srt will settle it properly
rather than guessing now.

## 2026-08-22 — Clip 1 creative restaging + process corrections

**Creative restaging (owner-approved).** Owner asked for clip 1 to be more
engaging: moved from the rooftop-terrace monologue to street level in the
Forum itself, populated with a waking dawn market, duration free to extend.
Researched the actual assassination (Curia of Pompey/Theatre of Pompey in
the Campus Martius, not the Forum; first blow at noon; 60+ senators
involved) via WebSearch. Owner floated staging it as if the killing
happened in the Forum itself, since "many believe it" — pushed back on
that: it's a modern misconception, not a historical belief worth
dramatizing, and this channel's premise depends on getting the history
right; owner agreed. Landed on a version that never makes a location claim
either way: "Rome. March 15th, 44 BC. The Ides... Sixty senators are
walking through this city right now with knives hidden under their
togas... By noon, Caesar is dead... And me? I'm right in the middle of
it." ~36 words, targeting natural pace (~3.2–3.5 wps) at 11s.

**v2** (Forum street-level, new dialogue): generated, self-QC'd. Pacing
verified clean (Gemini ask-mode: no acceleration; measured ~3.78 wps).
Found one new issue: the background temple read as the Pantheon (columned
portico + pediment + a full inscription band baked across the entablature)
— violates `REPUBLIC_ROME_GUARD` and `NO_BAKED_TEXT`. Reported with a
proposed fix (shallow depth-of-field on background architecture, same
pattern that worked for clips 9/11) before touching anything; owner
approved.

**v3** (DOF fix applied): the Pantheon/inscription issue is fixed — temple
now reads as soft atmospheric background, no legible text. But two new
issues appeared: (1) a TV antenna + modern-apartment-style facade
(shuttered windows) on a different background building, confirmed via a
cropped/zoomed frame check; (2) the pacing defect came back on the "sixty
senators..." line specifically — confirmed both by measurement (wps jumped
to ~4.36) and independently by Gemini's qualitative read, which flagged
the identical line as rushed. v2 and v3 each have exactly one problem the
other doesn't; no way to combine them since PAI has no patch/inpaint path,
only full regeneration. Reported both findings, no fix attempted — owner
has not yet decided the next step.

**Process correction #1 — regeneration permission.** Owner believed a
regeneration had been run without asking. Reviewed the actual turn
history: both v2 and v3 were preceded by explicit owner go-aheads ("Go
ahead" for v2; "Continue," in direct reply to an explicit resubmit
question, for v3). No third regeneration had been run — the message being
replied to was Claude asking permission for that next step, not
announcing it had happened. Acknowledged the approvals were easy to miss
(short replies after a side conversation, two regenerations close
together) and committed to keeping each ask isolated and unambiguous.

**Process correction #2 — clips were never actually delivered.** Owner
pointed out zero clip video files had been sent this session — findings
were described in chat text only. Confirmed true and fixed immediately:
all 11 current clip files sent to the owner (clip1.mp4 = v3, the version
with the two open issues above; clips 2–11 = the already-QC'd/locked set).
Noted honestly that clip 1 v2 (clean pacing, Pantheon issue) no longer
exists as a video file — `generate_clips.mjs` overwrites `clip<N>.mp4` on
every run, so it was lost when v3 was generated; only its extracted
frames/audio survive.

**Permanent rule reinforced, pushed to default branch**
(`claude/pai-connectivity-test-5phlq2`, commit `6cce587`). Owner: send
every clip the moment it's generated, un-gated by Claude's own QC/Gemini
findings; Claude's findings never themselves justify proposing a
regeneration; only the owner's own decision after watching starts a
regeneration. On investigation, another episode's session had already
independently locked almost this exact rule a few hours earlier
(`creative-direction.md` §19 "ask before every clip regeneration" + §20
"send every clip to the owner for approval," both owner-locked 2026-08-21,
commit `d27a0fc` — this session's loaded context predates that push).
Added one clarifying amendment to §20 and `CLAUDE.md` capturing today's
sharper framing: findings are supplementary information delivered
alongside/after the clip, never a proposed-fix request that substitutes
for delivery.

**Owner then asked to see clip 1 v2 again** (to view the version that no
longer exists as a file). Reverted `generate_clips.mjs` clip 1 back to the
pre-DOF-fix v2 prompt and attempted to regenerate it so it could be
sent — this attempt was blocked by an automatic permission classifier
before it reached PAI. Not retried or worked around; flagged to the
owner, awaiting their call on how to proceed.

## 2026-08-22 (cont.) — Clip 9 fix, new clip 7b, episode now 12 clips

**Clip 9 — identity/blood/staging root-caused and fixed.** Owner caught
that the man being shielded had blood on him and read as being grabbed
rather than protected. Root cause found in the prompt itself: clips 6/7
both insert `${ARTEMIDORUS}`'s full locked description at the point he
appears; clip 9 only used his bare name, right next to the line about
blood-marked senators bursting from the doors — almost certainly why the
render substituted a generic wounded senator instead of him. Fixed by
inserting `${ARTEMIDORUS}` explicitly, adding positive description that
he's clean/unmarked/was never inside, keeping him gripping his scroll, and
spelling out the shelter body-language explicitly. Regenerated (v2):
identity, blood, and the grab/pull motion all read correctly now, but the
held final pose still didn't fully land (gap between bodies, his arms
passive, wary expression) — an honest partial fix, said so plainly rather
than calling it done. Owner asked whether it's fixable without another
regeneration; found a strong natural cut point at ~8.9–9.1s where both her
arms are fully wrapped around him mid-motion, right before the pose
settles into the static version that read as pinning. Trimmed clip9.mp4
from 10.05s to 9.2s at that point (pre-trim full version kept as
`clip9_v2_full_pretrim.mp4`), added a short audio fade-out so the cut
isn't an abrupt pop. **Owner accepted the trimmed result.**

**New clip 7b added — Caesar's first real moment in the episode.** Owner
pushed back hard on Caesar being a non-character (`CAESAR_GLIMPSED` only,
no lines, no scene of his own) despite being the episode's subject, then
asked for a direct exchange between her and him. Talked through why a full
conversation isn't workable (contradicts clip 7's already-locked "lictors
physically block her" mechanic, which is the actual engine of the
Artemidorus tragedy) and proposed one brief, real exchange instead: she
says "You should take your guards today"; he stops for one beat and
answers her directly with the verified Plutarch line ("I've had guards
enough for one lifetime. Better to die once than live afraid of it.")
before being swept back into the procession. Owner agreed. Inserted as a
new clip between 7 and 8, id `"7b"` (kept as a string specifically so the
existing 8–11 files/numbering didn't need to change) — required patching
`generate_clips.mjs`'s targeted-regeneration arg parser and manifest sort,
both of which assumed purely numeric ids. Generated once, dialogue came
back verbatim-correct and — notably — pacing was clean and measured on the
first attempt for both speakers. Two findings reported, neither fixed:
Caesar's procession never actually stops (keeps moving the whole time,
against the script's explicit direction), and his escort renders as
armored soldiers in a wheeled cart rather than lictors on a carried
litter — though checked against clip 7's already-approved footage, that
part is consistent with what's already locked, not a new defect, just more
noticeable now that the dialogue is specifically about him having no
guards. **Owner accepted as-is, both findings left unfixed.**

Episode is now 12 clips (1, 2, 3, 4, 5, 6, 7, 7b, 8, 9, 10, 11).

**Clip 11 split — resolved, both halves accepted.** Split into clip 11
("They did it to save the Republic"..."every July of your life", 38
words) and new clip 11b ("The soothsayer and I hate being right"..."Hazel
— out of time", 11 words) at the natural pause point, per the plan above.
Generated both. Clip 11's own pacing measured no better than before
(4.38 wps, Gemini independently called it "rushed... brisk, casual,
modern conversational pace") — flagged plainly, but **owner watched it and
judged it acceptable regardless of the metrics** ("the pacing is
alright"), so left as-is; a reminder that the owner's watch-through
overrides the measurement when they disagree with it. Clip 11b's dramatic
pause landed genuinely well on the first attempt (confirmed by Gemini
unprompted: "hushed, solemn... a significant, tense dramatic pause"), but
two more rounds were needed to land it clean:
1. Owner felt 11b didn't match 11a's energy and ran too slow. Fixed by
   trimming ~2s out of the middle of the pause via a hard cut — but the
   join was visibly awkward (owner caught it immediately, "prominent
   cut... not very smooth").
2. Tried a 0.25s crossfade at the join — still awkward per the owner.
   Widened to 0.45s — still awkward. Stopped guessing and actually looked
   at the crossfade frames: genuine ghosting was visible (the two frames
   being blended weren't pixel-aligned — natural micro-motion between
   them, not a bad take). A crossfade of any duration was the wrong tool
   for two non-identical frames. Root-caused instead: confirmed via frame
   sampling that she holds a genuinely static pose from ~3.5s to ~5.5s in
   the pause (after the scripted look-away-and-back settles, before the
   whisper begins) — so that specific window was sped up 3x with
   `setpts`/`atempo` instead of cut or blended. Nothing is moving in that
   window, so the speed change is invisible; both spoken lines and the
   actual look-away motion stay at 1x, untouched. No cut, no blend, no
   seam. **Owner confirmed: "perfect."**

One finding from earlier remains open and unaddressed: independent
transcription (3 passes at increasing gain-boost, given this clip is
whisper-quiet like the original clip 11 was) split 2-to-1 on "The sun's
setting and I hate being right" over the scripted "The soothsayer and I
hate being right" — a possible dialogue drift that would lose the
callback to Spurinna (clip 5). Not confirmed with certainty, not raised
again since, not fixed.

**Still open, no action taken yet:**
- **Clip 1 — RESOLVED, accepted as-is.** Three versions existed in
  tension: v1 (rooftop, retired), v2 (Forum street-level, clean pacing,
  had the Pantheon/inscription issue — file no longer exists, overwritten),
  v3 (DOF fix resolved the Pantheon issue but introduced a TV-antenna
  anachronism and the pacing defect came back). The regeneration attempt
  to reproduce v2 for viewing was blocked by an automatic permission
  classifier before reaching PAI; not retried. Owner was shown the current
  v3 file (twice) and **explicitly accepted it as final, known issues and
  all** — same pattern as clip 11's Part A: the owner's watch-through is
  the actual gate, not the QC findings on their own.

**All 13 clips now owner-approved. Gate 2 is complete.**

## Next steps
1. ~~Owner confirms/adjusts the costume look~~ DONE — see Gate 1 final
   decision above.
2. ~~Generate all 11 clips~~ DONE, self-QC'd and fixed — see Gate 2 above.
3. ~~Gemini eyes QC on the full clip set entering the edit~~ DONE, 16
   confirmed findings triaged, 5 clips fixed and re-verified — see Gate 2
   round 2 above. Clip 1 restaged, clip 9 fixed and trimmed, new clip 7b
   added, clip 11 split into 11/11b and both fixed — every clip delivered
   and owner-approved per the now-locked send-every-clip rule. **All open
   clip-level issues are now resolved or explicitly accepted by the
   owner.** Sequence is 1, 2, 3, 4, 5, 6, 7, 7b, 8, 9, 10, 11, 11b (13
   clips).
4. ~~Assemble: hard-cut stitch + captions~~ DONE — see Gate 3 below.
5. Gate 3: stitched-cut owner review — IN PROGRESS, see below.
6. ~~Gemini eyes QC on the subtitle pass (captions mode)~~ DONE — see Gate 3
   below. Assembled-cut visual QC (ghosting/continuity at cut points) also
   done as part of the same pass. Two owner decisions still open (clip 4
   color grade, clip 6 background inscription) before this checkpoint is
   fully closed.
7. Higgsfield `virality_predictor` pre-publish; owner watch-through is final.

## Gate 3 — Assembly (2026-08-22/23)

**Tooling built.** No caesar-specific assembly scripts existed yet; ported
from the Salem (Ep 2) reference implementation (`salem/build_final_cut.mjs`,
`captions_data.mjs`, `qc_pass.mjs`) rather than writing from scratch, since
that pipeline already encodes several hard-won rules from `creative-
direction.md` §16 (real-audio caption timing, mandatory mouth-frame
cross-check on ambiguous cues, TRUE hard cuts only — no dissolves,
confirmed by Salem's own history to cause ghosting between independently
generated frames, independently re-confirmed this session on clip 11b).
Simplified `build_final_cut.mjs` for caesar specifically since every
transition here is a hard cut (no title cards, no dissolve chain, unlike
Salem's mixed cut/dissolve build). Patched `qc_pass.mjs` with the same
targeted-clip-id pattern already added to `generate_clips.mjs`, so a
caption fix on one clip doesn't force-regenerate every clip's QC pass
(and risk clobbering the custom brightness-graded files below).

**Captions authored for all 13 clips**, timed from real `silencedetect`
audio on each clip's own current file — never from prompt text. Two
segments got a dedicated mouth-frame cross-check per §16's mandatory rule
(clip 1's final line, clip 6's opening shout+push) since automated timing
alone was ambiguous there. Multi-line speech runs with no silence gap
between lines were split proportionally by word count — a documented
estimate, not a re-measurement.

**Clip 11b's dialogue resolved.** The "soothsayer" vs. "sun's setting"
question from earlier was still open. Ran a 4th, more targeted check
(isolated just the disputed ~2s, forced-choice question) — 3 of 4
independent passes now agree the actual line is "The sun's setting," not
the scripted "The soothsayer." Captioned to match what's actually said,
per the rule that captions reflect real audio, not intent. This does mean
the intended Spurinna (clip 5) callback did not make it into the final
render — flagged to the owner, not fixed.

**First assembly + verification.** Built the initial stitch, then ran the
mandatory checks: ffprobe runtime vs. predicted duration (0.042s drift,
well within tolerance — guards against a known ffmpeg silent-truncation
failure mode), and dense frame inspection at all 12 cut points for
ghosting. One near-miss on my own part: comparing two isolated frames at
the clip8→clip9 cut looked like a hard content break (unrelated scene) —
checking the frames in between showed it's one continuous shot exactly as
scripted (chaos visibly building in the background over a few seconds).
Real reminder of why the project's own rule requires dense checks, not
sparse ones — almost reported a false defect.

**Two jump-cut transitions found and fixed post-assembly**, both flagged
by the owner after watching (not caught by the frame-ghosting check, since
these aren't blend artifacts — they're same-scene continuity mismatches
between independently generated clips): clip 11→11b (~20-point brightness
jump plus a framing difference) and clip 7b→8 (~6-point jump, similar
cause). Root-caused via `signalstats` YAVG luminance measurement, not
guessed. Fixed both with a fading brightness correction on the incoming
clip's opening (stronger for the bigger 11/11b gap, lighter for 7b/8),
tapering to zero over ~2s so each clip still reaches its own intended
level — not a global grade change. Explicitly did NOT apply this to the
clip9→10 or clip10→11 cuts even though they also show large brightness
gaps: both are scripted time-skips (chaos → "minutes later" aftermath;
noon aftermath → dusk reflection), so the visual jump there is the point,
not a bug — smoothing it would fight the story.

**Revised, on direct owner instruction.** Owner watched further and
called both of those cuts awkward too, asked for the same smoothing.
Reconsidered: the time-skip is told by the cut itself (a hard cut to a
visibly different shot) and by what's IN the new shot, not specifically
by how steep the instant brightness delta is at the join — easing that
delta doesn't erase the story beat, it just removes the jarring snap.
Applied the same fading-ramp technique to both: clip 9→10 (~12-point gap,
clip 10 darkened on entry) and clip 10→11 (~14-point gap, clip 11
brightened on entry, closed to <1 point). All four hard cuts in the back
half of the episode are now eased this way; none of the front-half cuts
(1 through 8) were touched or flagged.

**Clip 10→11 still read as awkward after that — root cause was color, not
brightness.** Owner flagged it again post-fix. Pulled fresh frames instead
of trusting the luminance number a second time: clip 10 is blazing hard
midday sun (blue sky, harsh shadows), clip 11 is genuine dusk with city
lights already glowing — a real color-temperature/time-of-day mismatch
that a brightness-only correction can't touch even once the Y-channel
average is matched. Added a fading warmth correction on clip 11's entry
(red gamma up, blue gamma down, easing to neutral by ~2.5s) layered on top
of the existing brightness ramp. Lesson for the rest of this project: a
luminance match is necessary but not sufficient for two independently
generated clips to read as continuous — check actual color content before
calling a lighting-mismatch fix done, not just the YAVG number.

**Full caption-accuracy verification**, run per the owner's explicit
request, using the project's own dedicated `gemini_eyes.py captions` mode
against every dialogue clip's actual burned-in video (not just trusting
the authored timing). Result: 1 CONFIRMED text error — clip 4's caption
read "Decimus," the actual spoken audio says "Decius" — fixed and
rebuilt. 1 CONFIRMED finding that isn't a caption issue at all: clip 6 has
garbled pseudo-Latin lettering baked into background architecture (same
defect category as the earlier Pantheon-inscription problem) — not fixed,
would need a PAI regeneration, owner's call pending. Every other finding
across the 11 clips checked was either zero findings or an unconfirmed
low-severity hint that didn't survive the verify pass — treated as noise
per the project's own rule, not acted on.

**Full lighting/exposure audit**, also per explicit owner request: sampled
luminance at 3 points across all 13 clips. One real cross-clip
inconsistency found and NOT yet fixed: clip 4 reads noticeably hazier/
flatter than clip 3 despite both being scripted as the same "noon, hard
light" continuity — owner's call on whether to color-correct it pending.
Several clips (6, 7b, 9) show large *internal* luminance swings but these
were checked and are explained by camera framing changes within one
continuous shot (a wide establishing view vs. a tight face close-up
naturally average very differently) — not lighting bugs, left alone.

Current state: assembled cut is `episode6_final_cut_compressed.mp4`,
128.5s runtime, sent to the owner multiple times through this process as
fixes landed. Two open decisions before Gate 3 can close: clip 4 color
grade (yes/no), clip 6 background inscription (regenerate or leave).
Remaining Gemini QC checkpoint per `CLAUDE.md`'s owner rule: the captions
pass is now done (this session); still open is Gemini QC on the
assembled/stitched cut's visual conform once final grading is settled.
