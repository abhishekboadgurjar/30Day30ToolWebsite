"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import MarkdownPreview from "./markdown-preview"
import SettingsPanel from "./settings-panel"
import ExportDialog from "./export-dialog"
import { useMarkdownHistory } from "@/hooks/use-markdown-history"
import { useAutoSave } from "@/hooks/use-auto-save"
import Header from "./header"
import Footer from "./footer"

const defaultMarkdown = `# Welcome to Boad Technologies Markdown Editor

## Features

This is a **powerful** and *intuitive* Markdown editor with live preview.

### What you can do:

- Write Markdown with syntax highlighting
- See live preview in real-time
- Toggle between light and dark themes
- Export your documents as Markdown or HTML
- Customize editor settings
- Auto-save your work locally

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! Welcome to our Markdown editor.\`;
}

console.log(greet('Developer'));
\`\`\`

### Table Example

| Feature | Status | Priority |
|---------|--------|----------|
| Live Preview | ✅ Complete | High |
| Dark Mode | ✅ Complete | High |
| Export | ✅ Complete | Medium |
| PWA Support | ✅ Complete | Medium |

> **Note**: This editor automatically saves your work locally. Your content is preserved between sessions.

---

**Happy writing!** 🚀

*Powered by Boad Technologies*
`

interface EditorSettings {
  fontSize: number
  lineHeight: number
  tabSize: number
  wordWrap: boolean
  showLineNumbers: boolean
}

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [splitRatio, setSplitRatio] = useState(50)
  const [settings, setSettings] = useState<EditorSettings>({
    fontSize: 14,
    lineHeight: 1.5,
    tabSize: 2,
    wordWrap: true,
    showLineNumbers: false,
  })

  const { theme, setTheme } = useTheme()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Custom hooks for history and auto-save
  const { pushToHistory, undo, redo, canUndo, canRedo } = useMarkdownHistory(markdown, setMarkdown)

  const { lastSaved, saveNow } = useAutoSave(markdown, "markdown-editor-content")

  // Load saved content and settings on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("markdown-editor-content")
    const savedSettings = localStorage.getItem("markdown-editor-settings")

    if (savedContent) {
      setMarkdown(savedContent)
    }

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem("markdown-editor-settings", JSON.stringify(settings))
  }, [settings])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            if (e.shiftKey) {
              e.preventDefault()
              redo()
            } else {
              e.preventDefault()
              undo()
            }
            break
          case "y":
            e.preventDefault()
            redo()
            break
          case "s":
            e.preventDefault()
            saveNow()
            break
          case "e":
            e.preventDefault()
            setShowExport(true)
            break
          case ",":
            e.preventDefault()
            setShowSettings(true)
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [undo, redo, saveNow])

  const handleMarkdownChange = useCallback(
    (value: string) => {
      setMarkdown(value)
      pushToHistory(value)
    },
    [pushToHistory],
  )

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const insertMarkdown = (syntax: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = markdown.substring(start, end)

    let newText = ""

    switch (syntax) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`
        break
      case "italic":
        newText = `*${selectedText || "italic text"}*`
        break
      case "code":
        newText = `\`${selectedText || "code"}\``
        break
      case "link":
        newText = `[${selectedText || "link text"}](url)`
        break
      case "image":
        newText = `![${selectedText || "alt text"}](image-url)`
        break
      case "heading":
        newText = `# ${selectedText || "Heading"}`
        break
      case "list":
        newText = `- ${selectedText || "List item"}`
        break
      case "quote":
        newText = `> ${selectedText || "Quote"}`
        break
    }

    const newMarkdown = markdown.substring(0, start) + newText + markdown.substring(end)
    handleMarkdownChange(newMarkdown)

    // Focus and set cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + newText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      <Header
        onToggleTheme={toggleTheme}
        onTogglePreviewMode={togglePreviewMode}
        onToggleFullscreen={toggleFullscreen}
        onShowSettings={() => setShowSettings(true)}
        onShowExport={() => setShowExport(true)}
        onUndo={undo}
        onRedo={redo}
        onSave={saveNow}
        onInsertMarkdown={insertMarkdown}
        canUndo={canUndo}
        canRedo={canRedo}
        isPreviewMode={isPreviewMode}
        isFullscreen={isFullscreen}
        lastSaved={lastSaved}
        theme={theme}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile: Toggle between editor and preview */}
        <div className="md:hidden w-full">
          {isPreviewMode ? (
            <MarkdownPreview markdown={markdown} />
          ) : (
            <div className="h-full p-4">
              <Textarea
                ref={textareaRef}
                value={markdown}
                onChange={(e) => handleMarkdownChange(e.target.value)}
                className="h-full resize-none font-mono"
                style={{
                  fontSize: `${settings.fontSize}px`,
                  lineHeight: settings.lineHeight,
                  tabSize: settings.tabSize,
                  whiteSpace: settings.wordWrap ? "pre-wrap" : "pre",
                }}
                placeholder="Start writing your Markdown here..."
              />
            </div>
          )}
        </div>

        {/* Desktop: Split view */}
        <div className="hidden md:flex w-full">
          {/* Editor Pane */}
          <div className="border-r bg-background" style={{ width: `${splitRatio}%` }}>
            <div className="h-full p-4">
              <Textarea
                ref={textareaRef}
                value={markdown}
                onChange={(e) => handleMarkdownChange(e.target.value)}
                className="h-full resize-none font-mono"
                style={{
                  fontSize: `${settings.fontSize}px`,
                  lineHeight: settings.lineHeight,
                  tabSize: settings.tabSize,
                  whiteSpace: settings.wordWrap ? "pre-wrap" : "pre",
                }}
                placeholder="Start writing your Markdown here..."
              />
            </div>
          </div>

          {/* Resize Handle */}
          <div
            className="w-1 bg-border hover:bg-primary/20 cursor-col-resize transition-colors"
            onMouseDown={(e) => {
              const startX = e.clientX
              const startRatio = splitRatio

              const handleMouseMove = (e: MouseEvent) => {
                const deltaX = e.clientX - startX
                const containerWidth = window.innerWidth
                const deltaRatio = (deltaX / containerWidth) * 100
                const newRatio = Math.max(20, Math.min(80, startRatio + deltaRatio))
                setSplitRatio(newRatio)
              }

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
              }

              document.addEventListener("mousemove", handleMouseMove)
              document.addEventListener("mouseup", handleMouseUp)
            }}
          />

          {/* Preview Pane */}
          <div className="bg-background" style={{ width: `${100 - splitRatio}%` }}>
            <MarkdownPreview markdown={markdown} />
          </div>
        </div>
      </div>

      {/* Footer - Always at bottom when not in fullscreen */}
      {!isFullscreen && <Footer />}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel settings={settings} onSettingsChange={setSettings} onClose={() => setShowSettings(false)} />
      )}

      {/* Export Dialog */}
      {showExport && <ExportDialog markdown={markdown} onClose={() => setShowExport(false)} />}
    </div>
  )
}
