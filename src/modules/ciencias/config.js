const ciencias = {
  id: 'ciencias',
  nombre: 'Ciencias',
  icono: '🌿',
  color: 'var(--color-menta)',
  colorSombra: 'var(--color-menta-sombra)',
  descripcionVoz: '¡Miremos el mundo con curiosidad!',
  temas: [
    {
      id: 'animales', nombre: 'Animales', icono: '🐾',
      introduccion: [{ texto: '¡Muévete como un animal!', emoji: '🦊', voz: '¡Muévete como un animal!' }],
      actividad: {
        tipo: 'MoveLike',
        datos: {
          pequenos: { segundosPorElemento: 10, descanso: 3, modo: 'unoAUno', items: [
            { nombre: 'conejo', emoji: '🐇', frase: '¡Salta suave como un conejo!', movimiento: 'Da saltos pequeños.' },
            { nombre: 'rana', emoji: '🐸', frase: '¡Agáchate y salta suave!', movimiento: 'Haz una sentadilla pequeña.' },
            { nombre: 'elefante', emoji: '🐘', frase: '¡Camina despacio como elefante!', movimiento: 'Da pasos pesados.' },
            { nombre: 'serpiente', emoji: '🐍', frase: '¡Desliza tus brazos como serpiente!', movimiento: 'Mueve tus brazos suavemente.' },
          ] },
          grandes: { segundosPorElemento: 10, descanso: 3, modo: 'circuito', items: [
            { nombre: 'conejo', emoji: '🐇', frase: '¡Salta suave como un conejo!', movimiento: 'Da saltos pequeños.' },
            { nombre: 'rana', emoji: '🐸', frase: '¡Agáchate y salta suave!', movimiento: 'Haz una sentadilla pequeña.' },
            { nombre: 'elefante', emoji: '🐘', frase: '¡Camina despacio como elefante!', movimiento: 'Da pasos pesados.' },
            { nombre: 'serpiente', emoji: '🐍', frase: '¡Desliza tus brazos como serpiente!', movimiento: 'Mueve tus brazos suavemente.' },
            { nombre: 'pájaro', emoji: '🐦', frase: '¡Bate tus brazos como pájaro!', movimiento: 'Haz alas con tus brazos.' },
            { nombre: 'oso', emoji: '🐻', frase: '¡Camina con pasos pesados!', movimiento: 'Marcha despacio en el puesto.' },
          ] },
        },
      },
    },
    {
      id: 'clima', nombre: 'El clima', icono: '🌦️',
      introduccion: [{ texto: '¡Juguemos con el clima!', emoji: '🌈', voz: '¡Juguemos con el clima!' }],
      actividad: {
        tipo: 'SimonSays',
        datos: {
          pequenos: [
            { texto: 'Haz rayos con tus brazos.', icono: '☀️' },
            { texto: 'Mueve tus dedos como lluvia.', icono: '🌧️' },
            { texto: 'Abraza tu cuerpo por el frío.', icono: '🥶' },
            { texto: 'Haz un arco con tus brazos.', icono: '🌈' },
          ],
          grandes: [
            { texto: 'Haz rayos con tus brazos.', icono: '☀️' },
            { texto: 'Mueve tus dedos como lluvia.', icono: '🌧️' },
            { texto: 'Balancea tus brazos muy despacio.', icono: '💨' },
            { texto: 'Abraza tu cuerpo por el frío.', icono: '🥶' },
            { texto: 'Hazte bolita como una nube.', icono: '☁️' },
            { texto: 'Haz un arco con tus brazos.', icono: '🌈' },
          ],
        },
      },
    },
  ],
}

export default ciencias
