import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { control } from '@/components/patients/form'

/* Buscador de elementos de una lista: el mismo formato que PersonSearchField (Julián, 2026-10-21 y 2026-10-24). No muestra
   nada mientras no se escribe -no vuelca todo el catálogo-; al escribir, las coincidencias flotan en un desplegable pegado
   al input, sin empujar lo de abajo, y lo elegido queda a la vista debajo con una ✕ para sacarlo. Con \`multiple\` se
   pueden ir sumando varios (los findings que vincula un procedimiento); sin eso, elegir uno reemplaza al anterior (la
   condition de New Condition). Ver design-reference/design-system.md. */
export function SearchPicker<T>({
  items, getId, getText, renderOption, selected, onSelect, onRemove, renderSelected, placeholder = 'Search', ariaLabel,
  multiple, emptyText = 'No results', className,
}: {
  items: T[]
  getId: (item: T) => string
  /** El texto contra el que se busca. */
  getText: (item: T) => string
  /** Cómo se ve una sugerencia en el desplegable. */
  renderOption: (item: T) => ReactNode
  selected: T[]
  onSelect: (item: T) => void
  onRemove: (item: T) => void
  /** Cómo se ve lo elegido; por default, la misma sugerencia en una card. La ✕ la pone el buscador. */
  renderSelected?: (item: T) => ReactNode
  placeholder?: string
  ariaLabel?: string
  multiple?: boolean
  emptyText?: string
  className?: string
}) {
  const [query, setQuery] = useState('')
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const q = query.trim().toLowerCase()
  const elegidos = new Set(selected.map(getId))
  const sugerencias = q ? items.filter((i) => !elegidos.has(getId(i)) && getText(i).toLowerCase().includes(q)) : []

  useEffect(() => {
    if (!abierto) return
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [abierto])

  function elegir(item: T) {
    if (!multiple) selected.forEach(onRemove)
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
          className={cn(control(), 'h-9 pr-3 pl-9')}
        />
        {abierto && q && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 flex max-h-72 w-full flex-col gap-1 overflow-y-auto rounded-md border border-line bg-white p-1 shadow-lg">
            {sugerencias.map((item) => (
              <button
                key={getId(item)} type="button" onClick={() => elegir(item)}
                className="flex items-center rounded-md p-2 text-left text-xs hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-dash-blue"
              >
                {renderOption(item)}
              </button>
            ))}
            {!sugerencias.length && <p className="px-2 py-3 text-center text-xs text-ink-faint">{emptyText}</p>}
          </div>
        )}
      </div>

      {selected.map((item) => (
        <div key={getId(item)} className="relative">
          <div className={cn(renderSelected ? '' : 'border-dash-blue flex items-center rounded-lg border bg-white p-3 pr-11 text-xs')}>
            {(renderSelected ?? renderOption)(item)}
          </div>
          <button
            type="button" aria-label={\`Remove \${getText(item)}\`} onClick={() => onRemove(item)}
            className="absolute top-1/2 right-2.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dash-blue"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
`})))()}export{r as n,n as r,i as t};