"use client"

import { TrendingDown, TrendingUp, Calendar, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface StatsCardsProps {
  expenses: any[]
  filteredExpenses: any[]
}

export function StatsCards({ expenses, filteredExpenses }: StatsCardsProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const filteredTotal = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Calculate this month's expenses
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
  })
  const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Calculate average daily spending this month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const currentDay = new Date().getDate()
  const avgDaily = thisMonthTotal / currentDay

  // Get top category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {})

  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">
            {expenses.length} transaction{expenses.length !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(thisMonthTotal)}</div>
          <p className="text-xs text-muted-foreground">
            {thisMonthExpenses.length} expense{thisMonthExpenses.length !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(avgDaily)}</div>
          <p className="text-xs text-muted-foreground">This month's average</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {topCategory ? formatCurrency(topCategory[1]) : "$0.00"}
          </div>
          <p className="text-xs text-muted-foreground">{topCategory ? topCategory[0] : "No expenses yet"}</p>
        </CardContent>
      </Card>
    </div>
  )
}
