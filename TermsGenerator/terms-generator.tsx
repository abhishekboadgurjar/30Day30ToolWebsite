"use client"

import { useState } from "react"
import { FileText, Shield, Cookie, Gavel, Globe, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LegalWizard } from "./components/legal-wizard"
import { DocumentGenerator } from "./components/document-generator"

export default function TermsGenerator() {
  const [currentView, setCurrentView] = useState<"home" | "wizard" | "documents">("home")
  const [formData, setFormData] = useState(null)

  const handleWizardComplete = (data: any) => {
    setFormData(data)
    setCurrentView("documents")
  }

  const features = [
    {
      icon: FileText,
      title: "Terms & Conditions",
      description: "Comprehensive terms covering user rights, responsibilities, and service usage",
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "GDPR, CCPA, and other privacy law compliant policies",
    },
    {
      icon: Cookie,
      title: "Cookie Policy",
      description: "Detailed cookie usage and tracking technology disclosures",
    },
    {
      icon: Gavel,
      title: "Multiple Jurisdictions",
      description: "Support for US, EU, UK, Canada, and international frameworks",
    },
    {
      icon: Globe,
      title: "Business Types",
      description: "Customized for e-commerce, SaaS, blogs, marketplaces, and more",
    },
    {
      icon: Users,
      title: "User-Friendly Wizard",
      description: "Step-by-step guidance to ensure all important details are covered",
    },
  ]

  if (currentView === "wizard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="mx-auto max-w-4xl py-8">
          <LegalWizard onComplete={handleWizardComplete} />
        </div>
      </div>
    )
  }

  if (currentView === "documents" && formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="mx-auto max-w-6xl py-8">
          <DocumentGenerator formData={formData} onBack={() => setCurrentView("wizard")} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900">Legal Document Generator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Create professional Terms & Conditions, Privacy Policies, and Cookie Policies tailored to your business
              needs and legal requirements in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => setCurrentView("wizard")}>
                Start Legal Wizard
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                View Sample Documents
              </Button>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              by <span className="font-semibold text-blue-600">Boad Technologies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Legal Compliance</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive generator covers all major legal frameworks and business types
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Legal Frameworks */}
      <div className="bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Legal Framework Support</h2>
            <p className="text-lg text-gray-600">
              Compliant with major privacy and data protection regulations worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "GDPR", region: "European Union", description: "General Data Protection Regulation" },
              { name: "CCPA", region: "California, USA", description: "California Consumer Privacy Act" },
              { name: "PIPEDA", region: "Canada", description: "Personal Information Protection Act" },
              { name: "Privacy Act", region: "Australia", description: "Australian Privacy Principles" },
            ].map((framework, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{framework.name}</CardTitle>
                  <CardDescription className="font-medium text-blue-600">{framework.region}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{framework.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Generate Your Legal Documents?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get started with our step-by-step wizard and have professional legal documents ready in minutes.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => setCurrentView("wizard")}
            >
              Launch Legal Wizard
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-t border-amber-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Legal Disclaimer</h3>
              <p className="text-sm text-amber-700">
                This generator provides template documents for informational purposes only and should not be considered
                legal advice. The generated content should be reviewed by a qualified attorney to ensure compliance with
                applicable laws and adequate protection for your specific business needs. Laws vary by jurisdiction and
                change over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
