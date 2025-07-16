"use client"

import { Calculator, Heart, Globe, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="https://boadtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Calculator</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">by Boad Technologies</p>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              A comprehensive calculator application with multiple modes including standard, scientific, unit
              conversion, financial calculations, and date operations. Built with modern web technologies for optimal
              performance and user experience.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by</span>
              <Link
                href="https://boadtechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Boad Technologies
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#privacy"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#terms"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">boadtechnologies@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Globe className="h-4 w-4" />
                <Link
                  href="https://boadtechnologies.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  boadtechnologies.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Boad Technologies. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-500 dark:text-gray-400">Powered by</span>
              <Link
                href="https://boadtechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Boad Technologies</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
