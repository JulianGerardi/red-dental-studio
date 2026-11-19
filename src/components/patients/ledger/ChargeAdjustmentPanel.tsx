import { useMemo, useState } from 'react'
import { TextField, SelectField, TextArea } from '@/components/patients/form'
import { ApplyToSelect } from '@/components/patients/ledger/ApplyToSelect'
import { CampoFecha, SeccionLedger, ShellLedger, type FormularioLedger } from '@/components/patients/ledger/formulario'
import { TIPOS_AJUSTE_CARGO, type Movimiento } from '@/data/ledger'
import { ALCANCE_GUARANTOR, MENSAJES, esFutura, limpiarImporte, numero, opcionesAplicaA, pacienteDeAlcance } from '@/lib/ledgerAplicacion'
import { formatMDY } from '@/lib/fecha'
import { OBLIGATORIO } from '@/lib/validacion'

/* Enter Charge (+) Adjustment (CON-3735): suma al balance y queda como un cargo más para cubrir con un pago o un crédito;
   no se aplica a nada, por eso no lleva tabla. Provider es opcional (CON-4083). Visit date son las visitas del alcance
   elegido más [None]. Ver design-reference/figma/modulos/ledger.md (2026-11-19). */

export const SIN_VISITA = '[None]'

export function ChargeAdjustmentPanel({
  movs, garante, dependientes, alcanceInicial = ALCANCE_GUARANTOR, hoy, onGuardar, onCancelar, modo = 'tab', providers = [],
}: Omit<FormularioLedger, 'aplicaciones'> & {
  /** Los profesionales que se pueden elegir. */
  providers?: string[]
}) {
  const ahora = hoy ?? new Date()
  const opciones = opcionesAplicaA(garante, dependientes)
  const [fecha, setFecha] = useState<Date | null>(ahora)
  const [aplicaA, setAplicaA] = useState(alcanceInicial)
  const [tipo, setTipo] = useState<string>(TIPOS_AJUSTE_CARGO[0])
  const [monto, setMonto] = useState('')
  const [provider, setProvider] = useState('')
  const [visita, setVisita] = useState('')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  /* Las visitas del alcance: las del paciente elegido o las de todos los de su guarantor. */
  const visitas = useMemo(() => {
    const paciente = pacienteDeAlcance(aplicaA)
    const fechas = movs.filter((m) => m.tipo === 'Charge' && (!paciente || m.paciente === paciente)).map((m) => `Visit - ${m.fecha}`)
    return [SIN_VISITA, ...new Set(fechas)]
  }, [movs, aplicaA])

  const valor = numero(monto)
  const errorMonto = !monto.trim() ? OBLIGATORIO : valor <= 0 ? MENSAJES.monto : undefined
  const errorFecha = !fecha ? OBLIGATORIO : esFutura(fecha, ahora) ? MENSAJES.futura : undefined
  const errorTipo = !tipo ? 'An adjustment type is required for charge adjustments.' : undefined

  const guardar = () => {
    setIntentado(true)
    if (errorMonto || errorFecha || errorTipo || !fecha) return
    const m: Omit<Movimiento, 'id'> = {
      fecha: formatMDY(fecha),
      paciente: aplicaA === ALCANCE_GUARANTOR ? garante : aplicaA,
      codigo: '—',
      descripcion: tipo,
      provider: provider || 'Front desk',
      tipo: 'Adjustment',
      monto: valor,
      estado: 'Posted',
      alcance: aplicaA === ALCANCE_GUARANTOR ? 'guarantor' : 'patient',
      motivo: tipo,
      ...(notas.trim() ? { nota: notas.trim() } : {}),
    }
    onGuardar(m, {})
  }

  const grilla = modo === 'drawer' ? 'grid gap-4 sm:grid-cols-2' : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'
  const primero = (
    <SeccionLedger titulo="Adjustment Information" modo={modo}>
      <div className={grilla}>
        <CampoFecha value={fecha} onChange={setFecha} error={intentado ? errorFecha : undefined} />
        <TextField
          label="Amount" required placeholder="$ 0.00" value={monto} onChange={(v) => setMonto(limpiarImporte(v))}
          error={intentado ? errorMonto : undefined}
        />
        <SelectField label="Type" required options={[...TIPOS_AJUSTE_CARGO]} value={tipo} onChange={setTipo} error={intentado ? errorTipo : undefined} />
        <SelectField label="Provider" placeholder="Select" options={providers} value={provider} onChange={setProvider} />
        <ApplyToSelect opciones={opciones} value={aplicaA} onChange={(v) => { setAplicaA(v); setVisita('') }} titulo="Apply adjustment to" />
        <SelectField label="Visit date" placeholder="Select" options={visitas} value={visita} onChange={setVisita} />
      </div>
      <TextArea label="Notes" placeholder="Add a note (optional)" value={notas} onChange={setNotas} />
    </SeccionLedger>
  )

  return <ShellLedger modo={modo} titulo="Enter Charge (+) Adjustment" primero={primero} onGuardar={guardar} onCancelar={onCancelar} />
}
