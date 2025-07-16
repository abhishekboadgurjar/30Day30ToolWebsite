"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export function useAutoSave(content: string, key: string, delay = 2000) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const contentRef = useRef(content)

  // Update content ref when content changes
  useEffect(() => {
    contentRef.current = content
  }, [content])

  const saveNow = useCallback(() => {
    localStorage.setItem(key, contentRef.current)
    setLastSaved(new Date())

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = null
    }
  }, [key])

  // Auto-save effect
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(key, content)
      setLastSaved(new Date())
    }, delay)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [content, key, delay])

  return { lastSaved, saveNow }
}
