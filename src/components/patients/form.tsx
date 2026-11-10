import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Drawer, DrawerSection, useEnDrawer, type DrawerSize } from '@/components/ui/drawer'
import { ChevronDown, Calendar, Check, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DatePicker, formatDMY } from '@/components/ui/date-picker'
import { Avatar, inicialesDe } from '@/components/ui/avatar'
import { CountryFlag } from '@/components/ui/country-flag'
import { OPCIONES_CODIGO, paisDe } from '@/data/paises'

/* Primitivos de los formularios de Patients (Figma 3640:73356 y hermanos).
   Campo = label 12px + control de 36px, alto total 56 con gap.
   Escala unificada con el resto de la app: label 12, control 13. */

export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="block text-xs font-medium text-ink">
      {children}
      {required && <span className="text-required">*</span>}
    </span>
  )
}

/* El mensaje de validación vive pegado al campo. Los toasts quedan
   reservados para el resultado de la acción (guardar, borrar, descargar). */
export function FieldError({ children }: { children?: string }) {
  if (!children) return null
  return <span className="-mt-1 block text-[11px] leading-[1.35] text-field-error">{children}</span>
}

/* Texto de ayuda debajo del campo. Si hay error, se muestra el error en su
   lugar. */
export function FieldHint({ children }: { children?: React.ReactNode }) {
  if (!children) return null
  return <span className="-mt-1 block text-[11.5px] leading-[1.4] text-ink-muted">{children}</span>
}

/* Aspecto común de los controles: borde gris, foco azul, error rojo y
   deshabilitado gris. Lo usan todos los campos de este archivo. */
export const control = (error?: string) =>
  cn(
    'w-full rounded-md border bg-white text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none',
    'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-faint disabled:shadow-none',
    error ? 'border-field-error focus:border-field-error' : 'focus:border-dash-blue border-line',
  )

const pie = (error?: string, hint?: React.ReactNode) => (error ? <FieldError>{error}</FieldError> : <FieldHint>{hint}</FieldHint>)

export function TextField({
  label, placeholder, required, className, value, onChange, error, hint, disabled, hideLabel,
}: {
  label: string
  /** Rótulo sólo para lectores de pantalla: el campo va en una celda de tabla con su encabezado arriba. */
  hideLabel?: boolean
  placeholder?: string
  required?: boolean
  className?: string
  value?: string
  onChange?: (v: string) => void
  /** Mensaje de validación. Pinta el borde en rojo y se muestra debajo. */
  error?: string
  /** Texto de ayuda debajo del campo. */
  hint?: React.ReactNode
  disabled?: boolean
}) {
  return (
    <label className={cn('flex flex-col gap-2', className)}>
      {hideLabel ? <span className="sr-only">{label}</span> : <FieldLabel required={required}>{label}</FieldLabel>}
      <input
        aria-invalid={!!error || undefined}
        placeholder={placeholder}
        disabled={disabled}
        {...(onChange ? { value: value ?? '', onChange: (e) => onChange(e.target.value) } : value !== undefined ? { defaultValue: value } : {})}
        className={cn(control(error), 'h-9 px-3')}
      />
      {pie(error, hint)}
    </label>
  )
}

/* Opciones ficticias por campo, para que los selects funcionen de verdad.
   Si un label no está acá, cae en OPCIONES_GENERICAS. */
const OPCIONES: Record<string, string[]> = {
  Gender: ['Female', 'Male', 'Other', 'Prefer not to say'],
  Race: ['White', 'Black or African American', 'Asian', 'Native American', 'Other'],
  Ethnicity: ['Hispanic or Latino', 'Not Hispanic or Latino'],
  Profession: ['Teacher', 'Engineer', 'Nurse', 'Retired', 'Student'],
  Nationality: ['Argentina', 'United States', 'Spain', 'Brazil', 'Mexico'],
  Language: ['English', 'Spanish', 'Portuguese', 'French'],
  Religion: ['Catholic', 'Protestant', 'Jewish', 'Muslim', 'None'],
  Country: ['United States', 'Argentina', 'Spain', 'Mexico'],
  State: ['California', 'New York', 'Texas', 'Florida'],
  Relationship: ['Parent', 'Legal guardian', 'Sibling', 'Spouse'],
  Guardian: ['Mara Otero', 'Elias Aguirre', 'Nadia Duarte'],
  Requestor: ['Front desk', 'Provider', 'Patient', 'Referral'],
  'Reason for Visit': ['Consultation', 'Routine cleaning', 'Emergency', 'Follow-up'],
  Operatory: ['Operatory 1', 'Operatory 2', 'Operatory 3'],
  Status: ['Proposed', 'Check-in', 'Booked', 'In progress', 'Fulfilled'],
  'Start Time': ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
  'End Time': ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'],
}
const OPCIONES_GENERICAS = ['Option A', 'Option B', 'Option C']

