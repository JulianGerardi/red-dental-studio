import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { TextField, SelectField, TextArea } from '@/components/patients/form'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { ApplyToSelect } from '@/components/patients/ledger/ApplyToSelect'
import {
  CampoFecha, FILA, SeccionLedger, ShellLedger, useAplicacion, type FormularioLedger,
} from '@/components/patients/ledger/formulario'
import { CAMPOS_METODO, METODOS_PAGO, type Movimiento } from '@/data/ledger'
import {
  ALCANCE_GUARANTOR, MENSAJES, cargosAbiertos, esFutura, limpiarImporte, numero, opcionesAplicaA, pacienteDeAlcance, soloAplicado,
} from '@/lib/ledgerAplicacion'
import { formatMDY } from '@/lib/fecha'
import { cn } from '@/lib/utils'
import { OBLIGATORIO } from '@/lib/validacion'

/* Patient Payment (CON-3738), como en red.dev (video de Julián, 2026-11-19): Payment Information con la fecha, Apply to y
   uno o más métodos (+ suma otro, − lo saca) y las notas; abajo, Ledger Transactions con el pago ya repartido del más
   viejo al más nuevo. Abre con el total abierto como importe. Un solo paso, como red.dev. Ver ledger.md (2026-11-19). */

type Metodo = { id: number; monto: string; metodo: string; extra: Record<string, string> }
const filaVacia = (id: number, monto = '', metodo: string = METODOS_PAGO[0]): Metodo => ({ id, monto, metodo, extra: {} })

