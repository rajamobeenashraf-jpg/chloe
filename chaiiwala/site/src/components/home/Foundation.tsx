import Image from "next/image";
import Reveal from "../motion/Reveal";
import Counter from "../motion/Counter";

export default function Foundation() {
  return (
    <section id="foundation" className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center md:py-36">
      <Reveal><div className="relative aspect-[16/11] overflow-hidden rounded-[32px]"><Image src="/img/cafe-interior.webp" alt="Friends sharing chaii inside a Chaiiwala" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" /></div></Reveal>
      <div>
        <Reveal><p className="eyebrow text-orange">The Chaiiwala Foundation</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display display-tight mt-4 text-5xl font-black lowercase md:text-6xl">more than a café.</h2></Reveal>
        <Reveal delay={0.2}><p className="mt-6 max-w-md text-lg text-ink-soft">Every store is a meeting point. The Foundation turns our growth into the community&apos;s good: Ramadan iftars with local mosques, community kitchens in off-peak hours, mentoring for young founders and monthly hot-meal drops.</p></Reveal>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {[[2000, "+", "iftar meals a weekend"], [42, "", "cities reached"], [180, "k+", "hot meals served"]].map(([n, s, l]) => (
            <Reveal key={l as string} delay={0.25}><div className="font-display text-3xl font-black text-orange md:text-4xl"><Counter to={n as number} suffix={s as string} /></div><div className="text-xs font-semibold uppercase tracking-widest text-ink/50">{l as string}</div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
