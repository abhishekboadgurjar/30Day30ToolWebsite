"use client"

import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
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
          storageKey="passwordcheck-theme"
        >
          <div className="min-h-screen flex flex-col">
            <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
              <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    PasswordCheck
                  </span>
                  <span className="text-sm text-muted-foreground">by</span>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => window.open("https://boadtechnologies.com", "_blank")}
                  >
                    Boad Technologies
                  </Button>
                </div>
                <ThemeToggle />
              </div>
            </header>
            {children}
            <footer className="mt-auto border-t py-8 bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4">
                <div className="text-center space-y-4">
                  <div className="flex justify-center items-center gap-2">
                    <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      PasswordCheck
                    </span>
                    <span className="text-muted-foreground">by Boad Technologies</span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    Professional password security tools designed to protect your digital identity. All analysis is
                    performed locally in your browser for maximum privacy.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Boad Technologies. All rights reserved.
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
