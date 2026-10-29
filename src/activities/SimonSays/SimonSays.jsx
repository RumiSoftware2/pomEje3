import { useEffect, useState } from 'react'
import CountdownRing from '../../components/CountdownRing/CountdownRing.jsx'
import ProgressPath from '../../components/ProgressPath/ProgressPath.jsx'
import useSpeech from '../../hooks/useSpeech.js'
import './SimonSays.css'

const fallbackInstructions = [
  { texto: '¡Toca tu cabeza!', icono: '🙆', idioma: 'es-CO' },
  { texto: '¡Abraza tus hombros!', icono: '🫂', idioma: 'es-CO' },
  { texto: '¡Mueve tus codos!', icono: '💪', idioma: 'es-CO' },
]

function SimonSays({ data, paused, onComplete }) {
  const instructions = Array.isArray(data?.instrucciones)
    ? data.instrucciones
    : Array.isArray(data) && data.length ? data : fallbackInstructions
  const duration = data?.segundosPorInstruccion ?? data?.secondsPerInstruction ?? 6
  const [index, setIndex] = useState(0)
  const instruction = instructions[index]
  const text = typeof instruction === 'string' ? instruction : instruction.texto ?? instruction.text
  const icon = typeof instruction === 'string' ? '🌟' : instruction.icono ?? instruction.emoji ?? '🌟'
  const language = typeof instruction === 'string' ? 'es-CO' : instruction.idioma ?? instruction.language ?? 'es-CO'
  const { hablar } = useSpeech()

  useEffect(() => {
    const translation = typeof instruction === 'string' ? '' : instruction.traduccion
    hablar(text, language, translation ? () => hablar(translation, 'es-CO') : undefined)
  }, [hablar, index, instruction, language, text])
  const next = () => index + 1 >= instructions.length ? onComplete() : setIndex(index + 1)

  return (
    <section className="simon-says" aria-label="Nimbo dice">
      <ProgressPath steps={instructions.length} current={index} />
      <span className="simon-says__icon" aria-hidden="true">{icon}</span>
      <p className="simon-says__instruction" aria-live="polite" lang={language.startsWith('en') ? 'en' : 'es'}>{text}</p>
      {typeof instruction !== 'string' && instruction.traduccion && <p className="simon-says__translation" lang="es">{instruction.traduccion}</p>}
      <CountdownRing key={index} seconds={duration} total={duration} paused={paused} onComplete={next} />
    </section>
  )
}

export default SimonSays
