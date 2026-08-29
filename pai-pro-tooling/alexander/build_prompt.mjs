#!/usr/bin/env node
// Alexander/Gaugamela episode — assembles the full Seedance 2.5 generation
// prompt + params for one clip from clips.json + the frozen blocks below,
// so no prompt is ever hand-assembled (rule drift = regeneration source).
//
// This episode generates through the Higgsfield MCP (not PAI Pro HTTP), so
// this script does NOT submit anything: it prints a JSON payload — prompt,
// params, and the media reference list with @-tag roles — which the session
// feeds to generate_video verbatim. §14/§19/§20 gates all still apply:
// nothing is generated without owner approval.
//
// Prompt dialect: PROMPT_LEARNINGS.md (start-frame method S2, @-tag roles,
// template order, static-camera phrasing, cause-before-reaction,
// constraint-list negatives, positive-description for costume details).
//
// Usage: node build_prompt.mjs --clip 6a [--start-image <job_or_media_id>]
//        node build_prompt.mjs --clip 2 --still   (start-frame STILL payload)
//
// --still emits a nano_banana_pro image payload instead of a seedance_2_5
// video payload. It exists so no start-frame still is ever hand-assembled
// again, and it always includes HAZEL_CANON_4K alongside the episode-costume
// refs when Hazel is in frame (identity anchors, unaffected by the resolution
// rule below).
//
// Resolution: generates at "2k" (working resolution) on purpose. Owner
// permanent lock 2026-08-29 (CLAUDE.md "4K upscale sequencing"): NEVER
// generate or upscale directly to 4K — deliver at working resolution, get
// owner approval, THEN upscale to 4K via the separate upscale_image tool.
// (Earlier same day, Clip 2 v2 hit the model's 2k default by accident before
// this rule existed — see PROMPT_LEARNINGS X3 — the owner then locked the
// approve-before-upscale sequence as the permanent rule regardless.)

import fs from "node:fs/promises";

// ---------- FROZEN BLOCKS (paste-verbatim law; never paraphrase) ----------

// CHARACTER_LOCK.md v4 frozen identity string (verbatim).
const HAZEL_IDENTITY = `The EXACT same woman shown in the reference images — the character sheets and movie frames all depict ONE single identical person. Render precisely: her slimmer more sculpted face with defined cheekbones and a clean narrower jawline; her large doe-like almond light-hazel eyes; her bold thick dark-brown high-arched eyebrows; her full lips with glossy nude-caramel tint; her hairline and long light-brown bronde balayage hair with center parting; her warm golden-tan skin tone with natural visible freckles and subtle redness — NOT fair-ivory or porcelain; her body proportions and figure; her age (early twenties). No beautification, no redesign, no changes between this and the references. She must read as a real, physically-photographed human being: natural skin texture with visible pores, fine vellus hair, and authentic micro-imperfections; subtle natural asymmetry; real weight and movement in her hair and clothing. She must NEVER look like an AI generation, a 3D render, a smoothed/filtered/airbrushed image, or a synthetic "plastic AI face" — 100% natural, human, and believable is the single most important requirement of every generation, non-negotiable.`;

// Owner lock 2026-08-29: episode look (deliberate supersession of the
// lip-tint-only rule FOR THIS EPISODE ONLY).
const HAZEL_EPISODE_LOOK = `EPISODE LOOK (owner-locked): soft glam makeup — soft neutral eyeshadow, light liner and mascara, warm blush, luminous base with her freckles still visible through it, glossy nude lips; open straight center-parted hair, worn loose. Wardrobe: scribe's chiton of coarse undyed linen pinned at both shoulders with small plain straight-pin bronze fibulae, cinched with a belt carrying a small satchel; hinged wooden wax diptych tablet and stylus; flat period leather strap sandals (never modern footwear).`;

// Script §32 NPC locks (verbatim).
const LOCKS = {
  ALEXANDER: `ALEXANDER — early-to-mid twenties; average-to-short stature, not physically imposing (per ancient descriptions); clean-shaven, breaking Macedonian tradition; thick, tousled light-brown hair swept back off the forehead; a slight characteristic tilt/turn to the neck; pale, intense light-colored eyes; compact, athletic build. Wears a bronze Macedonian officer's cuirass over a crimson tunic, a plain finely-made sword belt, a deep-red cloak, bronze greaves and period leather footwear (never modern boots). Moves and speaks with unhurried, economical calm — even in the wake-up scene, even mid-battle — never visibly rushed, in deliberate contrast to everyone around him.`,
  PARMENION: `PARMENION — much older, a senior general; close-cropped silver-grey hair and beard; deeply weathered, lined face; heavier-set build than Alexander. Wears a senior officer's bronze cuirass with a red cloak of rank. Moves with visible urgency and tension, a physical contrast to Alexander's calm.`,
  BUCEPHALUS: `BUCEPHALUS — a large dark bay warhorse, near-black coloring, with a notably broad, wide forehead (the source of his name — "ox-head"). Pins his ears and shies from everyone except Alexander; calm and steady only under him specifically.`,
};

