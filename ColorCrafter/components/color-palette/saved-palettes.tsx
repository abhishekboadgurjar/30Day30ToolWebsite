"use client";

import { SavedPalette } from '@/lib/types';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDate } from '@/lib/utils';

interface SavedPalettesProps {
  palettes: SavedPalette[];
  onRemove: (id: string) => void;
  onSelect: (palette: SavedPalette) => void;
}

export function SavedPalettes({ 
  palettes, 
  onRemove,
  onSelect 
}: SavedPalettesProps) {
  if (palettes.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">No saved palettes</h3>
        <p className="text-muted-foreground">
          Your saved palettes will appear here. Generate and save a palette to get started.
        </p>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {palettes.map((palette) => (
          <div 
            key={palette.id}
            className="border rounded-lg overflow-hidden"
          >
            <div className="flex h-16">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{palette.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {formatDate(palette.createdAt)}
                </span>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={() => onSelect(palette)}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Load
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        palette from your saved palettes.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onRemove(palette.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}