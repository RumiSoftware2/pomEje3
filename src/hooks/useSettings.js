import { useContext } from 'react'
import SettingsContext from '../context/SettingsContext.js'

export default function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings debe usarse dentro de SettingsProvider')
  return context
}
