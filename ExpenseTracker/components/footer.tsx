"use client"

import { ExternalLink, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const handleRedirectToBoad = () => {
    // Replace with actual Boad Technologies website URL
    window.open("https://boadtechnologies.com", "_blank")
  }

  const handleContactEmail = () => {
    window.open("mailto:contact@boadtechnologies.com", "_blank")
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <div className="w-6 h-6 bg-white rounded text-blue-600 flex items-center justify-center text-sm font-bold">
                  B
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Boad Technologies</h3>
                <p className="text-sm text-gray-600">Innovative Software Solutions</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              We create cutting-edge web applications and PWAs that help businesses and individuals manage their digital
              lives more efficiently.
            </p>
            <Button onClick={handleRedirectToBoad} className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Our Website
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">
                  App Features
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-600 hover:text-gray-900 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#support" className="text-gray-600 hover:text-gray-900 text-sm">
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={handleContactEmail}
                  className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  contact@boadtech.com
                </button>
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                San Francisco, CA
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-3 mt-4">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>© {currentYear} Boad Technologies. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Built with Next.js & PWA Technology</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleRedirectToBoad} className="text-xs">
              <ExternalLink className="w-3 h-3 mr-1" />
              More Apps
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
