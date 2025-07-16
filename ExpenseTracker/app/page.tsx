"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { StatsCards } from "@/components/stats-cards"
import { FilterBar } from "@/components/filter-bar"
import { useExpenses } from "@/hooks/use-expenses"
import { formatCurrency } from "@/lib/utils"

export default function HomePage() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses()
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [filters, setFilters] = useState({
    category: "",
    dateRange: "all",
    searchTerm: "",
  })

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = !filters.category || expense.category === filters.category
    const matchesSearch =
      !filters.searchTerm || expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase())

    let matchesDate = true
    if (filters.dateRange !== "all") {
      const expenseDate = new Date(expense.date)
      const today = new Date()

      switch (filters.dateRange) {
        case "today":
          matchesDate = expenseDate.toDateString() === today.toDateString()
          break
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesDate = expenseDate >= weekAgo
          break
        case "month":
          matchesDate = expenseDate.getMonth() === today.getMonth() && expenseDate.getFullYear() === today.getFullYear()
          break
      }
    }

    return matchesCategory && matchesSearch && matchesDate
  })

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  const handleAddExpense = (expenseData) => {
    addExpense(expenseData)
    setShowForm(false)
  }

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
    setShowForm(true)
  }

  const handleUpdateExpense = (expenseData) => {
    updateExpense(editingExpense.id, expenseData)
    setEditingExpense(null)
    setShowForm(false)
  }

  const handleDeleteExpense = (id) => {
    deleteExpense(id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        {/* Stats Cards */}
        <StatsCards expenses={expenses} filteredExpenses={filteredExpenses} />

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button onClick={() => setShowForm(true)} className="flex-1 sm:flex-none" size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>

          <div className="flex-1">
            <FilterBar filters={filters} onFiltersChange={setFilters} expenses={expenses} />
          </div>
        </div>

        {/* Current Filter Summary */}
        {(filters.category || filters.dateRange !== "all" || filters.searchTerm) && (
          <Card className="mb-6 border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Filtered Results</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
                  <p className="text-sm text-gray-500">
                    {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({ category: "", dateRange: "all", searchTerm: "" })}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expense Form */}
          {showForm && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>{editingExpense ? "Edit Expense" : "Add New Expense"}</CardTitle>
                  <CardDescription>{editingExpense ? "Update expense details" : "Track your spending"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseForm
                    expense={editingExpense}
                    onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
                    onCancel={() => {
                      setShowForm(false)
                      setEditingExpense(null)
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Expense List */}
          <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
            <ExpenseList expenses={filteredExpenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
          </div>
        </div>
      </div>
    </div>
  )
}
