import './BigButton.css'
import useSound from '../../hooks/useSound.js'

function BigButton({ children, icon, onClick }) {
  const { reproducir } = useSound()
  const handleClick = (event) => {
    reproducir('tap')
    onClick?.(event)
  }
  return (
    <button className="big-button" type="button" onClick={handleClick}>
      <span className="big-button__icon" aria-hidden="true">{icon}</span>
      <span>{children}</span>
      <span className="big-button__arrow" aria-hidden="true">→</span>
    </button>
  )
}

export default BigButton
