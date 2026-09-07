import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronLeft, Search, Receipt, CreditCard, Wallet, Download,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { FilterMenu } from '@/components/dashboard/FilterMenu'
import { StatStrip, type Stat } from '@/components/dashboard/StatStrip'
import {
  MOVIMIENTOS, TIPOS, GUARANTOR, conSaldo, moneda,
  type Movimiento, type TipoMovimiento,
} from '@/data/ledger'
import { aviso } from '@/components/ui/toaster'
import { NewPatientPaymentModal } from '@/components/patients/ledger/NewPatientPaymentModal'
import { NewCreditAdjustmentModal } from '@/components/patients/ledger/NewCreditAdjustmentModal'
import { NewChargeAdjustmentModal } from '@/components/patients/ledger/NewChargeAdjustmentModal'

/* Figma 4582:28487 "Ledger — Screens" (layout general) y 4588:84886 "Ledger
   Transactions Table" (la tabla, aislada como componente propio y con orden
   de columnas exacto: Date, Patient, Type, Description, Provider, Amount,
   Balance -sin Code ni Status-). La tabla se ajusta a esas siete columnas y
   ese orden; `codigo` y `estado` siguen en el dato -los usan la búsqueda y
   la tira de métricas- pero ya no tienen columna propia. Ver modulos/ledger.md. */

const TIPO_PILL: Record<TipoMovimiento, string> = {
  Charge: 'border-[#174596] bg-[#f0f5ff] text-[#174596]',
  Payment: 'border-[#1a804d] bg-[#f0fcf5] text-[#1a804d]',
  Adjustment: 'border-[#a1a1aa] bg-[#f5f5f5] text-[#595959]',
  Insurance: 'border-[#6633a6] bg-[#f5f0ff] text-[#6633a6]',
}

const COLS = {
  fecha: 'w-[110px]',
  paciente: 'w-[110px]',
  tipo: 'w-[110px]',
  desc: 'min-w-[220px] flex-1',
  provider: 'w-[130px]',
  monto: 'w-[90px] text-right',
  saldo: 'w-[100px] text-right',
}

function Pill({ tono, children }: { tono: string; children: React.ReactNode }) {
  return (
    <span className={cn('inline-flex rounded-full border px-2.5 py-[3px] text-[11px] font-semibold', tono)}>
      {children}
    </span>
  )
}

const VISTAS = ['Patient View', 'Guarantor View'] as const
type Vista = (typeof VISTAS)[number]

