import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Chip: algo elegido que se puede sacar (un código CDT, un filtro aplicado). Celeste con texto azul y la ✕ a la derecha.
   No es un estado (eso es Pill) ni una cuenta (Count). Julián, 2026-10-09: había seis chips a mano con colores distintos.
   Ver Elements / Chips. */
export function Chip({ children, onRemove, removeLabel, disabled, className }: {
  children: ReactNode
  /** Sin onRemove el chip es sólo lectura (no lleva ✕). */
  onRemove?: () => void
  /** aria-label de la ✕, por ejemplo "Remove D0140". */
  removeLabel?: string
  disabled?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 max-w-full items-center gap-1 rounded-full bg-dash-count-bg pl-2.5 text-[12px] font-medium text-dash-blue',
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
`})))()}export{n,i as r,r as t};