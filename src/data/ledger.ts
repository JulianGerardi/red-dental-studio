/* Figma 4582:28487. Ver design-reference/figma/modulos/ledger.md. */

export type TipoMovimiento = 'Charge' | 'Payment' | 'Adjustment' | 'Insurance'
export type EstadoMovimiento = 'Posted' | 'Pending' | 'Denied'

export type Movimiento = {
  id: string
  fecha: string
  paciente: string
  codigo: string
  descripcion: string
  provider: string
  tipo: TipoMovimiento
  monto: number
  estado: EstadoMovimiento
  diente?: string
  superficie?: string
}

export const GUARANTOR = 'John Smith'
export const DEPENDIENTES = ['Emma Smith']

export const MOVIMIENTOS: Movimiento[] = [
  { id: 'm1', fecha: 'March 17, 2025', paciente: 'John Smith', codigo: 'D0120', descripcion: 'Periodic oral evaluation', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 85, estado: 'Posted' },
  { id: 'm2', fecha: 'March 17, 2025', paciente: 'John Smith', codigo: 'D1110', descripcion: 'Prophylaxis – adult', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 120, estado: 'Posted' },
  { id: 'm3', fecha: 'March 18, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'AETNA claim 8842-B', provider: 'AETNA', tipo: 'Insurance', monto: -140, estado: 'Posted' },
  { id: 'm4', fecha: 'March 20, 2025', paciente: 'John Smith', codigo: 'D0274', descripcion: 'Bitewings – four radiographic images', provider: 'Dr. Salgado', tipo: 'Charge', monto: 95, estado: 'Posted' },
  { id: 'm5', fecha: 'March 21, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'Card payment ····4218', provider: 'Front desk', tipo: 'Payment', monto: -100, estado: 'Posted' },
  { id: 'm6', fecha: 'March 24, 2025', paciente: 'John Smith', codigo: 'D2740', descripcion: 'Crown – porcelain/ceramic', provider: 'Dr. Emily Chen', tipo: 'Charge', monto: 1270, estado: 'Pending', diente: '19' },
  { id: 'm7', fecha: 'March 25, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'BCBS claim 1192-C', provider: 'BCBS', tipo: 'Insurance', monto: -640, estado: 'Denied' },
  { id: 'm8', fecha: 'March 26, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'Courtesy adjustment', provider: 'Front desk', tipo: 'Adjustment', monto: -45, estado: 'Posted' },
  { id: 'm9', fecha: 'March 19, 2025', paciente: 'Emma Smith', codigo: 'D1120', descripcion: 'Prophylaxis – child', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 90, estado: 'Posted' },
  { id: 'm10', fecha: 'March 22, 2025', paciente: 'Emma Smith', codigo: '—', descripcion: 'Electronic Payment', provider: 'Front desk', tipo: 'Payment', monto: -90, estado: 'Posted' },
  { id: 'm11', fecha: 'March 28, 2025', paciente: 'John Smith', codigo: 'D1206', descripcion: 'Topical fluoride varnish', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 45, estado: 'Posted' },
  { id: 'm12', fecha: 'March 31, 2025', paciente: 'John Smith', codigo: 'D2392', descripcion: 'Resin composite – two surfaces', provider: 'Dr. Emily Chen', tipo: 'Charge', monto: 220, estado: 'Posted', diente: '30', superficie: 'MO' },
  { id: 'm13', fecha: 'April 3, 2025', paciente: 'John Smith', codigo: 'D4341', descripcion: 'Periodontal scaling – per quadrant', provider: 'Dr. Salgado', tipo: 'Charge', monto: 310, estado: 'Posted' },
  { id: 'm14', fecha: 'April 7, 2025', paciente: 'John Smith', codigo: 'D0220', descripcion: 'Intraoral periapical – first image', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 38, estado: 'Posted' },
  { id: 'm15', fecha: 'March 30, 2025', paciente: 'Emma Smith', codigo: 'D1206', descripcion: 'Topical fluoride varnish', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 40, estado: 'Posted' },
  { id: 'm16', fecha: 'April 5, 2025', paciente: 'Emma Smith', codigo: 'D0150', descripcion: 'Comprehensive oral evaluation', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 75, estado: 'Posted' },
]

export const TIPOS: TipoMovimiento[] = ['Charge', 'Payment', 'Adjustment', 'Insurance']

export const moneda = (n: number) =>
  `${n < 0 ? '-' : ''}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

/* La tabla de allocation muestra 12 columnas a la vez: ahí la fecha va
   numérica (04/20/2026) como en el diseño de referencia, no "March 17, 2025",
   que sola se come 30px más. */
export function fechaCorta(fecha: string) {
  const d = new Date(fecha)
  if (Number.isNaN(d.getTime())) return fecha
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getMonth() + 1)}/${p(d.getDate())}/${d.getFullYear()}`
}

/* Corre sobre la cuenta completa del guarantor, no se reinicia por paciente. */
export function conSaldo(movs: Movimiento[]) {
  let saldo = 0
  return movs.map((m) => {
    saldo += m.monto
    return { ...m, saldo }
  })
}
