"use client"

import { useEffect } from "react"
import { register } from "./sw"

export function PWAInitializer() {
  useEffect(() => {
    register()
  }, [])

  return null
}
