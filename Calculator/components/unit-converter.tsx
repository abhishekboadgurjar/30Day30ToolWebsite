"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ConversionCategory = {
  name: string
  units: {
    [key: string]: number
  }
}

const conversionCategories: { [key: string]: ConversionCategory } = {
  length: {
    name: "Length",
    units: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34,
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      pound: 0.453592,
      ounce: 0.0283495,
      ton: 1000,
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: "celsius",
      fahrenheit: "fahrenheit",
      kelvin: "kelvin",
    },
  },
  area: {
    name: "Area",
    units: {
      "square meter": 1,
      "square kilometer": 1000000,
      "square centimeter": 0.0001,
      "square millimeter": 0.000001,
      "square inch": 0.00064516,
      "square foot": 0.092903,
      "square yard": 0.836127,
      "square mile": 2589988.11,
      acre: 4046.86,
      hectare: 10000,
    },
  },
  volume: {
    name: "Volume",
    units: {
      "cubic meter": 1,
      liter: 0.001,
      milliliter: 0.000001,
      "cubic inch": 0.0000163871,
      "cubic foot": 0.0283168,
      "cubic yard": 0.764555,
      gallon: 0.00378541,
      quart: 0.000946353,
      pint: 0.000473176,
      cup: 0.000236588,
      "fluid ounce": 0.0000295735,
    },
  },
}

export default function UnitConverter() {
  const [category, setCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")
  const [fromValue, setFromValue] = useState("1")
  const [toValue, setToValue] = useState("")

  useEffect(() => {
    // Set default units when category changes
    const units = Object.keys(conversionCategories[category].units)
    if (units.length > 0) {
      setFromUnit(units[0])
      setToUnit(units.length > 1 ? units[1] : units[0])
    }
  }, [category])

  useEffect(() => {
    if (fromUnit && toUnit) {
      convert(fromValue, fromUnit, toUnit)
    }
  }, [fromUnit, toUnit, fromValue])

  const convert = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number.parseFloat(value))) {
      setToValue("")
      return
    }

    const numValue = Number.parseFloat(value)
    const categoryUnits = conversionCategories[category].units

    // Special case for temperature
    if (category === "temperature") {
      let result: number
      if (from === "celsius" && to === "fahrenheit") {
        result = (numValue * 9) / 5 + 32
      } else if (from === "celsius" && to === "kelvin") {
        result = numValue + 273.15
      } else if (from === "fahrenheit" && to === "celsius") {
        result = ((numValue - 32) * 5) / 9
      } else if (from === "fahrenheit" && to === "kelvin") {
        result = ((numValue - 32) * 5) / 9 + 273.15
      } else if (from === "kelvin" && to === "celsius") {
        result = numValue - 273.15
      } else if (from === "kelvin" && to === "fahrenheit") {
        result = ((numValue - 273.15) * 9) / 5 + 32
      } else {
        result = numValue // Same unit
      }
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""))
    } else {
      // For other categories, use the conversion factors
      const fromFactor = categoryUnits[from]
      const toFactor = categoryUnits[to]
      const result = (numValue * fromFactor) / toFactor
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""))
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="length" value={category} onValueChange={setCategory}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="length">Length</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="temperature">Temp</TabsTrigger>
          <TabsTrigger value="area">Area</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fromValue">From</Label>
          <div className="flex gap-2">
            <Input
              id="fromValue"
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="flex-1"
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(conversionCategories[category].units).map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="toValue">To</Label>
          <div className="flex gap-2">
            <Input id="toValue" type="text" value={toValue} readOnly className="flex-1" />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(conversionCategories[category].units).map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
