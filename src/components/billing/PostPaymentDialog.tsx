import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import {
  ModalShell, TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { type Movimiento } from '@/data/ledger'
import {
  PACIENTES_BILLING, buscarPacientes, cargosAbiertos, TIPOS_AJUSTE_BILLING, type TipoAjusteBilling,
} from '@/data/billing'

/* Figma 4481:10480 "Post payment", modal sobre el Billing Overview. Ver
   design-reference/figma/modulos/billing.md. Reutiliza el mismo cuerpo que
   CreditAdjustmentPanel (fecha/monto/tipo/apply to + Notes + Ledger
   Transactions), sumando el buscador de paciente que acá hace falta porque
   no hay un paciente ya elegido de antes. */
export function PostPaymentDialog({
  tipoInicial, pacienteInicial, onClose, onGuardar,
}: {
  tipoInicial: TipoAjusteBilling
  pacienteInicial?: string
  onClose: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const [busqueda, setBusqueda] = useState(pacienteInicial ?? '')
  const [buscando, setBuscando] = useState(false)
  const refBusqueda = useRef<HTMLDivElement>(null)
  const [fecha, setFecha] = useState<Date | null>(null)
  const [monto, setMonto] = useState('')
  const [tipo, setTipo] = useState<TipoAjusteBilling>(tipoInicial)
  const [aplicaA, setAplicaA] = useState(pacienteInicial ?? '')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  useEffect(() => {
    if (!buscando) return
    const onDown = (e: MouseEvent) => {
      if (refBusqueda.current && !refBusqueda.current.contains(e.target as Node)) setBuscando(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [buscando])

  const elegirPaciente = (nombre: string) => {
    setAplicaA(nombre)
    setBusqueda(nombre)
    setBuscando(false)
  }

  const cargos = cargosAbiertos(aplicaA)
  const resultados = buscarPacientes(busqueda)

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
      tipo: tipo === 'Patient Payment' ? 'Payment' : 'Adjustment',
      monto: tipo === 'Charge Adjustment' ? valor : -valor,
      estado: 'Posted',
    })
  }

  return (
    <ModalShell title="Post payment" onClose={onClose} width="max-w-[900px]" footer={<FormFooter onCancel={onClose} onSave={guardar} />}>
      <div className="flex flex-col gap-4">
        <div ref={refBusqueda} className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setBuscando(true) }}
            onFocus={() => setBuscando(true)}
            /* Typo tal cual el Figma: "guarantors,phone...." sin espacio.
               Ver billing.md, anomalía documentada. */
            placeholder="Search Patients, guarantors,phone...."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
          {buscando && resultados.length > 0 && (
            <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-52 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
              {resultados.map((p) => (
                <button
                  key={p.nombre}
                  type="button"
                  onClick={() => elegirPaciente(p.nombre)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
                >
                  {p.nombre}
                  <span className="text-ink-faint">{p.rol}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex w-full flex-col gap-2 sm:w-[180px]">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <TextField
            label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto}
            error={intentado && !monto.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[160px]"
          />
          <SelectField label="Type" required options={[...TIPOS_AJUSTE_BILLING]} value={tipo} onChange={(v) => setTipo(v as TipoAjusteBilling)} className="w-full sm:w-[200px]" />
          <SelectField
            label="Apply to" required options={PACIENTES_BILLING.map((p) => p.nombre)} value={aplicaA}
            onChange={(v) => { setAplicaA(v); setBusqueda(v) }}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[200px]"
          />
        </div>

        <TextArea label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />

        <LedgerAllocationTable cargos={cargos} />
      </div>
    </ModalShell>
  )
}
