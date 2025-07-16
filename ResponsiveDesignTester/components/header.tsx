"use client"

import { Laptop, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10">
                <Laptop className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Responsive Design Tester</h1>
                <p className="text-sm text-muted-foreground">Preview websites across devices</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.boadtechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  BOAD Technologies
                </Badge>
              </a>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10">
              <Laptop className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Responsive Design Tester</h1>
              <p className="text-sm text-muted-foreground">Preview websites across devices</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.boadtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                <Zap className="h-3 w-3" />
                BOAD Technologies
              </Badge>
            </a>
            <div className="text-xs text-muted-foreground hidden md:block">
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"} Mode
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
