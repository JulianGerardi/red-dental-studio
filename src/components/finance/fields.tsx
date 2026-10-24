import { useId, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldError, FieldLabel, SelectField, TextField, control } from '@/components/patients/form'
import { CODIGOS } from '@/data/location-options'
import { dinero, esNorteamerica, type Telefono } from '@/data/finanzas'

/* Campos de Settings → Billing que el formulario base no tiene. Ver design-reference/figma/modulos/settings-billing.md. */

/* Número con su unidad ("days", "months", "years") y flechas para bajar o subir, como en red.dev. */
export function UnitField({
  label, unit, value, onChange, required, error, disabled, className, min = 0,
}: {
  label: string
  unit: string
  value: number
  onChange: (v: number) => void
  required?: boolean
  error?: string
  disabled?: boolean
  className?: string
  min?: number
}) {
  const id = useId()
  const cambiar = (n: number) => onChange(Math.max(min, Number.isFinite(n) ? n : min))
  const flecha = 'flex size-5 items-center justify-center rounded text-ink-muted hover:bg-surface-muted hover:text-ink disabled:pointer-events-none disabled:opacity-40'
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id}><FieldLabel required={required}>{label}</FieldLabel></label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          value={value}
          disabled={disabled}
          aria-invalid={!!error || undefined}
          onChange={(e) => cambiar(Number(e.target.value))}
          className={cn(control(error), 'h-9 pr-28 pl-3 tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none')}
        />
        <span className="absolute inset-y-0 right-2 flex items-center gap-0.5">
          <button type="button" aria-label={`Decrease ${label}`} disabled={disabled || value <= min} onClick={() => cambiar(value - 1)} className={flecha}>
            <ChevronDown className="size-3.5" />
          </button>
          <button type="button" aria-label={`Increase ${label}`} disabled={disabled} onClick={() => cambiar(value + 1)} className={flecha}>
            <ChevronUp className="size-3.5" />
          </button>
          <span className="ml-1 text-xs text-ink-faint">{unit}</span>
        </span>
      </div>
      <FieldError>{error}</FieldError>
    </div>
  )
}

/* Country Code y el número. Con (+1) el número va en dos campos, Area Code (3 digits) y Number (7 digits); con otro país,
   uno solo. Sólo se guardan dígitos. De a dos como el resto del drawer, nunca tres por fila (Components / UI / Drawer → Specs). */
export function PhoneFields({
  value, onChange, required, errores, className,
}: {
  value: Telefono
  onChange: (t: Telefono) => void
  /** Area Code y Number obligatorios; Country Code lo es siempre que se pide el número. */
  required?: boolean
  errores?: { area?: string; numero?: string }
  className?: string
}) {
  const nanp = esNorteamerica(value.codigo)
  const digitos = (k: 'area' | 'numero', max: number) => (v: string) => onChange({ ...value, [k]: v.replace(/\D/g, '').slice(0, max) })
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2', className)}>
      <SelectField label="Country Code" required={required} options={CODIGOS} value={value.codigo} onChange={(codigo) => onChange({ ...value, codigo })} />
      {nanp && (
        <TextField label="Area Code (3 digits)" required={required} placeholder="555" value={value.area} onChange={digitos('area', 3)} error={errores?.area} />
      )}
      <TextField
        label={nanp ? 'Number (7 digits)' : 'Number'} required={required} placeholder={nanp ? '000-0000' : '11 1234 5678'}
        value={nanp && value.numero.length > 3 ? `${value.numero.slice(0, 3)}-${value.numero.slice(3)}` : value.numero}
        onChange={digitos('numero', nanp ? 7 : 15)} error={errores?.numero}
      />
    </div>
  )
}

/* Monto en una celda: se escribe el número y al salir se muestra como $1,250.00. */
export function MoneyInput({
  label, value, onChange, placeholder = '$0.00', invalid, className,
}: {
  /** Va como aria-label: el monto vive en una tabla con su encabezado. */
  label: string
  value: number | null
  onChange: (v: number | null) => void
  placeholder?: string
  invalid?: boolean
  className?: string
}) {
  const [editando, setEditando] = useState<string | null>(null)
  const texto = editando ?? (value === null ? '' : dinero(value))
  return (
    <input
      aria-label={label}
      inputMode="decimal"
      value={texto}
      placeholder={placeholder}
      aria-invalid={invalid || undefined}
      onFocus={() => setEditando(value === null ? '' : String(value))}
      onChange={(e) => {
        const limpio = e.target.value.replace(/[^\d.]/g, '')
        setEditando(limpio)
        onChange(limpio === '' ? null : Number(limpio))
      }}
      onBlur={() => setEditando(null)}
      className={cn(control(invalid ? 'error' : undefined), 'h-8 px-2.5 text-right tabular-nums', className)}
    />
  )
}
