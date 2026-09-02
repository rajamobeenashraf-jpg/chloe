"use client";
import { motion, type Variants } from "framer-motion";

const v: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: (d: number = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Reveal({ children, delay = 0, className, once = true, amount = 0.3 }:
  { children: React.ReactNode; delay?: number; className?: string; once?: boolean; amount?: number }) {
  return (
    <motion.div className={className} variants={v} initial="hidden" whileInView="show" viewport={{ once, amount }} custom={delay}>
      {children}
    </motion.div>
  );
}
