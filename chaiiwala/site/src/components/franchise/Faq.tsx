"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../motion/Reveal";

const faqs = [
  ["What's the investment range for a franchise?", "Typical range is £180k–£300k depending on site, fit-out and location. Equipment can be leased, and we introduce franchisees to our high-street bank partners."],
  ["Do I need hospitality experience?", "It helps, but the system is built to be learned. Every franchisee completes four weeks of training in a company store before opening."],
  ["How long from enquiry to opening?", "Six to nine months on average, driven mostly by site availability and landlord timelines."],
  ["Can I open more than one store?", "Yes. Strong performance in your first store opens an area-development agreement for multi-site ownership."],
  ["Which countries are open for franchising?", "The UK, Canada and the UAE today. The United States opens in 2026 with a master-franchise partner."],
];

export default function Faq() {
  const [i, setI] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <Reveal><p className="eyebrow text-orange">FAQs</p></Reveal>
      <Reveal delay={0.1}><h2 className="font-display display-tight mt-4 text-4xl font-black lowercase md:text-6xl">good questions.</h2></Reveal>
      <ul className="mt-10 divide-y divide-ink/10">
        {faqs.map(([q, a], k) => (
          <li key={q}>
            <button onClick={() => setI(i === k ? null : k)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
              <span className="font-display text-xl font-bold md:text-2xl">{q}</span>
              <motion.span animate={{ rotate: i === k ? 45 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-cream">+</motion.span>
            </button>
            <AnimatePresence initial={false}>{i === k && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"><p className="pb-6 text-ink-soft">{a}</p></motion.div>}</AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  );
}
