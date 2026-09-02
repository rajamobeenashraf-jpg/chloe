# Chaiiwala — website pitch: competitor & landscape research

Prepared 2026-09-02 for the pitch to Chaiiwala (chaiiwala.co.uk). Compiled from public
search-index snippets (the target and competitor sites themselves are blocked from this
research environment, so page-level UX notes are from indexed pages, app-store listings,
Trustpilot, trade press, and vendor case studies — verify on a live browser before the pitch).

## 1. The client at a glance

| Fact | Value | Source |
|---|---|---|
| Founded | 2015/16, Leicester | Grocer, Insider Media |
| Stores | 115+ UK (Q1 2026); also Canada, UAE; first US site planned 2026 | Grocer, Catering Today |
| 2024 system sales | £89.4m, +35% YoY; 24 openings (15 UK) | The Grocer |
| 2025 | system sales YTD +16%; drive-thru format launched (Blackburn = 2nd) | Insider Media, Catering Today |
| Long-term target | 500 stores by 2035 | Insider Media |
| Positioning | "Home of chaii and desi street food"; fully halal, mostly vegetarian, sub-£10 | site, Restaurant Online |
| Social | TikTok @chaiiwala ~77k followers / 4.8M likes | TikTok |
| Trustpilot | 3.1–3.5 "Average", 200+ reviews; complaints cluster on app offers not redeemable, click-and-collect still waiting 15+ min, store-to-store inconsistency | Trustpilot |

### Current digital estate — CORRECTED after reading the live site (2026-09-02)

**The earlier "WordPress + WooCommerce" note was wrong.** It came from stale search-index
data. The live chaiiwala.co.uk is a **brand-new Next.js app on Vercel** (Vercel Blob image
storage, deployment-stamped asset URLs, a screenshot asset dated 2026-06-01, "© Chaiiwala 2026").
They rebuilt within roughly the last three months. A "you need a new website" cold pitch will
land badly; the opening has to be "your new site shipped with gaps — here is the v2" (see §1.2).

What the new site has (all verified from page source, text dumps in `chaiiwala/reference/`):
- **Nav**: Menu, Allergens, Our Story, Our Blog, Rewards, Store Locator, Coming Soon, Contact,
  Locations, Franchise, Catering, Careers, Foundation, Newsletter. BFA member badge in footer.
- **Homepage**: rewards banner (stamps), 11 menu categories, locator CTA, "100m+ cups poured"
  counters (100M cups / 140+ sites in 3 countries / 75,000 5-star reviews), rewards perks list,
  catering, merch, socials (Facebook, Instagram, TikTok, YouTube, X), delivery logos.
- **Menu**: 11 categories, ~100 items, each with kcal (regular/large) and V/VG badges, an
  allergen-hide filter, "in select stores" flags. Server-rendered.
- **Allergens**: a full per-item allergen matrix (14 allergens plus nut/gluten sub-types).
- **Store locator**: postcode/city/geolocation search, list + map, "Open now" badges, per-store
  hours, "view this store" + "order from this store". ~120 stores in 59 cities.
- **Locations**: `/locations` → `/locations/<city>` → `/locations/<city>/<store>` (180 URLs in
  the sitemap). Store page = address, phone, weekly hours table, "dine-in", directions, order.
- **Rewards**: a stamp ladder (5 = hot drink, 10 = street food, 15 = wala wrap), "play & win"
  on every order, "chaii legend" tier with 15% wallet top-up bonus, Apple/Google Wallet pass,
  in-store prices on delivery, FAQ + terms.
- **Franchise**: hero stats (115+ UK, 500 by 2035, 100M cups, 5 countries), three "why"
  cards, five-step process, one FAQ (investment £180k–£300k), enquiry form with investment
  capacity bands.
- **Our Story**: timeline 2015→2026, five values, "Mumbai" origin, editorial tone.
- **Catering & Events**, **Foundation** (iftars, community kitchens, mentoring, 180,000+
  meals), **Careers** (roles + application form), **Contact**, **Coming Soon**, **Blog** (10
  posts, three categories).
