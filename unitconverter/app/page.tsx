import { Converter } from "@/components/converter"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { InstallPWA } from "@/components/install-pwa"
import { PWAInitializer } from "./pwa"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PWAInitializer />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Universal Unit Converter</h1>
          <p className="text-lg text-muted-foreground mb-2">Powered by Boad Technologies</p>
          <p className="text-base text-muted-foreground mb-6">
            Convert between any units instantly - works offline and on any device
          </p>
          <InstallPWA />
        </section>
        <Converter />
      </main>
      <Footer />
    </div>
  )
}
