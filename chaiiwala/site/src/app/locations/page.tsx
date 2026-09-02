import type { Metadata } from "next";
import Locator from "@/components/locations/Locator";

export const metadata: Metadata = { title: "Store locator · every Chaiiwala in the UK" };

export default function LocationsPage() { return <Locator />; }
