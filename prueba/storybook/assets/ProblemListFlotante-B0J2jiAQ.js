import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useContext, useState } from 'react'
import { Table2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BOTON_EXPANDIBLE, ETIQUETA_EXPANDIBLE } from '@/lib/estilos'
import { ProblemList } from '@/components/clinical/ProblemList'
import { NavegacionClinica } from '@/components/clinical/RecordDetail'

/* El botón de View Problem List y su tabla flotando sobre la pantalla, sin cambiar de vista: el mismo en los exámenes
   (ExamLayout) y en el Overview, así ninguna pantalla scrollea para llegar a la tabla (clinical-mode.md, 2026-10-29). */

const BOTON_ACCION = cn(BOTON_EXPANDIBLE, 'border-line bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle')

export function ProblemListFlotante({ procedimientoInicial }: {
  /** Abre ya la tabla en Procedures, con esa fila (el link desde el Ledger: ?procedure=). */
  procedimientoInicial?: string
}) {
  const [abierta, setAbierta] = useState(!!procedimientoInicial)
  const ir = useContext(NavegacionClinica)
  return (
    <TooltipProvider delayDuration={400}>
      <Popover open={abierta} onOpenChange={setAbierta}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="View Problem List"
                className={cn(BOTON_ACCION, abierta && 'border-dash-blue bg-dash-count-bg text-dash-blue-hover hover:bg-dash-count-bg')}
              >
                <Table2 className="size-[18px] shrink-0" />
                <span className={ETIQUETA_EXPANDIBLE}>View Problem List</span>
              </button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={6} className="bg-ink text-white">Open the patient&apos;s problem list</TooltipContent>
        </Tooltip>
        {/* Ancho para que la tabla entre entera, y alto hasta el borde de la pantalla con scroll adentro: con una fila
            abierta se salía por abajo. Ver clinical-mode.md (2026-10-09). */}
        <PopoverContent
          align="start" sideOffset={8} collisionPadding={16} aria-label="Problem list"
          className="max-h-(--radix-popover-content-available-height) w-[min(1240px,calc(100vw-2rem))] gap-0 overflow-y-auto overscroll-contain rounded-lg bg-transparent p-0 shadow-floating ring-0"
        >
          {/* Un link del detalle lleva a otra pantalla: el flotante se cierra. */}
          <NavegacionClinica.Provider value={ir && ((d) => { setAbierta(false); ir(d) })}>
            <ProblemList procedimientoInicial={procedimientoInicial} />
          </NavegacionClinica.Provider>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}
`})))()}export{n,i as r,r as t};