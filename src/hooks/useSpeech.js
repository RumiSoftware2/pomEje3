import { useCallback, useEffect, useRef, useState } from 'react'
import useSettings from './useSettings.js'

const SPANISH_VOICES = ['es-CO', 'es-419', 'es-MX', 'es-US', 'es-ES']

function normalizeLanguage(language = '') {
  return language.replaceAll('_', '-').toLowerCase()
}

function selectVoice(voices, language) {
  const requestedLanguage = normalizeLanguage(language)
  const preferredLanguages = requestedLanguage.startsWith('en')
    ? ['en-US', 'en']
    : SPANISH_VOICES

  for (const preferredLanguage of preferredLanguages) {
    const normalizedPreferred = normalizeLanguage(preferredLanguage)
    const exactMatch = voices.find((voice) => normalizeLanguage(voice.lang) === normalizedPreferred)
    if (exactMatch) return exactMatch
  }

  const languagePrefix = requestedLanguage.split('-')[0]
  return voices.find((voice) => normalizeLanguage(voice.lang).split('-')[0] === languagePrefix)
}

export default function useSpeech() {
  const { settings } = useSettings()
  const [estaHablando, setEstaHablando] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [hayVoz, setHayVoz] = useState(supported)
  const completionRef = useRef(null)

  useEffect(() => {
    if (!supported) return undefined
    const synth = window.speechSynthesis
    const update = () => setHayVoz(true)
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
    const utterance = new window.SpeechSynthesisUtterance(texto)
    const voices = synth.getVoices()
    const selectedVoice = selectVoice(voices, idioma)
    // Some mobile browsers load their voices late or only expose a system default.
    // Leaving voice unset lets the device choose its default instead of silencing Nimbo.
    if (selectedVoice) utterance.voice = selectedVoice
    utterance.lang = selectedVoice?.lang ?? idioma
    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.onstart = () => setEstaHablando(true)
    utterance.onend = () => {
      setEstaHablando(false)
      completionRef.current?.()
    }
    utterance.onerror = () => {
      setEstaHablando(false)
      setHayVoz(false)
    }
    // Avoid cancel() on the first utterance: some mobile speech engines can
    // discard the next speak() call when cancel is invoked on an idle queue.
    if (synth.speaking || synth.pending) synth.cancel()
    synth.speak(utterance)
    return true
  }, [settings.voiceEnabled])

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  return { hablar, callar, estaHablando, hayVoz: hayVoz && settings.voiceEnabled }
}
