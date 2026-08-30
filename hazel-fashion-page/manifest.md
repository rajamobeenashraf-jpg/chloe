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

## Status
- [ ] Owner confirms Round 2 identity/realism is acceptable
- [ ] Owner picks which look(s) become profile picture / FB cover / YT banner
- [ ] Crop/compose to platform specs (see `BRAND_KIT.md` §3)
- [ ] Owner approval on final crops
- [ ] 4K upscale (only after approval)
