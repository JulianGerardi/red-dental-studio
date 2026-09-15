import { useLayoutEffect, useRef } from 'react'
import { Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ToothInfoPanel, useResumenDental, hayHallazgo } from '@/components/clinical/dental/ToothInfoPanel'
import { BOTON_ICONO_REDONDO } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* "Tooth information" deja de ser un paso más del panel flotante: ahora es
   un ícono propio, redondo (mismo estilo que "Add condition",
   `BOTON_ICONO_REDONDO`). Julián lo quiere en la barra de tabs
   Odontogram/Periodontal Status, donde antes estaba "Diagnoses" -ese botón
   se saca por CSS (ver odontogram-theme.css)-, no en la fila de íconos del
   gráfico (vista oclusal, cordales, hueso, pulpa, limpiar selección).

   No se arma con `createPortal` -se probó primero así, y React tira
   "Target container is not a DOM element" cada vez que se cambia de tab:
   la librería rearma `.perio-launch-bar` en ese momento, y el
   `MutationObserver` que lo nota (en `OdontogramEmbed`) corre un paso
   después, así que el portal llega a intentar reconciliar contra un
   contenedor que ya no está. En cambio, React renderiza este `<span>` en
   SU propio árbol -como un hijo más de `OdontogramEmbed`- y un efecto lo
   MUEVE ahí con `appendChild` directo.

   Ese mismo efecto tiene que devolverlo a su lugar de origen al limpiar:
   React borra sus nodos buscándolos en el padre donde ÉL los montó, no en
   el padre real que tengan en ese momento -mover el nodo sin devolverlo
   tira "NotFoundError: the node to be removed is not a child of this
   node" apenas se desmonta-. Tiene que ser `useLayoutEffect`, no
   `useEffect`: la limpieza de un `useEffect` normal (pasivo) corre DESPUÉS
   de que React ya sacó sus nodos del DOM durante el commit, así que
   devolver el nodo ahí llega tarde -se probó, y sigue tirando el mismo
   error-. La de `useLayoutEffect` corre en el mismo commit, a tiempo.

   Al pasar el mouse adelanta el resumen en un hover card; al clickear lo
   despliega debajo del "Dental chart" -no en un modal flotante, Julián lo
   pidió así porque un modal tapaba el gráfico- y eso lo dibuja
   `OdontogramEmbed`, no este componente: acá sólo vive el botón. El
   puntito rojo avisa que hay algo para ver: `hayHallazgo` (en
   `ToothInfoPanel.tsx`) descarta los renglones "no recorded X" Y el caso
   especial de "Periodontal status" sano, que no arranca con "no" pero
   tampoco es un hallazgo.
   Ver design-reference/figma/modulos/clinical-mode.md. */

export function ToothInfoTrigger({
  nodo, contenedor, abierto, onToggle,
}: {
  nodo: HTMLElement
  contenedor: HTMLElement
  abierto: boolean
  onToggle: () => void
}) {
  const envoltorio = useRef<HTMLSpanElement>(null)
  const resumen = useResumenDental(nodo)
  const hayNotificacion = hayHallazgo(resumen)

  useLayoutEffect(() => {
    const el = envoltorio.current
    if (!el) return
    const origen = el.parentElement
    contenedor.appendChild(el)
    return () => {
      if (origen && el.parentElement !== origen) origen.appendChild(el)
    }
  }, [contenedor])

  return (
    <span ref={envoltorio} style={{ display: 'contents' }}>
      <HoverCard openDelay={150}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            aria-label={hayNotificacion ? 'Tooth information (new finding)' : 'Tooth information'}
            aria-pressed={abierto}
            onClick={onToggle}
            className={cn(
              BOTON_ICONO_REDONDO,
              'relative ml-4 size-8',
              abierto && 'border-[#1d56bc] bg-[#f0f5ff] text-[#1d56bc] hover:bg-[#f0f5ff]',
            )}
          >
            <Info className="size-4" />
            {hayNotificacion && (
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-[#dc2626] ring-2 ring-white" />
            )}
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" align="end" className="w-96 max-h-[70vh] overflow-y-auto">
          <ToothInfoPanel nodo={nodo} />
        </HoverCardContent>
      </HoverCard>
    </span>
  )
}
