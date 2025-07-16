export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export type PaletteType = 'random'|'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'monochromatic';

export interface Color {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
  };
}

export interface SavedPalette {
  id: string;
  name: string;
  colors: Color[];
  createdAt: string;
}
export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

