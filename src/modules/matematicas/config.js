const matematicas = {
  id: 'matematicas',
  nombre: 'Matemáticas',
  icono: '🔢',
  color: 'var(--color-azul)',
  colorSombra: 'var(--color-azul-sombra)',
  descripcionVoz: '¡Vamos a descubrir los números!',
  temas: [
    {
      id: 'numeros',
      nombre: 'Números',
      icono: '🔢',
      introduccion: [
        { texto: '¡Cuenta y muévete conmigo!', emoji: '🌟', voz: '¡Cuenta y muévete conmigo!' },
      ],
      actividad: {
        tipo: 'CountJump',
        datos: {
          pequenos: [
            { objetivo: 2, movimiento: 'saltos', emoji: '🐇', frase: '¡Da 2 saltos!' },
            { objetivo: 3, movimiento: 'aplausos', emoji: '👏', frase: '¡Aplaude 3 veces!' },
            { objetivo: 5, movimiento: 'pasos grandes', emoji: '👣', frase: '¡Da 5 pasos grandes!' },
          ],
          grandes: [
            { objetivo: 4, movimiento: 'saltos', emoji: '🐇', frase: '¡Da 4 saltos!' },
            { objetivo: 7, movimiento: 'aplausos', emoji: '👏', frase: '¡Aplaude 7 veces!' },
            { objetivo: 10, movimiento: 'pasos grandes', emoji: '👣', frase: '¡Da 10 pasos grandes!' },
          ],
        },
      },
    },
    {
      id: 'formas',
      nombre: 'Formas',
      icono: '🔺',
      introduccion: [
        { texto: '¡Dibuja formas con tu cuerpo!', emoji: '🟠', voz: '¡Dibuja formas con tu cuerpo!' },
      ],
      actividad: {
        tipo: 'BodyShape',
        datos: {
          pequenos: [
            { figura: 'círculo', emoji: '⭕', movimiento: 'Haz un aro con tus brazos.' },
            { figura: 'triángulo', emoji: '🔺', movimiento: 'Junta tus manos sobre la cabeza.' },
            { figura: 'estrella', emoji: '⭐', movimiento: 'Abre brazos y piernas.' },
          ],
          grandes: [
            { figura: 'círculo', emoji: '⭕', movimiento: 'Haz un aro con tus brazos.' },
            { figura: 'cuadrado', emoji: '🟦', movimiento: 'Marca cuatro esquinas con tus pies.' },
            { figura: 'triángulo', emoji: '🔺', movimiento: 'Junta tus manos sobre la cabeza.' },
            { figura: 'corazón', emoji: '💜', movimiento: 'Toca tu cabeza con tus dedos.' },
            { figura: 'estrella', emoji: '⭐', movimiento: 'Abre brazos y piernas.' },
          ],
        },
      },
    },
  ],
}

export default matematicas
