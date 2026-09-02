"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../motion/Reveal";
import SplitHeading from "../motion/SplitHeading";
import Counter from "../motion/Counter";
import { stores, isOpen, FORMAT_LABEL } from "@/lib/data";

export default function FindStore() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return stores.filter((x) => `${x.name} ${x.postcode} ${x.street}`.toLowerCase().includes(s)).slice(0, 5);
  }, [q]);
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:py-36">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <Reveal><p className="eyebrow text-orange">Find us</p></Reveal>
          <SplitHeading text="120 stores. 60 cities. one welcome." accent="one" className="font-display display-tight mt-5 text-5xl font-black lowercase md:text-7xl" />
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[[120, "stores"], [60, "cities"], [2, "drive-thrus"]].map(([n, l]) => (
              <div key={l as string}><div className="font-display text-4xl font-black text-orange"><Counter to={n as number} /></div><div className="text-xs font-semibold uppercase tracking-widest text-ink/50">{l as string}</div></div>
            ))}
          </div>
        </div>
        <Reveal delay={0.2}>
          <div className="card p-3 md:p-4">
            <label className="flex items-center gap-3 rounded-full bg-ink px-5 py-4 text-cream">
              <span className="text-orange">⌕</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Postcode, city or store name…" className="w-full bg-transparent text-base outline-none placeholder:text-cream/40" />
            </label>
            <AnimatePresence initial={false}>
              {results.length > 0 && (
                <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  {results.map((s, i) => {
                    const open = isOpen(s);
                    return (
                      <motion.li key={s.slug + s.citySlug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link href={`/locations/${s.citySlug}/${s.slug}`} className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 hover:bg-orange/10">
                          <div><div className="font-bold">{s.name}</div><div className="text-xs text-ink/60">{s.street}{s.street && " · "}{s.postcode} · {FORMAT_LABEL[s.format]}</div></div>
                          <span className={`chip ${open ? "bg-mint/30 text-ink" : open === null ? "bg-ink/5 text-ink/60" : "bg-ink/10 text-ink/60"}`}>{open ? "open now" : open === null ? "hours tbc" : "closed"}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
            <div className="mt-3 flex flex-wrap gap-2 px-2 pb-1">
              {["Birmingham", "London", "Leicester", "Manchester", "Bradford", "Glasgow"].map((c) => <button key={c} onClick={() => setQ(c)} className="rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold hover:bg-ink hover:text-cream">{c}</button>)}
              <Link href="/locations" className="ml-auto text-xs font-bold text-orange">Every store →</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
