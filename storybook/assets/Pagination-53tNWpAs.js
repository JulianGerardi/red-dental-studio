import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { ChevronLeft, ChevronRight } from 'lucide-react'

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
        className="flex size-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
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
            + (p === pagina ? 'bg-dash-blue text-white' : 'text-ink-muted hover:bg-surface-muted')
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
        className="flex size-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
`})))()}export{n,i as r,r as t};