/* Abre un desplegable hacia arriba si abajo no entra y arriba hay más lugar, así no hay que scrollear el drawer para ver
   las opciones (Julián, 2026-11-04). Mide contra el contenedor con scroll más cercano (el cuerpo del drawer) o la ventana. */
function useHaciaArriba(ref: React.RefObject<HTMLElement | null>, abierto: boolean, alto: number) {
  const [arriba, setArriba] = useState(false)
  useLayoutEffect(() => {
    if (!abierto || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    let techo = 0
    let piso = window.innerHeight
    for (let el = ref.current.parentElement; el; el = el.parentElement) {
      if (!/(auto|scroll)/.test(getComputedStyle(el).overflowY)) continue
      const c = el.getBoundingClientRect()
      techo = Math.max(techo, c.top)
      piso = Math.min(piso, c.bottom)
      break
    }
    const abajo = piso - r.bottom
    setArriba(abajo < alto && r.top - techo > abajo)
  }, [abierto, alto, ref])
  return arriba
}
const MENU_ABAJO = 'top-[calc(100%+4px)]'
const MENU_ARRIBA = 'bottom-[calc(100%+4px)]'

export function SelectField({
  label, placeholder = 'Select', required, className, options,
  value: valueProp, onChange, error, hint, disabled, hideLabel, icono, buscable, buscarPlaceholder = 'Search',
}: {
  label: string
  /** Rótulo sólo para lectores de pantalla (el botón lo lleva como aria-label): para una celda de tabla. */
  hideLabel?: boolean
  placeholder?: string
  required?: boolean
  className?: string
  options?: string[]
  value?: string
  onChange?: (v: string) => void
  error?: string
  hint?: React.ReactNode
  disabled?: boolean
  /** Algo a la izquierda de cada opción y de la elegida (la bandera de CountryCodeField). */
  icono?: (opcion: string) => React.ReactNode
  /** Lista larga (los 245 países): un buscador arriba de las opciones, con el foco puesto. */
  buscable?: boolean
  buscarPlaceholder?: string
}) {
  const todas = options ?? OPCIONES[label] ?? OPCIONES_GENERICAS
  const [busqueda, setBusqueda] = useState('')
  const q = busqueda.trim().toLowerCase()
  const items = buscable && q ? todas.filter((o) => o.toLowerCase().includes(q)) : todas
  const [interno, setInterno] = useState<string | null>(null)
  const controlado = onChange !== undefined
  /* '' cuenta como vacío: si no, el botón se queda sin placeholder. */
  const value = controlado ? (valueProp || null) : interno
  const setValue = (v: string) => (controlado ? onChange!(v) : setInterno(v))
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const arriba = useHaciaArriba(ref, open, Math.min(todas.length * 36 + 8, 224) + (buscable ? 44 : 0) + 4)
  const lista = useRef<HTMLDivElement>(null)

  /* Al abrir, la lista arranca en la opción elegida (en 245 países, la de Estados Unidos queda lejos) y sin búsqueda. */
  useLayoutEffect(() => {
    if (!open) { setBusqueda(''); return }
    const elegida = lista.current?.querySelector<HTMLElement>('[data-elegida]')
    if (elegida && lista.current) lista.current.scrollTop = elegida.offsetTop - lista.current.clientHeight / 2
  }, [open])

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

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {!hideLabel && <FieldLabel required={required}>{label}</FieldLabel>}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={hideLabel ? label : undefined}
          aria-invalid={!!error || undefined}
          disabled={disabled}
          className={cn(
            control(error),
            'flex h-9 items-center justify-between gap-2 px-3 transition-colors',
            open && !error && 'border-dash-blue',
            value ? 'text-ink' : 'text-ink-faint',
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            {value && icono?.(value)}
            <span className="min-w-0 truncate text-left">{value ?? placeholder}</span>
          </span>
          <ChevronDown className={cn('size-4 shrink-0 text-black transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div className={cn('motion-safe:animate-[loc-in_120ms_ease-out] absolute left-0 z-30 flex w-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-lg', arriba ? MENU_ARRIBA : MENU_ABAJO)}>
            {buscable && (
              <div className="border-b border-line p-1.5">
                <div className="relative">
                  <Search aria-hidden className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint" />
                  <input
                    autoFocus
                    aria-label={`Search ${label}`}
                    placeholder={buscarPlaceholder}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && items[0]) { e.preventDefault(); setValue(items[0]); setOpen(false) } }}
                    className="h-8 w-full rounded-md border border-line bg-white pr-2 pl-8 text-[13px] placeholder:text-ink-faint focus:border-dash-blue focus:outline-none"
                  />
                </div>
              </div>
            )}
            <div ref={lista} className="relative max-h-56 overflow-y-auto py-1">
            {!items.length && <p className="px-3 py-4 text-center text-xs text-ink-muted">No matches.</p>}
            {items.map((o) => (
              <button
                key={o}
                type="button"
                data-elegida={value === o || undefined}
                onClick={() => { setValue(o); setOpen(false) }}
                className={cn(
                  'flex w-full items-center justify-between px-3 py-2 text-left text-[13px] hover:bg-surface-muted',
                  value === o && 'text-dash-blue font-medium',
                )}
              >
                <span className="flex min-w-0 items-center gap-2">{icono?.(o)}{o}</span>
                {value === o && <Check className="size-3.5 shrink-0" />}
              </button>
            ))}
            </div>
          </div>
        )}
      </div>
      {pie(error, hint)}
    </div>
  )
}

