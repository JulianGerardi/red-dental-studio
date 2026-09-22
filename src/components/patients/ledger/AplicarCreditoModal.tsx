import { useState } from 'react'
import { ModalShell } from '@/components/patients/form'
import { moneda, type Movimiento } from '@/data/ledger'

/* Modal de "Apply credit" (referencia de Julián, no viene del Figma).
   Es de sólo lectura arriba -el origen del crédito y sus propios datos no
   se tocan acá, ya quedaron cargados cuando se creó el Payment/Adjustment-
   y editable sólo en la tabla de abajo, donde se elige a qué cargos
   abiertos mandar lo que todavía no se aplicó. Por eso el encabezado usa
   el mismo patrón dt/dd de sólo-lectura de `LedgerRowModal` (Campos) en vez
   de inputs deshabilitados: son datos, no un formulario a medio llenar. */

function fuenteDeCredito(m: Movimiento) {
  const sufijo = m.descripcion.match(/····\d+/)?.[0]
  const etiqueta = m.tipo === 'Payment' ? 'Pt Payment' : 'Credit Adj'
  return sufijo ? `${etiqueta} ${sufijo}` : m.descripcion
}

export function AplicarCreditoModal({
  m, cargos, onClose, onAplicar,
}: {
  m: Movimiento
  /** Cargos abiertos del mismo paciente -mismo filtro que usan Patient
      Payment y Credit Adjustment para su propia tabla de aplicación. */
  cargos: Movimiento[]
  onClose: () => void
  onAplicar: (montoAplicado: number) => void
}) {
  const disponible = m.creditoDisponible ?? 0
  const [aplicado, setAplicado] = useState<Record<string, string>>({})

  const totalAplicado = cargos.reduce((a, c) => a + (Number(aplicado[c.id]) || 0), 0)
  const restante = Math.max(disponible - totalAplicado, 0)

  /* Tope doble: ni más que el propio saldo del cargo, ni más que lo que
     queda del crédito una vez descontado lo que ya se cargó en las otras
     filas -el mismo patrón de LedgerAllocationTable, con un segundo tope
     porque acá el total compite por una misma bolsa de dinero. */
  const cambiar = (id: string, texto: string, saldoCargo: number) => {
    const limpio = texto.replace(/[^0-9.]/g, '')
    const numero = Number(limpio)
    if (!Number.isFinite(numero)) { setAplicado((p) => ({ ...p, [id]: limpio })); return }
    const otrasFilas = totalAplicado - (Number(aplicado[id]) || 0)
    const maximo = Math.min(saldoCargo, Math.max(disponible - otrasFilas, 0))
    setAplicado((p) => ({ ...p, [id]: numero > maximo ? String(maximo) : limpio }))
  }

  const aplicar = () => {
    if (totalAplicado <= 0) return
    onAplicar(totalAplicado)
  }

  return (
    <ModalShell
      title="Apply unapplied credit"
      onClose={onClose}
      width="max-w-[820px]"
      footer={(
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="h-9 shrink-0 rounded-md border border-[#e4e4e7] bg-white px-6 text-[13px] font-medium hover:bg-[#fafafa]">
            Cancel
          </button>
          <button
            type="button"
            onClick={aplicar}
            disabled={totalAplicado <= 0}
            className="bg-dash-blue hover:bg-dash-blue-hover h-9 shrink-0 rounded-md px-6 text-[13px] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply credit
          </button>
        </div>
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 rounded-lg border border-[#e4d7fb] bg-[#f8f5ff] px-4 py-3">
          <div className="min-w-0">
            <p className="text-[11px] text-[#71717a]">Credit source</p>
            <p className="truncate text-[15px] font-bold text-[#6633a6]">{fuenteDeCredito(m)}</p>
            <p className="mt-0.5 text-[11px] text-[#71717a]">Scope: Patient · {m.paciente}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] text-[#71717a]">Available credit</p>
            <p className="text-[17px] font-bold text-[#6633a6]">{moneda(disponible)}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          <div>
            <dt className="text-[11px] font-medium text-[#71717a]">Transaction date</dt>
            <dd className="mt-0.5 text-[13px] text-[#09090b]">{m.fecha}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium text-[#71717a]">Apply to</dt>
            <dd className="mt-0.5 text-[13px] text-[#09090b]">{m.paciente}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium text-[#71717a]">Credit source</dt>
            <dd className="mt-0.5 text-[13px] text-[#09090b]">{m.tipo === 'Payment' ? 'Patient payment' : 'Credit adjustment'}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium text-[#71717a]">Available amount</dt>
            <dd className="mt-0.5 text-[13px] font-semibold text-[#09090b]">{moneda(disponible)}</dd>
          </div>
        </dl>

        <div className="overflow-hidden rounded-lg border border-[#e4e4e7]">
          <div className="flex items-center justify-between bg-[#f9f9f9] px-3 py-2.5">
            <span className="text-[13px] font-bold text-[#09090b]">Open charges</span>
          </div>

          {cargos.length === 0 ? (
            <p className="px-3 py-6 text-center text-[12px] text-[#71717a]">No open charges to apply this credit against.</p>
          ) : (
            /* overflow-x-auto propio: en mobile los seis anchos fijos no
               entran en 375px, y a diferencia de la tabla del Ledger esto
               vive adentro de un modal, sin el ancho de página completo. */
            <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="flex h-9 items-center gap-3 border-t border-[#e7e7e7] bg-[#f9f9f9] px-3 text-[10px] font-semibold tracking-wide text-[#71717a] uppercase">
                <span className="w-[92px] shrink-0">Date</span>
                <span className="w-[56px] shrink-0">Code</span>
                <span className="min-w-0 flex-1">Description</span>
                <span className="w-[96px] shrink-0 text-right">Charge balance</span>
                <span className="w-[92px] shrink-0 text-right">Applied</span>
                <span className="w-[96px] shrink-0 text-right">Balance after</span>
              </div>
              <div className="max-h-[240px] overflow-y-auto">
                {cargos.map((c) => {
                  const valor = Number(aplicado[c.id]) || 0
                  const despues = Math.max(c.monto - valor, 0)
                  return (
                    <div key={c.id} className="flex items-center gap-3 border-t border-[#f1f1f4] px-3 py-2 text-[12.5px] text-[#3f3f46]">
                      <span className="w-[92px] shrink-0">{c.fecha}</span>
                      <span className="text-dash-blue w-[56px] shrink-0 font-medium">{c.codigo}</span>
                      <span className="min-w-0 flex-1 truncate">{c.descripcion}</span>
                      <span className="w-[96px] shrink-0 text-right tabular-nums">{moneda(c.monto)}</span>
                      <span className="w-[92px] shrink-0">
                        <input
                          value={aplicado[c.id] ?? ''}
                          onChange={(e) => cambiar(c.id, e.target.value, c.monto)}
                          inputMode="decimal"
                          placeholder="0.00"
                          aria-label={`Applied to ${c.descripcion}`}
                          className="focus:border-dash-blue h-7 w-full rounded-md border border-[#e4e4e7] bg-white px-2 text-right text-[12px] tabular-nums placeholder:text-[#a1a1aa] focus:outline-none"
                        />
                      </span>
                      <span className="w-[96px] shrink-0 text-right font-medium tabular-nums">{moneda(despues)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1 border-t border-[#e7e7e7] bg-[#f9f9f9] px-3 py-2.5 text-[12.5px]">
            <span className="text-[#71717a]">Available: <strong className="font-semibold text-[#09090b]">{moneda(disponible)}</strong></span>
            <span className="text-[#71717a]">Applied: <strong className="font-semibold text-[#09090b]">{moneda(totalAplicado)}</strong></span>
            <span className="text-[#71717a]">Remaining: <strong className="font-semibold text-[#09090b]">{moneda(restante)}</strong></span>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}
