"use client"

import { useEffect, useRef } from "react"

interface EditorPaneProps {
  value: string
  onChange: (value: string) => void
  language: string
  placeholder?: string
}

export function EditorPane({ value, onChange, language, placeholder }: EditorPaneProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault()
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newValue = value.substring(0, start) + "  " + value.substring(end)
        onChange(newValue)

        // Set cursor position after the inserted spaces
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        }, 0)
      }
    }

    textarea.addEventListener("keydown", handleTab)
    return () => textarea.removeEventListener("keydown", handleTab)
  }, [value, onChange])

  return (
    <div className="h-full relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full p-4 bg-background border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed"
        spellCheck={false}
        style={{
          minHeight: "400px",
          tabSize: 2,
        }}
      />
      <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
        {language.toUpperCase()}
      </div>
    </div>
  )
}
