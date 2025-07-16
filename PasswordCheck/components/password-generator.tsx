"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Sparkles, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PasswordGeneratorProps {
  onPasswordGenerated: (password: string) => void
}

export function PasswordGenerator({ onPasswordGenerated }: PasswordGeneratorProps) {
  const [length, setLength] = useState([16])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(true)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "")
    }

    if (!charset) {
      toast({
        title: "No character types selected",
        description: "Please select at least one character type.",
        variant: "destructive",
      })
      return
    }

    let password = ""
    for (let i = 0; i < length[0]; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setGeneratedPassword(password)
    onPasswordGenerated(password)

    toast({
      title: "Password generated!",
      description: "New secure password has been generated and analyzed.",
    })
  }

  const copyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword)
      setCopied(true)
      toast({
        title: "Password copied!",
        description: "The generated password has been copied to your clipboard.",
      })

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  const getStrengthEstimate = () => {
    let charsetSize = 0
    if (includeUppercase) charsetSize += 26
    if (includeLowercase) charsetSize += 26
    if (includeNumbers) charsetSize += 10
    if (includeSymbols) charsetSize += 32

    if (excludeSimilar) charsetSize -= 6

    const entropy = Math.log2(Math.pow(charsetSize, length[0]))

    if (entropy < 30) return { label: "Weak", color: "destructive" }
    if (entropy < 50) return { label: "Fair", color: "secondary" }
    if (entropy < 70) return { label: "Good", color: "default" }
    return { label: "Strong", color: "default" }
  }

  const strength = getStrengthEstimate()

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <CardTitle className="flex items-center gap-2">
          <Sparkles size={20} />
          Password Generator
          <Badge variant={strength.color} className="ml-auto">
            {strength.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Password Length: {length[0]} characters</Label>
            <Slider value={length} onValueChange={setLength} max={128} min={4} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4</span>
              <span>32</span>
              <span>64</span>
              <span>128</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
              <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="lowercase">Lowercase (a-z)</Label>
              <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="numbers">Numbers (0-9)</Label>
              <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="symbols">Symbols (!@#$...)</Label>
              <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="exclude-similar">Exclude similar characters (i, l, 1, L, o, 0, O)</Label>
            <Switch id="exclude-similar" checked={excludeSimilar} onCheckedChange={setExcludeSimilar} />
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full" size="lg">
          <RefreshCw size={16} className="mr-2" />
          Generate Secure Password
        </Button>

        {generatedPassword && (
          <div className="space-y-3">
            <Label>Generated Password:</Label>
            <div className="relative">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-lg break-all">
                {generatedPassword}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="absolute top-2 right-2"
                aria-label="Copy generated password"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This password will be automatically analyzed in the Password Checker tab.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
