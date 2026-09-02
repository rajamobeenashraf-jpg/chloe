"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cities } from "@/lib/data";
import Reveal from "../motion/Reveal";

const wanted = ["Cambridge", "Exeter", "Plymouth", "Swansea", "Hull", "York", "Sunderland", "Ipswich", "Bournemouth", "Chelmsford", "Doncaster", "Middlesbrough", "Inverness", "Belfast", "Southend", "Basingstoke"];

export default function Territories() {
  const [tab, setTab] = useState<"open" | "wanted">("wanted");
  const existing = cities();
  return (
    <section className="bg-sand/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div><Reveal><p className="eyebrow text-orange">Territories</p></Reveal><Reveal delay={0.1}><h2 className="font-display display-tight mt-4 text-4xl font-black lowercase md:text-6xl">where we&apos;re looking next.</h2></Reveal></div>
          <div className="flex gap-1 rounded-full bg-ink/5 p-1">
            {(["wanted", "open"] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`relative rounded-full px-4 py-2 text-sm font-bold ${tab === t ? "text-cream" : ""}`}>{tab === t && <motion.span layoutId="terr" className="absolute inset-0 rounded-full bg-ink" />}<span className="relative">{t === "wanted" ? "Territories available" : "Already open"}</span></button>)}
          </div>
        </div>
        <motion.ul key={tab} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.03 } } }} className="mt-10 flex flex-wrap gap-2.5">
          {(tab === "wanted" ? wanted.map((c) => [c, 0] as const) : existing.map(([c, s]) => [c, s.length] as const)).map(([c, n]) => (
            <motion.li key={c} variants={{ hidden: { opacity: 0, y: 10, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === "wanted" ? "bg-orange text-cream" : "bg-white ring-1 ring-ink/10"}`}>{c}{n ? <span className="ml-1.5 text-xs opacity-50">{n}</span> : null}</motion.li>
          ))}
        </motion.ul>
        <p className="mt-6 text-sm text-ink/60">Available territories are illustrative for this concept. Existing cities reflect the live store estate.</p>
      </div>
    </section>
  );
}
