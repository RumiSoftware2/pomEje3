import { useNavigate } from 'react-router-dom'
import './BackButton.css'

function BackButton({ to }) {
  const navigate = useNavigate()
  return (
    <button className="back-button" type="button" onClick={() => navigate(to)}>
      <span aria-hidden="true">←</span> Volver
    </button>
  )
}

export default BackButton
