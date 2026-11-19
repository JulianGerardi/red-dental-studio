import { conSaldo, type Aplicacion, type Movimiento } from '@/data/ledger'

/* Figma 4481:9881 "Billing". Ver design-reference/figma/modulos/billing.md. */

export type PacienteBilling = {
  nombre: string
  rol: 'Guarantor' | 'Patient'
  /** Quién paga: el propio nombre si es Guarantor. Arma la Guarantor View de Billing (billing.md, 2026-10-09). */
  garante: string
  ultimoPago: string
  creditosNoAplicados: number
}

/* El Figma repite "Maria Abril Viola" 5 veces con el mismo balance en
   "Find Patient": acá cada resultado es distinto -ver billing.md, anomalía
   documentada. "John Hayes" y "Brent Crosby" se mantienen porque son los
   nombres que ya aparecen en el resto del frame (tabla y modal). */
export const PACIENTES_BILLING: PacienteBilling[] = [
  { nombre: 'John Hayes', rol: 'Guarantor', garante: 'John Hayes', ultimoPago: '2h ago', creditosNoAplicados: 180 },
  { nombre: 'Maria Abril Viola', rol: 'Patient', garante: 'John Hayes', ultimoPago: '3h ago', creditosNoAplicados: 30 },
  { nombre: 'Brent Crosby', rol: 'Guarantor', garante: 'Brent Crosby', ultimoPago: '1d ago', creditosNoAplicados: 0 },
  { nombre: 'Diego Molina', rol: 'Patient', garante: 'Sophie Tran', ultimoPago: '4d ago', creditosNoAplicados: 120 },
  { nombre: 'Sophie Tran', rol: 'Guarantor', garante: 'Sophie Tran', ultimoPago: '6d ago', creditosNoAplicados: 260 },
  /* Tres más (2026-10-13): con cinco, Find Patient no llenaba su columna del bento (billing.md). */
  { nombre: 'Nadia Duarte', rol: 'Guarantor', garante: 'Nadia Duarte', ultimoPago: '1w ago', creditosNoAplicados: 40 },
  { nombre: 'Tomás Rivas', rol: 'Patient', garante: 'Nadia Duarte', ultimoPago: '1w ago', creditosNoAplicados: 0 },
  { nombre: 'Lucía Paz', rol: 'Guarantor', garante: 'Lucía Paz', ultimoPago: '2w ago', creditosNoAplicados: 75 },
]

/* Todos los que paga el mismo garante (el garante y los pacientes a su cargo): la Guarantor View de Billing. */
export function grupoDeGarante(nombre: string): PacienteBilling[] {
  const garante = PACIENTES_BILLING.find((p) => p.nombre === nombre)?.garante ?? nombre
  return PACIENTES_BILLING.filter((p) => p.garante === garante)
}

export function buscarPacientes(q: string): PacienteBilling[] {
  const texto = q.trim().toLowerCase()
  if (!texto) return PACIENTES_BILLING
  return PACIENTES_BILLING.filter((p) => p.nombre.toLowerCase().includes(texto))
}

/* Actividad por paciente: cada lista corre su propio saldo con `conSaldo`.
   El Figma repetía el mismo Balance ($1,230.00) en las 10 filas pese a que
   el monto cambia fila a fila -acá cada paciente arrastra el suyo, y las
   filas se intercalan por fecha para armar el feed "reciente". */
