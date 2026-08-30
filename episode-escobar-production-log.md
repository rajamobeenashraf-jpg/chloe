# Episode production log — "Visiting Pablo Escobar in 1987"

Branch: `claude/escobar-time-travel-video-87no8j` · Script: `episode-escobar-script.md` v3 (fact-fixed)
Playbook: `prompting-and-editing-playbook.md` · Engine: Seedance 2.5 omni_reference, 720p working res.

## Asset manifest (job IDs + URLs — the durable record; media files stay out of git)

### Hazel v5 expression additions (OWNER-APPROVED 2026-08-30; recorded in CHARACTER_LOCK.md)
| Asset | 2K job | 4K job |
|---|---|---|
| Laughing smile | `ad19f997-1cde-4485-8489-6cef74c2d398` | `3ba4ea27-5122-4de7-aece-c24a33208afe` |
| Sharp anger | `6651b1cb-d590-44f1-a02b-93be4501ccf2` | `d7ea2bd4-7c37-463e-914f-dba377a3a51c` |

Hazel reference package for every dialogue clip (7): v5 master `119465f3` + face front
`8f22ad52` + face 3/4 `274e937a` + full front `1a8133ee` + full 3/4 `17af1f93` +
smile 4K `3ba4ea27` + anger 4K `d7ea2bd4`. Voice lock `b24e5759-d3c0-4c84-a184-44f7cc65477e`.

