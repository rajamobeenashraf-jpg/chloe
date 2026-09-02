"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FORMAT_LABEL, type Store } from "@/lib/data";
import SplitHeading from "../motion/SplitHeading";

export default function StoreHero({ s, open }: { s: Store; open: boolean | null }) {
  const img = s.format === "drive-thru" || s.format === "services" || s.format === "express" ? "/img/storefront.webp" : "/img/cafe-interior.webp";
  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden bg-ink text-cream">
      <motion.div initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 -z-10">
        <Image src={img} alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
      </motion.div>
      <div className="mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-6 pb-14 pt-36">
        <Link href="/locations" className="mb-6 text-sm text-cream/60 hover:text-cream">← all locations</Link>
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip bg-cream/15 text-cream">{FORMAT_LABEL[s.format]}</span>
          <span className={`chip ${open ? "bg-mint text-ink" : "bg-cream/15 text-cream"}`}>{open ? "open now" : open === null ? "hours tbc" : "closed now"}</span>
        </div>
        <SplitHeading as="h1" text={`${s.name}.`} className="font-display display-tight mt-4 text-5xl font-black lowercase md:text-8xl" stagger={0.05} />
        <p className="mt-4 max-w-lg text-cream/75">Your local Chaiiwala for karak chaii, desi street food and a proper sip of the east. {s.hours ? `Open today ${s.hours}.` : ""}</p>
      </div>
    </section>
  );
}
