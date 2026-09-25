import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ANCHO_PAGINA } from '@/lib/estilos'
import type { Notificacion } from '@/data/notificaciones'

/* Banner de tareas pendientes, arriba de todo. Muestra una por vez con
   flechas ‹ › y el contador al medio; queda hasta que se descarta.
   Ver design-reference/figma/modulos/header-sidebar.md. */
export function NotificationBanner({
  items, cursor, onCursor, onOcultar,
}: {
  items: Notificacion[]
  cursor: number
  onCursor: (i: number) => void
  /** Saca la tarea del banner; sigue pendiente y sigue en la campana. */
  onOcultar: (id: string) => void
}) {
  if (items.length === 0) return null
  const actual = items[cursor]
  const Icono = actual.icon
  const mover = (paso: number) => onCursor((cursor + paso + items.length) % items.length)

  return (
    /* Ámbar, no azul: es el par de "atención" que ya usan GuarantorBanner y
       NewHoursModal (`#fffbeb` con `#b45309`), el mismo que el badge
       `warning`. El azul lo dejaba leer como información, no como algo
       pendiente de hacer. */
    <div className="border-b border-[#fde68a] bg-[#fffbeb]">
      <div className={cn(ANCHO_PAGINA, 'flex items-center gap-3 px-4 py-2.5 sm:px-6')}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-attn-fg">
        <Icono className="size-3.5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-attn-fg">{actual.titulo}</span>
        <span className="hidden truncate text-[12px] text-[#92400e] sm:block">{actual.detalle}</span>
      </span>

      <Link
        to={actual.to}
        className="hidden shrink-0 text-[12px] font-semibold text-attn-fg hover:underline sm:inline"
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
            className="flex size-6 items-center justify-center rounded-md text-attn-fg hover:bg-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-[11px] font-semibold whitespace-nowrap text-[#92400e] tabular-nums">
            {cursor + 1} of {items.length}
          </span>
          <button
            type="button"
            onClick={() => mover(1)}
            aria-label="Next notification"
            className="flex size-6 items-center justify-center rounded-md text-attn-fg hover:bg-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={() => onOcultar(actual.id)}
        aria-label={`Hide from banner: ${actual.titulo}`}
        title="Hide from banner — stays in notifications"
        className={cn('flex size-6 shrink-0 items-center justify-center rounded-md text-attn-fg/70 hover:bg-white hover:text-attn-fg')}
      >
        <X className="size-4" />
      </button>
      </div>
    </div>
  )
}
