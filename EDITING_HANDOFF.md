# EDITING HANDOFF — all edit-stage rules & instructions (Hazel Out of Time)

**Purpose:** portable, self-contained brief for editing an episode in ANY chat. Compiled
2026-08-29 from the project's canonical rule files. If anything here conflicts with those
files, the canonical files win (newest-command-wins): `CLAUDE.md`, `creative-direction.md`
(§16–§26), `cinematic-direction-brief.md` (§5, §8, §15), `research-methodology.md` §4,
`pai-pro-tooling/troy/` (reference implementation).

**Scope:** the EDIT stage — after an episode's clips are generated and owner-approved.
Covers assembly, conform, sound, music, captions, QC, and the approval gates that apply.

---

## 1. OWNER GATES (permanent, apply during editing exactly as in production)

1. **§19 — ask the owner before ANY clip regeneration, every attempt.** If editing reveals
   a clip defect whose fix is a regeneration: report the confirmed issue + proposed fix,
   then WAIT for explicit go-ahead before submitting to any engine. Per attempt — a failed
   first fix needs a fresh check-in before attempt two. Never silent iteration.
2. **§20 — every render goes to the owner the moment it exists**: every regenerated clip,
   every assembled cut worth reviewing, the final render — sent as actual footage in chat
   (compressed copy per clip, never batched or merely described), approval explicitly
   requested. Delivery is NEVER gated behind QC findings — deliver first, report findings
   as supplementary info. Only the owner's own decision after watching starts a regen.
3. **§18 — no unauthorized creative deviation.** Execute the approved design; propose
   changes, don't make them.
4. **Score generation is a generation**: owner approval BEFORE generating music, the audio
   file delivered on creation, second attempts are §19 regenerations.
5. **Pre-publish**: run Higgsfield `virality_predictor` on the final render; the owner's
   watch-through is the FINAL gate. Nothing publishes without it.

## 2. CUTS & TRANSITIONS (owner-locked)

- **§16 — the mechanical joint between independently-generated clips is a TRUE HARD CUT.
  No dissolves, no crossfades, no micro-blends** — blended frames from independent
  generations ghost (confirmed in two episodes' rendered midpoints). Fade-to-black is
  allowed at an episode's very end only.
- Joins are **real video edits (ffmpeg cuts), never AI-generated transitions**.
- Everything cinematic about a cut lives in what's staged on either side and how sound
  crosses it: action cut, match cut, eyeline cut, reaction cut, J-cut, L-cut, sound
  bridge, cross-cutting — all on hard-cut mechanics. The episode's edit design map (in the
  production breakdown) names the intended cut type at each boundary; follow it.
- **Invisible editing is the default** for continuous action — cuts motivated by movement,
  eyeline, action, sound, or reaction.
- **Editing rhythm follows drama**: tension holds longer, violence accelerates, aftermath
  slows. No fixed shot length.

## 3. SOUND & MUSIC AT THE EDIT (brief §15 + §25)

- **§25 — continuous sound across every cut; NEVER a dip to true digital silence between
  clips.** "Silence" as a dramatic tool always means a filtered/ducked reduction.
- Sound bridges connect scenes: J-cut into a coming scene's sound before its picture;
  let battle sound decay into aftermath rather than slamming off. The audio must never
  feel like "clip ends → new audio begins."
- **Music is an EDIT-stage element only.** Clips are generated music-free (diegetic sound
  only). The score is ONE continuous generated track designed across the whole episode —
  entries/exits timed to story beats, ducked under important dialogue, motivated cue
  changes only (never a new cue just because a clip changed). Generated music only, never
  licensed tracks. Owner approval before generating it; the file goes to him on creation.
- **The subjective-sound beat is rationed: ONE per episode or zero** (e.g. a ~2s muffle at
  an emotional peak) — implemented at the edit as filtering, §25-compliant, per the
  episode's design docs. Never add extras.
- Period-plausible palette (deep drums, horn registers, low strings) — no modern
  synth-trailer braams. Three-layer soundscape (close / middle / far) is already in the
  generated clip audio; the mix preserves it.
- Before finalizing any scene's audio, the Hollywood audio test (brief §15): audio alone
  communicates place + emotion? · scene works without music, and music genuinely improves
  it? · music helps without dictating? · soundscape physically connected to picture? ·
  transition into the next scene natural? Any NO → redesign.

## 4. VISUAL CONFORM & CONTINUITY (brief §8.5)

Continuity checklist at EVERY cut: light direction · exposure/brightness · color
temperature · weather/haze · time of day · shadow logic · character state (face, hair,
wardrobe, dirt, injuries) · props · environment/destruction level · screen direction ·
"does the next shot feel like the same production?" AI shot-discontinuity is an active
enemy — adjacent shots are grade-matched at the edit (each clip generates with slightly
different brightness/WB/haze). Battle clips follow the episode's staged environment
evolution (dust/state inherited clip-to-clip per the scale bible); verify the stages still
read in sequence after assembly.

## 5. GEMINI EYES — machine QC (edit-stage; owner QC rule in CLAUDE.md)

