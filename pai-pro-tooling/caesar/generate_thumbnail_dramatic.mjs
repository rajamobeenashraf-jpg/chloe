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

// v2: new source frame (clip1, clean/uncaptioned master) — the first
// attempt used an extreme selfie-close-up source, which the owner felt
// made her face too dominant over the drama. This source has a much
// more moderate framing (full upper body, lots of environment visible),
// which the edit's "keep her exact pose/framing" instruction carries
// through to the output.
const SOURCE_IMAGE_URL = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/e0fe0f9c-47f7-47e2-b08b-cf53ea4f80f2.png";

// Scene Transplant recipe, CHARACTER_LOCK.md step 3, opening block verbatim.
const IDENTITY_LOCK = `EDIT THIS IMAGE — the input image shows our fictional AI-generated film character (not a real person). This is an identity-preserving scene edit, NOT a new generation. HARD RULE: her character design must stay EXACTLY identical to the input image, with zero deviation — her slimmer sculpted face with defined cheekbones and narrow jawline, large doe-like almond light-hazel eyes, bold thick dark-brown high-arched eyebrows, full lips with glossy nude-caramel tint, long light-brown bronde balayage hair, warm golden-tan skin tone with natural visible freckles. Do NOT repaint, regenerate, beautify, smooth, slim, or restyle her face.`;

// v2: owner asked to "make her a little beautiful" — this maps directly
// onto CHARACTER_LOCK.md's own documented makeup-coverage-dial parameter
// (none / sheer glam / full-coverage glam), not a bone-structure change.
// "A little" -> sheer glam, not full-coverage: softens without erasing
// her established freckled, natural look.
const MAKEUP_DIAL = `Skin finish: sheer glam — a hint of her freckles still shows through the base, skin looks a little more polished and even-toned than fully as-filmed, but still reads as real skin at close range, not airbrushed or plastic. Bone structure, eye shape/color, nose, lip line, and jawline unchanged.`;

const SCENE = `Scene/wardrobe/pose: keep her exact expression, pose, and framing distance from the input image unchanged (facing camera, upper body visible, lots of surrounding environment in frame — do not zoom in tighter on her face than the input image). Replace ONLY the background behind her: a chaotic scene on the marble steps of the Roman Senate, 44 BC — several senators in togas surrounding an older robed man (Julius Caesar) in the middle distance behind her, one arm raised with a dagger blade catching hard directional light, torn and blood-marked white togas, other senators recoiling and fleeing in a blur of motion, dust and chaos in the air, dramatic hard afternoon sunlight with strong shadows. She herself is not holding any weapon and is not touching anyone — she is a horrified bystander, small relative to the wide dramatic scene around her, the violence unfolding at a distance behind her.`;

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
    const outPath = path.join(outDir, "thumbnail_ep6_dramatic_scene_v2.png");
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
