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

| S13 | **First full live use of the EXTERNAL-GUIDANCE template (items 1–6) succeeded on one try:** @-tag REFERENCE ROLES with narrow jobs + do-not-copy clauses across 8 refs (5 Hazel v5 image refs + 3 audio refs: voice-identity lock for timbre, 2 measured ElevenLabs pacing takes for per-character tempo), FORMAT→ROLES→STARTING STATE→time-coded TIMELINE→one-move CAMERA→CONTINUITY→AUDIO→ENDING STATE→CONSTRAINTS order, cause-before-reaction (release ON "release her"). Rendered a 12s two-character dialogue confrontation (the cosminacreates Elizabeth-reel recreation test) with correct scene composition, both character designs, guard populated, ending state honored, zero frozen frames. Also re-confirmed S7 (preset intercept fired, declined) and S8 (422 without mode:"omni_reference"). Items 1–6 can be treated as project-verified for dialogue scenes; owner verdict on identity/pacing fidelity pending. | test `42662376-ed9f-4746-b6e0-4be3c30596a2`, 2026-08-30 | 2026-08-30 |

### nano_banana_pro (routes to nano_banana_2 — stills)
| # | Finding | Evidence | Date |
|---|---|---|---|
| N1 | Also ignores "no crests" negation on helmets (same failure as S3 — cross-model). Positive description required. | `9dc96a94` | 2026-08-29 |
| N4 | **PHOTO-EDIT beats fresh-render for angle coverage:** two fresh-rendered face-3/4s drifted to a different woman (`d6f10ddd`, `14acb9d5`, both owner-rejected) even with doubled refs; framing it as "PHOTO EDIT of the first reference — same photograph, head turned ~25°" held identity on the first try (`b70ab775`, owner-approved). Standard method for multi-view sets and any same-subject variation. | v5 canon build | 2026-08-29 |
| N5 | Multi-view identity drift is the norm, not the exception, when rendering fresh angles from refs: 4 of the first 6 v5 view renders drifted (full-bodies v1+v2, face-3/4 v1+v2). Budget for rejection rounds; owner's eye is the gate. | v5 canon build | 2026-08-29 |
| N6 | Incremental single-change iteration works cleanly on a same-face chain (glow → fair → pink → lips → freckles, 9 steps, identity held throughout when each step named "the ONLY change") — but big anatomical asks (eyes +20%) render subtler than requested; the model resists large feature shifts from a same-face ref. | Rounds 7–7i | 2026-08-29 |
| N2 | Executes complex two-army compositions with placement language well in a STILL (where Seedance t2v fails in motion) — which is why the start-frame method works. | `9dc96a94` | 2026-08-29 |
| N3 | Look/wardrobe drift risk in video is fixed by passing an approved costume STILL as a reference, not by longer text (text-only wardrobe drifted twice on Troy). | Troy log, clip-1 attempts | 2026-08 (Troy) |
| N7 | **PERMANENT, MANDATORY, no exceptions — full identity-lock package required on EVERY Hazel generation, including quick wardrobe/makeup iterations.** Found on the Escobar dress-styling round (2026-08-30): styling passes used only 2 of the 5 canon refs (master + full-body front) and a paraphrased identity description, skipping both face-crop refs (`8f22ad52` front, `274e937a` 3/4) and the verbatim frozen identity string entirely — owner caught the resulting identity/realism drift directly. The face-crop refs are the strongest identity anchor available and are not optional for "just a wardrobe change." Every future Hazel image generation, with NO exception for small/iterative asks, must include: (1) all 5 v5 canon refs (master `119465f3`, face front `8f22ad52`, face 3/4 `274e937a`, full-body front `1a8133ee`, full-body 3/4 `17af1f93`) as `image_references`, plus the prior styled output as an additional reference when iterating on a look; (2) the CHARACTER_LOCK.md v5 frozen identity string pasted VERBATIM (never paraphrased, never shortened) into the prompt. Treat this as a checklist gate before submitting any Hazel `generate_image`/photo-edit call, the same way the MASTER RULE's pre-finalization checklist works for video prompts. | Escobar dress round, corrected job `115e6498` | 2026-08-30 |

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

## EXTERNAL TOOLS OUT OF REACH — Angles 2.0 / SHOTS (owner standing rule, see CLAUDE.md)

Higgsfield's **Angles 2.0** (one photo → a directed new camera angle) and **SHOTS** (one photo → 9
AI-picked angle options) would materially help exactly the kind of angle-finding problem S12
describes — but both are website-only, verified unreachable from this environment (not in the
MCP `apps_search` registry; a sandboxed/local Playwright browser is always an anonymous session
with no path to the owner's login, confirmed 2026-08-29, regardless of browser engine).
**Permanent rule (owner lock 2026-08-29): whenever a shot would benefit from either tool, tell
the owner at the point the need arises — he runs it himself and sends back the result.** Never
silently work around this, never skip it. Full rule: `CLAUDE.md`.

### Local pipeline (stitching/QC)
| # | Finding | Evidence | Date |
|---|---|---|---|
| P1 | **PyAV concat must assign monotonic pts explicitly** (video: frame index at 1/fps time_base; audio: running sample count at 1/rate) and flush both encoders. Passing pts=None through re-encode produced a file whose every frame stamped t=0 — unplayable for the owner, caught only when he reported it. VERIFY every stitched file before sending: decode fully, check first/last pts span the expected duration AND audio last-sample end time (sources are 32 kHz — don't assume 48k when converting samples to seconds). | seam_test_71_72 v1 vs v2, 2026-08-30 | 2026-08-30 |
