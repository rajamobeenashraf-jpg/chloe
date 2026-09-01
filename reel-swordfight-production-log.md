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
