# PROJECT HANDOFF — AI Historical Time-Travel Channel
**Owner: Mobeen Ashraf · Last updated: 2026-08-20**

## 0. STATE UPDATE 2026-08-20 (supersedes older lines below where they conflict — newest-command-wins)
- **Episodes 1–4 are PRODUCED** (Wild West 1875, Salem 1692, Boston 1775, Gold Rush 1849).
- **Episodes 5–9 are LOCKED and fully scripted** (owner decision 2026-08-20): Ep 5 The Day the Dinosaurs Died · Ep 6 The Day Julius Caesar Was Assassinated · Ep 7 I Sailed to Troy (daylight/golden-hour only) · Ep 8 The Night the Berlin Wall Fell (aim release Nov 9) · Ep 9 I Helped Build the Great Pyramid (she speaks with Khufu). Clip-by-clip scripts: `episodes-5-9-scripts.md` (v3, linear).
- **The character's name is HAZEL** (owner lock, in `CHARACTER_LOCK.md`); sign-off ritual "Hazel — out of time" is in all five scripts (proposed status recorded in CLAUDE.md). The face lock is **v4 "as-filmed"** per `CHARACTER_LOCK.md` — §2 below describes the superseded v3 state; CHARACTER_LOCK is the authority.
- **OPENING LAW (owner lock):** linear storytelling only — no flash-forward cold opens, no rewind cards. Recorded in `chloe-craft-study-2026-08-20.md` §4.1, which is BINDING for all scripts and production alongside `creative-direction.md`.
- **Caption position owner-locked:** marginV=320 (720×1280 PlayRes) — see `creative-direction.md` §16 and `pai-pro-tooling/salem/captions_data.mjs`.
- Backlog of future ideas (#1–20, scored): `episode-ideas-backlog.md`. Delaware-Crossing 250th (Dec 25–26) is open for Ep 10 — decide by mid-November.

## 1. Project in one paragraph
Building an AI-generated cinematic historical channel for the US market, reverse-engineered from **Chloe VS History** (persona-led time-travel vlogs; 371k subs) and **Nova Time Travel** (cinematic AI films; superior watch-time economics). Strategy: Chloe's talk-to-lens persona format + US-history topics + Nova's runtime/packaging for long-forms. Full analysis in `chloe-vs-history-strategy-report.md`.

## 2. Locked character (FINAL — do not redesign)
- **SOLE MASTER: v3 "round-cute", locked 2026-08-19** — Higgsfield job `614dd306-4923-4275-bf21-47c261a4350d`
  URL: https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260819_061133_614dd306-4923-4275-bf21-47c261a4350d.png
  A softer, rounder-faced edit of the earlier v1 master, locked in after an in-chat side-by-side comparison. A further "pass 2" (`48973f0a-...`) pushed too far into cherub territory and was rejected.
- Prior master (v1, superseded): job `8b0170dd-7096-45cb-b435-fe5edb1b8d02`. Do not use going forward.
- Optional styling references (NOT masters — wardrobe/mood refs only): v2-A "chic" job `7345ce96-b3d8-4150-953d-6cb3b35fe259`; v2-B "casual" job `76fa0496-4d50-419e-8041-34fbd1cacbae`.
- Full identity string, version history, and usage rules: see `CHARACTER_LOCK.md`. Every generation must reference the v3 master image; never regenerate the face from text. Age locked at early twenties (adult); owner's de-aging requests were declined — topic closed, do not revisit.
- **Stale assets:** the two existing Wild West 1875 test shots were generated against the old v1 master and need regenerating against v3 before production use (see §4).
- Pending: character name; 1875 costume stills regenerated against v3; expression set.

## 3. Production decision state
- First video: a SHORT (user's call), Chloe-pattern, full interaction/drama grammar.
- Chosen concept: **"I time travelled to the Wild West in 1875 🤠"** — ~75–80s, 10 clips. Full shot-by-shot script with dialogue was approved in conversation; beats: (1) cold open crouched behind trough during bank robbery, (2) rewind to arrival + near-miss with horse, (3) corset-lacing costume beat, (4) saloon food review "3/10 the beans fight back", (5) irony beat — kid mentions gold at bank, (6) she warns the sheriff, gets dismissed, (7) cinematic robbery set-piece — she pulls the kid to safety, yells "GET DOWN!", (8) eye-contact-with-robber fear beat + escape run, (9) breathless aftermath + hat returned, (10) sunset outro "back to 2026, follow for the next trip."
- **Next episodes (owner-approved 2026-08-19), all Shorts 90–200s, Chloe-formula V-mode only:** Ep 2 Salem 1692 ("I Was Accused of Witchcraft"), Ep 3 Boston 1775 ("The Night Paul Revere Rode"), Ep 4 Gold Rush 1849 ("I Joined the Gold Rush of 1849") — full clip-by-clip scripts in `episodes-2-4-scripts.md`. Every script obeys the new permanent active-participant directive (`creative-direction.md` §12).
- Oregon Trail 1848 long-form: deferred, plan kept in `episode-1-production-plan.md`.

## 4. PAI Pro setup — DONE, validated 2026-08-19
- Chloe's engine is Utopai's PAI; open-source pipeline: https://github.com/Utopai-Research/pai-pro
- Cloned to `/home/user/pai-pro` (outside this git repo). `.env` created with owner's `PAI_KEY` (gitignored, never committed). Project scaffold created: `projects/wildwest/assets/`, `.active_project=wildwest`. `npm --prefix server install` completed.
- **Connectivity test: passed.** `api.pai-pro.utopaistudios.com` reachable from this environment's Custom network allowlist; returned 401 pre-auth as expected, 200 post-auth.
- **Validation generation: passed.** Hit the raw `image-generation` endpoint directly (bypassing the full local canvas/viewer app, which needs a browser + tunnel this headless session can't use) with the (then-current v1) master as reference. Produced one talk-to-lens shot and one action shot in 1875 Wild West costume — both succeeded. Files at `pai-pro/projects/wildwest/assets/shot1_talk_to_lens_1875.png` / `shot2_action_1875.png`. **These now need regenerating against the v3 master** (see §2) before use in the actual Short.
- Known API quirk: `fileData` in the `image-generation` payload requires an explicit `mimeType` field (e.g. `"image/png"`) or the request 400s with "empty mimeType parameter".
- Network note: this environment's allowlist currently covers only `api.pai-pro.utopaistudios.com`. Higgsfield's CDN (`*.cloudfront.net`, e.g. `d8j0ntlcm91z4.cloudfront.net`) is NOT allowlisted — this sandbox cannot download Higgsfield-hosted images, and Artifacts can't hotlink them either (strict CSP blocks all external image hosts except Google Fonts). Workaround in use: share raw CloudFront URLs directly for the owner to open in their own browser. Proper fix: add `*.cloudfront.net` to this environment's Custom network allowlist the same way the PAI host was added.

## 5. Higgsfield state
- Balance at last handoff: ~13,950 credits (Ultra plan), minus this session's edits (2 nano_banana_pro-tier edits for the round-cute passes). Image cost ref: soul_cast ~50 cr; video seedance_2_5 8s/16:9 = 52 cr.
- Filter notes: soul_cast blocked several "glam model" prompts (NSFW false positives); **nano_banana_pro passes reliably** — use it for stills/edits of the locked character. Requests to nano_banana_pro have been observed routing internally to model `nano_banana_2`.

## 6. Key strategy facts (for continuity)
- Chloe formula: persona vlog grammar; dramatic irony engine; Shorts feed monthly long-forms (long-forms = 5× channel avg views); "AI gem not slop" credibility playbook (pinned researched comments).
- Nova lesson: watch-time economics (est. $8.6k/mo @ 28k subs vs Chloe $1.3k @ 371k); logline titles; episodic universes; prunes flops (deleted ~half her catalogue).
- Market: "ai time travel vlog" competition 29/100, US #1 market; frontier-survival keyword +12,468% (30d); America-250 tailwind for Revolutionary content through 2027.
- RPM estimates (flagged as estimates): US history long-form ~$3–8; Shorts ~$0.05–0.30.

## 7. Next actions
1. Regenerate the 1875 Wild West talk-to-lens + action test shots against the v3 master (§2/§4) to confirm the rounder-face look holds up under costume/action prompting.
2. Once approved, produce the remaining shots for the full 10-clip Wild West Short (script in §3).
3. Consider Higgsfield Soul training on approved v3 renders for hard-locked consistency across the full Short.
