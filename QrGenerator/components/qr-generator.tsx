"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { QRScanner } from "@/components/qr-scanner"
import { FavoritesList } from "@/components/favorites-list"
import { ShareDialog } from "@/components/share-dialog"
import { Download, Heart, Camera, Share2, Palette, Settings, History } from "lucide-react"
import QRCode from "qrcode"
import { toast } from "@/hooks/use-toast"

interface QROptions {
  text: string
  size: number
  foregroundColor: string
  backgroundColor: string
  errorCorrectionLevel: "L" | "M" | "Q" | "H"
  margin: number
  type: "text" | "url" | "email" | "phone" | "sms" | "wifi" | "vcard"
}

interface ContactInfo {
  firstName: string
  lastName: string
  organization: string
  phone: string
  email: string
  url: string
}

interface WiFiInfo {
  ssid: string
  password: string
  security: "WPA" | "WEP" | "nopass"
  hidden: boolean
}

export default function QRGenerator() {
  const [qrOptions, setQROptions] = useState<QROptions>({
    text: "Hello, World!",
    size: 256,
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    errorCorrectionLevel: "M",
    margin: 4,
    type: "text",
  })

  const [qrDataURL, setQrDataURL] = useState<string>("")
  const [qrSVG, setQrSVG] = useState<string>("")
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    organization: "",
    phone: "",
    email: "",
    url: "",
  })
  const [wifiInfo, setWifiInfo] = useState<WiFiInfo>({
    ssid: "",
    password: "",
    security: "WPA",
    hidden: false,
  })
  const [favorites, setFavorites] = useState<
    Array<{ id: string; text: string; options: QROptions; timestamp: number }>
  >([])
  const [showScanner, setShowScanner] = useState(false)
  const [showShare, setShowShare] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("qr-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Generate QR code whenever options change
  useEffect(() => {
    generateQRCode()
  }, [qrOptions, contactInfo, wifiInfo])

  const generateQRText = () => {
    switch (qrOptions.type) {
      case "url":
        return qrOptions.text.startsWith("http") ? qrOptions.text : `https://${qrOptions.text}`
      case "email":
        return `mailto:${qrOptions.text}`
      case "phone":
        return `tel:${qrOptions.text}`
      case "sms":
        return `sms:${qrOptions.text}`
      case "vcard":
        return `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.firstName} ${contactInfo.lastName}
ORG:${contactInfo.organization}
TEL:${contactInfo.phone}
EMAIL:${contactInfo.email}
URL:${contactInfo.url}
END:VCARD`
      case "wifi":
        return `WIFI:T:${wifiInfo.security};S:${wifiInfo.ssid};P:${wifiInfo.password};H:${wifiInfo.hidden ? "true" : "false"};;`
      default:
        return qrOptions.text
    }
  }

  const generateQRCode = async () => {
    try {
      const text = generateQRText()

      // Generate PNG
      const dataURL = await QRCode.toDataURL(text, {
        width: qrOptions.size,
        margin: qrOptions.margin,
        color: {
          dark: qrOptions.foregroundColor,
          light: qrOptions.backgroundColor,
        },
        errorCorrectionLevel: qrOptions.errorCorrectionLevel,
      })
      setQrDataURL(dataURL)

      // Generate SVG
      const svg = await QRCode.toString(text, {
        type: "svg",
        width: qrOptions.size,
        margin: qrOptions.margin,
        color: {
          dark: qrOptions.foregroundColor,
          light: qrOptions.backgroundColor,
        },
        errorCorrectionLevel: qrOptions.errorCorrectionLevel,
      })
      setQrSVG(svg)
    } catch (error) {
      console.error("Error generating QR code:", error)
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please check your input.",
        variant: "destructive",
      })
    }
  }

  const downloadQR = (format: "png" | "svg") => {
    const link = document.createElement("a")
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")

    if (format === "png") {
      link.href = qrDataURL
      link.download = `qr-code-${timestamp}.png`
    } else {
      const blob = new Blob([qrSVG], { type: "image/svg+xml" })
      link.href = URL.createObjectURL(blob)
      link.download = `qr-code-${timestamp}.svg`
    }

    link.click()

    toast({
      title: "Downloaded",
      description: `QR code downloaded as ${format.toUpperCase()}`,
    })
  }

  const addToFavorites = () => {
    const newFavorite = {
      id: Date.now().toString(),
      text: generateQRText(),
      options: { ...qrOptions },
      timestamp: Date.now(),
    }

    const updatedFavorites = [newFavorite, ...favorites].slice(0, 10) // Keep only 10 most recent
    setFavorites(updatedFavorites)
    localStorage.setItem("qr-favorites", JSON.stringify(updatedFavorites))

    toast({
      title: "Added to Favorites",
      description: "QR code saved to your favorites list",
    })
  }

  const loadFavorite = (favorite: (typeof favorites)[0]) => {
    setQROptions(favorite.options)
    toast({
      title: "Loaded",
      description: "QR code loaded from favorites",
    })
  }

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem("qr-favorites", JSON.stringify(updatedFavorites))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 bg-background text-foreground">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-foreground">QR Code Generator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create custom QR codes instantly with advanced customization options. Generate, scan, and share QR codes for
          any purpose.
        </p>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Badge variant="secondary" className="text-sm">
            Real-time Preview
          </Badge>
          <Badge variant="outline" className="text-sm">
            PWA Ready
          </Badge>
          <Badge variant="outline" className="text-sm">
            Offline Support
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          {/* Input Type Selection */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Settings className="h-5 w-5" />
                QR Code Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={qrOptions.type}
                onValueChange={(value) => setQROptions((prev) => ({ ...prev, type: value as any }))}
              >
                <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full bg-muted">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="vcard">Contact</TabsTrigger>
                  <TabsTrigger value="wifi">WiFi</TabsTrigger>
                </TabsList>

                <div className="mt-4">
                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label htmlFor="text-input" className="text-foreground">
                        Text Content
                      </Label>
                      <Textarea
                        id="text-input"
                        placeholder="Enter your text here..."
                        value={qrOptions.text}
                        onChange={(e) => setQROptions((prev) => ({ ...prev, text: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="url" className="space-y-4">
                    <div>
                      <Label htmlFor="url-input" className="text-foreground">
                        Website URL
                      </Label>
                      <Input
                        id="url-input"
                        type="url"
                        placeholder="example.com or https://example.com"
                        value={qrOptions.text}
                        onChange={(e) => setQROptions((prev) => ({ ...prev, text: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="email" className="space-y-4">
                    <div>
                      <Label htmlFor="email-input" className="text-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="contact@example.com"
                        value={qrOptions.text}
                        onChange={(e) => setQROptions((prev) => ({ ...prev, text: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4">
                    <div>
                      <Label htmlFor="phone-input" className="text-foreground">
                        Phone Number
                      </Label>
                      <Input
                        id="phone-input"
                        type="tel"
                        placeholder="+1234567890"
                        value={qrOptions.text}
                        onChange={(e) => setQROptions((prev) => ({ ...prev, text: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="vcard" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-foreground">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={contactInfo.firstName}
                          onChange={(e) => setContactInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                          className="mt-1 bg-background text-foreground border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-foreground">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={contactInfo.lastName}
                          onChange={(e) => setContactInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                          className="mt-1 bg-background text-foreground border-border"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="organization" className="text-foreground">
                        Organization
                      </Label>
                      <Input
                        id="organization"
                        value={contactInfo.organization}
                        onChange={(e) => setContactInfo((prev) => ({ ...prev, organization: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone" className="text-foreground">
                        Phone
                      </Label>
                      <Input
                        id="contact-phone"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email" className="text-foreground">
                        Email
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="wifi" className="space-y-4">
                    <div>
                      <Label htmlFor="wifi-ssid" className="text-foreground">
                        Network Name (SSID)
                      </Label>
                      <Input
                        id="wifi-ssid"
                        value={wifiInfo.ssid}
                        onChange={(e) => setWifiInfo((prev) => ({ ...prev, ssid: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-password" className="text-foreground">
                        Password
                      </Label>
                      <Input
                        id="wifi-password"
                        type="password"
                        value={wifiInfo.password}
                        onChange={(e) => setWifiInfo((prev) => ({ ...prev, password: e.target.value }))}
                        className="mt-1 bg-background text-foreground border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-security" className="text-foreground">
                        Security Type
                      </Label>
                      <Select
                        value={wifiInfo.security}
                        onValueChange={(value: any) => setWifiInfo((prev) => ({ ...prev, security: value }))}
                      >
                        <SelectTrigger className="mt-1 bg-background text-foreground border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover text-popover-foreground border-border">
                          <SelectItem value="WPA">WPA/WPA2</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">No Password</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Customization Options */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Palette className="h-5 w-5" />
                Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="size-slider" className="text-foreground">
                  Size: {qrOptions.size}px
                </Label>
                <Slider
                  id="size-slider"
                  min={128}
                  max={512}
                  step={32}
                  value={[qrOptions.size]}
                  onValueChange={(value) => setQROptions((prev) => ({ ...prev, size: value[0] }))}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fg-color" className="text-foreground">
                    Foreground Color
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="fg-color"
                      type="color"
                      value={qrOptions.foregroundColor}
                      onChange={(e) => setQROptions((prev) => ({ ...prev, foregroundColor: e.target.value }))}
                      className="w-16 h-10 p-1 border rounded border-border"
                    />
                    <Input
                      type="text"
                      value={qrOptions.foregroundColor}
                      onChange={(e) => setQROptions((prev) => ({ ...prev, foregroundColor: e.target.value }))}
                      className="flex-1 bg-background text-foreground border-border"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bg-color" className="text-foreground">
                    Background Color
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="bg-color"
                      type="color"
                      value={qrOptions.backgroundColor}
                      onChange={(e) => setQROptions((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                      className="w-16 h-10 p-1 border rounded border-border"
                    />
                    <Input
                      type="text"
                      value={qrOptions.backgroundColor}
                      onChange={(e) => setQROptions((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                      className="flex-1 bg-background text-foreground border-border"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="error-correction" className="text-foreground">
                  Error Correction Level
                </Label>
                <Select
                  value={qrOptions.errorCorrectionLevel}
                  onValueChange={(value: any) => setQROptions((prev) => ({ ...prev, errorCorrectionLevel: value }))}
                >
                  <SelectTrigger className="mt-1 bg-background text-foreground border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border">
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="margin-slider" className="text-foreground">
                  Margin: {qrOptions.margin}
                </Label>
                <Slider
                  id="margin-slider"
                  min={0}
                  max={10}
                  step={1}
                  value={[qrOptions.margin]}
                  onValueChange={(value) => setQROptions((prev) => ({ ...prev, margin: value[0] }))}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Preview and Actions */}
        <div className="space-y-6">
          {/* QR Code Preview */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                {qrDataURL && (
                  <img
                    src={qrDataURL || "/placeholder.svg"}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                    style={{ width: qrOptions.size, height: qrOptions.size }}
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={() => downloadQR("png")} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  PNG
                </Button>
                <Button onClick={() => downloadQR("svg")} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  SVG
                </Button>
                <Button onClick={addToFavorites} variant="outline" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Save
                </Button>
                <Button onClick={() => setShowShare(true)} variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scanner */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Camera className="h-5 w-5" />
                QR Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowScanner(true)} className="w-full flex items-center gap-2" variant="outline">
                <Camera className="h-4 w-4" />
                Scan QR Code
              </Button>
            </CardContent>
          </Card>

          {/* Favorites */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <History className="h-5 w-5" />
                Recent & Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FavoritesList favorites={favorites} onLoad={loadFavorite} onRemove={removeFavorite} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {showScanner && (
        <QRScanner
          onClose={() => setShowScanner(false)}
          onScan={(result) => {
            setQROptions((prev) => ({ ...prev, text: result, type: "text" }))
            setShowScanner(false)
          }}
        />
      )}

      {showShare && <ShareDialog qrDataURL={qrDataURL} text={generateQRText()} onClose={() => setShowShare(false)} />}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  )
}
