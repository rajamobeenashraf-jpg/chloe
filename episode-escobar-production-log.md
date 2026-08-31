# Episode production log — "Visiting Pablo Escobar in 1987"

Branch: `claude/escobar-time-travel-video-87no8j` · Script: `episode-escobar-script.md` v3 (fact-fixed)
Playbook: `prompting-and-editing-playbook.md` · Engine: Seedance 2.5 omni_reference, 720p working res.

## Asset manifest (job IDs + URLs — the durable record; media files stay out of git)

### Hazel v5 expression additions (OWNER-APPROVED 2026-08-30; recorded in CHARACTER_LOCK.md)
| Asset | 2K job | 4K job |
|---|---|---|
| Laughing smile | `ad19f997-1cde-4485-8489-6cef74c2d398` | `3ba4ea27-5122-4de7-aece-c24a33208afe` |
| Sharp anger | `6651b1cb-d590-44f1-a02b-93be4501ccf2` | `d7ea2bd4-7c37-463e-914f-dba377a3a51c` |

Hazel reference package for every dialogue clip (7): v5 master `119465f3` + face front
`8f22ad52` + face 3/4 `274e937a` + full front `1a8133ee` + full 3/4 `17af1f93` +
smile 4K `3ba4ea27` + anger 4K `d7ea2bd4`. Voice lock `b24e5759-d3c0-4c84-a184-44f7cc65477e`.

### NPC castings (owner approved all 2026-08-30; Pablo pick delegated to Claude)
| Character | Decision | Job | URL suffix |
|---|---|---|---|
| **PABLO — candidate A** | **SELECTED ANCHOR (owner pick 2026-08-30, overriding Claude's B recommendation)** — warmer, rounder, more charming-host face | `b03141e0-70c8-408d-b651-80f4c8cb53b0` | hf_20260830_053123_b03141e0... |
| PABLO — candidate B | rejected by owner (Claude had recommended it for the calm-menace eyes) | `ad980571-e9a3-4df1-a1fc-47637fcabd99` | hf_20260830_053123_ad980571... |
| YOUNG PABLO (memory 4b) | approved | `97158bd2-3752-4ed8-978e-10669f86b8cd` | hf_20260830_053123_97158bd2... |
| ROSA | approved | `bd88ff09-39bf-4236-838c-125115752a7e` | hf_20260830_053123_bd88ff09... |

All casting URLs: `https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/<suffix>.png`

### Pablo voice lock (owner decision 2026-08-30)
Owner rejected the default Seedance-synthesized voice used in the first 7.1b takes ("I don't like his voice"). Rejected also: 4 Higgsfield `seed_audio` presets (Marcus, Cillian, Bram, Desmond) and 3 parameter-sculpted (pitch/rate-tuned) variants — all "bad." Owner asked specifically for a voice matching Pablo's real 1987 age (~37) with a genuine Colombian-accented English, referencing the Narcos-style portrayal. Researched the actual performance (reviews describe it as soft-spoken, restrained, "danger in his calm," never gravelly/theatrical — confirms our own already-scripted "almost gentle" direction for 7.1b). Sourced 3 real Colombian-accented English voices from ElevenLabs' library (age-labeled 35-45): AD-berto, JoseR, Nilton. **Owner picked Nilton** (`57Zk2fTHX6fnrs8DtTnO`, `eleven_multilingual_v2`) — "calm, secure, close" register.
**LOCKED per owner directive "use pacing per our lock rules":** Nilton sample (media `19a168b5-1e2c-4848-8e48-33299e2889b3`, ElevenLabs generation of "Everyone accepts something. Silver... or lead.") was the bootstrap VOICE IDENTITY/TIMBRE reference for the first Nilton-voiced take. Tempo/rhythm stayed on the separately-measured Higgsfield `seed_audio` pacing reference (Holden rate +100, media `d3a2c3b9-f6eb-4074-b931-4c7a09d56fa5`, 162 wpm vs ~151 target) per the standing dual-reference method. 7.1b regenerated on this basis, job `9d6471c6-806a-4b82-8275-b56e51f0e5be` — **OWNER APPROVED.**

**PERMANENT LOCK (per the standard NPC voice-identity-lock method, now that an approved Seedance-rendered take exists):** extracted the full ~4s audio track from the approved clip via PyAV (Pablo is the sole speaker in this shot, clean throughout, no ffmpeg CLI available in this environment so PyAV demux was used instead) → uploaded to Higgsfield → **Pablo's permanent voice-identity-lock reference is media `3ab5cce2-2e1e-4064-925c-418a772f729d`** (Seedance's own rendering of the Nilton-anchored voice, not the raw ElevenLabs sample — matches the method used for Hazel/Alexander). Every future Pablo clip uses this media as the VOICE IDENTITY/TIMBRE reference, paired with a freshly-measured tempo-only pacing reference per clip, same as Hazel's project-wide lock.

