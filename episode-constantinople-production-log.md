# Episode "The Fall of Constantinople 1453" — production log + generation manifest
**Engine: Higgsfield Seedance 2.5 (video, 1080p 9:16) + Soul soul_2 (stills) · Script: episode-constantinople-1453-script.md v4 · Started 2026-08-27**

Higgsfield balance at production start: 11,191 credits (Ultra).

## Generation manifest (every job: id + URL + status)

### Costume stills, round 1 (2026-08-27, soul_2 + soul_id 1b738001-5526-4038-8cf3-f2c136841b55, 2K, 9:16)
| Job ID | Shot | Result URL | QC | Owner |
|---|---|---|---|---|
| `5f653f64-8a93-49d7-9325-34d8aa923660` | Chest-up portrait, battlements | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_220144_5f653f64-8a93-49d7-9325-34d8aa923660.png | PASS identity vs Tier-1 (slim face, hazel almond eyes, bold brows, freckles, bronde center part, nude-caramel lips); clean single frame; note: finish reads golden-hour glam rather than fully matte-documentary — flagged to owner | pending |
| `bdf3e427-be94-44da-93bb-9068b8dc7dca` | Chest-up portrait (variant) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_220144_bdf3e427-be94-44da-93bb-9068b8dc7dca.png | FAIL — multi-panel collage (5 tiled copies), unusable | pending |
| `ed20c1f5-d9e3-4742-9a44-c84b5c81c31d` | Full body, rampart | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_220201_ed20c1f5-d9e3-4742-9a44-c84b5c81c31d.png | FAIL — collage again; center panel also shows costume misses (full-length gown vs scripted mid-calf, open-toe heeled sandals vs scripted flat leather shoes, one panel in a grey bodice) | pending |

Lesson (round 1): soul_2 at 9:16 collaged 2 of 3 renders — future still prompts must open with "ONE single photograph of ONE woman, single continuous frame, NO collage, NO grid, NO multiple panels or tiled variants."

## Approval state
- Costume design (green wool overdress + cream linen underdress + leather belt + satchel): proposed via the stills — awaiting owner.
- Regeneration of the two failed stills: NOT submitted — awaiting owner go-ahead per §19.
- Seedance dialogue test clip: owner-approved in principle; will submit after costume approval (the test clip should wear the approved costume).

### Costume options, round 2 (2026-08-27, Nano Banana Pro + 5 master refs via media_import_url, 9:16)
Engine switch per owner question: stills now run on Nano Banana Pro with the reference protocol (closer to the CHARACTER_LOCK letter than Soul; Soul = fallback). Anti-collage opener added to every still prompt — all 3 renders came back as clean single frames. Owner decisions logged: model look approved as-is (do NOT push more matte); round-1 green costume rejected; shoulder bag removed from all designs (prop without a story job).

| Job ID | Option | Result URL | QC |
|---|---|---|---|
| `e46ebf08-e676-4204-9e02-16c4394192e4` | 1 rust war-correspondent (rust tunic, oatmeal sleeves, dark hooded cloak) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_221424_e46ebf08-e676-4204-9e02-16c4394192e4.png | PASS identity vs Tier-1; clean frame; no bag |
| `4db722b0-81f0-4661-be01-a5ce5cf904a5` | 2 Byzantine cream-and-gold (cream tunic, gold trim, umber mantle) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_221424_4db722b0-81f0-4661-be01-a5ce5cf904a5.png | Identity face PASS; NOTE: hair rendered shorter (shoulder-length) than the locked long bronde — would need a fix line if this option is chosen |
| `a5480838-f6d5-438c-ba9f-dd9a2aaeba06` | 3 charcoal adventurer (charcoal-brown bodice, cream underdress, umber skirt) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_221424_a5480838-f6d5-438c-ba9f-dd9a2aaeba06.png | PASS identity vs Tier-1; clean frame; no bag |

