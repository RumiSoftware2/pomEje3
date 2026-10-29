---
name: app-infantil-react
description: Guía completa para construir una app web infantil modular en React, JavaScript y CSS para niños de 3 a 6 años, con interfaz colorida en tonos pastel, una asignatura por módulo, temas dentro de cada asignatura y una actividad corporal dinámica por tema, para usar en casa después de la jornada escolar. Usa este skill siempre que el usuario pida construir, continuar, revisar o ampliar esta app, o hable de actividades infantiles, asignaturas y temas para niños pequeños, la mascota Nimbo, plantillas de actividad corporal o la interfaz pastel para niños, aunque no mencione el nombre del skill.
---

# App infantil modular en React (3 a 6 años)

Este skill contiene el plan completo para construir la app de principio a fin. Está escrito para que el asistente que lo lea pueda ejecutarlo **sin tener que decidir nada importante**.

## Cómo usar este skill

1. Lee **este archivo completo** primero.
2. Antes de la Fase 1, lee `references/diseno-y-componentes.md` (colores, medidas, componentes, mascota, accesibilidad).
3. Antes de la Fase 3, lee `references/actividades-y-contenido.md` (las 6 plantillas de actividad, los 12 temas, frases, audio).
4. Trabaja **por fases en orden** (sección 10). Al terminar cada fase, revisa su checklist de aceptación y reporta al usuario antes de seguir.
5. No inventes funciones fuera del plan. Si algo es ambiguo, elige la opción **más simple** y anótala en `DECISIONES.md` en la raíz del proyecto.
6. Si el usuario pide un cambio que contradice este plan, haz el cambio y actualiza `DECISIONES.md` explicando qué se cambió y por qué.

## 1. Objetivo y alcance

**Qué es:** una app web para tablets, celulares y computador que los niños de 3 a 6 años usan **en casa, después de la jornada escolar**, con un adulto cerca.

**Estructura central:** Asignatura → Tema → Actividad corporal dinámica.

**Dentro del alcance:**
- 6 asignaturas y 12 temas (2 por asignatura).
- 6 plantillas de actividad corporal reutilizables.
- Mascota guía "Nimbo", voz y sonidos.
- Estrellas y pegatinas como recompensa.
- Ajustes para adultos detrás de una compuerta.
- Progreso guardado solo en el dispositivo.

**Fuera del alcance (por ahora):** detección de movimiento con cámara o sensores, cuentas de usuario, servidor, multijugador, contenido descargable, compras, anuncios.

**Perfiles de edad** (se elige en el primer inicio y en ajustes de adultos):
- **Pequeños (3–4 años):** menos elementos, tiempos más cortos, números 1–5.
- **Grandes (5–6 años):** más elementos, tiempos normales, números 1–10.

## 2. Reglas de oro

1. Textos que ve el niño y comentarios del código: **en español**, con tuteo, frases de **8 palabras o menos**.
2. Sin backend, sin cuentas, sin analítica, sin anuncios, sin enlaces externos dentro de la app.
3. **Nunca hay "fallar"**: no existen pantallas de derrota ni palabras como "mal", "incorrecto", "perdiste". Si algo no sale, Nimbo dice "¡Uy! Probemos otra vez".
4. **Modularidad estricta:** agregar una asignatura nueva debe requerir solo crear su carpeta con `config.js` y datos, y añadir una línea al registro central. El menú se genera solo.
5. Las plantillas de actividad se escriben **una vez**; los temas solo aportan **datos**.
6. Todo color, tamaño o tiempo repetido va en variables o constantes con nombre (sin números mágicos).
7. Áreas táctiles de **88 × 88 px como mínimo**, separadas por al menos 16 px.
8. Prioridad de calidad: (1) facilidad de uso para un niño pequeño, (2) modularidad, (3) belleza, (4) rendimiento.
9. Seguridad física: ninguna actividad exige saltos altos, giros rápidos, carreras ni posiciones invertidas.

## 3. Stack (decisiones cerradas)

