"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../motion/Reveal";

const steps = [["apply", "Submit the enquiry form. We reply within two working days."], ["interview", "We meet, align on the opportunity and your territory."], ["site selection", "High-footfall sites shortlisted together with our property team."], ["fit-out", "Our team, our spec, our suppliers. Twelve weeks on average."], ["open", "Training on-site, launch day, first sip."]];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" ref={ref} className="mx-auto max-w-7xl px-6 py-24">
      <Reveal><p className="eyebrow text-orange">The process</p></Reveal>
      <Reveal delay={0.1}><h2 className="font-display display-tight mt-4 text-4xl font-black lowercase md:text-6xl">five steps to open.</h2></Reveal>
      <div className="relative mt-14">
        <div className="absolute left-0 top-6 hidden h-px w-full bg-ink/10 md:block" />
        <motion.div style={{ width: w }} className="absolute left-0 top-6 hidden h-px bg-orange md:block" />
        <ol className="grid gap-8 md:grid-cols-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="relative">
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ type: "spring", stiffness: 300, damping: 16, delay: i * 0.12 }} className="grid size-12 place-items-center rounded-full bg-orange font-display text-lg font-black text-cream shadow-lg">0{i + 1}</motion.div>
              <Reveal delay={i * 0.12 + 0.1}><h3 className="font-display mt-5 text-2xl font-bold lowercase">{t}</h3><p className="mt-2 text-sm text-ink-soft">{d}</p></Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