### Pablo A view set (generated 2026-08-30 via N4 photo-edit from anchor `b03141e0`; nano_banana_pro 2K working res, NO 4K pre-approval; delivered to owner, AWAITING APPROVAL)
| View | Job |
|---|---|
| Face 3/4 (head turned ~25° right) | `f6f8abf5-1d1b-4f45-9552-ac07acd7b01c` |
| Laughing w/ teeth | `36fe7796-0242-4178-b4cd-75f90328d82f` |
| Full-body front, scene wardrobe (pale-blue open-collar shirt, dark slacks, white sneakers) | `2551890b-9a5f-46b9-b842-32bac956df19` |
| Full-body 3/4 (~35°) | `8a1c3727-8c0b-479c-a4ed-f6dea9ede202` |

URLs: `https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260830_1036xx_<job>.png` (face34+full both `103629`, laugh `103630`).

### Production clips (Part 1)
| Clip | Version | Job | Status |
|---|---|---|---|
| 1.2 The Reverse — Scale Through Silence (4s) | v1 | `78e22f93-2b44-427c-838e-b4bc646580d0` | **OWNER APPROVED.** QC clean: mean frame-diff 0.14 (intentional near-stillness, not a broken freeze — longest dead-still run under 1s), frozen crowd reads dynamically (dancers mid-spin, drinks mid-air), Hazel's back/shoulder correctly foreground frame-left, hard-noon lighting matches 1.1, Pablo correctly voice-only/not visible. |
| 1.3 The Push Finds Him (4s) | v1 | `2af9b3c7-8c20-444f-abf5-6a121ac8f029` | **OWNER APPROVED.** QC clean: mean diff 9.3, no freeze; genuine dolly confirmed via first/last-frame parallax comparison (not a flat zoom); Pablo's identity/mustache/casual wardrobe match; heavy-lidded amused performance correct; whisky glass present; no anachronisms. Pablo's first on-screen appearance in the episode. |
| 1.4 Her Single — The Reveal, Minute One (5s) | v1 (SUPERSEDED — background read as a blank wall instead of the pool/terrace, and she settled into an unscripted smile by the final frame) | `a6f4f6ab-db04-4df8-9b37-46a612fe3bb7` | superseded by v2 |
| 1.4 Her Single — The Reveal, Minute One (5s) | v2 | `6c757f58-8971-4165-be9f-00f3b61dbe77` | **OWNER APPROVED.** QC clean: no freeze, both v1 issues fixed — background now clearly shows pool/guests/vintage cars, expression stays serious/unsmiling through the final frame. Eyeline holds off-camera throughout. |
| 1.1 Frame One — The Grab (4s, clamped up from scripted 2.5s) | v1 | `ee3e8308-98aa-482e-9dcc-8234d4807245` | **OWNER APPROVED.** QC clean: freeze-detect zero near-zero frames, static locked-off camera confirmed, controlled shock-into-composure arc lands correctly, hard-noon light correct, guards shown hands/forearms-only at edges. Rifle rendered more fully visible than the prompt's grip-only language asked for (not a filter-fallback case — generation wasn't blocked, model just rendered a normal prop weapon) and earrings are plain gold hoops rather than door-knocker style — both flagged to and accepted by the owner as-is. |
| 7.1 "Silver… or lead" veranda two-shot (6s) | v1 (SUPERSEDED — pre-framing-fix, one continuous shot) | `a0dc4ef6-08a5-4618-8fab-28d7477ca5a9` | superseded, see 7.1a/7.1b below |
| 7.2 Congress memory wide (4s) | v1 (SUPERSEDED — read AI/unrealistic, uniform wardrobe, owner-flagged 2026-08-30) | `df15a5fc-1d15-493c-aec5-0810c0f616bd` | superseded, regeneration in progress |
| SEAM TEST 7.1→7.2 stitched hard cut (10s) | — | local `seam_test_71_72.mp4` (PyAV concat) | superseded (source clips regenerating) |

**LOG GAP NOTE (found 2026-08-30):** this table never recorded the "B"-choice split regeneration of 7.1 into 7.1a (waist-up two-shot) + 7.1b (dirty single) that fixed the framing-law-1 violation — that round happened but was never logged here. Not recoverable from this file; moving forward cleanly from this point.

