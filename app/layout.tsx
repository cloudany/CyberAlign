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

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <Toaster position="top-right" richColors />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

