# Episode 8 Production Log — "The Night the Berlin Wall Fell"
**Produced 2026-08-20/21 on branch `claude/episode-8-production-y9o56z` · Project id `berlin` (`pai-pro/projects/berlin/`)**

Full clip-by-clip script followed verbatim from `episodes-5-9-scripts.md` (Episode 8 section). This log records what happened in production, engine quirks discovered, and open items for owner review — per `NEW_CHAT_HANDOFF.md`, shared docs are NOT edited here; anything below worth merging into `creative-direction.md`/`CHARACTER_LOCK.md` is flagged explicitly for the owner/merge session.

## Status: DRAFT CUT DELIVERED, awaiting owner watch-through
Runtime **112.50s** (script target ~112s). Files (not in git, per standing rule — retrievable by PAI job ID below or from the delivered chat files):
- Master: `pai-pro/projects/berlin/assets/berlin_final_cut.mp4` (CRF16, ~62MB)
- Delivery/review copy: `pai-pro/projects/berlin/assets/berlin_final_cut_compressed.mp4` (~22MB) — **sent to owner in chat**
- Costume study still: `pai-pro/projects/berlin/assets/ep8_still_costume_v2.png` — **sent to owner in chat**

## 1. Setup
- `pai-pro/.active_project` set to `berlin`; project dir created at `pai-pro/projects/berlin/`.
- **Engine access method**: bypassed the full canvas/viewer/tunnel app entirely (matching the precedent noted in `PROJECT_HANDOFF.md` §4) — wrote a standalone script (`pai-pro/server/berlin_pipeline.mjs`, not committed — lives only in the pai-pro clone) that imports `pai_image_pro_client.js` / `pai_assets_client.js` / `pai_video_client.js` directly. This works cleanly because every reference is already a public CDN URL (the CHARACTER_LOCK.md permanent refs) — `image-generation-pro`/`image-edit-pro` take raw HTTPS URLs directly, and video refs go through `uploadReferenceUrl()` which also accepts any public URL, no cloudflared tunnel needed for either.

## 2. Engine fact discovered — new `image-edit-pro` response shape (worth merging into `creative-direction.md` §16)
`image-edit-pro` returned a **third** response shape not covered by the existing two parsers in `pai_image_pro_client.js`: `data[0].b64_json` (plain OpenAI-images-API style, no `data:` prefix, no mime). Patched `extractMediaUrl()` in `pai-pro/server/pai_image_pro_client.js` to wrap it as a `data:image/png;base64,...` URI so the existing decode path handles it. This patch lives only in this container's `pai-pro` clone (outside the chloe git repo) — **flagging for the owner/merge session to fold into the upstream pai-pro fork or re-apply each session** until it's turned into a proper patch file alongside the two existing ones in `patches/`.

## 3. Character-still lesson — reference-image wardrobe/setting bleed-through
First costume-still attempt (prompt: 1980s East Berlin thrift shop) rendered a **Wild West frontier corset dress in front of a saloon-town building** — a hard QC fail. Root cause: one of the five CHARACTER_LOCK master refs (`d35989c6-...`, captioned in `CHARACTER_LOCK.md` as "clip 3 costume — clear costume/figure reference") is literally a Wild West Episode-1 costume frame, and the model over-weighted its wardrobe/background over the prompt's text description. Fixed by adding an explicit instruction at the top of every prompt: *"the reference images show her from a PREVIOUS, unrelated shoot — take ONLY facial identity/hair/skin from them, ignore all clothing/background/setting."* This fully resolved the wrong-era problem on the next generation and was baked into every one of the 11 clip prompts (`pai-pro/projects/berlin/prompts/_prefix.txt`). **Recommending this instruction get folded into `CHARACTER_LOCK.md`'s usage rules for all future episodes** — any episode whose costume differs from the frontier/Wild West reference frames is at risk of the same bleed-through.

## 4. Realism-bar finding — residual makeup/gloss despite the matte clause
First-pass generations (both the still and clip 1 v1) showed heavy eyeliner/eyeshadow/lash makeup — a direct violation of the CHARACTER_LOCK matte/gritty clause. Strengthened the clause with an explicit "face is BARE of makeup: NO eyeliner, NO winged liner, NO false lashes..." instruction, which substantially improved (but did not 100% eliminate) the issue — clips 1 (v2) onward show much more natural/matte skin and lighter eye makeup, but a mild residual "polish" (some lash definition, occasional forehead/cheek sheen under floodlights) persists across most clips. This reads as a soft model bias toward "beautiful woman" priors that text alone couldn't fully suppress within a reasonable generation budget. **Flagging as a known, unresolved finding for owner review** — not re-rolled across all 11 clips given diminishing returns per prompt iteration; the owner's watch-through is the right gate to decide whether any specific clip needs a targeted regen over this.

