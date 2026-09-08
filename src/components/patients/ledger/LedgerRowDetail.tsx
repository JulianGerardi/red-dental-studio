import { Maximize2 } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { moneda, type Movimiento } from '@/data/ledger'

/* Con las filas cargadas de datos, la celda truncada no alcanza: la fila se
   despliega y muestra todo. Ver design-reference/figma/modulos/ledger.md. */

function campos(m: Movimiento & { saldo?: number }) {
  return [
    { label: 'Transaction date', valor: m.fecha },
    { label: 'Patient', valor: m.paciente },
    { label: 'Type', valor: m.tipo },
    { label: 'Code', valor: m.codigo },
    { label: 'Provider', valor: m.provider },
    { label: 'Status', valor: m.estado },
    { label: 'Tooth', valor: m.diente ?? '—' },
    { label: 'Surface', valor: m.superficie ?? '—' },
    { label: 'Amount', valor: moneda(m.monto) },
    ...(m.saldo !== undefined ? [{ label: 'Balance', valor: moneda(m.saldo) }] : []),
  ]
}

function Campos({ m }: { m: Movimiento & { saldo?: number } }) {
  return (
    <>
      <div>
        <dt className="text-[11px] font-medium text-[#71717a]">Description</dt>
        <dd className="mt-0.5 text-[13px] text-[#09090b]">{m.descripcion}</dd>
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        {campos(m).map(({ label, valor }) => (
          <div key={label}>
            <dt className="text-[11px] font-medium text-[#71717a]">{label}</dt>
            <dd className="mt-0.5 text-[13px] break-words text-[#09090b]">{valor}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export function LedgerRowDetail({
  m, onVerTodo,
}: {
  m: Movimiento & { saldo?: number }
  onVerTodo: () => void
}) {
  return (
    <div className="border-t border-[#e7e7e7] bg-[#fafafa] px-3 py-3">
      <Campos m={m} />
      <button
        type="button"
        onClick={onVerTodo}
        className="text-dash-blue mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold hover:underline"
      >
        <Maximize2 className="size-3.5" /> View full record
      </button>
    </div>
  )
}

export function LedgerRowModal({
  m, onClose,
}: {
  m: Movimiento & { saldo?: number }
  onClose: () => void
}) {
  return (
    <ModalShell
      title={m.descripcion}
      onClose={onClose}
      width="max-w-[620px]"
      /* Sólo lectura: un Close, no el par Cancel/Save que implicaría que
         hay algo para guardar. */
      footer={(
        <button
          type="button"
          onClick={onClose}
          className="h-9 shrink-0 rounded-md border border-[#e4e4e7] bg-white px-6 text-[13px] font-medium hover:bg-[#fafafa]"
        >
          Close
        </button>
      )}
    >
      <Campos m={m} />
    </ModalShell>
  )
}
