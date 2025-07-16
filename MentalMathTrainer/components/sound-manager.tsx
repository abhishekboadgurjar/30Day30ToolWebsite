"use client"

import { useEffect, useRef } from "react"

interface SoundManagerProps {
  enabled: boolean
}

export function SoundManager({ enabled }: SoundManagerProps) {
  const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create audio context for sound effects
      correctSoundRef.current = new Audio()
      incorrectSoundRef.current = new Audio()

      // Simple beep sounds using Web Audio API
      const createBeep = (frequency: number, duration: number) => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = "sine"

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      }

      // Expose sound functions globally
      ;(window as any).playCorrectSound = () => {
        if (enabled) createBeep(800, 0.2)
      }
      ;(window as any).playIncorrectSound = () => {
        if (enabled) createBeep(300, 0.3)
      }
    }
  }, [enabled])

  return null
}
