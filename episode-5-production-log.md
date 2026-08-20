# Episode 5 Production Log — "The Day the Dinosaurs Died"
**Working branch:** `claude/episode-5-production-61grcx` · **PAI project id:** `dino` (`/home/user/pai-pro/projects/dino/assets/`)
**Source of truth for the script/beats:** `episodes-5-9-scripts.md` § Episode 5 (10 clips, ~102s, solo carry with Tank the juvenile Triceratops, no human speech).

## Setup (this session)
- Created `pai-pro/projects/dino/assets/`, set `.active_project=dino`.
- Verified PAI Pro auth live (`api.pai-pro.utopaistudios.com` returns a routing-level 400 on a bogus model id with a valid key — confirms the key itself is good).
- Verified `GEMINI_API_KEY` present for the edit-stage QC tool.
- **CloudFront CDN reachable this session** (`d2ol7oe51mr4n9.cloudfront.net` returned 200 on a HEAD request) — earlier handoff notes flagged this host as blocked in a prior sandbox; that limitation does not currently apply here.

## Engine fact discovered this session (adds to creative-direction.md §16's list — not yet merged into the shared doc per parallel-chat rules)
`image-edit-pro` was observed returning a **third** response shape beyond the two `creative-direction.md` §16 already documents: `{ data: [{ b64_json: "..." }] }` (OpenAI Images-API-style passthrough, raw base64, no `outcome.media_urls` or `choices[]` wrapper at all). `pai_image_pro_client.js`'s `extractMediaUrl()` does not handle this shape and silently returns "200 with no media URL". Worked around locally in this episode's generation script (`gen_costume_stills.mjs`, kept in this session's scratchpad, not committed) rather than patching the shared engine mid-parallel-production — flagging here so the merge pass can fix `extractMediaUrl()` centrally. Parser must handle all three: `outcome.media_urls[0].url`, `choices[0].message.images[0].image_url.url` (data URI), and `data[0].b64_json` (raw base64).

## Gate 1 — character-in-costume stills (awaiting owner approval)
Generated via `image-edit-pro` against the v4 "as-filmed" locked reference set (2 character sheets + clip9-aftermath + clip5-irony + clip3-costume movie frames), frozen identity string verbatim, matte/gritty clause verbatim, Ep5 wardrobe line (modern rugged field-expedition gear — olive canvas jacket that gets soaked/sacrificed in clip 8, canvas cross-body bag with the bike bell prop, cargo pants, hiking boots, practical low ponytail/braid).

- Round 1 (`hazel_ep5_costume_front/34/action.png`): identity/wardrobe correct, but skin read too glossy/highlighted and eye makeup too styled — the "beauty photography" drift the matte clause exists to prevent (same failure mode noted in `CHARACTER_LOCK.md` usage rule 5 from Episode 2's round 1).
- Round 2 (`hazel_ep5_costume_front_v2/34_v2/action_v2.png`, current): strengthened the matte clause (explicit no-highlighter/no-strobing, no-visible-cosmetics, sweat/dirt over glow, no shallow-DOF bokeh). Improvement on skin finish and dirt/mud detail; a residual winged-eyeliner-look edge persists on the eyes even with the stronger instruction — flagged honestly, not hidden. Judged production-grade: matches the level of polish-vs-instruction-adherence tradeoff already owner-approved on prior episodes using this identical clause, and identity/wardrobe/setting are all correct. Manifest: `pai-pro/projects/dino/assets/costume_stills_manifest.json`.

**Sending v2 set to the owner now for gate-1 approval before any of the 10 clips are generated** (per `NEW_CHAT_HANDOFF.md` §4 parallel-chat approval gates: costume stills → clip-by-clip → stitched cut → QC rounds).

## Next
Once gate 1 is approved: write and self-check all 10 clip prompts (creative-direction.md §6–§16 checklist), generate via PAI video pipeline, assembly/captions per the salem tooling pattern (adapted — no `[Speaker]` tags needed, Ep5 has no human speech), edit-stage Gemini QC, virality predictor, deliver.
