# CONTENT SHEET — how to make Hazel's lifestyle pictures & videos

**Owner's invocation: "Use the content sheet to make [X]."** That's all you need to say. Examples:
- "Use the content sheet to make a 10-second video of her dancing at a party."
- "Use the content sheet — beach photos, full glam makeup."
- "Use the content sheet: she's baking in a modern kitchen, no makeup, three photos."

This file covers **everything that is NOT an episode**: Instagram photos and videos, dance/party/beach/travel content, promos, thumbnails, makeup content, posing shots.

> **HARD GUARD — never use this file for episodes.** Episode clips, episode stills, and anything belonging to a numbered episode are produced ONLY per `CHARACTER_LOCK.md` + `creative-direction.md` (canonical reference set + frozen identity string), never via this pipeline. If a request names an episode AND says "use the content sheet", that wording is a mistake — do NOT comply; produce nothing and ask the owner which pipeline they meant.

**Rule zero: the detailed law lives in `CHARACTER_LOCK.md` → section "LIFESTYLE PIPELINE — Scene Transplant".** If anything here ever seems to conflict with that file, CHARACTER_LOCK.md wins. Read it before producing.

---

## The method in one line
**Never regenerate her face. Take a real movie frame and change the world around her.** Reference-based generation has a proven ~90–95% identity ceiling ("she looks different in pictures"); scene-transplant preserves her actual as-filmed pixels.

## Steps (proven end-to-end on PAI Pro, 2026-08-23)

1. **Pick a real movie frame.** Sources: the 10 Tier-2 CDN frames listed in CHARACTER_LOCK.md, or extract fresh frames from any finished episode video (`ffmpeg -i clip.mp4 -vf "select='eq(n\,N)'" -vframes 1 out.png`). Choose by expression: mid-speech frame → talking content; neutral/smiling frame → posed content. Her expression carries into the output.
2. **Crop tight** — head-and-shoulders; keep low necklines out of the crop (avoids content-filter flags).
   **Source-matching rule (owner, 2026-08-23): match the source frame's environment to the target scene — INDOOR content starts from an INDOOR movie frame, OUTDOOR content from an OUTDOOR frame.** A drastic relight (e.g. sunset street → indoor daylight) forces the model to repaint the face and causes identity drift.
   **Never instruct makeup REMOVAL (owner, 2026-08-23).** In the episodes she wears NO makeup except her lip tint — the as-filmed face already IS the natural/no-makeup look. A "remove makeup / no lashes / natural lips" instruction makes the model repaint her identity features (bold brows, lash-framed eyes, full glossy lips) into a different plainer face. For a "before" look: change wardrobe and scene ONLY, keep her face exactly as the input.
3. **Edit with PAI Pro `image-edit-pro`** (single image input). The prompt MUST open with the refusal-safe identity hard-rule (verbatim template in CHARACTER_LOCK.md): fictional AI film character, identity-preserving scene edit, zero deviation, do not repaint/beautify/smooth/slim/restyle her face. Then describe freely: scene, outfit, pose.
4. **Set the makeup dial** — say one of:
   - **No makeup** → as-filmed look, freckles and matte skin
   - **Sheer glam** → makeup with "a hint of her freckles still shows through the base"
   - **Full-coverage glam** → "full-coverage foundation completely conceals her freckles, smooth professionally-airbrushed finish — the smoothness comes from the MAKEUP, face structure unchanged, still real made-up human skin, not plastic"
5. **For video:** use the QC-passed still as the `reference_image` in PAI `video-generation` (asset flow per the episode scripts; 9:16, 720p, `generate_audio: true`, ≤15.2s per clip). Describe the action as ONE continuous take with her dialogue/behavior; she keeps the identity from the still.
6. **QC every output against the source movie frame** (~1 in 6 drifts even on edits — reject and re-roll). For videos, extract and check frames at start/middle/end.
7. **If PAI refuses** (its filter is strict): confirm fictional-character framing is present, tighten the crop, make wardrobe phrasing modest; up to 3 attempts. Fallback engine for stills: Nano Banana Pro, same prompt structure.
8. **Outputs are final content only** — never use them as references or sources for further edits (no-chaining rule; prevents identity drift compounding).

## Hard rules carried from CHARACTER_LOCK.md
- Her name is **Hazel**; age locked early twenties; v4 "as-filmed" is the only identity.
- She must always read as a 100% real photographed human — no plastic/AI-smoothed look, ever. If in doubt, regenerate.
- Send the owner every deliverable as a file when it passes QC.

## Proven examples (2026-08-23, all PAI Pro)
- Restaurant still, sheer glam (freckles visible) — passed QC vs movie frame
- Restaurant still, full-coverage glam (freckles concealed) — passed QC
- 10s luxury-mall phone-call video (from transplant still) — identity held at 1s/5s/9s
