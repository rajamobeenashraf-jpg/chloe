#!/usr/bin/env node
// One-off: dramatic assassination-scene thumbnail via the Scene Transplant
// lifestyle pipeline (CHARACTER_LOCK.md "LIFESTYLE PIPELINE" section) —
// off-episode content (thumbnails) must never regenerate her face from
// references; instead edit the SCENE around a real, already-filmed frame,
// identity-preserving edit only.

import fs from "node:fs/promises";
import path from "node:path";
import { callGenerate } from "../../server/pai_client.js";

async function generateImagePro({ prompt, size, outputFormat, refImageUrls }) {
  const payload = {
    prompt,
    size,
    quality: "high",
    n: 1,
    output_format: outputFormat,
    image: refImageUrls.length === 1 ? refImageUrls[0] : refImageUrls,
  };
  const body = await callGenerate({
    model: "image-edit-pro",
    payload,
    timeoutMs: 600_000,
    logTag: "pai-image-pro-ep6-thumb",
  });

  const b64 = body?.data?.[0]?.b64_json;
  if (typeof b64 === "string" && b64) {
    return { bytes: Buffer.from(b64, "base64"), model: "image-edit-pro (data[].b64_json shape)" };
  }
  const mediaUrl = body?.outcome?.media_urls?.[0]?.url || body?.outcome?.media_urls?.[0];
  if (typeof mediaUrl === "string" && mediaUrl) {
    const res = await fetch(mediaUrl);
    return { bytes: Buffer.from(await res.arrayBuffer()), model: "image-edit-pro (media_urls shape)" };
  }
  const chatUrl = body?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (typeof chatUrl === "string" && chatUrl.startsWith("data:")) {
    const comma = chatUrl.indexOf(",");
    return { bytes: Buffer.from(chatUrl.slice(comma + 1), "base64"), model: "image-edit-pro (chat-passthrough shape)" };
  }
  throw new Error("image-edit-pro returned 200 with an unrecognized body shape: " + JSON.stringify(body).slice(0, 500));
}

const SOURCE_IMAGE_URL = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/20f6357d-50f0-407b-9431-3b92040ccb80.png";

// Scene Transplant recipe, CHARACTER_LOCK.md step 3, opening block verbatim.
const IDENTITY_LOCK = `EDIT THIS IMAGE — the input image shows our fictional AI-generated film character (not a real person). This is an identity-preserving scene edit, NOT a new generation. HARD RULE: her character design must stay EXACTLY identical to the input image, with zero deviation — her slimmer sculpted face with defined cheekbones and narrow jawline, large doe-like almond light-hazel eyes, bold thick dark-brown high-arched eyebrows, full lips with glossy nude-caramel tint, long light-brown bronde balayage hair, warm golden-tan skin tone with natural visible freckles. Do NOT repaint, regenerate, beautify, smooth, slim, or restyle her face.`;

const MAKEUP_DIAL = `Skin finish: no additional makeup coverage — as-filmed matte skin with her natural freckles fully visible, per her locked identity. No added gloss, no beautification.`;

const SCENE = `Scene/wardrobe/pose: keep her exact expression and pose from the input image unchanged (facing camera, alarmed, mouth open). Replace ONLY the background behind her: a chaotic scene on the marble steps of the Roman Senate, 44 BC — several senators in togas surrounding an older robed man (Julius Caesar) just behind and to the side of her, one arm raised with a dagger blade catching hard directional light, torn and blood-marked white togas, other senators recoiling and fleeing in a blur of motion, dust and chaos in the air, dramatic hard afternoon sunlight with strong shadows. She herself is not holding any weapon and is not touching anyone — she is a horrified bystander in the foreground, the violence unfolding behind her.`;

const REALISM = `Documentary photograph, RAW 35mm Kodak Portra 400 color, natural photographic lighting, visible skin pores and fine vellus facial hair, natural subtle human imperfections, believable anatomy, real fabric texture. NOT 3D render, smoothed-skin filter, beauty retouch, plastic skin, AI-generated look, synthetic/artificial appearance.`;

async function main() {
  const outDir = path.join(process.cwd(), "assets");
  await fs.mkdir(outDir, { recursive: true });

  const prompt = [IDENTITY_LOCK, MAKEUP_DIAL, SCENE, REALISM].join("\n\n");

  process.stdout.write("Generating dramatic thumbnail scene edit...\n");
  try {
    const result = await generateImagePro({
      prompt,
      size: "720x1280",
      outputFormat: "png",
      refImageUrls: [SOURCE_IMAGE_URL],
    });
    const outPath = path.join(outDir, "thumbnail_ep6_dramatic_scene.png");
    await fs.writeFile(outPath, result.bytes);
    process.stdout.write(`  -> ${outPath} (${result.bytes.length} bytes, model=${result.model})\n`);
  } catch (e) {
    process.stdout.write(`  !! FAILED: ${e?.klass || ""} ${e?.message || e}\n`);
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
