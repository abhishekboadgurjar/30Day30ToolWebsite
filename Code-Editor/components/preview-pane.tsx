"use client"

import { useEffect, useState } from "react"

interface PreviewPaneProps {
  html: string
  css: string
  js: string
}

export function PreviewPane({ html, css, js }: PreviewPaneProps) {
  const [srcDoc, setSrcDoc] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Extract body content from HTML if it's a full HTML document
      let bodyContent = html
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
      if (bodyMatch) {
        bodyContent = bodyMatch[1]
      } else if (html.includes("<!DOCTYPE") || html.includes("<html")) {
        // If it's a full HTML document but no body tag found, use as is
        bodyContent = html
      }

      const document = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${bodyContent}
          <script>
            try {
              ${js}
            } catch (error) {
              console.error('JavaScript Error:', error);
            }
          </script>
        </body>
        </html>
      `
      setSrcDoc(document)
    }, 300)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <div className="h-full w-full">
      <iframe
        srcDoc={srcDoc}
        title="Preview"
        className="w-full h-full border-0 bg-white"
        style={{ minHeight: "400px" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
