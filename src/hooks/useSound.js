import { useCallback, useRef } from 'react'
import useSettings from './useSettings.js'

const SOUND_FILES = {}

export default function useSound() {
  const { settings } = useSettings()
  const musicRef = useRef(null)

  const reproducir = useCallback((name) => {
    if (!settings.volume) return
    const source = SOUND_FILES[name]
    if (!source) return
    const audio = new Audio(source)
    audio.volume = settings.volume / 100
    audio.play().catch(() => {})
  }, [settings.volume])

  const reproducirMusica = useCallback((name) => {
    if (!settings.volume || !settings.musicEnabled) return
    const source = SOUND_FILES[name]
    if (!source) return
    musicRef.current?.pause()
    musicRef.current = new Audio(source)
    musicRef.current.loop = true
    musicRef.current.volume = settings.volume / 100
    musicRef.current.play().catch(() => {})
  }, [settings.musicEnabled, settings.volume])

  const detenerMusica = useCallback(() => {
    musicRef.current?.pause()
    musicRef.current = null
  }, [])

  return { reproducir, reproducirMusica, detenerMusica }
}