// Production-breakdown frozen ENVIRONMENT_BLOCK (verbatim; battle clips only).
const ENVIRONMENT_BLOCK = `THE BATTLEFIELD OF GAUGAMELA, OCTOBER 331 BC — HARD ENVIRONMENTAL REQUIREMENTS: a vast, FLAT, open dry plain — hard pale-ochre earth, sparse scorched scrub, NO green grass, NO hills in the battle space, NO postcard-blue sky: the sky is pale, haze-white with dust. Two enormous armies share this plain and BOTH extend past the frame edges in every direction they occupy — the Persian line is several times the Macedonian force and visibly has NO END in frame; ranks recede into atmospheric dust-haze at the horizon as silhouette masses of thousands. Layering is mandatory: at most ten to fifteen fully-detailed soldiers in the sharp foreground; dozens-to-hundreds in readable formation in the midground, partially softened by dust; thousands as indistinct moving masses in the haze beyond. Dust is a main visual element the moment masses move — kicked up by feet, hooves, and wheels, hanging in the air, scaling with the action. Macedonian equipment: bronze, crimson cloaks, tall sarissa pikes reading as vertical forests above the ranks. Persian side: visibly varied contingents of many peoples, massed cavalry, scythed chariots — Persian and Macedonian gear/iconography NEVER mix on the same side. SOUND SCALE (three layers, always): close — leather, breath, individual cries; middle — massed hooves and shouted commands; far — a continuous unbroken roar of tens of thousands with no gaps in it. This world continues beyond every frame edge; the camera sees one small part of an enormous real event.`;

const V_MODE_BLOCK = `V-MODE (her own lens): first-person selfie-camera vlog framing — handheld at arm's length, talk-to-lens, natural handheld micro-movement. NO phone, camera, rig, or mount is ever visible in frame, not even for a single frame. Single continuous unbroken take, one camera angle, no cuts, real-time.`;

const NOVA_BLOCK = `NOVA MODE (true third-person cinematography): no vlog framing. Hazel's face NEVER appears in a Nova shot. Single continuous unbroken take, no cuts, real-time.`;

// 3P MODE (owner-named, adopted 2026-08-29, brief §1): true external third-person
// camera, everyone in the scene visible INCLUDING Hazel. Distinct from Nova (which
// excludes her face) and from V (which is her own first-person lens). Never build
// a 3P clip on a start-frame still composed as first-person/selfie POV — that
// mismatch voided Clip 2's first attempt (production log Round 13/"Mode
// assignments FINAL LOCKED").
const THIRD_P_BLOCK = `3P MODE (true external third-person camera): a real camera positioned in the scene as an independent observer — NOT anyone's point-of-view, NOT a handheld selfie, NOT vlog framing, NOT arm's-length talk-to-lens. Every person present, Hazel included, is visible on screen as a normal character in the scene; she never addresses or glances into the lens, and no phone, camera, rig, or mount is ever visible in frame. Single continuous unbroken take, one camera angle, no cuts, real-time.`;

function modeBlock(mode) {
  if (mode === "V") return V_MODE_BLOCK;
  if (mode === "3P") return THIRD_P_BLOCK;
  return NOVA_BLOCK;
}

// §37b battle grade / general episode palettes.
const GRADES = {
  battle: `Bleached, desaturated, bleak war-film color grade; dust reads slate-grey, never golden, never glowing; harsh flat daylight; nothing beautiful or heroic-postcard about the light.`,
  dawn: `Dry ochre-gold dawn haze, low warm lamplight/brazier interiors where indicated; muted, unpolished, documentary-real — never fashion-editorial.`,
  dusk: `Bronze-amber dusk, campfires relighting; muted, unpolished, documentary-real.`,
};