### 7.1a / 7.1b — WARDROBE-LOCKED REGENERATION (2026-08-30, per owner "Fix")
Both regenerated with the full Hazel wardrobe still set (front `c404bef2`, 3/4 `1a4aad7d`) + Hazel master `119465f3` (identity backup) + Pablo A view set (face 3/4 `f6f8abf5`, full-body front `2551890b`) as image_references, plus fresh-measured seed_audio pacing refs (old truncated IDs `12184bc8`/`0f5bdf52` unrecoverable — regenerated):
- Hazel pacing: seed_audio Ainsley rate +20, wav imported as media `0dd512c0-3688-4b11-ada7-c572f710550f` (218 wpm vs 211 target, pass; duration 2.2s — a rate-35 take at 249wpm/1.93s duration was REJECTED by the Seedance backend with a 422, isolated by bisection to be too short for the audio_references minimum length, not a content issue).
- Pablo pacing: seed_audio Holden rate +100, wav imported as media `d3a2c3b9-f6eb-4074-b931-4c7a09d56fa5` (162 wpm vs ~151 original target, pass).
| Clip | Job | Notes |
|---|---|---|
| 7.1a waist-up two-shot (4s, clamped up from scripted 3s — Seedance minimum) | `0ba088b9-8e6a-4d57-ab89-fa4d41c9c651` | submitted, rendering |
| 7.1b dirty single (4s) | `b90c9b2e-43db-44d2-ad95-b4e77d89b8f4` | submitted, rendering (preset intercept "IN THE DARK" declined via `declined_preset_id:24bae836-2c4a-48e0-89b6-49fcc0b21612`) |
7.1c (Hazel's plain-language explainer, "Silver is money. Lead is a bullet.") has no prior generation on record — needs a first generation, not a wardrobe redo.

**PROCESS GAP FOUND (2026-08-30):** 7.1a's Hazel audio only carried the tempo pacing reference — it never included her permanent project-wide voice-identity lock (`b24e5759-d3c0-4c84-a184-44f7cc65477e`), which CLAUDE.md's Hazel voice-identity-lock rule requires on every Hazel clip. 7.1a is already owner-approved, so per the regeneration-approval rule this needs an explicit owner go-ahead before resubmitting — flagged, awaiting decision.

### 7.1c — first generation (2026-08-30)
Pacing target: 7 words ("Silver is money. Lead is a bullet.") at ~211 wpm (neutral-conversational band upper ×1.2 ×1.10 Hazel stack). seed_audio Ainsley: rate 20 → 95 wpm (way under, unlike the similar rate on 7.1a's line — text-dependent, the hard sentence-break pause between the two clauses doesn't compress the same way); rate 80 → 172 wpm; rate 100 → 172 wpm (plateaued, likely a fixed floor on the inter-sentence pause) — **accepted 172 wpm as the practical ceiling** (media `83ef4cc3-0555-4330-ae12-ae9ac00ffbd5`), documented shortfall vs 211 target, same practice as prior pacing sagas.
Correctly included BOTH Hazel's permanent voice-identity lock (`b24e5759`, timbre) and the pacing ref (`83ef4cc3`, tempo) this time, plus full N7 identity package (5 canon + wardrobe stills) and Pablo's identity/wardrobe refs for his soft-focus background presence.
| Clip | Job | QC | Notes |
|---|---|---|---|
| 7.1c (4s, clamped up from scripted 2.5s) | `b58cb565-cd7e-4e15-9a84-270925468dd0` | Freeze-detection clean (no near-zero frames); identity/wardrobe hold | Delivered. **Finding (non-blocking, per QC rule):** Pablo renders sharp/in-focus in the background rather than the scripted soft-focus/shallow-DOF look — owner's call whether it needs a redo. **SUPERSEDED — see 7.1b+7.1c MERGE below.** |

### 7.1b+7.1c — MERGED INTO ONE CONTINUOUS SHOT (2026-08-30, owner-directed)

**Finding that triggered the merge:** the separately-generated 7.1b (Pablo's line) and 7.1c (Hazel's camera-address explainer) read as a "jump" when stitched — owner-caught, multiple rounds. Targeted re-study of two of the reference channel's own videos (Anne Boleyn confrontation/playroom scenes, Henry VIII's document/horse beats) confirmed the correct technique for a hushed/tense confessional-aside register is **one continuous unbroken take** with strict sequencing: the host's gaze stays locked on the in-scene figure through his ENTIRE line, a distinct settling beat where the figure locks into complete freeze WHILE the host is still watching him (not yet turning), and only THEN does the host's head/eyes visibly travel to the camera lens — never overlapping. This is a different technique from the light/comedic hard-cut-to-already-locked-gaze pattern (most of Henry VIII), which does not apply to this beat's register.

**Also discovered mid-fix, corrected same day:**
1. **Wrong source clip used for continuity** — the first merge attempt built its continuity/pose-lock chain from job `b90c9b2e` (a superseded, pre-Nilton-voice-lock take of 7.1b with no voice-identity reference), not `9d6471c6` (the actual owner-approved take carrying Pablo's locked Nilton voice). Corrected by extracting the real last-frame reference from `9d6471c6`. See CLAUDE.md MASTER RULE checklist addition (verify approved job ID before using as a continuity source).
2. **Sound design was entirely missing** from the freeze/turn beat. Targeted re-study of the reference clips' audio design (not just visuals) found a consistent pattern: ambient sound drops out abruptly at the exact instant the freeze completes, replaced by a low sub-bass thud; a soft high-frequency shimmer/drone plays under the host's turn; the drone fades toward silence as she begins speaking, leaving her voice dry and intimate. Applied to this shot.
3. **Asymmetric-smirk timing was wrong** — three consecutive video-generation attempts failed to render a sustained asymmetric smirk held from before she starts speaking. Frame-precise re-study of the Elizabeth I reel's own ironic-smirk mechanics ("I might be in trouble... oopsie" beat) found the real technique is DYNAMIC, not sustained: mouth stays mild/near-neutral through the setup line, and the sharp asymmetric pull (one mouth corner hooking up ~30-40% more than the other, lips fully closed, no tooth show) arrives specifically on the tail end of the punch word, not before. Rewriting the prompt to match this exact dynamic timing fixed it.
4. **Owner-directed addition:** a push-in on Pablo's face during his settling beat (referencing the same video's separate "release her" reaction-shot beat, which is actually a hard-cut sequence, not a continuous move — adapted here as an in-take push/pull-back to stay within the single continuous shot the owner had already approved).

