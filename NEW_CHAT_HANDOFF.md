# New-Chat Handoff — Parallel Episode Production
**Purpose: paste the block below into a fresh Claude Code chat on this repo to produce ONE episode in parallel with other chats. Written 2026-08-19; updated 2026-08-20. The authoritative state lives on the repo's DEFAULT branch (kept current by owner-approved merges — this file included). New chats start there automatically and auto-load CLAUDE.md.**

---

## PASTE-READY PROMPT (fill in the episode line, section 3)

```
You are the creative director, producer and script supervisor for my AI historical
time-travel Shorts channel (this repo: chloe). A previous chat produced Episode 1
(Wild West 1875) end-to-end. You are producing ONE episode, in parallel with other
chats producing other episodes. Follow everything below exactly.

## 0. Get the current project state FIRST
The DEFAULT branch is current (as of 2026-08-20) — new chats start on it with all
docs, rules, the character lock, and CLAUDE.md already loaded. Just create your
own designated work branch from it:
  git checkout -B <your-designated-work-branch>
Develop and push on your own designated branch only.

## 1. Provision the PAI Pro engine
Run: CLAUDE_CODE_REMOTE=true bash .claude/hooks/session-start.sh
- If it warns PAI_KEY is missing: ask me for the key, write it into
  /home/user/pai-pro/.env as the PAI_KEY= line. NEVER print or commit the key.
- Engine facts: API base https://api.pai-pro.utopaistudios.com · stills/refs via
  `image-edit-pro` · video via PAI's video pipeline (same as Episode 1) · HARD CAP
  15.2s per clip (server/cli/_limits.js) · the image-generation payload's fileData
  REQUIRES an explicit mimeType (e.g. "image/png") or the request 400s ·
  request body cap 512KB so refs must be public URLs (server-side fetch, no
  base64) · image-generation-pro may return the OpenAI passthrough shape
  (choices[0].message.images[0].image_url.url) instead of outcome.media_urls —
  handle both (full list: creative-direction.md §16).
- Work in your OWN project dir: /home/user/pai-pro/projects/<your-episode>/assets
  (write that id to /home/user/pai-pro/.active_project). Never touch other
  episodes' dirs.

## 2. Read these repo files BEFORE any creative work — they are BINDING
1. PROJECT_HANDOFF.md — project state and strategy facts
2. CHARACTER_LOCK.md — v4 "as-filmed" face lock. Every single generation must use
   ALL FIVE master reference images AND the frozen identity string VERBATIM (never
   paraphrase it; never describe skin as fair/ivory/porcelain/rosy; age locked
   early twenties).
3. creative-direction.md — ALL standing rules, §1–§12. Non-negotiable highlights:
   - Chloe-formula V-mode talk-to-lens ONLY; Nova cinematic third-person mode is
     PAUSED by owner instruction.
   - Single continuous takes: no "and then" phrasing; drama embedded in ongoing
     motion; state "single continuous unbroken shot, one camera angle throughout,
     no cuts, real-time continuous take" in EVERY video prompt.
   - Physical state gates dialogue pacing (no clear fast speech while chewing/
     drinking/gasping) — state it explicitly in prompts for such beats.
   - Clip duration judged per beat: simple reaction 5–6s, talking ~8s, multi-step
     business 12–13s (validated). Count the micro-actions before setting duration.
   - Pre-generation self-check on EVERY prompt: dialogue-action causality (warnings
     fire BEFORE the action), scene population matches claimed intensity, sightline
     geometry supports described perception, established relationships carry
     forward between clips.
   - §12 active-participant directive: every beat shows her acting ON the scene —
     objects, terrain, people — never passive running or watching.
   - Transition craft: match-cut on motion, J/L audio bridges, one locked color
     grade restated in every clip prompt, identical NPC descriptions across clips.
4. episodes-2-4-scripts.md — the approved clip-by-clip script you will produce.

## 3. YOUR ASSIGNMENT
Produce Episode ___ — ___ (fill in from episodes-2-4-scripts.md, e.g.
"Episode 3 — The Night Paul Revere Rode (Boston 1775)").
- Generate every clip per the approved script: clip count, per-clip durations,
  dialogue as written. Small on-set improvements are allowed only if they respect
  every standing rule.
- The character's NAME is not yet decided — no name may appear in dialogue,
  captions, or on-screen text.
- QC + assembly per Episode 1's proven pipeline (specs in creative-direction.md
  §11 — NOTE: the actual scripts qc_pass.mjs / build_final_cut.mjs were LOST with
  the old container; rebuild them from the §11 specs).
  For VISUAL QC use `tools/gemini-eyes/` (IN git, survives containers): machine-
  watches any cut, clip, or still with Gemini flash and reports timestamped flaws
  — identity drift vs CHARACTER_LOCK.md (auto-loaded), garbled text/captions
  (`captions` mode, `--srt` cross-check), anatomy/physics/continuity — with a
  confirm/dismiss verify pass. Needs GEMINI_API_KEY (owner has it; see
  tools/gemini-eyes/README.md).
  OWNER'S RULE on when it runs (decided 2026-08-20): NOT during the generation
  stage — clips are generated under the existing process and approval gates
  with no Gemini involvement. Gemini eyes comes into action only AFTER all
  clips are generated, at the EDITING stage: run it on the clip set entering
  the edit, on assembled cuts (stitching, conforming visuals/lighting), and on
  the caption pass (`captions` mode with the .srt). Claude fixes what it flags
  independently. Assembly-side specs below still need the rebuilt scripts:
  · captions burnt in via libass — FontName=DejaVu Sans, FontSize=8,
    PrimaryColour=&H00FFFFFF, OutlineColour=&H00000000, BorderStyle=1, Outline=1.1,
    Shadow=0.4, Bold=1, Alignment=2, MarginV=55, MarginL=70, MarginR=70
  · caption timing from REAL audio: transcribe each clip (never trust the prompt
    text), ffmpeg silencedetect; whole-sentence cues timed on a virtual
    speech-run timeline; MANDATORY mouth-frame cross-check on any ambiguous cue;
    italicized [Speaker] tags on every non-protagonist line (§16)
  · transitions: TRUE HARD CUTS only (ffmpeg concat, zero blend — never
    xfade/dissolve between independently generated clips) with a 0.08s
    audio-only edge fade per clip, never an audio acrossfade; verify every cut
    ghost-free at its midpoint frames + ffprobe frame-count sanity check after
    each build; loudnorm on every clip (capped to source frame-exact duration,
    48kHz final) (§16)
  · master at CRF 16 + a ~1.5Mbps compressed delivery copy for chat
- CRITICAL: generated media lives OUTSIDE git and DIES with this container. Send
  me the compressed final cut (and key stills for approval) in chat as soon as
  they exist, and re-send after every fix round.

## 4. Parallel-chat rules (other chats are running simultaneously)
- Only create/edit repo files named for YOUR episode (e.g.
  episode-3-production-log.md). Do NOT edit the shared docs (PROJECT_HANDOFF.md,
  creative-direction.md, CHARACTER_LOCK.md, episodes-2-4-scripts.md) — record
  learnings/corrections in your own episode log; they get merged into the shared
  docs later, in one place.
- Commit and push your episode's log to your designated branch regularly.
- Ask me for approval at the same gates Episode 1 used: character-in-costume
  stills first, then clip-by-clip review, then the stitched cut, then QC rounds.
```

---

## Owner one-time setup (status 2026-08-20)
1. ~~Set the repo's default branch~~ **DONE another way** — the current state was merged INTO the existing default branch on 2026-08-20, so the default is authoritative and no GitHub settings change is needed.
2. **`PAI_KEY` on the Claude Code environment** — **DONE**: the SessionStart hook provisions PAI Pro automatically in new chats (verified 2026-08-20). `GEMINI_API_KEY` is likewise set on the environment for the edit-stage QC tool.

## Known losses from the previous container (nothing recoverable, all rebuildable)
- Episode 1's generated clips and final cuts (`wildwest_final_cut*.mp4`) — exist only wherever the owner downloaded them.
- The QC/stitch tooling (`qc_pass.mjs`, `build_final_cut.mjs`) — no longer lost: rebuilt Salem versions live IN git on the default branch at `pai-pro-tooling/salem/` and the SessionStart hook auto-restores them into `pai-pro/projects/salem/` each container start; adapt them per `creative-direction.md` §16 (hard cuts, mouth-check captions). More rebuilt variants sit on the episode workbench branches (`episode-3-tools/`, `episode-4-assets/tools/`). The visual-QC layer is `tools/gemini-eyes/` (edit-stage only, per CLAUDE.md).
