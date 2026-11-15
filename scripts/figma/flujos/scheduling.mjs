/* Scheduling. Ver design-reference/figma/modulos/scheduling.md. */
import { clic, pasos, escribir } from './_util.mjs'

const hastaElPlan = pasos(
  clic('New appointment'),
  escribir('Patient', 'John', 'combobox'), clic(/^John Smith/, 'option'),
  escribir('Primary Provider', 'Emily', 'combobox'), clic(/^Dr. Emily Chen/, 'option'),
)
const horario = pasos(clic(/^Select$/, 'button', 2), clic('Schedule at 10 AM'))
const resto = pasos(clic(/^Select$/, 'button', 2), clic('Operatory 1'), clic(/^Select$/, 'button', 0), clic('Booked'))

export default {
  pagina: '📅 Scheduling',
  orden: 11,
  resumen: 'La agenda: vistas Day / Week / Month, alta de turnos (con visita del plan de tratamiento) y pedidos de turno.',
  jira: ['CON-3119', 'CON-3600', 'CON-2934'],
  flujos: [
    {
      nombre: 'Scheduling — Calendar',
      rol: 'Recepción',
      jira: ['CON-3119'],
      resumen: 'Recorrer la agenda y elegir qué se ve.',
      pantallas: [
        { nombre: 'Week view', ruta: '/scheduling', alto: 'fijo', nota: 'Vista por defecto. Previous / Today / Next mueven el rango.' },
        { nombre: 'Day view', hacer: clic('Day'), alto: 'fijo', nota: 'Day: una columna por sala o provider.' },
        { nombre: 'Month view', hacer: clic('Month'), alto: 'fijo', nota: 'Month: el mes con los turnos de cada día.' },
        { nombre: 'View filters', ruta: '/scheduling', hacer: clic(/^View$/), alto: 'fijo', nota: 'View elige estados, providers y salas que se muestran.' },
        { nombre: 'Status legend', ruta: '/scheduling', hacer: clic('Status legend'), alto: 'fijo', nota: 'Status legend explica el color de cada estado.' },
      ],
    },
    {
      nombre: 'Scheduling — New Appointment',
      rol: 'Recepción',
      jira: ['CON-2934', 'CON-3600'],
      resumen: 'Agendar: Patient and Scheduling → Link to treatment plan visit → Save.',
      pantallas: [
        { nombre: 'New Appointment · empty', ruta: '/scheduling', hacer: clic('New appointment'), alto: 'fijo', nota: 'Paso 1. Obligatorios: Patient, Primary Provider, Status, Date, Start / End Time y Operatory.' },
        { nombre: 'Patient & provider', ruta: '/scheduling', hacer: hastaElPlan, alto: 'fijo', nota: 'Patient y Primary Provider son buscadores.' },
        { nombre: 'Time slot picker', hacer: clic(/^Select$/, 'button', 2), alto: 'fijo', nota: 'Tocar Start Time despliega el calendario del día al costado del drawer.' },
        { nombre: 'Slot chosen', hacer: clic('Schedule at 10 AM'), alto: 'fijo', nota: 'Elegir una franja completa fecha, inicio y fin.' },
        { nombre: 'Step 1 complete', hacer: resto, alto: 'fijo', nota: 'Faltan Operatory y Status para avanzar.' },
        { nombre: 'Link to treatment plan visit', hacer: clic(/Next Step/), alto: 'fijo', nota: 'Paso 2: se elige la visita del plan de tratamiento que cubre el turno (opcional).' },
        { nombre: 'Visit selected', hacer: clic(/^Visit 3/, 'radio'), alto: 'fijo', nota: 'Una visita sin otro turno se guarda sin preguntar.' },
        { nombre: 'Appointment saved', hacer: clic(/^Save/), alto: 'fijo', nota: 'Save cierra el drawer y el turno aparece en la agenda.' },
      ],
    },
    {
      nombre: 'Scheduling — Linked visit',
      rol: 'Recepción',
      jira: ['CON-3600'],
      resumen: 'La visita elegida ya tiene otro turno: Save pregunta si se mueve.',
      pantallas: [
        { nombre: 'Visit already scheduled', ruta: '/scheduling', hacer: pasos(hastaElPlan, horario, resto, clic(/Next Step/), clic(/^Visit 2/, 'radio')), alto: 'fijo', nota: 'La fila de la visita muestra el turno al que ya está vinculada.' },
        { nombre: 'Move treatment visit?', hacer: clic(/^Save/), alto: 'fijo', nota: 'Move visit pasa la visita al turno nuevo; Cancel deja todo como estaba.' },
      ],
    },
    {
      nombre: 'Scheduling — Appointment details',
      rol: 'Recepción',
      jira: ['CON-3119'],
      resumen: 'Ver un turno, hacer Check In o borrarlo (sólo Proposed o Waiting List).',
      pantallas: [
        { nombre: 'Details · Proposed', ruta: '/scheduling', hacer: clic(/Sofia Chen/), alto: 'fijo', nota: 'Tocar un turno abre su detalle. Un turno Proposed se puede borrar.' },
        { nombre: 'Delete Appointment', hacer: clic('Delete'), alto: 'fijo', nota: 'Delete pide confirmación.' },
        { nombre: 'Details · Check-in', ruta: '/scheduling', hacer: clic(/Maria Abril Viola/), alto: 'fijo', nota: 'Con otro estado, Delete queda apagado y explica por qué.' },
      ],
    },
    {
      nombre: 'Scheduling — Appointment requests',
      rol: 'Recepción',
      jira: ['CON-3119'],
      resumen: 'Pedidos de turno que llegan del portal del paciente.',
      pantallas: [
        { nombre: 'Appointment requests', ruta: '/scheduling', hacer: clic('Appointment requests'), alto: 'fijo', nota: 'El panel lista los pedidos pendientes para aceptarlos y agendarlos.' },
      ],
    },
  ],
}