/* El código de país de un teléfono: los 245 países, con su bandera y un buscador por nombre o código (Julián,
   2026-11-04; patients.md). Un valor viejo ("+1", "(+1) United States of America (the)") se muestra como su país. */
export function CountryCodeField({ label = 'Country Code', value, ...props }: Omit<React.ComponentProps<typeof SelectField>, 'icono' | 'label' | 'options' | 'buscable'> & { label?: string }) {
  return (
    <SelectField
      {...props} label={label} options={OPCIONES_CODIGO} buscable buscarPlaceholder="Search country or code"
      value={value && (paisDe(value)?.opcion ?? value)} icono={(o) => <CountryFlag opcion={o} />}
    />
  )
}

export function DateField({
  label, required, className, onChange, error, placeholder = 'Pick a date', valorInicial,
}: {
  label: string
  required?: boolean
  className?: string
  onChange?: (texto: string) => void
  error?: string
  placeholder?: string
  /** Una fecha ya cargada, como la devuelve onChange ("April 2, 2025"): Edit Patient abre con el nacimiento puesto. */
  valorInicial?: string
}) {
  const [value, setValueRaw] = useState<Date | null>(() => {
    const f = valorInicial ? new Date(valorInicial) : null
    return f && !Number.isNaN(f.getTime()) ? f : null
  })
  const setValue = (d: Date | null) => {
    setValueRaw(d)
    if (d && onChange) onChange(d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
  }
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      {value ? (
        <DatePicker value={value} onChange={setValue} className="h-9 w-full" />
      ) : (
        <div className="relative">
          <button
            type="button"
            /* Sólo se usa para Birthdate: el calendario abre en un año de
               nacimiento plausible y no en el mes actual, que dejaría a todo
               paciente nuevo como recién nacido. Los saltos de año del picker
               llevan al año que haga falta. */
            onClick={() => setValue(new Date(1990, 0, 1))}
            aria-invalid={!!error || undefined}
            className={cn(
              'flex h-9 w-full items-center gap-2 rounded-md border bg-white px-3 text-[13px] text-ink-faint',
              'shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none',
              error ? 'border-field-error' : 'focus:border-dash-blue border-line',
            )}
          >
            <Calendar className="size-4 shrink-0" />
            {placeholder}
          </button>
        </div>
      )}
      <FieldError>{error}</FieldError>
      <span className="sr-only">{value ? formatDMY(value) : 'sin fecha'}</span>
    </div>
  )
}

