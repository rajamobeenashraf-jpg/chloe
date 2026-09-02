import menuRaw from "@/data/menu.json";
import storesRaw from "@/data/stores.json";

export type MenuItem = {
  name: string; desc: string; category: string; sub: string | null;
  kcal: number[]; veg: boolean; vegan: boolean; select: boolean; new: boolean;
  price: number; priceLarge?: number; slug: string;
};
export type Store = {
  name: string; city: string; label: string; slug: string; citySlug: string;
  street: string; postcode: string; hours: string | null;
  format: "high-street" | "drive-thru" | "express" | "airport" | "services";
};

const SUBS = new Set(["Signatures","Classics","Teas of the World","Matcha","Mocktails","Limbu Pani","Red Bull Infusions","Fridge Drinks","Big Breakfast","Traditionals","Breakfast Wraps","Signature Milk Cakes","Desi Delights","A piece of Cake","Grab & Go"]);

export const menu: MenuItem[] = (menuRaw as MenuItem[]).map((m) => ({ ...m, sub: m.sub && SUBS.has(m.sub) ? m.sub : null }));
export const stores: Store[] = storesRaw as Store[];

export const CATEGORIES = [
  { id: "hot drinks", label: "Hot drinks", img: "/img/hero-chaii.webp" },
  { id: "cold drinks", label: "Cold drinks", img: "/img/falooda.webp" },
  { id: "all day breakfast", label: "All-day breakfast", img: "/img/desi-breakfast.webp" },
  { id: "wala wraps", label: "Wala wraps", img: "/img/wala-wrap.webp" },
  { id: "lunch & dinner bowls", label: "Bowls", img: "/img/desi-breakfast.webp" },
  { id: "bombay toasties", label: "Bombay toasties", img: "/img/toastie.webp" },
  { id: "street food", label: "Street food", img: "/img/samosa-chaat.webp" },
  { id: "wala bundles", label: "Wala bundles", img: "/img/wala-wrap.webp" },
  { id: "wala kids", label: "Wala kids", img: "/img/toastie.webp" },
  { id: "desserts", label: "Desserts", img: "/img/desserts.webp" },
];

export const HERO_ITEMS: { slug: string; img: string }[] = [
  { slug: "samosa-chaat", img: "/img/samosa-chaat.webp" },
  { slug: "our-famous-karak-chaii", img: "/img/hero-chaii.webp" },
  { slug: "pink-chaii", img: "/img/pink-chaii.webp" },
  { slug: "falooda-mango-milkshake", img: "/img/falooda.webp" },
];

export function imageFor(item: MenuItem): string {
  const n = item.name.toLowerCase();
  if (n.includes("pink")) return "/img/pink-chaii.webp";
  if (n.includes("samosa") || n.includes("chaat")) return "/img/samosa-chaat.webp";
  if (n.includes("falooda") || n.includes("lassi") || n.includes("shake")) return "/img/falooda.webp";
  if (n.includes("wrap") || n.includes("roll")) return "/img/wala-wrap.webp";
  if (n.includes("toastie") || n.includes("toast")) return "/img/toastie.webp";
  if (n.includes("gulab") || n.includes("cake") || n.includes("jamun")) return "/img/desserts.webp";
  const c = CATEGORIES.find((x) => x.id === item.category);
  return c?.img ?? "/img/hero-chaii.webp";
}

export const price = (n: number) => `£${n.toFixed(2)}`;

export const FORMAT_LABEL: Record<Store["format"], string> = {
  "high-street": "High street café", "drive-thru": "Drive-thru", express: "Express", airport: "Airport", services: "Motorway services",
};

export function facilities(s: Store): string[] {
  const base = ["Dine-in", "Takeaway", "Click & collect", "Halal certified", "Card & contactless"];
  if (s.format === "drive-thru") return ["Drive-thru", "Free parking", "Open late", ...base];
  if (s.format === "airport") return ["Airside", "Grab & go", "Early opening", ...base];
  if (s.format === "services") return ["Free parking", "Grab & go", "Open late", ...base];
  if (s.format === "express") return ["Grab & go", "Free parking", ...base];
  return [...base, "Family friendly", "Prayer room nearby", "Wi-Fi"];
}

export function parseHours(h: string | null): [number, number] | null {
  if (!h) return null;
  const m = h.match(/(\d\d):(\d\d)\s*[–-]\s*(\d\d):(\d\d)/);
  if (!m) return null;
  const o = +m[1] * 60 + +m[2]; let c = +m[3] * 60 + +m[4];
  if (c <= o) c += 24 * 60;
  return [o, c];
}

export function isOpen(s: Store, now = new Date()): boolean | null {
  const r = parseHours(s.hours); if (!r) return null;
  const t = now.getHours() * 60 + now.getMinutes();
  return (t >= r[0] && t < r[1]) || (t + 1440 >= r[0] && t + 1440 < r[1]);
}

export const cities = () => {
  const m = new Map<string, Store[]>();
  stores.forEach((s) => m.set(s.city, [...(m.get(s.city) ?? []), s]));
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
};
