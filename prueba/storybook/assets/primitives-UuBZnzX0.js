import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'
import { TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'

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
      className={cn(TARJETA_PANEL, 'flex flex-col overflow-hidden', className)}
    >
      {/* min-h y wrap: unas Tabs (36px) entran sin agrandarlo y en el celular bajan abajo del título (billing.md, 2026-10-09). */}
      <header className="flex min-h-[52px] shrink-0 flex-wrap items-center justify-between gap-2 px-5 py-2">
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

/* La card de adentro de un panel: Appointments, Waiting Room, Rooms y Pending Task del Dashboard, y los turnos del
   Patient Dashboard. Todas con el mismo fondo blanco, borde de medio pixel en gris tenue y sombra suave (Julián,
   2026-10-06: la sombra de antes, 0 4px 2px, se veía dura y cada card tenía la suya). Ver TARJETA_INTERNA. */
export function InnerCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(TARJETA_INTERNA, className)} {...props}>
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
`})))()}export{r as n,n as r,i as t};