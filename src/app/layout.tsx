import type { Metadata } from "next"
import { Inter, Outfit, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import ThemeToggleFloating from "@/app/components/ThemeToggleFloating"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading", display: "swap" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Arriann Lee — Portfolio",
  description: "Designer–Developer crafting accessible, motion-smart interfaces.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-bg text-text">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <ThemeToggleFloating />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}