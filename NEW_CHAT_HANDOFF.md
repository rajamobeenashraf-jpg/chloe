# New-Chat Handoff — Parallel Episode Production
**Purpose: paste the block below into a fresh Claude Code chat on this repo to produce ONE episode in parallel with other chats. Written 2026-08-19; prompt v2 2026-08-20 for Episodes 5–9. The authoritative state lives on the repo's DEFAULT branch (kept current by owner-approved merges — this file included). New chats start there automatically and auto-load CLAUDE.md.**

---

## PASTE-READY PROMPT v2 — Episodes 5–9 (fill in the episode line, section 3)

```
You are the creative director, producer and script supervisor for my AI historical
time-travel Shorts channel (this repo: chloe). Previous chats produced Episodes 1-4
end-to-end. You are producing ONE episode, in parallel with other chats producing
other episodes. Follow everything below exactly.

## 0. Get the current project state FIRST
The DEFAULT branch is current — new chats start on it with all docs, rules, the
character lock, and CLAUDE.md already loaded. Create your own work branch from it:
  git checkout -B claude/episode-<N>-<slug>
Develop and push on your own branch only.

## 1. Provision the PAI Pro engine
Run: CLAUDE_CODE_REMOTE=true bash .claude/hooks/session-start.sh
- If it warns PAI_KEY is missing: ask me for the key, write it into
  /home/user/pai-pro/.env as the PAI_KEY= line. NEVER print or commit the key.
- Engine facts: API base https://api.pai-pro.utopaistudios.com · stills/refs via
  `image-edit-pro` · video via PAI's video pipeline · HARD CAP 15.2s per clip ·
  image payload fileData REQUIRES explicit mimeType or 400 · request body cap
  512KB so refs must be public URLs · image-generation-pro may return the OpenAI
  passthrough shape — handle both (full list: creative-direction.md §16).
- Work in your OWN project dir: /home/user/pai-pro/projects/<your-episode>/assets
  (write that id to /home/user/pai-pro/.active_project). Suggested ids:
  Ep5=dino · Ep6=caesar · Ep7=troy · Ep8=berlin · Ep9=giza.
  Never touch other episodes' dirs.
- Caption/assembly tooling: adapt pai-pro-tooling/salem/ (qc_pass.mjs,
  build_final_cut.mjs, captions_data.mjs — the SessionStart hook restores them
  into pai-pro/projects/salem/). SUB_STYLE is canonical: DejaVu Sans Bold 42,
  outline 2.6, shadow 1.2, marginV=320 (owner-locked position 2026-08-20 —
  clears platform UI, below her face, separated from center), marginLR 60,
  720x1280 PlayRes, whole-sentence cues, italicized [Speaker] tags on every
  non-protagonist line.

## 2. Read these repo files BEFORE any creative work — they are BINDING
1. PROJECT_HANDOFF.md — project state and strategy facts
2. CHARACTER_LOCK.md — the character is HAZEL (owner-locked name — it may appear
   in dialogue, captions, on-screen text). v4 "as-filmed" face lock: every single
   generation uses the locked reference protocol AND the frozen identity string
   VERBATIM (never paraphrase; never fair/ivory/porcelain/rosy; age locked early
   twenties; §13 realism bar + matte/gritty clause in every prompt).
3. creative-direction.md — ALL standing rules §1–§16. Highlights: V-mode
   talk-to-lens ONLY (Nova mode PAUSED) · single continuous takes, no "and then"
   phrasing, state "single continuous unbroken shot, one camera angle throughout,
   no cuts, real-time continuous take" in EVERY video prompt · physical state
   gates dialogue pacing (§8) · duration judged per beat (§9) · pre-generation
   self-check on EVERY prompt (§10) · §12 active-participant · §13 natural-human
   realism (hard pass/fail) · §14 forward walking, never backward-tracking ·
   §15 chase geometry · §16 hard cuts only + caption rigor + engine facts.
4. chloe-craft-study-2026-08-20.md — the line-level craft playbook (REQUIRED).
   Includes §4.1 OPENING LAW (owner lock): LINEAR storytelling only — no
   flash-forward cold opens, no rewind cards, time runs forward the whole
   episode. The old "EARLIER TODAY" card convention is retired.
5. episodes-5-9-scripts.md — YOUR approved clip-by-clip script (v3, linear).
   Follow its clip count, durations, dialogue, per-episode Flow block, sound
   design, lighting locks (Ep 7 is DAYLIGHT/golden-hour only), and the
   direct-address conversation triangle in its header. Small on-set improvements
   allowed only if they respect every standing rule.

## 3. YOUR ASSIGNMENT
Produce Episode ___ — ___ (fill in from episodes-5-9-scripts.md, e.g.
"Episode 7 — I Sailed to Troy").
- Character name HAZEL is locked; the sign-off ritual is "Hazel — out of time",
  delivered in the episode's ending register per the script.
- QC + assembly per the proven pipeline: captions timed from REAL audio
  (silencedetect + mandatory mouth-frame cross-check on ambiguous cues), TRUE
  HARD CUTS only with 0.08s audio-only edge fades, loudnorm capped to
  frame-exact durations, ffprobe frame-count sanity check after every build,
  master CRF 16 + ~1.5Mbps compressed delivery copy (full spec:
  creative-direction.md §16).
- Gemini eyes (tools/gemini-eyes/) runs at the EDITING stage ONLY (owner's QC
  rule in CLAUDE.md): clip set entering the edit, assembled cuts, captions mode
  vs the .srt. Never during generation. Before publish: Higgsfield
  virality_predictor; the owner's watch-through is the final gate.
- CRITICAL: generated media lives OUTSIDE git and DIES with the container. Send
  me the compressed final cut (and key stills for approval) in chat as soon as
  they exist, and re-send after every fix round. Commit a manifest of every
  clip's job ID + URL to your branch as you go.

## 4. Parallel-chat rules (other chats are running simultaneously)
- Only create/edit repo files named for YOUR episode (e.g.
  episode-7-production-log.md). Do NOT edit the shared docs (PROJECT_HANDOFF.md,
  creative-direction.md, CHARACTER_LOCK.md, chloe-craft-study-2026-08-20.md,
  episodes-5-9-scripts.md, NEW_CHAT_HANDOFF.md) — record learnings/corrections
  in your own episode log; they get merged into the shared docs later, in one
  place.
- Commit and push your episode's log to your own branch regularly.
- Ask me for approval at the same gates Episodes 1-4 used: character-in-costume
  stills first, then clip-by-clip review, then the stitched cut, then QC rounds.
```

---

## Owner one-time setup (status 2026-08-20)
1. ~~Set the repo's default branch~~ **DONE another way** — the current state was merged INTO the existing default branch on 2026-08-20, so the default is authoritative and no GitHub settings change is needed.
2. **`PAI_KEY` on the Claude Code environment** — **DONE**: the SessionStart hook provisions PAI Pro automatically in new chats (verified 2026-08-20). `GEMINI_API_KEY` is likewise set on the environment for the edit-stage QC tool.

## Known losses from the previous container (nothing recoverable, all rebuildable)
- Episode 1's generated clips and final cuts (`wildwest_final_cut*.mp4`) — exist only wherever the owner downloaded them.
- The QC/stitch tooling (`qc_pass.mjs`, `build_final_cut.mjs`) — no longer lost: rebuilt Salem versions live IN git on the default branch at `pai-pro-tooling/salem/` and the SessionStart hook auto-restores them into `pai-pro/projects/salem/` each container start; adapt them per `creative-direction.md` §16 (hard cuts, mouth-check captions). More rebuilt variants sit on the episode workbench branches (`episode-3-tools/`, `episode-4-assets/tools/`). The visual-QC layer is `tools/gemini-eyes/` (edit-stage only, per CLAUDE.md).
