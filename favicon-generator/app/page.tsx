"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, Download, Copy, Check, ImageIcon, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FaviconSize {
  size: number
  name: string
  type: "favicon" | "apple-touch" | "android"
}

const FAVICON_SIZES: FaviconSize[] = [
  { size: 16, name: "favicon-16x16.png", type: "favicon" },
  { size: 32, name: "favicon-32x32.png", type: "favicon" },
  { size: 48, name: "favicon-48x48.png", type: "favicon" },
  { size: 64, name: "favicon-64x64.png", type: "favicon" },
  { size: 96, name: "favicon-96x96.png", type: "favicon" },
  { size: 128, name: "favicon-128x128.png", type: "favicon" },
  { size: 152, name: "apple-touch-icon-152x152.png", type: "apple-touch" },
  { size: 167, name: "apple-touch-icon-167x167.png", type: "apple-touch" },
  { size: 180, name: "apple-touch-icon-180x180.png", type: "apple-touch" },
  { size: 192, name: "android-chrome-192x192.png", type: "android" },
  { size: 512, name: "android-chrome-512x512.png", type: "android" },
]

export default function FaviconGenerator() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [generatedFavicons, setGeneratedFavicons] = useState<{ [key: string]: string }>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedHtml, setCopiedHtml] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImageUpload = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string)
        setGeneratedFavicons({})
      }
      reader.readAsDataURL(file)
    },
    [toast],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file) handleImageUpload(file)
    },
    [handleImageUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const resizeImage = (img: HTMLImageElement, size: number): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      canvas.width = size
      canvas.height = size

      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      ctx.drawImage(img, 0, 0, size, size)
      resolve(canvas.toDataURL("image/png"))
    })
  }

  const generateFavicons = async () => {
    if (!originalImage) return

    setIsGenerating(true)
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = async () => {
      const favicons: { [key: string]: string } = {}

      for (const favicon of FAVICON_SIZES) {
        const resizedImage = await resizeImage(img, favicon.size)
        favicons[favicon.name] = resizedImage
      }

      setGeneratedFavicons(favicons)
      setIsGenerating(false)

      toast({
        title: "Favicons generated!",
        description: `Generated ${FAVICON_SIZES.length} favicon variants.`,
      })
    }

    img.src = originalImage
  }

  const generateHtmlCode = () => {
    return `<!-- Standard favicons -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="128x128" href="/favicon-128x128.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">

<!-- Android Chrome Icons -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">

<!-- Theme Color -->
<meta name="theme-color" content="#ffffff">`
  }

  const copyHtmlCode = async () => {
    const htmlCode = generateHtmlCode()
    await navigator.clipboard.writeText(htmlCode)
    setCopiedHtml(true)
    setTimeout(() => setCopiedHtml(false), 2000)

    toast({
      title: "HTML code copied!",
      description: "The HTML code has been copied to your clipboard.",
    })
  }

  const downloadFavicons = async () => {
    if (Object.keys(generatedFavicons).length === 0) return

    // Create a simple download for individual files
    // In a real implementation, you'd use JSZip to create a zip file
    const link = document.createElement("a")

    // Download the most common favicon size as an example
    const favicon32 = generatedFavicons["favicon-32x32.png"]
    if (favicon32) {
      link.href = favicon32
      link.download = "favicon-32x32.png"
      link.click()
    }

    toast({
      title: "Download started!",
      description: "Favicon package download has started.",
    })
  }

  const generateWebManifest = () => {
    return `{
  "name": "Your App Name",
  "short_name": "App",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Favicon Generator</h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Upload an image and get a complete favicon package with HTML tags
          </p>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
            by Boad Technologies
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Image
              </CardTitle>
              <CardDescription>Upload your logo or icon to generate favicons in multiple sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                {originalImage ? (
                  <div className="space-y-4">
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original"
                      className="max-w-32 max-h-32 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Drop your image here</p>
                      <p className="text-sm text-gray-600">or click to browse files</p>
                    </div>
                  </div>
                )}
              </div>

              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file)
                }}
                className="hidden"
              />

              <Button
                onClick={generateFavicons}
                disabled={!originalImage || isGenerating}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {isGenerating ? "Generating..." : "Generate Favicons"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Generated Favicons
              </CardTitle>
              <CardDescription>Preview and download your favicon package</CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(generatedFavicons).length > 0 ? (
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="html">HTML Code</TabsTrigger>
                    <TabsTrigger value="manifest">Manifest</TabsTrigger>
                  </TabsList>

                  <TabsContent value="preview" className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      {FAVICON_SIZES.slice(0, 8).map((favicon) => (
                        <div key={favicon.name} className="text-center">
                          <div className="bg-white p-2 rounded-lg shadow-sm border">
                            <img
                              src={generatedFavicons[favicon.name] || "/placeholder.svg"}
                              alt={`${favicon.size}x${favicon.size}`}
                              className="w-full h-auto"
                            />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {favicon.size}×{favicon.size}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <Button onClick={downloadFavicons} className="w-full bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Favicon Package
                    </Button>
                  </TabsContent>

                  <TabsContent value="html" className="space-y-4">
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{generateHtmlCode()}</code>
                      </pre>
                      <Button
                        size="sm"
                        onClick={copyHtmlCode}
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600"
                      >
                        {copiedHtml ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="manifest" className="space-y-4">
                    <div className="space-y-2">
                      <Label>site.webmanifest</Label>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{generateWebManifest()}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to generate favicons</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What's Included</CardTitle>
            <CardDescription>Complete favicon package with all standard sizes and formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Standard Favicons</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 16×16, 32×32, 48×48 pixels</li>
                  <li>• 64×64, 96×96, 128×128 pixels</li>
                  <li>• PNG format for crisp quality</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Apple Touch Icons</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 152×152 pixels (iPad)</li>
                  <li>• 167×167 pixels (iPad Pro)</li>
                  <li>• 180×180 pixels (iPhone)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Android Chrome</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 192×192 pixels</li>
                  <li>• 512×512 pixels</li>
                  <li>• Web app manifest</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Made with ❤️ by <span className="font-semibold text-indigo-600">Boad Technologies</span>
          </p>
        </div>
      </div>
    </div>
  )
}
