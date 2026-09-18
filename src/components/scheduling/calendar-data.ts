/* Figma 3847:166205 "Scheduling — Calendar". Colores muestreados del frame. */

export type ApptState =
  | 'Proposed' | 'Check-in' | 'Booked' | 'In progress'
  | 'Fulfilled' | 'No-show' | 'Cancelled'

export const LEGEND: { state: ApptState; dot: string | null }[] = [
  { state: 'Proposed', dot: '#ffb82c' },
  { state: 'Check-in', dot: '#1e9850' },
  { state: 'Booked', dot: '#1d56bc' },
  { state: 'In progress', dot: '#4f46e5' },
  { state: 'Fulfilled', dot: '#17723c' },
  /* En el Figma "No-show" es el único sin punto. Se replica tal cual. */
  { state: 'No-show', dot: null },
  { state: 'Cancelled', dot: '#71717a' },
]

export const BLOCK_STYLE: Record<string, { bg: string; bar: string; fg: string }> = {
  'Check-in':    { bg: '#ddf0e5', bar: '#1e9850', fg: '#17723c' },
  'Booked':      { bg: '#e8eef8', bar: '#1d56bc', fg: '#1d56bc' },
  'In progress': { bg: '#f5f0ff', bar: '#6633a6', fg: '#6633a6' },
  'Fulfilled':   { bg: '#e9f5ee', bar: '#1e9850', fg: '#17723c' },
  'Proposed':    { bg: '#fffaf0', bar: '#ffb82c', fg: '#99660d' },
  'No-show':     { bg: '#f4f4f5', bar: '#a1a1aa', fg: '#52525b' },
  'Cancelled':   { bg: '#f4f4f5', bar: '#71717a', fg: '#52525b' },
}

export type CalendarEvent = {
  day: number       // 0-6
  start: number     // hora decimal, ej 8.25 = 08:15
  duration: number  // en horas
  patient: string
  state: ApptState
  provider: string
  room: string
  reason: string
}

/* El Figma rotula los cuatro eventos "10:00 AM" aunque estén en franjas
   distintas, y ese rótulo fijo era el que se replicaba. Dejó de hacerse: la
   hora ahora sale siempre de `start`, así que el bloque, la vista de mes, el
   detalle y el toast dicen lo mismo. Un turno con dos horarios distintos según
   dónde se lo mire no es una anomalía a replicar, es un error de lectura.

   Los arranques se llevaron al cuarto de hora más cercano —los decimales
   venían de medir el alto del frame— para que la hora impresa sea una hora de
   agenda y no "08:12 AM". El bloque se mueve unos pocos píxeles. */
export const EVENTS: CalendarEvent[] = [
  { day: 1, start: 8.25,  duration: 2.5, patient: 'Maria Abril Viola', state: 'Check-in', provider: 'Dr. Elena Martinez', room: 'Operatory 2', reason: 'Routine cleaning appointment' },
  { day: 4, start: 8.25,  duration: 0.5, patient: 'John Smith', state: 'In progress', provider: 'Dr. Salgado', room: 'Operatory 1', reason: 'Prophylaxis - adult' },
  { day: 4, start: 9.5,   duration: 1,   patient: 'Noah James Smith', state: 'Booked', provider: 'Dr. Emily Chen', room: 'Operatory 3', reason: 'Implant consultation' },
  { day: 0, start: 13.0,  duration: 1,   patient: 'Elias Aguirre', state: 'Fulfilled', provider: 'Sarah Stone', room: 'Operatory 1', reason: 'Broken crown, in pain' },
]

/* Franjas no disponibles (gris) del extremo derecho del frame. */
export const BLOCKED = [
  { day: 6, start: 8, duration: 4 },
  { day: 6, start: 13, duration: 5 },
]

export const START_HOUR = 8
export const END_HOUR = 18
export const HOUR_PX = 63

/* El Figma rotula las siete columnas "THUR" (anomalía 2). Para que Day, Week
   y Month sean la misma agenda vista de tres formas hace falta fecha real, así
   que las columnas muestran el día que corresponde. La anomalía queda
   documentada pero no se replica — ver README.md, Desviaciones. */
export const DIAS_CORTOS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
export const MESES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/* Fecha de referencia del frame. La agenda arranca en la semana que la
   contiene. */
export const FECHA_ANCLA = new Date(2022, 4, 31)

export const inicioDeSemana = (d: Date) => {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  x.setDate(x.getDate() - x.getDay())
  return x
}
export const sumarDias = (d: Date, n: number) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}
export const mismoDia = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

/* Los eventos del mock vienen por índice de día; se anclan a la semana de
   referencia para tener fecha propia. */
export type EventoConFecha = Omit<CalendarEvent, 'day'> & { fecha: Date }

export const EVENTOS_INICIALES: EventoConFecha[] = EVENTS.map(({ day, ...e }) => ({
  ...e,
  fecha: sumarDias(inicioDeSemana(FECHA_ANCLA), day),
}))
