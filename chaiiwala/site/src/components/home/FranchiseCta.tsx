"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../motion/Reveal";
import Magnetic from "../motion/Magnetic";

export default function FranchiseCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  return (
    <section ref={ref} className="relative mx-auto max-w-[1400px] px-4 md:px-6">
      <div className="relative overflow-hidden rounded-[40px] bg-ink text-cream">
        <motion.div style={{ scale }} className="absolute inset-0"><Image src="/img/storefront.webp" alt="A Chaiiwala storefront at dusk" fill sizes="100vw" className="object-cover opacity-60" /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative grid gap-10 p-10 md:grid-cols-2 md:p-20">
          <div>
            <Reveal><p className="eyebrow text-orange-soft">Franchise</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-display display-tight mt-4 text-5xl font-black lowercase md:text-7xl">build a chaiiwala on your high street.</h2></Reveal>
            <Reveal delay={0.2}><p className="mt-6 max-w-md text-cream/75">A proven system lifted from 120 UK stores. Site selection, fit-out, training, supply chain and marketing, with a 500-store global target by 2035.</p></Reveal>
            <Reveal delay={0.3}><Magnetic><Link href="/franchise" className="btn btn-primary mt-8">Explore the opportunity</Link></Magnetic></Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 self-end">
            {[["£180k–£300k", "typical investment"], ["5 steps", "from enquiry to opening"], ["4 formats", "high street · express · drive-thru · travel"], ["3 countries", "UK · Canada · UAE, US next"]].map(([a, b], i) => (
              <Reveal key={b} delay={0.15 + i * 0.08}><div className="rounded-3xl bg-cream/10 p-5 ring-1 ring-cream/15 backdrop-blur"><div className="font-display text-2xl font-bold">{a}</div><div className="text-xs text-cream/70">{b}</div></div></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
