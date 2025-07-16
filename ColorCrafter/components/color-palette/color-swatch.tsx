"use client";

import { useState } from 'react';
import { Color } from '@/lib/types';
import { formatColorValue, calculateContrastColor } from '@/lib/color-utils';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Expand, 
  Minimize, 
  Palette,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorSwatchProps {
  color: Color;
  index: number;
  expanded: boolean;
  onExpand: () => void;
  onChange?: (newColor: Color) => void;
}

export function ColorSwatch({ 
  color, 
  index, 
  expanded,
  onExpand,
  onChange 
}: ColorSwatchProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const contrastColor = calculateContrastColor(color.hex);
  
  const handleCopy = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: `${format} value copied: ${value}`,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    
    const newHex = e.target.value;
    onChange({
      ...color,
      hex: newHex,
      // In a real implementation, we would calculate these values
      rgb: color.rgb,
      hsl: color.hsl,
    });
  };
  
  return (
    <div 
      className="h-56 md:h-80 w-full flex flex-col items-center justify-center relative group"
      style={{ backgroundColor: color.hex, color: contrastColor }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onExpand}
        style={{ color: contrastColor }}
      >
        {expanded ? <Minimize size={18} /> : <Expand size={18} />}
      </Button>
      
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        {expanded ? (
          <div className="space-y-4 w-full max-w-xs">
            <div className="space-y-2">
              <label className="text-xs font-medium">HEX</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color.hex}
                  onChange={handleColorChange}
                  className={cn(
                    "h-8 w-8 rounded cursor-pointer",
                    onChange ? "" : "pointer-events-none"
                  )}
                />
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={color.hex}
                    onChange={onChange ? handleColorChange : undefined}
                    className={cn(
                      "w-full px-3 py-1 text-sm rounded bg-black/10 dark:bg-white/10",
                      "border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30",
                      onChange ? "" : "pointer-events-none"
                    )}
                    style={{ color: contrastColor }}
                    readOnly={!onChange}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => handleCopy(color.hex, 'HEX')}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium">RGB</label>
              <div className="relative">
                <input
                  type="text"
                  value={formatColorValue(color, 'rgb')}
                  className="w-full px-3 py-1 text-sm rounded bg-black/10 dark:bg-white/10 border border-white/20 focus:outline-none pointer-events-none"
                  style={{ color: contrastColor }}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => handleCopy(formatColorValue(color, 'rgb'), 'RGB')}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium">HSL</label>
              <div className="relative">
                <input
                  type="text"
                  value={formatColorValue(color, 'hsl')}
                  className="w-full px-3 py-1 text-sm rounded bg-black/10 dark:bg-white/10 border border-white/20 focus:outline-none pointer-events-none"
                  style={{ color: contrastColor }}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => handleCopy(formatColorValue(color, 'hsl'), 'HSL')}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-20 w-20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  onClick={() => handleCopy(color.hex, 'HEX')}
                  style={{ 
                    backgroundColor: `${contrastColor}20`,
                    color: contrastColor 
                  }}
                >
                  <Palette className="h-8 w-8" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to copy HEX value</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {!expanded && (
          <div className="mt-2">
            <p className="font-mono text-sm font-medium">{color.hex}</p>
          </div>
        )}
      </div>
    </div>
  );
}