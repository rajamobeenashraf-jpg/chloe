# HAZEL — Fashion · Beauty · Lifestyle page — brand kit

Second page for Hazel (separate from the history channel *Hazel Out of Time*).
Positioning: **the AI it-girl** — fashion, beauty, glam and soft-luxury lifestyle.
Owner: Mobeen Ashraf. Created 2026-08-30 on branch `claude/hazel-social-media-assets-5x7u0j`.

Character basis: **v5 lock** (`CHARACTER_LOCK.md`) — all page assets generated from the
v5 master + approved 4-view set with the frozen v5 identity string. Never v4 footage,
never the v4-trained Soul. Glam/new-outfit looks are generation-eligible under
REAL-FOOTAGE-FIRST (they cannot exist in footage).

---

## 1. Page identity (proposed — owner picks final name/handle)

Handle availability CANNOT be verified from this environment — owner claims handles
himself on each platform. Use the SAME handle everywhere if free.

| Option | Page name | Handle | Why |
|---|---|---|---|
| A | **Hazel Off Duty** | `@hazel.offduty` / `@hazeloffduty` | Ties to the main brand: the time-travel host, off duty. Ownable, memorable. |
| B | **Styled by Hazel** | `@styledbyhazel` | Reads instantly as fashion/beauty; strong search intent. |
| C | **Hazel in Style** | `@hazelinstyle` | Simple, classic fashion-page naming. |

- **Category (FB/IG):** Digital creator
- **AI disclosure:** keep "AI it-girl / AI creator" visibly in every bio. Meta and
  TikTok both require realistic AI-generated content to be disclosed; owning it in the
  bio is also on-trend (top virtual influencers all do this) and protects the pages.
- Cross-link both directions: this page ↔ the history channel.

---

## 2. Bios & descriptions (final copy — paste-ready)

Replace `@hazel.outoftime` with the actual main-channel handle if it differs, and
`[email]` with the business contact email before publishing.

### Instagram — bio (≤150 chars incl. line breaks)
```
Your AI it-girl 💋
Fashion · Beauty · Lifestyle ✨
Time-traveler off duty — history side: @hazel.outoftime
💌 [email]
```

- **Name field (searchable, separate from username):** `Hazel | Fashion & Beauty`
- **Link:** link-in-bio page (Beacons/Linktree) → YouTube channel, TikTok, FB, main history page.

### TikTok — bio (≤80 chars)
```
Your AI it-girl 💋 fashion · beauty · lifestyle ✨ history me ↴
```
- TikTok allows ONE website link (business account) — point it at the link-in-bio page.
- Name field: `Hazel | Fashion & Beauty`

### Facebook — Intro/bio (≤101 chars)
```
Your AI it-girl 💋 Fashion, beauty & lifestyle — served daily ✨
```

### Facebook — About section (long description)
```
Hi, I'm Hazel — your AI it-girl. 💋

By night I time-travel through history on my other page, but here? Here it's all
fashion, beauty and the art of living pretty: outfit inspo, glam looks, styling
ideas, and a little luxury for your feed every single day.

I'm an AI-generated character — every look you see here is crafted, styled and
directed frame by frame. Think of me as your virtual best friend with an
unlimited closet.

New looks daily. History side of me: @hazel.outoftime
Business inquiries: [email]
```

### YouTube — channel description (About)
```
Your AI it-girl. 💋

Fashion, beauty and lifestyle — outfit inspo, glam transformations, styling
ideas, GRWM-style shorts and a touch of luxury, all starring Hazel, a fully
AI-generated character styled and directed frame by frame.

This is the fashion side of Hazel. For my time-traveling history adventures,
find me at my main channel: Hazel Out of Time.

New looks every week. Subscribe and stay stylish. ✨

Business inquiries: [email]
```

- **YouTube channel keywords:** `AI influencer, virtual influencer, fashion, beauty,
  lifestyle, outfit ideas, GRWM, glam, styling, AI model, Hazel`
- Enable the "Altered content / AI-generated" disclosure on uploads where required.

### Shared hashtag base (pin in drafts, rotate per post)
```
#AIinfluencer #virtualinfluencer #fashion #beauty #lifestyle #ootd #grwm
#styleinspo #glam #aifashion #itgirl
```

---

## 3. Asset spec — platform-compliant sizes (verified against current platform guidance)

### Profile picture — ONE square file used on all four platforms
- **Master file: 1080×1080 px** (JPG/PNG, sRGB). Exceeds every platform minimum:
  - Facebook: displays 176×176 desktop / 196×196 phones — min 180×180 ✔
  - Instagram: displays 320×320 ✔
  - TikTok: min 20×20, recommended ≥200×200 ✔
  - YouTube: recommended 800×800 (displays 98×98) ✔ — a 1080 square downscales cleanly
- **Design rule:** face centered, head-and-shoulders, ALL key content inside the
  inscribed CIRCLE (every platform crops the square to a circle). Nothing important
  in corners. Clean, uncluttered background so it reads at 98 px.

### Facebook cover
- **Deliver: 820×312 px** (current Pages desktop display size; min 400×150).
- Mobile crops the SIDES and shows ~640×360 — so all key content (Hazel + any text)
  stays inside the **central 640 px** of the canvas. Subject centered = safe on
  desktop AND mobile.
- JPG < 100 KB loads fastest per Meta's own guidance (PNG if text/logo needs crispness).

### YouTube banner
- **Deliver: 2560×1440 px** (YouTube's recommended full "2560 master"; min 2048×1152;
  file ≤ 6 MB).
- Device visibility: TV shows the full 2560×1440; desktop ~2560×423 strip; mobile
  crops to the central **1546×423 "safe area"** — the ONLY region visible on every
  device. Hazel + page name/tagline live entirely inside that centered 1546×423 box;
  the rest of the canvas is scene/atmosphere that can crop away harmlessly.

### Production sequencing (per standing rules)
1. Owner picks outfits (3-option wardrobe workflow — mandatory, owner lock 2026-08-30).
2. Claude styles makeup + hair to suit the chosen dress (glam allowed here; identity,
   realism and bronde color locked).
3. Generate at working resolution from v5 refs → deliver EACH asset to owner in chat
   immediately → owner approves → only then any 4K/deterministic upscale (owner lock
   2026-08-29: never upscale before approval).
4. Final crops/resizes to the exact pixel specs above are deterministic ffmpeg/
   ImageMagick operations on the approved image — no regeneration involved.

---

## 4. Asset checklist

| Asset | Size | Status |
|---|---|---|
| Profile picture (FB+IG+TikTok+YT) | 1080×1080 | awaiting owner outfit pick |
| Facebook cover | 820×312 | awaiting owner outfit pick |
| YouTube banner | 2560×1440 (safe 1546×423) | awaiting owner outfit pick |
| Bios/descriptions | — | ✅ drafted above |
| Page name/handle | — | awaiting owner pick |
