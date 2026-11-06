/* Figma 3817:865128 "Insurance" — 9 frames. Los datos de las dos variantes
   de la tabla salen de 3817:865704 y 3831:897436. */

export type OrdenPlan = 'Primary' | 'Secondary' | 'Tertiary'
export type RelacionPlan = 'Child' | 'Self' | 'Spouse' | 'Other'
export type EstadoPlan = 'Active' | 'Inactive'

export type PlanPaciente = {
  id: string
  orden: OrdenPlan
  carrier: string
  plan: string
  subscriber: string
  relacion: RelacionPlan
  cobertura: string
  /* En el segundo frame esta celda trae dos renglones (Primary / Secondary). */
  prioridad: string[]
  estado: EstadoPlan
}

/* La columna Priority Period siempre nombra el orden. En el primer frame las
   filas de Lucas Johnson traen el rango pelado y las de Robert el desglose
   Primary/Secondary; con las dos formas conviviendo no se entiende a qué
   corresponde la fecha. Ver modulos/insurance.md. */
export const PLANES: PlanPaciente[] = [
  { id: 'p1', orden: 'Primary', carrier: 'AETNA', plan: 'Plan 234254534', subscriber: 'Lucas Johnson', relacion: 'Child', cobertura: '01/12/2025 - Present', prioridad: ['Primary 01/12/2025 - Present'], estado: 'Active' },
  { id: 'p2', orden: 'Primary', carrier: 'AETNA', plan: 'Plan 234254534', subscriber: 'Lucas Johnson', relacion: 'Child', cobertura: '01/12/2025 - Present', prioridad: ['Primary 01/12/2025 - Present'], estado: 'Active' },
  { id: 'p3', orden: 'Primary', carrier: 'BCBS', plan: 'Plan 891234567', subscriber: 'Robert Johnson', relacion: 'Spouse', cobertura: '06/01/2023 - 12/31/2024', prioridad: ['Primary 01/12/2025 - Present', 'Secondary 03/12/2025 - 01/11/2025'], estado: 'Active' },
  { id: 'p4', orden: 'Primary', carrier: 'BCBS', plan: 'Plan 891234567', subscriber: 'Robert Johnson', relacion: 'Self', cobertura: '06/01/2023 - 12/31/2024', prioridad: ['Primary 01/12/2025 - Present', 'Secondary 03/12/2025 - 01/11/2025'], estado: 'Inactive' },
]

/* "Show plan history" no filtra por estado —el frame muestra una fila Inactive
   con el switch apagado— sino que suma los planes ya vencidos. */
export const PLANES_HISTORICOS: PlanPaciente[] = [
  { id: 'h1', orden: 'Secondary', carrier: 'Cigna', plan: 'Plan 118273645', subscriber: 'Lucas Johnson', relacion: 'Child', cobertura: '01/01/2021 - 12/31/2022', prioridad: ['Secondary 01/01/2021 - 12/31/2022'], estado: 'Inactive' },
  { id: 'h2', orden: 'Primary', carrier: 'MetLife', plan: 'Plan 556677889', subscriber: 'Robert Johnson', relacion: 'Spouse', cobertura: '03/01/2019 - 02/28/2021', prioridad: ['Primary 03/01/2019 - 02/28/2021'], estado: 'Inactive' },
]

/* La suscripción que la card de la izquierda muestra elegida. */
export const SUSCRIPCION = {
  subscriber: 'John Smith',
  subscriberId: 'JASDASD11243',
  carrier: 'Dental Dental Of California',
  plan: 'PPO Premiun Plan',
  cobertura: '01/01/2024 - 12/31/2024',
  dependientes: '2',
}

/* Las suscripciones que trae "Search for an existing subscription" (CON-3284 / CON-3282). `enUso`: ya hay patient
   insurances que la usan, y entonces no se puede borrar. Ver modulos/insurance.md, 2026-11-06. */
export type Suscripcion = {
  id: string
  subscriber: string
  subscriberId: string
  carrier: string
  plan: string
  cobertura: string
  dependientes: number
  estado: EstadoPlan
  enUso: boolean
}

export const SUSCRIPCIONES: Suscripcion[] = [
  { id: 's1', subscriber: SUSCRIPCION.subscriber, subscriberId: SUSCRIPCION.subscriberId, carrier: SUSCRIPCION.carrier, plan: SUSCRIPCION.plan, cobertura: SUSCRIPCION.cobertura, dependientes: 2, estado: 'Active', enUso: true },
  { id: 's2', subscriber: 'Lucas Johnson', subscriberId: 'AET-234254', carrier: 'AETNA', plan: 'Plan 234254534', cobertura: '01/12/2025 - Present', dependientes: 1, estado: 'Active', enUso: true },
  { id: 's3', subscriber: 'Robert Johnson', subscriberId: 'BCB-891234', carrier: 'BCBS', plan: 'Plan 891234567', cobertura: '06/01/2023 - 12/31/2024', dependientes: 2, estado: 'Inactive', enUso: true },
  { id: 's4', subscriber: 'Maria Smith', subscriberId: 'CIG-118273', carrier: 'Cigna', plan: 'HMO Basic', cobertura: '03/01/2026 - Present', dependientes: 0, estado: 'Active', enUso: false },
]

/* Lo que se ve y se busca: "Nombre - Subscriber ID", como red.dev. */
export const etiquetaSuscripcion = (s: Suscripcion) => `${s.subscriber} - ${s.subscriberId}`

/* Los planes de cada carrier: Plan Name se habilita recién con el carrier elegido. */
export const PLANES_POR_CARRIER: Record<string, string[]> = {
  AETNA: ['Plan 234254534', 'Aetna Dental PPO'],
  BCBS: ['Plan 891234567', 'BCBS Dental Plus'],
  'Dental Dental Of California': ['PPO Premiun Plan', 'HMO Basic'],
  Cigna: ['HMO Basic', 'Cigna Dental 1000'],
  MetLife: ['Plan 556677889', 'MetLife PDP'],
}
export const CARRIERS = Object.keys(PLANES_POR_CARRIER)
export const PLANES_NOMBRE = ['PPO Premiun Plan', 'Plan 234254534', 'Plan 891234567', 'HMO Basic']
export const RELACIONES = ['Self', 'Spouse', 'Child', 'Other']
export const ORDENES: OrdenPlan[] = ['Primary', 'Secondary', 'Tertiary']
export const ELEGIBILIDAD = ['Verified', 'Pending', 'Not eligible']
