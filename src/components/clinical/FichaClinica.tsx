import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, Paperclip, Trash2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Alert } from '@/components/ui/alert'
import { Chip } from '@/components/ui/chip'
import { Pill, type PillTone } from '@/components/ui/pill'
import { TONO_PROCEDIMIENTO } from './accionesProcedimiento'
import type { EstadoProcedimiento } from '@/data/clinical-mode'
import { FieldError, FieldLabel } from '@/components/patients/form'
import { ICONO_SUELTO, TARJETA_INTERNA, ICONO_TACHO } from '@/lib/estilos'

/* Las fichas de Lab order, Prescription y Referral en Clinical Mode: el título con el estado, quién lo hizo y cuándo y
   las acciones; las cards (settings `Card`) una debajo de la otra, como los formularios de la app; y Cancel / Save abajo
   a la derecha (`FormFooter`). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

/** El título de la ficha, del tamaño de un título de pantalla: la vuelta a la lista, el nombre y el estado a la izquierda;
 *  a la derecha, quién lo hizo y cuándo (`datos`, de sólo lectura), un campo propio del encabezado (`campo`: el vencimiento
 *  de una Prescription, como red.dev) y las acciones (PDF, ⋮). En pantallas angostas la derecha baja a su propia fila. */
export function EncabezadoFicha({ titulo, estado, tono, acciones, onVolver, volverA, datos, campo }: {
  titulo: string
  estado?: string
  tono?: PillTone
  acciones?: ReactNode
  onVolver?: () => void
  /** A dónde vuelve la flecha: "lab orders". */
  volverA?: string
  /** Pares rótulo / valor: "Ordering provider" · "Dr. Elena Martinez". */
  datos?: [rotulo: string, valor: ReactNode][]
  campo?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <div className="flex min-h-8 items-center gap-3">
        {onVolver && (
          <button type="button" onClick={onVolver} aria-label={`Back to ${volverA ?? 'the list'}`} title={`Back to ${volverA ?? 'the list'}`} className={cn(ICONO_SUELTO, '-ml-1')}>
            <ArrowLeft className="size-4" />
          </button>
        )}
        <h2 className="text-xl leading-[1.3] font-semibold text-ink">{titulo}</h2>
        {estado && <Pill tone={tono ?? 'info'}>{estado}</Pill>}
      </div>
      {(datos?.length || campo || acciones) && (
        <div className={cn('ml-auto flex flex-wrap justify-end gap-x-5 gap-y-3', campo ? 'items-start' : 'items-center')}>
          {/* Con un campo al lado, los datos toman su misma grilla: el rótulo arriba, a 8 px, y el valor a la altura del
              campo; así los tres se leen como una fila de formulario y no como texto pegado a un input. El campo va
              fuera del <dl> (no es un dato): su línea divisoria aparece desde 640 px, donde entran en una fila. */}
          {(!!datos?.length || campo) && (
            <div className="flex flex-wrap items-stretch gap-x-4 gap-y-3">
              {!!datos?.length && (
                <dl className="flex flex-wrap items-stretch gap-y-3 divide-x divide-line">
                  {datos.map(([rotulo, valor]) => (
                    <div key={rotulo} className={cn('flex flex-col px-4 first:pl-0 last:pr-0', campo ? 'gap-2' : 'gap-0.5')}>
                      <dt className={campo ? 'text-xs leading-4 font-medium text-ink' : 'text-[11px] leading-4 text-ink-muted'}>{rotulo}</dt>
                      <dd className={cn('text-[13px] font-medium text-ink', campo ? 'flex h-9 items-center' : 'leading-5')}>{valor}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {campo && <div className={cn(!!datos?.length && 'sm:border-l sm:border-line sm:pl-4')}>{campo}</div>}
            </div>
          )}
          {/* Las acciones, a la altura del campo (24 px = rótulo + separación) aunque debajo aparezca su error. */}
          {acciones && <span className={cn('flex items-center gap-2', campo && 'h-9 sm:mt-6')}>{acciones}</span>}
        </div>
      )}
    </div>
  )
}

/** Los avisos de arriba de la ficha, iguales en Lab order, Prescription y Referral: por qué no se puede editar (fuera de
 *  Pending: CON-2218, CON-2354, CON-2323) y, al guardar con faltantes, el de Jira. */
export function AvisosFicha({ editable, nombre, incompleto, error }: {
  editable: boolean
  /** "lab order", "prescription", "referral". */
  nombre: string
  /** Se intentó guardar con campos obligatorios vacíos. */
  incompleto?: boolean
  /** Otro motivo por el que no se guardó ("Date cannot be in the past"). */
  error?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { if (incompleto || error) ref.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }, [incompleto, error])
  return (
    <>
      {!editable && <Alert tone="warning" title="Read-only mode">{`This ${nombre} cannot be edited because it is not in an editable state.`}</Alert>}
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

export type Adjunto = { nombre: string; bytes?: number }
const TIPOS = ['application/pdf', 'image/jpeg', 'image/png']
const MAX_BYTES = 10 * 1024 * 1024
const tamano = (b: number) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`)

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
                <button type="button" className={ICONO_SUELTO} aria-label={`Remove ${a.nombre}`} onClick={() => onChange(value.filter((x) => x.nombre !== a.nombre))}>
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
  valor(p.pieza) ? [`Tooth ${p.pieza}`, valor(p.superficie)].filter(Boolean).join(' · ') : valor(p.ubicacion)

export function ProcedimientoResumen({ p }: { p: ProcedimientoFicha }) {
  return (
    <span className="flex min-w-0 flex-col gap-1.5">
      <span className="flex flex-wrap items-center gap-1.5">
        <Chip tone={p.caso ? 'blue' : 'neutral'}>{p.caso ?? 'Independent'}</Chip>
        <Pill tone={TONO_PROCEDIMIENTO[p.estado]}>{p.estado}</Pill>
      </span>
      <span className="text-[13px] text-ink"><span className="font-semibold text-dash-blue">{p.codigo}</span> - {p.nombre}</span>
      <span className="text-[11px] text-ink-muted">{[zonaProcedimiento(p), `Created date: ${p.fecha}`].filter(Boolean).join(' · ')}</span>
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
              type="button" aria-label={`Remove ${p.codigo}`} title="Remove" onClick={() => onRemove(p)}
              className={ICONO_TACHO}
            >
              <Trash2 className="size-4" />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
