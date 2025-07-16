"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Timer,
  Trophy,
  Target,
  Zap,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
  Award,
  TrendingUp,
  Brain,
  Star,
  Crown,
  Medal,
} from "lucide-react"
import { GameModeSelector } from "./components/game-mode-selector"
import { AchievementBadge } from "./components/achievement-badge"
import { SoundManager } from "./components/sound-manager"
import { useLocalStorage } from "./hooks/use-local-storage"

type Operation = "+" | "-" | "×" | "÷" | "²" | "%"
type Difficulty = "easy" | "medium" | "hard" | "expert"
type GameMode = "timed" | "endless" | "accuracy" | "speed"

interface Problem {
  num1: number
  num2: number
  operation: Operation
  answer: number
  displayText: string
}

interface Stats {
  correct: number
  incorrect: number
  streak: number
  bestStreak: number
  totalTime: number
  averageTime: number
  problemsSolved: number
}

interface HistoricalStats {
  totalGames: number
  bestAccuracy: number
  bestStreak: number
  totalProblems: number
  averageAccuracy: number
  favoriteOperation: Operation | "mixed"
}

export default function EnhancedMentalMathTrainer() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [operation, setOperation] = useState<Operation | "mixed">("mixed")
  const [gameMode, setGameMode] = useState<GameMode>("timed")
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [isGameActive, setIsGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [problemStartTime, setProblemStartTime] = useState(0)
  const [soundEnabled, setSoundEnabled] = useLocalStorage("math-trainer-sound", true)
  const [stats, setStats] = useState<Stats>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0,
    totalTime: 0,
    averageTime: 0,
    problemsSolved: 0,
  })
  const [historicalStats, setHistoricalStats] = useLocalStorage<HistoricalStats>("math-trainer-history", {
    totalGames: 0,
    bestAccuracy: 0,
    bestStreak: 0,
    totalProblems: 0,
    averageAccuracy: 0,
    favoriteOperation: "mixed",
  })
  const [achievements, setAchievements] = useLocalStorage<string[]>("math-trainer-achievements", [])
  const [feedback, setFeedback] = useState<{ type: "correct" | "incorrect" | null; message: string }>({
    type: null,
    message: "",
  })

  const generateNumber = useCallback((difficulty: Difficulty, isSecond = false) => {
    switch (difficulty) {
      case "easy":
        return Math.floor(Math.random() * 10) + 1
      case "medium":
        return Math.floor(Math.random() * 50) + 1
      case "hard":
        return isSecond ? Math.floor(Math.random() * 20) + 1 : Math.floor(Math.random() * 100) + 1
      case "expert":
        return isSecond ? Math.floor(Math.random() * 50) + 1 : Math.floor(Math.random() * 500) + 1
      default:
        return Math.floor(Math.random() * 10) + 1
    }
  }, [])

  const generateProblem = useCallback(() => {
    const operations: Operation[] = operation === "mixed" ? ["+", "-", "×", "÷", "²", "%"] : [operation as Operation]
    const selectedOp = operations[Math.floor(Math.random() * operations.length)]

    let num1 = generateNumber(difficulty)
    let num2 = generateNumber(difficulty, true)
    let answer: number
    let displayText: string

    switch (selectedOp) {
      case "-":
        if (num1 < num2) [num1, num2] = [num2, num1]
        answer = num1 - num2
        displayText = `${num1} - ${num2}`
        break
      case "÷":
        answer = num2
        num1 = num2 * (Math.floor(Math.random() * 12) + 1)
        num2 = answer
        answer = num1 / num2
        displayText = `${num1} ÷ ${num2}`
        break
      case "×":
        answer = num1 * num2
        displayText = `${num1} × ${num2}`
        break
      case "²":
        num1 = Math.floor(Math.random() * (difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20)) + 1
        answer = num1 * num1
        displayText = `${num1}²`
        break
      case "%":
        num2 = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)]
        num1 = Math.floor(Math.random() * 200) + 1
        answer = (num1 * num2) / 100
        displayText = `${num2}% of ${num1}`
        break
      default:
        answer = num1 + num2
        displayText = `${num1} + ${num2}`
    }

    return { num1, num2, operation: selectedOp, answer, displayText }
  }, [difficulty, operation, generateNumber])

  const checkAchievements = useCallback(
    (newStats: Stats) => {
      const newAchievements: string[] = []

      if (newStats.correct >= 1 && !achievements.includes("first-correct")) {
        newAchievements.push("first-correct")
      }
      if (newStats.streak >= 5 && !achievements.includes("streak-5")) {
        newAchievements.push("streak-5")
      }
      if (newStats.streak >= 10 && !achievements.includes("streak-10")) {
        newAchievements.push("streak-10")
      }
      if (newStats.averageTime > 0 && newStats.averageTime < 2000 && !achievements.includes("speed-demon")) {
        newAchievements.push("speed-demon")
      }
      if (newStats.correct >= 10 && newStats.incorrect === 0 && !achievements.includes("perfectionist")) {
        newAchievements.push("perfectionist")
      }
      if (newStats.bestStreak >= 20 && !achievements.includes("math-master")) {
        newAchievements.push("math-master")
      }

      if (newAchievements.length > 0) {
        setAchievements((prev) => [...prev, ...newAchievements])
      }
    },
    [achievements, setAchievements],
  )

  const startGame = () => {
    const duration =
      gameMode === "speed" ? 30 : gameMode === "timed" ? 60 : gameMode === "accuracy" ? 300 : Number.POSITIVE_INFINITY

    setIsGameActive(true)
    setTimeLeft(duration)
    setStats({
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0,
      totalTime: 0,
      averageTime: 0,
      problemsSolved: 0,
    })
    setFeedback({ type: null, message: "" })
    const problem = generateProblem()
    setCurrentProblem(problem)
    setProblemStartTime(Date.now())
  }

  const endGame = () => {
    setIsGameActive(false)
    setCurrentProblem(null)
    setUserAnswer("")

    // Update historical stats
    const accuracy = stats.correct + stats.incorrect > 0 ? (stats.correct / (stats.correct + stats.incorrect)) * 100 : 0
    setHistoricalStats((prev) => ({
      totalGames: prev.totalGames + 1,
      bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
      bestStreak: Math.max(prev.bestStreak, stats.bestStreak),
      totalProblems: prev.totalProblems + stats.problemsSolved,
      averageAccuracy: (prev.averageAccuracy * prev.totalGames + accuracy) / (prev.totalGames + 1),
      favoriteOperation: operation === "mixed" ? prev.favoriteOperation : (operation as Operation),
    }))
  }

  const checkAnswer = () => {
    if (!currentProblem || !userAnswer.trim()) return

    const userNum = Number.parseFloat(userAnswer)
    const isCorrect = Math.abs(userNum - currentProblem.answer) < 0.01
    const problemTime = Date.now() - problemStartTime

    // Play sound effect
    if (typeof window !== "undefined") {
      if (isCorrect && soundEnabled) {
        ;(window as any).playCorrectSound?.()
      } else if (!isCorrect && soundEnabled) {
        ;(window as any).playIncorrectSound?.()
      }
    }

    setStats((prev) => {
      const newCorrect = prev.correct + (isCorrect ? 1 : 0)
      const newIncorrect = prev.incorrect + (isCorrect ? 0 : 1)
      const newStreak = isCorrect ? prev.streak + 1 : 0
      const newBestStreak = Math.max(prev.bestStreak, newStreak)
      const newTotalTime = prev.totalTime + problemTime
      const totalProblems = newCorrect + newIncorrect
      const newAverageTime = totalProblems > 0 ? newTotalTime / totalProblems : 0

      const newStats = {
        correct: newCorrect,
        incorrect: newIncorrect,
        streak: newStreak,
        bestStreak: newBestStreak,
        totalTime: newTotalTime,
        averageTime: newAverageTime,
        problemsSolved: totalProblems,
      }

      checkAchievements(newStats)
      return newStats
    })

    setFeedback({
      type: isCorrect ? "correct" : "incorrect",
      message: isCorrect ? "Correct! 🎉" : `Wrong! The answer was ${currentProblem.answer}`,
    })

    // Generate next problem after a short delay
    setTimeout(() => {
      if (isGameActive && (gameMode === "endless" || timeLeft > 0)) {
        if (gameMode === "accuracy" && stats.problemsSolved >= 19) {
          endGame()
          return
        }

        const problem = generateProblem()
        setCurrentProblem(problem)
        setProblemStartTime(Date.now())
        setUserAnswer("")
        setFeedback({ type: null, message: "" })
      }
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer()
    }
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGameActive && timeLeft > 0 && gameMode !== "endless") {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameActive, timeLeft, gameMode])

  const accuracy = stats.correct + stats.incorrect > 0 ? (stats.correct / (stats.correct + stats.incorrect)) * 100 : 0
  const maxTime = gameMode === "speed" ? 30 : gameMode === "timed" ? 60 : gameMode === "accuracy" ? 300 : 100

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <SoundManager enabled={soundEnabled} />

      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Mental Math Trainer
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">Practice fast arithmetic and improve your mental math skills</p>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">Powered by</span>
          <Badge variant="outline" className="font-semibold text-primary border-primary">
            <Crown className="w-3 h-3 mr-1" />
            Boad Technologies
          </Badge>
        </div>
      </div>

      {!isGameActive ? (
        <Tabs defaultValue="play" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="play">Play</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="play" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Game Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <GameModeSelector selectedMode={gameMode} onModeSelect={(mode) => setGameMode(mode as GameMode)} />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={difficulty} onValueChange={(value: Difficulty) => setDifficulty(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy (1-10)</SelectItem>
                      <SelectItem value="medium">Medium (1-50)</SelectItem>
                      <SelectItem value="hard">Hard (1-100)</SelectItem>
                      <SelectItem value="expert">Expert (1-500)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={operation} onValueChange={(value) => setOperation(value as Operation | "mixed")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed">Mixed Operations</SelectItem>
                      <SelectItem value="+">Addition (+)</SelectItem>
                      <SelectItem value="-">Subtraction (-)</SelectItem>
                      <SelectItem value="×">Multiplication (×)</SelectItem>
                      <SelectItem value="÷">Division (÷)</SelectItem>
                      <SelectItem value="²">Squares (²)</SelectItem>
                      <SelectItem value="%">Percentages (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            <Button onClick={startGame} className="w-full" size="lg">
              <Zap className="w-5 h-5 mr-2" />
              Start Training Session
            </Button>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Overall Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{historicalStats.totalGames}</div>
                      <div className="text-sm text-muted-foreground">Games Played</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{historicalStats.totalProblems}</div>
                      <div className="text-sm text-muted-foreground">Problems Solved</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Best Accuracy</span>
                      <span className="font-medium">{historicalStats.bestAccuracy.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Accuracy</span>
                      <span className="font-medium">{historicalStats.averageAccuracy.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best Streak</span>
                      <span className="font-medium">{historicalStats.bestStreak}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="w-5 h-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {["first-correct", "streak-5", "streak-10", "speed-demon", "perfectionist", "math-master"].map(
                      (achievement) => (
                        <AchievementBadge
                          key={achievement}
                          type={achievement}
                          unlocked={achievements.includes(achievement)}
                        />
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievement Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {["first-correct", "streak-5", "streak-10", "speed-demon", "perfectionist", "math-master"].map(
                    (achievement) => (
                      <AchievementBadge
                        key={achievement}
                        type={achievement}
                        unlocked={achievements.includes(achievement)}
                      />
                    ),
                  )}
                </div>
                <div className="mt-6 text-center text-muted-foreground">
                  <p>Unlock achievements by reaching milestones in your math training!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Game Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Sound Effects</div>
                    <div className="text-sm text-muted-foreground">Play sounds for correct/incorrect answers</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {gameMode !== "endless" && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Timer className="w-5 h-5" />
                      {gameMode === "accuracy" ? "Problems Left" : "Time Left"}
                    </CardTitle>
                    <Badge variant={timeLeft <= 10 ? "destructive" : "secondary"}>
                      {gameMode === "accuracy" ? `${20 - stats.problemsSolved}/20` : `${timeLeft}s`}
                    </Badge>
                  </div>
                  <Progress
                    value={gameMode === "accuracy" ? (stats.problemsSolved / 20) * 100 : (timeLeft / maxTime) * 100}
                    className="h-2"
                  />
                </CardHeader>
              </Card>
            )}

            <Card className="min-h-[300px]">
              <CardContent className="pt-6">
                {currentProblem && (
                  <div className="text-center space-y-8">
                    <div className="text-5xl font-bold text-primary">{currentProblem.displayText} = ?</div>

                    <Input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your answer"
                      className="text-center text-2xl h-16 text-lg"
                      autoFocus
                    />

                    <Button onClick={checkAnswer} disabled={!userAnswer.trim()} size="lg" className="px-8">
                      Submit Answer
                    </Button>

                    {feedback.type && (
                      <div
                        className={`text-xl font-medium animate-pulse ${
                          feedback.type === "correct" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {feedback.message}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Button onClick={endGame} variant="outline" className="w-full bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              End Session
            </Button>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Current Session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{stats.correct}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{stats.incorrect}</div>
                    <div className="text-sm text-muted-foreground">Incorrect</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Accuracy</span>
                    <span className="font-medium">{accuracy.toFixed(1)}%</span>
                  </div>
                  <Progress value={accuracy} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Streak</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {stats.streak}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Best Streak</span>
                  <Badge variant="secondary">{stats.bestStreak}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Time</span>
                  <span className="font-medium">
                    {stats.averageTime > 0 ? `${(stats.averageTime / 1000).toFixed(1)}s` : "0s"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Problems Solved</span>
                  <span className="font-medium">{stats.problemsSolved}</span>
                </div>
              </CardContent>
            </Card>

            {achievements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {achievements.slice(-3).map((achievement) => (
                      <AchievementBadge key={achievement} type={achievement} unlocked={true} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground border-t pt-4">
        <p>© 2025 Boad Technologies. Enhancing minds through interactive learning.</p>
      </div>
    </div>
  )
}
