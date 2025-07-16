"use client";

import { useState, useEffect } from 'react';
import { SavedPalette } from '@/lib/types';

export function usePaletteStorage() {
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  
  // Load saved palettes from localStorage on component mount
  useEffect(() => {
    const loadSavedPalettes = () => {
      const savedPalettesJSON = localStorage.getItem('savedPalettes');
      if (savedPalettesJSON) {
        try {
          const parsedPalettes = JSON.parse(savedPalettesJSON);
          setSavedPalettes(parsedPalettes);
        } catch (error) {
          console.error('Error parsing saved palettes:', error);
          setSavedPalettes([]);
        }
      }
    };
    
    loadSavedPalettes();
  }, []);
  
  // Save palettes to localStorage whenever the savedPalettes state changes
  useEffect(() => {
    if (savedPalettes.length > 0) {
      localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
    }
  }, [savedPalettes]);
  
  // Add a new palette to savedPalettes
  const savePalette = (palette: SavedPalette) => {
    setSavedPalettes((prevPalettes) => [...prevPalettes, palette]);
  };
  
  // Remove a palette by id
  const removePalette = (id: string) => {
    setSavedPalettes((prevPalettes) => 
      prevPalettes.filter((palette) => palette.id !== id)
    );
    
    // If we've removed all palettes, clear localStorage
    if (savedPalettes.length === 1) {
      localStorage.removeItem('savedPalettes');
    }
  };
  
  return {
    savedPalettes,
    savePalette,
    removePalette,
  };
}