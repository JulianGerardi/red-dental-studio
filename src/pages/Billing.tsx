import { useMemo, useState } from 'react'
import {
  CreditCard, Search, X, Download, Wallet, MinusCircle, PlusCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { moneda, type Movimiento } from '@/data/ledger'
import {
  PACIENTES_BILLING, buscarPacientes, ACTIVIDAD_RECIENTE,
  STATS_BILLING, STATS_HOY, FILTROS_ACTIVIDAD, type FiltroActividad, type TipoAjusteBilling,
} from '@/data/billing'
import { PostPaymentDialog } from '@/components/billing/PostPaymentDialog'
import { Pill, type PillTone } from '@/components/ui/pill'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 4481:9881 "Billing". Ver design-reference/figma/modulos/billing.md.
   Las 4 pantallas del frame son estados de una sola vista: vacía, poblada,
   con el modal "Post payment" encima y con un paciente elegido -acá son
   `filas.length === 0`, el modal y `seleccionado`, no rutas separadas. */

function detalleTipo(m: Movimiento): { texto: string; tono: PillTone } {
  if (m.tipo === 'Charge') return { texto: m.codigo, tono: 'neutral' }
  if (m.tipo === 'Insurance') return { texto: 'Ins Payment', tono: 'purple' }
  if (m.tipo === 'Payment') return { texto: 'Pt Payment', tono: 'info' }
  return m.monto < 0
    ? { texto: 'Credit Adj', tono: 'neutral' }
    : { texto: 'Charge Adj', tono: 'danger' }
}

function Stat({ label, value, caption }: { label: string; value: string; caption: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-white p-4">
      <p className="truncate text-xs text-ink-muted" title={label}>{label}</p>
      <p className="text-dash-blue mt-1 text-xl font-bold">{value}</p>
      <p className="mt-0.5 truncate text-[11px] text-ink-faint">{caption}</p>
    </div>
  )
}

function coincideFiltro(m: Movimiento, f: FiltroActividad) {
  if (f === 'All') return true
  if (f === 'Pt Payment') return m.tipo === 'Payment'
  if (f === 'Charge Adj') return m.tipo === 'Adjustment' && m.monto > 0
  return m.tipo === 'Adjustment' && m.monto < 0
}

const initials = (nombre: string) => nombre.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

export default function Billing() {
  const [actividad, setActividad] = useState(ACTIVIDAD_RECIENTE)
  const [filtro, setFiltro] = useState<FiltroActividad>('All')
  const [busqueda, setBusqueda] = useState('')
  const [seleccionado, setSeleccionado] = useState<string | null>(null)
  const [modal, setModal] = useState<TipoAjusteBilling | null>(null)

  const filas = useMemo(() => actividad.filter((m) => coincideFiltro(m, filtro)), [actividad, filtro])
  const resultados = buscarPacientes(busqueda)
  const pacienteSeleccionado = seleccionado ? PACIENTES_BILLING.find((p) => p.nombre === seleccionado) : undefined

  /* `saldoDe` (de data/billing.ts) lee el mock estático: acá hace falta el
     saldo con lo que ya se posteó en esta sesión, así que se calcula sobre
     `actividad` -si no, la card de "Open Balance" se queda vieja apenas se
     postea un primer pago. */
  const saldoActual = (paciente: string) => actividad.find((m) => m.paciente === paciente)?.saldo ?? 0

  const registrarPago = (m: Omit<Movimiento, 'id'>) => {
    setActividad((p) => [{ ...m, id: `act-${Date.now()}`, saldo: saldoActual(m.paciente) + m.monto }, ...p])
    aviso.ok(`${m.descripcion} of ${moneda(Math.abs(m.monto))} posted for ${m.paciente}.`)
    setModal(null)
  }

  return (
    <div className={CONTENEDOR_PAGINA}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageTitle>Billing</PageTitle>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setModal('Patient Payment')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-medium text-white transition-colors"
          >
            <Wallet className="size-3.5" /> Patient Payment (-)
          </button>
          <button
            type="button"
            onClick={() => setModal('Credit Adjustment')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-medium text-white transition-colors"
          >
            <MinusCircle className="size-3.5" /> Credit Adjustment (-)
          </button>
          <button
            type="button"
            onClick={() => setModal('Charge Adjustment')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-medium text-white transition-colors"
          >
            <PlusCircle className="size-3.5" /> Charge Adjustment (+)
          </button>
          <button
            type="button"
            aria-label="Export statement"
            onClick={() => aviso.ok('Statement exported.')}
            className="flex size-9 items-center justify-center rounded-md border border-line bg-white text-ink-muted hover:bg-surface-subtle"
          >
            <Download className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATS_BILLING.map((s) => <Stat key={s.label} {...s} />)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 rounded-lg border border-line bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
              <CreditCard className="size-4" /> Recent Billing Activity
            </h2>
            <div className="flex w-fit shrink-0 items-center gap-1 rounded-lg bg-surface-slate p-1">
              {FILTROS_ACTIVIDAD.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  className={cn(
                    'h-7 shrink-0 rounded-md px-2.5 text-xs font-medium whitespace-nowrap transition-colors',
                    filtro === f ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {pacienteSeleccionado && (
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-ink">
                  Selected patient: <span className="font-semibold">{pacienteSeleccionado.nombre}</span>
                  {' · '}
                  <span className="text-dash-blue font-medium">{pacienteSeleccionado.rol}</span>
                </p>
                <button
                  type="button"
                  aria-label="Clear selected patient"
                  onClick={() => setSeleccionado(null)}
                  className="flex size-6 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Stat label="Guarantor Unapplied Credits" value={moneda(pacienteSeleccionado.creditosNoAplicados)} caption="Available to apply" />
                <Stat label="Guarantor Open Balance" value={moneda(saldoActual(pacienteSeleccionado.nombre))} caption="Total outstanding" />
              </div>
            </div>
          )}

          {actividad.length === 0 ? (
            <EmptyState icon={CreditCard} title="No financial transaction has been posted yet." className="mt-3" />
          ) : filas.length === 0 ? (
            <EmptyState icon={CreditCard} title="No entries" detail="Nothing matches the current filter." className="mt-3" />
          ) : (
            <div className="mt-4 w-full overflow-x-auto rounded-md border border-line-row">
              <div className="min-w-[760px]">
                <div className="flex items-center gap-3 bg-surface-alt px-3 py-2.5 text-[11px] font-semibold text-ink-muted">
                  <span className="w-[104px] shrink-0">Date</span>
                  <span className="w-[124px] shrink-0">Patient</span>
                  <span className="w-[92px] shrink-0">Type</span>
                  <span className="min-w-[160px] flex-1">Description</span>
                  <span className="w-[124px] shrink-0">Provider</span>
                  <span className="w-[88px] shrink-0 text-right">Amount</span>
                  <span className="w-[92px] shrink-0 text-right">Balance</span>
                </div>
                {filas.slice(0, 10).map((m) => {
                  const t = detalleTipo(m)
                  return (
                    <div
                      key={m.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${m.paciente}`}
                      onClick={() => setSeleccionado(m.paciente)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSeleccionado(m.paciente)}
                      className="flex cursor-pointer items-center gap-3 border-t border-line-row px-3 py-2.5 text-[13px] text-ink-soft hover:bg-surface-subtle"
                    >
                      <span className="w-[104px] shrink-0">{m.fecha}</span>
                      <span className="w-[124px] shrink-0 truncate text-ink" title={m.paciente}>{m.paciente}</span>
                      <span className="w-[92px] shrink-0">{m.tipo === 'Charge' ? t.texto : <Pill tone={t.tono}>{t.texto}</Pill>}</span>
                      <span className="min-w-[160px] flex-1 truncate" title={m.descripcion}>{m.descripcion}</span>
                      <span className="w-[124px] shrink-0 truncate" title={m.provider}>{m.provider}</span>
                      <span className={cn('w-[88px] shrink-0 text-right font-medium tabular-nums', m.monto < 0 ? 'text-dash-ok-fg' : 'text-ink')}>{moneda(m.monto)}</span>
                      <span className="w-[92px] shrink-0 text-right font-semibold tabular-nums text-ink">{moneda(m.saldo)}</span>
                    </div>
                  )
                })}
                <div className="flex items-center justify-between border-t border-line-row px-3 py-2.5 text-xs font-semibold text-ink-muted">
                  <span>Showing {Math.min(10, filas.length)} of {filas.length}</span>
                  {filas.length > 10 && <button type="button" className="text-dash-blue hover:underline">View More →</button>}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-line bg-white p-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
              <Search className="size-4" /> Find Patient
            </h2>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Search by Name, Last Name or Email"
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-8 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
              />
              {busqueda && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setBusqueda('')}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-ink-faint hover:text-ink-muted"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {resultados.length === 0 ? (
              <EmptyState title="No recent patients/guarantors to show yet." className="py-6" />
            ) : (
              <div className="mt-3 flex flex-col gap-1">
                {resultados.map((p) => (
                  <button
                    key={p.nombre}
                    type="button"
                    onClick={() => setSeleccionado(p.nombre)}
                    className="flex items-center gap-2.5 rounded-md p-2 text-left hover:bg-surface-muted"
                  >
                    <span className="bg-dash-blue flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white">
                      {initials(p.nombre)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-ink">{p.nombre}</span>
                      {/* Typo tal cual el Figma: "Las payment" en vez de
                          "Last payment". Ver billing.md. */}
                      <span className="block text-[11px] text-ink-faint">Las payment {p.ultimoPago}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-[10px] text-ink-faint">Balance</span>
                      <span className="text-dash-blue block text-[12px] font-semibold">{moneda(saldoActual(p.nombre))}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-line bg-white p-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
              <CreditCard className="size-4" /> Today
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {STATS_HOY.map((s) => <Stat key={s.label} {...s} />)}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <PostPaymentDialog
          tipoInicial={modal}
          pacienteInicial={seleccionado ?? undefined}
          onClose={() => setModal(null)}
          onGuardar={registrarPago}
        />
      )}
    </div>
  )
}
