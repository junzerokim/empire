import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Empire Hotel – Frýdek-Místek",
  description: "Luxury hotel in Frýdek-Místek, Czech Republic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
