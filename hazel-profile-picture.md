# Hazel — Channel Profile Picture (owner-directed, 2026-08-22)

**Brief (owner):** profile picture with a haircut from the Pinterest chart — owner selected **Wavy Cut** — and **Soft Glam** makeup (neutral eyeshadow, wispy lashes, glossy nude lips, soft contour), keeping identity consistency and photographic realism.

**Engine:** Higgsfield **Soul V2** (`text2image_soul_v2`, model id `soul_2`) with the trained Soul identity **"Model Girl v4 as-filmed"** (`soul_id 1b738001-5526-4038-8cf3-f2c136841b55`, trained on the locked 20-image reference set). Per the PERMANENT REFERENCE LOCK, this render is FINAL CONTENT ONLY — it must never be used as a generation reference or training input.

**Styling note:** the Wavy Cut + Soft Glam are a one-off branding-asset styling — the CHARACTER_LOCK identity (hair color/length/part, face, skin) is unchanged and remains the production canon. The §13 matte/documentary clause applies to EPISODE footage; this glamour-adjacent profile portrait keeps the realism core (visible pores/freckles, no AI-plastic look) with owner-requested soft-glam polish.

## Generated assets (Higgsfield CDN, host d8j0ntlcm91z4.cloudfront.net, path user_3HHW3t9HKeBMFC3M9ni2feFvlmB/)

