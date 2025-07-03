import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar, Code, Sparkles } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    name: "TherapistBooking",
    description: "A clean therapist appointment booking landing page.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/TherapistBooking",
    live: "https://therapist-booking.vercel.app/",
    category: "Healthcare",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "PlantNursery",
    description: "A modern website for plant nursery and gardening store.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/PlantNursery",
    live: "https://plant-nursery-rho.vercel.app/",
    category: "E-commerce",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "LawyerWebsite",
    description: "Professional site design for a law firm or legal advisor.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/LawyerWebsite",
    live: "https://lawyer-website-eight-theta.vercel.app/",
    category: "Legal",
    color: "from-slate-600 to-gray-700",
  },
  {
    name: "LanguageTutorSite",
    description: "Educational site for language learning services.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/LanguageTutorSite",
    live: "https://language-tutor-site.vercel.app/",
    category: "Education",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "JewelryStore",
    description: "Elegant UI for a high-end jewelry store.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/JewelryStore",
    live: "https://jewelry-store-ashy.vercel.app/",
    category: "Luxury",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "CharityLanding",
    description: "A minimalist landing page for a nonprofit or charity.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/CharityLanding",
    live: "https://charity-landing-sigma.vercel.app/",
    category: "Nonprofit",
    color: "from-rose-500 to-pink-600",
  },
  {
    name: "HomeFixPro",
    description: "Home maintenance and handyman service website.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/HomeFixPro",
    live: "https://home-fix-pro.vercel.app/",
    category: "Services",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "EleganceAtelier",
    description: "Boutique fashion designer or portfolio website.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/EleganceAtelier",
    live: "https://elegance-atelier.vercel.app/",
    category: "Fashion",
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "AlexRivera",
    description: "Personal branding site for a freelancer or speaker.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/AlexRivera",
    live: "https://alex-rivera.vercel.app/",
    category: "Personal",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "HealthLabPro",
    description: "Medical lab testing or health diagnostics website.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/HealthLabPro",
    live: "https://health-lab-pro.vercel.app/",
    category: "Healthcare",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "TutorPro",
    description: "An online tutor service or coaching landing page.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/TutorPro",
    live: "https://tutor-pro-three.vercel.app/",
    category: "Education",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "HackFest",
    description: "Hackathon or tech event promotional website.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/HackFest",
    live: "https://hack-fest-seven.vercel.app/",
    category: "Tech",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "MovePro",
    description: "Logistics or moving services website.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/MovePro",
    live: "https://move-pro-five.vercel.app/",
    category: "Logistics",
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "PawSpaGrooming",
    description: "Pet grooming and spa appointment landing page.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/PawSpaGrooming",
    live: "https://paw-spa-grooming.vercel.app/",
    category: "Pet Care",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "SarahPhotography",
    description: "Portfolio website for a photographer.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/SarahPhotography",
    live: "https://sarah-photography.vercel.app/",
    category: "Portfolio",
    color: "from-gray-600 to-slate-700",
  },
  {
    name: "LuxeBeauty",
    description: "Beauty product or salon website with stylish UI.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/LuxeBeauty",
    live: "https://luxe-beauty-sigma.vercel.app/",
    category: "Beauty",
    color: "from-rose-500 to-pink-600",
  },
  {
    name: "SwiftLogistics",
    description: "Responsive logistics or courier company site.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/SwiftLogistics",
    live: "https://swift-logistics-zeta.vercel.app/",
    category: "Logistics",
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "FitFlow",
    description: "Fitness trainer or health app landing page.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/FitFlow",
    live: "https://fitflow-eosin.vercel.app/",
    category: "Fitness",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Coding4Dev",
    description: "Tech community or coding resource hub.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/Coding4Dev",
    live: "https://coding4dev.vercel.app/",
    category: "Tech",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "DigitalTech",
    description: "Corporate website for a digital tech company.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/DigitalTech",
    live: "https://digital-tech-gules.vercel.app/",
    category: "Corporate",
    color: "from-blue-600 to-indigo-700",
  },
  {
    name: "TeslaClone",
    description: "Tesla homepage UI clone using modern web tech.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/Tesla",
    live: "https://tesla-inky-delta.vercel.app/",
    category: "Clone",
    color: "from-red-500 to-orange-600",
  },
  {
    name: "AppleClone",
    description: "Apple product showcase inspired website.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/Apple",
    live: "https://apple-website-ashy-mu.vercel.app/",
    category: "Clone",
    color: "from-gray-500 to-slate-600",
  },
  {
    name: "BeerBiceps",
    description: "Landing page for fitness influencer brand.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/BeerBiceps",
    live: "https://beer-biceps-rose.vercel.app/",
    category: "Fitness",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "IGL",
    description: "Fan-made landing page for India's Got Talent.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/IGL",
    live: "https://indiasgotlatent.vercel.app/",
    category: "Entertainment",
    color: "from-yellow-500 to-orange-600",
  },
  {
    name: "KGS",
    description: "Website for Khan Global Studies educational platform.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/KGS",
    live: "https://khan-global-studies.vercel.app/",
    category: "Education",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "SandeepMaheshwari",
    description: "Tribute or fan page for motivational speaker.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/SandeepMaheshwari",
    live: "https://sandeep-maheshwari.vercel.app/",
    category: "Personal",
    color: "from-teal-500 to-cyan-600",
  },
  {
    name: "SheriyansCoding",
    description: "Tech training institute or coding bootcamp website.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/SheriyansCoding",
    live: "https://sheriyanscoding.vercel.app/",
    category: "Education",
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "ByteErect",
    description: "Tech startup site with modern and bold UI.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/ByteErect",
    live: "https://byteerect-blond.vercel.app/",
    category: "Startup",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "CleanPro",
    description: "Cleaning service website with a sleek layout.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/CleanPro",
    live: "https://clean-pro-psi.vercel.app/",
    category: "Services",
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "KCC",
    description: "Landing page for a community or college club.",
    github: "https://github.com/abhishekboadgurjar/30Day30Website/tree/main/KCC",
    live: "https://kcc-taupe.vercel.app/",
    category: "Community",
    color: "from-green-500 to-teal-600",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/20 bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                  <Code className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  30 Day 30 Website
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Challenge by Abhishek Gurjar</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="hidden sm:flex bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg"
            >
              <Calendar className="h-3 w-3 mr-1" />
              30 Projects Completed
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative inline-block mb-6">
              <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/25 text-white border-0 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Challenge Completed
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight">
              30 Day 30 Website
              <span className="block text-4xl md:text-6xl mt-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Challenge
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              A journey of building 30 unique websites in 30 days. Each project showcases different industries, design
              patterns, and modern web development techniques using{" "}
              <span className="font-semibold text-blue-600">Next.js</span>,{" "}
              <span className="font-semibold text-cyan-600">React</span>, and{" "}
              <span className="font-semibold text-indigo-600">Tailwind CSS</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 text-lg px-8 py-6 rounded-xl"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                View All Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-gray-200 hover:border-purple-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg px-8 py-6 rounded-xl"
              >
                <Link
                  href="https://github.com/abhishekboadgurjar/30Day30Website"
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
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  30
                </div>
                <div className="text-muted-foreground font-medium">Websites Built</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  30
                </div>
                <div className="text-muted-foreground font-medium">Days Challenge</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-muted-foreground font-medium">Industries Covered</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-muted-foreground font-medium">Responsive Design</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              All Projects
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Explore the complete collection of websites built during this challenge. Each project represents a unique
              industry and design approach with modern web technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:shadow-purple-500/10 hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden relative"
              >
                {/* Gradient Border Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                ></div>
                <div className="absolute inset-[1px] bg-white rounded-lg"></div>

                <div className="relative z-10">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={`text-xs bg-gradient-to-r ${project.color} text-white border-0`}
                          >
                            {project.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                            Day {index + 1}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 font-bold">
                          {project.name}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed mb-6 text-gray-600">
                      {project.description}
                    </CardDescription>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="flex-1 bg-transparent hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 border-gray-200 hover:border-purple-300 transition-all duration-300"
                      >
                        <Link href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="flex-1 bg-transparent hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 border-gray-200 hover:border-gray-400 transition-all duration-300"
                      >
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
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
            <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Abhishek Gurjar
            </p>
            <p className="text-gray-400 mt-4 text-lg">Full Stack Developer & UI/UX Enthusiast</p>
          </div>

          <div className="flex justify-center space-x-8 mb-12">
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Link
                href="https://github.com/abhishekboadgurjar/30Day30Website"
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
              © 2025 Abhishek Gurjar. Built with <span className="text-blue-400 font-semibold">Next.js</span>,{" "}
              <span className="text-cyan-400 font-semibold">React</span>, and{" "}
              <span className="text-indigo-400 font-semibold">Tailwind CSS</span>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
