"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bug, RefreshCw } from "lucide-react"

export function ThemeDebug() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Theme Debug (Loading...)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading theme information...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5" />
          Theme Debug
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Current Theme:</span>
            <Badge variant="outline" className="ml-2">
              {theme || "undefined"}
            </Badge>
          </div>
          <div>
            <span className="font-medium">Resolved Theme:</span>
            <Badge variant="outline" className="ml-2">
              {resolvedTheme || "undefined"}
            </Badge>
          </div>
          <div>
            <span className="font-medium">System Theme:</span>
            <Badge variant="outline" className="ml-2">
              {systemTheme || "undefined"}
            </Badge>
          </div>
          <div>
            <span className="font-medium">HTML Class:</span>
            <Badge variant="outline" className="ml-2">
              {typeof document !== "undefined" ? document.documentElement.className || "none" : "N/A"}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" onClick={() => setTheme("light")} variant={theme === "light" ? "default" : "outline"}>
            Light
          </Button>
          <Button size="sm" onClick={() => setTheme("dark")} variant={theme === "dark" ? "default" : "outline"}>
            Dark
          </Button>
          <Button size="sm" onClick={() => setTheme("system")} variant={theme === "system" ? "default" : "outline"}>
            System
          </Button>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => window.location.reload()}
          className="w-full flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reload Page
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Theme should change immediately when clicked</p>
          <p>• HTML class should show "dark" or no class for light</p>
          <p>• System theme follows your OS preference</p>
        </div>
      </CardContent>
    </Card>
  )
}
