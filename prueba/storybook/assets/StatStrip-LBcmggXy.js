import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { CalendarDays, Clock, Activity, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoTip } from '@/components/ui/info-tip'

/* Figma 4430:57451 — los tres stat cards sueltos del dashboard anterior
   pasaron a una sola tira compacta arriba a la derecha, separada por
   divisores verticales. */

export type Stat = {
  label: string
  value: string
  /** Sin nota, la métrica va sola con su ⓘ (Ledger, ledger.md 2026-11-12). */
  nota?: string
  /** Qué cuenta el número: abre un InfoTip al lado del rótulo. */
  info?: string
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

/* Variante para Ledger: título arriba, monto abajo y detalle al final, en
   columnas iguales que reparten el ancho disponible. La fila compacta de
   arriba (rótulo y monto en una línea, \`shrink-0\`) no entraba con el menú y
   el panel del paciente abiertos y empujaba la cuarta métrica fuera de la
   pantalla. Acá el ancho lo decide el contenedor -no el viewport, que no
   sabe si los menús están abiertos-: de 2×2 a cuatro columnas desde 672px. */
export function StatStripApilada({ stats }: { stats: Stat[] }) {
  return (
    <div className="@container w-full">
      <div className={cn(
        'shadow-panel grid w-full rounded-xl bg-white',
        stats.length === 4 ? 'grid-cols-2 @2xl:grid-cols-4' : 'grid-cols-3',
      )}>
        {stats.map(({ label, value, nota, info, icon: Icon }, i) => (
          <div
            key={label}
            className={cn(
              'flex min-w-0 items-center gap-3 px-4 py-3.5',
              i % 2 === 1 && 'border-l border-line-hair',
              i >= 2 && 'border-t border-line-hair',
              i > 0 && '@2xl:border-l @2xl:border-line-hair',
              '@2xl:border-t-0',
            )}
          >
            <span className="text-dash-blue hidden size-9 shrink-0 items-center justify-center rounded-lg bg-info-bg @md:flex">
              <Icon className="size-[18px]" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[10px] font-semibold tracking-wide text-dash-muted uppercase">{label}</span>
                {info && <InfoTip title={label}>{info}</InfoTip>}
              </span>
              <span className="mt-1 block text-[17px] leading-none font-bold text-dash-blue tabular-nums">{value}</span>
              {nota && <span className="mt-1 block truncate text-[11px] text-ink-muted">{nota}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatStrip({ stats = STATS, apilada = false }: { stats?: Stat[]; apilada?: boolean }) {
  if (apilada) return <StatStripApilada stats={stats} />
  return (
    /* En angosto la tira ocupa todo el ancho y reparte las métricas en
       columnas: el sentido del componente es verlas de un vistazo, y con
       scroll horizontal había que arrastrar para enterarse de que existían.
       Desde lg vuelve a la fila compacta del Figma, alineada a la derecha.
       Ledger suma una cuarta (Unapplied credits) -grid-cols-3 la partía
       3+1 en dos filas desparejas-, así que el mobile grid se adapta a
       cuántas hay en vez de asumir siempre tres. */
    <div className={cn(
      'shadow-panel grid w-full rounded-xl bg-white lg:flex lg:w-fit lg:max-w-full lg:items-center lg:px-2',
      stats.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3',
    )}>
      {/* Variante compacta del Metric (Dashboard): rótulo y número en una línea, sin bajada. Lo que cuenta cada número va
          en el ⓘ, no en una segunda línea fija (propuesta de consistencia, dashboard.md 2026-11-20). La variante estándar,
          con monto y contexto, es StatStripApilada (Ledger) y las cards de Billing. */}
      {stats.map(({ label, value, info, icon: Icon }, i) => (
        <div
          key={label}
          className={cn(
            'flex min-w-0 items-center gap-2.5 px-3 py-3',
            'lg:shrink-0 lg:gap-3 lg:px-4',
            i > 0 && 'border-l border-line-hair',
          )}
        >
          <span className="text-dash-blue hidden size-10 shrink-0 items-center justify-center rounded-lg bg-info-bg sm:flex">
            <Icon className="size-5" />
          </span>
          {/* Rótulo y número en la misma línea, y el detalle abajo. El número
              apenas por encima del rótulo —14/15 contra 10/11—: con 18 el salto
              era tal que parecían dos jerarquías distintas en vez de un dato y
              su nombre. */}
          <span className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-tight">
            <span className="text-[11px] font-semibold tracking-wide text-dash-muted uppercase">{label}</span>
            <span className="text-[17px] leading-none font-bold text-dash-blue tabular-nums">{value}</span>
            {info && <InfoTip title={label}>{info}</InfoTip>}
          </span>
        </div>
      ))}
    </div>
  )
}
`})))()}export{n,i as r,r as t};