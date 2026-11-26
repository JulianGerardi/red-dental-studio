import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState, type ReactNode } from 'react'
import { Paperclip, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Pill, type PillTone } from '@/components/ui/pill'
import { FieldError, FieldLabel } from '@/components/patients/form'
import { ICONO_SUELTO, TARJETA_INTERNA } from '@/lib/estilos'

/* Las fichas de Clinical Mode que se completan desde Pending Task (Lab order, Referral) tienen la estructura de Edit
   account: título con estado y acciones, cards apiladas a todo el ancho con campos de a dos (settings \`Card\`) y Cancel /
   Save abajo a la derecha (\`FormFooter\`). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-25). */

/** El título de la ficha, del tamaño de un título de pantalla, con su estado y sus acciones a la derecha. */
export function EncabezadoFicha({ titulo, estado, tono, acciones }: { titulo: string; estado: string; tono: PillTone; acciones?: ReactNode }) {
  return (
    <div className="flex min-h-8 flex-wrap items-center gap-3">
      <h2 className="text-xl leading-[1.3] font-semibold text-ink">{titulo}</h2>
      <Pill tone={tono}>{estado}</Pill>
      {acciones && <span className="ml-auto flex items-center gap-2">{acciones}</span>}
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
`})))()}export{n,i as r,r as t};