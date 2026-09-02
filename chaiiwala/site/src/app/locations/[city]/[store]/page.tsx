import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stores, facilities, FORMAT_LABEL, isOpen, menu, imageFor, price } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import StoreHero from "@/components/locations/StoreHero";

export function generateStaticParams() { return stores.map((s) => ({ city: s.citySlug, store: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ city: string; store: string }> }): Promise<Metadata> {
  const { city, store } = await params;
  const s = stores.find((x) => x.citySlug === city && x.slug === store);
  return { title: s ? `${s.name} · karak chaii & street food` : "Store" };
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default async function StorePage({ params }: { params: Promise<{ city: string; store: string }> }) {
  const { city, store } = await params;
  const s = stores.find((x) => x.citySlug === city && x.slug === store);
  if (!s) notFound();
  const nearby = stores.filter((x) => x.citySlug === city && x.slug !== store).slice(0, 3);
  const open = isOpen(s);
  const popular = ["our famous karak chaii", "Samosa Chaat", "Butter Chicken Roll", "Pink Chaii"].map((n) => menu.find((m) => m.name === n)!).filter(Boolean);
  const today = (new Date().getDay() + 6) % 7;
  const ld = { "@context": "https://schema.org", "@type": "CafeOrCoffeeShop", name: `Chaiiwala ${s.name}`, address: { "@type": "PostalAddress", streetAddress: s.street, addressLocality: s.city, postalCode: s.postcode, addressCountry: "GB" }, servesCuisine: "Indian street food", openingHours: s.hours ? `Mo-Su ${s.hours.replace("–", "-")}` : undefined };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <StoreHero s={s} open={open} />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-10">
          <Reveal>
            <h2 className="font-display text-3xl font-bold lowercase">what&apos;s here</h2>
            <ul className="mt-5 flex flex-wrap gap-2">{facilities(s).map((f) => <li key={f} className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-ink/10">{f}</li>)}</ul>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-bold lowercase">popular at {s.city.toLowerCase()}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {popular.map((m) => (
                <li key={m.slug}><Link href={`/menu#${m.slug}`} className="group block"><div className="relative aspect-square overflow-hidden rounded-3xl"><Image src={imageFor(m)} alt={m.name} fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="mt-2 text-sm font-bold capitalize">{m.name}</div><div className="text-xs text-ink/50">{price(m.price)}</div></Link></li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-ink p-8 text-cream">
              <Image src="/img/cafe-interior.webp" alt="" fill className="object-cover opacity-30" sizes="60vw" />
              <div className="relative"><p className="eyebrow text-orange-soft">Rewards</p><p className="font-display mt-2 text-3xl font-bold lowercase">earn a stamp here every visit.</p><p className="mt-2 max-w-md text-sm text-cream/75">Every order over £2.50 earns a stamp, in store or online. Five stamps gets you a free hot drink.</p><Link href="/#rewards" className="btn btn-primary mt-5">How rewards work</Link></div>
            </div>
          </Reveal>
        </div>
        <aside className="space-y-6 md:sticky md:top-28 md:self-start">
          <Reveal>
            <div className="card p-6">
              <h3 className="font-display text-2xl font-bold lowercase">opening times</h3>
              <table className="mt-4 w-full text-sm">
                <tbody>{days.map((d, i) => <tr key={d} className={i === today ? "font-bold text-orange" : ""}><td className="py-1.5">{d}{i === today && <span className="ml-2 text-[10px] uppercase tracking-widest">today</span>}</td><td className="py-1.5 text-right tabular-nums">{s.hours ?? "—"}</td></tr>)}</tbody>
              </table>
              <p className="mt-3 text-xs text-ink/50">Hours can vary on bank holidays.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card p-6">
              <h3 className="font-display text-2xl font-bold lowercase">find us</h3>
              <p className="mt-3 text-sm">{s.street}{s.street && <br />}{s.city}, {s.postcode}</p>
              <div className="mt-5 grid gap-2">
                <a href={`https://maps.google.com/?q=${encodeURIComponent(`Chaiiwala ${s.street} ${s.postcode}`)}`} target="_blank" rel="noreferrer" className="btn btn-ghost justify-center">Get directions</a>
                <a href="#" className="btn btn-primary justify-center">Order for collection</a>
                <div className="grid grid-cols-3 gap-2 pt-1">{["Uber Eats", "Deliveroo", "Just Eat"].map((d) => <a key={d} href="#" className="rounded-full bg-ink/5 px-2 py-2 text-center text-[11px] font-bold hover:bg-ink hover:text-cream">{d}</a>)}</div>
              </div>
            </div>
          </Reveal>
        </aside>
      </section>
      {nearby.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-10">
          <h2 className="font-display text-3xl font-bold lowercase">other {s.city.toLowerCase()} stores</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">{nearby.map((n) => <li key={n.slug}><Link href={`/locations/${n.citySlug}/${n.slug}`} className="card block p-5 transition hover:-translate-y-1"><div className="eyebrow text-orange">{FORMAT_LABEL[n.format]}</div><div className="font-display mt-1 text-xl font-bold">{n.name}</div><div className="text-sm text-ink/60">{n.postcode}{n.hours && ` · today ${n.hours}`}</div></Link></li>)}</ul>
        </section>
      )}
    </div>
  );
}
