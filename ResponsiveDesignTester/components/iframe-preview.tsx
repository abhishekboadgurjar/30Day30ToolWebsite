"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Monitor, Loader2, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface IframePreviewProps {
  url: string
  width: number
  height: number
  isFullscreen: boolean
  isLoading: boolean
  deviceName: string
}

export default function IframePreview({ url, width, height, isFullscreen, isLoading, deviceName }: IframePreviewProps) {
  const [scale, setScale] = useState(1)
  const [iframeLoading, setIframeLoading] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  // Calculate scale to fit the iframe within the container
  useEffect(() => {
    const updateScale = () => {
      const container = document.getElementById("iframe-container")
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const availableWidth = containerRect.width - 32 // padding
      const availableHeight = isFullscreen ? window.innerHeight - 100 : Math.min(containerRect.width * 0.6, 600)

      const scaleX = availableWidth / width
      const scaleY = availableHeight / height
      setScale(Math.min(scaleX, scaleY, 1))
    }

    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [width, height, isFullscreen])

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIframeLoading(false)
    setIframeError(false)
  }

  const handleIframeError = () => {
    setIframeLoading(false)
    setIframeError(true)
  }

  useEffect(() => {
    if (url) {
      setIframeLoading(true)
      setIframeError(false)
    }
  }, [url])

  if (!url) {
    return (
      <div
        id="iframe-container"
        className="flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/20"
        style={{
          height: isFullscreen ? "calc(100vh - 100px)" : "500px",
          minHeight: "400px",
        }}
      >
        <div className="text-center p-8 space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Monitor className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Ready to Test</h3>
            <p className="text-muted-foreground leading-relaxed">
              Enter a website URL above to see how it looks on different devices. Perfect for testing responsive
              designs!
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline">Mobile Friendly</Badge>
            <Badge variant="outline">Real-time Preview</Badge>
            <Badge variant="outline">Multiple Devices</Badge>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      id="iframe-container"
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg",
        isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : "bg-gradient-to-br from-muted/10 to-background",
      )}
      style={{
        height: isFullscreen ? "100vh" : "600px",
        minHeight: "400px",
      }}
    >
      {/* Fullscreen close button */}
      {isFullscreen && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {/* Device info badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-background/80 backdrop-blur-sm text-foreground border">{deviceName} Preview</Badge>
      </div>

      {/* Loading state */}
      {(isLoading || iframeLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">Loading website...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {iframeError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
          <div className="text-center space-y-3 p-6">
            <AlertTriangle className="h-8 w-8 mx-auto text-orange-500" />
            <div className="space-y-1">
              <p className="font-medium">Unable to load website</p>
              <p className="text-sm text-muted-foreground">
                The website might block embedding or have CORS restrictions
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Iframe container with device frame */}
      <div
        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden border-8 border-gray-300 dark:border-gray-700"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        {/* Device frame decoration */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-400 dark:bg-gray-600 rounded-full z-10"></div>

        <iframe
          src={url}
          width={width}
          height={height}
          className="border-0 w-full h-full"
          title={`Website Preview - ${deviceName}`}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>

      {/* Scale indicator */}
      {scale < 1 && (
        <div className="absolute bottom-4 right-4">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {Math.round(scale * 100)}% scale
          </Badge>
        </div>
      )}
    </div>
  )
}
