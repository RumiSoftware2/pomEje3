import './ProgressPath.css'

function ProgressPath({ steps, current }) {
  return (
    <ol className="progress-path" aria-label={`Paso ${Math.min(current + 1, steps)} de ${steps}`}>
      {Array.from({ length: steps }, (_, index) => (
        <li className={index < current ? 'is-complete' : index === current ? 'is-current' : ''} key={index}>
          <span className="progress-path__dot" aria-hidden="true">{index < current ? '✓' : index + 1}</span>
        </li>
      ))}
    </ol>
  )
}

export default ProgressPath
