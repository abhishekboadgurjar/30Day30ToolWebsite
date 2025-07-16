"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FAQSection() {
  const faqItems = [
    {
      question: "How does image compression work?",
      answer:
        "Image compression works by reducing file size through optimized encoding and the removal of redundant data. Our compression techniques smartly reduce file size while maintaining visual quality to the human eye.",
    },
    {
      question: "Will compression affect my image quality?",
      answer:
        "Our tool is designed to minimize quality loss while reducing file size. You can choose from different compression levels depending on your needs, and our real-time preview allows you to see the results before downloading.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "ImageCompressor currently supports JPEG (JPG), PNG, and WEBP formats. You can upload any of these formats and compress them while maintaining the original format.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Since all processing happens in your browser, the file size limit depends on your device's capabilities. Most modern browsers can handle images up to 50MB, but for optimal performance, we recommend files under 20MB.",
    },
    {
      question: "How secure is my data?",
      answer:
        "Your images never leave your device. All compression happens locally in your browser, meaning no images are uploaded to our servers. This ensures 100% privacy and security for your files.",
    },
    {
      question: "Can I compress multiple images at once?",
      answer:
        "Yes! Our batch processing feature allows you to compress multiple images simultaneously. You can also download all compressed images as a single ZIP file for convenience.",
    },
  ];

  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about ImageCompressor
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`} className="group">
                  <AccordionTrigger className="text-lg font-medium group-hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
