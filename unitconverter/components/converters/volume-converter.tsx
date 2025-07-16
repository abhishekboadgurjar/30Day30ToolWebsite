"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const volumeUnits = {
  ml: { name: "Milliliter", factor: 0.001 },
  l: { name: "Liter", factor: 1 },
  m3: { name: "Cubic Meter", factor: 1000 },
  in3: { name: "Cubic Inch", factor: 0.016387 },
  ft3: { name: "Cubic Foot", factor: 28.3168 },
  gal_us: { name: "US Gallon", factor: 3.78541 },
  gal_uk: { name: "UK Gallon", factor: 4.54609 },
  qt_us: { name: "US Quart", factor: 0.946353 },
  pt_us: { name: "US Pint", factor: 0.473176 },
  fl_oz_us: { name: "US Fluid Ounce", factor: 0.0295735 },
}

export function VolumeConverter() {
  const [fromUnit, setFromUnit] = useState("l")
  const [toUnit, setToUnit] = useState("gal_us")
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
    const result = (inputValue * volumeUnits[fromUnit].factor) / volumeUnits[toUnit].factor
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
                  {Object.entries(volumeUnits).map(([unit, { name }]) => (
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
                  {Object.entries(volumeUnits).map(([unit, { name }]) => (
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
              {(volumeUnits[fromUnit].factor / volumeUnits[toUnit].factor).toFixed(6).replace(/\.?0+$/, "")} {toUnit}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
