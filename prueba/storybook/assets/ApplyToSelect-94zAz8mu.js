import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Building2, Check, ChevronDown, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldError, FieldLabel, control } from '@/components/patients/form'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ALCANCE_GUARANTOR, type OpcionAplicaA } from '@/lib/ledgerAplicacion'

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
          <ChevronDown aria-hidden className="size-4 shrink-0 text-ink" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" style={{ width: 'max(var(--radix-dropdown-menu-trigger-width), 280px)' }}>
          <DropdownMenuLabel className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">{titulo}</DropdownMenuLabel>
          {/* Como red.dev (video de Julián, 2026-11-20): cada opción con su cuadradito -la cuenta del guarantor, un edificio;
              una persona, la silueta- y la elegida en una caja azul con ✓. Colores y radios del design system. */}
          <div className="flex flex-col gap-1 p-1">
            {opciones.map((o) => {
              const elegida = o.clave === value
              const Icono = o.clave === ALCANCE_GUARANTOR ? Building2 : User
              return (
                <DropdownMenuItem
                  key={o.clave} onSelect={() => onChange(o.clave)}
                  className={cn(
                    'gap-3 rounded-lg border px-2.5 py-2',
                    elegida ? 'border-dash-blue bg-info-bg focus:bg-info-bg' : 'border-transparent focus:bg-surface-muted',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-md border',
                      elegida ? 'border-dash-blue/30 bg-white text-dash-blue' : 'border-line bg-surface-muted text-ink-muted',
                    )}
                  >
                    <Icono className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className={cn('truncate text-[13px] font-medium', elegida ? 'text-dash-blue' : 'text-ink')}>{o.etiqueta}</span>
                    <span className="text-[11px] text-ink-muted">{o.sub}</span>
                  </span>
                  {elegida && <Check aria-hidden className="size-4 shrink-0 text-dash-blue" />}
                </DropdownMenuItem>
              )
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <FieldError>{error}</FieldError>
    </div>
  )
}
`})))()}export{n,i as r,r as t};