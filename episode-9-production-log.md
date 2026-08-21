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

## Gemini eyes QC — BLOCKED, owner action needed
Ran `qc` mode on the assembled cut per CLAUDE.md's owner QC rule (edit-stage
only). All three models in the fallback ladder (gemini-3.7-flash →
gemini-3.6-flash → gemini-flash-latest) failed with **HTTP 429
RESOURCE_EXHAUSTED**: `generativelanguage.googleapis.com/generate_content_free_tier_requests`
— the `GEMINI_API_KEY` in this environment is on the **free tier** (20
requests/day limit), already exhausted. This is not a prompt or code issue —
retrying will not help until the daily quota resets, and a paid-tier key (or
waiting for reset) is the real fix. Did NOT attempt the `captions` mode pass
for the same reason. **Interim mitigation**: I manually frame-checked two cut
points and one identity/realism spot-check (see below) in place of the
automated sweep, but this is not a substitute for the full two-pass QC
(sweep + verify) the owner's process calls for — recommend re-running
`gemini_eyes.py qc` and `captions --srt giza_episode9.srt` once quota allows,
before this episode is considered QC-complete.

**Manual spot-check finding (unverified by Gemini, flagging for owner
judgment):** frames pulled from clips 1, 8, and 9 read more glossy/glam
(heavy defined lash/liner, glossy contoured skin) than the CHARACTER_LOCK
§13 "matte, not glossy or dewy... raw historical-documentary... NOT a
fashion/beauty editorial feel" bar mandates, despite the matte/gritty clause
being present verbatim in every prompt. This may be a real drift worth a
targeted regeneration on the affected clips — owner's call, per the QC rule
that only CONFIRMED findings (which this isn't, absent the Gemini verify
pass) get auto-fixed.

## Higgsfield virality_predictor — NOT YET RUN
Per CLAUDE.md, this runs pre-publish, after QC is resolved. Deferred until
the Gemini QC blocker above is cleared and any resulting fixes are in.
