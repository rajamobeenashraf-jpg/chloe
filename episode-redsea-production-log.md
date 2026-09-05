# Red Sea reel recreation — production log (started 2026-09-04)

**Engine:** Higgsfield Seedance 2.5, `omni_reference`, 1080p, 9:16, audio on. Stills: Gemini via
`nano_banana_pro`. Score: Higgsfield `sonilo_music` (owner-directed). Branch:
`claude/instagram-reel-recreation-wp3bpu`. Study + shot list: `redsea-reel-study.md`.
Prompt builder: `pai-pro-tooling/redsea/build_prompts.mjs` (never hand-assemble a prompt).

## Owner decisions (chat, 2026-09-04)
- Version: "Same film, Hazel inserted"; camera = exact copy of the source for every scene.
- Hazel wardrobe **A** (Beni Hasan wool dress) — costume still `9a6e8cb0` (identity QC vs canon: PASS).
- Moses: round 1 v2 `c71603f3` was picked, then owner re-briefed ("spiritual, shiny beautiful
  face, prophet of God") → round 2 **M2** `0d0e17ce` picked. Pharaoh: round 1 `11357887`
  rejected ("looks like the reference video's man") → round 2 **P3** `0cf90089` picked, with the
  order to re-dress him as an era-correct king → royal photo-edit `a2fa48f3` (pending owner view).
- Music: Higgsfield `sonilo_music` explicitly authorised by the owner (the connector's tool text
  discourages it; server accepts). Track `1e42572a`, 150.0s, m4a.
- Hazel beats + hook card: approved ("ok"). Source "CINA FILM" logo not copied.

## Reference set (job IDs)
| Asset | Job | Notes |
|---|---|---|
| Hazel canon (7) | see CHARACTER_LOCK.md v5 | + costume A `9a6e8cb0` |
| Hazel voice lock | media `b24e5759` | project-wide |
| Hazel pacing refs | media `9741a763` (H1 264wpm) · `2ea83916` (H2 211) · `126b3efc` (H3 264) · `bf77eb94` (H4 185 + 99) | seed_audio takes (Kaia preset), measured, then ffmpeg `atempo` to the exact target; ElevenLabs v3 takes measured 116–181 wpm and were rejected per the pacing rule |
| Moses M2 | `0d0e17ce` master; `27999778` face front; `db232637` face 3/4 shout; `9c502bbd` full-body 3/4 staff | photo-edits of the master (N4 method) |
| Pharaoh | `a2fa48f3` royal master (P3 face); `ff1fc9d4` face front; `a2bdc002` face 3/4 snarl; `9e17d80f` full-body chariot | photo-edits of the royal master |
| Env plates | opening `f419b819` · aerial corridor `da9c958c` · corridor eye-level `0e32b90c` · chariot charge `64839885` | start_image / environment anchors |
| Superseded (never use) | Moses `ccb6e1cf`, `c71603f3` + `85a2096e`/`a6ba66fb`/`5aeca34c`; Pharaoh `11357887` + `f09de884`/`ddd20f4a`/`eeee3e41`; Pharaoh cands `f10060d5`, `6c46b72a`; Moses cand `954dd2a8`; Hazel options B `05fbaa73`, C `17415ca5` | |

## Cost
Seedance 1080p ≈ 9 credits/s (5s preflight = 45). Planned ~171s of clips ≈ 1,540 credits.

## Clip manifest (all 36 rendered 2026-09-04, Seedance 2.5 1080p 9:16, all sent to owner as compressed previews; freezedetect clean on every clip)
| Clip | Job | Clip | Job | Clip | Job |
|---|---|---|---|---|---|
| 01 | `165e11cc` | 13 | `cf458623` | 25 | `e0f4fa89` |
| 02 | `aba170bc` | 14 | `4e7a3f38` | 26 | `7a1a0661` |
| 03 | `2e9975f1` | 15 | `0dd8c588` | 27 | `31470c40` |
| 04 | `573b3ec2` | 16 | `be89905a` | 28 | `016038dc` |
| 05 | `f63fbde4` | 17 | `f3773c89` | 29 | `47566e88` |
| 06 | `ad6b40e6` | 18 | `4856d8e2` | 30 | `44ec99ea` |
| 07 | `17ac58df` | 19 | `19ccd5ef` | 31 | `83cfb656` |
| 08 | `3570c2f1` | 20 | `06715bff` | 32 | `36213960` |
| 09 | `35def1e1` | 21 | `8155c05b` | H1 | `4e4c3335` |
| 10 | `d0b7534e` | 22 | `86853647` | H2 | `55a29416` |
| 11 | `8ad1a795` | 23 | `85f29a88` | H3 | `820b3329` (v1 submit 422: 1.6s pacing ref too short; fixed with the line doubled, media `ac09ac75`) |
| 12 | `bb31fdf2` | 24 | `ac63e1a4` | H4 | `eedc24e6` |

Findings reported to the owner alongside delivery (no regeneration without his go-ahead):
- Clip 01: Moses rendered in the opening plate's tan robe (plate anchored wardrobe over the
  identity refs). Fix if wanted: repaint the plate's figure into the M2 look first, then rerun.
