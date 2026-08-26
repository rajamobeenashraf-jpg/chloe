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
const HENRY_DESCRIPTION = `DUKE HENRY II THE PIOUS (recurring named historical figure — appearance LOCKED, must match exactly every time he appears): a Polish-Silesian duke in his early-to-mid forties, weathered and grim-faced, dark hair with a short beard. Mounted on an armored grey warhorse. ARMOR — must look exactly like a real mid-13th-century European knight as depicted in period art such as the Maciejowski Bible (c. 1240s): from head to hip, his ENTIRE body is covered ONLY by a mail hauberk (interlinked riveted steel rings, draping and flexible like cloth, covering torso, shoulders, and arms down to the wrists with no separate shoulder or arm pieces of any kind) and a mail coif covering the head/neck. Over the coif, a plain rounded steel skull-cap helmet (a simple dome, like an upside-down bowl) with ONE straight flat nose-bar hanging down the center of the face — that is the ONLY thing on his face, nothing else. HARD EXCLUSIONS, absolutely none of the following may appear anywhere on him: no plate armor of any kind, no shaped/articulated steel pauldrons, spaulders, vambraces, gauntlets, cuisses, or greaves, no hinged or pointed visor, no pointed or angular "Gothic" helmet shape, no chin/cheek guards, no brow ridge, nothing resembling 14th–15th century knight armor. Over the mail, a plain loose cloth surcoat bearing his real historical heraldry — a black eagle on a gold/yellow field (the Piast dynasty's Silesian eagle) — and a matching personal banner nearby. The nose-bar and coif leave his face clearly visible and readable throughout — his eyes, cheeks, and mouth are never obscured.`;

const CHARACTER_BLOCKS = { henry: HENRY_DESCRIPTION };

// Standing regression checklist — every rule we've already had to fix once,
// checked against EVERY generation from here on, not just whatever's being
// iterated on this round. Added 2026-08-26 after the same shield-orientation
// bug that was fixed on clip 1 (and audited into clips 3/7) silently regressed
// on clip 2 across several unrelated rewrites, because each dry-run only
// checked for that round's specific new fix. This is the fix for that gap
// itself: a hard, mandatory, cumulative check, not a per-fix keyword check.
const STANDING_RULES = [
  {
    name: "no-camera-device-visible",
    appliesTo: () => true,
    check: (p) => !/holding the camera on herself|camera still on herself|camera on herself/i.test(p),
  },
  {
    name: "shields-held-forward-never-on-back",
    appliesTo: (clip) => /shield/i.test(clip.scene + " " + clip.action),
    check: (p) =>
      /shield[s]?[^.]{0,80}(forward|front|facing (the )?(enemy|horizon|opposing|each other))/i.test(p) &&
      /never[^.]{0,40}(on (his|their|the) back|on the back|slung on the back)/i.test(p),
  },
  {
    name: "armies-face-each-other-not-rear-facing",
    appliesTo: (clip) => /(enemy army|opposing (army|ranks)|opposite side|two armies|facing each other)/i.test(clip.scene + " " + clip.action),
    check: (p) =>
      /facing (the )?(enemy|each other|opposing)/i.test(p) &&
      !/(soldiers|army|men)[^.]{0,40}(from behind|backs turned|facing away)/i.test(p),
  },
  {
    name: "named-character-face-visible-when-speaking",
    appliesTo: (clip) => (clip.characters || []).length > 0,
    check: (p) => /face[^.]{0,30}(visible|readable)/i.test(p),
  },
  {
    // Added 2026-08-26 after a dialogue rewrite (removing a gesture) silently
    // deleted an unrelated line — Henry's "Enough" reply to a direct question —
    // and it went unnoticed for two further regeneration rounds. Catches the
    // clearest shape of that bug: a question from HAZEL with NOTHING spoken
    // after it at all. Refined same day: originally also failed on a HAZEL
    // line immediately following a HAZEL question, which wrongly flagged a
    // legitimate self-answered rhetorical question ("Wait— they're
    // retreating?" ... "No. Watch...") — a real, common pattern, not a
    // dropped-line bug. A same-speaker follow-up is now allowed; only a
    // question with zero lines after it anywhere in the dialogue fails.
    // Catching a *wrong* reply from a different speaker (content-level, not
    // structural) is what the mandatory manual pass-two read is for.
    name: "every-hazel-question-gets-a-reply",
    appliesTo: (clip) => /HAZEL[^"]*"[^"]*\?"/.test(clip.dialogue || ""),
    check: (_p, clip) => {
      const lines = [...(clip.dialogue || "").matchAll(/\[?([A-Za-z][A-Za-z0-9 ]*)\]?\s*\([^)]*\)\s*:\s*"([^"]+)"/g)];
      for (let i = 0; i < lines.length; i++) {
        const [, speaker, text] = lines[i];
        if (/hazel/i.test(speaker) && text.trim().endsWith("?") && !lines[i + 1]) return false;
      }
      return true;
    },
  },
  {
    // Added 2026-08-26 after clip 5 (owner-caught): the base SELFIE_CAMERA_NOTE
    // already says she must move forward, never stay rigidly face-on while
    // moving, but that's inherited boilerplate — it didn't stop the model
    // rendering her static/face-on while surrounding soldiers surged forward
    // past her in an active pursuit, which reads as her moving BACKWARD
    // relative to the crowd. Any clip that puts her inside a crowd's motion
    // (a pursuit, chase, charge she's swept into) must explicitly restate,
    // for HER specifically, that she is running forward in the same
    // direction and pace as everyone else — inherited camera-mode notes are
    // not enough on their own for this specific failure mode.
    name: "swept-into-crowd-motion-needs-explicit-forward-running",
    appliesTo: (clip) =>
      clip.cameraMode === "selfie" && /(pursuit|chase|swept (along|into)|surging past|surging around)/i.test(clip.scene + " " + clip.action),
    check: (p) => /she[^.]{0,80}(runs|running|sprint(s|ing)?|moves?)[^.]{0,40}(forward|same (direction|pace)|matching (the )?(pursuit|charge|pace))/i.test(p),
  },
];

function runStandingChecks(clip, prompt) {
  const results = STANDING_RULES.filter((r) => r.appliesTo(clip)).map((r) => ({ name: r.name, pass: r.check(prompt, clip) }));
  return { results, failed: results.filter((r) => !r.pass) };
}

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

  const { results, failed } = runStandingChecks(clip, prompt);
  for (const r of results) console.error(`[run_clip ${clip.n}] standing-check ${r.pass ? "PASS" : "FAIL"}: ${r.name}`);
  if (failed.length > 0) {
    console.log(JSON.stringify({ ok: false, klass: "standing-rule-violation", failed: failed.map((f) => f.name) }));
    process.exit(3);
  }

  if (args.dryRun) {
    console.log(JSON.stringify({ ok: true, dryRun: true, n: clip.n, prompt, duration: clip.duration, outPath, standingChecks: results }, null, 2));
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
