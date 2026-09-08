import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Notificacion } from '@/data/notificaciones'

/* Banner de tareas pendientes, arriba de todo. Muestra una por vez con
   flechas ‹ › y el contador al medio; queda hasta que se descarta.
   Ver design-reference/figma/modulos/header-sidebar.md. */
export function NotificationBanner({
  items, cursor, onCursor, onDescartar,
}: {
  items: Notificacion[]
  cursor: number
  onCursor: (i: number) => void
  onDescartar: (id: string) => void
}) {
  if (items.length === 0) return null
  const actual = items[cursor]
  const Icono = actual.icon
  const mover = (paso: number) => onCursor((cursor + paso + items.length) % items.length)

  return (
    <div className="flex items-center gap-3 border-b border-[#e4e4e7] bg-[#eef5ff] px-4 py-2.5 sm:px-6">
      <span className="text-dash-blue flex size-7 shrink-0 items-center justify-center rounded-full bg-white">
        <Icono className="size-3.5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-[#09090b]">{actual.titulo}</span>
        <span className="hidden truncate text-[12px] text-[#3f3f46] sm:block">{actual.detalle}</span>
      </span>

      <Link
        to={actual.to}
        className="text-dash-blue hidden shrink-0 text-[12px] font-semibold hover:underline sm:inline"
      >
        {actual.accion}
      </Link>

      {/* Las flechas sólo tienen sentido con más de una. */}
      {items.length > 1 && (
        <span className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label="Previous notification"
            className="text-dash-blue flex size-6 items-center justify-center rounded-md hover:bg-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-[11px] font-semibold whitespace-nowrap text-[#3f3f46] tabular-nums">
            {cursor + 1} of {items.length}
          </span>
          <button
            type="button"
            onClick={() => mover(1)}
            aria-label="Next notification"
            className="text-dash-blue flex size-6 items-center justify-center rounded-md hover:bg-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={() => onDescartar(actual.id)}
        aria-label={`Dismiss: ${actual.titulo}`}
        className={cn('flex size-6 shrink-0 items-center justify-center rounded-md text-[#71717a] hover:bg-white hover:text-[#09090b]')}
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
