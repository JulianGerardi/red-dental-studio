import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'
import { InfoTip } from '@/components/ui/info-tip'
import { TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'

/* La métrica de la app: una card por número, con el rótulo, el ⓘ arriba a la derecha, el monto y una bajada opcional,
   como las cards de red.dev. La usan Billing, el Ledger y Edit Account → Subscription (ledger.md, 2026-11-19). */
export function StatCard({ label, value, caption, info, interna, enFila, compacta, className }: {
  label: string
  value: string
  /** Qué es el número, en una o dos líneas debajo. */
  caption?: string
  /** Qué cuenta el número: abre un InfoTip arriba a la derecha. */
  info?: string
  /** Adentro de otra card (Today de Billing): InnerCard en vez de card de página. */
  interna?: boolean
  /** Today: rótulo y bajada a la izquierda, el número a la derecha, en una sola fila baja (billing.md, 2026-10-19). */
  compacta?: boolean
  /** En una fila de cards: rótulo, número y bajada se alinean con los de al lado (subgrid de tres filas). */
  enFila?: boolean
  className?: string
}) {
  if (compacta) {
    return (
      <div className={cn('flex min-w-0 items-center justify-between gap-2.5 p-2.5', interna ? TARJETA_INTERNA : TARJETA_PANEL, className)}>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="flex items-center gap-1 text-[13px] leading-snug font-semibold text-ink">
            {label}
            {info && <InfoTip title={label}>{info}</InfoTip>}
          </p>
          {caption && <p className="line-clamp-2 text-[11px] leading-snug text-ink-muted" title={caption}>{caption}</p>}
        </div>
        <p className="text-dash-blue shrink-0 text-base font-bold tabular-nums">{value}</p>
      </div>
    )
  }
  return (
    <div className={cn('min-w-0', enFila ? 'p-3' : 'p-4', interna ? TARJETA_INTERNA : TARJETA_PANEL, enFila && 'row-span-3 grid grid-rows-subgrid gap-y-0', className)}>
      {/* En una card angosta el rótulo y la bajada pasan a dos líneas en vez de cortarse (billing.md, 2026-10-13). */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs leading-snug text-ink-muted">{label}</p>
        {info && <InfoTip title={label}>{info}</InfoTip>}
      </div>
      <p className="text-dash-blue mt-1 truncate text-xl font-bold tabular-nums" title={value}>{value}</p>
      {caption
        ? <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink-faint" title={caption}>{caption}</p>
        : enFila && <span aria-hidden />}
    </div>
  )
}
`})))()}export{r as n,n as r,i as t};