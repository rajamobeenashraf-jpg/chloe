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
