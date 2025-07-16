import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://markdown-editor.boad.tech"),
  title: {
    default: "Markdown Editor - Boad Technologies",
    template: "%s | Boad Technologies",
  },
  description: "Professional Markdown editor with live preview, dark mode, export options, and PWA support.",
  applicationName: "Markdown Editor",
  authors: [{ name: "Boad Technologies", url: "https://boad.tech" }],
  generator: "Next.js",
  keywords: [
    "markdown",
    "editor",
    "live preview",
    "dark mode",
    "export",
    "PWA",
    "Boad Technologies",
    "text editor",
    "markdown parser",
    "responsive design",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Boad Technologies",
  publisher: "Boad Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "productivity",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MD Editor" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} storageKey="markdown-editor-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
