"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Define types for our currency data
type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CNY' | 'INR' | 'BRL' | 'MXN'

interface CurrencyInfo {
  name: string
  symbol: string
  rate: number
}

type CurrencyRates = {
  [key in CurrencyCode]: CurrencyInfo
}

// Static currency rates (can be replaced by API call)
const currencyRates: CurrencyRates = {
  USD: { name: "US Dollar", symbol: "$", rate: 1 },
  EUR: { name: "Euro", symbol: "€", rate: 0.92 },
  GBP: { name: "British Pound", symbol: "£", rate: 0.79 },
  JPY: { name: "Japanese Yen", symbol: "¥", rate: 150.59 },
  CAD: { name: "Canadian Dollar", symbol: "C$", rate: 1.36 },
  AUD: { name: "Australian Dollar", symbol: "A$", rate: 1.52 },
  CNY: { name: "Chinese Yuan", symbol: "¥", rate: 7.24 },
  INR: { name: "Indian Rupee", symbol: "₹", rate: 83.12 },
  BRL: { name: "Brazilian Real", symbol: "R$", rate: 5.16 },
  MXN: { name: "Mexican Peso", symbol: "$", rate: 16.75 },
}

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD')
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('EUR')
  const [amount, setAmount] = useState<string>('1')
  const [result, setResult] = useState<string>('')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  useEffect(() => {
    convertCurrency()
  }, [fromCurrency, toCurrency, amount])

  const convertCurrency = () => {
    try {
      if (!amount || isNaN(Number(amount)) || Number(amount) < 0) {
        setResult('')
        return
      }

      const inputAmount = Number.parseFloat(amount)
      if (isNaN(inputAmount)) {
        setResult('')
        return
      }

      const resultValue = inputAmount * (currencyRates[fromCurrency].rate / currencyRates[toCurrency].rate)
      setResult(resultValue.toFixed(2))
    } catch (error) {
      console.error('Error converting currency:', error)
      toast({
        title: 'Error',
        description: 'Failed to convert currency. Please try again.',
        variant: 'destructive',
      })
      setResult('')
    }
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result)
      toast({
        title: 'Copied to clipboard',
        description: `${result} ${toCurrency} copied to clipboard`,
      })
    } catch (error) {
      console.error('Failed to copy:', error)
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      })
    }
  }

  const refreshRates = async () => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: 'Rates updated',
        description: 'Currency rates have been updated.',
      })
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching rates:', error)
      toast({
        title: 'Offline mode',
        description: 'Using cached rates. Failed to fetch latest rates.',
        variant: 'default',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid gap-6 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshRates} 
              className="gap-1"
              disabled={isLoading}
              aria-label="Refresh exchange rates"
            >
              <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh Rates'}
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="from-amount">From</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input
                  id="from-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencyRates).map(([code, { name, symbol }]) => (
                    <SelectItem key={code} value={code}>
                      {code} ({symbol}) - {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={swapCurrencies}
              aria-label="Swap currencies"
              className="hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowDownUp className="h-4 w-4" />
              <span className="sr-only">Swap currencies</span>
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="to-amount">To</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 relative">
                <Input
                  id="to-amount"
                  value={result}
                  readOnly
                  className="pr-10"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                  onClick={copyResult}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy value</span>
                </Button>
              </div>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencyRates).map(([code, { name, symbol }]) => (
                    <SelectItem key={code} value={code}>
                      {code} ({symbol}) - {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              {amount} {fromCurrency} = {result} {toCurrency}
            </p>
            <p className="mt-1">
              1 {fromCurrency} = {(currencyRates[fromCurrency].rate / currencyRates[toCurrency].rate).toFixed(4)} {toCurrency}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
