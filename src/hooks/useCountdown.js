import { useCallback, useEffect, useRef, useState } from 'react'

export default function useCountdown(initialSeconds, onComplete) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const secondsRef = useRef(initialSeconds)
  const deadlineRef = useRef(0)
  const completedRef = useRef(false)
  const callbackRef = useRef(onComplete)

  useEffect(() => { callbackRef.current = onComplete }, [onComplete])
  useEffect(() => { secondsRef.current = secondsLeft }, [secondsLeft])

  useEffect(() => {
    if (!isRunning) return undefined
    const update = () => {
      const remaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0 && !completedRef.current) {
        completedRef.current = true
        setIsRunning(false)
        callbackRef.current?.()
      }
    }
    update()
    const interval = window.setInterval(update, 100)
    return () => window.clearInterval(interval)
  }, [isRunning])

  const start = useCallback(() => {
    deadlineRef.current = Date.now() + secondsRef.current * 1000
    completedRef.current = false
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setSecondsLeft(Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000)))
    setIsRunning(false)
  }, [])

  const reset = useCallback((seconds = initialSeconds) => {
    setIsRunning(false)
    secondsRef.current = seconds
    setSecondsLeft(seconds)
    completedRef.current = false
  }, [initialSeconds])

  const restart = useCallback((seconds = initialSeconds) => {
    secondsRef.current = seconds
    deadlineRef.current = Date.now() + seconds * 1000
    completedRef.current = false
    setSecondsLeft(seconds)
    setIsRunning(true)
  }, [initialSeconds])

  return { secondsLeft, isRunning, start, pause, reset, restart }
}
