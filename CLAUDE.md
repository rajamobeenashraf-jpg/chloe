# AI Historical Time-Travel Channel — session brain

US-market AI historical channel reverse-engineered from Chloe VS History and Nova Time Travel. Owner: Mobeen Ashraf.

Read before any creative, research, or production work — these files are this project's memory:
1. `PROJECT_HANDOFF.md` — current state, locked decisions, owner preferences
2. `CHARACTER_LOCK.md` — locked character (v3 master image; NEVER regenerate the face from text; age locked — topic closed)
3. `creative-direction.md` — format rules, incl. §12 active-participant directive
4. `research-methodology.md` — how to research & score episode ideas (multi-signal, never raw views alone), platform priorities, and the pre-publish video-QC pipeline
5. `chloe-vs-history-strategy-report.md` — reference-channel analysis (verified vidIQ data)
6. `episode-ideas-backlog.md` + `episodes-2-4-scripts.md` — pipeline state

Standing rules:
- The repo's **default branch is the source of truth**; session branches are workbenches. When an episode wraps (final render approved), merge that session's branch into the default branch so future sessions inherit its logs, prompts, and learnings. Commit and push episode work as you go — an unpushed container can expire and take the work with it.
- Video output is vertical 9:16 unless the owner says otherwise; character name still pending (shortlist in the backlog).
- Judge episode ideas by the signal stack in `research-methodology.md` — never by raw views alone.
- Every generated clip AND every finished render goes through the QC chain in `research-methodology.md` §4 before the owner sees it; every regenerated clip gets re-checked.

Tooling:
- **vidIQ MCP** — YouTube + Instagram/TikTok data: outliers, keywords, stats, comments, transcripts, video watching. Calls cost credits — check `vidiq_balance`, batch questions.
- **Higgsfield MCP** — image/video generation, `video_analysis_create`, `virality_predictor` (run on every render before publish).
- **ElevenLabs MCP** — voice.
- **PAI Pro** at `/home/user/pai-pro` (the same engine behind Chloe VS History); active project in `.active_project`; `PAI_KEY` lives in its gitignored `.env`.
- `scripts/gemini-eyes.mjs` — optional Gemini-powered second pair of eyes for video QC and reference study; requires the `GEMINI_API_KEY` env var (setup: `research-methodology.md` §5). Never commit API keys.
