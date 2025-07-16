import type { Metadata } from "next"
import QRGenerator from "@/components/qr-generator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "QR Code Generator - Boad Technologies | Create Custom QR Codes",
  description:
    "Generate custom QR codes instantly with our advanced QR code generator. Customize colors, sizes, download as PNG/SVG, scan QR codes, and more. Built by Boad Technologies.",
  keywords: "QR code generator, QR codes, custom QR codes, download QR code, scan QR code, Boad Technologies",
  authors: [{ name: "Boad Technologies" }],
  openGraph: {
    title: "QR Code Generator - Boad Technologies",
    description: "Generate custom QR codes instantly with advanced customization options",
    type: "website",
    url: "https://qr-generator.boad.tech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Code Generator by Boad Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator - Boad Technologies",
    description: "Generate custom QR codes instantly with advanced customization options",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <QRGenerator />
        </div>
      </main>
      <Footer />
    </>
  )
}