- **Ordering**: `ordering.chaiiwala.co.uk` is a separate Next.js client-side app (no food2go
  strings anywhere any more; the old food2go app remains on the app stores). The per-store
  subdomains (`ealing.` etc.) now serve that same ordering app.
- **SEO**: Restaurant / Organization / WebSite JSON-LD, OG + Twitter cards, sitemap.xml,
  `legalName: Rowda Group Ltd`. Myriad Pro fonts self-hosted.

### 1.2 Gaps found in the new site (the real pitch material)

| # | Finding | Evidence | Why it matters |
|---|---|---|---|
| 1 | **Menu has no prices** | `/menu` title promises "& Prices"; zero "£" in 1.5 MB of HTML | The single most-searched restaurant query; the page title is currently misleading |
| 2 | **Page weight** | `/menu` 1.5 MB HTML, `/allergens` 1.7 MB, `/store-locator` 773 KB, homepage JS ~1.2 MB (20 chunks) | 70%+ of traffic is mobile; these are heavy for a QSR site on 4G |
| 3 | **Unfinished pages shipped** | Careers: "live jobs are loading shortly… we're wiring this page up"; Contact: "loading form…"; Coming Soon: headline "chaii is coming to liverpool" but no list; Merch subdomain returns an empty response | Reads as a launch that wasn't finished; visible to franchise prospects and press |
| 4 | **Data bugs** | Edinburgh store address renders literally as "undefined"; several stores show no hours at all (Bristol Gloucester Rd, Clacket Lane, Cardiff) | Store data pipeline lacks validation |
| 5 | **Inconsistent numbers across pages** | "1,000,000+ cups" on Our Story vs "100M+" elsewhere; 115 vs 120 vs "140+" stores; "3 countries" on homepage vs "5 countries" on Franchise | Brand-trust problem on the exact pages investors read |
| 6 | **Loyalty messaging conflict** | Homepage/Rewards sell a stamp ladder + Wallet pass; the blog (23 Apr 2026) still sells "the Chaiiwala app… points on every purchase"; Trustpilot complaints are about app offers not working | Customers can't tell whether it's points or stamps, app or wallet |
| 7 | **Blog is a migration dump** | All 10 posts dated 22–23 Apr 2026, older news re-dated | Kills the "latest" section's credibility; no post since launch |
| 8 | **Store pages are thin** | Only "dine-in" under "what's here"; no photos, no drive-thru/parking/prayer-room/halal/accessibility facets, no store-specific menu despite "in select stores" flags on ~15 items | Store pages are the local-SEO landing pages; they currently answer almost nothing |
| 9 | **Franchise page is a form with a headline** | One FAQ, no franchisee testimonials, no unit economics, no formats page (high-street / express / drive-thru / airport / services), no territory map, no downloadable prospectus | This funnel feeds the 500-store target; Chai Green's page is more persuasive (see §2) |
| 10 | **Allergen matrix over-flags** | Karak chaii lists "may contain" for ten allergens | Legally safe, practically useless; a per-item view with clear "contains" would serve customers better |
| 11 | **No press/investor layer** | £89m sales, 35% growth, US launch — none of it on the site; press page absent | Missed for franchise recruitment and media |

## 2. Competitor set

