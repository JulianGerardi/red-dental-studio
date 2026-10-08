import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState } from 'react'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { dinero, numero } from '@/data/finanzas'

/* Un monto que se edita en su misma celda: se toca, se escribe y Enter (o salir del campo) lo guarda; Escape lo descarta.
   Vacío y Enter lo deja sin precio. Lo usa la tabla de precios de un fee schedule. Ver settings-billing.md. */
export function EditableAmount({
  value, onChange, label, disabled, editing = false,
}: {
  /** Sin valor: "Not set". */
  value?: number
  onChange: (v: number | undefined) => void
  /** Qué monto es, para el lector de pantalla ("D1110 fee"). */
  label: string
  disabled?: boolean
  /** Arranca editando (sólo para las stories). */
  editing?: boolean
}) {
  const [editando, setEditando] = useState(editing)
  const [texto, setTexto] = useState(() => (editing && value !== undefined ? String(value) : ''))
  const ref = useRef<HTMLInputElement>(null)
  const abierto = useRef(false)

  /* Sólo se enfoca si lo abrió la persona: en Storybook una story que arranca editando no se roba el foco. */
  useEffect(() => {
    if (editando && abierto.current) ref.current?.select()
  }, [editando])

  const n = numero(texto)
  const invalido = texto.trim() !== '' && (n === null || n < 0)

  const abrir = () => {
    abierto.current = true
    setTexto(value === undefined ? '' : String(value))
    setEditando(true)
  }
  const confirmar = () => {
    if (invalido) return
    setEditando(false)
    const nuevo = texto.trim() === '' ? undefined : Math.round(n! * 100) / 100
    if (nuevo !== value) onChange(nuevo)
  }

  if (editando) {
    return (
      <span className="relative inline-flex" onClick={(e) => e.stopPropagation()}>
        <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-[13px] text-ink-muted">$</span>
        <input
          ref={ref}
          value={texto}
          inputMode="decimal"
          aria-label={label}
          aria-invalid={invalido || undefined}
          title={invalido ? 'Enter an amount, like 95 or 95.50' : undefined}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') confirmar()
            if (e.key === 'Escape') { e.stopPropagation(); setEditando(false) }
          }}
          onBlur={() => (invalido ? setEditando(false) : confirmar())}
          className={cn(
            'h-8 w-28 rounded-md border bg-white pr-2 pl-6 text-right text-[13px] tabular-nums shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none',
            invalido ? 'border-field-error' : 'border-dash-blue',
          )}
        />
      </span>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={\`Edit \${label}\`}
      onClick={(e) => { e.stopPropagation(); abrir() }}
      className="group/monto -mx-2 inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[13px] tabular-nums transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-dash-blue disabled:pointer-events-none disabled:opacity-50"
    >
      {value === undefined
        ? <span className="text-ink-faint">Not set</span>
        : <span className="font-medium text-ink">{dinero(value, true)}</span>}
      <Pencil aria-hidden className="size-3 text-ink-muted opacity-0 transition-opacity group-hover/monto:opacity-100 group-focus-visible/monto:opacity-100" />
    </button>
  )
}
`})))()}export{n,i as r,r as t};