### NPC castings (owner approved all 2026-08-30; Pablo pick delegated to Claude)
| Character | Decision | Job | URL suffix |
|---|---|---|---|
| **PABLO — candidate A** | **SELECTED ANCHOR (owner pick 2026-08-30, overriding Claude's B recommendation)** — warmer, rounder, more charming-host face | `b03141e0-70c8-408d-b651-80f4c8cb53b0` | hf_20260830_053123_b03141e0... |
| PABLO — candidate B | rejected by owner (Claude had recommended it for the calm-menace eyes) | `ad980571-e9a3-4df1-a1fc-47637fcabd99` | hf_20260830_053123_ad980571... |
| YOUNG PABLO (memory 4b) | approved | `97158bd2-3752-4ed8-978e-10669f86b8cd` | hf_20260830_053123_97158bd2... |
| ROSA | approved | `bd88ff09-39bf-4236-838c-125115752a7e` | hf_20260830_053123_bd88ff09... |

All casting URLs: `https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/<suffix>.png`

### Pablo voice lock (owner decision 2026-08-30)
Owner rejected the default Seedance-synthesized voice used in the first 7.1b takes ("I don't like his voice"). Rejected also: 4 Higgsfield `seed_audio` presets (Marcus, Cillian, Bram, Desmond) and 3 parameter-sculpted (pitch/rate-tuned) variants — all "bad." Owner asked specifically for a voice matching Pablo's real 1987 age (~37) with a genuine Colombian-accented English, referencing the Narcos-style portrayal. Researched the actual performance (reviews describe it as soft-spoken, restrained, "danger in his calm," never gravelly/theatrical — confirms our own already-scripted "almost gentle" direction for 7.1b). Sourced 3 real Colombian-accented English voices from ElevenLabs' library (age-labeled 35-45): AD-berto, JoseR, Nilton. **Owner picked Nilton** (`57Zk2fTHX6fnrs8DtTnO`, `eleven_multilingual_v2`) — "calm, secure, close" register.
**LOCKED per owner directive "use pacing per our lock rules":** Nilton sample (media `19a168b5-1e2c-4848-8e48-33299e2889b3`, ElevenLabs generation of "Everyone accepts something. Silver... or lead.") is the VOICE IDENTITY/TIMBRE lock reference for every future Pablo clip. Tempo/rhythm stays on the separately-measured Higgsfield `seed_audio` pacing reference (Holden rate +100, media `d3a2c3b9-f6eb-4074-b931-4c7a09d56fa5`, 162 wpm vs ~151 target) per the standing dual-reference method — both passed together in `audio_references` with distinct REFERENCE ROLES instructions (@Audio1 = timbre only, @Audio2 = tempo only). 7.1b regenerated on this basis, job `9d6471c6-806a-4b82-8275-b56e51f0e5be`.

### Pablo A view set (generated 2026-08-30 via N4 photo-edit from anchor `b03141e0`; nano_banana_pro 2K working res, NO 4K pre-approval; delivered to owner, AWAITING APPROVAL)
| View | Job |
|---|---|
| Face 3/4 (head turned ~25° right) | `f6f8abf5-1d1b-4f45-9552-ac07acd7b01c` |
| Laughing w/ teeth | `36fe7796-0242-4178-b4cd-75f90328d82f` |
| Full-body front, scene wardrobe (pale-blue open-collar shirt, dark slacks, white sneakers) | `2551890b-9a5f-46b9-b842-32bac956df19` |
| Full-body 3/4 (~35°) | `8a1c3727-8c0b-479c-a4ed-f6dea9ede202` |

URLs: `https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260830_1036xx_<job>.png` (face34+full both `103629`, laugh `103630`).

### Production clips (Part 1)
| Clip | Version | Job | Status |
|---|---|---|---|
| 7.1 "Silver… or lead" veranda two-shot (6s) | v1 (SUPERSEDED — pre-framing-fix, one continuous shot) | `a0dc4ef6-08a5-4618-8fab-28d7477ca5a9` | superseded, see 7.1a/7.1b below |
| 7.2 Congress memory wide (4s) | v1 (SUPERSEDED — read AI/unrealistic, uniform wardrobe, owner-flagged 2026-08-30) | `df15a5fc-1d15-493c-aec5-0810c0f616bd` | superseded, regeneration in progress |
| SEAM TEST 7.1→7.2 stitched hard cut (10s) | — | local `seam_test_71_72.mp4` (PyAV concat) | superseded (source clips regenerating) |

**LOG GAP NOTE (found 2026-08-30):** this table never recorded the "B"-choice split regeneration of 7.1 into 7.1a (waist-up two-shot) + 7.1b (dirty single) that fixed the framing-law-1 violation — that round happened but was never logged here. Not recoverable from this file; moving forward cleanly from this point.

### 7.1a / 7.1b — WARDROBE-LOCKED REGENERATION (2026-08-30, per owner "Fix")
Both regenerated with the full Hazel wardrobe still set (front `c404bef2`, 3/4 `1a4aad7d`) + Hazel master `119465f3` (identity backup) + Pablo A view set (face 3/4 `f6f8abf5`, full-body front `2551890b`) as image_references, plus fresh-measured seed_audio pacing refs (old truncated IDs `12184bc8`/`0f5bdf52` unrecoverable — regenerated):
- Hazel pacing: seed_audio Ainsley rate +20, wav imported as media `0dd512c0-3688-4b11-ada7-c572f710550f` (218 wpm vs 211 target, pass; duration 2.2s — a rate-35 take at 249wpm/1.93s duration was REJECTED by the Seedance backend with a 422, isolated by bisection to be too short for the audio_references minimum length, not a content issue).
- Pablo pacing: seed_audio Holden rate +100, wav imported as media `d3a2c3b9-f6eb-4074-b931-4c7a09d56fa5` (162 wpm vs ~151 original target, pass).
| Clip | Job | Notes |
|---|---|---|
| 7.1a waist-up two-shot (4s, clamped up from scripted 3s — Seedance minimum) | `0ba088b9-8e6a-4d57-ab89-fa4d41c9c651` | submitted, rendering |
| 7.1b dirty single (4s) | `b90c9b2e-43db-44d2-ad95-b4e77d89b8f4` | submitted, rendering (preset intercept "IN THE DARK" declined via `declined_preset_id:24bae836-2c4a-48e0-89b6-49fcc0b21612`) |
7.1c (Hazel's plain-language explainer, "Silver is money. Lead is a bullet.") has no prior generation on record — needs a first generation, not a wardrobe redo.

### 7.2 Congress memory — MAXIMUM-REALISM + ERA-ACCURACY REGENERATION (2026-08-30)
Per the two new permanent rules (maximum realism every scene; era-accurate wardrobe/environment for ALL characters), regenerated via start-frame-first method (N2: complex multi-figure crowd scenes render better as a still, then animated) rather than direct t2v. Researched the real location: Capitolio Nacional, Bogotá — Salón Elíptico (Elliptical Room), neoclassical "Republican" architecture, the chamber's own ceiling fresco.
| Asset | Job | Notes |
|---|---|---|
| Start frame v1 (nano_banana_pro/Gemini) | `f1d775cf-2801-4039-bd00-c15e652d0a54` | Delivered to owner for approval; varied period suits/hairstyles/mustaches on every man (fixes the identical-wardrobe finding), Salón Elíptico architecture, warm archival grade with film grain (fixes the AI-slop finding) |
Awaiting owner approval of this frame before animating into the 3s video clip (locked-off camera per script; deputies turning row by row is the only motion).

Pacing refs used on 7.1 (measured w/ faster-whisper before use): Hazel = seed_audio
Ainsley rate −10, job `12184bc8` (222 wpm vs 211 target, pass); Pablo = seed_audio
Holden rate +100, job `0f5bdf52` (151 wpm overall w/ pauses 0.36s+0.58s exactly on
"…Silver"/"or lead"; phonemes ≈250 — validated as her command-register pattern by
the Part 6 pacing study). eleven_v3 takes failed measurement twice (300/83 wpm) —
seed_audio fallback per standing rule.

### Hazel Part 1 dress options — ROUND 2 (day-visitor correction, owner feedback 2026-08-30)
Round 1 (party looks — champagne slip `3521877c`, emerald cocktail `f2051961`, white linen `33b6ec3d`) SUPERSEDED: owner correctly flagged the episode is a full-day VISIT (barrio, warehouse, lakeshore, veranda), not a party — look must be modern-luxurious casual-to-semi-formal day wear. Round 2 previews (delivered, owner to pick):
| Option | Job |
|---|---|
| 1 Ivory silk blouse + tan tailored trousers, gold hoops + chain, leather loafers | `a27934f4-17c5-4638-b1ef-a409ec23ce6d` |
| 2 Sage-olive belted linen shirt-dress, gold pendant + studs, white sneakers | `bf0dc815-1f98-473e-a2d9-80e557d7e1f8` |
| 3 White tailored blouse + terracotta midi skirt, pearl studs + gold bracelet, flat sandals | `15585b7f-5348-4ad1-8226-e34cc18b6718` |
Round 2 also declined (blouse+trousers too formal, shirt-dress too casual). ROUND 3 — elegant modern midi dresses (delivered, owner to pick):
| Option | Job |
|---|---|
| 1 Blush wrap midi, layered gold necklaces + hoops, tan block heels | `56717196-8f42-4fb0-afeb-dab9f2eee6c6` |
| 2 Champagne pleated midi, gold pendant + studs, nude strappy low heels | `7b989f6d-2cb9-4fd5-bcac-4e47ae05b1b3` |
| 3 Off-white square-neck midi w/ tonal embroidery, pearl-gold drops, cognac flats | `caff2909-a697-4fc0-b642-2ec9bea21f04` |
Owner picked OPTION 2 (champagne pleated midi) with "make it a bit sexy" — two elevated variants delivered: (A) V-neck thin straps + above-knee slit `ce228387-5002-4043-8d5c-3db556c83df5`; (B) cowl neck + thigh slit `388af5ee-eeb7-4835-bfb1-de672fa13044`. Owner then asked: new fabric + color, a little shorter. ROUND 4 delivered: (1) terracotta-rust liquid satin V-neck above-knee `590eafe7`; (2) deep teal matte crepe cowl knee sheath `37cf8d94`; (3) coral-pink silk charmeuse slip above-knee `0727c21b`. ROUND 5 (teal sheath refined: shorter above-knee, satin-back crepe, new colors): wine `e8f1a653`, ivory-cream `8f3ffea6`, midnight navy `6c44e18e`. ALL REJECTED — owner redirected (2026-08-30): wants an elegant/stylish/sexy dress FROM THE ERA (1987), i.e. Mode A era-costumed (playbook Part 13), not modern-from-2026. ROUND 6 — authentic 1987 looks (delivered, awaiting pick):
| Option | Job |
|---|---|
| 1 Crimson off-shoulder Alaïa-style bodycon (long sleeves, ruched, above-knee), gold door-knocker earrings + bangle stack, black patent slingback pumps | `88ed1c75-4de8-467e-b8cc-a663a3a6eb31` |
| 2 Ivory silk halter, draped Grecian bodice, gold-tone belt, above-knee, chunky gold hoops + layered chains, gold ankle-strap heeled sandals | `aeeff53c-0469-4c5d-9ff3-ed77d5bd2986` |
| 3 Emerald ruched-satin strapless sweetheart, sarong-draped hip, above-knee, gold-and-emerald teardrop earrings + gold cuff, metallic-gold pumps | `27fbf0b0-6e56-4ee5-8dc4-95b588b12de1` |
NOTE: era switch means Hazel is now era-costumed for Part 1 (her Mode A). The v8 script GLOBAL LOOKS block says "MODE A pending dress pick" — consistent; wardrobe freeze + still set proceed the same way once picked.

Owner picked OPTION 1 (crimson off-shoulder Alaïa-style bodycon), then asked for a color recommendation better suited to the episode. Claude recommendation: BLACK (Alaïa's own signature era color; contrasts cleanly against tropical greenery + carries the noon→night grade arc without a second look; keeps gold jewelry as the accent; avoids clashing w/ Pablo's pale-blue shirt; avoids the on-the-nose red=danger read). ROUND 7 — same silhouette, two color variants delivered (awaiting pick):
| Option | Job |
|---|---|
| Black (recommended) | `49f7a940-ef09-40b2-adb4-b35a88546dae` |
| Bronze-gold metallic (alt, leans into wealth theme) | `b8d82b11-7cb7-4bc2-a65f-522bf3cd26f4` |
Owner picked BLACK (agreed w/ recommendation). First styled pass (off-shoulder long-sleeve silhouette + soft waves + bronze-gold smoky eye, job `70dfd863-23ef-48bd-8e97-8ef921c2f40f`) REJECTED — owner asked for two more black options, "a little more sexy." ROUND 8 (delivered):
| Option | Job |
|---|---|
| A One-shoulder black satin, draped strap, ruched bodice, thigh-high slit, mid-thigh hem | `72b037c6-78bf-4c8c-814c-0164112397a7` |
| B Plunging black halter, waist keyhole cutout w/ gold chain, thigh slit | `d1baaf89-16f9-4e3a-9078-b301a8cc3964` |
**OWNER LOCKED: OPTION A (one-shoulder satin, thigh-high slit, black).** This is the final Part 1 dress silhouette/color.

Hair/makeup styling: sleek low chignon swept off the bare shoulder (job `72b037c6` dress ref) + first makeup pass (deeper bronze-copper smoky eye, berry lip, job `7d363a25`) REJECTED by owner in favor of a softer look → regenerated as SOFT GLAM (dewy skin, soft blended bronze eye, glossy juicy nude-rose lips, job `dcda5314`). Owner then flagged identity/realism drift on that pass — **process failure found and fixed**: only 2 of the 5 v5 canon refs were used (master + full-body front) and the identity description was paraphrased instead of the CHARACTER_LOCK.md frozen string verbatim, skipping both face-crop refs entirely. Corrected per new permanent rule PROMPT_LEARNINGS.md N7 (full 5-ref canon package + verbatim frozen identity string, mandatory on every Hazel generation, no exceptions for small iterations): identity-corrected pass `115e6498` (still had a rendering artifact — blotchy mark on thigh through the slit) → artifact-corrected final `c404bef2-a4cf-4e99-af9a-2af7c2efa656`. **This is the final approved-pending look: black one-shoulder satin dress w/ thigh-high slit + gold door-knocker earrings + gold bangles + sleek low chignon + soft-glam dewy makeup (soft bronze eye, glossy nude-rose lips).** **Owner APPROVED the final look ("ok continue", 2026-08-30).**

### WARDROBE STILL SET (Part 1 locked look — black one-shoulder satin)
Generated per N7 (all 5 canon refs + verbatim frozen identity string) + N4 photo-edit method:
| View | Job | Status |
|---|---|---|
| Full-body front | `c404bef2-a4cf-4e99-af9a-2af7c2efa656` | The approved final-look image itself; delivered |
| Full-body 3/4 (~35°) | `1a4aad7d-2bef-4db9-94ab-5c3d08595236` | Photo-edit of the front; delivered, awaiting approval |
Claude QC note on the 3/4: identity/look hold (chignon, jewelry, shoes, dress); hem reads a touch longer (at-knee) than the front still (above-knee) under the turned pose — flagged as supplementary info, owner's call whether it matters. On approval: these 2 stills join the reference package of EVERY Part 1 Hazel clip (N3), then regenerate 7.1a/7.1b/7.2 in the locked look. No 4K upscale until owner approval per the 4K sequencing rule.
Hair/makeup styled after pick. On lock: generate the WARDROBE STILL SET (full front + full 3/4 in the locked look, via N4 photo-edit) → owner approval → those stills join the reference package of EVERY Part 1 clip (N3: costume stills beat text). Knock-on: existing clips regenerate to match.

### Validation/test clips
| Asset | Job | Notes |
|---|---|---|
| Elizabeth-reel recreation test v1 (12s) | `42662376-ed9f-4746-b6e0-4be3c30596a2` | Delivered 2026-08-30; S13 template validation; owner viewed |

## Approvals ledger
- 2026-08-30: owner approved ALL FIVE script decisions (memory flashbacks / third-person coverage / banner / 2:37 runtime / age-word handling + expression-view additions).
- 2026-08-30: owner approved both Hazel expression stills → 4K → canon.
- 2026-08-30: owner approved all castings; delegated Pablo A/B pick → B selected.
- Fact fixes applied to script v3: mother quote (documented version), Lara timeline ("Months later").

## Owner decisions 2026-08-30 (series-scoped)
- **Captions = her style for both parts:** NO speaker tags (owner override of the
  locked [Speaker]-tag rule, these episodes) + karaoke GOLD active-word highlight.
- **EDIT-STAGE REMINDER (do not skip):** when Part 1 enters the edit, ask the owner
  about the optional "P.S." secondary overlay on shot 3.4 ("p.s. the hippos matter
  later"). He asked to be reminded.
- Reflection shots executed her way (not a risk class); rifle-hook filter fallback
  = grip-only, owner consulted first.
- **Part 1 reveal moved to the START (owner order 2026-08-30, script v6):** Hazel
  tells Pablo in shot 1.4, at gunpoint, that she's from the future and knows how
  his story ends. Knock-ons applied: 1.5 (amused disbelief), 2.1 aside ("He
  doesn't believe me yet. He will."), Scene 10 reworked — cliffhanger is now HIM
  believing her ("…But you already know. You've known all day."), same closing
  question + smash to black. Awaiting owner approval of v6 beats.
- **Cliffhanger question now ANSWERED + PORTAL DEVICE locked (owner directive
  2026-08-30, Part 1 v6.1 / Part 2 v3):** Pablo answers "Show me." → Hazel: "Okay.
  Let's go." → she opens the time portal (locked series device: vertical seam of
  warm golden light, flames bend toward it, deep hum + sub-drop) → Part 1 ends on
  them stepping TOWARD it; Part 2 frame one = them stepping INTO it, then the
  light-hidden morph to 2026. Part 2's return (8.1–8.2) uses the same device.
  Part 1 runtime ~144s.
- **Portal design + Part 2 hook decided from HER footage (2026-08-30, owner
  delegated the decision):** two focused re-watch jobs (Socrates `job_495ee9a3`,
  Joan `job_48a3971c`) established her transition grammar — forward jumps are
  hard cuts (no portal), the golden oval-ring portal is her RETURN device, and
  openings are in media res with the first line at 0:00–0:02. Applied: Part 1
  ends on her exact portal (2026 visible through the center, they walk in →
  black); Part 2 v4 opens on Pablo's stunned close-up in 2026 daylight + Joan
  tilt-reveal (morph oner CUT — no era-morph generation needed); Part 2's return
  uses the same portal spec. PORTAL LOCK written into the Part 1 script; full
  measured spec in `part2-bringing-to-future-study.md`. Part 2 runtime ~114s.
- **Portal UPGRADED beyond her design (owner directive 2026-08-30: "be more
  creative, more magical than her portals"):** our locked device now adds, over
  her static pre-made ring — (1) a BIRTH: single golden spark from Hazel's palm
  that unzips the air and blooms into the ring; (2) a rim of counter-rotating
  clock-sweep ember currents + concentric heat-haze ripples; (3) the
  destination's own time of day SPILLING through the hole (2026 daylight pouring
  into the 1987 night; 1987 firelight into the 2026 dusk on return); (4) the
  world leaning in — flames bend, dust/leaves/moths stream toward it, water
  ripples, hair drifts; (5) diegetic time-bend sound (nearby music slows and
  deepens + huge slow clock-tick; total silence on crossing; ring collapses back
  to its spark). Part 1 10.7 split into 10.7 birth + 10.8 entry (runtime ~147s).
  Feasibility fallback recorded in the lock: if the see-through center won't
  render cleanly, opaque golden blaze with the light-spill kept — decided at the
  portal TEST render, owner call. NEXT-STEPS ADDITION: a portal validation test
  clip (Gemini-eyes-eligible as a test asset) before any production portal shot.
- **"Silver or lead" clarified to owner + plain-language explainer restored as new
  shot 7.1b** ({Hazel: "Silver is money. Lead is a bullet."}) per the standing
  plain-language rule — the owner himself asked what "lead" meant, proving the
  line needed the explainer.

- **HAZEL STYLING DIRECTIVE (owner, 2026-08-30, series-wide):** Hazel appears
  PROPERLY DRESSED UP in every episode — she came from 2026: visible tasteful
  makeup ON (identity + realism intact — face lock untouchable), jewelry, era-
  appropriate-yet-modern outfit with shoes, and a DIFFERENT HAIRSTYLE each
  episode (bronde color locked; style varies: down/waves/updo/ponytail/braid
  etc.), modeled on the reference creator's own per-era styling. This refines the
  earlier lip-tint-only episode convention (owner's call). Styling specifics per
  episode get owner approval at the look-design stage; wardrobe/environment
  doctrine incoming from the 10-video study (playbook Part 13 when written).

## Next steps (in order)
1. Pablo view set derived from casting B via photo-edit (face 3/4, laughing expression w/ teeth, full-body front in scene wardrobe, full-body 3/4) → owner approval.
2. Rosa + Young Pablo secondary views only if their clips need them (each appears once).
3. SEAM TEST: clips 6a+6b (present → memory hard cut) generated as two job-split clips, stitched with the existing pipeline, delivered to owner — proves the her-style cut.
4. On seam approval: shoot clips in order, ⛓-chaining end frames; every clip delivered on render; pacing refs generated + measured per clip; Pablo voice lock extracted from his first approved clip.
