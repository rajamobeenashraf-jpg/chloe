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

## Gate 1 — RESOLVED, owner accepted (2026-08-21)
Owner reviewed the Gemini findings above and said "Accepted continue to the clip generation." Proceeding on the round-2 stills as the practical ceiling for now.

## Environment fix this session: ffmpeg install
`ffmpeg`/`ffprobe` were not on PATH in this container. `apt-get install ffmpeg` hit stale-mirror 404s on `libva2`/`libcaca0` at their old point-release (`...ubuntu0.1`); a plain `apt-get update` + retry resolved to the current point-release (`...ubuntu0.2`) and installed cleanly. Needed for the assembly/captions stage (§16 pipeline) same as prior episodes.

## Clip prompts written (this session) — see `episode-5-clip-prompts.md`
All 10 clips scripted with the pre-generation self-check run per clip. Three clips' durations extended beyond the script table (word-count-vs-realistic-speech-pace math): clip1 10s→15s, clip4 8s→10s, clip6 8s→10s — documented rationale in that file, no dialogue cut.

## Clip generation in progress
Reference strategy: the same 5 CHARACTER_LOCK v4 master image URLs used for the approved stills (uploaded once via `video-generation-assets`, asset IDs reused across all 10 clips — avoids re-uploading identical refs 10 times). Wardrobe/Tank consistency carried by detailed text blocks per clip (progressively muddier/wetter/ash-dusted through the day, matching the story).

- **Clip 1 generated, self-QC'd, caught and fixed a real accuracy bug**: the first version's unnamed "herds of distant dinosaurs" rendered as generic long-necked sauropod silhouettes — paleontologically wrong for Hell Creek (no sauropods; the real dominant herd herbivore is Edmontosaurus, a duck-billed hadrosaur). This is exactly the anachronism-spotting failure mode the craft study (§2) flags as the #1 comment-driver risk, so fixed it rather than shipping it: named Edmontosaurus explicitly (and excluded sauropods by name) in every clip prompt with background herd animals (clips 1, 7). Regenerated as `clip1_vista_v2.mp4` — improved (hazier, more ambiguous silhouette) but not 100% resolved at the pixel level from a very hazy distant shot; flagging honestly rather than claiming a clean fix. Clip 5's T. rex is correct as written.
- Clips 2–10 running now via `gen_clips_2to10.mjs` (background job).

