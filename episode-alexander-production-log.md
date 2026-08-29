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

**QC:** soft glam executed as briefed (soft neutral shadow, light liner/mascara, warm blush, luminous base with freckles showing through, glossy nude lips) — reads as real made-up skin, not plastic; open straight center-parted hair correct; no jewelry; straight-pin fibulae and hinged wax diptych both correct again. Identity holds. **Status: OPTION ONLY — not a lock. If the owner picks this look, it is recorded as his deliberate supersession of the lip-tint-only episode rule for this episode; if he picks the bare-faced half-bun (round 3b), the episode stays inside the standing rule. Decision pending.**
