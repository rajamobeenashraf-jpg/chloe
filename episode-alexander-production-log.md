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

## Round 8c — body update + face-3/4 photo-edit method (owner-directed 2026-08-29)

Owner: (a) "give her a more sexy body" → both full-body views regenerated with an hourglass figure spec (realistic, same casual wardrobe); (b) round-8b face 3/4 still mismatched → "try harder" → NEW METHOD: photo-EDIT of the approved face-front itself ("same photograph, head turned ~25°"), front image as dominant ref, master as identity check only.

| # | Item | Job ID | URL |
|---|---|---|---|
| AK | Full-body front v3 (updated figure) | `298ca6a2-b875-4cd3-b436-517e63a66075` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_034546_298ca6a2-b875-4cd3-b436-517e63a66075.png |
| AL | Full-body 3/4 v3 (updated figure) | `85ca9dda-026b-4748-b51c-00ee62e64aae` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_034546_85ca9dda-026b-4748-b51c-00ee62e64aae.png |
| AM | Face 3/4 v3 (photo-edit of approved front) | `b70ab775-ae1b-4a0e-afba-7df9ab3af9cd` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_034628_b70ab775-ae1b-4a0e-afba-7df9ab3af9cd.png |

Delivered per §20. Claude QC: the photo-edit face 3/4 is the closest identity match yet (same session look — brows/eyes/nose/lips/complexion/freckle trace all carried). Figure change reads subtly in the casual wardrobe (noted to owner: loose tee + straight jeans hide silhouette; fitted wardrobe would show it, his call). PROMPT_LEARNINGS candidate once owner confirms: photo-edit-of-approved-view beats fresh-render for angle coverage.

## Round 8d — full-body v4: taller + stronger figure (owner-directed 2026-08-29); face 3/4 APPROVED

- Owner APPROVED the photo-edit face 3/4 (`b70ab775`) — both face crops now locked in the v5 canon; photo-edit-of-approved-view confirmed as the angle-coverage method (promoted in CHARACTER_LOCK.md; PROMPT_LEARNINGS update pending with the full-body verdicts).
- Owner: height +2 inches + more pronounced figure → full-bodies regenerated at ~5'9" model stature, stronger hourglass, fitted wardrobe (fitted scoop top tucked into fitted high-waisted jeans, heeled sandals):

| # | Item | Job ID | URL |
|---|---|---|---|
| AN | Full-body front v4 (tall/hourglass) | `dc77b494-57bd-41d9-a129-7120dc46447d` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_035009_dc77b494-57bd-41d9-a129-7120dc46447d.png |
| AO | Full-body 3/4 v4 (tall/hourglass) | `1eb09f83-215a-4377-b806-d10a6cc3f9c4` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_035010_1eb09f83-215a-4377-b806-d10a6cc3f9c4.png |

Delivered per §20. Claude QC: taller/longer-legged reads clearly; waist-hip definition visible in the fitted wardrobe; faces at distance hold the v5 identity; realistic proportions maintained. AWAITING OWNER verdicts to complete the canon.

## Round 8e — full-body v5: figure pushed further via photo-edit (owner-directed 2026-08-29) + EDITING_HANDOFF.md created

- Owner: "make her figure more sexy" → both full-bodies re-done as PHOTO-EDITS of the approved-composition v4 pair (face/wardrobe/pose/setting held, figure accentuated): front `5f9b1a43-a3e9-482d-8465-5b0d19793d29`, 3/4 `270620f1-adc6-4a86-bfd8-149dcb8bdd92` (host d8j0ntlcm91z4, hf_20260829_035351_<job>.png). Delivered per §20, awaiting verdicts.
- Owner asked for a portable editing-rules file for another chat → `EDITING_HANDOFF.md` created at repo root (all edit-stage rules: gates, §16 cuts, §25/§15 sound+music, conform checklist, Gemini eyes, caption system, technical QC, assembly hygiene, pipeline order) and sent to him.

## Round 8f — full-body 3/4 APPROVED (2026-08-29, verified as Option A)

Owner approved the PREVIOUS round's full-body 3/4 (`1eb09f83`, tall/hourglass) after an explicit which-image verification; the figure-pushed 3/4 (`270620f1`) is set aside. v5 canon now: master ✓, face front ✓, face 3/4 ✓, full-body 3/4 ✓. Remaining: full-body FRONT verdict (candidates: `dc77b494` same round as the approved 3/4, or figure-pushed `5f9b1a43`).

## Round 8g — v5 CANON COMPLETE (2026-08-29)

Owner approved the full-body front `dc77b494` (tall/hourglass pair, matching the approved 3/4). **The v5 reference canon is COMPLETE: master `a49d8038` + face front `9bbdd985` + face 3/4 `b70ab775` + full-body front `dc77b494` + full-body 3/4 `1eb09f83`.** CHARACTER_LOCK.md updated (canon marked complete, figure/stature spec locked in); PROMPT_LEARNINGS.md updated with the confirmed methods (N4 photo-edit angle coverage, N5 drift-is-the-norm, N6 incremental chains).

**NEXT (needs owner §19 approval before submission): regenerate the Alexander episode's Hazel slate on the v5 face** — the current approved slate (look-lock `112a948e` + 4-view `72a8d0b5`/`e5eb360a`/`2e4a2d55`/`83df8574`) carries the v4 face and cannot be used for v5 clips. Proposal: (1) episode look-lock still — v5 face in the scribe chiton + episode soft-glam + open straight hair (photo-edit method from the v5 master); (2) the episode 4-view set from it (photo-edit method). ~5 stills total, each delivered per §20.

## Round 9 — Approach C step 1: v5 EPISODE LOOK-LOCK candidate (owner approved plan "go with C", 2026-08-29)

