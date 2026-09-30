import { cn } from '@/lib/utils'

/* El filtrado ya corre mientras se tipea; este botón es el que trae el
   Figma al lado del campo. Julián lo había sacado por redundante y después
   pidió que volviera en toda tabla con buscador al inicio. */
export function SearchButton({
  onClick, className,
}: { onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'bg-dash-blue hover:bg-dash-blue-hover shrink-0 rounded-md px-4 text-[13px] font-medium text-white transition-colors',
        className,
      )}
    >
      Search
    </button>
  )
}
