"use client"

import { useState, useCallback, useRef } from "react"

interface HistoryState {
  content: string
  timestamp: number
}

export function useMarkdownHistory(currentContent: string, setContent: (content: string) => void) {
  const [history, setHistory] = useState<HistoryState[]>([{ content: currentContent, timestamp: Date.now() }])
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastPushTime = useRef(Date.now())
  const isUndoRedoRef = useRef(false)

  const pushToHistory = useCallback(
    (content: string) => {
      // Don't push to history if this is from undo/redo
      if (isUndoRedoRef.current) {
        isUndoRedoRef.current = false
        return
      }

      const now = Date.now()

      // Only push to history if enough time has passed or content is significantly different
      if (now - lastPushTime.current < 1000 && Math.abs(content.length - currentContent.length) < 10) {
        return
      }

      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1)
        newHistory.push({ content, timestamp: now })

        // Limit history size
        if (newHistory.length > 50) {
          newHistory.shift()
          return newHistory
        }

        return newHistory
      })

      setCurrentIndex((prev) => Math.min(prev + 1, 49))
      lastPushTime.current = now
    },
    [currentContent, currentIndex],
  )

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      isUndoRedoRef.current = true
      setContent(history[newIndex].content)
    }
  }, [currentIndex, history, setContent])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      isUndoRedoRef.current = true
      setContent(history[newIndex].content)
    }
  }, [currentIndex, history, setContent])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    pushToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
