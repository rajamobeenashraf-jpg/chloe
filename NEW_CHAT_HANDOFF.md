# New-Chat Handoff — Parallel Episode Production
**Purpose: paste the block below into a fresh Claude Code chat on this repo to produce ONE episode in parallel with other chats. Written 2026-08-19. The authoritative state lives on branch `claude/pai-pro-connection-izza4s`.**

---

## PASTE-READY PROMPT (fill in the episode line, section 3)

```
You are the creative director, producer and script supervisor for my AI historical
time-travel Shorts channel (this repo: chloe). A previous chat produced Episode 1
(Wild West 1875) end-to-end. You are producing ONE episode, in parallel with other
chats producing other episodes. Follow everything below exactly.

## 0. Get the current project state FIRST (the default branch is stale)
Run:
  git fetch origin claude/pai-pro-connection-izza4s
  git checkout -B <your-designated-work-branch> origin/claude/pai-pro-connection-izza4s
All current docs (scripts, rules, character lock) live on that branch, NOT on the
default branch. Develop and push on your own designated branch from that base.

## 1. Provision the PAI Pro engine
Run: CLAUDE_CODE_REMOTE=true bash .claude/hooks/session-start.sh
- If it warns PAI_KEY is missing: ask me for the key, write it into
  /home/user/pai-pro/.env as the PAI_KEY= line. NEVER print or commit the key.
- Engine facts: API base https://api.pai-pro.utopaistudios.com · stills/refs via
  `image-edit-pro` · video via PAI's video pipeline (same as Episode 1) · HARD CAP
  15.2s per clip (server/cli/_limits.js) · the image-generation payload's fileData
  REQUIRES an explicit mimeType (e.g. "image/png") or the request 400s.
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
    text), ffmpeg silencedetect (min duration 0.12s), merge fragments with <0.3s
    gaps, gap-clustering for sentence boundaries, asymmetric crossfade margins
    (only the INCOMING clip withholds captions during a blend)
  · transitions: 0.12s blend for scene/location changes, 0.4s dissolve for
    continuous action, ~0.5s for time-passing; audio acrossfade matching each
    video blend; loudnorm on every clip before assembly
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

## Owner one-time setup that makes all of this smoother (strongly recommended)
1. **Set the repo's default branch to `claude/pai-pro-connection-izza4s`** (GitHub → repo Settings → Branches → Default branch). Until then, every new chat starts on the stale default and must run step 0 manually.
2. **Set `PAI_KEY` as an environment variable on the Claude Code environment** (claude.ai/code environment settings). Then the SessionStart hook provisions PAI Pro fully automatically in every new chat and step 1 never asks for the key.

## Known losses from the previous container (nothing recoverable, all rebuildable)
- Episode 1's generated clips and final cuts (`wildwest_final_cut*.mp4`) — exist only wherever the owner downloaded them.
- The QC/stitch tooling (`qc_pass.mjs`, `build_final_cut.mjs`) — rebuild from `creative-direction.md` §11 specs, which captured every parameter and algorithm decision. (The visual-QC layer has since been rebuilt better as `tools/gemini-eyes/` and lives IN git; only the caption/stitch assembly scripts still need rebuilding.)
