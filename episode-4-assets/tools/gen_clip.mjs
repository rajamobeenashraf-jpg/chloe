// Ep4 clip generator: uploads repo-hosted refs as PAI video assets (cached),
// submits video-generation, polls to terminal, streams the MP4 to disk.
// Usage: node gen_clip.mjs --clip <1-12> [--extra-ref-url <url>] [--out <name.mp4>] [--resolution 720p]
import fs from "node:fs";
import path from "node:path";
import { submitVideo, pollVideo } from "/home/user/pai-pro/server/pai_video_client.js";
import { uploadReferenceUrl } from "/home/user/pai-pro/server/pai_assets_client.js";
import { CLIPS, buildPrompt } from "./prompts/clips.mjs";

const args = {};
for (let i = 2; i < process.argv.length; i += 2) args[process.argv[i].replace(/^--/, "")] = process.argv[i + 1];

const PROJ = "/home/user/pai-pro/projects/goldrush49";
const REF_BASE = "https://raw.githubusercontent.com/rajamobeenashraf-jpg/chloe/6f936b1187ad9abc394cafa1eaafc8821913fcbf/character-refs";
const MASTER_URLS = ["ref_08.png", "ref_09.png", "ref_10.png", "ref_01.png", "ref_06.png"].map((f) => `${REF_BASE}/${f}`);

const clip = CLIPS.find((c) => c.n === Number(args.clip));
if (!clip) { console.error("unknown clip", args.clip); process.exit(1); }

// Asset-id cache survives across runs (CreateAsset group TTL ~1h server-side;
// on NotFound.group_id errors delete the cache file and rerun).
const CACHE = path.join(PROJ, ".asset_ids.json");
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, "utf8")) : {};
async function assetIdFor(url) {
  if (cache[url]) return cache[url];
  const id = await uploadReferenceUrl(url, "image");
  cache[url] = id;
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
  return id;
}

// Approved gate-1 gritty costume stills, repo-hosted (wardrobe anchors).
const STILL_BASE = "https://raw.githubusercontent.com/rajamobeenashraf-jpg/chloe/4b9e28cd6a46b1f8fa3c863a58dd0c0de908b72d/episode-4-assets/stills";
const COSTUME_URL = clip.wardrobe === "arrival"
  ? `${STILL_BASE}/still_arrival_v2_gritty.png`
  : `${STILL_BASE}/still_workkit_v3_gritty.png`;

const refUrls = [...MASTER_URLS, COSTUME_URL];
if (args["extra-ref-url"]) refUrls.push(...args["extra-ref-url"].split(","));

const imageAssetIds = [];
for (const u of refUrls) imageAssetIds.push(await assetIdFor(u));
console.log(`[clip ${clip.n}] ${imageAssetIds.length} image refs ready`);

const prompt = buildPrompt(clip);
fs.mkdirSync(path.join(PROJ, "prompts/rendered"), { recursive: true });
fs.writeFileSync(path.join(PROJ, `prompts/rendered/clip${String(clip.n).padStart(2, "0")}.txt`), prompt);

const { taskId } = await submitVideo({
  prompt,
  duration: clip.duration,
  aspectRatio: "9:16",
  resolution: args.resolution || "720p",
  generateAudio: true,
  imageAssetIds,
});
console.log(`[clip ${clip.n}] submitted task ${taskId} (${clip.duration}s @ 9:16)`);

const { videoUrl, durationSeconds } = await pollVideo(taskId, {
  onProgress: ({ status, elapsedSec }) => { if (elapsedSec % 30 < 5) console.log(`  ...${status} ${Math.round(elapsedSec)}s`); },
});
console.log(`[clip ${clip.n}] SUCCESS in ${Math.round(durationSeconds)}s`);

const outName = args.out || `clip${String(clip.n).padStart(2, "0")}_v1.mp4`;
const outPath = path.join(PROJ, "assets/videos", outName);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
const res = await fetch(videoUrl);
if (!res.ok) { console.error("download failed", res.status, videoUrl); process.exit(1); }
fs.writeFileSync(outPath, Buffer.from(await res.arrayBuffer()));
console.log(JSON.stringify({ ok: true, clip: clip.n, out: outPath, hosted_url: videoUrl }));
