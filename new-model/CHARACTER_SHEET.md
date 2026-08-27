# CHARACTER SHEET — ELLE (built from real photographs)

Name: **ELLE** (owner lock 2026-08-27). Niche: lifestyle & beauty.
Status: photo set complete (37 received, ~24 usable, two looks) — prep in progress. Fill every `[ ... ]` slot from
the real photos before any generation. This file is the single source of truth for
this character; no other project's rules or references apply.

**Subject:** a real person (the owner's wife), used with her consent. Use only
platform-sanctioned identity routes (consented training/editing). Never claim the
subject is fictional to get past a content filter.

---

## PIPELINE (locked architecture)

```
real photos ──► Training set (fal.ai LoRA on Qwen-Image-2512) ──► new-scene stills ─┐
     │                                                                              ├─► QC gate ─► approved still ─► video (Kling 3.0 / Seedance 2.5) ─► frame QC ─► post
     └────────► Nano Banana Pro edits (makeup / hair / outfit on real photos) ──────┘
```

- **Layer 1 — identity training:** fal.ai LoRA, base Qwen-Image-2512, trigger word,
  no face descriptions in captions, ~1000–1500 steps, default learning rate. Used
  for scenes that cannot start from a real photo.
- **Layer 2 — editing:** Nano Banana Pro. Input is always a REAL photo of her plus
  1–3 real reference photos attached to every request. Change makeup / hair /
  outfit / scene; never the face.
- **Layer 3 — video:** approved still as start image (Kling 3.0) or as reference-mode
  input with extra REAL photos as identity anchors (Seedance 2.5). Optional:
  ComfyUI masked inpainting as the precision fallback; HeyGen digital twin for
  talking-head reels.

---

## PHOTO DATASET (owner supplies — first step)

### Folder 1 — Training set (20–30 photos)
Straight off the camera. No filters, no beauty mode, no portrait-mode smoothing.

- [ ] Straight-on face
- [ ] 45° left and 45° right
- [ ] Full left profile and full right profile
- [ ] Slightly above and slightly below eye level
- [ ] Neutral expression, natural smile, candid mid-laugh
- [ ] Hair down AND hair tied back
- [ ] Indoor light, outdoor daylight, overcast
- [ ] 3–4 upper-body, 2–3 full-body (front at least once)
- [ ] Minimal or no makeup in most shots
- [ ] All from the last ~year (current hair, current self)
- [ ] Sharp faces, no sunglasses, no other people in frame (crop them out)

### Folder 2 — Golden references (6–8 photos, NEVER used for training)
The judging panel. Every future output is compared against these.

| Ref | View | File |
|---|---|---|
| A | Neutral front | [ ] |
| B | 3/4 view | [ ] |
| C | Profile | [ ] |
| D | Natural smile | [ ] |
| E | Upper/full body | [ ] |
| F | Different lighting | [ ] |
| G | Natural candid | [ ] |

---

## IDENTITY — NEVER CHANGE (fill from photos, then freeze)

Write once, from observation of the real photos. Paste-ready values, no flattery words.

- Face shape: [ ]
- Forehead / hairline: [ ]
- Eyebrow shape: [ ]
- Eye shape, size, spacing, color: [ ]
- Nose structure: [ ]
- Lips (shape, natural color): [ ]
- Cheekbones: [ ]
- Jawline / chin: [ ]
- Ear shape: [ ]
- Natural facial asymmetry (describe it — it is identity, not a flaw): [ ]
- Skin tone: [ ]
- Natural skin texture (freckles, moles, redness — name them): [ ]
- Distinguishing marks: [ ]
- Body proportions: [ ]
- Age band: [ ]

## VARIABLE ELEMENTS (the ONLY things a prompt may change)

Clothing · Hairstyle · Makeup · Pose · Location · Lighting · Camera angle ·
Expression · Accessories. Everything not on this list is IDENTITY and frozen.

## PER-VIDEO LOOK SYSTEM (owner requirement, locked 2026-08-27)

The channel niche is lifestyle & beauty: **every video gets a different outfit,
a different hairstyle, and a different makeup style.** Rules that make that safe:

- New look per video = makeup dial position + hairstyle description + wardrobe
  description. Nothing else changes. Face, hairline, skin identity, and the
  body spec below are pasted frozen into every generation.
- Hairstyle changes NEVER touch the hairline/baby hairs/face-framing clause.
- Makeup changes ALWAYS carry the "look comes from the makeup, face unchanged
  underneath" clause. Never instruct makeup removal.
- **Body spec (frozen once approved): slim, attractive, feminine figure —
  moderate and realistic, same figure in every video.** Her real face pairs
  with this body; adjustment stays plausible so nothing reads as AI. Exact
  wording to be locked after she approves the first full-body test renders.
- QC per video: identity check against golden refs (face at 100% zoom) PLUS
  body-consistency check against the previous approved videos.

---

## FROZEN PROMPT BLOCKS (paste verbatim — never paraphrase)

### Preservation block (every generation, both layers)
> Preserve the subject's actual facial structure and natural asymmetry exactly as in
> the reference images. Do not beautify, idealize, reshape, smooth, slim, enlarge, or
> otherwise modify her facial features, hairline, or proportions. Preserve realistic
> pores, fine lines, subtle skin variation, natural hair strands, natural eye moisture,
> and her real facial proportions.

### Realism block (every generation)
> Documentary photograph, RAW natural-photography look, natural lighting with real
> shadow falloff, visible skin pores and fine vellus facial hair, natural subtle human
> imperfections, matte-to-natural skin finish, believable anatomy, real fabric texture.
> NOT a 3D render, NOT smoothed or beauty-filtered, NOT airbrushed, NOT plastic skin,
> NOT an AI-generated look.

### Negative tail
> no beauty filter, no digital smoothing, no airbrushing, no plastic skin, no glossy
> skin, no artificial symmetry, no excessive sharpening

### Banned words in any prompt
"flawless", "perfect skin", "stunning", "beautiful glow", "porcelain", "airbrushed",
and any beautifier adjective. Also banned: any instruction to REMOVE makeup (repaints
identity features) — for a natural look, start from a real bare-face photo instead.

### Makeup dial (state exactly one per generation)
- **None** — her real skin, all texture visible.
- **Sheer** — light makeup, "her natural skin texture still reads through the base".
- **Full glam** — "full-coverage professional makeup; the smoothness comes from the
  MAKEUP, not from changing her — bone structure, eye shape and color, nose, lip
  line, jawline, and hairline unchanged; at close range still real made-up human
  skin, not plastic, not AI-smoothed."

### Hair rule
Hairline, baby hairs, and face framing are IDENTITY — unchanged always. Style,
length, and color are variable. QC hair-change outputs extra strictly (eyes and nose
at 100% zoom): dramatic hair changes are where drift hides.

---

## QC RULE (what actually makes it "100% her")

1. Expect roughly 1 in 6 outputs to drift. Reject without mercy; never post
   "close enough".
2. Judge every output against the golden references — eyes at 100% zoom first, then
   nose, lips, jawline, hairline, asymmetry.
3. Videos: extract and check frames at start, middle, and end of every clip.
4. **No-chaining rule (permanent):** generated outputs are final content only. Never
   use a generated image as a reference, a training input, or a source for further
   edits. Identity references are ALWAYS her real photos. A generated still is used
   exactly once — as the start frame of its own video.
5. Any future retraining uses the original real-photo set, never renders.
6. Editing real photos: match the source photo's lighting environment to the target
   scene (indoor→indoor, outdoor→outdoor); a drastic relight forces a face repaint.

---

## ASSET LOG (fill as the pipeline comes online)

- Training set location: [ ]
- Golden refs location: [ ]
- fal.ai LoRA v1 (SUPERSEDED — undertrained, failed identity QC): 1500 steps,
  request `01a04485-3508-7f90-9349-476582c07eec`. Do not use.
- **fal.ai LoRA v2 (CURRENT)**: base Qwen-Image (fal-ai/qwen-image-trainer), trigger
  word `3ll3`, steps 4000, lr 5e-4, trained 2026-08-27, request
  `01a044b6-8ade-7b40-96e6-d4bb3e91614e`, weights:
  https://v3b.fal.media/files/b/0aa81066/l7KI-05lU_HyIJgWRo6LX_adapter.safetensors
  Inference: fal-ai/qwen-image, loras=[{path, scale 1.0–1.2}]. Passed Claude identity
  QC 2026-08-27 (front neutral, smile, profile, new-scene transfer) — owner + Elle
  approval pending.
- Identity test render vs golden refs: [ pass/fail, date ]
- First approved makeup/hair test set: [ ]
- First approved video test: [ ]
