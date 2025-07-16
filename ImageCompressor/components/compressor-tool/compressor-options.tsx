"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { CompressionLevel, useCompressorStore } from "@/lib/store";

export function CompressorOptions() {
  const { 
    compressionLevel, 
    setCompressionLevel, 
    preserveFormat, 
    setPreserveFormat
  } = useCompressorStore();

  const handleCompressionChange = (value: string) => {
    setCompressionLevel(value as CompressionLevel);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Compression Level</h3>
        <RadioGroup 
          value={compressionLevel} 
          onValueChange={handleCompressionChange}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low" className="flex-1">
              <div className="flex justify-between">
                <span>Low</span>
                <span className="text-muted-foreground text-sm">Minimal compression (larger files, best quality)</span>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="flex-1">
              <div className="flex justify-between">
                <span>Medium</span>
                <span className="text-muted-foreground text-sm">Balanced compression (recommended)</span>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high" className="flex-1">
              <div className="flex justify-between">
                <span>High</span>
                <span className="text-muted-foreground text-sm">Maximum compression (smallest files)</span>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Output Settings</h3>
        <div className="flex items-center justify-between rounded-md border p-4">
          <Label htmlFor="preserve-format" className="flex-1">
            <div className="space-y-0.5">
              <div>Preserve original format</div>
              <div className="text-sm text-muted-foreground">Keep original file formats (JPG, PNG, WEBP)</div>
            </div>
          </Label>
          <Switch
            id="preserve-format"
            checked={preserveFormat}
            onCheckedChange={setPreserveFormat}
          />
        </div>
      </div>
    </div>
  );
}