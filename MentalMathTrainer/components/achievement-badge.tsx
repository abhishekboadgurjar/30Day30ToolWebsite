import { Trophy, Zap, Target, Star, Award, Crown } from "lucide-react"

interface AchievementBadgeProps {
  type: string
  unlocked: boolean
}

const achievementConfig = {
  "first-correct": { icon: Star, label: "First Success", color: "bg-yellow-500" },
  "streak-5": { icon: Zap, label: "5 Streak", color: "bg-orange-500" },
  "streak-10": { icon: Target, label: "10 Streak", color: "bg-red-500" },
  "speed-demon": { icon: Trophy, label: "Speed Demon", color: "bg-purple-500" },
  perfectionist: { icon: Award, label: "Perfectionist", color: "bg-green-500" },
  "math-master": { icon: Crown, label: "Math Master", color: "bg-blue-500" },
}

export function AchievementBadge({ type, unlocked }: AchievementBadgeProps) {
  const config = achievementConfig[type as keyof typeof achievementConfig]
  if (!config) return null

  const Icon = config.icon

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg border ${unlocked ? config.color + " text-white" : "bg-gray-100 text-gray-400"}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs font-medium">{config.label}</span>
    </div>
  )
}
