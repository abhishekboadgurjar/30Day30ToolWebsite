"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Monitor } from "lucide-react"

export function ThemeIndicator() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const Icon = currentTheme === "dark" ? Moon : Sun
  const SystemIcon = theme === "system" ? Monitor : null

  return (
    <Badge variant="outline" className="gap-1 text-xs">
      {SystemIcon && <SystemIcon className="h-3 w-3" />}
      <Icon className="h-3 w-3" />
      <span className="capitalize">{theme === "system" ? `System (${currentTheme})` : theme}</span>
    </Badge>
  )
}