| Clip | Job | Notes |
|---|---|---|
| Merge attempt v1 | `2ab334a4-d335-44c2-a53f-34847d4cb0ae` | Continuous take achieved (no cut), but freeze/turn overlapped instead of sequencing cleanly; smirk didn't render; delivered as a checkpoint, superseded |
| Merge attempt v2 (strict sequencing + sound cues) | `bbd35e10-7596-400b-9ffc-be093f896e2b` | Sequencing and sound design correct; smirk still not landing (sustained-hold approach); superseded |
| Merge attempt v3 (corrected dynamic smirk timing) | `8f0e2e78-a9f0-4434-8dc0-ba80e7cec6ca` | Smirk timing fixed (peaks on "bullet"); missing the Pablo push-in the owner asked for next; superseded |
| **Merge v4 (+ Pablo push-in/pull-back during settling beat) — OWNER APPROVED** | `ab98f462-cddf-4bdc-8e77-63ffbddcfd38` | **Approved 2026-08-30 ("Approved continue").** QC finding (non-blocking, reported per the immediate-delivery rule): the scripted push-in/pull-back on Pablo's face during the settling beat did not visibly render — frame check at 2.4-3.8s shows the camera stayed on the static two-shot through that section rather than pushing in. Everything else (strict freeze/turn sequencing, sound cues, dynamic smirk landing on "bullet", identity/wardrobe/voice locks) rendered correctly. This is now the canonical 7.1b+7.1c shot, replacing both separate clips. |

**Reference views used:** full N7/N8 packages for both characters (Hazel: master + face-front + face-3/4 + wardrobe-front + wardrobe-3/4; Pablo: all 4 approved views), Pablo's permanent voice-identity lock (`3ab5cce2`) + tempo pacing ref (`d3a2c3b9`), Hazel's permanent voice-identity lock (`b24e5759`) + tempo pacing ref (`83ef4cc3`). Start image: real extracted last frame of the approved 7.1a (`520a633b`), not a text-described continuation — closes the pose-mismatch gap between 7.1a's ending state and what had been 7.1b's independently-written opening state.

### 7.2 Congress memory — MAXIMUM-REALISM + ERA-ACCURACY REGENERATION (2026-08-30)
Per the two new permanent rules (maximum realism every scene; era-accurate wardrobe/environment for ALL characters), regenerated via start-frame-first method (N2: complex multi-figure crowd scenes render better as a still, then animated) rather than direct t2v. Researched the real location: Capitolio Nacional, Bogotá — Salón Elíptico (Elliptical Room), neoclassical "Republican" architecture, the chamber's own ceiling fresco.
| Asset | Job | Notes |
|---|---|---|
| Start frame v1 (nano_banana_pro/Gemini) | `f1d775cf-2801-4039-bd00-c15e652d0a54` | Delivered to owner for approval; varied period suits/hairstyles/mustaches on every man (fixes the identical-wardrobe finding), Salón Elíptico architecture, warm archival grade with film grain (fixes the AI-slop finding) |
Owner approved the frame. Animated v2 (job `3d0ce36a-05c8-4fdf-98f6-182ce094d50e`) delivered — **owner caught a frozen-arm defect**: the minister's pointing gesture was pixel-identical for the full 4s while the crowd moved. Confirmed via freeze-detection QC (frame-diff on his region vs the crowd region: 0.49 vs 1.73 mean inter-frame diff, ~3.5x less motion; visual check at 0s/2s/4s showed an identical arm). Root cause + fix written as permanent rule PROMPT_LEARNINGS.md S14 (passive "continues/holds" language on an identity-anchored figure reads as "freeze this frame," not "keep this action alive" — fix is explicit incremental time-coded micro-motion verbs for any held gesture). Regenerated as v3 with second-by-second micro-motion language for the minister specifically (arm sway/re-angle/lower/rise, weight rock, torso lean, mouth movement) — **job `4e33c834-eb69-4311-aa9a-963cf49f7483`, QC-verified clean (minister region diff rose to 1.31, no near-zero frames) and delivered.**

