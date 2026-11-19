import { useState } from 'react'
import { TextField, SelectField, TextArea } from '@/components/patients/form'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { ApplyToSelect } from '@/components/patients/ledger/ApplyToSelect'
import {
  CampoFecha, SeccionLedger, ShellLedger, useAplicacion, type FormularioLedger,
} from '@/components/patients/ledger/formulario'
import { TIPOS_AJUSTE_CREDITO, type Movimiento } from '@/data/ledger'
import {
  ALCANCE_GUARANTOR, MENSAJES, esFutura, limpiarImporte, numero, opcionesAplicaA, soloAplicado,
} from '@/lib/ledgerAplicacion'
import { formatMDY } from '@/lib/fecha'
import { OBLIGATORIO } from '@/lib/validacion'

/* Credit Adjustment (CON-3739): la misma lógica que el pago -Apply to, el reparto del más viejo al más nuevo, lo que no
   se aplica queda como crédito- con un tipo de ajuste de crédito en lugar del método. Sólo los tipos de crédito (los de
   cargo van en Charge Adjustment). Empieza vacío: el importe lo pone quien lo registra. Ver ledger.md (2026-11-19). */

export function CreditAdjustmentPanel({
  movs, aplicaciones, garante, dependientes, alcanceInicial = ALCANCE_GUARANTOR, hoy, onGuardar, onCancelar,
}: FormularioLedger) {
  const ahora = hoy ?? new Date()
  const opciones = opcionesAplicaA(garante, dependientes)
  const [fecha, setFecha] = useState<Date | null>(ahora)
  const [aplicaA, setAplicaA] = useState(alcanceInicial)
  const [tipo, setTipo] = useState<string>(TIPOS_AJUSTE_CREDITO[0])
  const [monto, setMonto] = useState('')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const total = numero(monto)
  const ap = useAplicacion({ movs, aplicaciones, aplicaA, total, mensajeExceso: MENSAJES.ajusteAplicado })

  const errorMonto = !monto.trim() ? OBLIGATORIO : total <= 0 ? MENSAJES.monto : undefined
  const errorFecha = !fecha ? OBLIGATORIO : esFutura(fecha, ahora) ? MENSAJES.futura : undefined
  const validarPrimero = () => { setIntentado(true); return !errorMonto && !errorFecha && !!tipo }

  const guardar = () => {
    setIntentado(true)
    if (errorMonto || errorFecha || !tipo || ap.error || ap.cargando || !fecha) return
    const m: Omit<Movimiento, 'id'> = {
      fecha: formatMDY(fecha),
      paciente: aplicaA === ALCANCE_GUARANTOR ? garante : aplicaA,
      codigo: '—',
      descripcion: tipo,
      provider: 'Front desk',
      tipo: 'Adjustment',
      monto: -total,
      estado: 'Posted',
      alcance: aplicaA === ALCANCE_GUARANTOR ? 'guarantor' : 'patient',
      motivo: tipo,
      ...(notas.trim() ? { nota: notas.trim() } : {}),
      ...(ap.noAplicado > 0 ? { creditoDisponible: ap.noAplicado } : {}),
    }
    onGuardar(m, soloAplicado(ap.aplicado))
  }

  const grilla = 'grid gap-4 sm:grid-cols-2'
  const primero = (
    <SeccionLedger titulo="Credit Adjustment Information">
      <div className={grilla}>
        <CampoFecha value={fecha} onChange={setFecha} error={intentado ? errorFecha : undefined} />
        <ApplyToSelect opciones={opciones} value={aplicaA} onChange={setAplicaA} titulo="Apply credit to" />
        <SelectField label="Adjustment type" required options={[...TIPOS_AJUSTE_CREDITO]} value={tipo} onChange={setTipo} />
        <TextField
          label="Amount" required placeholder="$ 0.00" value={monto} onChange={(v) => setMonto(limpiarImporte(v))}
          error={intentado ? errorMonto : undefined}
        />
      </div>
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
    <ShellLedger
      titulo="Credit Adjustment (-)" pasos={['Adjustment', 'Allocation']}
      primero={primero} segundo={tabla} validarPrimero={validarPrimero}
      onGuardar={guardar} onCancelar={onCancelar} guardando={ap.cargando}
    />
  )
}
