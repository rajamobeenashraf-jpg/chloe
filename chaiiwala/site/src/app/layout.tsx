import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Chaiiwala — Karak chaii & desi street food", template: "%s · Chaiiwala" },
  description: "Slow-brewed karak chaii, wala wraps and desi street food. 120 stores across the UK. Concept redesign.",
  metadataBase: new URL("https://chaiiwala-concept.vercel.app"),
  openGraph: { title: "Chaiiwala — Karak chaii & desi street food", images: ["/img/hero-chaii.webp"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="antialiased">
      <body>
        <SmoothScroll>
          <Cursor />
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