**7.2 v4 — PARTIAL ARC REBUILD (2026-08-30, per the full-episode audit + owner decision):** camera changed from locked-off static to a smooth partial arc swinging around the chamber as the deputies turn, per the camera-technique-menu decision recorded in the script. Same start frame (`f1d775cf`), same S14 micro-motion discipline on the minister and crowd (nothing allowed to freeze except in the prior sense — now nothing is static at all, including the camera). **Job `dfa8568a-45fc-48bf-91c9-602e33b83daa`** — QC: mean inter-frame diff 6.5 (vs ~1.8-3.8 on the prior static takes), zero near-zero-diff frames, first/last frame comparison confirms a genuine shift in vantage point with real parallax between foreground benches and background architecture. Delivered; this is now the current version pending final owner sign-off (owner said "good" on 7.3, not yet explicitly re-confirmed on this one beyond the audit decision itself).

### 7.3 — TRACKING WITH PABLO (2026-08-30, first generation)
Pablo needs a Congress-floor suit for this scene (script conflict found and resolved: the global "his look never changes" invariant vs. the era-accurate-wardrobe-per-setting rule — **owner decision: suit for Congress scenes only (7.2-7.4), casual look everywhere else**, documented in the script). New reference generated via nano_banana_pro from his existing identity views: dark charcoal 1980s-cut two-piece suit, white shirt, patterned tie, dark leather shoes — **job `e159f8a7-6af4-4fbc-8ae4-1868cdfce336`**, identity/mustache verified matching, wardrobe era-correct.
| Version | Job | QC | Outcome |
|---|---|---|---|
| v1 | `e913e412-b02a-4fdd-9c3c-1bb852d27746` | Mean diff 18.7, no freeze frames; but tracking distance drifted closer over the shot — last frame shows Pablo's back filling most of the frame, dark and out of focus (near-focus falloff), not the scripted matched-distance exit | Delivered with the defect flagged; owner asked for a fix |
| **v2 (distance-lock fix) — OWNER APPROVED ("good")** | `402ee936-385b-49ba-b81b-5054d3c2e998` | Mean diff 11.9 (steadier than v1), no freeze frames; first/last frame comparison confirms Pablo holds a consistent size/distance throughout, foreground depth-staging blur reads correctly at the end instead of overtaking the frame | **Approved.** Fix: added explicit fixed-distance-lock language ("camera as rigidly attached to him at a fixed radius... his figure must read as IDENTICAL size in first and last frame") rather than only describing the lateral motion and speed-matching, which left distance unconstrained in v1. |

### 7.4 — HAZEL AT THE CHAMBER WALL (2026-08-30, first generation)
Pacing reference verified before use per the standing method: eleven_v3 (Sarah preset) measured 168 wpm against the 211 target — under, so fell back to Higgsfield `seed_audio` (Ainsley, `731b4ffe-e95e-59f4-8c00-81608936091f`). Rate 100 measured 278 wpm (overshot); rate 40 measured 221.6 wpm — accepted as close enough to the 211 target (media `99271187-273a-4289-82af-74cc47f1ada7`). Full N7 Hazel identity package (master, face-front, face-3/4, wardrobe front, wardrobe 3/4) + her permanent voice-identity lock (`b24e5759`) + this pacing ref, plus the chamber start-frame (`f1d775cf`) for background architecture only. Applied the audit's shallow-DOF technical-term fix explicitly ("wide-aperture look... several feet behind her in a true optical focus plane") rather than plain "soft behind."
**Job `46e5d60f-7af2-4ae9-83c6-df47d86ecf8f`** — QC: mean diff 1.12 (appropriately low for a locked-off, hushed-delivery shot), zero near-zero-diff frames (no freeze), chamber background genuinely reads soft/defocused this time (fixes the recurring plain-language background-sharpness defect), identity/wardrobe hold clean first-to-last frame, expression stays plain and composed through "murdered" per the plainness law (no reaction, no emphasis face). Delivered. **SUPERSEDED same day — see the sarcasm+arc revision below; the plainness-law direction itself was overridden by the owner.**

**7.4 v2/v3/v4 — SARCASM + TURN-TO-CAMERA-ARC REVISION (2026-08-30, owner-directed creative override of the plainness law for this beat)**
Owner asked for more creativity on this beat: sarcasm on "murdered" instead of a flat delivery, plus a turn-then-camera-arc reveal (she watches the chamber, then turns to address camera directly). Built via the verified irony 3-axis technique (plain words + asymmetric smirk + vocal pitch-drop) combined with a partial-arc camera reveal (Camera Technique Menu item 4c).
| Version | Job | Finding |
|---|---|---|
| v2 | `d51c3eb3-7163-4a7a-b578-6f78e9ed0cab` | Turn+arc mechanic rendered correctly, but her face was hidden (turned fully away, back-of-head only) through the opening watching-the-chamber beat; smirk rendered as a warm, symmetric smile, not the intended dry asymmetric smirk. |
| v3 | `e4a209ed-3485-42ed-ba17-69819c457852` | Attempted profile-visibility fix — still showed her fully turned away for most of the opening beat, though a good three-quarter profile appeared briefly partway through the arc. Smirk still warm/symmetric. |
| v4 | `9bfddf68-b6a7-4285-bed7-d7a5ff842882` | Camera repositioned to a front-three-quarter starting angle (instead of behind her) and the smirk rewritten as a brief one-sided flicker. **Real progress**: genuine three-quarter profile visible from roughly t=4.5s onward, arc-to-camera mechanic clean. **Still imperfect**: face still reads mostly from behind/nape through the first ~2-3s before the angle resolves; the smirk is marginally less symmetric than v2/v3 but still leans warm rather than cleanly dry-asymmetric. |
**Status: v4 is the current best/canonical version, NOT a fully owner-approved final.** The script (7.4) has been synced to reflect v4's actual design, with its two known open issues flagged inline. This thread was found un-logged and un-scripted during the third full-episode table audit (2026-08-31) — the sync itself is the fix; whether to attempt a further corrective pass on the remaining two issues is a separate, still-open decision.

