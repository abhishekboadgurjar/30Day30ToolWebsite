"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, 
  Trash2, 
  FileText, 
  Clock, 
  Hash, 
  Type,
  BookOpen,
  BarChart3,
  CheckCircle2,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

export function CharacterCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const calculateStats = useCallback((input: string): TextStats => {
    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, '').length;
    const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
    const sentences = input.trim() === '' ? 0 : input.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = input.trim() === '' ? 0 : input.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    };
  }, []);

  useEffect(() => {
    setStats(calculateStats(text));
  }, [text, calculateStats]);

  const handleCopy = async () => {
    if (!text.trim()) {
      toast({
        title: "Nothing to copy",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Text copied!",
        description: "Your text has been copied to the clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setText('');
    toast({
      title: "Text cleared",
      description: "All text has been removed.",
    });
  };

  const StatCard = ({ 
    icon: Icon, 
    label, 
    value, 
    description,
    color = "default" 
  }: { 
    icon: React.ElementType;
    label: string;
    value: string | number;
    description?: string;
    color?: "default" | "primary" | "secondary";
  }) => (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            color === "primary" ? "bg-primary/10 text-primary" :
            color === "secondary" ? "bg-secondary/50 text-secondary-foreground" :
            "bg-muted text-muted-foreground"
          }`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary mr-3">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Character & Word Counter
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional text analysis tool for writers, bloggers, and SEO professionals. 
          Get real-time character, word, and reading time statistics.
        </p>
      </div>

      {/* Theme Toggle */}
      <div className="flex justify-end mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="gap-2"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Text Input Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Text Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start typing or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[300px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-primary/20"
                aria-label="Text input area"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    disabled={!text.trim()}
                    className="gap-2"
                    variant={copied ? "default" : "outline"}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </Button>
                  <Button
                    onClick={handleClear}
                    disabled={!text.trim()}
                    variant="outline"
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stats.characters}/∞ characters
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Text Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatCard
                icon={Type}
                label="Characters"
                value={stats.characters.toLocaleString()}
                description="Including spaces"
                color="primary"
              />
              
              <StatCard
                icon={Hash}
                label="Characters (no spaces)"
                value={stats.charactersNoSpaces.toLocaleString()}
                description="Excluding spaces"
              />
              
              <Separator />
              
              <StatCard
                icon={BookOpen}
                label="Words"
                value={stats.words.toLocaleString()}
                color="secondary"
              />
              
              <StatCard
                icon={FileText}
                label="Sentences"
                value={stats.sentences.toLocaleString()}
              />
              
              <StatCard
                icon={FileText}
                label="Paragraphs"
                value={stats.paragraphs.toLocaleString()}
              />
              
              <Separator />
              
              <StatCard
                icon={Clock}
                label="Reading Time"
                value={stats.readingTime === 1 ? '1 minute' : `${stats.readingTime} minutes`}
                description="Based on 200 words/min"
                color="primary"
              />
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">💡 Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Perfect for social media posts, essays, and articles</p>
              <p>• Reading time based on average adult reading speed</p>
              <p>• Use keyboard shortcuts: Ctrl+A (select), Ctrl+C (copy)</p>
              <p>• Statistics update in real-time as you type</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}