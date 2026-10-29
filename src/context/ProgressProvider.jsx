import ProgressContext from './ProgressContext.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

const EMPTY_PROGRESS = { stars: 0, completedTopics: {}, stickers: [] }
const normalizeProgress = (value) => ({
  stars: Number.isFinite(value?.stars) ? value.stars : 0,
  completedTopics: value?.completedTopics && typeof value.completedTopics === 'object' ? value.completedTopics : {},
  stickers: Array.isArray(value?.stickers) ? value.stickers : [],
})
const getLocalDate = () => {
  const date = new Date()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function ProgressProvider({ children }) {
  const [storedProgress, saveProgress] = useLocalStorage('progreso', EMPTY_PROGRESS)
  const progress = normalizeProgress(storedProgress)

  const completeActivity = (subjectId, topicId) => saveProgress((stored) => {
    const current = normalizeProgress(stored)
    const stars = current.stars + 1
    const stickerCount = Math.floor(stars / 5)
    const stickers = Array.from({ length: stickerCount }, (_, index) => `pegatina-${index + 1}`)
    const topicKey = `${subjectId}/${topicId}`
    return {
      stars,
      completedTopics: { ...current.completedTopics, [topicKey]: getLocalDate() },
      stickers,
    }
  })

  const isCompletedToday = (subjectId, topicId) => {
    const topicKey = `${subjectId}/${topicId}`
    return progress.completedTopics[topicKey] === getLocalDate()
  }

  const resetProgress = () => saveProgress({ ...EMPTY_PROGRESS })

  return (
    <ProgressContext.Provider value={{ progress, completeActivity, isCompletedToday, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}

export default ProgressProvider
