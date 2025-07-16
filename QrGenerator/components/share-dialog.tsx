"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ShareDialogProps {
  qrDataURL: string
  text: string
  onClose: () => void
}

export function ShareDialog({ qrDataURL, text, onClose }: ShareDialogProps) {
  const [shareUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}?shared=${encodeURIComponent(text)}`
    }
    return ""
  })

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      })
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareToSocial = (platform: string) => {
    const encodedText = encodeURIComponent(`Check out this QR code: ${text}`)
    const encodedUrl = encodeURIComponent(shareUrl)

    let url = ""
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400")
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <img
              src={qrDataURL || "/placeholder.svg"}
              alt="QR Code to share"
              className="mx-auto mb-4 rounded-lg"
              style={{ width: 150, height: 150 }}
            />
          </div>

          <div>
            <Label htmlFor="share-url">Share URL</Label>
            <div className="flex gap-2 mt-1">
              <Input id="share-url" value={shareUrl} readOnly className="flex-1" />
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(shareUrl)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="share-text">QR Content</Label>
            <div className="flex gap-2 mt-1">
              <Input id="share-text" value={text} readOnly className="flex-1" />
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(text)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label>Share on Social Media</Label>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => shareToSocial("twitter")} className="flex-1">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button size="sm" variant="outline" onClick={() => shareToSocial("facebook")} className="flex-1">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button size="sm" variant="outline" onClick={() => shareToSocial("linkedin")} className="flex-1">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
