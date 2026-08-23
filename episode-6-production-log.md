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

**Clip 3 phantom caption, found and fixed.** Owner flagged the 23-29s
window directly: one caption with no matching dialogue. Re-investigated
from scratch with a dedicated Gemini transcript of clip 3's actual audio
rather than re-trusting the earlier `captions` QC sweep (which had passed
this clip) — confirmed the vendor's scripted line "It kills what lives in
the water" was never actually spoken in the generated audio. This is a
real, now-documented blind spot of the QC-sweep method: it checks
burned-in captions against its own read of the clip, but wasn't targeted
enough to catch a caption with literally no corresponding speech at all.
Fixed by deleting that caption and retiming the two real remaining lines
against the actual detected speech. Rebuilt and resent.

**Owner asked, directly: why do subtitles keep needing fixes, and is
there a better method?** Diagnosed rather than just patched. Root cause:
captions were authored by taking the SCRIPT text as ground truth for
content and only using real audio (`silencedetect`) for timing — reliable
for timing, but with no independent check that a scripted line was
actually spoken as written, or spoken at all. Local word-level Whisper
(the categorically better fix — real forced alignment instead of
estimation) is blocked in this environment by network policy on model
download, confirmed earlier this session and not something to route
around. The available, under-used fix: lead with an independent Gemini
transcript of the real audio *before/alongside* authoring captions, not
just as a reactive spot-check after a complaint.

**Full transcript-first re-verification, all 13 clips**, per the owner's
explicit follow-up instruction to apply the clip 3 method episode-wide.
For every dialogue clip (all but clip 9, which has none), cross-checked
the existing caption data against two independent, real sources: a fresh
Gemini `ask`-mode transcript (content: are these the actual words, is
anything missing or invented) and a fresh re-run of real `silencedetect`
on that clip's own audio (timing: does every caption boundary match a
real measured speech edge). Neither source was trusted alone — Gemini's
own raw timestamps carry a demonstrated ~0.3-0.5s noise band (confirmed by
re-deriving clip 1 and clip 2 from scratch and finding the existing
data already matched real silencedetect to the millisecond, despite
Gemini's transcript timestamps disagreeing by that much), and
silencedetect can't resolve a pause shorter than its detection threshold
inside one continuous speech run.

Result: two confirmed, real errors, both in clip 6 — fixed. (1)
Artemidorus's echo is actually three separate speech bursts ("Red." /
"Read first." / "A fine system."), not two as previously captioned; the
old data merged the first two into a single caption timed to only a
0.26s window (physically too short for three words) and left the real
third burst completely uncaptioned. (2) The opening line's split point
between "Make way — petitions for Caesar!" and "In my time..." had been
estimated (proportional word-count, no real silence gap exists there) at
1.5s; two independent, converging targeted Gemini re-asks placed the real
break at 3.25s/3.85s instead — nearly 2 seconds off, well outside normal
noise. Every other dialogue clip (1, 2, 4, 5, 7, 7b, 8, 10, 11) was
re-verified this same way and its existing caption data confirmed
correct as-is, including one disputed exact-wording question (clip 8)
resolved with a forced binary-choice re-ask rather than trusting a
free-form transcript's paraphrase. Re-QC'd clip 6 only (targeted, to
avoid touching the hand-graded clip 8/10/11/11b files) and rebuilt.

**Four owner-requested editorial cuts**, given as a batch after watching
the caption-corrected cut, each verified against the actual footage
first and only executed after the owner's explicit "ok do it"
confirmation, per their own instruction to verify before touching
anything:

1. **Clip 4 trimmed** 10.054s → 5.75s, dropping "he said that like a
   weather report / cloudy, with a chance of coup" entirely. Verified
   first: the shot is one continuous unbroken take from ~4.5s to the old
   end, so there's no invisible mid-shot edit point — the new end
   (5.743s, right where "...decline Decius" actually stops in the real
   audio) is audio-clean but a hard visual stop, not a scene change.
   Flagged this to the owner before cutting; proceeded on confirmation.
   Original preserved as `clip4_full_pretrim.mp4`.
2. **Clip 8 removed from the episode entirely.** Confirmed its two lines
   span nearly the whole clip, so this was a full-clip removal, not a
   partial trim. Runtime dropped accordingly; clip 7b now cuts directly
   into clip 9.
