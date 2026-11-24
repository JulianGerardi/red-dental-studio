import { CalendarDays, Clock, Activity, type LucideIcon } from 'lucide-react'
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
   arriba (rótulo y monto en una línea, `shrink-0`) no entraba con el menú y
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

/* Variante compacta del Metric (Dashboard): un bloque blanco con sombra, divisores finos, ícono en caja celeste, rótulo en
   sentence case, número y ⓘ en la misma línea. En celular las métricas se apilan, una por fila, con el ⓘ a la derecha
   (estructura de la propuesta v3, estilo de la app: dashboard.md, 2026-11-24). La estándar es `ui/stat-card`. */
export function StatStrip({ stats = STATS, apilada = false }: { stats?: Stat[]; apilada?: boolean }) {
  if (apilada) return <StatStripApilada stats={stats} />
  return (
    <div className="shadow-panel flex w-full flex-col rounded-xl bg-white md:w-fit md:max-w-full md:flex-row md:items-center md:px-2">
      {stats.map(({ label, value, info, icon: Icon }, i) => (
        <div
          key={label}
          className={cn(
            'flex min-w-0 items-center gap-2.5 px-4 py-3 md:shrink-0 md:gap-3',
            i > 0 && 'border-t border-line-hair md:border-t-0 md:border-l',
          )}
        >
          <span className="text-dash-blue flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-bg">
            <Icon className="size-[18px]" aria-hidden />
          </span>
          <span className="text-[13px] leading-snug font-medium whitespace-nowrap text-ink-muted">{label}</span>
          <span className="text-[17px] leading-none font-bold text-dash-blue tabular-nums">{value}</span>
          {info && <InfoTip title={label} className="max-md:ml-auto">{info}</InfoTip>}
        </div>
      ))}
    </div>
  )
}
