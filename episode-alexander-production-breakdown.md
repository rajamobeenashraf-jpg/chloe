# Alexander/Gaugamela — Production Breakdown (v1, per `cinematic-direction-brief.md`)
**Companion to `episode-alexander-gaugamela-script.md` (v8). Dialogue unchanged from the approved script. Runtime 84s, 10 clips. Screen-direction map for the whole episode: in NOVA shots, Macedonians advance LEFT→RIGHT, Persians face right→left, Darius flees deeper-right/away; in V-mode shots, the Persian line sits in the DEEP FRAME behind Hazel. Every clip obeys this one map.**

**Mode summary:** V-mode throughout except the battle scene, where clips 5a and 6 are **NOVA (PROPOSED — owner approval pending)**. Clip 5a was already owner-approved as third-person earlier (2026-08-28, morning); clip 6 is the one NEW Nova ask — see its entry for the case both ways. Clips 5b and 7 stay V-mode deliberately (her reactions belong to her own lens).

**Duration changes from v7 (script updated to match):** 5b 4s→5s, 6 12s→10s, 7 10s→11s. Net zero; total stays 84s. Reason: clip 6's on-camera reaction beat moves to the head of clip 7 (if 6 goes Nova, her face can't be in it), so 7 needs the extra second and 6 needs less.

---

## SCALE BIBLE — GAUGAMELA (per the Historical Reality & Scale Engine; governs every shot below)

**Terrain/season (documented):** a broad, flat, open plain near modern Erbil, Iraq — ground reportedly chosen and partially leveled by Darius for his chariots and cavalry. October 1: end of the dry season — hard, dry, dusty earth. NO lush grass, NO postcard-blue sky: pale haze-white sky, dust as a main visual character the moment masses move. Flat geography means scale reads through DEPTH (ranks receding into atmospheric haze), not elevation.

**Macedonian army (documented ~47,000):** sarissa-phalanx battalions in deep rectangular blocks (16 ranks deep), hypaspists, Companion cavalry (the wedge, ~2,000 horse at the decisive point), allied cavalry on the wings. Bronze, crimson cloaks, tall sarissa pikes reading as vertical forests above the ranks. Camp: a true tent city, fires and horse lines beyond the frame in every camp shot.

**Persian army (documented as far larger; ancient sources claim six figures, moderns dispute the wildest counts — the FRAME must say "several times the Macedonian force"):** a line that visibly EXCEEDS the frame in both directions in every shot that sees it, more than twenty peoples' contingents (varied dress/gear within one army — §32-consistent per faction), massed cavalry wings, scythed chariots before the line, Darius's center marked by his distinct chariot and royal standard. At dawn (clips 1–4): their campfires define the horizon — an unbroken field of lights, never a countable cluster.

**Human-density floor per shot:** foreground = named individuals; midground = dozens-to-hundreds in formation; background = thousands implied via depth, haze, dust columns, and lines running past the frame edges. NEVER a battle frame whose full visible population could be mistaken for under a hundred people. Both armies always continue beyond every frame edge (engine rule 10).

**Environmental evolution across the episode (engine rule 6 — the stage is stated in every prompt):**
- Clips 1–4 (BEFORE): clear pre-dawn/dawn air, ordered camp activity, formations assembling in the distance, tension not chaos.
- Clip 5a (FIRST ENGAGEMENT): dust RISING — kicked up by the wedge and the advancing lines, building but not yet opaque; formations still readable.
- Clip 6 (FULL BATTLE): heavy dust, reduced visibility at distance, broken formation debris — dropped shields, snapped sarissas, fallen men and horses at the contact point (§24-compliant: real, visible, non-graphic — no dismemberment, no gore, no spray), riderless horses breaking loose.
- Clip 7 (COLLAPSE): dust everywhere, visibility short, scattered equipment underfoot, wounded men among the retreating mass, the field's order fully dissolved.
- Clips 8–9 (AFTERMATH): dust settling into dusk haze, smoke columns from the field's far side, exhausted dust-caked survivors, wounded being helped between the fires, abandoned weapons — the day visible on every person and surface. Quiet where there was roar.

