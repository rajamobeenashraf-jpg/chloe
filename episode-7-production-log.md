# Episode 7 — "I Sailed to Troy" — Production Log
**Branch: `claude/episode-7-production-umuze1` · PAI Pro project id: `troy`**

Source of truth for this episode's assignment: `episodes-5-9-scripts.md` (Episode 7 section), all standing rules in `CHARACTER_LOCK.md` (v4) and `creative-direction.md` §1–§16, plus `chloe-craft-study-2026-08-20.md`.

## Setup (2026-08-20)
- `/home/user/pai-pro/projects/troy/assets/` created, `.active_project` set to `troy`.
- PAI_KEY present in `pai-pro/.env`; GEMINI_API_KEY present in environment (for the edit-stage QC tool later).
- No committed raw-generation CLI script existed from prior episodes (the canvas/viewer app needs a browser+tunnel this headless session doesn't have, per `PROJECT_HANDOFF.md` §4's documented workaround). Wrote two new scripts, both under `pai-pro/projects/troy/` and mirrored into this repo at `pai-pro-tooling/troy/` for the record:
  - `gen_image.mjs` — calls PAI `image-edit-pro`/`image-generation-pro` directly with public CDN reference URLs (the CHARACTER_LOCK v4 5-master-ref set by default).
  - `gen_video.mjs` — uploads image/audio/video refs via `video-generation-assets` (CreateAsset → poll Active), then submits `video-generation` and polls to completion.

## Real bug found and fixed: a 4th PAI response shape
`server/pai_image_pro_client.js`'s `extractMediaUrl()` only recognizes three response shapes (`outcome.media_urls`, `output_url`, and the OpenAI chat-completions image shape noted in `creative-direction.md`'s engine facts). On this session, `image-edit-pro` with 5 image refs actually returned the **standard OpenAI Images API shape** — `{ data: [{ b64_json }] }` — a fourth variant not handled by that helper, causing every call to fail with `"200 with no media URL"` even though PAI had generated the image successfully (confirmed via a debug call printing the raw body).

Fixed by **not** using the shared `generateImagePro()` helper in `gen_image.mjs` — it calls `callGenerate()` directly with a locally-owned extractor that handles all four known shapes (documented shapes + chat-completions + `data[].b64_json`), so the fix is scoped to this episode's own tooling rather than editing shared engine code. Worth folding into `pai_image_pro_client.js` upstream at the next cross-episode doc/code merge — flagging here rather than editing shared files per the parallel-chat rules.

## Real finding: image-edit-pro drifts hard toward "beauty editorial" without strong negative-prompting
First costume-still attempt (frozen identity string + aesthetic keywords + matte/gritty clause, all verbatim from `CHARACTER_LOCK.md`) still rendered a glossy dewy-skin, full glam-makeup, salon-blown-out-hair, fashion-catalog "one-shoulder linen dress" look — a clear violation of the hard realism bar in `creative-direction.md` §13 and the wardrobe spec (chiton must be pinned at **both** shoulders with plain bronze fibulae, not a fashion cut). Confirmed on two independent generations (portrait + full-body), so this was systemic, not a fluke.

Fix: rewrote the prompt with explicit contrastive framing up front ("documentary photojournalism, NOT fashion photography... if the result looks like a fashion editorial... it is WRONG"), explicit negatives for every failure mode observed (no eyeliner/mascara, no salon-styled hair, no soft bokeh, no one-shoulder cut), and an unambiguous wardrobe description (pinned at BOTH shoulders, rectangle drapes ungathered, not a tailored dress silhouette). Both re-generations passed the realism bar clearly on the next attempt. **Lesson for future prompts in this episode (and worth folding into `creative-direction.md` at the next merge): the matte/gritty clause alone is not always sufficient against this model's fashion-photography prior — pairing it with explicit "if X, it is WRONG" contrastive framing measurably fixed the drift.**

