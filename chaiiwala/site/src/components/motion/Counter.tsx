"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function Counter({ to, prefix = "", suffix = "", className = "", decimals = 0 }:
  { to: number; prefix?: string; suffix?: string; className?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 40, damping: 18, mass: 1 });
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  useEffect(() => spring.on("change", (v) => {
    if (ref.current) ref.current.textContent = prefix + v.toLocaleString("en-GB", { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + suffix;
  }), [spring, prefix, suffix, decimals]);
  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
