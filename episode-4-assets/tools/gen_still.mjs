// Ep4 headless still generator. No tunnel available in this container, so refs
// go inline: image-edit-pro gets data: URIs (probe), image-generation gets
// fileData inline parts with explicit mimeType (Episode 1's validated path).
// Usage: node gen_still.mjs --mode <edit-pro|standard> --prompt-file <p.txt> --out <name.png> [--size 1024x1536|--aspect 9:16]
import fs from "node:fs";
import path from "node:path";
import { callGenerate } from "/home/user/pai-pro/server/pai_client.js";

const args = {};
for (let i = 2; i < process.argv.length; i += 2) args[process.argv[i].replace(/^--/, "")] = process.argv[i + 1];

const REF_DIR = "/home/user/pai-pro/projects/goldrush49/assets/refset";
// Owner-approved v5 ref set, hosted in the repo (SHA-pinned so URLs are immutable).
const REF_BASE = "https://raw.githubusercontent.com/rajamobeenashraf-jpg/chloe/6f936b1187ad9abc394cafa1eaafc8821913fcbf/character-refs";
const MASTERS = ["ref_08.png", "ref_09.png", "ref_10.png", "ref_01.png", "ref_06.png"]; // turnaround sheet, face sheet, movie frame, front portrait, profile
const MASTER_URLS = MASTERS.map((f) => `${REF_BASE}/${f}`);

const prompt = fs.readFileSync(args["prompt-file"], "utf8").trim();
const outPath = path.join("/home/user/pai-pro/projects/goldrush49/assets/images", args.out);
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const b64 = (f) => fs.readFileSync(path.join(REF_DIR, f)).toString("base64");

function saveFromBody(body) {
  // Shape 1: outcome.media_urls[0].url (documented edit-pro shape)
  const mu = body?.outcome?.media_urls?.[0]?.url || body?.media_urls?.[0]?.url;
  if (mu) return { kind: "url", value: mu };
  // Shape 2: OpenAI passthrough choices[].message.images[].image_url.url (data URI)
  const img = body?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (img?.startsWith("data:")) {
    fs.writeFileSync(outPath, Buffer.from(img.split(",", 2)[1], "base64"));
    return { kind: "file", value: outPath };
  }
  if (img) return { kind: "url", value: img };
  // Shape 3: Gemini-style candidates inlineData
  for (const cand of body?.candidates ?? []) {
    for (const part of cand?.content?.parts ?? []) {
      if (part?.inlineData?.data) {
        fs.writeFileSync(outPath, Buffer.from(part.inlineData.data, "base64"));
        return { kind: "file", value: outPath };
      }
    }
  }
  return null;
}

const mode = args.mode || "standard";
let body;
if (mode === "edit-pro") {
  body = await callGenerate({
    model: "image-edit-pro",
    payload: {
      prompt,
      size: args.size || "1024x1536",
      quality: "high",
      n: 1,
      output_format: "png",
      image: MASTER_URLS,
    },
    timeoutMs: 600_000,
  });
} else {
  // Inline bytes use inlineData{mimeType,data} (~5-ref upstream cap = exactly our 5 masters).
  // (Episode 1's fileData+mimeType quirk applies to URL refs, which need a tunnel we don't have.)
  const parts = MASTERS.map((f) => ({ inlineData: { mimeType: "image/png", data: b64(f) } }));
  parts.push({ text: prompt });
  body = await callGenerate({
    model: "image-generation",
    payload: {
      contents: [{ role: "user", parts }],
      generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: args.aspect || "9:16" } },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
      ],
    },
    timeoutMs: 300_000,
  });
}

const saved = saveFromBody(body);
if (!saved) {
  console.log(JSON.stringify({ ok: false, note: "no image in response", body: JSON.stringify(body).slice(0, 800) }));
  process.exit(1);
}
if (saved.kind === "url") {
  // Download the hosted result locally too.
  const res = await fetch(saved.value);
  fs.writeFileSync(outPath, Buffer.from(await res.arrayBuffer()));
  console.log(JSON.stringify({ ok: true, out: outPath, hosted_url: saved.value }));
} else {
  console.log(JSON.stringify({ ok: true, out: outPath, hosted_url: null }));
}
