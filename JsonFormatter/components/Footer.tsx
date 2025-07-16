import { Code, Heart, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in slide-in-from-bottom duration-1000">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Info */}
          <div className="space-y-4 animate-in fade-in slide-in-from-left duration-1000 delay-200">
            <div className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                <Code className="w-4 h-4 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                JsonFormatter
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md transition-all duration-300 hover:text-foreground">
              A professional JSON formatting, validation, and minification tool designed for developers. Built with
              modern web technologies to provide the best user experience.
            </p>
            <Link
              href="https://boadtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105 hover:translate-x-2 group"
            >
              <span className="relative">
                Visit BOAD Technologies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </Link>
          </div>

          {/* Company Info */}
          <div className="space-y-4 animate-in fade-in slide-in-from-right duration-1000 delay-400">
            <h4 className="text-lg font-semibold">About BOAD Technologies</h4>
            <p className="text-muted-foreground transition-all duration-300 hover:text-foreground">
              BOAD Technologies builds simple, powerful tools for developers and businesses. We focus on creating
              intuitive solutions that enhance productivity and streamline workflows.
            </p>
            <div className="space-y-2 text-muted-foreground text-sm">
              <div className="transition-all duration-300 hover:text-foreground hover:translate-x-2 hover:scale-105">
                🌐 Website: boadtechnologies.com
              </div>
              <div className="transition-all duration-300 hover:text-foreground hover:translate-x-2 hover:scale-105">
                🛠️ Developer Tools & Solutions
              </div>
              <div className="transition-all duration-300 hover:text-foreground hover:translate-x-2 hover:scale-105">
                💡 Innovation-Driven Development
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center animate-in fade-in slide-in-from-bottom duration-1000 delay-600">
          <div className="flex items-center space-x-2 text-muted-foreground group">
            <span className="transition-colors duration-300 group-hover:text-foreground">
              JsonFormatter - Powered by BOAD Technologies
            </span>
            <Heart className="w-4 h-4 text-red-500 transition-all duration-300 group-hover:scale-125 group-hover:animate-pulse" />
          </div>
          <div className="text-muted-foreground text-sm mt-4 md:mt-0 transition-colors duration-300 hover:text-foreground">
            © {new Date().getFullYear()} BOAD Technologies. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
