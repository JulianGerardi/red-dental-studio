/* Dashboard. Ver design-reference/figma/modulos/dashboard.md. */
import { clic, pasos, texto } from './_util.mjs'

export default {
  pagina: '🩺 Dashboard',
  orden: 3,
  resumen: 'El día de un vistazo: turnos, sala de espera, salas y tareas pendientes. Todo depende de la fecha elegida.',
  jira: ['CON-3116', 'CON-2639'],
  flujos: [
    {
      nombre: 'Dashboard — Day at a glance',
      rol: 'Recepción · Odontólogo',
      jira: ['CON-3116'],
      resumen: 'Abrir el día, cambiar la fecha y filtrar cada lista con su propio Filter.',
      pantallas: [
        { nombre: 'Dashboard', ruta: '/', nota: 'Pantalla de inicio. Appointments, Waiting Room, Rooms y Pending Task leen la fecha de arriba.' },
        { nombre: 'Date picker', hacer: clic('Feb 28, 2026'), nota: 'La fecha abre el calendario; elegir un día recarga los cuatro paneles. Today vuelve a hoy.' },
        { nombre: 'Filter appointments', ruta: '/', hacer: clic('Filter appointments'), nota: 'Cada columna filtra por sala con su propio Filter; no afecta a las otras.' },
        { nombre: 'Busy day', ruta: '/?day=busy', nota: 'Con muchos turnos las columnas scrollean adentro, sin estirar la página.' },
      ],
    },
    {
      nombre: 'Dashboard — Check In & Check Out',
      rol: 'Recepción',
      jira: ['CON-3116'],
      resumen: 'Recibir al paciente: Check In lo pasa a Waiting Room; Check Out lo retira al terminar.',
      pantallas: [
        { nombre: 'Appointment details', ruta: '/', hacer: texto(/Dr\. Elena Martinez/), nota: 'Tocar un turno abre su ficha flotante: motivo, visita, procedimientos y datos del paciente.' },
        { nombre: 'Check In', ruta: '/', hacer: clic(/^Check In/), nota: 'Check In pasa el turno a Waiting Room y avisa con un toast.' },
        { nombre: 'Check Out', hacer: clic(/^Check Out/), nota: 'Check Out lo saca de Waiting Room.' },
        { nombre: 'Appointment actions', ruta: '/', hacer: (p) => p.getByRole('button', { name: /Actions for Noah James/ }).locator('visible=true').first().click(), nota: 'El ⋮ del turno: acciones sobre la cita (reprogramar, cancelar).' },
      ],
    },
    {
      nombre: 'Dashboard — Rooms',
      rol: 'Recepción',
      jira: ['CON-3116'],
      resumen: 'Ver el estado de cada sala y su día.',
      pantallas: [
        { nombre: 'Room expanded', ruta: '/', hacer: clic(/^Operatory 1/), nota: 'Tocar una sala despliega su día (no filtra Waiting Room). Estados: Available, Busy, Unavailable.' },
        { nombre: 'Filter waiting room', ruta: '/', hacer: pasos(clic(/Filter waiting room/), clic(/Operatory 4/, 'menuitemcheckbox')), nota: 'Waiting Room se filtra con su propio Filter.' },
      ],
    },
    {
      nombre: 'Dashboard — Pending Task',
      rol: 'Odontólogo',
      jira: ['CON-2639'],
      resumen: 'Tareas clínicas por cerrar: Clinical Note, Lab Orders, Prescriptions y Referrals.',
      pantallas: [
        { nombre: 'Pending Task · Referrals', ruta: '/', hacer: clic(/^Referrals/, 'tab'), nota: 'Las pestañas acotan la lista por tipo; cada una dice cuántas hay.' },
        { nombre: 'Show more', ruta: '/', hacer: clic(/^Show \d+ more/), nota: 'Show N more abre el resto con scroll adentro (ui/show-more).' },
        { nombre: 'Complete this Task', ruta: '/', hacer: clic('Complete this Task'), nota: 'Complete this Task lleva a completar la tarea; Open document abre el documento asociado.' },
      ],
    },
  ],
}
