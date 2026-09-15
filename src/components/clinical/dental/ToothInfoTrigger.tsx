import { useState } from 'react'
import { Info } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ToothInfoPanel } from '@/components/clinical/dental/ToothInfoPanel'
import { BOTON_ICONO_REDONDO } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* "Tooth information" deja de ser un paso más del panel flotante: ahora es
   un ícono propio -mismo círculo que "Add condition" en Radiography- fijo
   arriba a la derecha del gráfico. Al pasar el mouse adelanta el resumen en
   un hover card; al clickear lo abre entero en un modal. Pedido de Julián.
   Ver design-reference/figma/modulos/clinical-mode.md. */

export function ToothInfoTrigger({ nodo }: { nodo: HTMLElement }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <>
      <HoverCard openDelay={150}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            aria-label="Tooth information"
            onClick={() => setAbierto(true)}
            className={cn(BOTON_ICONO_REDONDO, 'absolute top-3 right-3 z-20 size-9')}
          >
            <Info className="size-4" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="left" align="start" className="w-96 max-h-[70vh] overflow-y-auto">
          <ToothInfoPanel nodo={nodo} />
        </HoverCardContent>
      </HoverCard>

      {abierto && (
        <ModalShell title="Tooth information" onClose={() => setAbierto(false)} width="max-w-[480px]">
          <ToothInfoPanel nodo={nodo} />
        </ModalShell>
      )}
    </>
  )
}
