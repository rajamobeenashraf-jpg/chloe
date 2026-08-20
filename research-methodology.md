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

**Stage A — per-clip, during production (the cheapest moment to catch a flaw):**
- QC every generated clip *before* it enters the edit: `node scripts/gemini-eyes.mjs --file <clip.mp4> --image <v3-master.png> --prompt "<era + what the clip is supposed to show>"`. Fallback without the Gemini key: Higgsfield `video_analysis_create` (most accurate on short clips).
- Every regenerated clip goes through Stage A again — never assume a regen only fixed things.

**Stage B — assembled render, before the owner watches it:**
1. **Gemini second eyes** on the full cut — continuity and identity across clip joins, lip-sync, captions, audio, era accuracy.
2. **Higgsfield `virality_predictor`** — hook strength, retention risk, attention/engagement dashboard.
3. **Owner watch-through** — the final call is always human.

Until the Gemini key is set (§5), everything else still runs — the pipeline just has one fewer pair of eyes.

For studying **reference** videos (Chloe VS History, Nova, any outlier): `vidiq_video_watch` (long-form) or `vidiq_watch_shortform_content` (Shorts/Reels/TikTok), or `gemini-eyes.mjs --youtube <url> --mode study` once the key exists.

## 5. Gemini eyes — one-time setup (owner action required)
1. Get a free API key: https://aistudio.google.com/apikey (sign in with a Google account → "Create API key").
2. Add it to the Claude Code environment: claude.ai → Claude Code → your environment → **Environment variables** → name `GEMINI_API_KEY`, value = the key. (Running locally instead: `export GEMINI_API_KEY=...`.)
3. **Never** paste the key into chat, a file, or a commit.
4. Verify it works: `node scripts/gemini-eyes.mjs --list-models`.

Notes: sandbox reachability to `generativelanguage.googleapis.com` was verified 2026-08-20 (Google answered; only the key is missing). Division of labor is fixed: Gemini reports observations only; creative and editorial decisions stay with Claude Code and the owner.

**Model & tier guidance (checked 2026-08-20):**
- **Free tier is fine to start.** It covers Flash-class models with per-day/per-minute caps that Google keeps adjusting (third-party trackers reported between 250 and 1,500 requests/day during 2026). A 10-clip episode needs ~11–15 QC calls, so even the low end covers daily production; limits reset daily.
- **Owner directive (2026-08-20): always use the most advanced Flash.** The script default is `gemini-flash-latest` — Google's rolling alias that always resolves to their newest Flash release, so QC auto-upgrades forever with no maintenance. Verified live against the owner's key on 2026-08-20 (the visible Flash family then ran up to `gemini-3.7-flash`). If the alias is ever unavailable, the script automatically falls back to `gemini-2.5-flash`; `GEMINI_MODEL` or `--model` still override for one-off tests.
- **Sampling beats model size for clip QC.** Gemini watches video at 1 frame/second by default — on a 6s clip that's ~6 frames, which can miss a sub-second hand-morph or flicker. The script therefore samples local clips at 5 fps in qc mode (tunable with `--fps`, plus `--resolution` for per-frame detail). Cost stays trivial: a 10s clip at 5 fps ≈ 50 frames ≈ ~13k tokens.
- **Upgrade path, only if needed:** Pro-class models moved behind billing (reported ~May 2026). If free Flash demonstrably misses defects, add billing and use a Pro-class model for the Stage B full-cut pass only (`--model`, after `--list-models`) — per-clip Stage A stays on Flash. Don't pay preemptively.
- **Privacy note:** Google's published API terms have allowed free-tier content to be used to improve their products (paid tier excluded). For unpublished renders, if that matters, the cheap paid tier removes it — check the current terms before deciding.

## 6. Close the loop after publishing
48 hours after each upload: pull our own `vidiq_video_stats` and `vidiq_video_comments`, compare actuals against the idea's signal-stack score and the virality predictor's call, and write one lesson into this file or the backlog. The methodology only gets smarter if actuals flow back into it.