- **Primary tool:** `tools/gemini-eyes/gemini_eyes.py` (two-pass: high-res sweep, then
  confirm/dismiss re-watch of each serious finding at 5 fps). Modes: `qc` / `captions` /
  `study` / `ask`. Auto-loads CHARACTER_LOCK.md for identity checks. Usage:
  `tools/gemini-eyes/README.md`. Needs `GEMINI_API_KEY` env var (setup + model/quota:
  `research-methodology.md` §5). Never commit API keys.
- Run it at the edit on: (1) the full clip set entering the edit, (2) assembled/stitched
  cuts (while conforming visuals/lighting/transitions), (3) the subtitle pass (`captions`
  mode, cross-checked against the .srt).
- **Only findings marked CONFIRMED by the verify pass are trusted**; unverified
  low-severity findings are hints, not facts.
- Claude fixes flagged issues independently where the fix is NOT a regeneration:
  re-stitch, caption text/timing, conform/grade. Every CONFIRMED finding is either fixed
  or explicitly waived by the owner before delivery. Regeneration fixes → §19 ask, always.
- (Generation-stage note for completeness: Gemini eyes may also run on VALIDATION/TEST
  clips at generation stage — owner exception 2026-08-29. Production clips: edit-stage
  only.)

## 6. CAPTION SYSTEM (owner-locked 2026-08-23 — ALL episodes)

**Spec:** word-synced CHUNKS — 1–2 word ALL-CAPS chunks, each REPLACING the previous
(never accumulating into lines); a chunk is on screen ONLY while its words are spoken;
pauses ≥0.35s leave the screen caption-free; hard cut in/out, NO animation; serif style:
Liberation Serif bold, spacing 2.5, white with thin dark outline, MarginV=320; NO speaker
tags (a gold speaker-color variant is under consideration — NOT yet decided, don't use).

**Implementation (reference: Episode 7, `pai-pro-tooling/troy/`):**
1. Copy `make_word_chunks.py`, `qc_pass.mjs`, and the `SUB_STYLE` block from
   `pai-pro-tooling/troy/` into the new episode's tooling dir.
2. Timing comes from **measured per-word timestamps** (`make_word_chunks.py`,
   faster-whisper, script-biased) — never estimated, never interpolated except clamped
   within known line windows for words the model can't hear (chaos-noise clips), and any
   such fallback is frame-verified before shipping. **Script text is ground truth; whisper
   only carries timing.**
3. Write the script lines with rough line windows, run the tool, review its per-clip
   match report, frame-verify anything it flags.
4. `qc_pass.mjs` (spacing-capable) burns one Dialogue event per chunk; keep line-level
   cues as a `captions_data_lines_backup.mjs`-style source-of-truth input.
5. The session-start hook installs faster-whisper automatically; model weights pull from
   Hugging Face (domains allowed).
6. Gemini eyes `captions` mode cross-checks the burned result against the .srt.

## 7. TECHNICAL QC (every clip, every cut)

- **§26 — ffmpeg `freezedetect` on every clip** (e.g. `-vf freezedetect=n=0.003:d=0.5`);
  any frozen stretch is a defect. (If ffmpeg is missing in the container:
  `pip install imageio-ffmpeg` provides a static binary.)
- Frame-extraction review (~2 fps) for composition/identity/scale checks; battle clips
  additionally pass the scale QC: (a) army lines exceed frame edges, (b) population can't
  read as under 100, (c) dust matches the clip's assigned stage. Failures → report to
  owner per §19/§20, never silently regenerate.
- Dialogue clips: run faster-whisper on the clip audio and verify the spoken words match
  the script verbatim.
- Format: vertical 9:16 (1080×1920) unless the owner says otherwise.
- `detect_silence.sh` (troy tooling) for audio-gap checks before final mix.

## 8. ASSEMBLY & REPO HYGIENE

- Assembly pattern: `pai-pro-tooling/troy/build_final_cut.mjs` (concat of approved clips,
  audio mix, caption burn) — copy and adapt per episode.
- **Generated video/image files stay OUT of git** unless the owner explicitly says
  otherwise; they remain retrievable from PAI/Higgsfield by job ID. Commit and push
  working files as you go: scripts, prompts, logs, and a **manifest listing each clip's
  job ID + URL** (this is what lets another session QC them). An unpushed container can
  expire and take the work with it.
- The repo's default branch is the source of truth; session branches are workbenches;
  merging an episode branch needs owner approval.
- Character identity at the edit: `CHARACTER_LOCK.md` is the canon (v5 as of 2026-08-29 —
  check the file itself; v4 is archived for the back catalog). The realism bar is hard
  pass/fail: if any frame reads AI-plastic, flag it.

## 9. ORDER OF OPERATIONS (edit-stage pipeline, condensed from research-methodology §4 + brief)

1. Collect approved clips by job ID from the episode's production-log manifest.
2. Per-clip technical QC (§7 above) → report, owner decides on any regen (§19).
3. Gemini eyes pass 1 on the full clip set → fix non-regen findings, escalate the rest.
4. Assemble per the edit design map (hard cuts, §2) → conform pass (§4) → grade match.
5. Sound design + music per §3 (score generation = owner-gated) → mix.
6. Captions per §6 → Gemini eyes `captions` mode + .srt cross-check.
7. Gemini eyes pass on the assembled cut → fix/waive every CONFIRMED finding.
8. Deliver the cut to the owner (§20). Iterate on his notes (regens via §19).
9. Final render → `virality_predictor` → owner watch-through → publish only on his GO.
