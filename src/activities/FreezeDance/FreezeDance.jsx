import { useCallback, useEffect, useMemo, useState } from 'react'
import useCountdown from '../../hooks/useCountdown.js'
import useSpeech from '../../hooks/useSpeech.js'
import useSound from '../../hooks/useSound.js'
import './FreezeDance.css'

function FreezeDance({ data, paused, onComplete }) {
  const duration = data?.duracion ?? data?.duration ?? 60
  const freezeCount = data?.congelamientos ?? data?.freezeCount ?? 3
  const freezeTimes = useMemo(() => Array.from({ length: freezeCount }, (_, index) => (
    Math.round(((index + 1) * duration) / (freezeCount + 1))
  )), [duration, freezeCount])
  const [saidFreeze, setSaidFreeze] = useState(-1)
  const [isFrozen, setIsFrozen] = useState(false)
  const { hablar } = useSpeech()
  const { reproducirMusica, detenerMusica } = useSound()
  const elapsed = duration - secondsLeft
  const finish = useCallback(onComplete, [onComplete])
  const { secondsLeft, start, pause } = useCountdown(duration, finish)

  useEffect(() => {
    if (paused) pause()
    else start()
  }, [paused, pause, start])

  useEffect(() => {
    if (paused) {
      detenerMusica()
      return undefined
    }
    reproducirMusica(data?.pista ?? 'baile-suave')
    return () => detenerMusica()
  }, [data?.pista, detenerMusica, paused, reproducirMusica])

  useEffect(() => {
    const nextFreeze = freezeTimes.findIndex((time, index) => time <= elapsed && index > saidFreeze)
    if (nextFreeze === -1) return
    setSaidFreeze(nextFreeze)
    hablar('¡Congelados!', 'es-CO')
  }, [elapsed, freezeTimes, hablar, saidFreeze])

  useEffect(() => {
    if (saidFreeze < 0) return undefined
    setIsFrozen(true)
    const timeout = window.setTimeout(() => setIsFrozen(false), 3000)
    return () => window.clearTimeout(timeout)
  }, [saidFreeze])

  return (
    <section className={`freeze-dance${isFrozen ? ' is-frozen' : ''}`} aria-label="Baila y congélate">
      <div className="freeze-dance__scene" aria-live="polite">
        <span aria-hidden="true">{isFrozen ? '🧊' : '💃'}</span>
        <p>{isFrozen ? '¡Congelados!' : '¡Baila a tu ritmo!'}</p>
      </div>
      <div className="freeze-dance__status">
        <p>{Math.max(0, freezeCount - saidFreeze - 1)} congelamientos más</p>
        <div className="freeze-dance__timer" role="timer" aria-label={`${secondsLeft} segundos de baile`}>
          <strong>{secondsLeft}</strong><span>segundos</span>
        </div>
      </div>
    </section>
  )
}

export default FreezeDance
