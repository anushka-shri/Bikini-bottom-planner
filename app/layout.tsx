import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import UnderwaterBackground from "@/components/spongebob/underwater-background"

export const metadata: Metadata = {
  title: "Itinerary Planner",
  description: "Your Spongebob-themed itinerary planner and vacation finder.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased text-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UnderwaterBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
