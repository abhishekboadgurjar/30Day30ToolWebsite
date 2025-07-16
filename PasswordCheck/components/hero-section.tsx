"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Database, Zap, Award } from "lucide-react"

export function HeroSection() {
  const scrollToChecker = () => {
    const element = document.getElementById("password-checker")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 py-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Trusted by Security Professionals
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PasswordCheck
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4">Advanced Password Security Suite</p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Analyze password strength with military-grade algorithms, securely manage your credentials, and enhance your
            digital security with our comprehensive password toolkit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={scrollToChecker} className="text-lg px-8 py-6">
              <Shield className="w-5 h-5 mr-2" />
              Check Password Strength
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Database className="w-5 h-5 mr-2" />
              Manage Passwords
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-medium">Real-time Analysis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm font-medium">Secure Storage</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm font-medium">Privacy First</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-sm font-medium">Enterprise Grade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
