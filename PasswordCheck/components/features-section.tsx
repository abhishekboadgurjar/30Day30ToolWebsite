"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Database, Eye, Download, Search, Lock, Smartphone, Globe } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Advanced Password Analysis",
      description:
        "Military-grade password strength analysis using zxcvbn algorithm with entropy calculation and pattern detection.",
      badge: "Core Feature",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Real-time Feedback",
      description: "Instant password strength assessment with actionable suggestions to improve security.",
      badge: "Real-time",
      color: "green",
    },
    {
      icon: Database,
      title: "Secure Local Storage",
      description: "Save passwords locally in your browser with full CRUD operations and search functionality.",
      badge: "Privacy First",
      color: "purple",
    },
    {
      icon: Eye,
      title: "Password Visibility Toggle",
      description: "Show/hide passwords with secure visibility controls and copy-to-clipboard functionality.",
      badge: "UX",
      color: "orange",
    },
    {
      icon: Download,
      title: "Import/Export",
      description: "Backup and restore your password database with secure JSON export/import functionality.",
      badge: "Data Portability",
      color: "indigo",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Quickly find saved passwords with intelligent search across websites, usernames, and notes.",
      badge: "Productivity",
      color: "pink",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Fully optimized for desktop, tablet, and mobile devices with touch-friendly interface.",
      badge: "Mobile Ready",
      color: "cyan",
    },
    {
      icon: Globe,
      title: "PWA Support",
      description: "Install as a Progressive Web App for offline access and native app-like experience.",
      badge: "PWA",
      color: "emerald",
    },
    {
      icon: Lock,
      title: "Dark/Light Mode",
      description: "Beautiful themes with system preference detection and persistent user settings.",
      badge: "Accessibility",
      color: "slate",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      orange: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400",
      pink: "bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400",
      cyan: "bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400",
      emerald: "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400",
      slate: "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Everything You Need for Password Security</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive password management tools designed for individuals and teams who prioritize security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(feature.color)}`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
