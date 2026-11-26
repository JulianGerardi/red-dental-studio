import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MonthCalendar, POPOVER_FECHA, formatLargo, primeroDelMes, sameDay } from '@/components/ui/date-picker'
import { cn } from '@/lib/utils'

/* La navegación de fecha de una pantalla (Dashboard y Scheduling): un solo bloque con ‹ Today › y, separado por una
   línea, el período que se ve con el calendario para ir a una fecha. El Dashboard usa un día; Scheduling, el período de
   su vista (Day, Week o Month). Distribución del prototipo "Date navigation" de Julián con el estilo de la app: alto de
   32 como los botones \`md\`, borde \`line\`, sombra sutil y el calendario del DatePicker (dashboard.md, 2026-11-24). */

export type PeriodoFecha = 'day' | 'week' | 'month'

const NOMBRE: Record<PeriodoFecha, string> = { day: 'day', week: 'week', month: 'month' }

const inicioSemana = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay())
const sumar = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const corta = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

/** "Feb 28, 2026" · "May 29 – Jun 4, 2022" · "May 2022". */
export function etiquetaPeriodo(d: Date, periodo: PeriodoFecha) {
  if (periodo === 'day') return formatLargo(d)
  if (periodo === 'month') return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const a = inicioSemana(d)
  const b = sumar(a, 6)
  if (a.getFullYear() !== b.getFullYear()) return \`\${corta(a)}, \${a.getFullYear()} – \${corta(b)}, \${b.getFullYear()}\`
  return \`\${corta(a)} – \${a.getMonth() === b.getMonth() ? b.getDate() : corta(b)}, \${b.getFullYear()}\`
}

/** Un período para atrás o para adelante. El mes conserva el día (el 31 pasa al último del mes que no lo tiene). */
export function moverPeriodo(d: Date, periodo: PeriodoFecha, paso: 1 | -1) {
  if (periodo === 'day') return sumar(d, paso)
  if (periodo === 'week') return sumar(d, 7 * paso)
  const ultimo = new Date(d.getFullYear(), d.getMonth() + paso + 1, 0).getDate()
  return new Date(d.getFullYear(), d.getMonth() + paso, Math.min(d.getDate(), ultimo))
}

const BOTON = 'flex items-center justify-center text-ink transition-colors hover:bg-surface-subtle focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-dash-blue disabled:pointer-events-none disabled:text-ink-faint'

export function DateNav({ value, onChange, periodo = 'day', hoy = new Date(), marked, tour, className }: {
  value: Date
  onChange: (d: Date) => void
  /** Cuánto se mueve con las flechas y qué dice el campo. */
  periodo?: PeriodoFecha
  /** El día al que vuelve Today (Scheduling usa el de su demo). */
  hoy?: Date
  /** Días con contenido: un punto en el calendario. */
  marked?: Date[]
  /** Paso del recorrido guiado (Help). */
  tour?: string
  className?: string
}) {
  const [abierto, setAbierto] = useState(false)
  const [mes, setMes] = useState(() => primeroDelMes(value))
  const abrir = (v: boolean) => {
    if (v) setMes(primeroDelMes(value))
    setAbierto(v)
  }
  /* En la semana, el calendario marca los siete días que se ven. */
  const desde = periodo === 'week' ? inicioSemana(value) : value
  const hasta = periodo === 'week' ? sumar(desde, 6) : value
  /* Hoy está en lo que se ve: el mismo día, la misma semana o el mismo mes. */
  const enHoy = periodo === 'day' ? sameDay(value, hoy)
    : periodo === 'week' ? sameDay(inicioSemana(value), inicioSemana(hoy))
    : value.getFullYear() === hoy.getFullYear() && value.getMonth() === hoy.getMonth()

  return (
    <div
      role="group"
      aria-label="Date navigation"
      data-tour={tour}
      className={cn(
        'inline-flex h-8 shrink-0 items-stretch overflow-hidden rounded-md border text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors',
        /* En hoy, todo el bloque queda activo como un filtro aplicado (ui/filter-menu): borde y texto azules sobre celeste. */
        enHoy ? 'border-dash-blue bg-info-bg [&_button]:text-dash-blue [&_button:hover]:bg-dash-blue/10' : 'border-line bg-white',
        className,
      )}
    >
      <button type="button" aria-label={\`Previous \${NOMBRE[periodo]}\`} onClick={() => onChange(moverPeriodo(value, periodo, -1))} className={cn(BOTON, 'w-8')}>
        <ChevronLeft className="size-4" />
      </button>
      {/* Today dice si se está viendo hoy (dashboard.md, 2026-11-26). */}
      <button type="button" aria-pressed={enHoy} onClick={() => onChange(hoy)} className={cn(BOTON, 'px-2 font-medium')}>
        Today
      </button>
      <button type="button" aria-label={\`Next \${NOMBRE[periodo]}\`} onClick={() => onChange(moverPeriodo(value, periodo, 1))} className={cn(BOTON, 'w-8')}>
        <ChevronRight className="size-4" />
      </button>
      <Popover open={abierto} onOpenChange={abrir}>
        {/* El nombre del botón es el período que se ve ("Feb 28, 2026"), como el DatePicker. */}
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(BOTON, 'min-w-0 gap-2 border-l px-3 font-medium whitespace-nowrap data-[state=open]:bg-surface-subtle sm:min-w-[184px]', enHoy ? 'border-dash-blue/30 data-[state=open]:bg-dash-blue/10' : 'border-line')}
          >
            <Calendar aria-hidden className="text-dash-blue size-4 shrink-0" />
            <span className="truncate">{etiquetaPeriodo(value, periodo)}</span>
            <ChevronDown aria-hidden className={cn('size-3.5 shrink-0 transition-transform', enHoy ? 'text-dash-blue' : 'text-ink-muted', abierto && 'rotate-180')} />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" collisionPadding={12} aria-label="Select date" className={POPOVER_FECHA}>
          <MonthCalendar
            month={mes}
            onMonthChange={setMes}
            from={desde}
            to={hasta}
            marked={marked}
            yearNav
            onPick={(d) => { onChange(d); setAbierto(false) }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
`})))()}export{n,i as r,r as t};