"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  Github,
  Calendar,
  Wrench,
  Sparkles,
  Zap,
  Settings,
  Code2,
  Palette,
  FileText,
  Calculator,
  Shield,
  Globe,
  ImageIcon,
  Clock,
  Volume2,
  Smartphone,
  Droplets,
  Eye,
  Monitor,
  Braces,
  DollarSign,
  CheckSquare,
} from "lucide-react"
import Link from "next/link"

const tools = [
  {
    name: "TimezoneConverter",
    description: "Convert times between different time zones.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://timezone-converter-psi.vercel.app/",
    category: "Utility",
    icon: Clock,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "TermsGenerator",
    description: "Generate placeholder legal terms and agreements.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://terms-generator-five.vercel.app/",
    category: "Legal",
    icon: FileText,
    color: "from-slate-600 to-gray-700",
  },
  {
    name: "PdfMerger",
    description: "Merge multiple PDFs into one document.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://pdf-merger-theta-neon.vercel.app/",
    category: "Document",
    icon: FileText,
    color: "from-red-500 to-orange-600",
  },
  {
    name: "MentalMathTrainer",
    description: "Practice quick mental arithmetic exercises.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://mental-math-trainer-ten.vercel.app/",
    category: "Education",
    icon: Calculator,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "FakeChatGenerator",
    description: "Create simulated chat conversations.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://fake-chat-generator-eight.vercel.app/",
    category: "Generator",
    icon: Smartphone,
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "DrawingCanvas",
    description: "Simple drawing and sketching web canvas tool.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://drawing-canvas-pi.vercel.app/",
    category: "Creative",
    icon: Palette,
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "WordCounter",
    description: "Count words, characters, and paragraphs.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://word-counter-smoky-two.vercel.app/",
    category: "Text",
    icon: FileText,
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "IPLocationFinder",
    description: "Find location info based on IP address.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://ip-location-finder-livid.vercel.app/",
    category: "Network",
    icon: Globe,
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "LoremIpsumGenerator",
    description: "Generate Lorem Ipsum placeholder text.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://lorem-ipsum-generator-five-murex.vercel.app/",
    category: "Generator",
    icon: Zap,
    color: "from-yellow-500 to-orange-600",
  },
  {
    name: "FaviconGenerator",
    description: "Create favicons for websites.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://favicon-generator-o9w6.vercel.app/",
    category: "Design",
    icon: ImageIcon,
    color: "from-teal-500 to-cyan-600",
  },
  {
    name: "Hydrate",
    description: "Hydration reminder and water intake tracker.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://hydrate-rust.vercel.app/",
    category: "Health",
    icon: Droplets,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "AccessibilityChecker",
    description: "Check web pages for accessibility compliance.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://accessibility-checker-two.vercel.app/",
    category: "Web Dev",
    icon: Eye,
    color: "from-green-500 to-teal-600",
  },
  {
    name: "CodeEditor",
    description: "In-browser code editor with live preview.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://code-editor-beta-gules.vercel.app/",
    category: "Development",
    icon: Code2,
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "SpeedTest",
    description: "Test your internet connection speed.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://speed-test-gamma-umber.vercel.app/",
    category: "Network",
    icon: Zap,
    color: "from-orange-500 to-red-600",
  },
  {
    name: "GithubProfileViewer",
    description: "Display GitHub user profiles and stats.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://github-profile-viewer-beta-ruddy.vercel.app/",
    category: "Development",
    icon: Code2,
    color: "from-gray-600 to-slate-700",
  },
  {
    name: "LocalhostInspector",
    description: "Inspect localhost environment details.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://localhost-inspector.vercel.app/",
    category: "Development",
    icon: Settings,
    color: "from-indigo-500 to-purple-600",
  },
  {
    name: "TextToSpeech",
    description: "Convert text input to spoken audio.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://text-to-speech-nine-eta.vercel.app/",
    category: "Audio",
    icon: Volume2,
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "TextEncryptor",
    description: "Encrypt and decrypt text strings.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://text-encryptor-pearl.vercel.app/",
    category: "Security",
    icon: Shield,
    color: "from-red-500 to-pink-600",
  },
  {
    name: "QrGenerator",
    description: "Generate QR codes from text or links.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://qr-generator-neon-theta.vercel.app/",
    category: "Generator",
    icon: Zap,
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "PasswordCheck",
    description: "Check password strength and suggestions.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://password-check-one.vercel.app/",
    category: "Security",
    icon: Shield,
    color: "from-orange-500 to-red-600",
  },
  {
    name: "MarkdownEditor",
    description: "Write and preview Markdown text.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://markdown-editor-swart.vercel.app/",
    category: "Text",
    icon: FileText,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "UnitConverter",
    description: "Convert units like length, weight, currency.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://currencyconverter-xi-eight.vercel.app/",
    category: "Utility",
    icon: Calculator,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "ExpenseTracker",
    description: "Track and categorize personal expenses.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://expensetracker-two-red.vercel.app/",
    category: "Finance",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-600",
  },
  {
    name: "Calculator",
    description: "Basic arithmetic calculator app.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://calculator-indol-theta-28.vercel.app/",
    category: "Utility",
    icon: Calculator,
    color: "from-slate-500 to-gray-600",
  },
  {
    name: "InvoiceGenerator",
    description: "Generate printable invoices.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://invoicegenerator-eta.vercel.app/",
    category: "Business",
    icon: FileText,
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "ResponsiveDesignTester",
    description: "Check responsiveness across viewports.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://responsivedesigntester.vercel.app/",
    category: "Web Dev",
    icon: Monitor,
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "JsonFormatter",
    description: "Format and prettify JSON data.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://jsonformatter-ruby.vercel.app/",
    category: "Development",
    icon: Braces,
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "ColorCrafter",
    description: "Pick and preview color palettes.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://colorcrafter-theta.vercel.app/",
    category: "Design",
    icon: Palette,
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "ImageCompressor",
    description: "Compress images to reduce file size.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://imagecompressor-jade.vercel.app/",
    category: "Image",
    icon: ImageIcon,
    color: "from-teal-500 to-cyan-600",
  },
  {
    name: "Todo",
    description: "Simple to-do list application.",
    github: "https://github.com/abhishekboadgurjar/30Day30ToolWebsite",
    live: "https://todo-nw8f.vercel.app/",
    category: "Productivity",
    icon: CheckSquare,
    color: "from-emerald-500 to-green-600",
  },
]

