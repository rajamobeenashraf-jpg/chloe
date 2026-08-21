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

**Owner decision (2026-08-21): accepted the light-to-moderate eye makeup as an engine limitation.** `assets/clip1_v1.mp4` (the v4 attempt) is FINAL for clip 1. The `run_clip.mjs` recipe as of this commit (identity refs + costume image ref + front-loaded no-makeup instruction, even though makeup isn't fully eliminated) is now the standing recipe for clips 2–12 — every other axis it produces (wardrobe, lighting, realism texture, populated backgrounds, no-camera-visible) is clean, so no further changes are being made to the template before continuing.

## Gate 2 progress — clips generated (manifest, job IDs + URLs)
All clips generated with the standing `run_clip.mjs` recipe (v4 identity/wardrobe/realism block + costume image ref, front-loaded no-makeup instruction — eye makeup remains present per the owner-accepted limitation above). ffprobe-verified durations match script targets within rounding.

| Clip | Duration | Task ID | Video URL (PAI-hosted, expires — re-download before it does) | QC |
|---|---|---|---|---|
| 1 | 9.06s | 20d2ae3d-05f8-402a-bf66-533c3ee527bb | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/0b8e945003cffd08ccca651aaa9d9846.mp4 | PASS (v4, owner-accepted) |
| 2 | 8.06s | 88453f06-8ae0-413e-b08b-845a3937d1f9 | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/d5cbe91bd8b4b46e1307134f70268cae.mp4 | PASS |
| 3 | — | 83d9da7f-ecf9-47e0-925b-d9c7cad3726e | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/2df5cfa45b547a6eb2efd0b1e220faf5.mp4 | PASS |
| 4 | 11.05s | dcf25d78-bb6b-43af-a7e2-aac8500de71c | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/009cbd9f502e7bb34a00adbd7437c665.mp4 | PASS — quartermaster/wax-tablet detail nailed |
| 5 | 6.06s | 86b8245c-d5a9-4906-a006-c66bdf245f54 | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/ff12ef4f50096daa9b5cd8e9022c4516.mp4 | PASS — arrow-in-shield causality clean |
| 6 | 12.05s | 78e70603-d876-4b67-8d46-3f3cabae415e | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/0f80ad01b543aa7e9f7775bf3d7c8a93.mp4 | PASS — empathy core, Krethon cord beat |
| 7 | 8.06s | 7c7ebc0e-c06f-41d1-8461-acccfa63c8b3 | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/f7bfa4e15e5d68f439f79aeffd22e387.mp4 | PASS — Myrmidons at respectful distance |
| 8 | 12.05s | f3adfe28-7aad-423d-a809-da056126fb03 | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/a24e7138755b58dc10afe4a09aeac0ef.mp4 | PASS — wall/basket exchange with sentry boy |
| 9 | 8.06s | 764f7a8b-a59f-4dd0-a9cf-090a22504bd3 | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/acecb5c2764d2ba94f81dd253f50843b.mp4 | PASS — dusk lighting clean, fusion-gag plant lands |

## Real finding: modern smartphone rendered in-frame during a chaotic action beat (clip 10, rejected)
First clip 10 attempt (the raid set-piece) rendered a visible modern black smartphone with a lit screen in her hand in every sampled frame — a severe anachronism, plus the wardrobe drifted from the established chiton to an unrelated olive cloak/lace outfit. Neither issue appeared in clips 1-9. Hypothesis: the "gasping a line to the lens mid-carry" direction combined with heavy hand-based physical action (kicking a brazier, hauling hides) pushed the model to literalize "her own phone" as a held object during the chaos, and the raid/action framing pulled wardrobe toward a generic action-extra look under that same pressure.

Fixed two ways: (1) strengthened the shared no-camera clause in `run_clip.mjs`'s `IDENTITY_BLOCK` to explicitly state this is a POV shot with no device to hold at all, hands always free for whatever the action requires — applies to all remaining clips, not just clip 10; (2) added an explicit wardrobe-continuity reminder directly into clip 10's own action text in `clips.json` ("even in this fast, chaotic action beat, she is wearing the EXACT same... chiton"). Rejected file kept at `pai-pro/projects/troy/assets/rejected/clip10_v1_REJECTED_phone_wardrobe.mp4`. **v2 regeneration confirmed both fixes worked**: no phone/device visible anywhere, wardrobe consistent chiton throughout, populated chaos with recognizable Krethon hauling hides beside her. v2 is FINAL for clip 10.

| 10 | 13.07s | fb080927-32ac-4de1-91c3-ae2997b4e19f | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/485b9d3e4e3c882b4bf8c48e51222728.mp4 | PASS (v2) — phone/wardrobe drift fixed |
| 11 | 9.06s | 464baada-5501-4829-bd77-8355857c9275 | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/a07ce261222a26d267278988f0e0c3fc.mp4 | PASS — silent horse-payoff detail lands clean |
| 12 | 10.05s | 2dabc651-6868-4274-a452-60e998208089 | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/6a08525bc4a6909fef1d34d33d932f0a.mp4 | PASS — warm outro, cord exchange with Krethon |

**Gate 2 complete (2026-08-21): all 12 clips generated and QC'd.** One regeneration needed (clip 10, phone/wardrobe drift — see finding above). Proceeding to Gate 3 (assembly with captions).

## Gate 3 — assembly with captions (complete)
Adapted the Salem (Ep2) tooling for Troy per creative-direction.md §16 (`captions_data.mjs`, `qc_pass.mjs`, `build_final_cut.mjs`, all in `pai-pro-tooling/troy/`), simplified since Episode 7 has NO title card (OPENING LAW retires the card convention from Ep5 on) and ALL transitions are true hard cuts — no dissolve-chain logic needed at all.

**Caption timing**: grounded in real `ffmpeg silencedetect` (noise=-30dB, d=0.12) run against each clip's own rendered audio (`detect_silence.sh`), gaps ≥0.3s treated as real sentence/speaker breaks, gaps <0.3s collapsed as breath pauses — same method as prior episodes. **Mandatory mouth-frame cross-check applied to clip 10**: its background fire/chaos noise never dropped below the silence threshold at all (zero markers across 13s), so extracted dense 3fps frames and confirmed by eye — her mouth is open/moving ~7.4-8.7s, right as she's mid-carry hauling the hide beside Krethon, closing exactly as she shifts into helping the wounded man. Full method and per-clip notes (including the honestly-flagged lower-confidence overlapping-dialogue section in clip 9) are documented in `captions_data.mjs`'s header comment.

**Assembly**: single `ffmpeg filter_complex concat` pass (12 clips → 1 file, all hard cuts, no card). Frame-count sanity check (creative-direction.md §16 mandatory verification — Ep4 caught a silent-truncation bug this exact check exists to catch) passed: 2773 frames vs 2772 expected. Runtime 115.54s vs 115.50s expected — matches the script's ~115s target almost exactly.

**Files**: `pai-pro/projects/troy/assets/troy_final_cut.mp4` (master, CRF16) / `troy_final_cut_compressed.mp4` (delivery copy, ~1.5Mbps).

Caption rendering visually spot-checked at several points in the assembled cut — DejaVu Sans Bold, correct MarginV=320 position (clears bottom UI, below chin, separated from center), readable, speaker tags render correctly where present.

## Owner creative review (2026-08-21) — post-cut revision round
Owner watched the assembled cut and flagged real storytelling issues, distinct from the Gemini QC findings below:
1. Clip 9→10 tonal whiplash (horse joke to sudden raid, no bridge) and an unexplained time-scale jump (clip 11's "nine years" to clip 12's "three thousand years") — real, not yet fixed.
2. Clip 12's "In three thousand years..." line measured at 6.4 words/sec (20 words / 3.1s) — confirmed objectively too fast against natural conversational pace (~2.5-3 wps); I had this exact timing data while building captions and didn't flag it at the time — not yet fixed.
3. The "Rule one" callback (clip1 plant → clip5 payoff) didn't land for the owner as a joke — noted, not yet addressed.
4. **Krethon is never named in spoken dialogue anywhere** — only in the caption's bracketed speaker tag, which isn't enough for a major recurring character. Confirmed against the source script (`episodes-5-9-scripts.md` line 86: his name is stage direction only). Not yet fixed.
5. **Achilles (clip 7) was never named on screen at all**, and the beat was a passive pass-by, not an actual interaction — confirmed against the source script (line 87: same stage-direction-only problem). Owner's explicit direction: regenerate clip 7 as a real two-way exchange where Achilles speaks about what mattered most in the war.

**Clip 7 regenerated per owner direction.** New beat: Krethon warns her by name ("That's Achilles. Only if you are tired of being alive.") before she steps forward on her own initiative; she asks him directly what's kept him at Troy nine years; he answers with the Iliad's central fact about him — the choice his mother gave him between a long, forgotten life and a short one everyone would remember forever (Iliad IX, Achilles' own words to the embassy — real Homeric content, citable in the pinned comment same as the rest of the episode's disclosed mythology). Also gave him real visual presence (distinct crested helmet, ornate cuirass vs. the plain-armored Myrmidons around him) so he reads as the war's most important figure, not a generic soldier, addressing the owner's core complaint. Duration extended 8s→13s for the added content per §9 (multi-beat scenes need more room). QC clean: correct duration (13.07s), Achilles visually distinct and staged close enough for a plausible face-to-face exchange, Krethon's warning fires before she acts (causality intact), no anachronisms, wardrobe/realism recipe holds. Sent to owner for review before touching captions/reassembly.

**Owner follow-up questions on the v2 cut, 2026-08-21:** (1) why keep Krethon as an intermediary at all rather than have her approach and address Achilles directly herself; (2) what the "he's shorter than you'd think" line is actually supposed to mean. Answered in chat.

**Owner direction, v3:** remove Krethon entirely, she approaches Achilles directly herself, cut the "shorter than you'd think" line, have him speak about real war strategy/important facts. v3 attempt: Krethon removed, direct approach staged well, dialogue swapped to Agamemnon/Briseis (the Iliad's actual central plot mechanism — his refusal to fight) plus the "short life, remembered forever" choice. **Bug found via silencedetect + frame check**: 72 words packed into 13s rushed the closing emotional line so hard it measured ~1.6s for a 24-word line (14.9 words/sec, physically implausible) — confirmed by frame extraction: Achilles was already small/distant in the background and her mouth was closed/expression neutral-pleasant by the time the line should have been playing, not the "genuinely scared" reaction the beat needs.

**v4 (current):** trimmed to 50 words over 14s (~3.6 wps average, comfortable), dropped the "short life, remembered forever" aside entirely (already used in v2, not essential to the strategy ask), added explicit pacing direction (a beat before he answers, a held silent moment before he leaves, a beat before she turns to the lens) and an explicit instruction that he must still be in frame/nearby when her closing line starts. Re-verified via silencedetect: ~3s of real pause time now appears between beats (vs. none in v3), and the closing line runs ~3.3s for 22 words. Frame-checked: her expression during the closing line is wide-eyed, tense-browed, actively speaking — reads as genuinely shaken, not neutral or smiling. Achilles is still visible walking away in the same shot during her reaction rather than already gone. Sent to owner for review.

## Gate 4 blocked — Gemini eyes free-tier daily quota exhausted (resolved)
Both edit-stage QC calls (full-cut `qc` mode, `captions` mode vs the exported .srt) failed identically: `RESOURCE_EXHAUSTED` / `GenerateRequestsPerDayPerProjectPerModel-FreeTier`, quota value 20, across all three models in the fallback ladder (gemini-3.7-flash, gemini-3.6-flash, gemini-flash-latest). Per `research-methodology.md` §5's owner standing order ("the moment the free allowance blocks work, tell the owner straight away... never silently wait out a quota wall and never skip QC because of one"), reported to the owner immediately rather than retrying blind or proceeding without QC. **Owner enabled billing on the key 2026-08-21; resolved on retry.**

## Gate 4 — edit-stage Gemini eyes QC results
**Full-cut `qc` pass** (`pai-pro-tooling/troy/qc/final_cut/`): score 6.8/10, 4 candidate findings, 2 CONFIRMED:
- 00:50.4 (clip6, the Krethon cord hand-off — the episode's empathy-core beat) — severity 3 anatomy: "fingertips and rope fibers experience slight edge blurring and soft blending artifacts."
- 01:24.6 (clip10, the brazier-kick action) — severity 3 physics: "dress hem and foot clip through the physical side of the brazier bowl" + background fireballs move in linear (not ballistic) trajectories.

Pulled the actual frames at both timestamps and reviewed by eye: neither reads as a real defect at normal viewing — both are transient, sub-second artifacts inherent to fast hand/prop contact and kick motion in current AI video generation, not identity drift, anachronism, or a continuity break. Recommended waiving both rather than regenerating (clip 6 is the episode's key emotional beat and clip10 was already reworked once to fix a worse bug — real risk of losing a hard-won take for a likely-imperceptible gain). **Presented to the owner with visual evidence for the explicit waive-or-regenerate call required by CLAUDE.md's QC rule; owner reviewing before deciding — not yet resolved, no clip touched.**

**Captions cross-check** (`pai-pro-tooling/troy/qc/captions/`): score 6.8/10, 2 candidate findings, 0 reached the severity≥3 verify threshold (both severity 2, unverified). Cross-checked both directly against `captions_data.mjs`'s own source timings rather than treat them as facts (per the project's "unverified findings are hints, not facts" rule):
- Flagged "01:19 caption skips 'Who would DRAG it?'" — false positive: that line has its own cue at local 4.3-5.0s in clip9 (global ~79.6-80.3s); Gemini's sample landed a beat earlier, mid-"A WHAT?".
- Flagged "01:54 caption omits 'Hazel —'" — false positive: "Hazel —" is cued at local 8.967-9.285s in clip12 (global ~114.4-114.7s); Gemini's sample landed in the natural ~0.4s pause immediately before it (a real silencedetect-measured gap, not a bug).

No caption changes needed — both real lines are correctly captioned, just a fraction of a second later than where the sweep happened to sample.

Rejected clip 1 attempts (v1-v3, kept for reference) archived at `pai-pro/projects/troy/assets/rejected/` (not committed to git — generated media stays out of git per CLAUDE.md; this note is the pointer for another session).

## Next steps (after Gate 1 approval)
1. Generate all 12 clips per the `episodes-5-9-scripts.md` Episode 7 table — single continuous takes, durations per beat, daylight/golden-hour only (owner lighting lock — never fully dark), pre-generation self-check every clip (creative-direction.md §7–§15), NPC continuity (Krethon, quartermaster, Trojan boy sentry), italicized `[Speaker]` tags for their lines.
2. Assemble with `pai-pro-tooling/salem/`-derived tooling: true hard cuts, 0.08s audio-only edge fades, loudnorm frame-exact, canonical caption style (`MarginV=320`), mouth-frame cross-check on ambiguous cues.
3. Edit-stage Gemini eyes QC (owner's rule — never during generation): full clip set, assembled cuts, captions mode vs .srt.
4. Higgsfield `virality_predictor` pre-publish; owner's watch-through is the final gate.
5. Manifest of every clip's job ID + URL committed to this branch as clips are generated.
