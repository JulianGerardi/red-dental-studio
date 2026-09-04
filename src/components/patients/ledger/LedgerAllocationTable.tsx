import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import { moneda, type Movimiento } from '@/data/ledger'

/* Card "Ledger Transactions" de los modales de Payment y Credit (-)
   Adjustment (Figma 4582:29545, 4582:29862, 4582:30209): la tabla de cargos
   contra los que se puede aplicar el pago o el crédito, con un input de
   "Applied" por fila y el resumen "Amount not applied" / "Amount applied"
   abajo a la derecha.

   El Figma trae columnas que no existen en el resto de la app -Tooth,
   Surface, Guar Estimate-; se usan las que ya tiene `Movimiento` (fecha,
   paciente, provider, código, descripción, monto) en vez de inventar campos
   nuevos sólo para este cuadro. Los números del frame tampoco cuadran entre
   sí -"Applied" en 0.00 pero "Amount applied" en $430.00-, así que acá los
   dos totales salen de lo que se tipea, no de un mock fijo. */
export function LedgerAllocationTable({ cargos }: { cargos: Movimiento[] }) {
  const [aplicado, setAplicado] = useState<Record<string, string>>({})

  const totalCargos = cargos.reduce((a, m) => a + m.monto, 0)
  const totalAplicado = cargos.reduce((a, m) => a + (Number(aplicado[m.id]) || 0), 0)

  return (
    <div className="rounded-lg border border-[#e4e4e7] bg-white p-4 sm:p-5">
      <h2 className="flex items-center gap-2 text-sm font-bold text-[#09090b]">
        <CreditCard className="size-4" /> Ledger Transactions
      </h2>

      {cargos.length === 0 ? (
        <p className="mt-3 text-[13px] text-[#71717a]">No open charges to apply this against.</p>
      ) : (
        <>
          <div className="mt-3 overflow-x-auto">
            <div className="min-w-[960px]">
              <div className="flex h-9 items-center gap-3 border-b border-[#e4e4e7] text-[11px] font-semibold text-[#71717a]">
                <span className="w-[100px] shrink-0">Date</span>
                <span className="w-[110px] shrink-0">Patient</span>
                <span className="w-[140px] shrink-0">Provider</span>
                <span className="w-[70px] shrink-0">Code</span>
                <span className="min-w-[160px] flex-1">Description</span>
                <span className="w-[90px] shrink-0 text-right">Charge</span>
                <span className="w-[100px] shrink-0 text-right">Applied</span>
                <span className="w-[90px] shrink-0 text-right">Balance</span>
              </div>
              {cargos.map((m) => {
                const ap = Number(aplicado[m.id]) || 0
                return (
                  <div key={m.id} className="flex items-center gap-3 border-b border-[#f1f1f4] py-2 text-[13px] text-[#3f3f46] last:border-0">
                    <span className="w-[100px] shrink-0">{m.fecha}</span>
                    <span className="w-[110px] shrink-0 truncate">{m.paciente}</span>
                    <span className="w-[140px] shrink-0 truncate">{m.provider}</span>
                    <span className="text-dash-blue w-[70px] shrink-0 font-medium">{m.codigo}</span>
                    <span className="min-w-[160px] flex-1 truncate text-[#09090b]">{m.descripcion}</span>
                    <span className="w-[90px] shrink-0 text-right font-medium tabular-nums text-[#09090b]">{moneda(m.monto)}</span>
                    <span className="w-[100px] shrink-0 text-right">
                      <input
                        value={aplicado[m.id] ?? ''}
                        onChange={(e) => setAplicado((p) => ({ ...p, [m.id]: e.target.value.replace(/[^0-9.]/g, '') }))}
                        placeholder="0.00"
                        aria-label={`Applied to ${m.descripcion}`}
                        className="focus:border-dash-blue h-8 w-full rounded-md border border-[#e4e4e7] bg-white px-2 text-right text-[13px] tabular-nums placeholder:text-[#a1a1aa] focus:outline-none"
                      />
                    </span>
                    <span className="w-[90px] shrink-0 text-right font-semibold tabular-nums text-[#09090b]">
                      {moneda(Math.max(m.monto - ap, 0))}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <div className="bg-dash-count-bg flex flex-col gap-1.5 rounded-md px-4 py-3 text-[13px]">
              <span className="flex items-center justify-between gap-6">
                <span className="text-[#71717a]">Amount not applied</span>
                <span className="font-semibold tabular-nums text-[#09090b]">{moneda(Math.max(totalCargos - totalAplicado, 0))}</span>
              </span>
              <span className="flex items-center justify-between gap-6">
                <span className="text-[#71717a]">Amount applied</span>
                <span className="text-dash-blue font-semibold tabular-nums">{moneda(totalAplicado)}</span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
