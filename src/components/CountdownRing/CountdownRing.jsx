import { useEffect } from 'react'
import useCountdown from '../../hooks/useCountdown.js'
import './CountdownRing.css'

function CountdownRing({ seconds, total = seconds, onComplete, paused = false, autoStart = true, label }) {
  const { secondsLeft, start, pause } = useCountdown(seconds, onComplete)

  useEffect(() => {
    if (!autoStart) return
    if (paused) pause()
    else start()
  }, [autoStart, paused, pause, start])

  const progress = total > 0 ? Math.max(0, secondsLeft / total) : 0
  return (
    <div className="countdown-ring" style={{ '--ring-progress': progress }} role="timer" aria-label={label ?? `${secondsLeft} segundos`}>
      <span>{secondsLeft}</span>
      <small>{label ?? 'segundos'}</small>
    </div>
  )
}

export default CountdownRing
