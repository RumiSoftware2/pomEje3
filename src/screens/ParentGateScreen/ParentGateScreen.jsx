import { useEffect, useState } from 'react'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame.jsx'
import './ParentGateScreen.css'

const questions = [
  { first: 'siete', second: 'cinco', answer: 12 },
  { first: 'tres', second: 'seis', answer: 9 },
  { first: 'ocho', second: 'cuatro', answer: 12 },
  { first: 'nueve', second: 'dos', answer: 11 },
  { first: 'seis', second: 'tres', answer: 9 },
]

function ParentGateScreen({ onApprove }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [failures, setFailures] = useState(0)
  const [lockedUntil, setLockedUntil] = useState(0)
  const [secondsToUnlock, setSecondsToUnlock] = useState(0)
  const question = questions[questionIndex]
  const locked = secondsToUnlock > 0

  useEffect(() => {
    if (!lockedUntil) return undefined
    const update = () => {
      const remaining = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000))
      setSecondsToUnlock(remaining)
      if (remaining === 0) {
        setLockedUntil(0)
        setFailures(0)
      }
    }
    update()
    const interval = window.setInterval(update, 250)
    return () => window.clearInterval(interval)
  }, [lockedUntil])

  const nextQuestion = () => setQuestionIndex((index) => (index + 1) % questions.length)
  const submitAnswer = (event) => {
    event.preventDefault()
    nextQuestion()
    if (Number(answer) === question.answer) {
      setAnswer('')
      onApprove()
      return
    }
    setAnswer('')
    const nextFailureCount = failures + 1
    if (nextFailureCount >= 3) {
      setFailures(0)
      setSecondsToUnlock(30)
      setLockedUntil(Date.now() + 30_000)
    } else setFailures(nextFailureCount)
  }

  const enterDigit = (digit) => setAnswer((value) => `${value}${digit}`.slice(0, 2))

  return (
    <ScreenFrame title="Espacio para adultos" subtitle="Resuelve esta pregunta para continuar." backTo="/" className="parent-gate">
      <form className="parent-gate__card" onSubmit={submitAnswer}>
        <span className="parent-gate__icon" aria-hidden="true">🔐</span>
        <p className="parent-gate__question">
          Escribe el resultado de <strong>{question.first} más {question.second}</strong>, en números.
        </p>
        <label className="parent-gate__label" htmlFor="parent-answer">Tu respuesta</label>
        <input
          id="parent-answer"
          className="parent-gate__input"
          inputMode="numeric"
          pattern="[0-9]*"
          value={answer}
          onChange={(event) => setAnswer(event.target.value.replace(/\D/g, '').slice(0, 2))}
          disabled={locked}
          aria-describedby="gate-message"
        />
        <div className="parent-gate__keypad" aria-label="Teclado numérico">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'borrar', 0, 'continuar'].map((key) => (
            key === 'continuar' ? (
              <button className="parent-gate__submit" key={key} type="submit" disabled={locked || !answer} aria-label="Comprobar respuesta">✓</button>
            ) : key === 'borrar' ? (
              <button key={key} type="button" onClick={() => setAnswer((value) => value.slice(0, -1))} disabled={locked} aria-label="Borrar último número">⌫</button>
            ) : (
              <button key={key} type="button" onClick={() => enterDigit(key)} disabled={locked} aria-label={`Número ${key}`}>{key}</button>
            )
          ))}
        </div>
        <p id="gate-message" className="parent-gate__message" aria-live="polite">
          {locked ? `Intenta de nuevo en ${secondsToUnlock} segundos.` : failures ? 'Revisa el resultado y prueba otra vez.' : ' '}
        </p>
      </form>
    </ScreenFrame>
  )
}

export default ParentGateScreen
