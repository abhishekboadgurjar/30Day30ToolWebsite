"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Twitter, Mail, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto shrink-0">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Left side - Branding */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">B</span>
              </div>
              <span className="font-semibold text-sm">Boad Technologies</span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">Professional Markdown Editor</span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://boadtechnologies.com", "_blank")}
              className="text-xs hover:text-primary"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Website
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://github.com/boadtechnologies", "_blank")}
              className="text-xs hover:text-primary"
            >
              <Github className="h-3 w-3 mr-1" />
              GitHub
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://twitter.com/boadtech", "_blank")}
              className="text-xs hover:text-primary"
            >
              <Twitter className="h-3 w-3 mr-1" />
              Twitter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("mailto:boadtechnologies@gmail.com", "_blank")}
              className="text-xs hover:text-primary"
            >
              <Mail className="h-3 w-3 mr-1" />
              Contact
            </Button>
          </div>

          {/* Right side - Copyright */}
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>© {currentYear} Boad Technologies</span>
            <span className="hidden sm:flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for developers
            </span>
          </div>
        </div>

        {/* Bottom section - Additional info */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Features: Live Preview • Dark Mode • Export • PWA • Auto-save</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Powered by Boad Technologies</span>
              <span>•</span>
              <span>Built with ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
