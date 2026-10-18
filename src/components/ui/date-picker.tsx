import { useState, type ReactNode } from 'react'
import { Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

/* Trigger: mismo tratamiento que el resto de los inputs de la app
   (h-8, radio 6, borde `line`, sombra sutil, 13px). El Figma lo trae con
   borde azul permanente, pero acá el azul se reserva para el estado activo,
   como en el search y el selector de locación.
   Dos looks: `field` en formularios (dd-mm-aaaa, como el Figma, y el foco de
   los demás campos) y `toolbar` en una barra (Dashboard): "Feb 28, 2026",
   medium y el mismo campo que el Date filter de Notifications.
   El popover es el de Radix (devuelve el foco, no se sale de la pantalla) y
   el calendario, `MonthCalendar`, es el mismo del Date filter: celdas de 36,
   el elegido con `bg-primary`, hoy en azul y negrita. Ver
   design-reference/figma/modulos/dashboard.md (2026-10-12). */

export const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const formatDMY = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`

/** "Feb 28, 2026": la fecha para leer en una barra. dd-mm-aaaa queda para los formularios. */
export const formatLargo = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const dia = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const primeroDelMes = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)

/* El campo de fecha, compartido con DateFilter para que no se separen. */
export const fechaTriggerClasses = (variant: 'field' | 'toolbar') => cn(
  'flex h-8 items-center gap-2 rounded-md border border-line bg-white px-3 text-[13px] whitespace-nowrap text-ink shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors data-[state=open]:border-dash-blue disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  variant === 'field'
    ? 'hover:border-line-strong focus:outline-none focus-visible:border-dash-blue'
    : 'font-medium hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
)

/** El popover del calendario: el de Radix, a 12px del borde de la pantalla. */
export const POPOVER_FECHA = 'w-auto max-w-[calc(100vw-24px)] p-3'

/* Un mes, con su navegación: lo usan DatePicker (un día) y DateFilter (un día o un rango). */
export function MonthCalendar({
  month, onMonthChange, from, to, onPick, onHover, marked = [], max, yearNav,
}: {
  month: Date
  onMonthChange: (m: Date) => void
  /** Lo elegido: un día (from = to) o un rango, los dos extremos incluidos. */
  from?: Date | null
  to?: Date | null
  onPick: (d: Date) => void
  /** El día bajo el mouse o el foco: DateFilter muestra el rango antes del segundo clic. */
  onHover?: (d: Date | null) => void
  /** Días con contenido: se marcan con un punto. */
  marked?: Date[]
  /** Último día que se puede elegir: los de después, deshabilitados, y sin flecha a los meses que vienen. */
  max?: Date
  /** Saltos de año (‹‹ ››): sin ellos una fecha de nacimiento queda a cientos de clics. */
  yearNav?: boolean
}) {
  const tope = max && dia(max)
  const mover = (n: number) => onMonthChange(new Date(month.getFullYear(), month.getMonth() + n, 1))
  const celdas = Array.from({ length: 42 }, (_, i) => new Date(month.getFullYear(), month.getMonth(), 1 + i - month.getDay()))
  const hayDespues = (n: number) => !tope || new Date(month.getFullYear(), month.getMonth() + n, 1) <= tope

  return (
    <div className="flex flex-col">
      <div className="relative flex h-7 items-center justify-center">
        <div className="absolute left-0 flex gap-1">
          {yearNav && <NavBtn onClick={() => mover(-12)} label="Previous year"><ChevronsLeft className="size-4" /></NavBtn>}
          <NavBtn onClick={() => mover(-1)} label="Previous month"><ChevronLeft className="size-4" /></NavBtn>
        </div>
        <span className="text-sm font-medium" aria-live="polite">{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
        <div className="absolute right-0 flex gap-1">
          <NavBtn onClick={() => mover(1)} label="Next month" hidden={!hayDespues(1)}><ChevronRight className="size-4" /></NavBtn>
          {yearNav && <NavBtn onClick={() => mover(12)} label="Next year" hidden={!hayDespues(12)}><ChevronsRight className="size-4" /></NavBtn>}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[repeat(7,36px)]" onMouseLeave={() => onHover?.(null)}>
        {DAYS.map((d) => (
          <span key={d} className="flex size-9 items-center justify-center text-[0.8rem] text-muted-foreground">{d}</span>
        ))}
        {celdas.map((d) => {
          const despues = !!tope && d > tope
          const extremo = !!from && !!to && (sameDay(d, from) || sameDay(d, to))
          const medio = !!from && !!to && !extremo && d > dia(from) && d < dia(to)
          const fuera = d.getMonth() !== month.getMonth()
          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={despues}
              aria-pressed={extremo || medio}
              aria-label={d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              onClick={() => onPick(d)}
              onMouseEnter={() => onHover?.(d)}
              onFocus={() => onHover?.(d)}
              className={cn(
                'relative flex size-9 items-center justify-center rounded-md text-sm tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-dash-blue disabled:cursor-not-allowed disabled:opacity-35',
                extremo ? 'bg-primary text-primary-foreground' : medio ? 'rounded-none bg-accent text-accent-foreground' : 'hover:bg-accent',
                !extremo && sameDay(d, new Date()) && 'font-semibold text-dash-blue',
                !extremo && !medio && fuera && 'text-muted-foreground opacity-50',
              )}
            >
              {d.getDate()}
              {!extremo && !despues && marked.some((m) => sameDay(m, d)) && <span aria-hidden className="absolute bottom-1 size-1 rounded-full bg-primary" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DatePicker({
  value,
  onChange,
  /** Días con contenido: se marcan con un punto. */
  marked = [],
  placeholder = 'Pick a date',
  className,
  error,
  variant = 'field',
}: {
  value: Date | null
  onChange: (d: Date) => void
  marked?: Date[]
  placeholder?: string
  /** Para usarlo como campo de formulario: h-9, ancho completo. */
  className?: string
  error?: boolean
  /** field: formulario, dd-mm-aaaa · toolbar: barra de una pantalla, "Feb 28, 2026". */
  variant?: 'field' | 'toolbar'
}) {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(() => primeroDelMes(value ?? new Date()))
  /* Al abrir, el mes del día elegido (pudo cambiar desde afuera, como con Today en el Dashboard). */
  const abrir = (v: boolean) => {
    if (v) setMonth(primeroDelMes(value ?? new Date()))
    setOpen(v)
  }

  return (
    <Popover open={open} onOpenChange={abrir}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-invalid={error || undefined}
          className={cn(
            fechaTriggerClasses(variant),
            !value && 'text-ink-faint',
            error && 'border-field-error focus-visible:border-field-error data-[state=open]:border-field-error',
            className,
          )}
        >
          <Calendar aria-hidden />
          {value ? (variant === 'toolbar' ? formatLargo(value) : formatDMY(value)) : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" collisionPadding={12} aria-label="Select date" className={POPOVER_FECHA}>
        <MonthCalendar
          month={month}
          onMonthChange={setMonth}
          from={value}
          to={value}
          marked={marked}
          yearNav
          onPick={(d) => {
            onChange(d)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

/* Botón de navegación del Calendar de shadcn: fantasma con borde, medio
   apagado hasta el hover. Escondido (sin mover a los demás) cuando no hay
   adonde ir. */
export function NavBtn({
  onClick, label, children, hidden,
}: {
  onClick: () => void
  label: string
  children: ReactNode
  hidden?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        'border-input hover:bg-accent hover:text-accent-foreground inline-flex size-7 items-center justify-center rounded-md border bg-transparent p-0 opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-dash-blue',
        hidden && 'invisible',
      )}
    >
      {children}
    </button>
  )
}
