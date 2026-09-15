import { useLayoutEffect, useRef, useState } from 'react'
import { Info } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ToothInfoPanel } from '@/components/clinical/dental/ToothInfoPanel'

/* "Tooth information" deja de ser un paso más del panel flotante: ahora es
   un ícono propio. Julián pidió que viva en la MISMA fila que los botones
   de la propia librería (vista oclusal, cordales, hueso, pulpa, limpiar
   selección) -no arriba, pisando los tabs Odontogram/Periodontal/
   Diagnoses-, del mismo tamaño. El botón usa las mismas clases de esos
   botones (`btn btn-ghost btn-icon`) en vez de copiarles el tamaño a mano:
   así hereda el `min-width: 44px` que la librería les da, sin duplicar el
   numerito.

   No se arma con `createPortal` -se probó primero así, y React tira
   "Target container is not a DOM element" cada vez que se cambia de tab:
   la librería saca `.chart-actions` del DOM en el momento del cambio, y el
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
   abre entero en un modal. Ver design-reference/figma/modulos/clinical-mode.md. */

export function ToothInfoTrigger({ nodo, contenedor }: { nodo: HTMLElement; contenedor: HTMLElement }) {
  const [abierto, setAbierto] = useState(false)
  const envoltorio = useRef<HTMLSpanElement>(null)

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
    <>
      <span ref={envoltorio} style={{ display: 'contents' }}>
        <HoverCard openDelay={150}>
          <HoverCardTrigger asChild>
            <button
              type="button"
              aria-label="Tooth information"
              onClick={() => setAbierto(true)}
              className="btn btn-ghost btn-icon"
            >
              <Info className="size-4" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="bottom" align="end" className="w-96 max-h-[70vh] overflow-y-auto">
            <ToothInfoPanel nodo={nodo} />
          </HoverCardContent>
        </HoverCard>
      </span>

      {abierto && (
        <ModalShell title="Tooth information" onClose={() => setAbierto(false)} width="max-w-[480px]">
          <ToothInfoPanel nodo={nodo} />
        </ModalShell>
      )}
    </>
  )
}
