"use client"

import { useMemo } from "react"
import { remark } from "remark"
import remarkHtml from "remark-html"
import remarkGfm from "remark-gfm"
import { Card } from "@/components/ui/card"

interface MarkdownPreviewProps {
  markdown: string
}

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const htmlContent = useMemo(() => {
    try {
      const result = remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).processSync(markdown)

      return result.toString()
    } catch (error) {
      console.error("Error processing markdown:", error)
      return "<p>Error rendering markdown</p>"
    }
  }, [markdown])

  return (
    <div className="h-full overflow-auto">
      <div className="p-4">
        <Card className="p-6">
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-pre:bg-muted prose-pre:border"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </Card>
      </div>
    </div>
  )
}
