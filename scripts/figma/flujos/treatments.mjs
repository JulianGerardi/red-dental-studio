/* Ficha del paciente → Treatments y Documents. Ver design-reference/figma/modulos/treatments.md. */
import { clic, pasos, llenar } from './_util.mjs'

export default {
  pagina: '🩹 Patient record — Treatments & Documents',
  orden: 9,
  resumen: 'Los planes de tratamiento del paciente y sus documentos (consentimientos firmados o rechazados).',
  jira: ['CON-3939', 'CON-3695', 'CON-2861', 'CON-2140'],
  flujos: [
    {
      nombre: 'Treatments — Treatment Plan',
      rol: 'Odontólogo · Recepción',
      jira: ['CON-3939', 'CON-3695'],
      resumen: 'Ver los casos del paciente; el detalle y la edición viven en Clinical Mode.',
      pantallas: [
        { nombre: 'Treatment Plan', ruta: '/patients/1/treatments', nota: 'Lista de casos del paciente con su estado y monto.' },
        { nombre: 'Case open', hacer: clic(/Root Canal Treatment/), nota: 'Tocar un caso lo despliega o lleva a su detalle.' },
      ],
    },
    {
      nombre: 'Documents — Documents Manager',
      rol: 'Recepción',
      jira: ['CON-2861', 'CON-2140'],
      resumen: 'Buscar, seleccionar y descargar los documentos del paciente.',
      pantallas: [
        { nombre: 'Documents Manager', ruta: '/patients/1/documents', nota: 'Tabla de documentos, del más nuevo al más viejo. Rows per page: 10, 20 o 50.' },
        { nombre: 'Search', hacer: llenar('Search documents', 'Refusal'), nota: 'El buscador filtra por nombre.' },
        { nombre: 'No results', hacer: llenar('Search documents', 'zzz'), nota: 'Estado vacío cuando nada coincide.' },
        { nombre: 'Rows selected', ruta: '/patients/1/documents', hacer: clic('Select all rows', 'checkbox'), nota: 'Con filas elegidas se habilita Download selected.' },
      ],
    },
  ],
}
