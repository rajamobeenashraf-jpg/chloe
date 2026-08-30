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
| Profile picture (FB+IG+TikTok+YT) | 1080×1080 | look #3 `45b62bfd` (emerald gown, balcony) | direct crop (head-and-shoulders) | — | `hazel_profile_picture_1080x1080.png` |
| Facebook cover | 820×312 (JPG, 54 KB) | new look #5 `7221a155` — **different dress**: black satin off-shoulder mini, gold hoops + layered necklaces, black stilettos, city rooftop at dusk (owner: "give me the Facebook cover in a different dress") | `outpaint_image` to 21:9 (`6e2522e0-8a68-4bfb-a8fe-9caa777ce660`), center-cropped/resized to exact ratio | `6e2522e0-8a68-4bfb-a8fe-9caa777ce660` | `hazel_facebook_cover_black_820x312.jpg` |
| YouTube banner | 2560×1440 (safe area 1546×423 centered) | new look #6/#7/#8 (`b7d6f8c4`→`4e994ad7`→`611b2cbd`) — **different dress**: ivory blazer worn as deep-V dress, gold drop earrings, skyline balcony golden hour (owner: "the model's face should be visible on all devices") | Generated NATIVE 16:9 with `soul_2` (no outpaint) so no scene-extension risk; final `611b2cbd` deterministically cropped (top=0, 1470×827 window, centered horizontally) then resized to 2560×1440 so her eye-line lands at ~37% of frame height, inside the [35.3%,64.7%] band every device shows — see "YouTube banner face-safety" note below | — | `hazel_youtube_banner_ivory_2560x1440.png` |

**YouTube banner face-safety finding (2026-08-30):** a full-body or even a loosely-framed chest-up
`soul_2` render of Hazel consistently places her eye-line only ~20-27% down the frame (lots of sky
headroom) — well above the centered 423px-tall safe band (spans 35.3%-64.7% of a 1440-tall banner)
that mobile/tablet viewers actually see; only TV shows the full 1440px canvas. Prompt instructions
alone ("center her face", "minimal headroom") nudge this but do not reliably hit the band. Fix: (1)
generate the source photo NATIVE at 16:9 (not full-body 9:16 then outpainted — outpainting only
extends the sides, it doesn't fix vertical placement and adds NSFW-flag risk on retry), (2) after
generation, measure the actual eye-line y-pixel, then crop deterministically with top=0 and
crop-height = eye_y / target_f (target_f ≈0.37-0.40, safely inside the band) and crop-width =
crop-height × 16/9 centered horizontally, then resize to 2560×1440. This necessarily zooms in
(there is no more headroom above y=0 to add), so the result reads as a closer bust/face-forward
crop rather than a wide full-look shot — an accepted tradeoff when face-visibility-on-every-device
is the stated priority. Apply this method to every future Hazel YouTube banner generation.

Sent to owner 2026-08-30. Local files are gitignored (session-local); job IDs above are the
retrievable source in Higgsfield.

**Correction log (2026-08-30):** an earlier pass misread "give me the Facebook cover in a different
dress" as "make cover and banner different photos" and regenerated the banner as well (new look #4
`b20931c1`, rooftop walking pose, job `c550d0e8` — first outpaint attempt `66c81e32` was flagged
`nsfw` and discarded). Owner corrected this: only the Facebook cover was meant to change, and it
needed an actual different DRESS (not just a different pose in the emerald gown), per the project's
locked 3-options → owner-picks wardrobe workflow. Banner was reverted to the original look #3
emerald/balcony crop. Look #4 (`b20931c1` / `c550d0e8`) is unused but kept logged in case it's
wanted later.

## Status
- [x] Owner confirmed Round 2 identity/realism (picked look #3)
- [x] Crop/compose to platform specs (see `BRAND_KIT.md` §3)
- [x] Facebook cover regenerated in a different dress (black satin off-shoulder), 3-option wardrobe workflow followed, owner picked
- [x] YouTube banner regenerated in a different dress (ivory blazer-dress), face repositioned into the device-safe zone
- [ ] Owner approval on final crops
- [ ] 4K upscale (only after approval — profile pic and banner are candidates; FB cover has its own small-file-size best practice, upscale not needed there)
