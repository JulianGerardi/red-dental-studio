import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { moneda, fechaCorta, type Movimiento } from '@/data/ledger'
import { EmptyState } from '@/components/ui/empty-state'
import { Receipt } from 'lucide-react'

/* Ledger Transactions de los drawers de pago y crédito, como red.dev (ledger.md, 2026-11-19): los cargos abiertos de
   quien se elige en Apply to. Other Credit es lo que ya se le aplicó al cargo y Guar Estimate lo que falta; Applied es
   lo que este pago o crédito le aplica y Balance lo que queda. Sin Columns, sin filas que se despliegan y sin paginado. */

/** Un cargo abierto: el movimiento original y lo que falta pagar. */
export type CargoAbierto = Movimiento & { pendiente: number }

/** Reparte un monto entre los cargos, del más viejo al más nuevo, sin pasarse de lo que falta de cada uno. */
export function repartirPendiente(cargos: CargoAbierto[], monto: number): Record<string, string> {
  const fecha = (m: Movimiento) => new Date(m.fecha).getTime() || 0
  let resto = Math.round(monto * 100) / 100
  const out: Record<string, string> = {}
  for (const m of [...cargos].sort((a, b) => fecha(a) - fecha(b))) {
    if (resto <= 0) break
    const va = Math.min(resto, m.pendiente)
    out[m.id] = va.toFixed(2)
    resto = Math.round((resto - va) * 100) / 100
  }
  return out
}

const TH = 'px-2.5 py-2.5 text-left text-[11px] font-semibold whitespace-nowrap text-ink-muted'
const TD = 'px-2.5 py-2 text-[12px] whitespace-nowrap text-ink-soft'

export function TransaccionesAbiertas({ cargos, aplicado, onAplicado, monto }: {
  cargos: CargoAbierto[]
  aplicado: Record<string, string>
  onAplicado: (id: string, valor: string) => void
  /** El monto del pago o del crédito: lo que no se aplica queda como crédito sin aplicar. */
  monto: number
}) {
  const totalAplicado = cargos.reduce((a, m) => a + (Number(aplicado[m.id]) || 0), 0)
  return (
    <section aria-labelledby="ledger-transactions" className="flex flex-col gap-3">
      <h3 id="ledger-transactions" className="text-sm font-bold text-ink">Ledger Transactions</h3>
      <div className="overflow-hidden rounded-lg border border-line-row bg-white">
        <div className="overflow-x-auto">
          {/* Anchos fijos: entra entera en el drawer y Description se queda con lo que sobra, truncada. */}
          <table className="w-full min-w-[860px] table-fixed border-collapse">
            <colgroup>
              <col className="w-[88px]" /><col className="w-[108px]" /><col className="w-[108px]" /><col className="w-[60px]" />
              <col /><col className="w-[84px]" /><col className="w-[88px]" /><col className="w-[100px]" />
              <col className="w-[100px]" /><col className="w-[80px]" />
            </colgroup>
            <thead className="bg-surface-alt">
              <tr>
                <th className={TH}>Txn date</th>
                <th className={TH}>Patient</th>
                <th className={TH}>Provider</th>
                <th className={TH}>Code</th>
                <th className={TH}>Description</th>
                <th className={\`\${TH} text-right\`}>Charge</th>
                <th className={\`\${TH} text-right\`}>Other Credit</th>
                <th className={\`\${TH} text-right\`}>Guar Estimate</th>
                <th className={\`\${TH} text-right\`}>Applied</th>
                <th className={\`\${TH} text-right\`}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {cargos.map((m) => {
                const ap = Number(aplicado[m.id]) || 0
                return (
                  <tr key={m.id} className="border-t border-line-row">
                    <td className={TD}>{fechaCorta(m.fecha)}</td>
                    <td className={\`\${TD} truncate text-ink\`} title={m.paciente}>{m.paciente}</td>
                    <td className={\`\${TD} truncate\`} title={m.provider}>{m.provider || '-'}</td>
                    <td className={\`\${TD} font-medium\`}>{m.codigo && m.codigo !== '—' ? m.codigo : '–'}</td>
                    <td className={\`\${TD} truncate text-ink\`} title={m.descripcion}>{m.descripcion}</td>
                    <td className={\`\${TD} text-right font-semibold tabular-nums text-ink\`}>{moneda(m.monto)}</td>
                    <td className={\`\${TD} text-right tabular-nums text-ink-muted\`}>{moneda(m.monto - m.pendiente)}</td>
                    <td className={\`\${TD} text-right tabular-nums text-ink-muted\`}>{moneda(m.pendiente)}</td>
                    <td className={\`\${TD} text-right\`}>
                      <input
                        value={aplicado[m.id] ?? ''}
                        onChange={(e) => {
                          const limpio = e.target.value.replace(/[^0-9.]/g, '')
                          const n = Number(limpio)
                          onAplicado(m.id, Number.isFinite(n) && n > m.pendiente ? String(m.pendiente) : limpio)
                        }}
                        inputMode="decimal"
                        placeholder="0.00"
                        aria-label={\`Applied to \${m.descripcion}\`}
                        className="focus:border-dash-blue h-8 w-[84px] rounded-md border border-line bg-white px-2 text-center text-[12px] tabular-nums placeholder:text-ink-faint focus:outline-none"
                      />
                    </td>
                    <td className={\`\${TD} text-right font-semibold tabular-nums text-ink\`}>{moneda(Math.max(m.pendiente - ap, 0))}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {cargos.length === 0 && (
            <EmptyState icon={Receipt} title="No open transactions" detail="What you post stays as unapplied credit." className="border-0 py-8" />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row bg-surface-subtle px-4 py-3">
          <span className="text-[12px] text-ink-muted">Showing {cargos.length} open transactions</span>
          <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 rounded-md border border-line bg-white px-3 py-2 text-[12px]">
            <dt className="font-medium text-ink-muted">Amount not applied</dt>
            <dd className="text-right font-semibold tabular-nums text-ink">{moneda(Math.max(monto - totalAplicado, 0))}</dd>
            <dt className="font-medium text-ink-muted">Amount applied</dt>
            <dd className="text-right font-semibold tabular-nums text-ink">{moneda(totalAplicado)}</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
`})))()}export{n,i as r,r as t};