// Reference media (Higgsfield job IDs / media IDs; see production log for URLs).
const REFS = {
  // v5 episode package (owner-approved 2026-08-29) — the v4-era set is retired.
  // Episode-costume views are 2K (photo-edits of the canon); the canon itself is
  // 4K per the owner's permanent-upscale lock (CHARACTER_LOCK.md).
  HAZEL: [
    { value: "e11d6b64-70b0-4021-839c-69e519472d9a", note: "v5 episode look-lock (scribe costume)" },
    { value: "64c0dbae-137b-4dc8-9be2-261b61758ff8", note: "episode full-body front" },
    { value: "319c14c7-13d9-408c-bcb0-76dd5bc7c67e", note: "episode full-body 3/4 walking" },
    { value: "81a91c73-2893-413b-b67f-2c4aaa5456ea", note: "episode face close-up front" },
    { value: "9885d19e-07b9-4e38-bb32-6b95ffe75e85", note: "episode face close-up 3/4" },
  ],
  // Canon identity anchors at 4K (permanent, owner-locked 2026-08-29) — pass alongside
  // the episode-costume refs above when a generation needs the highest-fidelity face lock.
  HAZEL_CANON_4K: [
    { value: "119465f3-c465-4f11-873e-dfa2883c36c6", note: "master, 4K" },
    { value: "8f22ad52-3db6-4c69-ac9f-77cfc4dd3e24", note: "face front, 4K" },
    { value: "274e937a-2e4e-485d-92a0-d17bd96e0ca3", note: "face 3/4, 4K" },
    { value: "1a8133ee-32c6-4600-a488-67c404276333", note: "full-body front, 4K" },
    { value: "17af1f93-300c-406a-9047-e36bb9a61497", note: "full-body 3/4, 4K" },
  ],
  ALEXANDER: [
    { value: "86a6746d-4cac-4eae-8665-faa1485279b4", note: "full-body front" },
    { value: "df75706b-f13f-490b-b50c-f12a01782aee", note: "full-body 3/4" },
    { value: "d80986c3-9e77-4d21-91d4-3e88a86da1ac", note: "face front" },
    { value: "4cc2a502-b478-45f6-bcfb-49b337708ec1", note: "face 3/4" },
  ],
  PARMENION: [{ value: "3c6c04b3-54f4-4806-9fcf-34d781530bcd", note: "reference still" }],
  BUCEPHALUS: [{ value: "f47b67a6-9772-4809-ac4c-f6acaa6eda3b", note: "reference still" }],
};

// ---------- assembly ----------

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--clip") out.clip = argv[++i];
    else if (argv[i] === "--start-image") out.startImage = argv[++i];
    else if (argv[i] === "--still") out.still = true;
  }
  return out;
}

