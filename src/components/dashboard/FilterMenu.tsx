import { useEffect, useRef, useState } from 'react'
import { ListFilter } from 'lucide-react'
import { cn } from '@/lib/utils'

/* El embudo del Figma está dibujado pero no tiene menú. Acá despliega la lista
   de categorías y filtra de verdad; sin nada tildado se muestra todo. */
export function FilterMenu({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  /** Vacío = sin filtro. */
  value: string[]
  onChange: (v: string[]) => void
}) {
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

  const alternar = (o: string) =>
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'relative rounded-md p-1.5 text-[#09090b] transition-colors hover:bg-[#f4f4f5]',
          open && 'bg-[#f4f4f5]',
        )}
      >
        <ListFilter className="size-4" />
        {value.length > 0 && (
          <span className="bg-dash-blue absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-semibold text-white">
            {value.length}
          </span>
        )}
      </button>

      {open && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+6px)] right-0 z-40 w-[190px] overflow-hidden rounded-lg border border-[#e4e4e7] bg-white py-1 shadow-lg">
          {options.map((o) => {
            const on = value.includes(o)
            return (
              <button
                key={o}
                type="button"
                role="menuitemcheckbox"
                aria-checked={on}
                onClick={() => alternar(o)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] hover:bg-[#f4f4f5]"
              >
                <span
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-[3px] border',
                    on ? 'bg-dash-blue border-dash-blue' : 'border-[#a1a1aa] bg-white',
                  )}
                >
                  {on && (
                    <svg viewBox="0 0 12 12" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M2 6.5 4.8 9 10 3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {o}
              </button>
            )
          })}
          {value.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-dash-blue mt-1 w-full border-t border-[#e4e4e7] px-3 py-2 text-left text-xs font-medium hover:bg-[#f4f4f5]"
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  )
}
