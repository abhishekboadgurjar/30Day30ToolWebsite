"use client";

import { useState } from 'react';
import { Color } from '@/lib/types';
import { ColorSwatch } from '@/components/color-palette/color-swatch';
import { cn } from '@/lib/utils';
import { motion } from '@/lib/framer-motion';

interface ColorPaletteProps {
  colors: Color[];
  onColorChange?: (index: number, newColor: Color) => void;
  interactive?: boolean;
}

export function ColorPalette({ 
  colors, 
  onColorChange,
  interactive = true 
}: ColorPaletteProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden rounded-lg shadow-sm border">
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out relative",
            expandedIndex === index ? "flex-[2]" : "flex-1",
            expandedIndex !== null && expandedIndex !== index ? "flex-[0.5]" : ""
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ColorSwatch
            color={color}
            index={index}
            expanded={expandedIndex === index}
            onExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
            onChange={interactive ? (newColor) => onColorChange?.(index, newColor) : undefined}
          />
        </motion.div>
      ))}
    </div>
  );
}