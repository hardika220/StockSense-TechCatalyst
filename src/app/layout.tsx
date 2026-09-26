import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StockSense — Inventory Management",
  description: "Professional inventory management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
