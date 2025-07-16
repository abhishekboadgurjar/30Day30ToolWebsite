"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface WizardProps {
  onComplete: (data: any) => void
}

export function LegalWizard({ onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    siteType: "",
    businessModel: "",
    collectsPersonalData: false,
    usesAnalytics: false,
    usesCookies: false,
    hasUserAccounts: false,
    acceptsPayments: false,
    hasUserContent: false,
    targetAudience: "",
    legalFramework: "US",
    contactEmail: "",
    contactAddress: "",
  })

  const steps = [
    {
      title: "Company Information",
      description: "Basic details about your company",
    },
    {
      title: "Business Model",
      description: "How your business operates",
    },
    {
      title: "Data & Privacy",
      description: "What data you collect and how",
    },
    {
      title: "Legal Framework",
      description: "Jurisdiction and compliance requirements",
    },
    {
      title: "Contact Details",
      description: "How users can reach you",
    },
  ]

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="company-name">Company Name *</Label>
              <Input
                id="company-name"
                value={formData.companyName}
                onChange={(e) => updateFormData("companyName", e.target.value)}
                placeholder="e.g., Acme Corporation"
              />
            </div>
            <div>
              <Label htmlFor="location">Primary Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="e.g., California, USA"
              />
            </div>
            <div>
              <Label htmlFor="site-type">Site/Service Type *</Label>
              <Select value={formData.siteType} onValueChange={(value) => updateFormData("siteType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your site type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="E-commerce Store">E-commerce Store</SelectItem>
                  <SelectItem value="Blog">Blog</SelectItem>
                  <SelectItem value="SaaS Platform">SaaS Platform</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Online Service">Online Service</SelectItem>
                  <SelectItem value="Marketplace">Marketplace</SelectItem>
                  <SelectItem value="Social Platform">Social Platform</SelectItem>
                  <SelectItem value="Educational Platform">Educational Platform</SelectItem>
                  <SelectItem value="News/Media Site">News/Media Site</SelectItem>
                  <SelectItem value="Portfolio Site">Portfolio Site</SelectItem>
                  <SelectItem value="Community Forum">Community Forum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label>Business Model</Label>
              <RadioGroup
                value={formData.businessModel}
                onValueChange={(value) => updateFormData("businessModel", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free">Free Service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="freemium" id="freemium" />
                  <Label htmlFor="freemium">Freemium (Free + Paid tiers)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subscription" id="subscription" />
                  <Label htmlFor="subscription">Subscription-based</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ecommerce" id="ecommerce" />
                  <Label htmlFor="ecommerce">E-commerce/Sales</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advertising" id="advertising" />
                  <Label htmlFor="advertising">Advertising-supported</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>Target Audience</Label>
              <Select
                value={formData.targetAudience}
                onValueChange={(value) => updateFormData("targetAudience", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Public (13+)</SelectItem>
                  <SelectItem value="adults">Adults Only (18+)</SelectItem>
                  <SelectItem value="business">Business/Professional</SelectItem>
                  <SelectItem value="children">Children (Under 13)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Data Collection & Usage</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personal-data"
                    checked={formData.collectsPersonalData}
                    onCheckedChange={(checked) => updateFormData("collectsPersonalData", checked)}
                  />
                  <Label htmlFor="personal-data">Collects personal information (names, emails, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analytics"
                    checked={formData.usesAnalytics}
                    onCheckedChange={(checked) => updateFormData("usesAnalytics", checked)}
                  />
                  <Label htmlFor="analytics">Uses analytics tools (Google Analytics, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cookies"
                    checked={formData.usesCookies}
                    onCheckedChange={(checked) => updateFormData("usesCookies", checked)}
                  />
                  <Label htmlFor="cookies">Uses cookies or similar tracking technologies</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="user-accounts"
                    checked={formData.hasUserAccounts}
                    onCheckedChange={(checked) => updateFormData("hasUserAccounts", checked)}
                  />
                  <Label htmlFor="user-accounts">Has user accounts/registration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="payments"
                    checked={formData.acceptsPayments}
                    onCheckedChange={(checked) => updateFormData("acceptsPayments", checked)}
                  />
                  <Label htmlFor="payments">Accepts payments/processes transactions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="user-content"
                    checked={formData.hasUserContent}
                    onCheckedChange={(checked) => updateFormData("hasUserContent", checked)}
                  />
                  <Label htmlFor="user-content">Allows user-generated content</Label>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label>Legal Framework/Jurisdiction</Label>
              <Select
                value={formData.legalFramework}
                onValueChange={(value) => updateFormData("legalFramework", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select legal framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States (General)</SelectItem>
                  <SelectItem value="US-CA">United States (California - CCPA)</SelectItem>
                  <SelectItem value="EU">European Union (GDPR)</SelectItem>
                  <SelectItem value="UK">United Kingdom (UK GDPR)</SelectItem>
                  <SelectItem value="CA">Canada (PIPEDA)</SelectItem>
                  <SelectItem value="AU">Australia (Privacy Act)</SelectItem>
                  <SelectItem value="GLOBAL">Global/International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-email">Contact Email *</Label>
              <Input
                id="contact-email"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                placeholder="legal@yourcompany.com"
              />
            </div>
            <div>
              <Label htmlFor="contact-address">Business Address</Label>
              <Input
                id="contact-address"
                value={formData.contactAddress}
                onChange={(e) => updateFormData("contactAddress", e.target.value)}
                placeholder="123 Business St, City, State, ZIP"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.companyName && formData.location && formData.siteType
      case 1:
        return formData.businessModel && formData.targetAudience
      case 4:
        return formData.contactEmail
      default:
        return true
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Legal Document Wizard</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].description}
            </CardDescription>
          </div>
          <div className="text-sm text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentStep
                    ? "bg-green-500 text-white"
                    : index === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <div className="text-xs mt-1 text-center max-w-20">{step.title}</div>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="min-h-[300px]">{renderStep()}</div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button onClick={nextStep} disabled={!isStepValid()}>
            {currentStep === steps.length - 1 ? "Generate Documents" : "Next"}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
