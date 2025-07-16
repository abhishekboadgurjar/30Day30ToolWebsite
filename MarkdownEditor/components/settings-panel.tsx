"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"

interface EditorSettings {
  fontSize: number
  lineHeight: number
  tabSize: number
  wordWrap: boolean
  showLineNumbers: boolean
}

interface SettingsPanelProps {
  settings: EditorSettings
  onSettingsChange: (settings: EditorSettings) => void
  onClose: () => void
}

export default function SettingsPanel({ settings, onSettingsChange, onClose }: SettingsPanelProps) {
  const updateSetting = <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Editor Settings</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Font Size: {settings.fontSize}px</Label>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSetting("fontSize", value)}
              min={10}
              max={24}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Line Height: {settings.lineHeight}</Label>
            <Slider
              value={[settings.lineHeight]}
              onValueChange={([value]) => updateSetting("lineHeight", value)}
              min={1}
              max={2.5}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Tab Size: {settings.tabSize}</Label>
            <Slider
              value={[settings.tabSize]}
              onValueChange={([value]) => updateSetting("tabSize", value)}
              min={2}
              max={8}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="word-wrap">Word Wrap</Label>
            <Switch
              id="word-wrap"
              checked={settings.wordWrap}
              onCheckedChange={(checked) => updateSetting("wordWrap", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="line-numbers">Show Line Numbers</Label>
            <Switch
              id="line-numbers"
              checked={settings.showLineNumbers}
              onCheckedChange={(checked) => updateSetting("showLineNumbers", checked)}
            />
          </div>

          <div className="pt-4">
            <Button onClick={onClose} className="w-full">
              Apply Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
