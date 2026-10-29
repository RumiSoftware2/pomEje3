import { Link } from 'react-router-dom'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame.jsx'
import modulesRegistry from '../../modules/modulesRegistry.js'
import './SubjectsScreen.css'

function SubjectsScreen() {
  return (
    <ScreenFrame title="¿Qué quieres descubrir?" subtitle="Elige una aventura para comenzar." backTo="/">
      <div className="subject-grid">
        {modulesRegistry.map((subject) => (
          <Link
            className="subject-card"
            key={subject.id}
            to={`/materia/${subject.id}`}
            style={{ '--subject-color': subject.color, '--subject-shadow': subject.colorSombra }}
          >
            <span className="subject-card__icon" aria-hidden="true">{subject.icono}</span>
            <strong>{subject.nombre}</strong>
            <span className="subject-card__arrow" aria-hidden="true">→</span>
          </Link>
        ))}
        <div className="subject-coming" aria-label="Más aventuras próximamente">
          <span aria-hidden="true">✨</span><strong>Más aventuras</strong><span>Muy pronto</span>
        </div>
      </div>
    </ScreenFrame>
  )
}

export default SubjectsScreen
