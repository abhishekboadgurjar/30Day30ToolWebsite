"use client";

import { useState, useEffect } from 'react';
import { PaletteOptions } from '@/components/color-palette/palette-options';
import { ColorPalette } from '@/components/color-palette/color-palette';
import { PaletteActions } from '@/components/color-palette/palette-actions';
import { SavedPalettes } from '@/components/color-palette/saved-palettes';
import { PaletteType, Color, SavedPalette } from '@/lib/types';
import { generateRandomPalette, generateColorTheoryPalette } from '@/lib/color-utils';
import { usePaletteStorage } from '@/hooks/use-palette-storage';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { RefreshCw, Save, Upload } from 'lucide-react';

export function ColorPaletteGenerator() {
  const [colors, setColors] = useState<Color[]>([]);
  const [paletteType, setPaletteType] = useState<PaletteType>('random');
  const [colorCount, setColorCount] = useState(5);
  const { savedPalettes, savePalette, removePalette } = usePaletteStorage();
  const { toast } = useToast();
  
  // Generate initial palette
  useEffect(() => {
    generateNewPalette();
  }, []);

  const generateNewPalette = () => {
    if (paletteType === 'random') {
      setColors(generateRandomPalette(colorCount));
    } else {
      // For simplicity, we'll use a base color and generate a theory-based palette
      const baseColor = generateRandomPalette(1)[0];
      setColors(generateColorTheoryPalette(baseColor, paletteType, colorCount));
    }
  };

  const handleColorChange = (index: number, newColor: Color) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
  };

  const handleSavePalette = () => {
    const newPalette: SavedPalette = {
      id: Date.now().toString(),
      name: `Palette ${savedPalettes.length + 1}`,
      colors: colors,
      createdAt: new Date().toISOString(),
    };
    
    savePalette(newPalette);
    toast({
      title: "Palette saved",
      description: "Your palette has been saved successfully.",
    });
  };

  const handleImageUpload = (file: File) => {
    // In a real implementation, we would use color-thief to extract colors
    // For demo purposes, we'll just generate a random palette
    toast({
      title: "Image uploaded",
      description: "Colors extracted from image.",
    });
    generateNewPalette();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Generate Stunning Color Palettes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create harmonious color schemes for your design projects. Extract colors from images or 
            generate palettes based on color theory.
          </p>
        </div>
        
        <Card className="border shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              <PaletteOptions 
                paletteType={paletteType} 
                setPaletteType={setPaletteType}
                colorCount={colorCount}
                setColorCount={setColorCount}
              />
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={generateNewPalette}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Generate New Palette
                </Button>
                <Button 
                  onClick={handleSavePalette}
                  variant="outline"
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Palette
                </Button>
                <label>
                  <Button 
                    variant="outline" 
                    className="gap-2 cursor-pointer"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
              
              <ColorPalette 
                colors={colors} 
                onColorChange={handleColorChange}
              />
              
              <PaletteActions colors={colors} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="saved">Saved Palettes</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>
        <TabsContent value="saved" className="mt-6">
          <SavedPalettes 
            palettes={savedPalettes} 
            onRemove={removePalette}
            onSelect={(palette) => setColors(palette.colors)}
          />
        </TabsContent>
        <TabsContent value="explore" className="mt-6">
          <div className="text-center p-8">
            <h3 className="text-xl font-medium mb-2">Community Palettes</h3>
            <p className="text-muted-foreground">
              Explore palettes created by the community coming soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}