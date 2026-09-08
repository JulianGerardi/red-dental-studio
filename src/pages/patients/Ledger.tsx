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
  type Movimiento,
} from '@/data/ledger'
import { aviso } from '@/components/ui/toaster'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { PatientPaymentPanel } from '@/components/patients/ledger/PatientPaymentPanel'
import { CreditAdjustmentPanel } from '@/components/patients/ledger/CreditAdjustmentPanel'
import { ChargeAdjustmentPanel } from '@/components/patients/ledger/ChargeAdjustmentPanel'

/* Figma 4582:28487 / 4588:84886. Ver design-reference/figma/modulos/ledger.md. */

/* El Figma agrupa Payment/Adjustment en un solo tipo cada uno, pero el
   diseño de referencia de Confidentally 2.0 distingue paciente/seguro y
   cargo/crédito en la propia celda -mismo dato (`tipo`+signo de `monto`),
   sólo más específico al mostrarlo-. Charge muestra el código en vez de
   una etiqueta genérica, igual que esa referencia. */
function detalleTipo(m: Movimiento): { texto: string; tono: string } {
  if (m.tipo === 'Charge') return { texto: m.codigo, tono: 'border-[#e4e4e7] bg-[#f5f5f5] text-[#71717a]' }
  if (m.tipo === 'Insurance') return { texto: 'Ins Payment', tono: 'border-[#6633a6] bg-[#f5f0ff] text-[#6633a6]' }
  if (m.tipo === 'Payment') return { texto: 'Pt Payment', tono: 'border-[#174596] bg-[#f0f5ff] text-[#174596]' }
  return m.monto < 0
    ? { texto: 'Credit Adj', tono: 'border-[#a1a1aa] bg-[#f5f5f5] text-[#595959]' }
    : { texto: 'Charge Adj', tono: 'border-[#b22626] bg-[#fff2f2] text-[#b22626]' }
}

/* Anchos del diseño de referencia (Confidentally 2.0): 112/112/96 · desc
   flex-1 · 112/80/96, gap-3 y px-3. Suman 864 con los gaps y el padding. */
