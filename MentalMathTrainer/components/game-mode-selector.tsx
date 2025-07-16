"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Infinity, Target, Zap } from "lucide-react"

interface GameMode {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  duration?: number
}

const gameModes: GameMode[] = [
  {
    id: "timed",
    name: "Timed Challenge",
    description: "60 seconds of rapid-fire problems",
    icon: Clock,
    duration: 60,
  },
  {
    id: "endless",
    name: "Endless Mode",
    description: "Practice without time pressure",
    icon: Infinity,
  },
  {
    id: "accuracy",
    name: "Accuracy Test",
    description: "20 problems, focus on precision",
    icon: Target,
  },
  {
    id: "speed",
    name: "Speed Round",
    description: "30 seconds of lightning fast math",
    icon: Zap,
    duration: 30,
  },
]

interface GameModeSelectorProps {
  selectedMode: string
  onModeSelect: (mode: string) => void
}

export function GameModeSelector({ selectedMode, onModeSelect }: GameModeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {gameModes.map((mode) => {
        const Icon = mode.icon
        return (
          <Card
            key={mode.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedMode === mode.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onModeSelect(mode.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className="w-5 h-5" />
                {mode.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{mode.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
