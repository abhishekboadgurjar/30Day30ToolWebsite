"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, EyeOff, Copy, Edit, Trash2, Download, Upload, Database, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { EditPasswordDialog } from "./edit-password-dialog"
import zxcvbn from "zxcvbn"

interface SavedPassword {
  id: string
  website: string
  username: string
  password: string
  notes: string
  createdAt: string
  updatedAt: string
}

export function PasswordManager() {
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set())
  const [editingPassword, setEditingPassword] = useState<SavedPassword | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadPasswords()
  }, [])

  const loadPasswords = () => {
    try {
      const stored = localStorage.getItem("passwordcheck_saved_passwords")
      if (stored) {
        setSavedPasswords(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Error loading passwords:", error)
      toast({
        title: "Error loading passwords",
        description: "There was an issue loading your saved passwords.",
        variant: "destructive",
      })
    }
  }

  const savePasswords = (passwords: SavedPassword[]) => {
    try {
      localStorage.setItem("passwordcheck_saved_passwords", JSON.stringify(passwords))
      setSavedPasswords(passwords)
    } catch (error) {
      console.error("Error saving passwords:", error)
      toast({
        title: "Error saving passwords",
        description: "There was an issue saving your passwords.",
        variant: "destructive",
      })
    }
  }

  const deletePassword = (id: string) => {
    const updatedPasswords = savedPasswords.filter((p) => p.id !== id)
    savePasswords(updatedPasswords)
    toast({
      title: "Password deleted",
      description: "The password has been removed from your saved passwords.",
    })
  }

  const togglePasswordVisibility = (id: string) => {
    const newVisible = new Set(visiblePasswords)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisiblePasswords(newVisible)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `${type} copied!`,
      description: `The ${type.toLowerCase()} has been copied to your clipboard.`,
    })
  }

  const exportPasswords = () => {
    const dataStr = JSON.stringify(savedPasswords, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `passwordcheck_backup_${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Passwords exported",
      description: "Your passwords have been exported to a JSON file.",
    })
  }

  const importPasswords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        if (Array.isArray(imported)) {
          savePasswords([...savedPasswords, ...imported])
          toast({
            title: "Passwords imported",
            description: `Successfully imported ${imported.length} passwords.`,
          })
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "The file format is invalid.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  const getPasswordStrength = (password: string) => {
    const result = zxcvbn(password)
    const score = result.score

    switch (score) {
      case 0:
        return { label: "Very Weak", color: "bg-red-500" }
      case 1:
        return { label: "Weak", color: "bg-orange-500" }
      case 2:
        return { label: "Fair", color: "bg-yellow-500" }
      case 3:
        return { label: "Good", color: "bg-blue-500" }
      case 4:
        return { label: "Strong", color: "bg-green-500" }
      default:
        return { label: "Unknown", color: "bg-gray-500" }
    }
  }

  const filteredPasswords = savedPasswords.filter(
    (password) =>
      password.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.notes.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={20} />
            Password Manager
            <Badge variant="secondary">{savedPasswords.length} saved</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportPasswords} disabled={savedPasswords.length === 0}>
              <Download size={16} className="mr-1" />
              Export
            </Button>
            <label>
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload size={16} className="mr-1" />
                  Import
                </span>
              </Button>
              <input type="file" accept=".json" onChange={importPasswords} className="hidden" />
            </label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search passwords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {savedPasswords.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Database size={48} className="mx-auto mb-4 opacity-50" />
            <p>No passwords saved yet.</p>
            <p className="text-sm">Use the Password Checker tab to analyze and save passwords.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredPasswords.map((savedPassword) => {
              const strength = getPasswordStrength(savedPassword.password)
              const isVisible = visiblePasswords.has(savedPassword.id)

              return (
                <Card key={savedPassword.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{savedPassword.website}</h3>
                        <Badge variant="outline" className={`text-white ${strength.color}`}>
                          {strength.label}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Username:</span>
                          <span>{savedPassword.username}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(savedPassword.username, "Username")}
                          >
                            <Copy size={12} />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Password:</span>
                          <span className="font-mono">{isVisible ? savedPassword.password : "••••••••"}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => togglePasswordVisibility(savedPassword.id)}
                          >
                            {isVisible ? <EyeOff size={12} /> : <Eye size={12} />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(savedPassword.password, "Password")}
                          >
                            <Copy size={12} />
                          </Button>
                        </div>

                        {savedPassword.notes && (
                          <div className="flex items-start gap-2">
                            <span className="text-muted-foreground">Notes:</span>
                            <span className="text-xs">{savedPassword.notes}</span>
                          </div>
                        )}

                        <div className="text-xs text-muted-foreground">
                          Created: {new Date(savedPassword.createdAt).toLocaleDateString()}
                          {savedPassword.updatedAt !== savedPassword.createdAt && (
                            <span> • Updated: {new Date(savedPassword.updatedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingPassword(savedPassword)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => deletePassword(savedPassword.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {savedPasswords.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle size={16} />
              <span>
                Passwords are stored locally in your browser. Consider using a dedicated password manager for enhanced
                security.
              </span>
            </div>
          </div>
        )}
      </CardContent>

      {editingPassword && (
        <EditPasswordDialog
          password={editingPassword}
          isOpen={!!editingPassword}
          onClose={() => setEditingPassword(null)}
          onSave={(updatedPassword) => {
            const updatedPasswords = savedPasswords.map((p) => (p.id === updatedPassword.id ? updatedPassword : p))
            savePasswords(updatedPasswords)
            setEditingPassword(null)
            toast({
              title: "Password updated",
              description: "The password has been successfully updated.",
            })
          }}
        />
      )}
    </Card>
  )
}
