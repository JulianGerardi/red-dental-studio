import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Datos de la ficha de una locación: Working Hours, Rooms y Exceptions.
   Figma 3864:277885 "Settings — Location". */

export type EstadoDia = { abierto: boolean; rangos: string[] }

/* loc-info2: el frame salta el martes -domingo, lunes, miércoles, jueves,
   viernes, sábado-. No se replica: un día ausente de la semana no es una
   decisión de diseño, es un error de contenido. */
/* \`rangos\` son franjas reales, no un rótulo "+N" sumado al array: la card de
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

/* CON-404 "Registrar room": Name* y Type* obligatorios, Abbreviation opcional, Active / Inactive. Una sala inactiva no
   se ofrece para turnos nuevos pero queda guardada. \`turnos\` son los turnos programados en esa sala: desactivarla los
   pasa a la lista de espera (CON-1520). Ver figma/modulos/locations.md. */
export const TIPOS_SALA = ['Operatory', 'Consultation', 'X-Ray', 'Sterilization', 'Reception']

export type TurnoSala = { id: string; fecha: Date; provider: string; paciente: string }

export type Sala = { id: string; nombre: string; tipo: string; abreviatura: string; activa: boolean; turnos: TurnoSala[] }

/* Rooms — Populated (3864:310040) repite "Daniel Anderson" —el nombre de un empleado— como nombre de sala. No se
   replica: van las salas que usa la agenda (Operatory 1 a 3) y otras de una clínica real. */
export const SALAS_INICIALES: Sala[] = [
  {
    id: 'op1', nombre: 'Operatory 1', tipo: 'Operatory', abreviatura: 'OP1', activa: true,
    turnos: [
      { id: 't1', fecha: new Date(2026, 10, 9, 9, 0), provider: 'Dr. Elena Martinez', paciente: 'John Smith' },
      { id: 't2', fecha: new Date(2026, 10, 9, 10, 30), provider: 'Dr. Emily Chen', paciente: 'Noah James Smith' },
      { id: 't3', fecha: new Date(2026, 10, 10, 14, 0), provider: 'Dr. Salgado', paciente: 'Maria Abril Viola' },
    ],
  },
  {
    id: 'op2', nombre: 'Operatory 2', tipo: 'Operatory', abreviatura: 'OP2', activa: true,
    turnos: [{ id: 't4', fecha: new Date(2026, 10, 11, 8, 15), provider: 'Dr. Elena Martinez', paciente: 'Elias Aguirre' }],
  },
  { id: 'op3', nombre: 'Operatory 3', tipo: 'Operatory', abreviatura: 'OP3', activa: true, turnos: [] },
  { id: 'xr', nombre: 'X-Ray Room', tipo: 'X-Ray', abreviatura: 'XR', activa: true, turnos: [] },
  { id: 'cons', nombre: 'Consultation Room', tipo: 'Consultation', abreviatura: '', activa: true, turnos: [] },
  { id: 'ster', nombre: 'Sterilization', tipo: 'Sterilization', abreviatura: 'STR', activa: false, turnos: [] },
]

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
`})))()}export{r as n,n as r,i as t};