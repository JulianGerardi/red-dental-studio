import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { NOMBRE_ALCANCE, ScopeIcon } from './ScopeIcons'
import type { ProcedureOption, ProcedureScope } from './data'

/* Las filas para elegir un procedimiento o una condición, con los estados del design system 2.0 (Figma 535:2822 y
   535:2307): Default, Selected (borde azul), Inactive (gris azulado), Error (rojo) y Disabled (apagada). Los íconos
   van en un cuadrado del color del estado. Ver design-reference/figma/modulos/clinical-mode.md. */
export type EstadoFila = 'default' | 'selected' | 'inactive' | 'error' | 'disabled'
export const ESTADOS_FILA: EstadoFila[] = ['default', 'selected', 'inactive', 'error', 'disabled']

const CAJA: Record<EstadoFila, string> = {
  default: 'border-line bg-white hover:border-line-strong',
  selected: 'border-dash-blue bg-white',
  inactive: 'border-input-inactive bg-input-inactive-bg',
  error: 'border-field-error bg-dash-bad-bg',
  disabled: 'border-line bg-surface-muted',
}
const CODIGO: Record<EstadoFila, string> = {
  default: 'text-dash-blue', selected: 'text-dash-blue', inactive: 'text-ink-muted', error: 'text-required', disabled: 'text-ink-faint',
}
const TEXTO: Record<EstadoFila, string> = {
  default: 'text-ink', selected: 'text-ink', inactive: 'text-ink-muted', error: 'text-ink', disabled: 'text-ink-faint',
}
export const FONDO_ICONO: Record<EstadoFila, string> = {
  default: 'bg-dash-blue', selected: 'bg-dash-blue', inactive: 'bg-input-inactive', error: 'bg-required', disabled: 'bg-ink-faint',
}

/* Un ícono con su tooltip: dice qué es. */
export function ConAyuda({ texto, children }: { texto: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top" sideOffset={4} className="bg-ink text-white">{texto}</TooltipContent>
    </Tooltip>
  )
}

/* El cuadrado de un ícono de procedimiento, en el color del estado. */
export function CajaIcono({ estado, className, children }: { estado: EstadoFila; className?: string; children: React.ReactNode }) {
  return <span className={cn('flex size-[23px] shrink-0 items-center justify-center rounded-[5px]', FONDO_ICONO[estado], className)}>{children}</span>
}

export function ProcedureRow({
  procedure, estado = 'default', scopes, scope, onSelect, onScope,
}: {
  procedure: ProcedureOption
  estado?: EstadoFila
  /** Dónde se puede cargar: un botón por alcance (diente, superficie, cuadrante, arcada). */
  scopes: ProcedureScope[]
  /** El alcance elegido, marcado con un anillo. */
  scope?: ProcedureScope | null
  onSelect?: () => void
  onScope?: (s: ProcedureScope) => void
}) {
  const apagada = estado === 'disabled'
  return (
    <div className={cn('flex w-full items-center gap-2 rounded-md border px-3 py-[11px] transition-colors', CAJA[estado])}>
      <button type="button" disabled={apagada} onClick={onSelect} aria-pressed={estado === 'selected'} className="min-w-0 flex-1 text-left text-xs outline-none disabled:cursor-not-allowed">
        <span className={cn('font-bold', CODIGO[estado])}>{procedure.code} - </span>
        <span className={cn('font-medium', TEXTO[estado])}>{procedure.label}</span>
        <span className="mt-1 block">
          <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-semibold', apagada || estado === 'inactive' ? 'bg-surface-muted text-ink-muted' : 'bg-dash-count-bg text-dash-blue')}>{procedure.area}</span>
        </span>
      </button>
      <TooltipProvider delayDuration={200}>
        <span className="flex shrink-0 items-center gap-2">
          {scopes.map((s) => (
            <ConAyuda key={s} texto={NOMBRE_ALCANCE[s]}>
              <button
                type="button" disabled={apagada} aria-label={`${procedure.code} on ${s.toLowerCase()}`}
                aria-pressed={scope === s} onClick={() => onScope?.(s)}
                className={cn('rounded-[5px] transition-all enabled:hover:opacity-85 disabled:cursor-not-allowed', scope === s && 'ring-dash-blue ring-2 ring-offset-1')}
              >
                <CajaIcono estado={estado}><ScopeIcon scope={s} /></CajaIcono>
              </button>
            </ConAyuda>
          ))}
        </span>
      </TooltipProvider>
    </div>
  )
}

/* Una condición o diagnóstico (Figma 535:2307): el nombre y el diente. */
export function ConditionRow({
  label, estado = 'default', onClick,
}: {
  label: string
  estado?: EstadoFila
  onClick?: () => void
}) {
  return (
    <button
      type="button" onClick={onClick} disabled={estado === 'disabled'} aria-pressed={estado === 'selected'}
      className={cn('flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-left shadow-[0_1px_31px_rgb(0_0_0/0.05)] transition-colors disabled:cursor-not-allowed', CAJA[estado])}
    >
      <span className={cn('min-w-0 text-[11px] leading-[25px] font-semibold', estado === 'inactive' ? 'text-ink-muted' : estado === 'disabled' ? 'text-ink-faint' : 'text-ink')}>{label}</span>
      <TooltipProvider delayDuration={200}>
        <ConAyuda texto="Tooth">
          <span><CajaIcono estado={estado} className="size-[26px] rounded-md"><ScopeIcon scope="Tooth" className="size-[15px]" /></CajaIcono></span>
        </ConAyuda>
      </TooltipProvider>
    </button>
  )
}
