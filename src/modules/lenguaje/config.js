const lenguaje = {
  id: 'lenguaje',
  nombre: 'Lenguaje',
  icono: '📚',
  color: 'var(--color-rosa)',
  colorSombra: 'var(--color-rosa-sombra)',
  descripcionVoz: '¡Descubramos nuevas palabras!',
  temas: [
    {
      id: 'vocales', nombre: 'Vocales', icono: '🔤',
      introduccion: [{ texto: '¡Forma vocales con tu cuerpo!', emoji: '🅰️', voz: '¡Forma vocales con tu cuerpo!' }],
      actividad: {
        tipo: 'BodyShape',
        datos: {
          pequenos: [
            { figura: 'A', emoji: '🅰️', movimiento: 'Abre piernas y forma un techo.' },
            { figura: 'E', emoji: '🅴', movimiento: 'Extiende tus brazos como un peine.' },
            { figura: 'I', emoji: 'ℹ️', movimiento: 'Estírate alto y junta tus brazos.' },
          ],
          grandes: [
            { figura: 'A', emoji: '🅰️', movimiento: 'Abre piernas y forma un techo.' },
            { figura: 'E', emoji: '🅴', movimiento: 'Extiende tus brazos como un peine.' },
            { figura: 'I', emoji: 'ℹ️', movimiento: 'Estírate alto y junta tus brazos.' },
            { figura: 'O', emoji: '⭕', movimiento: 'Haz un círculo con tus brazos.' },
            { figura: 'U', emoji: '🆙', movimiento: 'Baja despacio y curva tus brazos.' },
          ],
        },
      },
    },
    {
      id: 'silabas', nombre: 'Sílabas', icono: '👏',
      introduccion: [{ texto: '¡Aplaude cada sílaba conmigo!', emoji: '👏', voz: '¡Aplaude cada sílaba conmigo!' }],
      actividad: {
        tipo: 'RhythmEcho',
        datos: {
          pequenos: [
            { texto: 'ma-má', tiempos: ['corto', 'corto'] },
            { texto: 'pa-pá', tiempos: ['corto', 'corto'] },
            { texto: 'ca-sa', tiempos: ['corto', 'corto'] },
            { texto: 'ga-to', tiempos: ['corto', 'corto'] },
          ],
          grandes: [
            { texto: 'ma-má', tiempos: ['corto', 'corto'] },
            { texto: 'pa-pá', tiempos: ['corto', 'corto'] },
            { texto: 'ca-sa', tiempos: ['corto', 'corto'] },
            { texto: 'ga-to', tiempos: ['corto', 'corto'] },
            { texto: 'ma-ri-po-sa', tiempos: ['corto', 'corto', 'corto', 'corto'] },
            { texto: 'e-le-fan-te', tiempos: ['corto', 'corto', 'corto', 'corto'] },
          ],
        },
      },
    },
  ],
}

export default lenguaje
