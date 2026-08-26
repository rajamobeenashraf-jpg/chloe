#!/usr/bin/env node
// Legnica 1241 episode — assembles a full production prompt for one clip
// from clips.json + the standing CHARACTER_LOCK.md / creative-direction.md
// rules, then generates it via PAI Pro video-generation.
//
// Usage: node run_clip.mjs --index 1 [--dry-run]

import fs from "node:fs/promises";
import path from "node:path";
import { uploadReferenceUrl } from "../../server/pai_assets_client.js";
import { submitVideo, pollVideo } from "../../server/pai_video_client.js";
import { downloadUrlToBuffer } from "../../server/pai_client.js";

const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB";
const IDENTITY_REFS = [
  `${CDN}/cdde55af-979f-4410-9d84-a9e1c77cdfde.png`, // turnaround sheet
  `${CDN}/ef2a1822-8d93-4cbd-a2aa-071412934b5e.png`, // face-detail sheet
  `${CDN}/f8a3e22d-0e3c-4f63-8cf2-fb64e9f215ec.png`, // movie frame: aftermath
  `${CDN}/d35989c6-3cf2-4d1f-b8a8-f2fd75bf3438.png`, // movie frame: costume
  `${CDN}/d11009b5-3b62-4841-ad2b-4a0f700b2569.png`, // movie frame: irony close-up
];
// Owner-approved Legnica costume still (v3 — common medieval woman, distinct
// from the soldiers' cloaks), uploaded to Higgsfield storage for a public URL.
const COSTUME_REF = `${CDN}/533ee267-3749-426e-b3db-1771897d37d0.png`;

function parseArgs(argv) {
  const out = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--index") out.index = argv[++i];
    else if (a === "--dry-run") out.dryRun = true;
  }
  return out;
}

const IDENTITY_BLOCK = `She is the EXACT same woman shown in the reference images — our fictional AI-generated film character (not a real person), whose design stays exactly identical to the references every time. Her slimmer sculpted face with defined cheekbones and a clean narrower jawline; her large doe-like almond light-hazel eyes; her bold thick dark-brown high-arched eyebrows; her full lips with glossy nude-caramel tint (lip color only, not face gloss); her long light-brown bronde balayage hair with center parting, loose and visible; her warm golden-tan skin with natural visible freckles and subtle redness — NOT fair-ivory or porcelain; her body proportions and figure; her age (early twenties). No beautification, no redesign, no changes from the references.

REALISM — HARD REQUIREMENT: matte skin, not glossy or dewy — zero highlighter shine, zero glam sheen, zero soft-focus glow (her lips alone keep their natural glossy nude-caramel tint — that is lip color only). Visible pores, freckles, and faint natural blemishes readable at normal viewing size. Hair is windswept, slightly tangled and weather-disordered, NOT salon-styled. Lighting is hard, overcast natural daylight with real shadow falloff, NOT flattering studio softbox beauty lighting. Color grade is muted, desaturated, unpolished — raw historical-documentary photojournalism, NOT a fashion/beauty editorial feel. RAW footage, visible grain, natural imperfections, believable anatomy, real fabric texture. She must NEVER look like an AI generation, a 3D render, a smoothed/filtered/airbrushed image, or a synthetic plastic AI face — 100% natural, human, and believable is the single most important requirement, non-negotiable.

WARDROBE (identity unchanged, wardrobe only, matches her established Legnica costume exactly — READ CAREFULLY): an ordinary 13th-century COMMON WOMAN's outfit, deliberately distinct from the soldiers' military cloaks/mail/gambesons around her — a fitted-bodice, ankle-length wool kirtle dyed muted madder-red/faded rust, worn undyed linen apron over it, a thin linen kerchief loosely tied back (her hair fully loose and visible underneath, NOT covered), a small linen drawstring pouch at her belt (not a leather satchel strap), plain soft leather flat shoes, mud-caked hem. No armor, no weapon, ever, no cloak matching the soldiers' colors or cut. She must read at a glance as a civilian townswoman/villager caught near an army, never mistakable for a soldier.

CAMERA / DEVICE: NO PHONE, CAMERA, RIG, GOPRO, STRAP, OR MOUNT IS EVER VISIBLE IN FRAME, not even for a single frame, not even during physical action. Both of her hands and arms are always free to do whatever the scene requires, with nothing in them except what is explicitly described.`;

const SELFIE_CAMERA_NOTE = `This is a first-person selfie-style point-of-view shot, as if the viewer's own eyes are her own held camera floating at arm's length in front of her — there is no device for her to hold, check, or glance at, ever. Single continuous unbroken shot, one camera angle throughout, no cuts, no scene changes, real-time continuous take. She walks normally FORWARD facing her direction of travel when moving any meaningful distance — NOT walking backward, NOT staying rigidly face-on to the lens while moving.`;

