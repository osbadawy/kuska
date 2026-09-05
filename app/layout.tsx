import type { Metadata } from "next";
import {
  Manrope,
  Cormorant_Garamond,
} from "next/font/google";

import "./globals.css";

import { NavBar } from "@/components/UI/NavBar";
import { Footer } from "@/components/UI/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kuska Motion",
  description: "Move well. Live fully.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <NavBar />

        {children}

        <Footer />
      </body>
    </html>
  );
}