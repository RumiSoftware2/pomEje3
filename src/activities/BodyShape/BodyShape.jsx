import { useState } from 'react'
import CountdownRing from '../../components/CountdownRing/CountdownRing.jsx'
import ProgressPath from '../../components/ProgressPath/ProgressPath.jsx'
import ShapeGuide from './ShapeGuide.jsx'
import './BodyShape.css'

const fallbackShapes = [
  { figura: 'círculo', emoji: '⭕', movimiento: 'Haz un aro con tus brazos.' },
  { figura: 'triángulo', emoji: '🔺', movimiento: 'Junta tus manos sobre la cabeza.' },
]

function BodyShape({ data, paused, onComplete }) {
  const shapes = Array.isArray(data) && data.length ? data : fallbackShapes
  const [index, setIndex] = useState(0)
  const shape = shapes[index]
  const figure = shape.figura ?? shape.shape ?? 'círculo'
  const isVowel = /^[aeiou]$/i.test(figure)
  const next = () => index + 1 >= shapes.length ? onComplete() : setIndex(index + 1)

  return (
    <section className="body-shape" aria-label="Forma con tu cuerpo">
      <ProgressPath steps={shapes.length} current={index} />
      <div className="body-shape__figure" aria-label={isVowel ? `Vocal ${figure}` : undefined}>
        <ShapeGuide shape={figure} />
        {!isVowel && <span aria-hidden="true">{shape.emoji}</span>}
      </div>
      <h2>¡Haz esta forma!</h2>
      <p>{shape.movimiento ?? shape.description}</p>
      <div className="body-shape__hold">
        <span>¡Quédate quieto!</span>
        <CountdownRing key={index} seconds={shape.segundos ?? 5} total={shape.segundos ?? 5} paused={paused} onComplete={next} />
      </div>
    </section>
  )
}

export default BodyShape
