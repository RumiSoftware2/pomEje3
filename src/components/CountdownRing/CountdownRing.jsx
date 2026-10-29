import { useEffect } from 'react'
import useCountdown from '../../hooks/useCountdown.js'
import './CountdownRing.css'
import useSound from '../../hooks/useSound.js'

function CountdownRing({ seconds, total = seconds, onComplete, paused = false, autoStart = true, label }) {
  const { secondsLeft, isRunning, start, pause } = useCountdown(seconds, onComplete)
  const { reproducir } = useSound()

  useEffect(() => {
    if (!autoStart) return
    if (paused) pause()
    else start()
  }, [autoStart, paused, pause, start])

  useEffect(() => {
    if (isRunning && secondsLeft > 0 && secondsLeft <= 3) reproducir('countdown-tick')
    if (!isRunning && secondsLeft === 0) reproducir('ya')
  }, [isRunning, reproducir, secondsLeft])

  const progress = total > 0 ? Math.max(0, secondsLeft / total) : 0
  return (
    <div className="countdown-ring" style={{ '--ring-progress': progress }} role="timer" aria-label={label ?? `${secondsLeft} segundos`}>
      <span>{secondsLeft}</span>
      <small>{label ?? 'segundos'}</small>
    </div>
  )
}

export default CountdownRing
