"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage } from 'lucide-react';
import { useCompressorStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function FileUploader() {
  const addImages = useCompressorStore(state => state.addImages);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/jpeg') || 
      file.type.startsWith('image/png') || 
      file.type.startsWith('image/webp')
    );
    
    if (imageFiles.length === 0) {
      toast.error('Please upload JPG, PNG, or WEBP images only.');
      return;
    }
    
    if (imageFiles.length !== acceptedFiles.length) {
      toast.warning(`${acceptedFiles.length - imageFiles.length} files were skipped because they're not supported images.`);
    }
    
    addImages(imageFiles);
    
    if (imageFiles.length > 0) {
      toast.success(`${imageFiles.length} ${imageFiles.length === 1 ? 'image' : 'images'} added successfully.`);
    }
  }, [addImages]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: true
  });

  return (
    <div 
      {...getRootProps()} 
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
        "hover:border-primary/50 hover:bg-muted/50",
        isDragActive ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="bg-primary/10 rounded-full p-3">
          {isDragActive ? (
            <FileImage className="h-8 w-8 text-primary animate-pulse" />
          ) : (
            <Upload className="h-8 w-8 text-primary" />
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-1">
            {isDragActive ? "Drop images here" : "Drag & drop images here"}
          </h3>
          <p className="text-muted-foreground mb-4">
            JPG, PNG, WEBP up to 20MB each
          </p>
          
          <Button variant="outline" type="button" className="mt-2">
            Select Files
          </Button>
        </div>
      </div>
    </div>
  );
}