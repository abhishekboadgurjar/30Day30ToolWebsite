"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const areaUnits = {
  mm2: { name: "Square Millimeter", factor: 0.000001 },
  cm2: { name: "Square Centimeter", factor: 0.0001 },
  m2: { name: "Square Meter", factor: 1 },
  km2: { name: "Square Kilometer", factor: 1000000 },
  in2: { name: "Square Inch", factor: 0.00064516 },
  ft2: { name: "Square Foot", factor: 0.092903 },
  yd2: { name: "Square Yard", factor: 0.836127 },
  acre: { name: "Acre", factor: 4046.86 },
  ha: { name: "Hectare", factor: 10000 },
  mi2: { name: "Square Mile", factor: 2589988.11 },
}

export function AreaConverter() {
  const [fromUnit, setFromUnit] = useState("m2")
  const [toUnit, setToUnit] = useState("ft2")
  const [fromValue, setFromValue] = useState("1")
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
    const result = (inputValue * areaUnits[fromUnit].factor) / areaUnits[toUnit].factor
    setToValue(result.toFixed(6).replace(/\.?0+$/, ""))
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
                  {Object.entries(areaUnits).map(([unit, { name }]) => (
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
                  {Object.entries(areaUnits).map(([unit, { name }]) => (
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
              1 {fromUnit} = {(areaUnits[fromUnit].factor / areaUnits[toUnit].factor).toFixed(6).replace(/\.?0+$/, "")}{" "}
              {toUnit}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
