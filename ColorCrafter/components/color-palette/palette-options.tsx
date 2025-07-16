"use client";

import { PaletteType } from '@/lib/types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface PaletteOptionsProps {
  paletteType: PaletteType;
  setPaletteType: (type: PaletteType) => void;
  colorCount: number;
  setColorCount: (count: number) => void;
}

export function PaletteOptions({ 
  paletteType, 
  setPaletteType,
  colorCount,
  setColorCount 
}: PaletteOptionsProps) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="generation" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="generation">Generation Method</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generation" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="palette-type">Palette Type</Label>
              <Select 
                value={paletteType} 
                onValueChange={(value) => setPaletteType(value as PaletteType)}
              >
                <SelectTrigger id="palette-type">
                  <SelectValue placeholder="Select palette type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random</SelectItem>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                  <SelectItem value="tetradic">Tetradic</SelectItem>
                  <SelectItem value="monochromatic">Monochromatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="color-count">Number of Colors: {colorCount}</Label>
              </div>
              <Slider
                id="color-count"
                min={3}
                max={8}
                step={1}
                value={[colorCount]}
                onValueChange={(value) => setColorCount(value[0])}
              />
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground pt-2">
            {paletteType === 'random' && (
              <p>Generate a completely random color palette.</p>
            )}
            {paletteType === 'analogous' && (
              <p>Colors that are adjacent to each other on the color wheel, creating a harmonious and cohesive look.</p>
            )}
            {paletteType === 'complementary' && (
              <p>Colors that are opposite each other on the color wheel, creating a high contrast and vibrant look.</p>
            )}
            {paletteType === 'triadic' && (
              <p>Three colors that are evenly spaced around the color wheel, creating a balanced and vibrant look.</p>
            )}
            {paletteType === 'tetradic' && (
              <p>Four colors arranged into two complementary pairs, offering rich and varied color schemes.</p>
            )}
            {paletteType === 'monochromatic' && (
              <p>Different shades and tints of a single color, creating a subtle and elegant look.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="export-format">Export Format</Label>
              <Select defaultValue="hex">
                <SelectTrigger id="export-format">
                  <SelectValue placeholder="Select export format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hex">HEX</SelectItem>
                  <SelectItem value="rgb">RGB</SelectItem>
                  <SelectItem value="hsl">HSL</SelectItem>
                  <SelectItem value="css">CSS Variables</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="extraction-method">Color Extraction Method</Label>
              <Select defaultValue="dominant">
                <SelectTrigger id="extraction-method">
                  <SelectValue placeholder="Select extraction method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dominant">Dominant Colors</SelectItem>
                  <SelectItem value="vibrant">Vibrant Colors</SelectItem>
                  <SelectItem value="muted">Muted Colors</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}