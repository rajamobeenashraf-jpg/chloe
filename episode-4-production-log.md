# Episode 4 Production Log — "I Joined the Gold Rush of 1849"
**Chat/branch: `claude/shorts-episode-production-72i231` · Started 2026-08-20 · Owner: Mobeen Ashraf**

Assignment confirmed by owner 2026-08-20: this chat produces **Episode 4 — Gold Rush 1849** (the task template's episode line was blank; no other chat had claimed an episode on any pushed branch at claim time).

## Environment / engine state (fresh container)
- Branch created from `origin/claude/pai-pro-connection-izza4s` per handoff.
- SessionStart hook: PAI Pro cloned to `/home/user/pai-pro`, `.env` written from `$PAI_KEY` env var (owner's recommended one-time setup is active — no key prompt needed), server deps installed.
- Own project dir created: `/home/user/pai-pro/projects/goldrush49/assets/` · `.active_project=goldrush49`.
- API auth verified (task/status probe returns 404-with-auth, not 401).
- **Network is broader than Episode 1's container**: the agent proxy here is non-selective, so CloudFront and general HTTPS are reachable. Episode 1's "only api.pai-pro allowlisted" limitation does not apply in this container.

## BLOCKER (open): v4 master reference images lost with the old container
`CHARACTER_LOCK.md` truncates the five master-ref CloudFront URLs (`d2ol7oe51mr4n9.cloudfront.net/.../<uuid>.png` — middle path segment elided), and the local copies died with Episode 1's container. Recovery attempts, all exhausted:
- Repo grep for full URLs: nothing outside CHARACTER_LOCK.md's truncated rows.
- PAI API has only generate/submit/task-status endpoints — no account generation-history listing to look the files up.
- CDN path guessing against the known UUID (10 common prefixes): all 403.
- Probe pro-tier generation to learn the account's output-URL pattern: this response path returned inline base64 (`choices[0].message.images[0]` data URI), not a `media_urls` CDN URL — pattern not recoverable this way. (~$0.45 spent; also served as an end-to-end pipeline sanity check — engine works.)

**→ Asked owner to paste the five full CloudFront URLs from the Episode 1 chat** (or re-upload the files anywhere fetchable). With URLs in hand: `image-edit-pro` takes them directly as `image` array (PAI fetches server-side), and video-side refs go through `video-generation-assets` CreateAsset(URL). No tunnel needed headless.

## Engine facts confirmed this session (for the merge-back)
- `image-generation-pro` **text-to-image (no refs)** can route to an OpenAI-provider passthrough returning `choices[0].message.images[0].image_url.url` as a base64 data URI — NOT the `outcome.media_urls[0].url` shape the repo client documents for edit calls. Handle both response shapes when parsing.
- `image-edit-pro` refs are **URL-only** at the client boundary (`data:` URIs rejected); PAI fetches refs server-side, so headless works with any public URL.
- Video ref uploads: `CreateAsset {URL}` → poll `GetAsset` → `Active` (per-file 1.8–15.2s for A/V; video refs aggregate ≤15s; audio refs need a visual anchor alongside).
- Video pipeline limits (from `server/cli/_limits.js`): ≤9 image refs, ≤3 audio refs, ≤3 video refs, hard 15.2s/clip.
- cloudflared is NOT installed in this container; if a local-file ref is ever unavoidable, install it or use inline base64 `fileData` (+ explicit `mimeType`) on the standard `image-generation` model only.

## Episode 4 creative plan (locked from approved script)
- 12 clips, ~132s, per `episodes-2-4-scripts.md` — dialogue as written, no character name anywhere.
- **Locked color grade (restate in EVERY clip prompt):** cold overcast Sierra Nevada river-canyon light, green-grey palette, muted desaturated tones, damp air, soft diffuse daylight — deliberately anti-Ep-1 (no warm amber).
- **Wardrobe (clips 4→12):** mud-caked red-brown flannel shirt, canvas work trousers, heavy leather work boots, grey slouch hat, hair loosely tied back — mud to the knees from clip 4 onward.
- **Clips 1–3 wardrobe:** trail/arrival outfit (plain wool travel dress/coat) until the work-kit change beat in clip 4. Cold open (clip 1) is a flash-forward to night — work kit + torchlight.
- **Recurring NPCs (identical description every appearance):** Amos — free Black miner, 40s, broad build, grey-flecked short beard, patched blue wool shirt, leather suspenders, kind weathered face. Li — Chinese miner, 20s, slim, wide-brimmed woven hat, dark tunic, quick precise movements. Both appear clips 5, 7, 9–12 (Li), 5, 7, 11–12 (Amos per script beats).
- Gate order: costume stills → clip-by-clip → stitched cut → QC rounds.

## Ref recovery RESOLVED (2026-08-20) — v5 owner-supplied reference set
Owner pasted 10 reference images directly into chat (front/¾/profile portraits, full-body turnaround sheet, face-detail sheet, one Wild West as-filmed movie frame) with the instruction: **"use this as the character sheets… she should appear as natural, realistic, and human, not some AI and plastic… 100% natural."** These supersede the lost v4 CloudFront copies as the working master set (identity is visually identical to the v4 description).
- Extracted from the session transcript (base64) → `pai-pro/projects/goldrush49/assets/refset/ref_01–10.png`.
- **Committed to the repo at `character-refs/ref_01–10.png`** (owner's chosen hosting route) — PAI fetches refs server-side from the SHA-pinned raw URLs `raw.githubusercontent.com/rajamobeenashraf-jpg/chloe/6f936b1.../character-refs/ref_XX.png`.
- Working master five (every generation): ref_08 turnaround sheet · ref_09 face-detail sheet · ref_10 movie frame · ref_01 front portrait · ref_06 profile.
- Frozen v4 identity string still used VERBATIM (matches this set), plus the §5 naturalism keywords and an explicit anti-AI/anti-plastic clause in every prompt per owner instruction.

## Engine facts learned (this session, for merge-back)
- **PAI request body cap: 512KB** — inline base64 refs are impossible; refs must be public URLs (server-side fetch). This is why Episode 1's fileUri quirk exists.
- `image-edit-pro` routes to `gpt-image-2`: accepts a fixed size list (720x1280, 1440x2560, 2160x3840 are the 9:16 options) BUT this passthrough returns **1024x1024 regardless of requested size**, as a base64 data URI in `choices[0].message.images[0].image_url.url`, cost ~$0.26/still. Stills are identity/costume refs; final 9:16 (owner default) is enforced at the video-pipeline stage.
- cloudflared tunnel + Higgsfield upload both blocked by the sandbox permission classifier; repo-hosted refs are the approved route.

## Gate 1 submitted (2026-08-20)
- `still_workkit_v1.png` — work kit (clips 1, 4–12): mud-caked red-brown flannel, canvas trousers, slouch hat, mud-smeared cheek, rocker cradle + tents + miners + snowmelt river, cold green-grey grade. Alignment: PASS.
- `still_arrival_v1.png` — arrival outfit (clips 2–3): dove-grey wool travel dress, shawl, satchel, ridge over tent-dotted canyon. Alignment: PASS with note — distant tents rendered slightly conical/teepee-like; video prompts will specify "A-frame canvas wall tents" to prevent propagation.
- Both sent to owner in chat. Awaiting approval before any clip generation.


## Gritty/matte pass (owner direction, 2026-08-20)
Owner: "push harder on the grittier/matte-skin direction." Added an on-location condition block to every prompt (identity string untouched, verbatim): fully MATTE skin — no gloss/shine/dewy highlight/makeup look; lip tint worn to matte, wind-chapped; faint sunburn, dirt in pores and knuckle creases, grease at hairline, flyaway frizz, tired eyes, short dirty fingernails; plus "NOT influencer glam — a real tired working woman on a real frontier" appended to the naturalism block. Regenerated both stills:
- `still_workkit_v3_gritty.png` — landed matte/weathered, A-frame tents correct; framing drifted to third-person full-body (better costume read for approval; V-mode selfie grammar unaffected for video).
- `still_arrival_v2_gritty.png` — selfie framing, matte skin, heavy natural freckling. Distant tents again conical (the still prompt lacked the A-frame clause; every VIDEO prompt carries it).
Both sent. The same grit block is now standard in all 12 clip prompts.

## Clip production prep (done while awaiting gate 1)
- Video pipeline contract confirmed (`pai_video_client.js`): POST submit with `content[]` text + `asset://` refs (uploaded via CreateAsset from repo raw URLs), `ratio: "9:16"` (owner default), per-beat `duration`, 720p, `generate_audio: true`, poll task status to terminal, stream MP4.
- All 12 clip prompts drafted in `pai-pro/projects/goldrush49/prompts/clips.mjs` — shared byte-identical blocks (identity verbatim / camera single-take / naturalism+grit / per-clip grade variant day-night-dusk / locked NPC descriptions for Amos + Li / A-frame tent clause). Durations per approved script: 7,9,11,8,12,10,13,12,12,14,13,11 = 132s.
- §10 pre-generation self-check run over all 12: causality order (alarm rung AFTER she sees the jump in her stated sightline; "Wait— WAIT—" fired as she breaks through, before the verdict line), crowd population ≥20 for mob/court beats, embedded-not-sequential drama ("from the first frame..." on every interruption), speech gated by state (chewing muffled in 3, whispers in 6/8, gasping fragments in 11, breathless in 1/10, silence in 7), relationships carried (Li anchors her in 11; pouch meaning chains 7→11→12; clip 10 restages clip 1's exact posture as the payoff).
- Runner ready: `gen_clip.mjs` (asset-id cache, submit/poll/download per clip).

## Status
- [x] Branch + project scaffold + engine verified
- [x] Master refs recovered (owner-supplied v5 set, repo-hosted)
- [x] Gate 1 stills generated + sent — **awaiting owner approval**
- [ ] Clips 1–12 (9:16 default, PAI Pro video pipeline only)
- [ ] QC/assembly pipeline rebuild (`qc_pass.mjs`, `build_final_cut.mjs` from §11 specs)
- [ ] Final cut delivery
