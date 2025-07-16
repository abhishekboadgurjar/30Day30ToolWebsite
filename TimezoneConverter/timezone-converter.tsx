"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, X, Globe, Map, Calendar, Search, Moon, Sun, Share, Save } from "lucide-react"
import { WorldMap } from "./components/world-map"
import { MeetingScheduler } from "./components/meeting-scheduler"
import { TimezoneSearch } from "./components/timezone-search"
import { BusinessHoursIndicator } from "./components/business-hours-indicator"

const TIMEZONES = [
  { value: "America/New_York", label: "New York (EST/EDT)", city: "New York" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)", city: "Los Angeles" },
  { value: "America/Chicago", label: "Chicago (CST/CDT)", city: "Chicago" },
  { value: "America/Denver", label: "Denver (MST/MDT)", city: "Denver" },
  { value: "America/Phoenix", label: "Phoenix (MST)", city: "Phoenix" },
  { value: "America/Toronto", label: "Toronto (EST/EDT)", city: "Toronto" },
  { value: "America/Vancouver", label: "Vancouver (PST/PDT)", city: "Vancouver" },
  { value: "America/Mexico_City", label: "Mexico City (CST/CDT)", city: "Mexico City" },
  { value: "Europe/London", label: "London (GMT/BST)", city: "London" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)", city: "Paris" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)", city: "Berlin" },
  { value: "Europe/Rome", label: "Rome (CET/CEST)", city: "Rome" },
  { value: "Europe/Madrid", label: "Madrid (CET/CEST)", city: "Madrid" },
  { value: "Europe/Amsterdam", label: "Amsterdam (CET/CEST)", city: "Amsterdam" },
  { value: "Europe/Stockholm", label: "Stockholm (CET/CEST)", city: "Stockholm" },
  { value: "Europe/Moscow", label: "Moscow (MSK)", city: "Moscow" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", city: "Tokyo" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)", city: "Shanghai" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", city: "Hong Kong" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", city: "Singapore" },
  { value: "Asia/Dubai", label: "Dubai (GST)", city: "Dubai" },
  { value: "Asia/Kolkata", label: "Mumbai (IST)", city: "Mumbai" },
  { value: "Asia/Bangkok", label: "Bangkok (ICT)", city: "Bangkok" },
  { value: "Asia/Seoul", label: "Seoul (KST)", city: "Seoul" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)", city: "Sydney" },
  { value: "Australia/Melbourne", label: "Melbourne (AEST/AEDT)", city: "Melbourne" },
  { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)", city: "Auckland" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)", city: "São Paulo" },
  { value: "America/Buenos_Aires", label: "Buenos Aires (ART)", city: "Buenos Aires" },
  { value: "Africa/Cairo", label: "Cairo (EET)", city: "Cairo" },
  { value: "Africa/Lagos", label: "Lagos (WAT)", city: "Lagos" },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)", city: "Johannesburg" },
  { value: "UTC", label: "UTC (Coordinated Universal Time)", city: "UTC" },
]

const SAVED_SETS = [
  { name: "Global Business", timezones: ["America/New_York", "Europe/London", "Asia/Tokyo"] },
  { name: "US Offices", timezones: ["America/New_York", "America/Chicago", "America/Los_Angeles"] },
  { name: "European Markets", timezones: ["Europe/London", "Europe/Paris", "Europe/Berlin"] },
  { name: "Asia Pacific", timezones: ["Asia/Tokyo", "Asia/Shanghai", "Australia/Sydney"] },
]

