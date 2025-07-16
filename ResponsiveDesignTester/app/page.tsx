"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  RotateCw,
  Maximize,
  RefreshCw,
  Moon,
  Sun,
  ExternalLink,
  AlertCircle,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DeviceSelector from "@/components/device-selector"
import IframePreview from "@/components/iframe-preview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Device presets with dimensions and descriptions
const devices = [
  { name: "Mobile", width: 375, height: 667, icon: Smartphone, description: "iPhone X" },
  { name: "Tablet", width: 768, height: 1024, icon: Tablet, description: "iPad" },
  { name: "Laptop", width: 1366, height: 768, icon: Laptop, description: "Standard Laptop" },
  { name: "Desktop", width: 1920, height: 1080, icon: Monitor, description: "Full HD" },
]

export default function Home() {
  const [url, setUrl] = useState("")
  const [inputUrl, setInputUrl] = useState("")
  const [selectedDevice, setSelectedDevice] = useState(devices[0])
  const [isLandscape, setIsLandscape] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate current dimensions based on device and orientation
  const currentDimensions = isLandscape
    ? { width: selectedDevice.height, height: selectedDevice.width }
    : { width: selectedDevice.width, height: selectedDevice.height }

  // Validate URL format
  const isValidUrl = (string: string) => {
    try {
      new URL(string.startsWith("http") ? string : `https://${string}`)
      return true
    } catch (_) {
      return false
    }
  }

  // Handle URL submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!inputUrl.trim()) {
      setError("Please enter a URL")
      return
    }

    if (!isValidUrl(inputUrl.trim())) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)

    // Add https:// if not present
    let formattedUrl = inputUrl.trim()
    if (formattedUrl && !formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`
    }

    setUrl(formattedUrl)
    setTimeout(() => setIsLoading(false), 1000) // Simulate loading
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Reset the preview
  const resetPreview = () => {
    setUrl("")
    setInputUrl("")
    setSelectedDevice(devices[0])
    setIsLandscape(false)
    setIsFullscreen(false)
    setError("")
    setIsLoading(false)
  }

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isFullscreen])

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* URL Input Section */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Test Your Website's Responsiveness</h2>
                <p className="text-muted-foreground">Enter any URL to preview how it looks across different devices</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Enter website URL (e.g., example.com, google.com)"
                      value={inputUrl}
                      onChange={(e) => {
                        setInputUrl(e.target.value)
                        setError("")
                      }}
                      className="h-12 text-base pl-4 pr-12 border-2 focus:border-primary transition-colors"
                      disabled={isLoading}
                    />
                    <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" size="lg" className="h-12 px-8 font-semibold" disabled={isLoading}>
                      {isLoading ? "Loading..." : "Preview"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="h-12 px-4"
                      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-950/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Device Selection Section */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Device Presets</h3>
                <Badge variant="secondary" className="text-sm">
                  {selectedDevice.name} - {selectedDevice.description}
                </Badge>
              </div>
              <DeviceSelector devices={devices} selectedDevice={selectedDevice} onSelectDevice={setSelectedDevice} />
            </div>
          </CardContent>
        </Card>

        {/* Controls Section */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsLandscape(!isLandscape)}
                  className="flex items-center gap-2 h-10 px-4 font-medium transition-all hover:scale-105"
                  disabled={!url}
                >
                  <RotateCw className="h-4 w-4" />
                  {isLandscape ? "Portrait" : "Landscape"}
                </Button>

                <Button
                  variant="outline"
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 h-10 px-4 font-medium transition-all hover:scale-105"
                  disabled={!url}
                >
                  <Maximize className="h-4 w-4" />
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </Button>

                <Button
                  variant="outline"
                  onClick={resetPreview}
                  className="flex items-center gap-2 h-10 px-4 font-medium transition-all hover:scale-105"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-sm font-mono px-3 py-1">
                  {currentDimensions.width} × {currentDimensions.height}
                </Badge>
                <Badge variant={isLandscape ? "default" : "secondary"} className="text-sm">
                  {isLandscape ? "Landscape" : "Portrait"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
          <IframePreview
            url={url}
            width={currentDimensions.width}
            height={currentDimensions.height}
            isFullscreen={isFullscreen}
            isLoading={isLoading}
            deviceName={selectedDevice.name}
          />
        </Card>
      </main>

      <Footer />
    </div>
  )
}
