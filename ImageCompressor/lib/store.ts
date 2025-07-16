import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CompressionLevel = 'low' | 'medium' | 'high';

export interface CompressedImage {
  id: string;
  originalFile: File;
  originalSize: number;
  compressedBlob?: Blob;
  compressedSize?: number;
  compressedUrl?: string;
  originalUrl: string;
  status: 'pending' | 'processing' | 'compressed' | 'error';
  error?: string;
}

interface CompressorStore {
  images: CompressedImage[];
  compressionLevel: CompressionLevel;
  preserveFormat: boolean;
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  updateImage: (id: string, data: Partial<CompressedImage>) => void;
  setCompressionLevel: (level: CompressionLevel) => void;
  setPreserveFormat: (preserve: boolean) => void;
}

export const useCompressorStore = create<CompressorStore>()(
  persist(
    (set) => ({
      images: [],
      compressionLevel: 'medium',
      preserveFormat: true,
      
      addImages: (files) => set((state) => {
        const newImages = files.map((file) => {
          const id = `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
          return {
            id,
            originalFile: file,
            originalSize: file.size,
            originalUrl: URL.createObjectURL(file),
            status: 'pending',
          } as CompressedImage;
        });
        
        return { images: [...state.images, ...newImages] };
      }),
      
      removeImage: (id) => set((state) => {
        const imageToRemove = state.images.find(img => img.id === id);
        if (imageToRemove) {
          // Revoke object URLs to prevent memory leaks
          if (imageToRemove.originalUrl) URL.revokeObjectURL(imageToRemove.originalUrl);
          if (imageToRemove.compressedUrl) URL.revokeObjectURL(imageToRemove.compressedUrl);
        }
        return { images: state.images.filter(img => img.id !== id) };
      }),
      
      clearImages: () => set((state) => {
        // Revoke all object URLs
        state.images.forEach(img => {
          if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
          if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
        });
        return { images: [] };
      }),
      
      updateImage: (id, data) => set((state) => ({
        images: state.images.map((img) => 
          img.id === id ? { ...img, ...data } : img
        )
      })),
      
      setCompressionLevel: (level) => set({ compressionLevel: level }),
      
      setPreserveFormat: (preserve) => set({ preserveFormat: preserve }),
    }),
    {
      name: 'image-compressor-storage',
      partialize: (state) => ({ 
        compressionLevel: state.compressionLevel,
        preserveFormat: state.preserveFormat
      }),
    }
  )
);