export default function Component() {
  const [selectedTimezones, setSelectedTimezones] = useState(["America/New_York", "Europe/London", "Asia/Tokyo"])
  const [currentTimes, setCurrentTimes] = useState({})
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const updateTimes = () => {
      const times = {}
      selectedTimezones.forEach((tz) => {
        times[tz] = new Date().toLocaleString("en-US", {
          timeZone: tz,
          hour12: true,
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      })
      setCurrentTimes(times)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [selectedTimezones])

  const addTimezone = (timezone) => {
    if (!selectedTimezones.includes(timezone)) {
      setSelectedTimezones([...selectedTimezones, timezone])
    }
  }

  const removeTimezone = (timezone) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz !== timezone))
  }

  const getTimezoneInfo = (timezone) => {
    return TIMEZONES.find((tz) => tz.value === timezone)
  }

  const calculateTimeDifference = (tz1, tz2) => {
    const date1 = new Date().toLocaleString("en-US", { timeZone: tz1 })
    const date2 = new Date().toLocaleString("en-US", { timeZone: tz2 })
    const time1 = new Date(date1).getTime()
    const time2 = new Date(date2).getTime()
    const diffHours = Math.round((time2 - time1) / (1000 * 60 * 60))

    if (diffHours === 0) return "Same time"
    if (diffHours > 0) return `+${diffHours}h ahead`
    return `${Math.abs(diffHours)}h behind`
  }

  const loadSavedSet = (set) => {
    setSelectedTimezones(set.timezones)
  }

  const shareTimezones = () => {
    const url = `${window.location.origin}?timezones=${selectedTimezones.join(",")}`
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"} p-4`}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Enhanced Timezone Converter
              </h1>
            </div>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Advanced timezone management with meeting scheduler and world map
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={shareTimezones}>
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Load Sets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Quick Load Sets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {SAVED_SETS.map((set) => (
                <Button key={set.name} variant="outline" size="sm" onClick={() => loadSavedSet(set)}>
                  {set.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Add Timezone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TimezoneSearch timezones={TIMEZONES} selectedTimezones={selectedTimezones} onAddTimezone={addTimezone} />
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <Clock className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="h-4 w-4 mr-2" />
              World Map
            </TabsTrigger>
            <TabsTrigger value="scheduler">
              <Calendar className="h-4 w-4 mr-2" />
              Meeting Scheduler
            </TabsTrigger>
            <TabsTrigger value="comparison">
              <Globe className="h-4 w-4 mr-2" />
              Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Timezone Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedTimezones.map((timezone, index) => {
                const timezoneInfo = getTimezoneInfo(timezone)
                const baseTimezone = selectedTimezones[0]
                const timeDiff = timezone !== baseTimezone ? calculateTimeDifference(baseTimezone, timezone) : null

                return (
                  <Card key={timezone} className="relative">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{timezoneInfo?.city}</CardTitle>
                        {selectedTimezones.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTimezone(timezone)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {index === 0 && selectedTimezones.length > 1 && <Badge variant="secondary">Base Time</Badge>}
                        {timeDiff && <Badge variant="outline">{timeDiff}</Badge>}
                        <BusinessHoursIndicator timezone={timezone} currentTime={currentTimes[timezone]} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{timezone.replace("_", " ")}</span>
                        </div>
                        <div className="text-2xl font-mono font-bold">
                          {currentTimes[timezone]?.split(", ")[1] || "Loading..."}
                        </div>
                        <div className="text-sm text-gray-600">{currentTimes[timezone]?.split(", ")[0] || ""}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>World Map View</CardTitle>
              </CardHeader>
              <CardContent>
                <WorldMap selectedTimezones={selectedTimezones} onTimezoneClick={addTimezone} />
                <p className="text-sm text-gray-500 mt-4">
                  Click on map markers to add/remove timezones. Red markers are currently selected.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduler">
            <MeetingScheduler selectedTimezones={selectedTimezones} timezoneInfo={TIMEZONES} />
          </TabsContent>

          <TabsContent value="comparison">
            {/* Time Comparison Table */}
            {selectedTimezones.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Time Differences Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Location</th>
                          {selectedTimezones.map((tz) => (
                            <th key={tz} className="text-center p-2 min-w-[100px]">
                              {getTimezoneInfo(tz)?.city}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTimezones.map((tz1) => (
                          <tr key={tz1} className="border-b">
                            <td className="p-2 font-medium">{getTimezoneInfo(tz1)?.city}</td>
                            {selectedTimezones.map((tz2) => (
                              <td key={tz2} className="text-center p-2">
                                {tz1 === tz2 ? "—" : calculateTimeDifference(tz1, tz2)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className={`text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <p>Times update automatically every second • Enhanced with advanced features</p>
          <p className="mt-1">by boad technologies</p>
        </div>
      </div>
    </div>
  )
}
