# Episode 4 Production Log — "I Joined the Gold Rush of 1849"
**Chat/branch: `claude/shorts-episode-production-72i231` · Started 2026-08-20 · Owner: Mobeen Ashraf**

Assignment confirmed by owner 2026-08-20: this chat produces **Episode 4 — Gold Rush 1849** (the task template's episode line was blank; no other chat had claimed an episode on any pushed branch at claim time).

## Environment / engine state (fresh container)
- Branch created from `origin/claude/pai-pro-connection-izza4s` per handoff.
- SessionStart hook: PAI Pro cloned to `/home/user/pai-pro`, `.env` written from `$PAI_KEY` env var (owner's recommended one-time setup is active — no key prompt needed), server deps installed.
- Own project dir created: `/home/user/pai-pro/projects/goldrush49/assets/` · `.active_project=goldrush49`.
- API auth verified (task/status probe returns 404-with-auth, not 401).
- **Network is broader than Episode 1's container**: the agent proxy here is non-selective, so CloudFront and general HTTPS are reachable. Episode 1's "only api.pai-pro allowlisted" limitation does not apply in this container.

## BLOCKER (open): v4 master reference images lost with the old container
`CHARACTER_LOCK.md` truncates the five master-ref CloudFront URLs (`d2ol7oe51mr4n9.cloudfront.net/.../<uuid>.png` — middle path segment elided), and the local copies died with Episode 1's container. Recovery attempts, all exhausted:
- Repo grep for full URLs: nothing outside CHARACTER_LOCK.md's truncated rows.
- PAI API has only generate/submit/task-status endpoints — no account generation-history listing to look the files up.
- CDN path guessing against the known UUID (10 common prefixes): all 403.
- Probe pro-tier generation to learn the account's output-URL pattern: this response path returned inline base64 (`choices[0].message.images[0]` data URI), not a `media_urls` CDN URL — pattern not recoverable this way. (~$0.45 spent; also served as an end-to-end pipeline sanity check — engine works.)

**→ Asked owner to paste the five full CloudFront URLs from the Episode 1 chat** (or re-upload the files anywhere fetchable). With URLs in hand: `image-edit-pro` takes them directly as `image` array (PAI fetches server-side), and video-side refs go through `video-generation-assets` CreateAsset(URL). No tunnel needed headless.

## Engine facts confirmed this session (for the merge-back)
- `image-generation-pro` **text-to-image (no refs)** can route to an OpenAI-provider passthrough returning `choices[0].message.images[0].image_url.url` as a base64 data URI — NOT the `outcome.media_urls[0].url` shape the repo client documents for edit calls. Handle both response shapes when parsing.
- `image-edit-pro` refs are **URL-only** at the client boundary (`data:` URIs rejected); PAI fetches refs server-side, so headless works with any public URL.
- Video ref uploads: `CreateAsset {URL}` → poll `GetAsset` → `Active` (per-file 1.8–15.2s for A/V; video refs aggregate ≤15s; audio refs need a visual anchor alongside).
- Video pipeline limits (from `server/cli/_limits.js`): ≤9 image refs, ≤3 audio refs, ≤3 video refs, hard 15.2s/clip.
- cloudflared is NOT installed in this container; if a local-file ref is ever unavoidable, install it or use inline base64 `fileData` (+ explicit `mimeType`) on the standard `image-generation` model only.

## Episode 4 creative plan (locked from approved script)
- 12 clips, ~132s, per `episodes-2-4-scripts.md` — dialogue as written, no character name anywhere.
- **Locked color grade (restate in EVERY clip prompt):** cold overcast Sierra Nevada river-canyon light, green-grey palette, muted desaturated tones, damp air, soft diffuse daylight — deliberately anti-Ep-1 (no warm amber).
- **Wardrobe (clips 4→12):** mud-caked red-brown flannel shirt, canvas work trousers, heavy leather work boots, grey slouch hat, hair loosely tied back — mud to the knees from clip 4 onward.
- **Clips 1–3 wardrobe:** trail/arrival outfit (plain wool travel dress/coat) until the work-kit change beat in clip 4. Cold open (clip 1) is a flash-forward to night — work kit + torchlight.
- **Recurring NPCs (identical description every appearance):** Amos — free Black miner, 40s, broad build, grey-flecked short beard, patched blue wool shirt, leather suspenders, kind weathered face. Li — Chinese miner, 20s, slim, wide-brimmed woven hat, dark tunic, quick precise movements. Both appear clips 5, 7, 9–12 (Li), 5, 7, 11–12 (Amos per script beats).
- Gate order: costume stills → clip-by-clip → stitched cut → QC rounds.

## Ref recovery RESOLVED (2026-08-20) — v5 owner-supplied reference set
Owner pasted 10 reference images directly into chat (front/¾/profile portraits, full-body turnaround sheet, face-detail sheet, one Wild West as-filmed movie frame) with the instruction: **"use this as the character sheets… she should appear as natural, realistic, and human, not some AI and plastic… 100% natural."** These supersede the lost v4 CloudFront copies as the working master set (identity is visually identical to the v4 description).
- Extracted from the session transcript (base64) → `pai-pro/projects/goldrush49/assets/refset/ref_01–10.png`.
- **Committed to the repo at `character-refs/ref_01–10.png`** (owner's chosen hosting route) — PAI fetches refs server-side from the SHA-pinned raw URLs `raw.githubusercontent.com/rajamobeenashraf-jpg/chloe/6f936b1.../character-refs/ref_XX.png`.
- Working master five (every generation): ref_08 turnaround sheet · ref_09 face-detail sheet · ref_10 movie frame · ref_01 front portrait · ref_06 profile.
- Frozen v4 identity string still used VERBATIM (matches this set), plus the §5 naturalism keywords and an explicit anti-AI/anti-plastic clause in every prompt per owner instruction.

## Engine facts learned (this session, for merge-back)
- **PAI request body cap: 512KB** — inline base64 refs are impossible; refs must be public URLs (server-side fetch). This is why Episode 1's fileUri quirk exists.
- `image-edit-pro` routes to `gpt-image-2`: accepts a fixed size list (720x1280, 1440x2560, 2160x3840 are the 9:16 options) BUT this passthrough returns **1024x1024 regardless of requested size**, as a base64 data URI in `choices[0].message.images[0].image_url.url`, cost ~$0.26/still. Stills are identity/costume refs; final 9:16 (owner default) is enforced at the video-pipeline stage.
- cloudflared tunnel + Higgsfield upload both blocked by the sandbox permission classifier; repo-hosted refs are the approved route.

## Gate 1 submitted (2026-08-20)
- `still_workkit_v1.png` — work kit (clips 1, 4–12): mud-caked red-brown flannel, canvas trousers, slouch hat, mud-smeared cheek, rocker cradle + tents + miners + snowmelt river, cold green-grey grade. Alignment: PASS.
- `still_arrival_v1.png` — arrival outfit (clips 2–3): dove-grey wool travel dress, shawl, satchel, ridge over tent-dotted canyon. Alignment: PASS with note — distant tents rendered slightly conical/teepee-like; video prompts will specify "A-frame canvas wall tents" to prevent propagation.
- Both sent to owner in chat. Awaiting approval before any clip generation.


## Gritty/matte pass (owner direction, 2026-08-20)
Owner: "push harder on the grittier/matte-skin direction." Added an on-location condition block to every prompt (identity string untouched, verbatim): fully MATTE skin — no gloss/shine/dewy highlight/makeup look; lip tint worn to matte, wind-chapped; faint sunburn, dirt in pores and knuckle creases, grease at hairline, flyaway frizz, tired eyes, short dirty fingernails; plus "NOT influencer glam — a real tired working woman on a real frontier" appended to the naturalism block. Regenerated both stills:
- `still_workkit_v3_gritty.png` — landed matte/weathered, A-frame tents correct; framing drifted to third-person full-body (better costume read for approval; V-mode selfie grammar unaffected for video).
- `still_arrival_v2_gritty.png` — selfie framing, matte skin, heavy natural freckling. Distant tents again conical (the still prompt lacked the A-frame clause; every VIDEO prompt carries it).
Both sent. The same grit block is now standard in all 12 clip prompts.

## Clip production prep (done while awaiting gate 1)
- Video pipeline contract confirmed (`pai_video_client.js`): POST submit with `content[]` text + `asset://` refs (uploaded via CreateAsset from repo raw URLs), `ratio: "9:16"` (owner default), per-beat `duration`, 720p, `generate_audio: true`, poll task status to terminal, stream MP4.
- All 12 clip prompts drafted in `pai-pro/projects/goldrush49/prompts/clips.mjs` — shared byte-identical blocks (identity verbatim / camera single-take / naturalism+grit / per-clip grade variant day-night-dusk / locked NPC descriptions for Amos + Li / A-frame tent clause). Durations per approved script: 7,9,11,8,12,10,13,12,12,14,13,11 = 132s.
- §10 pre-generation self-check run over all 12: causality order (alarm rung AFTER she sees the jump in her stated sightline; "Wait— WAIT—" fired as she breaks through, before the verdict line), crowd population ≥20 for mob/court beats, embedded-not-sequential drama ("from the first frame..." on every interruption), speech gated by state (chewing muffled in 3, whispers in 6/8, gasping fragments in 11, breathless in 1/10, silence in 7), relationships carried (Li anchors her in 11; pouch meaning chains 7→11→12; clip 10 restages clip 1's exact posture as the payoff).
- Runner ready: `gen_clip.mjs` (asset-id cache, submit/poll/download per clip).


## Clip generation (gate 2, running log)
Gate 1 approved by owner 2026-08-20: GRITTY look locked for both outfits. Grit block baked into all 12 clip prompts; approved gritty stills committed (`episode-4-assets/stills/`) and used as per-clip wardrobe refs alongside the 5 masters (6 image refs/clip). All clips 9:16 720p, PAI Pro video pipeline, generate_audio on. Every clip: chat delivery + repo archive (`episode-4-assets/clips/`) + hosted URL logged here.
| # | file | dur | hosted output_url | alignment |
|---|---|---|---|---|
| 1 | clip01_v1.mp4 | 7.06s | storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/20/36e32c6b38ad945a272e0b6ca5d88703.mp4 | PASS |
| 2 | clip02_v1.mp4 | 9s | .../aa8dfd590d44eb9da8c1934c5df58e8d.mp4 | PASS |
| 3 | clip03_v2.mp4 | 11s | .../15a676d4eb0b3268a6db2e1d1072ead2.mp4 (v1; v2 = local audio fix) | PASS, owner-accepted after fix |
| 4 | clip04_v1.mp4 | 8s | .../701a0240ba7bc4bd7da01e3ae67360f8.mp4 | PASS, owner-accepted |
| 5 | clip05_v1.mp4 | 12s | .../8a91a00038944f5a63253d4d874ef5ab.mp4 | PASS, owner-accepted |
| 6 | clip06_v1.mp4 | 10s | .../8e0e68c1bcc3a1e81082814fd255a26d.mp4 | PASS (chained off clip05 end frame), owner-accepted |
| 7 | clip07_v1.mp4 | 13s | .../4a4a061e0ea206dffb1088e552ac8150.mp4 | PASS, owner-accepted |


### Owner QC round (2026-08-20): clip 3 egg-crack — fixed editorially
Owner: pressing the egg produced an audible crack (reads as a RAW egg) before she eats it. Diagnosis on real audio: isolated 39ms transient at 5.73s, crest 6.4, sitting alone between two detected silences — zero dialogue overlap. Fix: replaced 5.69–5.81s with room tone lifted from the 7.0s quiet stretch, 10ms acrossfades, video stream copied untouched → clip03_v2.mp4. Verified: no residual >3000-peak transient in the 5.5–6.0s window. Lesson for merge-back: foley-scale transients between speech runs are always editorially fixable; check crest factor + silence-run overlap before considering a reshoot.
Owner accepted clips 1–7 ("All accepted"). Clips 8–9 generating.


### Owner QC round 2 (2026-08-20): clips 8 and 11 reshoots
- **Clip 8 v1 → v2 (owner)**: missing realization beat before she switches him to boiled water; sick miner's lips moved as if speaking. v2 reshot: realization staged (his groan → her look river→bucket → still beat → "...it's the water"), sick miner groans only, "bad air" line lip-synced to one older miner. 12s→13s per §9.
- **Clip 8 v2 → v3 (owner)**: cup rendered attached to kettle then separating (object-permanence glitch); boiling-off-the-fire water served directly to drink. v3 reshot with fronted OBJECT LOGIC block (kettle and cup separate objects from frame 1, cup on a stone, kettle on its own hook) + a visible cooling beat (pour → set kettle aside → blow/swirl, steam thins → one small careful sip).
- **Clip 11 v1 → v2 (owner)**: wrist-anchor staging read as her fighting the other person for the bag. v2 restaged: SHE alone hooks the pouch with the shovel; Li braces her shoulders/belt from BEHIND, hands never near shovel/arms/pouch.
- **Clip 11 v2 → v3 (own alignment check)**: v2's rescue mechanics landed but wardrobe drifted to a sleeveless top (flannel missing — continuity break vs clips 9/10/12). v3 reshot with the wardrobe claim fronted ("NEVER sleeveless / tank / corset, both shoulders covered every frame").
- Lesson for merge-back: fronting a violated claim works (per PROJECT_AGENT retry rule); soaked/action scenes pull wardrobe toward skin-baring drift — pre-empt with an explicit "shirt stays ON, shoulders covered" clause in any water/rain beat.
- Clips 10 + 12 generated, PASS, owner-delivered. All transcripts (Scribe) confirm on-script dialogue; caption sentence files written for all clips except 11 (pending v3 transcription).


### Clip 11 — full saga, root cause found (2026-08-20)
Five attempts on one 12-13s clip, each fix undoing the previous:
- v1: wrist-anchor staging read as her and Li fighting over the bag (owner note).
- v2: restaged as her-alone-hooks/Li-braces-from-behind — mechanics fixed, but wardrobe drifted to sleeveless.
- v3: fronted a "NEVER sleeveless" wardrobe clause — wardrobe fixed, but owner caught "2-3 hard cuts": dense 3fps frame inspection (ffmpeg scene-detect found NOTHING — these were not pixel-level cuts, only visible on close frame-by-frame reading) showed the pouch morphing object identity (small drawstring pouch -> different rolled satchel) and a hard pose/geometry snap around the 9s mark. Root cause: three chained sub-actions (hook -> drag hand-over-hand -> catch) in fast current gave the model too many discrete beats to bridge smoothly.
- v4: collapsed to ONE continuous sweep + locked pouch description as its own critical block -> fixed the fragmentation (0 scene-cuts, consistent object), but wardrobe drifted sleeveless AGAIN.
- v5: root-caused as a prompt-structure problem, not a content problem -- two separate "critical" preambles (wardrobe block + pouch block) were competing for the model's attention and it would satisfy one at the expense of the other. Merged both into ONE woven description (wardrobe stated inline as part of the physical action, not as a standalone flagged rule) -> clean: flannel on with both shoulders/arms covered every frame, one unbroken sweep, consistent pouch, 0 scene-detect cuts. PASS, delivered.
**Lesson for merge-back**: when a fix for issue A breaks issue B on the retry, check whether the prompt now carries multiple separate "critical/never" preambles — consolidate into one coherent description rather than stacking flagged blocks, they compete rather than compound. Also: ffmpeg scene-detect (scdet/select=gt(scene,x)) catches hard pixel cuts but NOT AI-generation object-permanence breaks (morphing props, pose snaps) — those need dense fps=3 frame-by-frame visual inspection, a sparse 6-frame contact sheet is not enough to catch them.


### Clip 11 — continued: v5 shipped too early, owner caught a real physics error (2026-08-20)
Owner: v5 has her holding the camera in one hand and the shovel in the other, then the final pose shows BOTH hands on the bag — nowhere for the camera to be. Correct catch; my dense-frame QC had checked for cuts/wardrobe/object-consistency but not hand-count physics. Owner's fix, scoped explicitly to this clip only ("don't make it a rule, only this clip"): drop the held-camera conceit for clip 11, let her hands be fully free for the rescue.
- **v6**: added a `CAMERA_HANDSFREE_ONEOFF` prompt block + a per-clip `cameraOverride` flag in `clips.mjs` so only clip 11 skips the standard held-camera clause — verified via a standalone check that no other clip's prompt was affected. **Process failure caught and corrected in the same turn**: the first edit script wasn't scoped tightly enough and briefly overwrote clip 1's already-accepted, already-delivered cold-open scene text with clip 11's content in the *source file* (`clips.mjs` only — the rendered clip1_v1.mp4 was never touched or re-generated). Caught immediately by a verification script before any generation ran on the corrupted text; clip 1's scene was restored byte-for-byte and re-verified. Lesson: after any multi-clip source-file edit, run an isolation check (assert the untouched clips' content is unchanged) before trusting the diff.
- v6 result: fixed the camera physics cleanly, but surfaced two more issues on close inspection — Li's hand drifted onto the shovel/pouch (violating "his hands never touch..."), and he flashed shirtless for a frame (breaking his locked wardrobe).
- **v7**: repositioned Li explicitly off to the side with hands locked to shoulder/belt only, re-asserted his wardrobe at the point he enters frame. Fixed both — but surfaced a new issue: the "chest-mounted" phrasing in the hands-free camera clause caused the model to render an actual **visible modern GoPro rig strapped to her chest** in one wide shot — a 21st-century device anachronistic in an 1849 setting.
- **v8**: rewrote the hands-free clause to describe pure POV with an explicit "no camera, rig, GoPro, strap, or mount ever visible" instruction instead of "chest-mounted." Clean on every axis: 0 scene-detect cuts, no visible device anywhere across 30 densely-sampled frames, pouch stays one consistent object, Li correctly dressed and hands-anchored-only. **PASS, delivered, owner review pending.**

**Lesson for merge-back**: describing a hands-free camera as "chest-mounted"/"worn" invites the model to render the physical device. For any hands-free/no-camera-visible beat, state the negative explicitly ("no camera, rig, or mount ever visible") rather than describing an alternative mounting method.

Total attempts on clip 11: 8 (v1-v8). This was the single hardest shot in the episode — two actors plus a moving prop in fast water in one continuous take pushes right up against what this pipeline reliably holds together; each fix was real and each new issue was real, not a repeated failure of the same thing.


### Clip 11 — v9, causal-order correction (2026-08-20)
Owner caught one more issue in v8: the pouch was described as "already snagged on the blade" from frame one, which read as the bag starting pre-attached to the tool rather than the tool retrieving it. Correct sequence per owner: the bag is IN the river first (its own object, adrift), and the shovel — starting EMPTY — reaches in and scoops/hooks it where it already is. Rewrote clip 11's scene to establish the pouch floating in the current before the shovel ever touches it, then the shovel reaches out empty and catches it in the same continuous motion. v9: verified via dense 4fps frame sequence — pouch visibly separate and floating in row 1, shovel empty and closing in, hook catches it in row 2, drawn up and transferred to both hands in row 3, held steady with no further changes through the end. 0 scene-detect cuts, no camera device, Li correctly dressed and hands-anchor-only. **PASS, delivered.**

Total attempts on clip 11: 9 (v1-v9). Final locked version: `clip11_v9.mp4`.


## PERMANENT RULE (owner instruction, 2026-08-20) — propose for creative-direction.md §11 merge
> "Given how many caption bugs surfaced in the earlier episode's pipeline, build captions with extra rigor: real audio-grounded timing (not guessed from prompts), cross-checked against actual mouth-movement frames where ambiguous."

Locked as standing practice for this chat and flagged for merge into the shared `creative-direction.md` §11 caption spec so it applies to every future episode chat:
1. Caption timing is ALWAYS derived from real detected audio (silencedetect on the actual clip's extracted audio), never from generation-prompt text or guessed pacing — already standing practice, reaffirmed.
2. **NEW**: wherever automated audio-timing is ambiguous — a single cue spanning most/all of a clip because no real silence gap was detected (loud background noise, e.g. clip 9's alarm bell drowning her shout), an unusually long tail cue, or any cue whose duration looks implausible for its word count — cross-check by extracting video frames at that cue's start and end and visually confirming her mouth is actually open/moving at the cue's start and closed/still immediately after its end. Audio timing alone is not sufficient in these cases; the frame check is mandatory, not optional, before that cue ships.

## Round 7 fixes (owner: transitions not smooth, captions not synced to speech on/off) — 2026-08-20
Two distinct real bugs, both root-caused and fixed (not patched around):

**Captions — two bugs found in sequence:**
1. The original `allocateCues()` had a fallback branch (used whenever detected speech-runs were fewer than my hand-written sentence count — which was MOST clips, since fast delivery has more real breath-pauses than clause boundaries) that did proportional character-length splitting across the ENTIRE multi-run speech span. This produced badly wrong windows — e.g. "California, 1849." (2 words) held on screen for ~4 seconds. This is exactly the class of bug the owner asked to guard against going forward (see permanent rule above).
2. First fix attempt: one caption cue per real detected speech run, words distributed proportionally by run duration. This fixed the sync but broke readability — sentences got chopped mid-clause across cues ("for gold. Most go home with" / "nothing. My plan?").
3. **Real fix**: cues stay whole sentences, but timing is computed on a "virtual" timeline built by concatenating ONLY the real detected speech runs (silence collapsed out) — a sentence's word-position maps onto that virtual timeline and back to a real in-run clip-time. This guarantees every cue's start/end lands on real speech (appears when she starts that line, disappears when she finishes it) while keeping full readable sentences. Re-ran `qc_pass.mjs` across all 12 clips with this algorithm — output re-verified clip by clip, no more multi-second orphan windows, no more mid-clause breaks.
4. Reversed the §11-round-3 "extend into silence, never cap the slow end" policy specifically for the disappear-side: extending past real speech is exactly what the owner flagged as wrong this round. Documented as a policy flip, not silently overwritten.

**Transitions — root cause + real bug found while fixing it:**
1. Root cause of "not smooth": the original table used a near-uniform 0.12s blend (~3 frames) for almost every cut — too short to read as either a clean instant cut or a real dissolve, so it looked like a flash/glitch. It also didn't reflect actual story continuity: several pairs that are genuinely continuous action in one scene (costume change flowing into joining the rocker crew, the alarm bell literally causing the miners' court meeting) were getting the same glitchy micro-blend as genuine scene/time breaks.
2. Fix: reclassified all 11 transitions by real content adjacency — clean 0.2s cuts for genuine scene/time/location breaks (including the cold-open smash-cut), real 0.3-0.5s dissolves for pairs that are truly continuous in-story (4→5, 5→6, 8→9, 9→10, 11→12).
3. **Real bug caught during this fix**: tried an even shorter 0.04s near-instant value specifically for the smash-cut (1→2). This triggered a genuine ffmpeg xfade/encoder bug — a runaway frame-drop loop (`drop=2792` in the encoder log) that silently truncated the WHOLE 128s output to ~14s of video while the audio track stayed full length; ffmpeg exited 0 (no error) so this would have shipped undetected without a frame-count sanity check. Caught by verifying `ffprobe` frame count against expected runtime post-build — now a standing verification step, not just trusting exit code 0. Fixed by using 0.2s (same as the other quick cuts) for that pair instead; the perceptual difference at a smash-cut is imperceptible.

## All 12 clips have a passing version — production complete pending final QC pass
Final duration total (as-shot, may adjust ~1s in edit): 7+9+11+8+12+10+13+13+12+14+10+11 = 130s (clip 8 grew 12->13s for the realization beat, clip 11 shrank 13->10s in the simplification). Within the 90-200s Shorts cap.

## Status
- [x] Branch + project scaffold + engine verified
- [x] Master refs recovered (owner-supplied v5 set, repo-hosted)
- [x] Gate 1 stills generated + sent — **awaiting owner approval**
- [ ] Clips 1–12 (9:16 default, PAI Pro video pipeline only)
- [ ] QC/assembly pipeline rebuild (`qc_pass.mjs`, `build_final_cut.mjs` from §11 specs)
- [ ] Final cut delivery

## Gate 3: full stitched cut delivered (2026-08-20)
- Rebuilt `qc_pass.mjs` (real-audio caption timing: silencedetect 0.12s min, <0.15s micro-segment filter, <0.3s run-merge, 1:1 anchor when run count matches sentence count else gap-clustering, readability floor extending into real silence with no slow-end cap, asymmetric crossfade margin — only incoming clip waits for the blend) and `build_final_cut.mjs` (per-clip fps/scale/pad/loudnorm normalize -> chained xfade+acrossfade at the §11 transition table -> CRF16 master + ~1.5Mbps delivery copy) from the §11 spec, since the originals were lost with Episode 1's container.
- Caption style applied verbatim per spec: DejaVu Sans, size 8, white/black outline, BorderStyle=1, Outline=1.1, Shadow=0.4, Bold, bottom-safe MarginV=55/L=70/R=70.
- Transitions: 0.4s dissolve on the one continuous-action beat (5->6, joining the rocker crew), 0.12s cut on every scene/lighting change, 0.5s into the dusk outro (11->12) — matches Episode 1's validated technique (cut on scene change, dissolve on continuous motion).
- All 12 real Scribe transcripts used for captions (never guessed from prompts) — full transcript log kept in `pai-pro/projects/goldrush49/captions/clipNN.json`.
- Two clips (9, 11) have long/tight caption cues grounded in genuinely continuous speech with sub-0.3s breath gaps only — no fabricated timing, consistent with the standing "sync accuracy over reading comfort" rule validated in Episode 1's QC.
- Final: `goldrush_final_cut.mp4` (CRF16 master, 91MB) / `goldrush_final_cut_compressed.mp4` (delivery, ~25.5MB, ~1.6Mbps, 720x1280, loudnorm -19.8dB mean/-0dB peak). Runtime 128.75s — within the 90-200s Shorts cap.
- Delivered to owner in chat + archived to repo at `episode-4-assets/goldrush_final_cut_compressed.mp4`. **Awaiting owner QC.**
