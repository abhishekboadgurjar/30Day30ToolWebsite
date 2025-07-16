import { Color } from '@/lib/types';

// Generate CSS variables from colors
export function generateCssVariables(colors: Color[]): string {
  let css = `:root {\n`;
  
  colors.forEach((color, index) => {
    css += `  --color-${index + 1}: ${color.hex};\n`;
    css += `  --color-${index + 1}-rgb: ${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b};\n`;
    css += `  --color-${index + 1}-hsl: ${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%;\n`;
  });
  
  css += `}\n\n`;
  
  css += `/* Color utility classes */\n`;
  colors.forEach((color, index) => {
    css += `.bg-color-${index + 1} { background-color: var(--color-${index + 1}); }\n`;
    css += `.text-color-${index + 1} { color: var(--color-${index + 1}); }\n`;
  });
  
  return css;
}

// Generate JSON format for colors
export function generateJsonFormat(colors: Color[]): string {
  const colorObj = colors.reduce((acc, color, index) => {
    acc[`color${index + 1}`] = {
      hex: color.hex,
      rgb: color.rgb,
      hsl: color.hsl
    };
    return acc;
  }, {} as Record<string, any>);
  
  return JSON.stringify(colorObj, null, 2);
}

// In a real implementation, we would add more export formats here