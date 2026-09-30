import { useMemo, useState } from 'react'
import { CreditCard, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { GUARANTOR, DEPENDIENTES, type Movimiento } from '@/data/ledger'

/* Figma 4582:29545 / 4582:29862. Ver design-reference/figma/modulos/ledger.md. */

const METODOS = ['Check payment', 'Card payment', 'Cash payment', 'Electronic payment']

type Metodo = { id: number; monto: string; metodo: string; cheque: string; banco: string }
const filaVacia = (id: number): Metodo => ({ id, monto: '', metodo: METODOS[0], cheque: '', banco: '' })

export function PatientPaymentPanel({
  cargos, onCancelar, onGuardar,
}: {
  cargos: Movimiento[]
  onCancelar: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const personas = [GUARANTOR, ...DEPENDIENTES]
  const [fecha, setFecha] = useState<Date | null>(null)
  const [aplicaA, setAplicaA] = useState(personas[0])
  const [metodos, setMetodos] = useState<Metodo[]>([filaVacia(0)])
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const cargosAplicables = useMemo(
    () => cargos.filter((m) => m.tipo === 'Charge' && m.paciente === aplicaA),
    [cargos, aplicaA],
  )

  const setFila = (id: number, cambios: Partial<Metodo>) =>
    setMetodos((p) => p.map((f) => (f.id === id ? { ...f, ...cambios } : f)))

  const guardar = () => {
    setIntentado(true)
    const faltaAlgo = !fecha || !aplicaA.trim()
      || metodos.some((f) => !f.monto.trim() || (f.metodo === 'Check payment' && (!f.cheque.trim() || !f.banco.trim())))
    if (faltaAlgo) return

    const fechaTxt = fecha.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    metodos.forEach((f) => {
      const valor = Number(f.monto) || 0
      onGuardar({
        fecha: fechaTxt,
        paciente: aplicaA,
        codigo: '—',
        descripcion: f.metodo === 'Check payment' ? `Check Payment #${f.cheque}` : f.metodo.replace('payment', 'Payment'),
        provider: 'Front desk',
        tipo: 'Payment',
        monto: -valor,
        estado: 'Posted',
      })
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <CreditCard className="size-4" /> Payment Information
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex w-full flex-col gap-2 sm:w-[200px]">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <SelectField
            label="Apply to" required options={personas} value={aplicaA} onChange={setAplicaA}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[200px]"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {metodos.map((f, i) => (
            <div key={f.id} className="flex items-start gap-2">
              <div className={cn(f.metodo === 'Check payment' ? 'sm:grid-cols-4' : 'sm:grid-cols-2', 'grid flex-1 grid-cols-1 gap-4')}>
                <TextField
                  label="Amount" required placeholder="$ 0.00" value={f.monto} onChange={(v) => setFila(f.id, { monto: v })}
                  error={intentado && !f.monto.trim() ? 'Required.' : undefined}
                />
                <SelectField label="Payment method" required options={METODOS} value={f.metodo} onChange={(v) => setFila(f.id, { metodo: v })} />
                {f.metodo === 'Check payment' && (
                  <>
                    <TextField
                      label="Check" required placeholder="1234" value={f.cheque} onChange={(v) => setFila(f.id, { cheque: v })}
                      error={intentado && !f.cheque.trim() ? 'Required.' : undefined}
                    />
                    <TextField
                      label="Bank/Branch" required placeholder="AE9323AMB" value={f.banco} onChange={(v) => setFila(f.id, { banco: v })}
                      error={intentado && !f.banco.trim() ? 'Required.' : undefined}
                    />
                  </>
                )}
              </div>
              {i === metodos.length - 1 ? (
                <button
                  type="button"
                  aria-label="Add another payment method"
                  onClick={() => setMetodos((p) => [...p, filaVacia(Math.max(0, ...p.map((x) => x.id)) + 1)])}
                  className="mt-7 flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-surface-muted"
                >
                  <Plus className="size-4" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Remove this payment method"
                  onClick={() => setMetodos((p) => p.filter((x) => x.id !== f.id))}
                  className="mt-7 flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-dash-bad-bg hover:text-dash-bad-fg"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          ))}
        </div>

      </div>

      <LedgerAllocationTable cargos={cargosAplicables} />

      <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
        <TextArea label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />
      </div>

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={onCancelar} onSave={guardar} />
      </div>
    </div>
  )
}
