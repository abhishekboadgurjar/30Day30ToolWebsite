"use client"

import { useState, useEffect } from "react"
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

interface SavedPassword {
  id: string
  website: string
  username: string
  password: string
  notes: string
  createdAt: string
  updatedAt: string
}

interface EditPasswordDialogProps {
  password: SavedPassword
  isOpen: boolean
  onClose: () => void
  onSave: (password: SavedPassword) => void
}

export function EditPasswordDialog({ password, isOpen, onClose, onSave }: EditPasswordDialogProps) {
  const [website, setWebsite] = useState("")
  const [username, setUsername] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (password) {
      setWebsite(password.website)
      setUsername(password.username)
      setPasswordValue(password.password)
      setNotes(password.notes)
    }
  }, [password])

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
      const updatedPassword = {
        ...password,
        website: website.trim(),
        username: username.trim(),
        password: passwordValue,
        notes: notes.trim(),
        updatedAt: new Date().toISOString(),
      }

      onSave(updatedPassword)
    } catch (error) {
      toast({
        title: "Error updating password",
        description: "There was an issue updating your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Password</DialogTitle>
          <DialogDescription>Update the details for this saved password.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-website">Website/Service Name *</Label>
            <Input
              id="edit-website"
              placeholder="e.g., Gmail, Facebook, GitHub"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-username">Username/Email</Label>
            <Input
              id="edit-username"
              placeholder="e.g., john@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-password">Password</Label>
            <Input
              id="edit-password"
              type="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-notes">Notes (Optional)</Label>
            <Textarea
              id="edit-notes"
              placeholder="Additional notes about this password..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