3. **Clip 9 trimmed** 9.208s → 5.917s, removing the push-to-the-side /
   hold-against-the-wall action entirely. Worth flagging for the record:
   this was the same shelter beat root-caused and fixed earlier this
   session (identity, then an ending-pose trim so it read as shelter
   instead of restraint) — the owner's later call was to cut the beat
   altogether rather than adjust it further, which is a different,
   bigger decision than the earlier fix, so it was named explicitly
   before acting rather than assumed. Verified the actual action
   timing first (push 6-7s, hold 7-8s of the old clip) and picked
   5.917s — the latest point before contact begins, inside one
   continuous held "spots him, reacts" beat where the exact cut point
   had flexibility. Original preserved as `clip9_v3_full_pretrim.mp4`.
4. **Both new adjacent transitions re-measured from scratch, not
   assumed.** Clip 7b → clip 9 (a pairing that never existed before
   clip 8's removal): real ~11.3-point YAVG gap, no color-temperature
   shift — same brightness-only easing technique as the episode's other
   cross-clip gaps, applied to clip 9's opening. Clip 9 → clip 10: with
   clip 9's new (brighter, sunlit-plaza) ending the real gap fell to
   only ~4.3 points — small enough to no longer need correction. The
   PREVIOUS custom grade on clip 10's opening (tuned against clip 9's
   old, dimmer colonnade-shadow ending) was stale against the new
   reference frame and was reset back to plain rather than left in
   place to over-correct a gap that no longer exists — a direct
   application of this session's own earlier lesson that a numeric
   luminance match/mismatch has to be re-verified against the actual
   frames in play, not carried forward on assumption.

**One item investigated, not fixed: a reported background voice during
clip 6's "read this first" line.** Checked three independent, genuinely
different ways — a holistic audio pass, an isolated and volume-boosted
re-listen of just that ~2s window, and a frequency-domain spectrogram of
the same window (a visual check, not another "listen") — none surfaced a
distinct second voice; all three only found ambient crowd murmur and the
already-known transcription difficulty on this specific line. No
speculative audio edit was applied against an unconfirmed, unlocated
target — that risks degrading real audio for no verified benefit. Left
open; needs either a more specific pointer from the owner (roughly where
in the 2 seconds, what it sounds like) or stands as-is.

**Clip 4 "Decius" close-up — investigated, left as-is.** Owner flagged
that during the Second Roman's line ("Decius has gone to fetch him. One
does not decline Decius."), the shot cuts to a tight direct-to-camera
close-up of the woman right at the end, even though the line isn't hers —
confirmed real via frame inspection (consistent wide shot with both Roman
men visible from the start of the line through ~4.8-5.3s, then an
isolated close-up on her face for the remainder, including the word
"Decius"). Both fixes the owner proposed (side/profile angle, or a
listening reaction shot) would need footage that doesn't exist anywhere
in the clip — would require a PAI regeneration, not an edit. Owner's
decision: leave clip 4 as-is, no regeneration requested.

**Clip 9, second trim: front-trimmed too**, per further owner request —
open on the crowd's arrival, not the woman's own to-camera intro. This
surfaced a real gap in the earlier caption sweep: she actually speaks in
the first ~1.7s ("I'm just in..." / "...was that screaming?"), dialogue
that had never been transcribed or captioned because this clip was
incorrectly marked dialogue-free from the very start of the project,
which excluded it from the transcript-first sweep entirely. Moot now
since that whole span is cut, but worth recording as a real methodology
gap, not just a timing one. Cut point verification caught and corrected
its own mistake mid-process: initial frame checks suggested the shot
would settle into a clean profile-plus-crowd composition by ~3.0-3.2s;
closer inspection showed that entire span (3.0s through at least 4.4s) is
actually a sustained back-of-head/hair-obscured hold as the camera
follows her turn, with no clean composition in it anywhere. Said so
directly rather than proceeding on the wrong premise, then found the
real answer: 2.80s, a clear profile shot with the crowd just becoming
recognizable at the temple steps, right before the hair-swing obscures
her face. Clip 9 is now 3.125s (was 9.208s originally — first the back
end was cut to remove the wall-hold beat, now the front too), covering
just the turn-and-spot beat. This moved clip 9's opening frame a second
time, so the clip7b -> clip9 brightness correction was re-measured and
reapplied fresh against the new reference frame (~10.6-point gap this
time, still brightness-only, same technique) rather than carried forward.

