import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useRef, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Tabs de la app: un control segmentado -caja gris con la pestaña activa en
   azul-, el mismo que ya usaban a mano Ledger, Billing, Account, Employees,
   Consents, Scheduling y el panel del paciente. Ver Elements / Tabs.

   Por qué así:
   - Segmentado y no subrayado: las pestañas de la app cambian vistas de un
     mismo bloque (Transactions / Patient Payment, Patient / Guarantor View),
     no páginas; la caja las agrupa y dice que son opciones de lo mismo.
   - Activa en azul con texto blanco: el mismo lenguaje que el ítem activo del
     menú lateral y del menú del paciente.
   - Una sola línea: si no entran, la tira se desliza de costado en vez de
     partirse en dos renglones, que cambiaría el orden en que se leen.
   - Teclado: flechas, Inicio y Fin mueven entre pestañas; sólo la activa
     recibe Tab (patrón WAI-ARIA de tabs). */

export type TabItem<T extends string> =
  | T
  | {
      value: T
      label?: ReactNode
      /** Cantidad que acompaña al nombre: "Waiting List (3)". */
      count?: number
      icon?: LucideIcon
      disabled?: boolean
      className?: string
    }

const TAMANO = {
  sm: 'h-7 px-2.5 text-xs [&_svg]:size-3.5',
  md: 'h-8 px-3 text-xs [&_svg]:size-3.5',
} as const

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  size = 'md',
  fullWidth,
  className,
  'aria-label': ariaLabel,
}: {
  tabs: readonly TabItem<T>[]
  value: T
  onChange: (v: T) => void
  /** md 32px (pantallas) · sm 28px (dentro de paneles y cards). */
  size?: keyof typeof TAMANO
  /** Ocupa todo el ancho y reparte las pestañas por igual (paneles angostos). */
  fullWidth?: boolean
  className?: string
  'aria-label'?: string
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const items = tabs.map((t) => (typeof t === 'string' ? { value: t } : t)) as Exclude<TabItem<T>, T>[]
  const habilitados = items.map((t, i) => (t.disabled ? -1 : i)).filter((i) => i >= 0)

  const mover = (desde: number, paso: number | 'inicio' | 'fin') => {
    const pos = habilitados.indexOf(desde)
    const destino =
      paso === 'inicio' ? habilitados[0]
      : paso === 'fin' ? habilitados[habilitados.length - 1]
      : habilitados[(pos + paso + habilitados.length) % habilitados.length]
    if (destino === undefined) return
    onChange(items[destino]!.value)
    refs.current[destino]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'flex max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-slate p-1',
        fullWidth ? 'w-full' : 'w-fit',
        className,
      )}
    >
      {items.map((t, i) => {
        const activa = t.value === value
        const Icono = t.icon
        return (
          <button
            key={t.value}
            ref={(el) => { refs.current[i] = el }}
            type="button"
            role="tab"
            aria-selected={activa}
            tabIndex={activa ? 0 : -1}
            disabled={t.disabled}
            onClick={() => onChange(t.value)}
            onKeyDown={(e) => {
              const paso = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'Home' ? 'inicio' : e.key === 'End' ? 'fin' : null
              if (paso === null) return
              e.preventDefault()
              mover(i, paso)
            }}
            className={cn(
              'flex shrink-0 items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dash-blue',
              'disabled:cursor-not-allowed disabled:opacity-40',
              TAMANO[size],
              fullWidth && 'flex-1',
              activa ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
              t.className,
            )}
          >
            {Icono && <Icono aria-hidden />}
            {t.label ?? t.value}
            {t.count !== undefined && t.count > 0 && <span className={cn('tabular-nums', activa ? 'text-white/80' : 'text-ink-faint')}>({t.count})</span>}
          </button>
        )
      })}
    </div>
  )
}
`})))()}export{r as n,n as r,i as t};