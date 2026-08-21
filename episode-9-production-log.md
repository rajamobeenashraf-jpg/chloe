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

## STATUS: BLOCKED on PAI Pro balance
Everything else is done and verified: the corrected clip 1 prompt, the
dead-air trims, and the J-cut audio bridging are all built and tested. The
only remaining step is regenerating clip 1 at proper duration (10s+) once
funded, dropping it into the same pipeline (`qc_pass.mjs` →
`apply_prelap.mjs` → `build_final_cut.mjs`, all already updated to handle
it), and re-running Gemini QC + virality_predictor on the corrected clip 1
to close the loop with the same measurement that caught the original
problem. **Owner action needed: top up PAI Pro balance.**
