import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  // Without this, the relative OG/Twitter image paths on the project pages
  // resolve against localhost at build time.
  metadataBase: new URL("https://spencersmith.site"),
  title: "Spencer Smith | I build things",
  description: "Personal portfolio website showcasing my programming projects, photography, and writings.",
  generator: 'v0.dev',
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Spencer Smith | I build things",
    description: "Personal portfolio website showcasing my programming projects, photography, and writings.",
    url: "https://spencersmith.site",
    siteName: "Spencer Smith",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Spencer Smith's Portfolio",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spencer Smith | I build things",
    description: "Personal portfolio website showcasing my programming projects, photography, and writings.",
    images: ["/og.jpg"],
    creator: "@spencersmith",
  },
}

export const viewport: Viewport = {
  themeColor: "#1e1e2e", // Catppuccin Mocha Base
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
