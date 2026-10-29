const arteMusica = {
  id: 'arte-musica',
  nombre: 'Arte y música',
  icono: '🎨',
  color: 'var(--color-lila)',
  colorSombra: 'var(--color-lila-sombra)',
  descripcionVoz: '¡Bailemos y creemos ritmos!',
  temas: [
    {
      id: 'baila-congelate', nombre: 'Baila y congélate', icono: '💃',
      introduccion: [{ texto: '¡Baila y congélate conmigo!', emoji: '🎶', voz: '¡Baila y congélate conmigo!' }],
      actividad: {
        tipo: 'FreezeDance',
        datos: {
          pequenos: { pista: 'musica-suave-1', duracion: 60, congelamientos: 3, intervalo: [10, 15], segundosCongelado: 3 },
          grandes: { pista: 'musica-suave-2', duracion: 90, congelamientos: 5, intervalo: [10, 15], segundosCongelado: 3 },
        },
      },
    },
    {
      id: 'ritmos-palmas', nombre: 'Ritmos con palmas', icono: '👏',
      introduccion: [{ texto: '¡Escucha y repite el ritmo!', emoji: '🥁', voz: '¡Escucha y repite el ritmo!' }],
      actividad: {
        tipo: 'RhythmEcho',
        datos: {
          pequenos: { tempo: 1.5, patrones: [
            { texto: 'Palmas cortas', tiempos: ['corto', 'corto', 'corto'] },
            { texto: 'Dos cortas y una larga', tiempos: ['corto', 'corto', 'largo'] },
            { texto: 'Una larga y dos cortas', tiempos: ['largo', 'corto', 'corto'] },
          ] },
          grandes: { tempo: 1.1, patrones: [
            { texto: 'Palmas cortas', tiempos: ['corto', 'corto', 'corto', 'corto'] },
            { texto: 'Dos cortas y dos largas', tiempos: ['corto', 'corto', 'largo', 'largo'] },
            { texto: 'Una larga y tres cortas', tiempos: ['largo', 'corto', 'corto', 'corto'] },
            { texto: 'Una corta y tres largas', tiempos: ['corto', 'largo', 'largo', 'largo'] },
          ] },
        },
      },
    },
  ],
}

export default arteMusica
