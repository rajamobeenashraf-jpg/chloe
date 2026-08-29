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
| S10 | **Paraphrasing the frozen ENVIRONMENT_BLOCK instead of pasting it verbatim silently collapses scale — this is a Claude prompting error, confirmed, not a model limitation.** On the multi-angle validation test, a condensed environment paragraph ("thousands in haze at the horizon") replaced the block's mandatory 3-tier layering line (10-15 foreground / dozens-hundreds midground / thousands background) — the result showed only ~6-7 riders at the point of contact, everyone else at a visible remove, not a full-army wave. 6a v2, which pasted the block verbatim, had no such problem. §7b.3 exists specifically to prevent this; it was violated by hand-writing a substitute instead of pasting. | multi-angle test `c0e238ea`, owner-flagged 2026-08-29 | 2026-08-29 |
| S11 | **Close/low-angle shots are the highest scale-risk framing and need an explicit depth-continuation line** ("the charge continues in depth behind these riders, rank after rank, receding into dust") — a close camera naturally reads as "the nearest few" unless told the mass continues beyond what's sharp. Compounds S10 when both are missing at once. | same as S10 | 2026-08-29 |
| S12 | **A true HEAD-ON reverse angle (camera facing directly down the line of an oncoming charge) cannot show formation DEPTH, no matter how the prompt is worded — this is camera geometry, not a prompting gap.** Riders directly behind other riders are occluded along the sightline; depth-continuation language (S11) only produces a WIDER single rank, not stacked ranks, because stacked riders would be invisible from that angle anyway. Confirmed by direct frame comparison: 6a's SIDE-ON angle (roughly perpendicular to the charge) shows multiple offset, visibly stacked ranks receding diagonally — genuine depth; the head-on reverse test showed one wide rank + a small impact cluster, no second rank. **Rule: any reverse/new-angle shot that must ALSO read as a deep formation needs an OBLIQUE offset (angled diagonally, never dead-center facing the action) — never a pure head-on camera.** | test v1 `c0e238ea` vs test v2 `c5fdb474` vs 6a `63fa03dd`, owner-flagged and frame-verified 2026-08-29 | 2026-08-29 |

### nano_banana_pro (routes to nano_banana_2 — stills)
| # | Finding | Evidence | Date |
|---|---|---|---|
| N1 | Also ignores "no crests" negation on helmets (same failure as S3 — cross-model). Positive description required. | `9dc96a94` | 2026-08-29 |
| N4 | **PHOTO-EDIT beats fresh-render for angle coverage:** two fresh-rendered face-3/4s drifted to a different woman (`d6f10ddd`, `14acb9d5`, both owner-rejected) even with doubled refs; framing it as "PHOTO EDIT of the first reference — same photograph, head turned ~25°" held identity on the first try (`b70ab775`, owner-approved). Standard method for multi-view sets and any same-subject variation. | v5 canon build | 2026-08-29 |
| N5 | Multi-view identity drift is the norm, not the exception, when rendering fresh angles from refs: 4 of the first 6 v5 view renders drifted (full-bodies v1+v2, face-3/4 v1+v2). Budget for rejection rounds; owner's eye is the gate. | v5 canon build | 2026-08-29 |
| N6 | Incremental single-change iteration works cleanly on a same-face chain (glow → fair → pink → lips → freckles, 9 steps, identity held throughout when each step named "the ONLY change") — but big anatomical asks (eyes +20%) render subtler than requested; the model resists large feature shifts from a same-face ref. | Rounds 7–7i | 2026-08-29 |
| N2 | Executes complex two-army compositions with placement language well in a STILL (where Seedance t2v fails in motion) — which is why the start-frame method works. | `9dc96a94` | 2026-08-29 |
| N3 | Look/wardrobe drift risk in video is fixed by passing an approved costume STILL as a reference, not by longer text (text-only wardrobe drifted twice on Troy). | Troy log, clip-1 attempts | 2026-08 (Troy) |
| N7 | **Reference-image COUNT is itself a failure risk for stills, independent of language.** Clip 3's start-frame failed twice with no error detail at 14 refs (the `--still` mode's old default: 5 episode-costume + 5 canon-4K Hazel refs, stacked, plus 4 Alexander refs) and again at 4 refs (2 Hazel + 2 Alexander); it succeeded immediately at 2 refs (1 Hazel + 1 Alexander), no other prompt change made between the last two attempts. Consistent with N5's existing multi-view-drift caution and the Round 11 Clip 1 finding (2 refs succeeded where 3 failed) — this project's stills are more reliable with lean reference sets (~2 total) than with maximal identity coverage. `build_prompt.mjs --still` fixed to cap at 1 Hazel canon anchor + 1 per NPC (was stacking full sets). | Clip 3 still: `e19eead1` (14 refs, FAILED) → `9f34b458` (4 refs, FAILED) → `9a0a6328` (2 refs, SUCCESS) | 2026-08-29 |

### Cross-model
| # | Finding | Evidence | Date |
|---|---|---|---|
| X1 | Raw historical numbers in prompts do nothing useful; translated density language + layering is what renders scale. | brief §7b.6; all battle jobs | 2026-08 |
| X2 | Every video clip gets §26 freezedetect + frame-extraction QC before delivery notes; motion defects between frames need eyes (owner watch, or Gemini eyes on TEST clips — owner-approved exception 2026-08-29). | standing | — |
| X3 | `nano_banana_pro` silently defaults `resolution` to `2k` if the param is omitted — no warning. The owner's permanent 4K lock (2026-08-29) was missed on Clip 2's v2 start-frame still because that still was hand-assembled outside `build_prompt.mjs` (which only ever built video payloads) and the param was never typed. Fix: `build_prompt.mjs --clip N --still` now exists specifically so no start-frame still is ever hand-assembled again — it hardcodes `resolution:"4k"` and auto-includes `HAZEL_CANON_4K` alongside the episode-costume refs. Rule: any still generation NOT run through this path is itself the defect, regardless of what resolution param gets typed by hand. | Clip 2 still v2, job `4b927706` (2K, caught by owner); fixed via `upscale_image` to 4K, job `6fa1e2f1` | 2026-08-29 |

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

## EXTERNAL TOOLS OUT OF REACH — Angles 2.0 / SHOTS (owner standing rule, see CLAUDE.md)

Higgsfield's **Angles 2.0** (one photo → a directed new camera angle) and **SHOTS** (one photo → 9
AI-picked angle options) would materially help exactly the kind of angle-finding problem S12
describes — but both are website-only, verified unreachable from this environment (not in the
MCP `apps_search` registry; a sandboxed/local Playwright browser is always an anonymous session
with no path to the owner's login, confirmed 2026-08-29, regardless of browser engine).
**Permanent rule (owner lock 2026-08-29): whenever a shot would benefit from either tool, tell
the owner at the point the need arises — he runs it himself and sends back the result.** Never
silently work around this, never skip it. Full rule: `CLAUDE.md`.
