import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SettingsProvider from './context/SettingsProvider.jsx'
import ProgressProvider from './context/ProgressProvider.jsx'
import HomeScreen from './screens/HomeScreen/HomeScreen.jsx'
import SubjectsScreen from './screens/SubjectsScreen/SubjectsScreen.jsx'
import TopicsScreen from './screens/TopicsScreen/TopicsScreen.jsx'
import TopicIntroScreen from './screens/TopicIntroScreen/TopicIntroScreen.jsx'
import ActivityScreen from './screens/ActivityScreen/ActivityScreen.jsx'
import ParentAreaScreen from './screens/ParentAreaScreen/ParentAreaScreen.jsx'
import StickerScreen from './screens/StickerScreen/StickerScreen.jsx'
import useSessionTimer from './hooks/useSessionTimer.js'
import useSpeech from './hooks/useSpeech.js'
import useSound from './hooks/useSound.js'
import useSettings from './hooks/useSettings.js'
import modulesRegistry from './modules/modulesRegistry.js'
import validateModules from './modules/validateModules.js'
import './App.css'

validateModules(modulesRegistry)

function AppRoutes() {
  const { pathname } = useLocation()
  const { settings } = useSettings()
  const { shouldRest, acknowledgeRest } = useSessionTimer(settings.breakMinutes)
  const { callar } = useSpeech()
  const { detenerMusica } = useSound()

  useEffect(() => {
    callar()
    detenerMusica()
  }, [pathname, callar, detenerMusica])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/materias" element={<SubjectsScreen />} />
        <Route path="/materia/:id" element={<TopicsScreen />} />
        <Route path="/materia/:id/tema/:tema" element={<TopicIntroScreen />} />
        <Route path="/materia/:id/tema/:tema/actividad" element={<ActivityScreen />} />
        <Route path="/padres/*" element={<ParentAreaScreen />} />
        <Route path="/pegatinas" element={<StickerScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {shouldRest && (
        <div className="rest-overlay" role="dialog" aria-modal="true" aria-labelledby="rest-title">
          <div className="rest-overlay__card">
            <span aria-hidden="true">💧</span>
            <h2 id="rest-title">¡Hora de tomar agua!</h2>
            <p>Descansemos un poquito juntos.</p>
            <button type="button" onClick={acknowledgeRest}>Ya descansé</button>
          </div>
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <ProgressProvider>
          <AppRoutes />
        </ProgressProvider>
      </SettingsProvider>
    </BrowserRouter>
  )
}

export default App
