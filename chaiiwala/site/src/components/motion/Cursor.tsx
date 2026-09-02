"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const raf = requestAnimationFrame(() => setEnabled(true));
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setHover(!!(e.target as HTMLElement).closest("a,button,[data-cursor]")); };
    window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); };
  }, [x, y]);
  if (!enabled) return null;
  return (
    <motion.div className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block mix-blend-difference" style={{ x: sx, y: sy }}>
      <motion.div className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-cream" animate={{ width: hover ? 56 : 14, height: hover ? 56 : 14, opacity: hover ? 0.9 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} />
    </motion.div>
  );
}
