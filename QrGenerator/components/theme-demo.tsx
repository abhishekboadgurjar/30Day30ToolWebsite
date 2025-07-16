"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palette, Sun, Moon, Sparkles } from "lucide-react"

export function ThemeDemo() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="default" size="sm">
            <Sun className="h-4 w-4 mr-2" />
            Primary
          </Button>
          <Button variant="secondary" size="sm">
            <Moon className="h-4 w-4 mr-2" />
            Secondary
          </Button>
          <Button variant="outline" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Outline
          </Button>
          <Button variant="ghost" size="sm">
            Ghost
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-input">Sample Input</Label>
          <Input id="demo-input" placeholder="Type something..." />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            This is a muted background with muted text color that adapts to both light and dark themes.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
