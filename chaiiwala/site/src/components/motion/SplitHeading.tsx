"use client";
import { motion } from "framer-motion";

export default function SplitHeading({ text, className = "", as: Tag = "h2", delay = 0, stagger = 0.06, accent }:
  { text: string; className?: string; as?: "h1" | "h2" | "h3" | "p"; delay?: number; stagger?: number; accent?: string }) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] mr-[0.22em]">
          <motion.span
            className={`inline-block ${accent && w.replace(/[.,!]/g, "") === accent ? "text-orange italic" : ""}`}
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >{w}</motion.span>
        </span>
      ))}
    </Tag>
  );
}
