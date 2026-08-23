# Episode 9 Production Log — "I Helped Build the Great Pyramid" (Giza, ~2560 BC)
**Branch: `claude/episode-9-production-0erm34` · Project id: `giza` · Started 2026-08-20**

Per `NEW_CHAT_HANDOFF.md`: this is MY episode's own log file — shared docs
(PROJECT_HANDOFF.md, creative-direction.md, CHARACTER_LOCK.md,
chloe-craft-study-2026-08-20.md, episodes-5-9-scripts.md, NEW_CHAT_HANDOFF.md)
are not edited here; corrections/learnings for those get merged centrally later.

Script source of truth: `episodes-5-9-scripts.md` §EPISODE 9 (12 clips, ~124s).
Binding rules: `CHARACTER_LOCK.md` (v4 as-filmed), `creative-direction.md` §1–§16,
`chloe-craft-study-2026-08-20.md`.

## Engine notes discovered this session
- **`image-edit-pro`'s live server cap on `input_references` is 16, not the
  32 declared by the CLI/`image_pro_sizes.js`.** First still-generation call
  with 21 refs (full locked set) 400'd: `"Too big: expected array to have
  <=16 items"`. Fixed by using a curated 16-image subset (`STILLS_REFS_16` in
  `projects/giza/refs.mjs`) — both character sheets + both as-filmed movie
  frames + the strongest 12 angle/face views across the PAI individual-view
  and Nano Banana sets. Worth folding into `creative-direction.md` §16 engine
  facts at the shared-doc merge (owner's call, not edited here).
- Generation is via the raw PAI clients directly (`pai_image_pro_client.js`,
  `pai_video_client.js`), bypassing the canvas/CLI node-id requirement — same
  precedent as `PROJECT_HANDOFF.md` §4's original validation generation.
  Scripts live in `pai-pro/projects/giza/` (outside git, dies with the
  container — this log + the manifest below are the durable record).

## Manifest (clip/still → source → local asset → status)
_Filled in as generations complete. Local files under `pai-pro/projects/giza/assets/`
do not persist across sessions — this table plus any CDN/PAI URLs is the durable
record until the final cut is delivered to the owner._

| Item | Prompt file | Local asset | PAI job/task id | Status |
|---|---|---|---|---|
| Costume still (Gate 1) | `prompts/costume_still.txt` | — | — | **SKIPPED** (5x content-filter/classifier blocks, owner decision — see above) |
| Clip 1 — dawn ferry vista + awe | `prompts/clip01.txt` | `assets/clip01_vista.mp4` | `8ea068ec-1668-462c-954b-862c92aa18b2` | done — 9.06s, 720x1280, sent to owner for review |
| Clip 2 — costume + kohl/SPF joke | `prompts/clip02.txt` | `assets/clip02_costume.mp4` | `936b849e-768e-4916-8ef7-855038b26d34` | done — 8.06s, 720x1280, sent to owner (costume beat rendered clean in video despite the standalone still being blocked) |
| Clip 3 — ration-line food beat | `prompts/clip03.txt` | `assets/clip03_food.mp4` | `2e08690c-c833-484b-96b0-38453a3bff4a` | done — 9.06s, 720x1280, sent to owner |
| Clip 4 — job join, Nefer & Djedi intro | `prompts/clip04.txt` | `assets/clip04_jobjoin.mp4` | `c68cdc47-5d3d-45a4-b758-a382bc58a904` | done — 11.05s, 720x1280, sent to owner. NPC locks: Nefer (weathered overseer, 40s, cloth-wrapped hair) / Djedi (young hauler, shaved head) — reuse verbatim in clips 6-12 |
| Clip 5 — tally-wall irony beat | `prompts/clip05.txt` | `assets/clip05_irony.mp4` | `d915e06a-0781-430f-bb8e-2ae8ff64a06f` | done — 9.06s, 720x1280, sent to owner |
| Clip 6 — empathy core (graffiti) | `prompts/clip06.txt` | `assets/clip06_empathy.mp4` | `25ff4797-6c1c-44fb-af46-78d21dce96b9` | done — 12.05s, 720x1280, sent to owner. Needed 1 retry: first attempt SUCCEEDED generation but was FAILED post-hoc by PAI's content-moderation pass ("output video may contain sensitive information") — likely triggered by "tugs her by the wrist into a narrow gap" (physical contact + tight enclosed two-person space). Fixed by opening the staging: shared recess in plain view of the work site, no physical contact, comfortable crouching distance. Worth flagging at the shared-doc merge: PAI's video content filter can fail AFTER a successful render, not just pre-submission — don't assume a `SUCCESS` poll status is guaranteed once PROCESSING starts. |
| Clip 7 — set-piece (rope save) | `prompts/clip07.txt` | `assets/clip07_setpiece.mp4` | `f7747bac-3252-4ddb-b419-783b4374364c` | done — 13.07s, 720x1280, sent to owner, first try clean |
| Clip 8 — royal arrival | `prompts/clip08.txt` | `assets/clip08_royal.mp4` | `31d7e7be-4ff4-4d4f-a80a-6910d1378f16` | done — 10.05s, 720x1280, sent to owner, first try clean. NPC locks: Khufu (nemes headdress, gold collar, gilded litter) / Hemiunu (leopard-sash architect) |
| Clip 9 — the Khufu conversation | `prompts/clip09.txt` | `assets/clip09_khufu.mp4` | `9a7deb20-4ba6-4b66-a5d5-63fde490dfa1` | done — 13.07s, 720x1280, sent to owner, first try clean — episode centerpiece |
| Clip 10 — respect beat / high-five | `prompts/clip10.txt` | `assets/clip10_respect.mp4` | `3af48b81-6a47-46f3-8152-89eea2a97191` | done — 9.06s, 720x1280, sent to owner, first try clean |
| Clip 11 — accuracy beat / mirror casing | `prompts/clip11.txt` | `assets/clip11_mirror.mp4` | `33be242d-3ca0-460f-ac9c-ab4dd1a1fee3` | done — 9.06s, 720x1280, sent to owner, first try clean |
| Clip 12 — outro / sign-off | `prompts/clip12.txt` | `assets/clip12_outro.mp4` | `e8a481ab-1424-4e76-8fc5-ed1cb8c2110a` | done — 12.05s, 720x1280, sent to owner, first try clean |

**All 12 clips generated** (total runtime across sources: 9.06+8.06+9.06+11.05+9.06+12.05+13.07+10.05+13.07+9.06+9.06+12.05 = 124.7s, matching the script's ~124s target almost exactly). 10 of 12 clips rendered clean on the first attempt; clip 6 needed one retry (post-hoc content-moderation fail, fixed by opening up tight two-person staging). Every clip sent to the owner as generated for the clip-by-clip review gate.

## Environment note
`ffmpeg`/`ffprobe` were not preinstalled this session (needed for QC/stitch
tooling per `creative-direction.md` §16) — installed via `apt-get install
--no-install-recommends ffmpeg` (had to drop noble-updates-only packages
that 404'd on the mirror; base `noble` versions installed fine). Worth
adding to a SessionStart hook for future episode branches.

## Gate 1 — costume still: BLOCKED, owner decision 2026-08-20: skip, proceed to clips
5 consecutive failures on the standalone costume-still image (PAI
`image-edit-pro`): 4 rejections from PAI's own "sexual" content filter (even
after stripping the prompt to fully-covered, G-rated wardrobe language), then
a Claude Code auto-mode classifier block on both a further PAI retry AND a
Higgsfield `nano_banana_pro` attempt (the documented reliable fallback per
`PROJECT_HANDOFF.md` §5) — the classifier blocked before Higgsfield's own
filter was even reached. Common factor across every attempt: CHARACTER_LOCK's
mandatory verbatim identity string pairs several close reference photos of a
young woman with "body proportions and figure" / "age (early twenties)" /
"real, physically-photographed human being" language — likely what's tripping
both the provider filter and the local classifier, not the scene/wardrobe
wording (already reduced to fully-clothed, non-suggestive). Owner decision:
skip the standalone still checkpoint for Ep9, proceed straight to clip-by-clip
video generation (clip 1 has no close costume/body framing — dawn vista +
awe reaction). Flagging for the shared-doc merge: this may recur on other
episodes' costume stills and is worth a permanent mitigation (e.g. trimming
the identity string's body-emphasis language, or defaulting straight to video
for costume beats instead of a standalone still).

## Approval gates (per NEW_CHAT_HANDOFF.md — same as Episodes 1-4)
1. [x] Character-in-costume stills — **SKIPPED by owner decision** (see above)
2. [x] Clip-by-clip review — all 12 clips generated and sent to owner; awaiting any redo requests
3. [x] Stitched final cut — assembled, sent to owner (see below)
4. [ ] QC rounds — **Gemini eyes BLOCKED** (see below); manual spot-check done; owner watch-through pending

## Stitch/QC pipeline (this session, `pai-pro/projects/giza/`: `captions_data.mjs`,
`qc_pass.mjs`, `build_final_cut.mjs`, `export_srt.mjs`)
- Captions: timing grounded in real `ffmpeg silencedetect -30dB:d=0.12` per
  clip (raw output in this session's transcript), gap-clustered per
  creative-direction.md §16 (silences <0.3s = intra-utterance breath dips,
  merged; >=0.3s = real sentence/speaker boundaries). Clips 3, 8, 9, and 12
  had merged blocks covering multiple scripted lines with no internal
  boundary — sub-cues there are a proportional-by-word-count best estimate,
  flagged `NEEDS-GEMINI-VERIFY` in `captions_data.mjs`, not independently
  confirmed against mouth movement. **Clip 9 (the Khufu centerpiece) and clip
  12 (outro) are the priority re-verify targets** — clip 12 in particular
  packed ~81 scripted words into a 12s clip with almost no detected pause
  >=0.3s (implies ~6-7 words/sec, faster than the "warm reflective" delivery
  intended) — worth an owner watch to judge whether it reads as rushed.
- Every clip QC'd clean (loudnorm + 0.08s audio-only edge fade + captions
  burned in ASS/libass, DejaVu Sans Bold 42 / marginV=320 canonical style).
