import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link2, Link2Off, Plus, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TARJETA_INTERNA } from '@/lib/estilos'
import { control } from '@/components/patients/form'

/* Buscador independiente (Julián, 2026-10-24, sobre grabaciones de red.dev): no muestra nada mientras no se escribe; al
   escribir, los resultados flotan en un desplegable pegado al input, encima de lo que haya debajo (la lista del catálogo
   en New Procedure), y la ✕ del input limpia la búsqueda. Cada resultado es una card con el estilo de la app; al pasar el
   mouse aparece la acción (vincular, agregar). Lo elegido queda debajo, en una card azul con su botón para sacarlo; con
   `multiple` se suman varios (lo que vincula un procedimiento), sin eso elegir reemplaza (la condition de New Condition).
   Sin `selected` a la vista (`ocultarElegidos`), sólo busca y avisa por `onSelect`. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-24). */
export function SearchPicker<T>({
  items, getId, getText, renderOption, selected = [], onSelect, onRemove, renderSelected, placeholder = 'Search', ariaLabel,
  multiple, accion = 'agregar', emptyText = 'No results', tituloElegidos, ocultarElegidos, className,
}: {
  items: T[]
  getId: (item: T) => string
  /** El texto contra el que se busca. */
  getText: (item: T) => string
  /** El contenido de la card de un resultado. */
  renderOption: (item: T) => ReactNode
  selected?: T[]
  onSelect: (item: T) => void
  onRemove?: (item: T) => void
  /** El contenido de la card de lo elegido; por default, el del resultado. */
  renderSelected?: (item: T) => ReactNode
  placeholder?: string
  ariaLabel?: string
  multiple?: boolean
  /** Qué hace elegir un resultado: vincular (findings, diagnósticos) o agregar/elegir. Cambia el ícono. */
  accion?: 'vincular' | 'agregar'
  emptyText?: string
  /** Rótulo arriba de lo elegido ("Linked findings"). */
  tituloElegidos?: string
  ocultarElegidos?: boolean
  className?: string
}) {
  const [query, setQuery] = useState('')
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const q = query.trim().toLowerCase()
  const elegidos = new Set(selected.map(getId))
  const resultados = q ? items.filter((i) => !elegidos.has(getId(i)) && getText(i).toLowerCase().includes(q)) : []
  const IconoAccion = accion === 'vincular' ? Link2 : Plus

  useEffect(() => {
    if (!abierto) return
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [abierto])

  function elegir(item: T) {
    if (!multiple && onRemove) selected.forEach(onRemove)
    onSelect(item)
    setQuery('')
    setAbierto(false)
  }

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <div ref={ref} className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={query} placeholder={placeholder} aria-label={ariaLabel ?? placeholder}
          onChange={(e) => { setQuery(e.target.value); setAbierto(true) }}
          onFocus={() => setAbierto(true)}
          onKeyDown={(e) => { if (e.key === 'Escape' && abierto) { e.stopPropagation(); setAbierto(false) } }}
          className={cn(control(), 'h-9 pr-9 pl-9')}
        />
        {query && (
          <button
            type="button" aria-label="Clear search" onClick={() => { setQuery(''); setAbierto(false) }}
            className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-dash-blue"
          >
            <X className="size-3.5" />
          </button>
        )}
        {abierto && q && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 flex max-h-80 w-full flex-col gap-2 overflow-y-auto rounded-lg border border-line bg-surface-subtle p-2 shadow-lg">
            {resultados.map((item) => (
              <button
                key={getId(item)} type="button" onClick={() => elegir(item)}
                className={cn(TARJETA_INTERNA, 'group flex w-full items-center gap-2 p-3 text-left transition-colors hover:bg-dash-count-bg/40 focus-visible:outline-2 focus-visible:outline-dash-blue')}
              >
                <span className="min-w-0 flex-1">{renderOption(item)}</span>
                <IconoAccion aria-hidden className="size-4 shrink-0 text-dash-blue opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              </button>
            ))}
            {!resultados.length && <p className="px-2 py-4 text-center text-xs text-ink-faint">{emptyText}</p>}
          </div>
        )}
      </div>

      {!ocultarElegidos && selected.length > 0 && (
        <div className="flex flex-col gap-2">
          {tituloElegidos && <p className="text-xs font-medium text-ink">{tituloElegidos}</p>}
          {selected.map((item) => (
            <div key={getId(item)} className={cn(TARJETA_INTERNA, 'flex items-center gap-2 p-3 ring-1 ring-dash-blue')}>
              <span className="min-w-0 flex-1">{(renderSelected ?? renderOption)(item)}</span>
              {onRemove && (
                <button
                  type="button" aria-label={`Remove ${getText(item)}`} title={accion === 'vincular' ? 'Unlink' : 'Remove'} onClick={() => onRemove(item)}
                  className="flex size-7 shrink-0 items-center justify-center rounded-md text-dash-blue hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-dash-blue"
                >
                  {accion === 'vincular' ? <Link2Off className="size-4" /> : <X className="size-4" />}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
