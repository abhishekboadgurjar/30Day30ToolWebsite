"use client"

interface BusinessHoursIndicatorProps {
  timezone: string
  currentTime: string
}

export function BusinessHoursIndicator({ timezone, currentTime }: BusinessHoursIndicatorProps) {
  const getBusinessHoursStatus = () => {
    if (!currentTime) return { status: "unknown", color: "gray" }

    const timeStr = currentTime.split(", ")[1] || currentTime
    const [time, period] = timeStr.split(" ")
    const [hours, minutes] = time.split(":")
    let hour24 = Number.parseInt(hours)

    if (period === "PM" && hour24 !== 12) hour24 += 12
    if (period === "AM" && hour24 === 12) hour24 = 0

    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6

    if (isWeekend) {
      return { status: "Weekend", color: "blue" }
    }

    if (hour24 >= 9 && hour24 < 18) {
      return { status: "Business Hours", color: "green" }
    } else if ((hour24 >= 7 && hour24 < 9) || (hour24 >= 18 && hour24 < 20)) {
      return { status: "Extended Hours", color: "yellow" }
    } else {
      return { status: "Off Hours", color: "red" }
    }
  }

  const { status, color } = getBusinessHoursStatus()

  const colorClasses = {
    green: "bg-green-100 text-green-800 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    red: "bg-red-100 text-red-800 border-red-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    gray: "bg-gray-100 text-gray-800 border-gray-200",
  }

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colorClasses[color]}`}
    >
      <div
        className={`w-2 h-2 rounded-full mr-1 ${color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : color === "red" ? "bg-red-500" : color === "blue" ? "bg-blue-500" : "bg-gray-500"}`}
      />
      {status}
    </div>
  )
}
