"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const steps = ["About you", "Your territory", "Your investment"];

export default function ApplyForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ name: "", email: "", phone: "", location: "", experience: "", capacity: "£200k – £300k", more: "" });
  const up = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const cls = "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 outline-none focus:border-orange";
  return (
    <section id="apply" className="bg-ink py-24 text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow text-orange-soft">Apply now</p>
          <h2 className="font-display display-tight mt-4 text-5xl font-black lowercase md:text-7xl">tell us about you.</h2>
          <p className="mt-6 max-w-md text-cream/70">Three short steps. A member of the franchise team replies within two working days, and every enquiry is routed straight into our CRM, never a shared inbox.</p>
          <ol className="mt-10 space-y-3">
            {steps.map((s, i) => <li key={s} className="flex items-center gap-3"><motion.span animate={{ backgroundColor: i <= step ? "#f0521b" : "rgba(255,246,234,.12)" }} className="grid size-8 place-items-center rounded-full text-xs font-black">{i + 1}</motion.span><span className={i === step ? "font-bold" : "text-cream/60"}>{s}</span></li>)}
          </ol>
        </div>
        <div className="card bg-cream p-6 text-ink md:p-8">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }} className="mx-auto grid size-20 place-items-center rounded-full bg-orange text-3xl text-cream">✓</motion.div>
                <h3 className="font-display mt-6 text-3xl font-bold lowercase">thanks, {f.name.split(" ")[0] || "there"}.</h3>
                <p className="mt-2 text-ink/60">Your enquiry is in. Expect a call within two working days.</p>
              </motion.div>
            ) : (
              <motion.form key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} onSubmit={(e) => { e.preventDefault(); if (step < 2) setStep(step + 1); else setDone(true); }} className="space-y-4">
                {step === 0 && (<>
                  <input required placeholder="Your name" value={f.name} onChange={up("name")} className={cls} />
                  <input required type="email" placeholder="Email" value={f.email} onChange={up("email")} className={cls} />
                  <input required placeholder="Phone" value={f.phone} onChange={up("phone")} className={cls} />
                </>)}
                {step === 1 && (<>
                  <input required placeholder="Location of interest (city or region)" value={f.location} onChange={up("location")} className={cls} />
                  <select value={f.experience} onChange={up("experience")} className={cls}><option value="">Current experience</option><option>Hospitality operator</option><option>Multi-site franchisee</option><option>Investor / new to hospitality</option></select>
                </>)}
                {step === 2 && (<>
                  <div>
                    <div className="mb-2 text-sm font-bold">Investment capacity</div>
                    <div className="grid grid-cols-2 gap-2">{["< £200k", "£200k – £300k", "£300k – £500k", "£500k+"].map((c) => <button type="button" key={c} onClick={() => setF({ ...f, capacity: c })} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${f.capacity === c ? "border-orange bg-orange text-cream" : "border-ink/10 bg-white"}`}>{c}</button>)}</div>
                  </div>
                  <textarea rows={3} placeholder="Tell us more" value={f.more} onChange={up("more")} className={cls} />
                </>)}
                <div className="flex items-center justify-between pt-2">
                  <button type="button" onClick={() => setStep(Math.max(0, step - 1))} className={`text-sm font-bold ${step === 0 ? "invisible" : ""}`}>← Back</button>
                  <button type="submit" className="btn btn-primary">{step < 2 ? "Continue" : "Submit application"}</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
