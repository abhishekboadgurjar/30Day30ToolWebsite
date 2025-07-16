"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { QrCode, Menu, Github, Twitter, Linkedin, Download, Camera, Palette, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Generate QR Codes",
    description: "Create QR codes for text, URLs, contacts, WiFi, and more",
    icon: QrCode,
  },
  {
    title: "Scan QR Codes",
    description: "Use your camera to scan and decode QR codes instantly",
    icon: Camera,
  },
  {
    title: "Customize Design",
    description: "Change colors, sizes, and error correction levels",
    icon: Palette,
  },
  {
    title: "Download & Share",
    description: "Export as PNG/SVG and share on social media",
    icon: Download,
  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">QR Generator</span>
                <span className="text-xs text-muted-foreground">by Boad Technologies</span>
              </div>
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              v2.0
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {features.map((feature) => (
                        <li key={feature.title}>
                          <NavigationMenuLink asChild>
                            <a
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              )}
                              href="#"
                            >
                              <div className="flex items-center space-x-2">
                                <feature.icon className="h-4 w-4" />
                                <div className="text-sm font-medium leading-none">{feature.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {feature.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <nav className="flex items-center space-x-4">
              <Link
                href="#about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Social Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-1">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/boad-tech" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/boadtech" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            </div>

            {/* Boad Technologies Button */}
            <Button asChild className="hidden sm:flex">
              <a href="https://boad.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span>Boad Technologies</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            {/* Mobile Boad Technologies Button */}
            <Button size="sm" asChild className="sm:hidden">
              <a href="https://boad.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <span>Boad</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center space-x-2">
                      <QrCode className="h-6 w-6" />
                      <span className="text-lg font-semibold">QR Generator</span>
                    </div>
                  </div>

                  {/* Mobile Boad Technologies Link */}
                  <div className="pb-4 border-b">
                    <Button asChild className="w-full">
                      <a
                        href="https://boad.tech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Visit Boad Technologies</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <nav className="flex flex-col space-y-2">
                    <Link
                      href="#features"
                      className="text-sm font-medium py-2 px-3 rounded-md hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      Features
                    </Link>
                    <Link
                      href="#about"
                      className="text-sm font-medium py-2 px-3 rounded-md hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="#contact"
                      className="text-sm font-medium py-2 px-3 rounded-md hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-3">Features</p>
                    <div className="grid gap-3">
                      {features.map((feature) => (
                        <div key={feature.title} className="flex items-start space-x-3 p-2 rounded-md hover:bg-accent">
                          <feature.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{feature.title}</p>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-3">Connect</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <a href="https://github.com/boad-tech" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="https://twitter.com/boadtech" target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="https://linkedin.com/company/boadtech" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
