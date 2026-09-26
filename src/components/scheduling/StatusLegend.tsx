import { useEffect, useRef, useState } from 'react'
import { Palette, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LEGEND, BLOCK_STYLE } from './calendar-data'

/* El frame pone los siete estados en una barra a lo ancho. En pantalla chica
   había que arrastrarla de costado para leerla, y en grande ocupa una franja
   entera para algo que se consulta una vez.
   Acá es un botón que despliega la lista, con la misma muestra de color del
   bloque del calendario —barra de acento y fondo— en vez del punto suelto,
   que era lo que de verdad hacía falta reconocer. */
export function StatusLegend() {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'flex h-8 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-xs font-medium text-ink-soft transition-colors',
          open ? 'border-dash-blue' : 'hover:bg-surface-subtle',
        )}
      >
        <Palette className="size-3.5" /> Status legend
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+6px)] left-0 z-40 w-[228px] rounded-lg border border-line bg-white p-2 shadow-lg">
          {LEGEND.map(({ state, dot }) => {
            const s = BLOCK_STYLE[state]
            return (
              <div key={state} className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
                <span
                  className="h-5 w-8 shrink-0 rounded-r-[3px] border-l-[3px]"
                  style={{ backgroundColor: s?.bg ?? 'var(--color-surface-muted)', borderLeftColor: s?.bar ?? 'var(--color-ink-faint)' }}
                />
                <span className="text-[13px] text-ink">{state}</span>
                {/* En el Figma "No-show" es el único sin punto (anomalía 24). */}
                {dot === null && (
                  <span className="ml-auto text-[10px] text-ink-faint">sin punto</span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
