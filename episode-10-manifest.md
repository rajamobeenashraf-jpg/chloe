# Episode 10 (Great Wall) — Generation Manifest
Engine: PAI Pro · project dir `/home/user/pai-pro/projects/greatwall/` · all generations use the CHARACTER_LOCK v4 protocol (5 Tier-1/2 refs + frozen identity string + matte/gritty clause) and the per-clip verify→anticipate→adapt→reverify protocol recorded in `episode-10-great-wall-script.md`.

| # | Asset | Model | Local file | Status |
|---|---|---|---|---|
| 1 | Costume still #1 — Hazel as Ming corvée laborer, shoulder pole + brick baskets, Jinshanling dawn | image-edit-pro, 1024x1024, 5 refs | `assets/still1_costume_greatwall.png` | v1 — owner requested 2 fixes (brick color, distant finished wall); superseded by v2 |
| 2 | Costume still v2 — same scene, fixes applied (grey kiln-fired bricks; distant ridges = old earthen wall under refacing) + refined fitted pale blue-grey outfit | image-edit-pro, 1024x1024, 5 refs | `assets/still1_costume_greatwall_v2.png` | Superseded — owner chose the elegant-aoqun direction instead |
| 3 | Costume still v3 — elegant Ming aoqun (celadon ao + cream mamian-style skirt), working the brick line in it. OWNER WARDROBE LOCK for the episode | image-edit-pro, 1024x1024, 5 refs | `assets/still1_costume_greatwall_v3_aoqun.png` | **APPROVED by owner 2026-08-26** |
| 4 | Zhao (NPC) — drafted villager laborer, blue cloth, topknot, shoulder pole | image-generation-pro, 1024x1024, no refs (NPC, no identity lock) | `assets/still2_zhao.png` | Sent to owner 2026-08-26 — awaiting approval |
| 5 | General Qi Jiguang (NPC) — Ming brigandine armor, inspecting a brick | image-generation-pro, 1024x1024, no refs (NPC, no identity lock) | `assets/still3_qi_jiguang.png` | Sent to owner 2026-08-26 — awaiting approval |

| 6 | Costume still v3, uploaded to public CDN for use as a video reference (Troy precedent: text-only wardrobe drifts in video-gen) | Higgsfield media_upload | CDN: `.../5df1b068-3c04-48ee-b80e-53a1b39e2e53.png` | Reference asset, not a deliverable |
| 7 | **Clip 1 v1** — LINEAR OPEN, dawn brick-relay line, Tumu Crisis thesis line, 9s | video-generation | `assets/clip1_v1.mp4` | Superseded — owner flagged dialogue pace (293 wpm, too fast for the calm register); see script v3 pacing correction |
| 8 | **Clip 1 v2** — same scene, dialogue trimmed to 25 words/~167 wpm | video-generation | `assets/clip1_v2.mp4` | Superseded — owner said still too fast |
| 9 | **Clip 1 v3** — 24 words/10s ≈ 144 wpm, explicit pause beats written into the line, duration extended 9s→10s | video-generation | `assets/clip1_v3.mp4` | Sent to owner 2026-08-26 — awaiting approval |

QC notes per asset are in the session log; owner decisions recorded here as they come. Note: ffmpeg is not currently installed in this environment (package mirror gaps on last attempt) — needed later for frame extraction/QC and final assembly; will retry before the edit stage.