/* Este bloque aparece 3 veces en el mismo formulario del Figma, en posiciones
   que no se relacionan entre sí. Se replica tal cual. */
export function OptionCheckbox({
  label,
  checked,
  defaultChecked = true,
  onChange,
  disabled,
}: {
  label: React.ReactNode
  /** Sólo para controlarlo desde afuera; sin esto se maneja solo. */
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (v: boolean) => void
  disabled?: boolean
}) {
  /* Antes recibía `checked` con default true y sin `onChange` quedaba
     congelado: se veía tildado y no había forma de destildarlo. Ahora, si
     nadie lo controla, lleva su propio estado. */
  const [interno, setInterno] = useState(defaultChecked)
  const controlado = checked !== undefined
  const on = controlado ? checked : interno

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      disabled={disabled}
      onClick={() => {
        if (!controlado) setInterno(!on)
        onChange?.(!on)
      }}
      className={cn(
        'flex w-full items-start gap-2.5 rounded-lg border bg-white p-3 text-left transition-colors',
        'focus-visible:border-dash-blue focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        on ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
      )}
    >
      <span
        className={cn(
          'mt-px flex size-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors',
          on ? 'bg-dash-blue border-dash-blue' : 'border-ink-faint bg-white',
        )}
      >
        {on && <Check className="size-3 text-white" strokeWidth={3} />}
      </span>
      <span className="text-xs leading-[1.45] text-ink">{label}</span>
    </button>
  )
}

/* El texto largo se repite en New Patient, Add/Edit Relationship y en el drawer
   de planes de tratamiento: en los tres el Figma lo escribe así, aunque en
   varias posiciones no venga a cuento (anomalía 43). */
export function LinkPersonCheckbox(props: Omit<React.ComponentProps<typeof OptionCheckbox>, 'label'>) {
  return (
    <OptionCheckbox
      {...props}
      label="Use this option only to link a person that already exists in the system (e.g employee, subscriber, contact, etc)"
    />
  )
}

/* Un grupo de campos que se pliega: cerrado muestra el título y un resumen de lo cargado, así un formulario largo (el
   contacto y la dirección del guardián) no estira el paso. Con algo por corregir se abre solo y queda en rojo.
   patients.md, 2026-11-04. */
export function CollapsibleFields({
  title, required, summary, error, defaultOpen = false, children,
}: {
  title: string
  required?: boolean
  /** Lo cargado en una línea ("+1 (324) 359-6750"), o qué falta cargar. */
  summary: string
  /** Hay un campo adentro con error: abre el grupo y lo pinta de rojo. */
  error?: boolean
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [abierto, setAbierto] = useState(defaultOpen || !!error)
  /* Se abre en el mismo render en que aparece el error, así el foco llega al campo (useFormPaciente.enfocar). */
  const [errorPrevio, setErrorPrevio] = useState(error)
  if (error !== errorPrevio) {
    setErrorPrevio(error)
    if (error) setAbierto(true)
  }
  const id = useId()
  return (
    <div className={cn('rounded-lg border bg-white', error ? 'border-field-error' : 'border-line')}>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((v) => !v)}
        className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dash-blue"
      >
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-[13px] font-semibold text-ink">
            {title}
            {required && <span className="text-required">*</span>}
          </span>
          <span className={cn('mt-0.5 block truncate text-xs', error ? 'text-field-error' : 'text-ink-muted')}>{summary}</span>
        </span>
        <ChevronDown aria-hidden className={cn('size-4 shrink-0 text-ink transition-transform', abierto && 'rotate-180')} />
      </button>
      {abierto && <div id={id} className="border-t border-line p-3 pt-4">{children}</div>}
    </div>
  )
}

