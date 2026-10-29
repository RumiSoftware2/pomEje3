const educacionFisica = {
  id: 'educacion-fisica',
  nombre: 'Educación física',
  icono: '🤸',
  color: 'var(--color-durazno)',
  colorSombra: 'var(--color-durazno-sombra)',
  descripcionVoz: '¡Muévete y cuida tu cuerpo!',
  temas: [
    {
      id: 'equilibrio', nombre: 'Equilibrio', icono: '🧍',
      introduccion: [{ texto: '¡Encuentra tu equilibrio!', emoji: '⚖️', voz: '¡Encuentra tu equilibrio!' }],
      actividad: {
        tipo: 'MoveLike',
        datos: {
          pequenos: { segundosPorElemento: 5, descanso: 3, modo: 'circuito', items: [
            { nombre: 'un pie', emoji: '🦶', frase: 'Levanta un pie junto a un adulto.', movimiento: 'Busca un apoyo cercano.' },
            { nombre: 'puntillas', emoji: '🩰', frase: 'Ponte de puntillas y baja despacio.', movimiento: 'Hazlo cerca de un adulto.' },
            { nombre: 'línea', emoji: '🚶', frase: 'Camina despacio sobre una línea imaginaria.', movimiento: 'Da pasos cortos y seguros.' },
            { nombre: 'bolita', emoji: '🟠', frase: 'Agáchate y levántate despacio.', movimiento: 'Hazte bolita con calma.' },
          ] },
          grandes: { segundosPorElemento: 5, descanso: 3, modo: 'circuito', items: [
            { nombre: 'un pie', emoji: '🦶', frase: 'Levanta un pie junto a un adulto.', movimiento: 'Busca un apoyo cercano.' },
            { nombre: 'puntillas', emoji: '🩰', frase: 'Ponte de puntillas y baja despacio.', movimiento: 'Hazlo cerca de un adulto.' },
            { nombre: 'línea', emoji: '🚶', frase: 'Camina despacio sobre una línea imaginaria.', movimiento: 'Da pasos cortos y seguros.' },
            { nombre: 'bolita', emoji: '🟠', frase: 'Agáchate y levántate despacio.', movimiento: 'Hazte bolita con calma.' },
            { nombre: 'de lado', emoji: '↔️', frase: 'Camina de lado con calma.', movimiento: 'Da pasos cortos.' },
            { nombre: 'pasos', emoji: '👣', frase: 'Da pasos pequeños hacia adelante y atrás.', movimiento: 'Muévete despacio en tu lugar.' },
          ] },
        },
      },
    },
    {
      id: 'mi-cuerpo', nombre: 'Mi cuerpo', icono: '🧍‍♀️',
      introduccion: [{ texto: '¡Descubre las partes de tu cuerpo!', emoji: '🖐️', voz: '¡Descubre las partes de tu cuerpo!' }],
      actividad: {
        tipo: 'SimonSays',
        datos: {
          pequenos: [
            { texto: 'Toca tu cabeza.', icono: '🙂' },
            { texto: 'Toca tus hombros.', icono: '🙆' },
            { texto: 'Toca tus rodillas.', icono: '🧎' },
            { texto: 'Toca tus pies.', icono: '🦶' },
            { texto: 'Toca tu nariz.', icono: '👃' },
          ],
          grandes: [
            { texto: 'Toca tu cabeza.', icono: '🙂' },
            { texto: 'Toca tus hombros.', icono: '🙆' },
            { texto: 'Toca tus rodillas.', icono: '🧎' },
            { texto: 'Toca tus pies.', icono: '🦶' },
            { texto: 'Toca tu nariz.', icono: '👃' },
            { texto: 'Toca tus codos.', icono: '💪' },
            { texto: 'Toca tu cabeza y hombros.', icono: '🙋' },
            { texto: 'Toca tus rodillas y pies.', icono: '🦵' },
          ],
        },
      },
    },
  ],
}

export default educacionFisica
