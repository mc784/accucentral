import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// The Scholar - Serif headings for authority and editorial quality
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

// The Modernist - Sans-serif body for clarity and readability
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Accucentral — Acupressure for Pain Relief",
  description: "Evidence‑informed acupressure guidance: precise pressure points, clear techniques, and practical protocols for common pain and symptoms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} font-body antialiased bg-slate-medical`}
      >
        {children}
      </body>
    </html>
  );
}
