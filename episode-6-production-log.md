# Episode 6 Production Log — "The Day Julius Caesar Was Assassinated"
**Branch: `claude/episode-6-production-t57q3j` · Started 2026-08-20**

Script source: `episodes-5-9-scripts.md` §Episode 6 (v3, linear, 11 clips, ~107s).
Per the parallel-chat rules in `NEW_CHAT_HANDOFF.md`, this file is Episode 6's
own log — shared docs (`PROJECT_HANDOFF.md`, `creative-direction.md`,
`CHARACTER_LOCK.md`, `chloe-craft-study-2026-08-20.md`,
`episodes-5-9-scripts.md`) are not edited here.

## Setup
- PAI Pro engine already provisioned by the SessionStart hook (cloned, patches
  applied, `PAI_KEY` present).
- `.active_project` set to `caesar`; working dir
  `/home/user/pai-pro/projects/caesar/assets` (generated media lives here,
  outside this git repo, per standing rule — not committed).
- Read (binding, before any creative work): `PROJECT_HANDOFF.md`,
  `CHARACTER_LOCK.md`, `creative-direction.md` §1–§16,
  `chloe-craft-study-2026-08-20.md`, `episodes-5-9-scripts.md` Episode 6.

## Gate 1 — character-in-costume stills (awaiting owner approval)
Generated 2 stills against the v4 lock: Roman stola + palla, Forum street,
flat noon light, per the episode's palette lock ("neutral-white URBAN marble
city at flat noon").

- `ep6_costume_hero_front.png` — full/mid shot, direct eye contact, mid-adjust
  of the slipping palla (plants the running gag from clip 2).
- `ep6_costume_detail_palla.png` — tight chest-up, both hands re-pinning the
  palla, wry expression.

Refs used (5, per CHARACTER_LOCK.md v4 usage rule 1 — "ALL FIVE master
reference images"): both PAI character sheets (turnaround `cdde55af-...`,
face-detail `ef2a1822-...`) + the 3 named Tier-2 movie frames (clip 9
aftermath `f8a3e22d-...`, clip 3 costume `d35989c6-...`, clip 5 irony
`d11009b5-...`). Frozen identity string, matte/gritty clause, and realism
block pasted verbatim from `CHARACTER_LOCK.md`, unmodified.

Script: `pai-pro/projects/caesar/generate_costume_stills.mjs` (calls PAI raw
`image-edit-pro` directly, bypassing the local canvas/viewer app — same
headless workaround `PROJECT_HANDOFF.md` §4 used for Episode 1).

**Self-QC against CHARACTER_LOCK.md before sending for owner review:**
- Identity match (face shape, eyes, brows, lips, hair): reads consistent with
  the v4 lock on both stills.
- **Flagged concern — possible matte/gritty clause violation.** Both stills
  show more skin sheen/glow (cheekbones, nose bridge, glossy-styled hair) than
  the owner-mandated matte standard calls for ("zero highlighter shine, zero
  glam sheen... a candid photograph of a real woman having a hard day," per
  `CHARACTER_LOCK.md` usage rule 5 — the same drift the Salem costume stills
  round 2 fix was written for). Not auto-regenerated; holding for owner
  confirmation before committing to this look across 11 clips, since a
  wardrobe/lighting choice here propagates through the whole episode.
- Not flagged as an error, but worth the owner's eye: her hair is worn fully
  loose. `CHARACTER_LOCK.md` usage rule 3 says costume changes must leave the
  hair clause untouched, so this wasn't altered — but a Roman woman of this
  status would more typically wear it bound up. Owner's call whether that's a
  detail worth an on-record deviation (character consistency) or worth
  addressing with an updo styled around the locked hair description.

**Engine-fact addendum (this session, not yet in `creative-direction.md`):**
`image-edit-pro` returned a third, previously-undocumented response shape on
every call this session: DALL-E-style `{ data: [{ b64_json }] }` (in addition
to the two shapes already logged in `creative-direction.md` §16 —
`outcome.media_urls[]` and the OpenAI-chat-passthrough shape). No hosted CDN
URL was returned with this shape — only inline base64 — so there is no job ID
to retrieve these two stills by; the only durable copies are the local PNGs
and whatever the owner saves from the chat delivery. Flagging for the shared
doc merge at episode-branch-merge time (`creative-direction.md` §16 already
notes "parsers must handle both" shapes — now three).

## Next steps (blocked on owner sign-off from Gate 1)
1. Owner confirms/adjusts the costume look (see flagged concern above).
2. Generate all 11 clips per the script table, each with the pre-generation
   self-check (`creative-direction.md` §10/§12/§14/§15) and physical-state
   pacing (§8), duration judged per beat (§9).
3. Gate 2: clip-by-clip owner review.
4. Assemble: hard-cut stitch + captions per §16 canonical style, sound design
   per the episode header (full Forum ambience → dead at clip 9 → wind/paper).
5. Gate 3: stitched-cut owner review.
6. Gemini eyes QC at the editing stage only (full clip set, assembled cut,
   captions vs .srt) per the owner's QC rule in `CLAUDE.md`; fix flagged
   CONFIRMED issues; re-check any regenerated clip.
7. Higgsfield `virality_predictor` pre-publish; owner watch-through is final.
