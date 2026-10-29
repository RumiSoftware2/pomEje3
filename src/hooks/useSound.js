import { useCallback } from 'react'
import useSettings from './useSettings.js'

const SOUND_FILES = {
  tap: '/audio/efectos/tap.wav',
  'success-small': '/audio/efectos/success-small.wav',
  star: '/audio/efectos/star.wav',
  celebration: '/audio/efectos/celebration.wav',
  'countdown-tick': '/audio/efectos/countdown-tick.wav',
  ya: '/audio/efectos/ya.wav',
  transition: '/audio/efectos/transition.wav',
  ice: '/audio/efectos/ice.wav',
  applause: '/audio/efectos/applause.wav',
  'error-soft': '/audio/efectos/error-soft.wav',
  rest: '/audio/efectos/rest.wav',
}

const MUSIC_FILES = {
  'musica-suave-1': '/audio/musica/musica-suave-1.wav',
  'musica-suave-2': '/audio/musica/musica-suave-2.wav',
  'musica-suave-3': '/audio/musica/musica-suave-3.wav',
}

let activeMusic = null
const effectAudio = new Map()

function useSound() {
  const { settings } = useSettings()
  const getEffect = useCallback((name) => {
    const source = SOUND_FILES[name]
    if (!source) return null
    if (!effectAudio.has(name)) {
      const audio = new Audio(source)
      audio.preload = 'auto'
      effectAudio.set(name, audio)
    }
    return effectAudio.get(name)
  }, [])

  const precargarEfectos = useCallback(() => {
    Object.keys(SOUND_FILES).forEach(getEffect)
  }, [getEffect])

  const reproducir = useCallback((name) => {
    if (!settings.volume) return
    const audio = getEffect(name)
    if (!audio) return
    audio.volume = settings.volume / 100
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [getEffect, settings.volume])

  const reproducirMusica = useCallback((name) => {
    if (!settings.volume || !settings.musicEnabled) return
    const source = MUSIC_FILES[name] ?? MUSIC_FILES['musica-suave-1']
    if (activeMusic?.src.endsWith(source)) {
      activeMusic.volume = settings.volume / 100
      if (activeMusic.paused) activeMusic.play().catch(() => {})
      return
    }
    activeMusic?.pause()
    activeMusic = new Audio(source)
    activeMusic.preload = 'auto'
    activeMusic.loop = true
    activeMusic.volume = settings.volume / 100
    activeMusic.play().catch(() => {})
  }, [settings.musicEnabled, settings.volume])

  const detenerMusica = useCallback(() => {
    activeMusic?.pause()
    activeMusic = null
  }, [])

  return { reproducir, reproducirMusica, detenerMusica, precargarEfectos }
}

export default useSound
