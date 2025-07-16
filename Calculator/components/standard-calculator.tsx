"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function StandardCalculator() {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const toggleSign = () => {
    setDisplay(String(-Number.parseFloat(display)))
  }

  const inputPercent = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand
      case "-":
        return firstOperand - secondOperand
      case "*":
        return firstOperand * secondOperand
      case "/":
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-2 text-right">
        <div className="text-3xl font-medium truncate">{display}</div>
      </div>

      <Button variant="outline" onClick={() => clearDisplay()}>
        C
      </Button>
      <Button variant="outline" onClick={() => toggleSign()}>
        +/-
      </Button>
      <Button variant="outline" onClick={() => inputPercent()}>
        %
      </Button>
      <Button variant="outline" onClick={() => performOperation("/")}>
        ÷
      </Button>

      <Button variant="outline" onClick={() => inputDigit("7")}>
        7
      </Button>
      <Button variant="outline" onClick={() => inputDigit("8")}>
        8
      </Button>
      <Button variant="outline" onClick={() => inputDigit("9")}>
        9
      </Button>
      <Button variant="outline" onClick={() => performOperation("*")}>
        ×
      </Button>

      <Button variant="outline" onClick={() => inputDigit("4")}>
        4
      </Button>
      <Button variant="outline" onClick={() => inputDigit("5")}>
        5
      </Button>
      <Button variant="outline" onClick={() => inputDigit("6")}>
        6
      </Button>
      <Button variant="outline" onClick={() => performOperation("-")}>
        -
      </Button>

      <Button variant="outline" onClick={() => inputDigit("1")}>
        1
      </Button>
      <Button variant="outline" onClick={() => inputDigit("2")}>
        2
      </Button>
      <Button variant="outline" onClick={() => inputDigit("3")}>
        3
      </Button>
      <Button variant="outline" onClick={() => performOperation("+")}>
        +
      </Button>

      <Button variant="outline" className="col-span-2" onClick={() => inputDigit("0")}>
        0
      </Button>
      <Button variant="outline" onClick={() => inputDecimal()}>
        .
      </Button>
      <Button variant="outline" onClick={() => performOperation("=")}>
        =
      </Button>
    </div>
  )
}