- Clip 32 / underwater shots: fine. Hazel identity holds in all four beats (side-by-side vs canon).

## Cut v1 (2026-09-04)
- `build_cut.sh`: 36 segments trimmed to the SOURCE shot lengths (2-3s source shots cut from
  4s renders), 0.08s audio edge fades, hard-cut concat → 149.02s, 3576 frames @24fps.
- Captions: word-synced 1-2 word ALL-CAPS chunks, Liberation Serif bold, spacing 2.5, white +
  dark outline, MarginV 320 @720x1280 — 39 chunks. Timing source: huggingface.co is egress-blocked
  in this session (faster-whisper cannot fetch its model) → ElevenLabs Scribe transcribed every
  line verbatim (confirms all dialogue rendered) but returned no per-word times, so phrase windows
  were MEASURED (silencedetect + 40ms RMS envelope per clip) and words interpolated inside each
  measured phrase window (the caption rule's clamped-window fallback). Moses' Hebrew line gets the
  source's two English subtitle lines (12.00–12.95 / 12.96–14.70 in cut time).
- Hook card (§41): "EPISODE" / "I crossed the Red Sea!", Liberation Sans Bold, first 1.0s.
- Score: Higgsfield `sonilo_music` track `1e42572a` (150s), sidechain-ducked under the clip audio
  (Constantinople recipe), loudnorm I=-16/TP=-1.5. Master: `redsea_final_v1.mp4` 1080x1920, 3577
  frames, 149.04s, -15.5 LUFS integrated, TP -1.4, freezedetect clean. Preview 28MB sent to owner.
- Master uploaded to Higgsfield storage: media `8a645d43` — https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/8a645d43-1145-420c-a6d6-056d30c69ba6.mp4

Learnings: the Higgsfield "3D RENDER" preset intercept (`5a77643c`) fired on the whole first
batch — resubmitted with `declined_preset_id` (S7 confirmed again). Builder's ENV block made
adaptive (crowd/army paragraphs only when the shot contains them) so people-free plates don't
get people added.

## Cut v2 (2026-09-05) — owner: "not an exact copy yet" → forensic re-watch → 9 shots rebuilt (owner-approved list)
- Reference-exact plates (nano_banana_pro with the character sets): opening+split `30f9c883`, behind-hillock
  `0d309eae` (03, 05), Moses frontal on mound `1802fa8a` (04), behind column `1c4fec39` (10), family lateral
  `d0e60587` (12), Pharaoh corridor `4ad43d26` (17), far-shore climb `186ab942` (18), Pharaoh underwater `864b4e23` (30).
- Regenerated clips (Seedance 2.5 1080p, plate as start_image + identity refs): 01 `3d181309` · 03 `8f899a2a` ·
  04 `d5b891a3` · 05 `cded464d` · 10 `35a15e6b` · 12 `f67753f0` · 17 `e8da92aa` · 18 `f0e6d90e` · 30 `32bac503`.
  All freezedetect clean; frame sheets checked against the forensic breakdown (composition, blocking, wardrobe).
  v1 files kept in `clips/v1_superseded/`.
- Moses subtitle lines restyled to the reference (Liberation Sans, warm off-white, no outline, bottom-center ≈85%);
  windows re-measured on the new clip 04 (11.60–12.95 / 13.04–14.80 cut time; speech at 1.60–2.40 and 3.04–4.75 clip-local).
- `redsea_final_v2.mp4`: 1080x1920, 3577 frames, 149.04s, freezedetect clean. Preview sent. Master media `221d904c`:
  https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/221d904c-7ef2-4e75-bb6e-2173dcee2f4d.mp4
- Still open for the owner: shot 13 (reference is an elevated push, ours is top-down) was not in the approved list.

## Cut v3 (2026-09-05) — third forensic re-watch (vidIQ job_33affa68) + Higgsfield edit-stage analysis of our v2
Owner asked where the problems still are, then chose "edit fixes and H1 only", nemes kept.
Problem list reported (kept for the record): 02 top-down split reads as a thin line vs the reference's V-wedge;
07 is an MCU vs the reference's 90%-face ECU; 09 shows the corridor mouth large vs a desert-dominant aerial;
13 reuses the aerial plate vs an elevated crane push; 14 is a full turn vs an over-the-shoulder look; 15/06/17/
21/23/32 lack the reference's white-maned lead horse and cape; 18 angle conflict across passes (low vs high);
19 alarm vs screaming; 31 foam-swallow beat partial; underwater 25/27/30 not in slow motion; chariot ramps
missing; H1 Hazel walked backward (Higgsfield analysis flagged it; §14 violation).
Applied (owner-approved scope):
- H1 v2 `bc250d5a`: forward walk, stop, shoulder-turn to lens, walk on; lateral tracking. Frame strip verified
  (forward stride, identity holds). v1 kept in `clips/v1_superseded/`.
- build_cut.sh: 25/27/30 slow motion 2x with motion interpolation from 1.0s into the render; 15 speed ramp
  1.0→1.35x with k=0.34 so the 4.05s render lands on its 3s slot. 06/23/24 cannot ramp without longer
  renders (4s trims from 4.05s) — left real-time, owner told.
- `redsea_final_v3.mp4` built from the same finish pass (captions, hook, score); verification below.
- `redsea_final_v3.mp4`: 1080x1920, 3577 frames, 149.04s, freezedetect clean (0 freezes). Preview sent. Master media
  `791c8fc9`: https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/791c8fc9-d053-4b5d-91e7-9567c740f559.mp4

## Cut v4 (2026-09-05) — owner: "make it exactly like reference video and characters should be speaking in english"
Scope: everything except Hazel's four beats matches the reference; all in-scene dialogue English. Nemes kept (owner).
- Round-3 plates (nano_banana_pro): 02 V-wedge `b4162f1e` · 09 desert wedge `9bab3005` · 13 crane over column `3e4759cc` ·
  14 behind Moses with goat + donkey `23230d27` · 18 uphill + sun pillar `d16f9aca` · 31 foam wall at Moses `edae6e1a` ·
  23 head-on Pharaoh with cape + white lead horse `8f07ae32` · 17 corridor with white horse `2a2da264` · Pharaoh chariot
  ref with white horse + cape `e5180ba1` (added to the Pharaoh reference set for 06/15/17/21/23).
- Regenerated clips (Seedance 2.5 1080p 9:16; exact request payloads in `pai-pro-tooling/redsea/round3_requests.json`):
  02 `81deeb9a` · 04 `b46902e2` (English: "Do not be afraid! The Lord will fight for us!") · 06 `4eeac689` (6s) ·
  07 `a5e830c0` (ECU, English: "After them! Faster! Do not let them reach the shore!") · 09 `7ba222e9` · 13 `3cac7168` ·
  14 `b5a771e9` (6s) · 15 `5b34df14` · 17 `f5a23526` · 18 `74ddc3c4` · 19 `58fba412` (English: "Faster! FASTER! — no… NO!") ·
  21 `35351338` · 23 `076e0c9f` (6s) · 24 `87895c53` (6s) · 31 `89b00e89` (9s).
  All freezedetect clean; frame strips checked against the forensic breakdown (V-wedge, desert-dominant aerial, elevated
  crane, over-the-shoulder look with goat/donkey, white-maned lead horse + cape on every Pharaoh chariot shot, uphill climb
  with the sun pillar, screaming Pharaoh, foam engulfing Moses). English confirmed by ElevenLabs Scribe transcripts of the
  three dialogue clips (04: "Do not be afraid. The Lord will fight for us" · 07: "After them! Faster! Do not let them reach
  the shore" · 19: "Faster, faster! No, no!"). Previous versions kept in `clips/v2_superseded/`.
- Moses' subtitle windows re-measured on the new clip 04 (40ms RMS envelope): speech 1.32–2.45s and 3.08–4.56s clip-local
  → 11.32–12.45 / 13.08–14.60 cut time (`captions/lines.json`; v3 windows kept as `lines_v3.json`). Pharaoh's English
  shouts are not subtitled — the reference subtitles only Moses' line.
- build_cut.sh: speed ramps now on 06 (6.05s→4s, k=0.339), 23 (6.05s→5s, k=0.139), 24 (6.05s→4s, k=0.339) alongside 15;
  underwater 25/27/30 slow motion unchanged.
- `redsea_final_v4.mp4`: 1080x1920, 3577 frames, 149.04s, freezedetect clean (0 freezes), -15.4 LUFS integrated, TP -1.3.
  Ramped segments verified on their slots (06 → 96 frames/4.00s, 23 → 120/5.00s, 24 → 96/4.00s, 15 → 72/3.00s). Spot frames:
  Moses' English subtitles land under the spoken line; Hazel chunks unchanged; identity holds. Preview sent. Master media
  `e9692d6a`: https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/e9692d6a-cbf4-4ff7-96de-b70a13fa6f65.mp4
- Awaiting owner: approval of the 15 round-3 clips and of cut v4 (no clip is final until he approves it).

## Cut v5 (2026-09-05) — forensic pass 4 fixes (owner: "apply all fixes, leave horses colour, regenerate 20 and 22")
- Reference shot lengths re-measured to 0.1s (pass 4, `redsea-reel-study.md`); `build_cut.sh` ORDER now carries them
  (01 3.5 · 02 1.9 · … · 32 8.9); Hazel beats keep full renders. Runtime 148.5s. Caption chunks and Moses' subtitle lines
  re-offset to the new cut times (v4 timings kept as `captions/*_v4.json`; offsets in `captions/offsets.json`).
- Edit fixes: 06 mirrored (chariots now right→left) · 12 mirrored (wall on the right, family walking left) · 18 reverted to
  the high-angle v2 take `f0e6d90e` (passes 2 and 4 agree; the round-3 low-angle take `74ddc3c4` kept in
  `clips/v3_superseded/`) · 32 in 2x slow motion with motion interpolation · ramps re-solved per shot for the measured
  slots (k = (render/slot − 1)/(render/4)). 24 keeps its ramp; 13 left as is (both flagged minor). Horse colour untouched.
- New plates (nano_banana_pro, Moses set as identity refs): 20 mountain pass `4568979c` · 22 rocky desert three-quarter
  rear `8aeed1c2`. Camera per the owner's exact-copy mandate (reference: 20 eye-level wide, static/slow push; 22 eye-level
  medium, static) — the CAMERA TECHNIQUE MENU is overridden by the copy-the-source instruction for this project.
- Regenerated (Seedance 2.5 1080p 9:16, 4s renders, payloads in `pai-pro-tooling/redsea/round4_requests.json`):
  20 `31664e5e` (Moses from behind walking up the pass toward the crowd, no sea) · 22 `28a44569` (walks, stops, turns
  three-quarter to camera, eyes on the lens from ~2.6s). Both freezedetect clean, frame strips checked (identity, wardrobe,
  no water in frame, eyeline on the lens at the turn). Previews sent; awaiting approval. v3 files in `clips/v3_superseded/`.