const ACTIVIDAD_POR_PACIENTE: Record<string, Omit<Movimiento, 'id' | 'paciente' | 'saldo'>[]> = {
  'John Hayes': [
    { fecha: '05/15/2026', codigo: '—', descripcion: 'Check Payment $30.00', provider: 'Dr Alison Hayes', tipo: 'Payment', monto: -30, estado: 'Posted', metodos: [{ metodo: 'Check payment', monto: 30 }] },
    { fecha: '05/16/2026', codigo: '—', descripcion: 'Charge Adjustment', provider: 'Dr Alison Hayes', tipo: 'Adjustment', monto: 30, estado: 'Posted' },
    { fecha: '05/17/2026', codigo: '—', descripcion: 'Family/Friend Courtesy', provider: 'Dr Alison Hayes', tipo: 'Adjustment', monto: -30, estado: 'Posted' },
    { fecha: '05/18/2026', codigo: '—', descripcion: 'Electronic Payment $30.00', provider: 'Dr Alison Hayes', tipo: 'Insurance', monto: -30, estado: 'Posted' },
    { fecha: '05/19/2026', codigo: 'D1231', descripcion: 'Bitewings – four radiographic images', provider: 'Dr Alison Hayes', tipo: 'Charge', monto: 210, estado: 'Posted' },
    { fecha: '05/20/2026', codigo: '—', descripcion: 'Discount', provider: 'Dr Alison Hayes', tipo: 'Adjustment', monto: -30, estado: 'Posted' },
  ],
  'Maria Abril Viola': [
    { fecha: '05/18/2026', codigo: 'D1110', descripcion: 'Prophylaxis – adult', provider: 'Dr Emily Chen', tipo: 'Charge', monto: 120, estado: 'Posted' },
    { fecha: '05/19/2026', codigo: '—', descripcion: 'Card Payment ····5521', provider: 'Front desk', tipo: 'Payment', monto: -90, estado: 'Posted', metodos: [{ metodo: 'Card payment', ref: '····5521', monto: 90 }] },
  ],
  'Brent Crosby': [
    { fecha: '05/12/2026', codigo: 'D7450', descripcion: 'Removal of benign odontogenic cyst', provider: 'Dr Konstantinos Papadopoulos', tipo: 'Charge', monto: 500, estado: 'Posted', diente: '3' },
    { fecha: '05/14/2026', codigo: '—', descripcion: 'Insurance Payment – Delta Dental', provider: 'Delta Dental', tipo: 'Insurance', monto: -250, estado: 'Posted' },
    { fecha: '05/16/2026', codigo: '—', descripcion: 'Check Payment $30.00', provider: 'Front desk', tipo: 'Payment', monto: -30, estado: 'Posted', metodos: [{ metodo: 'Check payment', monto: 30 }] },
  ],
  'Diego Molina': [
    { fecha: '05/10/2026', codigo: 'D2740', descripcion: 'Crown – porcelain/ceramic', provider: 'Dr Salgado', tipo: 'Charge', monto: 1270, estado: 'Pending', diente: '19' },
    { fecha: '05/13/2026', codigo: '—', descripcion: 'Professional Courtesy', provider: 'Dr Salgado', tipo: 'Adjustment', monto: -410, estado: 'Posted' },
  ],
  'Sophie Tran': [
    { fecha: '05/09/2026', codigo: 'D6010', descripcion: 'Surgical placement of implant body', provider: 'Dr Konstantinos Papadopoulos', tipo: 'Charge', monto: 4850, estado: 'Pending', diente: '30' },
    { fecha: '05/15/2026', codigo: '—', descripcion: 'Wire Transfer Received', provider: 'Front desk', tipo: 'Payment', monto: -2710, estado: 'Posted', metodos: [{ metodo: 'Wire transfer', monto: 2710 }] },
  ],
  'Nadia Duarte': [
    { fecha: '05/11/2026', codigo: 'D0150', descripcion: 'Comprehensive oral evaluation', provider: 'Dr Emily Chen', tipo: 'Charge', monto: 95, estado: 'Posted' },
    { fecha: '05/14/2026', codigo: '—', descripcion: 'Card Payment ····0412', provider: 'Front desk', tipo: 'Payment', monto: -95, estado: 'Posted' },
  ],
  'Tomás Rivas': [
    { fecha: '05/12/2026', codigo: 'D1120', descripcion: 'Prophylaxis – child', provider: 'Dr Emily Chen', tipo: 'Charge', monto: 85, estado: 'Posted' },
    { fecha: '05/17/2026', codigo: '—', descripcion: 'Insurance Payment – Cigna', provider: 'Cigna', tipo: 'Insurance', monto: -60, estado: 'Posted' },
  ],
  'Lucía Paz': [
    { fecha: '05/13/2026', codigo: 'D2391', descripcion: 'Resin-based composite – one surface', provider: 'Dr Salgado', tipo: 'Charge', monto: 180, estado: 'Posted', diente: '14' },
    /* Sin aplicar a su cargo: la fila muestra "Credit available", como red.dev (billing.md, 2026-11-13). */
    { fecha: '05/20/2026', codigo: '—', descripcion: 'Check Payment $100.00', provider: 'Front desk', tipo: 'Payment', monto: -100, estado: 'Posted', creditoDisponible: 100 },
  ],
}

