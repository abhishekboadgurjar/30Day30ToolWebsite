import { Color, PaletteType } from '@/lib/types';

// Generate a random hex color
function randomHex(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Convert hex to RGB
function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

// Convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Create a complete color object from hex
export function createColorFromHex(hex: string): Color {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return {
    hex,
    rgb,
    hsl
  };
}

// Generate a random palette
export function generateRandomPalette(count: number): Color[] {
  const colors: Color[] = [];

  for (let i = 0; i < count; i++) {
    const hex = randomHex();
    colors.push(createColorFromHex(hex));
  }

  return colors;
}

// Generate a color theory based palette
export function generateColorTheoryPalette(
  baseColor: Color,
  type: PaletteType,
  count: number
): Color[] {
  const { h, s, l } = baseColor.hsl;
  const colors: Color[] = [baseColor];

  const pushColorFromHSL = (h: number, s: number, l: number) => {
    const { r, g, b } = hslToRgb(h, s, l);
    colors.push(createColorFromHex(rgbToHex(r, g, b)));
  };

  switch (type) {
    case 'analogous': {
      const angle = 30;
      const remaining = count - 1;
      const half = Math.floor(remaining / 2);

      for (let i = 1; i <= half; i++) {
        pushColorFromHSL((h + angle * i) % 360, s, l);
        if (colors.length < count) {
          pushColorFromHSL((h - angle * i + 360) % 360, s, l);
        }
      }
      break;
    }

    case 'complementary': {
      pushColorFromHSL((h + 180) % 360, s, l);
      if (count > 2) {
        const step = 10;
        for (let i = 1; i <= count - 2; i++) {
          const newL = Math.max(Math.min(l + (i % 2 === 0 ? 1 : -1) * step * Math.ceil(i / 2), 90), 10);
          pushColorFromHSL(h, s, newL);
        }
      }
      break;
    }

    case 'triadic': {
      const angle = 120;
      const h1 = (h + angle) % 360;
      const h2 = (h + 2 * angle) % 360;

      pushColorFromHSL(h1, s, l);
      pushColorFromHSL(h2, s, l);

      if (count > 3) {
        const step = 10;
        for (let i = 1; i <= count - 3; i++) {
          const newL = Math.max(Math.min(l + (i % 2 === 0 ? 1 : -1) * step * Math.ceil(i / 2), 90), 10);
          const hValue = [h, h1, h2][i % 3];
          pushColorFromHSL(hValue, s, newL);
        }
      }
      break;
    }

    case 'tetradic': {
      const tetrad = [(h + 90) % 360, (h + 180) % 360, (h + 270) % 360];

      for (const hValue of tetrad) {
        pushColorFromHSL(hValue, s, l);
      }

      if (count > 4) {
        const step = 10;
        for (let i = 1; i <= count - 4; i++) {
          const newL = Math.max(Math.min(l + (i % 2 === 0 ? 1 : -1) * step * Math.ceil(i / 2), 90), 10);
          const hValue = [h, ...tetrad][i % 4];
          pushColorFromHSL(hValue, s, newL);
        }
      }
      break;
    }

    case 'monochromatic': {
      for (let i = 1; i < count; i++) {
        const step = 100 / (count + 1);
        const newL = Math.max(Math.min(i * step, 90), 10);
        pushColorFromHSL(h, s, newL);
      }
      break;
    }

    default:
      return generateRandomPalette(count);
  }

  return colors.slice(0, count);
}

// Format color value for display
export function formatColorValue(color: Color, format: 'hex' | 'rgb' | 'hsl'): string {
  switch (format) {
    case 'hex':
      return color.hex.toUpperCase();
    case 'rgb':
      return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    case 'hsl':
      return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    default:
      return color.hex.toUpperCase();
  }
}

// Contrast color (black or white) based on background brightness
export function calculateContrastColor(hex: string): string {
  const cleanedHex = hex.replace('#', '');
  const r = parseInt(cleanedHex.substring(0, 2), 16);
  const g = parseInt(cleanedHex.substring(2, 4), 16);
  const b = parseInt(cleanedHex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
