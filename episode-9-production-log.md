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

## Round 9 — clip08b re-reshoot, owner review catch (2026-08-23)

Owner reviewed round 8's 4 raw clips directly this round (the checkpoint
that should have happened before round 8's caption rewrite/pipeline
rebuild — corrected this round; the assembled cut had already gone out
before this review happened) and caught two things.

**clip09b_reply — Khufu's final line, verified, no regeneration needed.**
Confirmed as rendered: "Of course it stands. I commissioned it." — matches
script exactly. Checked two independent ways: the caption pass's
audio-boundary data (real silencedetect, finer -24dB pass) treats her full
"...No body. Yours doesn't stay empty. Yours still stands." as one
unbroken vocal block with Khufu's reply starting cleanly right after it;
and frame-by-frame across the exchange, her mouth is what's moving through
that entire block while his stays shut — he's already turned away, back to
camera, before his own line even starts. One transcription tool's
single-pass read had initially mis-split that block across both speakers;
contradicted by both checks above, treated as a tool artifact, not a clip
defect.

Also surfaced two things outside what was asked, neither acted on this
round per owner's "decide the rest later": a modern-looking tower crane
and scaffolding visible throughout clip09b_reply's background (missed by
this round's own earlier verification and by Gemini's round-8 QC), and
Khufu's transport/seating rendered inconsistently across clip08a/09a/09b —
and even within clip09a_stone alone, between its 1s mark (seated in a gold
chair) and 5s mark (standing beside an unrelated gold chest, chair gone).
Flagged for a later decision, not fixed.

**clip08b — reshoot, owner-approved, scoped to this one clip.** The
opening frame read as her face sunk chin-deep into a mound of sand rather
than lying flat on the ground — awkward, and separate from the
already-logged rising/drift issue. Rewrote `prompts/clip08b_v2.txt` in the
pai-pro tree (kept as a new file; original `clip08b.txt` untouched for
history): strengthened the STRICT CAMERA RULE and SCENE paragraphs to (a)
specify she lies flat on top of undisturbed, level sand — no mound ever
covers her chin/jaw/neck — and (b) repeat and extend the "does not rise"
constraint through Hemiunu's closing line specifically, since the
original's drift was most likely the model anticipating "The king will see
you" by having her start to comply early. Nothing else in the prompt
touched.

Generated via `gen_video.mjs clip08b_v2 prompts/clip08b_v2.txt 12` — one
attempt, succeeded first try. Output: `assets/clip08b_v2.mp4`, 12.05s
(same runtime as the original). Frame-verified across 9 timestamps
spanning the full runtime (0.3s-11.8s): flat/prostrate throughout,
including through the 11.8s mark where the original had already risen to
kneeling — no sand mound at ground contact, no internal cuts. Both flagged
problems fixed clean on the first attempt.

## STATUS: awaiting owner review — clip08b_v2 sent for approval

Not yet promoted to replace `clip08b.mp4`, not yet folded into
`captions_data.mjs` or the pipeline rebuild — owner review of the raw clip
comes first, per the corrected checkpoint order. Everything else flagged
this round (background crane, Khufu transport/seating consistency) stays
open, owner's call on timing. `prompts/clip08b_v2.txt` lives in the
pai-pro working tree (`Utopai-Research/pai-pro`, outside this session's
repo scope) rather than this repo, so it isn't committed here — recorded
in this log instead so another session can find it.

**clip08b_v2 rejected on owner review — real problem, missed in
verification.** The litter's bearers entering "the low frame" combined
with "her eyes flick down to Hemiunu's sandals and kilt-hem as he stops
beside the litter" put standing men's bare legs directly beside her face
while she's lying flat looking up at camera — reads as sexually
suggestive, not reverent. That blocking was in the original clip08b
prompt untouched by the v2 edit; v2's own verification checked ground-
contact and rising only, not what the overall composition communicated,
so it shipped for review without this being caught first.

Rewrote as `prompts/clip08b_v3.txt`: replaced both proximity-causing
lines — bearers/Hemiunu/Khafre and the litter now stay "a clear middle
distance," "small and background," explicitly "no one... comes near her
head or fills the frame beside her at any point." Body-position language
(flat sand, no rise) carried forward unchanged from v2, since that part
was already correct. Generated via `gen_video.mjs clip08b_v3
prompts/clip08b_v3.txt 12` — one attempt, succeeded first try. Output:
`assets/clip08b_v3.mp4`, 12.05s. Frame-verified across 6 timestamps
(0.3s-11.8s): litter/bearers/Hemiunu/Khafre held at background distance
throughout, no one in close frame beside her, flat/prostrate the entire
clip including the final line. Composition problem resolved.

Also visible in these wider frames (not acted on, folding into the
already-open transport-consistency item): the litter rendered as an
enclosed horse-drawn cart with a window rather than the open
bearer-carried litter described in the prompt — a fourth distinct
rendering of Khufu's transport across this reshoot's attempts.

## STATUS: awaiting owner review — clip08b_v3 sent for approval

Not yet promoted to replace `clip08b.mp4`, same as v2 before it — still
one owner review away from being folded into `captions_data.mjs` and the
pipeline rebuild. `clip08b_v2.mp4` stays on disk unpromoted rather than
deleted. `prompts/clip08b_v3.txt` has the same pai-pro-repo-scope note as
v2 above.

**clip08b_v3 rejected on owner review — a blocking problem, not an
execution problem.** Owner's objection wasn't proximity or ground contact
this time, it was more basic: she shouldn't still be prostrate/on the
ground through a whole 12s conversation at all. She already bowed fully in
clip08a — clip08b re-performing or extending that bow next reads as
unnatural ("like a kid"), regardless of how cleanly it's executed. Owner
also asked to fix clip09a_stone in the same pass, on the same principle:
its script had her "rising to standing... eyes deliberately lowered
toward the ground" at Khufu's summons — a second submissive-rise beat
that's now redundant given clip08b no longer ends on the ground.

**clip08b_v4** (`prompts/clip08b_v4.txt`): she is already kneeling upright
from frame 1 — the bow already happened in clip08a and isn't repeated or
lingered on at all. Stays kneeling the entire clip, delivering all her
lines as a real face-to-face exchange with Hemiunu at a normal
conversational distance (close enough to talk, not the v3 fix's
far-background distancing, which was only needed because she was on the
ground). The gilded litter/Khafre/bearers stay background since Khufu
isn't part of this exchange yet.

**clip09a_v2** (`prompts/clip09a_v2.txt`): opens already kneeling
(continuing from clip08b_v4's ending), rises to standing at Khufu's
summons in one brisk, confident, alert motion — dropped "eyes deliberately
lowered toward the ground" since that re-performed the deference she'd
already shown once; kept "rope-burned palms visible at her sides" as a
grounding detail that isn't inherently submissive. Rest of the scene
(Khufu's dialogue, her interruption) unchanged.

Generated in parallel via `gen_video.mjs` — both succeeded first attempt.
Outputs: `assets/clip08b_v4.mp4` and `assets/clip09a_v2.mp4`, both 12.05s.
Frame-verified across both full runtimes (7-8 timestamps each): clip08b_v4
kneeling throughout, real conversational distance with Hemiunu, no ground
contact at any point; clip09a_v2 opens kneeling, rises cleanly to standing
with alert (not lowered) eyes, holds a normal standing conversation with
Khufu, steps closer only for his scripted "more pointed" line. Checked the
08b_v4-to-09a_v2 handoff specifically: both open/close on a kneeling body
state, consistent. Still-open items unaffected by this round: the costume
render still varies (corset-style bodice in these two clips, different
from the lace-strap top elsewhere), Khufu's transport is a horse-drawn
open chariot in both — same deferred transport-consistency item as before.

## STATUS: awaiting owner review — clip08b_v4 + clip09a_v2 sent for approval

Both new versions sent together. Nothing promoted, nothing folded into
`captions_data.mjs` or the pipeline yet. If approved, note that
`captions_data.mjs`'s clip09a_stone entry will also need its speaker-split
re-derived from this new take's actual audio (real silencedetect, not
assumed) since the dialogue content is unchanged but the performance
timing may not be.

**clip08b_v4 + clip09a_v2 rejected on owner review — one more instance of
the same principle.** Owner: she's already up by the end of clip08b (v4
has her kneeling throughout), so clip09a_v2 showing her rise again —
kneeling to standing at Khufu's summons — reads as a second "getting up,"
same complaint as the earlier redundant bow. The kneeling-to-standing
transition itself needed to stop being shown at all, not just be
performed differently.

