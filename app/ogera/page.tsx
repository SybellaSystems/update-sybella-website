// app/ogera/page.tsx
import type { Metadata } from "next";
import OgeraClient from "./OgeraClient";

export const metadata: Metadata = {
  title: "Ogera — Africa's Student Employment Platform",
  description:
    "Connects African students with jobs, internships, and remote work opportunities.",
};

export default function Page() {
  return <OgeraClient />;
}