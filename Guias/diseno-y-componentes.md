# Diseño y componentes

Leer antes de la Fase 1. Define el aspecto visual, los componentes de interfaz y la mascota.

## Contenido
1. Principios de diseño
2. Colores
3. Tipografía
4. Medidas y efectos
5. Diseño responsivo
6. Fondos y decoración
7. Animaciones
8. Componentes (contrato de cada uno)
9. La mascota Nimbo
10. Accesibilidad visual

---

## 1. Principios de diseño

- Botones enormes: la motricidad fina de 3 a 6 años aún se está desarrollando.
- Casi nada de lectura: ícono grande + voz + color.
- **Una sola acción principal por pantalla.**
- Retroalimentación inmediata (sonido, estrella, personaje que celebra).
- Sesiones cortas: 1.5 a 3 minutos por actividad.
- Estilo "gomita": bordes muy redondeados, botones que se hunden al tocar, colores pastel suaves.

## 2. Colores (variables en `tokens.css`)

| Uso | Nombre | Valor |
|---|---|---|
| Fondo general | crema | #FFFBF5 |
| Texto | ciruela suave | #5B4B6B |
| Rosa / sombra | rosa, rosa-sombra | #FFC8DD / #F2A0BE |
| Lila / sombra | lila, lila-sombra | #CDB4DB / #A98AC2 |
| Azul cielo / sombra | azul, azul-sombra | #BDE0FE / #8EC3EE |
| Menta / sombra | menta, menta-sombra | #B9FBC0 / #86E08F |
| Amarillo / sombra | amarillo, amarillo-sombra | #FFF1A8 / #F0D96B |
| Durazno / sombra | durazno, durazno-sombra | #FFD6A5 / #EDB77A |
| Éxito (estrellas) | dorado suave | #FFE08A |
| Tarjetas | blanco | #FFFFFF |

**Color por asignatura:**

| Asignatura | Color |
|---|---|
| Matemáticas | azul |
| Lenguaje | rosa |
| Ciencias | menta |
| Inglés | amarillo |
| Arte y música | lila |
| Educación física | durazno |

Cada pantalla de asignatura define `--color-materia` y `--color-materia-sombra`; los componentes internos usan **solo** esas dos variables. Así se reutilizan sin tocar su CSS.

**Contraste:** el texto siempre es ciruela #5B4B6B sobre fondos pastel o blancos (mínimo 4.5:1). Nunca texto blanco sobre pastel.

## 3. Tipografía

Fredoka (autoalojada). Tamaños fluidos: título de pantalla 44 px, subtítulo 28 px, texto 22 px, **mínimo absoluto 20 px**. Números de conteo: 96 px o más. Poca puntuación y mayúscula inicial.

## 4. Medidas y efectos

- Escala de espacio base 8 px: 8, 16, 24, 32, 48, 64.
- Radio de bordes: 28 px (tarjetas y botones); 999 px (píldoras y círculos).
- **Área táctil mínima 88 × 88 px**; separación mínima entre botones 16 px.
- Borde de 4 px con la variante `-sombra` del color.
- Sombra "gomita": desplazamiento vertical de 8 px con la variante `-sombra`. Al presionar baja a 2 px y el botón se desplaza 6 px (efecto de hundirse).

## 5. Diseño responsivo

Pensado primero para **tablet** (vertical y horizontal). Puntos de quiebre: 480, 768 y 1024 px.
- Cuadrículas de tarjetas: 2 columnas en celular, 3 en tablet y escritorio.
- El contenido de actividad se centra con ancho máximo de 900 px.
- Las pantallas de actividad no deben obligar a desplazarse.

## 6. Fondos y decoración

Fondo crema con 6 a 10 formas pastel (nubes, estrellas, burbujas) que flotan despacio, siempre **detrás** del contenido. Son SVG inline simples con `aria-hidden`.

## 7. Animaciones (nombres fijos)