export function PatientPaymentPanel({
  movs, aplicaciones, garante, dependientes, alcanceInicial = ALCANCE_GUARANTOR, hoy, onGuardar, onCancelar,
}: FormularioLedger) {
  const ahora = hoy ?? new Date()
  const opciones = opcionesAplicaA(garante, dependientes)
  const [fecha, setFecha] = useState<Date | null>(ahora)
  const [aplicaA, setAplicaA] = useState(alcanceInicial)
  /* Arranca con lo que se debe en el alcance: así el pago se reparte de entrada, como red.dev. */
  const [metodos, setMetodos] = useState<Metodo[]>(() => {
    const abierto = cargosAbiertos(movs, aplicaciones, pacienteDeAlcance(alcanceInicial)).reduce((a, c) => a + c.guarantor, 0)
    return [filaVacia(0, abierto > 0 ? abierto.toFixed(2) : '')]
  })
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const total = Math.round(metodos.reduce((a, f) => a + numero(f.monto), 0) * 100) / 100
  const ap = useAplicacion({ movs, aplicaciones, aplicaA, total, mensajeExceso: MENSAJES.pagoAplicado })
  /* Sin transacciones abiertas no hay a qué aplicar: sin métodos de pago y Save apagado, como red.dev (ledger.md, 2026-11-20). */
  const sinCargos = !ap.cargando && ap.cargos.length === 0
  /* Otro Apply to: con un solo método, el importe pasa a ser lo abierto del nuevo alcance (red.dev). */
  const cambiarAplicaA = (v: string) => {
    setAplicaA(v)
    if (metodos.length > 1) return
    const abierto = cargosAbiertos(movs, aplicaciones, pacienteDeAlcance(v)).reduce((a, c) => a + c.guarantor, 0)
    setMetodos((p) => [{ ...p[0], monto: abierto > 0 ? abierto.toFixed(2) : '' }])
  }

  const setFila = (id: number, cambios: Partial<Metodo>) => setMetodos((p) => p.map((f) => (f.id === id ? { ...f, ...cambios } : f)))
  const errorMonto = (f: Metodo) => (!f.monto.trim() ? OBLIGATORIO : numero(f.monto) <= 0 ? MENSAJES.monto : undefined)
  const errorExtra = (f: Metodo, id: string) => (!f.extra[id]?.trim() ? OBLIGATORIO : undefined)
  const errorFecha = !fecha ? OBLIGATORIO : esFutura(fecha, ahora) ? MENSAJES.futura : undefined

  const hayErrorDeCampos = () =>
    !!errorFecha || metodos.some((f) => !!errorMonto(f) || (CAMPOS_METODO[f.metodo] ?? []).some((c) => !!errorExtra(f, c.id)))

  const guardar = () => {
    setIntentado(true)
    if (sinCargos || hayErrorDeCampos() || ap.error || ap.cargando || !fecha) return
    const componentes = metodos.map((f) => {
      const campos = CAMPOS_METODO[f.metodo] ?? []
      const ref = campos.length ? (f.metodo === 'Check Payment' ? `#${f.extra.cheque}` : f.extra[campos[0].id]) : undefined
      return { metodo: f.metodo, monto: numero(f.monto), ...(ref ? { ref } : {}) }
    })
    const alcance = aplicaA === ALCANCE_GUARANTOR ? 'guarantor' : 'patient'
    const m: Omit<Movimiento, 'id'> = {
      fecha: formatMDY(fecha),
      paciente: aplicaA === ALCANCE_GUARANTOR ? garante : aplicaA,
      codigo: '—',
      descripcion: componentes.length === 1
        ? `${componentes[0].metodo}${componentes[0].ref ? ` ${componentes[0].ref}` : ''}`
        : `Patient Payment · ${componentes.length} methods`,
      provider: 'Front desk',
      tipo: 'Payment',
      monto: -total,
      estado: 'Posted',
      alcance,
      metodos: componentes,
      ...(notas.trim() ? { nota: notas.trim() } : {}),
      ...(ap.noAplicado > 0 ? { creditoDisponible: ap.noAplicado } : {}),
    }
    onGuardar(m, soloAplicado(ap.aplicado))
  }

  const botonMetodo = 'mt-7 flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-ink-muted shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-dash-blue'
  const primero = (
    <SeccionLedger titulo="Payment information">
      {/* Fecha y Apply to en las dos primeras columnas de cuatro, como red.dev (ledger.md, 2026-11-20). */}
      <div className={FILA[4]}>
        <CampoFecha value={fecha} onChange={setFecha} error={intentado ? errorFecha : undefined} />
        <ApplyToSelect opciones={opciones} value={aplicaA} onChange={cambiarAplicaA} titulo="Apply payment to" />
      </div>

      {/* Cada método en su caja gris, con todos sus campos en una fila, como red.dev: importe, método y lo que pide (cheque
          y banco, ID de autorización o número de referencia). + suma otro y − lo saca (CON-3738). */}
      {!sinCargos && metodos.map((f, i) => {
        const extra = CAMPOS_METODO[f.metodo] ?? []
        return (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-line bg-surface-subtle p-3">
            <div className={cn('flex-1', FILA[(2 + extra.length) as 2 | 3 | 4])}>
              <TextField
                label="Amount" required placeholder="$ 0.00" value={f.monto}
                onChange={(v) => setFila(f.id, { monto: limpiarImporte(v) })}
                error={intentado ? errorMonto(f) : undefined}
              />
              <SelectField
                label="Payment method" required options={[...METODOS_PAGO]} value={f.metodo}
                onChange={(v) => setFila(f.id, { metodo: v, extra: {} })}
              />
              {extra.map((c) => (
                <TextField
                  key={c.id} label={c.label} required placeholder={c.placeholder} value={f.extra[c.id] ?? ''}
                  onChange={(v) => setFila(f.id, { extra: { ...f.extra, [c.id]: v } })}
                  error={intentado ? errorExtra(f, c.id) : undefined}
                />
              ))}
            </div>
            {/* Lugar fijo para − y +: las columnas de todas las filas quedan alineadas. */}
            <div className="flex shrink-0 justify-end gap-2 @2xl:w-20">
              {metodos.length > 1 && (
                <button type="button" aria-label="Remove this payment method" onClick={() => setMetodos((p) => p.filter((x) => x.id !== f.id))} className={botonMetodo}>
                  <Minus className="size-4" />
                </button>
              )}
              {i === metodos.length - 1 && (
                <button
                  type="button" aria-label="Add another payment method"
                  onClick={() => setMetodos((p) => [...p, filaVacia(Math.max(...p.map((x) => x.id)) + 1, '0.00', METODOS_PAGO[1])])}
                  className={botonMetodo}
                >
                  <Plus className="size-4" />
                </button>
              )}
            </div>
          </div>
        )
      })}

      <TextArea label="Notes" placeholder="Add a note (optional)" value={notas} onChange={setNotas} />
    </SeccionLedger>
  )

  const tabla = (
    <LedgerAllocationTable
      cargos={ap.cargos} aplicado={ap.aplicado} onAplicado={ap.setLinea} cargando={ap.cargando}
      aplicadoTotal={ap.aplicadoTotal} noAplicado={ap.noAplicado} error={ap.error}
    />
  )

  return (
    <ShellLedger titulo="New patient payment (-)" primero={primero} segundo={tabla} onGuardar={guardar} onCancelar={onCancelar} guardando={ap.cargando || sinCargos} />
  )
}
