import './StarCounter.css'

function StarCounter({ total }) {
  return (
    <div className="star-counter" aria-label={`${total} estrellas`}>
      <span aria-hidden="true">★</span>
      <strong>{total}</strong>
    </div>
  )
}

export default StarCounter
