"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Copy,
  Lock,
  Unlock,
  RotateCcw,
  Shield,
  Download,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  FileText,
  Key,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type EncryptionMethod = "aes" | "base64" | "caesar" | "rot13"

export default function TextEncryptor() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [password, setPassword] = useState("")
  const [method, setMethod] = useState<EncryptionMethod>("aes")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [caesarShift, setCaesarShift] = useState(3)
  const [activeTab, setActiveTab] = useState("encrypt")
  const { toast } = useToast()

  // Enhanced AES Encryption with better error handling
  const generateKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), { name: "PBKDF2" }, false, [
      "deriveBits",
      "deriveKey",
    ])

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    )
  }

  const encryptAES = async (text: string, password: string): Promise<string> => {
    if (!text || !password) {
      throw new Error("Text and password are required")
    }

    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(text)

      const salt = crypto.getRandomValues(new Uint8Array(16))
      const iv = crypto.getRandomValues(new Uint8Array(12))

      const key = await generateKey(password, salt)
      const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, data)

      const encryptedArray = new Uint8Array(encrypted)
      const result = new Uint8Array(salt.length + iv.length + encryptedArray.length)
      result.set(salt)
      result.set(iv, salt.length)
      result.set(encryptedArray, salt.length + iv.length)

      return btoa(String.fromCharCode(...result))
    } catch (error) {
      console.error("AES Encryption Error:", error)
      throw new Error("AES encryption failed. Please check your input.")
    }
  }

  const decryptAES = async (encryptedText: string, password: string): Promise<string> => {
    if (!encryptedText || !password) {
      throw new Error("Encrypted text and password are required")
    }

    try {
      const data = new Uint8Array(
        atob(encryptedText)
          .split("")
          .map((char) => char.charCodeAt(0)),
      )

      if (data.length < 28) {
        throw new Error("Invalid encrypted data format")
      }

      const salt = data.slice(0, 16)
      const iv = data.slice(16, 28)
      const encrypted = data.slice(28)

      const key = await generateKey(password, salt)
      const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encrypted)

      const decoder = new TextDecoder()
      return decoder.decode(decrypted)
    } catch (error) {
      console.error("AES Decryption Error:", error)
      throw new Error("AES decryption failed. Please check your password and encrypted text.")
    }
  }

  // Enhanced Base64 with better Unicode support
  const encodeBase64 = (text: string): string => {
    if (!text) {
      throw new Error("Text is required for Base64 encoding")
    }
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch (error) {
      console.error("Base64 Encoding Error:", error)
      throw new Error("Base64 encoding failed. Please check your input.")
    }
  }

  const decodeBase64 = (text: string): string => {
    if (!text) {
      throw new Error("Text is required for Base64 decoding")
    }
    try {
      return decodeURIComponent(escape(atob(text)))
    } catch (error) {
      console.error("Base64 Decoding Error:", error)
      throw new Error("Base64 decoding failed. Invalid Base64 format.")
    }
  }

  // Caesar Cipher implementation
  const caesarCipher = (text: string, shift: number, decode = false): string => {
    if (!text) {
      throw new Error("Text is required for Caesar cipher")
    }

    const actualShift = decode ? -shift : shift
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97
      return String.fromCharCode(((char.charCodeAt(0) - start + actualShift + 26) % 26) + start)
    })
  }

  // ROT13 implementation
  const rot13 = (text: string): string => {
    if (!text) {
      throw new Error("Text is required for ROT13")
    }
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
    })
  }

  const handleEncrypt = useCallback(async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to encrypt",
        variant: "destructive",
      })
      return
    }

    if (method === "aes" && !password.trim()) {
      toast({
        title: "Error",
        description: "Password is required for AES encryption",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      let result: string

      switch (method) {
        case "aes":
          result = await encryptAES(inputText, password)
          break
        case "base64":
          result = encodeBase64(inputText)
          break
        case "caesar":
          result = caesarCipher(inputText, caesarShift)
          break
        case "rot13":
          result = rot13(inputText)
          break
        default:
          throw new Error("Unknown encryption method")
      }

      setOutputText(result)
      toast({
        title: "Success",
        description: `Text encrypted successfully using ${method.toUpperCase()}`,
      })
    } catch (error) {
      console.error("Encryption Error:", error)
      toast({
        title: "Encryption Failed",
        description: error instanceof Error ? error.message : "Unknown encryption error",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [inputText, password, method, caesarShift, toast])

  const handleDecrypt = useCallback(async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to decrypt",
        variant: "destructive",
      })
      return
    }

    if (method === "aes" && !password.trim()) {
      toast({
        title: "Error",
        description: "Password is required for AES decryption",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      let result: string

      switch (method) {
        case "aes":
          result = await decryptAES(inputText, password)
          break
        case "base64":
          result = decodeBase64(inputText)
          break
        case "caesar":
          result = caesarCipher(inputText, caesarShift, true)
          break
        case "rot13":
          result = rot13(inputText) // ROT13 is its own inverse
          break
        default:
          throw new Error("Unknown decryption method")
      }

      setOutputText(result)
      toast({
        title: "Success",
        description: `Text decrypted successfully using ${method.toUpperCase()}`,
      })
    } catch (error) {
      console.error("Decryption Error:", error)
      toast({
        title: "Decryption Failed",
        description: error instanceof Error ? error.message : "Unknown decryption error",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [inputText, password, method, caesarShift, toast])

  const copyToClipboard = async (text: string) => {
    if (!text) {
      toast({
        title: "Error",
        description: "No text to copy",
        variant: "destructive",
      })
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Text copied to clipboard successfully",
      })
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)

      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      })
    }
  }

  const downloadAsFile = (text: string, filename: string) => {
    if (!text) {
      toast({
        title: "Error",
        description: "No text to download",
        variant: "destructive",
      })
      return
    }

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: `File saved as ${filename}`,
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 1024 * 1024) {
      // 1MB limit
      toast({
        title: "Error",
        description: "File size must be less than 1MB",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setInputText(content)
      toast({
        title: "File Loaded",
        description: `Loaded ${file.name} successfully`,
      })
    }
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read file",
        variant: "destructive",
      })
    }
    reader.readAsText(file)
  }

  const clearAll = () => {
    setInputText("")
    setOutputText("")
    setPassword("")
    setCaesarShift(3)
    toast({
      title: "Cleared",
      description: "All fields have been cleared",
    })
  }

  const swapInputOutput = () => {
    const temp = inputText
    setInputText(outputText)
    setOutputText(temp)
    toast({
      title: "Swapped",
      description: "Input and output have been swapped",
    })
  }

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let result = ""
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
    toast({
      title: "Password Generated",
      description: "A secure random password has been generated",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Text Encryptor/Decryptor
              </h1>
              <p className="text-sm text-blue-600 font-semibold mt-1">by Boad Technologies</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Professional-grade text encryption and decryption with multiple algorithms. All operations are performed
            locally in your browser for maximum security.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Browser Only
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Shield className="h-3 w-3 mr-1" />
              Secure
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Key className="h-3 w-3 mr-1" />
              Multiple Algorithms
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Encryption Settings
                </CardTitle>
                <CardDescription>Configure your encryption parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Method Selection */}
                <div className="space-y-2">
                  <Label htmlFor="method">Encryption Method</Label>
                  <Select value={method} onValueChange={(value: EncryptionMethod) => setMethod(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aes">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          AES-256-GCM
                        </div>
                      </SelectItem>
                      <SelectItem value="base64">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Base64
                        </div>
                      </SelectItem>
                      <SelectItem value="caesar">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          Caesar Cipher
                        </div>
                      </SelectItem>
                      <SelectItem value="rot13">
                        <div className="flex items-center gap-2">
                          <RotateCcw className="h-4 w-4" />
                          ROT13
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Method-specific settings */}
                {method === "aes" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button size="sm" variant="ghost" onClick={generateRandomPassword} className="h-6 px-2 text-xs">
                        Generate
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter encryption password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Use a strong password. This will be required for decryption.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {method === "caesar" && (
                  <div className="space-y-2">
                    <Label htmlFor="shift">Caesar Shift (1-25)</Label>
                    <Input
                      id="shift"
                      type="number"
                      min="1"
                      max="25"
                      value={caesarShift}
                      onChange={(e) => setCaesarShift(Math.max(1, Math.min(25, Number.parseInt(e.target.value) || 1)))}
                    />
                  </div>
                )}

                {/* Method Info */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">
                    {method === "aes" && "AES-256-GCM"}
                    {method === "base64" && "Base64 Encoding"}
                    {method === "caesar" && "Caesar Cipher"}
                    {method === "rot13" && "ROT13"}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {method === "aes" && "Military-grade encryption with authentication"}
                    {method === "base64" && "Binary-to-text encoding scheme"}
                    {method === "caesar" && "Simple substitution cipher"}
                    {method === "rot13" && "Letter substitution cipher"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Text Processing</CardTitle>
                <CardDescription>Enter your text and choose an operation</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="encrypt" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Encrypt
                    </TabsTrigger>
                    <TabsTrigger value="decrypt" className="flex items-center gap-2">
                      <Unlock className="h-4 w-4" />
                      Decrypt
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="encrypt" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="input">Input Text</Label>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => document.getElementById("file-upload")?.click()}
                            className="h-8 px-2"
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Upload
                          </Button>
                          <input
                            id="file-upload"
                            type="file"
                            accept=".txt"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                      <Textarea
                        id="input"
                        placeholder="Enter text to encrypt..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        rows={8}
                        className="resize-none font-mono text-sm"
                      />
                      <div className="text-xs text-gray-500">Characters: {inputText.length}</div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={handleEncrypt}
                        disabled={isLoading || !inputText.trim()}
                        className="flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        {isLoading ? "Encrypting..." : "Encrypt"}
                      </Button>
                      <Button onClick={clearAll} variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="decrypt" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="input-decrypt">Encrypted Text</Label>
                      <Textarea
                        id="input-decrypt"
                        placeholder="Enter text to decrypt..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        rows={8}
                        className="resize-none font-mono text-sm"
                      />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={handleDecrypt}
                        disabled={isLoading || !inputText.trim()}
                        className="flex items-center gap-2"
                      >
                        <Unlock className="h-4 w-4" />
                        {isLoading ? "Decrypting..." : "Decrypt"}
                      </Button>
                      <Button onClick={clearAll} variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Output Section */}
                {outputText && (
                  <div className="space-y-2 mt-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="output">Output</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(outputText)}
                          className="h-8 px-2"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => downloadAsFile(outputText, `${activeTab}ed_text.txt`)}
                          className="h-8 px-2"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost" onClick={swapInputOutput} className="h-8 px-2">
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Swap
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      id="output"
                      value={outputText}
                      readOnly
                      rows={8}
                      className="resize-none bg-gray-50 font-mono text-sm"
                    />
                    <div className="text-xs text-gray-500">Characters: {outputText.length}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 py-6 border-t bg-white/50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            © 2025 <span className="font-semibold text-blue-600">Boad Technologies</span>. All operations performed
            locally for maximum security.
          </p>
          <p className="text-xs text-gray-500">
            No data is transmitted to external servers. Your privacy is our priority.
          </p>
        </div>
      </div>
    </div>
  )
}