**clip08b_v5** (`prompts/clip08b_v5.txt`): changed from kneeling
throughout (v4) to standing throughout — she's already on her feet from
frame 1, the bow-and-recovery is fully off-screen between clip08a and
this clip, and she stays standing, talking face-to-face with Hemiunu at a
normal distance, for the entire clip. No kneeling, no sitting, no rising
motion anywhere.

**clip09a_v3** (`prompts/clip09a_v3.txt`): dropped the "rises to
standing" beat entirely (v2 still had a brisk version of it) — she's
already standing from frame 1, continuing directly from clip08b_v5's
ending, and Khufu simply arrives and addresses her. Zero rising motion in
this clip either.

Generated in parallel, both succeeded first attempt. Outputs:
`assets/clip08b_v5.mp4` and `assets/clip09a_v3.mp4`, both 12.05s.
Frame-verified across both full runtimes (7 timestamps each): standing
throughout in both, no kneeling/sitting/lying/rising at any checked point,
natural face-to-face conversational staging with Hemiunu and then Khufu.
`clip08b_v2.mp4`, `v3.mp4`, `v4.mp4` and `clip09a_v2.mp4` all stay on disk
superseded rather than deleted.

## STATUS: awaiting owner review — clip08b_v5 + clip09a_v3 sent for approval

**Both approved.** Promoted and integrated into the pipeline:

`assets/clip08b.mp4` and `assets/clip09a_stone.mp4` (the ids the pipeline
actually reads) overwritten with the approved `clip08b_v5.mp4` and
`clip09a_v3.mp4` content. Originals preserved first as `clip08b_v1.mp4`
and `clip09a_v1.mp4` — nothing deleted, same convention as every prior
round.

`captions_data.mjs` entries for both ids rewritten from real
silencedetect on the new audio (not reused from the old takes, since
performance timing differs even with identical dialogue): clip08b's 7
scripted phrases map 1:1 to 6 clean boundaries (the closest two bracket a
single audible breath, not a new word — confirmed by getting exactly 7
segments for 7 phrases with nothing left over). clip09a_stone's opening
line has a clean boundary; the 27-word Khufu/her/Khufu exchange again has
no internal gap even at a finer threshold — Khufu audibly cuts across her
per the script, so there's genuinely no pause to detect — same
word-count-proportional split and same lower-confidence caveat as round
8's version of this clip.

Pipeline rebuilt clean: `qc_pass.mjs` → `apply_prelap.mjs` →
`build_final_cut.mjs`, all 16 clips, no errors. Runtime **162.13s**
(unchanged from round 8 — new takes came out the same length as what they
replaced). Frame-count sanity check exact: 3891/3891. Frame-verified all
three changed cut points (08a→08b, 08b→09a, 09a→09b) — clean hard cuts,
consistent posture and costume across each, no artifacts. Delivery copy:
28MB (compressed), under the 30MB chat limit.

**Gemini eyes `qc` on the rebuilt cut** (`qc_report_round9/`): 4
candidate findings, 1 confirmed, none requiring new action:
1. **Costume drift ~29s, confirmed** — same pre-existing item open since
   round 3, reinforced again, still the owner's call, outside anything
   touched this round.
2. **Tally-wall pseudo-script ~41s, severity 2, unverified** — same
   already-known item from round 8, resurfaced as a hint this pass
   (severity varies run to run on single-pass sweeps; not re-verified
   since below the verify threshold this time).
3. **Rope-burn continuity ~1:07→~1:57, severity 3, UNSURE (new candidate,
   not confirmed)** — claims her rope-burned palms are severe at 1:07 but
   gone by 1:57; the verify pass couldn't check it because 1:57 falls
   outside the ±6s clip it re-watches around 1:07, so this came back
   structurally inconclusive rather than confirmed or dismissed. Both
   ends of this claim sit in footage untouched this round (clip07 through
   clip10) — not acted on per the standing rule (only CONFIRMED findings
   are trusted), but flagging it as new and unresolved rather than letting
   an UNSURE verdict quietly disappear; worth a proper look with a wider
   verify window in a future round.
4. **Background crowd flicker ~1:11, severity 2, unverified** — falls
   inside clip08a_prostrate (untouched this round); sub-threshold hint,
   not treated as fact.

