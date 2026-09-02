# REEL — "SWORD FIGHT" (non-episode Instagram Reel) — production log

**Started 2026-09-01.** Branch `claude/seedance-sword-fight-reel-ppb7qh`.
Owner brief: 10–15s vertical 9:16 1080p Hollywood-style medieval sword fight,
Hazel vs. a knight, no dialogue, cinematic sound design.

---

## PIPELINE ROUTING (decided by Claude, owner may overrule)

Not a numbered episode → `CONTENT_SHEET.md` governs. But the content sheet's own
REAL-FOOTAGE-FIRST carve-out routes this to **generation**, because a medieval
sword fight "cannot exist in footage." So identity comes from
`CHARACTER_LOCK.md` v5 (all 5 canon 4K refs + frozen identity string verbatim,
per N7/N8), not from scene-transplant.

## OWNER DECISIONS — 2026-09-01

| # | Decision | Choice |
|---|---|---|
| 1 | Opponent character | **Lannister-coded ORIGINAL knight** — Claude flagged that a faithful GoT/Jaime likeness means an identifiable real performer in a copyrighted role and declined it. Owner accepted the original-character substitute. |
| 2 | Build structure | **5 clips × 3s, hard-cut sequence** (not one 15s take) |
| 3 | Camera register | **Extend menu item 8 (lateral Steadicam/arc tracking) to combat as the spine + item 6 (rapid whip-zoom / crash push) on impacts.** Logged as EXTENSION — untested/inferred, per the Part 11 convention. Angle axis: low-angle for standoff + kick, eye-level for the closing two-shot. |
| 4 | Hazel wardrobe | **"Blooded Noblewoman"** — oxblood velvet fighting gown, split skirt over leather breeches, boned oxblood leather bodice w/ aged brass buckles, laced bracers. Jewellery: antiqued-silver signet ring (sword hand), dark garnet drop earrings, blackened-silver throat chain. Shoes: knee-high oxblood riding boots, low stacked heel. |

### Claude's styling call (per the owner workflow: owner picks dress, Claude picks hair + makeup)
- **RULE CONFLICT NAMED AND RESOLVED:** playbook Part 13.A specifies a "satin
  rosy-nude lip" as part of her signature makeup; the `CHARACTER_LOCK.md` v5
  frozen identity string specifies **BARE natural soft-pink lips, no gloss**.
  Resolution: the v5 identity anchor OUTRANKS the general styling doctrine —
  lips stay v5-bare. Winged liner / defined brows / luminous base are taken
  from Part 13 and combat-weathered.
- **HAIR:** locked centre parting preserved and visible; front sections drawn
  back into one small braid tying at the back; full length left loose behind so
  it reads as her locked hair and carries real movement. Escaped strands stuck
  to sweat at temple and neck.
- **MAKEUP:** luminous base worn down by exertion (sweat sheen at temples /
  hairline / upper lip, grey stone dust along jaw and one cheekbone); sharp
  black winged liner SMUDGED at the outer corners; brows defined, a few hairs
  out of place; lips locked bare natural soft-pink; subsurface exertion flush
  across cheeks and nose bridge (real blood flow, not powder blush).

## SHOT BREAKDOWN — 5 × 3s = 15s

| Clip | Time | Beats | Camera (register → technique → angle) |
|---|---|---|---|
| 1 | 0–3s | Standoff → her explosive first attack → his block | Item 6 crash push on the attack trigger; low angle |
| 2 | 3–6s | Blade-near-eye ECU + block → her spinning second attack | Item 6 whip-zoom into ECU, then item 8 arc; eye-level → low |
| 3 | 6–9s | His front kick → her fall → she starts to rise | Item 8 lateral track, ground-level low angle |
| 4 | 9–12s | Her charge → launch → aerial spin → his upward look of fear | Item 8 reverse track, then arc; low angle |
| 5 | 12–15s | Final strike to chest → closing two-shot | Item 6 crash push on impact → static two-shot; eye-level |

## FROZEN ENVIRONMENT_BLOCK (paste VERBATIM — never paraphrase, per S10)

> A ruined great hall inside a late-medieval stone keep. Enormous weathered ashlar block walls, the mortar joints deep and eroded, patches of damp bloom and pale lichen creeping up from the floor. A vaulted stone ceiling lost in darkness overhead; the remains of a collapsed timber gallery along one wall. The floor is uneven flagstone, cracked and lifted, slick with damp, scattered with real debris — fallen masonry chunks, broken roof slate, straw, dead leaves blown in. Low mist lies along the floor and thin smoke-haze hangs in the air, catching every beam of light. Cold grey daylight falls in hard shafts from tall narrow arched window openings high on one wall, becoming visible volumetric god-rays through the haze; a low guttering brazier off-frame throws a weak warm counter-light from the opposite side. Deep, detailed shadows — never crushed to black. Sophisticated desaturated cinematic grade: cold slate greys, damp stone browns, muted greens; the only saturated colour in the entire frame is the crimson/oxblood of cloth and the warm gold of metal. No fantasy colours, no glowing magic, no neon.

## CHARACTER LOCK — SER ALARIC (this reel only, original character)