/* `ref`: el identificador que muestra el detalle de la fila (TX-2000…), uno por movimiento. */
export const ACTIVIDAD_RECIENTE = Object.entries(ACTIVIDAD_POR_PACIENTE)
  .flatMap(([paciente, movs], k) =>
    conSaldo(movs.map((m, i) => ({ ...m, id: `act-${paciente}-${i}`, ref: `TX-${2000 + k * 10 + i}`, paciente }))))
  .sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha))

/* A qué cargo fue cada pago o ajuste de la actividad, para el detalle de la fila con un paciente elegido (Financial
   details y Applied transactions, como el Ledger). Cierra con el Balance de cada paciente: lo que falta de sus cargos da
   su último saldo (John Hayes $120, Maria $30, Brent $220, Diego $860, Sophie $2,140). Ver billing.md (2026-10-14). */
const fila = (paciente: string, i: number) => `act-${paciente}-${i}`
const aplica = (paciente: string, origen: number, cargo: number, fecha: string, monto: number): Aplicacion =>
  ({ id: `ap-${paciente}-${origen}-${cargo}`, origen: fila(paciente, origen), cargo: fila(paciente, cargo), fecha, monto })

export const APLICACIONES_BILLING: Aplicacion[] = [
  aplica('John Hayes', 0, 1, '05/16/2026', 30),
  aplica('John Hayes', 2, 4, '05/19/2026', 30),
  aplica('John Hayes', 3, 4, '05/19/2026', 30),
  aplica('John Hayes', 5, 4, '05/20/2026', 30),
  aplica('Maria Abril Viola', 1, 0, '05/19/2026', 90),
  aplica('Brent Crosby', 1, 0, '05/14/2026', 250),
  aplica('Brent Crosby', 2, 0, '05/16/2026', 30),
  aplica('Diego Molina', 1, 0, '05/13/2026', 410),
  aplica('Sophie Tran', 1, 0, '05/15/2026', 2710),
]

export function saldoDe(paciente: string): number {
  return ACTIVIDAD_RECIENTE.find((m) => m.paciente === paciente)?.saldo ?? 0
}

/** Cargos abiertos de un paciente, para la tabla "Ledger Transactions" del modal. */
export function cargosAbiertos(paciente: string): Movimiento[] {
  return ACTIVIDAD_RECIENTE.filter((m) => m.paciente === paciente && m.tipo === 'Charge')
}

export const TIPOS_AJUSTE_BILLING = ['Patient Payment', 'Credit Adjustment', 'Charge Adjustment'] as const
export type TipoAjusteBilling = (typeof TIPOS_AJUSTE_BILLING)[number]

/* Las listas de los drawers de red.dev (Settings › Ledger), sin las de QA (billing.md, 2026-11-13). */
export const METODOS_PAGO = [
  'Cash Payment', 'Check Payment', 'Credit Card Payment', 'Electronic Transfer Payment', 'Insurance Payment - Check',
  'Insurance Payment - Credit Card', 'Insurance Payment - Electronic',
] as const
export const TIPOS_AJUSTE_CREDITO = [
  'Credit Adjustment', 'Discount', 'Family/Friend Courtesy', 'Full Payment Courtesy', 'Initial Credit Balance Forward',
  'In-office Write-off', 'Insurance Adjustment', 'Offsetting Adjustment', 'Professional Courtesy', 'Senior Citizen Courtesy',
  'Staff Courtesy', 'Transfer Credit Balance', 'Write-off',
] as const
export const TIPOS_AJUSTE_CARGO = [
  'Charge Adjustment', 'Collected Bad Debt', 'Credit Card Full Refund', 'Credit Card Independent Refund',
  'Credit Card Partial Refund', 'Credit Card Void', 'Electronic Check Credit', 'Initial Balance Forward',
  'Ins Charge Offsetting Adjustment', 'Insurance Adjustment', 'Insurance Over-pmt Refund', 'NSF Bank Fee', 'NSF Check',
  'Patient Refund', 'Sales Tax', 'Transfer Charge Balance',
] as const
/** Los profesionales de la actividad de prueba, para el Provider de Enter Charge (+) Adjustment. */
export const PROVIDERS_BILLING = [...new Set(Object.values(ACTIVIDAD_POR_PACIENTE).flat().map((m) => m.provider).filter((p) => p.startsWith('Dr')))].sort()

