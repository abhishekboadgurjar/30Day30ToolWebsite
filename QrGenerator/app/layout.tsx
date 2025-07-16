import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QR Code Generator - Boad Technologies",
  description: "Generate custom QR codes instantly with advanced features",
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="qr-generator-theme"
        >
          <div className="min-h-screen bg-background text-foreground">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
