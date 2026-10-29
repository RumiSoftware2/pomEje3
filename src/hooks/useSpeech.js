import { useCallback, useEffect, useRef, useState } from 'react'
import useSettings from './useSettings.js'

const SPANISH_VOICES = ['es-CO', 'es-419', 'es-MX', 'es-US', 'es-ES']

export default function useSpeech() {
  const { settings } = useSettings()
  const [estaHablando, setEstaHablando] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [hayVoz, setHayVoz] = useState(supported)
  const completionRef = useRef(null)

  useEffect(() => {
    if (!supported) return undefined
    const synth = window.speechSynthesis
    const update = () => setHayVoz(synth.getVoices().length > 0)
    update()
    synth.addEventListener('voiceschanged', update)
    return () => synth.removeEventListener('voiceschanged', update)
  }, [supported])

  const callar = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setEstaHablando(false)
  }, [])

  const hablar = useCallback((texto, idioma = 'es-CO', alTerminar) => {
    completionRef.current = alTerminar
    if (!settings.voiceEnabled || !('speechSynthesis' in window)) return false
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(texto)
    const voices = synth.getVoices()
    if (voices.length === 0) {
      setHayVoz(false)
      return false
    }
    const preferred = idioma.startsWith('en')
      ? ['en-US']
      : SPANISH_VOICES
    const selectedVoice = preferred.map((language) => voices.find((voice) => voice.lang.toLowerCase() === language.toLowerCase())).find(Boolean)
    if (!selectedVoice) return false
    utterance.voice = selectedVoice
    utterance.lang = selectedVoice.lang
    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.onstart = () => setEstaHablando(true)
    utterance.onend = () => {
      setEstaHablando(false)
      completionRef.current?.()
    }
    utterance.onerror = () => setEstaHablando(false)
    synth.cancel()
    synth.speak(utterance)
    return true
  }, [settings.voiceEnabled])

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  return { hablar, callar, estaHablando, hayVoz: hayVoz && settings.voiceEnabled }
}
