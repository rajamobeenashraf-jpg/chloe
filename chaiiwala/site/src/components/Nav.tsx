"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Magnetic from "./motion/Magnetic";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Locations" },
  { href: "/#rewards", label: "Rewards" },
  { href: "/franchise", label: "Franchise" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));
  useEffect(() => { document.documentElement.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${solid ? "bg-cream/80 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(42,23,16,.4)] border border-ink/5" : "bg-transparent"}`}>
          <Link href="/" className={`font-display text-2xl font-black tracking-tight lowercase transition-colors ${solid ? "text-ink" : "text-cream"}`}>chaii<span className="text-orange">wala</span><span className="align-super text-[10px]">®</span></Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${solid ? "text-ink/80 hover:bg-ink/5 hover:text-ink" : "text-cream/80 hover:bg-cream/10 hover:text-cream"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Magnetic><Link href="/menu" className="btn btn-primary hidden md:inline-flex">Order now</Link></Magnetic>
            <button aria-label="Menu" onClick={() => setOpen(true)} className={`grid size-11 place-items-center rounded-full border md:hidden ${solid ? "border-ink/10" : "border-cream/20"}`}>
              <span className={`block h-0.5 w-5 ${solid ? "bg-ink" : "bg-cream"}`} /><span className={`mt-1.5 block h-0.5 w-5 ${solid ? "bg-ink" : "bg-cream"}`} />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 92% 6%)" }} animate={{ clipPath: "circle(150% at 92% 6%)" }} exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[80] flex flex-col bg-orange px-6 pt-6 text-cream">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-black lowercase">chaiiwala</span>
              <button aria-label="Close" onClick={() => setOpen(false)} className="size-11 rounded-full border border-cream/30 text-xl">×</button>
            </div>
            <nav className="mt-16 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07 }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="font-display block text-5xl font-black lowercase tracking-tight">{l.label}</Link>
                </motion.div>
              ))}
            </nav>
            <Link href="/menu" onClick={() => setOpen(false)} className="btn btn-light mt-auto mb-10 justify-center">Order now</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
