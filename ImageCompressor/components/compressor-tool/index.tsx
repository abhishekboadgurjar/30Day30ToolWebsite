"use client";

import { CompressorOptions } from "./compressor-options";
import { FileUploader } from "./file-uploader";
import { ImageList } from "./image-list";
import { DownloadActions } from "./download-actions";
import { useCompressorStore } from "@/lib/store";

export function CompressorTool() {
  const { images } = useCompressorStore();
  const hasImages = images.length > 0;

  return (
    <section id="compressor-section" className="py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-lg border overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Image Compressor Tool
            </h2>
            
            <div className="mb-6">
              <CompressorOptions />
            </div>

            <FileUploader />

            {hasImages && (
              <div className="mt-8 space-y-8">
                <ImageList />
                <DownloadActions />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}