# Research Methodology — Idea Scoring, Trends & Video QC
**Created 2026-08-20 on the owner's directive · Applies to every research, idea-selection, and QC session from now on**

## 0. The owner's standing directive
Raw view counts alone are **never** the measure of an idea. A short can be excellent and still under-perform (bad packaging, algorithm luck, small channel). Judge ideas on the full signal stack below. Trends matter as much as numbers. YouTube is the primary platform; Instagram and TikTok signals must be considered too; Facebook has no direct data feed in this environment (see §2).

## 1. The signal stack — score each candidate idea 0–2 per signal
| # | Signal | What it answers | How to pull it |
|---|--------|-----------------|----------------|
| 1 | Relative outperformance | Did videos on this idea beat *their own channel's* median? (removes channel-size bias) | `vidiq_outliers`, breakout scores in `vidiq_video_stats`; IG/TikTok: `vidiq_instagram_tiktok_outlier_search` (already median-relative by design) |
| 2 | Velocity | Is interest live *right now*? | views-per-hour from `vidiq_video_stats` on recent uploads |
| 3 | Engagement quality | Did the viewers who found it *love* it, regardless of reach? | likes/views and comments/views ratios; read the actual comments with `vidiq_video_comments` |
| 4 | Search demand | Do people actively look for this topic? | `vidiq_keyword_research` (volume vs competition) |
| 5 | Trend confirmation | Is the topic rising or cooling? | `vidiq_trend_categories`, `vidiq_trending_videos`, plus WebSearch for anniversaries, film/TV releases, and news tied to the era |
| 6 | Cross-platform echo | Does the idea also fire on IG Reels / TikTok? | `vidiq_instagram_tiktok_outlier_search`; study winners with `vidiq_watch_shortform_content`; sound trends via Higgsfield `tiktok_music_trending`. Need ≥2 outliers per platform before calling something a pattern |
| 7 | Format fit | Does it run on our engine — dramatic irony, familiar-canon topic, active-participant persona? | strategy report §1 + `creative-direction.md` §12; a judgement call, argued in writing next to the idea |

An idea advances to the owner's shortlist at **≥10/14**. Record the scores in `episode-ideas-backlog.md` next to each idea so decisions stay auditable.

### The hidden-gem rule (the owner's key insight)
A video with low views but exceptional engagement (likes/views around 8%+ and dense, passionate comments) is a **packaging failure, not an idea failure** — the audience that found it loved it. Treat it as an opportunity: take the idea, fix the title/thumbnail/hook. Conversely, a high-view video with weak ratios is often algorithm luck — don't copy it blindly.

## 2. Platform priorities
1. **YouTube** — primary; full vidIQ coverage (Shorts + long-form).
2. **Instagram Reels + TikTok** — covered by the vidIQ outlier and watch tools listed above.
3. **Facebook** — honest limitation: no data source is wired into this environment and public FB analytics are effectively closed. Best proxy: IG Reels signals (same Meta ecosystem, heavy cross-posting) plus WebSearch. Never present Facebook claims as data-backed.

## 3. Credit discipline
The vidIQ watch/outlier tools cost credits (roughly 5–25 per call). Batch questions into one call's custom prompt, prefer `vidiq_video_transcript` when spoken words are enough, and check `vidiq_balance` before a big sweep.

## 4. Video QC — the "eyes" pipeline
Claude Code directs; the tools below only *see* and report. Two facts drive this section. First, generation is stochastic: **every regeneration can introduce new errors**, so a "fixed" clip must be re-checked, including its joins with neighbouring clips — this is why mistakes survive repeated editing when only the final cut gets checked. Second, the tools cover **different axes**: a defect hunter says whether the video is *broken*; the virality predictor says whether it is *boring*. Neither replaces the other, none catches everything (expect occasional false positives too), which is why the last pair of eyes is always human.

