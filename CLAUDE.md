# AI Historical Time-Travel Channel — session brain

US-market AI historical channel reverse-engineered from Chloe VS History and Nova Time Travel. Owner: Mobeen Ashraf.

This file was reconciled 2026-08-20 from the two prior CLAUDE.md versions on a
newest-command-wins basis: every rule the owner never changed is kept; where an
older rule conflicts with a later owner decision, the later decision stands and
is marked. Latest owner decisions recorded: 2026-08-22 (ask before every clip
regeneration + send every clip to the owner for approval, reinforced: sending
the clip is never gated behind Claude's own findings — see the QC rule below).

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

## 4K upscale sequencing — permanent standing rule (owner lock 2026-08-29, no exceptions)

**Never generate an asset directly at 4K, and never upscale one to 4K, before the owner has approved it.** The sequence is always: generate/deliver at the normal working resolution → send to the owner for approval, exactly as every other clip/still is delivered per the QC rule below → only once the owner has explicitly approved it, run the deterministic upscale (`upscale_image` / `upscale_video` — content-identical, no drift risk) to 4K. This applies to every generated asset in every episode, present and future: start-frame stills, standalone reference images, and any video clip the owner later wants upscaled — not just the CHARACTER_LOCK canon set that originated this pattern.

Found on the Alexander/Gaugamela episode: Clip 2's corrected start-frame still generated at nano_banana_pro's default 2K (a separate process bug, logged in `PROMPT_LEARNINGS.md` as X3) and was upscaled to 4K as part of fixing that bug — before the owner had weighed in on ordering. The owner then locked this explicit approve-before-upscale sequence as the permanent rule, independent of that bug: even when 4K is clearly the right eventual resolution, upscaling is an action that waits for approval like any other production step, never something Claude does proactively or automatically.

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
