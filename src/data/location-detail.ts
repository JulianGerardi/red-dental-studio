/* Datos de la ficha de una locación: Working Hours, Rooms y Exceptions.
   Figma 3864:277885 "Settings — Location". */

export type EstadoDia = { abierto: boolean; rangos: string[] }

/* loc-info2: el frame salta el martes -domingo, lunes, miércoles, jueves,
   viernes, sábado-. No se replica: un día ausente de la semana no es una
   decisión de diseño, es un error de contenido. */
/* `rangos` son franjas reales, no un rótulo "+N" sumado al array: la card de
   detalle del turno ya tuvo ese bug —un "+N" que no llevaba a nada— y la
   regla desde entonces es que todo "+N" se pueda desplegar. Acá el chip "+N"
   lo calcula el componente a partir de cuántas franjas hay de más; no hace
   falta guardar un marcador falso. */
export const HORARIO_SEMANAL: Record<string, EstadoDia> = {
  Sunday: { abierto: false, rangos: [] },
  Monday: { abierto: true, rangos: ['08:00 AM - 01:00 PM', '02:00 PM - 06:00 PM', '06:30 PM - 08:00 PM', '08:15 PM - 09:00 PM'] },
  Tuesday: { abierto: true, rangos: ['08:00 AM - 01:00 PM', '02:00 PM - 06:00 PM'] },
  Wednesday: { abierto: true, rangos: ['08:00 AM - 01:00 PM', '02:00 PM - 06:00 PM', '06:30 PM - 08:00 PM', '08:15 PM - 09:00 PM'] },
  Thursday: { abierto: true, rangos: ['08:00 AM - 01:00 PM', '02:00 PM - 06:00 PM', '06:30 PM - 08:00 PM', '08:15 PM - 09:00 PM'] },
  Friday: { abierto: true, rangos: ['08:00 AM - 01:00 PM', '02:00 PM - 06:00 PM', '06:30 PM - 08:00 PM', '08:15 PM - 09:00 PM'] },
  Saturday: { abierto: false, rangos: [] },
}

export type Sala = { id: string; nombre: string; tipo: string; abreviatura: string }

/* Rooms — Populated (3864:310040) repite "Daniel Anderson" —el nombre de un
   empleado— como nombre de sala, tres veces, con Type y Abbreviation en
   blanco. Es un placeholder de otro componente pegado en el lugar
   equivocado, no un dato a replicar: acá van nombres de sala reales. */
export const SALAS_INICIALES: Sala[] = []

export type EstadoExcepcion = 'Active' | 'Expired'

export type Excepcion = {
  id: string
  nombre: string
  abreviatura: string
  razon: string
  fecha: Date
  horaInicio: string
  horaFin: string
  todoElDia: boolean
  estado: EstadoExcepcion
}

/* Exceptions (3864:313606) repite "Radiological Assessment" con la misma
   fecha diez veces —otro placeholder, no contenido real—. Se reemplaza por
   excepciones que sí describen algo que interrumpe el horario habitual. */
export const EXCEPCIONES_INICIALES: Excepcion[] = [
  {
    id: 'exc1', nombre: 'Independence Day', abreviatura: 'HOL', razon: 'Holiday',
    fecha: new Date(2026, 6, 4), horaInicio: '', horaFin: '', todoElDia: true, estado: 'Active',
  },
  {
    id: 'exc2', nombre: 'Staff Training', abreviatura: 'TRN', razon: 'Staff Training',
    fecha: new Date(2026, 8, 18), horaInicio: '14:00 hs', horaFin: '17:00 hs', todoElDia: false, estado: 'Active',
  },
  {
    id: 'exc3', nombre: 'HVAC Maintenance', abreviatura: 'MNT', razon: 'Maintenance',
    fecha: new Date(2026, 2, 2), horaInicio: '', horaFin: '', todoElDia: true, estado: 'Expired',
  },
]
