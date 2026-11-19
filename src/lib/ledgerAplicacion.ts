import { coberturaSeguro, pendienteDe, type Aplicacion, type Movimiento } from '@/data/ledger'

/* La lógica compartida de Patient Payment y Credit Adjustment, en el Ledger y en Billing (CON-3738, CON-3739): qué cargos
   se pueden cubrir, el reparto automático del más viejo al más nuevo y las validaciones. Ver ledger.md (2026-11-19). */

/** Un cargo abierto, con lo que dice la tabla "Ledger Transactions" (Charge, Other Credit, Guar Estimate). */
export type CargoAbierto = {
  id: string
  fecha: string
  paciente: string
  provider: string
  codigo: string
  descripcion: string
  cargo: number
  /** La parte que cubre el seguro (estimada por código, ver `coberturaSeguro`). */
  otroCredito: number
  /** Lo que todavía debe el guarantor de este cargo: el máximo que se puede aplicar. */
  guarantor: number
}

const centavos = (n: number) => Math.round(n * 100) / 100

/** Un cargo es un procedimiento o un Charge Adjustment: lo que tiene saldo propio y se puede cubrir. */
export const esCargoAplicable = (m: Movimiento) => m.tipo !== 'Insurance' && m.monto > 0

/** El seguro sólo figura mientras su reclamo está pendiente (como Patient responsibility del Ledger); un Charge Adjustment lo paga siempre el guarantor. */
const parteSeguro = (m: Movimiento, resto: number) => (m.estado === 'Pending' && m.codigo !== '—' ? centavos(resto * coberturaSeguro(m.codigo)) : 0)

/**
 * Los cargos con saldo del guarantor, del más viejo al más nuevo (fecha y, a igual fecha, el orden de carga): los de un
 * paciente si se elige uno, los de toda la cuenta si se elige al guarantor.
 */
export function cargosAbiertos(movs: Movimiento[], apls: Aplicacion[], paciente?: string): CargoAbierto[] {
  return movs
    .map((m, i) => ({ m, i }))
    .filter(({ m }) => esCargoAplicable(m) && (!paciente || m.paciente === paciente))
    .sort((a, b) => (new Date(a.m.fecha).getTime() || 0) - (new Date(b.m.fecha).getTime() || 0) || a.i - b.i)
    .map(({ m }) => {
      const resto = pendienteDe(m, apls)
      const otroCredito = parteSeguro(m, resto)
      return {
        id: m.id, fecha: m.fecha, paciente: m.paciente, provider: m.provider, codigo: m.codigo, descripcion: m.descripcion,
        cargo: centavos(resto), otroCredito, guarantor: centavos(resto - otroCredito),
      }
    })
    .filter((c) => c.guarantor > 0)
}

/** El reparto automático: del cargo más viejo al más nuevo, hasta gastar el importe o quedarse sin cargos. */
export function autoAplicar(cargos: CargoAbierto[], total: number): Record<string, number> {
  const salida: Record<string, number> = {}
  let resto = centavos(total)
  for (const c of cargos) {
    if (resto <= 0) break
    const monto = Math.min(c.guarantor, resto)
    salida[c.id] = centavos(monto)
    resto = centavos(resto - monto)
  }
  return salida
}

/** Un importe tipeado: sin letras y con un solo punto. */
export const limpiarImporte = (v: string) => {
  const sinLetras = v.replace(/[^0-9.]/g, '')
  const [entero, ...decimales] = sinLetras.split('.')
  return decimales.length ? `${entero}.${decimales.join('').slice(0, 2)}` : entero
}
export const numero = (v: string | undefined) => Number(v) || 0

export const MENSAJES = {
  monto: 'The amount must be greater than 0.',
  metodo: 'At least one payment method is required.',
  pagoAplicado: 'The total applied amount cannot be greater than the payment amount.',
  ajusteAplicado: 'The total applied amount cannot be greater than the adjustment amount.',
  linea: 'The applied amount cannot be greater than the charge’s remaining guarantor balance.',
  futura: 'The transaction date cannot be in the future.',
  cheque: 'For patient check payments, the check number and bank branch are required.',
  tarjeta: 'For patient credit card payments, the authorization ID is required.',
  transferencia: 'A reference number is required for electronic transfer payments.',
} as const

/** Lo que va quedando mientras se edita la distribución: cuánto se aplicó, cuánto queda como crédito y qué no cierra. */
export function resumenAplicacion(cargos: CargoAbierto[], aplicado: Record<string, string>, total: number, mensajeExceso: string) {
  const aplicadoTotal = centavos(cargos.reduce((a, c) => a + numero(aplicado[c.id]), 0))
  const lineaExcedida = cargos.find((c) => numero(aplicado[c.id]) > c.guarantor + 0.001)
  const error = lineaExcedida ? MENSAJES.linea : aplicadoTotal > total + 0.001 ? mensajeExceso : undefined
  return { aplicadoTotal, noAplicado: centavos(Math.max(total - aplicadoTotal, 0)), error }
}

/** El importe de cada línea con la forma de un texto del input; las que no se aplican quedan vacías. */
export const comoTexto = (porCargo: Record<string, number>) =>
  Object.fromEntries(Object.entries(porCargo).map(([id, v]) => [id, v ? v.toFixed(2) : '']))

/** Sólo lo que se aplicó (más de cero), como números, para registrarlo en la transacción. */
export const soloAplicado = (aplicado: Record<string, string>) =>
  Object.fromEntries(Object.entries(aplicado).map(([id, v]) => [id, numero(v)] as const).filter(([, v]) => v > 0))

/** La fecha de la transacción no puede ser futura (se compara por día). */
export const esFutura = (fecha: Date, ahora = new Date()) => {
  const dia = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  return dia(fecha) > dia(ahora)
}

/* A quién se aplica (Apply to): al guarantor, con todo el hogar, o a un paciente del mismo guarantor (CON-3738). */
export const ALCANCE_GUARANTOR = '@guarantor'

export type OpcionAplicaA = { clave: string; nombre: string; etiqueta: string; sub: string }

/** Las opciones de Apply to: el guarantor (todo el hogar), él mismo como paciente y cada dependiente. */
export function opcionesAplicaA(garante: string, dependientes: string[]): OpcionAplicaA[] {
  return [
    { clave: ALCANCE_GUARANTOR, nombre: garante, etiqueta: `${garante} (Guarantor)`, sub: 'Whole household' },
    { clave: garante, nombre: garante, etiqueta: garante, sub: 'Self' },
    ...dependientes.map((d) => ({ clave: d, nombre: d, etiqueta: d, sub: 'Dependent' })),
  ]
}

/** El paciente de un alcance, o undefined si es el guarantor (toda la cuenta). */
export const pacienteDeAlcance = (clave: string) => (clave === ALCANCE_GUARANTOR ? undefined : clave)
