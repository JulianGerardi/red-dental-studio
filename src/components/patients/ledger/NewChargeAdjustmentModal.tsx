import { useState } from 'react'
import {
  ModalShell, TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { GUARANTOR, DEPENDIENTES, type Movimiento } from '@/data/ledger'

/* Figma 4582:25840 "Ledger — Credit Adjustment (+) Modal". El botón que lo
   abre dice "Charge Adjustment (+)"; el modal se titula "New Credit (+)
   Adjustment" -así en el frame, no se corrige: es el mismo tipo de
   desajuste de nombres entre botón y título que ya se documentó en
   Locations con "Edit hours"/"New Availability"-. El campo "Type" es el que
   de verdad decide Charge vs Credit, no el título. */

const TIPOS_AJUSTE = ['Charge Adjustment', 'Credit Adjustment']
const PROVIDERS = ['Dr. Elena Martinez', 'Dr. Emily Chen', 'Dr. Salgado']

export function NewChargeAdjustmentModal({
  cargosVisita, onClose, onGuardar,
}: {
  /** Cargos existentes para armar las opciones de "Visit date". */
  cargosVisita: Movimiento[]
  onClose: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const personas = [GUARANTOR, ...DEPENDIENTES]
  const visitas = cargosVisita.map((m) => `${m.fecha}, ${m.paciente}, ${m.codigo !== '—' ? m.codigo : m.descripcion}, $${m.monto.toFixed(2)}`)

  const [fecha, setFecha] = useState<Date | null>(null)
  const [monto, setMonto] = useState('')
  const [tipo, setTipo] = useState(TIPOS_AJUSTE[0])
  const [provider, setProvider] = useState(PROVIDERS[0])
  const [aplicaA, setAplicaA] = useState(personas[0])
  const [visita, setVisita] = useState('')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!fecha || !monto.trim() || !aplicaA.trim()) return
    const valor = Number(monto) || 0
    onGuardar({
      fecha: fecha.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      paciente: aplicaA,
      codigo: '—',
      descripcion: tipo,
      provider,
      tipo: tipo === 'Charge Adjustment' ? 'Charge' : 'Adjustment',
      monto: tipo === 'Charge Adjustment' ? valor : -valor,
      estado: 'Posted',
    })
    onClose()
  }

  return (
    <ModalShell
      title="New Credit (+) Adjustment"
      onClose={onClose}
      width="max-w-[640px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <FieldLabel required>Transaction date</FieldLabel>
          <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
        </div>
        <TextField
          label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto}
          error={intentado && !monto.trim() ? 'This field is required.' : undefined}
        />
        <SelectField label="Type" required options={TIPOS_AJUSTE} value={tipo} onChange={setTipo} />
        <SelectField label="Provider" options={PROVIDERS} value={provider} onChange={setProvider} />
        <SelectField
          label="Apply to" required options={personas} value={aplicaA} onChange={setAplicaA}
          error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
        />
        <SelectField label="Visit date" options={visitas} value={visita} onChange={setVisita} />
      </div>
      <TextArea className="mt-4" label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />
    </ModalShell>
  )
}
