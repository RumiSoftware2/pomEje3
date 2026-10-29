import SettingsContext from './SettingsContext.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

const DEFAULT_SETTINGS = {
  volume: 70,
  voiceEnabled: true,
  musicEnabled: true,
  ageProfile: 'pequenos',
  countMode: 'nimbo',
  breakMinutes: 15,
  childName: '',
}

function SettingsProvider({ children }) {
  const [storedSettings, saveSettings] = useLocalStorage('ajustes', DEFAULT_SETTINGS)
  const settings = { ...DEFAULT_SETTINGS, ...storedSettings }
  const updateSettings = (changes) => saveSettings((current) => ({ ...DEFAULT_SETTINGS, ...current, ...changes }))

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
