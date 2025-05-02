import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spencer Smith | I build things",
  description: "Personal portfolio website showcasing my programming projects, photography, and writings.",
  generator: 'v0.dev',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Spencer Smith | I build things",
    description: "Personal portfolio website showcasing my programming projects, photography, and writings.",
    url: "https://spencersmith.site",
    siteName: "Spencer Smith",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Spencer Smith's Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spencer Smith | I build things",
    description: "Personal portfolio website showcasing my programming projects, photography, and writings.",
    images: ["/logo.png"],
    creator: "@spencersmith",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
