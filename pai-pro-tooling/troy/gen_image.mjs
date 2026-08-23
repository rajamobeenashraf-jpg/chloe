#!/usr/bin/env node
// Episode 7 (Troy) — raw image-edit-pro/image-generation-pro caller.
// Bypasses the canvas/viewer app (needs a browser+tunnel this headless
// session doesn't have) by calling PAI directly with public CDN reference
// URLs, per PROJECT_HANDOFF.md §4's documented workaround from earlier
// episodes.
//
// NOTE: calls callGenerate() directly rather than the shared
// generateImagePro() helper in server/pai_image_pro_client.js — that
// helper's extractMediaUrl() only recognizes outcome.media_urls,
// output_url, and the OpenAI chat-completions image shape. Observed
// 2026-08-20 (this session): image-edit-pro with 5 refs actually returned
// the STANDARD OpenAI Images API shape `{ data: [{ b64_json }] }`, a
// fourth variant not covered by that helper (or by the existing
// pai-pro-image-pro-response-shape.patch). Handling it locally here keeps
// the fix scoped to this episode's tooling rather than the shared engine
// client. Worth folding upstream at the next cross-episode doc merge.
//
// Usage:
//   node gen_image.mjs --prompt "..." --out assets/foo.png [--size 1024x1024] [--no-refs]

import fs from "node:fs/promises";
import path from "node:path";
import { callGenerate } from "../../server/pai_client.js";

const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB";
const DEFAULT_REFS = [
  `${CDN}/cdde55af-979f-4410-9d84-a9e1c77cdfde.png`, // turnaround sheet
  `${CDN}/ef2a1822-8d93-4cbd-a2aa-071412934b5e.png`, // face-detail sheet
  `${CDN}/f8a3e22d-0e3c-4f63-8cf2-fb64e9f215ec.png`, // movie frame: aftermath
  `${CDN}/d35989c6-3cf2-4d1f-b8a8-f2fd75bf3438.png`, // movie frame: costume
  `${CDN}/d11009b5-3b62-4841-ad2b-4a0f700b2569.png`, // movie frame: irony close-up
];

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--prompt") out.prompt = argv[++i];
    else if (a === "--out") out.out = argv[++i];
    else if (a === "--size") out.size = argv[++i];
    else if (a === "--refs") out.refs = argv[++i].split(",");
    else if (a === "--no-refs") out.noRefs = true;
  }
  return out;
}

function extractImageBytes(body) {
  // 1. Documented shape: outcome.media_urls[0].url (or plain string)
  const media = body?.outcome?.media_urls;
  if (Array.isArray(media) && media.length > 0) {
    const first = media[0];
    const url = typeof first === "string" ? first : first?.url;
    if (url) return { kind: "url", value: url };
  }
  if (typeof body?.output_url === "string" && body.output_url) {
    return { kind: "url", value: body.output_url };
  }
  if (typeof body?.outcome?.output_url === "string" && body.outcome.output_url) {
    return { kind: "url", value: body.outcome.output_url };
  }
  // 2. OpenAI chat-completions shape (observed on image-generation-pro,
  //    per creative-direction.md engine facts).
  const chatImages = body?.choices?.[0]?.message?.images;
  if (Array.isArray(chatImages) && chatImages.length > 0) {
    const url = chatImages[0]?.image_url?.url;
    if (typeof url === "string" && url) return { kind: "url", value: url };
  }
  // 3. Standard OpenAI Images API shape: { data: [{ b64_json | url }] }
  //    — observed 2026-08-20 on image-edit-pro with 5 image refs.
  const data = body?.data;
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0];
    if (typeof first?.b64_json === "string" && first.b64_json) {
      return { kind: "b64", value: first.b64_json };
    }
    if (typeof first?.url === "string" && first.url) {
      return { kind: "url", value: first.url };
    }
  }
  return null;
}

async function downloadUrlToBuffer(url, timeoutMs = 120_000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(t);
  }
}

const args = parseArgs(process.argv.slice(2));
if (!args.prompt || !args.out) {
  console.error("usage: node gen_image.mjs --prompt \"...\" --out path.png [--size 1024x1024] [--refs url1,url2] [--no-refs]");
  process.exit(2);
}

const refImageUrls = args.noRefs ? [] : (args.refs || DEFAULT_REFS);
const size = args.size || "1024x1024";
const model = refImageUrls.length > 0 ? "image-edit-pro" : "image-generation-pro";

console.error(`[gen_image] model=${model} prompt chars=${args.prompt.length} refs=${refImageUrls.length} size=${size}`);

const payload = {
  prompt: args.prompt,
  size,
  quality: "high",
  n: 1,
  output_format: "png",
};
if (refImageUrls.length === 1) payload.image = refImageUrls[0];
else if (refImageUrls.length > 1) payload.image = refImageUrls;

try {
  const body = await callGenerate({ model, payload, timeoutMs: 600_000, logTag: "gen_image" });
  const extracted = extractImageBytes(body);
  if (!extracted) {
    console.log(JSON.stringify({
      ok: false,
      klass: "transient",
      message: "no recognized image shape in response",
      bodyKeys: Object.keys(body || {}),
    }));
    process.exit(1);
  }
  const bytes = extracted.kind === "b64"
    ? Buffer.from(extracted.value, "base64")
    : await downloadUrlToBuffer(extracted.value);
  if (!bytes.length) throw new Error("downloaded/decoded image bytes are empty");

  await fs.mkdir(path.dirname(args.out), { recursive: true });
  await fs.writeFile(args.out, bytes);
  console.log(JSON.stringify({ ok: true, out: args.out, model, size, bytes: bytes.length }));
} catch (e) {
  console.log(JSON.stringify({ ok: false, klass: e.klass || "unknown", message: e.message }));
  process.exit(1);
}
