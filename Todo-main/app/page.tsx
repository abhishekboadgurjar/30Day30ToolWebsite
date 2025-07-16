"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  CalendarIcon,
  Trash2,
  Edit,
  MoreVertical,
  Download,
  Moon,
  Sun,
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Zap,
} from "lucide-react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high"
  category: string
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  tags: string[]
}

const categories = ["Personal", "Work", "Shopping", "Health", "Learning", "Projects"]
const priorities = [
  { value: "low", label: "Low", color: "bg-green-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-red-500" },
]

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [darkMode, setDarkMode] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  // Form states
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    category: "Personal",
    dueDate: undefined as Date | undefined,
    tags: [] as string[],
  })

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("boad-todos")
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }))
      setTodos(parsedTodos)
    }

    const savedDarkMode = localStorage.getItem("boad-dark-mode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("boad-todos", JSON.stringify(todos))
  }, [todos])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("boad-dark-mode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const addTodo = () => {
    if (!newTodo.title.trim()) return

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      priority: newTodo.priority,
      category: newTodo.category,
      dueDate: newTodo.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: newTodo.tags,
    }

    setTodos((prev) => [todo, ...prev])
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      category: "Personal",
      dueDate: undefined,
      tags: [],
    })
    setIsAddDialogOpen(false)
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo)),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? { ...updatedTodo, updatedAt: new Date() } : todo)),
    )
    setEditingTodo(null)
  }

  const filteredAndSortedTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = filterCategory === "all" || todo.category === filterCategory
      const matchesPriority = filterPriority === "all" || todo.priority === filterPriority
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" && todo.completed) ||
        (filterStatus === "pending" && !todo.completed) ||
        (filterStatus === "overdue" && todo.dueDate && todo.dueDate < new Date() && !todo.completed)

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus
    })

    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        case "dueDate":
          aValue = a.dueDate || new Date("2099-12-31")
          bValue = b.dueDate || new Date("2099-12-31")
          break
        default:
          aValue = a.createdAt
          bValue = b.createdAt
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [todos, searchTerm, filterCategory, filterPriority, filterStatus, sortBy, sortOrder])

  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const pending = total - completed
    const overdue = todos.filter((t) => t.dueDate && t.dueDate < new Date() && !t.completed).length
    const highPriority = todos.filter((t) => t.priority === "high" && !t.completed).length

    return { total, completed, pending, overdue, highPriority }
  }, [todos])

  const exportTodos = () => {
    const dataStr = JSON.stringify(todos, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `boad-todos-${format(new Date(), "yyyy-MM-dd")}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const isOverdue = (todo: Todo) => {
    return todo.dueDate && todo.dueDate < new Date() && !todo.completed
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "dark bg-black" : "bg-white"}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 p-6 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white drop-shadow-sm">
              Todo by Boad Technologies
            </h1>
            <p className="text-muted-foreground mt-2 text-base font-medium">The Ultimate Task Management Solution</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              onClick={() => window.open("https://boadtechnologies.com", "_blank")}
              className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Visit Boad Technologies
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              onClick={exportTodos}
              className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8"
        >
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                  <p className="text-sm text-muted-foreground font-medium">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
                  <p className="text-sm text-muted-foreground font-medium">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl">
                  <Clock className="h-6 w-6 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground font-medium">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.overdue}</p>
                  <p className="text-sm text-muted-foreground font-medium">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl">
                  <Zap className="h-6 w-6 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.highPriority}</p>
                  <p className="text-sm text-muted-foreground font-medium">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8 p-6 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search todos, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white bg-white dark:bg-black transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            {/* Update all Select components with enhanced styling */}
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-36 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 bg-white dark:bg-black">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-36 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 bg-white dark:bg-black">
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 bg-white dark:bg-black">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 bg-white dark:bg-black">
                <SelectItem value="createdAt">Created Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="h-12 w-12 rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {sortOrder === "asc" ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="h-12 w-12 rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </Button>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 rounded-xl bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Task title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Description (optional)"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo((prev) => ({ ...prev, description: e.target.value }))}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={newTodo.priority}
                      onValueChange={(value: any) => setNewTodo((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={newTodo.category}
                      onValueChange={(value) => setNewTodo((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {newTodo.dueDate ? format(newTodo.dueDate, "PPP") : "Set due date (optional)"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newTodo.dueDate}
                        onSelect={(date) => setNewTodo((prev) => ({ ...prev, dueDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <div className="flex gap-2">
                    <Button onClick={addTodo} className="flex-1">
                      Add Task
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Todo List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}
        >
          <AnimatePresence>
            {filteredAndSortedTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl ${
                    todo.completed ? "opacity-75" : ""
                  } ${isOverdue(todo) ? "ring-2 ring-red-500 ring-opacity-50" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                        className="mt-1 h-5 w-5 rounded-lg border-2 data-[state=checked]:bg-black data-[state=checked]:dark:bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className={`font-bold text-lg ${todo.completed ? "line-through text-muted-foreground" : "text-gray-900 dark:text-white"}`}
                          >
                            {todo.title}
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2">
                              <DropdownMenuItem onClick={() => setEditingTodo(todo)} className="rounded-lg">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteTodo(todo.id)} className="text-red-600 rounded-lg">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {todo.description && (
                          <p
                            className={`text-sm mt-2 ${todo.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}
                          >
                            {todo.description}
                          </p>
                        )}

                        <div className="flex items-center gap-3 mt-4 flex-wrap">
                          <Badge
                            variant="secondary"
                            className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white border-0"
                          >
                            {todo.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(todo.priority)} shadow-sm`} />
                            <span className="text-xs text-muted-foreground capitalize font-medium">
                              {todo.priority}
                            </span>
                          </div>
                          {todo.dueDate && (
                            <Badge
                              variant={isOverdue(todo) ? "destructive" : "outline"}
                              className="text-xs px-3 py-1 rounded-full border-2"
                            >
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {format(todo.dueDate, "MMM dd")}
                            </Badge>
                          )}
                          {isOverdue(todo) && (
                            <Badge
                              variant="destructive"
                              className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 animate-pulse"
                            >
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAndSortedTodos.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== "all" || filterPriority !== "all" || filterStatus !== "all"
                ? "Try adjusting your filters or search terms"
                : "Create your first task to get started"}
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Task
            </Button>
          </motion.div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            {editingTodo && (
              <div className="space-y-4">
                <Input
                  placeholder="Task title"
                  value={editingTodo.title}
                  onChange={(e) => setEditingTodo((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={editingTodo.description}
                  onChange={(e) => setEditingTodo((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={editingTodo.priority}
                    onValueChange={(value: any) =>
                      setEditingTodo((prev) => (prev ? { ...prev, priority: value } : null))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={editingTodo.category}
                    onValueChange={(value) => setEditingTodo((prev) => (prev ? { ...prev, category: value } : null))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {editingTodo.dueDate ? format(editingTodo.dueDate, "PPP") : "Set due date (optional)"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={editingTodo.dueDate}
                      onSelect={(date) => setEditingTodo((prev) => (prev ? { ...prev, dueDate: date } : null))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex gap-2">
                  <Button onClick={() => editingTodo && updateTodo(editingTodo)} className="flex-1">
                    Update Task
                  </Button>
                  <Button variant="outline" onClick={() => setEditingTodo(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-sm text-muted-foreground p-8 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
        >
          <p className="font-semibold text-lg">© 2025 Boad Technologies Company. All rights reserved.</p>
          <p className="mt-2 text-base">Todo by Boad Technologies - The Ultimate Task Management Solution</p>
          <button
            onClick={() => window.open("https://boadtechnologies.com", "_blank")}
            className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors font-semibold text-base hover:scale-105 transform transition-all duration-200"
          >
            Learn more about Boad Technologies
          </button>
        </motion.footer>
      </div>
    </div>
  )
}
