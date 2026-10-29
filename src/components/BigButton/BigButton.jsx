import './BigButton.css'

function BigButton({ children, icon, onClick }) {
  return (
    <button className="big-button" type="button" onClick={onClick}>
      <span className="big-button__icon" aria-hidden="true">{icon}</span>
      <span>{children}</span>
      <span className="big-button__arrow" aria-hidden="true">→</span>
    </button>
  )
}

export default BigButton
