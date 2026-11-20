import type { Appointment } from '@/components/dashboard/AppointmentCard'
import type { Operatory } from '@/components/dashboard/OperatoryCard'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'

/* Todo el dashboard cuelga del filtro de fecha del panel de Appointments:
   el encabezado, la tira de stats, la sala de espera, las salas y las tareas.
   Antes cada bloque tenía su propio mock fijo y sólo Appointments filtraba,
   así que el día del encabezado no tenía nada que ver con lo que se mostraba.

   Los números de la tira **se calculan** de estas listas. En el frame dicen
   6 / 3 / 2 mientras el panel muestra tres turnos; acá el día por defecto se
   armó con seis turnos, dos ya completados, para que el número del Figma sea
   cierto y no una etiqueta suelta. */

/* La agenda del día: cada turno sabe si ya se atendió (`completado`) o si está en el sillón ahora (`enCurso`). Los que
   llegaron están además en `waiting`, con su etapa (dashboard.md, 2026-11-19). */
export type Turno = Appointment & {
  completado?: boolean
  enCurso?: boolean
  /** Cerrado sin atenderse: sale de Appointments y de la Waiting Room. Cancelled libera el lugar; No Show no (CON-1827, CON-1828). */
  cerrado?: 'Cancelled' | 'No Show'
}

/* Las tres etapas de la Waiting Room, según el encounter (CON-1670): Planned → Checked in, On Hold → On hold,
   Completed o Fulfilled → Ready to check out. */
export const ETAPAS_ESPERA = ['Checked in', 'On hold', 'Ready to check out'] as const
export type EtapaEspera = (typeof ETAPAS_ESPERA)[number]

/* `desde` (HH:MM): en Checked in, la hora del check-in; en On hold, el inicio de la pausa actual. Los minutos se
   calculan contra la hora actual (CON-4178): no se guardan. */
export type EnEspera = Appointment & { nuevo?: boolean; etapa: EtapaEspera; desde?: string }

/* La hora de "ahora" del día de la demo: Zoe Phillips hizo check-in a las 10:30 y lleva 12 minutos esperando. */
export const HORA_DEMO = '10:42'

const aMin = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5))
const aHora = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

/* Minutos desde `desde` hasta `ahora`; sin hora actual en el día (pasado o futuro), no hay cuenta. */
export function minutosDesde(desde: string | undefined, ahora: string | null) {
  if (!desde || !ahora) return undefined
  return Math.max(0, aMin(ahora) - aMin(desde))
}

export type DiaDashboard = {
  appointments: Turno[]
  waiting: EnEspera[]
  rooms: Operatory[]
  tasks: PendingTask[]
  encuentros: { abiertos: number; promedio: string }
}

export const TASK_KINDS = ['Clinical Note', 'Lab Orders', 'Prescriptions', 'Referrals']

/* El frame muestra las cuatro cards rotuladas "Referrals" bajo el tab
   "Clinical Note" (anomalía 20). Con el filtro andando el rótulo tiene que
   coincidir con la categoría, así que se reparten entre las cuatro.

   Cada tarea tiene su id, su paciente y un estado real de su tipo (CON-2643, CA3): Lab Orders Pending, Requested o
   Delayed; Prescriptions Pending; Referrals Requested o Pending; la Clinical Note, Fulfilled (la nota del encuentro que
   falta firmar, como red.dev). El PDF existe una vez pedida la orden: las Pending todavía no tienen (dashboard.md,
   2026-11-20). */
const ESTADOS_TAREA: Record<string, string[]> = {
  'Clinical Note': ['Fulfilled'], 'Lab Orders': ['Pending', 'Requested', 'Delayed'], Prescriptions: ['Pending'], Referrals: ['Requested', 'Pending'],
}
type Persona = { name: string; provider: string }
const ELENA: Persona = { name: 'Elena Marquez', provider: 'Dr. Elena Martinez' }
const inicialesDe = (n: string) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase()
export const slugPaciente = (n: string) => n.toLowerCase().replace(/\s+/g, '-')

