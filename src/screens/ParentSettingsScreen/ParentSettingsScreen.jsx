import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenFrame from '../../components/ScreenFrame/ScreenFrame.jsx'
import useSettings from '../../hooks/useSettings.js'
import useProgress from '../../hooks/useProgress.js'
import './ParentSettingsScreen.css'

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="settings-row">
      <div><strong>{title}</strong><p>{description}</p></div>
      <button className="settings-toggle" type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}>
        <span aria-hidden="true" />
      </button>
    </div>
  )
}

function ParentSettingsScreen() {
  const { settings, updateSettings } = useSettings()
  const { progress, resetProgress } = useProgress()
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <ScreenFrame title="Ajustes para adultos" subtitle="Personaliza Miniaventuras para tu familia." backTo="/" className="parent-settings">
      <div className="settings-layout">
        <section className="settings-panel" aria-labelledby="audio-title">
          <h2 id="audio-title">Sonido y voz</h2>
          <label className="settings-volume" htmlFor="volume-setting">
            <span><strong>Volumen</strong><b>{settings.volume}%</b></span>
            <input id="volume-setting" type="range" min="0" max="100" step="5" value={settings.volume} onChange={(event) => updateSettings({ volume: Number(event.target.value) })} />
          </label>
          <ToggleRow title="Voz de Nimbo" description="Escucha las instrucciones." checked={settings.voiceEnabled} onChange={(voiceEnabled) => updateSettings({ voiceEnabled })} />
          <ToggleRow title="Música" description="Acompaña los juegos con música." checked={settings.musicEnabled} onChange={(musicEnabled) => updateSettings({ musicEnabled })} />
        </section>

        <section className="settings-panel" aria-labelledby="profile-title">
          <h2 id="profile-title">Perfil de edad</h2>
          <p className="settings-panel__intro">Elige el nivel para las actividades.</p>
          <div className="settings-choice-group" role="radiogroup" aria-label="Perfil de edad">
            {[{ id: 'pequenos', label: 'Pequeños', range: '3 a 4 años' }, { id: 'grandes', label: 'Grandes', range: '5 a 6 años' }].map((profile) => (
              <button className={`settings-choice${settings.ageProfile === profile.id ? ' is-selected' : ''}`} key={profile.id} type="button" role="radio" aria-checked={settings.ageProfile === profile.id} onClick={() => updateSettings({ ageProfile: profile.id })}>
                <strong>{profile.label}</strong><span>{profile.range}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="settings-panel" aria-labelledby="activity-settings-title">
          <h2 id="activity-settings-title">Preferencias de juego</h2>
          <label className="settings-select" htmlFor="count-mode">Modo de conteo</label>
          <select id="count-mode" value={settings.countMode} onChange={(event) => updateSettings({ countMode: event.target.value })}>
            <option value="nimbo">Contar con Nimbo</option>
            <option value="tocar">Contar tocando</option>
          </select>
          <label className="settings-select" htmlFor="break-time">Pausa después de</label>
          <select id="break-time" value={settings.breakMinutes} onChange={(event) => updateSettings({ breakMinutes: Number(event.target.value) })}>
            <option value="10">10 minutos</option>
            <option value="15">15 minutos</option>
            <option value="20">20 minutos</option>
            <option value="0">Desactivada</option>
          </select>
          <label className="settings-text" htmlFor="child-name">Nombre para saludar (opcional)</label>
          <input id="child-name" type="text" maxLength="24" value={settings.childName} onChange={(event) => updateSettings({ childName: event.target.value })} placeholder="¿Cómo se llama el niño?" />
        </section>

        <section className="settings-panel settings-panel--progress" aria-labelledby="progress-title">
          <h2 id="progress-title">Progreso y pegatinas</h2>
          <p>Tienes {progress.stars} estrellas y {progress.stickers.length} pegatinas.</p>
          <Link className="settings-link" to="/pegatinas">Ver álbum de pegatinas <span aria-hidden="true">→</span></Link>
          <div className="settings-reset">
            <strong>Reiniciar el progreso</strong>
            <p>Se borrarán las estrellas, temas y pegatinas.</p>
            {confirmReset ? (
              <div className="settings-reset__confirm">
                <button type="button" onClick={() => { resetProgress(); setConfirmReset(false) }}>Sí, reiniciar todo</button>
                <button type="button" onClick={() => setConfirmReset(false)}>Cancelar</button>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirmReset(true)}>Continuar con el reinicio</button>
            )}
          </div>
        </section>

        <section className="settings-panel settings-panel--about" aria-labelledby="about-title">
          <h2 id="about-title">Acerca de Miniaventuras</h2>
          <p>Versión 0.1.0 · Proyecto académico</p>
          <p>Fundación Universitaria del Área Andina</p>
          <p>Cátedra Pablo Oliveros Marmolejo</p>
          <p className="settings-note">Las actividades usan voz del dispositivo. Aún no hay pistas de audio propias.</p>
        </section>
      </div>
    </ScreenFrame>
  )
}

export default ParentSettingsScreen
