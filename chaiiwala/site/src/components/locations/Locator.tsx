"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { stores, isOpen, FORMAT_LABEL, cities, type Store } from "@/lib/data";
import SplitHeading from "../motion/SplitHeading";

const FORMATS = ["all", "high-street", "drive-thru", "express", "airport", "services"] as const;

export default function Locator() {
  const [q, setQ] = useState("");
  const [fmt, setFmt] = useState<(typeof FORMATS)[number]>("all");
  const [openOnly, setOpenOnly] = useState(false);
  const [view, setView] = useState<"list" | "cities">("cities");
  const list = useMemo(() => stores.filter((s) => (!q || `${s.name} ${s.postcode} ${s.street}`.toLowerCase().includes(q.toLowerCase())) && (fmt === "all" || s.format === fmt) && (!openOnly || isOpen(s))), [q, fmt, openOnly]);
  const byCity = cities();
  const searching = q || fmt !== "all" || openOnly;

  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-12 pt-36 text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_30%,rgba(240,82,27,.4),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="eyebrow text-orange-soft">Find us</p>
          <SplitHeading as="h1" text="find your nearest chaiiwala." accent="nearest" className="font-display display-tight mt-4 text-5xl font-black lowercase md:text-8xl" />
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-full bg-cream/10 px-5 py-3.5 ring-1 ring-cream/15">
              <span className="text-orange-soft">⌕</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Store name, UK postcode or city…" className="w-full bg-transparent outline-none placeholder:text-cream/40" />
              <button onClick={() => setQ("")} className={`text-xs ${q ? "opacity-70" : "opacity-0"}`}>clear</button>
            </label>
            <button onClick={() => setQ("Birmingham")} className="btn border border-cream/25 hover:bg-cream hover:text-ink">◎ Use my location</button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <LayoutGroup id="fmt">
              {FORMATS.map((f) => (
                <button key={f} onClick={() => setFmt(f)} className={`relative rounded-full px-3.5 py-1.5 text-xs font-bold capitalize ${fmt === f ? "text-ink" : "text-cream/70"}`}>
                  {fmt === f && <motion.span layoutId="fmt" className="absolute inset-0 rounded-full bg-cream" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  <span className="relative">{f === "all" ? "All formats" : FORMAT_LABEL[f]}</span>
                </button>
              ))}
            </LayoutGroup>
            <label className="ml-auto flex cursor-pointer items-center gap-2 text-xs font-bold"><input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="accent-orange" /> Open now</label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-ink/60"><strong className="text-ink">{searching ? list.length : stores.length}</strong> stores{searching ? " match" : " across 60 cities"}</p>
          <div className="flex gap-1 rounded-full bg-ink/5 p-1">
            {(["cities", "list"] as const).map((v) => <button key={v} onClick={() => setView(v)} className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${view === v ? "bg-ink text-cream" : ""}`}>{v}</button>)}
          </div>
        </div>

        {view === "cities" && !searching ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {byCity.map(([c, ss], i) => (
              <motion.li key={c} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 10) * 0.03 }}>
                <button onClick={() => { setQ(c); setView("list"); }} className="group flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3.5 text-left ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:bg-orange hover:text-cream">
                  <span className="font-bold lowercase">{c}</span>
                  <span className="text-xs opacity-60 group-hover:opacity-90">{ss.length} {ss.length === 1 ? "store" : "stores"} →</span>
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.ul layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((s, i) => <StoreCard key={s.citySlug + s.slug} s={s} i={i} />)}
            </AnimatePresence>
          </motion.ul>
        )}
        {searching && list.length === 0 && <p className="py-20 text-center text-ink/50">No stores match. Try a city name or postcode.</p>}
      </section>
    </div>
  );
}

function StoreCard({ s, i }: { s: Store; i: number }) {
  const open = isOpen(s);
  return (
    <motion.li layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ delay: Math.min(i, 9) * 0.04, duration: 0.5 }}>
      <Link href={`/locations/${s.citySlug}/${s.slug}`} className="card group block p-5 transition hover:-translate-y-1">
        <div className="flex items-start justify-between gap-3">
          <div><div className="eyebrow text-orange">{FORMAT_LABEL[s.format]}</div><h3 className="font-display mt-1 text-2xl font-bold leading-tight">{s.name}</h3></div>
          <span className={`chip mt-1 ${open ? "bg-mint/30" : "bg-ink/5 text-ink/60"}`}>{open ? <><span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-green-600" />open</> : open === null ? "hours tbc" : "closed"}</span>
        </div>
        <p className="mt-2 text-sm text-ink/60">{s.street}{s.street && " · "}{s.postcode}</p>
        <p className="mt-1 text-sm">{s.hours ? `Today ${s.hours}` : "Opening hours to be confirmed"}</p>
        <div className="mt-4 flex gap-2 text-xs font-bold"><span className="rounded-full bg-ink px-3 py-1.5 text-cream">View store</span><span className="rounded-full border border-ink/15 px-3 py-1.5 group-hover:border-orange group-hover:text-orange">Order from here</span></div>
      </Link>
    </motion.li>
  );
}
