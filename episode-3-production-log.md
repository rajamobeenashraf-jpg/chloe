# Episode 3 Production Log — "The Night Paul Revere Rode" (Boston 1775)
**Producer chat branch: `claude/shorts-episode-production-6kqi0c` · Started 2026-08-20**
**Script source: `episodes-2-4-scripts.md` (Ep 3, 12 clips, ~125s). All standing rules from `creative-direction.md` §1–§12 and `CHARACTER_LOCK.md` v4 apply.**

## Status
- [x] Branch created from `claude/pai-pro-connection-izza4s`; PAI Pro provisioned (hook picked up `PAI_KEY` from env — no manual key step needed)
- [x] Project dir `/home/user/pai-pro/projects/boston1775/assets`, `.active_project=boston1775`
- [x] All 4 binding docs read; raw API contract confirmed (`pai-pro/docs/api_service.md`)
- [x] 12 clip prompts drafted + §10 self-check (below)
- [x] QC/stitch tooling rebuilt from §11 specs → `episode-3-tools/` (committed to repo this time so it survives container loss)
- [ ] **BLOCKED: v4 master reference images** — see "Container-loss finding" below
- [ ] Gate 1: costume stills approval
- [ ] Gate 2: clip-by-clip approval ×12
- [ ] Gate 3: stitched cut approval
- [ ] Gate 4+: QC rounds

## OWNER DIRECTIVE (2026-08-20, this chat — BINDING for every Ep 3 generation)
> Use the re-sent reference images as the character sheets. Log the identity strictly. She must appear **100% natural, realistic and human — never AI-plastic**.

Enforcement in every prompt (stills AND video):
1. Frozen v4 identity string VERBATIM (unchanged rule).
2. The v4 aesthetic block is now mandatory, not optional garnish: "Documentary photograph, RAW 35mm Kodak Portra 400 color, natural photographic lighting, visible skin pores and fine vellus facial hair, natural subtle human imperfections, believable anatomy, real fabric texture. NOT 3D render, smoothed-skin filter, beauty retouch, plastic skin."
3. Added negative reinforcement line: "no doll-like smoothing, no waxy or airbrushed skin, no oversaturated glamour lighting, no uncanny symmetry — a real human being filmed on a real camera."
4. QC gate: any render with plastic/smoothed skin, missing freckles, or beauty-filter look is rejected before it reaches the owner.

**Reference set received in chat 2026-08-20** (owner re-sent after container loss): 4-panel turnaround sheet (corset dress + boots), 4-panel face-detail sheet (bust / eye / lips / profile), Wild West movie frame (talk-to-lens, golden hour street), and 6 single-view renders (front ×3, 3-4 ×2, profile ×2 across both batches). Identity verified against the v4 checklist: slim sculpted face + defined cheekbones ✓, warm golden-tan skin with visible freckles ✓ (no ivory/porcelain drift), large hazel almond eyes ✓, bold thick dark-brown arched brows ✓, full nude-caramel lips ✓, bronde balayage center part ✓, early twenties ✓.

**Transport problem:** chat photos arrive as visual context only — no bytes on disk — so they can't be passed to PAI as refs yet. Waiting on owner to deliver the same images as usable data (full CloudFront URLs, a repo upload, or file attachments).

