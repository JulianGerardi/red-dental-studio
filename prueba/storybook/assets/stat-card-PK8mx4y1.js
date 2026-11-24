import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoTip } from '@/components/ui/info-tip'
import { TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'

/* La métrica de la app: la estructura de la propuesta v3 (ícono, rótulo en sentence case, ⓘ en todas y sin bajada: lo
   que cuenta el número va en el ⓘ) con el estilo de la app: card con sombra y sin borde, ícono en caja celeste como la
   tira del Dashboard y el valor en azul (billing.md, 2026-11-24). La usan Billing, el Ledger y Edit Account →
   Subscription; la variante compacta es StatStrip (Dashboard). */
export function StatCard({ label, value, info, icon: Icon, interna, enFila, className }: {
  label: string
  value: string
  /** Qué cuenta el número: abre un InfoTip arriba a la derecha. Toda métrica lleva el suyo. */
  info?: string
  icon?: LucideIcon
  /** Adentro de otra card (Today de Billing): InnerCard en vez de card de página. */
  interna?: boolean
  /** En una fila de cards: los valores se alinean aunque un rótulo ocupe dos líneas (subgrid de dos filas). */
  enFila?: boolean
  className?: string
}) {
  return (
    <div className={cn(
      'min-w-0 p-4', interna ? TARJETA_INTERNA : TARJETA_PANEL,
      enFila && 'row-span-2 grid grid-rows-subgrid gap-y-0',
      className,
    )}>
      <div className="flex min-h-9 items-center gap-2.5 self-start">
        {Icon && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-bg text-dash-blue">
            <Icon className="size-[18px]" aria-hidden />
          </span>
        )}
        <p className="min-w-0 flex-1 text-[13px] leading-snug font-medium text-ink-muted">{label}</p>
        {info && <InfoTip title={label}>{info}</InfoTip>}
      </div>
      <p className="mt-2 text-xl font-bold [overflow-wrap:break-word] text-dash-blue tabular-nums">{value}</p>
    </div>
  )
}
`})))()}export{r as n,n as r,i as t};