# Episode 5 — clip generation manifest

Per `CLAUDE.md`'s standing rule: generated video files stay out of git, but this
manifest is what lets another session retrieve and QC them by PAI job ID.
Covers the **current live clip set** — the 11 segments actually assembled into
`dino_final_cut.mp4` as of this session (`captions_data.mjs`'s `CLIPS` array).
Sourced directly from each generation round's own `clips_manifest_*.json` in
`/home/user/pai-pro/projects/dino/assets/` — not reconstructed from memory.

Superseded takes (e.g. `clip1_vista_v3`–`v5`, `clip5_rexsighting`, `clip7_pivot`–`v3`,
`clip8_skyturn` v1) are not relisted here; their round-by-round rationale is in
`episode-5-production-log.md`. Their own `clips_manifest_*.json` files are still
present in the assets dir if one is ever needed.

| Clip ID | Duration | PAI taskId | Provider output URL |
|---|---|---|---|
| `clip1_vista_v6` | 15s | `2527aaa1-36d8-423f-8288-6f8e69f6c10d` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/0899365ed787d5cff5d5363d8b1f8374.mp4 |
| `clip2_mudgear` | 8s | `c6c0364a-30b5-45ef-8196-0984abe6235a` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/6472830fe722cec66ef8c78905f8eca2.mp4 |
| `clip3_tankrescue_v2` | 12s | `9d461d4a-f2de-4cb9-99a8-772d9b2537bf` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/0347c60e8f76d00a4d7e72762efef080.mp4 |
| `clip4_foodreview` | 10s | `e6bf1958-806e-4f05-bd06-f82607b07203` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/fc6acee82b8e99268ce44a56a1e86cd4.mp4 |
| `clip5a_rexfamily` | 10s | `5250f0f6-234e-4fc8-b9ee-07d6e8a0998c` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/05cb871c8e0cee215bd2f18306c23dd9.mp4 |
| `clip5b_rexfear` | 12s | `316fb940-f304-4135-a484-6d38dc7fceb0` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/fdac08ed177c37b72dd7d8407e93e416.mp4 |
| `clip6_walkingaside` | 10s | `8aa87cef-40e9-4886-9c0c-25958cf39ab5` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/9e628fc29185745422019a4ac0adc614.mp4 |
| `clip7_pivot_v4` | 10s | `37308af2-1f68-4f51-b7cb-243ddfffda67` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/d578f7e7d9149eee76c51bdd2094c6e7.mp4 |
| `clip8_skyturn_v2` | 12s | `3cad23b8-0dbc-41b6-89ec-6247682fe8f0` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/b5d81d0ad038530048769bb35d55cb2e.mp4 |
| `clip9_shelter` | 12s | `e4189fc2-3221-48c2-841c-83db2d17a31b` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/ac86d47cec9f85571e21811af0e56df9.mp4 |
| `clip10_outro` | 14s | `9f39011b-277f-4ea5-800b-75913216087d` | https://storage.googleapis.com/utopai-cue-prod/generated/videos/2026/08/21/f8f1934edfa00f0d4e65fb17d27c2079.mp4 |

## Final assembled cut (current — post clip1a/1b split, clip3 timing fix, both cards, opening hook overlay)
- Local path: `/home/user/pai-pro/projects/dino/assets/dino_final_cut.mp4` (720×1280) (+ `dino_final_cut_compressed.mp4` for delivery)
- Runtime: **131.593s** (3158 frames @ 24fps, frame-count-verified against expected duration) — unchanged by the hook overlay (burned-in text only, no duration impact)
- 12 segments, all hard cuts (no dissolves — creative-direction.md §16)
- **clip1a_vista now carries the opening POV hook overlay** ("POV: You are last person to see a dinosaur alive.", top of frame, 0:00–0:07, `HOOK_STYLE` 57pt) — added after 3 rounds of standalone clip1a-only preview approval, see production log
- Assembled via `pai-pro-tooling/dino/{captions_data.mjs, qc_pass.mjs, build_final_cut.mjs}` (mirrored to `/home/user/pai-pro/projects/dino/`)

## 4K upscale deliverable (owner-directed, Topaz via Higgsfield) — STALE, predates the hook overlay above
- Source at time of upscale: `dino_final_cut.mp4` **before** the opening hook overlay was added
- Higgsfield job ID: `8ff243b9-6694-4da9-8773-5a22b537b807` (`upscale_video`, provider `topaz`, resolution `2160p`, aspect_ratio `auto`)
- Result: 2160×3840, 24fps, duration 131.593s (exact match to source) — verified via ffprobe + visual spot-check at two timestamps
- **Uncompressed result URL (owner-requested, not re-hosted/compressed):** https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260825_233038_8ff243b9-6694-4da9-8773-5a22b537b807.mp4
- File size ~740MB. This is Higgsfield's own CDN link, not this session's file-delivery path (file exceeds its 30MB cap) — retrievable independent of this session, but confirm with Higgsfield how long result URLs stay live if this needs to survive long-term.
- **Does not include the opening hook overlay** — the 720p master above now differs from this 4K file. See the hooked version below instead.

## 4K deliverable with the opening hook overlay (current, final)
Rather than re-running the full Topaz upscale (another ~20min + Higgsfield credits + repeat-failure risk), burned the hook overlay directly onto the already-upscaled 4K file with a local ffmpeg pass — the ASS overlay's `PlayResX:720/PlayResY:1280` auto-scales correctly onto the 4K frame via libass, verified visually.
- Built from: `dino_final_cut_topaz_4k.mp4` (the Topaz result above) + `hook_overlay_only.ass` (just the new Layer-3 hook Dialogue line, 0:00–0:07)
- `ffmpeg -i dino_final_cut_topaz_4k.mp4 -vf "ass=hook_overlay_only.ass" -c:v libx264 -crf 16 -preset medium -pix_fmt yuv420p -c:a copy`
- Verified: 2160×3840, 24fps, duration 131.593s (exact match, unchanged), hook renders correctly scaled at 4K, everything else identical to the original Topaz result (all other clips' captions/cards untouched, single incremental re-encode only)
- **Link:** https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/3a85eac0-1118-4b95-913a-461c3a459825.mp4 (470MB, verified live — HTTP 200, exact byte-count match to the local file)