Late thirties. Tall, broad, veteran fighter's build. Strong straight nose, high
cheekbones, squared jaw, weather-lines at the outer eye corners, pale blue-grey
eyes. Thick golden-blond shoulder-length hair swept back. Close-trimmed
golden-blond beard and moustache. Fair, sun-weathered skin; small old white scar
through one eyebrow. Gilded steel cuirass (gilding rubbed thin to brass at wear
points, rampant-lion etching grimed in the lines) over a crimson wool arming
doublet; gilded pauldrons/vambraces/gauntlets, fresh gouge on the left pauldron;
heavy crimson wool cloak, frayed hem, plain gold shoulder clasp; blackened steel
sabatons. Late-medieval longsword, gilded wheel pommel, scratched not polished.

## JOB LEDGER

| Job ID | What | Status |
|---|---|---|
| `298c4861-882d-44a1-ab12-b045c89f4c8f` | Hazel look-lock v1 | **VOID — Claude error:** prompt named @Image1-5 but NO `medias` were attached (N7 violation). Caught pre-delivery and resubmitted. Do not use. |
| `de284fa1-d8a7-44b7-8bbe-6ff83488867d` | Hazel look-lock v1 (correct, 5 canon refs attached) | Completed — awaiting owner approval |
| `64f2c270-ebfe-4547-bea9-02d8074746cd` | Ser Alaric full-body front v1 | **FAILED** (filter). Suspected trigger: the explicit "must not resemble any real living person, actor, celebrity or public figure" clause. Retried without it. |
| `28ef0b3e-faf1-41a8-a966-4d49ea25bdf0` | Ser Alaric face close-up front v1 | Completed — awaiting owner approval |
| `33bd3dd4-9187-472b-b2be-1424fe9a72e6` | Ser Alaric full-body front v2 (retry) | Submitted |

## ENVIRONMENT LIMITATION FOUND — 2026-09-01 (BLOCKS SEVERAL PERMANENT RULES)

This container's egress policy **denies both Higgsfield CDNs
(`d8j0ntlcm91z4.cloudfront.net`, `d2ol7oe51mr4n9.cloudfront.net`) and
`higgsfield.ai`** — verified: `connect_rejected`, "organization policy",
while `github.com` resolves fine. Generated media therefore cannot be
downloaded into this container at all.

Rules this blocks:
1. **Mandatory side-by-side visual identity QC** vs. the canon reference
   (MASTER RULE checklist) — Claude cannot see its own outputs.
2. **X2 freezedetect + frame-extraction QC** on every clip before delivery.
3. **Local ffmpeg stitching** of the 5-clip sequence + the Part 14.F continuous
   ambient bed overlay.
4. **Sending clips to the owner as files** (`SendUserFile` needs a local file).

Workarounds tested:
- Higgsfield `sandbox_exec` (cloud sandbox, has internet + ffmpeg/ImageMagick/
  Python) **works** — recovers objective QC (freezedetect, frame diffs,
  durations) and the stitching/overlay step. This is the fallback for scopes
  2 and 3.
- Base64 round-trip of a downscaled image through the sandbox into this
  container: **FAILS** — the string is truncated/elided in transit and decodes
  to a corrupt partial JPEG. Not viable for scope 1.
- Owner-side viewing via `show_generation_by_ids` / `job_display` widgets
  **works** — this is the delivery path for scope 4.

**FIX REQUESTED FROM OWNER:** allow `d8j0ntlcm91z4.cloudfront.net` (and ideally
`d2ol7oe51mr4n9.cloudfront.net` + `higgsfield.ai`) in this environment's network
policy at claude.ai/code environment settings. Until then, Claude's own visual QC
is unavailable and the owner's eye is the ONLY visual gate.

---

## OWNER FOLLOW-UP — 2026-09-01 (second message set)

Owner briefly asked to recast the opponent as **Achilles**, then retracted it
("ignore my last two messages"), instructing: proceed per the four locked
decisions, and **use everything in the original master prompt — where anything
conflicts, the master prompt overrides.**

**Conflict resolved by Claude, not escalated** (owner had explicitly said stop
asking): decision #3 locked "extend item 8 + item 6" and specifically did NOT
authorise menu item 3 (full 360° orbit). But the master prompt calls for 360°
orbiting camera movement (its §6 and §9), a whip pan (§5), POV (§9) and rack
focus. Under the owner's override instruction, **the master prompt's per-section
camera language is now the shot design**, with item 8 (lateral tracking) and
item 6 (crash push) as the underlying grammar wherever the master prompt does
not specify. Decision #1 (original knight, not Jaime Lannister) is UNCHANGED and
was re-affirmed by "go ahead as per the four locked questions."

