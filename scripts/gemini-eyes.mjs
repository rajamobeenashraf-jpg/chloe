#!/usr/bin/env node
// gemini-eyes.mjs — a narrow "second pair of eyes" for video work.
//
// Claude Code stays the director. This script only answers one question:
// "what do you SEE (and hear) in this video?" — via Google's Gemini API,
// which natively understands video (motion, lip-sync, continuity) in a way
// a text- or frame-based workflow can miss. It never makes creative
// decisions; it reports observations for the director to act on.
//
// Usage:
//   node scripts/gemini-eyes.mjs --file render.mp4 [--mode qc] [--image master.png] [--prompt "extra context"]
//   node scripts/gemini-eyes.mjs --youtube https://youtu.be/XXXX [--mode study]
//   node scripts/gemini-eyes.mjs --list-models
//
// Modes:
//   qc      (default for --file)     frame-level defect hunt on our own renders
//   study   (default for --youtube)  reverse-engineer a reference video's craft
//   custom                           use --prompt as the entire instruction
//
// Env:
//   GEMINI_API_KEY   required — free at https://aistudio.google.com/apikey
//                    (add it in claude.ai -> Claude Code -> your environment ->
//                    environment variables; NEVER commit it to the repo)
//   GEMINI_MODEL     optional — default gemini-2.5-flash (see --list-models)
//
// Transport is curl so the sandbox HTTPS proxy is honored automatically.

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { basename, extname } from 'node:path';
import process from 'node:process';

const BASE = 'https://generativelanguage.googleapis.com';
const KEY = process.env.GEMINI_API_KEY;

const VIDEO_MIME = {
  '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm',
  '.mkv': 'video/x-matroska', '.avi': 'video/x-msvideo', '.mpg': 'video/mpeg', '.mpeg': 'video/mpeg',
};
const IMAGE_MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

const PROMPTS = {
  qc: `You are the visual quality-control inspector for an AI-generated historical vlog channel. Watch the attached video with extreme attention to detail and report ONLY what you can actually see and hear — no guesses, no compliments-first padding.

If a reference image of the main character is attached, treat it as the identity master and compare every shot against it.

Report each issue as: [MM:SS] SEVERITY — description. Severity scale: BLOCKER (would make a viewer comment "AI slop"), FIX (visible flaw worth a regen), MINOR (acceptable if deadline-pressed).

Check, in order:
1. AI artifacts — face/hand morphing, extra or fused fingers, flicker, warped or gibberish text, objects appearing/vanishing/melting, impossible physics, background people distorting.
2. Character consistency — face, hair color/style, eye color, build identical in every shot; flag any shot where she reads as a different person.
3. Lip-sync — timestamps where mouth movement does not match the spoken words.
4. Continuity — outfit, props, lighting, weather, time-of-day mismatches between consecutive shots.
5. Era accuracy — any visible anachronism in clothing, objects, architecture, signage for the period depicted.
6. Motion realism — walking gait, hand-object interaction, camera moves that betray AI generation.
7. Audio — abrupt music cuts, music drowning dialogue, missing ambience, audio/video drift.
8. On-screen text and captions if present — typos, timing, readability against the background.

End with:
- VERDICT: READY TO PUBLISH or FIX FIRST
- The three highest-impact fixes, ranked.
- Anything genuinely strong worth protecting in a re-edit.`,

  study: `You are reverse-engineering this video's craft for a competing channel. Watch it fully and produce a timestamped breakdown of HOW it is made — technique, not topic summary.

1. Hook (first 3 seconds): exactly what is shown, said, and any on-screen text; why it stops the scroll.
2. Structure: scene-by-scene list with timestamps and the narrative job of each beat.
3. Shot craft: camera styles used (selfie, POV, wide, insert), estimated average shot length, where the edit speeds up or slows down.
4. Transitions and effects: cuts, whip-pans, zooms, speed ramps — with timestamps.
5. Text overlays and captions: style, placement, when and why they appear.
6. Sound design: music changes, sound effects, moments of silence, how audio drives emotion.
7. Emotional beat map: where humor, tension, awe, dread, or warmth land, and what editing choice creates each.
8. Retention devices: open loops, foreshadowing, payoffs, pattern interrupts, end-screen hook.

Finish with "STEAL THIS:" — the 5 most concrete, reusable techniques observed (specific, not generic advice).`,
};

