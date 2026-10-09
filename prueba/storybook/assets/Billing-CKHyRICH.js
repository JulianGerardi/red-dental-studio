import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type Ref } from 'react'
import {
  CreditCard, Search, X, Download, Wallet, MinusCircle, PlusCircle,
} from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { moneda, type Movimiento } from '@/data/ledger'
import {
  PACIENTES_BILLING, buscarPacientes, ACTIVIDAD_RECIENTE,
  STATS_BILLING, STATS_HOY, FILTROS_ACTIVIDAD, type FiltroActividad, type PacienteBilling, type TipoAjusteBilling,
} from '@/data/billing'
import { PostPaymentDialog } from '@/components/billing/PostPaymentDialog'
import { Pill, type PillTone } from '@/components/ui/pill'
import { AmountCell, DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { CONTENEDOR_PAGINA, TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'
import { Tabs } from '@/components/ui/tabs'
import { Panel } from '@/components/dashboard/primitives'
import { cn } from '@/lib/utils'

/* Figma 4481:9881 "Billing". Ver design-reference/figma/modulos/billing.md.
   Las 4 pantallas del frame son estados de una sola vista: vacía, poblada,
   con el modal "Post payment" encima y con un paciente elegido -acá son
   \`filas.length === 0\`, el modal y \`seleccionado\`, no rutas separadas. */

function detalleTipo(m: Movimiento): { texto: string; tono: PillTone } {
  if (m.tipo === 'Charge') return { texto: m.codigo, tono: 'neutral' }
  if (m.tipo === 'Insurance') return { texto: 'Ins Payment', tono: 'purple' }
  if (m.tipo === 'Payment') return { texto: 'Pt Payment', tono: 'info' }
  return m.monto < 0
    ? { texto: 'Credit Adj', tono: 'neutral' }
    : { texto: 'Charge Adj', tono: 'danger' }
}

/* Sobre el fondo gris es card de página; adentro de Today o de Selected patient, InnerCard (billing.md, 2026-10-09). */
export function Stat({ label, value, caption, interna }: { label: string; value: string; caption: string; interna?: boolean }) {
  return (
    <div className={cn('min-w-0 p-4', interna ? TARJETA_INTERNA : TARJETA_PANEL)}>
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

/* La tabla estándar (ui/data-table) con las columnas de actividad. Compacta:
   vive adentro de una card. */
const COLUMNAS: DataTableColumn<Movimiento & { saldo: number }>[] = [
  { key: 'fecha', header: 'Date', width: 104, cell: (m) => m.fecha },
  { key: 'paciente', header: 'Patient', width: 124, cell: (m) => <TextCell strong>{m.paciente}</TextCell> },
  {
    key: 'tipo', header: 'Type', width: 92, cell: (m) => {
      const t = detalleTipo(m)
      return m.tipo === 'Charge' ? t.texto : <Pill tone={t.tono}>{t.texto}</Pill>
    },
  },
  { key: 'desc', header: 'Description', cell: (m) => <TextCell>{m.descripcion}</TextCell> },
  { key: 'provider', header: 'Provider', width: 124, cell: (m) => <TextCell>{m.provider}</TextCell> },
  { key: 'monto', header: 'Amount', width: 88, align: 'right', cell: (m) => <AmountCell value={m.monto} /> },
  { key: 'saldo', header: 'Balance', width: 92, align: 'right', cell: (m) => <span className="font-semibold tabular-nums text-ink">{moneda(m.saldo)}</span> },
]

const initials = (nombre: string) => nombre.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

/* Un resultado de Find Patient: la InnerCard de la lista lateral de Patients. El elegido queda en el celeste del rango
   nuevo de Coverage Table, igual que sus filas en la tabla (billing.md, 2026-10-09). */
export function ResultadoPaciente({ paciente, saldo, elegido, onElegir }: {
  paciente: PacienteBilling
  saldo: number
  elegido?: boolean
  onElegir: () => void
}) {
  return (
    <button
      type="button"
      aria-current={elegido || undefined}
      onClick={onElegir}
      className={cn(
        TARJETA_INTERNA,
        'flex w-full items-center gap-2.5 p-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-ring',
        elegido ? 'bg-dash-count-bg' : 'hover:bg-surface-subtle',
      )}
    >
      <span className="bg-dash-blue flex size-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-semibold text-white">
        {initials(paciente.nombre)}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[13px] font-semibold text-ink">{paciente.nombre}</span>
        {/* Typo tal cual el Figma: "Las payment" en vez de "Last payment". Ver billing.md. */}
        <span className="truncate text-[11px] text-ink-muted">Las payment {paciente.ultimoPago}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-[10px] text-ink-faint">Balance</span>
        <span className="text-dash-blue block text-[12px] font-semibold tabular-nums">{moneda(saldo)}</span>
      </span>
    </button>
  )
}

/* Recent Billing Activity: las Tabs de tipo, los saldos del paciente elegido y la tabla con sus filas en celeste. */
export function ActividadReciente({
  filas, sinActividad, filtro, onFiltro, paciente, saldo, onElegir, onLimpiar, refElegido,
}: {
  filas: (Movimiento & { saldo: number })[]
  /** Todavía no se posteó nada (no es un filtro sin resultados). */
  sinActividad?: boolean
  filtro: FiltroActividad
  onFiltro: (f: FiltroActividad) => void
  paciente?: PacienteBilling
  /** Open Balance del paciente elegido, con lo posteado en la sesión. */
  saldo: number
  onElegir: (nombre: string) => void
  onLimpiar: () => void
  refElegido?: Ref<HTMLDivElement>
}) {
  return (
    <Panel
      title="Recent Billing Activity"
      className="min-w-0"
      controls={<Tabs size="sm" aria-label="Filter activity" tabs={FILTROS_ACTIVIDAD} value={filtro} onChange={onFiltro} />}
    >
      {paciente && (
        <div ref={refElegido} className="flex scroll-mt-4 flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] text-ink">
              Selected patient: <span className="font-semibold">{paciente.nombre}</span>
              {' · '}
              <span className="text-dash-blue font-medium">{paciente.rol}</span>
            </p>
            <button
              type="button"
              aria-label="Clear selected patient"
              onClick={onLimpiar}
              className="flex size-6 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
            >
              <X className="size-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Stat interna label="Guarantor Unapplied Credits" value={moneda(paciente.creditosNoAplicados)} caption="Available to apply" />
            <Stat interna label="Guarantor Open Balance" value={moneda(saldo)} caption="Total outstanding" />
          </div>
        </div>
      )}

      {/* Clic en una fila elige al paciente: sus saldos arriba y sus filas en celeste. */}
      <DataTable
        columns={COLUMNAS}
        rows={filas}
        rowKey={(m) => m.id}
        rowLabel={(m) => m.paciente}
        onRowClick={(m) => onElegir(m.paciente)}
        selected={filas.filter((m) => m.paciente === paciente?.nombre).map((m) => m.id)}
        density="compact"
        itemLabel="entries"
        empty={sinActividad
          ? { icon: CreditCard, title: 'No financial transaction has been posted yet.' }
          : { icon: CreditCard, title: 'No entries', detail: 'Nothing matches the current filter.' }}
      />
    </Panel>
  )
}

/* Find Patient: el buscador y los resultados como InnerCard, como la lista lateral de Patients. */
export function BuscarPaciente({ busqueda, onBusqueda, seleccionado, saldoDe, onElegir }: {
  busqueda: string
  onBusqueda: (q: string) => void
  seleccionado?: string | null
  saldoDe: (nombre: string) => number
  onElegir: (nombre: string) => void
}) {
  const resultados = buscarPacientes(busqueda)
  return (
    <Panel title="Find Patient">
      <div className="relative shrink-0">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint" />
        <input
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Search by Name, Last Name or Email"
          aria-label="Find patient"
          className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-8 pl-8 text-[12px] placeholder:text-ink-faint focus:outline-none"
        />
        {busqueda && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onBusqueda('')}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-ink-faint hover:text-ink-muted"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {resultados.length === 0 ? (
        <EmptyState title="No recent patients/guarantors to show yet." className="py-6" />
      ) : (
        resultados.map((p) => (
          <ResultadoPaciente
            key={p.nombre}
            paciente={p}
            saldo={saldoDe(p.nombre)}
            elegido={p.nombre === seleccionado}
            onElegir={() => onElegir(p.nombre)}
          />
        ))
      )}
    </Panel>
  )
}

/* \`inicial\` sólo lo usan las stories (Pages › Parts › Billing): la ruta abre sin nada elegido. */
export default function Billing({ inicial }: {
  inicial?: { seleccionado?: string; filtro?: FiltroActividad; busqueda?: string; vacia?: boolean }
} = {}) {
  const [actividad, setActividad] = useState(inicial?.vacia ? [] : ACTIVIDAD_RECIENTE)
  const [filtro, setFiltro] = useState<FiltroActividad>(inicial?.filtro ?? 'All')
  const [busqueda, setBusqueda] = useState(inicial?.busqueda ?? '')
  const [seleccionado, setSeleccionado] = useState<string | null>(inicial?.seleccionado ?? null)
  const [modal, setModal] = useState<TipoAjusteBilling | null>(null)
  const refElegido = useRef<HTMLDivElement>(null)
  const subir = useRef(false)

  const filas = useMemo(() => actividad.filter((m) => coincideFiltro(m, filtro)), [actividad, filtro])
  const pacienteSeleccionado = seleccionado ? PACIENTES_BILLING.find((p) => p.nombre === seleccionado) : undefined

  /* En el celular Find Patient queda debajo de la tabla: al elegir ahí se sube hasta los saldos (billing.md, 2026-10-09). */
  const elegirDeLaLista = (nombre: string) => {
    subir.current = nombre !== seleccionado
    setSeleccionado(nombre)
  }
  useEffect(() => {
    if (!subir.current) return
    subir.current = false
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    refElegido.current?.scrollIntoView({ block: 'nearest', behavior: quieto ? 'auto' : 'smooth' })
  }, [seleccionado])

  /* \`saldoDe\` (de data/billing.ts) lee el mock estático: acá hace falta el
     saldo con lo que ya se posteó en esta sesión, así que se calcula sobre
     \`actividad\` -si no, la card de "Open Balance" se queda vieja apenas se
     postea un primer pago. */
  const saldoActual = (paciente: string) => actividad.find((m) => m.paciente === paciente)?.saldo ?? 0

  const registrarPago = (m: Omit<Movimiento, 'id'>) => {
    setActividad((p) => [{ ...m, id: \`act-\${Date.now()}\`, saldo: saldoActual(m.paciente) + m.monto }, ...p])
    aviso.ok(\`\${m.descripcion} of \${moneda(Math.abs(m.monto))} posted for \${m.paciente}.\`)
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
        <ActividadReciente
          filas={filas}
          sinActividad={actividad.length === 0}
          filtro={filtro}
          onFiltro={setFiltro}
          paciente={pacienteSeleccionado}
          saldo={seleccionado ? saldoActual(seleccionado) : 0}
          onElegir={setSeleccionado}
          onLimpiar={() => setSeleccionado(null)}
          refElegido={refElegido}
        />

        <div className="flex flex-col gap-4">
          <BuscarPaciente busqueda={busqueda} onBusqueda={setBusqueda} seleccionado={seleccionado} saldoDe={saldoActual} onElegir={elegirDeLaLista} />
          <Panel title="Today">
            {STATS_HOY.map((s) => <Stat key={s.label} interna {...s} />)}
          </Panel>
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
`})))()}export{n,i as r,r as t};