**Clip 9 -> clip 10: fade-to-black, the one exception to hard cuts.** Owner
asked for this transition specifically to be smoother, "maybe a fade."
Tested the literal option first rather than assuming: built an actual
crossfade between the current clip 9 and clip 10 and inspected the
mid-blend frame — same ghosting defect as clip 11b's crossfade attempts
(doubled faces, temple/birds bleeding through), confirmed with evidence,
not just the standing rule. Proposed and, on owner approval, implemented
a brief (0.2s) fade-to-black-and-back instead: each clip fades
independently to/from black rather than blending into the other clip's
misaligned pixels, so there's no ghosting risk. Video + matching audio
fade baked onto the tail of `qc/clip9_qc.mp4` and the head of
`qc/clip10_qc.mp4`, same layering pattern as this episode's brightness/
color corrections. Verified directly in the rebuilt master: the boundary
frames show one clean, darkening/lightening scene each, never a blend of
both. Both clips' durations preserved exactly, so no drift. This is now
the ONE non-hard-cut transition in the whole episode; documented as an
explicit exception in `captions_data.mjs` alongside the evidence for why.

**Clip 11 / clip 11b lip-sync — investigated and not confirmed as a real
defect.** Owner reported the mouth movement not matching the audio in the
episode's final two clips. Gemini's initial pass claimed specific stuck/
motionless moments in both clips — but that same pass also produced a
*third*, still-different transcription of clip 11b's already-disputed
opening line, on top of the two prior conflicting reads, so its judgment
on this character's audio was already suspect going in. Pulled the actual
frames at every flagged timestamp in both clips and inspected directly:
in every one, the mouth is actively open and varying, not stuck or
motionless as claimed — the specific defect described does not hold up
under direct inspection. Reported this back plainly rather than either
dismissing the owner's concern or accepting Gemini's claim at face value;
owner confirmed on review that it reads fine. No regeneration pursued.
Worth remembering for future episodes: even where a specific automated
claim doesn't survive a direct check, the right move is to say so and let
the owner's own eyes make the final call, not to silently pick a side.

**Migrated to word-chunk captions, the new channel-wide default.** Owner
instruction: pull the default branch (now carrying Episode 7's word-chunk
caption system, owner-locked 2026-08-23) and rebuild this episode's
captions on it, replacing the full-line ASS cues used until now.

Mechanics: fetched and merged `claude/pai-connectivity-test-5phlq2` into
this branch (60 commits, mostly Episode 7's own production history —
expected, pushed immediately). Read `CLAUDE.md`'s new "Caption system"
section and the reference implementation at `pai-pro-tooling/troy/`.
Installed `faster-whisper` and confirmed the model actually downloads in
this environment — local word-level ASR was blocked by network policy
earlier this session; that block is gone now the owner's lock opened the
required Hugging Face domains. Copied `make_word_chunks.py` into this
project (adapted: caesar's clips have no `_v1` suffix; fixed a
division-by-zero crash on clip 9's empty-captions case, which Troy's own
lineup never hit since it had no dialogue-free clips). The previous
full-line `captions_data.mjs` is preserved as
`captions_data_lines_backup.mjs` — the line-window ground truth the
chunk pipeline validates its whisper timing against, per the new system's
own design.

Match rate was 92-100% on every clip except clip 9 (no dialogue, 0
chunks, correct) and clip 7. Benign mismatches (whisper hearing "3/10" as
"3 for 10", "Stay." as "STAY.", clip 11b's already-documented "setting"
mishearing) don't affect what's displayed, since script text is always
ground truth for the actual caption text — only timing precision was at
stake, and all of it landed within the same ~0.3-0.5s noise band
established earlier this session. Clip 6's independently-measured timing
came back within hundredths of a second of this session's own hard-won
manual fix for Artemidorus's three-beat echo — a good, independent
confirmation that fix was right.

