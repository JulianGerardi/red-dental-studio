/* Figma 3817:865128 "Insurance" — 9 frames. Los datos de las dos variantes
   de la tabla salen de 3817:865704 y 3831:897436. */

export type OrdenPlan = 'Primary' | 'Secondary'
export type RelacionPlan = 'Child' | 'Self' | 'Spouse'
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

export const CARRIERS = ['AETNA', 'BCBS', 'Dental Dental Of California', 'Cigna', 'MetLife']
export const PLANES_NOMBRE = ['PPO Premiun Plan', 'Plan 234254534', 'Plan 891234567', 'HMO Basic']
export const RELACIONES = ['Self', 'Spouse', 'Child', 'Other']
export const ORDENES = ['Primary', 'Secondary', 'Tertiary']
export const ELEGIBILIDAD = ['Verified', 'Pending', 'Not eligible']
