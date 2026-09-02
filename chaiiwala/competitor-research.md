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

### Current digital estate (what the new site must replace or sit beside)
- **Main site**: WordPress + WooCommerce. Pages indexed: `/menu` (+ per-item pages e.g. `/menu/karak-chaii`), `/franchise`, `/store-locator`, `/locations/<city>`, `/rewards`, `/news`, `/support`, `/store-safety`, `/order-now-search`.
- **Per-store subdomains** (`ealing.`, `greenford.`, `nottinghamvc.chaiiwala.co.uk`) — a legacy local-SEO pattern, likely inconsistent and hard to maintain at 115+ stores.
- **Two ordering domains**: `order.chaiiwala.co.uk` (has its own Trustpilot page) and `ordering.chaiiwala.co.uk/menu` — evidence of platform churn / a fragmented ordering journey.
- **App + loyalty**: built by **food2go** (branded app + mobile web ordering, POS-integrated). Tiers Bronze→Platinum, up to 10 pts/£1, free Karak Chaii on signup, click-and-collect. Separate Canadian app ("Chaiiwala of London") and site (chaiiwalaoflondon.ca).
- **Delivery**: Uber Eats, Deliveroo, Just Eat (brand pages on each).

### Weaknesses a new site can fix
1. Fragmented journey: marketing site → separate order subdomain(s) → separate app → per-store subdomains → third-party delivery. No single "find store → see its menu/hours → order" flow.
2. Loyalty is the growth engine (points on web + app + in-store) but the website's role in it is unclear; Trustpilot shows offer-redemption confusion.
3. Franchise recruitment is the actual revenue driver at 500-store ambition; the `/franchise` page is one page on a consumer site rather than a proper recruitment funnel (enquiry form, territory map, investment info, testimonials, ROI content).
4. Store consistency complaints → a site with accurate per-store data (hours, facilities, drive-thru, prayer room, parking, halal cert) reduces mismatched expectations.
5. Multi-country: UK / Canada / UAE / US soon, each on different domains and apps — no unified brand hub or geo-routing.
6. WordPress/WooCommerce for a 115-store, multi-country, app-first QSR is maintainable but not fast; Core Web Vitals and mobile speed are a likely easy win (verify with PageSpeed before the pitch).

## 2. Competitor set

### Tier A — direct: UK "chaii + desi street food" franchise chains
| Brand | HQ / founded | Scale | Digital notes | What they do better / worse |
|---|---|---|---|---|
| **Karak Chaii** (karakchaii.co.uk) | Birmingham; founders Javed & Sara | 20+ stores, 50 more planned, pushing cloud-kitchens for franchisees | Site + branding by agency Saifee Creations; ordering on **Flipdish** (karakchaii.flipdish.menu) with geolocation; dedicated `/franchise` and `/order` | Cleaner single ordering path than Chaiiwala; smaller brand; no comparable loyalty tiering |
| **Chai Green** (chaigreen1823.com) | Birmingham, 2020; Alum Rock Rd flagship | Expanding via franchise (Cardiff, Glasgow); BFA-listed | Own app on Google Play (appuk white-label), `/menu`, `/locations`, `/franchise`, `/news`; award-led positioning (Birmingham Awards 2022, Prestige Awards 2023) | More "restaurant/brunch" than grab-and-go; premium visual identity; smaller estate |
| **Chaiiology** (chaiiology.co.uk) | Manchester / Birmingham | "Numerous" stores, franchising | Basic site; ordering only via Just Eat / Uber Eats — no first-party ordering | Product differentiation (tandoori/"matka" chaii, buffalo-milk, gur chai) but weak digital |
| **Chaiiwala Express** | own sub-format | service-station / drive-thru | — | Internal, but the site needs to explain formats |

### Tier B — indirect: premium Indian café benchmarks
| Brand | Why it matters |
|---|---|
| **Dishoom** | The UK benchmark for "Indian café with a story" web design — per-location founding myths, archival photography, narrative copy, but bookings/menus/shop always one tap away (Awwwards-recognised). Chaiiwala's Delhi-family-recipe origin story is under-told and could be given the same treatment at street-food price point. |
| **Independents** (Lahori Karak Chai Southall, Cha Sha, The Chai Lounge Wembley) | Win on authenticity and reviews; show up in "best chai London" listicles where Chaiiwala is rarely first — local-SEO content gap. |

### Tier C — the real competitors for the same £4–£8 spend and the same digital expectations
Greggs, Costa, Tim Hortons UK, Black Sheep Coffee, Nando's. Their apps/sites set the customer's expectation for click-and-collect speed, loyalty clarity, and store-locator quality. Chaiiwala's site will be judged against these, not against Chaiiology.

## 3. Where a new site can win (pitch angles)
1. **One journey**: store locator → live store page (hours, formats, menu availability) → order/collect via the existing food2go API, or a hand-off to the app with deep links. Kill the subdomain sprawl with a single `/stores/<slug>` structure and proper local schema (LocalBusiness, Menu, OpeningHours).
2. **Franchise funnel as a first-class product**: dedicated section (or subdomain) with territory availability, investment tiers, drive-thru/express formats, franchisee video testimonials, and a qualified-lead form → CRM. This is the page that pays for the project.
3. **Loyalty explained in 10 seconds**: tiers, points, signup offer, app store badges, QR handoff. Reduces the Trustpilot "offer didn't work" complaints.
4. **Menu as a conversion surface**: filterable by veg/vegan/allergens/calories (UK Natasha's Law + calorie labelling compliance), item pages with photography and "order this" CTAs.
5. **Story + social proof**: Delhi chaiwala heritage, halal/vegetarian inclusivity, TikTok embeds/UGC wall — the Dishoom playbook at street-food scale.
6. **Global hub**: uk / ca / ae / us routing from one brand domain, shared design system, market-specific menus and apps.
7. **Speed**: headless or static-first build (Next.js/Astro + headless CMS) targeting sub-2s mobile LCP; measurable improvement over the current WordPress site to put in the pitch.

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