Clip 7 needed real intervention: its shouted, multi-speaker delivery
defeated whisper outright. `small.en` produced a broken chunk merging
"FIRST—" with "THE" across a genuine 0.94s pause (matching neither the
audio nor the script), and bumping to `medium.en` — the documented
remediation path for a weak report — made it WORSE (47% match,
hallucinated a repeated phrase, still missed both shouted lines
entirely). Concluded this is a genuine audio-character problem given
shouted/distorted delivery, not a model-capacity one, and stopped trying
bigger models. Fell back to this project's own established methodology
(biggest real pauses are the true breaks; split what's left
proportionally) applied at chunk instead of line granularity, within
this session's own silencedetect-verified line windows for clip 7
(independently re-verified multiple times already, most recently in the
full transcript-first sweep). Wrote a small one-off script
(`fix_clip7_chunks.py`) that reuses the proportional-interpolation math
but processes each line independently — the first attempt at reusing the
main pipeline's own interpolation code pooled all three lines together
and produced the exact same cross-line merge bug being fixed, since with
zero real whisper anchors the "unmatched span" search swallowed the
entire clip in one pass; fixing that (per-line isolation) resolved it
cleanly.

Re-applied all four of this episode's hand-graded transition corrections
on top of the new chunk-captioned base, since burning new captions means
re-rendering each clip from its master and therefore re-layering anything
added after the fact: clip 9's opening brightness ramp (7b->9) and tail
fade-to-black, clip 10's head fade-to-black, clip 11's brightness+color-
warmth correction (10->11), and clip 11b's opening brightness ramp
(11->11b). Verified afterward: all four durations matched the manifest
exactly (duration-preserving filters), and the fade-to-black transition
frame still shows one clean darkening scene, no ghosting. Runtime
unchanged at 110.1s — this was a presentation-layer migration, not a
structural one.

Also closed a standing gap while in here: this project's own tooling
(`captions_data.mjs`, `qc_pass.mjs`, `build_final_cut.mjs`,
`make_word_chunks.py`, the line-level backup, the word-chunks JSON) had
never been backed up to the `chloe` repo the way Salem's and Troy's have
— it only ever existed under `/home/user/pai-pro/projects/caesar/`,
which the session-start hook's own comments confirm is NOT persisted
across containers on its own (this is exactly what happened to Episode
1's tooling — lost with its container, rebuilt from scratch for Episode
2). Copied everything into `pai-pro-tooling/caesar/` and committed it, so
a future session's session-start hook restores it automatically instead
of this episode being at the same risk.

**Clip 7 follow-up: the proportional fallback was still wrong, fixed with
a closer look.** Owner watched the chunk-captioned cut and flagged that
"THE RED ONE! RED MEANS FIRST—" still didn't track the delivery. Rather
than re-guess, dense frame sampling (roughly every 0.1-0.3s across the
disputed window) showed sustained wide-open shouting through ~4.8-4.9s,
then a visibly shorter, already-turning-away articulation for "FIRST—"
with the mouth essentially inactive by ~5.3-5.4s. The proportional split
had given "FIRST—" a full 0.965s window (5.394-6.359) — the same order
as its longer neighbors — because it only knew the word's character
count, not that its own em-dash signals a cut-off delivery, not a held
one. Shortened it to 5.394-5.6s. The real silencedetect boundary at 6.359
doesn't move (that's genuinely where audio energy drops, likely ambient/
reverb as she turns rather than her own voice) — the caption just doesn't
need to hold that long, since the system's own rule is a chunk stays on
screen only while its words are spoken, not for the full span of any
non-silent audio. Re-QC'd clip 7 only, rebuilt; runtime unchanged
(duration-neutral fix).

Current state: assembled cut is `episode6_final_cut_compressed.mp4`,
still 110.1s runtime, on the word-chunk caption system channel-wide, with
clip 7 now on its second, closer-verified timing pass. Two open decisions
before Gate 3 can close, both still pending: clip 4 color grade (yes/no),
and clip 6's background inscription (regenerate or leave). New open
question, owner-raised: clip 11b's sign-off line — the scripted
soothsayer callback never made it into the actual generated audio (see
above, clip 11b content note), and the owner's own creative read is that
even the INTENDED callback would land weakly this late in the episode.
Owner wants something more emotional and directly about Caesar instead;
options proposed, awaiting the owner's pick before any regeneration.