## Gate 1 — costume stills (awaiting owner approval)
- `assets/costume_01_portrait_v2.png` — chest-up, populated camp background with working NPCs.
- `assets/costume_02_fullbody_v2.png` — full-body, two-shoulder-pinned chiton clearly visible, candid mid-action (belt adjustment) pose, populated background.
- Minor note for owner awareness: the full-body shot's waist belt rendered as a leather strap rather than the twisted rope belt described in the script's clip 2 ("One rectangle of wool. Four ways to wear it.") — period-plausible either way; will match whichever the owner prefers when clip 2 itself is generated.
- Sent to owner via chat for sign-off before any of the 12 clips are generated (same gate structure as Episodes 1–4).

## Gate 2 blocker: video-generation eye-makeup drift is not fixable by prompting alone
Gate 1 approved 2026-08-21. Started clip 1 (the vista/thesis open) as a validation run of the video pipeline before batch-generating the other 11. Four consecutive attempts, each with a stronger fix than the last:

1. **v1** (identity block ported from the *original failed* still prompt, before the still fix): heavy glam eye makeup, salon-styled hair, one-shoulder fashion dress. Rejected — same drift as the first Gate 1 still attempt.
2. **v2** (identity block upgraded to the proven Gate-1 still v2 language — no-eyeliner/no-salon-hair negatives, explicit two-shoulder wardrobe spec): wardrobe still drifted to one-shoulder with a decorative buckle; eye makeup still present. Text-only wardrobe description was not reliably respected by video-generation the way it was by image-edit-pro for stills.
3. **v3** (added the actual approved `costume_02_fullbody_v2.png` as a real image reference — uploaded to Higgsfield storage for a public URL since it's a local-only file — alongside the 5 identity refs): **wardrobe drift fully fixed**, clean two-shoulder pinned chiton matching Gate 1 exactly. Eye makeup got *worse*, not better.
4. **v4** (moved a blunt, front-loaded "ABSOLUTELY NO MAKEUP OF ANY KIND" instruction to the very start of the prompt, ahead of every other clause): wardrobe stayed fixed; eye makeup unchanged from v3 — still clearly present (winged liner, mascara) on every sampled frame.

**Conclusion: this reads as a hard prior in the underlying video-generation model** (a strong "attractive woman selfie" bias it applies to faces regardless of instruction), not a prompt-wording problem — unlike the still-image model (`image-edit-pro`), which did respond correctly to the same style of negation. Four attempts with escalating specificity produced zero measurable improvement on the makeup axis specifically, while every other axis (wardrobe, lighting, vista scale, populated background, no-camera-visible) responded normally to prompting.

Per the owner's realism bar (creative-direction.md §13, hard pass/fail — "any doubt, regenerate, don't ship it") and the fact that a text/prompt-only path has now been exhausted rather than assumed, **stopped here rather than batch-generating the remaining 11 clips against a recipe that hasn't cleared the bar.** All 4 attempts kept on disk as `assets/clip1_v1_REJECTED_glamdrift.mp4` / `clip1_v2_REJECTED_glamdrift.mp4` / `clip1_v3_wardrobe_fixed_makeup_bad.mp4` / `clip1_v1.mp4` (current, v4) for reference. Options put to the owner: accept the light-to-moderate eye makeup as an engine limitation, try Higgsfield's video model as the documented fallback engine (creative-direction.md §5), or another approach — owner's call, not decided unilaterally.

## Next steps (after Gate 1 approval)
1. Generate all 12 clips per the `episodes-5-9-scripts.md` Episode 7 table — single continuous takes, durations per beat, daylight/golden-hour only (owner lighting lock — never fully dark), pre-generation self-check every clip (creative-direction.md §7–§15), NPC continuity (Krethon, quartermaster, Trojan boy sentry), italicized `[Speaker]` tags for their lines.
2. Assemble with `pai-pro-tooling/salem/`-derived tooling: true hard cuts, 0.08s audio-only edge fades, loudnorm frame-exact, canonical caption style (`MarginV=320`), mouth-frame cross-check on ambiguous cues.
3. Edit-stage Gemini eyes QC (owner's rule — never during generation): full clip set, assembled cuts, captions mode vs .srt.
4. Higgsfield `virality_predictor` pre-publish; owner's watch-through is the final gate.
5. Manifest of every clip's job ID + URL committed to this branch as clips are generated.