| Nombre | Duración | Uso |
|---|---|---|
| rebote | 0.6 s | aparecer y tocar |
| flotar | 4 s, bucle | fondo decorativo y mascota en reposo |
| pulso | 1.2 s, bucle | llamar la atención al botón principal |
| balanceo suave | 0.5 s | "¡Uy! Probemos otra vez" (sin sacudidas fuertes) |
| confeti | 2.5 s | celebración |
| giro de estrella | 0.8 s | al ganar una estrella |
| aparición con escala | 0.3 s | entrada de tarjetas y modales |

**Prohibido** cualquier destello con más de 3 cambios por segundo. Con `prefers-reduced-motion` se desactivan flotar, confeti y rebotes; quedan solo cambios de opacidad.

## 8. Componentes (contrato)

| Componente | Propiedades principales | Comportamiento y notas |
|---|---|---|
| **BigButton** | texto, ícono, color, tamaño (normal/enorme), alTocar, deshabilitado | Efecto de hundimiento, sonido "tap", etiqueta accesible, foco visible grueso |
| **SubjectCard** | asignatura (config), alTocar | Tarjeta grande con emoji de 72 px, nombre, color propio, marca "hecho hoy" si algún tema se completó |
| **TopicCard** | tema, color, estrellas ganadas, alTocar | Igual que la anterior, con insignia de check si se hizo hoy |
| **Mascot** | estado, frase (opcional), tamaño | Nimbo en SVG inline. Estados: reposo, hablando, animando, celebrando, pensando, durmiendo. Globo de texto sincronizado con la voz |
| **StarCounter** | total | Estrella con número; anima el giro al aumentar |
| **ProgressPath** | pasos, pasoActual | Camino de círculos conectados (no barra); el actual late con pulso |
| **CountdownRing** | segundos, alTerminar, pausado | Anillo que se vacía, con número grande en el centro |
| **CelebrationOverlay** | estrellasGanadas, mensaje, acciones | Confeti, Nimbo celebrando y 2 botones: "Otra vez" y "Seguir" |
| **PrepareSpace** | alConfirmar | Pantalla previa a toda actividad corporal (tres íconos con voz y botón "¡Listo!") |
| **ParentGate** | alAprobar, alCancelar | Compuerta para adultos (ver SKILL.md, sección 8) |
| **ScreenLayout** | título, mostrarAtras, color | Fondo decorado, encabezado con botón atrás y contador de estrellas |
| **BackButton** | destino | Flecha enorme con el texto "Volver" (no depende solo del ícono) |

Cada componente: carpeta propia con `index.jsx`, CSS Module y PropTypes.

## 9. La mascota Nimbo

- Una nube redonda y sonriente en blanco y azul cielo, con mejillas rosadas. SVG inline con partes animables: ojos que parpadean, boca que se abre al hablar, brazos.
- Personalidad: cariñosa, alegre, paciente. Siempre tuteo.
- Frases de **8 palabras o menos**, en imperativo, siempre positivas.
- Catálogo `mascotPhrases.js` con **al menos 5 variantes por situación**: saludo, entrada a asignatura, intro de tema, ánimo a mitad de actividad, celebración, descanso, despedida, error amable. (La instrucción de cada actividad la define cada tema.)
- **Nunca decir:** "mal", "incorrecto", "perdiste", "no".

Ejemplos de tono:
- Saludo: "¡Hola! ¿Jugamos?"
- Ánimo: "¡Sigue así, campeón!"
- Celebración: "¡Lo lograste! ¡Bravo!"
- Error amable: "¡Uy! Probemos otra vez."
- Descanso: "¡Hora de tomar agua!"

## 10. Accesibilidad visual

- Foco visible grueso (4 px) en todo elemento interactivo.
- La información nunca depende solo del color: siempre ícono o texto.
- Emojis decorativos con `aria-hidden`; los informativos con etiqueta.
- Subtítulo grande siempre visible cuando la voz no está disponible.
