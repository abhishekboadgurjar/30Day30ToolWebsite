"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const speedUnits = {
  "m/s": { name: "Meters per second", factor: 1 },
  "km/h": { name: "Kilometers per hour", factor: 0.277778 },
  mph: { name: "Miles per hour", factor: 0.44704 },
  "ft/s": { name: "Feet per second", factor: 0.3048 },
  knot: { name: "Knot", factor: 0.514444 },
}

export function SpeedConverter() {
  const [fromUnit, setFromUnit] = useState("km/h")
  const [toUnit, setToUnit] = useState("mph")
  const [fromValue, setFromValue] = useState("100")
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
    const result = (inputValue * speedUnits[fromUnit].factor) / speedUnits[toUnit].factor
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
      description: `${toValue} ${toUnit} copied to clipboard`,
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
                  {Object.entries(speedUnits).map(([unit, { name }]) => (
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
                  {Object.entries(speedUnits).map(([unit, { name }]) => (
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
              {fromValue} {fromUnit} = {toValue} {toUnit}
            </p>
            <p className="mt-1">
              1 {fromUnit} ={" "}
              {(speedUnits[fromUnit].factor / speedUnits[toUnit].factor).toFixed(6).replace(/\.?0+$/, "")} {toUnit}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
