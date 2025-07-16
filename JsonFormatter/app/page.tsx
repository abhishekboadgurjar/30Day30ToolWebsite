import Header from "@/components/Header"
import JsonEditor from "@/components/JsonEditor"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-4xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-pulse">
                JsonFormatter
              </span>
            </h1>
            <p className="text-muted-foreground text-lg animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              Professional JSON formatting, validation, and minification tool
            </p>
            <p className="text-sm text-muted-foreground mt-2 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
              Powered by BOAD Technologies
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
            <JsonEditor />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
