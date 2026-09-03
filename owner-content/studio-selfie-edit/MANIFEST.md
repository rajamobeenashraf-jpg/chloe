# Owner selfie → premium studio video edit (2026-09-02)

Non-episode, owner-personal content: the owner's own 7.57s vertical phone selfie
(IMG_5609.mov, 1080x1920, 30fps, HEVC 10-bit HLG) edited to add fuller hair, a
groomed beard, a luxury casual outfit, and a premium creator-studio environment,
while preserving face/performance/camera/audio.

## Source
- Original: HEVC Main10, HLG (bt2020/arib-std-b67) — converted to SDR H.264
  (bt709, yuv420p, crf16, 30fps, AAC 192k) before upload so the edit models
  ingest normal color: `source_sdr.mp4` (scratch, not committed).
- Higgsfield media_id: `908a86c7-156d-4d3b-b4a8-4b84e72e9bae`

## Round 1 — two candidate editors, same prompt
| index | model | mode | res | job_id | cost |
|---|---|---|---|---|---|
| 0 | seedance_2_5 | video_edit (generate_audio=false) | 1080p | `4b07e0a1-6e34-403d-a186-1125a370410f` | 68.14 cr |
| 1 | gemini_omni_flash_1_1 | edit | 1080p 9:16 | `afd35a02-d0d6-430d-a273-38071c2f2fa6` | 36 cr |

Preset "IN THE DARK" (`24bae836-2c4a-48e0-89b6-49fcc0b21612`) was auto-recommended
on first submit and declined for both.

Plan: original audio track is re-muxed onto whichever output the owner approves
(ffmpeg copy), so voice/speech are preserved bit-for-bit regardless of model.

Prompt: see `prompt_round1.txt`.

## Round 1 — results (2026-09-03)
- idx0 Seedance 2.5 (`4b07e0a1-…`): completed, 1080p, 7.375s raw.
- idx1 Gemini (`afd35a02-…`) at 1080p: FAILED. Retried at 720p:
  job `d0dd3a1d-64e2-48c2-9621-7babf9c6bee4` — completed, 720x1280, 7.680s raw.
- QC: ffmpeg `freezedetect` clean on both (no frozen segments); frame-extraction
  spot check done on both.
- Retime to the original 7.572s so the original audio lines up (`setpts`):
  Seedance ×1.0267 (7.572/7.375), Gemini ×0.9859 (7.572/7.680); original AAC
  track re-muxed onto each.
- Final edited clips (Higgsfield media library, original audio, 7.572s):
  - Seedance final: media `91667ea7-51e8-4358-8d58-aaefb7b80c8d` (1080p)
  - Gemini final:   media `ed2db0ba-f66b-41ca-86f5-66eb428cd030` (720x1280)
  - URL pattern: `https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/<media_id>.mp4`
- Previews sent to owner (270px, proxy transfer because the Higgsfield CDN is
  blocked from this environment): `sd_proxy.mp4` md5 d6de8940fb2db673a3bf260ad866f980,
  `gm_proxy.mp4` md5 a534f937ef64a8fc6c8cfc27ec367196 (scratch, not committed).
- Observations (informational, owner decides): Seedance keeps the original selfie
  framing/camera but puts the MacBook on the desk BEHIND him rather than in front,
  and the chair is barely visible. Gemini shows the MacBook in front and the
  ergonomic chair headrest, but re-frames wider than the original (framing not
  preserved) and is 720p only.
- Status: AWAITING OWNER APPROVAL / pick. No regeneration without owner go-ahead.

## Round 2 — Seedance only (owner go-ahead 2026-09-03: "MacBook in front and chair visible")
- Prompt: `prompt_round2.txt` (round-1 prompt + explicit foreground MacBook lid at
  bottom of frame between him and camera, chair headrest/backrest wings visible
  behind head and shoulders, framing/crop locked to the master).
- seedance_2_5 video_edit, 1080p, generate_audio=false, same source media:
  job `7411c27a-6732-4ee3-ad9b-c9adbc7d285d` — completed, 1080x1920, 7.375s raw.
- QC: freezedetect clean (0 frozen segments); frame spot-check done.
- Retime ×1.0267 to 7.572s, original AAC re-muxed (same method as round 1).
- Final: Higgsfield media `38094583-9fad-4343-b7b2-b1f7b9fb648c` (1080p, 7.53 MB)
  `https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/38094583-9fad-4343-b7b2-b1f7b9fb648c.mp4`
- Preview sent to owner: `r2_proxy.mp4` md5 9f9f70021deac46172ad4e2216a7f3a2 (scratch, not committed).
- Status: AWAITING OWNER APPROVAL. No further regeneration without owner go-ahead.
