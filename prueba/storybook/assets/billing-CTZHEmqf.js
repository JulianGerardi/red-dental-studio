import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { conSaldo, type Movimiento } from '@/data/ledger'

/* Figma 4481:9881 "Billing". Ver design-reference/figma/modulos/billing.md. */

export type PacienteBilling = {
  nombre: string
  rol: 'Guarantor' | 'Patient'
  ultimoPago: string
  creditosNoAplicados: number
}

/* El Figma repite "Maria Abril Viola" 5 veces con el mismo balance en
   "Find Patient": acá cada resultado es distinto -ver billing.md, anomalía
   documentada. "John Hayes" y "Brent Crosby" se mantienen porque son los
   nombres que ya aparecen en el resto del frame (tabla y modal). */
export const PACIENTES_BILLING: PacienteBilling[] = [
  { nombre: 'John Hayes', rol: 'Guarantor', ultimoPago: '2h ago', creditosNoAplicados: 180 },
  { nombre: 'Maria Abril Viola', rol: 'Patient', ultimoPago: '3h ago', creditosNoAplicados: 30 },
  { nombre: 'Brent Crosby', rol: 'Guarantor', ultimoPago: '1d ago', creditosNoAplicados: 0 },
  { nombre: 'Diego Molina', rol: 'Patient', ultimoPago: '4d ago', creditosNoAplicados: 120 },
  { nombre: 'Sophie Tran', rol: 'Guarantor', ultimoPago: '6d ago', creditosNoAplicados: 260 },
]

export function buscarPacientes(q: string): PacienteBilling[] {
  const texto = q.trim().toLowerCase()
  if (!texto) return PACIENTES_BILLING
  return PACIENTES_BILLING.filter((p) => p.nombre.toLowerCase().includes(texto))
}

/* Actividad por paciente: cada lista corre su propio saldo con \`conSaldo\`.
   El Figma repetía el mismo Balance ($1,230.00) en las 10 filas pese a que
   el monto cambia fila a fila -acá cada paciente arrastra el suyo, y las
   filas se intercalan por fecha para armar el feed "reciente". */
const ACTIVIDAD_POR_PACIENTE: Record<string, Omit<Movimiento, 'id' | 'paciente' | 'saldo'>[]> = {
  'John Hayes': [
    { fecha: 'May 15, 2026', codigo: '—', descripcion: 'Check Payment $30.00', provider: 'Dr Alison Hayes', tipo: 'Payment', monto: -30, estado: 'Posted' },
    { fecha: 'May 16, 2026', codigo: '—', descripcion: 'Charge Adjustment', provider: 'Dr Alison Hayes', tipo: 'Adjustment', monto: 30, estado: 'Posted' },
    { fecha: 'May 17, 2026', codigo: '—', descripcion: 'Family/Friend Courtesy', provider: 'Dr Alison Hayes', tipo: 'Adjustment', monto: -30, estado: 'Posted' },
    { fecha: 'May 18, 2026', codigo: '—', descripcion: 'Electronic Payment $30.00', provider: 'Dr Alison Hayes', tipo: 'Insurance', monto: -30, estado: 'Posted' },
    { fecha: 'May 19, 2026', codigo: 'D1231', descripcion: 'Bitewings – four radiographic images', provider: 'Dr Alison Hayes', tipo: 'Charge', monto: 210, estado: 'Posted' },
    { fecha: 'May 20, 2026', codigo: '—', descripcion: 'Discount', provider: 'Dr Alison Hayes', tipo: 'Adjustment', monto: -30, estado: 'Posted' },
  ],
  'Maria Abril Viola': [
    { fecha: 'May 18, 2026', codigo: 'D1110', descripcion: 'Prophylaxis – adult', provider: 'Dr Emily Chen', tipo: 'Charge', monto: 120, estado: 'Posted' },
    { fecha: 'May 19, 2026', codigo: '—', descripcion: 'Card Payment ····5521', provider: 'Front desk', tipo: 'Payment', monto: -90, estado: 'Posted' },
  ],
  'Brent Crosby': [
    { fecha: 'May 12, 2026', codigo: 'D7450', descripcion: 'Removal of benign odontogenic cyst', provider: 'Dr Konstantinos Papadopoulos', tipo: 'Charge', monto: 500, estado: 'Posted', diente: '3' },
    { fecha: 'May 14, 2026', codigo: '—', descripcion: 'Insurance Payment – Delta Dental', provider: 'Delta Dental', tipo: 'Insurance', monto: -250, estado: 'Posted' },
    { fecha: 'May 16, 2026', codigo: '—', descripcion: 'Check Payment $30.00', provider: 'Front desk', tipo: 'Payment', monto: -30, estado: 'Posted' },
  ],
  'Diego Molina': [
    { fecha: 'May 10, 2026', codigo: 'D2740', descripcion: 'Crown – porcelain/ceramic', provider: 'Dr Salgado', tipo: 'Charge', monto: 1270, estado: 'Pending', diente: '19' },
    { fecha: 'May 13, 2026', codigo: '—', descripcion: 'Professional Courtesy', provider: 'Dr Salgado', tipo: 'Adjustment', monto: -410, estado: 'Posted' },
  ],
  'Sophie Tran': [
    { fecha: 'May 9, 2026', codigo: 'D6010', descripcion: 'Surgical placement of implant body', provider: 'Dr Konstantinos Papadopoulos', tipo: 'Charge', monto: 4850, estado: 'Pending', diente: '30' },
    { fecha: 'May 15, 2026', codigo: '—', descripcion: 'Wire Transfer Received', provider: 'Front desk', tipo: 'Payment', monto: -2710, estado: 'Posted' },
  ],
}

