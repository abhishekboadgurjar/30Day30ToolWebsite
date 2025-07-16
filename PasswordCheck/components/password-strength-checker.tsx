"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  AlertTriangle,
  Info,
  Save,
  Shield,
  Database,
  Sparkles,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import zxcvbn from "zxcvbn"
import { PasswordManager } from "./password-manager"
import { SavePasswordDialog } from "./save-password-dialog"
import { PasswordGenerator } from "./password-generator"

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (password) {
      const analysis = zxcvbn(password)
      setResult(analysis)
    } else {
      setResult(null)
    }
  }, [password])

  const getStrengthLabel = () => {
    if (!result) return "Enter a password"

    const score = result.score
    switch (score) {
      case 0:
        return "Very Weak"
      case 1:
        return "Weak"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Strong"
      default:
        return "Unknown"
    }
  }

  const getStrengthColor = () => {
    if (!result) return "bg-gray-200 dark:bg-gray-700"

    const score = result.score
    switch (score) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-blue-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-200 dark:bg-gray-700"
    }
  }

  const getProgressValue = () => {
    if (!result) return 0
    return (result.score + 1) * 20
  }

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      setCopied(true)
      toast({
        title: "Password copied!",
        description: "The password has been copied to your clipboard.",
      })

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSavePassword = () => {
    if (password) {
      setShowSaveDialog(true)
    } else {
      toast({
        title: "No password to save",
        description: "Please enter a password first.",
        variant: "destructive",
      })
    }
  }

  const clearPassword = () => {
    setPassword("")
    setResult(null)
  }

  return (
    <div className="space-y-6" id="password-checker">
      <Tabs defaultValue="checker" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checker" className="flex items-center gap-2">
            <Shield size={16} />
            Password Checker
          </TabsTrigger>
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Sparkles size={16} />
            Generator
          </TabsTrigger>
          <TabsTrigger value="manager" className="flex items-center gap-2">
            <Database size={16} />
            Password Manager
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checker">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Password Strength Analysis
                {result && (
                  <Badge variant={result.score >= 3 ? "default" : "destructive"} className="ml-auto">
                    {getStrengthLabel()}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password to analyze its strength..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-40 text-lg py-6"
                  aria-label="Password input"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="h-8 w-8"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    disabled={!password}
                    aria-label="Copy password to clipboard"
                    className="h-8 w-8"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSavePassword}
                    disabled={!password}
                    aria-label="Save password"
                    className="h-8 w-8"
                  >
                    <Save size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearPassword}
                    disabled={!password}
                    aria-label="Clear password"
                    className="h-8 w-8"
                  >
                    <RefreshCw size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Security Level: {getStrengthLabel()}</span>
                  <span className="text-sm font-mono">{getProgressValue()}%</span>
                </div>
                <Progress value={getProgressValue()} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Very Weak</span>
                  <span>Weak</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Strong</span>
                </div>
              </div>

              {result && (
                <div className="space-y-4">
                  {/* Password Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{password.length}</div>
                      <div className="text-xs text-muted-foreground">Characters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{result.guesses_log10.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">Entropy (bits)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{result.sequence.length}</div>
                      <div className="text-xs text-muted-foreground">Patterns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{result.score + 1}/5</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>

                  {result.feedback.warning && (
                    <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                      <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200">Security Warning</p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">{result.feedback.warning}</p>
                      </div>
                    </div>
                  )}

                  {result.feedback.suggestions && result.feedback.suggestions.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Info size={16} /> Suggestions to improve security:
                      </p>
                      <div className="space-y-2">
                        {result.feedback.suggestions.map((suggestion: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                          >
                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                            </div>
                            <p className="text-sm text-blue-800 dark:text-blue-200">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.score >= 3 && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                        <Check size={16} className="flex-shrink-0" />
                        <strong>Excellent!</strong> This password would take approximately{" "}
                        <span className="font-mono font-bold">
                          {result.crack_times_display.offline_slow_hashing_1e4_per_second}
                        </span>{" "}
                        to crack using advanced methods.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6 pb-6 bg-gray-50 dark:bg-gray-800">
              <p className="text-xs text-center text-muted-foreground">
                🔒 Powered by Boad Technologies • Your passwords are analyzed locally and never transmitted
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="generator">
          <PasswordGenerator onPasswordGenerated={setPassword} />
        </TabsContent>

        <TabsContent value="manager">
          <PasswordManager />
        </TabsContent>
      </Tabs>

      <SavePasswordDialog isOpen={showSaveDialog} onClose={() => setShowSaveDialog(false)} password={password} />
    </div>
  )
}

export default PasswordStrengthChecker
