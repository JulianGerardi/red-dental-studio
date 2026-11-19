import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldError, FieldLabel, control } from '@/components/patients/form'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { OpcionAplicaA } from '@/lib/ledgerAplicacion'

/* Apply to de Patient Payment, Credit y Charge Adjustment, como red.dev: la lista dice "Apply payment to" y cada opción
   lleva su nombre y, abajo, quién es (Whole household, Self, Dependent). Elegir otra recarga los cargos abiertos
   (CON-3738). Ver design-reference/figma/modulos/ledger.md (2026-11-19). */
export function ApplyToSelect({
  opciones, value, onChange, titulo = 'Apply payment to', error, className,
}: {
  opciones: OpcionAplicaA[]
  /** La clave de la opción elegida. */
  value: string
  onChange: (clave: string) => void
  /** El rótulo de la lista: "Apply payment to", "Apply credit to"… */
  titulo?: string
  error?: string
  className?: string
}) {
  const elegida = opciones.find((o) => o.clave === value)
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required>Apply to</FieldLabel>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Apply to"
          className={cn(control(error), 'flex h-9 items-center justify-between gap-2 px-3 text-left text-ink transition-colors data-[state=open]:border-dash-blue')}
        >
          <span className="min-w-0 truncate">{elegida?.etiqueta ?? 'Select'}</span>
          <ChevronDown aria-hidden className="size-4 shrink-0 text-black" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" style={{ width: 'var(--radix-dropdown-menu-trigger-width)', minWidth: 220 }}>
          <DropdownMenuLabel className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">{titulo}</DropdownMenuLabel>
          {opciones.map((o) => (
            <DropdownMenuItem key={o.clave} onSelect={() => onChange(o.clave)} className="items-start gap-2 py-1.5">
              <span className="flex min-w-0 flex-1 flex-col">
                <span className={cn('truncate text-[13px]', o.clave === value ? 'font-medium text-dash-blue' : 'text-ink')}>{o.etiqueta}</span>
                <span className="text-[11px] text-ink-muted">{o.sub}</span>
              </span>
              {o.clave === value && <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-dash-blue" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <FieldError>{error}</FieldError>
    </div>
  )
}