Pacing refs used on 7.1 (measured w/ faster-whisper before use): Hazel = seed_audio
Ainsley rate −10, job `12184bc8` (222 wpm vs 211 target, pass); Pablo = seed_audio
Holden rate +100, job `0f5bdf52` (151 wpm overall w/ pauses 0.36s+0.58s exactly on
"…Silver"/"or lead"; phonemes ≈250 — validated as her command-register pattern by
the Part 6 pacing study). eleven_v3 takes failed measurement twice (300/83 wpm) —
seed_audio fallback per standing rule.

### Hazel Part 1 dress options — ROUND 2 (day-visitor correction, owner feedback 2026-08-30)
Round 1 (party looks — champagne slip `3521877c`, emerald cocktail `f2051961`, white linen `33b6ec3d`) SUPERSEDED: owner correctly flagged the episode is a full-day VISIT (barrio, warehouse, lakeshore, veranda), not a party — look must be modern-luxurious casual-to-semi-formal day wear. Round 2 previews (delivered, owner to pick):
| Option | Job |
|---|---|
| 1 Ivory silk blouse + tan tailored trousers, gold hoops + chain, leather loafers | `a27934f4-17c5-4638-b1ef-a409ec23ce6d` |
| 2 Sage-olive belted linen shirt-dress, gold pendant + studs, white sneakers | `bf0dc815-1f98-473e-a2d9-80e557d7e1f8` |
| 3 White tailored blouse + terracotta midi skirt, pearl studs + gold bracelet, flat sandals | `15585b7f-5348-4ad1-8226-e34cc18b6718` |
Round 2 also declined (blouse+trousers too formal, shirt-dress too casual). ROUND 3 — elegant modern midi dresses (delivered, owner to pick):
| Option | Job |
|---|---|
| 1 Blush wrap midi, layered gold necklaces + hoops, tan block heels | `56717196-8f42-4fb0-afeb-dab9f2eee6c6` |
| 2 Champagne pleated midi, gold pendant + studs, nude strappy low heels | `7b989f6d-2cb9-4fd5-bcac-4e47ae05b1b3` |
| 3 Off-white square-neck midi w/ tonal embroidery, pearl-gold drops, cognac flats | `caff2909-a697-4fc0-b642-2ec9bea21f04` |
Owner picked OPTION 2 (champagne pleated midi) with "make it a bit sexy" — two elevated variants delivered: (A) V-neck thin straps + above-knee slit `ce228387-5002-4043-8d5c-3db556c83df5`; (B) cowl neck + thigh slit `388af5ee-eeb7-4835-bfb1-de672fa13044`. Owner then asked: new fabric + color, a little shorter. ROUND 4 delivered: (1) terracotta-rust liquid satin V-neck above-knee `590eafe7`; (2) deep teal matte crepe cowl knee sheath `37cf8d94`; (3) coral-pink silk charmeuse slip above-knee `0727c21b`. ROUND 5 (teal sheath refined: shorter above-knee, satin-back crepe, new colors): wine `e8f1a653`, ivory-cream `8f3ffea6`, midnight navy `6c44e18e`. ALL REJECTED — owner redirected (2026-08-30): wants an elegant/stylish/sexy dress FROM THE ERA (1987), i.e. Mode A era-costumed (playbook Part 13), not modern-from-2026. ROUND 6 — authentic 1987 looks (delivered, awaiting pick):
| Option | Job |
|---|---|
| 1 Crimson off-shoulder Alaïa-style bodycon (long sleeves, ruched, above-knee), gold door-knocker earrings + bangle stack, black patent slingback pumps | `88ed1c75-4de8-467e-b8cc-a663a3a6eb31` |
| 2 Ivory silk halter, draped Grecian bodice, gold-tone belt, above-knee, chunky gold hoops + layered chains, gold ankle-strap heeled sandals | `aeeff53c-0469-4c5d-9ff3-ed77d5bd2986` |
| 3 Emerald ruched-satin strapless sweetheart, sarong-draped hip, above-knee, gold-and-emerald teardrop earrings + gold cuff, metallic-gold pumps | `27fbf0b0-6e56-4ee5-8dc4-95b588b12de1` |
NOTE: era switch means Hazel is now era-costumed for Part 1 (her Mode A). The v8 script GLOBAL LOOKS block says "MODE A pending dress pick" — consistent; wardrobe freeze + still set proceed the same way once picked.

