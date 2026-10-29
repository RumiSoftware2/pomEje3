import './PrepareSpace.css'

const reminders = [
  { icon: '🧹', text: 'Despeja tu espacio' },
  { icon: '👟', text: 'Usa zapatos seguros' },
  { icon: '🧑‍🧑‍🧒', text: 'Pide a un adulto cerca' },
]

function PrepareSpace({ onConfirm }) {
  return (
    <section className="prepare-space" aria-labelledby="prepare-title">
      <span className="prepare-space__emoji" aria-hidden="true">🏡</span>
      <h2 id="prepare-title">¡Prepara tu espacio!</h2>
      <p>Vamos a movernos con cuidado.</p>
      <ul>
        {reminders.map((item) => (
          <li key={item.text}><span aria-hidden="true">{item.icon}</span><span>{item.text}</span></li>
        ))}
      </ul>
      <button className="activity-primary" type="button" onClick={onConfirm}>¡Listo!</button>
    </section>
  )
}

export default PrepareSpace
