"use client";

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageComparisonSliderProps {
  imageA: string; // Original image URL
  imageB: string; // Compressed image URL
  onClose: () => void;
}

export function ImageComparisonSlider({ imageA, imageB, onClose }: ImageComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const handleMouseDown = () => {
    draggingRef.current = true;
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newPosition = Math.round((x / rect.width) * 100);
    
    setPosition(newPosition);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const newPosition = Math.round((x / rect.width) * 100);
    
    setPosition(newPosition);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Labels */}
      <div className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm text-xs font-medium py-1 px-2 rounded">
        Original
      </div>
      <div className="absolute top-2 right-14 z-10 bg-background/80 backdrop-blur-sm text-xs font-medium py-1 px-2 rounded">
        Compressed
      </div>

      {/* Image B (Compressed) - Full width */}
      <div className="absolute inset-0">
        <Image
          src={imageB}
          alt="Compressed"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Image A (Original) - Partial width based on slider position */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ width: `${position}%` }}
      >
        <Image
          src={imageA}
          alt="Original"
          className="w-full h-full object-contain"
          style={{ 
            width: `${100 / (position / 100)}%`,
            maxWidth: 'none'
          }}
        />
      </div>

      {/* Slider control */}
      <div
        className="absolute inset-y-0 z-10"
        style={{ left: `calc(${position}% - 1px)` }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)]"></div>
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="w-2 h-8 flex items-center justify-center">
            <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}