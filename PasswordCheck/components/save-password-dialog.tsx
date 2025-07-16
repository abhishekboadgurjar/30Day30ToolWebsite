"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface SavePasswordDialogProps {
  isOpen: boolean
  onClose: () => void
  password: string
}

export function SavePasswordDialog({ isOpen, onClose, password }: SavePasswordDialogProps) {
  const [website, setWebsite] = useState("")
  const [username, setUsername] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    if (!website.trim()) {
      toast({
        title: "Website required",
        description: "Please enter a website name.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const existingPasswords = JSON.parse(localStorage.getItem("passwordcheck_saved_passwords") || "[]")

      const newPassword = {
        id: Date.now().toString(),
        website: website.trim(),
        username: username.trim(),
        password,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const updatedPasswords = [...existingPasswords, newPassword]
      localStorage.setItem("passwordcheck_saved_passwords", JSON.stringify(updatedPasswords))

      toast({
        title: "Password saved!",
        description: `Password for ${website} has been saved successfully.`,
      })

      // Reset form
      setWebsite("")
      setUsername("")
      setNotes("")
      onClose()
    } catch (error) {
      toast({
        title: "Error saving password",
        description: "There was an issue saving your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setWebsite("")
    setUsername("")
    setNotes("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Password</DialogTitle>
          <DialogDescription>
            Save this password to your local password manager for easy access later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="website">Website/Service Name *</Label>
            <Input
              id="website"
              placeholder="e.g., Gmail, Facebook, GitHub"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username/Email</Label>
            <Input
              id="username"
              placeholder="e.g., john@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} readOnly className="bg-muted" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about this password..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
