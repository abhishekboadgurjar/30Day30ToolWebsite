"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Timer, Trophy, Target, Zap, RotateCcw } from "lucide-react"

type Operation = "+" | "-" | "×" | "÷"
type Difficulty = "easy" | "medium" | "hard"

interface Problem {
  num1: number
  num2: number
  operation: Operation
  answer: number
}

interface Stats {
  correct: number
  incorrect: number
  streak: number
  bestStreak: number
  totalTime: number
  averageTime: number
}

export default function Component() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [operation, setOperation] = useState<Operation | "mixed">("mixed")
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [isGameActive, setIsGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [problemStartTime, setProblemStartTime] = useState(0)
  const [stats, setStats] = useState<Stats>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0,
    totalTime: 0,
    averageTime: 0,
  })
  const [achievements, setAchievements] = useState<string[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
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
      default:
        return Math.floor(Math.random() * 10) + 1
    }
  }, [])

  const generateProblem = useCallback(() => {
    const operations: Operation[] = operation === "mixed" ? ["+", "-", "×", "÷"] : [operation as Operation]
    const selectedOp = operations[Math.floor(Math.random() * operations.length)]

    let num1 = generateNumber(difficulty)
    let num2 = generateNumber(difficulty, true)
    let answer: number

    // Ensure positive results for subtraction and clean division
    if (selectedOp === "-") {
      if (num1 < num2) [num1, num2] = [num2, num1]
      answer = num1 - num2
    } else if (selectedOp === "÷") {
      // Generate division problems with whole number answers
      answer = num2
      num1 = num2 * (Math.floor(Math.random() * 12) + 1)
      num2 = answer
      answer = num1 / num2
    } else if (selectedOp === "×") {
      answer = num1 * num2
    } else {
      answer = num1 + num2
    }

    return { num1, num2, operation: selectedOp, answer }
  }, [difficulty, operation, generateNumber])

  const startGame = () => {
    setIsGameActive(true)
    setTimeLeft(60)
    setStats({
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0,
      totalTime: 0,
      averageTime: 0,
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
  }

  const checkAnswer = () => {
    if (!currentProblem || !userAnswer.trim()) return

    const userNum = Number.parseFloat(userAnswer)
    const isCorrect = Math.abs(userNum - currentProblem.answer) < 0.01
    const problemTime = Date.now() - problemStartTime

    setStats((prev) => {
      const newCorrect = prev.correct + (isCorrect ? 1 : 0)
      const newIncorrect = prev.incorrect + (isCorrect ? 0 : 1)
      const newStreak = isCorrect ? prev.streak + 1 : 0
      const newBestStreak = Math.max(prev.bestStreak, newStreak)
      const newTotalTime = prev.totalTime + problemTime
      const totalProblems = newCorrect + newIncorrect
      const newAverageTime = totalProblems > 0 ? newTotalTime / totalProblems : 0

      return {
        correct: newCorrect,
        incorrect: newIncorrect,
        streak: newStreak,
        bestStreak: newBestStreak,
        totalTime: newTotalTime,
        averageTime: newAverageTime,
      }
    })

    setFeedback({
      type: isCorrect ? "correct" : "incorrect",
      message: isCorrect ? "Correct!" : `Wrong! The answer was ${currentProblem.answer}`,
    })

    // Generate next problem after a short delay
    setTimeout(() => {
      if (isGameActive && timeLeft > 0) {
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
    if (isGameActive && timeLeft > 0) {
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
  }, [isGameActive, timeLeft])

  const accuracy = stats.correct + stats.incorrect > 0 ? (stats.correct / (stats.correct + stats.incorrect)) * 100 : 0

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Mental Math Trainer</h1>
        <p className="text-muted-foreground">Practice fast arithmetic and improve your mental math skills</p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>by</span>
          <span className="font-semibold text-primary">Boad Technologies</span>
        </div>
      </div>

      {!isGameActive ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Game Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficulty} onValueChange={(value: Difficulty) => setDifficulty(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy (1-10)</SelectItem>
                  <SelectItem value="medium">Medium (1-50)</SelectItem>
                  <SelectItem value="hard">Hard (1-100)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Operation</label>
              <Select value={operation} onValueChange={(value) => setOperation(value as Operation | "mixed")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed">Mixed</SelectItem>
                  <SelectItem value="+">Addition (+)</SelectItem>
                  <SelectItem value="-">Subtraction (-)</SelectItem>
                  <SelectItem value="×">Multiplication (×)</SelectItem>
                  <SelectItem value="÷">Division (÷)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={startGame} className="w-full" size="lg">
              <Zap className="w-4 h-4 mr-2" />
              Start Training
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Time Left
                  </CardTitle>
                  <Badge variant={timeLeft <= 10 ? "destructive" : "secondary"}>{timeLeft}s</Badge>
                </div>
                <Progress value={(timeLeft / 60) * 100} className="h-2" />
              </CardHeader>
            </Card>

            <Card>
              <CardContent className="pt-6">
                {currentProblem && (
                  <div className="text-center space-y-6">
                    <div className="text-4xl font-bold">
                      {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
                    </div>

                    <Input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your answer"
                      className="text-center text-xl"
                      autoFocus
                    />

                    <Button onClick={checkAnswer} disabled={!userAnswer.trim()} size="lg">
                      Submit Answer
                    </Button>

                    {feedback.type && (
                      <div
                        className={`text-lg font-medium ${
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
              End Game
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
                    <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.incorrect}</div>
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
                  <Badge variant="secondary">{stats.streak}</Badge>
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
                  <span className="font-medium">{stats.correct + stats.incorrect}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