### Tier A — direct: UK "chaii + desi street food" franchise chains
| Brand | HQ / founded | Scale | Digital notes | What they do better / worse |
|---|---|---|---|---|
| **Karak Chaii** (karakchaii.co.uk) — *not yet allow-listed, unread* | Birmingham; founders Javed & Sara | 20+ stores, 50 more planned, pushing cloud-kitchens for franchisees | Site + branding by agency Saifee Creations; ordering on **Flipdish** (karakchaii.flipdish.menu) with geolocation; dedicated `/franchise` and `/order` | Cleaner single ordering path than Chaiiwala; smaller brand; no comparable loyalty tiering |
| **Chai Green** (chaigreen1823.com) | Birmingham, 2020; Alum Rock Rd flagship | 8+ sites (Birmingham ×2, Coventry, Leicester, Slough, Sheffield, Portsmouth, Manchester, Glasgow); 30 UK planned; BFA member | WordPress site: awards bar, nautical "1823" brand story, table bookings, per-location PDF menus, MailerLite newsletter, Google reviews carousel, order online, app on Google Play. **Franchise page is strong**: 50% set-up funding via high-street banks (from £80k+VAT), £180k+ total, 2.5–3 yr payback, multi-site path, support list | Verified live 2026-09-02. Weaker tech, but a more persuasive franchise pitch than Chaiiwala's |
| **Chaiiology** (chaiiology.co.uk) | Manchester / Birmingham | "Numerous" stores, franchising | Site sits behind a SiteGround captcha (not readable from here); ordering via Just Eat / Uber Eats | Product differentiation (tandoori/"matka" chaii, buffalo-milk, gur chai) but weak digital |
| **Chaiiwala Express** | own sub-format | service-station / drive-thru | — | Internal, but the site needs to explain formats |

### Tier B — indirect: premium Indian café benchmarks
| Brand | Why it matters |
|---|---|
| **Dishoom** | The UK benchmark for "Indian café with a story" web design — per-location founding myths, archival photography, narrative copy, but bookings/menus/shop always one tap away (Awwwards-recognised). Chaiiwala's Delhi-family-recipe origin story is under-told and could be given the same treatment at street-food price point. |
| **Independents** (Lahori Karak Chai Southall, Cha Sha, The Chai Lounge Wembley) | Win on authenticity and reviews; show up in "best chai London" listicles where Chaiiwala is rarely first — local-SEO content gap. |

### Tier C — the real competitors for the same £4–£8 spend and the same digital expectations
Greggs, Costa, Tim Hortons UK, Black Sheep Coffee, Nando's. Their apps/sites set the customer's expectation for click-and-collect speed, loyalty clarity, and store-locator quality. Chaiiwala's site will be judged against these, not against Chaiiology.

## 3. Pitch angle (revised after the live read)

Chaiiwala already has a modern site. The pitch is **"the v2 your launch deserved"**: keep the
stack they chose (Next.js on Vercel), fix what shipped broken, and add the layers that turn the
site into a franchise-recruitment and local-SEO machine. Concretely:
1. **Menu with prices, per store.** Store-aware menu (prices + availability from the ordering
   backend), lighter pages (paginate/virtualise the menu and allergen matrix; target <300 KB HTML).
2. **Store pages that answer questions.** Photos, format (high-street / express / drive-thru /
   airport / services), parking, prayer room, accessibility, halal cert, store-specific menu,
   reviews, plus LocalBusiness/Menu/OpeningHours schema and data validation (no more "undefined").
3. **Franchise funnel.** Formats page, unit-economics band, franchisee video testimonials,
   territory availability map, downloadable prospectus, press/financials layer (£89m, +35%,
   US launch), CRM-wired lead form with qualification steps.
4. **One loyalty story.** Stamps + Wallet pass explained once, everywhere; retire the "points
   app" copy; explicit app-vs-web ordering guidance.
5. **Finish the unfinished.** Careers ATS integration, contact form, coming-soon list, merch,
   blog with real dates and a content calendar.
6. **Brand consistency pass.** One source of truth for stats (stores, countries, cups) fed from
   the CMS so every page agrees.
7. **Global hub** (later): uk / ca / ae / us routing on one domain.

The cold-pitch prototype should therefore show the four agreed pages as **before → after**
against their live pages, with the findings table above as the proposal's spine.

## 4. Decisions locked with the owner (interview, 2026-09-02)