Owner picked OPTION 1 (crimson off-shoulder Alaïa-style bodycon), then asked for a color recommendation better suited to the episode. Claude recommendation: BLACK (Alaïa's own signature era color; contrasts cleanly against tropical greenery + carries the noon→night grade arc without a second look; keeps gold jewelry as the accent; avoids clashing w/ Pablo's pale-blue shirt; avoids the on-the-nose red=danger read). ROUND 7 — same silhouette, two color variants delivered (awaiting pick):
| Option | Job |
|---|---|
| Black (recommended) | `49f7a940-ef09-40b2-adb4-b35a88546dae` |
| Bronze-gold metallic (alt, leans into wealth theme) | `b8d82b11-7cb7-4bc2-a65f-522bf3cd26f4` |
Owner picked BLACK (agreed w/ recommendation). First styled pass (off-shoulder long-sleeve silhouette + soft waves + bronze-gold smoky eye, job `70dfd863-23ef-48bd-8e97-8ef921c2f40f`) REJECTED — owner asked for two more black options, "a little more sexy." ROUND 8 (delivered):
| Option | Job |
|---|---|
| A One-shoulder black satin, draped strap, ruched bodice, thigh-high slit, mid-thigh hem | `72b037c6-78bf-4c8c-814c-0164112397a7` |
| B Plunging black halter, waist keyhole cutout w/ gold chain, thigh slit | `d1baaf89-16f9-4e3a-9078-b301a8cc3964` |
**OWNER LOCKED: OPTION A (one-shoulder satin, thigh-high slit, black).** This is the final Part 1 dress silhouette/color.

Hair/makeup styling: sleek low chignon swept off the bare shoulder (job `72b037c6` dress ref) + first makeup pass (deeper bronze-copper smoky eye, berry lip, job `7d363a25`) REJECTED by owner in favor of a softer look → regenerated as SOFT GLAM (dewy skin, soft blended bronze eye, glossy juicy nude-rose lips, job `dcda5314`). Owner then flagged identity/realism drift on that pass — **process failure found and fixed**: only 2 of the 5 v5 canon refs were used (master + full-body front) and the identity description was paraphrased instead of the CHARACTER_LOCK.md frozen string verbatim, skipping both face-crop refs entirely. Corrected per new permanent rule PROMPT_LEARNINGS.md N7 (full 5-ref canon package + verbatim frozen identity string, mandatory on every Hazel generation, no exceptions for small iterations): identity-corrected pass `115e6498` (still had a rendering artifact — blotchy mark on thigh through the slit) → artifact-corrected final `c404bef2-a4cf-4e99-af9a-2af7c2efa656`. **This is the final approved-pending look: black one-shoulder satin dress w/ thigh-high slit + gold door-knocker earrings + gold bangles + sleek low chignon + soft-glam dewy makeup (soft bronze eye, glossy nude-rose lips).** **Owner APPROVED the final look ("ok continue", 2026-08-30).**

### WARDROBE STILL SET (Part 1 locked look — black one-shoulder satin)
Generated per N7 (all 5 canon refs + verbatim frozen identity string) + N4 photo-edit method:
| View | Job | Status |
|---|---|---|
| Full-body front | `c404bef2-a4cf-4e99-af9a-2af7c2efa656` | The approved final-look image itself; delivered |
| Full-body 3/4 (~35°) | `1a4aad7d-2bef-4db9-94ab-5c3d08595236` | Photo-edit of the front; delivered, awaiting approval |
Claude QC note on the 3/4: identity/look hold (chignon, jewelry, shoes, dress); hem reads a touch longer (at-knee) than the front still (above-knee) under the turned pose — flagged as supplementary info, owner's call whether it matters. On approval: these 2 stills join the reference package of EVERY Part 1 Hazel clip (N3), then regenerate 7.1a/7.1b/7.2 in the locked look. No 4K upscale until owner approval per the 4K sequencing rule.
Hair/makeup styled after pick. On lock: generate the WARDROBE STILL SET (full front + full 3/4 in the locked look, via N4 photo-edit) → owner approval → those stills join the reference package of EVERY Part 1 clip (N3: costume stills beat text). Knock-on: existing clips regenerate to match.

### Validation/test clips
| Asset | Job | Notes |
|---|---|---|
| Elizabeth-reel recreation test v1 (12s) | `42662376-ed9f-4746-b6e0-4be3c30596a2` | Delivered 2026-08-30; S13 template validation; owner viewed |

## Approvals ledger
- 2026-08-30: owner approved ALL FIVE script decisions (memory flashbacks / third-person coverage / banner / 2:37 runtime / age-word handling + expression-view additions).
- 2026-08-30: owner approved both Hazel expression stills → 4K → canon.
- 2026-08-30: owner approved all castings; delegated Pablo A/B pick → B selected.
- Fact fixes applied to script v3: mother quote (documented version), Lara timeline ("Months later").

## Owner decisions 2026-08-30 (series-scoped)
- **Captions = her style for both parts:** NO speaker tags (owner override of the
  locked [Speaker]-tag rule, these episodes) + karaoke GOLD active-word highlight.