## 5. Clip manifest (PAI job IDs + URLs — full detail also in `pai-pro/projects/berlin/manifest.json`)
| Clip | Scene | Duration | PAI task ID |
|---|---|---|---|
| 1 open | Linear open, the Wall + stated doom | 9.04s | `dc3137a9-7be3-4545-9343-42a02b5c833a` |
| 2 costume | Thrift shop, fur coat | 8.04s | `3f529e1e-fd23-4d49-839a-395d4f929131` |
| 3 food | Ketwurst stand | 8.04s | `f34d9ca3-ed85-4120-b40e-aaf377ac0647` |
| 4 pressconf | Bar, Schabowski broadcast | 11.04s | `fb3b0acd-6a3c-4310-9cad-f26fe753f6a7` |
| 5 streetfill | Margot & Werner, doorway | 10.04s | `358ee689-d0a4-4b1a-b81a-8229622cf6ed` |
| 6 walk | The walk to Bornholmer, Stasi gag | 9.04s | `6055a0dd-d7c6-4c8a-b64e-125b54c40a03` |
| 7 empathycore | Margot's photo (silent core beat) | 12.04s | `05411ee7-4079-4b10-8db9-71cc1158c731` |
| 8 standoff | The crush, the young guard, first cork | 12.04s | `1fd98731-ba98-4e49-bf81-37a7a16329a3` |
| 9 gate | Barrier lifts, death-strip rabbits | 10.04s | `2e08c734-90eb-42bf-98d3-16b6df0c7032` |
| 10 reunion | Wall-top, Margot & Hanne | 12.04s | `0d2a73a4-5fa7-4dba-8819-020903456513` |
| 11 outro | Sparkler outro, sign-off | 11.04s | `0c97cb75-5b12-4f7d-8678-9a9e99d3d3d8` |

All 11 generated on the first attempt after the v2 prompt fixes (no content-filter rejections on video gen, unlike the two initial still-generation retries).

## 6. Captions — methodology and confidence flags
Timed from real `ffmpeg silencedetect` boundaries on each clip's actual rendered audio (never from generation prompts), per `creative-direction.md` §16. Internal sub-0.3s pauses collapsed into one whole-sentence cue per the established "virtual timeline" policy; larger gaps treated as real beat/sentence boundaries. Non-protagonist lines carry italicized `[Speaker]` tags (Margot, Werner, Patron, Vendor, Hanne, TV/Schabowski, Crowd).

Two clips (`clip01_open`, `clip10_reunion`) returned almost no silencedetect hits even down to -25dB (ambient Trabant/crowd noise stays above threshold) — clip01 was resolved by hunting at -25dB (6 clean segments, matched the 6 scripted phrase-beats exactly). **clip10 has no usable silence data at all** — its one cue ("MARGOT?!", spoken by **Hanne, not Hazel** — Hazel has no dialogue in this clip per the script) is timed from a visual frame read of Hanne's entrance, not audio. clip07's empathy-core beat has **zero dialogue by design** (script mandate) — real audio independently confirms this: continuous ambience to 8.245s, then 3.8s of true silence to clip end, exactly matching "DO NOT RUSH."

**Low-confidence cues flagged inline in `pai-pro-tooling/berlin/captions_data.mjs` for verification:**
- clip03's final line ("The engineering is load-bearing.") — tail with no clean silence boundary after 6.7s.
- clip05's final line ("I can wait for you to find your glove.") — same issue, tail estimated.
- clip09's rabbit lines — long undifferentiated 0-6.85s run, split proportionally + contact-sheet mouth-check.
- clip10's "MARGOT?!" — visual estimate only, no audio signal.
- clip11's final two lines including the sign-off ("I didn't think it would hit like this." / "Hazel — out of time.") — continuous mouth movement on every sampled frame in the 9.1-11.0s tail, split estimated.

These are exactly the class of finding the mandatory Gemini captions-mode pass exists to catch — see §8.

## 7. Assembly
All 10 transitions are true zero-blend hard cuts (`ffmpeg concat`, per `creative-direction.md` §16 — no dissolves anywhere). No title card: Episode 8 is fully linear per the OPENING LAW, so there's no flashback moment for a card to mark. 0.08s audio-only edge fades at every clip boundary (source, not blend). `loudnorm` per clip, capped to each clip's frame-exact video duration. ffprobe frame-count sanity check passed (actual 112.50s vs. predicted 112.46s — 0.04s deviation, well within the ±1s guard the build script now hard-fails on).

