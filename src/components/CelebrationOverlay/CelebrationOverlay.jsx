import './CelebrationOverlay.css'

function CelebrationOverlay({ message = '¡Lo lograste! ¡Bravo!', onAgain, onContinue }) {
  return (
    <section className="celebration" aria-labelledby="celebration-title" role="dialog" aria-modal="true">
      <span className="celebration__stars" aria-hidden="true">✨⭐✨</span>
      <h2 id="celebration-title">{message}</h2>
      <p>¡Ganaste una estrella!</p>
      <div className="celebration__actions">
        <button className="celebration__again" type="button" onClick={onAgain}>Otra vez</button>
        <button className="celebration__continue" type="button" onClick={onContinue}>Seguir</button>
      </div>
    </section>
  )
}

export default CelebrationOverlay
