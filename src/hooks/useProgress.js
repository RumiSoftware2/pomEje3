import { useContext } from 'react'
import ProgressContext from '../context/ProgressContext.js'

export default function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress debe usarse dentro de ProgressProvider')
  return context
}
