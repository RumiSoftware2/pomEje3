# Miniaventuras

Aplicación infantil para moverse, descubrir y aprender en familia. Hace parte de la Fundación Universitaria del Área Andina y de la Cátedra Pablo Oliveros Marmolejo.

## Ejecutar

```sh
npm install
npm run dev
```

## Compilar

```sh
npm run build
npm run preview
```

La compilación prepara la aplicación instalable y genera su lista de archivos para usarla sin conexión. La primera carga necesita conexión; después, el navegador conserva la portada, los módulos y los recursos compilados. El servicio de voz usa las voces disponibles en el dispositivo.

## Estructura

- `src/screens/`: inicio, materias, temas, introducción, actividad, ajustes para adultos y álbum.
- `src/components/`: componentes reutilizables y su CSS.
- `src/activities/`: las seis plantillas de actividad y su registro.
- `src/modules/`: una configuración por asignatura y el registro central.
- `src/context/` y `src/hooks/`: ajustes, progreso local, voz, audio y temporizadores.
- `src/assets/`: logo institucional y créditos.
- `public/`: manifiesto, icono y servicio de trabajo sin conexión.
- `Guias/`: instrucciones de diseño, actividades y contenido.

## Contenido actual

El registro incluye seis asignaturas y doce temas, con datos para los perfiles Pequeños y Grandes. Cada actividad comienza con una preparación segura, permite pausar o salir y entrega una estrella al completarse. Los ajustes y el progreso se guardan en el dispositivo bajo el prefijo `miniaventuras:`.

## Reglas para continuar

- Mantener JavaScript y CSS; no agregar TypeScript.
- Mantener cada componente y cada asignatura en un módulo independiente.
- Seguir las guías de `Guias/` para cambiar contenido o comportamiento.
- No agregar audio externo sin documentar autor, fuente y licencia en `src/assets/CREDITS.md`.
