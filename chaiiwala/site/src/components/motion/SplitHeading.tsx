"use client";
import { motion, type Variants } from "framer-motion";

const parent: Variants = { hidden: {}, show: (d: number = 0) => ({ transition: { delayChildren: d, staggerChildren: 0.06 } }) };
const word: Variants = { hidden: { y: "110%", rotate: 4 }, show: { y: 0, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } };

export default function SplitHeading({ text, className = "", as = "h2", delay = 0, accent }:
  { text: string; className?: string; as?: "h1" | "h2" | "h3" | "p"; delay?: number; stagger?: number; accent?: string }) {
  const Tag = motion[as];
  return (
    <Tag className={className} aria-label={text} variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={delay}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] mr-[0.22em]">
          <motion.span variants={word} className={`inline-block ${accent && w === accent ? "text-orange italic" : ""}`}>{w}</motion.span>
        </span>
      ))}
    </Tag>
  );
}
