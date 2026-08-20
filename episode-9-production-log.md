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
| Costume still (Gate 1) | `prompts/costume_still.txt` | `assets/hazel_costume_ep9.png` | (image-edit-pro, sync call, no job id) | generating |

## Approval gates (per NEW_CHAT_HANDOFF.md — same as Episodes 1-4)
1. [ ] Character-in-costume stills — **AWAITING OWNER REVIEW**
2. [ ] Clip-by-clip review (12 clips)
3. [ ] Stitched final cut
4. [ ] QC rounds (Gemini eyes at edit stage + owner watch-through)
