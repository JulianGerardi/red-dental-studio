import { useId } from 'react'
import { BadgeDollarSign, Percent, Receipt } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { FieldError, FieldLabel, OptionCheckbox, control } from '@/components/patients/form'
import { FilaDato } from './DatosHallazgo'
import { calcularEstimado, dinero, resolverEstimado, type EstimadoProcedimiento } from '@/data/estimaciones'

/* Edit Procedure › Estimate (CON-4211): el estimado del seguro de este procedimiento, como el Edit Procedure de la app
   anterior (Outstanding Insurance Estimates) con el vocabulario de Estimate details.
   Arriba lo que no se edita (cargo, permitido, cobertura); después las partes, que se calculan solas o se cargan a
   mano. El paciente paga el resto. Sin overrides por seguro (Julián, 2026-11-25). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-25). */

const CUADRADO = 'flex size-[22px] shrink-0 items-center justify-center rounded-[4px] bg-surface text-ink [&_svg]:size-[13px]'
const a2 = (n: number) => n.toFixed(2)
const numero = (t: string) => Math.max(0, Number(t.replace(/[^0-9.]/g, '')) || 0)

/** Lo que arranca el formulario: lo guardado o, sin nada guardado, el cálculo automático sin overrides. */
export function estimadoInicial(codigo: string, cobrado: number, e?: EstimadoProcedimiento): EstimadoProcedimiento {
  if (e) return e
  const c = calcularEstimado(codigo, cobrado)
  return { automatico: true, primario: c.primario, secundario: c.secundario, ajuste: c.ajuste }
}

/** El error del estimado, si lo hay: las partes del seguro no pueden pasar el cargo. */
export function errorEstimado(codigo: string, cobrado: number, e: EstimadoProcedimiento) {
  const r = resolverEstimado(codigo, cobrado, e)
  return r.paciente < 0 ? `Insurance amounts can't add up to more than the amount charged (${dinero(cobrado)}).` : undefined
}

/** Un monto con el signo $ adelante, alineado a la derecha. */
function CampoMonto({ label, value, onChange, disabled, hideLabel }: {
  label: string
  value: number
  onChange?: (n: number) => void
  disabled?: boolean
  hideLabel?: boolean
}) {
  const id = useId()
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className={cn(hideLabel && 'sr-only')}><FieldLabel>{label}</FieldLabel></label>
      <span className="relative">
        <span aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[13px] text-ink-faint">$</span>
        <input
          id={id} inputMode="decimal" disabled={disabled || !onChange}
          /* Se reescribe al salir del campo con dos decimales; mientras se tipea queda lo que se escribe. */
          key={a2(value)} defaultValue={a2(value)}
          onBlur={(e) => onChange?.(numero(e.target.value))}
          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
          className={cn(control(), 'h-9 pr-3 pl-7 text-right tabular-nums')}
        />
      </span>
    </div>
  )
}

export function ProcedureEstimate({ codigo, cobrado, value, onChange, bloqueo }: {
  codigo: string
  /** El fee del procedimiento. Sin cargo no se estima (CON-2529). */
  cobrado?: number
  value: EstimadoProcedimiento
  onChange: (e: EstimadoProcedimiento) => void
  /** Por qué no se puede editar (el caso ya salió de Planning). Se ve, pero no se toca. */
  bloqueo?: string
}) {
  if (!cobrado) {
    return (
      <EmptyState
        icon={Receipt} title="No amount charged"
        detail="This procedure has no fee, so there is nothing to estimate. Add a fee in the fee schedule to see its insurance estimate."
      />
    )
  }
  const auto = calcularEstimado(codigo, cobrado)
  const r = resolverEstimado(codigo, cobrado, value)
  const error = errorEstimado(codigo, cobrado, value)
  const fijo = !!bloqueo
  const set = (patch: Partial<EstimadoProcedimiento>) => onChange({ ...value, ...patch })

  return (
    <div className="flex flex-col gap-5">
      {bloqueo && <Alert tone="info" title="Estimate locked">{bloqueo}</Alert>}

      <div className="flex flex-col gap-4">
        <FilaDato icono={<span className={CUADRADO}><BadgeDollarSign /></span>} rotulo="Amount charged">{dinero(cobrado)}</FilaDato>
        <FilaDato icono={<span className={CUADRADO}><Receipt /></span>} rotulo="Allowable amount">{dinero(auto.permitido)}</FilaDato>
        <FilaDato icono={<span className={CUADRADO}><Percent /></span>} rotulo="Coverage">{auto.cobertura}%</FilaDato>
      </div>

      <section aria-labelledby="estimado-partes" className="flex flex-col gap-3.5">
        <p id="estimado-partes" className="text-sm font-bold text-ink">Outstanding insurance estimates</p>
        <OptionCheckbox
          label="Calculate insurance estimates automatically" checked={value.automatico} disabled={fijo}
          /* Al volver a automático, los montos a mano se reemplazan por el cálculo. */
          onChange={(on) => set(on ? { automatico: true, primario: auto.primario, secundario: auto.secundario, ajuste: auto.ajuste } : { automatico: false })}
        />
        <div className="grid grid-cols-2 gap-4">
          <CampoMonto label="Primary insurance portion" value={value.automatico ? auto.primario : value.primario} onChange={value.automatico || fijo ? undefined : (n) => set({ primario: n })} />
          <CampoMonto label="Secondary insurance portion" value={value.automatico ? auto.secundario : value.secundario} onChange={value.automatico || fijo ? undefined : (n) => set({ secundario: n })} />
          <CampoMonto label="Insurance write-off" value={value.automatico ? auto.ajuste : value.ajuste} onChange={value.automatico || fijo ? undefined : (n) => set({ ajuste: n })} />
          <CampoMonto label="Patient portion" value={Math.max(0, r.paciente)} />
        </div>
        {error && <FieldError>{error}</FieldError>}
      </section>
    </div>
  )
}
