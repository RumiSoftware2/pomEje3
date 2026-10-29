const shapePaths = {
  círculo: <circle cx="50" cy="50" r="34" />,
  circle: <circle cx="50" cy="50" r="34" />,
  cuadrado: <rect x="19" y="19" width="62" height="62" />,
  square: <rect x="19" y="19" width="62" height="62" />,
  triángulo: <path d="M50 16 87 82H13L50 16Z" />,
  triangle: <path d="M50 16 87 82H13L50 16Z" />,
  corazón: <path d="M50 83 19 53C-1 29 28 9 50 32 72 9 101 29 81 53L50 83Z" />,
  heart: <path d="M50 83 19 53C-1 29 28 9 50 32 72 9 101 29 81 53L50 83Z" />,
  estrella: <path d="m50 11 12 27 29 3-22 19 7 29-26-16-26 16 7-29L9 41l29-3 12-27Z" />,
  star: <path d="m50 11 12 27 29 3-22 19 7 29-26-16-26 16 7-29L9 41l29-3 12-27Z" />,
  a: <text x="50" y="79" textAnchor="middle">A</text>,
  e: <text x="50" y="79" textAnchor="middle">E</text>,
  i: <text x="50" y="79" textAnchor="middle">I</text>,
  o: <text x="50" y="79" textAnchor="middle">O</text>,
  u: <text x="50" y="79" textAnchor="middle">U</text>,
}

function ShapeGuide({ shape }) {
  return (
    <svg className="shape-guide" viewBox="0 0 100 100" role="img" aria-label={`Figura: ${shape}`}>
      {shapePaths[shape.toLowerCase()] ?? shapePaths.círculo}
    </svg>
  )
}

export default ShapeGuide