const HELP = `gemini-eyes — Gemini-powered video QC / reference study (see header of this file)

  --file <path>       analyze a local render (default mode: qc)
  --youtube <url>     analyze a public YouTube video (default mode: study)
  --image <path>      attach a reference image (repeatable; e.g. the character master)
  --mode <m>          qc | study | custom
  --prompt <text>     extra context (qc/study) or the whole instruction (custom)
  --model <id>        override model (default: $GEMINI_MODEL or gemini-2.5-flash)
  --list-models       list models available to your key
  --help              this text

Requires GEMINI_API_KEY (free key: https://aistudio.google.com/apikey).`;

function die(msg) {
  console.error(`\ngemini-eyes: ${msg}`);
  process.exit(1);
}

const auth = () => ({ 'x-goog-api-key': KEY });

function curlJson(method, url, { body, headers = {}, maxTime = 600 } = {}) {
  const args = ['-sS', '--max-time', String(maxTime), '-X', method, '-w', '\n%{http_code}', url];
  for (const [k, v] of Object.entries(headers)) args.push('-H', `${k}: ${v}`);
  let input;
  if (body !== undefined) {
    args.push('-H', 'Content-Type: application/json', '--data-binary', '@-');
    input = JSON.stringify(body);
  }
  const out = execFileSync('curl', args, { encoding: 'utf8', input, maxBuffer: 256 * 1024 * 1024 });
  const nl = out.lastIndexOf('\n');
  const status = Number(out.slice(nl + 1));
  const text = out.slice(0, nl);
  let json = null;
  try { json = JSON.parse(text); } catch { /* non-JSON error body */ }
  return { status, json, text };
}

function apiError({ status, json, text }, what) {
  const msg = json?.error?.message || text.slice(0, 300);
  if (status === 400 && /API key not valid/i.test(msg)) {
    die('GEMINI_API_KEY is set but invalid — re-check it at https://aistudio.google.com/apikey');
  }
  if (status === 404) die(`${what}: not found (${msg}). If this is the model, run --list-models and set GEMINI_MODEL or --model.`);
  if (status === 429) die(`${what}: rate/quota limit (${msg}). Wait a minute and retry, or use a lighter model / enable billing on the key.`);
  die(`${what} failed (HTTP ${status}): ${msg}`);
}

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

function listModels() {
  const r = curlJson('GET', `${BASE}/v1beta/models?pageSize=100`, { headers: auth(), maxTime: 60 });
  if (r.status !== 200) apiError(r, 'list models');
  for (const m of r.json.models || []) {
    if ((m.supportedGenerationMethods || []).includes('generateContent')) {
      console.log(m.name.replace('models/', ''));
    }
  }
}

