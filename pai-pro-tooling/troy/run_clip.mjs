#!/usr/bin/env node
// Episode 7 (Troy) — assembles a full production prompt for one clip from
// clips.json + the standing CHARACTER_LOCK.md / creative-direction.md
// rules, then generates it via gen_video.mjs's underlying client calls.
//
// Usage: node run_clip.mjs --index 1 [--dry-run]

import fs from "node:fs/promises";
import path from "node:path";
import { uploadReferenceUrl } from "../../server/pai_assets_client.js";
import { submitVideo, pollVideo } from "../../server/pai_video_client.js";
import { downloadUrlToBuffer } from "../../server/pai_client.js";

const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB";
const IDENTITY_REFS = [
  `${CDN}/cdde55af-979f-4410-9d84-a9e1c77cdfde.png`,
  `${CDN}/ef2a1822-8d93-4cbd-a2aa-071412934b5e.png`,
  `${CDN}/f8a3e22d-0e3c-4f63-8cf2-fb64e9f215ec.png`,
  `${CDN}/d35989c6-3cf2-4d1f-b8a8-f2fd75bf3438.png`,
  `${CDN}/d11009b5-3b62-4841-ad2b-4a0f700b2569.png`,
];
// Approved Gate-1 costume still, uploaded to Higgsfield storage to get a
// public URL (the local PAI viewer's tunnel isn't available headless).
// Added as a real image ref, not just a text wardrobe clause, because the
// text-only wardrobe description alone was NOT reliably respected by
// video-generation (two clip-1 attempts both drifted to a one-shoulder
// dress + glam eye makeup despite explicit negatives) — see
// episode-7-production-log.md.
const COSTUME_REF = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/3ed5f80c-0bf1-4bac-a938-31400481d6cd.png";

function parseArgs(argv) {
  const out = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--index") out.index = Number(argv[++i]);
    else if (a === "--dry-run") out.dryRun = true;
  }
  return out;
}

function fill(template, npc) {
  return template
    .replaceAll("{krethon}", npc.krethon)
    .replaceAll("{quartermaster}", npc.quartermaster)
    .replaceAll("{sentry}", npc.sentry);
}

