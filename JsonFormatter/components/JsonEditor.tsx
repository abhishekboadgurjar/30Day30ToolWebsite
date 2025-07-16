"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Check, FileText, Minimize, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { formatJson, minifyJson, validateJson, copyToClipboard } from "@/lib/json-utils"

export default function JsonEditor() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFormat = async () => {
    setIsProcessing(true)
    // Add a small delay for animation effect
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      const formatted = formatJson(input)
      setOutput(formatted)
      setError("")
      setIsValid(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format")
      setOutput("")
      setIsValid(false)
    }
    setIsProcessing(false)
  }

  const handleMinify = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      const minified = minifyJson(input)
      setOutput(minified)
      setError("")
      setIsValid(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format")
      setOutput("")
      setIsValid(false)
    }
    setIsProcessing(false)
  }

  const handleValidate = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 200))

    try {
      const isValidJson = validateJson(input)
      if (isValidJson) {
        setError("")
        setIsValid(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format")
      setIsValid(false)
    }
    setIsProcessing(false)
  }

  const handleCopy = async () => {
    if (output) {
      const success = await copyToClipboard(output)
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
    setError("")
    setIsValid(null)
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="animate-pulse">⚡</span>
            Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleFormat}
              disabled={isProcessing}
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1 active:scale-95"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              Format JSON
            </Button>
            <Button
              onClick={handleMinify}
              variant="outline"
              disabled={isProcessing}
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-rotate-1 active:scale-95"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Minimize className="w-4 h-4" />}
              Minify JSON
            </Button>
            <Button
              onClick={handleValidate}
              variant="outline"
              disabled={isProcessing}
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1 active:scale-95"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              Validate JSON
            </Button>
            <Button
              onClick={handleCopy}
              variant="outline"
              disabled={!output}
              className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${copied ? "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700" : ""}`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600 animate-bounce" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Output
                </>
              )}
            </Button>
            <Button
              onClick={handleClear}
              variant="destructive"
              className="ml-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1 active:scale-95"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert
          variant="destructive"
          className="animate-in slide-in-from-top duration-500 border-red-300 dark:border-red-700"
        >
          <AlertCircle className="h-4 w-4 animate-pulse" />
          <AlertDescription className="animate-in fade-in duration-700">{error}</AlertDescription>
        </Alert>
      )}

      {/* Validation Status */}
      {isValid !== null && !error && (
        <Alert
          variant={isValid ? "default" : "destructive"}
          className={`animate-in slide-in-from-top duration-500 ${isValid ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950" : ""}`}
        >
          <CheckCircle className={`h-4 w-4 ${isValid ? "text-green-600 animate-bounce" : "animate-pulse"}`} />
          <AlertDescription className="animate-in fade-in duration-700">
            {isValid ? "JSON is valid! ✨" : "JSON is invalid!"}
          </AlertDescription>
        </Alert>
      )}

      {/* Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01] group">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
              <span className="animate-pulse">📝</span>
              Input JSON
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type your JSON here..."
              className="min-h-[400px] font-mono text-sm resize-none transition-all duration-300 focus:scale-[1.01] focus:shadow-lg"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01] group">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
              <span className="animate-pulse">✨</span>
              Formatted Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="min-h-[400px] font-mono text-sm resize-none bg-muted/50 transition-all duration-300 focus:scale-[1.01] focus:shadow-lg"
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="animate-bounce">💡</span>
            How to Use
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2 p-4 rounded-lg bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 hover:shadow-md">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="text-primary">1.</span>
                Input JSON
              </h4>
              <p className="text-muted-foreground">Paste or type your JSON data in the input area</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 hover:shadow-md">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="text-primary">2.</span>
                Format
              </h4>
              <p className="text-muted-foreground">Click "Format JSON" to beautify with proper indentation</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 hover:shadow-md">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="text-primary">3.</span>
                Minify
              </h4>
              <p className="text-muted-foreground">Use "Minify JSON" to compress into a single line</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 hover:shadow-md">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="text-primary">4.</span>
                Validate
              </h4>
              <p className="text-muted-foreground">Check if your JSON syntax is correct</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