Awaiting owner costume pick. Next after the pick: full-body still in the chosen costume (wardrobe reference for all clip prompts), then the Seedance dialogue test clip in that costume.

### Costume lock attempt, round 3 (2026-08-27, Soul soul_2, owner-requested re-render of option 1 rust)
Owner picked costume OPTION 1 (rust war-correspondent) and asked for a Soul re-render. Both takes COLLAGED again — even with the explicit anti-collage opener that worked on Nano Banana Pro.

| Job ID | Result URL | QC |
|---|---|---|
| `41990c7b-60d2-467e-b929-436d97a52546` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_222029_41990c7b-60d2-467e-b929-436d97a52546.png | FAIL — collage (tiled copies); center panel costume correct |
| `b0c36e1a-9bf5-45bc-b19e-983389a49e3a` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_222029_b0c36e1a-9bf5-45bc-b19e-983389a49e3a.png | FAIL — collage (hood-up variant in center panel); costume correct |

**Finding: Soul (soul_2) collaged 4 of 5 renders at 9:16 with long prompts — the anti-collage instruction does not fix it on this model. Nano Banana Pro produced 3/3 clean frames with identical instructions.** Awaiting owner decision on next step.

### Costume lock, round 4 (2026-08-27, Nano Banana Pro STRICT identity protocol, 6 refs incl. front portrait)
Owner rejected the round-2 NBP option-1 face as identity drift ("looking a different person") and ordered a strict-prompt NBP regeneration. Prompt rebuilt in the CHARACTER_LOCK Tier-3 strict style ("IDENTITY-PRESERVING RE-RENDER... references WIN over prompt text, zero reinterpretation, if the render shows a different-looking woman it is WRONG"), with the iris color spec (amber-honey to olive-green, dark limbal ring) written in, and the approved 01_front_portrait added as a 6th reference.

| Job ID | Result URL | QC |
|---|---|---|
| `56d24663-16b2-423d-9bb4-21ee284b2322` (take A) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_222355_56d24663-16b2-423d-9bb4-21ee284b2322.png | Clean single frame; identity strong vs Tier-1 (iris band, brows, freckle pattern, jaw, lips, long bronde); richer skin texture/freckles; costume correct, no bag |
| `41591415-d3f8-402d-9712-354931d56809` (take B) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_222355_41591415-d3f8-402d-9712-354931d56809.png | Clean single frame; identity strong; cloak clasp visible, soft half-smile; costume correct, no bag |

Awaiting owner pick (A or B) → that image becomes the costume lock; next: full-body wardrobe reference in the same costume, then the Seedance test clip.

### Costume LOCKED + full-body wardrobe reference, round 5 (2026-08-27)
- **Owner picked take A** (`56d24663`) as the costume lock: rust war-correspondent, strict-NBP render. This image + the chosen full-body below are the wardrobe references cited in every clip prompt.
- Full-body renders (strict NBP protocol, same 6 refs, shoes corrected to flat closed leather):

| Job ID | Result URL | QC |
|---|---|---|
| `0862799b-6e70-4fc5-b834-6340c7a4f669` (full-body A) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_223017_0862799b-6e70-4fc5-b834-6340c7a4f669.png | Clean single frame; complete costume correct (mid-calf rust, cream hem, oatmeal sleeves, hooded cloak, belt, flat leather shoes, no bag); hard side light |
| `7a5de65f-a996-4d79-a18b-148dba710b8c` (full-body B) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_223017_7a5de65f-a996-4d79-a18b-148dba710b8c.png | Clean single frame; costume correct; softer light, city visible, cloak draped open |

- Seedance 2.5 cost preflight: **12s 9:16 = 78 credits** → full episode (~15 clips) projects to ~1,200–1,600 credits for one clean pass. Balance comfortably covers multiple rounds.
- Awaiting owner full-body pick → then the approved Seedance dialogue TEST CLIP (clip 2 boat beat as the test, in the locked costume) goes immediately after.

