import { cn } from '@/lib/utils'
import { CLASES, maximoTexto, dinero, porcentajeDeClase, type TablaCobertura } from '@/data/finanzas'

/* Una coverage table en una línea: cuánto paga por clase (Preventive, Basic, Major, Ortho) y, si se pide, sus límites
   debajo. La usan la lista de coverage tables y el drawer de plan. Ver settings-billing.md. */

const NOMBRE = { Preventive: 'Preventive', Basic: 'Basic', Major: 'Major', Orthodontics: 'Ortho', Other: 'Other' } as const

export function CoverageSummary({
  tabla, limites, className,
}: {
  tabla: Pick<TablaCobertura, 'reglas' | 'maximo' | 'deducible' | 'maximoOrto'>
  /** Suma la línea de máximo anual, deducible y máximo de ortodoncia. */
  limites?: boolean
  className?: string
}) {
  return (
    <span className={cn('flex min-w-0 flex-col gap-1', className)}>
      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[12px]">
        {CLASES.filter((c) => c !== 'Other').map((c) => (
          <span key={c} className="whitespace-nowrap">
            <span className="text-ink-muted">{NOMBRE[c]}</span>{' '}
            <span className="font-semibold text-ink tabular-nums">{porcentajeDeClase(tabla, c)}</span>
          </span>
        ))}
      </span>
      {limites && (
        <span className="text-[11.5px] text-ink-muted tabular-nums">
          Max {maximoTexto(tabla.maximo)} · Deductible {dinero(tabla.deducible)} · Ortho {tabla.maximoOrto ? dinero(tabla.maximoOrto) : 'not covered'}
        </span>
      )}
    </span>
  )
}
