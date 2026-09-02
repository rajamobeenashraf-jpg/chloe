import Link from "next/link";
import Marquee from "./motion/Marquee";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-cream">
      <Marquee className="font-display border-y border-cream/10 py-5 text-2xl font-semibold lowercase text-cream/80" items={["karak chaii", "wala wraps", "samosa chaat", "pink chaii", "desi breakfast", "falooda", "bombay toasties"]} />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="font-display text-4xl font-black lowercase">chaii<span className="text-orange">wala</span></div>
          <p className="mt-4 max-w-sm text-sm text-cream/60">The home of karak chaii and desi street food. Brewing slow since Leicester, 2015. 120 stores across the UK, Canada and the UAE.</p>
          <div className="mt-6 flex gap-2">
            {["Instagram", "TikTok", "YouTube", "Facebook"].map((s) => <a key={s} href="#" className="rounded-full border border-cream/15 px-3 py-1.5 text-xs font-semibold text-cream/70 hover:bg-cream hover:text-ink">{s}</a>)}
          </div>
        </div>
        {[
          ["Explore", [["Menu", "/menu"], ["Allergens", "/menu"], ["Rewards", "/#rewards"], ["Our story", "/#story"]]],
          ["Visit", [["Store locator", "/locations"], ["Coming soon", "/locations"], ["Catering & events", "/franchise"], ["Contact", "/franchise#apply"]]],
          ["Business", [["Franchise", "/franchise"], ["Careers", "/franchise"], ["Foundation", "/#foundation"], ["Press", "/franchise#press"]]],
        ].map(([h, ls]) => (
          <div key={h as string}>
            <div className="eyebrow text-orange">{h as string}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(ls as string[][]).map(([l, href]) => <li key={l}><Link href={href} className="text-cream/75 hover:text-cream">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-cream/40">
        © Chaiiwala 2026 · Proud member of the British Franchise Association · <span className="text-cream/60">Concept redesign by Mobeen Ashraf — not affiliated with Rowda Group Ltd. Imagery is AI-generated concept photography; prices are indicative.</span>
      </div>
    </footer>
  );
}
