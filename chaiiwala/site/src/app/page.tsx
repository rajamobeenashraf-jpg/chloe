import Hero from "@/components/home/Hero";
import Marquee from "@/components/motion/Marquee";
import Story from "@/components/home/Story";
import MenuShowcase from "@/components/home/MenuShowcase";
import Rewards from "@/components/home/Rewards";
import FindStore from "@/components/home/FindStore";
import FranchiseCta from "@/components/home/FranchiseCta";
import Foundation from "@/components/home/Foundation";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee className="font-display border-y border-ink/10 bg-cream py-4 text-xl font-semibold lowercase text-ink/70" items={["100,000,000+ cups poured", "120 stores across the UK", "halal certified", "never powdered, always brewed", "seven-spice signature blend", "75,000+ five-star reviews"]} />
      <Story />
      <MenuShowcase />
      <Rewards />
      <FindStore />
      <FranchiseCta />
      <Foundation />
    </>
  );
}
