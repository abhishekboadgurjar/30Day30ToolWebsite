"use client";

import { Heart, Code } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            <Code className="h-5 w-5 text-primary" />
            <a
              href="https://www.boadtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary"
            >
              Powered by BOAD Technologies
            </a>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            BOAD Technologies builds practical tools for developers, designers,
            and creators. Making web development more accessible and efficient.
          </p>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>for the developer community</span>
            {mounted && (
              <span className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                {theme === "dark" ? "🌙" : "☀️"} {theme}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
