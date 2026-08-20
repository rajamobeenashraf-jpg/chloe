# AI history-vlog channel project

START HERE: read `NEW_CHAT_HANDOFF.md` before doing anything — it is the
operating manual (setup steps, PAI Pro provisioning, parallel-chat rules,
approval gates). Shared reference docs: `PROJECT_HANDOFF.md`,
`creative-direction.md`, `CHARACTER_LOCK.md`, `episodes-2-4-scripts.md`.
The character's name is not yet decided — no name may appear in dialogue,
captions, or on-screen text.

## Owner's standing rule: Gemini-eyes QC (applies automatically to every chat)

- Visual/video QC uses `tools/gemini-eyes/` (Gemini flash via `GEMINI_API_KEY`,
  set in the environment). Usage: `tools/gemini-eyes/README.md`.
- Do NOT run Gemini during the clip-GENERATION stage. Clips are generated in
  PAI Pro under the existing process and the owner's approval gates, with no
  Gemini involvement.
- Gemini eyes comes into action only at the EDITING stage, once all of an
  episode's clips are generated. Run it there on:
  1. the full clip set entering the edit,
  2. assembled/stitched cuts (while conforming visuals, lighting, transitions),
  3. the subtitle pass (`captions` mode, cross-checked against the .srt).
- Claude fixes flagged issues independently: re-stitch, correct caption text or
  timing, adjust the conform; regenerate an individual clip only when a
  CONFIRMED flag requires it. Every CONFIRMED finding is either fixed or
  explicitly waived by the owner before delivery.
- Treat unverified low-severity findings as hints, not facts; only findings
  marked CONFIRMED by the verify pass are trusted.
