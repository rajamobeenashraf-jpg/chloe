"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Tilt({ children, className = "", max = 10 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5), py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, [0, 1], ["0%", "100%"]), gy = useTransform(py, [0, 1], ["0%", "100%"]);
  return (
    <motion.div ref={ref} className={`relative [transform-style:preserve-3d] ${className}`} style={{ rotateX: rx, rotateY: ry, perspective: 1000 }}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); px.set((e.clientX - r.left) / r.width); py.set((e.clientY - r.top) / r.height); }}
      onMouseLeave={() => { px.set(0.5); py.set(0.5); }}>
      {children}
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 [.group:hover_&]:opacity-100"
        style={{ background: useTransform([gx, gy], ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(255,255,255,.35), transparent 60%)`) }} />
    </motion.div>
  );
}
