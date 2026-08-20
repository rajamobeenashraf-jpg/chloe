# gemini-eyes

Machine QC and study tool for our videos, built on the Gemini API ("Gemini eyes").
It **watches and reports — it does not edit**: findings drive regeneration in PAI Pro
or fixes in the editor.

Needs `GEMINI_API_KEY` in the environment and `curl` on PATH. Nothing else.

## What it does

- **`qc`** — the flagship. Two passes:
  1. *Sweep*: watches the whole video at high media resolution and reports every flaw
     as structured findings — identity drift, garbled on-screen **text/captions**,
     anatomy (hands/eyes/feet), physics/clipping, continuity jumps, frozen extras,
     audio/lip-sync, edit/pacing — each with timestamp, severity 1–5, and a suggested fix.
  2. *Verify*: re-watches each severity≥3 finding as a ±6s clip at **5 fps / high res**
     and marks it CONFIRMED / DISMISSED / UNSURE. Single-pass machine reads hallucinate;
     this pass is what makes the output trustworthy.

  By default it loads `CHARACTER_LOCK.md` from the repo root and checks Sadie's identity
  (red hair, freckles, **hazel eyes**, costume) in every shot. `--character none` disables,
  `--character FILE` overrides.

- **`captions`** — text-only proofread: transcribes every caption/sign/title card with
  timestamps and flags misspellings, garbled AI text, sync drift, paraphrased captions,
  unreadable contrast, anachronisms. `--srt file.srt` cross-checks against your intended
  caption file.

- **`study`** — the craft-study prompt (beat sheet, structure math, AI tells, steal list)
  used for `chloe-titanic-video-study.md`.

- **`ask`** — free-form: `-q "does the eye color stay hazel in every shot?"`

## Inputs

YouTube URL (watched directly), any https media URL (downloaded then uploaded), or a
**local file** (uploaded via the Files API). Images work too — QC stills before animating.

## Usage

```bash
# full QC on a finished cut (checks Sadie against CHARACTER_LOCK.md automatically)
python3 tools/gemini-eyes/gemini_eyes.py qc episode1_draft.mp4 --out qc/

# caption/text pass against the intended subtitles
python3 tools/gemini-eyes/gemini_eyes.py captions episode1_draft.mp4 --srt episode1.srt

# QC just one scene, denser sampling
python3 tools/gemini-eyes/gemini_eyes.py qc episode1_draft.mp4 --clip 04:10 05:30 --fps 3

# competitor study (disable our character lock)
python3 tools/gemini-eyes/gemini_eyes.py study "https://www.youtube.com/watch?v=..." --character none

# quick question about a still
python3 tools/gemini-eyes/gemini_eyes.py ask render.png -q "exact eye color?"
```

Outputs `findings.json` + `report.md` (sorted by severity, with verdicts) in `--out`.

## Flags

| Flag | Meaning |
|---|---|
| `--character FILE\|none` | identity lock to check against (default: repo `CHARACTER_LOCK.md`) |
| `--srt FILE` | intended captions to cross-check |
| `--clip MM:SS MM:SS` | analyze only this window |
| `--fps N` | sweep sampling rate (default ~1 fps; verify pass always 5) |
| `--res low\|medium\|high` | sweep media resolution (default high for qc/captions) |
| `--no-verify` | skip the confirm/dismiss pass |
| `--model NAME` | force one model (default ladder: 3.7-flash → 3.6-flash → flash-latest, with backoff) |

## Reading results

- **CONFIRMED** findings are trustworthy — fix these.
- Unverified (severity <3) findings are *hints*, not facts.
- Model note (Aug 2026): `gemini-3.7-flash` is frequently 503-overloaded; the ladder
  falls back to `gemini-3.6-flash`, which handles full videos reliably. `gemini-2.5-flash`
  is deprecated for new keys.
- Cost reference: a 14-min video sweep ≈ 78k input tokens at default res; high-res
  ≈ 3–4×; each verify clip ≈ 25k.
