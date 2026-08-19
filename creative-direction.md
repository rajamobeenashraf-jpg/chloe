# Creative Direction — Performance & Community Bible
**Role: Claude as creative director/producer · Last updated: 2026-08-19**

This is the standing reference for how our locked persona (v3 "round-cute", see `CHARACTER_LOCK.md`) behaves, reacts, and engages — so every future clip is directed consistently instead of re-derived from scratch each session.

## The mandate
Replicate everything that makes Chloe VS History work, mechanically and emotionally — then add what she doesn't have. Not a clone (different face, different name, different topic lane, different camera grammar) — same load-bearing craft, extended.

**STANDING INSTRUCTION (owner, 2026-08-19): Chloe-formula only until further notice.** The Nova hybrid camera mode (§4) is paused — no cinematic third-person F-mode set-pieces, no Nova-style loglines/pacing, in any generation until the owner explicitly says otherwise. All clips should be directed in Chloe's talk-to-lens vlog grammar. This directly informed the clip-1/clip-2 course-correction earlier: two consecutive F-mode action clips with no narrator beat is exactly the failure mode this instruction prevents. Treat §4's Nova elements as documented-but-inactive, not deleted — they come back only when told to resume them.

## 1. The seven mechanics we're replicating (from `chloe-vs-history-strategy-report.md` §1)
1. Persona, not narrator — same face every thumbnail, recognizable verbal habits, brand recognition
2. Vlog grammar — arrival shock → "here's the plan" → costume change → food review → unexpected event → irony beat → reflective outro
3. Dramatic irony as the core emotional engine — audience knows what's coming, she doesn't (or does, and can't say)
4. Shorts = top of funnel, long-form = the business — ~5 Shorts/month feeding monthly long-form tentpoles
5. Credibility playbook — pin a researched comment day one, disclose AI use plainly, correct errors gracefully, never get defensive
6. Familiar/curriculum-known settings — the thumbnail sells itself, zero cold-start explanation
7. Community-integrated continuity — recurring side characters, viewer callouts, milestone thank-yous, an easter egg worth hunting for

## 2. Emotional performance library
How she reacts, by beat type — derived from what actually drove engagement in Chloe's comments (§2 of the strategy report), not generic "AI vlogger" affect.

| Trigger | Direction |
|---|---|
| **Fear / dramatic irony** (her single biggest driver — see Titanic 9.6k comments, Pompeii) | Restrained, not screamy. Quiet dread. Whispered asides to camera. Holding it together on the surface while the audience can see it cracking. The "I know something you don't" tension, never played for cheap jump-scares. |
| **Awe** | Open, unguarded, briefly drops the vlogger persona — a landmark or moment actually stops her mid-sentence. |
| **Empathy for ordinary people** (the most-quoted beat type on the reference channel — steerage passengers' hopes, the child apprentice) | She goes quiet. Drops the jokes. Genuinely listens. This is the emotional core beat of every episode — do not rush it. |
| **Fish-out-of-water comedy** | Self-deprecating, physical, never mean-spirited. Comedy happens *to* her, she doesn't perform it at others. |
| **Sensory disgust** (food, smells, sanitation) | Exaggerated but affectionate. The food-rating ritual ("2/10, it bit me back") is a recurring beat, not a one-off joke. |
| **Happiness / genuine delight** | Unguarded smile, doe-eyes brighten, momentum picks up in her speech — this is when the "sweet, rounded" face reads warmest; use it deliberately in the character's happy beats. |

## 3. Community engagement playbook
- **Recurring side characters** — give each production a named local contact (the Liam-equivalent) who can reappear across episodes in the same era or setting.
- **Viewer callouts inside the video** — "the things I do for you guys," milestone thank-yous, referencing past episodes ("didn't have one of these since—").
- **Easter egg per video** — one deep-cut reference or cameo worth the comment section finding and discussing.
- **Pinned comment, day one** — real research citations, primary-source quotes, mortality/statistics where relevant, plus plain disclosure: "AI-assisted, historically researched, corrections welcome, I read everything."
- **Correction handling** — graceful, credit the commenter, never defensive. This is the single biggest survival factor for AI channels per the reference research.

## 4. What we're adding beyond the Chloe formula
- **Nova hybrid camera mode** — talk-to-lens narrator-guide (Chloe's role, builds the subscription bond) cutting to cinematic third-person set-pieces (Nova's role, delivers the stakes/spectacle) inside the *same* video, rather than picking one mode for the whole channel.
- **Survival stakes over pure tourism** — "does she make it?" structure (Oregon Trail, Wild West robbery) instead of only sightseeing.
- **American-first topic lane** — near-zero competition per the market research, plus America-250 tailwind through 2027.
- **Persistence-engineered continuity** — deliberately choosing tooling (PAI's `reference_video` chaining, or Higgsfield's `video_extension`) so face/outfit/environment hold across cuts instead of re-rolling identity every clip. This directly targets the #1 tell that makes AI channels look fake.

## 5. Production engine decision (2026-08-19)
**PAI Pro chosen as primary video engine** for this project, after a real head-to-head test (not spec-sheet reasoning) on the Wild West clip-1 prompt. Higgsfield remains the fallback/secondary tool (content-filter escape valve, and its `video_extension` mode is worth testing against PAI's `reference_video` before committing fully). Both engines cap individual clips at roughly the same real-world range (PAI: hard limit 15.2s per clip per `server/cli/_limits.js`; Higgsfield Seedance 2.5: 4–30s) — neither does long continuous single-shot generation; continuity across a multi-clip sequence comes from chaining references between short clips, not from one long take.

## 6. Scene-transition craft
This is what actually sells "she was really there" — not a model capability, a production discipline. Chloe's seamless cut-to-cut flow comes from cutting *on* action and sound, not from the AI model alone:
- **Match-cut on motion** — end clip N mid-gesture (turning, stepping, reaching) and start clip N+1 continuing that same motion, rather than cutting on a static beat. This is also exactly what makes `reference_video`/`video_extension` chaining pay off — feed the next generation the end frame *and* the motion direction of the previous clip.
- **Audio bridges (J-cuts/L-cuts)** — let the next scene's sound (crowd noise, footsteps, dialogue) start a beat before the visual cut, or let the current scene's audio trail into the next shot. Silence-to-silence cuts are the #1 tell of a stitched-together AI video.
- **Consistent color grade across every clip** — lock white balance/warmth/contrast direction per episode before generating, and restate it in every clip's prompt (e.g. "warm late-afternoon western light" used identically across all 1875 Wild West clips) so adjacent clips don't visibly shift in look.
- **Consistent NPC/background continuity** — where a scene has other characters (the sheriff, the robber, the kid), keep their described appearance identical across every clip they appear in, same discipline as the locked persona reference.
- **React before cut, not after** — end a clip on her reaction (the flinch, the laugh, the held breath) rather than cutting away mid-action; that reaction beat is what the next clip's opening motion should continue from.
- **Confirmed standing instruction (owner, 2026-08-19):** the final stitch/edit across all clips must read as naturalistic and smooth, matching how Chloe's own edits flow — this whole section is the checklist for that edit pass, not optional polish.

## 7. Within-clip continuity (owner correction, 2026-08-19; refined same day)
Found on clip 2 (arrival + horse near-miss): the model rendered an internal hard cut mid-clip instead of one continuous take. First fix attempt (dropping the horse beat entirely) overcorrected — it removed the external-factor drama that makes Chloe's videos feel alive (she's constantly reacting to things happening *around* her: crowds, animals, danger, chaos), which is exactly the ingredient we want to keep and out-do, not cut. **The goal is drama AND continuity together, not drama traded away for continuity.**

Root cause, more precisely: the failing prompt introduced the interruption with sequential "and then" framing ("partway through, a horse passes...") — that phrasing itself reads to the model as a scene change, because it describes two unrelated things happening one after another rather than one continuous unfolding moment. Rule going forward:
- **Keep external interruptions — direct them as embedded in the ongoing motion, not as a sequel event.** Put the source of drama in frame/audible from the very start (the cart already rumbling somewhere in the background), so the "interruption" is a continuation of something already present, not a new element cutting in.
- **Avoid "and then" / "partway through" framing.** Prefer simultaneous-action phrasing: "as she does X, she has to Y" rather than "she does X. Then Y happens."
- **One continuous physical thread, not two events.** She should be moving/reacting the whole time — walking, talking, gesturing — so the interruption is a variation in that same motion (a sidestep, a flinch) rather than a break from stillness into a different action.
- **Explicitly state single-take continuity in every prompt**: "single continuous unbroken shot, one camera angle throughout, no cuts, no scene changes, real-time continuous take" — do not assume the model defaults to this, even with the above framing.
- **Give it enough duration to breathe** (8s rather than 6s) so the interruption has room to land within the same shot instead of being compressed.

## 8. Context-appropriate pacing (owner correction, 2026-08-19)
Found on clip 4 (food review): she talked at full flat-out pace while chewing and drinking, which reads as fake — a real person can't deliver clean, fast, clear dialogue with a mouth full of food or mid-sip. Talking fast isn't itself the problem (it can suit plenty of beats); the problem is pace decoupled from what her body is physically doing. Rule going forward:
- **Physical state gates delivery.** Mouth full → delivery is muffled, slowed, or genuinely paused until she's swallowed, not full-speed clear speech continuing underneath. Mid-sip → she stops talking, drinks, resumes after — not simultaneous.
- **Match pace to the moment, not a default energy level.** Breathless after exertion → broken sentences, real gaps, gasping. Calm/reflective beat → slower, measured. Comedic reaction → a real pause for the reaction to land before the next line, not talk-through-everything.
- **State this explicitly in the prompt** for any beat involving eating, drinking, exertion, or a strong reaction — the model defaults to continuous energetic delivery unless told the physical action should interrupt it.

## 9. Clip duration is judged per beat, not defaulted (owner correction, 2026-08-19)
Caught immediately after §8: clip 4 v2 added the chewing/swallowing/drinking pauses but kept the same 8s duration — so the *fix itself* got compressed and would likely still read as rushed, because more content was asked to fit in the same time. Duration must be sized to what the beat actually contains, not defaulted to one number out of habit.
- **Judge each beat's duration from its content**, within PAI's hard cap of 15.2s per clip (`server/cli/_limits.js`): a simple single-reaction beat can be 5–6s; a normal talking beat ~8s; a beat with multiple sub-actions (line → bite → mumble → swallow → drink → verdict, or similar multi-step business) needs more room — 10–13s — so nothing has to be rushed to fit.
- **Count the beats in the prompt before setting duration.** If a prompt describes three or more distinct micro-actions in sequence, that's a signal to lengthen the clip, not compress the pacing.
- This is a per-clip judgment call each time, not a new fixed default to swap in for 8s.
- **Confirmed by owner:** clip 4 v3 at 13s (a multi-step food-review beat) landed well — "even 12s would have been fine, that pace is good." Treat ~12–13s as the validated target for a genuinely multi-step beat; verified again on clip 5 v2 (12s, a two-person dialogue exchange with a silent reaction beat). Still a per-beat judgment, not a new blanket default — a simple single-reaction beat should stay shorter.

## 10. Pre-generation self-check (owner instruction, 2026-08-19)
Caught on clip 7: she shouted "GET DOWN!" only after they were already down (dialogue fired out of causal order with the action it's supposed to trigger), and the robbery scene showed one boy — not the crowd scale that "chaotic" actually requires. Owner's explicit instruction: **stop relying on being told about small things after the fact — catch them before generating.** This is now a mandatory pass over every prompt before submission, not a reactive fix list:
- **Dialogue-action causality.** A warning/exclamation tied to an action (e.g. "get down") must be timed to fire *at the moment of or just before* that action, never after it's already happened — check the sequence described in the prompt actually matches real cause-and-effect order.
- **Scene population matches the described intensity.** A word like "chaotic," "panicked crowd," "robbery," "riot" etc. requires actually populating the scene with multiple background people in the prompt — not one character standing in for the whole event. Scale the visible cast to the drama being claimed.
- **Re-apply every standing rule automatically, every time** — single continuous take (§7), embedded-not-sequential drama (§7), physical/dialogue pacing gated by state (§8), duration judged per beat (§9) — these are not one-time fixes, they are a checklist to run before every single generation from here on, without needing a fresh reminder.

Caught on clip 8, same session — two more instances of the identical failure mode (not checking geometry/continuity before generating), added to the same checklist:
- **Spatial staging must support the sensory event described.** If a prompt says two characters make "eye contact," the positions described must actually put them in each other's sightline — a robber placed "behind her" cannot be met with eye contact; either stage him where she could plausibly see him (stepping into view at her side/front, glimpsed around cover) or change the sensory mechanism to match the geometry (she hears his boots, catches his shadow, glances back over her shoulder and spots him). Read the positions in the prompt and verify the described perception is physically possible before submitting.
- **Established relationships/motivations must carry forward, not reset.** If she just risked herself to pull the boy to safety, she does not abandon him in the very next clip without in-story reason — carry the commitment forward (she grabs his hand and takes him with her) unless something in the story explicitly separates them.

## Status: all 10 clips produced (2026-08-19)
Full shot list from `PROJECT_HANDOFF.md` §3 is generated and owner-approved, final filenames in `pai-pro/projects/wildwest/assets/`:
1. `clip1_vlog_v3.mp4` — cold-open tease, reshot in V-mode (talk-to-lens) to match clip 7/8's handheld grammar; debris-reaction physics/pacing carried over from the earlier fix. Supersedes `clip1_pai_v2.mp4` (the original Nova-style cinematic version, kept only for reference).
2. `clip2_vlog_arrival_v3.mp4` — arrival + horse-cart drama, single take
3. `clip3_costume_fixed.mp4` — corset-lacing, deflicker-corrected
4. `clip4_food_v3.mp4` — saloon food review, 13s, paced
5. `clip5_irony_v2.mp4` — gold-shipment irony beat, 12s, paced
6. `clip6_sheriff.mp4` — sheriff dismissal, 12s
7. `clip7_robbery_v2.mp4` — robbery breaks out, populated chaos, timing-fixed
8. `clip8_escape_v2.mp4` — eye contact + escape, geometry/continuity-fixed
9. `clip9_aftermath.mp4` — breathless aftermath, hat returned (sheriff callback)
10. `clip10_outro.mp4` — sunset outro, back to 2026

## Status: final cut assembled (2026-08-19)
All 10 clips stitched into one Short with `pai-pro/projects/wildwest/build_final_cut.mjs` (ffmpeg, ffprobe-driven): 0.4s video `xfade` + audio `acrossfade` crossfades between every clip (no hard silence-to-silence cuts, per §6), per-clip `loudnorm` audio normalization so dialogue levels don't jump between clips. Runtime ~1:50.
- **Master file**: `assets/wildwest_final_cut.mp4` (CRF 16, ~80MB) — use this for actual upload/further editing.
- **Delivery copy**: `assets/wildwest_final_cut_compressed.mp4` (~1.5Mbps, ~22MB) — re-encoded only to fit the chat delivery size limit; lower bitrate, review copy only, not the upload master.

## Next steps
1. Owner review of the assembled cut — confirm transitions/pacing read as smooth and naturalistic across the full runtime, not just per-clip.
2. Cut 4 Shorts-within-the-Short per the promo plan if still wanted (see original concept notes).
3. Apply the community playbook (§3) at launch: pinned comment, recurring character, easter egg.
4. Consider Higgsfield Soul training on approved v3 renders for hard-locked consistency on the next production.
