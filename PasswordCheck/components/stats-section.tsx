"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Zap, Award } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Shield,
      value: "99.9%",
      label: "Security Accuracy",
      description: "Advanced algorithm precision",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Active Users",
      description: "Trusted worldwide",
    },
    {
      icon: Zap,
      value: "<100ms",
      label: "Analysis Speed",
      description: "Lightning-fast results",
    },
    {
      icon: Award,
      value: "A+",
      label: "Security Rating",
      description: "Industry leading",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Trusted Performance
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Built for Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PasswordCheck delivers enterprise-grade security with consumer-friendly simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
