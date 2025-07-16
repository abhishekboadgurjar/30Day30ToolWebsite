"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LengthConverter } from "./converters/length-converter"
import { WeightConverter } from "./converters/weight-converter"
import { TemperatureConverter } from "./converters/temperature-converter"
import { AreaConverter } from "./converters/area-converter"
import { VolumeConverter } from "./converters/volume-converter"
import { SpeedConverter } from "./converters/speed-converter"
import { TimeConverter } from "./converters/time-converter"
import { DataConverter } from "./converters/data-converter"
import { CurrencyConverter } from "./converters/currency-converter"

export function Converter() {
  const [activeTab, setActiveTab] = useState("length")

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <Tabs defaultValue="length" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-auto">
          <TabsList className="w-full justify-start p-0 h-auto flex-wrap rounded-none border-b bg-transparent">
            <TabsTrigger
              value="length"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Length
            </TabsTrigger>
            <TabsTrigger
              value="weight"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Weight
            </TabsTrigger>
            <TabsTrigger
              value="temperature"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Temperature
            </TabsTrigger>
            <TabsTrigger
              value="area"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Area
            </TabsTrigger>
            <TabsTrigger
              value="volume"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Volume
            </TabsTrigger>
            <TabsTrigger
              value="speed"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Speed
            </TabsTrigger>
            <TabsTrigger
              value="time"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Time
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Data
            </TabsTrigger>
            <TabsTrigger
              value="currency"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Currency
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="length" className="mt-0">
            <LengthConverter />
          </TabsContent>
          <TabsContent value="weight" className="mt-0">
            <WeightConverter />
          </TabsContent>
          <TabsContent value="temperature" className="mt-0">
            <TemperatureConverter />
          </TabsContent>
          <TabsContent value="area" className="mt-0">
            <AreaConverter />
          </TabsContent>
          <TabsContent value="volume" className="mt-0">
            <VolumeConverter />
          </TabsContent>
          <TabsContent value="speed" className="mt-0">
            <SpeedConverter />
          </TabsContent>
          <TabsContent value="time" className="mt-0">
            <TimeConverter />
          </TabsContent>
          <TabsContent value="data" className="mt-0">
            <DataConverter />
          </TabsContent>
          <TabsContent value="currency" className="mt-0">
            <CurrencyConverter />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
