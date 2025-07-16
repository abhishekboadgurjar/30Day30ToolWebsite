"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Settings, BookOpen, FileText, Zap } from "lucide-react"

interface AdvancedOptionsProps {
  options: {
    addBookmarks: boolean
    preserveMetadata: boolean
    optimizeSize: boolean
    pageRanges: Record<string, string>
  }
  onOptionsChange: (options: any) => void
  files: Array<{ id: string; name: string }>
}

export function AdvancedOptions({ options, onOptionsChange, files }: AdvancedOptionsProps) {
  const updateOption = (key: string, value: any) => {
    onOptionsChange({ ...options, [key]: value })
  }

  const updatePageRange = (fileId: string, range: string) => {
    onOptionsChange({
      ...options,
      pageRanges: { ...options.pageRanges, [fileId]: range },
    })
  }

  return (
    <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Settings className="h-5 w-5" />
          Advanced Options
        </CardTitle>
        <CardDescription>Customize your PDF merge with professional features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Merge Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="bookmarks"
              checked={options.addBookmarks}
              onCheckedChange={(checked) => updateOption("addBookmarks", checked)}
            />
            <Label htmlFor="bookmarks" className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4" />
              Add Bookmarks
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="metadata"
              checked={options.preserveMetadata}
              onCheckedChange={(checked) => updateOption("preserveMetadata", checked)}
            />
            <Label htmlFor="metadata" className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              Preserve Metadata
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="optimize"
              checked={options.optimizeSize}
              onCheckedChange={(checked) => updateOption("optimizeSize", checked)}
            />
            <Label htmlFor="optimize" className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4" />
              Optimize Size
            </Label>
          </div>
        </div>

        {/* Page Ranges */}
        {files.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Page Ranges (optional)</Label>
            <div className="grid gap-3">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                  </div>
                  <div className="w-32">
                    <Input
                      placeholder="e.g., 1-5,8"
                      value={options.pageRanges[file.id] || ""}
                      onChange={(e) => updatePageRange(file.id, e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Leave empty to include all pages. Use format: 1-5,8,10-12</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
