"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Device {
  name: string
  width: number
  height: number
  icon: LucideIcon
  description: string
}

interface DeviceSelectorProps {
  devices: Device[]
  selectedDevice: Device
  onSelectDevice: (device: Device) => void
}

export default function DeviceSelector({ devices, selectedDevice, onSelectDevice }: DeviceSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {devices.map((device) => {
        const Icon = device.icon
        const isSelected = selectedDevice.name === device.name

        return (
          <Button
            key={device.name}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onSelectDevice(device)}
            className={cn(
              "h-auto p-4 flex flex-col items-center gap-3 transition-all duration-200 hover:scale-105",
              isSelected ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/20" : "hover:bg-muted/50",
            )}
          >
            <Icon className={cn("h-6 w-6", isSelected ? "text-primary-foreground" : "text-primary")} />
            <div className="text-center space-y-1">
              <div className="font-semibold">{device.name}</div>
              <div className={cn("text-xs", isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {device.description}
              </div>
              <Badge variant={isSelected ? "secondary" : "outline"} className="text-xs font-mono">
                {device.width}×{device.height}
              </Badge>
            </div>
          </Button>
        )
      })}
    </div>
  )
}
