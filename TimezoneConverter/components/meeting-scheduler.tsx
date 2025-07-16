"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"

interface MeetingSchedulerProps {
  selectedTimezones: string[]
  timezoneInfo: any[]
}

export function MeetingScheduler({ selectedTimezones, timezoneInfo }: MeetingSchedulerProps) {
  const [meetingTime, setMeetingTime] = useState("")
  const [meetingDate, setMeetingDate] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const findOptimalTimes = () => {
    const businessHours = [9, 10, 11, 14, 15, 16, 17] // 9AM-6PM
    const optimalTimes = []

    for (let hour = 0; hour < 24; hour++) {
      const timeSlot = {
        hour,
        zones: selectedTimezones.map((tz) => {
          const date = new Date()
          date.setHours(hour, 0, 0, 0)
          const localTime = new Date(date.toLocaleString("en-US", { timeZone: tz }))
          const localHour = localTime.getHours()

          return {
            timezone: tz,
            localHour,
            isBusinessHours: businessHours.includes(localHour),
            time: localTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          }
        }),
      }

      const businessHoursCount = timeSlot.zones.filter((z) => z.isBusinessHours).length
      if (businessHoursCount >= Math.ceil(selectedTimezones.length * 0.6)) {
        optimalTimes.push({ ...timeSlot, score: businessHoursCount })
      }
    }

    setSuggestions(optimalTimes.sort((a, b) => b.score - a.score).slice(0, 5))
  }

  const convertTime = () => {
    if (!meetingTime || !meetingDate) return

    const [hours, minutes] = meetingTime.split(":")
    const meetingDateTime = new Date(`${meetingDate}T${hours}:${minutes}:00`)

    const convertedTimes = selectedTimezones.map((tz) => {
      const convertedTime = new Date(meetingDateTime.toLocaleString("en-US", { timeZone: tz }))
      return {
        timezone: tz,
        time: convertedTime.toLocaleString("en-US", {
          timeZone: tz,
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }
    })

    setSuggestions(convertedTimes)
  }

  const getTimezoneCity = (tz) => {
    return timezoneInfo.find((info) => info.value === tz)?.city || tz
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Meeting Scheduler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Conversion */}
        <div className="space-y-4">
          <h3 className="font-semibold">Convert Specific Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button onClick={convertTime} className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                Convert
              </Button>
            </div>
          </div>
        </div>

        {/* Optimal Time Finder */}
        <div className="space-y-4">
          <h3 className="font-semibold">Find Optimal Meeting Times</h3>
          <Button onClick={findOptimalTimes} variant="outline" className="w-full bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Find Best Times (Business Hours)
          </Button>
        </div>

        {/* Results */}
        {suggestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">{meetingTime ? "Converted Times" : "Suggested Meeting Times"}</h3>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="p-4">
                  {!meetingTime && (
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">Option {index + 1}</Badge>
                      <Badge variant="outline">
                        {suggestion.score}/{selectedTimezones.length} in business hours
                      </Badge>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(suggestion.zones || suggestion).map((zone, zoneIndex) => (
                      <div
                        key={zoneIndex}
                        className={`p-3 rounded-lg border ${
                          zone.isBusinessHours !== undefined
                            ? zone.isBusinessHours
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="font-medium">{getTimezoneCity(zone.timezone)}</div>
                        <div className="text-sm text-gray-600">{zone.time || zone.time}</div>
                        {zone.isBusinessHours !== undefined && (
                          <Badge size="sm" variant={zone.isBusinessHours ? "default" : "secondary"} className="mt-1">
                            {zone.isBusinessHours ? "Business Hours" : "Off Hours"}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
