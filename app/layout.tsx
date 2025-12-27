import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CyberAlign - AI-Powered Compliance Analysis",
  description: "Automate compliance with AI. Analyze ISO 27001 & NIST policies in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

