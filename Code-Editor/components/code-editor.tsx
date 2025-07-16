"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditorPane } from "@/components/editor-pane"
import { PreviewPane } from "@/components/preview-pane"
import { Header } from "@/components/header"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Download, RotateCcw, Play } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodePlay Preview</title>
</head>
<body>
    <h1>Welcome to CodePlay!</h1>
    <p>Start editing to see your changes live.</p>
</body>
</html>`

const defaultCSS = `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    text-align: center;
    font-size: 18px;
    opacity: 0.9;
}`

const defaultJS = `// Welcome to CodePlay!
// Your JavaScript code will run in the preview

console.log('CodePlay is ready!');

// Example: Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    const h1 = document.querySelector('h1');
    if (h1) {
        h1.addEventListener('click', function() {
            this.style.transform = this.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
    }
});`

export function CodeEditor() {
  const [html, setHtml] = useLocalStorage("codeplay-html", defaultHTML)
  const [css, setCss] = useLocalStorage("codeplay-css", defaultCSS)
  const [js, setJs] = useLocalStorage("codeplay-js", defaultJS)
  const [activeTab, setActiveTab] = useState("html")
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)
  const isMobile = useMobile()

  const resetCode = () => {
    setHtml(defaultHTML)
    setCss(defaultCSS)
    setJs(defaultJS)
  }

  const downloadCode = () => {
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodePlay Export</title>
    <style>
${css}
    </style>
</head>
<body>
${html.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/, "").replace(/<\/body>[\s\S]*?<\/html>/, "")}
    <script>
${js}
    </script>
</body>
</html>`

    const blob = new Blob([fullHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "codeplay-export.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible)
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        {/* Editor Section */}
        <div className={`${isPreviewVisible && !isMobile ? "lg:w-1/2" : "w-full"} flex flex-col`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Code Editor</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={togglePreview}>
                <Play className="h-4 w-4 mr-1" />
                {isPreviewVisible ? "Hide" : "Show"} Preview
              </Button>
              <Button variant="outline" size="sm" onClick={resetCode}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCode}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <Card className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="h-[calc(100%-40px)] mt-0">
                <EditorPane
                  value={html}
                  onChange={setHtml}
                  language="html"
                  placeholder="Enter your HTML code here..."
                />
              </TabsContent>

              <TabsContent value="css" className="h-[calc(100%-40px)] mt-0">
                <EditorPane value={css} onChange={setCss} language="css" placeholder="Enter your CSS code here..." />
              </TabsContent>

              <TabsContent value="js" className="h-[calc(100%-40px)] mt-0">
                <EditorPane
                  value={js}
                  onChange={setJs}
                  language="javascript"
                  placeholder="Enter your JavaScript code here..."
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Preview Section */}
        <div
          className={`${isMobile ? "w-full" : "lg:w-1/2"} flex flex-col ${!isPreviewVisible && isMobile ? "hidden" : ""}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Live Preview</h2>
            <Button variant="ghost" size="sm" onClick={togglePreview} className="hidden lg:flex">
              {isPreviewVisible ? "Hide" : "Show"} Preview
            </Button>
          </div>

          {isPreviewVisible ? (
            <Card className="flex-1">
              <PreviewPane html={html} css={css} js={js} />
            </Card>
          ) : (
            <Card className="flex-1 hidden lg:flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Preview is hidden</p>
                <Button variant="outline" onClick={togglePreview} className="mt-2">
                  Show Preview
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      <footer className="text-center text-sm text-muted-foreground py-4 border-t">
        Designed and Developed by <span className="font-semibold text-foreground">BOAD Technologies</span>
      </footer>
    </div>
  )
}
