import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import type { ClinicalItem } from '@/data/clinicalItems'

/* Figma 3646:59881 — al abrir una card clínica, la card se pinta de azul y
   cuelga un popup debajo con la lista de ítems. */

const BADGE = {
  Prescribed: 'border-dash-blue bg-[#eff6ff] text-dash-blue',
  Completed: 'border-[#1a804d] bg-[#f0fcf5] text-[#1a804d]',
}

export function ClinicalPopover({
  title,
  anchor,
  items,
  onAdd,
  onEdit,
  onDelete,
  onClose,
}: {
  title: string
  anchor: DOMRect
  items: ClinicalItem[]
  onAdd: () => void
  onEdit: (it: ClinicalItem) => void
  onDelete: (it: ClinicalItem) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (ref.current && !ref.current.contains(t) && !t.closest?.('[data-clinical-card]')) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [onClose])

  /* Cuelga debajo del ancla y alineado a su borde izquierdo. Si no entra
     hacia abajo, se corre para arriba en vez de obligar a scrollear.

     Toma el ancho del ancla, pero nunca menos de 300: colgado de una card del
     dashboard eso es el ancho de la card, y colgado de un contador de la barra
     clínica —46px— el panel quedaba en una tira ilegible. */
  const ancho = Math.min(Math.max(anchor.width, 360), window.innerWidth - 16)
  const left = Math.max(8, Math.min(anchor.left, window.innerWidth - ancho - 8)) + window.scrollX
  const [top, setTop] = useState(anchor.bottom + 6 + window.scrollY)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const alto = el.offsetHeight
    const cabeAbajo = anchor.bottom + 6 + alto <= window.innerHeight - 12
    const y = cabeAbajo
      ? anchor.bottom + 6
      : Math.max(12, Math.min(anchor.top - 6 - alto, window.innerHeight - alto - 12))
    setTop(y + window.scrollY)
  }, [anchor.bottom, anchor.top])

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label={title}
      style={{ left, top, width: ancho }}
      className="motion-safe:animate-[fab-panel-in_160ms_cubic-bezier(0.16,1,0.3,1)] absolute z-40 origin-top rounded-lg border border-[#e4e4e7] bg-[#fafcff] p-2 shadow-[0_8px_24px_rgb(0_0_0/0.12)]"
    >
      <div className="flex flex-col gap-1.5">
        {items.length === 0 && (
          <EmptyState title="Nothing recorded" detail={`No ${title.toLowerCase()} for this patient yet.`} className="py-6" />
        )}

        {/* El azul es hover, no selección: en el Figma el primer ítem aparece
            pintado porque el frame quedó capturado con el mouse encima. */}
        {items.map((it) => (
          <div
            key={it.id}
            className="group rounded-md border border-transparent bg-white px-3 py-2 transition-colors hover:border-dash-blue hover:bg-[#eff6ff]"
          >
            {/* El nombre va en su propia línea. Compartiendo fila con la pill,
                el "Since" y los dos íconos, en un panel angosto se truncaba
                hasta desaparecer: colgado del contador de la barra clínica no
                se leía qué medicación era. */}
            <div className="flex items-start gap-2">
              <span className="group-hover:text-dash-blue min-w-0 flex-1 text-[13px] font-semibold break-words text-[#09090b] transition-colors">
                {it.name}
              </span>
              <span className={cn('shrink-0 rounded-full border px-2 py-[1px] text-[10px] font-semibold', BADGE[it.status])}>
                {it.status}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-[10px] tracking-wide text-[#a1a1aa]">
                {it.detail}
              </span>
              <span className="shrink-0 text-[11px] text-[#71717a]">Since: {it.since}</span>
              <button
                type="button"
                aria-label={`Edit ${it.name}`}
                onClick={() => onEdit(it)}
                className="shrink-0 text-[#09090b] hover:opacity-60"
              >
                <Pencil className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${it.name}`}
                onClick={() => onDelete(it)}
                className="shrink-0 text-[#09090b] hover:text-[#dc2626]"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Alta desde el propio listado; el botón + de la card hace lo mismo. */}
        <button
          type="button"
          onClick={onAdd}
          className="text-dash-blue hover:bg-dash-count-bg flex items-center justify-center gap-1.5 rounded-md border border-dashed border-[#c3d0ee] px-3 py-2 text-xs font-medium transition-colors"
        >
          <Plus className="size-3.5" /> Add {title}
        </button>
      </div>
    </div>,
    document.body,
  )
}
