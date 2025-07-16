"use client"

import { ExternalLink, Menu, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const handleRedirectToBoad = () => {
    // Replace with actual Boad Technologies website URL
    window.open("https://boadtechnologies.com", "_blank")
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
                <p className="text-xs text-gray-500">by Boad Technologies</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              PWA Enabled
            </Badge>
          </div>

          {/* Navigation and CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Features
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  About
                </a>
                <a href="#support" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Support
                </a>
              </nav>
            </div>

            <Button onClick={handleRedirectToBoad} className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Visit Boad Technologies</span>
              <span className="sm:hidden">Boad Tech</span>
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
