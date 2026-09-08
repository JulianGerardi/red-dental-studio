import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({
  pagina, paginas, onChange,
}: {
  pagina: number
  paginas: number
  onChange: (p: number) => void
}) {
  if (paginas < 2) return null
  const mover = (delta: number) => onChange(Math.min(paginas, Math.max(1, pagina + delta)))

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Previous page"
        disabled={pagina === 1}
        onClick={() => mover(-1)}
        className="flex size-7 items-center justify-center rounded-md text-[#a1a1aa] transition-colors hover:bg-[#f4f4f5] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: paginas }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === pagina ? 'page' : undefined}
          onClick={() => onChange(p)}
          className={
            'flex size-7 items-center justify-center rounded-md text-xs font-semibold transition-colors '
            + (p === pagina ? 'bg-dash-blue text-white' : 'text-[#71717a] hover:bg-[#f4f4f5]')
          }
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        disabled={pagina === paginas}
        onClick={() => mover(1)}
        className="flex size-7 items-center justify-center rounded-md text-[#a1a1aa] transition-colors hover:bg-[#f4f4f5] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
