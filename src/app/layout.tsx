import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeToggleFloating from "@/app/components/ThemeToggleFloating";
import "./globals.css";
import Header from "./components/Header";
import BackToTop from "./components/BackToTop";
import PageTransitionOverlay from "./components/PageTransitionOverlay"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-dev",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arriann Lee — Portfolio",
  description:
    "Designer–Developer crafting accessible, motion-smart interfaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-bg text-text">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          {/* GLOBAL PAGE TRANSITION OVERLAY */}
          <PageTransitionOverlay /> {/* ← sits above everything */}
          <ThemeToggleFloating />
          <Header />
          {/* Reserve space for fixed header */}
          <main className="pt-16 md:pt-20">{children}</main>
          {/* Floating UI (shows when #contact is in view) */}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