function buildStillPayload(clip) {
  if (!clip.stillComposition) {
    console.error(`clip "${clip.id}" has no "stillComposition" field in clips.json — add one (a single-moment external-observer composition description) before generating its start frame.`);
    process.exit(2);
  }

  // Learnings N5/S9 and Round 18 (Clip 3): reference-image COUNT is itself a
  // failure risk — 14 refs failed twice with no error detail; 2 refs (one
  // Hazel canon anchor + one per NPC) succeeded immediately. Keep still
  // reference sets lean; do NOT stack the full episode-costume + full
  // canon-4K sets together the way video generation does.
  const medias = [];
  if (clip.hazel) {
    medias.push({ value: REFS.HAZEL_CANON_4K[0].value, role: "image_references" });
    medias.push({ value: REFS.HAZEL[0].value, role: "image_references" });
  }
  for (const npc of clip.characters || []) {
    const set = REFS[npc];
    if (!set) continue;
    // Cap at 2 refs per NPC for stills, same lean-reference-set rationale.
    for (const r of set.slice(0, 2)) medias.push({ value: r.value, role: "image_references" });
  }

  const parts = [];
  parts.push(`FORMAT: single cinematic film still, vertical 9:16, the opening composition of a scene — this is a START FRAME for a video generation, not a finished shot.`);
  parts.push(modeBlock(clip.mode));
  if (clip.hazel) parts.push(`STRICT IDENTITY RE-RENDER — ${HAZEL_IDENTITY}\n\n${HAZEL_EPISODE_LOOK}`);
  for (const npc of clip.characters || []) if (LOCKS[npc]) parts.push(LOCKS[npc]);
  if (clip.environment) parts.push(`ENVIRONMENT: ${clip.environment}`);
  parts.push(`SCENE / COMPOSITION: ${clip.stillComposition}`);
  parts.push(`GRADE: ${GRADES[clip.grade] || clip.grade}`);
  parts.push(`CONSTRAINTS: no duplicated characters, no extra people in frame, no on-screen text or logos, no camera/phone/rig visible anywhere, no music, single still frame only.`);

  return {
    clip: clip.id,
    model: "nano_banana_pro",
    params: {
      // Working resolution — do NOT set to "4k" here. Owner permanent lock:
      // upscale to 4K only after the owner approves this still (CLAUDE.md
      // "4K upscale sequencing").
      resolution: "2k",
      aspect_ratio: "9:16",
    },
    medias,
    prompt: parts.join("\n\n"),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.clip) {
    console.error("usage: node build_prompt.mjs --clip 6a [--start-image <id>]");
    process.exit(2);
  }
  const spec = JSON.parse(await fs.readFile(new URL("./clips.json", import.meta.url), "utf-8"));
  const clip = spec.clips.find((c) => String(c.id) === String(args.clip));
  if (!clip) {
    console.error(`no clip "${args.clip}" in clips.json`);
    process.exit(2);
  }

  if (args.still) {
    console.log(JSON.stringify(buildStillPayload(clip), null, 2));
    return;
  }

  // Media list, in order, so @-tags line up: start image first if present,
  // then Hazel (if in frame), then each present NPC's set.
  const medias = [];
  const refRoleLines = [];
  let idx = 0;
  const tag = () => `@Image${++idx}`;

  if (args.startImage || clip.startImage) {
    medias.push({ value: args.startImage || clip.startImage, role: "start_image" });
    refRoleLines.push(`${tag()} is the STARTING FRAME: the exact composition, placement of both formations, dust state, and grade of the first frame. Do not redesign it.`);
  }
  if (clip.hazel) {
    const first = idx + 1, last = idx + REFS.HAZEL.length;
    for (const r of REFS.HAZEL) medias.push({ value: r.value, role: "image_references" });
    idx = last;
    refRoleLines.push(`@Image${first}–@Image${last} control ONLY Hazel's identity, face, hair, and wardrobe. Do not copy pose, background, lighting, or camera angle from them.`);
  }
  for (const npc of clip.characters || []) {
    const set = REFS[npc];
    if (!set) continue;
    const first = idx + 1, last = idx + set.length;
    for (const r of set) medias.push({ value: r.value, role: "image_references" });
    idx = last;
    refRoleLines.push(`@Image${first}${last > first ? `–@Image${last}` : ""} control ONLY ${npc}'s identity and costume. Do not copy pose, background, lighting, or camera angle from them.`);
  }
  if (clip.audioRef) {
    medias.push({ value: clip.audioRef, role: "audio_references" });
    refRoleLines.push(`@Audio1 controls ONLY the speaking voice timbre. Do not copy pacing or content from it.`);
  }

  const parts = [];
  parts.push(`FORMAT: ${clip.duration} seconds, vertical 9:16, single continuous take, real-time speed.`);
  parts.push(modeBlock(clip.mode));
  if (refRoleLines.length) parts.push(`REFERENCE ROLES:\n${refRoleLines.join("\n")}`);
  if (clip.hazel) parts.push(`STRICT IDENTITY RE-RENDER — ${HAZEL_IDENTITY}\n\n${HAZEL_EPISODE_LOOK}`);
  for (const npc of clip.characters || []) if (LOCKS[npc]) parts.push(LOCKS[npc]);
  if (clip.startingState) parts.push(`STARTING STATE: ${clip.startingState}`);
  parts.push(`SCENE: ${clip.scene}`);
  if (clip.timeline) parts.push(`TIMELINE (cause always before reaction):\n${clip.timeline}`);
  if (clip.dialogue) parts.push(`DIALOGUE (straight quotes, exact words, name who speaks — everyone else keeps their mouth closed):\n${clip.dialogue}`);
  parts.push(`CAMERA: ${clip.camera}`);
  if (clip.battle) {
    parts.push(ENVIRONMENT_BLOCK);
    parts.push(`BATTLE STAGE — ${clip.stage}: ${clip.inheritedState}`);
  } else if (clip.environment) {
    parts.push(`ENVIRONMENT: ${clip.environment}`);
  }
  if (clip.continuity) parts.push(`CONTINUITY (invariants first frame to last): ${clip.continuity}`);
  parts.push(`GRADE: ${GRADES[clip.grade] || clip.grade}`);
  parts.push(`AUDIO: ${clip.sound} NO music.`);
  if (clip.endingState) parts.push(`ENDING STATE: ${clip.endingState}`);
  parts.push(`CONSTRAINTS: no cuts, no slow motion, no repeated action, no duplicated characters or props, no object teleportation, no on-screen text or logos, no music.${clip.constraints ? " " + clip.constraints : ""}`);

  const payload = {
    clip: clip.id,
    model: "seedance_2_5",
    params: {
      mode: medias.length ? "omni_reference" : "t2v",
      duration: clip.duration,
      resolution: "1080p",
      aspect_ratio: "9:16",
      generate_audio: true,
    },
    medias,
    prompt: parts.join("\n\n"),
  };
  console.log(JSON.stringify(payload, null, 2));
}

main().catch((e) => { console.error(e.message); process.exit(1); });
