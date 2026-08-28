# Episode DRAFT v6 — "The Day Alexander Ended an Empire" (Gaugamela, October 1, 331 BC)
**Status: UNSCORED, UNSCHEDULED draft — still not through `research-methodology.md` signal-stack scoring or an owner production lock, still no slot in the Ep 5–9 queue. Every standard approval gate still applies before any of this gets generated.**

## v6 change: adopts the Constantinople-episode standing rules (§30–§37c), confirmed with owner before executing

Applied per the confirmed checklist (owner sign-off given before this pass). Verified directly against `origin/claude/video-scene-analysis-r2hh5n` (unmerged, `creative-direction.md` §30–§37c and `CLAUDE.md`, dated 2026-08-28) before adopting — not just trusting the pasted summary. Changes below; v5's substance (all Alexander facts, the battle's real mechanics, duration budget) is untouched — this pass is staging/technical, not a rewrite of content.

**1. Engine (§30):** Seedance 2.5/Higgsfield is now primary, PAI Pro is fallback. Dropped the "PAI 15.2s cap" framing v5 was written against — Seedance's own per-clip limits haven't been checked yet for this project, so durations below are directorial judgment calls, not tied to a stated hard number.

**2. §37c fix, clip 5 only.** Checked all three battle clips individually rather than applying the fix blanket:
- **Clip 5 (the wedge forming, "distance closing clip by clip") is a real violation** — a face-on camera showing a target growing closer contradicts its own geometry. Split into two clips (5a, 5b): camera-forward/no-face for the approach, camera-back-to-face for her reaction. Resolved the Nova-mode tension the way we agreed: both halves stay on **her own handheld camera** (she swings it around and back), never a true third-person shot — the fix, not an exception to V-mode.
- **Clip 6 (the impact) does NOT need a split** — nothing in it is a distant target growing closer; it's chaos immediately around her, which selfie framing handles fine.
- **Clip 7 (Darius flees) does NOT need a split either** — a chariot fleeing AWAY from camera is the one case where face-on selfie geometry is already correct (something behind her naturally reads as being left behind, which is exactly what's happening). Left as one shot; wording tightened to make the recession explicit rather than ambiguous.

**3. §37a fix, clip 6.** "Her face, wide-eyed, tracking it" replaced with actual mechanics.

**4. §37b, clips 5–7.** Explicit bleak/desaturated grading added (dusty ochre, slate-grey shadows, cool light) — reconciled with the standing mute-legibility requirement from before: bleak and legible aren't in tension, only bleak-and-dark would be, and it stays daylight throughout.

**5. §36, clips 5–7.** Explicit repeated camera-movement constraints added to each — no assumed restrictions.

**6. §32 NPC locks** written below for Alexander, Parmenion, and Bucephalus — one description each, written once, to be pasted verbatim into every clip they appear in once actual generation prompts get written (this script's prose descriptions summarize them for readability; the full locked block is below for copy-paste use).

**7. §31 production notes** (technical, for whoever writes the actual generation calls — not clip content) added as its own section.

**8. §33/§34/§35 — checked, confirmed not applicable, not silently skipped:**
- §33: no named real-world flag/emblem is depicted closely enough to need shape-specification — but added a general Macedonian-vs-Persian gear/iconography distinction note to the battle clips regardless, since two sides do share the frame there.
- §34: no injury/wound moment is shown anywhere in this script (the impact clip has jostling/chaos, no depicted wound) — confirmed, not applicable.
- §35: only applies when actively comparing footage to a reference video — not relevant to a script-revision pass.

---

## §32 NPC locks (write once, reuse verbatim in every prompt where they appear)

**ALEXANDER** — early-to-mid twenties; average-to-short stature, not physically imposing (per ancient descriptions); clean-shaven, breaking Macedonian tradition; thick, tousled light-brown hair swept back off the forehead; a slight characteristic tilt/turn to the neck; pale, intense light-colored eyes; compact, athletic build. Wears a bronze Macedonian officer's cuirass over a crimson tunic, a plain finely-made sword belt, a deep-red cloak. Moves and speaks with unhurried, economical calm — even in the wake-up scene, even mid-battle — never visibly rushed, in deliberate contrast to everyone around him.

**PARMENION** — much older, a senior general; close-cropped silver-grey hair and beard; deeply weathered, lined face; heavier-set build than Alexander. Wears a senior officer's bronze cuirass with a red cloak of rank. Moves with visible urgency and tension, a physical contrast to Alexander's calm.

**BUCEPHALUS** — a large dark bay warhorse, near-black coloring, with a notably broad, wide forehead (the source of his name — "ox-head"). Pins his ears and shies from everyone except Alexander; calm and steady only under him specifically.

---

## §31 production notes (technical — for the actual generation calls, not clip content)

- Reference stills: single-view 4-image sets per character (2 full-body + 2 face crops) — never multi-panel character-sheet grids.
- `mode: "omni_reference"` on every `generate_video` call passing image and/or audio references (`t2v` rejects reference media outright).
- Voice consistency: extract audio from the episode's designated reference clip once one exists, upload as Higgsfield audio media, pass as `audio_references` on every clip where a character speaks.
- Every character-present prompt opens with STRICT IDENTITY RE-RENDER framing + that character's §32 lock string above, verbatim.
- If a `preset_recommendation` notice comes back, resubmit identically with `declined_preset_id` set.
- Generate Alexander's, Parmenion's, and Bucephalus's reference stills proactively, before they're needed in a shot with anyone else — don't wait for a rendering failure to discover it's needed.

---

Written to the same spec as `episodes-5-9-scripts.md`: pure Chloe-formula V-mode talk-to-lens (Nova mode paused — the §37c fix above stays within this, not an exception to it), single continuous take per clip, `creative-direction.md` §6–§26 (§22's geometric-tracing rule applies with extra force across 5a/5b/6/7), `CHARACTER_LOCK.md` v4, HAZEL name + "Hazel — out of time," OPENING LAW (linear, no flash-forwards).

**Runtime ~84s · 10 clips · Recurring character: Parmenion (real, brief, §32-locked) · Featured historical figures: ALEXANDER (present most of the episode, §32-locked), Darius III (seen at a distance, fleeing — not a speaking role), and Bucephalus (§32-locked)**

**Genre: person-focused day-in-the-life with a fully-told, closer-in battle centerpiece, LINEAR, one dawn-to-dusk day. She's a scribe attached to Alexander; the event is the mid-episode set-piece.**

**Palette/lighting: dry ochre-gold dawn haze → flat bleached-white midday dust → bronze-amber dusk generally. The battle clips (5a/5b/6/7) specifically shift to §37b's bleak/desaturated treatment — dusty ochre and slate-grey rather than warm/cinematic — while staying bright enough (never darkened) to keep the visual storytelling legible on mute.**

**Sound: tent-canvas rustle + distant camp murmur at dawn → Parmenion's urgent footsteps → horn signals at the pivot → hoofbeats and battle-roar building and staying loud through all four battle clips, no dip to silence between any of them (§25) → drops to wind and creaking leather at the return → clean simple mix for the outro.**

**Devices: NPC line = Parmenion (one exchange) · ALEXANDER's own verified lines carry the deadpan-greatness device across multiple clips · casual shock = catching him asleep before the biggest battle of his life · stat-drop = the army's scale, repeated number, folded into the Bucephalus clip · running gag = the fumbled stylus, plant → payoff · nerd-detail spikes = the 220-year-old Achaemenid Empire ending this afternoon, paired with the Iliad/Achilles detail · empathy/humanizing beat = the Iliad-under-the-pillow scene · the battle sequence's craft job = pure visual/geometric storytelling under the mute-legibility bar, now also under §37c's camera-honesty rule · outro = personal and awe-struck.**

**Flow (linear, single day, no jumps):** pre-dawn arrival, he's asleep (1) → Parmenion wakes him, the night-attack refusal (2) → the Iliad/Achilles beat while he arms (3) → Bucephalus, the army's scale, the Darius's-family aside (4) → THE WEDGE FORMS, camera-forward approach (5a) → her reaction, camera back to face (5b) → THE IMPACT (6) → DARIUS FLEES, the ripple (7) → dusk return, the earned personal beat (8) → outro (9). One continuous location chain, every transition covered by continuous sound (§25) and matched motion (§6).

---

| # | Dur | Scene & sample lines | Craft job |
|---|---|---|---|
| 1 | 9s | LINEAR OPEN — pre-dawn, inside the command tent, guards standing oddly still: "October 1st, 331 BC. Gaugamela. Somewhere out there is a king named Darius, with an army so big his own scribes stopped counting. And somewhere in THIS tent, the man about to make sure nobody remembers Darius's name instead of his—" the camera pans to a cot. "—is asleep." | Stated-doom hook, subverted by the casual-shock reveal. First appearance of ALEXANDER (§32-locked, seen asleep, no dialogue yet). |
| 2 | 9s | Parmenion (§32-locked) strides in, visibly rattled, shakes him: "My lord. MY LORD." Alexander wakes instantly calm, already reaching for his sword belt, unhurried. Parmenion, still worked up: "You could have taken them in the dark last night. Why do you STILL refuse a night attack?" *[Alexander]*, buckling armor, half-amused: "I will not steal a victory, Parmenion. Let it be daylight, and let it be earned." A wax tablet is pressed into her hands without explanation. *[Alexander]*, to her, brisk: "You write quickly?" Her, fumbling the stylus: "...Apparently as of right now, yes." | Two verified anecdotes in one dawn scene + running-gag plant + her role established + Parmenion's first appearance |
| 3 | 8s | Arming further, a worn scroll-case by the cot — she nods at it. "What's that?" *[Alexander]*, not looking up: "Homer. Aristotle's own copy — he corrected it himself. Sleeps under my pillow. With the dagger." Her: "You brought a book to a war." *[Alexander]*, finally looking at her, serious: "I brought the only book that matters. Achilles didn't get old either. I intend to beat that record too." | Sourced humanizing detail as the empathy core + real cross-episode Troy echo |
| 4 | 10s | Walking to the horse lines: the Persian campfires stretch to the horizon, no visible end. "Darius pulled soldiers from more than twenty different peoples for this. Twenty." A huge dark warhorse — Bucephalus, §32-locked — pins its ears at everyone but Alexander. "This is Bucephalus. Only he's ever been allowed to ride him." Passing a separately-guarded tent, quieter: "That one — Darius's own mother and wife. Captured two years ago. Still here." | Repeated-number stat-drop + Bucephalus's first appearance + the Issus/family fact |
| 5a | 5s | THE WEDGE FORMS, part 1 (zero jokes from here) — **camera turned forward, her face NOT in frame for the full 5 seconds** (explicit constraint, §36): horns both sides at once; Alexander mounts Bucephalus at the point of a cavalry wedge visibly assembling behind him, a real gap already visible in the Persian line dead ahead; the support line (hypaspists, phalanx battalions) surges forward around the camera, the gap visibly nearer by the shot's end than its start. §37b grading: dusty, desaturated, cool-toned, no warm cinematic glow. No dialogue — ambient roar and horn signals only. | §37c-compliant approach shot: forward-facing, no face, so "growing closer" reads correctly instead of contradicting itself |
| 5b | 4s | THE WEDGE FORMS, part 2 — **hard cut, camera swings back to face-forward** (explicit constraint, §36: no push-in, stay at the same handheld medium distance established in clip 4): she's jostled, breathless, still gripping the tablet, the gap now out of frame behind her. "We're not staying back. We're going WITH them." | The reaction half of the split — her face, no contradiction, because the target is now off-frame not "growing closer" on camera |
| 6 | 12s | THE IMPACT — **camera stays wide, no cut to close-up for the full 12 seconds** (explicit constraint, §36): the wedge drives into the gap immediately around her, not approached from distance — at the point of contact the Persian line visibly buckles, shields dropping, spears turning away, men scattering sideways. She's close enough that individual faces are visible in the chaos on both sides, ducking under a snapped shaft, shoved sideways by the crush. §33 note: Macedonian bronze/crimson gear and Persian gear/dress stay visually distinct throughout, never crossed between sides. §37b grading: dusty ochre, slate-grey shadow, no warm glow. Her reaction, no dialogue for several beats: eyes wide with visible scleral show, mouth dropping into a full "O," both hands rising instinctively toward her own face before catching herself and gripping the tablet instead, shoulders pulling inward, breath audibly ragged. | The shot that has to read as "the line broke HERE" with sound off, now with granular §37a performance direction instead of a generic label |
| 7 | 10s | DARIUS FLEES — through the settling dust, a chariot and standard, visibly distinct from the ranks around it, wheels hard and **recedes, visibly smaller and more distant with every passing second** (the natural, geometrically correct read for a face-on camera — nothing here needs splitting). Nearby Persian soldiers are shown looking toward it, one beat, before they themselves break and run — the collapse spreading outward from that one chariot, watched not stated. She's caught at the edge of the retreat, Persians streaming past her on both sides. Breathless, not performing for the lens anymore: "...That's him. He's LEAVING. And now everyone else is too." | The domino effect as staged reaction-glances, mute-legible + the real reason the battle was decided + confirmed §37c-clean without a split |
| 8 | 8s | Dusk, he returns, dust-caked, Bucephalus lathered, the camp erupting around him — he dismounts near her before anyone else reaches him, glances at the tablet still gripped tight in her now-steady hand: *[Alexander]*, almost a smile: "Get all of it down?" Her, holding it up, no longer fumbling: "Every word. Even the ones about stealing victories." He's already walking on, pulled into the noise. | The earned personal beat + running-gag payoff |
| 9 | 9s | Outro, dusk, campfires relighting: "Cyrus built that empire two hundred and twenty years ago. It ended today, because a man who overslept his own war refused to win it in the dark — and because one king turned his chariot around." Beat, softer: "He keeps Homer under his pillow. He wants to outlive Achilles. Twelve years from today, he's dead at thirty-two — and somehow that's still longer than he thought he'd get." Quiet: "Hazel — out of time." | Nerd spike (empire) + chariot-flight payoff + Iliad/Achilles payoff + sincere sign-off |

**Total: 9+9+8+10+5+4+12+10+8+9 = 84s.** Same runtime as v5 — the §37c fix split one clip's existing duration into two, it didn't add new content.

**Pinned comment:** Gaugamela (Oct 1, 331 BC), near modern Erbil, Iraq. Alexander oversleeping the morning of the battle and Parmenion waking him is recorded by Plutarch — honestly flagged: a contemporary Babylonian astronomical diary suggests the Macedonians actually attacked early that day, so this may be later embellishment rather than fact. "I will not steal a victory" is Arrian's version of his reply to Parmenion's night-attack proposal — some historians think the line may have been added later for propaganda value. The Iliad of the Casket (Aristotle's edited copy, kept under Alexander's pillow with his dagger) is from Plutarch, citing Onesicritus. Alexander really did lead the Companion cavalry personally into a gap that opened in the Persian center. Darius really did turn his own chariot and flee once that gap broke through, and that flight — not the fighting itself — is what actually collapsed Persian morale and decided the battle. Darius III's mother, wife, and two daughters were captured at Issus in 333 BC and remained in Alexander's camp, treated respectfully, at the time of Gaugamela. Alexander died in Babylon in 323 BC, aged 32. Parmenion is real; the specific words given to him and to Alexander in clip 2 are the dramatized version of what ancient sources report, not a transcript. AI-disclosure line + follow CTA.
**Channel engagement question:** "Would YOU have attacked in the dark, or waited for daylight like he did? 👇"

---

**Open items for the owner before this goes anywhere near production:**
1. Signal-stack scoring still not run.
2. No production slot exists — Ep 5–9 are locked; sequencing conversation with Delaware Crossing/King Tut still open in `PROJECT_HANDOFF.md`.
3. No reference stills exist yet for anyone in this episode (Hazel-as-scribe costume, Alexander, Parmenion, Bucephalus, Darius's chariot) — §31's single-view 4-image format applies to all of them once generation starts.
4. Clips 5a/5b/6/7 remain the highest-risk to generate cleanly: §22's geometric-consistency rule, §17's "no thinning the crowd to dodge a defect" rule, and now §37c's shot-split all apply at once — flagging so it's expected at QC, not a surprise.
5. Two disputed/embellished anecdotes are still used (the oversleeping story, the exact wording of "I will not steal a victory"), both flagged honestly in the pinned comment — confirm that's the right call.
6. This file does NOT itself update `creative-direction.md` or `CLAUDE.md` on this branch — those stay as the Constantinople branch's own content until an owner-approved merge; this file only applies the rules to its own script.
