"use client"

import { useState } from "react"
import { Download, Copy, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface DocumentGeneratorProps {
  formData: any
  onBack: () => void
}

export function DocumentGenerator({ formData, onBack }: DocumentGeneratorProps) {
  const [activeTab, setActiveTab] = useState("terms")
  const { toast } = useToast()

  const generateTermsAndConditions = () => {
    const currentDate = new Date().toLocaleDateString()

    let gdprSection = ""
    let ccpaSection = ""
    let cookieSection = ""
    let userContentSection = ""
    let paymentSection = ""

    if (formData.legalFramework === "EU" || formData.legalFramework === "GLOBAL") {
      gdprSection = `

11. GDPR COMPLIANCE (EU Users)

If you are located in the European Union, you have the following rights under the General Data Protection Regulation (GDPR):
• Right to access your personal data
• Right to rectification of inaccurate data
• Right to erasure ("right to be forgotten")
• Right to restrict processing
• Right to data portability
• Right to object to processing
• Right to withdraw consent

To exercise these rights, please contact us at ${formData.contactEmail}.`
    }

    if (formData.legalFramework === "US-CA" || formData.legalFramework === "GLOBAL") {
      ccpaSection = `

12. CALIFORNIA PRIVACY RIGHTS (CCPA)

California residents have the right to:
• Know what personal information is collected
• Know whether personal information is sold or disclosed
• Say no to the sale of personal information
• Access personal information
• Equal service and price, even if you exercise your privacy rights

To exercise these rights, please contact us at ${formData.contactEmail}.`
    }

    if (formData.usesCookies) {
      cookieSection = `

13. COOKIES AND TRACKING

We use cookies and similar tracking technologies to enhance your experience on our ${formData.siteType.toLowerCase()}. You can control cookie settings through your browser preferences.`
    }

    if (formData.hasUserContent) {
      userContentSection = `

14. USER-GENERATED CONTENT

By submitting content to our ${formData.siteType.toLowerCase()}, you grant ${formData.companyName} a non-exclusive, worldwide, royalty-free license to use, modify, and display such content. You are responsible for ensuring your content does not violate any laws or third-party rights.`
    }

    if (formData.acceptsPayments) {
      paymentSection = `

15. PAYMENT TERMS

All payments are processed securely through third-party payment processors. By making a purchase, you agree to the terms of our payment processors and authorize the charges to your payment method.`
    }

    return `TERMS AND CONDITIONS

Last updated: ${currentDate}

1. ACCEPTANCE OF TERMS

By accessing and using ${formData.companyName}'s ${formData.siteType.toLowerCase()}, you accept and agree to be bound by the terms and provision of this agreement.

2. DESCRIPTION OF SERVICE

${formData.companyName} operates a ${formData.siteType.toLowerCase()} that ${formData.businessModel === "free" ? "provides free services" : formData.businessModel === "subscription" ? "offers subscription-based services" : formData.businessModel === "ecommerce" ? "facilitates online sales" : "provides various online services"}.

3. USE LICENSE

Permission is granted to temporarily download one copy of the materials on ${formData.companyName}'s ${formData.siteType.toLowerCase()} for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

• modify or copy the materials
• use the materials for any commercial purpose or for any public display
• attempt to reverse engineer any software contained on the website
• remove any copyright or other proprietary notations from the materials

4. USER ACCOUNTS${
      formData.hasUserAccounts
        ? `

You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.`
        : ""
    }

5. PROHIBITED USES

You may not use our service:
• For any unlawful purpose or to solicit others to perform unlawful acts
• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
• To infringe upon or violate our intellectual property rights or the intellectual property rights of others
• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
• To submit false or misleading information

6. DISCLAIMER

The materials on ${formData.companyName}'s ${formData.siteType.toLowerCase()} are provided on an 'as is' basis. ${formData.companyName} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

7. LIMITATIONS

In no event shall ${formData.companyName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ${formData.companyName}'s ${formData.siteType.toLowerCase()}.

8. ACCURACY OF MATERIALS

The materials appearing on ${formData.companyName}'s ${formData.siteType.toLowerCase()} could include technical, typographical, or photographic errors. ${formData.companyName} does not warrant that any of the materials on its website are accurate, complete, or current.

9. LINKS

${formData.companyName} has not reviewed all of the sites linked to our ${formData.siteType.toLowerCase()} and is not responsible for the contents of any such linked site.

10. MODIFICATIONS

${formData.companyName} may revise these terms of service at any time without notice. By using this ${formData.siteType.toLowerCase()}, you are agreeing to be bound by the then current version of these terms of service.${gdprSection}${ccpaSection}${cookieSection}${userContentSection}${paymentSection}

${formData.legalFramework === "EU" ? "16" : formData.legalFramework === "US-CA" ? "16" : "11"}. GOVERNING LAW

These terms and conditions are governed by and construed in accordance with the laws of ${formData.location} and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.

${formData.legalFramework === "EU" ? "17" : formData.legalFramework === "US-CA" ? "17" : "12"}. CONTACT INFORMATION

If you have any questions about these Terms and Conditions, please contact us at:

${formData.companyName}
${formData.contactEmail}${formData.contactAddress ? `\n${formData.contactAddress}` : ""}

---

This document was generated by Boad Technologies Terms & Conditions Generator. Please consult with a legal professional to ensure compliance with applicable laws and regulations.`
  }

  const generatePrivacyPolicy = () => {
    const currentDate = new Date().toLocaleDateString()

    let dataCollectionSection = ""
    let cookiesSection = ""
    let analyticsSection = ""
    let gdprSection = ""
    let ccpaSection = ""

    if (formData.collectsPersonalData) {
      dataCollectionSection = `

INFORMATION WE COLLECT

We collect information you provide directly to us, such as when you:
• Create an account or profile
• Make a purchase or transaction
• Contact us for support
• Subscribe to our newsletter
• Participate in surveys or promotions

Types of information we may collect include:
• Name and contact information
• Payment information
• Account credentials
• Communication preferences`
    }

    if (formData.usesCookies) {
      cookiesSection = `

COOKIES AND TRACKING TECHNOLOGIES

We use cookies, web beacons, and similar technologies to:
• Remember your preferences
• Understand how you use our service
• Improve our service performance
• Provide personalized content

You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.`
    }

    if (formData.usesAnalytics) {
      analyticsSection = `

ANALYTICS

We use analytics services to understand how users interact with our ${formData.siteType.toLowerCase()}. These services may collect information about your device, browser, and usage patterns.`
    }

    if (formData.legalFramework === "EU" || formData.legalFramework === "GLOBAL") {
      gdprSection = `

YOUR RIGHTS (GDPR)

If you are in the European Union, you have the following rights:
• Right to access your personal data
• Right to rectify inaccurate data
• Right to erase your data
• Right to restrict processing
• Right to data portability
• Right to object to processing
• Right to withdraw consent

To exercise these rights, contact us at ${formData.contactEmail}.`
    }

    if (formData.legalFramework === "US-CA" || formData.legalFramework === "GLOBAL") {
      ccpaSection = `

CALIFORNIA PRIVACY RIGHTS

California residents have the right to:
• Know what personal information we collect
• Know if we sell or disclose personal information
• Opt-out of the sale of personal information
• Access their personal information
• Equal service regardless of privacy choices

Contact us at ${formData.contactEmail} to exercise these rights.`
    }

    return `PRIVACY POLICY

Last updated: ${currentDate}

This Privacy Policy describes how ${formData.companyName} ("we", "our", or "us") collects, uses, and protects your information when you use our ${formData.siteType.toLowerCase()}.${dataCollectionSection}

HOW WE USE YOUR INFORMATION

We use the information we collect to:
• Provide and maintain our service
• Process transactions and send related information
• Send you technical notices and support messages
• Respond to your comments and questions
• Improve our service and develop new features${formData.usesAnalytics ? "\n• Analyze usage patterns and trends" : ""}

INFORMATION SHARING

We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.

We may share information with:
• Service providers who assist in our operations
• Legal authorities when required by law
• Business partners with your consent${cookiesSection}${analyticsSection}

DATA SECURITY

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

DATA RETENTION

We retain your information for as long as necessary to provide our services and comply with legal obligations.${gdprSection}${ccpaSection}

CHILDREN'S PRIVACY

${
  formData.targetAudience === "children"
    ? "Our service is designed for children under 13. We comply with COPPA requirements and obtain parental consent before collecting personal information from children."
    : formData.targetAudience === "general"
      ? "Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13."
      : "Our service is intended for users 18 and older. We do not knowingly collect information from minors."
}

CHANGES TO THIS POLICY

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.

CONTACT US

If you have questions about this Privacy Policy, please contact us at:

${formData.companyName}
${formData.contactEmail}${formData.contactAddress ? `\n${formData.contactAddress}` : ""}

---

This document was generated by Boad Technologies Terms & Conditions Generator. Please consult with a legal professional to ensure compliance with applicable laws and regulations.`
  }

  const generateCookiePolicy = () => {
    if (!formData.usesCookies) return "Cookie Policy not applicable - you indicated that your site doesn't use cookies."

    const currentDate = new Date().toLocaleDateString()

    return `COOKIE POLICY

Last updated: ${currentDate}

This Cookie Policy explains how ${formData.companyName} uses cookies and similar technologies on our ${formData.siteType.toLowerCase()}.

WHAT ARE COOKIES

Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.

TYPES OF COOKIES WE USE

Essential Cookies
These cookies are necessary for our website to function properly. They enable basic features like page navigation and access to secure areas.

Performance Cookies
These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.

Functionality Cookies
These cookies allow our website to remember choices you make and provide enhanced, more personal features.

${
  formData.usesAnalytics
    ? `Analytics Cookies
We use analytics cookies to understand how users interact with our website and improve our service.`
    : ""
}

MANAGING COOKIES

You can control and manage cookies in various ways:
• Browser Settings: Most browsers allow you to view, manage, and delete cookies
• Opt-out Tools: Some third-party services provide opt-out mechanisms
• Privacy Settings: You can adjust your privacy preferences on our website

Please note that disabling certain cookies may affect the functionality of our website.

THIRD-PARTY COOKIES

We may use third-party services that place cookies on your device. These services have their own privacy policies and cookie practices.

CONTACT US

If you have questions about our use of cookies, please contact us at:

${formData.companyName}
${formData.contactEmail}

---

This document was generated by Boad Technologies Terms & Conditions Generator.`
  }

  const documents = {
    terms: generateTermsAndConditions(),
    privacy: generatePrivacyPolicy(),
    cookies: generateCookiePolicy(),
  }

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied!",
        description: "Document copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadDocument = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Generated Legal Documents</h2>
          <p className="text-gray-600">Your customized legal documents for {formData.companyName}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Back to Wizard
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
        </TabsList>

        {Object.entries(documents).map(([key, content]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {key === "terms" ? "Terms & Conditions" : key === "privacy" ? "Privacy Policy" : "Cookie Policy"}
                    </CardTitle>
                    <CardDescription>
                      {key === "terms"
                        ? "Legal terms governing the use of your service"
                        : key === "privacy"
                          ? "How you collect, use, and protect user data"
                          : "Information about cookies and tracking technologies"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(content)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        downloadDocument(
                          content,
                          `${formData.companyName.toLowerCase().replace(/\s+/g, "-")}-${key}.txt`,
                        )
                      }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea value={content} readOnly className="min-h-[600px] font-mono text-sm" />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
