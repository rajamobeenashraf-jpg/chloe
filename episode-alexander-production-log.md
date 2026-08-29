# Alexander/Gaugamela — Production Log
**Branch: `claude/glory-versus-history-video-ducjh3` (session branch — pre-production; a dedicated production branch/project dir comes with the full shoot) · Engine: Higgsfield (nano_banana_pro → routes to nano_banana_2) for stills, Seedance 2.5 planned for video per brief §4 · Governing docs: `episode-alexander-gaugamela-script.md` (v9), `episode-alexander-production-breakdown.md`, `cinematic-direction-brief.md`.**

## Round 1 — casting + costume stills (2026-08-29)

First physical production step. Three stills, one batch, nano_banana_pro, 3:4:

| # | Subject | Job ID | URL |
|---|---|---|---|
| A | Alexander casting candidate A | `b0164db7-0170-4732-891c-ab9c3074109f` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_004812_b0164db7-0170-4732-891c-ab9c3074109f.png |
| B | Alexander casting candidate B | `cd19b57d-0032-4d86-ab53-58bb5222bb1e` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_004812_cd19b57d-0032-4d86-ab53-58bb5222bb1e.png |
| C | Hazel scribe costume v1 (refs: canonical 01_front_portrait + 09_fullbody_front + clip-9 movie frame, imported as media `711fc3d7` / `bf0b0660` / `621dd03d`) | `b438487e-81e4-4cbe-926a-2d83d6170a81` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_004812_b438487e-81e4-4cbe-926a-2d83d6170a81.png |

All three delivered to the owner in chat on creation (§20). Higgsfield balance before: 5,926.57 cr (Ultra).

