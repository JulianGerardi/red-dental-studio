import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Chip: algo elegido que se puede sacar (un código CDT, un filtro aplicado). Celeste con texto azul y la ✕ a la derecha.
   No es un estado (eso es Pill) ni una cuenta (Count). Julián, 2026-10-09: había seis chips a mano con colores distintos.
   Ver Elements / Chips. */
/* blue: lo elegido (el de siempre). neutral: un dato al lado de otro que se quiere destacar (Carrier junto al Plan en
   el buscador de suscripciones de Insurance, 2026-11-10). */
export type ChipTone = 'blue' | 'neutral'
const CHIP_TONES: Record<ChipTone, string> = {
  blue: 'bg-dash-count-bg text-dash-blue',
  neutral: 'bg-surface-muted text-ink-soft',
}

export function Chip({ children, onRemove, removeLabel, disabled, className, tone = 'blue', title }: {
  children: ReactNode
  tone?: ChipTone
  /** Tooltip con el texto completo, por si se corta. */
  title?: string
  /** Sin onRemove el chip es sólo lectura (no lleva ✕). */
  onRemove?: () => void
  /** aria-label de la ✕, por ejemplo "Remove D0140". */
  removeLabel?: string
  disabled?: boolean
  className?: string
}) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex h-6 max-w-full items-center gap-1 rounded-full pl-2.5 text-[12px] font-medium',
        CHIP_TONES[tone],
        onRemove ? 'pr-1' : 'pr-2.5',
        disabled && 'opacity-60',
        className,
      )}
    >
      <span className="truncate">{children}</span>
      {onRemove && (
        <button
          type="button" aria-label={removeLabel ?? 'Remove'} onClick={onRemove} disabled={disabled}
          className="flex size-4 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-dash-blue disabled:pointer-events-none"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  )
}
