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

## 4. Video QC — the "eyes" pipeline for every render
Claude Code directs; the tools below only *see* and report. Run in this order on every finished render before the owner watches it:
1. **Higgsfield `virality_predictor`** — hook strength, retention risk, attention/engagement dashboard.
2. **Gemini second eyes** — `node scripts/gemini-eyes.mjs --file <render.mp4>` (setup in §5). Frame-level defect hunt: morphing faces/hands, lip-sync, continuity, era anachronisms, motion tells. Attach the character v3 master with `--image` for identity-consistency checks and pass the episode's era/script context via `--prompt`.
3. **Owner watch-through** — the final call is always human.

Until the Gemini key is set, steps 1 and 3 still run — the pipeline works without Gemini, just with one fewer pair of eyes (Higgsfield `video_analysis_create` is a further scene-by-scene fallback; most accurate on short clips).

For studying **reference** videos (Chloe VS History, Nova, any outlier): `vidiq_video_watch` (long-form) or `vidiq_watch_shortform_content` (Shorts/Reels/TikTok), or `gemini-eyes.mjs --youtube <url> --mode study` once the key exists.

## 5. Gemini eyes — one-time setup (owner action required)
1. Get a free API key: https://aistudio.google.com/apikey (sign in with a Google account → "Create API key").
2. Add it to the Claude Code environment: claude.ai → Claude Code → your environment → **Environment variables** → name `GEMINI_API_KEY`, value = the key. (Running locally instead: `export GEMINI_API_KEY=...`.)
3. **Never** paste the key into chat, a file, or a commit.
4. Verify it works: `node scripts/gemini-eyes.mjs --list-models`.

Notes: sandbox reachability to `generativelanguage.googleapis.com` was verified 2026-08-20 (Google answered; only the key is missing). Default model is `gemini-2.5-flash` — cheap, video-capable, free tier is enough to test; override with `GEMINI_MODEL` or `--model` after checking `--list-models`. Division of labor is fixed: Gemini reports observations only; creative and editorial decisions stay with Claude Code and the owner.

## 6. Close the loop after publishing
48 hours after each upload: pull our own `vidiq_video_stats` and `vidiq_video_comments`, compare actuals against the idea's signal-stack score and the virality predictor's call, and write one lesson into this file or the backlog. The methodology only gets smarter if actuals flow back into it.
