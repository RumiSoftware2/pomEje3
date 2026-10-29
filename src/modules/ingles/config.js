const ingles = {
  id: 'ingles',
  nombre: 'Inglés',
  icono: '🌎',
  color: 'var(--color-amarillo)',
  colorSombra: 'var(--color-amarillo-sombra)',
  descripcionVoz: '¡Aprende inglés jugando!',
  temas: [
    {
      id: 'colores', nombre: 'Colors', icono: '🎨',
      introduccion: [{ texto: '¡Aprendamos colores en inglés!', emoji: '🌈', voz: '¡Aprendamos colores en inglés!' }],
      actividad: {
        tipo: 'SimonSays',
        datos: {
          pequenos: [
            { texto: 'Touch something red!', traduccion: '¡Toca algo rojo!', icono: '🔴', idioma: 'en-US' },
            { texto: 'Touch something blue!', traduccion: '¡Toca algo azul!', icono: '🔵', idioma: 'en-US' },
            { texto: 'Touch something yellow!', traduccion: '¡Toca algo amarillo!', icono: '🟡', idioma: 'en-US' },
          ],
          grandes: [
            { texto: 'Touch something red!', traduccion: '¡Toca algo rojo!', icono: '🔴', idioma: 'en-US' },
            { texto: 'Touch something blue!', traduccion: '¡Toca algo azul!', icono: '🔵', idioma: 'en-US' },
            { texto: 'Touch something yellow!', traduccion: '¡Toca algo amarillo!', icono: '🟡', idioma: 'en-US' },
            { texto: 'Touch something green!', traduccion: '¡Toca algo verde!', icono: '🟢', idioma: 'en-US' },
            { texto: 'Touch something pink!', traduccion: '¡Toca algo rosado!', icono: '🩷', idioma: 'en-US' },
            { texto: 'Touch something orange!', traduccion: '¡Toca algo naranja!', icono: '🟠', idioma: 'en-US' },
          ],
        },
      },
    },
    {
      id: 'animales', nombre: 'Animals', icono: '🐸',
      introduccion: [{ texto: '¡Muévete como un animal!', emoji: '🐾', voz: 'Move like an animal!', idioma: 'en-US' }],
      actividad: {
        tipo: 'MoveLike',
        datos: {
          pequenos: { segundosPorElemento: 10, descanso: 3, modo: 'unoAUno', items: [
            { nombre: 'frog', emoji: '🐸', frase: 'Jump like a frog!', traduccion: '¡Salta como una rana!', idioma: 'en-US', movimiento: 'Da saltos pequeños.' },
            { nombre: 'bird', emoji: '🐦', frase: 'Fly like a bird!', traduccion: '¡Vuela como un pájaro!', idioma: 'en-US', movimiento: 'Mueve tus brazos como alas.' },
            { nombre: 'elephant', emoji: '🐘', frase: 'Walk like an elephant!', traduccion: '¡Camina como un elefante!', idioma: 'en-US', movimiento: 'Da pasos pesados.' },
            { nombre: 'dog', emoji: '🐕', frase: 'Run like a dog!', traduccion: '¡Corre como un perro!', idioma: 'en-US', movimiento: 'Marcha en el mismo lugar.' },
          ] },
          grandes: { segundosPorElemento: 10, descanso: 3, modo: 'circuito', items: [
            { nombre: 'frog', emoji: '🐸', frase: 'Jump like a frog!', traduccion: '¡Salta como una rana!', idioma: 'en-US', movimiento: 'Da saltos pequeños.' },
            { nombre: 'bird', emoji: '🐦', frase: 'Fly like a bird!', traduccion: '¡Vuela como un pájaro!', idioma: 'en-US', movimiento: 'Mueve tus brazos como alas.' },
            { nombre: 'elephant', emoji: '🐘', frase: 'Walk like an elephant!', traduccion: '¡Camina como un elefante!', idioma: 'en-US', movimiento: 'Da pasos pesados.' },
            { nombre: 'dog', emoji: '🐕', frase: 'Run like a dog!', traduccion: '¡Corre como un perro!', idioma: 'en-US', movimiento: 'Marcha en el mismo lugar.' },
            { nombre: 'fish', emoji: '🐟', frase: 'Swim like a fish!', traduccion: '¡Nada como un pez!', idioma: 'en-US', movimiento: 'Mueve tus brazos como aletas.' },
            { nombre: 'cat', emoji: '🐈', frase: 'Stretch like a cat!', traduccion: '¡Estírate como un gato!', idioma: 'en-US', movimiento: 'Estira brazos y espalda.' },
          ] },
        },
      },
    },
  ],
}

export default ingles