const COLS = {
  fecha: 'w-28 shrink-0',
  paciente: 'w-28 shrink-0',
  tipo: 'w-24 shrink-0',
  desc: 'min-w-[160px] flex-1',
  provider: 'w-28 shrink-0',
  monto: 'w-20 shrink-0 text-right',
  saldo: 'w-24 shrink-0 text-right',
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

const TABS = [
  { id: 'transacciones', label: 'Transactions', titulo: 'Ledger' },
  { id: 'pago', label: 'Patient Payment (-)', titulo: 'New Patient Payment (-)' },
  { id: 'credito', label: 'Credit Adjustment (-)', titulo: 'New Credit (-) Adjustment' },
  { id: 'cargo', label: 'Charge Adjustment (+)', titulo: 'New Credit (+) Adjustment' },
] as const
type Tab = (typeof TABS)[number]['id']

export default function Ledger() {
  const { id = 'john-smith' } = useParams()
  const [movs, setMovs] = useState(MOVIMIENTOS)
  const [vista, setVista] = useState<Vista>('Patient View')
  const [q, setQ] = useState('')
  const [tipos, setTipos] = useState<string[]>([])
  const [tab, setTab] = useState<Tab>('transacciones')
  const [pagina, setPagina] = useState(1)

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
  const TAM_PAGINA = 8
  const paginas = Math.max(1, Math.ceil(filas.length / TAM_PAGINA))
  const paginaActual = Math.min(pagina, paginas)
  const filasPagina = filas.slice((paginaActual - 1) * TAM_PAGINA, paginaActual * TAM_PAGINA)

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
  const volver = () => setTab('transacciones')
  const tituloActivo = TABS.find((t) => t.id === tab)?.titulo ?? 'Ledger'

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
          <h1 className="text-xl leading-[1.3] font-semibold text-[#09090b]">{tituloActivo}</h1>

          <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-[#f1f5f9] p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
                  tab === t.id ? 'bg-dash-blue text-white' : 'text-[#64748b] hover:text-[#3f3f46]',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'transacciones' && (
            <>
              <div className="mt-4">
                <StatStrip stats={stats} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
                  <input
                    value={q}
                    onChange={(e) => { setQ(e.target.value); setPagina(1) }}
                    placeholder="Search by code, description or provider"
                    className="focus:border-dash-blue h-9 w-full rounded-md border border-[#e4e4e7] bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa] focus:outline-none"
                  />
                </div>
                <FilterMenu label="Filter entries" options={TIPOS} value={tipos} onChange={(v) => { setTipos(v); setPagina(1) }} />

                <div className="ml-auto flex flex-wrap items-center gap-3">
                  <div className="flex w-fit shrink-0 items-center gap-1 rounded-lg bg-[#f1f5f9] p-1">
                    {VISTAS.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => { setVista(v); setPagina(1) }}
                        className={cn(
                          'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
                          vista === v ? 'bg-dash-blue text-white' : 'text-[#64748b] hover:text-[#3f3f46]',
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => aviso.ok('Statement exported.')}
                    className="flex h-9 items-center gap-2 rounded-md border border-[#e4e4e7] bg-white px-4 text-[13px] font-medium hover:bg-[#fafafa]"
                  >
                    <Download className="size-4" /> Export statement
                  </button>
                </div>
              </div>

              <div className="mt-4 w-full overflow-x-auto rounded-lg border border-[#e7e7e7] bg-white">
                <div className="min-w-[864px]">
                  <div className="flex items-center gap-3 bg-[#f9f9f9] px-3 py-3 text-[11px] font-semibold text-[#71717a]">
                    <span className={COLS.fecha}>Date</span>
                    <span className={COLS.paciente}>Patient</span>
                    <span className={COLS.tipo}>Type</span>
                    <span className={COLS.desc}>Description</span>
                    <span className={COLS.provider}>Provider</span>
                    <span className={COLS.monto}>Amount</span>
                    <span className={COLS.saldo}>Balance</span>
                  </div>

                  {filasPagina.length === 0 ? (
                    <EmptyState icon={Receipt} title="No entries" detail="Nothing matches the current search or filters." />
                  ) : (
                    filasPagina.map((m) => {
                      const tipo = detalleTipo(m)
                      return (
                      <div
                        key={m.id}
                        className="flex items-center gap-3 border-t border-[#e7e7e7] px-3 py-3 text-[13px] text-[#3f3f46]"
                      >
                        <span className={COLS.fecha}>{m.fecha}</span>
                        <span title={m.paciente} className={cn(COLS.paciente, 'truncate text-[#09090b]')}>{m.paciente}</span>
                        <span className={COLS.tipo}><Pill tono={tipo.tono}>{tipo.texto}</Pill></span>
                        <span title={m.descripcion} className={cn(COLS.desc, 'truncate text-[#09090b]')}>{m.descripcion}</span>
                        <span title={m.provider} className={cn(COLS.provider, 'truncate')}>{m.provider}</span>
                        {/* Los negativos bajan la cuenta: van en verde. */}
                        <span className={cn(COLS.monto, 'font-medium tabular-nums', m.monto < 0 ? 'text-[#1a804d]' : 'text-[#09090b]')}>
                          {moneda(m.monto)}
                        </span>
                        <span className={cn(COLS.saldo, 'font-semibold tabular-nums text-[#09090b]')}>
                          {moneda(m.saldo)}
                        </span>
                      </div>
                      )
                    })
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e7e7e7] px-3 py-3">
                    <span className="text-xs font-semibold text-[#71717a]">
                      Showing {filasPagina.length} of {filas.length} entries
                    </span>
                    <div className="flex items-center gap-4">
                      <Pagination pagina={paginaActual} paginas={paginas} onChange={setPagina} />
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
            </>
          )}

          {tab === 'pago' && (
            <div className="mt-4">
              <PatientPaymentPanel
                cargos={cargosDeLaCuenta}
                onCancelar={volver}
                onGuardar={(m) => { agregar(m); aviso.ok(`Payment of ${moneda(Math.abs(m.monto))} recorded for ${m.paciente}.`); volver() }}
              />
            </div>
          )}
          {tab === 'credito' && (
            <div className="mt-4">
              <CreditAdjustmentPanel
                cargos={cargosDeLaCuenta}
                onCancelar={volver}
                onGuardar={(m) => { agregar(m); aviso.ok(`${m.descripcion} of ${moneda(Math.abs(m.monto))} applied to ${m.paciente}.`); volver() }}
              />
            </div>
          )}
          {tab === 'cargo' && (
            <div className="mt-4">
              <ChargeAdjustmentPanel
                cargosVisita={cargosDeLaCuenta}
                onCancelar={volver}
                onGuardar={(m) => { agregar(m); aviso.ok(`${m.descripcion} of ${moneda(Math.abs(m.monto))} added for ${m.paciente}.`); volver() }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
