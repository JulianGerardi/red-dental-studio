import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoTip } from '@/components/ui/info-tip'

/* La métrica de la app (v3): card blanca con borde y acento azul arriba, ícono en caja celeste, rótulo en sentence case,
   el ⓘ a la derecha y el valor en azul; sin bajada: lo que cuenta el número va en el ⓘ (billing.md, 2026-11-24).
   La usan Billing, el Ledger y Edit Account → Subscription; la variante compacta es StatStrip (Dashboard). */
export function StatCard({ label, value, info, icon: Icon, texto, enFila, className }: {
  label: string
  value: string
  /** Qué cuenta el número: abre un InfoTip arriba a la derecha. Toda métrica lleva el suyo. */
  info?: string
  icon?: LucideIcon
  /** El valor es una palabra o una fecha, no un número (Subscription): un punto más chico. */
  texto?: boolean
  /** En una fila de cards: los valores se alinean aunque un rótulo ocupe dos líneas (subgrid de dos filas). */
  enFila?: boolean
  className?: string
}) {
  return (
    <div className={cn(
      'min-w-0 rounded-lg border border-line border-t-[3px] border-t-dash-blue bg-white p-[18px] shadow-xs',
      enFila && 'row-span-2 grid grid-rows-subgrid gap-y-0',
      className,
    )}>
      <div className="flex min-h-8 items-center gap-2.5 self-start">
        {Icon && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-info-bg text-dash-blue">
            <Icon className="size-[19px]" strokeWidth={1.6} aria-hidden />
          </span>
        )}
        <p className="min-w-0 flex-1 text-[13px] leading-[18px] font-medium text-dash-muted">{label}</p>
        {info && <InfoTip title={label}>{info}</InfoTip>}
      </div>
      {/* Un monto no se parte: en una card angosta el valor baja un punto en vez de cortarse a la mitad. */}
      <div className="@container mt-3 min-w-0">
        <p className={cn(
          'leading-[34px] font-semibold text-dash-blue tabular-nums',
          texto ? 'text-xl break-words @[180px]:text-2xl' : 'truncate text-2xl @[160px]:text-[28px]',
        )} title={value}>
          {value}
        </p>
      </div>
    </div>
  )
}