| Tema | Decisión |
|---|---|
| Base | Vite + React 18, **JavaScript** (no TypeScript) |
| Navegación | React Router v6 |
| Estilos | CSS Modules por componente + variables CSS globales; sin librerías de UI |
| Animación | Solo CSS (keyframes y transiciones); sin Framer Motion |
| Fuente | Fredoka autoalojada con `@fontsource/fredoka` (pesos 400, 500, 600) |
| Voz | Web Speech API (síntesis) con subtítulos como respaldo |
| Sonido | Elemento `Audio` del navegador envuelto en un hook; sin librerías |
| Persistencia | `localStorage` con manejo de errores (si falla, funciona en memoria) |
| Validación de props | PropTypes en cada componente |
| Calidad | ESLint + Prettier; Vitest + Testing Library para hooks y componentes clave |
| Carga | `React.lazy` y `Suspense` por ruta de asignatura |
| Imágenes | Solo SVG y emojis (ninguna imagen raster en la primera versión) |

## 4. Estructura de carpetas

```
raiz/
├── DECISIONES.md
├── README.md
├── index.html                  (lang="es", viewport, theme-color pastel)
├── public/audio/               (efectos/ y musica/)
└── src/
    ├── main.jsx
    ├── App.jsx                 (proveedores + rutas)
    ├── styles/                 (tokens.css, reset.css, animations.css, global.css)
    ├── components/             (UI reutilizable, sin lógica de materias)
    │   ├── BigButton/ SubjectCard/ TopicCard/ Mascot/ StarCounter/
    │   ├── ProgressPath/ CountdownRing/ CelebrationOverlay/
    │   ├── PrepareSpace/ ParentGate/ ScreenLayout/ BackButton/
    ├── activities/             (6 plantillas + activityRegistry.js)
    │   ├── CountJump/ MoveLike/ FreezeDance/ SimonSays/ BodyShape/ RhythmEcho/
    ├── modules/                (una carpeta por asignatura + modulesRegistry.js)
    │   ├── matematicas/ lenguaje/ ciencias/ ingles/ arte-musica/ educacion-fisica/
    │   │   ├── config.js
    │   │   └── topics/<tema>/data.js
    ├── screens/                (Home, Subjects, Topics, TopicIntro, Activity, Stickers, Parent)
    ├── hooks/                  (useSpeech, useSound, useCountdown, useSessionTimer, useLocalStorage)
    ├── context/                (ProgressContext, SettingsContext)
    ├── content/                (mascotPhrases.js, stickers.js)
    └── assets/CREDITS.md
```

Cada componente vive en su carpeta con `index.jsx`, su `NombreComponente.module.css` y sus PropTypes.

## 5. Contratos de datos

### Asignatura (`config.js`)
| Campo | Descripción |
|---|---|
| id | minúscula sin tildes (ej. "matematicas") |
| nombre | texto visible (ej. "Matemáticas") |
| icono | un emoji |
| color y colorSombra | referencias a variables CSS |
| descripcionVoz | frase corta que dice Nimbo al entrar |
| temas | lista de temas |

### Tema (dentro de `temas`)
| Campo | Descripción |
|---|---|
| id | ej. "numeros" |
| nombre e icono | visibles |
| introduccion | hasta 3 pantallas cortas (texto breve + emoji + frase de voz) |
| actividad | `{ tipo, datos }`; `tipo` es el nombre de una plantilla; `datos` trae el contenido por perfil: `{ pequenos, grandes }` |

### Validación
En modo desarrollo, una función revisa al iniciar que cada configuración tenga todos los campos y que cada `tipo` exista en `activityRegistry`. Si falta algo, muestra un error claro **en consola** (nunca en la pantalla del niño).

## 6. Hooks y contextos (API esperada)

- **useSpeech:** "hablar(texto, idioma)", "callar()", "estáHablando", "hayVoz". Orden de voces para español: es-CO, es-419, es-MX, es-US, es-ES; para inglés, en-US. Velocidad 0.9, tono 1.1. Si no hay voz o está apagada, la frase solo se muestra en el globo de la mascota. Cancela la voz anterior antes de hablar y al salir de la pantalla.
- **useSound:** "reproducir(nombre)", "reproducirMusica(nombre)", "detenerMusica()". Respeta volumen y silencio. Precarga los efectos al entrar a una actividad. Si falla una carga, no rompe nada.
- **useCountdown:** cuenta regresiva con pausa, reinicio y callback final. Calcula con hora real para tolerar cambios de pestaña.
- **useSessionTimer:** mide el tiempo continuo de uso; al llegar al límite de descanso (15 min por defecto) pide a Nimbo proponer una pausa.
- **useLocalStorage:** lectura y escritura segura con valor por defecto; claves con prefijo `miniaventuras:`.
- **ProgressContext:** estrellas totales, temas completados con fecha, pegatinas desbloqueadas. Reglas: **completar una actividad da 1 estrella**; cada **5 estrellas** se desbloquea una pegatina.
- **SettingsContext:** volumen (0–100, por defecto 70), voz encendida, música encendida, perfil de edad, modo de conteo de CountJump, minutos de descanso (10/15/20/apagado), nombre del niño (opcional, solo local).