export default function Home() {
  const categories = [...new Set(tools.map((tool) => tool.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/20 bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
                  <Wrench className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  30 Day 30 Tool Website
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Challenge by Abhishek Gurjar</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="hidden sm:flex bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg"
            >
              <Calendar className="h-3 w-3 mr-1" />
              30 Tools Completed
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative inline-block mb-6">
              <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 text-white border-0 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Challenge Completed
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              30 Day 30 Tool
              <span className="block text-4xl md:text-6xl mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Website Challenge
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              A collection of 30 powerful web tools built in 30 days. From productivity enhancers to developer
              utilities, each tool is crafted with modern web technologies including{" "}
              <span className="font-semibold text-indigo-600">Next.js</span>,{" "}
              <span className="font-semibold text-purple-600">React</span>, and{" "}
              <span className="font-semibold text-pink-600">TypeScript</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById("tools-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Wrench className="h-5 w-5 mr-2" />
                Explore All Tools
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-gray-200 hover:border-indigo-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg px-8 py-6 rounded-xl"
              >
                <Link
                  href="https://github.com/abhishekboadgurjar/30Day30ToolWebsite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub Repository
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/10 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  30
                </div>
                <div className="text-muted-foreground font-medium">Tools Built</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  30
                </div>
                <div className="text-muted-foreground font-medium">Days Challenge</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {categories.length}
                </div>
                <div className="text-muted-foreground font-medium">Categories</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-muted-foreground font-medium">Functional</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools-section" className="py-24 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              All Tools
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Discover powerful web tools designed to boost productivity, streamline workflows, and solve everyday
              problems. Each tool is built with modern web standards and optimized for performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden relative"
                >
                  {/* Gradient Border Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                  ></div>
                  <div className="absolute inset-[1px] bg-white rounded-lg"></div>

                  <div className="relative z-10">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${tool.color} text-white`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs bg-gradient-to-r ${tool.color} text-white border-0`}
                            >
                              {tool.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                              Day {index + 1}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 font-bold">
                            {tool.name}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm leading-relaxed mb-6 text-gray-600">
                        {tool.description}
                      </CardDescription>
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="flex-1 bg-transparent hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 border-gray-200 hover:border-indigo-300 transition-all duration-300"
                        >
                          <Link href={tool.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Try Tool
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="flex-1 bg-transparent hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 border-gray-200 hover:border-gray-400 transition-all duration-300"
                        >
                          <Link href={tool.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-4 text-white">Designed & Developed by</h3>
            <p className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Abhishek Gurjar
            </p>
            <p className="text-gray-400 mt-4 text-lg">Full Stack Developer & Tool Creator</p>
          </div>

          <div className="flex justify-center space-x-8 mb-12">
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Link
                href="https://github.com/abhishekboadgurjar/30Day30ToolWebsite"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-lg">
              © 2025 Abhishek Gurjar. Built with <span className="text-indigo-400 font-semibold">Next.js</span>,{" "}
              <span className="text-purple-400 font-semibold">React</span>, and{" "}
              <span className="text-pink-400 font-semibold">TypeScript</span>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
