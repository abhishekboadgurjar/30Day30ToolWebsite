"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const temperatureUnits = {
  c: { name: "Celsius" },
  f: { name: "Fahrenheit" },
  k: { name: "Kelvin" },
}

export function TemperatureConverter() {
  const [fromUnit, setFromUnit] = useState("c")
  const [toUnit, setToUnit] = useState("f")
  const [fromValue, setFromValue] = useState("20")
  const [toValue, setToValue] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    convert()
  }, [fromUnit, toUnit, fromValue])

  const convert = () => {
    if (!fromValue || isNaN(Number(fromValue))) {
      setToValue("")
      return
    }

    const inputValue = Number.parseFloat(fromValue)
    let result = 0

    // First convert to Celsius as intermediate
    let celsius = 0
    switch (fromUnit) {
      case "c":
        celsius = inputValue
        break
      case "f":
        celsius = ((inputValue - 32) * 5) / 9
        break
      case "k":
        celsius = inputValue - 273.15
        break
    }

    // Then convert from Celsius to target unit
    switch (toUnit) {
      case "c":
        result = celsius
        break
      case "f":
        result = (celsius * 9) / 5 + 32
        break
      case "k":
        result = celsius + 273.15
        break
    }

    setToValue(result.toFixed(2).replace(/\.?0+$/, ""))
  }

  const swapUnits = () => {
    const tempUnit = fromUnit
    setFromUnit(toUnit)
    setToUnit(tempUnit)
    setFromValue(toValue)
  }

  const copyResult = () => {
    navigator.clipboard.writeText(toValue)
    toast({
      title: "Copied to clipboard",
      description: `${toValue} ${temperatureUnits[toUnit].name} copied to clipboard`,
    })
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid gap-6 p-6">
          <div className="grid gap-2">
            <Label htmlFor="from-value">From</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input
                  id="from-value"
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="Enter value"
                />
              </div>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(temperatureUnits).map(([unit, { name }]) => (
                    <SelectItem key={unit} value={unit}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="icon" onClick={swapUnits}>
              <ArrowDownUp className="h-4 w-4" />
              <span className="sr-only">Swap units</span>
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="to-value">To</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 relative">
                <Input id="to-value" value={toValue} readOnly className="pr-10" />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={copyResult}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy value</span>
                </Button>
              </div>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(temperatureUnits).map(([unit, { name }]) => (
                    <SelectItem key={unit} value={unit}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              {fromValue}° {temperatureUnits[fromUnit].name} = {toValue}° {temperatureUnits[toUnit].name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
