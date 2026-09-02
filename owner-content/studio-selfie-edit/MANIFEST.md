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
