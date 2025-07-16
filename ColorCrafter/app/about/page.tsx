"use client";

import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Code, Paintbrush, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About ColorCrafter
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering designers and developers with powerful color tools
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                We believe that great design starts with the perfect color palette. Our mission is to make color selection and management accessible to everyone, from professional designers to hobbyist creators.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Technology</h2>
              </div>
              <p className="text-muted-foreground">
                Built with modern web technologies and color theory principles, ColorCrafter provides accurate and reliable tools for your design workflow.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Paintbrush className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="text-xl font-semibold">Color Theory</h3>
                  <p className="text-muted-foreground">
                    Generate harmonious color schemes using proven color theory principles.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Zap className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="text-xl font-semibold">Quick Export</h3>
                  <p className="text-muted-foreground">
                    Export your palettes in multiple formats for seamless integration.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Code className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="text-xl font-semibold">Developer Tools</h3>
                  <p className="text-muted-foreground">
                    Get CSS variables, JSON, and other developer-friendly formats.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Start Creating</h2>
          <p className="text-xl text-muted-foreground">
            Ready to create beautiful color palettes for your next project?
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link href="/">Try ColorCrafter Now</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}