import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Calendar, Check, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DatePicker, formatDMY } from '@/components/ui/date-picker'

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
const control = (error?: string) =>
  cn(
    'w-full rounded-md border bg-white text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none',
    'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-faint disabled:shadow-none',
    error ? 'border-field-error focus:border-field-error' : 'focus:border-dash-blue border-line',
  )

const pie = (error?: string, hint?: React.ReactNode) => (error ? <FieldError>{error}</FieldError> : <FieldHint>{hint}</FieldHint>)

export function TextField({
  label, placeholder, required, className, value, onChange, error, hint, disabled,
}: {
  label: string
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
      <FieldLabel required={required}>{label}</FieldLabel>
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

export function SelectField({
  label, placeholder = 'Select', required, className, options,
  value: valueProp, onChange, error, hint, disabled,
}: {
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  options?: string[]
  value?: string
  onChange?: (v: string) => void
  error?: string
  hint?: React.ReactNode
  disabled?: boolean
}) {
  const items = options ?? OPCIONES[label] ?? OPCIONES_GENERICAS
  const [interno, setInterno] = useState<string | null>(null)
  const controlado = onChange !== undefined
  /* '' cuenta como vacío: si no, el botón se queda sin placeholder. */
  const value = controlado ? (valueProp || null) : interno
  const setValue = (v: string) => (controlado ? onChange!(v) : setInterno(v))
  const [open, setOpen] = useState(false)
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

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-invalid={!!error || undefined}
          disabled={disabled}
          className={cn(
            control(error),
            'flex h-9 items-center justify-between px-3 transition-colors',
            open && !error && 'border-dash-blue',
            value ? 'text-ink' : 'text-ink-faint',
          )}
        >
          {value ?? placeholder}
          <ChevronDown className={cn('size-4 shrink-0 text-black transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-56 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
            {items.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => { setValue(o); setOpen(false) }}
                className={cn(
                  'flex w-full items-center justify-between px-3 py-2 text-left text-[13px] hover:bg-surface-muted',
                  value === o && 'text-dash-blue font-medium',
                )}
              >
                {o}
                {value === o && <Check className="size-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>
      {pie(error, hint)}
    </div>
  )
}

export function DateField({
  label, required, className, onChange, error, placeholder = 'Pick a date',
}: {
  label: string
  required?: boolean
  className?: string
  onChange?: (texto: string) => void
  error?: string
  placeholder?: string
}) {
  const [value, setValueRaw] = useState<Date | null>(null)
  const setValue = (d: Date | null) => {
    setValueRaw(d)
    if (d && onChange) onChange(d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
  }
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      {value ? (
        <DatePicker value={value} onChange={setValue} />
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

/* Input con lupa y sugerencias, el patrón de los modales clínicos del Figma
   (3648:59976 y hermanos): el campo principal siempre es una búsqueda. */
export function SearchField({
  label, required, className, options = [], value = '', onChange, error,
  placeholder = 'Search...', hint, disabled,
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
          className={cn(control(error), 'h-9 pr-3 pl-9')}
        />
        {abierto && sugerencias.length > 0 && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-52 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
            {sugerencias.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => { onChange?.(o); setAbierto(false) }}
                className="block w-full px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
      {pie(error, hint)}
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
    <div className={cn('flex flex-col gap-2', className)}>
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
    </div>
  )
}

export function SectionCard({
  title, className, children,
}: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn('rounded-lg border border-line bg-white p-4 sm:p-5', className)}>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

export function ModalShell({
  title, onClose, children, footer, aside, width = 'max-w-[860px]',
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  /** Panel que acompaña al modal por fuera de la card, a su derecha. */
  aside?: React.ReactNode
  width?: string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-3 sm:p-6" onClick={onClose}>
      {/* items-stretch: el panel lateral toma la altura del modal, como en el
          Figma, donde los dos frames miden 813 y arrancan en la misma y. */}
      <div className={cn('my-auto flex w-full items-stretch justify-center', aside && 'lg:w-auto')}>
      <div
        role="dialog"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'motion-safe:animate-[loc-in_160ms_ease-out] w-full rounded-xl bg-white p-5 shadow-2xl sm:p-9',
          /* Con panel al lado, los dos bordes que se tocan van rectos para que
             modal y columna lean como una sola pieza. */
          aside && 'lg:rounded-r-none',
          width,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg leading-none font-bold text-ink sm:text-[22px]">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
        {/* En angosto el panel lateral no entra al costado: entra al pie del
            propio modal, para no perder la función. */}
        {aside && <div className="mt-6 lg:hidden">{aside}</div>}
        {footer && <div className="mt-8 flex justify-end gap-3">{footer}</div>}
      </div>
      {aside && (
        /* Pegado al modal, sin separación ni solape: en 4430:61940 el
           formulario (757) y el panel (190) son hermanos de un frame de 947. */
        <div className="hidden shrink-0 lg:block" onClick={(e) => e.stopPropagation()}>
          {aside}
        </div>
      )}
      </div>
    </div>
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
    <div className="flex shrink-0 flex-nowrap items-center justify-end gap-3">
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
