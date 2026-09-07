import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { moneda, type Movimiento } from '@/data/ledger'

/* Card "Ledger Transactions" de los modales de Payment y Credit (-)
   Adjustment (Figma 4582:29618, 4582:30251): la tabla de cargos contra los
   que se puede aplicar el pago o el crédito, con un input de "Applied" por
   fila y el resumen "Amount not applied" / "Amount applied" abajo a la
   derecha.

   Las doce columnas del frame -Transaction Date, Patient, Provider, Tooth,
   Surface, Code, Description, Charge, Other Credit, Guar Estimate, Applied,
   Balance- van todas. La primera versión las había recortado a ocho por no
   tener Tooth/Surface/Other Credit/Guar Estimate en ningún otro lado de la
   app; el pedido fue explícito en no achicar la tabla, así que ahora
   `diente`/`superficie` viven en `Movimiento` (sólo en los cargos donde
   aplican -una limpieza no tiene diente, una corona sí-) y "Other
   Credit"/"Guar Estimate" se calculan por código: D0/D1 (diagnóstico y
   preventivo) los cubre el seguro al 100%; el resto, a mitad -mismo criterio
   real de cobertura dental, no un número inventado por fila-.

   Las ocho filas del frame repiten literalmente la misma persona/código
   -Brent Crosby, D7450, "Remove Ben. O..."- ocho veces: es una fila de
   prueba pegada en loop, no contenido real. Se listan los cargos reales de
   la cuenta en su lugar, como ya se documentó. */
function coberturaSeguro(codigo: string) {
  const categoria = codigo.charAt(1)
  return categoria === '0' || categoria === '1' ? 1 : 0.5
}

const COLS = {
  fecha: 'w-[90px]',
  paciente: 'w-[100px]',
  provider: 'w-[130px]',
  diente: 'w-[55px]',
  superficie: 'w-[60px]',
  codigo: 'w-[60px]',
  desc: 'min-w-[160px] flex-1',
  charge: 'w-[80px] text-right',
  otroCredito: 'w-[90px] text-right',
  guarEstimado: 'w-[95px] text-right',
  applied: 'w-[90px] text-right',
  balance: 'w-[85px] text-right',
}

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
            <div className="min-w-[1280px]">
              <div className="flex h-9 items-center gap-3 border-b border-[#e4e4e7] text-[11px] font-semibold text-[#71717a]">
                <span className={cn(COLS.fecha, 'shrink-0')}>Transaction Date</span>
                <span className={cn(COLS.paciente, 'shrink-0')}>Patient</span>
                <span className={cn(COLS.provider, 'shrink-0')}>Provider</span>
                <span className={cn(COLS.diente, 'shrink-0')}>Tooth</span>
                <span className={cn(COLS.superficie, 'shrink-0')}>Surface</span>
                <span className={cn(COLS.codigo, 'shrink-0')}>Code</span>
                <span className={COLS.desc}>Description</span>
                <span className={cn(COLS.charge, 'shrink-0')}>Charge</span>
                <span className={cn(COLS.otroCredito, 'shrink-0')}>Other Credit</span>
                <span className={cn(COLS.guarEstimado, 'shrink-0')}>Guar Estimate</span>
                <span className={cn(COLS.applied, 'shrink-0')}>Applied</span>
                <span className={cn(COLS.balance, 'shrink-0')}>Balance</span>
              </div>
              {cargos.map((m) => {
                const ap = Number(aplicado[m.id]) || 0
                const cobertura = coberturaSeguro(m.codigo)
                const otroCredito = m.monto * cobertura
                const guarEstimado = m.monto - otroCredito
                return (
                  <div key={m.id} className="flex items-center gap-3 border-b border-[#f1f1f4] py-2 text-[13px] text-[#3f3f46] last:border-0">
                    <span className={cn(COLS.fecha, 'shrink-0')}>{m.fecha}</span>
                    <span className={cn(COLS.paciente, 'shrink-0 truncate')}>{m.paciente}</span>
                    <span className={cn(COLS.provider, 'shrink-0 truncate')}>{m.provider}</span>
                    <span className={cn(COLS.diente, 'shrink-0')}>{m.diente ?? '-'}</span>
                    <span className={cn(COLS.superficie, 'shrink-0')}>{m.superficie ?? '-'}</span>
                    <span className={cn(COLS.codigo, 'text-dash-blue shrink-0 font-medium')}>{m.codigo}</span>
                    <span className={cn(COLS.desc, 'truncate text-[#09090b]')}>{m.descripcion}</span>
                    <span className={cn(COLS.charge, 'shrink-0 font-medium tabular-nums text-[#09090b]')}>{moneda(m.monto)}</span>
                    <span className={cn(COLS.otroCredito, 'shrink-0 tabular-nums')}>{moneda(otroCredito)}</span>
                    <span className={cn(COLS.guarEstimado, 'shrink-0 tabular-nums')}>{moneda(guarEstimado)}</span>
                    <span className={cn(COLS.applied, 'shrink-0')}>
                      <input
                        value={aplicado[m.id] ?? ''}
                        onChange={(e) => setAplicado((p) => ({ ...p, [m.id]: e.target.value.replace(/[^0-9.]/g, '') }))}
                        placeholder="0.00"
                        aria-label={`Applied to ${m.descripcion}`}
                        className="focus:border-dash-blue h-8 w-full rounded-md border border-[#e4e4e7] bg-white px-2 text-right text-[13px] tabular-nums placeholder:text-[#a1a1aa] focus:outline-none"
                      />
                    </span>
                    <span className={cn(COLS.balance, 'shrink-0 font-semibold tabular-nums text-[#09090b]')}>
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
