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
| Pharaoh | `a2fa48f3` royal master (P3 face) | angle set to follow after owner view |
| Env plates | opening `f419b819` · aerial corridor `da9c958c` · corridor eye-level `0e32b90c` · chariot charge `64839885` | start_image / environment anchors |
| Superseded (never use) | Moses `ccb6e1cf`, `c71603f3` + `85a2096e`/`a6ba66fb`/`5aeca34c`; Pharaoh `11357887` + `f09de884`/`ddd20f4a`/`eeee3e41`; Pharaoh cands `f10060d5`, `6c46b72a`; Moses cand `954dd2a8`; Hazel options B `05fbaa73`, C `17415ca5` | |

## Cost
Seedance 1080p ≈ 9 credits/s (5s preflight = 45). Planned ~171s of clips ≈ 1,540 credits.

## Clip manifest
| Clip | Job | Status | Notes |
|---|---|---|---|
| 03 | `2e9975f1` | rendering | corridor push-in |
| 08 | `3570c2f1` | rendering | aerial corridor |
| 09 | `35def1e1` | rendering | chariot formation aerial |
| 10 | `d0b7534e` | rendering | crowd from behind |
| 11 | `8ad1a795` | rendering | aerial corridor 2 |
| 12 | `bb31fdf2` | rendering | mother + children |

Learnings: the Higgsfield "3D RENDER" preset intercept (`5a77643c`) fired on the whole first
batch — resubmitted with `declined_preset_id` (S7 confirmed again). Builder's ENV block made
adaptive (crowd/army paragraphs only when the shot contains them) so people-free plates don't
get people added.
