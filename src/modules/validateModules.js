import activityRegistry from '../activities/activityRegistry.js'

const ALLOWED_ACTIVITY_TYPES = new Set(Object.keys(activityRegistry))

function validateModules(modules) {
  const errors = []
  const ids = new Set()

  modules.forEach((subject) => {
    if (!subject.id || !subject.nombre || !subject.icono || !subject.color || !subject.colorSombra || !subject.descripcionVoz) {
      errors.push(`La asignatura "${subject.nombre ?? 'sin nombre'}" tiene campos incompletos.`)
    }
    if (ids.has(subject.id)) errors.push(`El id de asignatura "${subject.id}" está repetido.`)
    ids.add(subject.id)
    if (!Array.isArray(subject.temas)) {
      errors.push(`La asignatura "${subject.id}" necesita una lista de temas.`)
      return
    }
    subject.temas.forEach((topic) => {
      if (!topic.id || !topic.nombre || !topic.icono || !Array.isArray(topic.introduccion) || !topic.actividad) {
        errors.push(`El tema "${topic.id ?? 'sin id'}" tiene campos incompletos.`)
      }
      if (!ALLOWED_ACTIVITY_TYPES.has(topic.actividad?.tipo)) {
        errors.push(`El tema "${topic.id}" usa una plantilla desconocida.`)
      }
    })
  })

  if (import.meta.env.DEV && errors.length) errors.forEach((error) => console.error(`[Miniaventuras] ${error}`))
  return errors
}

export default validateModules