| Take | Job ID | File | QC |
|---|---|---|---|
| **WINNER — v3 single portrait, full-bleed 1:1, 2048px** | `70dcdff9-aeee-4396-a3cc-b459efda60e5` | `hf_20260822_024105_70dcdff9-....png` | ✅ identity match (eyes/brows/lips/skin/freckles/hair), soft glam correct, wavy cut correct, reads photographic |
| Alternate — v4 single portrait (pillarboxed) | `f265334e-5996-4223-8db1-69ac28edd602` | `hf_20260822_024105_f265334e-....png` | ✅ identity match; dark side bars |
| Rejected — grid/contact-sheet outputs (round 1) | `3868f4b2-…`, `5ffad706-…` | (multi-panel — prompt's "character sheets" wording triggered grid layout; wording removed in round 2) | format fail, identity pass |

**Round 2 (owner rejected the Soul takes — directed: use the original character sheets as references, Nano Banana Pro):** generated with `nano_banana_pro` (routed internally to `nano_banana_2`, known behavior) using the FIVE master references imported by URL (both PAI character sheets `cdde55af`/`ef2a1822` + movie frames `f8a3e22d`/`d35989c6`/`d11009b5`) under the strict identity-preserving protocol (references win, calibration lines). Same brief: Wavy Cut + Soft Glam, single square portrait.

| Take | Job ID | QC |
|---|---|---|
| **NB1 — polished glam** | `24f946e8-707a-49eb-82ff-762a76f5a03d` | ✅ identity match; softer, more editorial finish; freckles subtle |
| **NB2 — as-filmed texture (recommended)** | `f8a48cc8-65c3-4305-917d-c8368d71e599` | ✅ identity match; strongest freckle/skin-texture fidelity to the locked look |

**Round 3 (owner request: same brief via PAI Pro):** generated through `image-edit-pro` (PAI raw passthrough, called directly via `server/pai_image_pro_client.js` — the canvas CLI needs the viewer app this headless session can't run), all FIVE master reference CDN URLs in `payload.image`, frozen identity string verbatim, 1024×1024 PNG, ~138s, ~$0.26. Output is NOT stored on a CDN (PAI returns bytes) — the file was delivered in chat; regenerate from this manifest's settings if ever needed again.
- QC: ✅ identity match (face/eyes/brows/lips/freckles/skin), best wave definition of the three engines, soft glam correct. Deviation: soft parted-lips editorial expression instead of the briefed smile — flagged to owner, re-roll offered.

**Round 4 (owner picked PAI as the better engine; directed: nice dress + premium location, drawing room or lawn of her house):** two PAI `image-edit-pro` renders, same 5-ref protocol, head-to-waist framing so the dress shows:
- **Drawing room** — champagne satin midi dress, cream sofas/brass lamps/flowers/sheer curtains. QC ✅ identity; note: mouth open mid-speech rather than a soft smile.
- **Lawn (recommended)** — sage flowy summer dress, golden-hour manicured lawn + rose beds, elegant stone house behind. QC ✅ identity, soft gentle smile, best light; balayage reads warmer/blonder in sunset light (acceptable).
Both delivered in chat (PAI returns bytes, no CDN copy — owner must save the pick).

## Gemini Flash identity audit (owner request, 2026-08-22)
All 7 candidates compared against the benchmark (face-detail sheet + turnaround sheet composited beside each candidate; forensic prompt with the locked feature spec; `tools/gemini-eyes` ask mode). Scores self-labeled "compressed scale" by the model — the ORDERING and verdict labels are the signal, not the absolute numbers. Model note: pai + lawn scored by gemini-3.7-flash; the rest fell back to 3.6-flash (3.7 busy) — minor cross-model comparability caveat, but the pattern is consistent.

| Candidate | Identity | Realism | Verdict | Key drift notes |
|---|---|---|---|---|
| **PAI lawn** | **74** | **71** | **SAME PERSON** | Freckles intact, outdoor catchlights believable, hand anatomically sound, natural dental translucency |
| **PAI plain** | **72** | **68** | **SAME PERSON** | Only report confirming the FULL locked iris spec (amber-honey core, olive-green outer, limbal ring); crisp hair flyaways |
| Nano NB1 | 71 | 67 | LIKELY SAME | Freckles less dense than benchmark; forehead/chest slightly over-smoothed |
| Soul v3 | 68 | 66 | LIKELY SAME | Synthetic sheen on skin speculars |
| Nano NB2 | 68 | 66 | LIKELY SAME | Neck-to-fabric over-smooth blend; uniform hair layering |
| Soul v4 | 68 | 65 | LIKELY SAME | Over-smoothed cheek perimeter; uniform teeth |
| PAI drawing room | 68 | 65 | LIKELY SAME | Upper lip slightly less full; freckles smoothed; chest smoothing |

**Audit conclusion:** the PAI `image-edit-pro` renders are the most identity-faithful and most photographic — the only two "SAME PERSON" verdicts — with **lawn the overall winner on both axes**, matching the owner's instinct. Confirms the lock's guidance that PAI image-edit-pro is the faithful still-generation route; Soul V2 renders score lowest on realism.

**Round 5 (owner request, 2026-08-22): PAI Pro with the v5 character sheet as reference.** Refs = Ep 4's working five at SHA-pinned raw URLs (`raw.githubusercontent.com/rajamobeenashraf-jpg/chloe/22f35d0a.../character-refs/ref_08,09,10,01,06.png`), frozen identity string verbatim. Styling: **Full Glam** (dramatic smoky eyes, sharp liner, dense lashes, sculpted contour, bold glossy lip — freckles kept faintly visible through the base per the identity-anchor rule) + **Butterfly Cut** (short curled face-framing layers winging over the long layers, color/length unchanged).
- **Restaurant** — deep-emerald silk gown, candlelit fine-dining room, chandelier bokeh, city windows. QC ✅ identity (freckles faint but present), butterfly layers visible, hand on the coupe anatomically clean.
- **Bedroom selfie** — ivory silk long-sleeved lounge set, upholstered headboard, peonies, natural extended selfie arm. QC ✅ identity (freckles clearly visible through the glam — best of the pair), butterfly layers visible.
Both delivered in chat only (PAI returns bytes, no CDN copy) — owner must save keepers; regenerate from these settings if lost.

**Round 6 (owner request): identical brief, DEFAULT canonical sheet as reference** — the lock's five masters (both PAI sheets + three movie frames, CDN URLs), same Full Glam + Butterfly Cut prompt. Note: the first attempt tripped PAI's content filter on the "EXACT same woman" identity phrasing (the known quirk in CHARACTER_LOCK rule 7) — reframed to the documented fictional-character wording and both generations passed. QC ✅ identity on both; restaurant take smiles this round; freckles read slightly fainter under the glam than the v5 pair (bedroom keeps them clearly). Direct A/B vs round 5: both reference sets hold identity equally (consistent with the 2026-08-22 experiment); differences are take-level styling luck, not set-level drift.

**Owner decision pending:** final profile picture pick (lawn recommended among soft-glam takes; rounds 5–6 are the Full-Glam alternates across both reference sets) + whether these styled looks appear anywhere beyond profile/branding assets.