Photo-edit of the v5 master (`a49d8038`) into the episode scribe look.

| # | Item | Job ID | URL |
|---|---|---|---|
| AP | v5 episode look-lock (scribe costume) | `e11d6b64-70b0-4021-839c-69e519472d9a` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_040526_e11d6b64-70b0-4021-839c-69e519472d9a.png |

Delivered per §20. QC: identity holds against the v5 master (face/eyes/brows/lips/complexion/freckle trace all carried); chiton undyed coarse linen draping from both shoulders with straight-pin fibulae hardware at each shoulder; leather belt + satchel; hinged wooden diptych + bronze stylus; no jewelry; soft-glam + open hair per episode look. One period note reported: the belt closes with a modern-style frame buckle (ancient belts tied or hooked) — cosmetic, fixable in the next step's prompts or ignorable at owner's discretion. AWAITING OWNER approval before generating the four costume views.

## Round 9b — Approach C step 2: the four episode costume views (2026-08-29; look-lock `e11d6b64` APPROVED by owner, belt fix ordered)

Each view = photo-edit of an APPROVED canon view (wardrobe/background from the approved look-lock; belt corrected to TIED leather, no buckle; period flat sandals):

| # | View | Source canon view | Job ID | URL |
|---|---|---|---|---|
| AQ | Episode face front | `9bbdd985` | `81a91c73-2893-413b-b67f-2c4aaa5456ea` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_040815_81a91c73-2893-413b-b67f-2c4aaa5456ea.png |
| AR | Episode face 3/4 | `b70ab775` | `9885d19e-07b9-4e38-bb32-6b95ffe75e85` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_040816_9885d19e-07b9-4e38-bb32-6b95ffe75e85.png |
| AS | Episode full-body front | `dc77b494` | `64c0dbae-137b-4dc8-9be2-261b61758ff8` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_040815_64c0dbae-137b-4dc8-9be2-261b61758ff8.png |
| AT | Episode full-body 3/4 walking | `1eb09f83` | `319c14c7-13d9-408c-bcb0-76dd5bc7c67e` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_040816_319c14c7-13d9-408c-bcb0-76dd5bc7c67e.png |

Delivered per §20. QC vs anchors: identity holds on all four (each one edit from an approved image); chiton/straight-pin fibulae/satchel/wax diptych consistent with the look-lock; **belt fix LANDED — tied knotted leather with hanging end, no buckle, both full-bodies**; flat period strap sandals in both full-bodies; tent-interior backdrops. Note: full-body front's pose shifted from hand-on-hip to holding the tablet two-handed (scene-appropriate, flagged not fixed). AWAITING OWNER approvals — approval completes Hazel's v5 EPISODE reference package (look-lock + 4 views = the Seedance image_references payload for her clips).

## PRODUCTION START (owner: "all approved, start production" — 2026-08-29)

- **Hazel v5 EPISODE reference package APPROVED and wired into build_prompt.mjs:** look-lock `e11d6b64` + episode views `64c0dbae` (fullbody front), `319c14c7` (fullbody 3/4), `81a91c73` (face front), `9885d19e` (face 3/4). The v4-era episode set (112a948e + 4 views) is RETIRED.
- **Clip 6a is IN THE CAN**: the owner-approved validation v2 (`63fa03dd`) is production footage — 1080p, on-spec after the three fixes, approved after his watch. 11 clips remain: 1, 2, 3, 4, 5a, 5b, 5c, 6b, 7, 8, 9.
- **Production order:** script order, 1 → 9 (6a skipped). Per-clip package process (owner-approved improvement): each clip = ONE approval ask covering its start-frame still + the clip generation; §20 delivery per item; §19 for any regen attempt.

## VALIDATION TEST — video-reference re-angling (owner-requested, before Clip 1 package, 2026-08-29)

Per brief §8.2: "experimental and unproven: video-reference re-angling... permitted only after a dedicated validation test, never relied on blind." Owner asked for this test before production began. Design: clip 6a's approved footage (`63fa03dd`) as `video_references`, re-prompted for the SAME collision from the PERSIAN side facing the oncoming charge (reverse of 6a's Macedonian-side static frame) — a materially different, genuinely useful coverage angle if it works.

| # | Item | Job ID | URL |
|---|---|---|---|
| AU | Multi-angle validation test (Persian-side reverse of 6a) | `c0e238ea-eb79-4203-abb0-3656a5fe6798` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_042547_c0e238ea-eb79-4203-abb0-3656a5fe6798.mp4 |

