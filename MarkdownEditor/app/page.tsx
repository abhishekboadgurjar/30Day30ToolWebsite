import type { Metadata } from "next"
import MarkdownEditor from "@/components/markdown-editor"

export const metadata: Metadata = {
  title: "Markdown Editor - Boad Technologies",
  description:
    "Professional Markdown editor with live preview, dark mode, export options, and PWA support. Create and edit Markdown documents with real-time preview.",
  keywords: "markdown, editor, live preview, dark mode, export, PWA, Boad Technologies",
  authors: [{ name: "Boad Technologies" }],
  creator: "Boad Technologies",
  publisher: "Boad Technologies",
  openGraph: {
    title: "Markdown Editor - Boad Technologies",
    description: "Professional Markdown editor with live preview and advanced features",
    url: "https://markdown-editor.boad.tech",
    siteName: "Boad Technologies Markdown Editor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Markdown Editor by Boad Technologies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Editor - Boad Technologies",
    description: "Professional Markdown editor with live preview and advanced features",
    images: ["/og-image.png"],
    creator: "@boadtech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <MarkdownEditor />
    </main>
  )
}