export const ACTIVIDAD_RECIENTE = Object.entries(ACTIVIDAD_POR_PACIENTE)
  .flatMap(([paciente, movs]) =>
    conSaldo(movs.map((m, i) => ({ ...m, id: \`act-\${paciente}-\${i}\`, paciente }))))
  .sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha))

export function saldoDe(paciente: string): number {
  return ACTIVIDAD_RECIENTE.find((m) => m.paciente === paciente)?.saldo ?? 0
}

/** Cargos abiertos de un paciente, para la tabla "Ledger Transactions" del modal. */
export function cargosAbiertos(paciente: string): Movimiento[] {
  return ACTIVIDAD_RECIENTE.filter((m) => m.paciente === paciente && m.tipo === 'Charge')
}

export const TIPOS_AJUSTE_BILLING = ['Patient Payment', 'Credit Adjustment', 'Charge Adjustment'] as const
export type TipoAjusteBilling = (typeof TIPOS_AJUSTE_BILLING)[number]

export const FILTROS_ACTIVIDAD = ['All', 'Pt Payment', 'Charge Adj', 'Credit Adj'] as const
export type FiltroActividad = (typeof FILTROS_ACTIVIDAD)[number]

export type StatBilling = { label: string; value: string; caption: string }

/* "Overdue Balance" repetía el valor exacto de "Insurance A/R" en el Figma
   -ver billing.md, anomalía documentada y corregida acá. */
export const STATS_BILLING: StatBilling[] = [
  { label: 'Total A/R', value: '$2,131.86', caption: 'Across patient and insurance balances' },
  { label: 'Patient A/R', value: '$7,411.30', caption: 'Outstanding patient responsibility' },
  { label: 'Insurance A/R', value: '$9,896.66', caption: 'Carrier receivables not yet resolved' },
  { label: 'Overdue Balance', value: '$1,845.20', caption: 'Accounts past due needing follow-up' },
  { label: 'Patients with Open Balance', value: '128', caption: 'Patients with a remaining balance' },
]

/* "Unapplied credits" repetía el valor exacto de "Payments Posted Today" en
   el Figma -misma anomalía que Overdue Balance, mismo criterio de arreglo. */
export const STATS_HOY: StatBilling[] = [
  { label: 'Payments Posted Today', value: '$9,420', caption: 'Patient and insurance posting activity' },
  { label: 'Adjustments created', value: '6', caption: 'Adjustments created today' },
  { label: 'Unapplied credits', value: '$610', caption: 'Credits not yet applied to charges' },
]
`})))()}export{n,i as r,r as t};