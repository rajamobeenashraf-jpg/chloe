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

## Next steps
1. Validate PAI's `reference_video` chaining (clip 2 built using clip 1 as a video reference) before committing to the full 10-clip Wild West Short.
2. Once continuity is confirmed, produce the remaining clips against the shot list in `PROJECT_HANDOFF.md` §3, directed per the emotional library above.
3. Apply the community playbook (§3) at launch: pinned comment, recurring character, easter egg.
