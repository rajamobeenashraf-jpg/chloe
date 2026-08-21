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

**Sent v2 set to the owner for gate-1 approval; owner asked for independent Gemini verification against the documented realism law rather than my own eyeballing — see below.**

## Gate 1 — independent Gemini verification (owner-requested, this session)
Ran `tools/gemini-eyes/gemini_eyes.py ask` on each still with a prompt that quotes CHARACTER_LOCK.md's realism bar, frozen identity string, and matte/gritty clause **verbatim** and asks for a per-rule PASS/FAIL verdict — a genuinely adversarial check, not a leading question.

**Result: all 3 round-2 stills FAIL Rule 1 (realism bar) and Rule 3 (matte/gritty clause) under independent Gemini check** — confirms my own read was, if anything, too generous. Gemini specifically flagged visible eyeliner/mascara/styled eye makeup, cheekbone/nose highlighter sheen, and soft studio-beauty lighting on all three, despite the prompt's explicit matte clause.

**Iteration attempts (this session, after the owner's ask):**
- **v3 probe** (`hazel_ep5_costume_front_v3_probe.png`): rewrote the matte clause to be far more aggressive — explicit "NOT a beauty photo," itemized zero-cosmetics list (no eyeliner/mascara/eyeshadow/contour/highlighter), smartphone-snapshot framing, sweat-not-highlighter sheen, flat color rendering. **Still FAILED all 3 rules** under the same Gemini check — mascara/eyeliner/soft sheen persisted.
- **v4 probe** (`hazel_ep5_costume_front_v4_probe.png`): tried dropping the 3 movie-frame refs and generating from only the 2 neutral character-turnaround sheets, on the theory the movie frames' own cinematic styling might be anchoring the glam look. **Did not fix the makeup/gloss issue AND introduced a new failure**: the model reproduced the reference sheets' multi-panel grid layout instead of a single candid scene — the exact "chain off generated-output structure" drift `CHARACTER_LOCK.md`'s reference-hierarchy note warns about. Reverted; movie frames stay in the ref set for all future generations here.

**Read on root cause:** this looks like a genuine bias in the underlying model (image-edit-pro routes to gpt-image-2 per `creative-direction.md` §16) toward "attractive young woman = styled glam" for this identity, that pure prompt-text strengthening across 3 rounds has not overcome. Not something I'll keep burning generation cycles on unilaterally — flagging to the owner with full evidence for a call on how to proceed (accept current best as the practical ceiling / try a different route or model / add post-process grain-desaturation at the assembly stage instead of prompt-only fixes). This may be a systemic issue affecting other episodes' stills too, since they were approved without this rigor of adversarial check.

## Next
Once gate 1 is approved: write and self-check all 10 clip prompts (creative-direction.md §6–§16 checklist), generate via PAI video pipeline, assembly/captions per the salem tooling pattern (adapted — no `[Speaker]` tags needed, Ep5 has no human speech), edit-stage Gemini QC, virality predictor, deliver.
