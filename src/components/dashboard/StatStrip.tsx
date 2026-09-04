import { CalendarDays, Clock, Activity, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Figma 4430:57451 — los tres stat cards sueltos del dashboard anterior
   pasaron a una sola tira compacta arriba a la derecha, separada por
   divisores verticales. */

export type Stat = {
  label: string
  value: string
  nota: string
  icon: LucideIcon
}

/* Las tres métricas comparten el celeste y el azul de Appointments. El frame
   les daba un color distinto a cada una —naranja y violeta—, y eso leía como
   si el color dijera algo: acá las tres son el mismo tipo de dato del mismo
   día, así que el color no las distingue, sólo las agrupa. */
export const STATS: Stat[] = [
  { label: 'Appointments', value: '6', nota: '2 completed', icon: CalendarDays },
  { label: 'Waiting', value: '3', nota: '1 new', icon: Clock },
  { label: 'Open encounters', value: '2', nota: '18 min avg.', icon: Activity },
]

export function StatStrip({ stats = STATS }: { stats?: Stat[] }) {
  return (
    /* En angosto la tira ocupa todo el ancho y reparte las tres métricas en
       columnas: el sentido del componente es verlas de un vistazo, y con
       scroll horizontal había que arrastrar para enterarse de que existían.
       Desde lg vuelve a la fila compacta del Figma, alineada a la derecha. */
    <div className="shadow-stat grid w-full grid-cols-3 rounded-xl bg-white lg:flex lg:w-fit lg:max-w-full lg:items-center lg:px-2">
      {stats.map(({ label, value, nota, icon: Icon }, i) => (
        <div
          key={label}
          className={cn(
            'flex min-w-0 flex-col items-start gap-1.5 px-3 py-3',
            'lg:shrink-0 lg:flex-row lg:items-center lg:gap-3 lg:px-4 lg:py-4',
            i > 0 && 'border-l border-[#ededed]',
          )}
        >
          <span className="text-dash-blue flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] lg:size-10">
            <Icon className="size-4 lg:size-5" />
          </span>
          {/* Rótulo y número en la misma línea, y el detalle abajo. El número
              apenas por encima del rótulo —14/15 contra 10/11—: con 18 el salto
              era tal que parecían dos jerarquías distintas en vez de un dato y
              su nombre. */}
          <span className="min-w-0 leading-tight">
            <span className="flex items-baseline gap-1.5">
              <span className="truncate text-[10px] font-semibold tracking-wide text-[#4a5565] uppercase lg:text-[11px]">
                {label}
              </span>
              <span className="text-[14px] leading-none font-bold text-[#09090b] lg:text-[15px]">
                {value}
              </span>
            </span>
            <span className="mt-1 block text-[11px] text-[#71717a] lg:text-[12px] lg:whitespace-nowrap">
              {nota}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
