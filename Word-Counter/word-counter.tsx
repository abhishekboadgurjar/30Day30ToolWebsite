"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Trash2, Download, Moon, Sun, BarChart3 } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "@/hooks/use-toast"

export default function Component() {
  const [text, setText] = useState("")
  const { theme, setTheme } = useTheme()

  const metrics = useMemo(() => {
    const trimmedText = text.trim()

    // Count words (split by whitespace and filter out empty strings)
    const words = trimmedText === "" ? 0 : trimmedText.split(/\s+/).filter((word) => word.length > 0).length

    // Count characters with and without spaces
    const charactersWithSpaces = text.length
    const charactersWithoutSpaces = text.replace(/\s/g, "").length

    // Count sentences (split by sentence endings)
    const sentences = trimmedText === "" ? 0 : trimmedText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length

    // Count paragraphs (split by double line breaks)
    const paragraphs = trimmedText === "" ? 0 : trimmedText.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length

    // Calculate averages
    const avgWordsPerSentence = sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0
    const avgCharsPerWord = words > 0 ? Math.round((charactersWithoutSpaces / words) * 10) / 10 : 0

    // Calculate reading time (200 words per minute for English)
    const readingTimeMinutes = Math.ceil(words / 200)
    const readingTime =
      readingTimeMinutes === 0 ? "< 1 min" : `${readingTimeMinutes} min${readingTimeMinutes > 1 ? "s" : ""}`

    // Calculate speaking time (150 words per minute average)
    const speakingTimeMinutes = Math.ceil(words / 150)
    const speakingTime =
      speakingTimeMinutes === 0 ? "< 1 min" : `${speakingTimeMinutes} min${speakingTimeMinutes > 1 ? "s" : ""}`

    // Get most frequent words
    const wordFrequency = {}
    if (trimmedText) {
      const cleanWords = trimmedText.toLowerCase().match(/\b\w+\b/g) || []
      cleanWords.forEach((word) => {
        if (word.length > 2) {
          // Only count words longer than 2 characters
          wordFrequency[word] = (wordFrequency[word] || 0) + 1
        }
      })
    }

    const topWords = Object.entries(wordFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }))

    // Simple readability score (Flesch Reading Ease approximation)
    const readabilityScore =
      sentences > 0 && words > 0
        ? Math.max(
            0,
            Math.min(100, Math.round(206.835 - 1.015 * avgWordsPerSentence - 84.6 * (charactersWithoutSpaces / words))),
          )
        : 0

    const readabilityLevel =
      readabilityScore >= 90
        ? "Very Easy"
        : readabilityScore >= 80
          ? "Easy"
          : readabilityScore >= 70
            ? "Fairly Easy"
            : readabilityScore >= 60
              ? "Standard"
              : readabilityScore >= 50
                ? "Fairly Difficult"
                : readabilityScore >= 30
                  ? "Difficult"
                  : "Very Difficult"

    return {
      words,
      charactersWithSpaces,
      charactersWithoutSpaces,
      sentences,
      paragraphs,
      avgWordsPerSentence,
      avgCharsPerWord,
      readingTime,
      speakingTime,
      topWords,
      readabilityScore,
      readabilityLevel,
    }
  }, [text])

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      })
    }
  }

  const handleClearText = () => {
    setText("")
    toast({
      title: "Cleared!",
      description: "Text has been cleared",
    })
  }

  const handleExportStats = () => {
    const stats = `Text Statistics Report
Generated: ${new Date().toLocaleString()}

=== BASIC COUNTS ===
Words: ${metrics.words.toLocaleString()}
Characters (with spaces): ${metrics.charactersWithSpaces.toLocaleString()}
Characters (without spaces): ${metrics.charactersWithoutSpaces.toLocaleString()}
Sentences: ${metrics.sentences.toLocaleString()}
Paragraphs: ${metrics.paragraphs.toLocaleString()}

=== AVERAGES ===
Average words per sentence: ${metrics.avgWordsPerSentence}
Average characters per word: ${metrics.avgCharsPerWord}

=== TIME ESTIMATES ===
Reading time: ${metrics.readingTime}
Speaking time: ${metrics.speakingTime}

=== READABILITY ===
Readability score: ${metrics.readabilityScore}/100
Reading level: ${metrics.readabilityLevel}

=== TOP WORDS ===
${metrics.topWords.map(({ word, count }) => `${word}: ${count}`).join("\n")}

=== TEXT CONTENT ===
${text}
`

    const blob = new Blob([stats], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `text-analysis-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Exported!",
      description: "Statistics exported successfully",
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Word & Character Counter</h1>
          <p className="text-muted-foreground">Advanced text analysis and statistics</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="text-input">Enter your text</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyText} disabled={!text}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearText} disabled={!text}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportStats} disabled={!text}>
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            <Textarea
              id="text-input"
              placeholder="Start typing or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[400px] resize-none"
            />
            {text && (
              <div className="text-xs text-muted-foreground">
                Character limit: {metrics.charactersWithSpaces.toLocaleString()} / ∞
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Basic Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{metrics.words.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Words</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {metrics.charactersWithSpaces.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Characters</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Without spaces</span>
                      <span className="font-medium">{metrics.charactersWithoutSpaces.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sentences</span>
                      <span className="font-medium">{metrics.sentences.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Paragraphs</span>
                      <span className="font-medium">{metrics.paragraphs.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time & Averages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">{metrics.readingTime}</div>
                      <div className="text-xs text-muted-foreground">Reading time</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{metrics.speakingTime}</div>
                      <div className="text-xs text-muted-foreground">Speaking time</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Avg words/sentence</span>
                      <span className="font-medium">{metrics.avgWordsPerSentence}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg chars/word</span>
                      <span className="font-medium">{metrics.avgCharsPerWord}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Text Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Readability Score</span>
                      <Badge variant={metrics.readabilityScore >= 60 ? "default" : "secondary"}>
                        {metrics.readabilityScore}/100
                      </Badge>
                    </div>
                    <Progress value={metrics.readabilityScore} className="h-2" />
                    <div className="text-xs text-muted-foreground text-center">{metrics.readabilityLevel}</div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Most Frequent Words</h4>
                    {metrics.topWords.length > 0 ? (
                      <div className="space-y-1">
                        {metrics.topWords.map(({ word, count }, index) => (
                          <div key={word} className="flex justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <Badge variant="outline" className="w-5 h-5 p-0 text-xs">
                                {index + 1}
                              </Badge>
                              {word}
                            </span>
                            <span className="text-muted-foreground">{count}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">No words to analyze</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>Reading time: 200 WPM • Speaking time: 150 WPM • Readability: Flesch Reading Ease</p>
            <p>
              by <span className="font-medium">boad technologies</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
