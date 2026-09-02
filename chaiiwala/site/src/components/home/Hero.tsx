"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "../motion/Magnetic";

const HeroCup = dynamic(() => import("../three/HeroCup"), { ssr: false, loading: () => null });

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cupY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const words = ["slow", "brewed.", "poured", "fresh."];
  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-cream">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_40%,rgba(240,82,27,.55),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_20%_80%,rgba(232,185,92,.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/img/hero-chaii.webp')] bg-cover bg-center opacity-25 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink" />
      </motion.div>

      <motion.div style={{ y: cupY }} className="absolute inset-y-0 right-0 hidden w-[52%] md:block">
        <HeroCup />
      </motion.div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:pb-24">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="eyebrow mb-6 text-orange-soft">The home of karak chaii · since Leicester, 2015</motion.p>
        <h1 className="font-display display-tight text-[15vw] font-black lowercase leading-none md:text-[9.5rem] lg:text-[11rem]" aria-label="slow brewed. poured fresh.">
          {words.map((w, i) => (
            <span key={w} className="mr-[0.18em] inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <motion.span className={`inline-block ${i === 1 || i === 3 ? "italic text-orange-soft" : ""}`} initial={{ y: "115%", rotate: 3 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1.1, delay: 0.55 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div style={{ opacity }} className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9 }} className="max-w-md text-base text-cream/70 md:text-lg">
            Seven spices, whole milk, pulled long the way it&apos;s done back home. Never powdered, never rushed. Over 100 million cups and counting.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.9 }} className="flex flex-wrap gap-3">
            <Magnetic><Link href="/menu" className="btn btn-primary">See the menu</Link></Magnetic>
            <Magnetic><Link href="/locations" className="btn border border-cream/25 text-cream hover:bg-cream hover:text-ink">Find your nearest</Link></Magnetic>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs text-cream/50 md:flex">
        <span className="relative block h-10 w-px overflow-hidden bg-cream/20"><motion.span className="absolute inset-x-0 top-0 h-1/2 bg-orange" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} /></span>
        drag the cup · scroll to brew
      </motion.div>
    </section>
  );
}