## All 10 clips generated + self-QC'd (this session)
Every clip frame-sampled and checked against identity/realism/continuity/standing-rule compliance before acceptance. Two real defects caught and fixed:
- **Clip 3 split-screen bug**: the model rendered a persistent two-panel composition (her face top, Tank bottom) for the first ~2s — a hard violation of the single-continuous-take rule. Fixed by adding an explicit anti-split-screen clause to the shared `TAKE` prompt block (now applies to all clips) and regenerating as `clip3_tankrescue_v2.mp4`. Clean single-frame result confirmed.
- **Clip 7 background-herd anachronism**: same root issue as the clip1 finding below, but far more severe here — clear, well-lit, unmistakable sauropod silhouettes in the daylight background. Two escalating prompt-engineering attempts (explicit species naming, then detailed hadrosaur anatomy correction) both **failed and the second was worse**, not better — confirms this is a strong, text-resistant model bias, not a wording problem. Resolved by removing the background herd from the shot entirely (`clip7_pivot_v3.mp4`) rather than continuing to gamble on prompt iteration — Tank alone now carries the "every animal reacts" beat.
- **Clip 1 background-herd**: same anachronism (sauropod-shaped herd silhouettes instead of accurate Edmontosaurus), but hazier/smaller/more ambiguous at that distance — judged an acceptable residual risk rather than requiring a third regeneration round, unlike clip 7's clearer instance.
- Every other clip (2, 4, 5, 6, 8, 9, 10) passed self-QC clean on the first generation: identity/wardrobe/Tank consistency held, staging matched the script (T. rex "barely seen" per the danger grammar, Tank's beak-lunge interrupt timing, the shaking-hands beat, the ash-fall outro).
- Final clip set: `clip1_vista_v2`, `clip2_mudgear`, `clip3_tankrescue_v2`, `clip4_foodreview`, `clip5_rexsighting`, `clip6_walkingaside`, `clip7_pivot_v3`, `clip8_skyturn`, `clip9_shelter`, `clip10_outro`.

## Captions + assembly (this session)
- **Gemini eyes was needed for accurate caption timing and hit a real blocker**: free-tier daily quota exhausted (`RESOURCE_EXHAUSTED` across the entire model ladder — `gemini-3.7-flash`/`gemini-3.6-flash`/`gemini-flash-latest`) partway through the edit stage. Flagged to the owner immediately per the standing rule in `research-methodology.md` §5 rather than silently working around it or waiting it out. **Fix: enable billing on the same `GEMINI_API_KEY` at aistudio.google.com (cents-level cost), or the shared daily quota resets in ~24h.**
- Tried local Whisper ASR as a fallback — installed the package, but the model-weights host is unreachable through this environment's proxy (`403 Forbidden`, same class of block a prior episode already documented for this exact tool).
- **Fell back to the manual method** (real `ffmpeg silencedetect` + direct mouth-frame visual verification, the same approach used before Gemini was wired into this project): the naive "largest silence gaps = sentence breaks" algorithm produced physically impossible results on several clips (some over 100 words/sec) because these clips are directed at a much brisker, more continuous pace than prior episodes — confirmed by dense frame-grid inspection, not assumed. Real anchors (a chew/swallow, a silent trembling-hand beat, Tank's beak-lunge interrupt) were used directly where visible; proportional word-count splitting was used only within confirmed real-speech windows, never across a whole clip blind. Full methodology documented in `captions_data.mjs`'s header comment.
- QC pass (captions burn-in, loudnorm, 0.08s audio edge fades) and final assembly (all 10 clips, true hard cuts, no title card since Ep5 is fully linear) both ran clean. **Frame-count sanity check passed** (2675 frames / 24fps = 111.458s, matches probed duration exactly — no silent truncation).
- **Final runtime: 111.46s** (script estimated ~102s; grew via the three duration extensions documented in `episode-5-clip-prompts.md`) — well within the 90–200s Shorts spec.
- Files: `pai-pro/projects/dino/assets/dino_final_cut.mp4` (master, CRF16, ~80MB) / `dino_final_cut_compressed.mp4` (delivery copy, ~1.5Mbps, ~22MB).
- Spot-checked one hard-cut transition (clip1→clip2) directly on the assembled master: clean, ghost-free, caption correctly positioned clear of the action.

## Virality predictor (this session)
`virality_predictor` caps input at 16s — it evaluates a hook, not a full multi-minute Short — so it was run on the QC'd (captions burnt in) clip 1, the episode's opening/hook. Result: **hook_score 28/100, overall_score 48, viral_potential 54, brain_engagement 37**. The frame-by-frame attention curve dips through the middle of the clip (t=8-11s, the "worst day in the history of life on Earth" line) and only spikes sharply at the very last second (t=14-15s, peak 0.543). Read plainly: the opening vista+monologue may not be grabbing attention as hard as the script intends in its first 10 seconds — the real payoff lands right at the clip's end rather than building steadily. Flagging this honestly rather than only reporting the summary numbers; it's the owner's and/or a re-cut's call whether this warrants tightening clip 1's pacing (e.g., leading harder with the doom-clock number instead of the "whole world right now" scene-setting) before publish. Dashboard: https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260821_015231_b86fcd6c-46a2-462e-a865-195dcd8fa58c.html

## Outstanding before final owner approval
- **Full Gemini "qc" sweep on the clip set + assembled cut + caption cross-check is deferred** (quota blocked) — my own manual frame-by-frame review during generation is thorough but is not a substitute for the dedicated tool's identity/anatomy/continuity pass. Recommend re-running once quota/billing allows.
- **Hook strength (28/100)** flagged above — worth a look before publish, independent of the Gemini defect-QC gap.
- Residual clip1 background-herd anachronism risk (hazy, judged acceptable — see above) — could be revisited in the same pass if the owner wants zero risk here.

## Delivered to owner
Compressed final cut + these findings sent for the clip-by-clip/stitched-cut review gate, along with the pinned-comment text and engagement question from `episodes-5-9-scripts.md`.