**Casting decision (Claude's, per the 2026-08-29 authority rule — owner can veto):** **Candidate B is the Alexander casting lock candidate.** Rationale: B's face reads closer to the §32 lock ("unhurried, economical calm" — B carries quiet command; A reads as a weathered line soldier), and closer to classical Alexander iconography (the swept-back hair, the cleaner jaw). Note kept from A: its heavier grime/texture level is the finish target — B's skin is slightly too clean for the §13 matte/gritty bar and gets A's dust treatment in the reference-set generation pass.

**Hazel scribe v1 — QC findings (reported, NOT regenerated — §19 ask-first applies):**
1. **Visible glam eye makeup** (liner/mascara look) — violates the no-makeup/matte bar for episode content. (Known engine tendency — Troy fought this exact drift; the still model responded to negation there, so a regen with the Troy-proven contrastive language should fix it.)
2. **Gold hoop earrings** — not part of her locked identity (no earrings in any canonical ref); identity drift, must go.
3. Minor: the wax tablet renders as a plain board (no wax recess/frame); chiton pinned with ring-brooches rather than plain straight fibulae — both fixable in the same regen.
Identity otherwise strong: eyes, freckles, hair, skin tone all read correctly against Tier-1. **Awaiting owner's go-ahead to regenerate with the three fixes.**

**Next steps (in order):** owner verdicts on the three stills → Hazel v2 with fixes (on go-ahead) → Alexander's §31 4-image reference set derived from the approved casting look (2 full-body + 2 face crops, single-view each) → Parmenion + Bucephalus reference stills → the frozen ENVIRONMENT_BLOCK and §32 locks go into this episode's `run_clip` equivalent → Seedance validation test clip (recommend clip 6a, the locked impact — the hardest shot; if it generates well, everything easier will too).

## Round 2 — Hazel scribe v2 (2026-08-29, owner-approved regeneration)

Owner approved the three-fix regen. Same refs/model.

| # | Subject | Job ID | URL |
|---|---|---|---|
| D | Hazel scribe costume v2 | `20e835f7-eb6f-463f-96d7-68814df401c9` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_005719_20e835f7-eb6f-463f-96d7-68814df401c9.png |

**QC vs. the v1 findings:** all three fixed — no earrings (bare ears), proper hinged wax diptych (two leaves, raised frames, dark wax surface) + bronze stylus, straight-pin fibulae at both shoulders; glam eye makeup gone, eyes read bare/natural. Identity vs. Tier-1: hazel iris, freckles, bronde tied-back hair, golden-tan, brows all correct; matte finish holds. Delivered to owner; awaiting verdict. If approved, v2 is the scribe-costume lock for this episode.

**Also this round (story-editorial):** retention audit system adopted as brief §12 (four-audit gate before stage 8); AUDIT 1 run on script v9 and written into the script file — one fix applied from it (clip 3 armored with continuous motion + exit-into-momentum; classified the highest skip-risk beat, kept for clip 9's payoff).

## Round 3 — Alexander reference set, Parmenion, Bucephalus, Hazel hairstyle options (2026-08-29)

All nano_banana_pro, 3:4. Alexander's four derived from casting candidate B (job `cd19b57d`) as image reference, with candidate A's grime level as the finish target:

| # | Subject | Job ID | URL |
|---|---|---|---|
| E | Alexander ref — full-body front | `86a6746d-4cac-4eae-8665-faa1485279b4` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010110_86a6746d-4cac-4eae-8665-faa1485279b4.png |
| F | Alexander ref — full-body 3/4 | `df75706b-f13f-490b-b50c-f12a01782aee` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010110_df75706b-f13f-490b-b50c-f12a01782aee.png |
| G | Alexander ref — face front | `d80986c3-9e77-4d21-91d4-3e88a86da1ac` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010110_d80986c3-9e77-4d21-91d4-3e88a86da1ac.png |
| H | Alexander ref — face 3/4 | `4cc2a502-b478-45f6-bcfb-49b337708ec1` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010110_4cc2a502-b478-45f6-bcfb-49b337708ec1.png |
| I | Parmenion casting v1 | `3c6c04b3-54f4-4806-9fcf-34d781530bcd` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010110_3c6c04b3-54f4-4806-9fcf-34d781530bcd.png |
| J | Bucephalus ref v1 | `f47b67a6-9772-4809-ac4c-f6acaa6eda3b` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010110_f47b67a6-9772-4809-ac4c-f6acaa6eda3b.png |
| K | Hazel hairstyle option — low braid | `d3aa9df1-26e4-4f97-a299-97089c65155f` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010235_d3aa9df1-26e4-4f97-a299-97089c65155f.png |
| L | Hazel hairstyle option — low knot | `377dcc00-d19e-44d4-a878-9f1b71fab399` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010235_377dcc00-d19e-44d4-a878-9f1b71fab399.png |

**QC (all eight viewed at full res):**
- **Alexander 4-set: identity CONSISTENT across all four views** — same face as casting B (pale blue-grey eyes, swept-back light-brown hair, clean jaw), grime target applied, matte/documentary finish holds. **One accuracy flag, reported not regenerated (§19): both full-body views render modern-looking closed lace-up boots** — Macedonian krepides were open laced sandal-boots; fix at the video-prompt level (feet rarely in frame) or one regen of the two full-body refs if the owner wants it clean at the source.
- **Parmenion v1: PASS against his §32 lock** (silver-grey crop + beard, weathered lines, eyebrow scar, urgency in the face). Proposed as his casting lock.
- **Bucephalus v1: PASS** — near-black bay, broad forehead, period tack (no stirrups — correct, they didn't exist yet; no horseshoes), real anatomy. Ears alert rather than pinned; acceptable for a reference. Proposed as his lock.
- **Hazel hairstyles (owner asked mid-round; color/hairline stay locked, styling is open):** braid version — identity strong, bare eyes, no earrings, proper wax diptych; knot version — identity strong but the diptych interior lost its wax surface (bare wood). Both show ring-pins instead of straight fibulae at the shoulders (recurring minor drift, third occurrence — candidate fix: a dedicated fibula close-up reference, same pattern as Troy's waterskin ref). **My pick: the BRAID** — keeps her signature bronde hair visible for channel recognizability, period-practical, and it's the cleaner render. Owner may veto.

**Character reference status:** Alexander 4-set complete (pending owner reaction + boots decision) · Parmenion cast · Bucephalus cast · Hazel scribe costume v2 approved-pending with braid variant proposed as the final look. Next: owner verdicts → any fixes → frozen ENVIRONMENT_BLOCK + §32 locks into the episode's run_clip equivalent → Seedance validation test clip (6a recommended).

## Round 3b — owner hairstyle decision: HALF BUN, STRAIGHT HAIR (2026-08-29)

Owner overrode the braid recommendation mid-round: half-up bun with straight hair. Generated immediately:

| # | Subject | Job ID | URL |
|---|---|---|---|
| M | Hazel — half bun, straight hair (OWNER'S PICK) | `07fb3f58-c46a-4696-bd5d-573bc56c7e46` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_010615_07fb3f58-c46a-4696-bd5d-573bc56c7e46.png |

**QC: the strongest still of the whole set.** Half-up bun + straight lengths exactly as directed; bare eyes (no makeup), no jewelry; identity holds (hazel eyes, freckles, brows, lips, golden-tan); and notably the two recurring minor drifts BOTH resolved on this take — straight-pin fibulae render correctly at both shoulders, and the wax diptych shows proper hinged leaves with a dark wax surface. Delivered to owner. **Pending his confirmation, this image is Hazel's scribe-look lock for the episode** (it would also serve as the wardrobe/hair reference passed to every Seedance clip alongside her identity refs, per §31).

## Round 3c — owner look exploration: soft glam + open straight hair (2026-08-29)

Owner then asked for soft glam makeup with open straight hair. **Conflict flagged to him in chat BEFORE generating, per the deviation rule:** the standing episode rule (owner-locked 2026-08-23, CONTENT_SHEET/CHARACTER_LOCK) is lip-tint-only in episodes — glam belongs to the lifestyle pipeline — and glam on a 331 BC war-camp scribe is prime anachronism-comment bait (§13 realism bar / the craft-study's #1 attack vector). Generated anyway as an option for his eyes-open decision, using the lifestyle pipeline's own sheer-glam language to keep the skin real:

| # | Subject | Job ID | URL |
|---|---|---|---|
| N | Hazel — soft glam, open straight hair (OPTION, conflicts with episode makeup lock) | `112a948e-1410-4cfc-b1cb-a6ec6169211a` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_011017_112a948e-1410-4cfc-b1cb-a6ec6169211a.png |

**QC:** soft glam executed as briefed (soft neutral shadow, light liner/mascara, warm blush, luminous base with freckles showing through, glossy nude lips) — reads as real made-up skin, not plastic; open straight center-parted hair correct; no jewelry; straight-pin fibulae and hinged wax diptych both correct again. Identity holds.

**OWNER LOCK (2026-08-29): the soft-glam open-straight-hair look IS Hazel's look for this episode.** This is the owner's deliberate, eyes-open supersession of the lip-tint-only episode makeup rule (locked 2026-08-23) FOR THIS EPISODE — the conflict and the anachronism risk were flagged to him in chat before he decided. The standing rule remains in force for other episodes unless he says otherwise. Job `112a948e` is the look-lock image.

## Round 4 — Hazel's episode character sheet: the §31 4-view reference set (2026-08-29, owner-requested)

Owner asked for her character sheet after locking the look. Per §31.1, NOT a multi-panel grid (grids are forbidden as Seedance references) — the "character sheet" in this pipeline is a 4-image single-view set: 2 full-body + 2 face crops of the locked look. Refs per image: the look-lock still (`112a948e`, as look anchor — the Troy-proven approved-costume-still method, NOT identity chaining) + canonical identity refs `711fc3d7` + `621dd03d`. nano_banana_pro, 3:4.

| # | View | Job ID | URL |
|---|---|---|---|
| O | Full-body front | `72a8d0b5-19e0-4514-a6a1-9d3bfafa7d84` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_011432_72a8d0b5-19e0-4514-a6a1-9d3bfafa7d84.png |
| P | Full-body 3/4 walking | `e5eb360a-c0c6-4409-b88e-87dcf907faab` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_011432_e5eb360a-c0c6-4409-b88e-87dcf907faab.png |
| Q | Face close-up front | `2e4a2d55-21bb-42c6-b4c0-264f1244d9da` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_011432_2e4a2d55-21bb-42c6-b4c0-264f1244d9da.png |
| R | Face close-up 3/4 | `83df8574-0a74-440e-b706-365ac396bbc3` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_011432_83df8574-0a74-440e-b706-365ac396bbc3.png |

**QC (all four viewed at full res): PASS as a set.** Look consistent across all views — soft glam with freckles through the base, glossy nude lips, open straight center-parted bronde hair, chiton + straight-pin fibulae + belt/satchel + wax diptych; identity holds against Tier-1 (hazel eyes, brows, jawline); footwear rendered as period strappy sandals in both full-body views (no modern-shoe drift — Alexander's set still carries that flag, hers doesn't). Real skin texture at close range on both face crops.

**Hazel's episode reference package is COMPLETE: look-lock still (`112a948e`) + this 4-view set = the `image_references` payload for every Seedance clip she appears in, per §31.** Delivered to owner. Remaining before the Seedance test clip: owner's verdicts on Alexander's set (incl. the boots flag), Parmenion, and Bucephalus.

## Round 5 — FIRST VIDEO GENERATION: Seedance 2.5 validation test clip (clip 6a), 2026-08-29, owner-approved

Owner approvals landing this round, all recorded 2026-08-29: **Alexander 4-view set APPROVED as-is** (boots flag resolved at video-prompt level — every Alexander clip prompt states period footwear/greaves; no still regen), **Parmenion APPROVED**, **Bucephalus APPROVED**, and **test-clip generation APPROVED** ("all approved, generate the test clip"). Also this round: §14 multi-model protocol committed to the brief (`86b739d`) — two mandatory asks (regeneration + model switch), approval-before-test-clip, nothing generated without approval.

Test shot: **clip 6a** (the impact — hardest scale shot first). Seedance 2.5, `t2v` (no-character Nova shot — no refs needed), 6s, 1080p, 9:16, audio on. Prompt = §36 locked-camera constraint + action/composition per breakdown + frozen ENVIRONMENT_BLOCK verbatim + FULL BATTLE inherited-state line + §37b grade + 3-layer sound line. Preset intercept ("IN THE DARK") declined via `declined_preset_id` per §31.

| # | Clip | Job ID | URL |
|---|---|---|---|
| S | 6a impact, test v1 | `a7ba2c6b-2ccf-4e21-a3b1-0bd06e38ca06` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_015350_a7ba2c6b-2ccf-4e21-a3b1-0bd06e38ca06.mp4 |

**Delivered to owner per §20 immediately on completion (6.3MB, sent uncompressed — ffmpeg absent from this container; restored via imageio-ffmpeg static binary for QC).**

**QC findings (supplementary per §20 — reported after delivery, owner's watch decides):**
- §26 freezedetect: **PASS** (no frozen stretches; 6.08s, 1080×1920/24fps, HEVC, audio present).
- Scale QC (a) both lines exceed frame edges: **PASS**. (b) population cannot read as <100: **PASS** — thousands, layered, horizon haze. (c) dust matches FULL BATTLE stage: **PARTIAL** — opening ~1s reads too clean in the foreground (dust mostly at distance); heavy dust arrives with the collision. Inherited-state line under-obeyed at the head of the clip.
- Environment/grade: flat pale-ochre plain, haze-white sky, bleached grade, slate-grey dust — **matches the ENVIRONMENT_BLOCK closely**. Genuinely spectacular scale.
- Geometry vs. spec: **DEVIATION** — rendered as two opposing columns charging head-on down a central corridor and colliding mid-frame, not the specified wedge-from-frame-left striking a line right-of-center with the break propagating outward. Impact and buckling DO read; the L→R screen-direction map and "break propagates from one point" do not.
- §33 gear separation: **AT RISK** — attacking cavalry reads closer to Roman-legionary styling (crested helmets) than Companion cavalry; the two sides' gear converges in the melee frames; no visibly varied Persian contingents/scythed chariots.
- §24: compliant — mass action, nothing graphic.

**Assessment for the validation question (is Seedance 2.5 fit to carry the episode): YES on scale, atmosphere, grade, and impact energy — the engine's ceiling is clearly high enough. The misses (opening dust state, wedge geometry, gear specificity) are prompt-level, not engine-level: mitigations for a v2 would be a generated start_image locking the composition, stronger negative/positive gear language, and a harder opening-state line. Per §19, NO v2 has been submitted — owner's verdict on v1 decides.**

## Round 6 — clip 6a v2: the three approved fixes via the start-frame method (2026-08-29, owner-approved "v2 with the three fixes")

Method: composition locked in a still first (nano_banana_pro), then Seedance 2.5 `omni_reference` generating from it. Also this round: §15 audio system committed to the brief — all clip prompts stay music-free (score is an edit-stage element).

| # | Item | Job ID | URL |
|---|---|---|---|
| T | 6a v2 start frame (composition lock still) | `9dc96a94-f13f-4210-9233-99bc14870e7a` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_021021_9dc96a94-f13f-4210-9233-99bc14870e7a.png |
| U | 6a impact, test v2 | `63fa03dd-935b-4936-9990-cb8bfd5a9fc6` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_021157_63fa03dd-935b-4936-9990-cb8bfd5a9fc6.mp4 |

Both delivered to owner per §20 on creation.

**QC v2 (supplementary — owner's watch decides):**
- §26 freezedetect: **PASS** (6.08s, no frozen stretches).
- Fix 1 geometry: **FIXED** — wedge enters frame-left, L→R, strikes the Persian line right-of-center; a defender thrown airborne at contact; the break propagates from the contact point while the further line holds. Screen-direction map obeyed.
- Fix 2 gear separation (§33): **FIXED** — sides fully distinct end-to-end: bronze/crimson cavalry vs. wicker spara shields, turbans, scale armor, patterned fabrics, visibly varied contingents. Residual cosmetic note: helmet crests persisted through BOTH generators despite "no crests" (reads Greek, not Roman — acceptable; logged as a learned model-disobedience).
- Fix 3 opening dust: **LARGELY FIXED** — haze present from frame one incl. midground; foreground at 0.0–0.5s still moderately clean (better than v1).
- Scale QC: (a) line past frame edges PASS · (b) population reads as thousands PASS · (c) dust matches FULL BATTLE stage PASS (with the minor opening-foreground note).

**VALIDATED METHOD (for all future hard-geometry shots): still-first composition lock → omni_reference video. t2v alone demonstrably ignores placement geometry; a locked start frame enforces it.**

## Round 6 verdicts + tooling round (2026-08-29)

- **6a v2 (`63fa03dd`) OWNER-APPROVED. Seedance 2.5 validation COMPLETE — the engine is validated for this episode's production.** The start-frame method (still `9dc96a94` → omni_reference) is the validated standard for hard-geometry shots.
- **Owner-approved QC exception: Gemini eyes may run on VALIDATION/TEST clips at generation stage** (production clips stay edit-stage-only). Recorded in CLAUDE.md's QC section.
- **Prompt-infrastructure round (owner: "start all three"):**
  1. `PROMPT_LEARNINGS.md` created — per-model verified obey/ignore ledger (9 Seedance findings, 3 nano_banana, seeded from today's jobs) + the researched Seedance 2.5 official prompt dialect (@-tag reference roles, modular template, static-camera phrasing, cause-before-reaction, constraint lists, ending states, occlusion restatement, final-frame chaining). Standing rule: update after every generation round; consult at §9 stage 8.
  2. Seedance 2.5 prompting research done (fal.ai guide in full + corroborating sources; official BytePlus doc egress-blocked — formula corroborated via secondaries). Distilled into the learnings file.
  3. `pai-pro-tooling/alexander/build_prompt.mjs` + `clips.json` built (the Troy pattern adapted for the MCP workflow): assembles each clip's full prompt from frozen blocks (Hazel v4 identity string + episode-look lock, §32 NPC locks verbatim, ENVIRONMENT_BLOCK, V/Nova mode blocks, §37b grades) + per-clip fields, in the researched template order, with @-tag reference roles and the media list auto-built from which characters appear. Smoke-tested on 6a and 2. All 12 clips populated from the approved script; stage-8 rule: finalize each clip's timeline/states against the breakdown before generation.

## Round 7 — HAZEL v5 CASTING (owner decision 2026-08-29: Option B, eyes-open supersession of the v4 identity lock; Option A generated alongside for comparison at owner request)

Owner chose to redesign Hazel prettier/cuter (Option B) after the costs were flagged (v4 lock, published-episode continuity, reference-set rebuild); also asked for Option A (within-lock) in the same round. Scoring + queue decisions: both explicitly left open by owner ("leave both"). Four candidates, nano_banana_pro 3:4, all under the realism hard rule; A/B1/B2 used canonical v4 refs, B3 fresh cast:

| # | Candidate | Job ID | URL |
|---|---|---|---|
| V | A — identity untouched, max-cute styling only | `69e03d7a-e228-4408-8508-1911981357eb` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_024241_69e03d7a-e228-4408-8508-1911981357eb.png |
| W | B1 — subtle beautification (same woman, best day) | `1eadc1fb-0b45-4610-89c0-80dc571902b8` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_024241_1eadc1fb-0b45-4610-89c0-80dc571902b8.png |
| X | B2 — cute evolution (bigger doe eyes, softer face) | `e5868b86-9a46-4d5e-82c7-7fcff5cfeaaf` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_024241_e5868b86-9a46-4d5e-82c7-7fcff5cfeaaf.png |
| Y | B3 — fresh max-cute cast (new face, brand markers kept) | `3fc4b9e7-6062-4af1-9028-26a2a4bd1685` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_024241_3fc4b9e7-6062-4af1-9028-26a2a4bd1685.png |

All four delivered to owner per §20. QC: realism bar PASSES on all four (real skin, freckles, no plastic). A/B1 hold v4 identity closely; B2 reads as her cuter sister (bigger eyes, heavier lashes, denser freckles); B3 is a distinctly different, softer, rounder-faced woman — girl-next-door cute, casual selfie energy. AWAITING OWNER PICK. NOTE: no lock changes made — CHARACTER_LOCK.md stays v4 until the owner locks a winner; if a B candidate wins, a v5 lock document + new 20-image-class reference canon + re-shot 4-view sets are required before any episode generation uses the new face, and the Alexander episode's approved Hazel slate would need regeneration under §19 gates.

## Round 7b — B2 chosen as the v5 direction; glow iteration (owner-requested 2026-08-29)

Owner picked B2 ("cute evolution") and asked for fresher, more glowing skin. B2 v2 generated with B2 (`e5868b86`) as identity ref; glow written as real hydrated-skin luminosity with freckles/pores explicitly preserved (anti-plastic clauses hard).

| # | Item | Job ID | URL |
|---|---|---|---|
| Z | Hazel v5 candidate — B2 v2, fresh glowing skin | `8b2e8360-8b70-49ce-9aa5-438b7419a64b` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_025303_8b2e8360-8b70-49ce-9aa5-438b7419a64b.png |

Delivered per §20. QC: identity holds from B2 (doe eyes, brows, denser freckles, lips, bronde hair); glow executed as luminous hydrated finish, freckles and texture clearly retained — passes the realism bar. Notes reported to owner: complexion reads warmer/more golden than B2 v1; expression straight-on vs B2's head tilt. AWAITING OWNER: lock as the v5 face, or iterate.

## Round 7c — B2 v3: complexion adjustment (owner-directed 2026-08-29)

Owner direction: freckles −30%, complexion +30% toward white, +15% pink. Rendered from B2 v2 (`8b2e8360`) as identity ref.

| # | Item | Job ID | URL |
|---|---|---|---|
| AA | Hazel v5 candidate — B2 v3 fair+pink | `258d55c9-5b2c-4dd1-9881-b8ff58be531e` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_025616_258d55c9-5b2c-4dd1-9881-b8ff58be531e.png |

Delivered per §20. QC: all three shifts executed (sparser/fainter freckles, lighter fair tone, rosy-pink flush); identity held; realism intact. Reported to owner: golden-hour light masks some of the fairness — neutral daylight render offered. AWAITING OWNER: lock as v5 or iterate.

## Round 7d — B2 v4: six owner-verified adjustments (2026-08-29; changes verified back to owner before generating, per his instruction)

Owner-confirmed spec: eyes +20% and BLUE (sky-blue chosen; hazel brand-marker change flagged and confirmed deliberately), freckles −20% more, complexion +15% fairer, pink +10% more, lips +5% fuller. Rendered from B2 v3 (`258d55c9`) as identity ref.

| # | Item | Job ID | URL |
|---|---|---|---|
| AB | Hazel v5 candidate — B2 v4 blue-eyed fair | `5f209b8c-bb1b-4e02-bba3-86de578d632c` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_030250_5f209b8c-bb1b-4e02-bba3-86de578d632c.png |

Delivered per §20. QC: blue executed as natural sky-blue with limbal ring; freckles now a faint trace; distinctly fairer with rosy flush; lips subtly fuller; realism intact. Honest note reported: the eye ENLARGEMENT reads subtler than 20% (models resist large anatomical shifts from a same-face reference) — offered a stronger push if wanted. AWAITING OWNER: lock as v5 or iterate.

## Round 7e — B2 v5: owner-verified refinement on the v3 base (2026-08-29; v4 blue-eye variant REJECTED by owner, discarded)

Owner rolled back to B2 v3 as base (hazel eyes, original size — v4's blue/bigger eyes and fuller lips all discarded) and confirmed: freckles −10% more, complexion +5% fairer, pink +5% more, lips same size but 10% pinker. Rendered from v3 (`258d55c9`) as identity ref.

| # | Item | Job ID | URL |
|---|---|---|---|
| AC | Hazel v5 candidate — B2 v5 refined | `0f1db5cd-b037-49b4-a31e-2b1dd2b7ba78` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_031202_0f1db5cd-b037-49b4-a31e-2b1dd2b7ba78.png |

Delivered per §20. QC: hazel eyes preserved at correct size; freckles now faint-sparse; slightly fairer with a touch more rosy flush; lips unchanged in size with a pinker rose tint; realism intact. AWAITING OWNER: lock as the v5 face or iterate.

## Round 7f — B2 v6: +10% fairness on the verbally-locked v5 (owner pause + iteration, 2026-08-29)

Owner said "lock it" on B2 v5 (`0f1db5cd`), then "stop" before any lock-document change was made (CHARACTER_LOCK.md untouched, still v4), then directed one more change: complexion +10% fairer, all else identical.

| # | Item | Job ID | URL |
|---|---|---|---|
| AD | Hazel v5 candidate — B2 v6, fairer | `2edb908c-d179-453d-97ae-2806fb5f07c4` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_032017_2edb908c-d179-453d-97ae-2806fb5f07c4.png |

Delivered per §20. QC: visibly fairer with the rosy flush preserved; identity, freckle trace, hazel eyes, lips all held; realism intact. AWAITING OWNER: lock v6 (or re-lock v5) — no lock-document change until the pick is final.

## Round 7g — B2 v7: natural bare-pink lips + freckles −5% (owner-directed 2026-08-29)

From v6 (`2edb908c`): lipstick/gloss look removed — bare natural-pink lips with real lip texture; freckles softened another ~5%.

| # | Item | Job ID | URL |
|---|---|---|---|
| AE | Hazel v5 candidate — B2 v7, natural lips | `b6906b4d-bf59-4556-a17d-122d0c481e41` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_032537_b6906b4d-bf59-4556-a17d-122d0c481e41.png |

Delivered per §20. QC: lips now read as bare natural pink with visible lip texture (no lacquer shine); freckles a delicate faint trace; identity, fair rosy complexion, hazel eyes all held; realism intact. AWAITING OWNER pick; CHARACTER_LOCK.md still v4, untouched.

## Round 7h — B2 v8: pinkness −5%, lips +5% pinker, freckles −5% (owner-directed 2026-08-29)

From v7 (`b6906b4d`).

| # | Item | Job ID | URL |
|---|---|---|---|
| AF | Hazel v5 candidate — B2 v8 | `3a397a9b-4c9f-4323-a260-b4989d321781` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_032853_3a397a9b-4c9f-4323-a260-b4989d321781.png |

Delivered per §20. QC: cheek flush softened a touch; lips a shade pinker, still bare/natural with texture; freckles now the faintest near-subliminal trace (noted to owner: one more reduction effectively removes this brand marker); identity and realism intact. AWAITING OWNER pick; CHARACTER_LOCK.md still v4.

## Round 7i — B2 v9: forehead freckles −50% (owner-directed 2026-08-29)

From v8 (`3a397a9b`): forehead-specific freckle reduction; nose/cheek trace preserved.

| # | Item | Job ID | URL |
|---|---|---|---|
| AG | Hazel v5 candidate — B2 v9, clear forehead | `a49d8038-a424-4c35-8d50-dd37ee8b44ec` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_033134_a49d8038-a424-4c35-8d50-dd37ee8b44ec.png |

Delivered per §20. QC: forehead now mostly clear with real skin texture (not airbrushed); nose/cheek trace intact; identity, complexion, lips, hazel eyes all held; realism intact. AWAITING OWNER pick; CHARACTER_LOCK.md still v4.

## Round 8 — HAZEL v5 LOCKED ("lock v9", 2026-08-29) + changeover executed

- **v5 face LOCKED: B2 v9, job `a49d8038`.** CHARACTER_LOCK.md rewritten: v5 section with new frozen identity string (fair rosy complexion, bare natural-pink lips, faint freckle trace/clear forehead, larger doe eyes, hazel + bronde retained), full decision trail referenced, blue-eyed variant recorded as REJECTED, v4 canon ARCHIVED for back-catalog only. CLAUDE.md pointer updated to v5.
- **v5 4-view set generated and delivered** (see CHARACTER_LOCK.md for jobs/QC): full-body front `a7f5576b`, full-body 3/4 `3ac7a1e2`, face front `9bbdd985`, face 3/4 `d6f10ddd`. Awaiting owner approval to enter the canon.
- **Consequence for this episode (pending owner):** the approved episode Hazel slate (look-lock `112a948e` + 4-view `72a8d0b5`/`e5eb360a`/`2e4a2d55`/`83df8574`) carries the v4 face and must be REGENERATED on v5 (scribe costume + episode soft-glam look) before any Hazel clip shoots — per §19, that regeneration will be proposed and owner-approved before submission.

## Round 8b — v5 4-view set: owner flagged identity drift; three views regenerated (2026-08-29, §19 approval given)

Owner verdict on the first 4-view set: face-front (`9bbdd985`) MATCHES and is kept; the other three views drifted. Regeneration approved and submitted with a doubled anchor (v9 master `a49d8038` + approved face-front `9bbdd985` as joint refs) and per-feature identity-match language:

| # | View (regen) | Job ID | URL |
|---|---|---|---|
| AH | Full-body front v2 | `d11a4b69-9add-45f3-aa27-5ee0e51872c8` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_034112_d11a4b69-9add-45f3-aa27-5ee0e51872c8.png |
| AI | Full-body 3/4 v2 | `eaa1e93e-9bbe-4c8b-8753-2b176edef525` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_034112_eaa1e93e-9bbe-4c8b-8753-2b176edef525.png |
| AJ | Face 3/4 v2 (gentler angle, both eyes visible) | `14acb9d5-2288-4913-8140-55576839902a` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_034112_14acb9d5-2288-4913-8140-55576839902a.png |

Delivered per §20. Learnings entry pending owner verdict: doubled-anchor method (master + one approved view) as the standard fix for multi-view identity drift.
