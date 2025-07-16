"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { QrCode, Github, Twitter, Linkedin, Mail, MapPin, Phone, Heart, ExternalLink } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">QR Generator</h3>
                <p className="text-sm text-muted-foreground">by Boad Technologies</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Create, customize, and share QR codes instantly. The most advanced QR code generator with modern features
              and beautiful design.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/boad-tech" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com/boadtech" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com/company/boadtech" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="#generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                QR Generator
              </Link>
              <Link href="#scanner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                QR Scanner
              </Link>
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                API Documentation
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="#help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link href="#tutorials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tutorials
              </Link>
              <Link href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="#changelog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Changelog
              </Link>
              <Link
                href="#status"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Status
                <ExternalLink className="h-3 w-3" />
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest updates and features delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background text-foreground border-border"
              />
              <Button size="sm">Subscribe</Button>
            </div>

            <div className="space-y-2 pt-4">
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</h5>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>hello@boad.tech</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
            <p>© {currentYear} Boad Technologies. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Link href="#privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>using Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
