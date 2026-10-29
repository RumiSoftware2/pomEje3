# Decisiones del proyecto

- El equipo pidió JavaScript y CSS. No se usa TypeScript.
- Se utiliza React Router para las rutas descritas en las guías.
- Las asignaturas se cargan desde `modulesRegistry`; cada materia aporta su propio `config.js`.
- Los ajustes, las estrellas, los temas completados y las pegatinas se almacenan solo en el dispositivo.
- La voz usa Web Speech API con subtítulos visibles. Aún no se recibieron archivos de música ni efectos.
- La tipografía usa fuentes de sistema para evitar dependencias y solicitudes a fuentes externas.
- El servicio de trabajo sin conexión precarga la compilación de Vite y responde las rutas internas desde la portada.
- La revisión manual en Edge no se realizó porque Computer Use no obtuvo acceso al navegador. La compilación y ESLint sí se ejecutaron.
