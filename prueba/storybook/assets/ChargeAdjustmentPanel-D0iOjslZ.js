import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import {
  TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { GUARANTOR, DEPENDIENTES, type Movimiento } from '@/data/ledger'

/* Figma 4582:25840. Título "New Credit (+) Adjustment" a propósito, ver
   design-reference/figma/modulos/ledger.md. */

const TIPOS_AJUSTE = ['Charge Adjustment', 'Credit Adjustment']
const PROVIDERS = ['Dr. Elena Martinez', 'Dr. Emily Chen', 'Dr. Salgado']

export function ChargeAdjustmentPanel({
  cargosVisita, onCancelar, onGuardar,
}: {
  /** Cargos existentes para armar las opciones de "Visit date". */
  cargosVisita: Movimiento[]
  onCancelar: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const personas = [GUARANTOR, ...DEPENDIENTES]
  const visitas = cargosVisita.map((m) => \`\${m.fecha}, \${m.paciente}, \${m.codigo !== '—' ? m.codigo : m.descripcion}, $\${m.monto.toFixed(2)}\`)

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
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <CreditCard className="size-4" /> Adjustment Information
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex w-full flex-col gap-2 sm:w-[200px]">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <TextField
            label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto}
            error={intentado && !monto.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[160px]"
          />
          <SelectField label="Type" required options={TIPOS_AJUSTE} value={tipo} onChange={setTipo} className="w-full sm:w-[200px]" />
          <SelectField label="Provider" options={PROVIDERS} value={provider} onChange={setProvider} className="w-full sm:w-[200px]" />
          <SelectField
            label="Apply to" required options={personas} value={aplicaA} onChange={setAplicaA}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[200px]"
          />
          <SelectField label="Visit date" options={visitas} value={visita} onChange={setVisita} className="w-full sm:w-[320px]" />
        </div>
        <TextArea className="mt-4" label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />
      </div>

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={onCancelar} onSave={guardar} />
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};