- Final cut: all 12 clips joined on TRUE hard cuts (ffmpeg concat, zero
  blend) — no dissolves, no title card (OPENING LAW retired the card
  convention for Ep9). Runtime **124.63s** (script target ~124s — matches
  almost exactly). ffprobe frame-count sanity check passed (2991 actual vs
  ~2988 expected at 24fps). Manually verified 2 cut points (clip1→2,
  clip8→9) via before/after frame extraction — both clean, no ghosting, no
  glitches, caption speaker-tag styling (`[Nefer]`) renders correctly.
- **Files**: `pai-pro/projects/giza/assets/giza_final_cut.mp4` (master, CRF16,
  ~99MB) / `giza_final_cut_compressed.mp4` (delivery copy, ~1.5Mbps, ~25MB) /
  `giza_episode9.srt` (full-episode subtitle export for QC cross-check).

## Gemini eyes QC — RESOLVED 2026-08-21, both passes clean
Quota came back (owner report + confirmed working). First 2 retries this
session still hit the free-tier 20/day `RESOURCE_EXHAUSTED` limit (one got a
sweep through but lost it when the verify pass exhausted quota mid-run and
the tool doesn't checkpoint partial results — no output written on a crashed
run). Third attempt completed the full two-pass pipeline.

**`qc` mode** (`qc_report/`), score 6.8/10, 4 candidate findings:
- 00:09 continuity (sev 3) → **DISMISSED** by Gemini's verify pass: the
  costume/scene change is the intentional clip1→clip2 cut, not an AI error.
- 01:03 physics (sev 3) → **DISMISSED**: wheel doesn't actually clip through
  sand on re-watch.
- 00:20 background (sev 2, unverified — tool only verifies sev>=3): "extras
  posing with invisible smartphones." Manually pulled the frame: they're
  holding cups/hands clasped in a waiting-line posture, no anachronism.
  False positive.
- 01:09 anatomy (sev 2, unverified): "blisters appear abruptly." Manually
  pulled the frame: this is clip 7's scripted rope-burn reveal to the lens
  ("That's— yeah. Souvenir.") — intentional, not a continuity break. False
  positive.

**`captions` mode vs `giza_episode9.srt`** (`qc_report_captions/`), score
7.2/10, 3 candidate findings:
- 01:15 text (sev 3) → **DISMISSED** by verify: no duplicate text fragment,
  transitions normally into the Hemiunu line.
- 00:24 text (sev 2, unverified): claimed caption reads "7 for 10" and drops
  the HR hyphen. Manually pulled the frame at the actual "7/10. HR-approved."
  cue (25.7s) — renders exactly as scripted, slash and hyphen both present.
  False positive.
- 01:21 text (sev 2, unverified): claimed "...Me?" is omitted. Manually
  pulled the frame at 81.15-81.25s — the caption is clearly present and
  correctly timed. False positive.

**Net result: zero confirmed issues across both passes** — 3 of 7 findings
verified false-positive by Gemini itself, the remaining 4 (all unverified
sev-2 hints) checked manually against the actual frames and also found to be
false positives. Per the owner's QC rule, nothing here requires a fix or an
owner waiver. This also resolves the `NEEDS-GEMINI-VERIFY` flags on clips 3,
8, 9, 12 in `captions_data.mjs` — the priority targets (clip 9 centerpiece,
clip 12 dense outro) both passed the captions-mode cross-check clean.

Earlier manual spot-check (glossy/glam skin vs. CHARACTER_LOCK's matte bar)
is superseded by this full pass — Gemini's identity/realism check (it loads
CHARACTER_LOCK.md automatically) raised no finding on this, so treating it
as not a real issue; flagging to the owner's own watch-through as the final
word per the standing rule ("owner's watch-through remains the final gate").