// Files API resumable upload: start session -> send bytes -> wait until Google
// finishes server-side video processing (state ACTIVE).
function uploadVideo(path) {
  if (!existsSync(path)) die(`no such file: ${path}`);
  const mime = VIDEO_MIME[extname(path).toLowerCase()];
  if (!mime) die(`unsupported video type "${extname(path)}" (supported: ${Object.keys(VIDEO_MIME).join(' ')})`);
  const size = statSync(path).size;
  process.stderr.write(`uploading ${basename(path)} (${(size / 1e6).toFixed(1)} MB)...\n`);

  const start = execFileSync('curl', ['-sS', '--max-time', '120', '-i', '-X', 'POST',
    `${BASE}/upload/v1beta/files`,
    '-H', `x-goog-api-key: ${KEY}`,
    '-H', 'X-Goog-Upload-Protocol: resumable',
    '-H', 'X-Goog-Upload-Command: start',
    '-H', `X-Goog-Upload-Header-Content-Length: ${size}`,
    '-H', `X-Goog-Upload-Header-Content-Type: ${mime}`,
    '-H', 'Content-Type: application/json',
    '--data-binary', JSON.stringify({ file: { display_name: basename(path) } }),
  ], { encoding: 'utf8' });
  const m = start.match(/x-goog-upload-url:\s*(\S+)/i);
  if (!m) die(`upload session refused:\n${start.slice(0, 500)}`);

  const fin = execFileSync('curl', ['-sS', '--max-time', '900', '-X', 'POST', m[1],
    '-H', `Content-Length: ${size}`,
    '-H', 'X-Goog-Upload-Offset: 0',
    '-H', 'X-Goog-Upload-Command: upload, finalize',
    '--data-binary', `@${path}`,
  ], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  let file;
  try { file = JSON.parse(fin).file; } catch { die(`upload finalize failed:\n${fin.slice(0, 500)}`); }

  while (file.state === 'PROCESSING') {
    process.stderr.write('waiting for Google-side video processing...\n');
    sleep(5000);
    const r = curlJson('GET', `${BASE}/v1beta/${file.name}`, { headers: auth(), maxTime: 60 });
    if (r.status !== 200) apiError(r, 'file status');
    file = r.json;
  }
  if (file.state !== 'ACTIVE') {
    die(`Google could not process the video (state=${file.state}${file.error ? ', ' + JSON.stringify(file.error) : ''})`);
  }
  return { file_data: { mime_type: mime, file_uri: file.uri } };
}

function imagePart(path) {
  if (!existsSync(path)) die(`no such image: ${path}`);
  const mime = IMAGE_MIME[extname(path).toLowerCase()];
  if (!mime) die(`unsupported image type "${extname(path)}" (supported: ${Object.keys(IMAGE_MIME).join(' ')})`);
  return { inline_data: { mime_type: mime, data: readFileSync(path).toString('base64') } };
}

function generate(model, parts) {
  const r = curlJson('POST', `${BASE}/v1beta/models/${model}:generateContent`,
    { headers: auth(), body: { contents: [{ role: 'user', parts }] }, maxTime: 600 });
  if (r.status !== 200) apiError(r, 'generateContent');
  if (r.json.promptFeedback?.blockReason) die(`request was blocked: ${r.json.promptFeedback.blockReason}`);
  const cand = r.json.candidates?.[0];
  const text = (cand?.content?.parts || []).map((p) => p.text || '').join('');
  if (!text) die(`empty response (finishReason=${cand?.finishReason || 'unknown'})`);
  const u = r.json.usageMetadata || {};
  process.stderr.write(`\n[model=${model} tokens: prompt=${u.promptTokenCount ?? '?'} output=${u.candidatesTokenCount ?? '?'}]\n`);
  return text;
}

// --- main ---
const argv = process.argv.slice(2);
const opts = { images: [] };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const next = () => { if (i + 1 >= argv.length) die(`${a} needs a value`); return argv[++i]; };
  if (a === '--youtube') opts.youtube = next();
  else if (a === '--file') opts.file = next();
  else if (a === '--image') opts.images.push(next());
  else if (a === '--mode') opts.mode = next();
  else if (a === '--prompt') opts.prompt = next();
  else if (a === '--model') opts.model = next();
  else if (a === '--list-models') opts.list = true;
  else if (a === '--help' || a === '-h') { console.log(HELP); process.exit(0); }
  else die(`unknown option ${a} (see --help)`);
}

if (!KEY) {
  die(`GEMINI_API_KEY is not set.

Setup (one time):
  1. Get a free key: https://aistudio.google.com/apikey
  2. Add it as environment variable GEMINI_API_KEY
     - Claude Code on the web: claude.ai -> Claude Code -> your environment -> environment variables
     - locally: export GEMINI_API_KEY=...
  3. Never commit the key to the repo.

Until then, the wired-in fallbacks still work: vidIQ video_watch / watch_shortform_content
for reference videos, Higgsfield video_analysis + virality_predictor for our renders.`);
}

if (opts.list) { listModels(); process.exit(0); }

if (!!opts.youtube === !!opts.file) die('pass exactly one of --youtube <url> or --file <path> (or --list-models)');
const mode = opts.mode || (opts.file ? 'qc' : 'study');
if (!['qc', 'study', 'custom'].includes(mode)) die(`unknown mode "${mode}" (qc | study | custom)`);
if (mode === 'custom' && !opts.prompt) die('--mode custom requires --prompt');
if (opts.youtube && !/^https:\/\/((www\.|m\.)?youtube\.com|youtu\.be)\//.test(opts.youtube)) {
  die('--youtube expects a youtube.com or youtu.be URL');
}

const model = opts.model || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const parts = [];
parts.push(opts.youtube ? { file_data: { file_uri: opts.youtube } } : uploadVideo(opts.file));
for (const img of opts.images) parts.push(imagePart(img));

let instruction = mode === 'custom' ? opts.prompt : PROMPTS[mode];
if (mode !== 'custom' && opts.prompt) {
  instruction += `\n\nAdditional context from the director:\n${opts.prompt}`;
}
parts.push({ text: instruction });

console.log(generate(model, parts));
