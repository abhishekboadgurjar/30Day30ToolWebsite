"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Droplets, Plus, Minus, Target, Award, RefreshCw } from "lucide-react"

export default function WaterTracker() {
  const [dailyGoal, setDailyGoal] = useState(2000) // ml
  const [currentIntake, setCurrentIntake] = useState(0) // ml
  const [isGoalSet, setIsGoalSet] = useState(true)
  const [tempGoal, setTempGoal] = useState("2000")
  const [animateWave, setAnimateWave] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGoal = localStorage.getItem("waterGoal")
    const savedIntake = localStorage.getItem("waterIntake")
    const savedDate = localStorage.getItem("waterDate")
    const today = new Date().toDateString()

    if (savedDate === today && savedIntake) {
      setCurrentIntake(Number.parseInt(savedIntake))
    } else {
      setCurrentIntake(0)
      localStorage.setItem("waterDate", today)
    }

    if (savedGoal) {
      setDailyGoal(Number.parseInt(savedGoal))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("waterGoal", dailyGoal.toString())
    localStorage.setItem("waterIntake", currentIntake.toString())
  }, [dailyGoal, currentIntake])

  const addWater = (amount: number) => {
    setCurrentIntake((prev) => Math.max(0, prev + amount))
    setAnimateWave(true)
    setTimeout(() => setAnimateWave(false), 600)
  }

  const resetDay = () => {
    setCurrentIntake(0)
    localStorage.setItem("waterDate", new Date().toDateString())
  }

  const setGoal = () => {
    const goal = Number.parseInt(tempGoal)
    if (goal > 0) {
      setDailyGoal(goal)
      setIsGoalSet(true)
    }
  }

  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100)
  const isGoalReached = currentIntake >= dailyGoal

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Droplets className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Hydrate
            </h1>
          </div>
          <p className="text-gray-600">Stay healthy, stay hydrated</p>
          <div className="mt-2 text-xs text-gray-500">
            by <span className="font-medium">boad technologies</span>
          </div>
        </div>

        {/* Goal Setting Card */}
        {!isGoalSet && (
          <Card className="border-blue-200 shadow-lg animate-in slide-in-from-top duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Target className="h-5 w-5" />
                Set Your Daily Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="goal">Daily water goal (ml)</Label>
                <Input
                  id="goal"
                  type="number"
                  value={tempGoal}
                  onChange={(e) => setTempGoal(e.target.value)}
                  placeholder="2000"
                  className="mt-1"
                />
              </div>
              <Button onClick={setGoal} className="w-full bg-blue-500 hover:bg-blue-600">
                Set Goal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Tracker Card */}
        {isGoalSet && (
          <Card className="border-blue-200 shadow-xl animate-in slide-in-from-bottom duration-500">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-blue-700">
                <Droplets className="h-6 w-6" />
                Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Water Bottle Visualization */}
              <div className="relative mx-auto w-32 h-48 bg-gradient-to-b from-blue-100 to-blue-50 rounded-full border-4 border-blue-200 overflow-hidden">
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-1000 ease-out ${animateWave ? "animate-pulse" : ""}`}
                  style={{ height: `${progressPercentage}%` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 opacity-50 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-800">{Math.round(progressPercentage)}%</div>
                    <div className="text-xs text-blue-600">{currentIntake}ml</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>
                    {currentIntake}ml / {dailyGoal}ml
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-blue-100" />
              </div>

              {/* Goal Achievement */}
              {isGoalReached && (
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200 animate-in zoom-in duration-500">
                  <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">Congratulations!</p>
                  <p className="text-green-600 text-sm">You've reached your daily goal!</p>
                </div>
              )}

              {/* Quick Add Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => addWater(250)}
                  variant="outline"
                  className="h-16 flex-col gap-1 border-blue-200 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                >
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-xs">250ml</span>
                </Button>
                <Button
                  onClick={() => addWater(500)}
                  variant="outline"
                  className="h-16 flex-col gap-1 border-blue-200 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                >
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <span className="text-xs">500ml</span>
                </Button>
                <Button
                  onClick={() => addWater(750)}
                  variant="outline"
                  className="h-16 flex-col gap-1 border-blue-200 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                >
                  <Droplets className="h-6 w-6 text-blue-500" />
                  <span className="text-xs">750ml</span>
                </Button>
              </div>

              {/* Custom Amount */}
              <div className="flex gap-2">
                <Button
                  onClick={() => addWater(-100)}
                  variant="outline"
                  size="icon"
                  className="border-red-200 hover:bg-red-50 text-red-500"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => addWater(100)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 transition-all duration-200 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add 100ml
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsGoalSet(false)} variant="outline" className="flex-1 border-gray-200">
                  <Target className="h-4 w-4 mr-2" />
                  Change Goal
                </Button>
                <Button onClick={resetDay} variant="outline" className="flex-1 border-gray-200">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Day
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4">
          <p>💧 Remember: Small sips throughout the day keep dehydration away!</p>
          <div className="mt-2">
            <a
              href="https://www.boadtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              www.boadtechnologies.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
