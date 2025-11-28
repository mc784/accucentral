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
  title: "VrikshaYoga - Regulate Your Nervous System",
  description: "The biological regulation platform. Science-backed yoga for cortisol detox, stress relief, and nervous system regulation.",
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
