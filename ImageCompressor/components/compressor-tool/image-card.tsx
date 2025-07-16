"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  XCircle,
  Download,
  Trash2,
  FileImage,
  AlertTriangle,
  ArrowLeftRight,
} from "lucide-react";
import { formatBytes, calculateCompression } from "@/lib/utils";
import { CompressedImage, useCompressorStore } from "@/lib/store";
import { saveAs } from "file-saver";
import { ImageComparisonSlider } from "./image-comparison-slider";
import Image from "next/image";

interface ImageCardProps {
  image: CompressedImage;
}

export function ImageCard({ image }: ImageCardProps) {
  const [showComparison, setShowComparison] = useState(false);
  const removeImage = useCompressorStore((state) => state.removeImage);

  const handleDownload = () => {
    if (!image.compressedBlob) return;

    const filename = image.originalFile.name;
    const extension = filename.split(".").pop();
    const newFilename = filename.replace(
      `.${extension}`,
      `-compressed.${extension}`
    );

    saveAs(image.compressedBlob, newFilename);
  };

  const toggleComparison = () => {
    setShowComparison((prev) => !prev);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="truncate pr-2">
            <p className="font-medium truncate">{image.originalFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {image.originalFile.type.split("/")[1].toUpperCase()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => removeImage(image.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {image.status === "compressed" &&
        showComparison &&
        image.compressedUrl ? (
          <div className="aspect-video relative overflow-hidden">
            <ImageComparisonSlider
              imageA={image.originalUrl}
              imageB={image.compressedUrl}
              onClose={() => setShowComparison(false)}
            />
          </div>
        ) : (
          <div className="aspect-video bg-muted/50 relative overflow-hidden flex items-center justify-center">
            {image.status === "error" ? (
              <div className="flex flex-col items-center text-destructive">
                <AlertTriangle className="h-8 w-8 mb-1" />
                <p className="text-sm">Failed to compress</p>
              </div>
            ) : image.status === "processing" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <Progress value={40} className="w-full mb-2" />
                <p className="text-sm text-muted-foreground">Compressing...</p>
              </div>
            ) : (
              <>
                <Image
                  src={image.originalUrl}
                  alt={image.originalFile.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
                {image.status === "compressed" && (
                  <Button
                    className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
                    size="sm"
                    onClick={toggleComparison}
                  >
                    <ArrowLeftRight className="h-4 w-4 mr-1" /> Compare
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-4 p-4">
        <div>
          <p className="text-sm text-muted-foreground">Original</p>
          <p className="font-medium">{formatBytes(image.originalSize)}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Compressed</p>
          {image.status === "compressed" && image.compressedSize ? (
            <div className="flex items-center justify-end gap-1">
              <p className="font-medium">{formatBytes(image.compressedSize)}</p>
              <span className="text-xs text-green-500 font-medium">
                (-
                {calculateCompression(image.originalSize, image.compressedSize)}
                )
              </span>
            </div>
          ) : (
            <p className="font-medium">
              {image.status === "error" ? "Failed" : "..."}
            </p>
          )}
        </div>

        <Separator className="col-span-2 my-1" />

        <div className="col-span-2 flex justify-between">
          {image.status === "compressed" && (
            <Button onClick={handleDownload} size="sm" className="w-full">
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
          )}

          {image.status === "error" && (
            <Button variant="outline" size="sm" disabled className="w-full">
              <XCircle className="h-4 w-4 mr-1" /> Failed
            </Button>
          )}

          {image.status === "processing" && (
            <Button variant="outline" size="sm" disabled className="w-full">
              Processing...
            </Button>
          )}

          {image.status === "pending" && (
            <Button variant="outline" size="sm" disabled className="w-full">
              <FileImage className="h-4 w-4 mr-1" /> Pending
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
