# Hazel fashion page — generated asset manifest

Generated image/video files are NOT committed to this repo (per standing rule) —
they're retrievable from Higgsfield by job ID via `show_generation_by_ids` /
`media_import_url`. This manifest is the QC/retrieval index.

## Round 1 — cover/banner candidate looks (2026-08-30)

Model: `nano_banana_pro` (served as `nano_banana_2`), 9:16, 2K, from v5 reference
set (master `119465f3` + 4-view: `8f22ad52`, `274e937a`, `1a8133ee`, `17af1f93`).
Sent to owner for approval — not yet QC'd, not yet upscaled (upscale waits for
owner approval per the 4K-sequencing rule).

| # | Look | Job ID | URL |
|---|---|---|---|
| 1 | Red satin bodycon, thigh slit, gold cuff+hoops, black patent pumps, city rooftop dusk | `a9863e89-7aca-4811-8440-0c8e2add95b1` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260830_130148_a9863e89-7aca-4811-8440-0c8e2add95b1.png |
| 2 | White corset + wide-leg trousers, diamond studs, silver chain, white pumps, studio | `cb70a968-6b46-4a28-b67e-f24f01eb67e6` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260830_130159_cb70a968-6b46-4a28-b67e-f24f01eb67e6.png |
| 3 | Emerald satin gown, thigh slit, gold drop earrings, gold strappy heels, hotel balcony golden hour | `6665a7c2-c0dd-4dd5-b9cb-483f368e4a55` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260830_130208_6665a7c2-c0dd-4dd5-b9cb-483f368e4a55.png |

Local working copies (gitignored, session-local only): `hazel-fashion-page/renders/`.

**Owner feedback on Round 1 (2026-08-30): "not looking realistic, identity is not good."** Root cause:
one-off `nano_banana_pro` generation from static reference stills — this project's own documented
~90-95% identity ceiling for reference-based generation. Fix: trained a dedicated **Hazel v5 Soul**
(`soul_id` `8201212b-cf74-4f01-ad60-079e3b748be2`, see `CHARACTER_LOCK.md`) and regenerated as Round 2.

## Round 2 — same 3 looks, regenerated with the trained Hazel v5 Soul (2026-08-30)

Model: `soul_2` (served as `text2image_soul_v2`) + `soul_id` `8201212b-cf74-4f01-ad60-079e3b748be2`,
9:16, 2K. Sent to owner for a fresh realism/identity check — not yet QC'd, not yet upscaled.

| # | Look | Job ID | URL |
|---|---|---|---|
| 1 | Red satin bodycon, thigh slit, gold cuff+hoops, black patent pumps, city rooftop dusk | `a8fe5903-0209-49eb-a365-13dfd6641417` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260830_134150_a8fe5903-0209-49eb-a365-13dfd6641417.png |
| 2 | White corset + wide-leg trousers, diamond studs, silver chain, white pumps, studio | `cc270de0-103e-4120-9665-3ef950ffbbbf` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260830_134154_cc270de0-103e-4120-9665-3ef950ffbbbf.png |
| 3 | Emerald satin gown, thigh slit, gold drop earrings, gold strappy heels, hotel balcony golden hour | `45b62bfd-2d5f-46de-83d1-fbfe1e85e904` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260830_134159_45b62bfd-2d5f-46de-83d1-fbfe1e85e904.png |

Owner picked **look #3, emerald satin gown / balcony golden hour** for all final platform assets
(2026-08-30) — implicitly confirming Round 2 identity/realism.

## Final platform assets — sourced from Round 2 look #3 (`45b62bfd-2d5f-46de-83d1-fbfe1e85e904`)

All derived from the SAME approved photo — no new face/pose generation, only deterministic crop
(profile picture) and Higgsfield `outpaint_image` scene-extension + deterministic crop/resize
(cover/banner). Her face/pose pixels are untouched throughout.

| Asset | Size | Source photo | Source op | Outpaint job ID | Local file |
|---|---|---|---|---|---|
| Profile picture (FB+IG+TikTok+YT) | 1080×1080 | look #3 `45b62bfd` (balcony) | direct crop (head-and-shoulders) | — | `hazel_profile_picture_1080x1080.png` |
| Facebook cover | 820×312 (JPG, 55 KB) | look #3 `45b62bfd` (balcony) | `outpaint_image` to 21:9 (`d552383f-4ab9-435c-a7cb-7063fd2e24e6`), center-cropped to exact ratio | `d552383f-4ab9-435c-a7cb-7063fd2e24e6` | `hazel_facebook_cover_820x312.jpg` |
| YouTube banner | 2560×1440 (safe area 1546×423 centered) | new look #4 `b20931c1` — same dress/Soul, distinct walking pose on a rooftop terrace (owner asked for cover + banner to be different photos, not two crops of one shot) | `outpaint_image` to 16:9 (`c550d0e8-e77f-4aa6-8df9-0d33b24c33e5`; first attempt `66c81e32` was flagged `nsfw` and discarded, retry succeeded unchanged), center-cropped/resized to exact size | `c550d0e8-e77f-4aa6-8df9-0d33b24c33e5` | `hazel_youtube_banner_2560x1440.png` |

Sent to owner 2026-08-30. Local files are gitignored (session-local); job IDs above are the
retrievable source in Higgsfield.

## Status
- [x] Owner confirmed Round 2 identity/realism (picked look #3)
- [x] Crop/compose to platform specs (see `BRAND_KIT.md` §3)
- [x] Cover and banner made into two distinct photos per owner request (banner now sourced from new look #4, same wardrobe/Soul)
- [ ] Owner approval on final crops
- [ ] 4K upscale (only after approval — profile pic and banner are candidates; FB cover has its own small-file-size best practice, upscale not needed there)