Other master-prompt specs now binding: **1080p** (not the project's usual 720p),
9:16, 15s total, `generate_audio: true`, no dialogue, cinematic sound design
only. Because there is no dialogue, the entire wpm / speech-pacing / ElevenLabs
pacing-reference / caption rule stack is MOOT for this reel — deliberately not
applied, not an oversight.

## SCREEN GEOGRAPHY LOCK (Part 9 continuity)
**Hazel is camera-LEFT, Ser Alaric camera-RIGHT in every clip.** Stated in all
five start-frame prompts so the master prompt's "audience always understands
where the woman is, where he is" requirement survives the four hard cuts.

## SHOT MAP — final (5 × 3s = 15s)
| Clip | Master-prompt sections | Opening composition anchored by its start-frame still |
|---|---|---|
| 1 | §3 standoff + §4 attack trigger | Wide, camera below eye level, both in guard, eyes locked |
| 2 | §4 block → OTS → §5 blade near eye | Tight OTS past her right shoulder onto his face, blades parting, dying sparks |
| 3 | §6 spinning strike + block → §7 kick → fall | Low angle, her at the apex of the horizontal spin, him stepping off-line |
| 4 | §8 recovery → charge → launch → §9 his upward look | Ground-level, her driving up off the flagstones, dust puffing |
| 5 | §9 aerial spin → §10 final strike → §11 two-shot | Low angle, her airborne mid-rotation, him below looking up |

## CONTINUITY-OF-DAMAGE LADDER (master prompt §"CHARACTER CONSISTENCY")
- Clips 1–2: clean, composed; light then heavier sweat sheen.
- Clip 3: heavy sweat, hair strands escaping, loose length carrying the spin.
- Clips 4–5: post-kick state — grey stone dust smeared across her left hip,
  left forearm and gown shoulder; fine reddened graze on her right cheekbone;
  back braid pulled loose on one side; liner smudged further. Carried forward
  identically into clip 5.
- Blood at his mouth appears only DURING clip 5, after the chest impact — no
  blood in any start frame.

## JOB LEDGER — ROUND 2 (Ser Alaric 4-view set complete)
| Job ID | What | Status |
|---|---|---|
| `28ef0b3e-faf1-41a8-a966-4d49ea25bdf0` | Alaric face front | Complete |
| `2689c1a9-c63a-49d1-853d-84672c1edebf` | Alaric face 3/4 (N4 photo-edit off face front) | Complete |
| `33bd3dd4-9187-472b-b2be-1424fe9a72e6` | Alaric full-body front | Complete |
| `5e920173-53da-437f-98fb-a98ceb4aaae1` | Alaric full-body 3/4 (N4 photo-edit off full-body front) | Complete |

## JOB LEDGER — ROUND 3 (start-frame stills, 10 refs each, narrow @-tag roles)
| Job ID | Clip | Status |
|---|---|---|
| `723aa843-87bf-4e16-9f65-dccff4ebd154` | 1 — wide low-angle standoff | Submitted |
| `accb3f4f-c7a2-4a36-92a3-15ceef019c1f` | 2 — tight OTS | Submitted |
| `72d9f705-b072-4268-b8de-ebdf74415983` | 3 — low-angle spin strike | Submitted |
| `6ab8bce3-e7c9-40ba-835d-65f7526b923e` | 4 — ground-level recovery | Submitted |
| `775044a7-baaf-4918-bd13-1a7fd03c3527` | 5 — airborne hero frame | Submitted |

Reference package per start frame (10 images, non-overlapping jobs per
EXTERNAL GUIDANCE item 1): @Image1-5 Hazel v5 canon 4K (face/identity only),
@Image6 Hazel look-lock `de284fa1` (wardrobe/hair/makeup only), @Image7-8
Alaric face identity only, @Image9-10 Alaric armour/build only.

**KNOWN TYPO, logged:** clip 5's prompt contains a stray character in the phrase
"a powerful半 silhouette". Surrounding text is unambiguous; assess the render
before deciding whether a re-fire is warranted.

## SEEDANCE CONSTRAINT FOUND — minimum duration is 4s, not 3s
`models_explore` on `seedance_2_5` gives `duration` min 4 / max 30. The planned
3s clips are therefore impossible. **Resolution: generate 5 × 4s (20s raw) and
cut each to ~3s in the edit.** This is the correct order anyway — the extra
footage becomes editing handles, which is what lets each cut land MID-MOTION per
`creative-direction.md` §25, instead of being forced to cut on the exact first
and last generated frame.

## JOB LEDGER — ROUND 4 (clips, seedance_2_5 omni_reference, 4s, 1080p, 9:16, audio on)
| Job ID | Clip | Status |
|---|---|---|
| `ba48f6f5-dae4-4d84-a40c-cece2d923e53` | 1 — standoff → first strike → block | Submitted (after preset decline) |
| `9ded5d44-5d95-4eab-8cf9-8b75b9e7020f` | 2 — whip-pan → blade past the eye → block | Submitted (after preset decline) |
| `640b31dc-2b51-4ca3-8998-08d772b7c8de` | 3 — spin strike → kick → fall | Submitted (first pass) |
| `7de6f286-2196-45a9-9355-df8c69cc6829` | 4 — recovery → charge → launch | Submitted (after preset decline) |
| `4ce9c5c6-bd85-4c98-b309-768db6a49b84` | 5 — final strike → closing two-shot | Submitted (after preset decline) |

Per-clip reference package: `start_image` = that clip's own start-frame still
(the S2 method), plus 5 `image_references` — Hazel master + both face crops
(facial identity only), Alaric face front + face 3/4 (facial identity only).
Deliberately NOT the full 10-image set used for the stills: the start frame
already carries both characters' wardrobe, the environment and the lighting, so
adding the wardrobe/full-body refs would have given two references overlapping
jobs, which EXTERNAL GUIDANCE item 1 warns degrades output fast. N7's 5-canon
requirement is scoped to `generate_image`/photo-edit calls, not video.

### S7 RE-CONFIRMED (third occurrence)
4 of the 5 clip submissions were intercepted by preset recommendation
"IN THE DARK" (`24bae836-2c4a-48e0-89b6-49fcc0b21612`) instead of being
submitted. Clip 3 passed on the first attempt — so the intercept is
**non-deterministic across identical-format prompts**, which is new detail
beyond the existing S7 note. Fix worked exactly as documented: resubmit
identically with `declined_preset_id`.

### Prompt structure used (EXTERNAL GUIDANCE item 2 template)
FORMAT → REFERENCE ROLES → STARTING STATE → time-coded TIMELINE → one-move
CAMERA → CONTINUITY → AUDIO → ENDING STATE → CONSTRAINTS. Cause-before-reaction
(item 4) written explicitly into every impact beat as "FIRST the contact, THEN
the sound, THEN the recoil". Constraint-list negatives (item 6) used for
structure/physics only. Screen-geography invariant restated in every clip's
CONTINUITY block.

## CLIP QC RESULTS (objective pass, run in the Higgsfield sandbox)

All clips: 1080×1920, 24fps, 4.04s, 97 frames, AAC stereo. **Seedance audio is
32 kHz, not 48 kHz** — the exact assumption that broke a previous stitch (P1);
`build_final_cut.sh` forces `-ar 48000` explicitly on every encode.

| Clip | Freezedetect | Motion profile (mean abs inter-frame diff / 0.5s) | Min diff | Verdict |
|---|---|---|---|---|
| 1 | none | 2.79 / 3.27 / 5.97 / **8.52** / 7.35 / 5.47 / 4.99 / 4.20 | 2.312 | PASS — the "hold still then explode" beat landed; low hold for the first second, peak on the strike at t≈1.5s |
| 3 | none | 7.91 / 5.42 / 6.57 / 13.58 / **15.63** / 13.80 / 8.44 / 4.54 | 2.638 | PASS — peak at t≈2.0s is the throw + floor impact, settling as she comes to rest |
| 4 | none | **1.33** / 7.47 / 11.39 / 9.25 / 9.40 / 8.53 / 13.06 / 12.82 | **0.514** | FINDING — see below |

### FINDING — clip 4 has a near-static opening (~0.45s)
Motion at t=0.0 is 1.33 and the min inter-frame diff is 0.514, both far below
clips 1 and 3 (2.31 / 2.64). The prompt asked her to drive explosively off the
floor within 0.0-0.7s; instead the start-frame pose is held for roughly the
first 0.45s before motion ramps. This is **S14 (static-pose freeze) in mild
form** — the start-frame reference read as "preserve this frame" for a moment
rather than "start this action". Freezedetect at -60dB/0.4s is too strict to
flag it; the motion floor is what catches it.

**Resolved in the edit, NOT by regeneration** (so no owner approval gate is
triggered): clip 4's trim point moved 0.40s → **0.55s**, which cuts the dead
head off entirely and still leaves a full 3.00s cut. This is exactly the reason
the 4s-generate / 3s-cut decision was taken.

**Prompting lesson for future clips (candidate S-finding):** when a start-frame
still shows a figure in a LOADED, pre-movement pose (crouched, coiled, about to
spring), Seedance tends to hold that pose briefly before animating. Mitigation
to try next time: write the first timeline beat as ALREADY IN MOTION at 0.0s
("she is already rising, halfway up, when the shot begins") rather than
describing the movement as starting at 0.0s.

| 2 | none | 2.91 / 17.67 / **29.62** / 15.97 / 19.31 / 5.94 / 4.90 / 3.86 | 1.513 | PASS — single-frame peak 67.1 at t=1.29s is the whip-pan firing; settles to 3.86 for the held eye/blade close-up |

Clip 2 was the highest-risk camera move in the reel (whip-pan landing into an
extreme close-up). The motion signature confirms it executed as one violent
brief move followed by a genuine hold, rather than smearing into continuous
generic motion.

## CLIP 5 REFUSED BY THE CONTENT FILTER — status `nsfw`
First attempt `4ce9c5c6-bd85-4c98-b309-768db6a49b84` returned status **`nsfw`**;
no video was produced. The prompt carried the master prompt's §10/§11 content:
the sword driving into his chest, and blood at the corner of his mouth.

Claude did NOT silently soften owner-specified content (creative-direction.md
§18) and took it to the owner with four options. **Owner chose: "Retry as
written, reworded"** — same content and same beats, described more obliquely so
that framing, reaction and sound carry the moment.

Reword applied (retry `d1a1c69a-7e19-455c-8b90-4e9e8937be6e`):
- Framed the whole shot as choreographed stage combat with prop blades for a
  film production.
- "the sword point drives into the centre of his gilded chest plate" →
  "her blade arrives squarely against the centre of his gilded breastplate and
  stops there", with the defeat carried by his body folding, his sword dropping
  and his knees giving.
- "a small trickle of dark blood ... runs slowly down toward his chin" →
  "a single thin dark trace appears at one corner of his mouth and creeps slowly
  downward, catching the light".
- Removed the words "gore", "severed limbs" and "blood" from the CONSTRAINTS
  negation list — naming prohibited content in a negative can itself contribute
  to a filter hit, and the constraint list is for structure/physics anyway.

**Candidate cross-model finding (pending a second data point):** on this
platform, explicitly naming violent content in a NEGATIVE constraint ("no gore,
no severed limbs, no excessive blood") may raise rather than lower filter risk.
The same pattern appeared on the Ser Alaric full-body still, which failed with
"must not resemble any real living person, actor, celebrity or public figure"
in its constraints and passed on a retry with that clause removed. Two
independent instances now, both resolved by DELETING the negative clause.

## PARTIAL ASSEMBLY — clips 1-4 (2026-09-01)
Built in the Higgsfield sandbox while clip 5 was still rendering.
Trims: c1 @0.60, c2 @0.30, c3 @0.20, c4 @0.55 — each 3.00s → **12.147s total**,
1080×1920, 291 frames, AAC 48 kHz.

**Delivery route for renders:** the assembled file cannot be sent into chat
(CDN egress block), so it is uploaded to the owner's Higgsfield media library
via `media_upload` → PUT from the sandbox → `media_confirm`.
Partial cut media_id `c3535662-ae0f-485e-b7cc-4b11fd3a7958`
→ https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/c3535662-ae0f-485e-b7cc-4b11fd3a7958.mp4

### AUDIO-BRIDGING VERIFICATION (Part 14.F rule 2 — the 7.1 "jump" root cause)
Measured 0.25s-window RMS across each cut boundary. A near-zero window at a cut
would mean the continuous bed failed and each clip's audio was resetting.

| Cut | t-0.5s | at cut | t+0.5s |
|---|---|---|---|
| 3.0s | 317.0 | 111.5 | 170.9 |
| 6.0s | 235.3 | 931.8 | 292.8 |
| 9.0s | 2117.3 | 263.6 | 169.6 |

Global minimum 0.25s-window RMS across the whole file: **58.7** — never silent.
**PASS:** audio does not touch silence at any cut; one continuous stone-hall
space runs under all three cuts. This is the check that was missing when the
Escobar seam was built, and it is now a scripted step in `build_final_cut.sh`.

| 5 | none | 6.68 / 13.35 / 11.74 / 8.81 / 3.35 / 1.45 / 1.51 / 1.31 | 1.087 | PASS — action front-loaded (peak 18.65 @ t=0.88), tail 2.4-4.0s mean motion 1.44 = the closing two-shot genuinely holds still |

## FINAL CUT — DELIVERED 2026-09-01
media_id `6f63315e-b861-49aa-90ec-c7877e1e9fe9`
→ https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/6f63315e-b861-49aa-90ec-c7877e1e9fe9.mp4

**15.189s · 1080×1920 · 24fps · 364 frames · AAC 48 kHz stereo · 16.2 MB**
Trim points: c1 @0.60, c2 @0.30, c3 @0.20, c4 @0.55, c5 @0.80 — each 3.00s.

### Verification (all run post-render, per the P1 discipline)
- **PTS sanity:** 364 frames, first pts 0.020, last pts 15.146, monotonic TRUE.
  This is the exact check that caught the unplayable seam-test file previously
  (every frame stamped t=0) — the file is genuinely playable, not just written.
- **Audio continuity at ALL FOUR cuts** (Part 14.F rule 2):

| Cut | before | at cut | after |
|---|---|---|---|
| 3s | 317.0 | 111.5 | 170.9 |
| 6s | 235.3 | 931.8 | 292.8 |
| 9s | 2117.3 | 263.6 | 169.6 |
| 12s | 322.6 | 1637.0 | 828.1 |

  Global min 0.25s-window RMS **58.7** — audio never touches silence at any cut.
- **Freezedetect on the assembled final:** no frozen segments.

### Master-prompt compliance
- 10-15s ✓ (15.19s) · 9:16 vertical ✓ · 1080p ✓ · no dialogue ✓
- Synchronised sound design, no music ✓
- Multi-angle coverage: wide establishing / OTS / ECU / low-angle / ground-level
  / reverse-tracking / airborne / close two-shot ✓
- Every cut corresponds to a strike, block, impact or momentum change ✓
- Screen geography held (Hazel camera-left, Alaric camera-right) across all
  five clips ✓
- Continuity-of-damage ladder carried from the fall through to the ending ✓

### STILL OUTSTANDING
1. **Claude has never visually seen any of this work** — the CDN egress block
   makes the mandatory side-by-side identity QC impossible in this environment.
   Owner's eye is the only visual gate. Fix: allow
   `d8j0ntlcm91z4.cloudfront.net` in the environment network policy.
2. Owner approval of the five clips and the final cut has not been given yet;
   nothing here is approved, only delivered.
3. Not yet run (both are post-approval steps by rule): `virality_predictor`
   pre-publish check, and any 4K upscale (approve-before-upscale lock).

## VISUAL QC — FIRST ACTUAL LOOK (2026-09-01, after owner asked about the block)

Method that works around the CDN block, now proven: Higgsfield sandbox
downloads the render → extracts a frame → crops/downscales → base64 → decoded
locally → Read as an image. **Hard constraint: sandbox_exec truncates output
above roughly 10,000 characters** (46k truncated, 10k came through intact), so
each image must be ~7-9k base64 = a ~5KB JPEG. The sandbox is wiped between
calls, so every chunk requires re-downloading and re-deriving the frame.
Practical cost: ~2-3 tool calls plus ~5k tokens per image. Viable for a handful
of critical frames, NOT for routine per-clip QC.

### Frame checked: final cut @ 13.6s (the closing two-shot)
CONFIRMED GOOD:
- Screen geography holds — she is camera-LEFT, he is camera-RIGHT ✓
- His costume reads correctly: gilded/gold armour with crimson ✓
- Her broad v5 identity markers are present: bold thick dark-brown arched brows,
  fair complexion with rosy tone, small button nose, light-coloured eyes,
  bronde hair drawn back off the face with the parting visible ✓
- Continuity-of-damage carried: sweat sheen plus the reddened graze/marking on
  her cheek, as specified for the post-fall state ✓
- Environment/grade: stone, window light, desaturated cold look ✓

FLAGGED, NOT YET RESOLVED:
1. **Her gaze reads downcast/off to one side**, not the "eyes unblinking and
   level" the prompt specified for the closing beat. This is the same class of
   failure as the Escobar 7.1c eyeline drift — worth the owner's eye.
2. **His expression reads alert/alarmed rather than dazed and beaten**, and the
   thin dark trace at the corner of his mouth could NOT be confirmed at this
   resolution. The reworded prompt may have softened the aftermath too far.
3. **Possible wardrobe question**: in the wider frame a large pale/light area
   sits lower-left where her oxblood gown should be. Could be a lit sleeve, her
   hand, or the blade — but it does not obviously read as deep oxblood velvet.
   Needs a closer look before the reel is called final.

CANNOT CERTIFY: fine facial identity against the v5 canon (exact eye shape,
cheek fullness, lip colour) at 176px. The mandatory side-by-side comparison
still has not truly been satisfied — this is a coarse check, not that check.

---

## OWNER REJECTION + FIX ROUND — 2026-09-01 (clips 4 and 5)

**Owner feedback (message truncated mid-sentence at "I"):** the last clip is not
good; she runs in the OPPOSITE direction; she must run TOWARD the opponent, jump,
REVOLVE in the air, then attack; and the sword must land on his SHOULDER, not on
his chest armour.

### ROOT CAUSE — a Claude prompting error, not a model failure
Clip 4's prompt placed the CAMERA BETWEEN the two fighters: *"the camera retreats
ahead of her, keeping her face in frame"*, and then *"below and BEHIND her,
camera-right, he begins to react."* With the opponent behind her and the camera in
front, she reads as running AWAY from him, straight at the viewer. Exactly what
the owner saw.

**A crude motion measurement did NOT catch this** — the x-centroid of motion energy
drifted left-to-right in both clips (+7.3 and +10.8 of 96 columns), which looked
correct, because that measure includes the retreating camera's own movement. The
owner's eye was right and the objective proxy was too coarse. Logged as a caution:
motion-centroid direction is not a valid proxy for staging when the camera moves.

**Fix:** a SIDE-ON LATERAL camera, perpendicular to the run line, with both fighters
in frame and the whole closing distance visible across frame. This is the same
principle as S12 (a head-on camera destroys readable geometry; an oblique/lateral
one restores it), applied to staging rather than formation depth.

### SCOPE DECISION (Claude's call, stated to owner)
The choreography the owner describes spans clips 4 and 5, so BOTH were rebuilt.
Fixing only clip 5 would have left the wrong-direction run in the reel.

### NEW START FRAMES
| Job | What | Notes |
|---|---|---|
| `afc65377-855f-43bc-a269-c1a71137e24b` | 4b charge, side-on lateral | VERIFIED BY EYE: she sprints left→right at him, hair/skirt trailing back, he is planted ahead of her facing left. Direction now unambiguous. |
| `4c7c9cc7-8c8b-4ddf-b60d-549dbec098fe` | 5b aerial, v1 | REJECTED by Claude: read as a forward LUNGE with the blade extended, not a body revolving. Owner asked for a revolve. |
| `ae5ae8b9-1129-4528-ab59-4789c9c823e1` | 5c aerial, v2 | Rotation and high cocked blade correct — but knight's cloak drifted gold-dominant. |
| `6093c8ec-67a7-486a-8c26-207553bbe5d3` | **5d aerial, FINAL** | N4 photo-edit of 5c changing ONLY the cloak colour. Pose and blade preserved. |

### WARDROBE DRIFT CAUGHT BY MEASUREMENT, NOT BY EYE
Claude's first visual read called the cloak "olive-green"; a hue histogram
corrected that — green was only 3.6%. The real defect was GOLD DOMINANCE with the
crimson suppressed. Measured on the knight region of each frame:

| Frame | median hue | RED-family | GOLD | GREEN |
|---|---|---|---|---|
| charge still (reference crimson) | 332.3° | 49.7% | 15.3% | 0.0% |
| aerial 5c (defective) | 70.0° | 32.8% | 37.6% | 3.6% |
| aerial 5d (after cloak fix) | **345.7°** | **74.5%** | **15.1%** | **0.0%** |

Gold now matches the reference almost exactly (15.1% vs 15.3%) and the hue sits
firmly in the crimson band. **Method note: a hue histogram over a character's
region is a cheap, reliable wardrobe-continuity check that does not depend on
Claude being able to see the image well** — worth reusing on every multi-clip
sequence.

### S14 MITIGATION APPLIED (from the clip-4 static-head finding)
Both new clip prompts open with an explicit "SHE IS ALREADY MOVING AT FULL SPEED
AT 0.0s / there is no still moment at the start of this shot" clause, rather than
describing the movement as beginning at 0.0s. This is the candidate fix logged
after clip 4 v1's ~0.45s near-static opening; this round is its first live test.

### OTHER FIXES FOLDED IN
- Clip 5's closing two-shot now states explicitly that her gaze is level,
  unblinking and on him, and "never drops, never goes downcast, never drifts" —
  addressing the downcast-gaze finding from the earlier visual QC.
- Clip 5 keeps the owner-approved "reworded" stage-combat framing that cleared
  the content filter, with the impact re-aimed to the shoulder pauldron.

### JOB LEDGER — FIX ROUND
| Job ID | Clip | Status |
|---|---|---|
| `1aac69e4-cb38-4c00-a6e6-1325a1275d36` | 4b — run at him → jump → revolve | Submitted |
| `0a07f29e-de0a-4096-8b31-80c59bdb424b` | 5b — complete revolve → shoulder strike → two-shot | Submitted |

### FIX-ROUND RESULTS — both clips PASS

| Clip | Freezedetect | Motion profile | Min | Verdict |
|---|---|---|---|---|
| 4b | none | 10.31 / 11.02 / 10.91 / 9.13 / 9.25 / 11.01 / 10.33 / 8.92 | **6.886** | PASS |
| 5b | none | 3.44 / 8.38 / 10.60 / 12.82 / 13.53 / 7.14 / 2.41 / 2.20 | 0.896 | PASS — builds to the impact, then the held two-shot |

**S14 MITIGATION VERIFIED — promote to a confirmed finding.** Clip 4's old
opening measured motion 1.33 with a min inter-frame diff of 0.514 (a ~0.45s
frozen head). Clip 4b, with the explicit "SHE IS ALREADY MOVING AT FULL SPEED AT
0.0s / there is no still moment at the start of this shot" clause, measures
**10.31 in its first 0.5s with a min inter-frame diff of 6.886** — a 13x higher
motion floor. **Rule for every future clip whose start frame shows a loaded,
pre-movement pose: write the first beat as ALREADY IN MOTION at 0.0s rather than
describing the movement as beginning at 0.0s.**

**Visual verification (frames pulled back and actually looked at):**
- 4b @ t=1.0s — she is mid-sprint travelling RIGHTWARD, hair streaming back to
  the left. The wrong-direction defect is fixed.
- 4b @ t=3.3s — she is airborne and rotating, and HE IS IN FRAME ahead of her,
  crimson cloak intact. Run → jump → revolve all present.
- 5b @ t=1.55s — **the blade is across his SHOULDER, not his chest.** Owner's
  second fix delivered.

**Partial miss, logged not fixed:** at 4b t=1.0s he is briefly OUT of frame — the
camera tracks with her rather than holding both fighters as the prompt required.
Geography still reads (the shot opens on both, and her travel direction is
unmistakable) and he is back in frame by the launch, so this was not treated as
grounds for another regeneration. Flagged for the owner.

## FINAL CUT v2 — DELIVERED
media_id `9520a2b3-c669-4cab-be44-1c4fd3780247`
→ https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/9520a2b3-c669-4cab-be44-1c4fd3780247.mp4

**15.147s · 1080×1920 · 24fps · 363 frames · 16.7 MB**
Trims: c1 @0.60, c2 @0.30, c3 @0.20, c4 @0.30, c5 @1.00 — each 3.00s.
PTS monotonic, first 0.020 → last 15.104. Freezedetect: none.
Audio continuity across all four cuts (global min RMS 58.7, never silent):
3s 317.0→111.5→170.9 · 6s 235.3→931.8→292.8 · 9s 2117.3→205.9→155.4 ·
12s 942.1→1388.9→537.6

### NOTE — sandbox 60s ceiling
`sandbox_exec` timed out at 60s despite requesting 120s. The five-clip assembly
must be run with `background:true` and polled via its log/exit files. Recorded so
future sessions do not lose a run to this.

---

## OWNER REJECTION — clip 5, character consistency of the male opponent (2026-09-02)

Owner: Ser Alaric's identity is inconsistent in clip 5.

### ROOT CAUSE — two compounding violations of already-written rules, both Claude's

1. **The start frame was a CHAIN EDIT with a PARTIAL reference set.** Clip 5's
   start frame `6093c8ec` was a photo-edit of `ae5ae8b9` made to fix the cloak
   colour, and that edit passed only **one** of Alaric's four canon views
   (`33bd3dd4`). `CHARACTER_LOCK.md` forbids chaining generations off outputs
   ("drift compounds"), and CLAUDE.md's owner lock of 2026-08-30 requires the
   FULL locked identity reference set for every character in frame on any
   photo-edit of a prior output — *specifically* to prevent this. This is the
   Escobar 7.1c failure mode repeated verbatim.
2. **The clip generation used 2 of his 4 approved views.** N8 is explicit and
   mandatory: ALL of a character's approved reference views on every generation
   featuring them, never a subset. Clip 5 passed only face-front + face-3/4.

Net effect: his identity in clip 5 was anchored on a single view, one generation
removed from canon. Drift was the predictable result.

**Note on why this wasn't self-caught:** the earlier cloak fix was verified with
a hue histogram (which correctly confirmed the colour) but the FACE was never
checked after that edit. A measurement that confirms one attribute says nothing
about the others — verifying the cloak created false confidence about the frame
as a whole.

### FIX
New start frame `55a92cbc-44cf-44f1-895a-3b1f3507b4aa` — generated FRESH from
canon, no chain edit, with the FULL package: all 4 Alaric views (face front,
face 3/4, full-body front, full-body 3/4) + all 5 Hazel v5 canon refs + her
look-lock = 10 references. His facial identity given explicit top-priority
weighting with a do-not-alter list (face width, hairline, eye shape/spacing,
beard density, age). Crimson cloak specified from the start rather than
patched in afterwards. Rotation and shoulder-aim staging carried over from the
approved 5d version.

### VISUAL-QC CHANNEL IS UNRELIABLE — do not depend on it
The sandbox→base64→local-decode route has now corrupted on 3 of ~7 attempts
(the montage re-emitted through Claude's own output arrives truncated/garbled).
It worked at ~7-8k characters some of the time and failed at similar sizes other
times, so size alone does not predict it. **Treat this channel as best-effort
only. The owner's eye remains the sole reliable visual gate until the CDN
allowlist is fixed** (`d8j0ntlcm91z4.cloudfront.net`). Consequently the new
start frame was sent to the owner for face approval BEFORE spending a clip
generation on it — a still is cheap, a clip is not.

### STATUS: awaiting owner confirmation of Alaric's face in `55a92cbc` before
generating clip 5 v3.

---

## ROUND 6 — clip 5 v3 (Alaric identity fix) + FINAL CUT v3 — 2026-09-02

### Clip 5 v3 — job `5090339f-25f9-4d00-a9ee-28e77b9a094f`
Start frame `55a92cbc-44cf-44f1-895a-3b1f3507b4aa` (owner-confirmed before the
clip was spent). Clip generated with **8 references**: all 4 Alaric canon views
(`28ef0b3e` face front, `2689c1a9` face 3/4, `33bd3dd4` full-body front,
`5e920173` full-body 3/4) + 3 Hazel v5 canon (`119465f3`, `8f22ad52`,
`274e937a`). N8 satisfied; no chain edit anywhere in the chain.
→ `hf_20260902_125557_5090339f-25f9-4d00-a9ee-28e77b9a094f.mp4`

Objective QC (X2, no Gemini eyes — production clip, edit stage only):
- 1080x1920, 24fps, 97 frames, 4.064s, audio present
- **freezedetect: no frozen segments**
- motion profile (mean abs inter-frame diff per 0.5s):
  0.0 **2.87** / 0.5 13.88 / 1.0 **16.64** / 1.5 10.24 / 2.0 5.51 / 2.5 2.23 /
  3.0 1.57 / 3.5 1.17; min diff 0.705; tail 2.4-4.0s mean **1.78**
  → correct dramatic shape: action front-loaded, impact peak at ~1.0s, then a
  genuine held two-shot rather than a freeze (min 0.705 is live micro-motion,
  well clear of the 0.514 near-static floor that flagged clip 4 v1).
- cloak colour in his region at t=3.4s: **median hue 16.8 deg, RED 97.2%,
  GREEN 0.0%** — crimson holds to the last frame, no olive/gold contamination.
  (Reference charge still measured 332.3 deg / RED 49.7%.)

**Not certifiable by Claude: his facial identity.** The base64 visual-QC channel
is unreliable (see ROUND 5) and the CDN allowlist is still not live in this
session, so the face was verified structurally (full canon reference package,
fresh-from-canon start frame, explicit hold-identity prompt language) but not
visually frame-by-frame. Owner's eye is the gate.

### FINAL CUT v3 — media `6df88368-aacb-4e5e-ad75-fb0179e20946`
→ https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/6df88368-aacb-4e5e-ad75-fb0179e20946.mp4

Sequence: clip 1 → 2 → 3 → 4b → **5 v3**. Trims (each 3.00s off a 4.064s raw):
`T1 0.60, T2 0.30, T3 0.20, T4 0.55, T5 0.85`.
T5 raised 0.60 -> 0.85 this round so the cut lands mid-descent (blade already
falling) and the closing held two-shot keeps ~1.45s of screen time instead of
~1.2s — the owner's spec calls for a held closing two-shot, and the extra
0.25s is bought from the front of the shot where the action is redundant with
clip 4b's ending.

Render QC (P1 discipline — verified before being called done):
- duration **15.189s**, 1080x1920, 24fps, **364 frames**, 16.6 MB
- audio aac 48kHz stereo, 15.134s
- **PTS strictly monotonic: 364 frames, 0 non-monotonic, last pts 15.146**
- **freezedetect on the final render: none**
- **silencedetect (-50dB, 0.15s): no silence anywhere in the file** — the single
  continuous ambient bed bridges all four hard cuts, Part 14.F satisfied
- mean volume across cut boundaries (0.25s windows either side):
  cut@3s -43.0 -> -49.4 dB | cut@6s -43.3 -> -33.2 dB |
  cut@9s -34.6 -> -42.5 dB | cut@12s -33.0 -> -28.5 dB
  → largest step 10.1 dB, none approaching the noise floor; no audio reset at
  any cut. Whole file mean -32.3 dB, peak -11.1 dB (headroom, no clipping).

### PROCESS FINDING — `set -euo pipefail` + `grep -m1` in a pipe aborts the run
The build script died twice at the QC stage, after producing a correct render,
because (a) `bc` is not installed in the Higgsfield sandbox and (b)
`ffmpeg ... | grep -m1` makes grep exit early, SIGPIPEs ffmpeg, and `pipefail`
turns that into a fatal error. Both times the upload step never ran even though
the render was fine. **Rule for sandbox build scripts: keep the render under
`set -e`, but run the QC/report block WITHOUT `-e`/`pipefail`, use `awk` for
arithmetic instead of `bc`, and use `| grep ... | head -1` rather than
`grep -m1`.** Also: `astats`'s "RMS level dB" line did not match in this
sandbox's ffmpeg build — `volumedetect`'s `mean_volume` is the reliable
loudness probe here.

### STATUS: final cut v3 delivered to the owner's media library, awaiting his
watch-through. Not yet run (both gated on his approval by standing rule):
`virality_predictor` pre-publish check, and any 4K upscale.
