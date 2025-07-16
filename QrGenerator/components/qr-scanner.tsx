"use client"

import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, X } from "lucide-react"

interface QRScannerProps {
  onClose: () => void
  onScan: (result: string) => void
}

export function QRScanner({ onClose, onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string>("")
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)

        // Simple QR detection simulation
        // In a real app, you'd use a library like qr-scanner
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        const scanInterval = setInterval(() => {
          if (videoRef.current && ctx) {
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            ctx.drawImage(videoRef.current, 0, 0)

            // This is a placeholder - you'd use a real QR scanning library here
            // For demo purposes, we'll simulate a scan after 3 seconds
            setTimeout(() => {
              onScan("https://example.com/scanned-qr-code")
              clearInterval(scanInterval)
            }, 3000)
          }
        }, 100)
      }
    } catch (err) {
      setError("Camera access denied or not available")
      console.error("Camera error:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    setIsScanning(false)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Scan QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error ? (
            <Alert>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black"
                style={{ aspectRatio: "1" }}
              />
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-primary rounded-lg w-48 h-48 animate-pulse" />
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">Position the QR code within the frame to scan</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
