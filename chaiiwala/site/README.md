# Chaiiwala concept site

Cold-pitch redesign concept for chaiiwala.co.uk. Next.js 16 (App Router), Tailwind v4, Framer Motion, GSAP + Lenis smooth scroll, React Three Fiber hero.

- `src/data/menu.json` — the live menu (names, descriptions, kcal, veg/vegan flags) parsed from chaiiwala.co.uk on 2026-09-02. Prices are **indicative** placeholders.
- `src/data/stores.json` — all 120 UK stores with addresses and today's hours, parsed from the live store locator.
- `public/img/` — concept imagery. Swap in the AI-generated set (see `../competitor-research.md`).

## Run
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel)
1. Import the GitHub repo in Vercel, set **Root Directory** to `chaiiwala/site`.
2. Framework preset: Next.js. No environment variables needed.
3. Update `metadataBase` in `src/app/layout.tsx` to the final domain.