## 7. Rutas y pantallas

| Ruta | Pantalla | Contenido |
|---|---|---|
| `/` | Inicio | Nimbo saluda (con el nombre del niño si existe), un botón enorme "¡Jugar!", ícono pequeño de adultos, contador de estrellas |
| `/materias` | Asignaturas | Cuadrícula de SubjectCards generada del registro |
| `/materia/:id` | Temas | Encabezado con el color de la materia, TopicCards, Nimbo da la bienvenida |
| `/materia/:id/tema/:tema` | Introducción | Hasta 3 pantallas con ícono grande y voz; botón "¡Vamos!" |
| `/materia/:id/tema/:tema/actividad` | Actividad | PrepareSpace → plantilla → celebración |
| `/pegatinas` (opcional) | Álbum | Cuadrícula de pegatinas; las bloqueadas en gris suave con candado |
| `/padres` | Ajustes | Detrás de la compuerta |
| cualquier otra | — | Redirige a `/` |

Comportamiento: el botón atrás lleva siempre a la pantalla lógica anterior (no al historial del navegador). Si no existe la asignatura o el tema, redirigir a `/materias`. Voz y música se detienen al salir de cada pantalla.

## 8. Progreso, compuerta de adultos y seguridad

**Persistencia local:** estrellas, temas completados con fecha, pegatinas, ajustes. No se guarda ninguna métrica de uso ni se envía nada fuera del dispositivo.

**Marca "hecho hoy":** según la fecha local; desaparece al día siguiente. El niño puede repetir cuando quiera y recibe la estrella otra vez.

**Reinicio de progreso:** botón en ajustes de adultos con doble confirmación.

**Compuerta para adultos (ParentGate):**
- Se activa al tocar el ícono de adultos o al entrar a `/padres`.
- Pregunta aritmética sencilla escrita **en palabras** (ej. "Escribe el resultado de siete más cinco, en números") con teclado numérico grande. Cada intento genera una pregunta distinta; tras 3 fallos, espera 30 segundos.
- Al aprobar, abre ajustes: volumen, voz, música, modo de conteo, perfil de edad, nombre del niño, minutos de descanso, pegatinas, reiniciar progreso, "Acerca de" (versión y créditos de audio).

**Seguridad física y bienestar:**
- **PrepareSpace** antes de cada actividad corporal: tres íconos con voz ("Despeja el espacio", "Descalzo o con zapatos que no resbalen", "Un adulto cerca") y botón "¡Listo!".
- Aviso de descanso por uso continuo: Nimbo se duerme, sugiere tomar agua y descansar; el adulto puede cerrarlo.
- Sin publicidad, compras, chat ni enlaces externos.

## 9. Accesibilidad, rendimiento y compatibilidad

- `lang="es"` en el documento; el contenido en inglés lleva `lang="en"` en su fragmento.
- Todo botón con etiqueta accesible en español; navegación con teclado; foco visible y grueso.
- Emojis decorativos ocultos a lectores de pantalla; los informativos con etiqueta.
- La información nunca depende solo del color (siempre ícono o texto).
- Respetar `prefers-reduced-motion`. Prohibido cualquier destello de más de 3 cambios por segundo.
- JavaScript menor a **300 KB comprimido** (sin audio); carga diferida por asignatura; pantalla inicial usable en menos de 2 s en una tablet de gama media.
- Compatibilidad: Chrome y Edge recientes, Safari de iPadOS e iOS (últimas 2 versiones), Firefox reciente. Probar sin voz instalada.
- Opcional (Fase 8): PWA instalable que funcione sin conexión.

## 10. Fases, tareas y criterios de aceptación

### Fase 1 — Base y sistema de diseño
1. Crear el proyecto con Vite (plantilla React, JavaScript) e instalar React Router, PropTypes, `@fontsource/fredoka`, ESLint, Prettier, Vitest y Testing Library.
2. Crear `tokens.css`, `reset.css`, `global.css` y `animations.css` (ver `references/diseno-y-componentes.md`).
3. Construir ScreenLayout, BigButton, BackButton, StarCounter y Mascot (con sus 6 estados).
4. Crear una página temporal que muestre todos los componentes para revisar su aspecto.

