# AI Historical Time-Travel Channel — session brain

US-market AI historical channel reverse-engineered from Chloe VS History and Nova Time Travel. Owner: Mobeen Ashraf.

This file was reconciled 2026-08-20 from the two prior CLAUDE.md versions on a
newest-command-wins basis: every rule the owner never changed is kept; where an
older rule conflicts with a later owner decision, the later decision stands and
is marked. Latest owner decisions recorded: 2026-08-22 (ask before every clip
regeneration + send every clip to the owner for approval, reinforced: sending
the clip is never gated behind Claude's own findings — see the QC rule below).

## MASTER RULE — mandatory pre-task rule review + application (owner lock 2026-08-29, permanent, no exceptions)

**Every rule this project has ever agreed on is a permanent production rule from the moment it's agreed — never contingent on the owner reminding Claude again.** This file and the numbered docs below are the rulebook. This section governs HOW they get used: knowing a rule exists is not the same as applying it, and a rule that isn't translated into the actual generation prompt has no effect on the result.

**Before any production task** — generating a still or frame, writing or revising a generation prompt, regenerating a clip, choosing camera coverage or movement, selecting a generation model, designing character performance/emotional intensity/speech pacing, designing sound or music, editing, transitions, continuity, historical reconstruction, or any other production decision — Claude must:
1. **Identify every established rule that applies to this specific scene/clip/shot/character/decision** — name them, don't just gesture at "the rules." Check `cinematic-direction-brief.md`, `creative-direction.md`, `PROMPT_LEARNINGS.md`, and this file for anything on point.
2. **Translate each applicable rule into concrete, situation-specific instructions inside the actual prompt.** A rule that would change the generation result must appear as prompt text, not just live in Claude's awareness. (Concrete failure case, logged 2026-08-29: Clip 2's dialogue used only attitude words — "worked up," "half-amused," "brisk" — never explicit per-character speech tempo, so Alexander's hard-locked "unhurried, never rushed" trait and Hazel's comedic-hesitation beat both got overwritten by the scene's ambient urgency. See `episode-alexander-production-log.md`.)
3. **Run the full analysis chain before writing any prompt**: scene → historical context → dramatic purpose → environment → scale → character performance → emotional intensity → speech pacing/delivery → camera & coverage → sound/music → editing & continuity → model suitability → THEN write the prompt. Never jump straight from character + dialogue + location to a final prompt.
4. **Actively evaluate model suitability every time**, even though Seedance 2.5 is default — check whether THIS scene has a material limitation Seedance can't meet before defaulting to it out of habit; if one is found, follow the full switch-proposal + approval process (`cinematic-direction-brief.md` §14) rather than silently continuing on Seedance or silently switching.
5. **Before presenting any final prompt, run this checklist and fix anything that fails before finalizing, not after a poor generation reveals the gap:**
   - Applied every relevant permanent rule, specifically, not generically?
   - Translated those rules into actual prompt text?
   - Made the camera decision deliberately — single vs. multiple angles, movement, coverage?
   - Calibrated character emotion to the actual required intensity (brief §11)?
   - Calibrated speech pacing/delivery per character to the actual situation, never a generic uniform pace (brief §11.3)?
   - Checked the dialogue's word count against the clip's duration at each character's situation-appropriate wpm, and adjusted the duration (not just the wording) if the math doesn't work (see the Dialogue word-count vs. clip duration rule below)?
   - Stated each character's eyeline explicitly for every beat where it isn't obvious or unchanging — who is looking at whom, and when it shifts (see the Eyeline / gaze direction rule below)?
   - Checked historical scale and environmental realism (brief §7)?
   - Considered sound and music where relevant (brief §15)?
   - Considered editing and continuity?
   - Evaluated whether the default model is genuinely the best choice for this scene, and followed §14 if not?

If two established rules genuinely conflict for a given shot, name the conflict and propose the professional resolution — never silently drop one.

**If a previously-agreed instruction has not yet been formally written into a permanent rule somewhere in this project's files, convert it into one now, in the correct governing document, the moment the gap is noticed** — never leave it as conversational-only memory. Applies to every category of established rule, including but not limited to: situation-based speech pacing and delivery, emotional intensity and performance, historical realism and scale, environmental realism and crowd density, physical consequences of action, camera coverage and multi-angle decisions, editing, visual and lighting continuity, sound design and music, scene pacing and retention, model selection and the model-switching protocol, character and environment consistency. A missed established rule discovered after a poor generation is a process failure, not an acceptable outcome — the objective is the best possible result on the first generation, minimizing regenerations, not catching gaps after the owner has to point them out.

Read before any creative, research, or production work — these files are this project's memory:
1. `NEW_CHAT_HANDOFF.md` — START HERE: operating manual (setup, parallel-chat rules, approval gates)
2. `PROJECT_HANDOFF.md` — current state, locked decisions, owner preferences
3. `CHARACTER_LOCK.md` — locked character, **v5 (owner redesign locked 2026-08-29 — prettier/cuter, fair rosy complexion, bare pink lips, faint freckles; hazel eyes + bronde hair kept)**; NEVER regenerate the face from text; age locked — topic closed. The v5 master still + approved v5 4-view set are the canonical refs (CDN URLs inside the lock); the v4 "as-filmed" canon (the original 20 images) is ARCHIVED in the same file — back-catalog reference only, never for new generations. Owner decision 2026-08-20 stands: the lock DOCUMENT is the character sheet for every new chat; reference-image files are NOT on this branch — use the permanent CDN URLs inside the lock (the durable source), with v4-era repo copies archived on branch `claude/keen-franklin-ldvq7r`
4. `CONTENT_SHEET.md` — **the entry point for any lifestyle/non-episode image or video request** ("use the content sheet to make..."). Scope: everything that is NOT an episode (fashion/lifestyle shorts, transitions, party/dance/travel content, etc.) — episodes still use `CHARACTER_LOCK.md`'s reference set directly; if a request looks like it could be either, stop and ask the owner rather than guessing. Contains the **REAL-FOOTAGE-FIRST rule (owner-locked 2026-08-23, the strongest rule in the project)**: any bare-face/natural-look phase of lifestyle content MUST use real, unedited episode footage — never AI generation — because a bare face has no makeup layer to mask AI repaint drift; generation is reserved for scenes that cannot exist in footage (glam looks, new outfits/settings); joins between real footage and generated scenes use real video editing (ffmpeg cuts timed to music), never an AI-generated transition. Also holds the indoor/outdoor source-matching rule and the never-instruct-makeup-removal rule (she only wears lip tint in the episodes — "remove makeup" prompts make the model repaint her actual identity features instead).
5. `creative-direction.md` — format rules, incl. §12 active-participant directive and §16 cross-episode pipeline rules (transitions = hard cuts only, caption rigor, engine facts; merged 2026-08-20, newest-command-wins)
6. `research-methodology.md` — how to research & score episode ideas (multi-signal, never raw views alone), platform priorities, and the video-QC pipeline (§4 — note: its per-clip "Stage A" is SUPERSEDED, see the QC rule below)
7. `chloe-vs-history-strategy-report.md` + `chloe-titanic-video-study.md` — reference-channel analysis (verified vidIQ data + machine watch-through)
8. `episode-ideas-backlog.md` + `episodes-2-4-scripts.md` — pipeline state

Standing rules:
- The repo's **default branch is the source of truth**; session branches are workbenches. When an episode wraps (final render approved), its branch is merged into the default branch **with the owner's approval** so future sessions inherit its logs, prompts, and learnings. Commit and push working files as you go (scripts, prompts, logs, and a small manifest listing each generated clip's PAI/Higgsfield job ID + URL) — an unpushed container can expire and take that work with it. Generated video/image files themselves stay **out of git** unless the owner explicitly says otherwise; they remain retrievable from PAI/Higgsfield by job ID, and the manifest is what lets another session QC them.
- Video output is vertical 9:16 unless the owner says otherwise. The character's name is **HAZEL** (owner lock 2026-08-20, recorded in `CHARACTER_LOCK.md`) — it may appear in dialogue, captions, and on-screen text. Proposed sign-off ritual "Hazel — out of time" awaits owner confirmation.
- Judge episode ideas by the signal stack in `research-methodology.md` — never by raw views alone.

## Angles 2.0 / SHOTS — permanent standing rule (owner lock 2026-08-29, no exceptions)

Higgsfield's **Angles 2.0** (directed single camera-angle change from one photo) and **SHOTS** (9 AI-picked angle options from one photo) are website-only tools — verified NOT reachable via the Higgsfield MCP connector (absent from `apps_search`), and NOT reachable via any sandboxed/local browser either (verified 2026-08-29: a Playwright session, whether in the Higgsfield cloud sandbox or this environment's own Chromium, is always a fresh anonymous session with no path to the owner's Higgsfield login — there is no bridge from this environment to the owner's device, browser, or credentials, regardless of which browser engine is used).

**Standing rule, permanent, every session, no exceptions: whenever Claude judges that a shot would benefit from a specific new camera angle (Angles 2.0) or from seeing multiple angle options of one composition (SHOTS), Claude tells the owner explicitly, at the point the need arises — never silently substitutes a workaround, never skips it, never claims afterward to have forgotten.** The owner then runs the tool himself on higgsfield.ai and sends Claude the resulting image to use/animate. This is the owner's explicit, repeated instruction (2026-08-29) and is not contingent on Claude's memory in any given session — it is written here so every future session inherits it automatically.

## Immediate delivery — permanent standing rule (owner lock 2026-08-29, no exceptions)

The moment any clip finishes rendering, Claude downloads it immediately, runs the standard QC pass (freezedetect + frame-extraction spot check, per `PROMPT_LEARNINGS.md` X2), and sends it to the owner in chat — without delay, without doing anything else first (no logging, no starting the next clip, no further analysis ahead of delivery). This does not change the existing rule that delivery is never gated behind QC findings (see the QC rule below) — QC runs fast, immediately before/alongside delivery, never as a blocking gate; findings are reported as supplementary information alongside the delivered clip, never held back pending a fix. Applies to every clip, every episode, present and future.

## 4K upscale sequencing — permanent standing rule (owner lock 2026-08-29, no exceptions)

**Never generate an asset directly at 4K, and never upscale one to 4K, before the owner has approved it.** The sequence is always: generate/deliver at the normal working resolution → send to the owner for approval, exactly as every other clip/still is delivered per the QC rule below → only once the owner has explicitly approved it, run the deterministic upscale (`upscale_image` / `upscale_video` — content-identical, no drift risk) to 4K. This applies to every generated asset in every episode, present and future: start-frame stills, standalone reference images, and any video clip the owner later wants upscaled — not just the CHARACTER_LOCK canon set that originated this pattern.

Found on the Alexander/Gaugamela episode: Clip 2's corrected start-frame still generated at nano_banana_pro's default 2K (a separate process bug, logged in `PROMPT_LEARNINGS.md` as X3) and was upscaled to 4K as part of fixing that bug — before the owner had weighed in on ordering. The owner then locked this explicit approve-before-upscale sequence as the permanent rule, independent of that bug: even when 4K is clearly the right eventual resolution, upscaling is an action that waits for approval like any other production step, never something Claude does proactively or automatically.

## Eyeline / gaze direction — permanent standing rule (owner lock 2026-08-29, no exceptions)

**Every prompt involving dialogue between characters explicitly states where each character's eyes are, beat by beat — this is written into the prompt every time, never left implicit.** Wardrobe, camera position, and dialogue text being detailed is not sufficient; eyeline is a basic filmmaking fundamental (arguably more basic than camera angle or pacing) and defaults to something plausible-but-wrong — a character absorbed in a prop, looking at nothing, or looking at the wrong person — whenever the prompt doesn't specify it.

Found on Clip 2 (Alexander/Gaugamela): Hazel was written holding a tablet and receiving dialogue directed at her, but nothing in the prompt said where her eyes were — she rendered looking down at the tablet through the entire exchange, including the beat where Alexander speaks to her directly, instead of meeting his eyes. Fixed by stating explicitly, per beat, whose eyes are on whom and when they shift (e.g., "her eyes lift from the tablet to meet his the instant he addresses her, and hold through her own answering line; she glances back down only after she finishes speaking").

**Applies to every future dialogue clip, this episode and all others**, as an explicit item on the MASTER RULE's pre-finalization checklist: before presenting a final prompt for any clip with more than one character or any character with a prop/task competing for their attention, state each character's eyeline for every beat where it isn't obvious or unchanging — who is looking at whom, when it shifts, and why.

## Dialogue word-count vs. clip duration — permanent standing rule (owner lock 2026-08-29, no exceptions)

**Before finalizing any clip's dialogue and duration, compute the words-per-minute the script actually demands, and re-decide the clip's length from that — never assume a fixed duration and hope the dialogue fits.** This check comes before writing any pacing instruction or audio reference, not after one fails: `total dialogue word count / clip duration in minutes = required wpm`. If that number exceeds what a human can actually say at the pace the scene calls for, no amount of prompt language, audio-reference tempo, or "unhurried" instruction can fix it — the clip is asking for something physically impossible, and every downstream pacing attempt will fail for a reason that was never about prompting at all.

**The target wpm is situation- and character-specific, not a single fixed number** — this is the same principle as the speech-pacing rule itself, applied one level up: the dialogue's own content tells you what pace it needs. **The bands below are platform-corrected (owner lock 2026-08-29, research-verified) — this channel is vertical short-form (YouTube Shorts/TikTok/Reels), and short-form's own retention standard runs AT OR ABOVE natural conversational pace (120–160 wpm baseline), never below it, because any stretch that reads as "dead time" costs retention. A "deliberate/unhurried" character trait is conveyed through pause placement and word emphasis, not by dragging the overall word rate below natural speech — that was the actual mistake behind the "now it's too slow" finding on Clip 3 v2, a correction of the original (uncorrected, sub-natural) 90–120 band this rule shipped with.**
- Urgent/frantic delivery (a Parmenion-type beat): ~160–200 wpm.
- Neutral conversational delivery: ~140–160 wpm.
- Deliberate, confident, weighty delivery (an Alexander-type beat, or any scene where pauses carry meaning): ~120–140 wpm — near-natural, NOT sub-natural. The "unhurried" quality comes from WHERE the pauses land and WHICH words get emphasis, not from a suppressed word rate: routine pauses ~0.10–0.25s, one longer pause ~0.30–0.60s placed right before something important lands, and a single deliberately slower beat used as CONTRAST against an otherwise normal pace — a uniformly slow read has no contrast left to spend and just reads as dead air, which is worse for retention than being too fast.
- Whispered or quiet delivery: can drop below the 120 wpm floor when breath-constrained, but still keep it as short as the moment allows — reserve true slowness for the specific beat that earns it, not the whole line.

Sum each character's lines at their own situation-appropriate target pace (plus the strategic pause budget above, not blanket slowdown) to get the real time the scene needs, then set the clip's duration to that — not the reverse.

Found on the Alexander/Gaugamela episode: Clip 2 (9s) packed 47 words of dialogue — 313 wpm implied. Clip 3 (8s) packed 44 words — 330 wpm implied. Both are roughly double even fast/urgent natural speech. Every attempt to fix Alexander's pacing specifically (rewritten text instructions, two separate ElevenLabs audio-reference retakes with genuine multi-second pauses) failed — not because of a Seedance limitation, but because his lines were consistently the longest in each clip and "unhurried" is the pace with the least room to absorb an overpacked script; Parmenion's and Hazel's shorter lines masked the same underlying problem. This was misdiagnosed as a possible model limitation (the same category as the confirmed camera-geometry finding, S12) before the actual math was checked — a real process gap, now closed. A second, related process gap found later the same day: once the math was fixed and Clip 3 was regenerated at the (then) 90–120 wpm band for Alexander, the owner reported it now read as too slow — research confirmed the band itself was wrong for a short-form platform (see above), not just the earlier arithmetic.

**Applies to every future clip, this episode and all others, as an explicit MASTER RULE checklist item**, checked before speech pacing/delivery is calibrated (the checklist item this feeds into) — not as a separate afterthought.

**+20% owner override (owner lock 2026-08-29, permanent, no exceptions).** On top of every band and every clip-specific target above: take whichever wpm number was actually decided for a given character/clip — if a range was used, take the range's UPPER limit as "the decided number," never the midpoint or lower end — then the real target is that number **× 1.20**. This applies retroactively to every clip already decided in this episode and going forward to every future clip and character, with no carve-out for the quiet/whispered exception beats (those get +20% too, e.g. a 75 wpm sign-off target becomes 90). Owner was told before locking this that some resulting numbers (e.g. 240 wpm) sit at or past the edge of naturally-speakable, intelligible human speech, well above anything reliably hit so far with the available pacing-reference tools — owner confirmed to proceed anyway. Concrete numbers for the Alexander/Gaugamela episode, decided-number → ×1.20 target: Clip 2 Parmenion 200→240, Clip 2 Alexander 140→168 (inferred upper bound, not yet clip-specifically finalized before this rule landed), Clip 2 Hazel 150→180, Clip 3 Alexander 130→156, Clip 3 Hazel 150→180, Clip 4 Hazel 145→174 / 145→174 / 125→150, Clip 5b Hazel 200→240, Clip 7 Hazel 200→240, Clip 8 Alexander 150→180, Clip 8 Hazel 160→192, Clip 9a Hazel 130→156, Clip 9b Hazel first beat 130→156 (inferred, not yet clip-specifically finalized), Clip 9b sign-off 75→90. Any clip/character target not yet numerically decided at the time this rule was locked still needs a first number chosen (per the normal situation-based method above) before the ×1.20 is applied to it — never skip straight to guessing the multiplier's input.

**Hazel-only +10% stack (owner lock 2026-08-29, permanent, no exceptions, applies going forward only).** On top of the +20% override above, Hazel's targets get one further ×1.10 (i.e., ~×1.32 from her original decided number) — Alexander's and every other character's targets are UNCHANGED by this, this stack is Hazel-specific. Applies to every clip not yet finalized/approved at the time this rule was locked, and to every future clip going forward; it does NOT apply retroactively to a clip already approved as delivered (Clip 3 was approved at its existing Hazel 180 wpm target and stays there — it is not bumped to 198). Concrete numbers for the Alexander/Gaugamela episode, +20%-number → ×1.10 final target: Clip 2 Hazel 180→198, Clip 4 Hazel 174/174/150→191/191/165, Clip 5b Hazel 240→264, Clip 7 Hazel 240→264, Clip 8 Hazel 192→211, Clip 9a Hazel 156→172, Clip 9b Hazel first beat 156→172, Clip 9b sign-off 90→99.

## ElevenLabs pacing references — permanent standing rule (owner lock 2026-08-29, no exceptions)

**Every generated clip with dialogue uses ElevenLabs per-character pacing-reference audio, for this episode and every future episode, from now on — not text tempo instructions alone.** Text-only speech-pacing instructions (attitude parentheticals, even explicit contrastive tempo language) were tried twice on the same clip and failed twice to differentiate multi-character delivery — the second attempt had the tempo written directly and explicitly into the prompt and still didn't land. ElevenLabs audio pacing references, tried third, is what the owner is locking in as the standard method going forward.

**Method (established on Episode/Gaugamela Clip 2, `pai-pro-tooling/alexander`):**
1. Compute this character's situation-derived target wpm for this clip per the Dialogue word-count vs. clip duration rule above — never a fixed universal number; the actual band comes from that line's own delivery instruction and can fall outside the rule's illustrative bands (120-140 / 140-160 / 160-200 / sub-120-for-quiet-only) if the situation genuinely demands it. Remember these bands are platform-corrected for short-form retention — "deliberate" is conveyed via pause placement and emphasis, not by targeting a sub-natural wpm number.
2. Generate a short `eleven_v3` take (the model that supports inline direction tags like `[urgent, breathless]`, `[calm, unhurried, deliberate]`, `[hesitates, pause]`) reading that character's actual line(s), using punctuation-forced pacing (short clauses, ellipses) in the text itself, not just bracket tags — pick a voice fitting the character from `creative_list_voices`.
3. **Verify before using — never assume the tag/punctuation worked.** Measure the take's actual `duration_secs` against its word count to get the real delivered wpm, and check it against the target computed in step 1. This measurement step is mandatory and was the actual gap that caused the Clip 2/Clip 3 pacing saga: audio references were used as prompt inputs for multiple rounds without ever checking whether the reference itself was at the intended pace.
4. **If the measured wpm misses the target band, do not retry blindly on the same model.** Fall back to Higgsfield's own `seed_audio` model (`generate_audio` tool, ByteDance engine) with its numeric `speech_rate` parameter (-50 to +100, confirmed via `models_explore`) calibrated toward the target — this is a genuine numeric tempo control, unlike `eleven_v3`'s tags/punctuation, which ElevenLabs' own docs confirm do not include a speed parameter for v3 at all. Re-measure the `seed_audio` take the same way before using it. Since this reference audio only feeds Seedance a tempo/rhythm cue and is never the on-screen voice the audience hears (Seedance generates that itself), switching engines for the reference does not touch the locked, on-screen character voice.
   Found on Clip 3 (Alexander/Gaugamela): Hazel's `eleven_v3` take with punctuation-forced pacing measured 115 wpm against a (then) 115-140 target — passed, used as-is. Alexander's `eleven_v3` take, same technique, measured 148 wpm against a (then) 90-120 target on two separate attempts (bracket tags alone, then punctuation-forced) — failed both times on that specific voice. Falling back to `seed_audio` at `speech_rate: -30` measured 91 wpm — inside the target band at the time, first try. NOTE: that 90-120 target has since been corrected to 120-140 (see the Dialogue word-count vs. clip duration rule above) after the owner reported the resulting clip read as too slow for short-form retention — the 91 wpm result that passed here would now fail the corrected band and needs recalibrating toward ~130 wpm using pause/emphasis technique rather than a flatter, slower read.
5. Import the verified take into Higgsfield storage via `media_import_url` to get a `media_id`.
6. Pass each character's verified take as a separate `audio_references` media entry in the Seedance `generate_video` call (one per character, alongside the existing image identity/environment references — this is additive, not a replacement for the image-reference package).
7. In the prompt's REFERENCE ROLES section, explicitly instruct the model to take **tempo, rhythm, and delivery timing** (not timbre) from each `@AudioN` reference for that character's lines specifically — this is a deliberate, stated reversal (for pacing-bearing clips only) of the project's general "audio references control ONLY timbre" convention, since timbre-only was never validated as the actual constraint and pacing is the thing that needed fixing.
8. Text-based tempo instructions in the DIALOGUE block stay in the prompt too (belt-and-suspenders) — the audio references reinforce them, they don't replace writing the pacing rule into the text.

This is a standing production step now, not a case-by-case judgment call: any clip with more than one speaking character, or any single-character clip where pacing carries real dramatic weight, gets a verified pacing-reference audio before its prompt is finalized — per the MASTER RULE's checklist, this is now one of the items to verify before presenting a final prompt.

## Owner's QC rule (decided 2026-08-20 — supersedes the per-clip "Stage A" in research-methodology.md §4)

- Do NOT run Gemini (or any machine video-analysis) during the clip-GENERATION
  stage. Clips are generated in PAI Pro under the existing process and the
  owner's approval gates, with no Gemini involvement.
  **One owner-approved exception (2026-08-29): Gemini eyes MAY run on
  VALIDATION/TEST clips at generation stage** (e.g. a new model's or method's
  test shot, before it enters production) — because frame-sampling QC cannot
  see motion defects. Production clips remain under the original rule:
  edit-stage only.
- Gemini eyes comes into action only at the EDITING stage, once all of an
  episode's clips are generated. Run it there on:
  1. the full clip set entering the edit,
  2. assembled/stitched cuts (while conforming visuals, lighting, transitions),
  3. the subtitle pass (`captions` mode, cross-checked against the .srt).
- Claude fixes flagged issues independently where the fix is NOT a clip
  regeneration: re-stitch, correct caption text or timing, adjust the
  conform. Every regenerated clip still gets re-checked at the edit before it
  re-enters the cut, and every CONFIRMED finding is either fixed or
  explicitly waived by the owner before delivery.
- **PERMANENT, owner lock 2026-08-21 — supersedes this section's older
  "regenerate...only when a CONFIRMED flag requires it" self-directed
  language: ask the owner before submitting ANY clip regeneration, every
  time, whether the finding comes from Claude's own review or from Gemini
  eyes.** Report the confirmed issue and the proposed fix, then wait for
  explicit go-ahead before submitting it to PAI/Higgsfield. Applies per
  regeneration attempt, not just per clip — a first fix attempt that doesn't
  land needs a fresh check-in before a second attempt, not silent iteration.
  Found on Episode 6: 5 clips were regenerated across two QC rounds (a
  self-QC pass, then Gemini eyes) without a check-in; the owner asked why
  and locked this rule for every future episode. Companion rule, same
  session: `creative-direction.md` §19 (fuller writeup) and §18 (the
  related, broader "no unauthorized creative deviation" rule from Episode 5
  — this rule tightens §18's "routine execution" carve-out specifically for
  regenerations, closing the gap that let routine-seeming re-tries proceed
  without sign-off).
- **PERMANENT, owner lock 2026-08-21 (companion to the regeneration rule):
  every generated clip is SENT to the owner in chat the moment it exists — a
  compressed copy of the actual footage, per clip, never batched or merely
  described — with approval explicitly requested. No clip enters the edit
  until the owner approves it, and every regenerated version goes back to the
  owner the same way. This send is never gated behind Claude's own QC or
  Gemini eyes findings running first — deliver the footage, then report any
  findings as supplementary information, not as a proposed fix awaiting
  approval; only the owner's own decision after watching starts a
  regeneration (owner reinforcement, 2026-08-22). Fuller writeup:
  `creative-direction.md` §20.**
- Treat unverified low-severity findings as hints, not facts; only findings
  marked CONFIRMED by the verify pass are trusted.
- Before publish: run Higgsfield `virality_predictor` on the render; the owner's
  watch-through remains the final gate.

## Caption system (owner-locked 2026-08-23 — supersedes full-line cues for ALL episodes)

Captions are word-synced CHUNKS, reverse-engineered from the owner's reference reel and approved from a measured-timing demo: 1–2 word ALL-CAPS chunks, each REPLACING the previous (never accumulating into lines); a chunk is on screen only while its words are spoken; pauses ≥0.35s leave the screen caption-free; hard cut in/out, no animation; serif style (Liberation Serif bold, spacing 2.5, white + thin dark outline, MarginV=320); NO speaker tags (a gold speaker-color variant is under consideration — not yet decided).

Implementation (reference: Episode 7, `pai-pro-tooling/troy/`):
- Timing comes from **measured per-word timestamps** (`make_word_chunks.py`, faster-whisper, script-biased) — never estimated, never interpolated except clamped within known line windows for words the model can't hear (chaos-noise clips), and any such fallback is frame-verified before shipping. Script text is ground truth; whisper only carries timing.
- `qc_pass.mjs` (spacing-capable) burns one Dialogue event per chunk; keep line-level cues as a `captions_data_lines_backup.mjs`-style source-of-truth input.
- The session-start hook installs faster-whisper automatically; model weights pull from Hugging Face (domains already allowed on this environment).
- New episodes: copy `make_word_chunks.py`, `qc_pass.mjs`, and the `SUB_STYLE` block from `pai-pro-tooling/troy/` into the new episode's tooling dir, write the script lines with rough line windows, run the tool, review its per-clip match report, frame-verify anything it flags.

Tooling:
- **vidIQ MCP** — YouTube + Instagram/TikTok data: outliers, keywords, stats, comments, transcripts, video watching. Calls cost credits — check `vidiq_balance`, batch questions.
- **Higgsfield MCP** — image/video generation, `virality_predictor` (pre-publish). Its `video_analysis_create` is edit-stage-only under the QC rule above.
- **ElevenLabs MCP** — voice.
- **PAI Pro** at `/home/user/pai-pro` (the same engine behind Chloe VS History); active project in `.active_project`; `PAI_KEY` lives in its gitignored `.env`.
- **Gemini eyes — primary tool: `tools/gemini-eyes/gemini_eyes.py`** (two-pass: high-res sweep, then confirm/dismiss re-watch of each serious finding at 5 fps; modes `qc` / `captions` / `study` / `ask`; auto-loads CHARACTER_LOCK.md for identity checks; usage in `tools/gemini-eyes/README.md`). The older `scripts/gemini-eyes.mjs` remains available. Both need the `GEMINI_API_KEY` env var (setup + model/quota guidance: `research-methodology.md` §5). Never commit API keys.
