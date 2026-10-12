import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Appointment } from '@/components/dashboard/AppointmentCard'
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

export type Turno = Appointment & {
  completado?: boolean
  /** En el sillón desde esa hora ("09:30"). Lo usan las variantes A y B (dashboard.md, 2026-10-12). */
  enSillon?: string
}
export type EnEspera = Appointment & {
  nuevo?: boolean
  /** Minutos en la sala de espera. */
  espera?: number
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
   coincidir con la categoría, así que se reparten entre las cuatro. */
const tareas = (porTipo: number, register: string, expiration: string): PendingTask[] =>
  TASK_KINDS.flatMap((kind, k) =>
    Array.from({ length: porTipo }, (_, j) => ({
      kind,
      state: 'Requested',
      person: 'Elena Marquez',
      initials: 'EM',
      register,
      expiration,
      vence: [-3, 0, 4, -1, 2, 9][(k * porTipo + j) % 6],
    })),
  )

const salas = (statuses: Operatory['status'][], pacientes: number): Operatory[] =>
  statuses.map((status) => ({
    name: 'Operatory name',
    status,
    patientsToday: pacientes,
    provider: 'Daniel Anderson',
  }))

const turno = (
  name: string, initials: string, provider: string, operatory: string, time: string,
  extra: Partial<Turno & EnEspera> = {},
): Turno & EnEspera => ({ name, initials, provider, operatory, time, ...extra })

/* Clave dd-mm-aaaa, la misma que muestra el chip del filtro. */
export const DIAS: Record<string, DiaDashboard> = {
  '28-02-2026': {
    appointments: [
      turno('Noah James', 'NJ', 'Dr. Elena Martinez', 'Operatory 2', '10:00', { enSillon: '10:02' }),
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:30'),
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '11:00'),
      turno('Mara Otero', 'MO', 'Dr. Salgado', 'Operatory 1', '11:30'),
      turno('Elias Aguirre', 'EA', 'Dr. Salgado', 'Operatory 3', '08:30', { completado: true }),
      turno('Ines Bermudez', 'IB', 'Dr. Elena Martinez', 'Operatory 1', '09:00', { completado: true }),
    ],
    waiting: [
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:00', { accion: 'Cancel', nuevo: true, espera: 24 }),
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:00', { espera: 12 }),
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:00', { espera: 6 }),
    ],
    rooms: salas(['Available', 'Busy', 'Busy', 'Busy', 'Unavailable', 'Busy'], 12),
    tasks: tareas(2, 'March 17, 2025', 'March 15, 2025'),
    encuentros: { abiertos: 2, promedio: '18 min avg.' },
  },

  '03-03-2026': {
    appointments: [
      turno('Mara Otero', 'MO', 'Dr. Elena Martinez', 'Operatory 1', '09:00'),
      turno('Elias Aguirre', 'EA', 'Dr. Salgado', 'Operatory 3', '16:15'),
      turno('John Smith', 'JS', 'Dr. Emily Chen', 'Operatory 2', '12:00', { completado: true }),
    ],
    waiting: [
      turno('Mara Otero', 'MO', 'Dr. Elena Martinez', 'Operatory 1', '09:00', { nuevo: true, espera: 9 }),
    ],
    rooms: salas(['Busy', 'Available', 'Available', 'Busy', 'Available', 'Unavailable'], 7),
    tasks: tareas(1, 'March 20, 2025', 'March 18, 2025'),
    encuentros: { abiertos: 1, promedio: '22 min avg.' },
  },

  '10-03-2026': {
    appointments: [
      turno('Ines Bermudez', 'IB', 'Dr. Salgado', 'Operatory 2', '08:30'),
      turno('Maria Abril Viola', 'AV', 'Dr. Emily Chen', 'Operatory 1', '14:00'),
    ],
    waiting: [],
    rooms: salas(['Available', 'Available', 'Busy', 'Available', 'Available', 'Available'], 4),
    tasks: tareas(1, 'March 24, 2025', 'March 22, 2025').slice(0, 2),
    encuentros: { abiertos: 1, promedio: '12 min avg.' },
  },
}