**Clip 11b regeneration submitted** — owner picked "Twenty-three wounds.
Only one of them was necessary." (the stat-drop option, closest to her
established voice) and directed a specific emotional performance: eyes
glassy and welling with tears, held at the brim rather than streaming, at
most one or two breaking free and falling, expression on the edge of
crying without fully breaking down. Rewrote clip 11b's scene prompt in
`generate_clips.mjs` — replaced the dialogue line and added the emotional
direction (glassy/welling eyes, jaw held tight, blinking hard, voice
tightening and going thick, at most 1-2 tears escaping, no full crying or
sobbing) while leaving the framing, lighting continuity from clip 11,
wardrobe, the long pause, and the "Hazel — out of time." sign-off
untouched. Confirmed this doesn't touch the face-lock rule — the
reference-image pipeline is unchanged, this is a performance/expression
direction like every other clip's scene description already has, not a
text-only regeneration of her identity. Backed up the pre-regeneration
file as `clip11b_v1_pretear.mp4` before submitting. Also backed up
`generate_clips.mjs` to `pai-pro-tooling/caesar/` — it had been missed in
the earlier tooling-backup pass. Per the owner's own permanent rule, the
new take will be sent to the owner the moment it exists, before any QC or
caption work — no clip enters the edit until approved.

**Clip 11b approved and integrated.** Owner reviewed the new take
("That's perfect") — this is Gate 2 approval for the regenerated clip,
per the standing rule. New duration 10.042s (was 8.792s; the emotional
performance runs a bit longer). Captioned from scratch against the new
audio, not carried over.

The sign-off line's exact wording took genuine back-and-forth to settle
— worth recording in full since it's a real methodology lesson, not just
a footnote. Four independent Gemini passes on the isolated audio gave
four different readings, three of which leaned toward the line NOT being
"Hazel," seemingly corroborated by dense mouth-frame sampling. That
looked like a solid, multi-method conclusion — and it was wrong. The
frame check turned out to have sampled only the first third of the
actual word's time window (an incomplete-sampling error, caught on
review, not a real finding), and running the SAME word-chunk pipeline
used for the rest of the episode — ordinarily a more reliable source
than an ad-hoc Gemini ask — told a different story: even biased toward
"He's out of time." via the prompt, it independently transcribed
"Hazel." A biased tool going against its own bias is a strong signal.
Re-running biased toward "Hazel — out of time." instead produced a clean
92% match with whisper's free transcript reading the script back
verbatim. Verdict, reversed from the working conclusion: it IS "Hazel —
out of time." The sign-off survived this generation. Both the
investigation and the correction are recorded in
`captions_data_lines_backup.mjs` rather than smoothed over — this
project's captions carry their own history for a reason.

Re-measured the clip 11 -> clip 11b transition against the new take's
actual opening frame (not assumed unchanged): a real ~13.9-point
brightness gap, color channels matching closely (brightness-only, same
technique as elsewhere). Applied and verified.

**Full episode lighting/exposure re-audit**, per explicit owner request
("verify and reverify"). Measured luminance and color at every one of
the 12 clips' start/end frames — all 11 cross-clip boundaries, not just
the ones already touched this session. The four back-half boundaries
already fixed this session (7b->9, 9->10, 10->11, 11->11b) were
re-confirmed rather than assumed still correct. Seven front-half
boundaries (1->2 through 6->7) had never been checked this session at
all — a real gap in coverage until now. Findings:
- clip1->2, 2->3, 7->7b: negligible deltas, no action.
- clip4->5, 5->6, 6->7: real luminance deltas (15-19 points) but
  essentially flat color-channel deltas, and visually read as a
  consistent warm sunlit palette across the cut — most plausibly
  explained by composition (how much sky/backlight fills each frame)
  rather than a real grading mismatch. Not corrected, on the same
  principle already applied earlier this session to internal luminance
  swings in clips 6/7b/9: a real number isn't automatically a real bug.
- clip3->4: the one large, harder-to-dismiss gap (~24 points luminance,
  real shift in both color channels too) — but this is the SAME
  clip4-vs-clip3 color-grade question already flagged as an open, owner-
  pending decision earlier this session, and today's closer look didn't
  raise confidence enough above where it stood before to justify acting
  on it unilaterally now (clip4's wide shot has much more sky in frame
  than clip3's tight one, which could account for part of the shift on
  its own). Left for the owner's call, same as before — surfaced again
  here rather than silently dropped.

