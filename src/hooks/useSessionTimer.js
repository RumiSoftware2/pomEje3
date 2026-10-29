import { useCallback, useEffect, useRef, useState } from 'react'

export default function useSessionTimer(breakMinutes = 15) {
  const [shouldRest, setShouldRest] = useState(false)
  const startedAt = useRef(0)
  const acknowledgedAt = useRef(0)

  useEffect(() => {
    if (!breakMinutes) return undefined
    startedAt.current = Date.now()
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - Math.max(startedAt.current, acknowledgedAt.current)
      if (elapsed >= breakMinutes * 60_000) setShouldRest(true)
    }, 15_000)
    return () => window.clearInterval(interval)
  }, [breakMinutes])

  const acknowledgeRest = useCallback(() => {
    acknowledgedAt.current = Date.now()
    setShouldRest(false)
  }, [])

  return { shouldRest, acknowledgeRest }
}
