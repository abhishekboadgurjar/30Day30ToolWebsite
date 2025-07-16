import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { CompressionLevel } from './store';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function calculateCompression(originalSize: number, compressedSize: number) {
  const reduction = originalSize - compressedSize;
  const percentage = (reduction / originalSize) * 100;
  return percentage.toFixed(1) + '%';
}

export function getCompressionOptions(level: CompressionLevel) {
  switch (level) {
    case 'low':
      return { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: 0.8 };
    case 'medium':
      return { maxSizeMB: 0.5, maxWidthOrHeight: 1600, useWebWorker: true, initialQuality: 0.7 };
    case 'high':
      return { maxSizeMB: 0.2, maxWidthOrHeight: 1200, useWebWorker: true, initialQuality: 0.6 };
    default:
      return { maxSizeMB: 0.5, maxWidthOrHeight: 1600, useWebWorker: true, initialQuality: 0.7 };
  }
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}

export async function createZipFile(compressedImages: { blob: Blob, filename: string }[]) {
  const zip = new JSZip();
  
  compressedImages.forEach(({ blob, filename }) => {
    zip.file(filename, blob);
  });
  
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'compressed-images.zip');
}

export function getImageType(file: File): string {
  return file.type || `image/${getFileExtension(file.name)}`;
}