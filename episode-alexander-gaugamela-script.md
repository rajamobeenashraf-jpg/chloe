# Episode DRAFT v9 — "The Day Alexander Ended an Empire" (Gaugamela, October 1, 331 BC)

## v9 change: battle redesigned to Hollywood coverage density (owner request 2026-08-29; design decision Claude's per the final authority rule)

Owner wanted true Hollywood-style multi-angle coverage. Solution: real battle sequences are built from parallel action, cutaway inserts, and cut-on-action — not from re-showing one action from two angles (which a generative pipeline cannot match frame-to-frame; brief §8.2 refined accordingly). The battle's 31 seconds now carry **six shots instead of four**: 5a wedge launches (NOVA, 5s) → 5b her reaction (V, 4s) → **5c NEW: the Persian line bracing — parallel action (NOVA, 3s)** → 6a the impact, locked frame (NOVA, 6s) → **6b NEW: ground-level insert — hooves/dust/dropped shield (NOVA, 3s)** → 7 her reaction + Darius flees (V, 10s). No action rendered twice anywhere. Total unchanged: 84s, now 12 clips. Full direction per shot: `episode-alexander-production-breakdown.md`.
**Status: UNSCORED, UNSCHEDULED draft — still not through `research-methodology.md` signal-stack scoring or an owner production lock, still no slot in the Ep 5–9 queue. Every standard approval gate still applies before any of this gets generated.**

## v8 change: cinematic brief + scale engine adopted; §38 upgraded to SCENE-level (owner approvals 2026-08-28 evening)

Owner approved (this episode): the improved Hollywood cinematic direction brief, all its improvements, and — mid-build — the Historical Reality & Scale Engine as a permanent addition. Both now live in **`cinematic-direction-brief.md`** (repo root). The full per-clip direction lives in **`episode-alexander-production-breakdown.md`** — that file is now the authoritative visual/staging direction for this episode; this file remains the authoritative story/dialogue script. Changes to this file in v8:

- **§38 upgraded from shot-level to SCENE-level** (owner-confirmed after the shot-vs-scene distinction was explained): an approved scene may go fully third-person (Nova) where it helps; V-mode stays the show's default identity; every Nova scene needs owner approval, every time. Updated draft text below.
- **Duration tweaks** (net zero, total stays 84s): 5b 4s→5s, 6 12s→10s, 7 10s→11s — because clip 6 is proposed as Nova (no Hazel face in frame), her §37a reaction beat moves to the head of clip 7.
- **Mode labels added to the battle clips**: 5a NOVA (approved), 5b V, 6 NOVA (PROPOSED — the one new approval pending), 7 V.
- **Scale-engine consequence**: clips 6/7/8 now include fallen/wounded soldiers as environmental consequence per the engine's "do not beautify war" rule, within §24's non-graphic caps — a deliberate scope change from v7's zero-casualty staging, flagged in the breakdown's scale bible.

**§38 (draft, updated) — Nova mode per SCENE, by owner approval only (owner mandate 2026-08-28 — PERMANENT until the owner says otherwise).** V-mode/selfie-cam remains the default identity of every episode. A scene may switch to Nova mode (true third-person cinematography) when what it must communicate is structurally impossible from Hazel's own camera — scale she is inside of, action she cannot film while living it, §37c geometry — and it would make the scene genuinely more realistic, impactful, or cinematic. NEVER without the owner's explicit prior approval for that specific scene, every time; no standing blanket permission. Even in an approved Nova scene, Hazel's reactions stay on her own lens, and Nova shots never contain her face. Full governance, stitching grammar, and the decision test: `cinematic-direction-brief.md` §1 and §5.

## v7 change: owner policy — ONE true third-person shot allowed per scene when it makes the scene better, always with prior approval (2026-08-28, cross-episode, PERMANENT) — SUPERSEDED by v8's scene-level §38 above; kept for the record

**Owner decision, broader than this script:** V-mode/selfie-cam-only (Nova mode paused) stays the default for every episode, but a single deliberate third-person shot is now allowed within a scene when it's genuinely needed or makes the scene better — **never used without asking first, every time, no standing blanket permission.** This is a real change to the existing "Nova mode PAUSED" mandate in `creative-direction.md`, not just a technical fix like v6's.

