import { useMemo, useState } from 'react'
import { CreditCard } from 'lucide-react'
import {
  TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { GUARANTOR, DEPENDIENTES, type Movimiento } from '@/data/ledger'

/* Figma 4582:30209. "Amount" es texto libre por elección, ver
   design-reference/figma/modulos/ledger.md. */

const TIPOS_AJUSTE = ['Credit Adjustment', 'Charge Adjustment']

export function CreditAdjustmentPanel({
  cargos, onCancelar, onGuardar,
}: {
  /** Todos los cargos de la cuenta, para armar la tabla de aplicación. */
  cargos: Movimiento[]
  onCancelar: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const personas = [GUARANTOR, ...DEPENDIENTES]
  const [fecha, setFecha] = useState<Date | null>(null)
  const [monto, setMonto] = useState('')
  const [tipo, setTipo] = useState(TIPOS_AJUSTE[0])
  const [aplicaA, setAplicaA] = useState(personas[0])
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const cargosAplicables = useMemo(
    () => cargos.filter((m) => m.tipo === 'Charge' && m.paciente === aplicaA),
    [cargos, aplicaA],
  )

  const guardar = () => {
    setIntentado(true)
    if (!fecha || !monto.trim() || !aplicaA.trim()) return
    const valor = Number(monto) || 0
    onGuardar({
      fecha: fecha.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      paciente: aplicaA,
      codigo: '—',
      descripcion: tipo,
      provider: 'Front desk',
      tipo: tipo === 'Charge Adjustment' ? 'Charge' : 'Adjustment',
      monto: tipo === 'Charge Adjustment' ? valor : -valor,
      estado: 'Posted',
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-[#e4e4e7] bg-white p-4 sm:p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#09090b]">
          <CreditCard className="size-4" /> Credit Information
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <TextField
            label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto}
            error={intentado && !monto.trim() ? 'This field is required.' : undefined}
          />
          <SelectField label="Type" required options={TIPOS_AJUSTE} value={tipo} onChange={setTipo} />
          <SelectField
            label="Apply to" required options={personas} value={aplicaA} onChange={setAplicaA}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
          />
        </div>
        <TextArea className="mt-4" label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />
      </div>

      <LedgerAllocationTable cargos={cargosAplicables} />

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={onCancelar} onSave={guardar} />
      </div>
    </div>
  )
}