### Full-body v2, round 6 (2026-08-27) — owner rejected round-5 full-bodies (identity/realism); strict regen with full-body master refs
Fix applied: the two canonical FULL-BODY reference views (09_fullbody_front `e35e4fd7`, 10_fullbody_34 `caf8fab5`) added to the reference set (they anchor face-at-distance + proportions); prompt gained a "FACE FIDELITY AT DISTANCE" clause and a candid mid-step documentary scene (not a posed lookbook stance). Face-zoom crops extracted for QC before delivery.

| Job ID | Result URL | QC |
|---|---|---|
| `cd13a62c-14fc-4992-87b8-158d763e14f7` (v2 A) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_223343_cd13a62c-14fc-4992-87b8-158d763e14f7.png | PASS at face zoom (freckles, brows, hazel, lips, jaw, bronde); candid mid-step; costume correct incl. clasped short cloak, flat shoes; recommended |
| `1984383d-6f7d-41bc-9f26-c1d6e12a7e58` (v2 B) | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_223343_1984383d-6f7d-41bc-9f26-c1d6e12a7e58.png | Face consistent but softer at zoom, less freckle detail; cloak rendered LONGER (full cape) than the locked short travel cloak | 

Standing lesson for every future full-body/wide generation (all episodes): ALWAYS include the two full-body master refs + the face-fidelity-at-distance clause; extract and check a face crop before delivering.

### Full-body rounds 7-8 (2026-08-27) — owner rejected NBP full-bodies twice; SOUL with SHORT PROMPT solves it
- Round 7 (NBP, strictest prompt, 8 refs, 4 variants `92e1cf91`/`e2579c59`/`1be0c429`/`88408379`): 2 identity-passes (var 1, var 4), 2 identity FAILS (vars 2-3 — most photo-realistic skin of the batch but a DIFFERENT woman). Owner rejected the set. KEY FINDING: on NBP, pushing raw documentary realism harder pulls the face AWAY from the references — identity and realism fight each other on that model.
- Round 8 (owner order: use Soul): **SHORT-PROMPT Soul method — 4/4 CLEAN single frames, identity held in all four.** Root cause of the earlier Soul collages was the ~450-word prompt, not the model: Soul is trained on her identity and needs no identity string; a ~150-word prompt with a single-frame guard produced zero collages.

| Job ID | Result URL | QC notes |
|---|---|---|
| `5d11ae40` (soul fb1) | .../hf_20260827_224034_5d11ae40-aa43-4f9f-8e03-0383eb3e0c93.png | Clean, identity strong, closed lace shoes; cloak rendered FULL-LENGTH (not short); tiny hip pouch half-visible |
| `7c7d33f6` (soul fb2) | .../hf_20260827_224034_7c7d33f6-0d40-4f78-8edf-9335d3d18710.png | Clean, strongest freckles, hood draped; small belt pouch appeared |
| `e6eaa1b9` (soul fb3) | .../hf_20260827_224034_e6eaa1b9-533d-4c25-b022-1b358da7d2e3.png | Clean, identity good; crossbody bag appeared (violates no-bag) |
| `ad7b8259` (soul fb4) | .../hf_20260827_224034_ad7b8259-3cc7-46ee-9c73-c8c945be8e16.png | Clean, identity good; crossbody satchel clearly visible (violates no-bag) |

**PERMANENT ENGINE RULE for this project's stills (owner-driven, confirmed by results): character stills = Higgsfield Soul with SHORT prompts (identity from training); NBP = fallback for cases Soul can't do. Note for the pick: bags crept back into fb3/fb4 and the cloak rendered full-length in all four — flag to owner with the choice.**
Awaiting owner pick of full-body (1-4).

### Full-body round 9 (2026-08-27) — owner redirected back to NBP with the drift issue FIXED
Root-cause fixes applied (all three validated by result): (1) reference set = SINGLE-VIEW originals only — front portrait, 3/4 L, 3/4 R, both full-body masters, 3 movie frames; the 4-panel character sheets are EXCLUDED from NBP refs (grid refs dilute the face and prime multi-panel output); (2) realism language reverted to the exact finish wording of the owner-approved portrait (the amped "raw film-set" wording was pulling identity off the refs); (3) face-fidelity-at-distance clause + short-cloak + no-bag/no-pouch lines enforced.

