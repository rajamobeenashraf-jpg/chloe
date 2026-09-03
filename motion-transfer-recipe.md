# Capua arena — motion-transfer recipe (the working method)

Supersedes the independent-per-shot Seedance approach, which could not reproduce
the reference's choreography (see PROMPT_LEARNINGS N16). Owner approved this
method 2026-09-02 after the opening-leap test.

## Method

Drive Higgsfield **Genjutsu** (`hf_mult_motion_control`) with the reference video
itself. It transfers the actual movement and camera motion onto our characters,
rather than inventing new action per shot.

## Settings that work — do not vary these between clips

| Setting | Value | Why |
|---|---|---|
| model | `hf_mult_motion_control` | |
| resolution | `720p` | a 1080p request failed |
| driving clip | **5.0s**, 720x1280, 24fps, no audio | a 2.0s drive failed outright |
| image refs | `a7178b8e-e059-4a58-8570-b846ec211669` (Hazel, denim) + `84ffd471-c4e4-4d5b-bb22-24b85fb5f5e0` (Spartacus Face B) | held constant so clips match each other |
| prompt | verbatim, unchanged per clip | |
| declined_preset_id | `24bae836-2c4a-48e0-89b6-49fcc0b21612` | suppresses the "IN THE DARK" preset intercept |

**The references and the style/character block stay byte-identical across every
clip.** Owner decision 2026-09-02: consistency between clips outranks fixing the
wardrobe or face drift on any single clip. Changing a reference mid-sequence
would make that clip not match the ones already approved.

**The BEAT BLOCK is per-clip and is not optional (found on clip 2, 2026-09-03).**
Clip 1's generic "he attacks, she defends" prompt happened to work because
0:00-0:05 is one continuous two-person exchange. Clip 2 (0:05-0:10) came back
wrong on the same generic prompt: that window holds four setups including one
with NO PEOPLE IN IT (the broken spear tumbling against open sky), and the model
had no way to know. Every clip now gets an explicit numbered beat list describing
each setup's framing and action, plus an instruction to reproduce the hard cuts
rather than smooth them into one shot. Read the segment's beats off the reference
breakdown before writing the prompt - never reuse the previous clip's beats.

## Prompt (verbatim)

```
Transfer the motion, choreography and camera movement from the reference video
onto these two subjects. The armoured man with the dark beard and
bronze-and-leather cuirass takes the attacking fighter's movement. The young
woman in the light blue denim buckle top, denim mini skirt and white sneakers
takes the defending fighter's movement. Setting: the sandy floor of a Roman
arena in Capua, tiered stone seating and a blurred crowd in the deep background,
harsh direct midday sunlight, hard shadows, high contrast, dust in the air.
Photo-real live-action footage, 35mm, physically photographed, natural skin
texture. Keep both faces and both costumes exactly as in the reference images.
```

## Building a driving clip (in `sandbox_exec`, chained in one command)

```
pip install -q yt-dlp
yt-dlp -q -f "mp4/best" -o ref.mp4 "https://youtube.com/shorts/Ao7fVtax2HU"
ffmpeg -y -v error -ss <START> -t 5.0 -i ref.mp4 \
  -vf "scale=720:1280:flags=lanczos,setsar=1,fps=24" \
  -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -an drive.mp4
```
Reference source is 540x960, 55.3s. yt-dlp is not preinstalled in the sandbox.

## Segments

| Clip | Drive window | Reference content | Job ID | Status |
|---|---|---|---|---|
| 1 | 0:00-0:05 | leap, spin, block, overhand thrust | `08b347bf-b2f4-4707-8703-bb39e5425ca2` | delivered |
| 2 | 0:05-0:10 | push forward, clash, spear snaps, piece flies against sky (no people), recovery | `52f78700` v1 rejected, `e2032f63-8865-4a26-a2f0-77766762c101` v2 | v2 delivered |
| 3 | 0:10-0:15 | shield spin, brace at gate, 360 spin from behind, strained face ECU | `8a59accf-c709-4e39-a3a5-a9cef8744a9f` | delivered |
| 4 | 0:15-0:20 | foot plant, sword slash, dodge and parry | | |
| 5 | 0:20-0:22 | jumping shield strike, defender forced back | | |

## Known limitations, owner-accepted

Genjutsu holds choreography and camera but does **not** reliably hold identity or
wardrobe — it leans on the driving video's own figures when a subject reference
is weak. On clip 1 this showed as: the leap itself not transferring, Hazel in a
grey vest rather than denim and holding a spear rather than sword-and-shield, and
Spartacus reading off Face B. Owner watched it and chose to proceed on
consistency rather than rebuild the references ("this one was not so bad").

The likely fix, if he ever wants it: replace the two frame-grab references with
purpose-built clean full-body front-facing costume stills (Gemini /
`nano_banana_pro`, per the stills rule). That would need every clip regenerated
together, never one in isolation.
