"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, DownloadCloud, Trash2 } from "lucide-react";
import { useCompressorStore, CompressedImage } from "@/lib/store";
import { saveAs } from "file-saver";
import { createZipFile } from "@/lib/utils";
import { toast } from "sonner";

export function DownloadActions() {
  const { images, clearImages } = useCompressorStore();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const compressedImages = images.filter(
    (img): img is CompressedImage & { compressedBlob: Blob, compressedSize: number } => 
      img.status === 'compressed' && !!img.compressedBlob && !!img.compressedSize
  );
  
  const hasCompressedImages = compressedImages.length > 0;
  const allImagesProcessed = images.every(img => 
    img.status === 'compressed' || img.status === 'error'
  );

  const handleDownloadAll = async () => {
    if (!hasCompressedImages) return;
    
    setIsDownloading(true);
    
    try {
      const files = compressedImages.map(img => ({
        blob: img.compressedBlob,
        filename: img.originalFile.name.replace(
          /(\.[^.]+)$/, 
          '-compressed$1'
        )
      }));
      
      await createZipFile(files);
      toast.success('All compressed images downloaded successfully.');
    } catch (error) {
      console.error('Error creating zip file:', error);
      toast.error('Failed to download images. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClearAll = () => {
    clearImages();
    toast.info('All images removed.');
  };

  if (!allImagesProcessed && images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
      {hasCompressedImages && (
        <Button
          size="lg"
          onClick={handleDownloadAll}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <DownloadCloud className="mr-2 h-5 w-5 animate-bounce" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Download All ({compressedImages.length})
            </>
          )}
        </Button>
      )}
      
      <Button
        variant="outline"
        size="lg"
        onClick={handleClearAll}
      >
        <Trash2 className="mr-2 h-5 w-5" />
        Clear All
      </Button>
    </div>
  );
}