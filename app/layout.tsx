import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AccuCentral",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#4A7C7E" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AccuCentral" />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} font-body antialiased bg-slate-medical`}
      >
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