## Higgsfield virality_predictor — RUN 2026-08-21
Tool caps input at 16s ("Video must be 16 seconds or shorter") — it's a
hook/retention-analysis tool built for a single clip, not the full 124.6s
assembled Short. Ran it on **clip 1** (the QC'd, captioned opening clip —
the episode's actual hook), uploaded via `media_upload`/`media_confirm`.

Results (job `2785d389-35fe-4a96-a0ea-f126ce4ad289`):
- **overall_score 49/100, viral_potential 54/100, sustain 100, brain_engagement 41**
- **hook_score 30/100** (measured over the 0-3s window) — the weakest number.
  `global_scores_by_frame` across the 9s clip: [0.40, 0.37, 0.40, 0.38, 0.39,
  0.38, 0.37, 0.39, 0.44, **0.55**] — flat/low through the opening 3s and the
  middle, only spiking at the very last second (the pyramid-reveal /
  "I came to meet the aliens" punchline, `peak_second=9`). Reads as a
  backloaded hook: the payoff lands, but the first 3 seconds (her talking
  before she turns to see the pyramid) don't grab as hard as they could.
- Tool's own disclaimer: "Predictive proxy metrics, not guaranteed
  performance or clinical measures" — informational signal, not a QC gate.
  Not auto-acting on this (no CONFIRMED-finding mechanism applies to this
  tool); flagging for the owner's call — e.g. trimming/tightening clip 1's
  opening seconds before the turn, if a stronger hook is wanted.
- Full interactive dashboard: https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260821_071121_2785d389-35fe-4a96-a0ea-f126ce4ad289.html

## Retention + editing-craft revision round (2026-08-21/22, owner-directed)
Owner correction: the virality_predictor hook_score (30/100) should have
been caught by rigorous script/prompt work BEFORE delivery, not discovered
via the metric after the fact. Full self-audit given verbatim in chat; root
cause confirmed with hard timing data, not speculation: the scripted hook
line in the delivered clip 1 didn't start until **3.737s** into a 9s clip —
after the tool's own 0-3s hook-scoring window had already closed. ~3.7s of
unscripted ad-lib filler ("talking energetically to the lens," no specified
content) ate the most valuable seconds in the whole episode. Separately, the
written script's own opening never plants the episode's actual best asset
(meeting Khufu) as an open-loop promise — it's a closed, self-resolving joke
about builders/aliens instead, inconsistent with the doom/stakes-hook
pattern this project already uses in Episodes 5-8 ("a rock six miles wide
hits Mexico"; "the only people who know are carrying knives... And me.").

**Fix 1 — clip 1 rewrite (hook).** New opening: pyramid dominant in frame
from the literal first instant (no gradual reveal, no boat approach), she's
already mid-reaction with zero unscripted runway, and the line plants Khufu
as a stated goal/open loop ("here's the plan" vlog-grammar beat, not a
flash-forward — stays inside OPENING LAW): *"That's it. That's actually it."
... "Twenty years. Two and a half million blocks. One king who never once
doubted it would stand." ... "And today? I'm meeting him."* Prompt:
`prompts/clip01_v2.txt`.
- First regeneration (`clip01_vista_v2.mp4`, 8s): verified via frame pulls —
  pyramid fills frame at t=0.1s (real fix, confirmed visually), continuous
  high-energy delivery throughout. But the final line's detected speech
  block was only 0.48s for 5 words (10+ wps, physically implausible) —
  pulled the literal last frame (7.9s) and confirmed her mouth is still
  open mid-word. **The line is genuinely cut off**, not just fast: 8s wasn't
  enough room for all three lines. Caught before delivery this time, not
  after — this is the adversarial check that was missing on Ep9's first
  pass, now applied.
- Retry at 10s duration (`clip01_vista_v3`) to give the final line proper
  room: **BLOCKED — PAI Pro balance exhausted** (`PAI 2001: insufficient
  balance: need 200 cents, have 31`). This is a billing issue, not something
  fixable from this session. **Needs the owner to top up PAI Pro balance**
  before clip 1 can be finished. `clip01_vista_v2.mp4` (truncated) and the
  original `clip01_vista.mp4` (weak hook) are both NOT used in the current
  build below — the final cut still has the ORIGINAL weak-hook clip 1 in
  place as a placeholder pending this.
- Honest side-note, not a blocker: the regenerated pyramid renders as the
  iconic finished silhouette rather than visibly mid-construction (ramps/
  crews are small and easy to miss at this framing). This appears to be a
  pre-existing model tendency across every pyramid shot in this episode, not
  something this rewrite introduced — flagging for awareness, not treating
  as in-scope for this fix given the ask was hook + editing, not a full
  production-design accuracy pass across all 12 clips.

**Fix 2 — real editing craft, not just "no ghosting."** Owner asked for
Hollywood-smooth, natural editing. Two concrete, verified changes:
1. **Trimmed two dead-air tails.** Scanned caption-end-time vs. clip-duration
   across all 12 clips: clip 4 had a **2.4s** silent tail after its last line
   (her still pouring water in silence) and clip 10 had a **3s** silent
   reaction tail — both far longer than any other clip's natural post-line
   beat, reading as sluggish pacing rather than intentional (unlike clip 6's
   deliberate 4.9s empathy-beat silence, which stays untouched — that one's
   scripted and correct). Trimmed clip 4 to 9.1s (~0.46s natural tail) and
   clip 10 to 7.26s (~1.2s reaction beat, in line with the emotional-library
   convention for a silent reaction). Originals preserved as
   `*_untrimmed.mp4` in case needed. Re-ran `qc_pass.mjs` to re-burn captions
   at the corrected durations.
2. **Implemented real J-cut audio bridging** (`apply_prelap.mjs`, new this
   round) — creative-direction.md §6 has always called for "the next scene's
   sound... start a beat before the visual cut," but the pipeline never
   actually built it; it only ever did symmetric silence-avoidance edge
   fades. New script mixes a quiet (-15dB, low-passed to 3kHz), 0.2s preview
   of each clip's ambience under the OUTGOING clip's final 0.2s, for every
   one of the 11 transitions. Deliberately NOT the audio crossfade
   creative-direction.md §16 rejects (that consumed the incoming clip's own
   audio and desynced it, verified in Ep2) — the incoming clip's audio track
   is never touched, shifted, or trimmed; only the outgoing clip's tail
   gains a bridge. Verified: `max_volume -0.6dB` across the full rebuilt cut
   (no clipping from the mix), all 12 `_final.mp4` segments built clean,
   `build_final_cut.mjs` updated to read from these instead of the
   pre-prelap `_qc.mp4` files.

**Rebuilt cut** (still with the OLD clip 1 — pending the balance top-up):
runtime **120.83s** (down from 124.63s, entirely from the two dead-tail
trims — a tighter, better-paced cut). ffprobe frame-count check: exact match
(2900/2900), no truncation. Files: `giza_final_cut.mp4` /
`giza_final_cut_compressed.mp4` (both regenerated in place).

## Round 2 — balance restored, clip 1/9/12 fixed, closing the loop (2026-08-22)
Owner topped up PAI Pro; confirmed working (clip 1 v3 submitted and processed
normally, no instant 31-cent failure this time).

**Clip 1 — 4 total generation attempts, final one shipped:**
- v2 (8s): first real hook fix (pyramid at frame 1, zero filler) but caught
  cutting off the final line mid-word before shipping — same discipline as
  the first round, not repeating the earlier mistake.
- v3 (10s): line completes but ends right at the clip's measured edge again
  — ambiguous, not shipped without more margin.
- v4 (12s, explicit "finish with a full second of silence" instruction):
  clean finish confirmed (mouth closed, 0.74s trailing silence before cut).
  Looked done — but a full-pipeline Gemini QC re-check (below) caught a real
  regression this version introduced.
- **v5 (final, shipped):** Gemini's QC sweep on the rebuilt cut CONFIRMED a
  wardrobe-continuity break — v2/v3/v4 never specified clip 1's clothing
  (dropped when the hook was rewritten), so the model defaulted to
  something inconsistent with clip 2's costume-change beat. v5 restores the
  original "modern travel clothes, not the era costume yet" line. Verified
  both the clean line-finish (0.52s trailing silence) AND the correct
  wardrobe (jacket/tank, not the linen dress) via frame pulls before
  shipping.

**Clip 9 — SPLIT into clip09a_stone + clip09b_reply.** Root cause: 76
scripted words cannot be spoken at a natural pace within PAI's 15.2s
single-clip cap at ANY duration setting — the original was forcing 5.8-6.3
words/sec regardless, which is what read as "talking too fast." Trimming the
dialogue was rejected as the fix (this is the owner-requested Khufu
centerpiece; cutting scripted lines to fit a technical cap was judged worse
than adding a clip). Split at the natural mid-scene pause (Khufu's rhetorical
question, before her answer). clip09a needed a second pass (11s → 14s with
explicit "slow, weighing each word" direction) to bring its densest section
down from ~5.5 wps to ~3.2 wps average, verified against real silencedetect
data both times, not assumed from the duration change alone.

**Clip 12 — SPLIT into clip12a_thesis1 + clip12b_thumb + clip12c_outro.**
Same root cause: 81 words, no natural-pace fit in one clip regardless of
duration. Split at the script's own beat markers (thesis / THUMB payoff /
joke+sign-off). All three passed clean on the first generation — 2.7-4.9,
~4.15, and ~3.06 words/sec respectively, verified via silencedetect +
frame pulls (both end-of-clip lines confirmed to finish with mouth closed,
not cut off).

**Rebuilt pipeline**: `captions_data.mjs` now has 15 clips (was 12); QC pass,
J-cut audio prelap, and final cut all re-run clean. Runtime **152.96s** (up
from 120.83s — the increase is entirely the necessary clip9/clip12 splits
giving dialogue room to breathe; still comfortably inside the 90-200s Shorts
cap). Frame-count check: exact match (3671/3671).

### Closing the loop — re-ran the same measurements that caught the original problem
**Gemini eyes `qc` mode on the rebuilt cut:** 4 findings, 3 CONFIRMED this
time (vs. 0 confirmed in the pre-fix round) — new material means new
surface area for real issues, and this pass caught two I need to report
plainly rather than bury:
1. **Wardrobe continuity (2 confirmed findings)** — the one described above,
   already fixed in clip 1 v5 before this report was written.
2. **Rope/wheel physics artifact, confirmed, clip 7 (~66s)** — on ORIGINAL,
   UNCHANGED footage from the first production round, outside the explicit
   scope of this fix request (owner asked for clips 1/9/12). Manually
   pulled the frame: a real, visible artifact (rope tension/contact reads
   oddly against the sledge wheel). Not fixed this round — flagging for the
   owner's call on whether it's worth a separate pass.
3. **Broader wardrobe-rendering variance across the episode** (unverified,
   severity 2, high-five hand-contact) — comparing frames from clip1/2/4
   against clip7/12c shows real subtle-to-moderate costume-rendering drift
   clip-to-clip (a plainer dress in some clips vs. a more ruffled/trimmed
   look in others). This appears to be a **pre-existing, documented
   characteristic of this pipeline** (creative-direction.md has repeatedly
   noted independently-generated clips don't guarantee frame-matched
   continuity), present across ORIGINAL clips too, not something this
   round's changes introduced. Fixing it properly would mean auditing/
   regenerating wardrobe across most of the episode's 15 clips — far beyond
   the clip1/9/12 scope of this request. Flagging for an explicit owner
   decision, not fixing unilaterally.

**Higgsfield virality_predictor on the new clip 1 (v4 test, before the v5
wardrobe fix):** overall_score 50 (was 49), viral_potential 55 (was 54),
**hook_score still 30/100 — unchanged**, despite the concrete, verified fix
(dialogue now starts at 0s instead of 3.737s). Reporting this exactly as
found rather than claiming a win the data doesn't support: the specific
problem I originally diagnosed (scripted line starting after the hook
window closed) is fixed and independently verifiable via frame/timing
evidence, but this tool's hook_score metric did not move as a result. Both
the old and new clip1's `global_scores_by_frame` peak at the literal last
frame of whatever duration was uploaded (old: peak_second=9 of a 9s clip;
new: peak_second=12 of a 12s clip) — this pattern suggests the metric may
be structurally anchored to a clip's ending rather than being sensitive to
early-dialogue-start specifically, but that's my inference, not a confirmed
explanation. Not re-run on v5 (the wardrobe fix shouldn't move a
audio/dialogue-timing-driven score) — noting here rather than re-spending
another virality_predictor call on an expected-null result.

## Round 3 — three owner-reported bugs, all fixed (2026-08-22)

Owner watched the round-2 delivery and reported three specific, timestamped
problems. All three verified against real data before fixing (per the
standard now applied every round), root-caused precisely, and fixed:

**Bug 1 (clip 4) — caption showed unspoken words.** Root cause: in the
earlier "editing polish" round, I trimmed this clip's tail as "dead air"
based on a caption I'd wrongly ended at 8.638s. Re-checking the untrimmed
original's full silence map — applying the <0.3s merge rule consistently
this time, which the first pass didn't — shows real detected speech
continuing all the way to 11.052s with no trailing silence gap at all.
Frame-verified at 8.5s/9.7s/10.9s: she is genuinely still talking at every
one of those points. There was no dead air to trim; the "fix" in that
earlier round was cutting off real footage of her finishing the line.
**Fix: reverted to the untrimmed original, no trim.** Caption corrected to
span the full 4.475-11.052s.

**Bug 2 (clip 10) — same bug, same root cause.** Caption had wrongly ended
at 6.06s; full silence-map re-check shows real speech continuing to 8.355s,
THEN a clean 0.70s trailing silence to the clip's real end — confirming
8.355s as the true end of "You pour water like a Friend of Khufu.", not
6.06s. Frame-verified at 8.2s: still speaking. **Fix: reverted to the
untrimmed original, no trim.** Caption corrected to span 3.397-8.355s.

**Bug 3 (clip 8) — genuinely too fast, confirmed with data.** This clip was
flagged `NEEDS-GEMINI-VERIFY` at original production time (same risk
pattern as clips 9/12 — multiple lines merged into one clip with no real
per-line verification) but never followed up on, because it wasn't
explicitly named until the owner caught it. Real timing: 41 words at
4.2-4.7 wps, vs. ~3-3.6 wps everywhere else — falls exactly in the owner's
reported 1:14-1:22 window. **Fix: extended 10s -> 14s with explicit
unhurried/whispered pacing direction** (same move that fixed clip09a
without a split) — regenerated once, verified average dropped to ~3.3 wps,
confirmed the final "...Me?" completes cleanly (not cut off). No split
needed in the end — the single-clip fix was sufficient once actually
measured.

**Rebuilt pipeline**: captions corrected for clip4/8/10, `qc_pass.mjs` ->
`apply_prelap.mjs` -> `build_final_cut.mjs` all re-run. Runtime **160.63s**
(up from 152.96s — clip4 and clip10 both grew back to their full untrimmed
length, clip8 grew from 10s to 14s). Frame-count check: exact match
(3855/3855). Spot-checked both corrected cut points via frame pulls: clip4's
full caption text now matches what's on screen at the cut, clip10 ends on a
settled satisfied expression (not mid-word).

**Gemini QC re-run on the round-3 cut**: 6 findings, 1 confirmed (the same
clip 7 rope/wheel physics artifact flagged in round 2 — now confirmed
across two independent QC passes, strengthening the case it's a real,
persistent defect on that original unchanged footage, still outside this
round's scope), 2 dismissed as false positives (including a re-check of the
exact clip10->clip11 boundary I just changed — confirmed no new issue
introduced there). The remaining 3 are unverified severity-2 hints on
original unchanged footage (cup/bread handoff clipping, water-pour fluid
sim, high-five hand-contact) — not acted on, consistent with the standing
rule that only CONFIRMED findings drive fixes.

## STATUS: delivered, three items flagged for owner decision (not silently skipped)
1. Rope/wheel physics artifact on clip 7 (confirmed, original footage, out
   of this round's scope).
2. Broader wardrobe-rendering variance across the episode (confirmed-
   adjacent, pre-existing pipeline characteristic, large scope to fully fix).
3. virality_predictor's hook_score metric not moving despite the verified
   content fix — flagged honestly, not spun.
Owner's watch-through remains the final gate per standing rule.

## Round 4 — four owner-reported issues, all investigated with real data before fixing (2026-08-22)

Owner watched the round-3 delivery and reported four more issues in one
pass, with an explicit "leave no room for error" standard. Treated as
authorization to investigate AND fix directly (the ask itself was
unambiguous), but every fix below was still root-caused against real data
first — timing from silencedetect, continuity from frame extraction, never
assumed from the prompt or the fix intent alone.

### Issue A — camera holds static on her face for ~5s after "We saw it."

Confirmed. Pulled frames across clip6's full 12.05s runtime: the shot goes
completely static/frozen from ~8.0s onward — not a held emotional beat, a
broken one (no micro-movement, no breathing, nothing — reads as the
generation stalling, not acting). **Fix: trimmed 12.051s -> 9.625s**
(`ffmpeg -t 9.6`, original backed up as `clip06_empathy_ORIGINAL_12s.mp4`).
Re-verified the new tail in the assembled cut via frame pull at the cut
point — cuts clean into clip 7's opening frame now, no static hold.

### Issue B — captions must strictly match delivery, checked word-by-word

Recomputed the full silence map for **every one of the then-15 clips**
against the project's own gap-clustering rule (<0.3s = breath dip/merge,
>=0.3s = real boundary) and cross-checked each caption cue against it.
Found the same category of bug as round 3's clip4/clip10 fix, but milder —
no words missing, cues just bridging real pauses instead of splitting at
them:

- **clip09a_stone**: "Your... majesty? I just put it where the mountain
  wanted to fall." was one cue spanning a real 0.674s gap (5.265-5.939).
  Split into two.
- **clip09b_reply**: "People will cross the whole Earth just to look at
  it." was one cue spanning a real 0.414s gap (5.959-6.373). Split into two.
- **clip11_mirror**: both cues had the same bug (gaps at 1.408-1.940 and
  5.333-6.144). Split into four.
- **clip12b_thumb**: re-checked on suspicion, came back clean — all 5 cues
  already matched real boundaries exactly. No change.

**clip03_food got a genuinely new finding, not just a re-timed one.** Its
"2.541-7.881 = 3 merged lines" block was already flagged
`NEEDS-GEMINI-VERIFY` at original production (no internal silence gap
>=0.3s anywhere in that span, even re-checked at a finer -24dB threshold —
so audio alone can't place the two speaker turns). Frame-by-frame check
resolved it, and found something the timing data alone couldn't show: she
is **visibly drinking from the cup — cup pressed to her lips — across
4.1-5.3s**, continuous across 4 consecutive frame pulls. The existing
caption had her line "What's in the river?" starting at 4.425s, i.e.
mid-sip — physically impossible. **Fix: pushed that cue's start to 5.3s**
(when the cup is confirmed away from her lips), leaving 4.425-5.3s
uncaptioned as her on-camera drinking/reaction beat.

Also re-ran Gemini eyes' `captions` mode (owner's QC rule — subtitle pass,
cross-checked against the .srt) on the rebuilt cut. It raised 4 things; I
checked all 4 against actual frames rather than take the tool's word:
- "Eyes down" clipped — Gemini's own verify pass already dismissed this
  (confirmed intact on re-watch).
- "Keeping it." truncated at the screen edge — checked the frame myself:
  displays fully, not truncated. False positive.
- Caption shows "Seven for ten" instead of "7/10" — checked the frame:
  displays exactly "7/10. HR-approved." as written. False positive (almost
  certainly the tool conflating the spoken audio's pronunciation with the
  burned-in text).
- Caption shows "Hemiuji" instead of "Hemiunu" — checked the frame:
  displays exactly "[Hemiunu] The water-bearer." False positive, same
  likely cause.
All four came back clean on direct inspection — 0 real caption bugs found
by the tool this round, on top of the 4 real ones my own manual audit
caught that the tool's word-level pass didn't (it isn't built to catch
"cue spans a real pause" or "cue timed during a physically-impossible
moment" — those need the silence-map + frame method, not a transcript
diff).

### Issue C — two internal cuts inside clip 8, 1:16-1:22

Confirmed, and worse than a pacing problem — this is a NEW defect on a
clip round 3 had already pacing-fixed (10s -> 14s) without checking visual
continuity, only audio timing. Frame-by-frame extraction across the v2
clip found **two real AI-generated internal discontinuities inside what
was supposed to be one continuous take**: the background population jumps
from people-prostrating to camels around t=1.0-1.3s, then the framing hard-
jumps from a standing wide shot to a ground-level close-up around
t=1.6-2.0s. Neither is a hard cut in the edit — both are inside the single
generated clip, which is why they read as broken rather than as an
intentional edit.

Root cause: the original clip8 prompt asked for a standing-to-prostrate
transition without ever telling the model not to cut internally to get
there. **Fix: split clip8 into two shorter clips**, each with an explicit
"STRICT CAMERA RULE: this is ONE single unbroken take... NO internal cuts,
NO scene changes, NO jumps between different setups, and NO changes to the
background population" clause added to the prompt, plus simplified
per-clip staging so each generation has less ground to cover:

- **clip08a_prostrate** (9.04s, task `c89d01b3-a4be-411f-8c6a-21ad428a9f81`,
  https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/bcd3d76e95d13ad6836cbc4f2d417a19.mp4):
  horns sound, the gang (incl. Djedi) drops prostrate in one continuous
  motion. Verified clean across 18 frame pulls spanning the full runtime —
  continuous camera motion the whole way, same background/laborers/pyramid
  throughout, no jumps.
- **clip08b** (12.04s, task `51341b1d-19d9-4518-9949-008565ed8450`,
  https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/32748780f31339a5cdc65d3bbe94a91b.mp4):
  the litter arrives, Hemiunu's lines, her "...Me?" beat. Verified clean
  across 22 frame pulls spanning the full runtime — same result, one
  continuous shot, no internal cuts.

Caption timing for both derived from real silencedetect data (not the old
clip's proportions). One honesty note worth recording: clip08b's two
merged multi-line blocks (her 3 lines in block 1, Hemiunu's 2 lines in
block 2) have no internal gap that clears the 0.3s bar either — same
acoustic ambiguity as clip03_food above — so those specific sub-splits are
best-evidence estimates (largest sub-threshold dip + word-count proportion,
frame-spot-checked) rather than hard-verified like the block boundaries
are. Said so in the code comment rather than presenting them as equally
certain.

### Issue D — exposure/lighting inconsistent throughout

Measured mean luma (`ffmpeg signalstats`) across all 16 clips: range is
106.77-127.81 for clips 1-11, then a deliberate drop to 91.74-100.51 for
the dusk/twilight outro block (11→12a is a -31.5 point drop by design —
this episode runs dawn-to-dusk). Within that range, one clip
(clip12b_thumb) was a real outlier — 79.71 against neighbors at 96.28/
100.51 — and was **already fixed earlier this session** (`eq=brightness=
0.055`, now 91.74, blends with its neighbors).

Rather than re-assert that same conclusion, checked it properly this time:
pulled last/first frames across the two largest adjacent luma jumps in the
main cluster (clip6->clip7, +18.4; the clip11->clip12a dusk transition,
-31.5) plus the now-corrected clip12b's own neighbors. All three read as
legitimate on screen — clip6->clip7 is an indoor-shade-to-outdoor-sun
location change (confirmed via frame pull, not assumed), and
clip11->12a->12b->12c is a genuinely well-executed sunset-to-twilight
progression (sun still on the horizon in clip11's last frame, fully down
with a visible campfire by clip12a's first frame). Gemini's QC sweep raised
this same region independently (unverified severity-2: "dusk horizon
illumination... shift slightly across final monologue cuts") — consistent
with what I'd already found by direct measurement, and not something the
single verify pass upgraded to CONFIRMED. **Conclusion: one real outlier,
already fixed; everything else is intentional narrative lighting design,
now confirmed by frames rather than asserted.**

### Rebuild + re-verification

`captions_data.mjs` now has **16 clips** (was 15 — the clip8 split).
`qc_pass.mjs` -> `apply_prelap.mjs` -> `build_final_cut.mjs` all re-run
clean. Runtime **165.25s** (up from 160.63s — the clip8 split adds ~4s net
after the clip6 trim removes ~2.4s). Frame-count check: exact match
(3966/3966). Spot-checked every changed cut point via frame pulls (clip6's
new ending, clip7->8a, 8a->8b, 12a->12b) plus the three new/changed caption
gaps (clip09a, clip11) to confirm no caption bridges a real pause in the
rendered output, not just in the source data.

**Gemini eyes `qc` mode on the rebuilt cut**: 5 findings, 2 confirmed —
both on original, unchanged footage outside this round's scope, both
frame-checked before deciding not to act:
1. **clip4 (~31s), wheeled cart on loose sand** — real, visible, minor:
   the hauling sledge shows small wooden wheels sitting oddly against the
   sand rather than a true sledge-runner contact. Mildly ironic given the
   scene's own line is about wet-sand friction reduction, not wheels. Not
   fixed — original footage, outside this round's 4-issue scope, and the
   owner hasn't flagged it.
2. **clip7 (~63s), jug halts a multi-ton cart** — checked the frame: this
   is the deliberate setup shot for the "Technically... the jar stopped
   it" payoff in clip09a. Not a rendering glitch — it's the story's central
   irony beat, and changing it would break the callback dialogue two clips
   later. Recording it as CONFIRMED (per the tool) but explicitly waived,
   not silently dropped: this is a narrative choice, not a defect.

The remaining 3 are unverified severity-2 hints on original unchanged
footage (palm wound-texture crawl, high-five hand clipping, the dusk-region
finding addressed under Issue D above) — not acted on, consistent with the
standing rule that only CONFIRMED findings drive fixes.

## STATUS: delivered, all four reported issues fixed and independently verified

1. **Static camera hold (Issue A)** — fixed, clip6 trimmed, re-verified at
   the new cut point.
2. **Caption strictness (Issue B)** — 4 real bugs found and fixed
   (clip09a/09b/11/03) via a full 16-clip silence-map re-audit; Gemini's
   `captions` pass added 4 more claims, all checked and all false
   positives.
3. **Two internal cuts in clip 8 (Issue C)** — fixed by splitting into
   clip08a_prostrate + clip08b, each regenerated with an explicit
   no-internal-cuts camera constraint, both frame-verified clean across
   their full runtimes.
4. **Lighting/exposure consistency (Issue D)** — one real outlier
   (clip12b) already fixed; the rest of the episode's variance confirmed
   legitimate (location changes, intentional dusk progression) via direct
   frame inspection, not just reasoning.

Two items still flagged for owner decision, not silently skipped (both on
original footage untouched by any round so far):
1. Wheeled-cart-on-sand physics quirk on clip 4 (confirmed, minor, out of
   scope).
2. Jug-halts-cart on clip 7 (confirmed by the tool, but judged a deliberate
   story beat, not a defect — explicitly waived with reasoning, not
   ignored).
Plus the two items still open from round 3 (rope/wheel artifact on clip 7,
broader wardrobe-rendering variance) remain unresolved and un-re-litigated
this round — still the owner's call.
Owner's watch-through remains the final gate per standing rule.

## Round 5 — clip 6 re-cut: remove the face-to-camera portion entirely (2026-08-22)

Owner watched the round-4 delivery and flagged clip 6 again: after Djedi
says "We saw it.", there's a portion where she's looking at the camera for
~2 seconds before the next clip starts, and asked for it gone — keeping
only the beat where she's looking at the stone with Djedi. Owner explicitly
asked to see the proposed cut before it was applied ("show me what you
will do, and then I will tell you what to do"), and to keep it reversible
in case of a change of mind.

**Investigated before proposing anything.** Round 4 had already trimmed
this clip 12.051s -> 9.625s to remove a frozen tail, but had only checked
audio timing on the remaining 7.186-9.625s, not visual continuity. Frame-
by-frame extraction this round found the actual defect: a **hard internal
cut at ~7.57s** — one frame is the two-shot (her + Djedi looking down at
the graffitied stone), the very next frame is a tight face-to-camera
close-up, no transition, no camera movement. This is the exact "camera
angle changed" moment the owner described, and it explains why the
segment read as off — it isn't one continuous held shot, it's two
different generated framings jammed together with no cut in the edit to
account for it. Narrowed the exact jump to between 7.55s and 7.60s via
successive frame pulls.

**Proposed, and showed, before touching anything.** Cut a preview at 7.5s
(0.31s of natural settle after "We saw it." ends at 7.186s, still on the
stone shot, ending just before the 7.57s jump) and sent it to the owner
without changing `captions_data.mjs` or rebuilding the pipeline. Owner
confirmed: proceed, and be careful not to affect what comes before or
after this clip.

**Applied carefully, per that instruction:**
- Backed up the round-4 9.625s file (`clip06_empathy_ROUND4_9625ms.mp4`)
  before overwriting anything. The original 12.051s file was already
  preserved from round 4.
- Re-cut the FINAL 7.5s version directly from
  `clip06_empathy_ORIGINAL_12s.mp4`, not from the already-re-encoded
  9.625s round-4 file — avoids a second generation of lossy compression
  stacking on the first. First-generation quality.
- Verified before promoting it: frame 0 of the new file matches the
  clip's true opening (confirmed identical to the original's frame 0);
  the last frame ends cleanly on the stone two-shot with no glimpse of the
  removed close-up; silencedetect on the new 7.5s file reproduces the
  exact same speech-block timing as before for 0-7.186s (bit-identical
  audio content, just truncated later) — so all three existing caption
  timestamps needed zero changes.
- Only the trailing code comment in `captions_data.mjs` was updated (the
  old one referenced "7.186-12.051" as the silent beat, now stale).

**Rebuilt and re-verified isolation specifically, per the owner's "leave
no room for error" instruction:**
- `qc_pass.mjs` output: clip 6 now 7.500s, every other one of the 15
  other clips reports the IDENTICAL duration as round 4's build — direct
  confirmation nothing else moved.
- `apply_prelap.mjs`: clip 6's own prelap delay shifted to 7.300s (7.5 -
  0.2, correct), every other clip's prelap delay unchanged from round 4.
- `build_final_cut.mjs`: runtime **163.13s** (down from 165.25s — exactly
  -2.125s, i.e. 9.625-7.5, the only change). Frame-count check: exact
  match (3915/3915).
- Frame-pulled BOTH sides of both boundaries touching this clip: clip5's
  ending -> clip6's opening (unchanged, confirms "before" is untouched),
  and clip6's new ending -> clip7's opening (the changed boundary —
  confirms the cut lands cleanly on the stone shot with zero trace of the
  removed close-up, and clip7 opens exactly as it always has).
- Delivery copy re-encoded: 28MB, comfortably under the 30MB limit.

## STATUS: delivered — clip 6 re-cut applied, shown before commit, verified on both sides

Clip 6 now ends on the stone beat; the face-to-camera portion is fully
removed from the assembled episode. All three prior versions of this clip
(12.051s original, 9.625s round-4 cut, plus the 7.5s file itself) are
preserved as separate files — nothing was destroyed, per the owner's
explicit reversibility request. Everything before and after this clip in
the final cut verified unchanged except for the expected timeline shift.
Owner's watch-through remains the final gate per standing rule.

## Round 6 — reverted clip 6 to the round-4 cut (2026-08-22)

Owner watched the round-5 delivery (clip 6 re-cut to 7.5s, stone-shot
only) and called it bad, asking for "the last final version" back. This
is exactly the reversibility the owner had asked for when first approving
the round-5 cut ("don't remove it permanently — maybe we need to think
about it again") — so the fix was a straight revert, not a new
investigation.

**What "last final version" meant here:** the round-4 delivery — clip 6 at
9.625s (frozen tail trimmed, face-to-camera portion still present) —
as opposed to round 5's 7.5s stone-only cut just sent. Read from context
rather than asked, per the owner's own established shorthand across this
project ("the last final version" = the previous thing I called a final
cut, not a request to resend the same file); flagged as an inference here
so it's easy to correct if it's not what was meant.

**Executed as a revert, not a rebuild-from-scratch:**
- `clip06_empathy.mp4` (the just-shipped 7.5s round-5 file) backed up
  as `clip06_empathy_ROUND5_7500ms.mp4` before touching anything —
  nothing from round 5 is lost either.
- `clip06_empathy_ROUND4_9625ms.mp4` (preserved during round 5 for this
  exact scenario) restored as the active `clip06_empathy.mp4`.
- `captions_data.mjs`'s clip 6 comment updated to record the revert;
  caption cue timings themselves untouched (they've never needed to
  change across any of these versions — all three end at 7.186s).

**Rebuilt and checked against the known round-4 numbers, not just
re-verified in isolation:** `qc_pass.mjs` reports clip 6 back at 9.625s
with every other clip's duration identical to both round 4 and round 5's
builds (confirms this clip is the only moving part, again). Final cut:
runtime **165.25s**, frame-count **3966/3966** — both an EXACT match to
round 4's originally-recorded numbers, not just internally consistent.
Spot-checked the clip6->clip7 boundary directly: confirms the face-to-
camera close-up is back in the assembled output. Delivery copy: 28MB.

## STATUS: delivered — reverted to the round-4 cut per owner request

All four versions of clip 6 now exist as separate files (12.051s
original, 9.625s round-4/round-6-active, 7.5s round-5) — nothing across
any of these three rounds has been destroyed. Current active state
matches round 4's delivery exactly. If the owner wants to revisit the
stone-only cut, or try a different edit point entirely, every version
needed to compare or resume from is still on disk.
Owner's watch-through remains the final gate per standing rule.

## Round 7 — swapped back to the round-5 cut for review (2026-08-22)

Owner asked to see "the one before this one" right after round 6's
delivery — i.e. round 5's 7.5s stone-only clip 6 cut again, one step back
from what had just been sent. Read literally as: show the file that was
delivered immediately before the one just received, not a re-decision on
which cut is better.

**Note on what "before this one" pointed at each time**: round 6 was
itself already a revert (back to round 4's cut), so round 6's "before
this one" = round 5, not round 4. Tracking the actual send order rather
than clip-version numbers matters here — round 4 -> round 5 -> round 6
-> [this ask] means round 5 is correct, not round 4 again.

The full assembled episode file gets overwritten on every rebuild, so
"the one before this one" no longer existed as a standalone file — only
the per-clip backup did (`clip06_empathy_ROUND5_7500ms.mp4`, preserved
during round 6 for exactly this kind of back-and-forth). Confirmed the
then-active file was byte-identical to `clip06_empathy_ROUND4_9625ms.mp4`
(md5sum match) before swapping, so nothing from round 6 needed a separate
backup — it was already saved under that name.

Swapped `clip06_empathy.mp4` to the round-5 file, rebuilt the full
pipeline, and verified the result against round 5's ORIGINALLY recorded
numbers from that round's log entry: runtime 163.13s, frame-count
3915/3915 — both matched exactly. Delivery copy: 28MB.

## STATUS: delivered — round-5 cut (clip 6 stone-only) back in front of the owner for review

This is a review round, not a decision round — nothing has been
re-resolved about which clip-6 cut ships. All three clip-6 versions
remain on disk under their own filenames and can be swapped in again on
request, same as this round and round 6 both were. Owner's watch-through
remains the final gate per standing rule.

## Round 8 — full reshoot of the "royal audience" sequence (clips 8-9, ~1:10-1:57) (2026-08-23)

Owner asked to identify which clips cover the "That's the king" through
Khufu-conversation stretch, confirmed it was 4 clips (`clip08a_prostrate`,
`clip08b`, `clip09a_stone`, `clip09b_reply`, 1:09.75-1:56.92), and asked
for a full reshoot: more historical fact density, at least one more
"prominent historical figure," and a version of the time-travel reveal
made explicit rather than left oblique. Treated as research + plan + draft
first, per the owner's own "then we will decide" framing — nothing was
generated until the script was approved.

**Research** (sourced, see chat for full citations): Khafre (Khufu's son,
built the second Giza pyramid, traditional Sphinx attribution) added as a
second on-screen historical figure. Hetepheres I's tomb (Khufu's mother —
found sealed and undisturbed in 1925, opened 1927, sarcophagus empty, no
body — a genuine unsolved mystery) used as the reveal's "proof" beat.
Diary of Merer (Wadi al-Jarf papyri, 2013 discovery, a real logbook from
Khufu's own reign) and the 2017 "Big Void" muon-scan discovery were
researched and judged strong enough to hold for the pinned comment, but
didn't fit the 15.2s/clip budget alongside everything else without
repeating this project's "too many words, not enough seconds" mistake —
said so plainly rather than quietly dropping them.

**Script iteration (three real rounds, not rubber-stamped):**
1. First draft used a technical ramp-theory question and a weak "technically
   the jar stopped it" exchange — owner correctly flagged both as
   inaccessible/flat and asked for clips B and C specifically reworked.
2. Rewrote B around one accessible, vivid fact (the pyramid's level base,
   measured by stars) that also does plot work — it's what makes Hemiunu
   wary of her, which is what motivates Khufu's suspicion in C. Reworked C
   so Khufu's accusation comes from Hemiunu's report and her deflection
   gets cut off ("Do not lie to a god."), replacing the flat exchange.
3. Owner then asked for a full rewrite of all four (not just B/C), more
   facts, more figures — produced the Khafre/Hetepheres version above.
4. Pacing check, twice: first pass calibrated each clip's pace off real
   measured wps from the rest of THIS episode's own footage (not a
   generic target) — caught that clip D's draft had gone too slow in
   sustained stretches (would have needed a 5th clip). Owner then pushed
   back that the fix had overcorrected toward boring/slow and asked for
   the exact wps breakdown; recalibrated using this episode's own
   "brief slow anchor, brisk everywhere else" pattern (matches how
   "Hazel—" runs 1.97 wps as a single anchor while surrounding lines sit
   3-5 wps) — this fixed both the pacing complaint AND the duration
   problem at once, since the two were the same root cause.

**Generation**: clip08a_prostrate's first attempt rendered successfully
but was FAILED post-hoc by PAI's content-moderation pass (documented
precedent: clip6 hit this same failure mode earlier in this project — a
successful render can still be rejected after the fact). A plain retry of
the identical prompt succeeded. clip08b, clip09a_stone, clip09b_reply all
succeeded on the first attempt.

**Verification, all 4 clips, frame-by-frame across their full runtimes —
two honest findings, neither treated as silently acceptable or silently
blocking:**
1. **clip08b body-position drift.** The prompt said "stays face-down/
   prostrate for the ENTIRE clip" — she instead rises smoothly from
   prostrate to sitting/kneeling over the clip's 12s. Confirmed via dense
   frame sampling that this is a real, smooth, continuous motion (not an
   internal cut/jump) — most likely the model anticipating "the king will
   see you" by having her start complying early. Not fixed: no jump-cut,
   and the cut into clip09a_stone (which itself opens on her rising) isn't
   jarring. Documented in the caption entry rather than silently accepted.
2. **clip08a_prostrate horse-drawn carriage.** Prompt specified a
   hand-carried "gilded litter"; the model rendered a horse-drawn open
   carriage instead — consistent throughout the clip (a staging choice,
   not a continuity bug), but a real minor anachronism for Old Kingdom
   Egypt (c. 2560 BC) — horses/chariots don't appear in Egypt for roughly
   another thousand years. Not fixed without a further regeneration
   attempt (already used one retry on this clip for the moderation
   failure) — flagged for the owner's call rather than deciding
   unilaterally to reshoot again.

**Caption timing**: real silencedetect throughout, same discipline as
every round this session. Three of the four clips (08a, 08b, 09b) mapped
cleanly to real audio boundaries — 09b's her/Khufu speaker split was
resolved by a boundary only visible at a finer -24dB pass, worth noting
since it means that clip's speaker attribution is fully audio-grounded,
not estimated. clip09a_stone's central exchange (Khufu's accusation + her
interruption + his rebuke, 27 words) has no boundary >=0.3s at any
threshold tried, and frame-checks were inconclusive (Khufu visibly
dominant on-screen through the checked span) — that one three-way split is
a word-count-proportional estimate, flagged as lower-confidence in the
code comment rather than presented as equally certain to the others.

**Rebuild**: `captions_data.mjs`'s four affected clips fully rewritten
(new IDs unchanged, all content replaced). `qc_pass.mjs` ->
`apply_prelap.mjs` -> `build_final_cut.mjs` re-run clean. Runtime
**162.13s** (down slightly from 163.13s — 09a shrank 14.04s->12.04s and
09b stayed the same length while 08a grew 9.04s->10.04s and 08b stayed
12.04s: net -1s). Frame-count check: exact match (3891/3891). Spot-checked
all 5 new/changed cut points (7->8a, 8a->8b, 8b->9a, 9a->9b, 9b->10) via
frame pulls — all clean, no artifacts, no jarring position mismatches
despite clip08b's body-position drift landing right at one of those cuts.
Delivery copy: 27MB.

**Gemini eyes `qc` mode on the rebuilt cut**: 4 findings, 3 confirmed —
and notably, **none of them fall inside the reshoot** (all four new/
changed clips span 1:09.75-1:56.92; every finding below sits well outside
that window, on original footage this round never touched):
1. **Costume drift at the clip3->clip4 boundary (~29s), confirmed** —
   reinforces the "broader wardrobe-rendering variance" item already open
   since round 3 (same category of finding, not a new occurrence). Still
   not fixed, still the owner's call — large scope, pre-existing, out of
   any single round's remit.
2. **Tally-wall pseudo-script (~42s), confirmed, NEW catch** — the carved
   attendance-log wall in clip5_irony shows modern-looking numerals and
   Greek/Latin-ish characters instead of anything resembling Old Kingdom
   hieratic. Real, on original untouched footage, not fixed this round —
   flagging fresh rather than folding it into the wardrobe item since it's
   a different root cause (writing-system anachronism, not costume
   drift).
3. **Jar/wheel physics on clip7 (~61s), confirmed** — same persistent
   artifact this exact QC pass has now caught independently across
   multiple rounds (rounds 2, 3, and F all found a version of this on the
   same original, unchanged clip7 footage). Reinforces rather than
   discovers; still out of scope, still not fixed.
The 4th (high-five hand clipping, ~1:58, severity 2) is unverified — a
hint per the standing rule, not acted on.

## STATUS: delivered — full reshoot of the royal-audience sequence, clean verification

All four reshot clips (`clip08a_prostrate`, `clip08b`, `clip09a_stone`,
`clip09b_reply`) are new content: Khafre added as a second historical
figure, the weak "stopped my stone"/ramp-theory exchange replaced with a
Hemiunu-suspicion throughline and an explicit 2026 reveal anchored to the
real Hetepheres tomb mystery. Frame-verified clean across all four full
runtimes — zero internal cuts, matching the STRICT CAMERA RULE discipline
this project has held since the earlier clip8 fix. Two honest, non-
blocking findings from this round's own verification (clip08b's body-
position drift, clip08a's horse-drawn-carriage anachronism) and three
confirmed Gemini findings, none inside the reshoot itself and two of the
three already-known open items — all flagged in this log rather than
silently accepted or silently fixed without the owner's sign-off.
Owner's watch-through remains the final gate per standing rule.
