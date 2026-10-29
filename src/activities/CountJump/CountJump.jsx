import { useCallback, useEffect, useState } from 'react'
import ProgressPath from '../../components/ProgressPath/ProgressPath.jsx'
import useSpeech from '../../hooks/useSpeech.js'
import './CountJump.css'
import useSound from '../../hooks/useSound.js'

const fallbackRounds = [
  { objetivo: 3, movimiento: 'aplausos', emoji: '👏', frase: '¡Aplaude 3 veces!' },
]

function CountJump({ data, countMode = 'nimbo', paused, onComplete }) {
  const rounds = Array.isArray(data) && data.length ? data : fallbackRounds
  const [roundIndex, setRoundIndex] = useState(0)
  const [count, setCount] = useState(0)
  const round = rounds[roundIndex]
  const { hablar } = useSpeech()
  const { reproducir } = useSound()

  const advance = useCallback(() => {
    if (roundIndex + 1 >= rounds.length) onComplete()
    else {
      setRoundIndex((current) => current + 1)
      setCount(0)
    }
  }, [onComplete, roundIndex, rounds.length])

  const countOnce = useCallback(() => {
    const next = count + 1
    setCount(next)
    hablar(`${next}`, 'es-CO')
    if (next >= round.objetivo) {
      reproducir('success-small')
      window.setTimeout(advance, 650)
    }
  }, [advance, count, hablar, reproducir, round.objetivo])

  useEffect(() => {
    if (countMode !== 'nimbo' || paused || count >= round.objetivo) return undefined
    const timer = window.setTimeout(countOnce, 1200)
    return () => window.clearTimeout(timer)
  }, [count, countMode, countOnce, paused, round.objetivo])

  return (
    <section className="count-jump" aria-label="Salta y cuenta">
      <ProgressPath steps={rounds.length} current={roundIndex} />
      <span className="count-jump__emoji" aria-hidden="true">{round.emoji}</span>
      <h2>{round.frase}</h2>
      <div className="count-jump__bubbles" aria-label={`${count} de ${round.objetivo}`} aria-live="polite">
        {Array.from({ length: round.objetivo }, (_, index) => (
          <span className={index < count ? 'is-counted' : ''} key={index}>{index < count ? '✓' : ''}</span>
        ))}
      </div>
      {countMode === 'tocar' && count < round.objetivo && (
        <button className="activity-primary count-jump__tap" type="button" onClick={countOnce} disabled={paused}>
          ¡Lo hice! <span aria-hidden="true">👏</span>
        </button>
      )}
      <p className="count-jump__hint" aria-live="polite">
        {countMode === 'nimbo' ? 'Cuenta conmigo' : 'Toca una vez por movimiento'}
      </p>
    </section>
  )
}

export default CountJump
