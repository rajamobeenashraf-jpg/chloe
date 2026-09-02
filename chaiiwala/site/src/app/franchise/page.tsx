import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import SplitHeading from "@/components/motion/SplitHeading";
import Process from "@/components/franchise/Process";
import Territories from "@/components/franchise/Territories";
import ApplyForm from "@/components/franchise/ApplyForm";
import Faq from "@/components/franchise/Faq";

export const metadata: Metadata = { title: "Franchise · open a Chaiiwala café" };

const formats = [
  ["High street café", "The original. 1,200–2,500 sq ft, dine-in and takeaway, the community room.", "/img/cafe-interior.webp"],
  ["Express", "Compact counter format for retail parks and transport hubs. Grab and go.", "/img/storefront.webp"],
  ["Drive-thru", "Launched 2025. Blackburn was first; Grimshaw Retail Park is open 24 hours.", "/img/storefront.webp"],
  ["Travel", "Airside at Birmingham Airport and on the M25 at Clacket Lane services.", "/img/pour.webp"],
];

export default function FranchisePage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-ink pb-20 pt-40 text-cream">
        <Image src="/img/storefront.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 via-ink/70 to-ink" />
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow text-orange-soft">Franchise with Chaiiwala</p>
          <SplitHeading as="h1" text="build a chaiiwala." accent="chaiiwala." className="font-display display-tight mt-4 text-6xl font-black lowercase md:text-[9rem]" />
          <p className="mt-6 max-w-xl text-lg text-cream/75">Join the UK&apos;s leading Indian street food café, now expanding across Canada, the UAE and the United States. A proven system, a category-defining brand, and a queue that makes the case.</p>
          <div className="mt-10 flex flex-wrap gap-3"><a href="#apply" className="btn btn-primary">Apply now</a><a href="#process" className="btn border border-cream/25 hover:bg-cream hover:text-ink">See the process</a></div>
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[[120, "+", "UK stores"], [500, "", "global target by 2035"], [100, "M+", "cups of karak sold"], [35, "%", "sales growth, 2024"]].map(([n, s, l]) => (
              <div key={l as string}><div className="font-display text-5xl font-black text-orange-soft md:text-6xl"><Counter to={n as number} suffix={s as string} /></div><div className="mt-1 text-xs font-semibold uppercase tracking-widest text-cream/60">{l as string}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal><p className="eyebrow text-orange">Why Chaiiwala</p></Reveal>
        <SplitHeading text="a brand people already know, and want more of." accent="know," className="font-display display-tight mt-4 max-w-4xl text-4xl font-black lowercase md:text-6xl" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[["A category-leading brand", "The UK's defining Indian street food café, built on 100 million cups of karak chaii and the wala wrap. £89m system sales in 2024, up 35%."], ["A proven system", "Site selection, fit-out, training, supply chain and marketing, all lifted from 120 UK stores and refined over a decade."], ["A global pipeline", "Open in the UK, Canada or the UAE, with the first US store landing in 2026, on the road to a 500-store target by 2035."]].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}><div className="card h-full p-7"><div className="font-display text-6xl font-black text-orange/20">0{i + 1}</div><h3 className="font-display mt-2 text-2xl font-bold">{t}</h3><p className="mt-3 text-ink-soft">{d}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-cream">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow text-orange-soft">Formats</p></Reveal>
          <SplitHeading text="four ways to open." className="font-display display-tight mt-4 text-4xl font-black lowercase md:text-6xl" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map(([t, d, img], i) => (
              <Reveal key={t} delay={i * 0.08}><div className="group overflow-hidden rounded-[28px] bg-cream/5 ring-1 ring-cream/10"><div className="relative aspect-[4/3] overflow-hidden"><Image src={img} alt={t} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="p-5"><h3 className="font-display text-2xl font-bold">{t}</h3><p className="mt-2 text-sm text-cream/70">{d}</p></div></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:items-center">
        <Reveal><div className="relative aspect-[4/5] overflow-hidden rounded-[32px]"><Image src="/img/franchisee.webp" alt="A Chaiiwala franchisee in his store" fill sizes="40vw" className="object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 text-cream"><div className="font-bold">Imran, franchisee</div><div className="text-sm text-cream/70">Three stores across the West Midlands (illustrative)</div></div></div></Reveal>
        <div>
          <Reveal><p className="eyebrow text-orange">From a franchisee</p></Reveal>
          <Reveal delay={0.1}><blockquote className="font-display mt-4 text-3xl font-medium leading-snug md:text-5xl">&ldquo;The queue on opening day told me everything. People weren&apos;t there for a coffee shop with chaii on the side. They came for the cup that meant home.&rdquo;</blockquote></Reveal>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[["£180k–£300k", "typical set-up, site dependent"], ["2.5–3 yrs", "indicative payback"], ["Multi-site", "area development after store one"]].map(([a, b]) => <Reveal key={b}><div className="font-display text-2xl font-bold text-orange">{a}</div><div className="text-xs text-ink/60">{b}</div></Reveal>)}
          </div>
        </div>
      </section>

      <Territories />
      <Faq />
      <ApplyForm />
    </div>
  );
}
