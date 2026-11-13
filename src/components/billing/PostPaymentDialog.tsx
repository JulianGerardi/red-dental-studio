import { DrawerActions, DrawerStep } from '@/components/ui/drawer'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import {
  ModalShell, TextField, SelectField, TextArea, FieldLabel,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { type Movimiento } from '@/data/ledger'
import {
  cargosAbiertos, grupoDeGarante, HOY_BILLING, METODOS_PAGO, PROVIDERS_BILLING, TIPOS_AJUSTE_CARGO, TIPOS_AJUSTE_CREDITO,
  type TipoAjusteBilling,
} from '@/data/billing'
import { formatMDY } from '@/lib/fecha'

/* Cada botón de Billing abre su drawer, como red.dev: New Patient Payment (-), Credit Adjustment (-) y Enter Charge (+)
   Adjustment, con los campos y las listas de cada uno (billing.md, 2026-11-13). Reemplaza al "Post payment" único del
   Figma, que elegía el tipo adentro. */

const TITULO: Record<TipoAjusteBilling, string> = {
  'Patient Payment': 'New Patient Payment (-)',
  'Credit Adjustment': 'Credit Adjustment (-)',
  'Charge Adjustment': 'Enter Charge (+) Adjustment',
}
const REQUERIDO = 'This field is required.'
const CHEQUE = 'Check Payment'

type Metodo = { id: number; monto: string; metodo: string; cheque: string; banco: string }
const filaVacia = (id: number): Metodo => ({ id, monto: '', metodo: METODOS_PAGO[0], cheque: '', banco: '' })
const [mes, dia, anio] = HOY_BILLING.split('/').map(Number)
const hoy = () => new Date(anio, mes - 1, dia)

export function PostPaymentDialog({
  tipoInicial, pacienteInicial, onClose, onGuardar,
}: {
  tipoInicial: TipoAjusteBilling
  /** El paciente elegido en Billing: los botones sólo aparecen con uno. */
  pacienteInicial?: string
  onClose: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const tipo = tipoInicial
  /* Apply to: el paciente y los demás de su garante, como red.dev. */
  const personas = pacienteInicial ? grupoDeGarante(pacienteInicial).map((p) => p.nombre) : []
  const [fecha, setFecha] = useState<Date | null>(hoy)
  const [aplicaA, setAplicaA] = useState(pacienteInicial ?? personas[0] ?? '')
  const [metodos, setMetodos] = useState<Metodo[]>([filaVacia(0)])
  const [monto, setMonto] = useState('')
  const [ajuste, setAjuste] = useState<string>(tipo === 'Charge Adjustment' ? TIPOS_AJUSTE_CARGO[0] : TIPOS_AJUSTE_CREDITO[0])
  const [provider, setProvider] = useState('')
  const [visita, setVisita] = useState('')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)
  const [paso, setPaso] = useState(0)

  const cargos = cargosAbiertos(aplicaA)
  const visitas = [...new Set(cargos.map((c) => `Visit - ${c.fecha}`))]
  const setFila = (id: number, cambios: Partial<Metodo>) => setMetodos((p) => p.map((f) => (f.id === id ? { ...f, ...cambios } : f)))

  const faltaAlgo = !fecha || !aplicaA || (tipo === 'Patient Payment'
    ? metodos.some((f) => !f.monto.trim() || (f.metodo === CHEQUE && (!f.cheque.trim() || !f.banco.trim())))
    : !monto.trim())
  const siguiente = () => {
    setIntentado(true)
    if (faltaAlgo) return
    setIntentado(false)
    setPaso(1)
  }

  const guardar = () => {
    setIntentado(true)
    if (faltaAlgo || !fecha) { setPaso(0); return }
    const base = { fecha: formatMDY(fecha), paciente: aplicaA, codigo: '—', estado: 'Posted' as const }
    if (tipo === 'Patient Payment') {
      metodos.forEach((f) => {
        const valor = Number(f.monto) || 0
        onGuardar({
          ...base, provider: 'Front desk', tipo: 'Payment', monto: -valor,
          descripcion: f.metodo === CHEQUE ? `Check Payment #${f.cheque}` : f.metodo,
          metodos: [{ metodo: f.metodo, monto: valor, ...(f.metodo === CHEQUE ? { ref: `#${f.cheque}` } : {}) }],
        })
      })
      return
    }
    const valor = Number(monto) || 0
    onGuardar({
      ...base, descripcion: ajuste, tipo: 'Adjustment',
      provider: tipo === 'Charge Adjustment' ? provider || 'Front desk' : 'Front desk',
      monto: tipo === 'Charge Adjustment' ? valor : -valor,
    })
  }

  const campoFecha = (
    <div className="flex flex-col gap-2">
      <FieldLabel required>Transaction date</FieldLabel>
      <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
    </div>
  )
  const campoAplica = (
    <SelectField label="Apply to" required options={personas} value={aplicaA} onChange={setAplicaA} error={intentado && !aplicaA ? REQUERIDO : undefined} />
  )
  const campoMonto = (
    <TextField label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto} error={intentado && !monto.trim() ? REQUERIDO : undefined} />
  )
  const campoNotas = <TextArea label="Notes" placeholder="Add a note (optional)" value={notas} onChange={setNotas} />

  /* Enter Charge (+) Adjustment no se aplica a cargos: una sola sección, sin pasos (red.dev). */
  if (tipo === 'Charge Adjustment') {
    return (
      <ModalShell title={TITULO[tipo]} onClose={onClose} actions={<DrawerActions onCancel={onClose} onSave={guardar} />}>
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {campoFecha}
            {campoMonto}
            <SelectField label="Type" required options={[...TIPOS_AJUSTE_CARGO]} value={ajuste} onChange={setAjuste} />
            <SelectField label="Provider" placeholder="Select" options={[...PROVIDERS_BILLING]} value={provider} onChange={setProvider} />
            {campoAplica}
            <SelectField label="Visit date" placeholder="Select" options={visitas} value={visita} onChange={setVisita} />
          </div>
          {campoNotas}
        </div>
      </ModalShell>
    )
  }

  /* Pago y crédito: los datos y después a qué cargos abiertos se aplica (Ledger Transactions), en dos pasos. */
  return (
    <ModalShell
      title={TITULO[tipo]} onClose={onClose} width="max-w-[1000px]"
      steps={[tipo === 'Patient Payment' ? 'Payment' : 'Adjustment', 'Allocation']} step={paso}
      actions={<DrawerActions step={paso} total={2} onNext={siguiente} onBack={() => setPaso(0)} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso} className="flex flex-col gap-4">
        {/* Campos de a dos y del mismo ancho (Components / UI / Drawer → Specs → Fields). */}
        {/* Con pago, el hueco de la derecha es el del botón + / −: las columnas quedan alineadas con las de los métodos. */}
        <div className="flex items-start gap-2">
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            {campoFecha}
            {campoAplica}
            {tipo === 'Credit Adjustment' && (
              <>
                <SelectField label="Adjustment type" required options={[...TIPOS_AJUSTE_CREDITO]} value={ajuste} onChange={setAjuste} />
                {campoMonto}
              </>
            )}
          </div>
          {tipo === 'Patient Payment' && <span aria-hidden className="w-9 shrink-0" />}
        </div>
        {/* Un pago puede venir en varios métodos: + suma otro, − lo saca (red.dev). Cheque pide número y banco. */}
        {tipo === 'Patient Payment' && metodos.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2">
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Amount" required placeholder="$ 0.00" value={f.monto} onChange={(v) => setFila(f.id, { monto: v })}
                error={intentado && !f.monto.trim() ? REQUERIDO : undefined}
              />
              <SelectField label="Payment method" required options={[...METODOS_PAGO]} value={f.metodo} onChange={(v) => setFila(f.id, { metodo: v })} />
              {f.metodo === CHEQUE && (
                <>
                  <TextField label="Check" required placeholder="1234" value={f.cheque} onChange={(v) => setFila(f.id, { cheque: v })} error={intentado && !f.cheque.trim() ? REQUERIDO : undefined} />
                  <TextField label="Bank/Branch" required placeholder="AE9323AMB" value={f.banco} onChange={(v) => setFila(f.id, { banco: v })} error={intentado && !f.banco.trim() ? REQUERIDO : undefined} />
                </>
              )}
            </div>
            {i === metodos.length - 1 ? (
              <button
                type="button"
                aria-label="Add another payment method"
                onClick={() => setMetodos((p) => [...p, filaVacia(Math.max(...p.map((x) => x.id)) + 1)])}
                className="mt-7 flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-dash-ring"
              >
                <Plus className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                aria-label="Remove this payment method"
                onClick={() => setMetodos((p) => p.filter((x) => x.id !== f.id))}
                className="mt-7 flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-dash-bad-bg hover:text-dash-bad-fg focus-visible:outline-2 focus-visible:outline-dash-ring"
              >
                <Minus className="size-4" />
              </button>
            )}
          </div>
        ))}
        {campoNotas}
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <LedgerAllocationTable cargos={cargos} />
      </DrawerStep>
    </ModalShell>
  )
}
