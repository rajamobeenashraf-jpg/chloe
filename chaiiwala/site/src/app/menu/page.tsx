import type { Metadata } from "next";
import MenuExplorer from "@/components/menu/MenuExplorer";

export const metadata: Metadata = { title: "Menu · karak chaii, street food, desserts & prices" };

export default function MenuPage() {
  return <MenuExplorer />;
}
