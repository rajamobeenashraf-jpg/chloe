#!/usr/bin/env node
// Episode 7 (Troy) — raw video-generation caller (submit + poll + download).
// Bypasses the canvas/viewer app for the same reason as gen_image.mjs.
//
// Usage:
//   node gen_video.mjs --prompt "..." --out assets/clip1.mp4 --duration 9 \
//     --image-refs url1,url2[,...] [--audio-refs url1] [--video-refs url1]
//
// Image refs are uploaded to PAI as assets first (CreateAsset -> poll
// Active), then referenced as asset://<id> in the video-generation submit,
// per creative-direction.md §16 engine facts.

import fs from "node:fs/promises";
import path from "node:path";
import { uploadReferenceUrl } from "../../server/pai_assets_client.js";
import { submitVideo, pollVideo } from "../../server/pai_video_client.js";
import { downloadUrlToBuffer } from "../../server/pai_client.js";

function parseArgs(argv) {
  const out = { duration: 9, resolution: "720p", aspectRatio: "9:16", generateAudio: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--prompt") out.prompt = argv[++i];
    else if (a === "--out") out.out = argv[++i];
    else if (a === "--duration") out.duration = Number(argv[++i]);
    else if (a === "--image-refs") out.imageRefs = argv[++i].split(",").filter(Boolean);
    else if (a === "--audio-refs") out.audioRefs = argv[++i].split(",").filter(Boolean);
    else if (a === "--video-refs") out.videoRefs = argv[++i].split(",").filter(Boolean);
    else if (a === "--resolution") out.resolution = argv[++i];
    else if (a === "--ratio") out.aspectRatio = argv[++i];
    else if (a === "--no-audio") out.generateAudio = false;
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
if (!args.prompt || !args.out) {
  console.error("usage: node gen_video.mjs --prompt \"...\" --out path.mp4 --duration 9 --image-refs url1,url2");
  process.exit(2);
}
if (args.duration < 1.8 || args.duration > 15.2) {
  console.error(`duration ${args.duration} outside PAI hard range 1.8-15.2s`);
  process.exit(2);
}

async function uploadAll(urls, kind) {
  if (!urls || !urls.length) return [];
  const ids = [];
  for (const url of urls) {
    console.error(`[gen_video] uploading ${kind} ref: ${url}`);
    const id = await uploadReferenceUrl(url, kind);
    ids.push(id);
  }
  return ids;
}

try {
  const imageAssetIds = await uploadAll(args.imageRefs, "image");
  const audioAssetIds = await uploadAll(args.audioRefs, "audio");
  const videoAssetIds = await uploadAll(args.videoRefs, "video");

  console.error(`[gen_video] submitting: dur=${args.duration}s image_refs=${imageAssetIds.length} ratio=${args.aspectRatio}`);
  const { taskId } = await submitVideo({
    prompt: args.prompt,
    duration: args.duration,
    aspectRatio: args.aspectRatio,
    resolution: args.resolution,
    generateAudio: args.generateAudio,
    imageAssetIds,
    audioAssetIds,
    videoAssetIds,
  });
  console.error(`[gen_video] submitted taskId=${taskId}, polling...`);

  const { videoUrl, durationSeconds } = await pollVideo(taskId, {
    onProgress: ({ status, elapsedSec }) => {
      console.error(`[gen_video] poll status=${status} elapsed=${elapsedSec}s`);
    },
  });

  const bytes = await downloadUrlToBuffer(videoUrl, { timeoutMs: 180_000 });
  await fs.mkdir(path.dirname(args.out), { recursive: true });
  await fs.writeFile(args.out, bytes);

  console.log(JSON.stringify({
    ok: true,
    out: args.out,
    taskId,
    videoUrl,
    durationSeconds,
    bytes: bytes.length,
  }));
} catch (e) {
  console.log(JSON.stringify({ ok: false, klass: e.klass || "unknown", message: e.message }));
  process.exit(1);
}