Delivered per §20 (this is a TEST clip — owner's 2026-08-29 Gemini-eyes-on-test-clips exception applies if he wants a machine second opinion; not yet run).

**Claude QC (supplementary, frame-sampled):** freezedetect PASS (6.08s, no frozen stretches). Result reads as a COHERENT reverse angle of a wedge-vs-line collision: wide approach → closing → chaos (a shield thrown, a man airborne) → close impact with a mounted Macedonian rider filling the frame, shield up. Gear stays separated (wicker shields/turbans on the Persian/camera side; bronze+crimson, crested helmet on the charging side — crest recurrence again, consistent with learning S3/N1). One item flagged for the owner's own look: scattered dark particles in the air during the impact beat (frame ~4.5s) — read as dust/debris at still resolution, cannot rule out a blood-spatter read at video speed; owner's judgment governs §24 compliance here.

**Honest limitation of this QC:** whether this is TRULY "the same event, same timing, new angle" (the actual bar for the technique) vs. "a similarly-staged but independently-timed collision" is a motion-level judgment frame sampling cannot make with confidence. This is exactly the gap the owner's Gemini-eyes-on-test-clips exception exists for.

**Recommendation: ONE test is a promising data point, not full validation.** Per §8.2's own bar ("never relied on blind"), this single result should not yet authorize using the technique in any production clip. No episode clip currently plans to use it — the battle sequence (5a-6b) already achieves coverage via the safe toolkit (parallel action / inserts / cut-on-action / non-trackable same-moment), zero same-action-twice instances. AWAITING OWNER verdict: promising/needs more testing/reject, and whether to run Gemini eyes on this clip for a motion check.

## Owner root-cause request: why the multi-angle test under-delivered scale (2026-08-29)

Owner flagged: only ~6-7 riders visible clashing, rest of the army at a visible remove — not the full-wave attack the episode requires. **Diagnosed as a Claude prompting error, confirmed, not a model or technique limitation:**
1. The frozen ENVIRONMENT_BLOCK (§7b.3, mandatory verbatim in every battle prompt) was PARAPHRASED for this test instead of pasted verbatim — the 3-tier density-layering line (10-15 foreground / dozens-hundreds midground / thousands background) was dropped, replaced with only "thousands in haze at the horizon," which constrains nothing at close/mid range.
2. The chosen angle (low, close, facing the charge) is the highest-risk framing for scale and needed an explicit depth-continuation line ("the charge continues in depth behind these riders") that was never written.

6a v2 — the approved production clip — pasted the block verbatim and had no scale problem, confirming the block-injection rule works when actually followed. Logged as PROMPT_LEARNINGS S10/S11. Owner separately corrected Claude for not running Gemini eyes on the test clip proactively per the standing exception — acknowledged, Gemini eyes qc launched immediately (background, `gemini_qc/` output dir), no further instance to be treated as optional going forward.

## VALIDATION TEST v2 — corrected retest, scale issue fixed (owner-requested, 2026-08-29)

Same Persian-side reverse angle as the first test, this time with the frozen ENVIRONMENT_BLOCK pasted VERBATIM (per §7b.3, correcting the S10 error) plus a new explicit depth-continuation line for the close/low angle (S11 mitigation).

| # | Item | Job ID | URL |
|---|---|---|---|
| AV | Multi-angle validation test v2 (corrected, full-scale) | `c5fdb474-9b1c-4f55-84cd-17ec1f9ca85d` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_044442_c5fdb474-9b1c-4f55-84cd-17ec1f9ca85d.mp4 |

Delivered per §20. **Claude QC: MAJOR IMPROVEMENT — scale issue fixed.** Frame sampling shows a wide, full-frame-width Companion cavalry formation (~25-30+ riders across, not 6-7), extending into background haze with an implied larger mass beyond, dust rising off the full formation; the impact reads as a genuine multi-rider collision (weapons/shields flying, multiple points of contact) rather than a small clash. Freezedetect PASS (6.08s, no frozen stretches). This confirms S10/S11 as the correct, complete diagnosis — the verbatim-block + depth-continuation fix resolved the scale problem entirely.

**Gemini eyes qc queued on BOTH test clips** (first test still processing as of this entry — verify pass is slow on a full battle scene; v2 to be queued next) — findings to follow automatically per the owner's standing instruction, not held for a prompt.

## Gemini eyes results — both multi-angle validation tests (2026-08-29)

**Test v1 (uncorrected, `c0e238ea`): score 5.8/10.** 2 findings, 1 CONFIRMED: physics severity 3 at 00:03.200 — an infantry soldier launched unnaturally high/floaty off the impact. 1 DISMISSED (anatomy).

**Test v2 (corrected scale fix, `c5fdb474`): score 6.2/10.** 3 findings, 2 CONFIRMED: physics severity 3 at 00:04.000 (wicker shields launching with exaggerated weightlessness), anatomy severity 3 at 00:04.200 (lead horseman's sword-hand morphs/loses the weapon on impact). 1 unverified severity-2 edit note (dust obscures the resolution too abruptly).

**Neither score nor finding set blocks anything** — these are impact-physics artifacts typical of AI collision moments (also seen, unflagged, in approved 6a itself), not identity/geometry/scale failures. No CONFIRMED finding requires a regeneration under §19; noted for future prompting (impact-moment physics: weapon-hand and dropped-object weight).

## Root-cause: why the reverse angle still reads as "6-9 soldiers, no depth" despite the scale fix (owner-verified via frame comparison, 2026-08-29)

Owner correctly identified, and Claude confirmed by comparing 6a's frames against the reverse-angle test's frames side by side: **6a (side-on camera) shows genuine front-to-back depth — multiple distinct cavalry ranks stacked and offset, receding diagonally into frame. The reverse/head-on test shows one wide horizontal rank + a small impact cluster, no visible second/third rank behind it.**

**Cause: camera geometry, not a scale-prompting failure.** A camera facing directly down the line of an oncoming charge has riders standing behind other riders OCCLUDED along the sightline — depth is physically invisible from a true head-on angle regardless of how many riders exist in the scene or how the prompt is worded. 6a's original angle is roughly perpendicular to the charge's direction of travel, which is precisely why each rank is offset sideways and visible, producing the "wave" look. The depth-continuation prompt line (S11) partly worked but the model expressed it as a WIDER single line rather than stacked depth — consistent with this geometric limitation, not a prompting miss this time.

**New learning, promoted to PROMPT_LEARNINGS:** a true head-on reverse angle cannot convincingly show charge depth; an OBLIQUE offset (camera on the far side but angled diagonally, not dead-center) is required for any reverse-angle shot that also needs to read as a deep formation. Proposed as the next test, pending owner go-ahead.

## VALIDATION TEST v3 — oblique angle, DEPTH RECOVERED (owner-requested, 2026-08-29)

Camera repositioned to the Persian side but angled ~35° off dead-center (never facing the charge head-on), per S12's diagnosis.

| # | Item | Job ID | URL |
|---|---|---|---|
| AW | Multi-angle validation test v3 (oblique, depth recovered) | `08e82650-04b9-44a5-b9a2-0a5f30d9952b` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_050249_08e82650-04b9-44a5-b9a2-0a5f30d9952b.mp4 |

Delivered per §20. **Claude QC: SUCCESS — genuine multi-rank depth achieved, matching 6a's own quality.** Frame sampling shows multiple distinct, offset, visibly stacked cavalry ranks receding diagonally into the dust (not a flat single line); at the impact frame (~4.5s) a soldier is thrown clear amid a deep formation still visibly pressing forward behind the contact point. Freezedetect PASS (6.08s, no frozen stretches). Gemini eyes qc queued automatically (`gemini_qc_v3/`, background) — findings to follow without being asked.

**S12 hypothesis CONFIRMED by this result: oblique camera placement (never head-on) is the necessary and apparently sufficient condition for a reverse-angle shot to preserve formation depth.** Three-test validation arc complete: v1 (uncorrected scale, head-on) → v2 (corrected scale, head-on, depth still collapsed — proved it was geometry not density) → v3 (oblique, depth recovered — proved the fix). This is a genuinely useful, now well-understood technique for this episode's toolkit, still subject to the standing rule: any actual use in a production clip requires owner approval same as any other generation.

## Gemini eyes results — oblique test v3 (2026-08-29)

Score 5.5/10. 2 findings, both CONFIRMED: physics severity 3 at 00:01.800 (rear riders' spears clip through front-row cavalrymen/horses/heads while approaching — a direct side-effect of the new depth-stacking: more riders now overlap in frame, and clipping between them wasn't previously visible when depth was collapsed to one rank); physics severity 3 at 00:03.600 (defenders launched with floaty ragdoll physics on impact, same category as v1/v2's confirmed findings).

**Reading across all three tests' Gemini scores (v1 5.8 → v2 6.2 → v3 5.5):** scores are consistent with each other and don't penalize v3 for anything specific to the oblique technique — the spear-clipping finding is a new visibility of an old class of problem (multi-rider clipping), an expected cost of successfully adding depth/density, not evidence against the oblique-angle fix itself. No CONFIRMED finding on any of the three tests blocks anything or requires regeneration under §19.

## Round 10 — 4K canon upscale (permanent lock) + bitrate_mode/video_edit validation-first agreement + Angles 2.0/SHOTS standing rule (2026-08-29)

- **All 5 v5 canon images upscaled to 4K** via the dedicated `upscale_image` tool (deterministic, bytedance provider, no drift risk — content-identical to the approved originals, resolution only). Full-body front's first attempt (`bb9630e8`) failed; retried successfully as `1a8133ee`. **Owner directive: these 4K job IDs are now the PERMANENT reference set for all future v5 generations.** Recorded in CHARACTER_LOCK.md; `build_prompt.mjs` updated with a `HAZEL_CANON_4K` refs array.
- **Owner confirmed:** `bitrate_mode: "high"` and Seedance `video_edit` mode both get a validation test BEFORE any production reliance — same discipline as the multi-angle technique. Neither tested yet; queued for when next relevant (video_edit test candidate: 6a v2's confirmed shield-physics finding).
- **Web-app tools investigated (Higgsfield Angles 2.0, SHOTS, Zooms):** confirmed not reachable via MCP (absent from `apps_search`) and not reachable via any browser this environment can launch (Higgsfield cloud sandbox Playwright confirmed working but anonymous/unauthenticated — verified by loading the real Angles 2.0 page; no bridge exists from this environment to the owner's Higgsfield login regardless of browser engine, including a literal "use Google Chrome" request). **Owner permanent standing rule recorded in CLAUDE.md: whenever Claude judges a shot would benefit from Angles 2.0 (directed angle) or SHOTS (9 angle options), Claude tells the owner at the point the need arises — never substitutes a workaround, never skips it.** Owner runs the tool himself and sends the result back.

## Round 11 — CLIP 1 start-frame still (2026-08-29)

Two failures before success: v1 (`30645b6d`) and v2 (`14c05402`) both FAILED with no error detail returned — likely content-safety soft-block on "bare-chested/armed guards over a sleeping man" framing (matches the v4-era canon's documented "07_low_angle refused 3x" pattern). v3 succeeded after softening language (no "bare-chested," neutral "ceremonial watch" framing) AND dropping from 3 to 2 reference images (Hazel look-lock + Alexander only, episode-face-front ref removed).

| # | Item | Job ID | Status |
|---|---|---|---|
| — | Clip 1 start-frame v1 | `30645b6d-eece-4194-a35f-034db900b835` | FAILED, no error detail |
| — | Clip 1 start-frame v2 | `14c05402-8a1a-48e1-8cd0-730a4913312a` | FAILED, no error detail |
| AX | Clip 1 start-frame v3 (SUCCESS) | `adc48e39-903c-47c6-9119-d792a372d82c` | Delivered per §20 |

QC: Hazel identity holds (v5 face, chiton with straight-pin fibulae visible, selfie arm-reach with no phone); Alexander asleep on cot, tousled light-brown hair, consistent silhouette; two guards in bronze/crimson flanking, still and respectful; warm lamplight + brazier; tent canvas. One deviation noted: guards' spears not visible in this still (arms at sides) — acceptable for a still, can be restated in the video clip prompt if the owner wants them visible.

**New learning for the ledger:** multi-person night/sleep+guard compositions are a soft-block risk category (2 of 3 attempts failed with no error message) — simplify language and minimize reference-image count as the first-line fix before assuming content is impossible.

AWAITING OWNER approval on the start frame before generating the clip.

## Round 12 — CLIP 1 GENERATED (2026-08-29)

Generated from the approved start-frame still (`adc48e39`) via omni_reference, Hazel's episode refs for identity backup, 9s, 1080p, V-mode.

| # | Item | Job ID | URL |
|---|---|---|---|
| AY | Clip 1 v1 | `38a0ea72-971b-4fd9-a542-44b70181aa49` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_061217_38a0ea72-971b-4fd9-a542-44b70181aa49.mp4 |

Delivered per §20. QC: freezedetect PASS (9.06s, no frozen stretches); the glance-back-at-the-cot beat lands correctly around the 4-4.5s mark as scripted (profile turn toward Alexander, mid-line); the held deadpan close reads clean; Hazel identity, costume, and the still's composition (Alexander asleep, two guards flanking, lamplight/brazier) all held from the start frame through the full 9s; guards remained still throughout; no phone/rig ever visible. AWAITING OWNER verdict — this is CLIP 1 of 12 (6a already in the can; 10 remain after this one).

## Round 13 — CLIP 2 start-frame still (2026-08-29)

Composition: Parmenion (locked ref `3c6c04b3`) shaking Alexander (locked ref `86a6746d`) awake mid-shout, Hazel (v5 look-lock `e11d6b64`) in selfie framing at the front. Note: the prompt text's "second/third reference" labels were mismatched against the actual media order (Alexander was 2nd, Parmenion 3rd, but the prose described them swapped) — verified NOT an issue in the actual render: the model correctly matched each description (silver-grey/weathered vs. young/light-brown) to the right visual identity rather than following ordinal position. Flagged as a prompt-writing lesson: describe identity by DISTINGUISHING FEATURES, not by reference-image order, since order-based labels are error-prone to write and the model doesn't reliably need them anyway.

| # | Item | Job ID | URL |
|---|---|---|---|
| AZ | Clip 2 start-frame v1 | `bdc9a2d8-2e2b-44fa-a001-046af7db8c8e` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_063816_bdc9a2d8-2e2b-44fa-a001-046af7db8c8e.png |

Delivered per §20. QC: Hazel v5 identity holds; Parmenion reads as older/weathered/silver-grey per his lock, gripping Alexander's shoulder mid-shake; Alexander reads young/light-brown-haired, eyes opening, consistent with his lock. Tent/lamplight/brazier continuity with clip 1's world. AWAITING OWNER approval before generating the clip.

## Three-mode system adopted + Angles/SHOTS API research closed out (owner mandate 2026-08-29)

- **New mode: 3P ("third-person," owner-named)** — true external camera, Hazel included in frame. Now the PREFERRED third-person option whenever a scene needs one and Hazel could plausibly be present. **Nova narrowed** to a strict fallback: only when Hazel genuinely cannot be in the shot. Written into `cinematic-direction-brief.md` §1.
- **Clip 2 → 3P mode** (3-person scene, she's genuinely there). **Clip 8 → 3P mode** (owner's choice for the reunion beat). Both need Angles 2.0/SHOTS flagging before their tableau stills are finalized, per the standing rule.
- **Angles/SHOTS applicability corrected:** applies to ALL third-person shots (3P and Nova alike), not just 3P as first stated — the tool only cares that a shot is third-person, not whether Hazel is in frame. Candidates going forward: clips 2, 5a, 5c, 6b, 8.
- **Deep research closed out (owner-requested): confirmed via three independent sources — MCP apps registry, MCP models catalog, and Higgsfield's own official public SDK (github.com/higgsfield-ai/higgsfield-js, checked directly) — that Angles 2.0 and SHOTS have NO developer/API surface at all, for anyone, not just this session.** This is a platform gap, not a session limitation. Standing rule (Claude flags, owner runs it himself) remains the only path unless Higgsfield ships an API for these tools in the future.

## Mode assignments FINAL LOCKED (owner: "agreed", 2026-08-29)

Full per-clip mode table now recorded in `episode-alexander-production-breakdown.md`'s Mode Summary, decided by content ("whose experience is this beat for") not headcount. **One reversal from earlier in the session: Clip 8 moves from 3P back to V** — Claude's own recommendation, owner-agreed: it pays off Clip 2's running-gag plant (fumbled stylus → steady hand), and callbacks land hardest in the same register as the plant. Final: 1 V · 2 3P · 3 V · 4 V · 5a Nova · 5b V · 5c Nova · 6a Nova (shot) · 6b Nova · 7 V · 8 V · 9 V.

**Clip 2 correction in progress:** the existing start-frame still (`bdc9a2d8`) was built with first-person selfie POV framing — structurally incompatible with 3P (a real external camera, nobody's POV). The video job built on it (`81fb81a8`) is VOID — not to be delivered regardless of how it renders. Regenerating a proper 3P tableau still now.

## Round 13b — CLIP 2 start-frame still v2, corrected for 3P (2026-08-29)

`build_prompt.mjs` updated with a dedicated `THIRD_P_BLOCK` (was only V/Nova before — 3P had no prompt block of its own, which is how v1 ended up selfie-POV despite being labeled 3P). `clips.json` clip 2's `mode` field set to `"3P"`.

New still hand-composed as a genuine external-observer tableau (not run through `build_prompt.mjs`'s video path, same as v1 — the still stage is composition work, not the final video prompt): Parmenion (`3c6c04b3`) gripping Alexander's (`86a6746d`) shoulder mid-shout, Alexander half-risen from the cot reaching for his sword belt, Hazel (`e11d6b64`) a few steps back near the tent flap as a genuine bystander — watching, not narrating to any lens, hands empty. Explicit negative framing in the prompt: "NOT anyone's point-of-view, NOT a handheld selfie, NOT vlog framing, NOT arm's-length talk-to-lens."

| # | Item | Job ID | URL |
|---|---|---|---|
| BA | Clip 2 start-frame v2 (3P, SUCCESS) | `4b927706-2768-43a1-baae-497afdcff229` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_071330_4b927706-2768-43a1-baae-497afdcff229.png |

QC: genuine external framing achieved — all three figures visible together, Hazel reads as a bystander in the room (alert, arms empty, not addressing camera), Parmenion's urgency vs. Alexander's calm both land, tent/lamplight/brazier continuity with clip 1 holds. Identity: Parmenion silver-grey/weathered per lock; Alexander young/tousled-light-brown reaching for belt per lock; Hazel v5 look present though at a slight distance from camera (bystander blocking, by design). Delivered per §20 — sent to owner as the actual footage, no fix awaiting approval first. Flagged per the standing rule: this is a 3P shot, an Angles 2.0/SHOTS candidate (owner may run either himself on this composition before it's locked).

**Owner decision (2026-08-29): Angles 2.0/SHOTS parked for THIS EPISODE until the owner says otherwise.** Claude still flags candidate shots per the permanent standing rule (CLAUDE.md — that rule is not repealed), but does not wait on or pursue the tool further for Gaugamela; production proceeds straight through on Claude's own generations. Re-check this note before the standing rule's "tell the owner" step causes a stall on any later Gaugamela clip (5a, 5c, 6b, 8) — flag briefly in the log, then continue, no blocking ask. Clip 2 start-frame v2 (`4b927706`) approved on this basis — proceeding to the clip.

**Correction, same round — the 4K permanent lock was missed on `4b927706`:** it generated at nano_banana_pro's default `2k` (owner caught it, not Claude). Root cause was structural, not a memory lapse: `build_prompt.mjs` only ever built VIDEO payloads, so every start-frame still (Clip 1's, Clip 2's v1 and v2) was hand-assembled outside it, and the hand-written call for `4b927706` never set `resolution:"4k"`; separately, that call also used only `REFS.HAZEL` (2K episode-costume refs) rather than also including `HAZEL_CANON_4K`. Fixed two ways: (1) `4b927706` upscaled to 4K via the deterministic `upscale_image` tool (content-identical, no drift) → job `6fa1e2f1-dfbe-4cfa-8620-be62dd754680`, now the canonical Clip 2 start-frame asset; (2) `build_prompt.mjs` gained a `--still` mode (`node build_prompt.mjs --clip N --still`) that hardcodes `resolution:"4k"` and auto-includes `HAZEL_CANON_4K`, so no future start-frame still can be hand-assembled around the lock again — logged as PROMPT_LEARNINGS X3. `clips.json` clip 2 gained a `stillComposition` field carrying the composition text used. The in-flight Clip 2 video job (`2d29ec1d`, submitted using the 2K `4b927706` as start_image before this was caught) was left running rather than killed (jobs in flight aren't cancelable): the video's own output is 1080p, below either still resolution, so which one fed it makes no visible difference — 4K only matters for the still as a standalone/reference asset, which is now `6fa1e2f1`. Delivery/approval of the resulting clip still awaits the owner as normal.

**Owner permanent rule, locked immediately after (2026-08-29), written to `CLAUDE.md` and pushed to the default branch: approve-before-upscale, for every asset, every episode, forever.** Generate/deliver at working resolution → owner approval → only then upscale to 4K. Never generate directly at 4K, never upscale before approval, regardless of how confident the composition is. `build_prompt.mjs --still` updated to generate at `"2k"` (not `"4k"`) accordingly — the 4K upscale of an approved still is now always a distinct, separate, post-approval `upscale_image` call.

## Round 14 — CLIP 2 video, v1 GENERATED then VOIDED for pacing; v2 corrected (2026-08-29)

**v1 (`2d29ec1d`)**, generated from the corrected 3P still, QC-passed clean (9.06s, zero freeze events) and delivered. Owner review caught a real gap the QC pass couldn't: dialogue used only attitude parentheticals ("worked up," "half-amused," "brisk") with no explicit per-character speech tempo — §11.3's chain (emotion → physical state → speech behavior) was never translated into the prompt, so Alexander's own §32 lock ("unhurried, never rushed... in deliberate contrast to everyone around him") got overwritten by the scene's ambient urgency, and Hazel's written hesitation-beat ellipsis rendered as no pause at all. Root-caused in full (see chat) and used to write the MASTER RULE into `CLAUDE.md`. **v1 is superseded, not to be used.**

**v2 (`b002ae88`)**, owner-authorized regeneration ("regenerate clip two based on all the rules we have set, including the pacing"): `clips.json` clip 2's `dialogue` and `sound` fields rewritten with explicit, contrasted per-character tempo — Parmenion fast/clipped/breathless, Alexander markedly slower and unhurried even while his hands move fast (the contrast stated as the scene's actual performance point, sustained the full 9s, not just per-line), Hazel a full hesitation beat before a dry delivery. Start-image switched to the canonical 4K still (`6fa1e2f1`) per the upscale-sequencing rule. Template order and audio-reference role left untouched — the reorder and ElevenLabs-pacing proposals were parked by the owner for now, not applied.

| # | Item | Job ID | URL |
|---|---|---|---|
| BB | Clip 2 v2 (pacing-corrected) | `b002ae88-d542-4df9-b0ef-165052a2436f` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_083003_b002ae88-d542-4df9-b0ef-165052a2436f.mp4 |

QC: freezedetect PASS (9.056s, zero frozen stretches); 3P framing holds (all three visible externally, no POV) through the frames checked. Delivered per §20/immediate-delivery rule. Pacing itself is an audio/timing quality only verifiable by ear — not something a still-frame QC pass can confirm — so this is reported as delivered-for-review, not self-certified as fixed. AWAITING OWNER verdict.

**Owner verdict on v2: Parmenion's urgency landed correctly; Alexander and Hazel were still too fast.** This is a second consecutive miss on the identical instruction, this time with the tempo direction explicitly written into the prompt text (not the v1 gap of missing instructions entirely) — a materially different failure mode from v1's. Two credible causes distinguished in chat: (a) SCENE/TIMELINE/SOUND still carried general urgency language that may have competed with the per-line tempo instructions, or (b) Seedance may not reliably differentiate multi-speaker tempo from text alone within one continuous take, the same category of limitation as S12 (camera geometry). Per the regeneration-ask rule, checked in before a third attempt rather than iterating silently; owner chose **(b): revisit the ElevenLabs audio-reference approach**, previously proposed and parked.

## Round 15 — CLIP 2 v3: ElevenLabs per-character pacing references (2026-08-29)

Three short `eleven_v3` takes generated (direction-tag model, e.g. `[urgent, breathless]`, `[calm, unhurried, deliberate]`, `[hesitates, pause]`) as pacing-reference audio, one per speaking character, matching the same tempo direction written into the text prompt: Parmenion (voice `M5E055lOUxMi0kJpGyE9`, "Gravel Midnight") fast/clipped/urgent; Alexander (voice `1koyuv6vFWwrfTeqpDzq`, "Chris — Deep, Calm & smooth") markedly slower/unhurried; Hazel (voice `WbwwsO6cCyUItWWlHOKN`, "Cass — Podcast Energy") a hesitation beat then dry. Imported into Higgsfield storage and passed as three separate `audio_references` (`9e7db43a`, `cd0d08e6`, `360cef41`) alongside the unchanged image references and the unchanged v2 text-pacing instructions — this test layers the audio references ON TOP of the text approach rather than replacing it, and explicitly instructs the model to take tempo/rhythm from each audio reference, not just voice character (an explicit reversal, for this generation only, of the project's general "audio references control ONLY timbre" convention — untested whether Seedance actually supports rhythm transfer this way, or whether multiple audio_references get correctly attributed per-speaker at all). Template order and image-reference roles left unchanged.

| # | Item | Job ID |
|---|---|---|
| BC | Clip 2 v3 (ElevenLabs pacing refs) | `b2bec455-e3c8-4312-b1a5-9f1ce8672d6f` |

Generated successfully: https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_084654_b2bec455-e3c8-4312-b1a5-9f1ce8672d6f.mp4 — QC PASS (9.056s, zero freeze events), delivered per §20/immediate-delivery rule. AWAITING owner verdict on whether the audio pacing references actually moved the needle — this is a genuine experiment, not a verified fix; if it doesn't work either, that's stronger evidence toward a real Seedance multi-speaker-tempo limitation rather than a prompting gap.

**Owner verdict on v3: pacing itself was not flagged as a problem this time (implicit pass) — ElevenLabs pacing references locked as a new permanent standing rule in `CLAUDE.md` for every future dialogue clip, this episode and all others.** New issue found instead: Hazel is looking away from Alexander instead of at him during their exchange ("You write quickly?" / her answer) — confirmed by frame-pulling at 6.5s and 8.5s, both showing her eyes down on the tablet. Root cause: eyeline was never specified anywhere in the prompt — wardrobe, camera position, and dialogue text were all detailed, but nobody's gaze direction was ever stated. A fundamentals gap, not a subtle rule miss; owned directly, no deflection.

## Round 16 — CLIP 2 v4: explicit eyeline blocking (2026-08-29)

`clips.json` clip 2's `dialogue` and `camera` fields both updated: Alexander's eyes on Hazel when he addresses her; Hazel's eyes lift to meet his the instant he speaks to her and hold through her own answering line, glancing back to the tablet only after she finishes. Everything else held constant from v3 — same 3P start-frame, same text pacing instructions, same three ElevenLabs `audio_references` (Parmenion/Alexander/Hazel), same image identity references.

| # | Item | Job ID |
|---|---|---|
| BD | Clip 2 v4 (eyeline fix) | `bcc77689-28de-45a0-bf33-ee51c398111d` |

QC PASS (9.056s, zero freeze events), delivered per §20/immediate-delivery rule. **Self-verification this round (owner asked directly whether pacing was re-checked — it hadn't been): ran `tools/gemini-eyes/gemini_eyes.py ask` against clip2_v4.mp4 with a targeted per-character pacing question rather than relying on the owner's ear alone.** Result: Parmenion and Hazel's pacing matched intent; Alexander's was CONFIRMED still too fast/compressed ("squeezes three distinct thoughts into barely three seconds... lacks the heavy, deliberate weight") despite his ElevenLabs audio reference being present in the generation — proof that including a pacing reference isn't sufficient on its own if the reference take itself, or the model's adherence to it for that specific character, isn't strong enough. Eyeline also only partially landed: Alexander's improved (now visibly looking at Hazel), Hazel's did not (still down at the tablet through her own line).

**Owner clarification, important: pacing correctness is scene/character-appropriate, not "slower is always better."** Parmenion's fast/urgent delivery is correct and stays untouched — the only real complaint was Alexander specifically reading too fast relative to what his own §32 lock (unhurried, contrast to Parmenion) demands for this beat.

## Round 17 — CLIP 2 v5: stronger Alexander pacing reference + strengthened eyeline (2026-08-29)

Two isolated fixes, both owner-authorized ("prep v5 for both"):
1. **New Alexander ElevenLabs take** (voice `1koyuv6vFWwrfTeqpDzq`), explicit multi-second silent pauses written between each sentence rather than relying on adjective tags alone — rendered take is 10s vs. ~7.5s for the original, confirming genuinely slower delivery was captured. Imported as media `633261ea-a007-4d90-b146-157443b76182`, replacing `cd0d08e6` as the `@Audio2` reference. Parmenion's and Hazel's audio references (`9e7db43a`, `360cef41`) unchanged — their pacing already worked, not touched.
2. **Eyeline instructions rewritten again**, this time making Hazel's held eye contact the single most emphasized blocking detail in both `dialogue` and `camera` fields (explicit "MOST IMPORTANT/CRITICAL DETAIL" framing), and removing the "Hazel receiving the tablet at its edge" phrase from the CAMERA field's opening blocking list — it may have been anchoring her gaze downward as a competing instruction.

| # | Item | Job ID |
|---|---|---|
| BE | Clip 2 v5 (Alexander pacing retake + eyeline v2) | `e368ffbd-58ce-4a8b-9335-aaa91c0087d1` |

QC PASS (9.056s, zero freeze events), delivered per §20/immediate-delivery rule. **Gemini eyes self-check run before/alongside delivery this time (not after being asked):** neither fix landed. Alexander's pacing "remains fairly rapid, fluent, and continuous... not markedly slow or unhurried" despite the all-new, genuinely-paused (10s) audio reference — the reference's own pacing did not transfer into the render at all this attempt, not even partially. Hazel's eyeline is unchanged from v3/v4 — "looking straight down at the wax tablet... rather than looking up at Alexander's face" through both the address and her own answering line, despite the instruction being rewritten as the single most emphasized blocking detail in the prompt.

**Assessment:** both issues have now failed on two separate, substantively different, genuinely strengthened attempts each — the same pattern that made the camera-geometry finding (S12) credible as a real model limitation rather than a prompting gap. Likely explanations: (1) Seedance's `audio_references` may only carry voice timbre, not tempo, regardless of instruction — contradicting the hypothesis behind the ElevenLabs-pacing standing rule; (2) sustained held eye-contact-while-speaking for a secondary/background character during another character's dialogue beat may not be reliably executable from text alone in this model. No further regeneration attempted without a materially different approach — a sixth same-category attempt on either issue was judged unlikely to succeed. Owner reviewed and moved production forward ("continue to next clip") rather than pursuing a further attempt on Clip 2 for now — both issues remain open/unresolved on the current best version (v5), noted here for a future revisit rather than treated as silently accepted.

## Round 18 — CLIP 3 start-frame still (2026-08-29)

Applying the MASTER RULE checklist before generating: V-mode (her own lens, avoids the 3P eyeline-between-strangers problem class), single NPC (Alexander), eyeline and pacing written explicitly into `dialogue`/`camera` per §11.3 and the eyeline rule (Alexander's voice stays unhurried/economical independent of his body's physical urgency — no other character to contrast against here, unlike Clip 2; his eyes stay down on his gear except a brief glance at her on his exit line). `stillComposition` field added.

Three attempts on the still, same soft-block-with-no-error-detail pattern as Clip 1's Round 11: v1 (`e19eead1`, 14 references — the `--still` mode's old default of full episode-costume + full canon-4K Hazel sets stacked together, FAILED) → v2 (`9f34b458`, trimmed to 4 references, FAILED) → v3 (`9a0a6328`, trimmed to 2 references, SUCCESS). Logged as PROMPT_LEARNINGS N7: reference-image *count* is itself a failure risk, independent of language. `build_prompt.mjs --still` fixed to cap at 1 Hazel canon anchor + 1 per NPC by default (was stacking full sets) so this can't recur silently.

| # | Item | Job ID | URL |
|---|---|---|---|
| BF | Clip 3 start-frame still (SUCCESS) | `9a0a6328-93d9-43f7-bbea-367213a3b02c` | https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260829_101030_9a0a6328-93d9-43f7-bbea-367213a3b02c.png |

QC: Hazel identity holds (v5 face, freckles, hazel eyes), true selfie POV with no phone/rig visible, Alexander in background buckling his strap without looking up (per the eyeline instruction), worn scroll-case visible on the stool near the cot. One minor note, not treated as a defect: his hair reads slightly darker than "light-brown" under the dim tent lighting — likely grade, not identity drift. Delivered per §20. AWAITING OWNER approval before generating the clip.

**Owner verdict:** Clip 2 approved. Clip 3 still flagged for identity drift (Alexander's hair color) — regenerate.

## Round 19 — CLIP 3 start-frame v2: hair-color drift fix, new wardrobe drift introduced (2026-08-29)

Kept the lean 2-reference set (Hazel canon + Alexander) that fixed the earlier soft-block failures, swapped Alexander's reference to a closer face shot (`d80986c3`, face front) for tighter color lock, and added explicit anti-drift language compensating for the warm lamplight grade shifting perceived hair color darker.

| # | Item | Job ID |
|---|---|---|
| BG | Clip 3 start-frame v2 | `6712a698-6d26-4d16-ac9c-21c0e8446a16` |

**Self-QC (caught before presenting as fixed, not after):** Alexander's hair color corrected — reads as proper warm light-brown now. But NOT a clean pass: this regeneration introduced NEW drift on Hazel's side not present in v1 — her shoulder pins rendered as large ornate circular medallions instead of the locked "small plain straight-pin bronze fibulae," and her hair styled in a loose side-braid/wave instead of the locked straight center-part worn loose. One drift traded for another. Delivered with this caveat stated plainly, not presented as solved. Owner: "Create another."

**v3** (`391868a8-07f4-4fdc-9424-0195ac068a84`): added the episode look-lock ref (`e11d6b64`) alongside the canon/Alexander refs (3 total, up from 2 — untested territory per N7 but held), with explicit NOT-braided/NOT-ornate-medallion contrast language matching the technique that fixed Alexander's hair. Result: clean pass — hair color correct, shoulder pins back to small plain fibulae, hair straight/center-parted/loose as locked, scroll-case visible, both identities holding. **OWNER APPROVED.**
