import { cn } from '@/lib/utils'
import { moneda, fechaCorta } from '@/data/ledger'
import { limpiarImporte, numero, type CargoAbierto } from '@/lib/ledgerAplicacion'

/* "Ledger Transactions" de Patient Payment y Credit Adjustment, como red.dev (videos de Julián, 2026-11-19): los cargos
   abiertos con su Charge, Other Credit y Guar Estimate, el Applied que se edita y el Balance que queda. El reparto es
   del más viejo al más nuevo (CON-3738, CON-3739) y lo calcula el formulario; acá se dibuja y se edita. Mientras se
   recargan los cargos (al cambiar Apply to) las filas son un esqueleto. Ver design-reference/figma/modulos/ledger.md. */

const COLUMNAS = 'grid-cols-[88px_minmax(84px,1fr)_minmax(90px,1fr)_64px_minmax(120px,1.5fr)_88px_96px_100px_108px_88px]'

export function LedgerAllocationTable({
  cargos, aplicado, onAplicado, cargando, aplicadoTotal, noAplicado, error,
}: {
  cargos: CargoAbierto[]
  /** Lo tipeado en cada línea (id → texto). */
  aplicado: Record<string, string>
  onAplicado: (id: string, valor: string) => void
  /** Se están cargando los cargos del alcance elegido. */
  cargando?: boolean
  aplicadoTotal: number
  noAplicado: number
  /** Lo que no cierra de la distribución (línea o total de más). */
  error?: string
}) {
  const celda = 'flex min-w-0 items-center px-3'
  const derecha = 'justify-end text-right tabular-nums'
  return (
    <section aria-label="Ledger Transactions" className="flex flex-col gap-3">
      <h2 className="text-sm font-bold text-ink">Ledger Transactions</h2>
      <div className="overflow-x-auto rounded-lg border border-line bg-white" aria-busy={cargando || undefined}>
        <div className="min-w-[940px]">
          <div className={cn('grid bg-surface-alt py-2.5 text-[12px] font-semibold text-ink-muted', COLUMNAS)}>
            {['Txn date', 'Patient', 'Provider', 'Code', 'Description'].map((t) => <span key={t} className={celda}>{t}</span>)}
            {['Charge', 'Other Credit', 'Guar Estimate', 'Applied', 'Balance'].map((t) => <span key={t} className={cn(celda, 'justify-end text-right')}>{t}</span>)}
          </div>

          {cargando ? (
            [0, 1, 2].map((i) => (
              <div key={i} aria-hidden className={cn('grid h-[52px] items-center border-t border-line-row', COLUMNAS)}>
                {Array.from({ length: 10 }, (_, k) => (
                  <span key={k} className="px-3"><span className="block h-3 w-full max-w-24 animate-pulse rounded bg-surface-muted" /></span>
                ))}
              </div>
            ))
          ) : cargos.length === 0 ? (
            <p className="border-t border-line-row px-4 py-5 text-[13px] text-ink-muted">No open transactions to apply this against: the full amount stays as unapplied credit.</p>
          ) : (
            cargos.map((c) => {
              const ap = numero(aplicado[c.id])
              const excedido = ap > c.guarantor + 0.001
              return (
                <div key={c.id} className={cn('grid min-h-[52px] items-center border-t border-line-row py-1.5 text-[13px] text-ink-soft', COLUMNAS)}>
                  <span className={celda}>{fechaCorta(c.fecha)}</span>
                  <span className={cn(celda, 'text-ink')} title={c.paciente}><span className="truncate">{c.paciente}</span></span>
                  <span className={celda} title={c.provider}><span className="truncate">{c.provider}</span></span>
                  <span className={cn(celda, 'font-mono text-[12px]')}>{c.codigo === '—' ? '–' : c.codigo}</span>
                  <span className={celda} title={c.descripcion}><span className="truncate">{c.descripcion}</span></span>
                  <span className={cn(celda, derecha, 'font-semibold text-ink')}>{moneda(c.cargo)}</span>
                  <span className={cn(celda, derecha)}>{moneda(c.otroCredito)}</span>
                  <span className={cn(celda, derecha)}>{moneda(c.guarantor)}</span>
                  <span className={cn(celda, 'justify-end')}>
                    <input
                      value={aplicado[c.id] ?? ''}
                      onChange={(e) => onAplicado(c.id, limpiarImporte(e.target.value))}
                      inputMode="decimal"
                      placeholder="0.00"
                      aria-label={`Applied to ${c.descripcion}`}
                      aria-invalid={excedido || undefined}
                      className={cn(
                        'h-8 w-full rounded-md border bg-white px-2 text-right text-[13px] tabular-nums shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none',
                        excedido ? 'border-field-error' : 'border-line focus:border-dash-blue',
                      )}
                    />
                  </span>
                  <span className={cn(celda, derecha, 'font-semibold text-ink')}>{moneda(Math.max(c.guarantor - ap, 0))}</span>
                </div>
              )
            })
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row bg-surface-subtle px-4 py-3">
            <span className="text-[12px] font-semibold text-ink-muted">
              Showing {cargando ? '…' : cargos.length} open {cargos.length === 1 ? 'transaction' : 'transactions'}
            </span>
            <dl className="w-fit overflow-hidden rounded-md border border-line bg-white text-[13px]">
              <div className="flex items-center">
                <dt className="w-36 bg-surface-alt px-3 py-2 text-right font-medium text-ink-soft">Amount not applied</dt>
                <dd className="w-24 px-3 py-2 text-right font-semibold tabular-nums text-ink">{moneda(noAplicado)}</dd>
              </div>
              <div className="flex items-center border-t border-line">
                <dt className="w-36 bg-surface-alt px-3 py-2 text-right font-medium text-ink-soft">Amount applied</dt>
                <dd className="w-24 px-3 py-2 text-right font-semibold tabular-nums text-dash-blue">{moneda(aplicadoTotal)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      {error && <p role="alert" className="text-[12px] font-medium text-field-error">{error}</p>}
    </section>
  )
}
