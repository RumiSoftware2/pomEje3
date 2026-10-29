import { useEffect, useState } from 'react'
import CountdownRing from '../../components/CountdownRing/CountdownRing.jsx'
import ProgressPath from '../../components/ProgressPath/ProgressPath.jsx'
import useSpeech from '../../hooks/useSpeech.js'
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
  const beats = pattern.tiempos ?? pattern.secuencia ?? pattern.beats ?? ['corto', 'corto', 'largo']
  const { hablar } = useSpeech()

  useEffect(() => {
    hablar(turn === 'nimbo' ? '¡Escucha!' : '¡Ahora tú!', 'es-CO')
  }, [hablar, index, turn])

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
      <CountdownRing key={`${index}-${turn}`} seconds={Math.max(4, beats.length * (turn === 'nimbo' ? 1.5 : 1.1))} total={Math.max(4, beats.length * 1.5)} paused={paused} onComplete={next} />
    </section>
  )
}

export default RhythmEcho
