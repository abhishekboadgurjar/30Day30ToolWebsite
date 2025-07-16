"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Plus } from "lucide-react"

interface TimezoneSearchProps {
  timezones: any[]
  selectedTimezones: string[]
  onAddTimezone: (timezone: string) => void
}

export function TimezoneSearch({ timezones, selectedTimezones, onAddTimezone }: TimezoneSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const filteredTimezones = timezones.filter(
    (tz) =>
      !selectedTimezones.includes(tz.value) &&
      (tz.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tz.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tz.value.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search for cities or timezones..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowResults(e.target.value.length > 0)
          }}
          onFocus={() => setShowResults(searchQuery.length > 0)}
          className="pl-10"
        />
      </div>

      {showResults && filteredTimezones.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto">
          <CardContent className="p-2">
            {filteredTimezones.slice(0, 8).map((timezone) => (
              <div
                key={timezone.value}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => {
                  onAddTimezone(timezone.value)
                  setSearchQuery("")
                  setShowResults(false)
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{timezone.city}</div>
                    <div className="text-sm text-gray-500">{timezone.value}</div>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
