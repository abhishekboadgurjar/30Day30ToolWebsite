"use client";

import { useState } from 'react';
import { Color } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Code, Clipboard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCssVariables, generateJsonFormat } from '@/lib/export-utils';

interface PaletteActionsProps {
  colors: Color[];
}

export function PaletteActions({ colors }: PaletteActionsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const handleCopyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied to your clipboard.`,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const downloadPalette = (format: string) => {
    let content = '';
    let filename = '';
    let type = '';
    
    if (format === 'css') {
      content = generateCssVariables(colors);
      filename = 'palette.css';
      type = 'text/css';
    } else if (format === 'json') {
      content = generateJsonFormat(colors);
      filename = 'palette.json';
      type = 'application/json';
    }
    
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: `Your palette has been downloaded as ${filename}.`,
    });
  };
  
  // In a real implementation, we would handle PNG export using canvas
  const downloadPNG = () => {
    toast({
      title: "Feature coming soon",
      description: "PNG export will be available in the next update.",
    });
  };
  
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Palette
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Palette</DialogTitle>
            <DialogDescription>
              Download or copy your color palette in different formats.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="css" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="png">PNG</TabsTrigger>
            </TabsList>
            
            <TabsContent value="css" className="space-y-4 mt-4">
              <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                <pre className="text-xs font-mono">
                  {generateCssVariables(colors)}
                </pre>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => handleCopyToClipboard(generateCssVariables(colors), 'CSS variables')}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  Copy to Clipboard
                </Button>
                <Button 
                  className="flex-1 gap-2"
                  onClick={() => downloadPalette('css')}
                >
                  <Download className="h-4 w-4" />
                  Download CSS
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="json" className="space-y-4 mt-4">
              <div className="bg-muted p-4 rounded-md overflow-auto max-h-60">
                <pre className="text-xs font-mono">
                  {generateJsonFormat(colors)}
                </pre>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => handleCopyToClipboard(generateJsonFormat(colors), 'JSON')}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  Copy to Clipboard
                </Button>
                <Button 
                  className="flex-1 gap-2"
                  onClick={() => downloadPalette('json')}
                >
                  <Download className="h-4 w-4" />
                  Download JSON
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="png" className="space-y-4 mt-4">
              <div className="flex gap-2 h-24">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-md"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              
              <Button 
                className="w-full gap-2"
                onClick={downloadPNG}
              >
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="sm:justify-start">
            <div className="text-sm text-muted-foreground">
              You can use these colors in your projects by copying the code or downloading the files.
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}