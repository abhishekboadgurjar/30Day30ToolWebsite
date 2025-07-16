"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Keyboard,
  Type,
  Palette,
  MousePointer,
  Globe,
  Loader2,
} from "lucide-react"

interface AccessibilityIssue {
  type: "error" | "warning" | "info"
  category: string
  title: string
  description: string
  element?: string
  suggestion: string
  wcagLevel: "A" | "AA" | "AAA"
}

interface AccessibilityReport {
  url: string
  score: number
  totalIssues: number
  errors: number
  warnings: number
  passed: number
  issues: AccessibilityIssue[]
  categories: {
    contrast: number
    altText: number
    keyboard: number
    aria: number
    semantic: number
  }
}

export default function AccessibilityChecker() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [report, setReport] = useState<AccessibilityReport | null>(null)

  // Simulated accessibility analysis
  const analyzeWebsite = async (websiteUrl: string): Promise<AccessibilityReport> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis results
    const mockIssues: AccessibilityIssue[] = [
      {
        type: "error",
        category: "Images",
        title: "Missing Alt Text",
        description: "3 images found without alternative text",
        element: '<img src="hero-banner.jpg">',
        suggestion: 'Add descriptive alt attributes to all images. Use alt="" for decorative images.',
        wcagLevel: "A",
      },
      {
        type: "error",
        category: "Color Contrast",
        title: "Insufficient Color Contrast",
        description: "Text contrast ratio is 3.2:1, below WCAG AA standard",
        element: ".text-gray-400 on white background",
        suggestion: "Increase contrast ratio to at least 4.5:1 for normal text or 3:1 for large text.",
        wcagLevel: "AA",
      },
      {
        type: "warning",
        category: "Keyboard Navigation",
        title: "Missing Focus Indicators",
        description: "Interactive elements lack visible focus indicators",
        element: "button, a, input elements",
        suggestion: "Add :focus styles with clear visual indicators for keyboard users.",
        wcagLevel: "AA",
      },
      {
        type: "warning",
        category: "ARIA",
        title: "Missing ARIA Labels",
        description: "Form inputs without associated labels or ARIA labels",
        element: '<input type="search">',
        suggestion: "Add aria-label or associate with label elements using for/id attributes.",
        wcagLevel: "A",
      },
      {
        type: "error",
        category: "Semantic HTML",
        title: "Improper Heading Structure",
        description: "Heading levels skip from h1 to h3, missing h2",
        element: "<h1>Title</h1> followed by <h3>Subtitle</h3>",
        suggestion: "Use heading levels sequentially (h1, h2, h3, etc.) to create proper document outline.",
        wcagLevel: "A",
      },
      {
        type: "info",
        category: "Performance",
        title: "Large Images",
        description: "Some images are larger than necessary, may impact users on slow connections",
        element: "hero-image.jpg (2.3MB)",
        suggestion: "Optimize images and provide responsive image sizes.",
        wcagLevel: "AAA",
      },
    ]

    const errors = mockIssues.filter((issue) => issue.type === "error").length
    const warnings = mockIssues.filter((issue) => issue.type === "warning").length
    const totalIssues = mockIssues.length
    const passed = 15 // Mock passed checks
    const score = Math.round((passed / (passed + totalIssues)) * 100)

    return {
      url: websiteUrl,
      score,
      totalIssues,
      errors,
      warnings,
      passed,
      issues: mockIssues,
      categories: {
        contrast: 2,
        altText: 3,
        keyboard: 1,
        aria: 1,
        semantic: 1,
      },
    }
  }

  const handleAnalyze = async () => {
    if (!url) return

    setIsAnalyzing(true)
    try {
      const result = await analyzeWebsite(url)
      setReport(result)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "images":
        return <Eye className="h-4 w-4" />
      case "color contrast":
        return <Palette className="h-4 w-4" />
      case "keyboard navigation":
        return <Keyboard className="h-4 w-4" />
      case "aria":
        return <MousePointer className="h-4 w-4" />
      case "semantic html":
        return <Type className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Accessibility Checker</h1>
          <p className="text-lg text-gray-600 mb-4">Analyze websites for accessibility issues and WCAG compliance</p>
          <div className="text-sm text-gray-500">
            Powered by <span className="font-semibold text-indigo-600">boad technologies</span>
          </div>
        </div>

        {/* URL Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Website URL</CardTitle>
            <CardDescription>Enter the URL of the website you want to analyze for accessibility issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAnalyze} disabled={!url || isAnalyzing} className="px-8">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {report && (
          <div className="space-y-6">
            {/* Score Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Accessibility Score</span>
                  <Badge variant="outline" className="text-sm">
                    {report.url}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(report.score)}`}>{report.score}%</div>
                    <div className="text-sm text-gray-500">Overall Score</div>
                    <Progress value={report.score} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{report.errors}</div>
                    <div className="text-sm text-gray-500">Errors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{report.warnings}</div>
                    <div className="text-sm text-gray-500">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{report.passed}</div>
                    <div className="text-sm text-gray-500">Passed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Issues by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Palette className="h-6 w-6 mx-auto mb-2 text-red-600" />
                    <div className="font-semibold text-red-600">{report.categories.contrast}</div>
                    <div className="text-xs text-gray-600">Contrast</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Eye className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-semibold text-orange-600">{report.categories.altText}</div>
                    <div className="text-xs text-gray-600">Alt Text</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Keyboard className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                    <div className="font-semibold text-yellow-600">{report.categories.keyboard}</div>
                    <div className="text-xs text-gray-600">Keyboard</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <MousePointer className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold text-blue-600">{report.categories.aria}</div>
                    <div className="text-xs text-gray-600">ARIA</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Type className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold text-purple-600">{report.categories.semantic}</div>
                    <div className="text-xs text-gray-600">Semantic</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Issues */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Issues</CardTitle>
                <CardDescription>
                  Review and fix these accessibility issues to improve your website's accessibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Issues</TabsTrigger>
                    <TabsTrigger value="error">Errors</TabsTrigger>
                    <TabsTrigger value="warning">Warnings</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {report.issues.map((issue, index) => (
                      <Alert key={index} className="border-l-4 border-l-gray-300">
                        <div className="flex items-start gap-3">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getCategoryIcon(issue.category)}
                              <span className="font-semibold">{issue.title}</span>
                              <Badge variant="outline" className="text-xs">
                                WCAG {issue.wcagLevel}
                              </Badge>
                            </div>
                            <AlertDescription className="mb-2">{issue.description}</AlertDescription>
                            {issue.element && (
                              <div className="bg-gray-100 p-2 rounded text-sm font-mono mb-2">{issue.element}</div>
                            )}
                            <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                              <strong>Suggestion:</strong> {issue.suggestion}
                            </div>
                          </div>
                        </div>
                      </Alert>
                    ))}
                  </TabsContent>

                  <TabsContent value="error" className="space-y-4">
                    {report.issues
                      .filter((issue) => issue.type === "error")
                      .map((issue, index) => (
                        <Alert key={index} className="border-l-4 border-l-red-500">
                          <div className="flex items-start gap-3">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getCategoryIcon(issue.category)}
                                <span className="font-semibold">{issue.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  WCAG {issue.wcagLevel}
                                </Badge>
                              </div>
                              <AlertDescription className="mb-2">{issue.description}</AlertDescription>
                              {issue.element && (
                                <div className="bg-gray-100 p-2 rounded text-sm font-mono mb-2">{issue.element}</div>
                              )}
                              <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                                <strong>Suggestion:</strong> {issue.suggestion}
                              </div>
                            </div>
                          </div>
                        </Alert>
                      ))}
                  </TabsContent>

                  <TabsContent value="warning" className="space-y-4">
                    {report.issues
                      .filter((issue) => issue.type === "warning")
                      .map((issue, index) => (
                        <Alert key={index} className="border-l-4 border-l-yellow-500">
                          <div className="flex items-start gap-3">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getCategoryIcon(issue.category)}
                                <span className="font-semibold">{issue.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  WCAG {issue.wcagLevel}
                                </Badge>
                              </div>
                              <AlertDescription className="mb-2">{issue.description}</AlertDescription>
                              {issue.element && (
                                <div className="bg-gray-100 p-2 rounded text-sm font-mono mb-2">{issue.element}</div>
                              )}
                              <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                                <strong>Suggestion:</strong> {issue.suggestion}
                              </div>
                            </div>
                          </div>
                        </Alert>
                      ))}
                  </TabsContent>

                  <TabsContent value="info" className="space-y-4">
                    {report.issues
                      .filter((issue) => issue.type === "info")
                      .map((issue, index) => (
                        <Alert key={index} className="border-l-4 border-l-blue-500">
                          <div className="flex items-start gap-3">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getCategoryIcon(issue.category)}
                                <span className="font-semibold">{issue.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  WCAG {issue.wcagLevel}
                                </Badge>
                              </div>
                              <AlertDescription className="mb-2">{issue.description}</AlertDescription>
                              {issue.element && (
                                <div className="bg-gray-100 p-2 rounded text-sm font-mono mb-2">{issue.element}</div>
                              )}
                              <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                                <strong>Suggestion:</strong> {issue.suggestion}
                              </div>
                            </div>
                          </div>
                        </Alert>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* WCAG Guidelines Reference */}
            <Card>
              <CardHeader>
                <CardTitle>WCAG Guidelines Reference</CardTitle>
                <CardDescription>Understanding Web Content Accessibility Guidelines compliance levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-800 mb-2">Level A</div>
                    <div className="text-sm text-green-700">
                      Basic accessibility features that must be present for any website to be accessible.
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-800 mb-2">Level AA</div>
                    <div className="text-sm text-blue-700">
                      Standard level of accessibility that most websites should achieve. Required for legal compliance
                      in many jurisdictions.
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-800 mb-2">Level AAA</div>
                    <div className="text-sm text-purple-700">
                      Enhanced accessibility features that provide the best user experience for people with
                      disabilities.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>This tool helps identify common accessibility issues based on WCAG guidelines [^1].</p>
          <p className="mt-2">
            Powered by <span className="font-semibold text-indigo-600">boad technologies</span>
          </p>
        </div>
      </div>
    </div>
  )
}