**Stage A — per-clip, during production: SUPERSEDED (owner's directive, 2026-08-20).**
Do NOT run Gemini or Higgsfield `video_analysis_create` on clips during the
generation stage. Clips are generated and reviewed under the existing production
process and the owner's approval gates only. Machine eyes first touch the
footage at the editing stage — see Stage B and the Owner's QC rule in
`CLAUDE.md`. (The original Stage A text lives in git history if ever needed.)

**Stage B — the editing stage, once all of an episode's clips are generated (the first machine-eyes touchpoint):**
1. **Gemini eyes** (primary tool: `tools/gemini-eyes/gemini_eyes.py`, see its README) on: the full clip set entering the edit; assembled/stitched cuts (continuity and identity across clip joins, lip-sync, audio, era accuracy while conforming visuals/lighting/transitions); and the subtitle pass (`captions` mode, cross-checked against the .srt). A clip regenerated during edit rounds gets re-checked here, including its joins — never assume a regen only fixed things.
2. **Higgsfield `virality_predictor`** — hook strength, retention risk, attention/engagement dashboard.
3. **Owner watch-through** — the final call is always human.

Until the Gemini key is set (§5), everything else still runs — the pipeline just has one fewer pair of eyes.

For studying **reference** videos (Chloe VS History, Nova, any outlier): `vidiq_video_watch` (long-form) or `vidiq_watch_shortform_content` (Shorts/Reels/TikTok), or `gemini-eyes.mjs --youtube <url> --mode study` once the key exists.

### Still-image identity QC calibration (established 2026-08-22, owner-directed research)
Method: composite [face-detail sheet | turnaround sheet | candidate] into one image, run `gemini-eyes ask` with the forensic identity rubric (feature-by-feature vs the locked spec, identity 0–100, realism 0–100, verdict). **Gemini's absolute numbers are NOT portable** — it self-compresses the scale and judge-model version shifts scores ~4–8 pts (3.6-flash scores lower than 3.7-flash). So scores are read RELATIVE to controls run through the same rubric:
- **Positive control (ceiling):** the approved Tier-1 front portrait scored **74 identity / 68 realism / SAME PERSON** (3.7-flash); an as-filmed movie frame scored 66/62/LIKELY SAME on 3.6-flash. Ground-truth same-person material lands at ~66–74 — nothing scores in the 90s on this rubric.
- **Negative control (floor):** a deliberately similar-description STRANGER (same hair/eyes/skin class, no refs) scored **40 identity / DIFFERENT**, with drift named on every structural feature — and realism 70, proving identity and realism are independent axes.

**The standard for accepting generated stills of Hazel:**
- **EXCELLENT:** verdict SAME PERSON **and** identity within ~2 pts of (or above) the same-batch canon control **and** no locked structural feature named as drifted. (Under 3.7-flash ≈ ≥72.)
- **ACCEPTABLE:** verdict LIKELY SAME, within ~6 pts of control, and named drift limited to styling/expression/lighting (freckle density under makeup, smile, warmth) — never structure (jaw, nose, eye shape, brow shape, lip shape).
- **REJECT/REGENERATE:** verdict UNCERTAIN or DIFFERENT at any score; any STRUCTURAL feature drift named; ≥10 pts below control; or any realism note naming plastic sheen / synthetic look / malformed anatomy (§13 is pass/fail regardless of the number).
- Always co-run the canon positive control in the same session before trusting cross-batch comparisons; the verdict label + named drift decide, the number only ranks within a batch; the owner's eye remains the final gate.

**Our own cross-episode baseline (owner-directed experiment, 2026-08-22):** same protocol run on OUR channel — benchmark = Episode 4 Gold Rush FINAL cut (retrieved from the episode-4 production branch), tests = Episode 5 (Dinosaurs) and Episode 8 (Berlin) stitched from their manifests' live provider URLs (work-in-progress clips, NO edit-stage conform/QC yet), 2× each on gemini-3.7-flash. Results: **Ep 5 identity 72/73, Ep 8 identity 72/72 — 4/4 SAME PERSON verdicts, zero structural drift named in any run** (freckles recognized even under mud styling). Identity = the market leader's own band (72–74), with MORE consistent verdicts than her videos got (she had one LIKELY SAME). Realism: our FINISHED Ep 4 benchmark scored **82 — the highest of any video in either experiment, 10 pts above Chloe's own benchmark (72)**; the unfinished Ep 5/8 stitches scored 48–66 (raw generation clips, plus a lossy re-stitch) — the gap between 82 and 48–66 is what the edit stage (conform, QC, regeneration rounds) exists to close, and the artifacts Gemini named (hand/finger morphing in interactions, temporal skin smoothing, mouth-boundary blur in fast speech, background morphing in crowds) are exactly the §13/§16 edit-stage checklist. Standing conclusion: identity consistency is SOLVED at market-leader level; realism is won or lost in the edit stage.

**Market-leader baseline (owner-directed experiment, 2026-08-22):** the same rubric run on Chloe VS History herself — forensic spec extracted from her Aztec video (benchmark), then her Tudor and Cleopatra videos scored against it, TWICE each, all on gemini-3.7-flash: Tudor 73/73 identity (realism 58/68), Cleopatra 72/74 identity (realism 60/63); verdicts 3× SAME PERSON, 1× LIKELY SAME. Conclusions: (1) the market leader's own cross-video identity consistency measures **72–74** — the same band as our canon control and our best PAI stills, independently confirming 72+ = EXCELLENT on this rubric and that ~74 is the practical ceiling; (2) **identity scoring is highly repeatable (±1 pt run-to-run); realism scoring is noisy (±10 pts)** — for decisions, average two realism runs and lean on the artifact NOTES, not the number; (3) her videos carry real named artifacts at 371k subs (plastic-smooth skin, teeth morphing, selfie-arm warping, hair fusing into background, realism 58–72) — the bar for "good enough to win the market" includes visible AI tells, and our stills (realism 65–71) measure at or above her; stills vs video is not perfectly comparable (video exposes temporal artifacts), so re-baseline against our own rendered CLIPS at Ep 5's edit stage.

## 5. Gemini eyes — one-time setup (owner action required)
1. Get a free API key: https://aistudio.google.com/apikey (sign in with a Google account → "Create API key").
2. Add it to the Claude Code environment: claude.ai → Claude Code → your environment → **Environment variables** → name `GEMINI_API_KEY`, value = the key. (Running locally instead: `export GEMINI_API_KEY=...`.)
3. **Never** paste the key into chat, a file, or a commit.
4. Verify it works: `node scripts/gemini-eyes.mjs --list-models`.

Notes: sandbox reachability to `generativelanguage.googleapis.com` was verified 2026-08-20 (Google answered; only the key is missing). Division of labor is fixed: Gemini reports observations only; creative and editorial decisions stay with Claude Code and the owner.

**Model & tier guidance (checked 2026-08-20):**
- **Free tier is fine to start.** It covers Flash-class models with per-day/per-minute caps that Google keeps adjusting (third-party trackers reported between 250 and 1,500 requests/day during 2026). A 10-clip episode needs ~11–15 QC calls, so even the low end covers daily production; limits reset daily.
- **Owner directive (2026-08-20): always use the most advanced Flash.** The script default is `gemini-flash-latest` — Google's rolling alias that always resolves to their newest Flash release, so QC auto-upgrades forever with no maintenance. Verified live against the owner's key on 2026-08-20 (the visible Flash family then ran up to `gemini-3.7-flash`). If the alias is ever unavailable, the script automatically falls back to `gemini-3.6-flash` (Google retired `gemini-2.5-flash` for new accounts on 2026-08-20 — verified live); `GEMINI_MODEL` or `--model` still override for one-off tests.
- **Sampling beats model size for clip QC.** Gemini watches video at 1 frame/second by default — on a 6s clip that's ~6 frames, which can miss a sub-second hand-morph or flicker. The script therefore samples local clips at 5 fps in qc mode (tunable with `--fps`, plus `--resolution` for per-frame detail). Cost stays trivial: a 10s clip at 5 fps ≈ 50 frames ≈ ~13k tokens.
- **Upgrade path, only if needed:** Pro-class models moved behind billing (reported ~May 2026). If free Flash demonstrably misses defects, add billing and use a Pro-class model for the full-cut pass only (`--model`, after `--list-models`) — the edit-stage clip sweeps stay on Flash. Don't pay preemptively.
- **Privacy note:** Google's published API terms have allowed free-tier content to be used to improve their products (paid tier excluded). For unpublished renders, if that matters, the cheap paid tier removes it — check the current terms before deciding.
- **Owner's standing order (2026-08-20): the moment the free allowance blocks work, tell the owner straight away** — in that chat, in plain words, with the upgrade option (enable billing on the same key at aistudio.google.com; same key keeps working, limits jump, Flash costs cents). The script prints this order in its quota-exhausted error so no session can miss it. Never silently wait out a quota wall and never skip QC because of one. Note: the free quota is one shared pool across all sessions using the key, and daily limits reset every 24h.

## 6. Close the loop after publishing
48 hours after each upload: pull our own `vidiq_video_stats` and `vidiq_video_comments`, compare actuals against the idea's signal-stack score and the virality predictor's call, and write one lesson into this file or the backlog. The methodology only gets smarter if actuals flow back into it.