- **EDIT-STAGE REMINDER (do not skip):** when Part 1 enters the edit, ask the owner
  about the optional "P.S." secondary overlay on shot 3.4 ("p.s. the hippos matter
  later"). He asked to be reminded.
- Reflection shots executed her way (not a risk class); rifle-hook filter fallback
  = grip-only, owner consulted first.
- **Part 1 reveal moved to the START (owner order 2026-08-30, script v6):** Hazel
  tells Pablo in shot 1.4, at gunpoint, that she's from the future and knows how
  his story ends. Knock-ons applied: 1.5 (amused disbelief), 2.1 aside ("He
  doesn't believe me yet. He will."), Scene 10 reworked — cliffhanger is now HIM
  believing her ("…But you already know. You've known all day."), same closing
  question + smash to black. Awaiting owner approval of v6 beats.
- **Cliffhanger question now ANSWERED + PORTAL DEVICE locked (owner directive
  2026-08-30, Part 1 v6.1 / Part 2 v3):** Pablo answers "Show me." → Hazel: "Okay.
  Let's go." → she opens the time portal (locked series device: vertical seam of
  warm golden light, flames bend toward it, deep hum + sub-drop) → Part 1 ends on
  them stepping TOWARD it; Part 2 frame one = them stepping INTO it, then the
  light-hidden morph to 2026. Part 2's return (8.1–8.2) uses the same device.
  Part 1 runtime ~144s.
- **Portal design + Part 2 hook decided from HER footage (2026-08-30, owner
  delegated the decision):** two focused re-watch jobs (Socrates `job_495ee9a3`,
  Joan `job_48a3971c`) established her transition grammar — forward jumps are
  hard cuts (no portal), the golden oval-ring portal is her RETURN device, and
  openings are in media res with the first line at 0:00–0:02. Applied: Part 1
  ends on her exact portal (2026 visible through the center, they walk in →
  black); Part 2 v4 opens on Pablo's stunned close-up in 2026 daylight + Joan
  tilt-reveal (morph oner CUT — no era-morph generation needed); Part 2's return
  uses the same portal spec. PORTAL LOCK written into the Part 1 script; full
  measured spec in `part2-bringing-to-future-study.md`. Part 2 runtime ~114s.
- **Portal UPGRADED beyond her design (owner directive 2026-08-30: "be more
  creative, more magical than her portals"):** our locked device now adds, over
  her static pre-made ring — (1) a BIRTH: single golden spark from Hazel's palm
  that unzips the air and blooms into the ring; (2) a rim of counter-rotating
  clock-sweep ember currents + concentric heat-haze ripples; (3) the
  destination's own time of day SPILLING through the hole (2026 daylight pouring
  into the 1987 night; 1987 firelight into the 2026 dusk on return); (4) the
  world leaning in — flames bend, dust/leaves/moths stream toward it, water
  ripples, hair drifts; (5) diegetic time-bend sound (nearby music slows and
  deepens + huge slow clock-tick; total silence on crossing; ring collapses back
  to its spark). Part 1 10.7 split into 10.7 birth + 10.8 entry (runtime ~147s).
  Feasibility fallback recorded in the lock: if the see-through center won't
  render cleanly, opaque golden blaze with the light-spill kept — decided at the
  portal TEST render, owner call. NEXT-STEPS ADDITION: a portal validation test
  clip (Gemini-eyes-eligible as a test asset) before any production portal shot.
- **"Silver or lead" clarified to owner + plain-language explainer restored as new
  shot 7.1b** ({Hazel: "Silver is money. Lead is a bullet."}) per the standing
  plain-language rule — the owner himself asked what "lead" meant, proving the
  line needed the explainer.

- **HAZEL STYLING DIRECTIVE (owner, 2026-08-30, series-wide):** Hazel appears
  PROPERLY DRESSED UP in every episode — she came from 2026: visible tasteful
  makeup ON (identity + realism intact — face lock untouchable), jewelry, era-
  appropriate-yet-modern outfit with shoes, and a DIFFERENT HAIRSTYLE each
  episode (bronde color locked; style varies: down/waves/updo/ponytail/braid
  etc.), modeled on the reference creator's own per-era styling. This refines the
  earlier lip-tint-only episode convention (owner's call). Styling specifics per
  episode get owner approval at the look-design stage; wardrobe/environment
  doctrine incoming from the 10-video study (playbook Part 13 when written).

## Next steps (in order)
1. Pablo view set derived from casting B via photo-edit (face 3/4, laughing expression w/ teeth, full-body front in scene wardrobe, full-body 3/4) → owner approval.
2. Rosa + Young Pablo secondary views only if their clips need them (each appears once).
3. SEAM TEST: clips 6a+6b (present → memory hard cut) generated as two job-split clips, stitched with the existing pipeline, delivered to owner — proves the her-style cut.
4. On seam approval: shoot clips in order, ⛓-chaining end frames; every clip delivered on render; pacing refs generated + measured per clip; Pablo voice lock extracted from his first approved clip.
