"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancialCalculator() {
  const [activeTab, setActiveTab] = useState("loan")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="loan" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="loan">Loan</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
          <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
        </TabsList>
        <TabsContent value="loan">
          <LoanCalculator />
        </TabsContent>
        <TabsContent value="investment">
          <InvestmentCalculator />
        </TabsContent>
        <TabsContent value="mortgage">
          <MortgageCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LoanCalculator() {
  const [principal, setPrincipal] = useState("10000")
  const [interestRate, setInterestRate] = useState("5")
  const [loanTerm, setLoanTerm] = useState("36")
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [totalPayment, setTotalPayment] = useState("")
  const [totalInterest, setTotalInterest] = useState("")

  useEffect(() => {
    calculateLoan()
  }, [principal, interestRate, loanTerm])

  const calculateLoan = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(interestRate) / 100 / 12
    const n = Number.parseFloat(loanTerm)

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) {
      setMonthlyPayment("")
      setTotalPayment("")
      setTotalInterest("")
      return
    }

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = monthly * n
    const interest = total - p

    setMonthlyPayment(monthly.toFixed(2))
    setTotalPayment(total.toFixed(2))
    setTotalInterest(interest.toFixed(2))
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="principal">Loan Amount ($)</Label>
        <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="interestRate">Interest Rate (%)</Label>
        <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="loanTerm">Loan Term (months)</Label>
        <Input id="loanTerm" type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div>
          <p className="text-sm text-gray-500">Monthly Payment</p>
          <p className="text-xl font-bold">${monthlyPayment}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Interest</p>
          <p className="text-xl font-bold">${totalInterest}</p>
        </div>
      </div>
    </div>
  )
}

function InvestmentCalculator() {
  const [principal, setPrincipal] = useState("1000")
  const [monthlyContribution, setMonthlyContribution] = useState("100")
  const [interestRate, setInterestRate] = useState("7")
  const [years, setYears] = useState("10")
  const [futureValue, setFutureValue] = useState("")
  const [totalContributions, setTotalContributions] = useState("")
  const [totalInterest, setTotalInterest] = useState("")

  useEffect(() => {
    calculateInvestment()
  }, [principal, monthlyContribution, interestRate, years])

  const calculateInvestment = () => {
    const p = Number.parseFloat(principal)
    const pmt = Number.parseFloat(monthlyContribution)
    const r = Number.parseFloat(interestRate) / 100 / 12
    const n = Number.parseFloat(years) * 12

    if (isNaN(p) || isNaN(pmt) || isNaN(r) || isNaN(n) || r <= 0 || n <= 0) {
      setFutureValue("")
      setTotalContributions("")
      setTotalInterest("")
      return
    }

    // Calculate future value
    const fv = p * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r)
    const totalCont = p + pmt * n
    const interest = fv - totalCont

    setFutureValue(fv.toFixed(2))
    setTotalContributions(totalCont.toFixed(2))
    setTotalInterest(interest.toFixed(2))
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="principal">Initial Investment ($)</Label>
        <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
        <Input
          id="monthlyContribution"
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
        <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="years">Investment Period (years)</Label>
        <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div>
          <p className="text-sm text-gray-500">Future Value</p>
          <p className="text-xl font-bold">${futureValue}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Interest</p>
          <p className="text-xl font-bold">${totalInterest}</p>
        </div>
      </div>
    </div>
  )
}

function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("300000")
  const [downPayment, setDownPayment] = useState("60000")
  const [interestRate, setInterestRate] = useState("4.5")
  const [loanTerm, setLoanTerm] = useState("30")
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [totalPayment, setTotalPayment] = useState("")
  const [totalInterest, setTotalInterest] = useState("")

  useEffect(() => {
    calculateMortgage()
  }, [homePrice, downPayment, interestRate, loanTerm])

  const calculateMortgage = () => {
    const price = Number.parseFloat(homePrice)
    const down = Number.parseFloat(downPayment)
    const r = Number.parseFloat(interestRate) / 100 / 12
    const n = Number.parseFloat(loanTerm) * 12
    const principal = price - down

    if (
      isNaN(price) ||
      isNaN(down) ||
      isNaN(r) ||
      isNaN(n) ||
      price <= 0 ||
      down < 0 ||
      r <= 0 ||
      n <= 0 ||
      down >= price
    ) {
      setMonthlyPayment("")
      setTotalPayment("")
      setTotalInterest("")
      return
    }

    const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = monthly * n
    const interest = total - principal

    setMonthlyPayment(monthly.toFixed(2))
    setTotalPayment(total.toFixed(2))
    setTotalInterest(interest.toFixed(2))
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="homePrice">Home Price ($)</Label>
        <Input id="homePrice" type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="downPayment">Down Payment ($)</Label>
        <Input id="downPayment" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="interestRate">Interest Rate (%)</Label>
        <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="loanTerm">Loan Term (years)</Label>
        <Input id="loanTerm" type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div>
          <p className="text-sm text-gray-500">Monthly Payment</p>
          <p className="text-xl font-bold">${monthlyPayment}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Interest</p>
          <p className="text-xl font-bold">${totalInterest}</p>
        </div>
      </div>
    </div>
  )
}
