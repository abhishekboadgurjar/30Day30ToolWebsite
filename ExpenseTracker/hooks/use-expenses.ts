"use client"

import { useState, useEffect } from "react"

export interface Expense {
  id: string
  amount: number
  description: string
  category: string
  date: string
  notes?: string
  timestamp: string
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("boad-expenses")
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses))
      } catch (error) {
        console.error("Error loading expenses:", error)
      }
    }
  }, [])

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("boad-expenses", JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  const updateExpense = (id: string, expenseData: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...expenseData, timestamp: new Date().toISOString() } : expense,
      ),
    )
  }

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  const clearAllExpenses = () => {
    setExpenses([])
  }

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    clearAllExpenses,
  }
}
