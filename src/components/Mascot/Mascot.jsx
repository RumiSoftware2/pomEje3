import './Mascot.css'

function Mascot({ estado = 'reposo', frase, tamano = 'normal' }) {
  return (
    <svg className={`mascot mascot--${estado} mascot--${tamano}`} viewBox="0 0 300 250" role="img" aria-labelledby="mascot-title">
      <title id="mascot-title">Nimbo, una nube sonriente</title>
      {frase && (
        <g className="mascot__bubble" aria-hidden="true">
          <rect x="54" y="5" width="192" height="34" rx="17" />
          <text x="150" y="28">{frase}</text>
        </g>
      )}
      <ellipse cx="150" cy="213" rx="77" ry="12" fill="#5B4B6B" opacity=".08" />
      <path d="M73 171c-28 0-47-18-47-43 0-23 18-41 42-43 5-31 31-53 63-53 29 0 53 17 62 43 27-2 49 17 49 43 0 29-21 53-52 53H73Z" fill="#fff" stroke="#8EC3EE" strokeWidth="8" strokeLinejoin="round" />
      {estado === 'durmiendo' ? (
        <path d="M98 110q10 9 20 0m56 0q10 9 20 0" fill="none" stroke="#5B4B6B" strokeWidth="5" strokeLinecap="round" />
      ) : (
        <path className="mascot__eyes" d="M117 110c0 6-4 10-9 10s-9-4-9-10 4-10 9-10 9 4 9 10Zm76 0c0 6-4 10-9 10s-9-4-9-10 4-10 9-10 9 4 9 10Z" fill="#5B4B6B" />
      )}
      <ellipse cx="82" cy="133" rx="13" ry="8" fill="#FFC8DD" />
      <ellipse cx="210" cy="133" rx="13" ry="8" fill="#FFC8DD" />
      {estado === 'celebrando' ? (
        <path d="M132 128c4-9 26-9 31 0 0 17-7 23-15 23s-16-6-16-23Z" fill="#F2A0BE" stroke="#5B4B6B" strokeWidth="4" />
      ) : (
        <path className="mascot__mouth" d={estado === 'pensando' ? 'M138 138h18' : estado === 'hablando' ? 'M137 130q15-2 28 8-13 13-28 0Z' : 'M132 132c8 12 22 12 31 0'} fill={estado === 'hablando' ? '#F2A0BE' : 'none'} stroke="#5B4B6B" strokeWidth="5" strokeLinecap="round" />
      )}
      <path className="mascot__arms" d={estado === 'celebrando' || estado === 'animando' ? 'M66 166c-21 2-24-17-31-25m199 25c21 2 24-17 31-25' : 'M66 166c-8 12-14 17-22 20m190-20c8 12 14 17 22 20'} fill="none" stroke="#8EC3EE" strokeWidth="8" strokeLinecap="round" />
      <path d="m62 57 5-11m-8 15-12-1m180-1 12-6" fill="none" stroke="#F0D96B" strokeWidth="5" strokeLinecap="round" />
      {estado === 'pensando' && <text className="mascot__thought" x="223" y="56">···</text>}
      {estado === 'celebrando' && <text className="mascot__thought" x="224" y="70">✦</text>}
    </svg>
  )
}

export default Mascot
