# AI Historical Time-Travel Channel — session brain

US-market AI historical channel reverse-engineered from Chloe VS History and Nova Time Travel. Owner: Mobeen Ashraf.

This file was reconciled 2026-08-20 from the two prior CLAUDE.md versions on a
newest-command-wins basis: every rule the owner never changed is kept; where an
older rule conflicts with a later owner decision, the later decision stands and
is marked. Latest owner decision recorded: 2026-08-21 (ask before every clip
regeneration — see the QC rule below).

Read before any creative, research, or production work — these files are this project's memory:
1. `NEW_CHAT_HANDOFF.md` — START HERE: operating manual (setup, parallel-chat rules, approval gates)
2. `PROJECT_HANDOFF.md` — current state, locked decisions, owner preferences
3. `CHARACTER_LOCK.md` — locked character, v4 "as-filmed" (NEVER regenerate the face from text; age locked — topic closed; the original 20 reference images are the sole canonical refs). Owner decision 2026-08-20: the lock DOCUMENT is the character sheet for every new chat; the reference-image files themselves are NOT on this branch — use the permanent CDN URLs inside the lock (the durable source), with repo copies archived on branch `claude/keen-franklin-ldvq7r`
4. `creative-direction.md` — format rules, incl. §12 active-participant directive and §16 cross-episode pipeline rules (transitions = hard cuts only, caption rigor, engine facts; merged 2026-08-20, newest-command-wins)
5. `research-methodology.md` — how to research & score episode ideas (multi-signal, never raw views alone), platform priorities, and the video-QC pipeline (§4 — note: its per-clip "Stage A" is SUPERSEDED, see the QC rule below)
6. `chloe-vs-history-strategy-report.md` + `chloe-titanic-video-study.md` — reference-channel analysis (verified vidIQ data + machine watch-through)
7. `episode-ideas-backlog.md` + `episodes-2-4-scripts.md` — pipeline state

Standing rules:
- The repo's **default branch is the source of truth**; session branches are workbenches. When an episode wraps (final render approved), its branch is merged into the default branch **with the owner's approval** so future sessions inherit its logs, prompts, and learnings. Commit and push working files as you go (scripts, prompts, logs, and a small manifest listing each generated clip's PAI/Higgsfield job ID + URL) — an unpushed container can expire and take that work with it. Generated video/image files themselves stay **out of git** unless the owner explicitly says otherwise; they remain retrievable from PAI/Higgsfield by job ID, and the manifest is what lets another session QC them.
- Video output is vertical 9:16 unless the owner says otherwise. The character's name is **HAZEL** (owner lock 2026-08-20, recorded in `CHARACTER_LOCK.md`) — it may appear in dialogue, captions, and on-screen text. Proposed sign-off ritual "Hazel — out of time" awaits owner confirmation.
- Judge episode ideas by the signal stack in `research-methodology.md` — never by raw views alone.

## Owner's QC rule (decided 2026-08-20 — supersedes the per-clip "Stage A" in research-methodology.md §4)

- Do NOT run Gemini (or any machine video-analysis) during the clip-GENERATION
  stage. Clips are generated in PAI Pro under the existing process and the
  owner's approval gates, with no Gemini involvement.
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
- Treat unverified low-severity findings as hints, not facts; only findings
  marked CONFIRMED by the verify pass are trusted.
- Before publish: run Higgsfield `virality_predictor` on the render; the owner's
  watch-through remains the final gate.

Tooling:
- **vidIQ MCP** — YouTube + Instagram/TikTok data: outliers, keywords, stats, comments, transcripts, video watching. Calls cost credits — check `vidiq_balance`, batch questions.
- **Higgsfield MCP** — image/video generation, `virality_predictor` (pre-publish). Its `video_analysis_create` is edit-stage-only under the QC rule above.
- **ElevenLabs MCP** — voice.
- **PAI Pro** at `/home/user/pai-pro` (the same engine behind Chloe VS History); active project in `.active_project`; `PAI_KEY` lives in its gitignored `.env`.
- **Gemini eyes — primary tool: `tools/gemini-eyes/gemini_eyes.py`** (two-pass: high-res sweep, then confirm/dismiss re-watch of each serious finding at 5 fps; modes `qc` / `captions` / `study` / `ask`; auto-loads CHARACTER_LOCK.md for identity checks; usage in `tools/gemini-eyes/README.md`). The older `scripts/gemini-eyes.mjs` remains available. Both need the `GEMINI_API_KEY` env var (setup + model/quota guidance: `research-methodology.md` §5). Never commit API keys.
