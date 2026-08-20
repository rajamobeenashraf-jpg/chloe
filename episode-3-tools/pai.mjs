#!/usr/bin/env node
// Minimal raw PAI client for Episode 3 headless production.
// Contract: pai-pro/docs/api_service.md. Auth: PAI_KEY from pai-pro/.env
// (never printed, never committed).
//
// Commands:
//   node pai.mjs still --prompt-file p.txt --ref URL [--ref URL ...] [--size 1440x2560] --out out.png
//   node pai.mjs asset-group
//   node pai.mjs asset --group ID --url URL --type Image|Video|Audio --name NAME
//   node pai.mjs video --prompt-file p.txt --image-asset ID [...] [--video-asset ID] \
//                      --duration N [--ratio 9:16] [--resolution 720p] --out clip.mp4
//   node pai.mjs status --job ID [--out clip.mp4]        (single check or download)

import fs from "node:fs";
import path from "node:path";

const envFile = "/home/user/pai-pro/.env";
for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const BASE = (process.env.PAI_API_BASE || "https://api.pai-pro.utopaistudios.com").replace(/\/+$/, "");
const KEY = process.env.PAI_KEY;
if (!KEY) { console.error(JSON.stringify({ ok: false, error: "PAI_KEY missing" })); process.exit(1); }

const [cmd, ...rest] = process.argv.slice(2);
const args = {};
for (let i = 0; i < rest.length; i += 2) {
  const k = rest[i].replace(/^--/, "");
  if (args[k] !== undefined) { args[k] = [].concat(args[k], rest[i + 1]); }
  else args[k] = rest[i + 1];
}
const list = v => (v === undefined ? [] : [].concat(v));

async function api(pathname, body, method = "POST") {
  const res = await fetch(BASE + pathname, {
    method,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 500)}`);
  return json;
}

async function download(url, out) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  return fs.statSync(out).size;
}

function done(obj) { console.log(JSON.stringify(obj, null, 1)); }

try {
  const readPrompt = () => {
    let p = fs.readFileSync(args["prompt-file"], "utf8");
    if (args.block) p = p.trimEnd() + "\n\n" + fs.readFileSync(args.block, "utf8");
    return p;
  };

  if (cmd === "still") {
    const prompt = readPrompt();
    const refs = list(args.ref);
    const payload = {
      prompt, size: args.size || "1440x2560", quality: "high", n: 1,
      output_format: "png",
    };
    let model = "image-generation-pro";
    if (refs.length) { model = "image-edit-pro"; payload.image = refs; }
    const r = await api("/api/v1/generate", { model, payload });
    // Response shapes seen in the wild:
    //  a) documented: outcome.media_urls[0].url / output_url (https)
    //  b) 2026-08 gateway: OpenRouter-style chat.completion with
    //     choices[0].message.images[0].image_url.url (data: URI or https)
    const url = r?.outcome?.media_urls?.[0]?.url || r?.output_url || r?.outcome?.output_url
      || r?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!url) { done({ ok: false, resp: r }); process.exit(1); }
    let size = 0;
    if (args.out) {
      if (url.startsWith("data:")) {
        const b64 = url.slice(url.indexOf(",") + 1);
        fs.mkdirSync(path.dirname(args.out), { recursive: true });
        fs.writeFileSync(args.out, Buffer.from(b64, "base64"));
        size = fs.statSync(args.out).size;
      } else {
        size = await download(url, args.out);
      }
    }
    done({ ok: true, url: url.startsWith("data:") ? "(inline data URI)" : url, out: args.out, bytes: size });

  } else if (cmd === "asset-group") {
    const r = await api("/api/v1/generate", {
      model: "video-generation-assets",
      query_params: { Action: "CreateAssetGroup" },
      payload: { Name: "pai-pro", Description: "pai-pro", GroupType: "AIGC", ProjectName: "default" },
    });
    done({ ok: true, groupId: r?.Result?.Id, resp: r?.Result ? undefined : r });

  } else if (cmd === "asset") {
    const r = await api("/api/v1/generate", {
      model: "video-generation-assets",
      query_params: { Action: "CreateAsset" },
      payload: { GroupId: args.group, URL: args.url, AssetType: args.type || "Image",
                 Name: args.name || path.basename(new URL(args.url).pathname), ProjectName: "default" },
    });
    const id = r?.Result?.Id;
    if (!id) { done({ ok: false, resp: r }); process.exit(1); }
    // poll until Active
    for (let i = 0; i < 60; i++) {
      const g = await api("/api/v1/generate", {
        model: "video-generation-assets",
        query_params: { Action: "GetAsset" },
        payload: { Id: id },
      });
      const st = g?.Result?.Status;
      if (st === "Active") { done({ ok: true, assetId: id, status: st }); process.exit(0); }
      if (st === "Failed") { done({ ok: false, assetId: id, status: st, resp: g }); process.exit(1); }
      await new Promise(r2 => setTimeout(r2, 3000));
    }
    done({ ok: false, assetId: id, status: "poll-timeout" }); process.exit(1);

  } else if (cmd === "video") {
    const prompt = readPrompt();
    const content = [{ type: "text", text: prompt }];
    for (const id of list(args["image-asset"]))
      content.push({ type: "image_url", image_url: { url: `asset://${id}` }, role: "reference_image" });
    for (const id of list(args["video-asset"]))
      content.push({ type: "video_url", video_url: { url: `asset://${id}` }, role: "reference_video" });
    const r = await api("/api/v1/submit", {
      model: "video-generation",
      payload: {
        model: "pai-pro-video-endpoint-01",
        content,
        generate_audio: true,
        ratio: args.ratio || "9:16",
        duration: Number(args.duration || 8),
        resolution: args.resolution || "720p",
        watermark: false,
      },
    });
    if (!r?.job_id) { done({ ok: false, resp: r }); process.exit(1); }
    done({ ok: true, jobId: r.job_id, status: r.status });

  } else if (cmd === "status") {
    const r = await api(`/api/v1/task/status/${args.job}`, null, "GET");
    if (r.status === "SUCCESS" && args.out && r.output_url) {
      const size = await download(r.output_url, args.out);
      done({ ok: true, status: r.status, out: args.out, bytes: size, url: r.output_url });
    } else {
      done({ ok: r.status !== "FAILED", status: r.status, error_category: r.error_category, message: r.message, url: r.output_url });
    }

  } else {
    done({ ok: false, error: `unknown command: ${cmd}` }); process.exit(2);
  }
} catch (e) {
  done({ ok: false, error: String(e.message || e) });
  process.exit(1);
}
