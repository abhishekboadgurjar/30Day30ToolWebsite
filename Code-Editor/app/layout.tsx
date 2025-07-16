import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodePlay – Online Code Editor for HTML, CSS & JS",
  description:
    "Instantly write, edit, and preview HTML, CSS, and JavaScript in your browser. Designed and developed by BOAD Technologies.",
  keywords: "live code editor, html editor, css playground, javascript preview, online code runner",
  openGraph: {
    title: "CodePlay – Online Live Code Editor",
    description: "Built for frontend developers. Try out HTML/CSS/JS in real-time with no login required.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="codeplay-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