**Aceptación:** colores exactos del plan; botones de al menos 88 px; efecto de hundimiento funcionando; `prefers-reduced-motion` desactiva las animaciones; ESLint sin errores.

### Fase 2 — Contextos, hooks y navegación
1. Implementar useLocalStorage, SettingsContext y ProgressContext.
2. Implementar useSpeech, useSound, useCountdown y useSessionTimer.
3. Crear `modulesRegistry.js` con **una** asignatura de prueba y las rutas de la sección 7.
4. Implementar HomeScreen, SubjectsScreen, TopicsScreen y TopicIntroScreen.

**Aceptación:** se navega de Inicio a un tema y se vuelve; el menú se genera desde el registro; ajustes y progreso persisten tras recargar; sin voz disponible, aparecen subtítulos.

### Fase 3 — Plantillas de actividad
Leer `references/actividades-y-contenido.md`. Construir en este orden: CountJump, MoveLike, BodyShape, SimonSays, RhythmEcho, FreezeDance; más PrepareSpace, CountdownRing, ProgressPath, CelebrationOverlay y `activityRegistry.js`.

**Aceptación:** cada plantilla corre con datos de ejemplo, pausa y reanuda bien, nunca llega a un estado de "fallo" y entrega la estrella al terminar.

### Fase 4 — Contenido completo
Crear las 6 asignaturas y los 12 temas con los datos del archivo de contenido, para ambos perfiles de edad, y el catálogo `mascotPhrases.js`.

**Aceptación:** cada tema se juega de principio a fin en ambos perfiles; textos del niño de 8 palabras o menos; el inglés se dice con voz en inglés.

### Fase 5 — Recompensas y ajustes de adultos
Implementar ParentGate, ParentScreen, pegatinas (catálogo de al menos 12) y el aviso de descanso.

**Aceptación:** sin pasar la compuerta no se llega a ajustes; cada ajuste tiene efecto inmediato; a las 5 estrellas se desbloquea una pegatina.

### Fase 6 — Pulido y accesibilidad
Revisar animaciones, fondo decorado, contraste, etiquetas accesibles, teclado, tamaños en tablet y celular, y rendimiento.

**Aceptación:** checklist de las secciones 8 y 9 completo.

### Fase 7 — Álbum de pegatinas (opcional)
Pantalla `/pegatinas` con cuadrícula y animación al desbloquear.

### Fase 8 — PWA y voz pregrabada (opcional)
Instalación sin conexión y reemplazo de la voz sintética por audios pregrabados.

## 11. Pruebas

- **Automáticas (Vitest):** cuenta regresiva, almacenamiento seguro, reglas de estrellas y pegatinas, validación de configuraciones, renderizado de BigButton y CountJump.
- **Manuales por actividad:** inicio, pausa, reanudar, salir, repetir, cambio de pestaña a mitad, sin audio, sin voz, volumen en cero, giro de pantalla.
- **Dispositivos:** una tablet de 10", un celular de 6" y un computador.
- **Con niños:** observar al menos 3 niños (de cada perfil de edad) y anotar dónde dudan, qué no entienden y qué los hace reír; ajustar con eso.

## 12. Convenciones

- Carpetas en kebab-case sin tildes; componentes en PascalCase; hooks con prefijo `use`; ids de datos en minúscula sin tildes.
- Comentarios en español, breves, explicando el "porqué".
- Commits pequeños por tarea, con mensaje en español en imperativo.
- `README.md` debe explicar cómo agregar una asignatura, un tema y una plantilla nueva.

## 13. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Voz sintética de mala calidad en algunos dispositivos | Subtítulos siempre visibles; mejora con voz pregrabada (Fase 8) |
| Audios con derechos de autor | Solo CC0, dominio público o propios, registrados en `CREDITS.md` |
| El niño no entiende un movimiento | Cada movimiento lleva emoji grande y frase corta; probar con niños |
| Sin detección de movimiento, el niño "hace trampa" | Es intencional: la app guía y el adulto acompaña; no evalúa |
| Nombre y diseño de la mascota | Nimbo es provisional; cambiar solo el SVG y `mascotPhrases.js` |

## 14. Entregables finales

1. Código fuente completo que corre en desarrollo y compila para producción.
2. `README.md` y `DECISIONES.md`.
3. `assets/CREDITS.md` con las licencias del audio.
4. Un resumen final con lo implementado por fase, lo pendiente y las decisiones tomadas.
