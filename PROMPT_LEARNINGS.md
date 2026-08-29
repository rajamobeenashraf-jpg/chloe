# PROMPT LEARNINGS — per-model ledger of verified obey/ignore evidence

**Purpose (owner-approved 2026-08-29):** every generation round teaches us what a model
actually obeys, ignores, or mangles. That knowledge prevents regenerations — but only if
it survives the session. This file is the ledger. **Update it after every generation round:**
one line per finding, with the job ID(s) as proof. Findings here are FACTS with evidence;
the EXTERNAL GUIDANCE section is documentation-derived and marked unverified until a
project generation confirms it.

Rule of use: consult this file at §9 stage 8 (prompt writing), before every prompt.

---

## VERIFIED IN THIS PROJECT (evidence = job IDs in the episode production logs)

### Seedance 2.5 (`seedance_2_5`)
| # | Finding | Evidence | Date |
|---|---|---|---|
| S1 | `t2v` mode IGNORES placement geometry ("wedge from frame-left striking a line right-of-center" rendered as two head-on columns). Text alone cannot place masses. | 6a v1 `a7ba2c6b` | 2026-08-29 |
| S2 | **Start-frame method WORKS:** lock composition in a still, generate via `omni_reference` — geometry, gear separation, and dust state all carried into motion. THE standard for hard-geometry shots. | still `9dc96a94` → 6a v2 `63fa03dd` | 2026-08-29 |
| S3 | Bare negation of fine costume detail is unreliable: "helmets WITHOUT crests / no crests" ignored. Describe the POSITIVE alternative instead (name the exact helmet type and shape); or fix it in the reference still — note the still generator ignored it too (see N1). | `9dc96a94`, `63fa03dd` | 2026-08-29 |
| S4 | Frozen ENVIRONMENT_BLOCK pasted verbatim → scale executed superbly (lines past frame edges, thousands, layered haze). Block-injection works; keep it mandatory. | `a7ba2c6b`, `63fa03dd` | 2026-08-29 |
| S5 | Clip-opening state is under-obeyed in t2v ("air ALREADY heavy with dust" → clean first second). Mitigation: bake the required state into the start still (v2 confirmed much better). | v1 vs v2 | 2026-08-29 |
| S6 | `omni_reference` coerces `start_image` role → `reference_images` (seen in params echo): the still acts as a strong composition anchor, not a guaranteed literal first frame. Expect adherence, not pixel-identity. | `63fa03dd` submit echo | 2026-08-29 |
| S7 | Preset intercept (`preset_recommendation`) on cinematic prompts → resubmit identically with `declined_preset_id`. | `a7ba2c6b` round | 2026-08-29 |
| S8 | `t2v` rejects reference media outright (422) — any refs require `mode:"omni_reference"`. | Constantinople §31 | 2026-08 |
| S9 | Multi-panel character-sheet GRIDS are rejected/harmful as references — single-view images only (2 full-body + 2 face crops per character). | §31 recipe | 2026-08 |

### nano_banana_pro (routes to nano_banana_2 — stills)
| # | Finding | Evidence | Date |
|---|---|---|---|
| N1 | Also ignores "no crests" negation on helmets (same failure as S3 — cross-model). Positive description required. | `9dc96a94` | 2026-08-29 |
| N2 | Executes complex two-army compositions with placement language well in a STILL (where Seedance t2v fails in motion) — which is why the start-frame method works. | `9dc96a94` | 2026-08-29 |
| N3 | Look/wardrobe drift risk in video is fixed by passing an approved costume STILL as a reference, not by longer text (text-only wardrobe drifted twice on Troy). | Troy log, clip-1 attempts | 2026-08 (Troy) |

### Cross-model
| # | Finding | Evidence | Date |
|---|---|---|---|
| X1 | Raw historical numbers in prompts do nothing useful; translated density language + layering is what renders scale. | brief §7b.6; all battle jobs | 2026-08 |
| X2 | Every video clip gets §26 freezedetect + frame-extraction QC before delivery notes; motion defects between frames need eyes (owner watch, or Gemini eyes on TEST clips — owner-approved exception 2026-08-29). | standing | — |

---

## EXTERNAL GUIDANCE — Seedance 2.5 official/community prompting (researched 2026-08-29; UNVERIFIED in-project until a generation confirms — promote items up to the verified table as evidence lands)

Sources: fal.ai's Seedance 2.5 prompting guide (fetched in full), plus search-level content from
Kapwing/OpenArt/Dreamina guides and the official BytePlus ModelArk guide (docs.byteplus.com —
egress-blocked in this environment; formula corroborated across multiple secondary sources).

1. **@-tag reference syntax (the official dialect we have NOT been using):** references are
   addressed in the prompt as `@Image1`, `@Video1`, `@Audio1`, in media order. Assign each ONE
   narrow job, with an explicit do-not-copy clause:
   `"@Image1 controls only [identity/wardrobe/environment]. Do not copy [pose, background, lighting, camera angle] from @Image1."`
   Never give two references overlapping jobs — reference conflicts degrade output fast.
2. **The full modular template** (fill selectively — a 2s action doesn't need all blocks):
   `FORMAT` (duration, AR, single take, real-time) → `REFERENCE ROLES` → `STARTING STATE` →
   `TIMELINE` (time-coded beats) → `CAMERA` → `CONTINUITY` (invariants) → `AUDIO` → `ENDING STATE` →
   `CONSTRAINTS` (negation list).
3. **Static camera official phrasing:** "The camera never moves." / "The camera holds a [position]."
   One camera instruction only — stacked moves ("dolly in while panning left…") produce jitter.
4. **Cause before reaction, always:** write contact → resulting movement → sound → reaction, in
   that order; otherwise reactions can precede causes or fire simultaneously crowd-wide.
5. **ENDING STATE matters:** name the exact final positions — prevents drift/aimless motion in the
   clip's tail.
6. **Constraint-list style negatives DO work at the action/structure level** (distinct from S3's
   fine-costume-detail failure): "No cuts, no slow motion, no repeated action, no duplicated
   props, no object teleportation, no music." Use for structure; use positive description for
   costume/appearance details.
7. **Duration is time, not events:** long durations with one small action turn into waiting,
   repetition, or slow motion. Match event density to duration; don't overstuff 6s either.
8. **Occlusion = reset risk:** anything that disappears behind an obstacle needs its identity,
   clothing, direction, and speed RESTATED for when it re-emerges.
9. **Iteration discipline:** when a result is mostly right, rewrite only the physical state where
   the bad action begins and where it should end — one controlled change per retry, never a
   full-prompt rewrite (mirrors §19's one-attempt-one-report cadence).
10. **Continuity chaining:** extract the FINAL FRAME of an approved clip and pass it as the image
    reference for the next clip's generation — strongest cross-clip world-state carry.
11. **Vague performance adjectives ("dynamic", "epic") are close to useless** — corroborates brief
    §11.10's observable-behavior rule.
12. **Dialogue blocking:** spoken lines in straight quotes with start/end times; name who speaks
    AND who keeps their mouth closed; block silence explicitly ("3–6s: she stops speaking…").
    Audio palette as a flat list ending with "no music" when silent-scored.

**Adoption plan:** the episode's `build_prompt.mjs` (pai-pro-tooling/alexander/) implements the
template order, @-tag reference roles, static-camera phrasing, constraint lists, and
cause-before-reaction structure. First production clip validates items 1–6 → promote to verified.