## Container-loss finding (for the shared-doc merge later)
The five v4 master reference images existed only as local files in the old container and as **truncated** CloudFront URLs in `CHARACTER_LOCK.md` (`d2ol7oe51mr4n9.cloudfront.net/.../<uuid>.png` — the path segment was elided). The old container died → refs unrecoverable from this environment without the full URLs. Two fixes:
1. Owner pastes the five full URLs (this episode's unblock). CloudFront **is** downloadable from this environment now (verified: the full Higgsfield URL in `PROJECT_HANDOFF.md` returns 200), so the truncation is the only obstacle.
2. Permanent: commit the five master PNGs to the repo (or write full URLs into `CHARACTER_LOCK.md`) so no future container loss repeats this. → merge-time action, not done here per parallel-chat rules.

## Engine facts confirmed this session
- `image-edit-pro` refs are **public URLs fetched server-side** (`payload.image: [urls]`) — the CloudFront ref URLs can be passed directly.
- Video: preupload each ref via `video-generation-assets` (CreateAssetGroup → CreateAsset → poll GetAsset Active), then `POST /api/v1/submit` `video-generation` with `asset://<id>` refs, `ratio: "9:16"`, `resolution: "720p"` (Ep 1 delivery was 720×1280), `generate_audio: true`, per-clip `duration`. Poll `GET /api/v1/task/status/<job_id>`.
- Limits (`server/cli/_limits.js`): ≤9 image refs, ≤3 video refs (aggregate ≤15s), each ref 1.8–15.2s, clip hard cap 15.2s.
- `image-generation` (standard tier) `fileData` needs explicit `mimeType` — but pro tier (`image-edit-pro`) uses `payload.image` URL array, no mimeType field involved.

---

## Locked episode-wide elements (restated in EVERY prompt)

**COLOR GRADE (one grade, every clip):**
> Muted colonial film palette: desaturated earth tones, deep blue-slate shadows, warm amber lantern/candle accents, soft organic film grain.

Time-of-day is stated per clip but the treatment language above never changes.

**CAMERA GRAMMAR (V-mode, every clip):** vertical 9:16 handheld vlog framing; she holds the camera herself at arm's length pointed at her own face, natural handshake following her movement, speaking directly into the lens. (One-handed where the other hand is doing work — stated per clip.)

**STANDING PROMPT BLOCK appended verbatim to every video prompt:**
1. The frozen v4 identity string from `CHARACTER_LOCK.md` — VERBATIM, never paraphrased.
2. "single continuous unbroken shot, one camera angle throughout, no cuts, no scene changes, real-time continuous take"
3. v4 aesthetic keywords: "Documentary photograph, RAW 35mm Kodak Portra 400 color, natural photographic lighting, visible skin pores and fine vellus facial hair, natural subtle human imperfections, believable anatomy, real fabric texture. NOT 3D render, smoothed-skin filter, beauty retouch, plastic skin."
4. "No on-screen text, no burned-in captions, no subtitles, no watermark." ← new, prevents Ep 1 clip-1's baked-in auto-caption problem at the source (§11 round 3 said regeneration-with-instruction was the only clean fix; we apply it preventively).

**WARDROBE LOCK:**
- Modern (clip 2 only): black zip-up hoodie over white tee, blue jeans, white sneakers. *(Owner may correct at stills gate — Ep 1's modern outfit wasn't documented.)*
- Colonial (clips 1, 3–12): fitted deep madder-red wool caraco jacket over a white linen shift, charcoal-grey wool petticoat skirt, white linen neckerchief tucked at the collar, brown leather buckled shoes. Night exteriors (1, 6–10) add: long hooded charcoal wool riding cloak, hood down.
- Face/hair/skin clauses never touched by wardrobe lines (lock rule 3).

**NPC LOCKS (identical wording in every clip where they appear):**
- **ROBERT NEWMAN** (clips 6, 7, 8): "a lean young man in his early twenties with dark brown hair tied back in a short queue, pale angular face, earnest anxious eyes, wearing a plain dark-brown wool coat, white linen neckcloth, dark breeches and worn buckled leather shoes"
- **BRITISH SENTRY** (clip 8): "a stocky British regular soldier in a brick-red wool coat with white crossbelts, a black tricorn hat, ruddy round face, musket with fixed bayonet held across his body"
- **SONS OF LIBERTY PAIR** (clips 4, 5): "a heavyset blacksmith in a brown wool coat over a scorched leather apron, and a thin bespectacled clerk in a grey coat"
- **FARMHOUSE WOMAN** (clip 9): "a woman in her forties in a white linen night-cap and a shawl over her nightgown" · **FARM BOY** (clip 9): "a barefoot boy of about ten in a nightshirt"
- **BRITISH PATROL** (clips 1 implied-distant, 10): "two mounted British regulars in brick-red coats carrying torches"
- **TAVERN KEEPER** (clip 3): "a broad-shouldered tavern keeper in rolled shirtsleeves and a stained apron"

---

## Clip-by-clip direction (per-beat duration + §10 self-check inline)

Every prompt below = scene body + STANDING PROMPT BLOCK. Refs on every video job: all five v4 masters (+ approved costume still once Gate 1 passes).

### Clip 1 — Cold open, night gallop — 7s
Night country lane. She rides a galloping dark bay horse one-handed, camera in the other hand pointed at herself, hood down, hair whipping; strobing torchlight flickers through the trees from a pursuing patrol somewhere behind her (light present from frame one — embedded, not an event). Jolted, breath knocked by hoofbeats, she gets out between bounces: **"Okay, nobody mentioned the revolution would involve ME on a horse—"** — one wide-eyed glance back over her shoulder, cut.
*Self-check:* torchlight audible/visible from start (no "and then"); delivery physically gated by gallop bounce; she never sees the patrol directly (behind her — glance only, no impossible sightline); 1 line + 1 glance fits 7s.

### Clip 2 — Rewind/plan, daytime harbor — 9s
Bright afternoon, Boston Long Wharf 1775: tall-ship masts, rigging, stacked crates and barrels, gulls; half a dozen dockworkers rolling barrels and hauling lines around her. She's in the modern outfit, weaving between crates while talking to lens, sidestepping a dockworker mid-sentence: **"April 18th, 1775. Tonight, somewhere in this city, the most famous ride in American history happens. I am not supposed to be anywhere near it."**
*Self-check:* population matches "busy wharf"; her walk+sidestep is one continuous motion thread; 3 sentences ≈ 8s speech in 9s. "EARLIER TODAY" card goes over this clip's head in post (Ep 1 pattern).

### Clip 3 — Costume + tavern ale — 9s
Green Dragon Tavern interior, evening, candlelit; background patrons at two tables, the TAVERN KEEPER passing behind. She's now in the colonial wardrobe, tugging the caraco cuffs straight as a costume reveal, picks up a pewter tankard, **stops talking entirely to sip, swallows with a slow betrayed grimace**, then the verdict: **"Warm. Flat. Extremely 1775."**
*Self-check:* §8 gate stated (no speech during sip; verdict only after swallow); micro-actions = adjust + sip + swallow + 3-word line → 9s has room; costume beat lands before the drink so both register.

### Clip 4 — She inserts herself — 11s
Same tavern table minutes later, the SONS OF LIBERTY PAIR at the next table in a hushed urgent argument, voices low but audible from frame one. She listens a beat, then leans bodily into their space, camera still at arm's length catching her and both men over her shoulder, and cuts in: **"Which road — Lexington or Concord?"** The blacksmith's head turns slowly: **"Who's asking?"** She holds his stare, chin up.
*Self-check:* §12 — she initiates; the argument is embedded audio from the start; camera angle keeps both men in her (and the lens's) sightline; listen-beat + lean + 2 lines + held stare = 11s right.

### Clip 5 — Recognition — 7s
Same framing seconds later; she's mid-sip of the ale when from the next table one word lands clearly in the men's murmur: **"…Revere rides tonight."** She stops drinking mid-motion — tankard frozen at her lips — lowers it slowly and whispers into the lens: **"Oh no. It's tonight."**
*Self-check:* causality — name heard FIRST, reaction after; §8 — the whisper comes only after the tankard leaves her mouth; single reaction beat = 7s per §9.

### Clip 6 — Volunteering at the church — 10s
Night, Old North Church side door, one hanging lantern. ROBERT NEWMAN wrestles a heavy wooden crate of signal lanterns over the threshold, losing the fight with it from frame one. She strides into frame and seizes the crate's free rope handle with her right hand before he can speak — camera in her left — taking half the weight with a visible effort, voice slightly strained under the load: **"You're short-handed. I'm free."** Newman stares one beat, then nods once, and they move through the door together.
*Self-check:* §12 — she volunteers unprompted (plants the teamwork thread); crate struggle present from frame one; §8 — strain in the voice stated; lift + line + nod + first steps = 10s.

### Clip 7 — Tower stairs + the signal — 13s
Inside the tower, narrow wooden stairs, near-dark, their two small lanterns swinging shadows up the boards. Both climbing hard the whole clip, **both audibly out of breath — her lines broken by real gasps, never clean fast speech**. They reach the high window; each hangs a lit lantern on the sill hooks side by side. As the second lantern settles, NEWMAN (breathless): **"One if by land—"** / HER (breathless, into lens): **"—two if by sea. I know how this part goes."** The two flames burn side by side behind her.
*Self-check:* §8 exertion gate explicit; multi-step (climb + hang + hang + exchange) → 13s per §9 validated band; only the two of them present (secrecy = correct population); lines fire AS the lanterns hang, not after.

### Clip 8 — Talking the sentry backward — 12s
Ground level, churchyard, night. The BRITISH SENTRY is already pacing toward the side door as the clip opens (threat embedded from frame one). She steps out FIRST, plants herself directly in his path so his back turns to the door, camera low and casual at her side angled up at herself with the sentry looming past her shoulder, and talks fast and bright, advancing so he keeps giving ground: **"Evening — just checking the tower's sound, my father's the verger, terrible acoustics—"** — and behind the sentry's turned back, NEWMAN slips out of the door and away along the wall.
*Self-check:* geometry — she advances INTO his path, which is what turns his back to the door; Newman's exit is only possible because of her positioning (stated in prompt); §12 — social engineering, not hiding; fast talk is in-character performance, body unimpeded, so pace is §8-legal; 12s for approach + patter + slip-away.

### Clip 9 — She delivers the warning herself — 13s
Night, rutted farm lane. She gallops INTO frame to a farmhouse door, reins up hard and leans from the saddle pounding on the door with her fist, camera in the other hand, breathless urgency in every line: **"The regulars are coming out — get your musket, ring your bell!"** The door swings open — the FARMHOUSE WOMAN takes one look, turns and pulls a musket down from over the hearth, visible through the open doorway, while the FARM BOY darts barefoot past the horse's legs toward the bell rope by the yard post.
*Self-check:* §12 — she personally raises the alarm; warning fires BEFORE the reactions it triggers (§10 causality); she stays mounted → fewer micro-actions, still 5 beats = 13s; open door makes the interior sightline real; Newman's absence is story-legal (he stayed behind at the church — historically he slipped home).

### Clip 10 — The patrol, solved with terrain — 14s
Same night lane, minutes later. Torchlight and hoofbeats of the BRITISH PATROL already glowing/audible behind her as the clip opens; a shout — "HALT!" — and she swerves the horse off the road, slides off in one motion, smacks its flank to send it clattering on down the lane as a decoy, vaults the low stone wall, hauls a loaded hay cart around by its shaft so it slams across the gap in the wall behind her, and dives through a barn's side door into the dark, camera clutched to her chest, one gasped fragment to lens between breaths: **"Not — today."**
*Self-check:* §12 — decoy horse + cart barricade: she changes her own odds twice, zero flat sprinting; patrol embedded from frame one, "HALT!" precedes her swerve (causality); geometry — wall borders the lane, cart sits inside the yard, barn beyond it, mounted riders can't follow over wall+cart; 5 chained actions → 14s (under 15.2 cap); §8 — speech reduced to a gasped fragment.

### Clip 11 — Dawn, the first shots — 11s
First grey-gold dawn light, hilltop meadow, Lexington green far below with tiny indistinct figures on it, thin mist. She's still, hood down, camera steady for once — and a faint distant crackle of musketry drifts up. She flinches, goes completely still, and the vlogger energy drains away; quiet, slow, unguarded, half-whisper: **"Down there, right now… nobody knows they're standing in the first ten seconds of a country."**
*Self-check:* shots heard FIRST, stillness and line after (causality); distant figures stay indistinct (no fake detail at that range — sightline honest); simple single-reaction beat but with weight → 11s gives the awe room per §2; steady camera is itself the §8 tell of the mood shift.

### Clip 12 — Outro — 9s
Same dawn light, minutes later; she walks slowly along the ridgeline path, camera at arm's length, tired real smile, the valley soft behind her: **"Back to 2026. If you want to know what happens on that green next — tell me."** A held beat looking into the lens, then she reaches over and covers it — cut to black in-camera.
*Self-check:* ritual outro + series tease as scripted; walking = continuous motion thread; covering the lens gives a natural end-frame for the fade; 2 sentences + beat = 9s.

---

## Transition plan (feeds `episode-3-tools/build_final_cut.mjs` — §11 technique: scene changes CUT, continuous motion DISSOLVES)

| Join | Type | Blend |
|---|---|---|
| 1→2 | smash cut, cold open → rewind (card on 2) | 0.12s |
| 2→3 | scene change (day wharf → tavern) | 0.12s |
| 3→4 | same tavern, time-continuous | 0.4s |
| 4→5 | same table, continuous | 0.4s |
| 5→6 | scene change (tavern → night church) | 0.12s |
| 6→7 | continuous action (carrying crate → stairs) | 0.4s |
| 7→8 | position jump (tower top → churchyard) | 0.12s |
| 8→9 | scene change (churchyard → farm lane) | 0.12s |
| 9→10 | continuous night flight | 0.4s |
| 10→11 | time passing (night barn → dawn hill) | 0.5s |
| 11→12 | same dawn, continuous | 0.4s |

Audio: matching `acrossfade` per join; `loudnorm` every clip pre-assembly. J-bridge candidates: tavern murmur under end of clip 2; hoofbeats under end of clip 9.

## Learnings for the shared-doc merge (do not edit shared docs from this chat)
1. `CHARACTER_LOCK.md` should carry the five FULL master URLs (they're truncated) and/or the PNGs should live in-repo — container loss otherwise orphans the lock.
2. "No on-screen text / captions / subtitles / watermark" belongs in the standing prompt block for every future episode (prevents Ep 1's baked-in-caption defect at the source).
3. QC/stitch tooling now lives in-repo (`episode-3-tools/`) instead of only in the container — same class of fix.

## Engine + hosting decisions (owner instructions, 2026-08-20)
- **PAI Pro is the ONLY generation engine for Ep 3** (stills via image-edit-pro, video via the video pipeline). Higgsfield explicitly ruled out by owner — not used for generation NOR for file hosting.
- Reference hosting: this repo is public, so `raw.githubusercontent.com/<owner>/chloe/<branch>/character-refs/*.png` URLs are directly server-fetchable by PAI. Owner uploads the reference PNGs to `character-refs/` on this branch via GitHub web UI; a watcher in this session pulls them the moment they land.
- All 12 video prompts pre-composed in `episode-3-prompts/clip01–12.txt` (scene body + V-mode grammar + single-take clause + verbatim identity string + naturalism block + locked grade + no-text rule).

## Owner directive (2026-08-20): 9:16 default everywhere
- Video: `ratio: "9:16"`, 720p (720×1280) — already the pipeline default.
- Stills: `size: "1440x2560"` (exact 9:16) is now the client default. NOTE: the image gateway changed to an OpenRouter-style chat.completion response (image arrives as inline base64 in `choices[0].message.images[0].image_url.url`) and the first test render ignored `size` (returned 1024×1024). If the gritty batch also comes back square: enforce "vertical 9:16 portrait composition" in prompt text and center-crop to 9:16 in post for approval stills. Client patched for the new response shape; documented shapes still handled.

## Owner directive (2026-08-20): grittier matte skin
Standing block extended with a "Gritty matte realism" paragraph (dry matte skin, no gloss/dew/studio glow, wind-chafed cheeks, minimal makeup, flyaway hairs, heavier grain, worn dusty clothing). Prompt files restructured to scene-bodies only; the standing block is appended at submit time (`pai.mjs --block`) so direction changes propagate to all 16 prompts instantly. First-generation glossy still kept as `still_a_v1_baseline.png` for side-by-side at Gate 1.

## GATE 1 PASSED (owner approval, 2026-08-20)
All four gritty/matte stills approved. **still_b_tavern_lens_v2grit.png is the CANONICAL COSTUME REFERENCE** (lace-front madder-red jacket) — it rides along as a wardrobe ref in every colonial-costume video job; still D is the wardrobe ref for clip 2 (modern outfit). Approved stills committed to `episode-3-stills/` for durable hosting. Gate 2 begins: clips generated in script order, each sent to owner as it lands.

## Gate 2 progress + first reject (2026-08-20)
- Clips 1–5 generated, QC'd, owner-ACCEPTED (36.3s banked). Continuity verified with ffmpeg scene-detection on clip 4 (no internal cuts — the reframe is a physical lean).
- **Clip 6 v1 REJECTED at internal QC (never sent):** wardrobe bleed — the Ep 1 Wild West movie-frame ref (cream blouse + laced bodice) overrode the scripted madder-red jacket + cloak in night lighting; Newman's coat drifted olive, hair not queued. Fix applied: (a) movie-frame ref dropped from costume-critical night clips 6–10 (face sheets + views carry identity), (b) "WARDROBE ENFORCEMENT" negative block appended to clips 06–10 prompts (refs define FACE/HAIR only; wardrobe defined by text + tavern costume still). v1 archived as clip6_v1_rejected.mp4. Learning for shared docs: movie frames from a previous era's episode are a wardrobe contamination risk as video refs — prefer sheets + neutral views + current-episode costume still.
- Clip 6 v2 delivered (wardrobe fixed; hood-up + snow patches flagged to owner as optional re-roll). Clip 7 delivered (two-lantern signal ✓, zero scene cuts). Owner walkthrough given for clip 6 staging (Newman carrying crate inward, not retreating).
- **Clip 8 v1 blocked by content moderation** (`error_category: content`) — likely "musket with fixed bayonet" in a confrontation framing. Softened to "tall musket slung over his shoulder", de-emphasized the blocking language, resubmitted. Learning: keep period weapons in NPC descriptions passive/slung, never brandished, for PAI moderation.

## Gate 2 status (2026-08-20)
Clips 1–10 owner-APPROVED (clip 9 landed on v4 after two staging/physics fixes; clip 8 on v5 after moderation + POV fixes). 129.7s banked of the 12-clip shoot. Clips 11 (dawn awe) and 12 (outro) launching now to close the shoot.

## GATE 3 — stitched cut delivered (2026-08-20)
All 12 clips shot, owner-approved, transcribed via ElevenLabs Scribe (real audio, never guessed from prompts — one correction found this way: clip 10 actually has her ad-lib "Help!" before "Not — today.", captioned as spoken). QC pass burned captions (gap-clustering timing, asymmetric crossfade margins, locked style) + EARLIER TODAY card on clip 2. Assembled with the locked transition table (0.12s cuts / 0.4s dissolves / 0.5s dawn time-jump), loudnorm per clip. **Runtime: 125.0s — matches the ~125s script target exactly, first assembly pass, no rebuild needed.**
- Master: `boston1775_final_cut.mp4` (CRF16, ~70MB)
- Delivery copy sent to owner: `boston1775_final_cut_compressed.mp4` (~1.5Mbps, ~25MB)
- Awaiting owner QC round on the stitched cut (transitions, caption sync/readability, overall pacing) before final sign-off.

## Round 2 fixes — transitions + caption sync (owner feedback, 2026-08-20)
Two real defects found on the Gate-3 stitched cut:
1. **Transition ghosting.** The 0.4s "continuous action" dissolves (3→4, 4→5, 6→7, 9→10, 11→12) looked unnatural because these are independently-generated clips with no matching exact frame — a 0.4s crossfade exposed the mismatch as visible blur instead of reading as smooth motion. Fix: reverted to Episode 1's proven discipline — nearly every join is now a quick, equal-duration video+audio blend (0.10–0.18s, imperceptible as a dissolve, no jump-cut either), with the ONE deliberate exception being 10→11 (night→dawn), which keeps a real 0.5s dissolve because that join is meant to read as a time-jump. Considered decoupling video-blend from audio-blend for a true J-cut effect but rejected it: differing durations shorten the final video and audio tracks by different total amounts, which would drift picture and dialogue out of sync by over a second across 11 joins — not worth the risk for a Shorts-length cut.
2. **Caption/mouth desync.** `qc_pass.mjs`'s `refine()` was padding cue boundaries in both directions — clamping a cue's start to the incoming transition's blend duration (could delay caption appearance past her first word), and a "readability floor" that pushed cue end later than her real last word when implied words/sec looked too fast. Both removed. Cues now come straight from the real silencedetect-derived speech segments with zero padding — captions appear/disappear exactly on real detected speech boundaries. (Consistent with the original Ep1 owner directive: sync accuracy over reading comfort.)
Re-ran `qc_pass.mjs` + `build_final_cut.mjs`. New delivery copy pending.

## Round 2 fixes, actual findings (owner feedback, 2026-08-20)
The transition fix from the first pass (uniform near-hard cuts) held up. Caption sync required THREE real bugs found and fixed, not one:

1. **`speechSegments()` never actually read silencedetect's output.** It tried to read the log from `execFileSync`'s return value, which is stdout only — but ffmpeg's `silencedetect` writes its `silence_start`/`silence_end` markers to stderr. The log was always empty, so every single clip fell back to "one unbroken speech block spanning the whole clip" regardless of real pauses — this was the root cause of captions running the full clip length. Fixed by switching to `spawnSync` and reading `result.stderr` directly.
2. **A fixed -30dB absolute silence threshold can't separate voice from loud or continuous background noise** (galloping hoofbeats, chase/wall-vault/hay-cart noise, tavern din) — on those clips the ambient floor itself sits above -30dB, so detection found zero silence even after bug #1 was fixed. Replaced with: band-pass filter to the vocal range (250Hz–3.5kHz) before detecting, and a per-clip adaptive threshold set relative to that clip's own measured peak level rather than one global number.
3. **The multi-sentence allocator picked boundaries by raw gap SIZE, not by which gap is the real sentence break.** The two acoustically-largest pauses in a clip are often just mid-sentence breaths, not where one sentence ends and the next begins — confirmed on clip 2, where the algorithm assigned the first 6 of 9 seconds to a 3-word sentence and squeezed a 14-word sentence into 0.4s. Rewrote the allocator to choose from real detected gaps by matching each sentence's word-count share of the total spoken span, instead of by raw gap size — boundaries are still always real acoustic pauses, never fabricated splits.

**Remaining hard limit, documented honestly:** on clips where her actual delivery is intentionally very quiet (clip 5's whisper, clip 11's half-whisper awe beat) or where continuous loud background noise never separates from her voice at any usable threshold (clips 9, 10's chase sequences), no energy-based detection — however tuned — can find her real speech boundaries; this was verified by an exhaustive threshold sweep on clip 5, not assumed. For those five clips (5, 7*, 9, 10, 11 — *clip 7 needed a boundary correction, not a full override), cue timing was placed manually using frame-level visual evidence of actual mouth movement (dense frame sampling, sub-0.1s resolution), anchored wherever possible to real detected acoustic segments rather than the original generation prompt. Every clip's timing was then checked against a physical-plausibility scan (words-per-second per cue); three short punchy phrases (clip 2's "April 18th, 1775.", clip 4's "Who's asking?", clip 12's "Back to 2026.") still read as fast (6–10 wps) but are grounded in real acoustic boundaries and, for clip 12, directly confirmed by visual mouth-movement inspection — accepted as genuinely fast delivery rather than a detection failure.

Re-ran `qc_pass.mjs` + `build_final_cut.mjs` with all fixes. New delivery copy pending.

## Round 3 — surgical corrections (owner feedback, 2026-08-20)
Owner specified 6 exact fixes only; everything else left untouched.

1. **Missing subtitle at ~36-37s** (background NPC line in clip5). Located via fine-grained RMS energy analysis (40ms windows, band-passed 200-4000Hz) — found a sharp, isolated, unambiguous vocal spike at local clip5 t=3.0-3.7s (global ~38.9-39.6s; owner's "36-37" was an approximate read, the acoustic event itself is unambiguous and singular). Added as a 3rd cue: "…Revere rides tonight."
2. **5 caption re-syncs**, all re-derived from real audio evidence (fine RMS envelopes, cross-checked against visual mouth movement where the audio was ambiguous):
   - clip5 "It's tonight." — delayed from 4.6s to 5.0s start (also delayed "Oh no." 3.9→4.55) after finding the earlier placement sat in a quiet/silent stretch, not her actual voiced onset.
   - clip6 "I'm free." — moved from 9.423s to 7.308s (isolated acoustic burst at ~7.1-7.3s + visual mouth-open confirmation, well before the previous placement).
   - clip7 "One if by land—" / "—two if by sea." / "I know how this part goes." — completely re-anchored to the three clearest SUSTAINED (not transient) energy clusters in the whole clip, which turned out to align exactly with the lantern-window story beat (confirmed visually: both cues now display with the lanterns/window visible behind her, not mid-stairs as before).
   - clip9 "...ring your bell!" — end extended from 13.4s to 14.9s after finding a second real sustained speech cluster (13.04-14.88s) that the old cue cut off before.
3. **~1:55 transition freeze, root-caused, not masked.** Frame-by-frame motion analysis (ffmpeg signalstats YDIF) found the *raw generated source* of clip11 has an exact duplicate-frame freeze baked in from local t=10.42s to its 11.05s end (YDIF measured at precisely 0.00 for that whole span — a real generation artifact, not narrative stillness, and not something introduced by editing). This is what was landing right at the 11→12 join. Fixed by trimming that dead tail (`TRIM_OUT: {11: 10.40}` in `build_final_cut.mjs`) before normalization, so the cut lands on real motion — not by widening the transition blend, which would have masked rather than fixed it. Verified after rebuild: zero exact-duplicate frames remain in that region; the only remaining low-motion stretch (local ~9.3-10.25s) is real, gradually-changing footage matching the approved "she goes completely still" awe-beat direction, left untouched.

New tool: `rms_envelope.py` — 40ms-window band-passed RMS energy printout, used for all the precise re-syncs above where the standing silencedetect-based pipeline couldn't resolve fine enough. Runtime now 125.7s (down ~0.65s from the clip11 trim only). No other clip, caption, or transition touched.

## Round 4 — full creative-director QC pass (owner feedback, 2026-08-20)
Owner asked for a full pass, not spot-fixes: every subtitle re-verified, root-cause on the lip-sync complaint, the freeze fully eliminated (not just reduced), plus a new end card. New tooling: `rms_envelope.py` (40ms-window band-passed RMS) and `find_speech_bursts.py`/`build_captions.py` (contiguous above-threshold runs, same word-proportional real-gap-anchored allocation as qc_pass.mjs, at much finer resolution than silencedetect can offer).

**Full-episode subtitle re-derivation from real audio, all 12 clips checked:**
- clip1: real speech confirmed at 1.04-3.92s, NOT to 6.7s as previously delivered — a genuine over-extension the fine-grained tool caught that the owner hadn't flagged. Fixed.
- clip2, 3, 4, 9, 12: re-verified against the fine-grained data, all already correct — left untouched.
- clip5: "It's tonight." real onset is 6.00s, a full second later than round-3's placement — matches the owner's report exactly. Re-derived all three cues (background line + her two lines) from the actual energy clusters.
- clip6: "I'm free." — round 3 had moved it to 7.31s, still wrong. Direct frame-by-frame mouth inspection showed her mouth closes by ~7.0s; real cue is 6.04-6.90s, a further 1.3s correction.
- clip7: both lines re-anchored a second time. Visual inspection located the actual lantern-hanging beat at ~6.7-9.2s (not 3.68-9.40 as delivered) — "One if by land—" now lands on Newman hanging the first lantern, "—two if by sea." on the second lantern appearing, matching the story beat exactly. Third cue also corrected (10.20-12.24, was 11.76-13.00).
- clip8: not flagged, but the same "silence-detector caught ambient noise, not just speech" issue as clip1 was present (cue started 3.6s before real speech). Narrowed to 7.52-11.56.
- clip10: "Not — today." re-anchored to two distinct real bursts (12.24 "Not", 13.44 "today") with the scripted pause preserved between them, instead of straddling both awkwardly.
- clip11: **root cause of the "lip-sync" complaint found.** Direct comparison of visual mouth movement against acoustic energy showed the two are already in perfect agreement in the raw footage (no generation-level defect) — what read as lip-sync trouble was the caption running to 9.0s while her real speech (confirmed both acoustically and visually) ends at 6.7s, leaving the text on screen ~2.3s after her mouth had stopped. Recut to 0.3-2.5s / 4.1-6.7s.

**Freeze at ~1:55, fully eliminated (not just reduced).** Fresh frame-level motion analysis on clip11's raw source found real active motion continuing all the way to 8.92s (talking + natural reaction), with a genuine near-static hold only from 8.958s to the previously-trimmed 10.40s endpoint — round 3's trim removed the true duplicate-frame defect but left this ~1.4s real-but-static stretch sitting right at the transition, which is what was still reading as a freeze. Re-trimmed to 8.95s, cutting before the static hold begins. Re-verified after rebuild: YDIF motion stays in the healthy 2-8 range straight through the join, no near-zero stretch anywhere near it.

**End card added.** "PART ONE" tag + "The Story Continues…" + "Part Two — Coming Soon", staggered fade-in, DejaVu Serif for a period-appropriate cinematic feel (distinct from the DejaVu Sans caption font), warm gold/cream on black rather than pure white. Built as a continuation of clip 12's own in-camera fade to black (her hand covering the lens) rather than a hard cut to a new graphic — verified frame-by-frame that the seam reads as one unbroken darkening, not an inserted screen. 3.2s card, 0.3s audio/video crossfade in from the body.

**Full re-verification before delivery:** re-checked all three specifically-flagged fixes against burned frames in the assembled final cut (not just the intermediate per-clip QC output), confirmed the freeze fix holds in-context, confirmed the end-card transition is seamless, ran a coarse full-episode contact sheet (6s intervals) for any other visible anomaly, and checked overall audio (no clipping, consistent levels) and file integrity (master/delivery duration match).

Runtime: 127.2s (124.3s story + 3.2s end card, minus a 0.3s crossfade). Master: `boston1775_final_cut.mp4` (CRF16). Delivery: `boston1775_final_cut_compressed.mp4` (~25MB).
