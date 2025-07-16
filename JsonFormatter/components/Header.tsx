"use client"

import { Moon, Sun, Code, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in slide-in-from-top duration-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
              <Code className="w-6 h-6 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <h1 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                JsonFormatter
              </h1>
              <p className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-primary/70">
                by BOAD Technologies
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://boadtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] group"
            >
              <span className="relative">
                Visit BOAD Technologies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </Link>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        {/* Mobile link for BOAD Technologies */}
        <div className="sm:hidden mt-3 pt-3 border-t animate-in slide-in-from-bottom duration-700">
          <Link
            href="https://boadtechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 group"
          >
            <span className="relative">
              Visit BOAD Technologies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </span>
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          </Link>
        </div>
      </div>
    </header>
  )
}