**Why I'm not writing this into `creative-direction.md` directly:** that file already has a second, unmerged branch (`claude/video-scene-analysis-r2hh5n`) with its own pending edits sitting on it (§30–§37c). Editing the same shared file from a third branch right now risks a real merge collision between two independent, uncoordinated edits to the same document. Recording it here instead, in a form ready to paste into `creative-direction.md` whenever either branch merges:

> **§38 (draft) — One deliberate third-person shot permitted per scene, by owner approval only (owner mandate 2026-08-28 — PERMANENT until the owner says otherwise).** V-mode/selfie-cam-only remains the default for every clip in every episode. A single true third-person shot within a scene is allowed when it is genuinely needed or makes the scene meaningfully better (typically: scale/spectacle a handheld POV shot structurally cannot deliver, per the same class of geometry problem §37c addresses) — but it is NEVER used without the owner's explicit prior approval for that specific shot, every time, with no standing blanket permission. Propose the specific shot and its rationale before generating it, the same as any other judgment-call regeneration under §37.

**Applied to this episode, this pass:** clip 5a (the wedge forming) becomes the one deliberate third-person shot — proposed to the owner with rationale (real cavalry-wedge scale a handheld arm-swing can't deliver) and approved before this edit. No other clip in this episode uses the exception; 5b, 6, and 7 all stay V-mode as before.

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
| 1 | 9s | LINEAR OPEN, hook front-loaded (retention fix 2026-08-29) — FIRST FRAME already shows the strange image: armed guards standing motionless over a sleeping man by lamplight. Her whisper starts immediately: "Gaugamela. 331 BC. Tonight, an empire two hundred and twenty years old gets a new owner — and the man who's about to take it—" glance back at the cot "—is still asleep." The reveal lands by second 6; the last ~3s HOLD on her slow deadpan into the lens, no words. | Stated-doom hook with the payoff inside the swipe window + mute-legible first frame (why are guards watching a sleeping man?) + the held deadpan IS the joke |
| 2 | 9s | Parmenion (§32-locked) strides in, visibly rattled, shakes him: "My lord. MY LORD." Alexander wakes instantly calm, already reaching for his sword belt, unhurried. Parmenion, still worked up: "You could have taken them in the dark last night. Why do you STILL refuse a night attack?" *[Alexander]*, buckling armor, half-amused: "I will not steal a victory, Parmenion. Let it be daylight, and let it be earned." A wax tablet is pressed into her hands without explanation. *[Alexander]*, to her, brisk: "You write quickly?" Her, fumbling the stylus: "...Apparently as of right now, yes." | Two verified anecdotes in one dawn scene + running-gag plant + her role established + Parmenion's first appearance |
| 3 | 8s | Arming further, a worn scroll-case by the cot — she nods at it. "What's that?" *[Alexander]*, not looking up: "Homer. Aristotle's own copy — he corrected it himself. Sleeps under my pillow. With the dagger." Her: "You brought a book to a war." *[Alexander]*, finally looking at her, serious: "I brought the only book that matters. Achilles didn't get old either. I intend to beat that record too." | Sourced humanizing detail as the empathy core + real cross-episode Troy echo |
| 4 | 10s | Walking to the horse lines: the Persian campfires stretch to the horizon, no visible end. "Darius pulled soldiers from more than twenty different peoples for this. Twenty." A huge dark warhorse — Bucephalus, §32-locked — pins its ears at everyone but Alexander. "This is Bucephalus. Only he's ever been allowed to ride him." Passing a separately-guarded tent, quieter: "That one — Darius's own mother and wife. Captured two years ago. Still here." | Repeated-number stat-drop + Bucephalus's first appearance + the Issus/family fact |
| 5a | 5s | **[NOVA — approved]** THE WEDGE FORMS (zero jokes from here) — no Hazel in frame. The episode's ONE sweeping move: camera travels alongside the Companion cavalry wedge as it assembles and drives left→right, Alexander at its point on Bucephalus, the torn gap in the Persian line deep frame-right, dust RISING (first-engagement stage per the scale bible). No dialogue — horns and massed hooves only. Full direction: `episode-alexander-production-breakdown.md`. | Scale a POV shot can't deliver + §37c-clean by construction |
| 5b | 4s | **[V]** Hard cut to her own lens: tight, jostled, bodies passing both frame edges, the front NOT in frame behind her. Breath ragged before she speaks: "We're not staying back. We're going WITH them." Ends on her head snapping toward the enemy — the eyeline that launches 5c. | Reaction half + eyeline handoff into the parallel-action beat |
| 5c | 3s | **[NOVA — new]** THE OTHER SIDE, same seconds (parallel action): the Persian front rank locking shields and dropping spears level toward the incoming (unseen) charge; faces behind shield rims — one jaw set, one man's eyes flicking toward the widening gap at frame's edge; the charge's dust wall rising beyond. No dialogue. | Hollywood coverage via parallel action — a different subject in the same time window, nothing rendered twice |
| 6a | 6s | **[NOVA]** THE IMPACT — LOCKED static third-person frame from the Macedonian side; the wedge drives into the gap from frame-left; the Persian line buckles at the contact point — shields dropping, spears turning, men and horses falling (§24-compliant, non-graphic), the break propagating visibly outward. Full-battle stage: heavy dust, both lines running past both frame edges. §33: gear never crosses sides. No dialogue. | The mute-legibility keystone — "the line broke HERE" readable by construction; the only shot that shows the collision |
| 6b | 3s | **[NOVA — new]** GROUND-LEVEL INSERT (cutaway): locked low frame at earth level — hooves hammering past close to the lens, dust bursting with each strike, a dropped Persian shield spinning on its rim into frame and settling, running feet scattering. No faces, no dialogue. | Percussive insert — deepens the impact and hides the seam; an insert can never mismatch the action it doesn't show |
| 7 | 10s | **[V]** DARIUS FLEES — opens ON her face (§37a): scleral show, mouth dropping to a full "O," hands rising then clamping the tablet, shoulders pulling in. She half-turns; deep in frame the distinct chariot-and-standard wheels hard and recedes; nearby Persians glance toward it, one beat, then break and run — the collapse streaming past her on both sides, wounded among them, equipment underfoot. Breathless: "...That's him. He's LEAVING. And now everyone else is too." | Reaction cut out of the Nova run + the domino told in glances + geometrically honest recession |
| 8 | 8s | Dusk, he returns, dust-caked, Bucephalus lathered, the camp erupting around him — he dismounts near her before anyone else reaches him, glances at the tablet still gripped tight in her now-steady hand: *[Alexander]*, almost a smile: "Get all of it down?" Her, holding it up, no longer fumbling: "Every word. Even the ones about stealing victories." He's already walking on, pulled into the noise. | The earned personal beat + running-gag payoff |
| 9 | 9s | Outro, dusk, campfires relighting: "Cyrus built that empire two hundred and twenty years ago. It ended today, because a man who overslept his own war refused to win it in the dark — and because one king turned his chariot around." Beat, softer: "He keeps Homer under his pillow. He wants to outlive Achilles. Twelve years from today, he's dead at thirty-two — and somehow that's still longer than he thought he'd get." Quiet: "Hazel — out of time." | Nerd spike (empire) + chariot-flight payoff + Iliad/Achilles payoff + sincere sign-off |

**Total: 9+9+8+10+5+4+3+6+3+10+8+9 = 84s (12 clips).** Runtime unchanged; v9 redistributed the battle's 31s across six shots for Hollywood coverage density.

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
7. **New:** clip 5a now uses the one approved third-person exception (§38 draft) instead of the handheld-swing workaround from v6 — cleaner and more dramatic, but confirm the exception itself is correctly scoped (this one shot only) before it's generated.
8. **§38 (draft) is a real, permanent, cross-episode policy change but exists only in this file right now** — same merge-collision reasoning as item 6. Whoever merges either this branch or the Constantinople branch first should carry §38's text into `creative-direction.md` as its own numbered section so future episodes inherit it too, not just this one.