**Scope change from v7, driven by the engine and flagged plainly:** v7 deliberately depicted no battle casualties at all. Under engine rule 5 ("do not beautify war") that sanitization is itself unrealistic — clips 6/7/8 now include fallen and wounded soldiers as environmental consequence, within §24's standing caps (visible and real, never graphic/gore/spray). No individual on-screen kill is depicted, so §34's cause-chain rule isn't triggered for a specific wound.

**Layering rule (brief §7b.1) applied to every battle frame:** foreground ≤ ~10–15 sharp individuals (the only zone where gear/anachronism detail is legible — kept lean and controllable, matching how the reference channel's own breach scene stages it), midground dozens-to-hundreds partially dust-softened, background thousands as silhouette masses in haze.

## FROZEN ENVIRONMENT_BLOCK — GAUGAMELA (paste verbatim into EVERY battle-clip prompt; becomes a constant in the episode's run_clip script, same machinery as IDENTITY_BLOCK, per brief §7b.3)

> THE BATTLEFIELD OF GAUGAMELA, OCTOBER 331 BC — HARD ENVIRONMENTAL REQUIREMENTS: a vast, FLAT, open dry plain — hard pale-ochre earth, sparse scorched scrub, NO green grass, NO hills in the battle space, NO postcard-blue sky: the sky is pale, haze-white with dust. Two enormous armies share this plain and BOTH extend past the frame edges in every direction they occupy — the Persian line is several times the Macedonian force and visibly has NO END in frame; ranks recede into atmospheric dust-haze at the horizon as silhouette masses of thousands. Layering is mandatory: at most ten to fifteen fully-detailed soldiers in the sharp foreground; dozens-to-hundreds in readable formation in the midground, partially softened by dust; thousands as indistinct moving masses in the haze beyond. Dust is a main visual element the moment masses move — kicked up by feet, hooves, and wheels, hanging in the air, scaling with the action. Macedonian equipment: bronze, crimson cloaks, tall sarissa pikes reading as vertical forests above the ranks. Persian side: visibly varied contingents of many peoples, massed cavalry, scythed chariots — Persian and Macedonian gear/iconography NEVER mix on the same side. SOUND SCALE (three layers, always): close — leather, breath, individual cries; middle — massed hooves and shouted commands; far — a continuous unbroken roar of tens of thousands with no gaps in it. This world continues beyond every frame edge; the camera sees one small part of an enormous real event.

**Per-clip stage line (brief §7b.4 — `stage` becomes a `clips.json` field beside `timeOfDay`; the inherited-state sentence is REQUIRED in every battle prompt):**
| Clip | Stage | Inherited-state line for the prompt |
|---|---|---|
| 1–4 | BEFORE | "Clear pre-dawn/dawn air — no battle dust yet; tension, not chaos." |
| 5a | FIRST ENGAGEMENT | "Dust is RISING right now, kicked up by this advance — building, not yet opaque; formations still readable." |
| 5b | FIRST ENGAGEMENT | "The air around her ALREADY carries the rising dust of the advance she is inside of." |
| 6 | FULL BATTLE | "The air is ALREADY heavy with dust from the fighting before this shot begins — this is NOT a clean battlefield; visibility at distance is already reduced." |
| 7 | FULL BATTLE→COLLAPSE | "Dust everywhere, ALREADY thick before the shot starts; scattered equipment underfoot; the field's order already dissolving." |
| 8–9 | AFTERMATH | "Dust settling into dusk haze; smoke columns on the field's far side; the day visible on every person and surface." |

**Scale QC (brief §7b.2 — runs per battle clip beside `freezedetect`, and again at edit stage as a Gemini-eyes question):** (a) both army lines exceed the frame edges; (b) total visible population cannot be mistaken for under 100 people; (c) atmospheric dust matches the clip's assigned stage above. Any failure = report to owner per §19/§20, never silently regenerate.

**Numbers rule (brief §7b.6):** the headcounts in this bible (47,000 / six figures / 2,000 horse) NEVER appear in a generation prompt — prompts get only the density language above.

---

## CLIP 1 — 9s — V-MODE
- **Scene purpose:** establish place, date, stakes; land the casual-shock reveal (the king is asleep).
- **Blocking:** Hazel enters through the tent flap mid-whisper, moves two steps in, stops. Guards stand just inside, motionless. The cot with Alexander is deep-frame beyond her shoulder.
- **Camera strategy:** her handheld selfie lens. NOT the script's old "camera pans" — the reveal is *blocking + focus*, not a camera move: she glances back naturally at "—is asleep," and the audience's eye follows hers.
- **Shot size:** chest-up on her; cot small in the deep frame.
- **Lens/perspective:** natural human perspective; sharp on her, cot softly out of focus until the final beat.
- **Camera movement:** handheld with natural sway only. No pan, no push. The stillness IS the joke's setup.
- **Composition (9:16):** her face upper-third (above caption band); a guard's shoulder as dark foreground occlusion at one frame edge (depth layer 1); the cot deep-frame lower-center (layer 3). Nothing critical in the caption zone.
- **Focus strategy:** hold her sharp throughout; let the cot stay soft — the reveal lands on her voice-drop and glance, not a focus trick (rack focus is on the do-not-script list).
- **Lighting:** single oil-lamp warmth inside; pre-dawn blue-grey leaking through the tent seam. Warm interior planted deliberately — contrast fuel for the battle's cold grade later.
- **Environment:** command tent: maps/weapons in shadow, brazier embers, two immobile guards (§17 — visible breathing, small weight shifts, never a static plate).
- **Performance (§37a):** conspiratorial whisper, eyebrows up on "an army so big"; on "—is asleep" her voice drops to flat deadpan, a half-beat hold straight into lens, one slow blink.
- **Continuity:** ALEXANDER §32 lock (asleep, no dialogue). Hazel scribe wardrobe established here — locked for the episode.
- **Transition out:** Parmenion's hurried footsteps pre-lap the cut (J-cut, §25).
- **Sound:** canvas rustle, distant camp murmur, brazier tick, her whisper. No music.

## CLIP 2 — 9s — V-MODE
- **Scene purpose:** both verified anecdotes (night-attack refusal + the oversleeping) and her role established; Parmenion introduced.
- **Blocking:** Parmenion enters past the camera (foreground wipe), crosses to the cot, shakes Alexander. Alexander rises frame-right-lower, already reaching for the sword belt. The tablet is pressed into her hands from off-frame at the end.
- **Camera strategy:** her lens becomes a witness camera — she backs off half a step and lets the two men play the scene in depth. Per brief section on dialogue: NO new framing per line; the whole exchange lives in one sustained frame; performances breathe inside it.
- **Shot size:** loose medium two-shot in depth; her at frame edge.
- **Lens/perspective:** natural perspective, both men held sharp (deep focus — the scene is about the space between them).
- **Camera movement:** handheld sway only; a small motivated dip at the end as the tablet lands in her hands and she fumbles the stylus.
- **Composition:** Parmenion standing frame-left (tension, vertical), Alexander rising lower-right (calm, horizontal-to-vertical) — the power dynamic drawn as opposing lines in the tall frame.
- **Focus:** deep; no focus moves.
- **Lighting:** as clip 1; slightly more dawn-grey through the flap Parmenion left open (time advancing inside the scene).
- **Environment:** same tent, same props (continuity with clip 1 verified frame-to-frame).
- **Performance:** Parmenion §37a — jaw tight, over-loud first line, weight forward on the balls of his feet. Alexander — zero startle on waking, eyes open directly into alertness, movements economical, the half-amused line delivered while buckling, not performed at anyone. Hazel — fumble is small and real (two fingers chase the stylus), not clownish.
- **Continuity:** PARMENION §32 lock debuts. Stylus/tablet = running-gag object, tracked from here.
- **Transition out:** hard cut on the buckle of his last strap (diegetic trigger sound, §25).
- **Sound:** footsteps, armor buckles, the two voices contrasted (his tension vs. Alexander's level calm). No music.

## CLIP 3 — 8s — V-MODE
- **Scene purpose:** the Iliad/Achilles humanizing core — the episode's quiet emotional center.
- **Blocking:** Alexander arming, half-turned away; the scroll-case sits close to camera. He turns and looks directly at her only on his final line — the first time in the episode he gives anyone his full attention.
- **Camera strategy:** sustained single frame; the "cut" the audience feels is his head-turn, not an edit.
- **Shot size:** medium on Alexander; scroll-case large in foreground bottom-frame (below caption band).
- **Lens/perspective:** slight compression feel — "flattened perspective, background tent wall soft" — to isolate the two of them from the room.
- **Camera movement:** nearly locked; breathing handheld only. The stillest shot of the episode ON PURPOSE (restraint before the storm — the brief's contrast rule).
- **Composition:** scroll-case foreground (layer 1), Alexander mid (layer 2), dark tent depth (layer 3). His final look lands straight down the lens axis toward her/us.
- **Focus:** scroll-case soft, him sharp; no mid-shot changes.
- **Lighting:** lamp warmth now clearly losing to cold dawn — the window between night and battle closing visibly.
- **Performance:** his lines start thrown-away (not looking up), then the turn: §37a — chin lifts, eyes steady, zero smile, a beat of silence before "I intend to beat that record too." Hazel off-lens voice light on "You brought a book to a war," then audibly quieter after his look.
- **Continuity:** ALEXANDER lock; scroll-case must read as worn leather, not ornate fantasy prop (§13 grounded).
- **Transition out:** cut on tent flap opening — hard light spills in (light-driven cut, §25 sound: camp noise floods).
- **Sound:** armor small-sounds, canvas, distant horses waking. No music.

## CLIP 4 — 10s — V-MODE
- **Scene purpose:** scale stat-drop, Bucephalus, the Darius-family aside — three beats in one walking oner.
- **Blocking:** she walks with the moving camp (forward, §14 — never backward-tracking), Alexander a few steps ahead; Bucephalus is heard before he's seen (stamp/snort off-frame), then entered-into-frame at the horse lines; the guarded tent passes in mid-background; she drops her voice as it passes.
- **Camera strategy:** one continuous walking selfie oner. The three reveals are staged by blocking and sound, not camera moves.
- **Shot size:** chest-up on her, world layered behind.
- **Lens/perspective:** wide environmental feel — "the camp pressing in around her" — she is small-ish in her own frame here, per the brief: let the world dominate.
- **Camera movement:** natural walking handheld; one motivated swing toward Bucephalus (sound-motivated — she turns to the snort, camera follows her attention).
- **Composition (9:16 depth-stack):** moving soldiers as foreground occlusion at the edges (layer 1), her mid (layer 2), the Persian campfire horizon high in frame (layer 3) — the enemy's scale rides the top of the frame the entire walk without a single "wide shot."
- **Focus:** her sharp; horizon naturally soft; Bucephalus sharp when entered.
- **Lighting:** true dawn — low hard side-light, long shadows, ochre-gold but restrained (not golden-hour glam; §13 matte).
- **Environment:** waking camp fully alive (§17): fires being killed, tack lifted, lines forming — every background human moving with purpose.
- **Performance:** stat-drop as gossip with the bare-number repeat ("Twenty."); at the guarded tent her voice flattens, eyes flick to it and back — she does NOT point the camera at it (restraint; the audience leans in).
- **Continuity:** BUCEPHALUS §32 lock debuts (ears pinned at everyone but Alexander). Guarded tent: plain, two armed guards, NO royal iconography (§33 discipline — nothing that reads as a banner/emblem needing shape-spec).
- **Transition out:** the first horn hits BEFORE the cut (J-cut) — clip 5a opens already inside that sound.
- **Sound:** camp clatter, hooves, leather, the snort cue, distant horns at the tail. No music.

## CLIP 5a — 5s — **NOVA (owner-approved 2026-08-28)**
- **Scene purpose:** the wedge — geography and scale the audience must have before the impact: Alexander at the point, the gap ahead, the mass in motion.
- **Blocking:** the Companion cavalry assembles into the wedge at speed, Alexander at the tip on Bucephalus; the torn gap in the Persian line sits deep frame-right; support infantry flows below/behind.
- **Camera strategy:** the episode's ONE sweeping move. Everything before was still or walking — that restraint is what makes this hit (contrast rule).
- **Shot size:** full environmental.
- **Lens/perspective:** deep focus, "everything sharp from the nearest rider to the horizon dust."
- **Camera movement (§36, force-written):** "camera travels alongside the advancing cavalry at matching speed, low to the ground, drifting slightly ahead; DO NOT cut, zoom, or change framing at any point during the entire 5 seconds."
- **Composition (9:16):** LEFT→RIGHT advance. Depth-stack: blurred passing riders at the bottom edge (layer 1), the wedge and Alexander mid-frame (layer 2), the gap and Persian mass upper-right (layer 3), dust column climbing the top of the frame. Hazel's face NOT in frame (stitching rule 5); the support line she's inside may read as an anonymous mass at the frame's base.
- **Focus:** deep throughout.
- **Lighting (§37b):** bleached midday, dusty, desaturated, cool-leaning — explicitly "NOT warm, NOT golden, NOT cinematic-sunset" — but bright: mute-legibility holds.
- **Environment:** ground churned, dust real, both armies' masses genuinely populated (§17) — no thin crowds.
- **Performance:** Alexander's posture at the tip: low, forward, still — the calmest point of the fastest object on screen.
- **Continuity:** ALEXANDER + BUCEPHALUS locks; Macedonian gear bronze/crimson, Persian side visually distinct, zero iconography crossover (§33); screen-direction map obeyed; §22 written trace filed with the prompt (camera position, wedge vector, gap bearing).
- **Transition out:** hard cut to 5b on the loudest hoof-impact frame; the roar carries across the cut unbroken (§25).
- **Sound:** horns → massed hooves building. No music. The sound of this clip continues into 5b/6/7 as one unbroken bed.

## CLIP 5b — 5s — V-MODE
- **Scene purpose:** snap back to the human being inside the event; her line; the eyeline that launches clip 6.
- **Blocking:** she's carried in the moving support line, bodies passing both frame edges; at the end her head snaps toward off-frame right — toward the front.
- **Camera strategy:** tight, unstable, subjective — maximum contrast against 5a's smooth sweep. The gap/front is NOT in frame (behind her; §37c honest).
- **Shot size:** tight chest-up, closest V-mode framing yet.
- **Lens/perspective:** "wide, close, environment pressing in" — vulnerability framing.
- **Camera movement:** genuinely jostled handheld (motivated — she's being shoved), small frame hits as bodies clip her.
- **Composition:** soldiers as heavy foreground occlusion both edges; her face upper-third; dust streaking past.
- **Focus:** her sharp, everything else motion-soft.
- **Lighting:** identical grade to 5a (stitching rule 4).
- **Performance (§37a):** breath audibly ragged BEFORE she speaks; the line punched out in two bursts ("We're not staying back." / "We're going WITH them."); then the head-snap right — eyes wide, lips parting — held a half-beat.
- **Continuity:** tablet gripped visible in frame (gag object); wardrobe/dust state carries into 7.
- **Transition out:** eyeline handoff (stitching rule 1) — she looks; cut to what she sees.
- **Sound:** the same unbroken roar, now with close bodies, breath, leather — her line shouted over it.

## CLIP 6 — 10s — **NOVA (PROPOSED — the one NEW approval this breakdown asks for)**
- **The case FOR Nova:** this is the shot the whole episode's mute-legibility promise hangs on — "the line broke HERE." From inside the crush (V-mode), the model must render legible cause-and-effect in a chaos shot from a shoulder-height jostled camera: the highest-risk possible framing for the §22/§17 failure modes this project has already fought six rounds over on Troy/Legnica. One locked third-person frame makes the buckling line readable by construction. **The case AGAINST:** V-mode here would be more visceral and personal. **Recommendation: Nova** — 5b/7 already carry the visceral first-person load on either side of it; this beat's job is comprehension, not immersion. Owner decides.
- **Scene purpose:** the impact — the wedge enters the gap, the Persian line visibly breaks at the point of contact.
- **Blocking:** wedge tip drives in from frame-left; at contact the Persian formation buckles right-of-center — shields dropping, spears turning away, men scattering sideways out of the wedge's path. Cause and effect in one sustained frame.
- **Camera strategy:** LOCKED. Static camera, positioned on the Macedonian side (consistent with where 5b's eyeline pointed), and the action moves THROUGH the frame. After 5a's sweep, stillness reads as awe — and a locked frame is the single most legible possible staging (and the most reliably generatable).
- **Shot size:** full formation width of the local breach in the tall frame.
- **Lens/perspective:** compressed feel — "flattened perspective, the colliding masses stacked against each other" — collision density, not distance.
- **Camera movement (§36, force-written):** "completely static locked camera, NO movement, NO zoom, NO cut to any closer framing at any point during the entire 10 seconds."
- **Composition (9:16):** breach center-frame; Macedonian push entering lower-left; Persian mass upper-right beginning to fray at the contact point first, intact further away — the break must propagate visibly outward from one point.
- **Focus:** deep.
- **Lighting (§37b):** same bleached desaturated grade; dust as slate-grey, not glowing.
- **Environment:** fully populated both sides (§17 hard, scale-bible density floor: midground hundreds, background thousands in haze). FULL BATTLE stage per the scale bible: heavy dust at distance, dropped shields and snapped sarissas at the contact point, fallen men and horses where the wedge struck (§24-compliant — visible and real, never graphic), riderless horses breaking loose. Both lines run past both frame edges.
- **Performance:** none (no principals' faces; Alexander is inside the mass, identifiable by the wedge point only).
- **Continuity:** §33 gear separation absolute; screen direction L→R; §22 trace mandatory (camera bearing vs. 5a's, wedge vector, breach point — all derived in writing before generation).
- **Transition out:** exit into her reaction (stitching rule 2) — cut to clip 7 opening ON her face.
- **Sound:** the impact itself — timber-and-metal mass collision over the continuous roar; still no music.

## CLIP 7 — 11s — V-MODE
- **Scene purpose:** her reaction (moved here from old clip 6) + Darius's flight and the visible collapse — the battle decided on screen.
- **Blocking:** opens tight on her, mid-reaction. Behind/past her, deep in frame, the distinct chariot-and-standard wheels and RECEDES (§37c-correct: a face-on camera showing something shrinking away is honest geometry). Persian soldiers stream past her on both sides; nearest ones visibly glance toward the fleeing chariot before breaking themselves.
- **Camera strategy:** one continuous selfie take, two phases: reaction (0–3s), then she half-turns and the camera catches the deep-frame flight and the stream of retreat (3–11s).
- **Shot size:** tight on her opening; loosening slightly as she turns.
- **Lens/perspective:** her sharp; chariot deep-frame, small, distinct by silhouette and standard (visual identification, not detail).
- **Camera movement:** jostled handheld, buffeted by the men streaming past (motivated).
- **Composition:** retreating Persians as foreground occlusion crossing BOTH edges toward frame-left (away from the front — screen-direction map holds); the chariot upper-frame receding right-deep; her face upper-third clear of the caption band.
- **Focus:** her sharp; the flight readable by shape and motion.
- **Lighting:** same battle grade — the warm dusk shift belongs to clip 8, not here.
- **Performance (§37a, the moved reaction):** scleral show, mouth dropping to a full "O," both hands starting toward her face before catching and clamping the tablet, shoulders pulling inward — THEN the turn, and the line delivered flat, almost under her breath: "...That's him. He's LEAVING. And now everyone else is too."
- **Continuity:** dust/dishevelment carried from 5b; tablet still in hand; retreating soldiers' glance-then-break staging is mandatory (the domino must be visible on mute).
- **Transition out:** hard cut; battle roar collapses into wind + distant cries pre-lapped from clip 8 (§25 — filtered fall, never a dip to silence).
- **Sound:** roar thinning behind panicked feet and equipment hitting the ground; her near-whisper close to the mic.

## CLIP 8 — 8s — V-MODE
- **Scene purpose:** the earned personal beat; the gag payoff.
- **Blocking:** he rides in, dismounts near her before anyone else reaches him, glances at the tablet in her now-steady hand, one exchange, and he's pulled away into the crowd.
- **Camera strategy:** sustained medium; he approaches HER (and her lens) — approach-toward-camera is geometrically honest and §37c-clean. No cutting inside the exchange.
- **Shot size:** medium two-shot when he arrives.
- **Lens/perspective:** natural; the crowd soft behind them.
- **Camera movement:** settling handheld — visibly calmer than the battle clips; her steadiness after the storm told through the frame itself.
- **Composition:** he enters frame-left (arriving FROM the direction the wedge went — map consistency); campfire smoke columns rising in the vertical depth.
- **Focus:** the two of them sharp; celebrating camp soft.
- **Lighting:** bronze-amber dusk — the first warmth since clip 4, and it's earned/motivated (day's end, fires) — muted, not golden-glam (§13).
- **Performance:** Alexander dust-caked, voice level, "almost a smile" = one corner only, already moving as he says it. Hazel: holds the tablet UP into frame on her line — the no-longer-fumbling is shown, not narrated.
- **Continuity:** ALEXANDER + BUCEPHALUS locks (horse lathered, led off behind him); her battle-state (dust, loose hair) persists.
- **Transition out:** he exits frame; she watches him go; cut on her exhale (breath as the diegetic trigger).
- **Sound:** camp eruption held LOW and distant (restraint); his voice and hers close; fires catching.

## CLIP 9 — 9s — V-MODE
- **Scene purpose:** outro — thesis, double nerd-spike, sign-off.
- **Blocking:** she stands still for the first time all episode. Campfires relighting behind her, small figures moving between them.
- **Camera strategy:** the calmest frame of the episode; near-locked handheld. Bookends clip 3's stillness.
- **Shot size:** chest-up.
- **Lens/perspective:** shallow feel — "her sharp, the field of campfires softly blurred behind" — the world finally at a distance again.
- **Camera movement:** none beyond breath (§36: "no push-in, no drift, for the entire 9 seconds").
- **Composition:** her upper-third; the fire-dotted plain falling away below her in the tall frame — the day's whole geography quietly restated in one vertical image.
- **Focus:** locked on her.
- **Lighting:** deep dusk, ember warmth on one side of her face, cool night rising on the other — the episode's two palettes meeting on her skin.
- **Performance (§37a):** measured pace; on "he's dead at thirty-two" a small pause and a downward glance before the eyes return to lens; the sign-off quiet, with the ghost of a smile — moved, not sad.
- **Continuity:** final wardrobe/dust state = clip 8's exactly.
- **Transition out:** hold a beat of her face after the sign-off, cut to black; ambient bed fades AFTER the cut (L-cut into black, §25).
- **Sound:** night insects, distant low camp sound, fire crackle close. If any music ever enters the episode, this is the only clip allowed to carry it — and the default is none.

---

**QC hooks (unchanged, apply per clip):** `freezedetect` on every raw render (§26) · dense ≥3fps identity/geometry inspection · §21 double verification before every prompt · every clip sent to owner on creation (§20) · no regeneration without go-ahead (§19).