/* Los filtros de red.dev (billing.md, 2026-11-13). */
export const FILTROS_ACTIVIDAD = ['All', 'Payments', 'Adjustments', 'Today'] as const
export type FiltroActividad = (typeof FILTROS_ACTIVIDAD)[number]

/* Con un paciente elegido, las Tabs de Recent Billing Activity pasan a elegir de quién se ven los movimientos (red.dev). */
export const VISTAS_PACIENTE = ['Patient View', 'Guarantor View'] as const
export type VistaPaciente = (typeof VISTAS_PACIENTE)[number]

/** `info`: el texto del círculo de info (InfoTip). Los de arriba son los de red.dev (billing.md, 2026-10-09). */
export type StatBilling = { label: string; value: string; caption: string; info?: string }

/* "Overdue Balance" repetía el valor exacto de "Insurance A/R" en el Figma
   -ver billing.md, anomalía documentada y corregida acá. */
export const STATS_BILLING: StatBilling[] = [
  { label: 'Total A/R', value: '$2,131.86', caption: 'Across patient and insurance balances', info: "Sum of the remaining total balance of the location's open charges." },
  { label: 'Guarantor A/R', value: '$7,411.30', caption: 'Outstanding guarantor responsibility', info: "Sum of the remaining guarantor balance of the location's open charges." },
  { label: 'Insurance A/R', value: '$9,896.66', caption: 'Carrier receivables not yet resolved', info: "Sum of the remaining insurance balance of the location's open charges." },
  { label: 'Overdue Balance', value: '$1,845.20', caption: 'Accounts past due needing follow-up', info: 'Open charge balances older than 30 days.' },
  { label: 'Guarantors with Open Charges', value: '128', caption: 'Guarantors with a remaining balance', info: 'Ledgers whose charges at this location still carry a positive guarantor balance.' },
]

/** El "hoy" de los datos de prueba: el día del último movimiento. Lo usan el filtro Today y la card Today. */
export const HOY_BILLING = '05/20/2026'
const DE_HOY = ACTIVIDAD_RECIENTE.filter((m) => m.fecha === HOY_BILLING)
const sumaHoy = (f: (m: Movimiento) => number) => DE_HOY.reduce((t, m) => t + f(m), 0)
const plata = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

/* Today sale de los movimientos de HOY_BILLING, en plata como red.dev (antes eran números sueltos del Figma). Etiquetas y
   bajadas de red.dev; los mensajes de info de Adjustments y Unapplied siguen siendo propuesta (billing.md, 2026-11-13). */
export const STATS_HOY: StatBilling[] = [
  { label: 'Payments Posted Today', value: plata(sumaHoy((m) => (m.tipo === 'Payment' || m.tipo === 'Insurance' ? -m.monto : 0))), caption: 'Patient and insurance posting activity', info: 'Sum of payment transactions posted today (practice timezone).' },
  { label: 'Adjustments Created Today', value: plata(sumaHoy((m) => (m.tipo === 'Adjustment' ? Math.abs(m.monto) : 0))), caption: 'Charge and credit adjustments', info: 'Credit and charge adjustments created today (practice timezone).' },
  { label: 'Unapplied Credits', value: plata(sumaHoy((m) => m.creditoDisponible ?? 0)), caption: 'Credits not yet applied to charges', info: 'Payments and credits received that are not applied to a charge yet.' },
]
