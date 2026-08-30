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
  question + smash to black. Runtime ~138s. Awaiting owner approval of v6 beats.
- **"Silver or lead" clarified to owner + plain-language explainer restored as new
  shot 7.1b** ({Hazel: "Silver is money. Lead is a bullet."}) per the standing
  plain-language rule — the owner himself asked what "lead" meant, proving the
  line needed the explainer.

## Next steps (in order)
1. Pablo view set derived from casting B via photo-edit (face 3/4, laughing expression w/ teeth, full-body front in scene wardrobe, full-body 3/4) → owner approval.
2. Rosa + Young Pablo secondary views only if their clips need them (each appears once).
3. SEAM TEST: clips 6a+6b (present → memory hard cut) generated as two job-split clips, stitched with the existing pipeline, delivered to owner — proves the her-style cut.
4. On seam approval: shoot clips in order, ⛓-chaining end frames; every clip delivered on render; pacing refs generated + measured per clip; Pablo voice lock extracted from his first approved clip.
