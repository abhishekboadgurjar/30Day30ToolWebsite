"use client"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">⚡</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">UnitConverter</span>
              <span className="text-xs text-muted-foreground leading-tight">by Boad Technologies</span>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild className="gap-2">
            <a href="https://boadtechnologies.com" target="_blank" rel="noopener noreferrer">
              Visit Boad Tech
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
