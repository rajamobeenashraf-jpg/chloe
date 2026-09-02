"use client";
import { motion } from "framer-motion";

export default function Marquee({ items, className = "", speed = 28, reverse = false }: { items: string[]; className?: string; speed?: number; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden mask-fade-x ${className}`}>
      <motion.div className="flex w-max gap-10 whitespace-nowrap" animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }} transition={{ duration: speed, ease: "linear", repeat: Infinity }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{t}</span><span className="inline-block size-2 rounded-full bg-orange" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
