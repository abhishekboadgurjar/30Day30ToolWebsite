"use client";

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    title: "How to Build a Perfect Color Palette for Your Brand",
    excerpt: "Learn the essential principles of color theory and how to apply them to create a memorable brand identity that resonates with your audience.",
    date: "April 15, 2025",
    readTime: "8 min read",
    category: "Color Theory",
    image: "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Top Free Tools for Designers in 2025",
    excerpt: "Discover the best free design tools that every creative professional should have in their toolkit this year.",
    date: "April 10, 2025",
    readTime: "6 min read",
    category: "Design Tools",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "How to Extract Colors from Any Image Easily",
    excerpt: "A step-by-step guide to extracting the perfect color palette from your favorite images using ColorCrafter.",
    date: "April 5, 2025",
    readTime: "5 min read",
    category: "Tutorial",
    image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Color & Design Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and inspiration for designers and developers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Button variant="outline" className="w-full gap-2">
                  Read More <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground">
            Get the latest color trends, design tips, and tool updates directly in your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border bg-background px-3 py-2"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}