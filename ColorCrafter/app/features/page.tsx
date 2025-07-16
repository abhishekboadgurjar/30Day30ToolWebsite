"use client";

import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Palette, 
  Upload, 
  Download, 
  Save,
  Moon,
  Droplets,
  Brush,
  Layers,
  Share2,
  Code
} from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Features & Capabilities
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover all the powerful features that make ColorCrafter the perfect tool for your color palette needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>Random color palettes</li>
                <li>Color theory based schemes</li>
                <li>Analogous combinations</li>
                <li>Complementary pairs</li>
                <li>Triadic arrangements</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Image Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>Extract colors from images</li>
                <li>Dominant color detection</li>
                <li>Accent color identification</li>
                <li>Multiple extraction methods</li>
                <li>Instant palette creation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>CSS variables export</li>
                <li>JSON format</li>
                <li>PNG color swatches</li>
                <li>Copy individual colors</li>
                <li>Multiple color formats</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Save & Organize
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>Save favorite palettes</li>
                <li>Organize by projects</li>
                <li>Quick palette loading</li>
                <li>Local storage support</li>
                <li>Palette management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5" />
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>Dark mode support</li>
                <li>Contrast checking</li>
                <li>WCAG compliance tools</li>
                <li>Accessible interface</li>
                <li>Keyboard navigation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Developer Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>API integration ready</li>
                <li>CSS variable generation</li>
                <li>Multiple color formats</li>
                <li>Code snippets</li>
                <li>Framework compatibility</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Advanced Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Droplets className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Color Manipulation</h3>
                    <p className="text-muted-foreground">
                      Advanced tools for adjusting and fine-tuning colors
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Brush className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Custom Schemes</h3>
                    <p className="text-muted-foreground">
                      Create and save your own color schemes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Multiple Formats</h3>
                    <p className="text-muted-foreground">
                      Support for HEX, RGB, HSL, and more
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Share & Collaborate</h3>
                    <p className="text-muted-foreground">
                      Share palettes with team members
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground">
            Try ColorCrafter now and create beautiful color palettes for your projects
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link href="/">Start Generating Colors</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}