"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Zap } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 bg-gradient-to-b from-background to-muted/50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-40 -left-40 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] -bottom-40 -right-40 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500 inline-block">
                Compress Images
              </span>{" "}
              <br className="md:hidden" />
              Without Losing Quality
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Reduce file size while preserving clarity — perfect for websites,
            emails, and sharing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="text-lg group relative overflow-hidden"
              onClick={() => {
                document
                  .getElementById("compressor-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Start Compressing
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg group"
              onClick={() => {
                document
                  .getElementById("features-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="flex items-center gap-2">
                Learn More
                <ArrowDown className="h-5 w-5 group-hover:animate-bounce" />
              </span>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 pt-8 border-t border-border/40"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by developers and companies worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <Image
                src="https://boadtechnologies.com/logo.png"
                alt="Boad Technologies"
                className="h-8"
              />
              {/* Add more company logos here */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
