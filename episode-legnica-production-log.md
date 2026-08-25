# Production log — "I Watched Henry II Die at Legnica" (Legnica 1241)

## 2026-08-25 — Setup + first costume still
- Read `NEW_CHAT_HANDOFF.md`, `CHARACTER_LOCK.md`, `creative-direction.md` §7–20, `chloe-craft-study-2026-08-20.md` §4.1, `research-methodology.md` before any creative work, per standing process.
- Historical research done via WebSearch (not yet in this environment's prior corpus for this topic): date, commanders, tactics, and the disputed-vs-certain split on Henry II's death and troop numbers — written up in `episode-legnica-script.md` §1.
- Full clip-by-clip script drafted: `episode-legnica-script.md`. Flags one deliberate format exception (§0 of that file): this piece uses third-person cinematic coverage (Nova-style), not V-mode talk-to-lens only, because the owner's brief explicitly asked for a "big-budget historical war movie" — noted per §18 rather than silently applied.
- PAI Pro project provisioned: `pai-pro/projects/legnica/` (`.active_project` set to `legnica`). Tooling seeded from Troy's `gen_image.mjs` (same canonical CHARACTER_LOCK reference set — refs are episode-agnostic, no changes needed) into both `pai-pro-tooling/legnica/` (repo, durable) and `pai-pro/projects/legnica/` (runtime).
- **First generation: HAZEL costume/reference still for the 1241 battlefield "field observer" look** (dark wool hooded cloak, plain underdress, satchel, boots, no armor/weapon — per script §2). `image-edit-pro`, 5 canonical refs, 1024×1024. Succeeded on the first attempt.
  - File: `pai-pro/projects/legnica/assets/hazel_legnica_costume_v1.png` (1.79MB) — **not committed to git, per standing rule; ephemeral, lives only in this container until re-generated or downloaded by the owner.**
  - Self-QC against `CHARACTER_LOCK.md`'s v4 checklist: identity match (face shape, eyes, brows, lips, hair) reads correct. Two soft concerns, not called as fails — owner's call: (1) skin/hair read a touch more "styled/glam" than the matte-gritty documentary bar in §13/CHARACTER_LOCK usage rule 5 calls for — less visible pore/freckle texture and shinier hair than the matte clause intends; (2) the boots read more like a modern lace-up boot silhouette than 13th-century footwear. Background crowd, banners, and mud staging landed well.
  - **Sent to the owner in chat for approval — no video generation starts until this (or a revised version) is approved**, per the standard stills-first gate.

## Next steps (blocked on owner approval)
1. Owner approves the costume still as-is, or asks for a v2 (grittier skin/hair, more period-accurate boots).
2. On approval: generate clips 1–10 from `episode-legnica-script.md` §3, in order, sending each to the owner immediately per creative-direction.md §20 — never batched, never entering the edit unapproved.
3. No clip regeneration without an explicit owner go-ahead per §19, including clip 9 (Henry's death) if it needs more than one attempt.
4. Gemini eyes QC runs only at the edit stage, once the full clip set is approved and stitched, per the owner's QC rule in `CLAUDE.md`.

## 2026-08-25 (cont.) — Costume v3: common-woman redesign
- Owner flagged v1/v2's dark hooded cloak read as "the same dress as the European army" — visually blending with soldiers' own cloaks in the background.
- Generated v3: replaced the cloak entirely with a period-plausible common woman's kirtle (fitted laced bodice, muted madder-red, ankle-length flared skirt) + undyed linen apron + loosely-tied kerchief (hair fully visible, per CHARACTER_LOCK) + small linen drawstring pouch instead of a satchel strap + soft leather shoes. Silhouette now reads immediately as a civilian woman, distinct from the soldiers' mail/gambeson/cloak in the same frame.
- File: `pai-pro/projects/legnica/assets/hazel_legnica_costume_v3.png` (not committed to git, ephemeral per standing rule). Sent to owner for approval.
- This is now the locked costume reference pending approval — all future clip prompts will describe this exact outfit (kirtle color/cut, apron, kerchief, pouch, shoes), not the earlier cloak version.

## 2026-08-26 — Clip 1 generated ("Horde Appears")
- Costume v3 approved by owner. Set up video tooling: `pai-pro-tooling/legnica/{clips.json,run_clip.mjs}` (adapted from Troy's pattern) + uploaded the approved costume still to Higgsfield storage for a public URL (media_upload → PUT → media_confirm) so it can be used as a PAI video reference alongside the 5 canonical CHARACTER_LOCK refs.
- Caught and fixed a real prompt bug before generating: clips.json scene text originally said "holding the camera on herself," directly contradicting the "no device ever visible" instruction — per creative-direction.md §16's documented lesson (describing a mounting method makes the model render the device). Reworded to camera-agnostic staging language ("facing the lens") before submitting.
- Generated clip 1 via PAI `video-generation` (7s, 9:16, 720p, audio on, selfie-cam). Task succeeded (taskId `10c29377-...`, ~153s wall time). Duration verified via ffprobe: 7.06s.
- Self-QC (frame extraction at 1.5fps, not exhaustive — Gemini eyes stays edit-stage-only per the owner's QC rule): identity matches CHARACTER_LOCK v4 + costume v3; no camera/phone/rig ever visible in frame; background soldiers/banners/mud/dust match art direction; the turn toward the horizon and the Mongol cavalry reveal read as intended. One minor, non-blocking note: her eye makeup reads slightly more polished/winged than the "common woman, worst day of her life" bar calls for — flagged, not treated as a fail.
- File: `pai-pro/projects/legnica/assets/clip1_v1.mp4` (4.96MB, not committed to git, ephemeral). **Sent to owner immediately for approval, per §20 — not gated behind the QC note above.**
- ffmpeg/ffprobe were missing from this container (apt dependency gap — `libcaca0`/`libva2` 404s on first attempt); fixed by re-running `apt-get update` then installing the missing shared libs directly. Needed for any future frame-extraction QC or the eventual edit-stage assembly.
