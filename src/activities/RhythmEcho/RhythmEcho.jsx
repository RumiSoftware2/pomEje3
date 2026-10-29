import { useEffect, useMemo, useState } from 'react'
import CountdownRing from '../../components/CountdownRing/CountdownRing.jsx'
import ProgressPath from '../../components/ProgressPath/ProgressPath.jsx'
import useSpeech from '../../hooks/useSpeech.js'
import useSound from '../../hooks/useSound.js'
import './RhythmEcho.css'

const fallbackPatterns = [
  { texto: 'Palma, palma, pausa', tiempos: ['corto', 'corto', 'largo'] },
  { texto: 'Palma, pausa, palma', tiempos: ['corto', 'largo', 'corto'] },
]

function RhythmEcho({ data, paused, onComplete }) {
  const patterns = Array.isArray(data?.patrones)
    ? data.patrones
    : Array.isArray(data?.patterns) ? data.patterns
      : Array.isArray(data) && data.length ? data : fallbackPatterns
  const [index, setIndex] = useState(0)
  const [turn, setTurn] = useState('nimbo')
  const pattern = patterns[index]
  const text = pattern.texto ?? pattern.palabra ?? pattern.word ?? 'Escucha el ritmo'
  const beats = useMemo(() => pattern.tiempos ?? pattern.secuencia ?? pattern.beats ?? ['corto', 'corto', 'largo'], [pattern])
  const { hablar } = useSpeech()
  const { reproducir } = useSound()
  const beatLength = Number(data?.tempo ?? pattern.tempo ?? 1.1)
  const patternSeconds = beats.reduce((sum, beat) => sum + (beat === 'largo' || beat === 'long' ? beatLength : beatLength * 0.58), 0)

  useEffect(() => {
    hablar(turn === 'nimbo' ? '¡Escucha!' : '¡Ahora tú!', 'es-CO')
  }, [hablar, index, turn])

  useEffect(() => {
    if (paused) return undefined
    let offset = 350
    const timers = beats.map((beat) => {
      const timeout = window.setTimeout(() => reproducir('tap'), offset)
      offset += (beat === 'largo' || beat === 'long' ? beatLength : beatLength * 0.58) * 1000
      return timeout
    })
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [beatLength, beats, index, paused, reproducir, turn])

  const next = () => {
    if (turn === 'nimbo') setTurn('tu-turno')
    else if (index + 1 >= patterns.length) onComplete()
    else {
      setIndex(index + 1)
      setTurn('nimbo')
    }
  }

  return (
    <section className="rhythm-echo" aria-label="Repite el ritmo">
      <ProgressPath steps={patterns.length} current={index} />
      <p className="rhythm-echo__turn" aria-live="polite">{turn === 'nimbo' ? '¡Escucha!' : '¡Ahora tú!'}</p>
      <h2>{text}</h2>
      <div className="rhythm-echo__beats" aria-label="Patrón de ritmo">
        {beats.map((beat, beatIndex) => (
          <span className={`rhythm-echo__beat rhythm-echo__beat--${beat}`} style={{ '--beat-index': beatIndex }} key={`${beat}-${beatIndex}`}>
            {beat === 'largo' || beat === 'long' ? '—' : '●'}
          </span>
        ))}
      </div>
      <p className="rhythm-echo__hint">{turn === 'nimbo' ? 'Escucha y mira las palmas.' : 'Aplaude o pisa al ritmo.'}</p>
      <CountdownRing key={`${index}-${turn}`} seconds={Math.max(4, patternSeconds + 0.5)} total={Math.max(4, patternSeconds + 0.5)} paused={paused} onComplete={next} />
    </section>
  )
}

export default RhythmEcho
