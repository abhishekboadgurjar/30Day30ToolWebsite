"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EXPENSE_CATEGORIES } from "@/lib/constants"

interface FilterBarProps {
  filters: {
    category: string
    dateRange: string
    searchTerm: string
  }
  onFiltersChange: (filters: any) => void
  expenses: any[]
}

export function FilterBar({ filters, onFiltersChange, expenses }: FilterBarProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  // Get unique categories from expenses
  const usedCategories = [...new Set(expenses.map((expense) => expense.category))]
    .map((categoryValue) => EXPENSE_CATEGORIES.find((cat) => cat.value === categoryValue))
    .filter(Boolean)

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search expenses..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter("searchTerm", e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {usedCategories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              <div className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
