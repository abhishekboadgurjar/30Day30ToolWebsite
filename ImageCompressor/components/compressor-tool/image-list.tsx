"use client";

import { useEffect } from "react";
import imageCompression from "browser-image-compression";
import { CompressedImage, useCompressorStore } from "@/lib/store";
import { formatBytes, calculateCompression, getCompressionOptions, getImageType } from "@/lib/utils";
import { ImageCard } from "./image-card";
import { toast } from "sonner";

export function ImageList() {
  const { 
    images, 
    updateImage, 
    compressionLevel, 
    preserveFormat 
  } = useCompressorStore();

  useEffect(() => {
    // Process pending images
    const pendingImages = images.filter(img => img.status === 'pending');
    
    if (pendingImages.length === 0) return;

    const processImages = async () => {
      for (const image of pendingImages) {
        try {
          updateImage(image.id, { status: 'processing' });
          
          const options = {
            ...getCompressionOptions(compressionLevel),
            fileType: preserveFormat ? getImageType(image.originalFile) : 'image/jpeg',
          };

          const compressedFile = await imageCompression(image.originalFile, options);
          const compressedUrl = URL.createObjectURL(compressedFile);
          
          updateImage(image.id, {
            compressedBlob: compressedFile,
            compressedSize: compressedFile.size,
            compressedUrl,
            status: 'compressed',
          });
        } catch (error) {
          console.error('Error compressing image:', error);
          updateImage(image.id, { 
            status: 'error',
            error: 'Failed to compress image'
          });
          toast.error(`Failed to compress ${image.originalFile.name}`);
        }
      }
    };
    
    processImages();
  }, [images, updateImage, compressionLevel, preserveFormat]);

  if (images.length === 0) {
    return null;
  }

  // Calculate total stats
  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const compressedImages = images.filter(img => img.status === 'compressed');
  const totalCompressedSize = compressedImages.reduce((sum, img) => sum + (img.compressedSize || 0), 0);
  const compressionRatio = compressedImages.length > 0 
    ? calculateCompression(
        compressedImages.reduce((sum, img) => sum + img.originalSize, 0),
        totalCompressedSize
      )
    : '0%';

  return (
    <div>
      {/* Summary stats */}
      <div className="bg-muted p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Images</p>
            <p className="text-2xl font-bold">{images.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Original Size</p>
            <p className="text-2xl font-bold">{formatBytes(totalOriginalSize)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Compressed Size</p>
            <p className="text-2xl font-bold">{formatBytes(totalCompressedSize)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Reduction</p>
            <p className="text-2xl font-bold text-green-500">{compressionRatio}</p>
          </div>
        </div>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}