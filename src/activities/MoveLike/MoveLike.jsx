import { useCallback, useEffect, useState } from 'react'
import CountdownRing from '../../components/CountdownRing/CountdownRing.jsx'
import ProgressPath from '../../components/ProgressPath/ProgressPath.jsx'
import useSpeech from '../../hooks/useSpeech.js'
import './MoveLike.css'

const fallbackItems = [
  { nombre: 'conejo', emoji: '🐇', movimiento: 'Da saltos pequeños.' },
  { nombre: 'pájaro', emoji: '🐦', movimiento: 'Mueve tus brazos como alas.' },
]

function MoveLike({ data, paused, onComplete }) {
  const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) && data.length ? data : fallbackItems
  const seconds = data?.segundosPorElemento ?? data?.secondsPerItem ?? 10
  const restSeconds = data?.descanso ?? data?.restBetween ?? 0
  const [index, setIndex] = useState(0)
  const [resting, setResting] = useState(false)
  const item = items[index]
  const { hablar } = useSpeech()

  useEffect(() => {
    if (resting) {
      hablar('Respira y estírate.', 'es-CO')
      return
    }
    const instruction = item.frase ?? `Muévete como ${item.nombre ?? item.name}.`
    const translated = item.traduccion ?? item.translation
    hablar(instruction, item.idioma ?? item.language ?? 'es-CO', translated ? () => hablar(translated, 'es-CO') : undefined)
  }, [hablar, index, item, resting])

  const afterRest = useCallback(() => {
    setResting(false)
    setIndex((current) => current + 1)
  }, [])

  const next = useCallback(() => {
    if (index + 1 >= items.length) onComplete()
    else if (restSeconds > 0) setResting(true)
    else setIndex((current) => current + 1)
  }, [index, items.length, onComplete, restSeconds])

  if (resting) {
    return (
      <section className="move-like" aria-label="Pausa breve">
        <ProgressPath steps={items.length} current={index} />
        <span className="move-like__emoji" aria-hidden="true">🌬️</span>
        <h2>Respira y estírate</h2>
        <CountdownRing key={`rest-${index}`} seconds={restSeconds} total={restSeconds} paused={paused} onComplete={afterRest} />
      </section>
    )
  }

  return (
    <section className="move-like" aria-label="Muévete como">
      <ProgressPath steps={items.length} current={index} />
      <span className="move-like__emoji" aria-hidden="true">{item.emoji}</span>
      <h2>{item.frase ?? `Muévete como ${item.nombre ?? item.name}.`}</h2>
      {(item.traduccion ?? item.translation) && <p lang="es">{item.traduccion ?? item.translation}</p>}
      <p>{item.movimiento ?? item.movement ?? item.sonido ?? ''}</p>
      <CountdownRing key={index} seconds={seconds} total={seconds} paused={paused} onComplete={next} />
    </section>
  )
}

export default MoveLike