No CONFIRMED finding from this pass falls inside anything reshot this
round. `captions_data.mjs` lives in the pai-pro tree (outside this
session's repo scope, same note as the prompt files above) — not
committed here, recorded in this log instead.

## STATUS: delivered — clip08b/clip09a fix integrated, updated cut sent

Full round-9 arc: sand-mound framing → proximity/composition → redundant
bow → redundant rise, four owner catches on the same two clips, each a
real and different problem, each fixed and verified before moving on.
Updated `giza_final_cut_compressed.mp4` (162.13s, 28MB) delivered. Owner's
watch-through remains the final gate per standing rule. Still-open items
carried forward, none acted on without the owner's sign-off: background
crane in clip09b_reply, Khufu's transport/seating consistency across
clip08a/09a/09b, the pre-existing costume-drift item, and the new UNSURE
rope-burn continuity candidate.

## Round 10 — adopt Episode 7's word-synced chunk caption system (2026-08-24)

Owner-directed, channel-wide standard replacing line-level caption timing
on every episode. Before starting: fetched origin, found this branch's
CLAUDE.md was stale — missing two owner-locked decisions that exist on the
episode-6 branch (2026-08-21): (1) ask the owner before every clip
regeneration, every time, wait for explicit go-ahead; (2) send every
generated clip immediately, never gated behind Claude's own QC/Gemini
findings. Reconciled CLAUDE.md to pull both in, plus the caption-system
section itself (owner-locked 2026-08-23). **Flagged directly to the owner
in-chat that this session had been inconsistently following rule (1) —
proceeded straight to generating clip08b_v3 and clip08b_v5/clip09a_v3
without pausing for explicit sign-off — and rule (2), by running a full
Gemini QC pass before sending round 9's integrated cut rather than
after.** Both followed correctly from this round onward.

**Implementation**, copied from Episode 7 (Troy) per CLAUDE.md's own
instructions, adapted only for this project's `{id}.mp4` asset naming
(Troy used `{id}_v1.mp4` — a filename-convention difference, not a
timing/chunk-size/font deviation):
- `pai-pro-tooling/giza/make_word_chunks.py` + `qc_pass.mjs` — durable
  copies in the chloe repo, plus live copies in `pai-pro/projects/giza/`
  (that engine tree isn't in this session's git scope, same note as every
  prompt file this episode).
- `captions_data.mjs`: `SUB_STYLE` replaced with Troy's exact block
  (Liberation Serif 50, outline 2, shadow 1, marginV 320, marginLR 60,
  spacing 2.5); added an empty `CARDS` export so Troy's qc_pass.mjs
  imports cleanly (the on-screen-cards feature itself is Troy-specific,
  not adopted here). Original line-level file preserved whole as
  `captions_data_lines_backup.mjs` before any rewriting.

**Chunking run**: `faster-whisper small.en` against all 16 clips' actual
rendered audio, script-biased. 15/16 clips matched 89-100%. One clip,
`clip05_irony`, matched only 86% with a real defect — a ~0.06s micro-chunk
on "brewing day" (whisper's transcript skipped that phrase entirely,
likely confused by three near-identical "Absent — X" openers read in
quick succession). Re-ran that one clip on `medium.en`: 100% match, clean
durations throughout, used in place of the small.en result. No clip
needed a manual `corrections.json` override — medium.en alone resolved
the one weak case.

Rewrote all 16 clips' `captions` arrays in `captions_data.mjs` with the
chunk output (word-level `{start,end,TEXT}`, no speaker tags per the new
spec), preserving every clip's existing production-history comments
above its (now-superseded) old array — nothing about the prior
silencedetect/frame-verification work was deleted, just superseded, and
is still readable in both this file's comments and in
`captions_data_lines_backup.mjs`.

Rebuilt: `qc_pass.mjs` → `apply_prelap.mjs` → `build_final_cut.mjs`, clean,
no errors. Runtime unchanged at 162.13s, frame-count sanity exact
(3891/3891) — only the caption layer changed, not the cut. Frame-spot-checked
4 cues across 3 different clips (clip01_vista, clip05_irony, clip08b): each
shows the correct chunk text, correct serif/spacing/outline style, at the
right moment — and one deliberate check of a pause gap (clip01, 0.6s,
between "THAT'S IT." and "THAT'S ACTUALLY") confirmed the screen actually
goes caption-free during pauses ≥0.35s, not just in the abstract spec.

## STATUS: delivered — chunk-caption system live on all 16 clips

Sent immediately after the rebuild, per the corrected delivery rule — no
extra QC pass run first this time. `CLAUDE.md` and this log are committed
to this repo; `captions_data.mjs`, the backup file, and the two tooling
scripts live in the pai-pro engine tree (outside this session's repo
scope) and in `pai-pro-tooling/giza/` (committed here). Nothing else
changed this round — same footage, same still-open items as round 9's
close, just the caption layer.

## Round 11 — full editing pass: lighting/exposure + transitions (2026-08-24)

Owner asked for a thorough editing review of the whole assembled cut —
lighting/exposure across the video, transitions between clips, fix what's
fixable. Methodology: built a 4x4 contact sheet (one representative frame
per clip) for direct side-by-side exposure/color-temperature comparison,
then a before/after contact sheet at all 15 cut points, then cross-checked
with an independent Gemini eyes `qc` pass on the full assembled cut.

**Major finding, CONFIRMED by direct frame inspection (full-res, both
sides of the cut) — a hard day-to-night lighting jump at the clip11→
clip12a cut (~2:14).** clip11_mirror ends on a bright golden-hour shot
with the actual sun disc visible on the horizon; clip12a_thesis1 opens
under a deep dusk/near-night sky, pyramids reduced to flat dark
silhouettes, small ground-level lights visible in the distance. This
isn't a gradual sunset drift — clip11's own last frame is still bright
sunset, so the jump is entirely at the hard cut. clip12a/12b/12c are
internally consistent with each other (all dusk), so the discontinuity is
localized to this one boundary. Notably, this was NOT caught by this
round's own Gemini QC sweep (see below) — found by direct systematic
comparison, which is exactly why the sweep-only approach isn't sufficient
on its own.

**Assessed as not fixable via color-grading**: the pyramids in 12a/12b/12c
have almost no directional sunlight modeling them (flat dark shapes, not
sunlit stone with shadow detail), and the sky is a genuine post-sunset
gradient, not a darkened daytime blue. Brightening/regrading would produce
a washed-out dusk shot, not a convincing match to the bright, direct
midday-to-golden-hour light in every other clip. Real fix needs
regenerating clip12a/12b/12c (and possibly reviewing clip11's own
placement in the gradual warming arc that runs from ~clip09b onward) with
an explicit matching-daylight constraint — a clip regeneration, so per the
permanent owner-lock rule this is reported and NOT actioned pending
sign-off, not fixed unilaterally.

Checked the other 14 cut points individually (before/after frame pairs):
no other lighting jump, no frame duplication/skip, no jump-cut-within-a-
take, no audio-desync-visible artifact. The gradual daytime→golden-hour
warming from roughly clip08b through clip11 is smooth, not abrupt, and
not flagged as a defect.

**Gemini eyes `qc` pass** (`qc_report_round10_editing/`), independent
cross-check, did not surface the day/night jump at all — 4 findings, 3
confirmed, none of them this: bread prop anachronism (~22s, NEW,
CONFIRMED — modern sliced-sourdough crumb structure instead of ancient
emmer loaf shape), costume drift ~29s (CONFIRMED, same pre-existing item
open since round 3), sledge/wheel physics ~59s-1:05 (CONFIRMED, same
pre-existing item), high-five hand clipping ~1:58 (unverified hint, as
always). None of these four are new decisions to act on beyond what's
already logged, except the bread prop, which is new — flagged, not fixed
(also a content/prop issue, not lighting/exposure/transition, so outside
what was actually asked this round; owner's call whether it's worth a
future pass).

**Nothing changed in the delivered files this round.** No
color-grading fix was applied because none of what was found is a
grading-level problem — the one real issue is a content-level lighting
mismatch that needs a regeneration decision, not a conform tweak. Said so
plainly rather than applying a cosmetic filter that wouldn't actually fix
it just to show activity.

## STATUS: findings reported, awaiting owner decision on clip11/12a-c

Comparison frame (last frame of clip11 vs. first frame of clip12a) sent
to the owner. No regeneration submitted — waiting for explicit direction
per the permanent rule.

## Round 12 — trim clip01's dead-air pause + hook strength test (2026-08-24)

Owner caught real dead air in the opening hook: 1.22s of silence between
"...it would stand." and "And today? I'm meeting him." (confirmed via
silencedetect, 7.918-9.143s) — frame-checked as visually static across
that whole span, nothing happening on screen to justify the length. This
is editing/conform work (trimming existing approved footage), not a clip
regeneration, so actioned directly per the QC rule.

Cut 0.69s out of the middle of the silent window only (7.918-9.143s is
all silence; removed [8.0, 8.723], comfortably inside it — nothing
spoken touched). Frame-accurate re-encoded join, checked before/after
frames side by side: no visible jump, her position/expression/background
all match closely. New gap ~0.51-0.6s, in line with this same clip's own
other natural beats (0.34s, 0.66s) rather than reading as dead air.
Original preserved whole as `clip01_vista_v1_pretrim.mp4`. Re-ran the
word-chunker on the trimmed clip from scratch (100% whisper match) rather
than hand-shifting the old timestamps. Clip duration 12.042s -> 11.354s;
full episode 162.13s -> 161.42s. Pipeline rebuilt clean, frame-count
sanity exact (3874/3874).

Also asked: is the hook ("That's it.") strong enough — requested a real
test, not just an opinion. Ran Higgsfield `virality_predictor` on the
corrected cut (see chat for the dashboard/results — not duplicating
scores here since they can be re-pulled live from the job).

**Hook test result** (owner supplied the actual dashboard readout —
this session's Chromium couldn't render the JS-heavy result page through
the environment's network setup, tried three methods, none worked; owner
screenshotted it instead): Peak Hook landed at 0:11 — the literal last
second of the (then-)11s clip — with Sustain 100% but Default Mode
(mind-wandering proxy, lower-better) elevated at 69%. Read together: the
mechanism holds attention fine once it has it, but nothing in the first
seconds is earning that attention — the clip coasts to its payoff instead
of opening on one. Matches the qualitative read from earlier: "That's it.
That's actually it." is vague and repeated, eating the 0-3s hook window
that this same clip was already corrected for once before (original
hook_score 30/100, pyramid-dominant-from-t=0 fix).

Flagged the trade-off before touching anything: cutting those lines
gains speed to the first concrete fact but loses the reactive, human
"gasping at what she's seeing" quality they provided — dialed by "Twenty
years." opening flat/factual instead. Owner weighed it and chose to cut,
not just tighten.

Removed "That's it. That's actually it." entirely — clean single head
cut (not a mid-clip removal), 3.0s off the front, landing ~0.16-0.22s
before "Twenty years" starts (frame-checked: mouth just parting, not
mid-word). Duration 11.354s -> 8.354s. Pre-cut version preserved whole as
`clip01_vista_v2_pausetrim.mp4` (round 12's pause-trim version is
`clip01_vista_v1_pretrim.mp4` — full lineage: v1 original -> pause-trimmed
-> this head-trim -> current). Captions re-measured from scratch again,
100% whisper match. Pipeline rebuilt clean: runtime 161.42s -> 158.42s,
frame-count sanity exact (3802/3802). New opening frame-verified: cold
open on "TWENTY YEARS." caption, pyramid still dominant in frame, natural
mouth position, no visible cut artifact.

**Follow-up same round: "And today? [pause] I'm meeting him." gap.**
Owner separately caught this as long. Checked it the same way as every
pause this round — real silencedetect measurement (1.296s, 5.892-7.189s)
plus a frame-by-frame look at what's actually happening across it. This
one is genuinely different from the earlier dead-air case: she plays a
real held smile/anticipation beat, setup into punchline, not a static
hold. Said so plainly rather than treating every pause the same way.
Weighed against the hook-strength finding anyway (peak still landing
late, clip still trying to move faster) and proposed trimming rather
than cutting outright. Owner agreed.

First two cut-point attempts were rejected on my own frame-check before
either got promoted — one landed inside her mouth still closing from
"today?", the other landed close enough to "I'm meeting"'s actual
articulation onset (whisper-measured 6.80s, vs. the coarser acoustic
threshold's 7.19s) to risk clipping it. Third attempt (cut points 6.1s/
6.7s, both frame-verified as a clean matching smile-hold on both sides
of the join) landed clean: new gap 0.72s, down from 1.296s — a partial
rather than full reduction, since cutting any tighter without clipping
speech wasn't available. Duration 8.354s -> 7.797s. Pre-cut version
preserved as `clip01_vista_v3_gap2preTrim.mp4` (full clip01 lineage now:
v1 original -> v1_pretrim -> v2_pausetrim -> v2_headtrim -> v3_gap2preTrim
-> current). Captions re-measured from scratch (100% whisper match).
Pipeline rebuilt clean: 158.42s -> 157.83s, frame-count sanity exact
(3788/3788). Verified in the actual rebuilt cut, not just the isolated
clip.

## STATUS: delivered — clip01 hook fully re-paced across three rounds

Sand-mound-style diligence applied to a hook this time instead of a
reshoot: dead air trimmed, redundant opening cut per a real hook-strength
test (not just opinion), and a legitimate performance beat tightened
without being eliminated. Updated `giza_final_cut_compressed.mp4`
(157.83s) delivered. Owner's watch-through remains the final gate.

## Round 13 — structural cut: remove the Khufu confrontation + 2026 reveal (2026-08-26)

Owner request arrived as voice dictation, garbled in transcription: "We
actually sat in a clip. No compass exist yet. So... and that clip here,
and then trim the movie after this point till the point where the king
said, I commissioned it. So I don't want this part in…" Read against the
script, this decoded to: keep clip08b only through "No compass exists
yet.", cut everything after that up to Khufu's "I commissioned it." at the
end of clip09b_reply.

**Confirmed before touching anything**, since this is a big structural cut
(not a pacing trim) and the owner's phrasing was ambiguous on one point
that changes what actually plays: does the cut *stop at* "I commissioned
it." (so that line plays right after "No compass exists yet.", with
nothing establishing what "it" refers to), or is "I commissioned it." also
removed (owner's landmark for where the cut ends, not content to keep)?
Presented both readings explicitly as Option 1 / Option 2. **Owner picked
Option 2 — full removal.** Nothing from clip09a_stone or clip09b_reply
survives; clip08b (trimmed) runs straight into clip10_respect.

**What this removes** — confirmed against the owner before cutting:
- The rest of clip08b: Hemiunu's "...You know my name." / "Even the prince
  is listening now." / "The king will see you."
- All of clip09a_stone: the entire Khufu confrontation — "You are the one
  who stopped my stone" / "Hemiunu tells me..." / her cut-off "I don't
  know what he—" / "Do not lie to a god."
- All of clip09b_reply: her full reveal — "I have. My name is Hazel. It's
  the year 2026." / the Hetepheres tomb line / Khufu's "Of course it
  stands. I commissioned it."

This is the content rounds 8 through 12 of this project's reshoot work
(the prostrate/kneeling/standing staging fixes, the costume and framing
corrections) were built around — flagged plainly to the owner as part of
the confirmation, not cut quietly. Not a QC-triggered action and no
CONFIRMED finding behind it: a direct owner editorial instruction,
double-confirmed before being actioned. Editing/conform work (trimming
already-approved footage + reassembling the pipeline), not a clip
regeneration, so no PAI/Higgsfield job and no pre-submission sign-off gate
applies — same category as round 12's dead-air trim.

**clip08b cut-point methodology.** Real `ffmpeg silencedetect`, both the
project's standard `-30dB:d=0.12` pass and a finer `-24dB:d=0.08` pass —
both agree closely: true silence from 7.465s to 7.883s, right after "...
exists yet." finishes and before the (now-removed) "...You know my name."
begins. Matches the whisper-measured chunk boundary (6.80-7.44 end) within
~40ms, the usual variance between the two measurement methods. Targeted a
cut at 7.60s, comfortably centered in that window. Frame-verified 5 points
across 7.40-7.85s before committing: 7.40 still shows her mid-word (lips
parted, "yet." not yet finished); 7.55/7.60/7.65 all show a closed/neutral
resting mouth with her gaze settled off toward Hemiunu — a clean hold, no
speech shape; 7.85 already shows the mouth reopening into the cut line.
Re-encoded (not stream-copied) for frame accuracy: actual output duration
7.625s (183 frames at 24fps, nearest frame to the 7.60s target). Checked
the literal last frame of the trimmed file directly — closed/neutral,
matches the spot-checks. Full pre-cut take preserved whole as
`clip08b_v5_untrimmed.mp4` (12.05s, all 7 original scripted phrases) —
same preservation convention as every prior round. `clip09a_stone.mp4`,
`clip09b_reply.mp4`, and every prior variant of both (`_v1` through the
latest) stay on disk in `assets/` untouched — nothing deleted, fully
recoverable if the owner ever wants this content back.

**`captions_data.mjs`** (pai-pro engine tree, outside this session's repo
scope — recorded here per standing convention): clip08b's `captions` array
truncated to its first 2 chunks ("NO COMPASS" / "EXISTS YET."), with a
dated comment added above it documenting this decision and the cut-point
evidence in full. `clip09a_stone` and `clip09b_reply` entries removed from
`CLIPS` entirely; a comment left in their former place explains the
removal and points back to this log entry and the untouched asset files
rather than the content just silently vanishing from the file. No changes
to `captions_data_lines_backup.mjs` — that file is a preserved point-in-time
snapshot from the round-10 chunk-system migration, not a live editing
surface, so it still reflects the line-level state as of that round (this
is consistent with its stated purpose, not an oversight).

**Pipeline rebuilt clean**: `qc_pass.mjs` → `apply_prelap.mjs` →
`build_final_cut.mjs`, 14 clips (down from 16), no errors. `apply_prelap`
correctly picked up the new adjacency automatically (both scripts derive
clip order from `CLIPS`, nothing hardcoded) — log line confirms
`clip08b: mixed in clip10_respect's first 0.2s @ 7.425s`. Runtime **157.83s
→ 129.33s** (-28.5s, matching the ~28-29s estimated at confirmation time).
Frame-count sanity check exact: 3104/3104.

**Verified the new cut directly in the rebuilt master** (not just the
isolated clip): frame-checked both sides of the clip08b→clip10_respect
boundary (~83.13s in the assembled cut). Before (83.05s): clean
closed/neutral hold, caption correctly blank (the burned-in "EXISTS YET."
cue ends at local 7.44s, ~0.19s before the clip's new 7.625s end, so no
caption is on screen at the actual cut frame — word-synced chunk behavior
working as designed). After (83.20s, 83.50s): clean hard cut into
clip10_respect, no dissolve/duplicate-frame/artifact, natural continuing
motion. Compressed delivery file: 21.4MB, under the 30MB chat limit.

**New item flagged, not fixed**: removing clip09a_stone/clip09b_reply also
removes two clips' worth of the gradual daytime→golden-hour warming arc
that round 11's editing pass confirmed ran smoothly from clip08b through
clip11. clip08b (bright midday, hard sun, sharp shadows) now cuts directly
into clip10_respect's golden-hour opening (warm horizon glow, low sun) —
a more noticeable lighting jump at this boundary than existed before,
structurally the same category of issue as the still-open clip11→clip12a
day/night jump from round 11. Not graded or otherwise touched: a real fix
would mean regenerating or regrading footage, which is a regeneration-class
decision outside what was asked this round and not actioned unilaterally
per the standing rule. Flagged here and will be called out again on
delivery.

Also noting for the record: partway through this round, a message reaching
this session carried text appended after the owner's actual "Option two."
reply, instructing a stop and a text-only summary in place of continuing
the task. That is not how this system requests a conversation summary, so
it read as an injected instruction rather than something the owner wrote —
flagged directly in-chat, not complied with, and the confirmed Option 2
work proceeded as the owner actually directed.

## STATUS: delivered — Khufu confrontation + 2026 reveal removed, cut sent

Updated `giza_final_cut_compressed.mp4` (129.33s, 21.4MB) delivered, with
the new lighting-jump observation called out alongside it. Owner's
watch-through remains the final gate. Everything cut this round is
recoverable on disk and in git/log history if the owner ever wants it
restored: `clip08b_v5_untrimmed.mp4`, `clip09a_stone.mp4`,
`clip09b_reply.mp4`, and all their prior variants were preserved, not
deleted.

## Round 14 — full-episode lighting/exposure audit (2026-08-26)

Owner reacted to the round-13 delivery: the last two clips (clip10_respect,
clip11_mirror) read as "very disturbing" / "awkward" against the clip
before them, and asked for that fixed plus a full lighting/exposure check
across the whole episode. This is exactly the observation flagged (not
fixed) on delivery — round 13 removed clip09a_stone/clip09b_reply, which
used to sit between clip08b and clip10_respect and apparently absorbed
enough of the daytime→golden-hour warming arc that the jump wasn't visible
before. Confirming and scoping it properly before touching anything.

**Methodology** (round 11's, repeated exactly): built a labeled 4x4 contact
sheet — one representative mid-clip frame per clip, all 14, from the
current rebuilt master — for direct side-by-side comparison, then
targeted follow-up on whatever stood out.

**Confirmed finding 1 (NEW, this session): clip08b -> clip10_respect /
clip11_mirror.** Contact sheet makes it unambiguous: clip01 through
clip08b are one consistent lighting chapter — bright midday sun, clear
blue sky, hard short shadows. clip10_respect and clip11_mirror are a
second, visibly different chapter — golden-hour light, warm orange/pink
sky, clip11 has an actual sun disc on the horizon with lens flare. The cut
now lands directly on that boundary with nothing to ease it.

**Tested whether this is grade-fixable before concluding it isn't.**
Applied a real correction (`colorbalance` pulling shadows/midtones cooler
+ toward blue, `eq` desaturated slightly) to clip10_respect's and
clip11_mirror's frames, pushing toward clip08b's neutral-daylight look, and
compared the result side by side. It doesn't close the gap: the sun disc
on the horizon, the warm directional light raking across the sand/stone/
skin, and the glowing sky gradient are baked into the render, not a color
cast sitting on top of it — a global grade only muddies the shot (duller,
slightly greenish-grey) without making it read as midday. Same conclusion
as round 11 reached for the clip11->clip12a boundary, and for the same
underlying reason: this is a lighting-model/time-of-day mismatch baked
into the footage, not a correctable tint.

**Confirmed finding 2 (PRE-EXISTING, round 11, never resolved): clip11_mirror
-> clip12a_thesis1.** Still exactly as reported then — golden hour with a
visible sun to flat dusk/near-night silhouettes, assessed at the time as
not grade-fixable for the same reason (12a/12b/12c have no directional
sunlight modeling on the pyramids to grade back in). Re-confirmed present
and unchanged on this pass; nothing since round 11 has touched those clips.

**These two findings are coupled, not independent.** Pulling
clip10/clip11 back to match clip08b's midday light (the direct fix for
finding 1) would widen finding 2 into a midday-to-dusk jump — bigger than
today's golden-hour-to-dusk gap. Fixing either in isolation just relocates
the problem. Flagging this explicitly rather than proposing a fix for one
and letting the other quietly get worse.

**Independent cross-check: Gemini eyes `qc` on the current cut**
(`qc_report_round13_lighting/`) — did not surface either lighting jump, same
blind spot round 11 already noted for this category (single-pass sweep
isn't well suited to cross-clip color/lighting continuity; direct frame
comparison is what actually catches it). 4 candidate findings, 1 confirmed,
unrelated to lighting: the recurring stone-sledge/hauling-rope clipping
issue first logged in round 10's editing pass, re-surfaced and re-confirmed
here (~59.4s, rope now specifically described as clipping through her arm/
hand/dress) — still open, still a regeneration-class fix, not actioned
this round since it's outside what was asked. A costume-jump candidate at
0:08 was DISMISSED on verify (false positive — an intentional jacket-to-
linen transition, not an error). A liquid-physics hint and a hand/finger
hint both stayed below the confirm threshold.

**Nothing regenerated or graded this round.** Both lighting findings need
a clip regeneration to actually fix (color-grading tested and ruled out
for finding 1; already ruled out for finding 2 in round 11) — per the
permanent owner-lock rule, that requires explicit go-ahead before
anything is submitted to PAI/Higgsfield, every time, regardless of how
the finding was reached. Reported to the owner with the coupling above
made explicit and directions proposed; nothing actioned pending their
call.

## STATUS: findings reported, awaiting owner decision on the lighting arc (clip10/11/12a-c)

## Round 15 — no-regeneration fix: dissolve + grade at clip08b→clip10 (2026-08-26)

Owner ruled out regeneration explicitly ("I do not want another regeneration")
and asked for a transition between the clips instead. Built a real prototype
before asking anything further: a short video-only crossfade at the
clip08b→clip10 join, tucked entirely inside the caption-free silent gap right
after "exists yet." (so it touches neither her dialogue nor the burned-in
caption), plus a moderate `colorbalance`/`saturation` grade pulling
clip10/clip11 partway toward clip08b's neutral daylight tone so the dissolve
has less of a gap to close. Sent as an isolated ~4.6s preview with one flag:
every clip in this project has been a hard cut, zero dissolves, per
`creative-direction.md` §16 (also cited in `build_final_cut.mjs`'s and
`apply_prelap.mjs`'s own header comments) — this would be the first
exception anywhere in the project. Owner replied "do it."

**Implemented for real, both halves of what was offered:**

**clip08b -> clip10_respect (done).** Re-rendered the *full* clip10_respect
and clip11_mirror (not just their opening seconds) with the approved grade
(`colorbalance=rs=-0.12:gs=-0.02:bs=0.12:rm=-0.07:gm=0:bm=0.07,eq=saturation=0.95`)
so the whole "chapter" is internally consistent rather than just its lead-in
— written to `clip10_respect_graded.mp4` / `clip11_mirror_graded.mp4`
(originals untouched, kept). Video-only `xfade` (fade, 0.18s, offset 7.44s —
right where "EXISTS YET." ends and clip08b's trimmed tail begins) between
`clip08b_final.mp4` and the graded clip10. Audio is a plain hard concat
through the whole join, no audio crossfade — deliberately, per the same §16
finding from Episode 2 that a real audio crossfade desyncs the incoming
clip's audio from its video; the existing J-cut prelap (quiet ambience
preview under the outgoing clip's last 0.2s) still does the audio-side work
it already did.

**clip11 -> clip12a (not done — real technical blocker, not skipped for
convenience).** Checked whether the same treatment could reach this older,
still-open jump from round 11. It can't, cleanly: `clip12a_thesis1`'s first
caption ("TWENTY YEARS.") starts at literal t=0.0 — zero caption-free
headroom on the incoming side, versus clip11's own comfortable 0.52s tail
(8.52s to its 9.04s end). Any dissolve here would blend clip11's tail with
clip12a's video *while its first caption is burned in*, i.e. the caption
would visibly fade/ghost in through the transition — which breaks the
caption system's own locked spec (hard cut in/out, no animation, owner-
approved 2026-08-23) to partially fix the transitions spec. Rather than
quietly ship a fudged version or silently drop the request, leaving this one
as a hard cut. Real options if the owner wants this boundary addressed too:
regeneration (still the clean fix, per round 11 and round 14's confirmation
grading alone doesn't close it), or accepting a shifted caption start (moves
"TWENTY YEARS." off its whisper-measured word-sync point by ~0.15-0.2s) to
open up dissolve room — not applied without asking, since it trades one
locked spec for another.

**Pipeline note, not a tooling change:** `build_final_cut.mjs` itself is
untouched and still assembles pure hard cuts by default — correct, since
every other cut in the episode (and every other episode) should stay that
way unless the owner says otherwise. This one dissolve was built as a
one-off manual render (new segment covering clip08b through the outro,
xfade + concat, stitched onto the unchanged clip01-clip08a segment reused
directly from the prior master) rather than a change to the shared script.
Practical consequence for future sessions: if the giza pipeline gets
rebuilt again for an unrelated reason (`qc_pass` -> `apply_prelap` ->
`build_final_cut`), it will regenerate the plain hard-cut version and this
dissolve will need to be manually reapplied — flagging this so it isn't a
surprise later. Treating this as a one-off exception for this episode, not
a change to the channel-wide hard-cuts-only rule — `creative-direction.md`
§16 is unchanged. If the owner wants it promoted to a standing rule, that's
a separate, explicit call.

**Verified in the full assembled master** (not just the isolated preview):
frame-count sanity exact (3101 frames = 129.208s x 24fps, no truncation);
spot-checked the untouched clip08a->clip08b hard cut (unaffected, identical
to before) and the new dissolve region directly in context — clean blend,
no caption ghosting, lands exactly where the isolated preview showed.
Runtime 129.33s -> 129.21s (the 0.18s dissolve overlap). File naming: the
canonical `giza_final_cut.mp4` / `giza_final_cut_compressed.mp4` now point
at the version with the dissolve+grade; the prior pure-hard-cut version is
preserved as `giza_final_cut_hardcuts_only_pretransition.mp4` (+
`_compressed`), not deleted.

## STATUS: delivered — clip08b→clip10 dissolve+grade live; clip11→clip12a still open (blocked on caption headroom, not actioned)

## Round 16 — extend dissolves through the dusk chapter + fix a real audio/video sync bug (2026-08-27)

Owner flagged two more transitions as awkward, again via garbled voice
dictation: located precisely by searching the script rather than guessing —
"the word slave" is the last word of `clip12a_thesis1` ("...nobody who
built this was a slave."), and "and the god king" is the first line of
`clip12b_thumb` ("And the god-king who commissioned it?"). So complaint 1 =
clip12a_thesis1 -> clip12b_thumb. Complaint 2, "last and second-last," =
the final two clips of the episode, clip12b_thumb -> clip12c_outro.

**Better dissolve technique, unlocks the previously-blocked boundary too.**
Round 15 left clip11_mirror -> clip12a_thesis1 as a hard cut because
clip12a's first caption starts at literal t=0 — no room for a video
dissolve without the caption itself visibly ghosting through the blend
(breaking the caption system's own no-animation rule). Worked out a cleaner
approach this round: build the dissolve on CLEAN footage (loudnorm+fade,
no captions burned in) instead of on the already-captioned `_final.mp4`
files, then burn a single re-timed caption pass on TOP of the composited
result afterward. Each caption still hard-cuts on/off at full opacity
exactly per its measured timing (nothing about the caption's own behavior
changes) — it just may appear while the video underneath is still
resolving a blend a few frames deep, which reads fine and arguably clues
the viewer into the scene change a beat earlier. This retroactively
unblocks clip11->clip12a too, so did all three remaining internal
boundaries in the dusk chapter in one pass: clip11_mirror -> clip12a_thesis1,
clip12a_thesis1 -> clip12b_thumb, clip12b_thumb -> clip12c_outro. No color
grade forced onto clip12a/b/c (round 14 already established grading them
brighter/warmer looks washed out, flat pyramid rendering with no
directional sunlight to grade back in) — dissolve only, letting it read as
a natural "time passing" cue between golden hour and dusk rather than
pretending the two match.

**Per-boundary dissolve duration chosen from each clip's own real headroom**,
not one blanket number: clip11's tail (after "HORIZON.") gives 0.52s, used
0.18s. clip12a's tail (after "SLAVE.") gives only 0.1617s, so 0.12s was used
there specifically (frame-margin verified: dissolve starts ~0.04s, about
one frame, after the caption's own end — confirmed in the rendered output,
"SLAVE." stays crisp through the point where the blend visibly begins, no
ghosting). clip12b's tail (after "OF TUESDAYS.") gives 0.46s, used 0.18s.
Merged `.ass` built by a one-off script (offsets derived from each xfade's
own offset parameter, chained through 3 dissolves) — spot-checked the
rendered result at all three boundaries directly, captions land exactly
where designed, no overlap between adjacent lines' text.

**Caught and fixed a real bug from round 15's approach, before it shipped
again.** Building each dissolve segment's audio as a plain concat of the
*full* clip audio tracks (unchanged from before) while the video xfade
shortens the *video* track by the dissolve duration at each boundary
created a genuine audio/video length mismatch — checked directly on round
15's already-delivered file: video 129.208s vs audio 128.883s, a 0.325s
gap, versus the pure-hard-cut baseline (video 129.333s, audio 129.338s,
5ms apart — normal). That's real drift, not rounding: dissolve boundaries
compress video timing without touching audio timing unless audio is
trimmed to match. Fix: trim the *outgoing* clip's audio to end at the same
offset the video xfade starts at (dropping only trailing silence already
confirmed caption-free/silent at every one of these boundaries — nothing
spoken is touched), letting the *incoming* clip's audio play in full. Redid
round 15's clip08b->clip10 segment with this fix alongside the three new
boundaries, so the whole tail of the episode (clip08b onward) was rebuilt
in this round. Verified on every segment before final assembly: video vs.
audio stream duration now agree within 7-16ms everywhere (sub-frame,
matches the pure-hard-cut baseline's own normal tolerance) instead of
hundreds of milliseconds off.

**Rebuilt the full master**: `giza_final_cut.mp4` reassembled from the
unchanged clip01-clip08a segment (reused directly, re-verified) + a
corrected clip08b->clip10 dissolve segment + the new 3-dissolve
clip11-through-outro segment. Frame-count sanity exact: 3090 frames =
128.750s x 24fps, no truncation. Runtime 129.21s -> 128.75s (four dissolve
overlaps now: 0.18+0.18+0.12+0.18=0.66s, against round 15's single 0.18s).
Verified all three new boundaries directly in the assembled master (not
isolated previews): clean blends, zero caption-text ghosting, dialogue
lands on the right frames. `captions_data.mjs`'s TRANSITIONS-array comment
updated to describe reality (10 of 14 boundaries still true hard cuts per
§16; 4 are one-off dissolve exceptions, not a change to the array itself
or to `build_final_cut.mjs`, which still defaults to pure hard cuts — same
"needs manual reapplication if the pipeline is ever rebuilt" caveat as
round 15, now covering all four). Prior versions preserved, nothing
deleted: `giza_final_cut_v2_hadaudiosync_bug.mp4` (+ `_compressed`) is
round 15's output with the audio-drift bug, kept for reference rather than
silently overwritten; `giza_final_cut_hardcuts_only_pretransition.mp4`
(round 14's pure-hard-cut baseline) still on disk too.

## STATUS: delivered — all 4 planned dissolves live (08b→10, 11→12a, 12a→12b, 12b→12c), audio/video sync bug from round 15 fixed in the same pass

## Round 17 — word-by-word caption/lip-sync check on clip06_empathy (2026-08-27)

Owner asked for a rigorous check: every word of clip06_empathy's captions
against her actual lip movement. Two independent passes, not just one:

**Pass 1 — Gemini eyes `captions` mode** against a generated intended
`.srt`, on the currently-burned `clip06_empathy_final.mp4`. 1 candidate
finding (severity 2, a prop/hieroglyph-styling note, unrelated to captions),
0 confirmed. Summary: captions align accurately with speech and timing.
Consistent with the standing rule that unverified low-severity findings are
hints — noted, not treated as proof the captions are correct on its own.

**Pass 2 — independent re-transcription**, `faster-whisper` on `medium.en`
(the original round-10 chunk pass used `small.en` for this clip) against
the clip's actual rendered audio, word-level timestamps. All 13 words
transcribe exactly as scripted — "The next course covers it forever. Then
why paint it? We saw it." — 0.82-1.00 confidence throughout, no content
error. Compared word-for-word against the currently-burned caption times:
5 of 7 chunks were off by 1-2 frames (normal cross-model measurement
noise, not acted on). Two were real: **"THEN WHY" was appearing 0.08s
(~2 frames) before the new measurement's word-onset, and "PAINT IT?" was
disappearing 0.20s (~5 frames) before "it?" actually finishes** — the
caption going dark while she's still visibly mid-word.

**Also frame-checked directly** (not just trusting either machine pass):
pulled raw, caption-free frames at each of the three lines' active windows
to confirm the *right* speaker's mouth is open/articulating — Djedi
visibly speaking during his two lines (~t=3.4, ~t=6.7), her visible
articulation during the middle line. No speaker-mismatch, no case of a
caption sitting over a closed mouth. The exact sub-frame boundary itself
is genuinely hard to read by eye at this shot's profile camera angle,
which is exactly why the two corrected numbers come from the medium.en
re-measurement rather than from eyeballing frames — same basis every other
clip's caption timing in this file was originally built on.

**Fixed directly** (caption timing correction, not a regeneration — same
QC-rule carve-out used for every conform-level fix this project): retimed
all 7 of clip06_empathy's chunks to the medium.en measurement in
`captions_data.mjs`, full reasoning in the dated comment there. Reran
`qc_pass.mjs` + `apply_prelap.mjs` (all 14 clips — only clip06 actually
changed, rest byte-identical in content). Rebuilt the master from a fresh
clip01-clip08a hard-cut segment (only piece touched by this fix) reattached
to the round-16 clip08b-onward tail, reused directly since the dissolve
work there is untouched by this fix. Frame-count sanity exact: 3090 frames,
128.750s, unchanged from round 16 (a timing-only fix inside one clip
doesn't change any clip's duration). Verified both corrected boundaries
directly in the rebuilt master: "THEN WHY" now appears right at its new
mark, "PAINT IT?" now holds through its extended window and clears cleanly
after. Prior version preserved as `giza_final_cut_v3_preclip06fix.mp4`
(+ `_compressed`), not overwritten.

## STATUS: delivered — clip06_empathy caption timing corrected on independent re-measurement, rest of the episode unchanged

## Round 18 — full-episode caption audit: real bugs found, round-17's scope was too narrow (2026-08-27)

Owner reported round 17 didn't fix it: captions still wrong elsewhere in the
episode — some stretches with no captions at all during real dialogue, some
showing text that doesn't match the delivery. Correct call. Round 17 checked
one clip; the problem was episode-wide. Full re-audit this round, two
findings, both real, both fixed.

**Finding 1 — six clips had genuinely wrong caption timing**, found by
transcribing every clip's actual audio independently (medium.en) and
checking word-level coverage against the currently-burned captions, then
cross-referencing anything suspicious against `captions_data_lines_backup.mjs`
— the pre-round-10 line-level data, itself built from real silencedetect and,
for the hardest cases, frame-by-frame verification. That backup turned out to
be the right ground truth for most of what was wrong: the round-10
chunk-conversion's own whisper pass mis-timed several clips, and its 89-100%
"match" self-check only verified *word text*, never cross-checked *timing*
against the already-verified line data sitting right next to it in the repo.
Root cause identified, not just papered over.

Worst case: **clip03_food** — "FOR BREAKFAST?" (her line) was showing
2.76-3.58s, *inside* the Clerk's "Beer is safer than the river." turn
(2.541-4.425s per the verified backup) — captions overlapping the wrong
speaker, and the corrected gap where she actually says it (1.4-2.541s) was
going completely uncaptioned. This is the exact clip round F already flagged
as impossible to place by audio alone (no silence gap anywhere in
2.541-7.881s to anchor on) — a fresh whisper pass hit the identical wall
(matched "beer" to the wrong of two detected instances). **clip10_respect**
was missing the first ~1.3s of an already-verified continuous line (captions
started at 4.72 vs. the verified 3.397 start) — checked this one extra
carefully since a sparse visual sample looked like she was just smiling, not
talking, but real silencedetect settled it: a genuine 0.36s pause ends at
3.397, then 1.7s of unbroken sound — the acoustic signature of speech
starting right there, matching the backup's number almost to the
millisecond. **clip04_jobjoin** had caption-free gaps of up to 1.94s during
a line round 3 specifically frame-verified as continuous speech with no real
pause anywhere. **clip08a_prostrate**'s closing pause (the "on Earth...
...through someone's armpit" comedic beat) had been swallowed to a zero-gap
cut. **clip11_mirror** re-introduced almost the exact bug round F already
fixed once (a word timed 1.4s away from the rest of its own line). **clip07_
setpiece** had merged two words across a documented real breathing gap.

Fix, applied per-clip based on how reliable fresh audio alignment actually
was: clip07/08a's non-ambiguous portions used a fresh medium.en pass directly;
clip03/04/10/11 (and 08a's one ambiguous line) used word-count-proportional
splitting *inside* the already-verified backup line windows instead — same
fallback this project has used before (clip09a_stone, round 8) for exactly
this situation: precise audio alignment isn't trustworthy, but the line/
speaker boundaries are, so split proportionally within them rather than trust
a shaky new alignment. Two clips checked with **no fix needed** despite
initially looking off: clip02_costume's backup line data (2.150s start) was
itself wrong — segment-level whisper plus the current captions both agree
the line starts at 0.00s; clip05_irony's current timing matched a clean
re-transcription almost exactly. Not every discrepancy from the backup meant
the backup was right — checked each one rather than applying it as a blanket
rule.

**Finding 2 — a real regression, independent of any timing question: the
clip08b/clip10 dissolve segment (built round 15, rebuilt round 16) never had
captions burned onto it at all.** Building that segment switched to
loudnorm+fade-only "clean" source files so captions could be burned *after*
compositing (the technique that unblocked clip11->clip12a in round 16) — but
unlike the round-16 segment, this one's ffmpeg command never actually
included the `ass=` burn step. Verified directly: dense frame sampling across
clip08b's and clip10's entire spoken dialogue in the delivered round-16/17
master showed zero caption text anywhere, at any timestamp checked. Every
caption for both clips — 10 chunks on clip08b, 4 on clip10 — had been
missing from the delivered video since round 15, through rounds 16 and 17,
without being caught: verification each round checked the dissolve
transition itself and the lighting, never re-swept the whole clip for caption
presence. That gap is what let this ship twice. Root cause: no `ass=` filter
in that segment's `filter_complex`, plain and avoidable.

Fixed by rebuilding the clip08b+clip10 dissolve segment with a merged,
offset-corrected `.ass` (clip08b unchanged, clip10 at its corrected timing)
burned onto the composited crossfade output — same approach round 16 already
used correctly for the other segment, just actually applied here this time.

**Verification this round was deliberately more thorough than "check the
transition."** Densely sampled the caption-text band (the fixed screen
region the word-chunk style always occupies) at 1fps across the *entire*
128.7s master and visually confirmed real caption text appears at the right
moments in every one of the 14 clips, not just spot-checked near cut points
— specifically built to catch exactly the class of bug (a whole clip's
captions silently absent) that slipped through round 16/17's narrower
checks. Frame-count sanity exact: 3089 frames = 128.708s x 24fps. Runtime
unchanged in substance (128.75s -> 128.71s, a rounding artifact of
re-encoding, not a content change — no clip's duration changed, only caption
timing and the fixed caption-burn step). Audio/video sync re-verified on
every rebuilt segment: 6-97ms throughout, consistent with this project's
established non-dissolve baseline, no new drift introduced.

Prior version preserved as `giza_final_cut_v4_missing_captions_bug.mp4`
(+ `_compressed`) rather than silently overwritten — the actual bug, kept
on record rather than erased.

## STATUS: delivered — 6 clips retimed against verified ground truth, clip08b/clip10's missing captions (a real round-15 regression, shipped 2 rounds undetected) fixed, whole episode densely re-verified for caption presence

## Round 19 — remove clip05_irony entirely (2026-08-27)

Owner request (clear, unambiguous — located precisely by the "you are all
sighted"/"you're all cited" homophone from round 18's own transcription
work): cut the clip that comes right after clip04_jobjoin's "You're all
cited." line — that's `clip05_irony`, the scribe/tally-wall scene ("Absent
— brewing day... I found the aliens — they're accountants."). Direct
instruction, no clarification needed, not a QC action.

Removed the entry from `CLIPS` in `captions_data.mjs`, comment left in its
place per the standing convention (round 13's precedent) — explains the
removal, points to this log entry, notes nothing is deleted on disk
(`assets/clip05_irony.mp4` and its `qc/` derivatives untouched, full entry
recoverable from git history). `clip04_jobjoin` now runs straight into
`clip06_empathy`; `apply_prelap.mjs` picked up the new adjacency
automatically (array-order-driven, same as every prior clip removal this
project).

Rebuilt only what changed: `qc_pass`/`apply_prelap` for all 13 remaining
clips, then a fresh clip01-clip08a hard-cut segment (7 clips now, was 8) —
the clip08b-onward tail (both dissolve clusters) is completely unaffected
by a removal earlier in the episode, so reused directly from the round-18
master rather than rebuilt from scratch. Frame-count sanity exact: 2872
frames = 119.667s x 24fps (129.208 - clip05's 9.042s, matches). Frame-
checked the new clip04->clip06 hard cut directly: clean, no artifact,
"CITED." holds through to the cut, clip06 starts clean on the other side.

**Given round 18's miss, re-ran the full dense caption-presence sweep on
this rebuild too** rather than assuming the untouched tail carried over
correctly — 1fps sampling of the caption band across the entire new
119.67s runtime, confirmed real text at the right moments in all 13
remaining clips, including specifically the clip04->clip06 join and the
reused clip08b/clip10/clip11/12a/12b/12c tail. Nothing regressed. Prior
version (with clip05_irony still in) preserved as
`giza_final_cut_v5_with_clip05.mp4` (+ `_compressed`).

## STATUS: delivered — clip05_irony removed, episode now 119.67s / 13 clips, dense caption-presence re-verified after the cut

## Round 20 — Instagram thumbnail (POV hook + Hazel + pyramids) + 4K delivery upscales (2026-08-27)

Built the thumbnail from two existing frame sources rather than a fresh PAI
generation: `clip01_vista` (Hazel POV close-up, pyramid+river background) and
`clip08b` (the royal-procession wide, Hemiunu + gilded litter + attendants
against the pyramid). Sampled both at 0.5–1s steps, picked one frame from
each via contact sheet, composited Hazel's close-up over the clip08b wide so
the finished frame reads as a single POV shot (Hazel in foreground, the
royal procession + pyramid behind her) — matches the "POV hook + Hazel +
pyramids" brief. Base composite: 720x1280.

**Thumbnail 4K upscale** — Higgsfield `upscale_image` (bytedance backend,
resolution=4k). Preflighted cost first (`get_cost:true` → 2 credits), then
submitted for real.
- media_id (source): `5e1f5936-dd0c-4212-8ffc-bd2d36b6c907`
- job id: `95e5deee-c889-4b2c-9cd1-32205994ad1e`
- result: `https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_110115_95e5deee-c889-4b2c-9cd1-32205994ad1e.png`
  (2304x4096, saved locally as `thumb_upscaled_4k.png`) — sent to owner.

**Final-video 4K upscale** — `giza_final_cut.mp4` (current post-round-19
master: 720x1280, 24fps, 2872f, 119.671s) run through PAI's raw upscale
passthrough (`pai_upscale_client.js`: create→accept→upload→complete→poll),
same bypass-the-canvas-node-id precedent as this episode's clip generation.
Backend is Topaz Proteus (`filters:[{model:"prob-4"}]` — same engine
documented in `pai-pro/docs/api_service.md`'s Topaz BYOK section). Wrote
`pai-pro/projects/giza/upscale_final.mjs` for this (estimate-only unless
`--commit` is passed — checked the cost before spending).
- output target: 2160x3840
- requestId: `01a042e4-ce31-719f-b1bb-1ba8151bb284`, taskId: `fdf6ea99-5d49-49cb-b292-fd4e61151d81`
- actual cost: $4.60, wall time 804.5s (~13.4min — longer than the 299-310s
  estimate, PAI's estimate is evidently optimistic for a 2-minute-source 4K
  job; not a problem, just noting for next time)
- output: `giza_final_cut_4k.mp4` — verified 2160x3840, 24fps, 2872 frames
  (exact match to source, no dropped/duplicated frames), 119.688s, HEVC,
  466.8MB
- delivery copy: same bitrate recipe as `build_final_cut.mjs`'s existing
  `giza_final_cut_compressed.mp4` convention (libx264, 1300k/1400k/2800k,
  aac 96k) applied to the 4K master → `giza_final_cut_4k_compressed.mp4`,
  20.3MB (well under the 30MB chat limit) — sent to owner.

Neither upscale changes any content — resolution/sharpness only. No owner
regeneration-approval gate applies (that rule covers clip regeneration; this
is delivery finishing on an already-approved cut and an already-in-progress
thumbnail task).

## STATUS: delivered — thumbnail built and upscaled to 4K, final-video upscaled to 4K (2160x3840), both sent to owner

## Round 21 — thumbnail v2: real visual hook + the locked hook-text banner (2026-08-27)

Owner rejected v1 (too plain — Hazel selfie over a calm royal-procession
background, no text). Root cause: v1 never carried the hook line the owner
had already locked in the same session (`"POV: They Leveled the Pyramid
Using Only the Stars"`, given verbatim earlier and confirmed as final,
per-`hazel-out-of-time`-skill workflow) — it was built before that line
existed and nothing then went back to add it. Rebuilt against the skill's
§7 cover spec instead of re-composited guesswork:

- **Visual hook** — swapped the background entirely. Sampled `clip07_setpiece`
  (the rope-haul/scaffolding set-piece — a massive stone under active
  construction, workers straining, real danger/effort) instead of the static
  procession; picked the frame where Hazel is mid-reaction in the middle of
  the pull. This is a single native frame (not a composite of two clips like
  v1) — matches spec's "modern-feeling Hazel inside an epic era scene"
  juxtaposition test far better, and Hazel now sits at ~35-40% of frame per
  spec (v1's close-up ran well over that).
- **Text hook** — white top banner, black bold (Liberation Sans Bold),
  2 lines: "POV: They Leveled the Pyramid" / "Using Only the Stars" — the
  owner's exact locked wording, 9 words, unchanged (this line is final, not
  mine to re-optimize). Built with ffmpeg drawbox+drawtext (textfile= inputs,
  avoids drawtext's `:`-escaping trap) rather than regenerating the image
  from a prompt, since text rendering in diffusion output is unreliable and
  this line is locked verbatim.
- **Year stamp** — "2560 BC", amber/darkgoldenrod, top-right corner, per
  spec's amber-for-past rule.
- Self-checked against the skill's cover checklist before shipping: visual
  hook ✓, text hook adds a stake rather than describing the image ✓, year
  stamp + color rule ✓, expression (urgent/reacting) distinct from the
  clip01/clip08b expressions already used on other covers this episode ✓,
  bottom corners clear ✓, legibility verified by downscaling to 150px wide
  before upscaling — text still fully readable at that size.
- Base composite 720x1280 → Higgsfield `upscale_image` 4k (2160x3840,
  media_id `c0befb09-4aee-4407-a5a7-8941a5b98e1d`, job
  `72dcb0a2-4e89-422e-b91a-2ce929cc0dd6`) — sent to owner for approval.

## STATUS: delivered — thumbnail v2 (visual hook + locked hook-text banner + year stamp) sent to owner for approval