| Job ID | Result URL | QC |
|---|---|---|
| `e55b0f9a` (fix var 4) | .../hf_20260827_224429_e55b0f9a-c849-44a3-b2ca-83dd5ab498b8.png | **PASS — recommended.** Identity holds at zoom; full costume compliance: SHORT cloak, no bag, flat closed shoes, cream hem; candid mid-step, natural backlight, film grain |
| `6d6991db` (fix var 1) | .../hf_20260827_224429_6d6991db-8703-450f-b938-e1e0b0e21d47.png | Identity PASS at zoom; wider environment framing |
| `b2a1c631` (fix var 2) | .../hf_20260827_224429_b2a1c631-aaaf-47c5-ba29-bf88d11f16e0.png | Identity PASS at zoom; freckles fainter |
| `206a722f` (fix var 3) | .../hf_20260827_224429_206a722f-b409-4cb4-b0c6-099052e58f0c.png | Identity PASS at zoom; golden backlight |

**STANDING NBP RECIPE (this project, all future NBP still generations): single-view refs only (never the grid sheets), approved-portrait finish wording (never amped "raw realism" language), face-at-distance clause on any shot where her face is small, explicit short-cloak/no-bag lines, count=4 with face-crop QC before delivery.**
Awaiting owner pick (1-4) → wardrobe locked end-to-end → Seedance test clip next.

### SEEDANCE TEST CLIP delivered (2026-08-27) — job `a7c7890c-4e2d-4da1-bedf-07e9a857309a`
- Params: seedance_2_5, mode=omni_reference (t2v rejects refs — 422 documented; omni_reference is the identity-reference mode), 12s, 9:16, 1080p, generate_audio, 4 single-view identity refs. Cost 78 cr. Result: https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_225028_a7c7890c-4e2d-4da1-bedf-07e9a857309a.mp4 (12.06s, 1080x1920, 24fps, HEVC+AAC, 7.4MB — sent to owner uncompressed).
- freezedetect (raw source): CLEAN, zero freeze events.
- Frame QC (1s/6s/11s): identity HOLDS at speech frames (hazel iris, brows, lips, bronde, tan+freckles); §29 delivery direction executed — she genuinely turns and points at the chain mid-clip instead of lens-locking; geometry correct (chain from tower across harbor, ships beyond it, walled city, boat). ONE deviation: the cloak HOOD is UP over her head (prompt said hood down) — reads naturally on the water but is a costume deviation; owner to rule. Lip-sync quality = owner's watch-through call.
- Wardrobe lock state: portrait = strict-NBP take A (56d24663); full-body = fixed-NBP variant 4 (e55b0f9a), owner-approved "Approved continue". (Owner also re-requested the earlier fullbody_v2 A/B pair + crops for comparison — re-sent; if he re-picks, the lock updates.)
- AWAITING: owner verdict on the test clip = the engine validation gate. On approval, full clip production begins (clip-by-clip, each sent on completion per §20).

### CLIP 1 TEST with owner-designated references (2026-08-27) — job `a62b4763-7a49-41b3-963e-ec7a5a7f9201`
Owner order: use the four fullbody_v2 images (v2 A + v2 B + both face crops) as the reference set and regenerate clip 1 as a test. Crops uploaded via media_upload (`edbf407e`, `0665be5a`); full-bodies imported (`d35e74b0`, `1e3dd43d`). Seedance 2.5 omni_reference, 12s, 9:16, 1080p, audio. Result: https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260827_230011_a62b4763-7a49-41b3-963e-ec7a5a7f9201.mp4 (12.06s, 7.8MB, sent to owner). freezedetect: CLEAN. Awaiting owner verdict ("Then I will tell you what to do").
