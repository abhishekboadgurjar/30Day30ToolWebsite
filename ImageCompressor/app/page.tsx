import { Hero } from "@/components/hero";
import { CompressorTool } from "@/components/compressor-tool";
import { FeaturesSection } from "@/components/features-section";
import { FAQSection } from "@/components/faq-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CompressorTool />
      <FeaturesSection />
      <FAQSection />
    </div>
  );
}