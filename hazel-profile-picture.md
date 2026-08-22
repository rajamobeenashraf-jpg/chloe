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

**Owner decision pending:** final profile picture pick (lawn recommended) + whether this styled look appears anywhere beyond the profile picture.
