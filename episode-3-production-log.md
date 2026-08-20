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
