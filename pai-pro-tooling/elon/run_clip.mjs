#!/usr/bin/env node
// Episode "Elon origins" — clip runner with the mandatory §21 standing-rules
// gate (creative-direction.md §21: automated pass one; the manual pass two is
// done in-session before every submit). Wraps gen_video.mjs.
//
// Usage:
//   node run_clip.mjs --prompt-file prompts/clip1a.txt --out assets/clip1a.mp4 \
//     --duration 12 --image-refs url1,url2 [--hazel] [--boy] [--check-only]

import fs from "node:fs/promises";
import { spawn } from "node:child_process";

function parseArgs(argv) {
  const out = { hazel: false, boy: false, checkOnly: false, sameFrame: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--prompt-file") out.promptFile = argv[++i];
    else if (a === "--out") out.out = argv[++i];
    else if (a === "--duration") out.duration = argv[++i];
    else if (a === "--image-refs") out.imageRefs = argv[++i];
    else if (a === "--resolution") out.resolution = argv[++i];
    else if (a === "--hazel") out.hazel = true;
    else if (a === "--same-frame") out.sameFrame = true;
    else if (a === "--boy") out.boy = true;
    else if (a === "--check-only") out.checkOnly = true;
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
if (!args.promptFile || !args.out || !args.duration) {
  console.error("usage: node run_clip.mjs --prompt-file f --out clip.mp4 --duration N --image-refs urls [--hazel] [--boy] [--check-only]");
  process.exit(2);
}
const prompt = await fs.readFile(args.promptFile, "utf8");
const low = prompt.toLowerCase();
// Dialogue is allowed to carry the hospital/beating fact (owner decision
// 2026-08-27); VISUAL injury depiction is not. Scan outside quoted dialogue.
const outsideDialogue = low.replace(/"[^"]*"/g, " ");

const STANDING_RULES = [
  ["single-take clause (§7/§16)", () => low.includes("single continuous unbroken shot") && low.includes("no cuts")],
  ["no-camera-device negative (§16 prompt craft)", () => /no camera[^.]*visible/.test(low)],
  // The frozen identity string's own canonical negative ("NOT fair-ivory or
  // porcelain") is allowed; any OTHER use of the v3-era words is a violation.
  ["v3-era skin words banned outside the canonical negative (porcelain/rosy)", () => {
    const scrubbed = low.replaceAll("not fair-ivory or porcelain", "");
    return !scrubbed.includes("porcelain") && !scrubbed.includes("rosy");
  }],
  ["no visible-injury words outside dialogue (owner 2026-08-27)", () => !/bruise|scab|wound|blood|injur/.test(outsideDialogue)],
  // Option A (2026-08-27) barred adult+child composites after PAI's image
  // filter blocked them. Owner correction 2026-08-28 orders the opening shot
  // WITH the boy visible behind Hazel, so same-frame is allowed only behind
  // the explicit --same-frame flag (Seedance video is untested for this —
  // if its filter also refuses, fall back to option A and report).
  ["adult+child same frame needs the explicit --same-frame flag (owner order 2026-08-28)", () => !(args.hazel && args.boy) || args.sameFrame],
  ["duration inside engine cap (Seedance 2.5: 4-30s, owner engine directive 2026-08-27)", () => Number(args.duration) >= 4 && Number(args.duration) <= 30],
  ["aesthetic keywords block (§13 / lock rule 5)", () => low.includes("kodak portra") && low.includes("not 3d render")],
];
const HAZEL_RULES = [
  ["frozen identity anchors present", () => low.includes("light-hazel") && low.includes("bronde balayage") && low.includes("golden-tan") && low.includes("not fair-ivory")],
  ["matte/gritty clause (lock rule 5)", () => low.includes("matte, not glossy")],
  ["no-eye-makeup rule (as-filmed canon)", () => low.includes("no eye makeup")],
  ["5 master refs attached", () => (args.imageRefs || "").split(",").filter(Boolean).length >= 5],
  ["forward-walk rule when walking (§14)", () => !low.includes("walk") || low.includes("not walking backward")],
];
const BOY_RULES = [
  ["ACTOR-12 ref attached (recast 2026-08-27)", () => (args.imageRefs || "").includes("e3484fc2-78d2-4e39-a9e3-350820b781a2")],
];

const checks = [...STANDING_RULES, ...(args.hazel ? HAZEL_RULES : []), ...(args.boy ? BOY_RULES : [])];
const failures = checks.filter(([, fn]) => !fn()).map(([name]) => name);
if (failures.length) {
  console.log(JSON.stringify({ ok: false, gate: "standing-rules", failures }));
  process.exit(1);
}
console.error(`[run_clip] standing-rules gate: ${checks.length} checks PASSED`);
if (args.checkOnly) { console.log(JSON.stringify({ ok: true, gate: "standing-rules", checks: checks.length })); process.exit(0); }

// Owner standing order 2026-08-27: best quality — every clip renders 1080p.
const child = spawn("node", ["gen_video.mjs",
  "--prompt", prompt, "--out", args.out, "--duration", String(args.duration),
  "--resolution", args.resolution || "1080p",
  ...(args.imageRefs ? ["--image-refs", args.imageRefs] : []),
], { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 1));
