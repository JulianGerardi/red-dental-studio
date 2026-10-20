import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from 'lucide-react'
import type { Notificacion } from '@/data/notificaciones'

/* Banner de tareas pendientes, arriba de la página. Muestra una por vez con flechas ‹ › y el contador; queda hasta que
   se descarta. Colapsable con la flecha (Julián, 2026-10-19): se achica a una tira con el total, para no perderlo de
   vista del todo; vuelve a abrirse igual de lleno que se dejó. No se guarda entre sesiones -a diferencia de ocultar
   una tarea puntual con la X, que si persiste en el store-, a validar si conviene que si lo haga. Ver
   design-reference/figma/modulos/header-sidebar.md. */
export function NotificationBanner({
  items, cursor, onCursor, onOcultar,
}: {
  items: Notificacion[]
  cursor: number
  onCursor: (i: number) => void
  /** Saca la tarea del banner; sigue sin leer y sigue en la campana. */
  onOcultar: (id: string) => void
}) {
  const [colapsado, setColapsado] = useState(false)
  if (items.length === 0) return null
  const actual = items[cursor]
  const Icono = actual.icon
  const mover = (paso: number) => onCursor((cursor + paso + items.length) % items.length)

  if (colapsado) {
    return (
      <div className="flex w-full items-center justify-center border-b border-warn-fg/25 bg-warn-bg">
        <button
          type="button" onClick={() => setColapsado(false)}
          className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-attn-fg hover:bg-white/60"
        >
          {items.length} pending {items.length === 1 ? 'task' : 'tasks'}
          <ChevronDown aria-hidden className="size-3.5" />
        </button>
      </div>
    )
  }

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
      <span className="ml-auto flex shrink-0 items-center gap-0.5">
        <button
          type="button" onClick={() => setColapsado(true)} aria-label="Collapse banner" title="Collapse — shows again with the arrow"
          className="flex size-6 items-center justify-center rounded-md text-attn-fg/70 hover:bg-white hover:text-attn-fg"
        >
          <ChevronUp className="size-4" />
        </button>
        <button
          type="button" onClick={() => onOcultar(actual.id)} aria-label={\`Hide from banner: \${actual.titulo}\`} title="Hide from banner — stays in notifications"
          className="flex size-6 items-center justify-center rounded-md text-attn-fg/70 hover:bg-white hover:text-attn-fg"
        >
          <X className="size-4" />
        </button>
      </span>
    </>
  )

  /* El aviso ámbar del design system (tono warning de Alert), de punta a punta: la tarea, Review y el paginador
     juntos a la izquierda, la flecha para colapsar y la X al final a la derecha (Julián, 2026-10-13; antes iba del
     ancho de su contenido). Sin padding arriba ni a los costados, ni tope de ancho, ni esquinas redondeadas (Julián,
     2026-10-19, con una captura propia): ya no usa ANCHO_PAGINA, mide lo mismo que la columna de contenido entera
     (sidebar aparte), no el \`max-w\` que acota el resto de la página. El borde queda sólo abajo (Julián, 2026-10-20),
     igual que el colapsado: arriba, a la izquierda y a la derecha ya lo delimitan el header, el rail y el borde de
     la ventana. Ver header-sidebar.md. */
  return (
    <div role="status" className="flex w-full items-center gap-3 border-b border-warn-fg/25 bg-warn-bg py-2 pr-2 pl-3 shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]">
      {contenido}
    </div>
  )
}
`})))()}export{n,i as r,r as t};