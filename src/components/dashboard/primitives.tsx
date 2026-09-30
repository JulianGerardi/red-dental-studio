import { cn } from '@/lib/utils'

/* ── Escala tipográfica ──────────────────────────────────────────────
   El Figma usa 15/26/13px en el chrome exterior, pero adentro de los
   appointment cards se derrumba a 11/9/8 y hasta 5.87px (un componente
   pegado y escalado ~0.75×). Acá se respetan las proporciones pero se
   sube la escala interna ~1.3× y se pone un piso de 11px para lo que
   quedaba por debajo del umbral de legibilidad.
   Ver design-reference/figma/README.md, punto 8.          */

export function Panel({
  title,
  controls,
  className,
  bodyClassName,
  children,
}: {
  /** String en casi todos los paneles; algunos -Today Appointments,
      Recent Patients en Patients.tsx- le agregan un globo con el total. */
  title: React.ReactNode
  controls?: React.ReactNode
  className?: string
  bodyClassName?: string
  children?: React.ReactNode
}) {
  return (
    <section
      className={cn('shadow-panel flex flex-col overflow-hidden rounded-lg bg-white', className)}
    >
      <header className="flex h-[52px] shrink-0 items-center justify-between gap-2 px-5 py-3">
        {/* Figma: 13.5px. Subido a 15 para igualar el título del stat card. */}
        <h2 className="flex min-w-0 items-center gap-2 text-[15px] leading-none font-bold text-black">{title}</h2>
        {controls}
      </header>
      <div className={cn('flex min-h-px flex-1 flex-col gap-3 p-4', bodyClassName)}>
        {children}
      </div>
    </section>
  )
}

/* Card interior compartido por Appointment y Operatory: mismo radio,
   misma sombra y mismo fondo en el Figma. */
export function InnerCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('shadow-inner-card rounded-lg bg-white', className)} {...props}>
      {children}
    </div>
  )
}

const PILL = {
  ok: 'bg-dash-ok-bg border-dash-ok-fg text-dash-ok-fg',
  busy: 'bg-dash-busy-bg border-dash-busy-fg text-dash-busy-fg',
  bad: 'bg-dash-bad-bg border-dash-bad-fg text-dash-bad-fg',
} as const

export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: keyof typeof PILL
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border px-2 py-[3px] whitespace-nowrap',
        'text-[11px] leading-none font-semibold',
        PILL[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
