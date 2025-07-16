"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  FileImage,
  Download,
  Lock,
  LayoutGrid,
  Settings2,
  ScreenShare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Fast Processing",
      description: "Compress images in seconds right in your browser"
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-teal-500" />,
      title: "Maintain Quality",
      description: "Advanced algorithms preserve visual clarity while reducing file size"
    },
    {
      icon: <FileImage className="h-8 w-8 text-indigo-500" />,
      title: "Multiple Formats",
      description: "Support for JPG, PNG, and WEBP images"
    },
    {
      icon: <LayoutGrid className="h-8 w-8 text-orange-500" />,
      title: "Batch Processing",
      description: "Compress multiple images at once to save time"
    },
    {
      icon: <Settings2 className="h-8 w-8 text-purple-500" />,
      title: "Adjustable Compression",
      description: "Choose your preferred level of compression"
    },
    {
      icon: <ScreenShare className="h-8 w-8 text-pink-500" />,
      title: "Visual Comparison",
      description: "See before and after results in real-time"
    },
    {
      icon: <Download className="h-8 w-8 text-green-500" />,
      title: "Bulk Download",
      description: "Download all compressed images in a single ZIP file"
    },
    {
      icon: <Lock className="h-8 w-8 text-red-500" />,
      title: "100% Private",
      description: "All processing happens in your browser - no file uploads to servers"
    }
  ];

  return (
    <section id="features-section" className="py-16 bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-teal-500/5" />
      
      <div className="container max-w-screen-xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Use ImageCompressor?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our tool makes image optimization simple, secure, and effective.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border border-border/60 transition-all hover:shadow-md hover:border-border group">
                <CardHeader className="pb-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="mb-2"
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}