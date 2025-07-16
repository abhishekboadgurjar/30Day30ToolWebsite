"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)
  const [memory, setMemory] = useState<number>(0)
  const [isRadians, setIsRadians] = useState(true)

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

  const performScientificOperation = (operation: string) => {
    const value = Number.parseFloat(display)
    let result: number

    switch (operation) {
      case "sin":
        result = isRadians ? Math.sin(value) : Math.sin((value * Math.PI) / 180)
        break
      case "cos":
        result = isRadians ? Math.cos(value) : Math.cos((value * Math.PI) / 180)
        break
      case "tan":
        result = isRadians ? Math.tan(value) : Math.tan((value * Math.PI) / 180)
        break
      case "log":
        result = Math.log10(value)
        break
      case "ln":
        result = Math.log(value)
        break
      case "sqrt":
        result = Math.sqrt(value)
        break
      case "square":
        result = value * value
        break
      case "cube":
        result = value * value * value
        break
      case "1/x":
        result = 1 / value
        break
      case "pi":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
      case "pow10":
        result = Math.pow(10, value)
        break
      default:
        result = value
    }

    setDisplay(String(result))
    setWaitingForSecondOperand(true)
  }

  const memoryOperation = (operation: string) => {
    const value = Number.parseFloat(display)

    switch (operation) {
      case "mc":
        setMemory(0)
        break
      case "mr":
        setDisplay(String(memory))
        break
      case "m+":
        setMemory(memory + value)
        break
      case "m-":
        setMemory(memory - value)
        break
    }
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      <div className="col-span-5 bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-2 text-right">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {isRadians ? "RAD" : "DEG"} {memory !== 0 ? "M" : ""}
        </div>
        <div className="text-3xl font-medium truncate">{display}</div>
      </div>

      <Button variant="outline" size="sm" onClick={() => memoryOperation("mc")}>
        MC
      </Button>
      <Button variant="outline" size="sm" onClick={() => memoryOperation("mr")}>
        MR
      </Button>
      <Button variant="outline" size="sm" onClick={() => memoryOperation("m+")}>
        M+
      </Button>
      <Button variant="outline" size="sm" onClick={() => memoryOperation("m-")}>
        M-
      </Button>
      <Button variant="outline" size="sm" onClick={() => setIsRadians(!isRadians)}>
        {isRadians ? "RAD" : "DEG"}
      </Button>

      <Button variant="outline" size="sm" onClick={() => performScientificOperation("sin")}>
        sin
      </Button>
      <Button variant="outline" size="sm" onClick={() => performScientificOperation("cos")}>
        cos
      </Button>
      <Button variant="outline" size="sm" onClick={() => performScientificOperation("tan")}>
        tan
      </Button>
      <Button variant="outline" size="sm" onClick={() => performScientificOperation("log")}>
        log
      </Button>
      <Button variant="outline" size="sm" onClick={() => performScientificOperation("ln")}>
        ln
      </Button>

      <Button variant="outline" size="sm" onClick={() => performScientificOperation("sqrt")}>
        √
      </Button>
      <Button variant="outline" size="sm" onClick={() => performScientificOperation("square")}>
        x²
      </Button>
      <Button variant="outline" size="sm" onClick={() => performScientificOperation("cube")}>
        x³
      </Button>
      <Button variant="outline" size="sm" onClick={() => performScientificOperation("1/x")}>
        1/x
      </Button>
      <Button variant="outline" size="sm" onClick={() => performScientificOperation("pi")}>
        π
      </Button>

      <Button variant="outline" onClick={() => clearDisplay()}>
        C
      </Button>
      <Button variant="outline" onClick={() => toggleSign()}>
        +/-
      </Button>
      <Button variant="outline" onClick={() => inputPercent()}>
        %
      </Button>
      <Button variant="outline" onClick={() => performScientificOperation("e")}>
        e
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
      <Button variant="outline" onClick={() => performScientificOperation("pow10")}>
        10ˣ
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
      <Button variant="outline" onClick={() => performOperation("^")}>
        xʸ
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
      <Button variant="outline" onClick={() => inputDigit("(")}>
        (
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
      <Button variant="outline" onClick={() => inputDigit(")")}>
        )
      </Button>
      <Button variant="outline" onClick={() => performOperation("=")}>
        =
      </Button>
    </div>
  )
}
