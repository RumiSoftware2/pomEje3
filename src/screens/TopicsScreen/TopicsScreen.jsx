import { Navigate, Link, useParams } from 'react-router-dom'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame.jsx'
import useProgress from '../../hooks/useProgress.js'
import modulesRegistry from '../../modules/modulesRegistry.js'
import './TopicsScreen.css'

function TopicsScreen() {
  const { id } = useParams()
  const subject = modulesRegistry.find((item) => item.id === id)
  const { isCompletedToday } = useProgress()
  if (!subject) return <Navigate to="/materias" replace />

  return (
    <ScreenFrame
      title={subject.nombre}
      subtitle={subject.descripcionVoz}
      backTo="/materias"
      className="topics-screen"
      style={{ '--subject-color': subject.color, '--subject-shadow': subject.colorSombra }}
    >
      <div className="topic-grid" style={{ '--subject-color': subject.color, '--subject-shadow': subject.colorSombra }}>
        {subject.temas.map((topic) => (
          <Link className="topic-card" key={topic.id} to={`/materia/${subject.id}/tema/${topic.id}`}>
            <span className="topic-card__icon" aria-hidden="true">{topic.icono}</span>
            <strong>{topic.nombre}</strong>
            <span className="topic-card__meta">{isCompletedToday(subject.id, topic.id) ? '✓ Hecho hoy' : 'Descubrir'}</span>
          </Link>
        ))}
      </div>
    </ScreenFrame>
  )
}

export default TopicsScreen
