import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoTip } from '@/components/ui/info-tip'
import { TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'

/* La métrica de la app: la estructura de la propuesta v3 (ícono, rótulo en sentence case, ⓘ en todas y sin bajada: lo
   que cuenta el número va en el ⓘ) con el estilo de la app: card con sombra y sin borde, ícono en caja celeste como la
   tira del Dashboard y el valor en azul (billing.md, 2026-11-24). La usan Billing, el Ledger y Edit Account →
   Subscription; la variante compacta es StatStrip (Dashboard). */
export function StatCard({ label, value, info, icon: Icon, interna, enFila, filaSiNoEntra, className }: {
  label: string
  value: string
  /** Qué cuenta el número: abre un InfoTip arriba a la derecha. Toda métrica lleva el suyo. */
  info?: string
  icon?: LucideIcon
  /** Adentro de otra card (Today de Billing): InnerCard en vez de card de página. */
  interna?: boolean
  /** En una fila de cards: los valores se alinean aunque un rótulo ocupe dos líneas (subgrid de dos filas). */
  enFila?: boolean
  /** En un panel con el alto justo (Today de Billing, que termina donde termina la tabla): si el contenedor `hoy`
      (`[container:hoy/size]`) mide menos de 340px, la card pasa a una fila -ícono, rótulo, ⓘ y valor a la derecha- y las
      cards se reparten el alto; con lugar, vuelve a ser la card entera (billing.md, 2026-11-24). */
  filaSiNoEntra?: boolean
  className?: string
}) {
  return (
    <div className={cn(
      'min-w-0 p-4', interna ? TARJETA_INTERNA : TARJETA_PANEL,
      enFila && 'row-span-2 grid grid-rows-subgrid gap-y-0',
      /* Las clases van enteras (Tailwind no lee las armadas con variables). */
      filaSiNoEntra && '[@container_hoy_(max-height:339px)]:flex [@container_hoy_(max-height:339px)]:flex-1 [@container_hoy_(max-height:339px)]:items-center [@container_hoy_(max-height:339px)]:gap-3 [@container_hoy_(max-height:339px)]:px-3 [@container_hoy_(max-height:339px)]:py-2',
      className,
    )}>
      <div className={cn('flex min-h-9 items-center gap-2.5 self-start', filaSiNoEntra && '[@container_hoy_(max-height:339px)]:min-w-0 [@container_hoy_(max-height:339px)]:flex-1 [@container_hoy_(max-height:339px)]:self-center')}>
        {Icon && (
          <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-bg text-dash-blue', filaSiNoEntra && '[@container_hoy_(max-height:339px)]:size-8')}>
            <Icon className="size-[18px]" aria-hidden />
          </span>
        )}
        <p className={cn('min-w-0 flex-1 text-[13px] leading-snug font-medium text-ink-muted', filaSiNoEntra && '[@container_hoy_(max-height:339px)]:text-[12px]')}>{label}</p>
        {info && <InfoTip title={label}>{info}</InfoTip>}
      </div>
      <p className={cn(
        'mt-2 text-xl font-bold [overflow-wrap:break-word] text-dash-blue tabular-nums',
        filaSiNoEntra && '[@container_hoy_(max-height:339px)]:mt-0 [@container_hoy_(max-height:339px)]:shrink-0 [@container_hoy_(max-height:339px)]:text-base [@container_hoy_(max-height:339px)]:whitespace-nowrap',
      )}>{value}</p>
    </div>
  )
}
