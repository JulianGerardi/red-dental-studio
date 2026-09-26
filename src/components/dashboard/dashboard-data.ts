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

export type Turno = Appointment & { completado?: boolean }
export type EnEspera = Appointment & { nuevo?: boolean }

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
  TASK_KINDS.flatMap((kind) =>
    Array.from({ length: porTipo }, () => ({
      kind,
      state: 'Requested',
      person: 'Elena Marquez',
      initials: 'EM',
      register,
      expiration,
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
      turno('Noah James', 'NJ', 'Dr. Elena Martinez', 'Operatory 2', '10:00'),
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:30'),
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '11:00'),
      turno('Mara Otero', 'MO', 'Dr. Salgado', 'Operatory 1', '11:30'),
      turno('Elias Aguirre', 'EA', 'Dr. Salgado', 'Operatory 3', '08:30', { completado: true }),
      turno('Ines Bermudez', 'IB', 'Dr. Elena Martinez', 'Operatory 1', '09:00', { completado: true }),
    ],
    waiting: [
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:00', { accion: 'Cancel', nuevo: true }),
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:00'),
      turno('Noah James Smith', 'NS', 'Dr. Elena Martinez', 'Operatory 2', '10:00'),
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
      turno('Mara Otero', 'MO', 'Dr. Elena Martinez', 'Operatory 1', '09:00', { nuevo: true }),
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
  `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`

export const datosDelDia = (d: Date) => DIAS[claveFecha(d)] ?? DIA_VACIO

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
