"use client";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { menu, CATEGORIES, imageFor, price, type MenuItem } from "@/lib/data";
import Tilt from "../motion/Tilt";
import SplitHeading from "../motion/SplitHeading";

type Diet = "all" | "veg" | "vegan";

function ItemCard({ it, onOpen, i }: { it: MenuItem; onOpen: (m: MenuItem) => void; i: number }) {
  return (
    <motion.li layout id={it.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }} className="group">
      <Tilt max={6} className="rounded-[26px]">
        <button onClick={() => onOpen(it)} className="block w-full overflow-hidden rounded-[26px] bg-white text-left ring-1 ring-ink/5 shadow-[0_30px_50px_-40px_rgba(42,23,16,.5)]" data-cursor>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={imageFor(it)} alt={it.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute left-3 top-3 flex gap-1.5">
              {it.new && <span className="chip bg-orange text-cream">new</span>}
              {it.veg && <span className="chip bg-mint text-ink">V</span>}
              {it.vegan && <span className="chip bg-mint text-ink">VG</span>}
            </div>
            {it.select && <span className="chip absolute bottom-3 left-3 bg-ink/70 text-cream backdrop-blur">select stores</span>}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-bold capitalize leading-tight">{it.name}</h3>
              <div className="shrink-0 text-right"><div className="font-bold">{price(it.price)}</div>{it.priceLarge && <div className="text-[11px] text-ink/50">L {price(it.priceLarge)}</div>}</div>
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm text-ink/60">{it.desc || "Made fresh in store."}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-ink/50">
              <span>{it.kcal.length ? it.kcal.map((k) => `${k} kcal`).join(" · ") : ""}</span>
              <span className="font-bold text-orange opacity-0 transition group-hover:opacity-100">Add +</span>
            </div>
          </div>
        </button>
      </Tilt>
    </motion.li>
  );
}

export default function MenuExplorer() {
  const [cat, setCat] = useState<string>("hot drinks");
  const [diet, setDiet] = useState<Diet>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<MenuItem[]>([]);

  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (!h) return;
    const m = menu.find((x) => x.slug === h);
    if (!m) return;
    const t = setTimeout(() => { setCat(m.category); setTimeout(() => document.getElementById(h)?.scrollIntoView({ block: "center" }), 600); }, 0);
    return () => clearTimeout(t);
  }, []);

  const items = useMemo(() => menu.filter((m) => (q ? `${m.name} ${m.desc}`.toLowerCase().includes(q.toLowerCase()) : m.category === cat) && (diet === "all" || (diet === "veg" ? m.veg || m.vegan : m.vegan))), [cat, diet, q]);
  const subs = useMemo(() => [...new Set(items.map((i) => i.sub))], [items]);
  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div className="relative">
      <section className="relative overflow-hidden bg-ink pb-10 pt-36 text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_20%,rgba(240,82,27,.45),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="eyebrow text-orange-soft">Indian street food café</p>
          <SplitHeading as="h1" text="the chaiiwala menu." className="font-display display-tight mt-4 text-6xl font-black lowercase md:text-8xl" />
          <p className="mt-5 max-w-lg text-cream/70">Every item with its price, calories and allergens. Filter by what you eat, then order from your nearest store.</p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-full bg-cream/10 px-5 py-3.5 ring-1 ring-cream/15">
              <span className="text-orange-soft">⌕</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the menu…" className="w-full bg-transparent outline-none placeholder:text-cream/40" />
            </label>
            <div className="flex gap-1 rounded-full bg-cream/10 p-1 ring-1 ring-cream/15">
              {(["all", "veg", "vegan"] as Diet[]).map((d) => (
                <button key={d} onClick={() => setDiet(d)} className={`relative rounded-full px-4 py-2 text-sm font-semibold capitalize ${diet === d ? "text-ink" : "text-cream/70"}`}>
                  {diet === d && <motion.span layoutId="diet" className="absolute inset-0 rounded-full bg-cream" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  <span className="relative">{d}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[76px] z-30 border-b border-ink/5 bg-cream/85 backdrop-blur-xl">
        <LayoutGroup id="cats">
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => { setCat(c.id); setQ(""); }} className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c.id && !q ? "text-cream" : "text-ink/70 hover:text-ink"}`}>
                {cat === c.id && !q && <motion.span layoutId="cat" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <AnimatePresence mode="popLayout">
          {subs.map((s) => {
            const group = items.filter((i) => i.sub === s);
            return (
              <motion.div key={`${cat}-${q}-${diet}-${s}`} layout className="mb-14">
                {s && <h2 className="font-display mb-6 text-3xl font-bold lowercase text-ink/80">{s}</h2>}
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {group.map((it, i) => <ItemCard key={it.slug} it={it} i={i} onOpen={setOpen} />)}
                  </AnimatePresence>
                </ul>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {items.length === 0 && <p className="py-20 text-center text-ink/50">Nothing matches that. Try another word.</p>}
      </section>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[85] flex items-end justify-center bg-ink/60 backdrop-blur-sm md:items-center" onClick={() => setOpen(null)}>
            <motion.div initial={{ y: 80, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 28 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl overflow-hidden rounded-t-[32px] bg-cream md:rounded-[32px]">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto"><Image src={imageFor(open)} alt={open.name} fill sizes="50vw" className="object-cover" /></div>
                <div className="p-7 md:p-9">
                  <div className="flex gap-1.5">{open.veg && <span className="chip bg-mint text-ink">veg</span>}{open.vegan && <span className="chip bg-mint text-ink">vegan</span>}{open.new && <span className="chip bg-orange text-cream">new</span>}</div>
                  <h3 className="font-display mt-3 text-4xl font-black capitalize leading-tight">{open.name}</h3>
                  <p className="mt-3 text-ink/70">{open.desc || "Made fresh in store."}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-white p-3 ring-1 ring-ink/5"><dt className="text-ink/50">Regular</dt><dd className="font-bold">{price(open.price)}{open.kcal[0] ? ` · ${open.kcal[0]} kcal` : ""}</dd></div>
                    {open.priceLarge && <div className="rounded-2xl bg-white p-3 ring-1 ring-ink/5"><dt className="text-ink/50">Large</dt><dd className="font-bold">{price(open.priceLarge)}{open.kcal[1] ? ` · ${open.kcal[1]} kcal` : ""}</dd></div>}
                  </dl>
                  <p className="mt-4 text-xs text-ink/50">Allergens: see the matrix for {open.category}. {open.select ? "Available in selected stores." : "Available in every store."}</p>
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => { setCart((c) => [...c, open]); setOpen(null); }} className="btn btn-primary">Add to order · {price(open.price)}</button>
                    <button onClick={() => setOpen(null)} className="btn btn-ghost">Close</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 26 }} className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-full bg-ink px-5 py-3 text-cream shadow-2xl">
            <div className="flex items-center gap-3"><motion.span key={cart.length} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="grid size-9 place-items-center rounded-full bg-orange text-sm font-black">{cart.length}</motion.span><span className="text-sm">{cart.length === 1 ? "item" : "items"} · <strong>{price(total)}</strong></span></div>
            <a href="#" className="btn btn-light !py-2.5">Choose a store to collect</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
