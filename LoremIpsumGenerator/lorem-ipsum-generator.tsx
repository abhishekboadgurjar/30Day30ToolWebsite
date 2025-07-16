"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
]

const TECH_WORDS = [
  "algorithm",
  "api",
  "application",
  "array",
  "backend",
  "boolean",
  "cache",
  "client",
  "cloud",
  "code",
  "compiler",
  "component",
  "database",
  "debug",
  "deployment",
  "development",
  "docker",
  "framework",
  "frontend",
  "function",
  "git",
  "interface",
  "javascript",
  "json",
  "kubernetes",
  "library",
  "method",
  "microservice",
  "module",
  "node",
  "object",
  "parameter",
  "protocol",
  "query",
  "react",
  "repository",
  "response",
  "server",
  "stack",
  "syntax",
  "typescript",
  "variable",
  "version",
  "webhook",
  "workflow",
  "authentication",
  "authorization",
  "encryption",
  "optimization",
  "refactoring",
  "scalability",
  "integration",
]

export default function LoremIpsumGenerator() {
  const [generatedText, setGeneratedText] = useState("")
  const [contentType, setContentType] = useState("paragraphs")
  const [textType, setTextType] = useState("lorem")
  const [count, setCount] = useState(3)
  const [wordsPerSentence, setWordsPerSentence] = useState(12)
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(5)
  const { toast } = useToast()

  const getRandomWords = (wordList: string[], numWords: number) => {
    const words = []
    for (let i = 0; i < numWords; i++) {
      words.push(wordList[Math.floor(Math.random() * wordList.length)])
    }
    return words
  }

  const generateSentence = (wordList: string[]) => {
    const words = getRandomWords(wordList, wordsPerSentence)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(" ") + "."
  }

  const generateParagraph = (wordList: string[]) => {
    const sentences = []
    for (let i = 0; i < sentencesPerParagraph; i++) {
      sentences.push(generateSentence(wordList))
    }
    return sentences.join(" ")
  }

  const generateList = (wordList: string[]) => {
    const items = []
    for (let i = 0; i < count; i++) {
      const words = getRandomWords(wordList, Math.floor(Math.random() * 5) + 3)
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
      items.push("• " + words.join(" "))
    }
    return items.join("\n")
  }

  const generateHeadings = (wordList: string[]) => {
    const headings = []
    for (let i = 0; i < count; i++) {
      const words = getRandomWords(wordList, Math.floor(Math.random() * 4) + 2)
      const heading = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      headings.push(`${"#".repeat(Math.min(i + 1, 6))} ${heading}`)
    }
    return headings.join("\n\n")
  }

  const generateWords = (wordList: string[]) => {
    const words = getRandomWords(wordList, count)
    return words.join(", ")
  }

  const generateContent = () => {
    const wordList = textType === "lorem" ? LOREM_WORDS : TECH_WORDS
    let content = ""

    switch (contentType) {
      case "paragraphs":
        const paragraphs = []
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph(wordList))
        }
        content = paragraphs.join("\n\n")
        break
      case "sentences":
        const sentences = []
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence(wordList))
        }
        content = sentences.join(" ")
        break
      case "words":
        content = generateWords(wordList)
        break
      case "list":
        content = generateList(wordList)
        break
      case "headings":
        content = generateHeadings(wordList)
        break
    }

    setGeneratedText(content)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText)
      toast({
        title: "Copied!",
        description: "Text copied to clipboard successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadText = () => {
    const blob = new Blob([generatedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lorem-ipsum-${contentType}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Text file downloaded successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lorem Ipsum Generator</h1>
          <p className="text-lg text-gray-600 mb-4">
            Generate customizable placeholder text for your mockups and designs
          </p>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
            Designed & Developed by Boad Technologies
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Generator Settings</CardTitle>
              <CardDescription>Customize your placeholder text generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={textType} onValueChange={setTextType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="lorem">Classic Lorem</TabsTrigger>
                  <TabsTrigger value="tech">Tech Ipsum</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="list">List Items</SelectItem>
                    <SelectItem value="headings">Headings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="count">
                  Number of{" "}
                  {contentType === "paragraphs"
                    ? "Paragraphs"
                    : contentType === "sentences"
                      ? "Sentences"
                      : contentType === "words"
                        ? "Words"
                        : contentType === "list"
                          ? "List Items"
                          : "Headings"}
                </Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="50"
                  value={count}
                  onChange={(e) => setCount(Number.parseInt(e.target.value) || 1)}
                />
              </div>

              {(contentType === "paragraphs" || contentType === "sentences") && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="words-per-sentence">Words per Sentence</Label>
                    <Input
                      id="words-per-sentence"
                      type="number"
                      min="3"
                      max="25"
                      value={wordsPerSentence}
                      onChange={(e) => setWordsPerSentence(Number.parseInt(e.target.value) || 12)}
                    />
                  </div>
                  {contentType === "paragraphs" && (
                    <div className="space-y-2">
                      <Label htmlFor="sentences-per-paragraph">Sentences per Paragraph</Label>
                      <Input
                        id="sentences-per-paragraph"
                        type="number"
                        min="2"
                        max="10"
                        value={sentencesPerParagraph}
                        onChange={(e) => setSentencesPerParagraph(Number.parseInt(e.target.value) || 5)}
                      />
                    </div>
                  )}
                </div>
              )}

              <Button onClick={generateContent} className="w-full" size="lg">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Text
              </Button>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Text</CardTitle>
              <CardDescription>Your customized placeholder text</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  placeholder="Click 'Generate Text' to create your placeholder content..."
                  className="min-h-[400px] font-mono text-sm"
                />

                {generatedText && (
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button onClick={downloadText} variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Classic Lorem Ipsum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Traditional placeholder text derived from Cicero's "de Finibus Bonorum et Malorum" written in 45 BC.
                Perfect for general design mockups and layouts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tech Ipsum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Technology-focused placeholder text using programming and tech terminology. Ideal for software
                documentation, tech websites, and developer portfolios.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-sm text-gray-500">
            © 2024 Boad Technologies. Built with precision for designers and developers.
          </p>
        </div>
      </div>
    </div>
  )
}
