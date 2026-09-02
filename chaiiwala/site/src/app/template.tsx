"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div className="pointer-events-none fixed inset-0 z-[90] origin-top bg-orange" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
    </>
  );
}
