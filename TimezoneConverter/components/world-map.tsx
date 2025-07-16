"use client"

interface WorldMapProps {
  selectedTimezones: string[]
  onTimezoneClick?: (timezone: string) => void
}

const TIMEZONE_COORDINATES = {
  "America/New_York": { x: 25, y: 35, name: "New York" },
  "America/Los_Angeles": { x: 15, y: 35, name: "Los Angeles" },
  "America/Chicago": { x: 20, y: 35, name: "Chicago" },
  "Europe/London": { x: 50, y: 25, name: "London" },
  "Europe/Paris": { x: 52, y: 28, name: "Paris" },
  "Europe/Berlin": { x: 54, y: 25, name: "Berlin" },
  "Asia/Tokyo": { x: 85, y: 35, name: "Tokyo" },
  "Asia/Shanghai": { x: 80, y: 35, name: "Shanghai" },
  "Asia/Dubai": { x: 65, y: 40, name: "Dubai" },
  "Asia/Kolkata": { x: 72, y: 42, name: "Mumbai" },
  "Australia/Sydney": { x: 90, y: 70, name: "Sydney" },
  "Pacific/Auckland": { x: 95, y: 75, name: "Auckland" },
  "America/Sao_Paulo": { x: 35, y: 65, name: "São Paulo" },
  "Africa/Cairo": { x: 58, y: 45, name: "Cairo" },
  UTC: { x: 50, y: 15, name: "UTC" },
}

export function WorldMap({ selectedTimezones, onTimezoneClick }: WorldMapProps) {
  return (
    <div className="relative w-full h-64 bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg overflow-hidden">
      {/* Simplified world map background */}
      <svg
        viewBox="0 0 100 80"
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(to bottom, #dbeafe, #bfdbfe)" }}
      >
        {/* Continents (simplified shapes) */}
        <path d="M10 20 L35 15 L40 25 L35 35 L25 40 L15 35 Z" fill="#10b981" opacity="0.7" />
        <path d="M45 15 L65 12 L70 25 L65 35 L50 30 L45 25 Z" fill="#10b981" opacity="0.7" />
        <path d="M70 25 L90 20 L95 35 L85 45 L75 40 Z" fill="#10b981" opacity="0.7" />
        <path d="M85 50 L95 55 L90 70 L80 65 Z" fill="#10b981" opacity="0.7" />
      </svg>

      {/* Timezone markers */}
      {Object.entries(TIMEZONE_COORDINATES).map(([timezone, coords]) => {
        const isSelected = selectedTimezones.includes(timezone)
        return (
          <div
            key={timezone}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
              isSelected ? "scale-125 z-10" : "hover:scale-110"
            }`}
            style={{
              left: `${coords.x}%`,
              top: `${coords.y}%`,
            }}
            onClick={() => onTimezoneClick?.(timezone)}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                isSelected ? "bg-red-500" : "bg-blue-500"
              }`}
            />
            <div
              className={`absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap ${
                isSelected ? "bg-red-500 text-white" : "bg-white text-gray-700 border"
              }`}
            >
              {coords.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