const tareas = (clave: string, porTipo: number, register: string, vence: string | string[], gente: Persona[] = [ELENA]): PendingTask[] =>
  TASK_KINDS.flatMap((kind, k) =>
    Array.from({ length: porTipo }, (_, i) => {
      const p = gente[(k * porTipo + i) % gente.length]!
      const estados = ESTADOS_TAREA[kind]!
      const state = estados[i % estados.length]!
      return {
        id: `${clave}-${kind.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        kind, state, person: p.name, initials: inicialesDe(p.name), patientId: slugPaciente(p.name), provider: p.provider,
        register, expiration: typeof vence === 'string' ? vence : vence[(k * porTipo + i) % vence.length]!, pdf: state !== 'Pending',
      }
    }),
  )

/* Las salas de la clínica (Figma 476:66770: Emergency y cinco operatorios). El estado que se ve no sale de acá: el
   Dashboard lo calcula con los turnos de cada sala (`resumenSala`). */
const SALAS = ['Emergency', 'Operatory 1', 'Operatory 2', 'Operatory 3', 'Operatory 4', 'Operatory 5']
const salas = (): Operatory[] =>
  SALAS.map((name) => ({ name, status: 'Available', patientsToday: 0, provider: '' }))

const turno = (
  name: string, initials: string, provider: string, operatory: string, time: string,
  extra: Partial<Turno> = {},
): Turno => ({ name, initials, provider, operatory, time, ...extra })

/* El que llegó sigue en la agenda y además pasa a la sala de espera con su etapa. */
/* `hace`: cuántos minutos antes de la hora de la demo (10:42) fue el check-in o empezó la pausa. */
const espera = (t: Turno, etapa: EtapaEspera, hace?: number, nuevo?: boolean): EnEspera => ({
  name: t.name, initials: t.initials, provider: t.provider, operatory: t.operatory, time: t.time, motivo: t.motivo,
  etapa, desde: hace === undefined ? undefined : aHora(aMin(HORA_DEMO) - hace), nuevo,
})

/* El día de la demo, armado sobre el Figma de la comparativa (476:66770): los nombres y etapas de cada columna. */
const MARTINEZ = 'Dr. Elena Martinez'
const SALGADO = 'Dr. Salgado'
const CHEN = 'Dr. Emily Chen'
const ANDERSON = 'Dr. Daniel Anderson'
const LLEGARON = {
  zoe: turno('Zoe Phillips', 'ZP', ANDERSON, 'Operatory 1', '10:30', { motivo: 'Cleaning' }),
  henry: turno('Henry Richardson', 'HR', MARTINEZ, 'Operatory 2', '09:30', { motivo: 'Filling' }),
  ethan: turno('Ethan Carter', 'EC', SALGADO, 'Operatory 3', '09:45', { motivo: 'Consultation' }),
  matthew: turno('Matthew Jenkins', 'MJ', SALGADO, 'Operatory 3', '08:30', { motivo: 'Check-up' }),
  ava: turno('Ava Collins', 'AC', ANDERSON, 'Operatory 1', '08:45', { motivo: 'Cleaning' }),
  hannah: turno('Hannah Powell', 'HP', MARTINEZ, 'Operatory 2', '09:00', { motivo: 'Consultation' }),
  lucas: turno('Lucas Moreno', 'LM', CHEN, 'Operatory 4', '09:15', { motivo: 'Check-up' }),
  emma: turno('Emma Fischer', 'EF', ANDERSON, 'Operatory 1', '09:30', { motivo: 'Filling' }),
}

/* Clave dd-mm-aaaa (`formatDMY`); el selector la muestra como "Feb 28, 2026". */
export const DIAS: Record<string, DiaDashboard> = {
  '28-02-2026': {
    appointments: [
      turno('Lucia Vidal', 'LV', ANDERSON, 'Operatory 1', '08:00', { completado: true, motivo: 'Cleaning' }),
      turno('Tomas Vidal', 'TV', CHEN, 'Operatory 4', '08:15', { completado: true, motivo: 'Check-up' }),
      ...Object.values(LLEGARON),
      turno('Olivia Brooks', 'OB', MARTINEZ, 'Operatory 2', '10:00', { enCurso: true, motivo: 'Filling' }),
      turno('Charlotte Reed', 'CR', SALGADO, 'Operatory 3', '10:00', { enCurso: true, motivo: 'Cleaning' }),
      turno('Samuel Ross', 'SR', CHEN, 'Operatory 4', '10:15', { enCurso: true, motivo: 'Consultation' }),
      /* Todavía no llegaron: son los de Appointments. */
      turno('Noah James', 'NJ', MARTINEZ, 'Operatory 5', '10:00', { motivo: 'Consultation' }),
      turno('Sophia Collins', 'SC', MARTINEZ, 'Operatory 2', '11:30', { motivo: 'Cleaning' }),
      turno('James Foster', 'JF', SALGADO, 'Operatory 3', '11:30', { motivo: 'Check-up' }),
      turno('Gabriel Griffin', 'GG', CHEN, 'Operatory 4', '11:30', { motivo: 'Filling' }),
      turno('Mara Otero', 'MO', SALGADO, 'Operatory 1', '12:00', { motivo: 'Cleaning' }),
      turno('Elias Aguirre', 'EA', SALGADO, 'Operatory 3', '13:00', { motivo: 'Check-up' }),
      turno('Ines Bermudez', 'IB', MARTINEZ, 'Operatory 1', '16:00', { motivo: 'Consultation' }),
      turno('Sofia Chen', 'SC', CHEN, 'Operatory 4', '17:00', { motivo: 'Cleaning' }),
      turno('Martin Smith', 'MS', MARTINEZ, 'Operatory 2', '18:00', { motivo: 'Check-up' }),
    ],
    waiting: [
      espera(LLEGARON.zoe, 'Checked in', 12, true),
      espera(LLEGARON.henry, 'On hold', 23),
      espera(LLEGARON.ethan, 'On hold', 10),
      espera(LLEGARON.matthew, 'Ready to check out'),
      espera(LLEGARON.ava, 'Ready to check out'),
      espera(LLEGARON.hannah, 'Ready to check out'),
      espera(LLEGARON.lucas, 'Ready to check out'),
      espera(LLEGARON.emma, 'Ready to check out'),
    ],
    rooms: salas(),
    tasks: tareas('28-02', 2, '02/20/2026', ['02/26/2026', '03/06/2026', '03/12/2026'], [
      /* Olivia y Charlotte están en el sillón y Henry en pausa (encuentro abierto); Sophia y James todavía no llegaron. */
      { name: 'Henry Richardson', provider: MARTINEZ }, { name: 'Sophia Collins', provider: MARTINEZ },
      { name: 'Olivia Brooks', provider: MARTINEZ }, { name: 'James Foster', provider: SALGADO },
      { name: 'Charlotte Reed', provider: SALGADO },
    ]),
    encuentros: { abiertos: 5, promedio: '18 min avg.' },
  },

  '03-03-2026': {
    appointments: [
      turno('Mara Otero', 'MO', 'Dr. Elena Martinez', 'Operatory 1', '09:00'),
      turno('Elias Aguirre', 'EA', 'Dr. Salgado', 'Operatory 3', '16:15'),
      turno('John Smith', 'JS', 'Dr. Emily Chen', 'Operatory 2', '12:00', { completado: true }),
    ],
    waiting: [
      espera(turno('Mara Otero', 'MO', 'Dr. Elena Martinez', 'Operatory 1', '09:00'), 'Checked in', 5, true),
    ],
    rooms: salas(),
    tasks: tareas('03-03', 1, '03/20/2025', '03/18/2025'),
    encuentros: { abiertos: 1, promedio: '22 min avg.' },
  },

  '10-03-2026': {
    appointments: [
      turno('Ines Bermudez', 'IB', 'Dr. Salgado', 'Operatory 2', '08:30'),
      turno('Maria Abril Viola', 'AV', 'Dr. Emily Chen', 'Operatory 1', '14:00'),
    ],
    waiting: [],
    rooms: salas(),
    tasks: tareas('10-03', 1, '03/24/2025', '03/22/2025').slice(0, 2),
    encuentros: { abiertos: 1, promedio: '12 min avg.' },
  },
}

export const DIA_VACIO: DiaDashboard = {
  appointments: [],
  waiting: [],
  rooms: salas(),
  tasks: [],
  encuentros: { abiertos: 0, promedio: 'no data' },
}

/* El chip del Figma dice 30-02-2026, una fecha que no existe. Al volverse
   filtro real no puede ser el valor seleccionado, así que el default pasa a
   28-02-2026. Ver README.md, anomalía 4. Se exporta para que cualquier
   pantalla que necesite "el día de hoy" de la demo (Dashboard, y el panel de
   Today Appointments de Patients) mire siempre el mismo día. */
export const HOY_DEMO = new Date(2026, 1, 28)

export const claveFecha = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`

export const datosDelDia = (d: Date) => DIAS[claveFecha(d)] ?? DIA_VACIO

/* Los turnos del panel Today Appointments de Patients. Fijos y aparte de DIAS: el día de la demo del Dashboard se
   rearmó con la comparativa del 2026-11-19 y Patients no cambia. */
export const TURNOS_PATIENTS: Turno[] = [
  turno('Noah James', 'NJ', 'Dr. Elena Martinez', 'Operatory 2', '10:00', { motivo: 'Consultation' }),
  turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:30', { motivo: 'Cleaning' }),
  turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '11:00', { motivo: 'Check-up' }),
  turno('Mara Otero', 'MO', 'Dr. Salgado', 'Operatory 1', '11:30', { motivo: 'Cleaning' }),
  turno('Elias Aguirre', 'EA', 'Dr. Salgado', 'Operatory 3', '08:30', { completado: true, motivo: 'Check-up' }),
  turno('Ines Bermudez', 'IB', 'Dr. Elena Martinez', 'Operatory 1', '09:00', { completado: true, motivo: 'Consultation' }),
  turno('Sofia Chen', 'SC', 'Dr. Emily Chen', 'Operatory 4', '12:00', { motivo: 'Cleaning' }),
  turno('Sofia Chen', 'SC', 'Dr. Emily Chen', 'Operatory 2', '12:00'),
  turno('Daniel Ortiz', 'DO', 'Dr. Salgado', 'Operatory 3', '13:30'),
  turno('Lena Park', 'LP', 'Dr. Elena Martinez', 'Operatory 1', '14:30'),
  turno('Thomas Davis', 'TD', 'Dr. Emily Chen', 'Operatory 2', '15:00'),
]

/* Días con datos, para los puntitos del calendario. */
export const DIAS_CON_DATOS = Object.keys(DIAS).map((k) => {
  const [dd, mm, yyyy] = k.split('-').map(Number)
  return new Date(yyyy, mm - 1, dd)
})


export const fechaDesdeClave = (clave: string) => {
  const [dd, mm, yyyy] = clave.split('-').map(Number)
  return new Date(yyyy, mm - 1, dd)
}

export type Origen = { clave: string; panel: 'appointments' | 'waiting'; index: number }

/* Mueve un turno de un día a otro (o lo actualiza en el mismo). Devuelve el
   mapa completo, porque el día destino puede no existir todavía. */
export function reprogramar(
  dias: Record<string, DiaDashboard>,
  origen: Origen,
  destino: string,
  turnoNuevo: Turno,
): Record<string, DiaDashboard> {
  const salida = { ...dias }
  const dOrigen = salida[origen.clave] ?? DIA_VACIO
  const original = dOrigen[origen.panel][origen.index]
  if (!original) return dias
  /* El turno está en la agenda y, si llegó, también en la sala de espera: se mueve en las dos. */
  const k = claveTurno(original)
  const enAgenda = dOrigen.appointments.find((a) => claveTurno(a) === k)
  const enSala = dOrigen.waiting.find((w) => claveTurno(w) === k)
  salida[origen.clave] = {
    ...dOrigen,
    appointments: dOrigen.appointments.filter((a) => claveTurno(a) !== k),
    waiting: dOrigen.waiting.filter((w) => claveTurno(w) !== k),
  }
  const dDestino = salida[destino] ?? DIA_VACIO
  /* A otro día vuelve a estar reservado: todavía no llegó. */
  const sigueEnSala = enSala && destino === origen.clave
  salida[destino] = {
    ...dDestino,
    appointments: [...dDestino.appointments, { ...enAgenda, ...turnoNuevo }],
    waiting: sigueEnSala ? [...dDestino.waiting, { ...enSala, ...turnoNuevo }] : dDestino.waiting,
  }
  return salida
}

/* Para otros días que no son el de la demo: hoy, la hora real; un día pasado ya terminó y uno futuro no empezó. */

/* La hora actual dentro del día elegido, o null si el día ya terminó o no empezó (no hay espera que contar). */
export function horaDelDia(fecha: Date, ahora = new Date()) {
  const h = horaActual(fecha, ahora)
  return h === '24:00' || h === '00:00' ? null : h
}

export function horaActual(fecha: Date, ahora = new Date()) {
  const dia = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  if (dia(fecha) === dia(HOY_DEMO)) return HORA_DEMO
  if (dia(fecha) < dia(ahora)) return '24:00'
  if (dia(fecha) > dia(ahora)) return '00:00'
  return `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`
}

/* Mark as no-show sólo para una cita Booked cuya hora ya pasó: no para una futura (comparativa del 2026-11-19, CON-1828).
   Lo que no se marca a mano pasa solo a No Show al cierre del día (CON-1995). */
export const puedeNoShow = (t: Appointment, fecha: Date) => t.time < horaActual(fecha)

/* Los motivos de cancelación, en el orden de CON-2801. */
export const MOTIVOS_CANCELACION = [
  'Patient illness', 'Family emergency', 'Transportation issue', 'Work conflict', 'Financial reasons', 'Insurance change',
  'Change of dentist', 'Rescheduled by patient', 'Patient treatment declined', 'Patient missed communication',
  'Provider illness', 'Provider emergency', 'Clinic closure', 'Overbooking', 'Equipment unavailable', 'Clinical emergency',
  'Provider schedule change', 'Weather/unsafe conditions', 'Staff shortage', 'Administrative error',
]

/* Identifica un turno entre la agenda y la sala de espera (los mocks no traen id). */
export const claveTurno = (t: Appointment) => `${t.name}|${t.time}|${t.operatory}`

/* Lo que muestra cada columna, todo de la misma agenda (dashboard.md, 2026-11-19). */
export const pendientesDeLlegar = (dia: DiaDashboard) => {
  const llegaron = new Set(dia.waiting.map(claveTurno))
  return dia.appointments
    .filter((a) => !a.completado && !a.enCurso && !a.cerrado && !llegaron.has(claveTurno(a)))
    .sort((a, b) => a.time.localeCompare(b.time))
}

export type ResumenSala = {
  status: Operatory['status']
  cuantos: number
  ahora?: Turno
  siguiente?: Turno
}

/* Busy si hay alguien en el sillón; No bookings si hoy no tiene turnos; si no, Available. Next es el primero que
   todavía no pasó por la sala: reservado o recién llegado (Checked in), por hora. */
export function resumenSala(room: Operatory, dia: DiaDashboard): ResumenSala {
  /* Un turno cancelado libera la sala; un No Show sigue ocupando su lugar en la cuenta (CON-1828), pero no es Next. */
  const turnos = dia.appointments.filter((a) => a.operatory === room.name && a.cerrado !== 'Cancelled')
  const etapa = new Map(dia.waiting.map((w) => [claveTurno(w), w.etapa]))
  const ahora = turnos.find((t) => t.enCurso)
  const siguiente = turnos
    .filter((t) => !t.completado && !t.enCurso && !t.cerrado && (etapa.get(claveTurno(t)) ?? 'Checked in') === 'Checked in')
    .sort((a, b) => a.time.localeCompare(b.time))[0]
  const status = room.status === 'Unavailable' ? 'Unavailable' : ahora ? 'Busy' : turnos.length === 0 ? 'No bookings' : 'Available'
  return { status, cuantos: turnos.length, ahora, siguiente }
}

/* Propuesta de volumen (dashboard.md, 2026-10-12): un día real de una clínica con cinco sillones, con los mismos datos
   que el día de la demo —los mismos campos, nada nuevo—, en más cantidad: 35 turnos, 8 en la sala de espera y 28 tareas.
   Lo carga `?day=busy`. */
const NOMBRES = [
  'Mara Otero', 'Elias Aguirre', 'Ines Bermudez', 'Noah James Smith', 'Sofia Chen', 'Daniel Ortiz', 'Lena Park',
  'Thomas Davis', 'Maria Abril Viola', 'John Smith', 'Nadia Serrano', 'Tomas Vidal', 'Bruno Calvo', 'Alma Duarte',
  'Ciro Esquivel', 'Lucia Vidal', 'Ruben Serrano', 'Emily Clark', 'Robert Brown', 'Sophia Johnson', 'Mark Wilson',
  'Marco Rivera', 'Julia Romero', 'Pablo Ferrer', 'Valentina Ruiz', 'Diego Navarro', 'Camila Ortega', 'Hugo Medina',
  'Olivia Grant', 'Lucas Moreno', 'Emma Fischer', 'Mateo Rossi', 'Chloe Martin', 'Samuel Ortiz', 'Zoe Turner',
  'Leo Bianchi', 'Martina Paz', 'Iker Soto', 'Elena Marquez', 'Abril Viola', 'Julian Vega', 'Rosa Medina', 'Ana Ibarra',
]
const PROVIDERS = ['Dr. Elena Martinez', 'Dr. Salgado', 'Dr. Emily Chen', 'Dr. Elena Martinez', 'Dr. Salgado']
const iniciales = (n: string) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase()
const hora = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

const MOTIVOS = ['Check-up', 'Cleaning', 'Consultation', 'Filling']

/* Cinco operatorios, un turno cada 45 minutos desde las 8: los doce primeros completados, tres en el sillón, ocho en la
   sala de espera repartidos en sus tres etapas y el resto todavía por llegar. */
const AGENDA_CARGADA = NOMBRES.slice(0, 35).map((name, i) =>
  turno(
    name, iniciales(name), PROVIDERS[i % 5]!, `Operatory ${(i % 5) + 1}`,
    hora(480 + Math.floor(i / 5) * 45 + [0, 15, 30, 0, 15][i % 5]!),
    { motivo: MOTIVOS[i % 4], ...(i < 12 ? { completado: true } : i < 15 ? { enCurso: true } : {}) },
  ))

export const DIA_CARGADO: DiaDashboard = {
  appointments: AGENDA_CARGADA,
  waiting: AGENDA_CARGADA.slice(15, 23).map((t, i) =>
    espera(t, ETAPAS_ESPERA[i % 3]!, i % 3 === 0 ? 4 + i * 3 : i % 3 === 1 ? 6 + i : undefined, i % 3 === 0)),
  rooms: salas(),
  tasks: tareas('cargado', 7, '03/17/2025', '03/15/2025', NOMBRES.slice(0, 15).map((name, i) => ({ name, provider: PROVIDERS[i % 5]! }))),
  encuentros: { abiertos: 6, promedio: '21 min avg.' },
}

/* Las tareas del Patient Dashboard: todas del paciente de la ficha (CON-2643, CA9). Tres Lab Orders, una por estado, y
   dos de cada uno de los otros tipos: las mismas nueve de antes. */
export const TAREAS_PACIENTE: PendingTask[] = tareas('paciente', 3, '10/02/2026', ['11/14/2026', '12/05/2026', '11/28/2026'], [{ name: 'John Smith', provider: MARTINEZ }])
  .filter((t) => t.kind === 'Lab Orders' || !t.id?.endsWith('-3'))

/* Para Clinical Mode: la tarea que abrió Complete this Task, venga del Dashboard o del Patient Dashboard. */
export const buscarTarea = (id: string) =>
  [...Object.values(DIAS).flatMap((d) => d.tasks), ...DIA_CARGADO.tasks, ...TAREAS_PACIENTE].find((t) => t.id === id)
