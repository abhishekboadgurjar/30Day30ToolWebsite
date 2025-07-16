"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Eye, EyeOff, ArrowUp, ArrowDown, X } from "lucide-react"

interface PDFFile {
  file: File
  id: string
  name: string
  size: string
}

interface FilePreviewProps {
  files: PDFFile[]
  onRemove: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
  showPreview: boolean
  onTogglePreview: () => void
}

export function FilePreview({ files, onRemove, onMove, showPreview, onTogglePreview }: FilePreviewProps) {
  if (files.length === 0) return null

  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">Selected Files ({files.length})</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Total: {(files.reduce((sum, file) => sum + file.file.size, 0) / (1024 * 1024)).toFixed(1)} MB
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onTogglePreview}
            className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
          >
            {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showPreview ? "Hide Details" : "Show Details"}
          </Button>
        </div>

        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={file.id}
              className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                showPreview ? "bg-white shadow-sm" : "bg-green-100/50"
              }`}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg text-sm font-bold shadow-sm">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  {showPreview && (
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>Size: {file.size}</span>
                      <span>Type: PDF Document</span>
                      <span>Modified: {new Date(file.file.lastModified).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove(file.id, "up")}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove(file.id, "down")}
                  disabled={index === files.length - 1}
                  className="h-8 w-8 p-0"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(file.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