## 8. Edit-stage QC (Gemini eyes) — 2 of 3 mandated passes completed
Per the owner's QC rule in `CLAUDE.md`, ran `tools/gemini-eyes/gemini_eyes.py`:

**Pass 1 — full raw clip set entering the edit** (all 11 unmodified clips concatenated, `qc` mode): score 6.8/10, 4 CONFIRMED findings, all minor generative artifacts, none rising to identity drift or requiring a clip regen:
- License plate on a background Trabant shows garbled text (clip1).
- Hot dog/mouth morph during the bite (clip3).
- Death-strip rabbits slide without leg movement (clip9 — Gemini mislabeled them "birds").
- A chipped wall shard "materializes" in her palm without a visible pick-up motion (clip10).

**Pass 2 — assembled/stitched final cut** (`qc` mode): score 6.2/10, 3 CONFIRMED (same classes: hot-dog morph, a photo-prop edge fusing into a thumb joint during the clip7 empathy beat, no debris/recoil on the hammer strikes in clip10), 1 DISMISSED (a glove-retrieval finger-clipping flag that Gemini itself found not to reproduce on closer look).

None of the CONFIRMED findings from either pass involve character identity, wrong era/setting, or continuity breaks — all are the class of subtle prop/physics artifact the report itself calls "standard generative artifacts." **Per the owner's rule, every CONFIRMED finding still needs an explicit fix-or-waive decision before delivery — flagging all 7 (4+3, with overlap) for the owner's call**, since none are cheaply fixable via re-editing (they're baked into clip pixels) and none obviously clear the bar for a full clip regeneration.

**Pass 3 — captions mode vs. the `.srt` — NOT COMPLETED.** Hit the Gemini free-tier daily quota (`GenerateRequestsPerDayPerProjectPerModel-FreeTier`, limit 20/day, shared across every session using this key) across all three models in the fallback ladder (`gemini-3.7-flash` → `3.6-flash` → `flash-latest`) after the two QC passes above consumed the day's allowance. Per the owner's standing order in `research-methodology.md` §5, **this is being surfaced directly rather than silently skipped**: the captions cross-check either needs the quota to reset (24h from whenever today's window started) or billing enabled on the same `GEMINI_API_KEY` (cheap — cents per run). The low-confidence caption cues flagged in §6 above are the specific candidates that pass would most likely catch or clear.

## 9. Virality predictor
Higgsfield `virality_predictor` **caps input at 16 seconds** — a previously-undocumented engine limit, worth adding to `creative-direction.md` §16's engine-facts list. Ran it on the episode's hook (clip 1, exactly as it appears in the final cut with captions, 9.04s) rather than the full 112s cut. Result is a JS-rendered interactive "brain activity" attention dashboard (not a static score) at:
`https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_20260821_011222_8b2ed8f8-dc93-48af-a9c0-6c6793a59299.html`
— open directly in a browser (WebFetch can't extract the client-rendered content). The owner's watch-through remains the final gate regardless.

## 10. Pinned comment + engagement question (from the approved script, unchanged)
**Pinned comment:** Schabowski's "immediately, without delay" was a misread note about a next-day visa rule — real; Bornholmer Straße opened ~23:30 when Lt. Col. Harald Jäger stopped checking and raised the barrier on his own; at least 140 people died at the Wall 1961–89 (memorial line); the death-strip rabbit colonies are real (they even got a documentary); Ketwurst is a genuine East Berlin invention. Disclosure + follow CTA.
**Channel engagement question:** "Where was your family the night the Wall fell? 👇"

## 11. Open items for the owner
1. **Watch-through + fix-or-waive decision** on the 7 CONFIRMED Gemini findings (§8) — none look regen-worthy to me, but that call is the owner's per the QC rule.
2. **Gemini captions-mode pass** (§8, pass 3) — blocked on quota; needs either a 24h wait or billing enabled to complete the mandated third check, especially given the several low-confidence caption cues flagged in §6.
3. **Residual makeup/gloss finding** (§4) — decide whether any specific clip needs a targeted regen, or accept as-is.
4. **`image-edit-pro` response-shape patch** (§2) and the **reference-bleed-through instruction** (§3) — both worth folding into the shared docs (`patches/`, `CHARACTER_LOCK.md`) at the next merge session; not touched here per the parallel-chat rule against editing shared files directly.
5. Release timing: script's target is Nov 9 (Berlin Wall anniversary) — this draft is well ahead of that date.