export const DIA_VACIO: DiaDashboard = {
  appointments: [],
  waiting: [],
  rooms: salas(['Available', 'Available', 'Available', 'Available', 'Available', 'Available'], 0),
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
  \`\${String(d.getDate()).padStart(2, '0')}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${d.getFullYear()}\`

export const datosDelDia = (d: Date) => DIAS[claveFecha(d)] ?? DIA_VACIO

/* Los 10 turnos del panel de Patients: los 6 del día + 4 más. Aparte de DIAS
   porque la tira del Dashboard cuenta los del día (6 / 3 / 2 del Figma). */
export const TURNOS_PATIENTS: Turno[] = [
  ...DIAS['28-02-2026'].appointments,
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
  salida[origen.clave] = {
    ...dOrigen,
    [origen.panel]: dOrigen[origen.panel].filter((_, i) => i !== origen.index),
  }
  const dDestino = salida[destino] ?? { ...DIA_VACIO, rooms: DIA_VACIO.rooms }
  salida[destino] = {
    ...dDestino,
    [origen.panel]: [...dDestino[origen.panel], turnoNuevo],
  }
  return salida
}


/* ── Propuesta de volumen (dashboard.md, 2026-10-12) ─────────────────────
   Un día real de una clínica con cinco sillones: 40 pacientes y 28 tareas. Sirve para probar las variantes A y B (y la
   actual) con volumen. Lo carga \`?day=busy\`. La hora de la demo es AHORA_DEMO. */
export const AHORA_DEMO = '10:40'

const NOMBRES = [
  'Mara Otero', 'Elias Aguirre', 'Ines Bermudez', 'Noah James Smith', 'Sofia Chen', 'Daniel Ortiz', 'Lena Park',
  'Thomas Davis', 'Maria Abril Viola', 'John Smith', 'Nadia Serrano', 'Tomas Vidal', 'Bruno Calvo', 'Alma Duarte',
  'Ciro Esquivel', 'Lucia Vidal', 'Ruben Serrano', 'Emily Clark', 'Robert Brown', 'Sophia Johnson', 'Mark Wilson',
  'Marco Rivera', 'Julia Romero', 'Pablo Ferrer', 'Valentina Ruiz', 'Diego Navarro', 'Camila Ortega', 'Hugo Medina',
  'Olivia Grant', 'Lucas Moreno', 'Emma Fischer', 'Mateo Rossi', 'Chloe Martin', 'Samuel Ortiz', 'Zoe Turner',
  'Leo Bianchi', 'Martina Paz', 'Iker Soto', 'Elena Marquez', 'Abril Viola',
]
const SILLONES = [
  ['Operatory 1', 'Dr. Elena Martinez'], ['Operatory 2', 'Dr. Salgado'], ['Operatory 3', 'Dr. Emily Chen'],
  ['Operatory 4', 'Sarah Stone'], ['Operatory 5', 'Dr. Salgado'],
] as const
const iniciales = (n: string) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase()
const hora = (min: number) => \`\${String(Math.floor(min / 60)).padStart(2, '0')}:\${String(min % 60).padStart(2, '0')}\`

/* Cinco sillones, un turno cada 45 minutos desde las 8. A las 10:40: doce terminados, cinco en el sillón, cinco
   esperando (los sillones están llenos) y el resto por venir. */
const CARGADOS = NOMBRES.map((name, i) => {
  const [operatory, provider] = SILLONES[i % 5]!
  return turno(name, iniciales(name), provider, operatory, hora(480 + Math.floor(i / 5) * 45 + [0, 15, 30, 0, 15][i % 5]!))
})
const EN_SILLON: Record<number, string> = { 12: '10:02', 13: '09:31', 14: '09:48', 15: '10:16', 16: '10:33' }
const ESPERANDO: Record<number, number> = { 17: 27, 18: 22, 19: 14, 20: 8, 21: 3 }
const VENCE = [-6, -4, -3, -2, -1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15]

export const DIA_CARGADO: DiaDashboard = {
  appointments: CARGADOS
    .map((t, i) => (i < 12 ? { ...t, completado: true } : EN_SILLON[i] ? { ...t, enSillon: EN_SILLON[i] } : t))
    .filter((_, i) => !(i in ESPERANDO)),
  waiting: CARGADOS
    .map((t, i) => ({ ...t, espera: ESPERANDO[i], nuevo: i === 19 }))
    .filter((_, i) => i in ESPERANDO),
  rooms: [
    ...SILLONES.map(([name, provider], i) => ({
      name, provider, status: 'Busy' as const, patientsToday: 8, paciente: CARGADOS[[15, 16, 12, 13, 14][i]!]!.name,
    })),
    { name: 'Operatory 6', provider: 'Hygiene', status: 'Available', patientsToday: 0 },
    { name: 'Operatory 7', provider: 'Maintenance', status: 'Unavailable', patientsToday: 0 },
  ],
  tasks: VENCE.map((vence, i) => {
    const person = NOMBRES[(i * 7) % NOMBRES.length]!
    return {
      kind: TASK_KINDS[i % 4]!, state: 'Requested', person, initials: iniciales(person),
      register: 'February 20, 2026', expiration: vence < 0 ? \`February \${28 + vence}, 2026\` : 'March 2026', vence,
    }
  }),
  encuentros: { abiertos: 5, promedio: '41 min avg.' },
}

/* El paso que sigue de un turno: Check In (llegó: pasa a la sala de espera), Seat (de la espera al sillón) y Check Out
   (terminado). Devuelve el mapa completo, igual que reprogramar. */
export function avanzarTurno(
  dias: Record<string, DiaDashboard>, clave: string, panel: 'appointments' | 'waiting', index: number,
): Record<string, DiaDashboard> {
  const d = dias[clave] ?? DIA_VACIO
  const t = d[panel][index]
  if (!t) return dias
  const sin = <T,>(l: T[]) => l.filter((_, i) => i !== index)
  if (panel === 'waiting') {
    const { espera: _e, nuevo: _n, ...resto } = t as EnEspera
    return { ...dias, [clave]: { ...d, waiting: sin(d.waiting), appointments: [...d.appointments, { ...resto, enSillon: AHORA_DEMO }] } }
  }
  if ((t as Turno).enSillon) {
    return { ...dias, [clave]: { ...d, appointments: d.appointments.map((x, i) => (i === index ? { ...x, enSillon: undefined, completado: true } : x)) } }
  }
  return { ...dias, [clave]: { ...d, appointments: sin(d.appointments), waiting: [...d.waiting, { ...t, espera: 0 }] } }
}
`})))()}export{n,i as r,r as t};