Rebuilt with clip 11b integrated. Runtime now 111.3s (was 110.1s — the
new clip 11b's longer, more emotional take accounts for the difference).

**Clip 6 background-voice artifact — found and fixed.** Owner gave an
exact timestamp (50s into the full cut) for a background "woman's voice"
they could hear but not make out — a much more precise pointer than the
vague version of this same complaint from earlier in the session, which
6 independent checks (holistic listen, isolated/amplified re-listen,
two spectrograms, silencedetect, mouth-frame sampling) had failed to
resolve. With the exact location this time, one more targeted pass
(bandpass-filtered to the female vocal range, heavily boosted, explicitly
asked to find a second female voice) surfaced "market"/"is market" —
landing right where her own scripted line "...we mark it." ends. Root
cause: not a second character at all — a faint echo/doubled tail of her
own "we mark it." bleeding into the silent gap that follows it, before
"Red." begins. Owner confirmed this read as correct. Fixed with a
targeted, short volume dip (ramped, not a hard cut, ~0.9-1.2s window)
over just that gap in clip 6's audio — the real silencedetect-verified
silence window (6.861-7.253s) plus a small buffer, comfortably clear of
both the preceding and following lines. Re-verified after the fix with
the same targeted listen: artifact gone, only her clear line and normal
ambient crowd murmur remain. Duration-neutral; rebuilt, runtime unchanged
at 111.3s.

Worth naming as a pattern: this is the second time this session a vague
"something's off" complaint couldn't be resolved until the owner gave a
precise timestamp or detail, at which point it resolved cleanly. Six
thorough checks on a wide window found nothing; one precise check on the
right three seconds found the actual bug. Precision beats exhaustiveness
when the target is known.

**Clip 7's "sheriff" line — second, deeper fix.** Owner flagged this line
again as not matching delivery. The earlier clip 7 fix (see above) only
addressed "FIRST—"; this line's own internal word timing had never
actually been re-examined — still a proportional-by-length split inside
the 7.303-13.072834 window. Root cause turned out deeper than a bad
split: isolated just this line's audio and ran whisper fresh on it, away
from the earlier shouting that had corrupted the full-clip transcription.
It transcribed the words cleanly but placed them starting ~10.2s
absolute — nowhere near the 7.303 boundary at all. Frame-checked to
resolve the conflict: she's not even facing the camera from 7.3-8.3s
(watching Caesar's litter pass by), only turns back and starts visibly
speaking around 8.7-9.0s. The real 7.303 silencedetect boundary was never
her speech — it was a stray reverb tail from the earlier shout crossing
back above the detection threshold. Final fix anchors the line's start to
the frame-verified ~8.9s and carries forward whisper's own measured
inter-word spacing from there, rather than trusting either the wrong
7.303 anchor or the isolated whisper's own slightly-late absolute offset.
Whole line shifted ~1.6s later than previously captioned (8.9-11.54);
the clip's last ~1.5s is now a trailing pause after "hat." rather than
captioned, which reads as a natural post-punchline beat before the cut,
not a gap. Re-verified visually before shipping: the caption now
appears while she's turned and visibly speaking, not while she's still
watching the procession. Re-QC'd clip 7 only, rebuilt; duration-neutral,
runtime unchanged at 111.3s.

Second time this exact line needed a real fix rather than a single
proportional pass — worth remembering going forward: a verified OUTER
window with a proportional split inside it is only as trustworthy as the
window's own boundary, and a boundary derived from "audio energy resumed
here" isn't the same guarantee as "her speech resumed here" when there's
a loud, reverberant event (a shout) immediately before it.

Current state: assembled cut is `episode6_final_cut_compressed.mp4`,
111.3s runtime, sent to the owner. Two open decisions remain, both
already-flagged and still pending: clip 4's color grade vs. clip 3 (now
with a full fresh measurement on record), and clip 6's background
inscription. Remaining Gemini QC checkpoint per `CLAUDE.md`'s owner rule:
the captions pass is done; still open is Gemini QC on the assembled/
stitched cut's visual conform once final grading is settled.
