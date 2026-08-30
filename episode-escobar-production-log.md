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
| PABLO — candidate A | rejected (smiles too openly; loses the calm-menace ambiguity) | `b03141e0-70c8-408d-b651-80f4c8cb53b0` | hf_20260830_053123_b03141e0... |
| **PABLO — candidate B** | **SELECTED ANCHOR** — heavy-lidded unreadable eyes, faint half-smile, "the menace is the calm" | `ad980571-e9a3-4df1-a1fc-47637fcabd99` | hf_20260830_053123_ad980571... |
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

## Next steps (in order)
1. Pablo view set derived from casting B via photo-edit (face 3/4, laughing expression w/ teeth, full-body front in scene wardrobe, full-body 3/4) → owner approval.
2. Rosa + Young Pablo secondary views only if their clips need them (each appears once).
3. SEAM TEST: clips 6a+6b (present → memory hard cut) generated as two job-split clips, stitched with the existing pipeline, delivered to owner — proves the her-style cut.
4. On seam approval: shoot clips in order, ⛓-chaining end frames; every clip delivered on render; pacing refs generated + measured per clip; Pablo voice lock extracted from his first approved clip.
