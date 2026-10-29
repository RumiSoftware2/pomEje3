import { useCallback, useState } from 'react'

const PREFIX = 'miniaventuras:'

function readValue(key, fallback) {
  try {
    const saved = window.localStorage.getItem(`${PREFIX}${key}`)
    return saved === null ? fallback : JSON.parse(saved)
  } catch {
    return fallback
  }
}

export default function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => readValue(key, fallback))

  const updateValue = useCallback((nextValue) => {
    setValue((current) => {
      const resolved = typeof nextValue === 'function' ? nextValue(current) : nextValue
      try {
        window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(resolved))
      } catch {
        // Si el almacenamiento está lleno, el estado sigue disponible en memoria.
      }
      return resolved
    })
  }, [key])

  return [value, updateValue]
}
