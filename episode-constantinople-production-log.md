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
