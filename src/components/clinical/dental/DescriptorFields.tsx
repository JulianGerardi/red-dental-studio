import { cn } from '@/lib/utils'
import { FieldLabel } from '@/components/patients/form'
import { DESCRIPTOR_ROWS, type DescriptorRow } from './data'

/* La guía visual de descriptores de una condition (Figma *Platform Design*, 5294:107675, pantalla "Edit Finding").
   Ahí cada fila va en una grilla fija de 5 columnas, con el rótulo a la izquierda de las píldoras -algo que sólo
   cierra con exactamente 5 opciones, y la mitad de las filas tiene menos-. Acá el rótulo pasa a `FieldLabel` arriba,
   como el resto del drawer (Provider, Surfaces, Notes), y las píldoras envuelven: mismo ritmo vertical que las otras
   secciones, sin columnas vacías. Cada fila es de una sola elección y ninguna es obligatoria; tocar la píldora ya
   marcada la deselecciona. Ver design-reference/figma/modulos/clinical-mode.md. */
export function DescriptorFields({
  value, onChange, rows = DESCRIPTOR_ROWS,
}: {
  value: Record<string, string>
  onChange: (next: Record<string, string>) => void
  rows?: DescriptorRow[]
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      {rows.map((row) => (
        <div key={row.id} className="flex w-full flex-col gap-1.5">
          <FieldLabel>{row.label}</FieldLabel>
          <div className="flex flex-wrap gap-1.5">
            {row.options.map((opt) => {
              const on = value[row.id] === opt
              return (
                <button
                  key={opt} type="button" aria-pressed={on}
                  onClick={() => onChange({ ...value, [row.id]: on ? '' : opt })}
                  className={cn(
                    'rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors',
                    on ? 'bg-dash-blue text-white' : 'text-ink-muted hover:bg-surface-subtle',
                  )}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

/** El texto de una fila a la vez, para `Finding.descriptor` -lo que ve la card-: sólo las filas con algo elegido. */
export function textoDescriptores(value: Record<string, string>) {
  return Object.values(value).filter(Boolean).join(', ')
}
