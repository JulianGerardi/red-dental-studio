import type { DatosTurno } from './NewAppointmentModal'

/* El panel del FAB tenía una sola card ASAP de adorno, con un Cancel que no
   cancelaba nada, y la lista de espera vacía. Una solicitud sólo tiene dos
   salidas —se agenda o se cae—, así que las dos acciones viven en la card y
   "Schedule" abre el New Appointment ya cargado con lo que pidió el paciente:
   nadie debería retipear datos que el sistema ya tiene.

   Las dos listas son lo mismo con distinta urgencia, así que comparten forma
   y difieren sólo en el acento y en el rótulo. */

export type TipoSolicitud = 'ASAP' | 'Waiting List'

export type Solicitud = {
  id: string
  tipo: TipoSolicitud
  patient: string
  reason: string
  /** dd-mm-yyyy, el formato que come el DatePicker del modal. */
  date: string
  start: string
  end: string
  location: string
  provider: string
  operatory: string
  /** Sólo lista de espera: hace cuánto que espera. */
  espera?: string
}

export const SOLICITUDES: Solicitud[] = [
  {
    id: 's1', tipo: 'ASAP',
    patient: 'Maria Abril Viola', reason: 'Routine cleaning appointment',
    date: '12-03-2025', start: '10 AM', end: '11 AM',
    location: 'Los Angeles - 789 N Sunrise Street',
    provider: 'Dr. Elena Martinez', operatory: 'Operatory 2',
  },
  {
    id: 's2', tipo: 'ASAP',
    patient: 'Elias Aguirre', reason: 'Broken crown, in pain',
    date: '12-03-2025', start: '14 PM', end: '15 PM',
    location: 'Los Angeles - 789 N Sunrise Street',
    provider: 'Dr. Emily Chen', operatory: 'Operatory 1',
  },
  {
    id: 's3', tipo: 'Waiting List',
    patient: 'Noah James Smith', reason: 'Implant consultation',
    date: '13-03-2025', start: '09 AM', end: '10 AM',
    location: 'Los Angeles - 789 N Sunrise Street',
    provider: 'Dr. Emily Chen', operatory: 'Operatory 3',
    espera: 'Waiting 4 days',
  },
  {
    id: 's4', tipo: 'Waiting List',
    patient: 'John Smith', reason: 'Prophylaxis - adult',
    date: '14-03-2025', start: '11 AM', end: '12 PM',
    location: 'Los Angeles - 789 N Sunrise Street',
    provider: 'Dr. Salgado', operatory: 'Operatory 2',
    espera: 'Waiting 9 days',
  },
  {
    id: 's5', tipo: 'Waiting List',
    patient: 'Sofia Marin', reason: 'Bitewings - four radiographic images',
    date: '17-03-2025', start: '16 PM', end: '17 PM',
    location: 'Los Angeles - 789 N Sunrise Street',
    provider: 'Sarah Stone', operatory: 'Operatory 1',
    espera: 'Waiting 2 weeks',
  },
]

/** Lo que pidió el paciente, con la forma que espera el New Appointment. */
export function datosDeSolicitud(s: Solicitud): DatosTurno {
  return {
    patient: s.patient,
    primary: s.provider,
    requestor: s.patient,
    reason: s.reason,
    date: s.date,
    start: s.start,
    end: s.end,
    operatory: s.operatory,
    status: 'Booked',
  }
}

const MES_CORTO = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

/** dd-mm-yyyy -> "13 Mar 2025". El guion es formato de input, no de lectura. */
export function fechaLegible(fecha: string) {
  const [dd, mm, yyyy] = fecha.split('-')
  return `${Number(dd)} ${MES_CORTO[Number(mm) - 1] ?? mm} ${yyyy}`
}
