"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format, addDays, differenceInDays, differenceInMonths, differenceInYears } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function DateCalculator() {
  const [activeTab, setActiveTab] = useState("difference")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="difference" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="difference">Date Difference</TabsTrigger>
          <TabsTrigger value="add">Add/Subtract</TabsTrigger>
        </TabsList>
        <TabsContent value="difference">
          <DateDifferenceCalculator />
        </TabsContent>
        <TabsContent value="add">
          <DateAddSubtractCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [days, setDays] = useState(0)
  const [months, setMonths] = useState(0)
  const [years, setYears] = useState(0)

  useEffect(() => {
    if (startDate && endDate) {
      calculateDifference()
    }
  }, [startDate, endDate])

  const calculateDifference = () => {
    if (!startDate || !endDate) return

    const daysDiff = differenceInDays(endDate, startDate)
    const monthsDiff = differenceInMonths(endDate, startDate)
    const yearsDiff = differenceInYears(endDate, startDate)

    setDays(daysDiff)
    setMonths(monthsDiff)
    setYears(yearsDiff)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="endDate">End Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div>
          <p className="text-sm text-gray-500">Days</p>
          <p className="text-xl font-bold">{days}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Months</p>
          <p className="text-xl font-bold">{months}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Years</p>
          <p className="text-xl font-bold">{years}</p>
        </div>
      </div>
    </div>
  )
}

function DateAddSubtractCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [days, setDays] = useState("7")
  const [resultDate, setResultDate] = useState<Date | null>(null)
  const [operation, setOperation] = useState("add")

  useEffect(() => {
    calculateNewDate()
  }, [startDate, days, operation])

  const calculateNewDate = () => {
    if (!startDate || isNaN(Number.parseInt(days))) return

    const daysValue = Number.parseInt(days)
    let result: Date

    if (operation === "add") {
      result = addDays(startDate, daysValue)
    } else {
      result = addDays(startDate, -daysValue)
    }

    setResultDate(result)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="days">Days</Label>
          <Input id="days" type="number" value={days} onChange={(e) => setDays(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="operation">Operation</Label>
          <Tabs defaultValue="add" value={operation} onValueChange={setOperation} className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="add">Add</TabsTrigger>
              <TabsTrigger value="subtract">Subtract</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-sm text-gray-500">Result Date</p>
        <p className="text-xl font-bold">{resultDate ? format(resultDate, "PPP") : "N/A"}</p>
      </div>
    </div>
  )
}
