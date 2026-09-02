"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SplitHeading from "../motion/SplitHeading";
import Counter from "../motion/Counter";
import Reveal from "../motion/Reveal";

const timeline = [
  ["2015", "First store opens", "Leicester. The original chaiiwala."],
  ["2018", "Ten stores", "A footprint across the Midlands and the north."],
  ["2021", "Fifty stores", "The UK falls in love with karak."],
  ["2023", "Canada arrives", "First chaiiwala outside the UK."],
  ["2024", "100 million cups", "Of karak chaii poured since 2015."],
  ["2026", "120 UK stores", "And a first store in the United States."],
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const line = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
  return (
    <section id="story" ref={ref} className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
      <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-20">
        <div>
          <Reveal><p className="eyebrow text-orange">Our story</p></Reveal>
          <SplitHeading text="from one cup to one hundred million." accent="hundred" className="font-display display-tight mt-5 text-5xl font-black lowercase md:text-7xl" />
          <Reveal delay={0.2}><p className="mt-8 max-w-lg text-lg text-ink-soft">Chaiiwala began in Leicester with a simple, almost stubborn idea: bring the cardamom-and-ginger karak our founders grew up with to the British high street, properly. No syrups. No shortcuts. The first queue made the case.</p></Reveal>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[[100, "M+", "cups poured"], [120, "", "UK stores"], [3, "", "countries"]].map(([n, s, l]) => (
              <Reveal key={l as string} delay={0.1}>
                <div className="font-display text-4xl font-black text-orange md:text-6xl"><Counter to={n as number} suffix={s as string} /></div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-ink/50">{l as string}</div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="relative">
          <motion.div style={{ y: imgY }} className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
            <Image src="/img/pour.webp" alt="Karak chaii being pulled long into glass cups" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6 text-cream"><p className="font-display text-2xl italic">pulled long. served warm. shared loud.</p></div>
          </motion.div>
        </div>
      </div>

      <div className="relative mt-28">
        <div className="absolute left-4 top-0 h-full w-px bg-ink/10 md:left-1/2" />
        <motion.div style={{ height: line }} className="absolute left-4 top-0 w-px bg-orange md:left-1/2" />
        <ol className="space-y-12">
          {timeline.map(([y, t, d], i) => (
            <li key={y} className={`relative pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-16" : "md:pr-16 md:text-right"}`}>
              <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className={`absolute top-1.5 size-4 rounded-full border-4 border-cream bg-orange shadow ${i % 2 ? "left-2 md:-left-2" : "left-2 md:-right-2 md:left-auto"}`} />
              <Reveal>
                <div className="font-display text-5xl font-black text-orange/90">{y}</div>
                <div className="mt-1 text-lg font-bold">{t}</div>
                <div className="text-ink-soft">{d}</div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