| Decision | Answer |
|---|---|
| Primary goal | All three, balanced: franchise recruitment + consumer ordering/loyalty + brand story |
| Client stage | Cold pitch, no contact yet → build a polished redesign concept |
| Tech stack | Next.js + headless CMS (content model designed for 115+ stores, multi-country) |
| Ordering | No integration: menu + store info, then deep-link to Chaiiwala app, Uber Eats, Deliveroo, Just Eat |
| Design direction | Evolve their brand: keep orange + playful street-food tone, raise polish to Dishoom level |
| Concept scope | Four pages: Homepage, Menu, Store page, Franchise |
| Imagery | AI-generated food/store photography (owned, labelled as concept imagery); no copyrighted photos |
| Delivery | Live URL (Vercel, neutral domain) + 3-4 page proposal PDF (findings, problems, offer) |
| Pitcher | Mobeen Ashraf as a freelancer (name, one-line bio, email; portfolio link placeholder) |
| Pricing | Owner asked for an estimate — see §4.1; presented as phased packages |
| Code location | `chaiiwala/site/` on this branch; deploy to Vercel from the repo later |

### 4.1 Price estimate (UK freelance, 2026 market)

Basis: experienced freelance Next.js developer/designer day rate £400–£650; an agency would quote
£40k–£80k for a brand of this size, which is the anchor Chaiiwala's marketing team already lives with.

| Phase | Scope | Days | Fee |
|---|---|---|---|
| 1. Discovery & design | Stakeholder interviews, content audit of the 115-store estate, design system, 4 key page designs, clickable prototype | 8–10 | £4,500–£6,000 |
| 2. Core build | Next.js + headless CMS (Sanity or Payload), 8–10 page templates, store content model + import of all UK stores, menu with allergen/calorie data, franchise funnel + lead form to CRM, loyalty/app handoff, delivery deep-links, schema/SEO, analytics, WordPress migration, QA, launch on Vercel, team training | 22–28 | £13,000–£17,000 |
| 3. Growth | Multi-country routing (UK/CA/AE/US), per-store landing pages retired from subdomains with redirects, franchise territory map, ongoing ordering-API integration once food2go access is granted | 10–14 | £6,000–£9,000 |
| **Total (all phases)** | | 40–52 | **£23,500–£32,000** |
| Optional retainer | Content updates, menu drops, seasonal campaigns, performance monitoring | 2–3 days/month | £1,200–£1,800/month |

Positioning in the proposal: lead with Phases 1+2 at ~£18k–£23k as "the site", Phase 3 as the
international add-on, and offer the discovery phase alone at £4.5k–£6k as a low-risk first step.
A cold-pitch proposal should still end with the discovery-call CTA; the numbers give them an
anchor well under agency pricing without looking cheap for a £89m brand.

## 5. Sources
- https://www.thegrocer.co.uk/news/chaiiwala-sales-jump-35-amid-global-expansion/710298.article
- https://www.insidermedia.com/news/national/indian-street-food-brand-reports-strong-year-of-commercial-and-strategic-progress-targeting-500-openings-over-the-next-decade
- https://www.cateringtoday.co.uk/news/restaurants/chaiiwala-to-launch-second-drive-thru-site-in-blackburn/
- https://www.restaurantonline.co.uk/Article/2025/07/10/what-the-uks-branded-indian-restaurant-sector-looks-like/
- https://www.food2go.co.uk/chaiiwala/
- https://www.chaiiwala.co.uk/rewards/ , /franchise , /store-locator , /news , /support
- https://uk.trustpilot.com/review/www.chaiiwala.co.uk , https://uk.trustpilot.com/review/order.chaiiwala.co.uk
- https://karakchaii.co.uk/ , /franchise-2/ , /order/ ; https://saifeecreations.com/case-study/karak-chaii/
- https://chaigreen1823.com/ ; https://play.google.com/store/apps/details?id=com.appuk.chaigreen ; https://www.thebfa.org/franchisors/chai-green/
- https://chaiiology.co.uk/ ; https://cambridgefoodies.me.uk/2024/01/05/chaiiology-kings-of-the-tandoori-chaii/
- https://www.tiktok.com/@chaiiwala ; https://franchiseindia.com/content/how-this-uk-based-chaiiwala-has-grown-its-brand-via-social-media-franchising.13655
- https://toimi.pro/blog/best-restaurant-website-designs/ (Dishoom analysis)
