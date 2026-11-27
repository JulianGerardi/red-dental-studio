import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, Paperclip, Trash2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Alert } from '@/components/ui/alert'
import { Chip } from '@/components/ui/chip'
import { Pill, type PillTone } from '@/components/ui/pill'
import { TONO_PROCEDIMIENTO } from './accionesProcedimiento'
import type { EstadoProcedimiento } from '@/data/clinical-mode'
import { FieldError, FieldLabel } from '@/components/patients/form'
import { ICONO_SUELTO, TARJETA_INTERNA } from '@/lib/estilos'

/* Las fichas de Clinical Mode que se completan desde Pending Task (Lab order, Referral): título con estado y acciones,
   dos cards (settings \`Card\`) lado a lado en desktop -General information a la izquierda, Details a la derecha con el
   texto libre ocupando todo el alto- y Cancel / Save abajo a la derecha (\`FormFooter\`). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

const SIN_ENCUENTRO_FICHA = 'You do not have permission to perform this action because there is no open encounter for the selected patient.'

/** Las dos columnas de la ficha: lo que define el pedido a la izquierda y lo que se escribe a la derecha; en celular y tablet, una debajo de la otra. */
export const COLUMNAS_FICHA = 'grid items-stretch gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'

/** El título de la ficha, del tamaño de un título de pantalla, con la vuelta a la lista, su estado y sus acciones a la derecha. */
export function EncabezadoFicha({ titulo, estado, tono, acciones, onVolver, volverA }: {
  titulo: string
  estado?: string
  tono?: PillTone
  acciones?: ReactNode
  onVolver?: () => void
  /** A dónde vuelve la flecha: "lab orders". */
  volverA?: string
}) {
  return (
    <div className="flex min-h-8 flex-wrap items-center gap-3">
      {onVolver && (
        <button type="button" onClick={onVolver} aria-label={\`Back to \${volverA ?? 'the list'}\`} title={\`Back to \${volverA ?? 'the list'}\`} className={cn(ICONO_SUELTO, '-ml-1')}>
          <ArrowLeft className="size-4" />
        </button>
      )}
      <h2 className="text-xl leading-[1.3] font-semibold text-ink">{titulo}</h2>
      {estado && <Pill tone={tono ?? 'info'}>{estado}</Pill>}
      {acciones && <span className="ml-auto flex items-center gap-2">{acciones}</span>}
    </div>
  )
}

/** Los avisos de arriba de la ficha, iguales en Lab order, Prescription y Referral: por qué no se puede editar (sin
 *  encuentro, o fuera de Pending: CON-2218, CON-2354, CON-2323) y, al guardar con faltantes, el de Jira. */
export function AvisosFicha({ abierto, editable, nombre, incompleto, error }: {
  abierto: boolean
  editable: boolean
  /** "lab order", "prescription", "referral". */
  nombre: string
  /** Se intentó guardar con campos obligatorios vacíos. */
  incompleto?: boolean
  /** Otro motivo por el que no se guardó ("A prescription must contain at least one medication."). */
  error?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { if (incompleto || error) ref.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }, [incompleto, error])
  return (
    <>
      {!abierto
        ? <Alert tone="warning" title="Read-only mode">{SIN_ENCUENTRO_FICHA}</Alert>
        : !editable && <Alert tone="warning" title="Read-only mode">{\`This \${nombre} cannot be edited because it is not in an editable state.\`}</Alert>}
      {(incompleto || error) && (
        <div ref={ref} className="scroll-mt-4">
          <Alert tone="danger" title={incompleto ? 'Uncompleted fields' : 'Check the form'}>
            {incompleto ? 'All required fields marked with (*) must be completed before proceeding.' : error}
          </Alert>
        </div>
      )}
    </>
  )
}

/** Un dato de la ficha que no se edita (quién pidió la orden, cuándo): rótulo de campo y el valor como texto. */
export function DatoFicha({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <span className="text-[13px] leading-5 text-ink">{children}</span>
    </div>
  )
}

export type Adjunto = { nombre: string; bytes?: number }
const TIPOS = ['application/pdf', 'image/jpeg', 'image/png']
const MAX_BYTES = 10 * 1024 * 1024
const tamano = (b: number) => (b < 1024 * 1024 ? \`\${(b / 1024).toFixed(1)} KB\` : \`\${(b / 1024 / 1024).toFixed(1)} MB\`)

/** Attachments: zona para soltar o elegir archivos (PDF, JPG o PNG hasta 10MB) y la lista, cada uno con su ✕. */
export function Adjuntos({ value, onChange, disabled, error = 'Invalid file format or size.' }: {
  value: Adjunto[]
  onChange: (a: Adjunto[]) => void
  disabled?: boolean
  /** El aviso cuando un archivo no es del tipo o del tamaño permitido. */
  error?: string
}) {
  const [arrastrando, setArrastrando] = useState(false)
  const [malo, setMalo] = useState(false)
  const sumar = (archivos: FileList | null) => {
    const lista = [...(archivos ?? [])]
    const buenos = lista.filter((f) => TIPOS.includes(f.type) && f.size <= MAX_BYTES)
    setMalo(buenos.length < lista.length)
    onChange([...value, ...buenos.filter((f) => !value.some((a) => a.nombre === f.name)).map((f) => ({ nombre: f.name, bytes: f.size }))])
  }
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel>Attachments</FieldLabel>
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setArrastrando(true) }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={(e) => { e.preventDefault(); setArrastrando(false); if (!disabled) sumar(e.dataTransfer.files) }}
        className={cn(
          'flex items-center gap-3 rounded-lg border-2 border-dashed px-4 py-4 transition-colors',
          arrastrando ? 'border-dash-blue bg-dash-count-bg/50' : malo ? 'border-field-error' : 'border-line-strong',
          disabled && 'opacity-60',
        )}
      >
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[13px] font-semibold text-ink">Drag and drop your files</span>
          <span className="text-[11px] text-ink-muted">PDF, JPG, PNG, up to 10MB</span>
        </span>
        <label className={cn('h-8 shrink-0 rounded-md border border-line bg-surface px-3 text-[13px] leading-8 font-medium focus-within:outline-2 focus-within:outline-dash-blue', disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-surface-subtle')}>
          Select file
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="sr-only" disabled={disabled} onChange={(e) => { sumar(e.target.files); e.target.value = '' }} />
        </label>
      </div>
      {malo && <FieldError>{error}</FieldError>}
      {value.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Attached files">
          {value.map((a) => (
            <li key={a.nombre} className={cn(TARJETA_INTERNA, 'flex items-center gap-3 px-3 py-2')}>
              <Paperclip className="size-4 shrink-0 text-dash-blue" aria-hidden />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[13px] font-medium text-ink">{a.nombre}</span>
                {a.bytes !== undefined && <span className="text-[11px] text-ink-muted">{tamano(a.bytes)}</span>}
              </span>
              {!disabled && (
                <button type="button" className={ICONO_SUELTO} aria-label={\`Remove \${a.nombre}\`} onClick={() => onChange(value.filter((x) => x.nombre !== a.nombre))}>
                  <X className="size-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** Un procedimiento como lo muestran Lab order y Referral, en el buscador y vinculado: el caso (o Independent, como red.dev:
 *  el Treatment plan los llama Unassigned), el estado, código y nombre, y diente / superficie o zona con la fecha (CON-2584). */
export type ProcedimientoFicha = {
  id: string
  codigo: string
  nombre: string
  estado: EstadoProcedimiento
  fecha: string
  caso?: string
  pieza?: string
  superficie?: string
  ubicacion?: string
}

const valor = (v?: string) => (v && v.trim() && v !== '-' ? v : undefined)
/** "Tooth 19 · O, D" o, sin diente, la zona ("Upper arch"). */
export const zonaProcedimiento = (p: ProcedimientoFicha) =>
  valor(p.pieza) ? [\`Tooth \${p.pieza}\`, valor(p.superficie)].filter(Boolean).join(' · ') : valor(p.ubicacion)

export function ProcedimientoResumen({ p }: { p: ProcedimientoFicha }) {
  return (
    <span className="flex min-w-0 flex-col gap-1.5">
      <span className="flex flex-wrap items-center gap-1.5">
        <Chip tone={p.caso ? 'blue' : 'neutral'}>{p.caso ?? 'Independent'}</Chip>
        <Pill tone={TONO_PROCEDIMIENTO[p.estado]}>{p.estado}</Pill>
      </span>
      <span className="text-[13px] text-ink"><span className="font-semibold text-dash-blue">{p.codigo}</span> - {p.nombre}</span>
      <span className="text-[11px] text-ink-muted">{[zonaProcedimiento(p), \`Created date: \${p.fecha}\`].filter(Boolean).join(' · ')}</span>
    </span>
  )
}

/** Los procedimientos vinculados, uno debajo del otro, cada uno con su tacho (si se puede editar). */
export function ProcedimientosVinculados({ items, onRemove, disabled }: { items: ProcedimientoFicha[]; onRemove: (p: ProcedimientoFicha) => void; disabled?: boolean }) {
  if (!items.length) return <p className="text-[12px] text-ink-muted">No procedures linked.</p>
  return (
    <ul className="flex flex-col gap-2" aria-label="Linked procedures">
      {items.map((p) => (
        <li key={p.id} className={cn(TARJETA_INTERNA, 'flex items-start gap-3 p-3')}>
          <span className="min-w-0 flex-1"><ProcedimientoResumen p={p} /></span>
          {!disabled && (
            <button
              type="button" aria-label={\`Remove \${p.codigo}\`} title="Remove" onClick={() => onRemove(p)}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-dash-bad-bg hover:text-field-error focus-visible:outline-2 focus-visible:outline-dash-blue"
            >
              <Trash2 className="size-4" />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
`})))()}export{n,i as r,r as t};