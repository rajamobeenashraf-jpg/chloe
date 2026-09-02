"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Tilt from "../motion/Tilt";
import Reveal from "../motion/Reveal";
import SplitHeading from "../motion/SplitHeading";
import { menu, imageFor, price, type MenuItem } from "@/lib/data";

const picks = ["our famous karak chaii", "Samosa Chaat", "Pink Chaii", "Falooda Mango Milkshake", "Butter Chicken Roll", "loaded donuts"];

export default function MenuShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-18%"]);
  const items = picks.map((p) => menu.find((m) => m.name === p)).filter(Boolean) as MenuItem[];
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-28 text-cream md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal><p className="eyebrow text-orange-soft">The menu</p></Reveal>
            <SplitHeading text="karak first. everything else follows." accent="karak" className="font-display display-tight mt-5 text-5xl font-black lowercase md:text-7xl" />
          </div>
          <Reveal delay={0.3}><Link href="/menu" className="btn btn-light">Explore the full menu</Link></Reveal>
        </div>
      </div>
      <motion.div style={{ x }} className="mt-16 flex w-max gap-6 px-6">
        {items.map((it, i) => (
          <Link key={it.slug} href={`/menu#${it.slug}`} className="group w-[300px] shrink-0 md:w-[360px]">
            <Tilt className="rounded-[28px]">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="overflow-hidden rounded-[28px] bg-cream/5 ring-1 ring-cream/10">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={imageFor(it)} alt={it.name} fill sizes="360px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
                  <div className="absolute left-4 top-4 flex gap-1.5">
                    {it.new && <span className="chip bg-orange text-cream">new</span>}
                    {it.veg && <span className="chip bg-mint/90 text-ink">V</span>}
                    {it.vegan && <span className="chip bg-mint/90 text-ink">VG</span>}
                  </div>
                  <div className="absolute inset-x-5 bottom-5">
                    <div className="font-display text-2xl font-bold capitalize leading-tight">{it.name}</div>
                    <div className="mt-1 flex items-center justify-between text-sm text-cream/70"><span>{it.kcal[0] ? `${it.kcal[0]} kcal` : ""}</span><span className="font-bold text-cream">{price(it.price)}</span></div>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
