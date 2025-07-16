"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ImageIcon, Github } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-screen-xl items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <ImageIcon className="h-5 w-5 text-primary group-hover:text-blue-500 transition-colors" />
          </motion.div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
            ImageCompressor
          </span>
        </Link>
        <span className="text-sm text-muted-foreground ml-2">by Boad Technologies</span>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link 
              href="https://github.com/BoadTech/image-compressor" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </Button>
          <Button size="sm" className="hidden sm:flex gap-2" asChild>
            <Link href="https://boadtechnologies.com" target="_blank" rel="noopener noreferrer">
              Visit Boad Tech
            </Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}