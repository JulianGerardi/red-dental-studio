import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ANCHO_PAGINA } from '@/lib/estilos'
import type { Notificacion } from '@/data/notificaciones'

/* Banner de tareas pendientes, arriba de la página. Muestra una por vez con flechas ‹ › y el contador; queda hasta que
   se descarta. Ver design-reference/figma/modulos/header-sidebar.md. */
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

  const contenido = (
    <>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-attn-fg">
        <Icono className="size-3.5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold text-attn-fg">{actual.titulo}</span>
        <span className="hidden truncate text-[12px] text-ink-medium sm:block">{actual.detalle}</span>
      </span>
      <Link
        to={actual.to}
        className="shrink-0 rounded-full border border-attn-fg/30 bg-white px-2.5 py-0.5 text-[12px] font-semibold text-attn-fg transition-colors hover:border-attn-fg"
      >
        {actual.accion}
      </Link>
      {items.length > 1 && (
        <span className="flex shrink-0 items-center gap-0.5 border-l border-attn-fg/20 pl-2">
          <button type="button" onClick={() => mover(-1)} aria-label="Previous notification" className="flex size-6 items-center justify-center rounded-md text-attn-fg hover:bg-white">
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-[11px] font-semibold whitespace-nowrap text-attn-fg tabular-nums">{cursor + 1} of {items.length}</span>
          <button type="button" onClick={() => mover(1)} aria-label="Next notification" className="flex size-6 items-center justify-center rounded-md text-attn-fg hover:bg-white">
            <ChevronRight className="size-4" />
          </button>
        </span>
      )}
      <button
        type="button" onClick={() => onOcultar(actual.id)} aria-label={\`Hide from banner: \${actual.titulo}\`} title="Hide from banner — stays in notifications"
        className="flex size-6 shrink-0 items-center justify-center rounded-md text-attn-fg/70 hover:bg-white hover:text-attn-fg"
      >
        <X className="size-4" />
      </button>
    </>
  )

  /* El aviso ámbar del design system (tono warning de Alert), del ancho de su contenido y alineado con la página: la
     tarea, Review, el paginador y la X juntos, sin hueco en el medio (Julián eligió esta opción, 2026-10-06). */
  return (
    <div className="bg-page-background">
      <div className={cn(ANCHO_PAGINA, 'px-4 pt-4 sm:px-6')}>
        <div role="status" className="flex w-fit max-w-full items-center gap-3 rounded-lg border border-warn-fg/25 bg-warn-bg py-2 pr-2 pl-3 shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]">
          {contenido}
        </div>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};