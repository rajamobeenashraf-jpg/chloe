"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "../motion/Reveal";
import SplitHeading from "../motion/SplitHeading";

const ladder = [[5, "free hot drink", "any regular hot drink"], [10, "free street food", "any street food item"], [15, "free wala wrap", "any wala wrap"]];

export default function Rewards() {
  return (
    <section id="rewards" className="relative overflow-hidden bg-orange py-28 text-cream md:py-36">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-gold/30 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <div>
          <Reveal><p className="eyebrow text-cream/80">Chaiiwala rewards</p></Reveal>
          <SplitHeading text="one stamp per order. no app to open." className="font-display display-tight mt-5 text-5xl font-black lowercase md:text-7xl" />
          <Reveal delay={0.2}><p className="mt-8 max-w-md text-lg text-cream/85">Sign up in thirty seconds when you order. Every order over £2.50 earns a stamp, online or in store. Add the card to Apple or Google Wallet and it updates itself the moment a stamp lands. Stamps never expire.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn btn-light">Sign up & order</Link>
              <a href="#" className="btn border border-cream/40 hover:bg-cream/10">Add to Wallet</a>
            </div>
          </Reveal>
        </div>
        <div className="space-y-4">
          {ladder.map(([n, t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-5 rounded-[24px] bg-cream/10 p-5 ring-1 ring-cream/15 backdrop-blur">
              <div className="flex shrink-0 gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <motion.span key={k} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12 + k * 0.06, type: "spring", stiffness: 400, damping: 14 }} className="grid size-7 place-items-center rounded-full bg-cream text-[10px] font-black text-orange">✓</motion.span>
                ))}
              </div>
              <div>
                <div className="font-display text-2xl font-bold lowercase">{n} stamps · {t}</div>
                <div className="text-sm text-cream/75">{d}</div>
              </div>
            </motion.div>
          ))}
          <Reveal delay={0.4}><p className="pt-2 text-sm text-cream/70">Fifteen lifetime stamps makes you a <strong>chaii legend</strong>: 15% bonus credit on every wallet top-up, a free treat on your birthday, and a play-and-win go on every order. Every go wins.</p></Reveal>
        </div>
      </div>
    </section>
  );
}
