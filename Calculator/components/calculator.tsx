"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StandardCalculator from "@/components/standard-calculator"
import ScientificCalculator from "@/components/scientific-calculator"
import UnitConverter from "@/components/unit-converter"
import FinancialCalculator from "@/components/financial-calculator"
import DateCalculator from "@/components/date-calculator"
import { MoonIcon, SunIcon, CalculatorIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("standard")
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-xl border-0 bg-white dark:bg-gray-800">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <Link
                href="https://boadtechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg">
                  <CalculatorIcon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Calculator</CardTitle>
                  <CardDescription className="text-blue-100">by Boad Technologies</CardDescription>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="text-white hover:bg-white/20"
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-4 bg-gray-100 dark:bg-gray-700">
                <TabsTrigger value="standard" className="text-xs">
                  Standard
                </TabsTrigger>
                <TabsTrigger value="scientific" className="text-xs">
                  Scientific
                </TabsTrigger>
                <TabsTrigger value="unit" className="text-xs">
                  Unit
                </TabsTrigger>
                <TabsTrigger value="financial" className="text-xs">
                  Financial
                </TabsTrigger>
                <TabsTrigger value="date" className="text-xs">
                  Date
                </TabsTrigger>
              </TabsList>
              <TabsContent value="standard">
                <StandardCalculator />
              </TabsContent>
              <TabsContent value="scientific">
                <ScientificCalculator />
              </TabsContent>
              <TabsContent value="unit">
                <UnitConverter />
              </TabsContent>
              <TabsContent value="financial">
                <FinancialCalculator />
              </TabsContent>
              <TabsContent value="date">
                <DateCalculator />
              </TabsContent>
            </Tabs>

            {/* Branding Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Powered by</span>
                <Link
                  href="https://boadtechnologies.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:opacity-80 transition-opacity"
                >
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">B</span>
                  </div>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Boad Technologies</span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
