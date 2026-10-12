import { useState } from 'react'
import { Calendar, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MonthCalendar, POPOVER_FECHA, fechaTriggerClasses, primeroDelMes, sameDay } from '@/components/ui/date-picker'
import { cn } from '@/lib/utils'

/* Filtro de fecha de una lista (Notifications): un solo campo que filtra un día o un rango. Un clic en un día filtra ese
   día; un segundo clic cierra el rango. Atajos a la izquierda (Last 7 days…), puntos en los días con contenido y los días
   que vienen deshabilitados. Se aplica al tocar, como Filter. El campo y el calendario son los del DatePicker
   (`fechaTriggerClasses`, `MonthCalendar`). Ver Elements / Date filter y design-reference/figma/modulos/notifications.md
   (2026-10-12). */

export type DateRange = { from: Date; to: Date }
export type DatePreset = { label: string; range: () => DateRange }

const dia = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const sumarDias = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const ultimos = (n: number) => () => ({ from: sumarDias(dia(new Date()), 1 - n), to: dia(new Date()) })

export const DATE_PRESETS: DatePreset[] = [
  { label: 'Today', range: ultimos(1) },
  { label: 'Yesterday', range: () => ({ from: sumarDias(dia(new Date()), -1), to: sumarDias(dia(new Date()), -1) }) },
  { label: 'Last 7 days', range: ultimos(7) },
  { label: 'Last 30 days', range: ultimos(30) },
  { label: 'Last 90 days', range: ultimos(90) },
]

/** El día cae dentro del rango (los dos extremos incluidos). */
export const inRange = (d: Date, r: DateRange) => dia(d) >= dia(r.from) && dia(d) <= dia(r.to)
const mismoRango = (a: DateRange, b: DateRange) => sameDay(a.from, b.from) && sameDay(a.to, b.to)

/* "Last 7 days" si coincide con un atajo; si no "Oct 3" o "Oct 1 – Oct 5", con el año sólo si no es el actual. */
export function rangeLabel(r: DateRange | null, presets = DATE_PRESETS): string {
  if (!r) return 'All dates'
  const atajo = presets.find((p) => mismoRango(p.range(), r))
  if (atajo) return atajo.label
  const f = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric' })
  return sameDay(r.from, r.to) ? f(r.from) : `${f(r.from)} – ${f(r.to)}`
}

/* Lo de adentro del popover: atajos y calendario. Separado para mostrarlo abierto en el design system. */
export function DateFilterPanel({
  value, onChange, onDone, marked = [], max = new Date(), presets = DATE_PRESETS, defaultAnchor,
}: {
  value: DateRange | null
  onChange: (r: DateRange | null) => void
  /** Se eligió un rango completo o un atajo: el popover se cierra. */
  onDone?: () => void
  /** Días con contenido: se marcan con un punto. */
  marked?: Date[]
  /** Último día que se puede elegir (hoy): los de después quedan deshabilitados. */
  max?: Date
  presets?: DatePreset[]
  /** Arranca con el primer día ya tocado, esperando el segundo (para mostrar ese estado). */
  defaultAnchor?: Date
}) {
  const [mes, setMes] = useState(() => primeroDelMes(value?.to ?? defaultAnchor ?? max))
  const [ancla, setAncla] = useState<Date | null>(defaultAnchor ?? null)
  const [sobre, setSobre] = useState<Date | null>(null)

  /* Mientras se arma el rango se ve el que quedaría hasta el día bajo el mouse (o el foco). */
  const visto: DateRange | null = ancla
    ? { from: sobre && sobre < ancla ? sobre : ancla, to: sobre && sobre > ancla ? sobre : ancla }
    : value

  const elegir = (d: Date) => {
    if (!ancla) {
      setAncla(d)
      onChange({ from: d, to: d })
      return
    }
    setAncla(null)
    onChange(d < ancla ? { from: d, to: ancla } : { from: ancla, to: d })
    onDone?.()
  }
  const atajo = (r: DateRange | null) => {
    setAncla(null)
    onChange(r)
    onDone?.()
  }

  const opciones: { label: string; r: DateRange | null }[] = [{ label: 'All dates', r: null }, ...presets.map((p) => ({ label: p.label, r: p.range() }))]
  const elegido = (r: DateRange | null) => !ancla && (r && value ? mismoRango(r, value) : r === value)

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Atajos: a la izquierda en escritorio, en una tira arriba en el celular. */}
      <div role="group" aria-label="Quick ranges" className="flex flex-wrap gap-1 sm:w-[124px] sm:flex-col sm:flex-nowrap sm:border-r sm:border-line sm:pr-3">
        {opciones.map((o) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={elegido(o.r)}
            onClick={() => atajo(o.r)}
            className={cn(
              'h-8 rounded-md border px-2.5 text-left text-[13px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-dash-blue sm:border-transparent',
              elegido(o.r) ? 'border-dash-blue bg-info-bg font-medium text-dash-blue' : 'border-line text-ink hover:bg-surface-subtle',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        <MonthCalendar month={mes} onMonthChange={setMes} from={visto?.from} to={visto?.to} onPick={elegir} onHover={setSobre} marked={marked} max={max} />
        <p className="mt-2 text-[12px] text-ink-muted" aria-live="polite">
          {ancla ? 'Now pick the end date.' : 'Pick a day, or two days for a range.'}
        </p>
      </div>
    </div>
  )
}

/* El campo: "All dates" mientras no filtra; con fechas, azul como Filter con algo aplicado y una ✕ para sacarlas. */
export function DateFilter({
  value, onChange, marked, max, presets = DATE_PRESETS, label = 'Filter by date', disabled, className,
}: {
  value: DateRange | null
  onChange: (r: DateRange | null) => void
  marked?: Date[]
  max?: Date
  presets?: DatePreset[]
  /** Nombre para lectores de pantalla ("Filter notifications by date"). */
  label?: string
  disabled?: boolean
  className?: string
}) {
  const [abierto, setAbierto] = useState(false)
  const texto = rangeLabel(value, presets)
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      <Popover open={abierto} onOpenChange={setAbierto}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label={`${label}: ${texto}`}
            className={cn(fechaTriggerClasses('toolbar'), value && 'border-dash-blue bg-info-bg pr-8 text-dash-blue hover:bg-info-bg')}
          >
            <Calendar aria-hidden />
            {texto}
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" collisionPadding={12} aria-label={label} className={POPOVER_FECHA}>
          <DateFilterPanel value={value} onChange={onChange} onDone={() => setAbierto(false)} marked={marked} max={max} presets={presets} />
        </PopoverContent>
      </Popover>
      {value && !disabled && (
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="Clear dates"
          className="absolute top-1/2 right-1 flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-dash-blue transition-colors hover:bg-dash-blue/10 focus-visible:outline-2 focus-visible:outline-dash-blue"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}