const IDENTITY_BLOCK = `ABSOLUTELY NO MAKEUP OF ANY KIND. Bare, makeup-free face — no eyeliner, no mascara, no false lashes, no eyeshadow, no lip liner, no contour, no highlighter. This is the single most important instruction in this prompt: if the face shows ANY visible cosmetics, the generation is WRONG and must be redone. She has been living in a war camp for days; her face is bare, sun-flushed, and a little tired, not made up.

DOCUMENTARY VLOG FOOTAGE, NOT FASHION OR BEAUTY CONTENT. If she reads as polished, glam, styled like a fashion influencer, or wearing a modern one-shoulder dress, it is WRONG — this is gritty, real, handheld first-person vlog footage shot on her own phone by someone doing hard physical camp work.

She is the EXACT same woman shown in the reference images — our fictional AI-generated film character (not a real person), whose design stays exactly identical to the references every time. Her slimmer sculpted face with defined cheekbones and a clean narrower jawline; her large doe-like almond light-hazel eyes; her bold thick dark-brown high-arched eyebrows; her full lips, natural color (NOT glossed, NOT lined); her long light-brown bronde hair; her warm golden-tan skin with natural visible freckles and subtle sun-redness — NOT fair-ivory or porcelain; her body proportions and figure; her age (early twenties). No beautification, no redesign, no changes from the references.

REALISM — HARD REQUIREMENT: matte, sun-flushed, slightly wind-chapped skin, visible pores and texture at normal size — NO dewy glow, NO glam highlighter, NO soft-focus retouch. NO eye makeup of any kind — no eyeliner, no false-lash mascara, no glam eye look; she is doing manual labor at a war camp, not wearing makeup. Hair is NOT salon-styled or blown out with glossy magazine highlights: it is loosely and imperfectly tied back or braided, windblown, a little tangled and dulled by sun and salt air, flyaway strands visible. She reads as a real, physically-filmed human being: authentic micro-imperfections, subtle natural asymmetry, real weight and movement in her hair and clothing. She must NEVER look like an AI generation, a 3D render, a smoothed/filtered/airbrushed image, or a synthetic plastic AI face — 100% natural, human, and believable is the single most important requirement, non-negotiable.

WARDROBE (identity unchanged, wardrobe only, matches her established costume exactly) — READ CAREFULLY: a Bronze Age Greek chiton made from ONE rectangle of coarse undyed linen, worn wrapped around the body and pinned at BOTH shoulders with small plain bronze fibulae (simple straight pins, visible at each shoulder seam — NOT a single decorative ring/buckle on one side, NOT a modern one-shoulder cut). The rectangle drapes straight down from both shoulders, ungathered and unshaped through the body — a rectangle of cloth, not a tailored dress silhouette — cinched at the waist with a belt. Hem uneven, fabric worn, creased, a little dusty and sweat-stained from camp labor. Simple worn sandals.

Lighting is natural and directional with real shadow falloff, NOT flattering studio softbox beauty lighting. Color grade is muted, desaturated, unpolished — raw historical-documentary photojournalism, NOT a fashion/beauty editorial feel. RAW handheld footage, visible grain, natural imperfections, believable anatomy, real fabric texture. NOT 3D render, NOT beauty retouch, NOT plastic/AI-smoothed skin.

NO PHONE, CAMERA, RIG, GOPRO, STRAP, OR MOUNT IS EVER VISIBLE IN FRAME — NOT EVEN FOR A SINGLE FRAME, AND NOT EVEN DURING PHYSICAL ACTION. This is a first-person point-of-view shot, as if the viewer's own eyes are the lens floating at arm's length in front of her — there is no device for her to hold, check, or glance at, ever, including in any action/chaos beat. Both of her hands and both of her arms are always free to do whatever the physical action requires (gripping, hauling, kicking, catching someone) with nothing in them except what the scene explicitly describes her holding (a waterskin, a rope, a cord, etc. — never a phone or screen of any kind). Single continuous unbroken shot, one camera angle throughout, no cuts, no scene changes, real-time continuous take.`;

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.index) {
    console.error("usage: node run_clip.mjs --index 1 [--dry-run]");
    process.exit(2);
  }

  const spec = JSON.parse(await fs.readFile(new URL("./clips.json", import.meta.url), "utf-8"));
  const clip = spec.clips.find((c) => c.n === args.index);
  if (!clip) {
    console.error(`no clip with index ${args.index} in clips.json`);
    process.exit(2);
  }

  const scene = fill(clip.scene, spec.npc);
  const dialogue = fill(clip.dialogue, spec.npc);
  const action = fill(clip.action, spec.npc);

  const prompt = [
    IDENTITY_BLOCK,
    ``,
    `TIME OF DAY / LIGHTING (episode lighting lock — daylight and golden-hour ONLY, never fully dark): ${clip.timeOfDay}.`,
    ``,
    `SCENE: ${scene}`,
    ``,
    `DIALOGUE: ${dialogue}`,
    ``,
    `PHYSICAL ACTION / PACING: ${action}`,
    ``,
    `SOUND: ${clip.sound}.`,
  ].join("\n");

  const outPath = `assets/clip${clip.n}_v1.mp4`;
  console.error(`[run_clip ${clip.n}] duration=${clip.duration}s craft="${clip.craft}"`);
  console.error(`[run_clip ${clip.n}] prompt chars=${prompt.length}`);

  if (args.dryRun) {
    console.log(JSON.stringify({ ok: true, dryRun: true, n: clip.n, prompt, duration: clip.duration, outPath }, null, 2));
    return;
  }

  const imageAssetIds = [];
  for (const url of [...IDENTITY_REFS, COSTUME_REF, ...(clip.propRefs || [])]) {
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