const THIRD_PERSON_CAMERA_NOTE = `This is an OBJECTIVE third-person cinematic shot — not her own held camera; the camera exists independently in the scene. Single continuous unbroken shot, one camera angle throughout, no cuts, no scene changes, real-time continuous take.`;

// Locked appearance for Duke Henry II the Pious — reused verbatim in every clip
// he appears in (2, 3, 8, 9) so he reads as the same person across generations,
// same identity-consistency discipline as HAZEL's CHARACTER_LOCK.
const HENRY_DESCRIPTION = `DUKE HENRY II THE PIOUS (recurring named historical figure — appearance LOCKED, must match exactly every time he appears): a Polish-Silesian duke in his early-to-mid forties, weathered and grim-faced, dark hair with a short beard. Mounted on an armored grey warhorse. ARMOR — 13th-century accurate, HARD EXCLUSIONS: a mail hauberk (interlinked riveted rings) covering torso and arms, a mail coif under a simple open-faced steel helmet with a straight noseguard (a nasal helm or plain rounded kettle helm) — NOT plate armor, NOT articulated/shaped pauldrons or vambraces, NOT a later visored/pointed "Gothic plate" helmet, NOT any 14th–15th century armor styling. Over the mail, a cloth surcoat bearing his real historical heraldry — a black eagle on a gold/yellow field (the Piast dynasty's Silesian eagle) — and a matching personal banner nearby. His helmet leaves his face clearly visible and readable throughout. No fantasy armor.`;

const CHARACTER_BLOCKS = { henry: HENRY_DESCRIPTION };

function buildPrompt(clip) {
  const cameraNote = clip.cameraMode === "selfie" ? SELFIE_CAMERA_NOTE : THIRD_PERSON_CAMERA_NOTE;
  const characterBlocks = (clip.characters || []).map((name) => CHARACTER_BLOCKS[name]).filter(Boolean);
  return [
    IDENTITY_BLOCK,
    ``,
    ...characterBlocks.flatMap((block) => [block, ``]),
    `CAMERA MODE: ${cameraNote}`,
    ``,
    `SCENE (Battle of Legnica, Poland, April 9, 1241 — overcast daylight, dust and mud throughout): ${clip.scene}`,
    ``,
    `DIALOGUE: ${clip.dialogue}`,
    ``,
    `PHYSICAL ACTION / PACING / CONTINUITY: ${clip.action}`,
    ``,
    `SOUND: ${clip.sound}.`,
    ``,
    `No graphic gore, no dismemberment, no blood spray anywhere in this episode. Photorealistic humans, realistic horses, realistic 13th-century medieval weapons and armor (mail, kite shields, spears, swords; Mongol side: lamellar/leather armor, composite bows, sabres) — no fantasy armor, no later-era equipment.`,
  ].join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.index) {
    console.error("usage: node run_clip.mjs --index 1 [--dry-run]");
    process.exit(2);
  }

  const spec = JSON.parse(await fs.readFile(new URL("./clips.json", import.meta.url), "utf-8"));
  const clip = spec.clips.find((c) => String(c.n) === String(args.index));
  if (!clip) {
    console.error(`no clip with index ${args.index} in clips.json`);
    process.exit(2);
  }

  const prompt = buildPrompt(clip);
  const outPath = `assets/clip${clip.n}_v1.mp4`;
  console.error(`[run_clip ${clip.n}] duration=${clip.duration}s cameraMode=${clip.cameraMode}`);
  console.error(`[run_clip ${clip.n}] prompt chars=${prompt.length}`);

  if (args.dryRun) {
    console.log(JSON.stringify({ ok: true, dryRun: true, n: clip.n, prompt, duration: clip.duration, outPath }, null, 2));
    return;
  }

  const imageAssetIds = [];
  for (const url of [...IDENTITY_REFS, COSTUME_REF]) {
    imageAssetIds.push(await uploadReferenceUrl(url, "image"));
  }

  const { taskId } = await submitVideo({
    prompt,
    duration: clip.duration,
    aspectRatio: "9:16",
    resolution: "720p",
    generateAudio: true,
    imageAssetIds,
  });
  console.error(`[run_clip ${clip.n}] submitted taskId=${taskId}, polling...`);

  const { videoUrl, durationSeconds } = await pollVideo(taskId, {
    onProgress: ({ status, elapsedSec }) => console.error(`[run_clip ${clip.n}] poll status=${status} elapsed=${elapsedSec}s`),
  });

  const bytes = await downloadUrlToBuffer(videoUrl, { timeoutMs: 180_000 });
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, bytes);

  console.log(JSON.stringify({ ok: true, n: clip.n, out: outPath, taskId, videoUrl, durationSeconds, bytes: bytes.length }));
}

main().catch((e) => {
  console.log(JSON.stringify({ ok: false, klass: e.klass || "unknown", message: e.message }));
  process.exit(1);
});
