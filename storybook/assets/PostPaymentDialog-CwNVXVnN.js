import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions, DrawerStep } from '@/components/ui/drawer'
import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import {
  ModalShell, TextField, SelectField, TextArea, FieldLabel, control,
} from '@/components/patients/form'
import { cn } from '@/lib/utils'
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

  /* Dos pasos, como los drawers de Confidentally 2.0: el pago y después a qué cargos se aplica. */
  const [paso, setPaso] = useState(0)
  const faltaPago = !fecha || !monto.trim() || !aplicaA.trim()
  const siguiente = () => {
    setIntentado(true)
    if (faltaPago) return
    setIntentado(false)
    setPaso(1)
  }

  const guardar = () => {
    setIntentado(true)
    if (faltaPago) { setPaso(0); return }
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
    <ModalShell
      title="Post payment" description="Payment details, then how it applies to open charges" onClose={onClose} width="max-w-[1000px]"
      steps={['Payment', 'Allocation']} step={paso}
      actions={<DrawerActions step={paso} total={2} onNext={siguiente} onBack={() => setPaso(0)} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso} className="flex flex-col gap-4">
        <div ref={refBusqueda} className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setBuscando(true) }}
            onFocus={() => setBuscando(true)}
            /* Typo tal cual el Figma: "guarantors,phone...." sin espacio.
               Ver billing.md, anomalía documentada. */
            placeholder="Search Patients, guarantors,phone...."
            className={cn(control(), 'h-9 pr-3 pl-9')}
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

        {/* Campos de a dos y del mismo ancho (regla de Components / UI / Drawer → Specs → Fields). */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <TextField
            label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto}
            error={intentado && !monto.trim() ? 'This field is required.' : undefined}
          />
          <SelectField label="Type" required options={[...TIPOS_AJUSTE_BILLING]} value={tipo} onChange={(v) => setTipo(v as TipoAjusteBilling)} />
          <SelectField
            label="Apply to" required options={PACIENTES_BILLING.map((p) => p.nombre)} value={aplicaA}
            onChange={(v) => { setAplicaA(v); setBusqueda(v) }}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
          />
        </div>

        <TextArea label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <LedgerAllocationTable cargos={cargos} />
      </DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};