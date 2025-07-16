import type { Metadata } from "next"
import PasswordStrengthChecker from "@/components/password-strength-checker"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"

export const metadata: Metadata = {
  title: "PasswordCheck | Boad Technologies - Advanced Password Security Suite",
  description:
    "Professional password strength checker and secure password manager. Analyze password security, save credentials locally, and enhance your digital security with PasswordCheck by Boad Technologies.",
  keywords: "password checker, password strength, password manager, security, Boad Technologies, password analyzer",
  openGraph: {
    title: "PasswordCheck | Boad Technologies - Advanced Password Security Suite",
    description: "Professional password strength checker and secure password manager by Boad Technologies.",
    type: "website",
    url: "https://passwordcheck.boadtech.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PasswordCheck by Boad Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PasswordCheck | Boad Technologies",
    description: "Professional password strength checker and secure password manager by Boad Technologies.",
    images: ["/og-image.png"],
  },
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <PasswordStrengthChecker />
        </div>
      </div>
      <FeaturesSection />
      <StatsSection />
    </main>
  )
}