export default function Ledger() {
  const { id = 'john-smith' } = useParams()
  const [movs, setMovs] = useState(MOVIMIENTOS)
  const [vista, setVista] = useState<Vista>('Patient View')
  const [q, setQ] = useState('')
  const [tipos, setTipos] = useState<string[]>([])
  const [modal, setModal] = useState<'pago' | 'credito' | 'cargo' | null>(null)

  /* Guarantor View muestra la cuenta completa; Patient View la recorta al
     paciente que se está mirando. El saldo sigue siendo el de la cuenta
     entera en los dos casos -no se reinicia por paciente-, así que se corre
     sobre `movs` antes de filtrar por vista. */
  const conSaldoTotal = useMemo(() => conSaldo(movs), [movs])
  const delaVista = useMemo(
    () => (vista === 'Guarantor View' ? conSaldoTotal : conSaldoTotal.filter((m) => m.paciente === GUARANTOR)),
    [conSaldoTotal, vista],
  )

  const filas = useMemo(
    () => delaVista.filter(
      (m) =>
        (tipos.length === 0 || tipos.includes(m.tipo)) &&
        `${m.codigo} ${m.descripcion} ${m.provider} ${m.paciente}`.toLowerCase().includes(q.trim().toLowerCase()),
    ),
    [delaVista, q, tipos],
  )

  /* Los totales salen de los movimientos de la vista activa, no de un mock
     aparte. */
  const stats: Stat[] = useMemo(() => {
    const cargos = delaVista.filter((m) => m.tipo === 'Charge').reduce((a, m) => a + m.monto, 0)
    const seguro = delaVista.filter((m) => m.tipo === 'Insurance' && m.estado === 'Posted')
      .reduce((a, m) => a + m.monto, 0)
    const saldo = delaVista.reduce((a, m) => a + m.monto, 0)
    const denegados = delaVista.filter((m) => m.estado === 'Denied').length
    return [
      { label: 'Total charges', value: moneda(cargos), nota: `${delaVista.filter((m) => m.tipo === 'Charge').length} procedures`, icon: Receipt, bg: '#eef2ff', fg: '#1d56bc' },
      { label: 'Insurance paid', value: moneda(-seguro), nota: denegados ? `${denegados} denied` : 'all posted', icon: CreditCard, bg: '#f5f3ff', fg: '#8b5cf6' },
      { label: 'Patient balance', value: moneda(saldo), nota: 'due on next visit', icon: Wallet, bg: '#fff7ed', fg: '#f97316' },
    ]
  }, [delaVista])

  const agregar = (m: Omit<Movimiento, 'id'>) => {
    setMovs((p) => [...p, { ...m, id: `m${p.length + 1}-${Date.now()}` }])
  }

  const cargosDeLaCuenta = movs.filter((m) => m.tipo === 'Charge')

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>

      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith" initials="JS" section="Ledger"
          basePath={`/patients/${id}`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl leading-[1.3] font-semibold text-[#09090b]">Ledger</h1>

            {/* Las tres acciones del frame y el toggle de vista, en la misma
                fila -alineados entre sí, no apilados-. */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setModal('pago')}
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium whitespace-nowrap text-white transition-colors"
              >
                Patient Payment (-)
              </button>
              <button
                type="button"
                onClick={() => setModal('credito')}
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium whitespace-nowrap text-white transition-colors"
              >
                Credit Adjustment (-)
              </button>
              <button
                type="button"
                onClick={() => setModal('cargo')}
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium whitespace-nowrap text-white transition-colors"
              >
                Charge Adjustment (+)
              </button>

              <div className="flex w-fit shrink-0 items-center gap-1 rounded-lg bg-[#f1f5f9] p-1">
                {VISTAS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVista(v)}
                    className={cn(
                      'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
                      vista === v ? 'bg-dash-blue text-white' : 'text-[#64748b] hover:text-[#3f3f46]',
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <StatStrip stats={stats} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by code, description or provider"
                className="focus:border-dash-blue h-9 w-full rounded-md border border-[#e4e4e7] bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa] focus:outline-none"
              />
            </div>
            <FilterMenu label="Filter entries" options={TIPOS} value={tipos} onChange={setTipos} />
            <button
              type="button"
              onClick={() => aviso.ok('Statement exported.')}
              className="ml-auto flex h-9 items-center gap-2 rounded-md border border-[#e4e4e7] bg-white px-4 text-[13px] font-medium hover:bg-[#fafafa]"
            >
              <Download className="size-4" /> Export statement
            </button>
          </div>

          <div className="mt-4 overflow-x-auto rounded-lg border border-[#e7e7e7] bg-white">
            <div className="min-w-[960px]">
              <div className="flex h-12 items-center gap-3 border-b border-[#e7e7e7] bg-[#f9f9f9] px-4 text-xs font-semibold text-[#71717a]">
                <span className={COLS.fecha}>Date</span>
                <span className={COLS.paciente}>Patient</span>
                <span className={COLS.tipo}>Type</span>
                <span className={COLS.desc}>Description</span>
                <span className={COLS.provider}>Provider</span>
                <span className={COLS.monto}>Amount</span>
                <span className={COLS.saldo}>Balance</span>
              </div>

              {filas.length === 0 ? (
                <EmptyState icon={Receipt} title="No entries" detail="Nothing matches the current search or filters." />
              ) : (
                filas.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 border-b border-[#e7e7e7] px-4 py-3 text-[13px] text-[#3f3f46] last:border-0"
                  >
                    <span className={COLS.fecha}>{m.fecha}</span>
                    <span className={cn(COLS.paciente, 'truncate text-[#09090b]')}>{m.paciente}</span>
                    <span className={COLS.tipo}><Pill tono={TIPO_PILL[m.tipo]}>{m.tipo}</Pill></span>
                    <span className={cn(COLS.desc, 'truncate text-[#09090b]')}>{m.descripcion}</span>
                    <span className={cn(COLS.provider, 'truncate')}>{m.provider}</span>
                    {/* Los negativos bajan la cuenta: van en verde. */}
                    <span className={cn(COLS.monto, 'font-medium tabular-nums', m.monto < 0 ? 'text-[#1a804d]' : 'text-[#09090b]')}>
                      {moneda(m.monto)}
                    </span>
                    <span className={cn(COLS.saldo, 'font-semibold tabular-nums text-[#09090b]')}>
                      {moneda(m.saldo)}
                    </span>
                  </div>
                ))
              )}

              <div className="flex h-[52px] items-center justify-between px-4">
                <span className="text-xs font-semibold text-[#71717a]">
                  Showing {filas.length} of {delaVista.length} entries
                </span>
                <span className="text-[13px] font-semibold text-[#09090b]">
                  Balance due{' '}
                  <span className="text-dash-blue">
                    {moneda(delaVista.reduce((a, m) => a + m.monto, 0))}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal === 'pago' && (
        <NewPatientPaymentModal
          cargos={cargosDeLaCuenta}
          onClose={() => setModal(null)}
          onGuardar={(m) => { agregar(m); aviso.ok(`Payment of ${moneda(Math.abs(m.monto))} recorded for ${m.paciente}.`) }}
        />
      )}
      {modal === 'credito' && (
        <NewCreditAdjustmentModal
          cargos={cargosDeLaCuenta}
          onClose={() => setModal(null)}
          onGuardar={(m) => { agregar(m); aviso.ok(`${m.descripcion} of ${moneda(Math.abs(m.monto))} applied to ${m.paciente}.`) }}
        />
      )}
      {modal === 'cargo' && (
        <NewChargeAdjustmentModal
          cargosVisita={cargosDeLaCuenta}
          onClose={() => setModal(null)}
          onGuardar={(m) => { agregar(m); aviso.ok(`${m.descripcion} of ${moneda(Math.abs(m.monto))} added for ${m.paciente}.`) }}
        />
      )}
    </div>
  )
}
