import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
  top,
  className,
  bodyClassName,
  scroll,
  children,
}: {
  /** String en casi todos los paneles; algunos le suman el total (Globo o CuentaSuelta). */
  title: React.ReactNode
  controls?: React.ReactNode
  /** Arriba del título: el paciente elegido en Find Patient y los botones del paciente en Recent Billing Activity (Billing). */
  top?: React.ReactNode
  className?: string
  bodyClassName?: string
  /** El cuerpo scrollea adentro y el panel toma el alto que le dan (columnas que entran en la pantalla); un degradé avisa que hay más. */
  scroll?: boolean
  children?: React.ReactNode
}) {
  return (
    <section
      className={cn(TARJETA_PANEL, 'flex flex-col overflow-hidden', scroll && 'min-h-0', className)}
    >
      {top}
      {/* min-h y wrap: unas Tabs (36px) entran sin agrandarlo y en el celular bajan abajo del título (billing.md, 2026-10-09). */}
      <header className="flex min-h-[52px] shrink-0 flex-wrap items-center justify-between gap-2 px-5 py-2">
        {/* Figma: 13.5px. Subido a 15 para igualar el título del stat card. */}
        <h2 className="flex min-w-0 items-center gap-2 text-[15px] leading-none font-bold text-ink">{title}</h2>
        {controls}
      </header>
      {scroll ? (
        <CuerpoConScroll className={bodyClassName}>{children}</CuerpoConScroll>
      ) : (
        <div className={cn('flex min-h-px flex-1 flex-col gap-3 p-4', bodyClassName)}>
          {children}
        </div>
      )}
    </section>
  )
}

/* El cuerpo del panel con scroll interior (dashboard.md, 2026-10-19). Como en ShowMore, en Mac la barra no se ve hasta
   scrollear: un degradé abajo avisa que hay más y se va al llegar al final o si todo entra. */
function CuerpoConScroll({ className, children }: { className?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [alFinal, setAlFinal] = useState(true)
  const medir = () => {
    const el = ref.current
    if (el) setAlFinal(el.scrollTop + el.clientHeight >= el.scrollHeight - 4)
  }
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    return () => ro.disconnect()
  }, [])
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div ref={ref} onScroll={medir} className={cn('flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-4 [scrollbar-width:thin]', className)}>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
      <div aria-hidden className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface to-transparent transition-opacity', alFinal && 'opacity-0')} />
    </div>
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
  neutral: 'bg-surface border-ink-muted text-ink-medium',
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

/* El globo de lo que hay que atender, con el estilo de la campana: Appointments y Waiting room (Dashboard), Today
   appointments (Patients) y las cards clínicas de la ficha. Lo que sólo cuenta cuánto hay (Rooms, Recent patients) va
   con CuentaSuelta. Cero no se muestra; tope 99+ (dashboard.md, 2026-11-28). */
export function Globo({ n, texto, invertido, sinTooltip }: {
  n: number
  /** Qué se cuenta, en singular y plural ("appointment to check in"): lo dicen el tooltip y el lector de pantalla. */
  texto: [string, string]
  /** Sobre un fondo azul (la card clínica abierta): blanco con el número azul. */
  invertido?: boolean
  /** Dentro de un botón no va tooltip: alcanza con el texto para el lector. */
  sinTooltip?: boolean
}) {
  if (n <= 0) return null
  const detalle = `${n} ${n === 1 ? texto[0] : texto[1]}`
  const globo = (
    <span
      className={cn(
        'flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] leading-none font-semibold tabular-nums',
        invertido ? 'bg-info-bg text-dash-blue' : 'bg-dash-blue text-white',
      )}
    >
      <span aria-hidden>{n > 99 ? '99+' : n}</span>
      <span className="sr-only">{detalle}</span>
    </span>
  )
  if (sinTooltip) return globo
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{globo}</TooltipTrigger>
        <TooltipContent className="bg-tooltip text-[12px] font-normal text-white">{detalle}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/* Cuántos hay en una lista que no pide nada (Rooms, Recent patients): el número en gris junto al título, sin globo. */
export function CuentaSuelta({ n }: { n: number }) {
  return <span className="text-ink-muted font-medium tabular-nums">{n}</span>
}
