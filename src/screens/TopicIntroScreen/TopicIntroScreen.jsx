import { Navigate, useNavigate, useParams } from 'react-router-dom'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame.jsx'
import BigButton from '../../components/BigButton/BigButton.jsx'
import Mascot from '../../components/Mascot/Mascot.jsx'
import useSpeech from '../../hooks/useSpeech.js'
import modulesRegistry from '../../modules/modulesRegistry.js'
import './TopicIntroScreen.css'

function TopicIntroScreen() {
  const { id, tema } = useParams()
  const navigate = useNavigate()
  const subject = modulesRegistry.find((item) => item.id === id)
  const topic = subject?.temas.find((item) => item.id === tema)
  const { hablar, hayVoz } = useSpeech()
  if (!subject || !topic) return <Navigate to="/materias" replace />
  const intro = topic.introduccion[0]

  return (
    <ScreenFrame title={topic.nombre} subtitle="Una aventura para descubrir." backTo={`/materia/${subject.id}`} className="intro-screen">
      <section className="intro-card" style={{ '--subject-color': subject.color, '--subject-shadow': subject.colorSombra }}>
        <Mascot />
        <span className="intro-card__emoji" aria-hidden="true">{intro.emoji}</span>
        <p className="intro-card__phrase" aria-live="polite" lang={intro.idioma?.startsWith('en') ? 'en' : 'es'}>{intro.texto}</p>
        {intro.traduccion && <p className="intro-card__translation" lang="es">{intro.traduccion}</p>}
        <button className="intro-card__listen" type="button" onClick={() => hablar(intro.voz, intro.idioma ?? 'es-CO')}>
          <span aria-hidden="true">🔊</span> {hayVoz ? 'Escuchar a Nimbo' : 'Leer juntos'}
        </button>
        <BigButton icon="▶" onClick={() => navigate(`/materia/${subject.id}/tema/${topic.id}/actividad`)}>¡Vamos!</BigButton>
      </section>
    </ScreenFrame>
  )
}

export default TopicIntroScreen
