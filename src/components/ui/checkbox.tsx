import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Casilla del sistema: cuadrada, azul cuando está marcada. La misma que usa
   la tabla de Unassigned en Treatment Plan. */
export function Checkbox({
  on, onChange, label, className,
}: {
  on: boolean
  onChange: (v: boolean) => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
        on ? 'border-dash-blue bg-dash-blue text-white' : 'border-[#d4d4d8] bg-white hover:border-[#a1a1aa]',
        className,
      )}
    >
      {on && <Check className="size-3" strokeWidth={3} />}
    </button>
  )
}
