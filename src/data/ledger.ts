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
  /** Sólo Payment y Adjustment(crédito, monto<0): cuánto de ese dinero
      todavía no se aplicó a ningún cargo. Julián pidió poder verlo en la
      fila y aplicarlo desde un modal -ver AplicarCreditoModal-. */
  creditoDisponible?: number
}

export const GUARANTOR = 'John Smith'
/* Un dependiente de nombre largo a propósito: las columnas Patient/Provider
   truncan con tooltip, y sin un caso así el truncado no se ve nunca. */
export const DEPENDIENTES = ['Emma Smith', 'Maximiliano Fernández-Ugarte']

export const MOVIMIENTOS: Movimiento[] = [
  { id: 'm1', fecha: 'March 17, 2025', paciente: 'John Smith', codigo: 'D0120', descripcion: 'Periodic oral evaluation', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 85, estado: 'Posted' },
  { id: 'm2', fecha: 'March 17, 2025', paciente: 'John Smith', codigo: 'D1110', descripcion: 'Prophylaxis – adult', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 120, estado: 'Posted' },
  { id: 'm3', fecha: 'March 18, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'AETNA claim 8842-B', provider: 'AETNA', tipo: 'Insurance', monto: -140, estado: 'Posted' },
  { id: 'm4', fecha: 'March 20, 2025', paciente: 'John Smith', codigo: 'D0274', descripcion: 'Bitewings – four radiographic images', provider: 'Dr. Salgado', tipo: 'Charge', monto: 95, estado: 'Posted' },
  { id: 'm5', fecha: 'March 21, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'Card payment ····4218', provider: 'Front desk', tipo: 'Payment', monto: -100, estado: 'Posted' },
  { id: 'm6', fecha: 'March 24, 2025', paciente: 'John Smith', codigo: 'D2740', descripcion: 'Crown – porcelain/ceramic', provider: 'Dr. Emily Chen', tipo: 'Charge', monto: 1270, estado: 'Pending', diente: '19' },
  { id: 'm7', fecha: 'March 25, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'BCBS claim 1192-C', provider: 'BCBS', tipo: 'Insurance', monto: -640, estado: 'Denied' },
  /* Sólo $50 de los $200 se aplicaron a un cargo hasta ahora -quedan $150
     disponibles-. Mismos números que el mock de referencia de Julián. */
  { id: 'm27', fecha: 'March 25, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'Check payment ····1234', provider: 'Front desk', tipo: 'Payment', monto: -200, estado: 'Posted', creditoDisponible: 150 },
  { id: 'm8', fecha: 'March 26, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'Courtesy adjustment', provider: 'Front desk', tipo: 'Adjustment', monto: -45, estado: 'Posted' },
  { id: 'm9', fecha: 'March 19, 2025', paciente: 'Emma Smith', codigo: 'D1120', descripcion: 'Prophylaxis – child', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 90, estado: 'Posted' },
  { id: 'm10', fecha: 'March 22, 2025', paciente: 'Emma Smith', codigo: '—', descripcion: 'Electronic Payment', provider: 'Front desk', tipo: 'Payment', monto: -90, estado: 'Posted' },
  { id: 'm11', fecha: 'March 28, 2025', paciente: 'John Smith', codigo: 'D1206', descripcion: 'Topical fluoride varnish', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 45, estado: 'Posted' },
  /* Credit Adjustment con crédito sin aplicar todavía: mismo mecanismo que
     m27, para probar el indicador en el otro tipo que lo puede tener. */
  { id: 'm28', fecha: 'March 29, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'Overpayment credit adjustment', provider: 'Front desk', tipo: 'Adjustment', monto: -80, estado: 'Posted', creditoDisponible: 80 },
  { id: 'm12', fecha: 'March 31, 2025', paciente: 'John Smith', codigo: 'D2392', descripcion: 'Resin composite – two surfaces', provider: 'Dr. Emily Chen', tipo: 'Charge', monto: 220, estado: 'Posted', diente: '30', superficie: 'MO' },
  { id: 'm13', fecha: 'April 3, 2025', paciente: 'John Smith', codigo: 'D4341', descripcion: 'Periodontal scaling – per quadrant', provider: 'Dr. Salgado', tipo: 'Charge', monto: 310, estado: 'Posted' },
  { id: 'm14', fecha: 'April 7, 2025', paciente: 'John Smith', codigo: 'D0220', descripcion: 'Intraoral periapical – first image', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 38, estado: 'Posted' },
  { id: 'm15', fecha: 'March 30, 2025', paciente: 'Emma Smith', codigo: 'D1206', descripcion: 'Topical fluoride varnish', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 40, estado: 'Posted' },
  { id: 'm16', fecha: 'April 5, 2025', paciente: 'Emma Smith', codigo: 'D0150', descripcion: 'Comprehensive oral evaluation', provider: 'Dr. Elena Martinez', tipo: 'Charge', monto: 75, estado: 'Posted' },

  /* Casos de estrés: descripciones y nombres largos, diente y superficie
     cargados, y montos de cuatro y cinco cifras. Sin esto el truncado, los
     tooltips, el ajuste de columnas y el ancho de las celdas de plata no se
     ven nunca contra datos reales. */
  { id: 'm17', fecha: 'April 9, 2025', paciente: 'John Smith', codigo: 'D6010', descripcion: 'Surgical placement of implant body: endosteal implant, mandible', provider: 'Dr. Konstantinos Papadopoulos', tipo: 'Charge', monto: 4850, estado: 'Pending', diente: '30', superficie: 'B' },
  { id: 'm18', fecha: 'April 11, 2025', paciente: 'John Smith', codigo: 'D6114', descripcion: 'Implant/abutment supported fixed denture for edentulous arch – maxillary', provider: 'Dr. Konstantinos Papadopoulos', tipo: 'Charge', monto: 9850, estado: 'Pending', diente: '14', superficie: 'MOD' },
  { id: 'm19', fecha: 'April 12, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'Delta Dental PPO claim 55210-A – predetermination approved', provider: 'Delta Dental Insurance', tipo: 'Insurance', monto: -3200, estado: 'Posted' },
  { id: 'm20', fecha: 'April 14, 2025', paciente: 'John Smith', codigo: 'D7240', descripcion: 'Removal of impacted tooth – completely bony, with unusual surgical complications', provider: 'Dr. Salgado', tipo: 'Charge', monto: 1180, estado: 'Posted', diente: '32', superficie: 'DL' },
  { id: 'm21', fecha: 'April 16, 2025', paciente: 'John Smith', codigo: 'D4260', descripcion: 'Osseous surgery – four or more contiguous teeth per quadrant', provider: 'Dr. Salgado', tipo: 'Charge', monto: 2340, estado: 'Posted', diente: '19', superficie: 'ML' },
  { id: 'm22', fecha: 'April 18, 2025', paciente: 'John Smith', codigo: '—', descripcion: 'Wire transfer received – Chase ····8891', provider: 'Front desk', tipo: 'Payment', monto: -5000, estado: 'Posted' },
  { id: 'm23', fecha: 'April 19, 2025', paciente: 'Maximiliano Fernández-Ugarte', codigo: 'D2750', descripcion: 'Crown – porcelain fused to high noble metal, with custom milled abutment', provider: 'Dr. Emily Chen', tipo: 'Charge', monto: 1620, estado: 'Posted', diente: '8', superficie: 'MODBL' },
  { id: 'm24', fecha: 'April 21, 2025', paciente: 'Maximiliano Fernández-Ugarte', codigo: 'D0180', descripcion: 'Comprehensive periodontal evaluation – new or established patient', provider: 'Dr. Konstantinos Papadopoulos', tipo: 'Charge', monto: 165, estado: 'Posted', diente: '3', superficie: 'DO' },
  { id: 'm25', fecha: 'April 23, 2025', paciente: 'Maximiliano Fernández-Ugarte', codigo: '—', descripcion: 'Family courtesy adjustment – long-standing patient discount', provider: 'Front desk', tipo: 'Adjustment', monto: -240, estado: 'Posted' },
  { id: 'm26', fecha: 'April 25, 2025', paciente: 'Emma Smith', codigo: 'D2391', descripcion: 'Resin-based composite – one surface, posterior', provider: 'Dr. Emily Chen', tipo: 'Charge', monto: 185, estado: 'Posted', diente: '12', superficie: 'O' },
]

export const TIPOS: TipoMovimiento[] = ['Charge', 'Payment', 'Adjustment', 'Insurance']

export const moneda = (n: number) =>
  `${n < 0 ? '-' : ''}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

/* Sólo Pt Payment y Credit Adj pueden tener plata sin aplicar todavía -son
   los dos tipos que "entran" dinero a la cuenta-. Charge Adj resta, no deja
   remanente para aplicar. Vive acá (no en Ledger.tsx) porque también la usa
   el detalle expandido de la fila. */
export function tieneCredito(m: Movimiento) {
  return (m.tipo === 'Payment' || (m.tipo === 'Adjustment' && m.monto < 0)) && (m.creditoDisponible ?? 0) > 0
}

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
