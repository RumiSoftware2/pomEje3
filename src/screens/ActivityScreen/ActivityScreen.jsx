import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AppHeader from '../../components/AppHeader/AppHeader.jsx'
import CountdownRing from '../../components/CountdownRing/CountdownRing.jsx'
import PrepareSpace from '../../components/PrepareSpace/PrepareSpace.jsx'
import CelebrationOverlay from '../../components/CelebrationOverlay/CelebrationOverlay.jsx'
import modulesRegistry from '../../modules/modulesRegistry.js'
import activityRegistry from '../../activities/activityRegistry.js'
import useProgress from '../../hooks/useProgress.js'
import useSettings from '../../hooks/useSettings.js'
import useSpeech from '../../hooks/useSpeech.js'
import useSound from '../../hooks/useSound.js'
import ScreenLayout from '../../components/ScreenLayout/ScreenLayout.jsx'
import './ActivityScreen.css'

function ActivityScreen() {
  const { id, tema } = useParams()
  const navigate = useNavigate()
  const subject = modulesRegistry.find((item) => item.id === id)
  const topic = subject?.temas.find((item) => item.id === tema)
  const subjectId = subject?.id
  const topicId = topic?.id
  const { completeActivity } = useProgress()
  const { settings } = useSettings()
  const { callar } = useSpeech()
  const { detenerMusica } = useSound()
  const [stage, setStage] = useState('prepare')
  const [paused, setPaused] = useState(false)
  const [confirmExit, setConfirmExit] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const completedRef = useRef(false)
  const pausedBeforeExit = useRef(false)

  const startActivity = useCallback(() => setStage('active'), [])

  useEffect(() => {
    if (paused || stage !== 'active') {
      callar()
      if (paused) detenerMusica()
    }
  }, [callar, detenerMusica, paused, stage])

  const finishActivity = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    completeActivity(subjectId, topicId)
    setStage('complete')
  }, [completeActivity, subjectId, topicId])

  if (!subject || !topic || !topic.actividad) return <Navigate to="/materias" replace />
  const Activity = activityRegistry[topic.actividad.tipo]
  if (!Activity) return <Navigate to={`/materia/${subject.id}`} replace />
  const data = topic.actividad.datos?.[settings.ageProfile]
  const exitToTopic = () => navigate(`/materia/${subject.id}`)
  const requestExit = () => {
    pausedBeforeExit.current = paused
    setPaused(true)
    setConfirmExit(true)
  }
  const cancelExit = () => {
    setConfirmExit(false)
    setPaused(pausedBeforeExit.current)
  }

  const replay = () => {
    completedRef.current = false
    setPaused(false)
    setAttempt((current) => current + 1)
    setStage('prepare')
  }

  return (
    <ScreenLayout>
      <div className="activity-screen">
        <AppHeader />
      <main className="activity-screen__main">
        <div className="activity-screen__topline">
          <div><span>{subject.nombre}</span><span aria-hidden="true">›</span><strong>{topic.nombre}</strong></div>
          <div className="activity-screen__controls">
            {stage === 'active' && (
              <button className="activity-screen__pause" type="button" onClick={() => setPaused((value) => !value)}>
                {paused ? '▶ Seguir' : 'Ⅱ Pausa'}
              </button>
            )}
            {stage !== 'complete' && <button className="activity-screen__exit" type="button" onClick={requestExit}>Salir</button>}
          </div>
        </div>

        {stage === 'prepare' && <PrepareSpace onConfirm={() => setStage('countdown')} />}
        {stage === 'countdown' && (
          <section className="activity-count-in" aria-live="polite" aria-label="La actividad comienza pronto">
            <p>¡A tu puesto!</p>
            <CountdownRing seconds={3} total={3} paused={paused} onComplete={startActivity} />
          </section>
        )}
        {stage === 'active' && (
          <section className={`activity-board${paused ? ' is-paused' : ''}`} aria-label={topic.nombre}>
            <Activity key={`${topic.id}-${attempt}`} data={data} countMode={settings.countMode} paused={paused} onComplete={finishActivity} />
            {paused && (
              <div className="activity-paused" role="dialog" aria-modal="true" aria-label="Actividad en pausa">
                <span aria-hidden="true">⏸️</span><strong>Tomemos una pausa</strong>
                <button type="button" onClick={() => setPaused(false)}>Seguir jugando</button>
              </div>
            )}
          </section>
        )}
      </main>

      {confirmExit && (
        <div className="activity-confirm" role="dialog" aria-modal="true" aria-labelledby="exit-title">
          <div className="activity-confirm__card">
            <span aria-hidden="true">👋</span>
            <h2 id="exit-title">¿Seguro que quieres salir?</h2>
            <p>Podemos volver a jugar después.</p>
            <div>
              <button type="button" onClick={cancelExit}>Seguir jugando</button>
              <button type="button" onClick={exitToTopic}>Sí, salir</button>
            </div>
          </div>
        </div>
      )}

        {stage === 'complete' && (
          <CelebrationOverlay onAgain={replay} onContinue={exitToTopic} />
        )}
      </div>
    </ScreenLayout>
  )
}

export default ActivityScreen