/* Input con lupa y sugerencias, el patrón de los modales clínicos del Figma
   (3648:59976 y hermanos): el campo principal siempre es una búsqueda. */
export function SearchField({
  label, required, className, options = [], value = '', onChange, error,
  placeholder = 'Search...', hint, disabled, subtext, emptyText, clearable,
}: {
  label: string
  required?: boolean
  className?: string
  options?: string[]
  value?: string
  onChange?: (v: string) => void
  error?: string
  placeholder?: string
  hint?: React.ReactNode
  disabled?: boolean
  /** Segunda línea por sugerencia, para desambiguar (New Appointment: fecha de nacimiento y email del paciente, email
      del provider). Sin esto, cada sugerencia es sólo el nombre, como siempre (Julián, 2026-10-19). */
  subtext?: (opcion: string) => React.ReactNode
  /** Qué decir cuando lo escrito no coincide con nada ("Carrier not found."); sin esto, no se abre nada. */
  emptyText?: string
  /** ✕ a la derecha para vaciar el campo y volver a buscar (Insurance → Search for an existing subscription). */
  clearable?: boolean
}) {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const sugerencias = value.trim()
    ? options.filter((o) => o.toLowerCase().includes(value.trim().toLowerCase()) && o !== value)
    : options

  useEffect(() => {
    if (!abierto) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [abierto])

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div ref={ref} className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={value}
          placeholder={placeholder}
          aria-invalid={!!error || undefined}
          disabled={disabled}
          onChange={(e) => { onChange?.(e.target.value); setAbierto(true) }}
          onFocus={() => setAbierto(true)}
          className={cn(control(error), 'h-9 pl-9', clearable && value ? 'pr-9' : 'pr-3')}
        />
        {clearable && value && !disabled && (
          <button
            type="button"
            aria-label={`Clear ${label}`}
            onClick={() => { onChange?.(''); setAbierto(false) }}
            className="absolute top-1/2 right-1.5 flex size-7 -translate-y-1/2 items-center justify-center rounded text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-dash-blue"
          >
            <X className="size-4" />
          </button>
        )}
        {abierto && emptyText && value.trim() && sugerencias.length === 0 && !options.includes(value) && (
          <div role="status" className="absolute top-[calc(100%+4px)] left-0 z-30 w-full rounded-md border border-line bg-white px-3 py-8 text-center text-[13px] text-ink shadow-lg">
            {emptyText}
          </div>
        )}
        {abierto && sugerencias.length > 0 && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-60 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
            {sugerencias.map((o) => {
              const sub = subtext?.(o)
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => { onChange?.(o); setAbierto(false) }}
                  className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left hover:bg-surface-muted"
                >
                  <span className="text-[13px]">{o}</span>
                  {sub && <span className="text-[11px] text-ink-muted">{sub}</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>
      {pie(error, hint)}
    </div>
  )
}

/* Con `columnas`, cada persona es una fila de tabla en una sola línea: nombre y los datos en columnas alineadas entre
   las filas, con un encabezado arriba de la lista. La grilla se decide por el ancho (container query): sin lugar, los
   datos bajan debajo del nombre con su rótulo. insurance.md, 2026-11-10. */
export type ColumnaPersona = { label: string; value: string }
const GRILLA_COLUMNAS = '@sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,1.3fr)_minmax(0,1fr)]'

/* Los títulos de las columnas, alineados con las filas (mismo padding y el lugar del avatar). */
function EncabezadoColumnas({ nombre, columnas }: { nombre: string; columnas: ColumnaPersona[] }) {
  return (
    <div aria-hidden className="@container px-2 pt-1">
      <div className="hidden items-center gap-3 @sm:flex">
        <span className="w-7 shrink-0" />
        <span className={cn('grid min-w-0 flex-1 gap-x-3 text-[11px] font-medium text-ink-faint', GRILLA_COLUMNAS)}>
          <span>{nombre}</span>
          {columnas.map((c) => <span key={c.label}>{c.label}</span>)}
        </span>
      </div>
    </div>
  )
}

/* `alineada`: columnas fijas, para alinear con el encabezado de la lista. Sin eso (la card elegida), cada dato ocupa lo
   que necesita, uno detrás del otro. */
function PersonaFila({ nombre, lineas, columnas, alineada = true }: { nombre: string; lineas?: string[]; columnas?: ColumnaPersona[]; alineada?: boolean }) {
  if (!columnas?.length) {
    return (
      <>
        <Avatar aria-hidden initials={inicialesDe(nombre)} size={36} />
        <PersonaLineas nombre={nombre} lineas={lineas} />
      </>
    )
  }
  return (
    <span className="@container flex min-w-0 flex-1 items-start gap-3 @sm:items-center">
      <Avatar aria-hidden initials={inicialesDe(nombre)} size={28} />
      <span className={cn('min-w-0 flex-1 gap-y-0.5 leading-tight', alineada ? cn('grid gap-x-3 @sm:items-center', GRILLA_COLUMNAS) : 'flex flex-col gap-x-4 @sm:flex-row @sm:items-center')}>
        <span title={nombre} className={cn('truncate text-[13px] font-semibold text-ink', !alineada && '@sm:max-w-[40%] @sm:shrink-0')}>{nombre}</span>
        {/* En la card elegida, la primera columna (el ID en Insurance) no se achica: es lo que identifica a la fila. */}
        {columnas.map((c, i) => (
          <span key={c.label} title={`${c.label}: ${c.value}`} className={cn('min-w-0 truncate text-xs text-ink @sm:text-[13px]', !alineada && i === 0 && '@sm:shrink-0')}>
            <span className="text-ink-faint @sm:hidden">{c.label}: </span>{c.value}
          </span>
        ))}
      </span>
    </span>
  )
}

/* Nombre + hasta dos líneas de abajo ("DOB: …", "Email: …"): la etiqueta antes de los ":" sale apagada, el valor no.
   Una línea sin ":" se muestra entera, sin partir. */
function PersonaLineas({ nombre, lineas, className }: { nombre: string; lineas?: string[]; className?: string }) {
  return (
    <span className={cn('min-w-0 flex-1 leading-tight', className)}>
      <span className="block text-[13px] font-semibold text-ink">{nombre}</span>
      {lineas?.map((linea, i) => {
        const corte = linea.indexOf(':')
        return (
          <span key={i} className="block text-[11px] text-ink-muted">
            {corte > -1
              ? <><span className="text-ink-faint">{linea.slice(0, corte + 1)}</span>{linea.slice(corte + 1)}</>
              : linea}
          </span>
        )
      })}
    </span>
  )
}

/* Buscador de una persona (paciente, provider, contacto…): igual que SearchField, pero cada sugerencia y la elegida son
   cards con avatar y hasta dos líneas de datos (DOB, email…) -el diseño de Add Relationship → "Select person", para que
   buscar a alguien se vea igual en toda la app (Julián, 2026-10-20)-. Las sugerencias flotan en un desplegable pegado
   al input, sin empujar lo de abajo (Julián, 2026-10-21); la elegida queda a la vista debajo, con una ✕ para quitarla y
   volver a buscar. Sin resultados mientras no se escribe nada: no vuelca todo el directorio como SearchField.
   "Elegida" sale sólo de comparar `value` contra `personas` (no hay estado propio): basta con que lo tipeado sea
   exactamente un nombre de la lista. Ver design-reference/design-system.md. */
export function PersonSearchField({
  label, required, className, personas = [], value = '', onChange, error, placeholder = 'Search by Name', hint, disabled, lineas, emptyText,
  nombre: nombreDe = (v) => v, texto: textoDe = (v) => v, columnas, columnaNombre = 'Name',
}: {
  label: string
  required?: boolean
  className?: string
  /** Nombres buscables. */
  personas?: string[]
  value?: string
  onChange?: (v: string) => void
  error?: string
  placeholder?: string
  hint?: React.ReactNode
  disabled?: boolean
  /** Las líneas de abajo de una persona ("DOB: …", "Email: …"); sin esto, la card sólo lleva el nombre. */
  lineas?: (nombre: string) => string[] | undefined
  /** Qué decir si lo escrito no coincide con nadie; sin esto, no se abre nada. */
  emptyText?: string
  /** El nombre que muestra la card cuando `personas` trae claves únicas ("John Smith - JASD…" → "John Smith"). */
  nombre?: (valor: string) => string
  /** Dónde se busca lo escrito; por default, en el valor. Insurance busca en nombre, número, carrier y plan. */
  texto?: (valor: string) => string
  /** Datos en la misma línea que el nombre, en columnas con encabezado; sin lugar, bajan debajo con su rótulo. */
  columnas?: (valor: string) => ColumnaPersona[] | undefined
  /** Título de la columna del nombre en el encabezado ("Subscriber"). */
  columnaNombre?: string
}) {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const elegida = !!value.trim() && personas.includes(value)
  const sugerencias = !elegida && value.trim()
    ? personas.filter((p) => textoDe(p).toLowerCase().includes(value.trim().toLowerCase()))
    : []
  const arriba = useHaciaArriba(ref, abierto && sugerencias.length > 0, Math.min(sugerencias.length * 60 + 8, 288) + 4)

  useEffect(() => {
    if (!abierto) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [abierto])

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div ref={ref} className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={value}
          placeholder={placeholder}
          aria-label={label}
          aria-invalid={!!error || undefined}
          disabled={disabled}
          onChange={(e) => { onChange?.(e.target.value); setAbierto(true) }}
          onFocus={() => setAbierto(true)}
          className={cn(control(error), 'h-9 pr-3 pl-9')}
        />
        {abierto && sugerencias.length > 0 && (
          /* Con columnas, la lista se ensancha (sin pasarse de la pantalla) para que cada fila entre en una línea. */
          <div className={cn('motion-safe:animate-[loc-in_120ms_ease-out] absolute left-0 z-30 flex max-h-72 w-full flex-col gap-1 overflow-y-auto rounded-md border border-line bg-white p-1 shadow-lg', columnas && 'lg:w-[max(100%,min(680px,calc(100vw-24rem)))]', arriba ? MENU_ARRIBA : MENU_ABAJO)}>
            {columnas && sugerencias[0] && columnas(sugerencias[0]) && (
              <EncabezadoColumnas nombre={columnaNombre} columnas={columnas(sugerencias[0])!} />
            )}
            {sugerencias.map((nombre) => (
              <button
                key={nombre}
                type="button"
                onClick={() => { onChange?.(nombre); setAbierto(false) }}
                className="flex items-center gap-3 rounded-md p-2 text-left hover:bg-surface-muted"
              >
                <PersonaFila nombre={nombreDe(nombre)} lineas={lineas?.(nombre)} columnas={columnas?.(nombre)} />
              </button>
            ))}
          </div>
        )}
        {abierto && emptyText && !elegida && value.trim() && !sugerencias.length && (
          <p role="status" className="absolute top-[calc(100%+4px)] left-0 z-30 w-full rounded-md border border-line bg-white px-3 py-6 text-center text-xs text-ink-muted shadow-lg">
            {emptyText}
          </p>
        )}
      </div>
      {pie(error, hint)}
      {elegida && (
        <div className="relative">
          <div className={cn('border-dash-blue flex items-center gap-3 rounded-lg border bg-white p-3', columnas ? 'pr-10' : 'pr-11')}>
            <PersonaFila nombre={nombreDe(value)} lineas={lineas?.(value)} columnas={columnas?.(value)} alineada={false} />
          </div>
          {!disabled && (
            <button
              type="button"
              aria-label={`Remove ${label}`}
              onClick={() => { onChange?.(''); setAbierto(false) }}
              className="absolute top-1/2 right-2.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dash-blue"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* El Figma pide una fecha tipeada con placeholder "DD / MM / YY", no el
   calendario. Se formatea sola a medida que se escribe. */
export function DateTextField({
  label, required, className, value = '', onChange, error, hint, disabled,
}: {
  label: string
  required?: boolean
  className?: string
  value?: string
  onChange?: (v: string) => void
  error?: string
  hint?: React.ReactNode
  disabled?: boolean
}) {
  const formatear = (bruto: string) => {
    const d = bruto.replace(/\D/g, '').slice(0, 6)
    return [d.slice(0, 2), d.slice(2, 4), d.slice(4, 6)].filter(Boolean).join(' / ')
  }
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        inputMode="numeric"
        value={value}
        placeholder="DD / MM / YY"
        aria-invalid={!!error || undefined}
        disabled={disabled}
        onChange={(e) => onChange?.(formatear(e.target.value))}
        className={cn(control(error), 'h-9 px-3')}
      />
      {pie(error, hint)}
    </div>
  )
}

export function TextArea({
  label, required, className, placeholder, value = '', onChange, error, hint, disabled, rows = 4,
}: {
  label: string
  required?: boolean
  className?: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  error?: string
  hint?: React.ReactNode
  disabled?: boolean
  rows?: number
}) {
  return (
    /* Un <label> como TextField: el rótulo nombra al campo para el lector de pantalla y lo enfoca al tocarlo. */
    <label className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        aria-invalid={!!error || undefined}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(control(error), 'resize-none px-3 py-2')}
      />
      {pie(error, hint)}
    </label>
  )
}

export function SectionCard({
  title, className, children,
}: { title: string; className?: string; children: React.ReactNode }) {
  /* Dentro de un drawer va sin caja, con el título suelto, como en Confidentally 2.0. */
  if (useEnDrawer()) return <DrawerSection title={title} className={className}>{children}</DrawerSection>
  return (
    <section className={cn('rounded-lg bg-white p-4 shadow-panel sm:p-5', className)}>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

/* Los formularios que se abren encima de una pantalla. Desde 2026-10-06 se abren como drawer (ui/drawer), no como modal
   centrado: Julián pidió que todo pop up sea un drawer, con los pasos de Confidentally 2.0 cuando el formulario tiene
   varias partes. El ancho pedido elige el tamaño del drawer. Ver Components / UI / Drawer. */
const tamanoDe = (width: string): DrawerSize => {
  const px = Number(width.match(/\d+/)?.[0] ?? 860)
  return px <= 480 ? 'md' : px <= 640 ? 'lg' : px <= 860 ? 'xl' : '2xl'
}

export function ModalShell({
  title, description, onClose, children, footer, actions, aside, width = 'max-w-[860px]', steps, step, tabs,
}: {
  title: string
  description?: string
  onClose: () => void
  children: React.ReactNode
  /** Pie suelto (FormFooter o botones): en el drawer van lado a lado y del mismo ancho. */
  footer?: React.ReactNode
  /** Pie ya armado para el drawer (DrawerActions), con pasos o sin ellos. */
  actions?: React.ReactNode
  /** Panel de apoyo: se despliega al costado del drawer. */
  aside?: React.ReactNode
  width?: string
  steps?: readonly string[]
  step?: number
  /** Pestañas en lugar de pasos (ver Drawer). */
  tabs?: React.ReactNode
}) {
  return (
    <Drawer
      open
      onClose={onClose}
      title={title}
      description={description}
      steps={steps}
      step={step}
      tabs={tabs}
      size={tamanoDe(width)}
      footer={actions ?? footer}
      footerClassName={actions ? undefined : '[&_[data-form-footer]]:w-full [&_[data-form-footer]_button]:flex-1'}
      aside={aside}
    >
      {children}
    </Drawer>
  )
}

/* Cancel y Save van SIEMPRE en la misma fila, uno al lado del otro. El par
   trae su propio contenedor en vez de depender del flex de quien lo use: así
   no hay contenedor angosto, columna ni wrap que los separe. */
export function FormFooter({
  onCancel, onSave, cancelLabel = 'Cancel', saveLabel = 'Save',
}: {
  onCancel: () => void
  onSave?: () => void
  cancelLabel?: string
  saveLabel?: string
}) {
  return (
    <div data-form-footer className="flex shrink-0 flex-nowrap items-center justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="h-9 shrink-0 rounded-md border border-line bg-white px-6 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onSave}
        className="bg-dash-blue hover:bg-dash-blue-hover h-9 shrink-0 rounded-md px-6 text-[13px] font-medium whitespace-nowrap text-white transition-colors"
      >
        {saveLabel}
      </button>
    </div>
  )
}
