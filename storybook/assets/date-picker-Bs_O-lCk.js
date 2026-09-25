import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Trigger: mismo tratamiento que el resto de los inputs de la app
   (h-8, radio 6, borde #e4e4e7, sombra sutil, 13px). El Figma lo trae con
   borde azul permanente, pero acá el azul se reserva para el estado activo,
   como en el search y el selector de locación.
   El popover es el \`Calendar\` de shadcn: celdas de 36, tipografía normal,
   navegación en botones fantasma al 50% de opacidad, el día de hoy con
   \`bg-accent\` y el elegido con \`bg-primary\`. Todo con los tokens de la app
   (\`--accent\`, \`--primary\`, \`--muted-foreground\`, \`--popover\`). */

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const formatDMY = (d: Date) =>
  \`\${String(d.getDate()).padStart(2, '0')}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${d.getFullYear()}\`

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export function DatePicker({
  value,
  onChange,
  /** Días con contenido: se marcan con un punto. */
  marked = [],
  placeholder = 'Pick a date',
  className,
  error,
}: {
  value: Date | null
  onChange: (d: Date) => void
  marked?: Date[]
  placeholder?: string
  /** Para usarlo como campo de formulario: h-9, ancho completo. */
  className?: string
  error?: boolean
}) {
  const [open, setOpen] = useState(false)
  const base = value ?? new Date()
  const [month, setMonth] = useState(() => new Date(base.getFullYear(), base.getMonth(), 1))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  /* Grilla de 6 semanas arrancando en domingo, con relleno del mes vecino. */
  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const start = new Date(first)
    start.setDate(first.getDate() - first.getDay())
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [month])

  const shift = (n: number) =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-invalid={error || undefined}
        className={cn(
          'flex h-8 items-center gap-2 rounded-md border bg-white px-3 text-[13px]',
          'shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors',
          value ? 'text-[#0f172a]' : 'text-ink-faint',
          error
            ? 'border-field-error'
            : open ? 'border-dash-blue' : 'border-line hover:border-line-strong',
          className,
        )}
      >
        <Calendar className="size-4 shrink-0" />
        {value ? formatDMY(value) : placeholder}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Select date"
          /* Alineado al borde izquierdo del disparador. Con \`right-0\` se abría
             hacia la izquierda, y desde que el filtro de fecha vive arriba a la
             izquierda del dashboard eso lo dejaba en x=-136, fuera de pantalla. */
          className="motion-safe:animate-[loc-in_140ms_ease-out] bg-popover text-popover-foreground absolute top-[calc(100%+6px)] left-0 z-40 w-max max-w-[calc(100vw-24px)] rounded-md border p-3 shadow-md"
        >
          {/* Cabecera del Calendar de shadcn: mes centrado y navegación en los
              extremos. Los saltos de año son agregado propio — sin ellos una
              fecha de nacimiento queda a cientos de clics. */}
          <div className="relative flex h-7 items-center justify-center">
            <div className="absolute left-0 flex gap-1">
              <NavBtn onClick={() => shift(-12)} label="Previous year"><ChevronsLeft className="size-4" /></NavBtn>
              <NavBtn onClick={() => shift(-1)} label="Previous month"><ChevronLeft className="size-4" /></NavBtn>
            </div>
            <span className="text-sm font-medium">
              {MONTHS[month.getMonth()]} {month.getFullYear()}
            </span>
            <div className="absolute right-0 flex gap-1">
              <NavBtn onClick={() => shift(1)} label="Next month"><ChevronRight className="size-4" /></NavBtn>
              <NavBtn onClick={() => shift(12)} label="Next year"><ChevronsRight className="size-4" /></NavBtn>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[repeat(7,36px)]">
            {DAYS.map((d) => (
              <span
                key={d}
                className="text-muted-foreground flex size-9 items-center justify-center text-[0.8rem] font-normal"
              >
                {d}
              </span>
            ))}
            {cells.map((d, i) => {
              const outside = d.getMonth() !== month.getMonth()
              const selected = !!value && sameDay(d, value)
              const esHoy = sameDay(d, new Date())
              const hasItems = marked.some((m) => sameDay(m, d))
              return (
                <button
                  key={i}
                  type="button"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(d)
                    setOpen(false)
                  }}
                  className={cn(
                    'relative flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    selected && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                    !selected && esHoy && 'bg-accent text-accent-foreground',
                    !selected && outside && 'text-muted-foreground opacity-50',
                  )}
                >
                  {d.getDate()}
                  {hasItems && !selected && (
                    <span className="bg-primary absolute bottom-1 size-1 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}


/* Botón de navegación del Calendar de shadcn: fantasma con borde, medio
   apagado hasta el hover. */
function NavBtn({
  onClick, label, children,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="border-input hover:bg-accent hover:text-accent-foreground inline-flex size-7 items-center justify-center rounded-md border bg-transparent p-0 opacity-50 transition-opacity hover:opacity-100"
    >
      {children}
    </button>
  )
}
`})))()}export{n,i as r,r as t};