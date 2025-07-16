"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, Shield, Zap } from "lucide-react"

interface MergeStatsProps {
  fileCount: number
  totalSize: number
  estimatedTime: number
}

export function MergeStats({ fileCount, totalSize, estimatedTime }: MergeStatsProps) {
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{fileCount}</p>
            <p className="text-sm text-muted-foreground">Files</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{formatSize(totalSize)}</p>
            <p className="text-sm text-muted-foreground">Total Size</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">~{estimatedTime}s</p>
            <p className="text-sm text-muted-foreground">Est. Time</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">100%</p>
            <p className="text-sm text-muted-foreground">Secure</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
