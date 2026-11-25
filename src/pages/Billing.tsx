import { SearchInput } from '@/components/ui/search-input'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react'
import {
  CreditCard, X, Download, Wallet, MinusCircle, PlusCircle,
} from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { moneda, pendienteDe, tieneCredito, type Movimiento } from '@/data/ledger'
import {
  APLICACIONES_BILLING, registrarAplicaciones, PROVIDERS_BILLING, PACIENTES_BILLING, buscarPacientes, grupoDeGarante, ACTIVIDAD_RECIENTE, STATS_BILLING, STATS_HOY, FILTROS_ACTIVIDAD, HOY_BILLING,
  VISTAS_PACIENTE, type FiltroActividad, type PacienteBilling, type TipoAjusteBilling, type VistaPaciente,
} from '@/data/billing'
import { PostPaymentDialog } from '@/components/billing/PostPaymentDialog'
import { ALCANCE_GUARANTOR } from '@/lib/ledgerAplicacion'
import { DetalleMovimiento, LedgerRowModal, PillTipo } from '@/components/patients/ledger/LedgerRowDetail'
import { ColumnPicker } from '@/components/patients/ledger/ColumnPicker'
import { Pill, type PillTone } from '@/components/ui/pill'
import { AmountCell, DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { CONTENEDOR_PAGINA, ICONO_SUELTO, TARJETA_INTERNA } from '@/lib/estilos'
import { Tabs } from '@/components/ui/tabs'
import { ShowMore } from '@/components/ui/show-more'
import { Panel } from '@/components/dashboard/primitives'
import { StatCard } from '@/components/ui/stat-card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

/* Figma 4481:9881 "Billing". Ver design-reference/figma/modulos/billing.md.
   Las 4 pantallas del frame son estados de una sola vista: vacía, poblada,
   con el modal "Post payment" encima y con un paciente elegido -acá son
   `filas.length === 0`, el modal y `seleccionado`, no rutas separadas.
   Sin paciente es el resumen de la clínica; con uno, la vista de ese paciente (como red.dev): sus movimientos, Patient /
   Guarantor View y los botones de pago (billing.md, segunda vuelta del 2026-10-09).
   Bento (2026-10-13): a la izquierda los números y la actividad; a la derecha Find Patient y Today, del mismo alto que
   la izquierda: lo fija la tabla y Find Patient scrollea adentro (como la barra de Patients). */

function detalleTipo(m: Movimiento): { texto: string; tono: PillTone } {
  if (m.tipo === 'Charge') return { texto: m.codigo, tono: 'neutral' }
  if (m.tipo === 'Insurance') return { texto: 'Ins Payment', tono: 'purple' }
  if (m.tipo === 'Payment') return { texto: 'Pt Payment', tono: 'info' }
  return m.monto < 0
    ? { texto: 'Credit Adj', tono: 'neutral' }
    : { texto: 'Charge Adj', tono: 'danger' }
}

/* Los números son la card de métricas de la app (`ui/stat-card`), la misma del Ledger y de Edit Account. */
export const Stat = StatCard

/* Los cinco números de borde a borde: cinco en fila desde xl; antes, 3 + 2 del mismo ancho por fila; en el celular, una
   por fila, como la propuesta v3 (billing.md, 2026-11-24). */
const LUGAR_NUMERO = ['sm:col-span-2', 'sm:col-span-2', 'sm:col-span-2', 'sm:col-span-3', 'sm:col-span-3']

/* Los filtros de red.dev: Payments junta paciente y seguro; Today, lo del día (billing.md, 2026-11-13). */
export function coincideFiltro(m: Movimiento, f: FiltroActividad) {
  if (f === 'All') return true
  if (f === 'Payments') return m.tipo === 'Payment' || m.tipo === 'Insurance'
  if (f === 'Adjustments') return m.tipo === 'Adjustment'
  return m.fecha === HOY_BILLING
}

type FilaBilling = Movimiento & { saldo: number }
type ColBilling = 'fecha' | 'codigo' | 'paciente' | 'tipo' | 'desc' | 'provider' | 'monto' | 'pendiente' | 'estado'

/* Trans. Bal.: lo que falta del cargo, como el Ledger; un pago o crédito no tiene saldo propio (—). */
const esCargo = (m: Movimiento) => m.tipo !== 'Insurance' && m.monto > 0
const TODAS: Record<ColBilling, DataTableColumn<FilaBilling>> = {
  fecha: { key: 'fecha', header: 'Trans. date', width: 92, locked: true, cell: (m) => m.fecha },
  codigo: { key: 'codigo', header: 'CDT code', width: 64, cell: (m) => <span className="text-[12px] font-medium">{m.tipo === 'Charge' ? m.codigo : '—'}</span> },
  paciente: { key: 'paciente', header: 'Patient / account', width: 120, cell: (m) => <TextCell>{m.paciente}</TextCell> },
  tipo: {
    key: 'tipo', header: 'Type', width: 92, cell: (m) => {
      const t = detalleTipo(m)
      return m.tipo === 'Charge' ? t.texto : <Pill tone={t.tono}>{t.texto}</Pill>
    },
  },
  desc: {
    key: 'desc', header: 'Description', locked: true, cell: (m) => (
      <span className="flex w-full min-w-0 flex-col items-start gap-1">
        <span title={m.descripcion} className="w-full truncate">{m.descripcion}</span>
        {/* Plata del pago que todavía no se aplicó a un cargo, como red.dev. */}
        {tieneCredito(m) && <Pill tone="neutral" size="sm" className="whitespace-nowrap">Credit available · {moneda(m.creditoDisponible ?? 0)}</Pill>}
      </span>
    ),
  },
  provider: { key: 'provider', header: 'Provider', width: 104, cell: (m) => <TextCell>{m.provider}</TextCell> },
  monto: { key: 'monto', header: 'Amount', width: 84, align: 'right', locked: true, cell: (m) => <AmountCell value={m.monto} /> },
  pendiente: {
    key: 'pendiente', header: 'Trans. bal.', width: 80, align: 'right',
    cell: (m) => (esCargo(m) ? <span className="tabular-nums">{moneda(pendienteDe(m, APLICACIONES_BILLING))}</span> : <span className="text-ink-faint">—</span>),
  },
  estado: { key: 'estado', header: 'Status', width: 72, cell: (m) => <Pill tone={m.estado === 'Pending' ? 'warning' : 'neutral'} size="sm">{m.estado}</Pill> },
}
/* Resumen y Guarantor View: las columnas de actividad de red.dev. Patient View: las del Ledger del paciente (CDT Code y el
   Type con nombre completo), como red.dev, sin Ledger Bal. (los saldos de la cuenta salieron de Billing el 2026-10-19). */
const COLS_ACTIVIDAD: ColBilling[] = ['fecha', 'paciente', 'tipo', 'desc', 'provider', 'monto', 'pendiente', 'estado']
const COLS_PACIENTE: ColBilling[] = ['fecha', 'codigo', 'paciente', 'tipo', 'desc', 'provider', 'monto', 'pendiente']
const TIPO_LEDGER: DataTableColumn<FilaBilling> = {
  key: 'tipo', header: 'Type', width: 96, cell: (m) => <PillTipo m={m} />,
}
const columnasDe = (vistaPaciente: boolean) =>
  (vistaPaciente ? COLS_PACIENTE : COLS_ACTIVIDAD).map((k) => (vistaPaciente && k === 'tipo' ? TIPO_LEDGER : TODAS[k]))

/* Export CSV, como red.dev: baja la actividad que se ve (con el filtro elegido), con las columnas de la tabla. */
function exportarCsv(filas: Movimiento[]) {
  const celda = (v: string) => `"${v.replaceAll('"', '""')}"`
  const lineas = [
    ['Trans. date', 'Patient / account', 'Type', 'Description', 'Provider', 'Amount', 'Trans. bal.', 'Status'],
    ...filas.map((m) => [
      m.fecha, m.paciente, detalleTipo(m).texto, m.descripcion, m.provider, moneda(m.monto),
      esCargo(m) ? moneda(pendienteDe(m, APLICACIONES_BILLING)) : '', m.estado,
    ]),
  ].map((l) => l.map(celda).join(','))
  const url = URL.createObjectURL(new Blob([lineas.join('\n')], { type: 'text/csv' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: `billing-activity-${HOY_BILLING.replaceAll('/', '-')}.csv` })
  a.click()
  URL.revokeObjectURL(url)
}

const initials = (nombre: string) => nombre.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

/* Un resultado de Find Patient: la InnerCard de la lista lateral de Patients. El elegido queda en el celeste del rango
   nuevo de Coverage Table (billing.md, 2026-10-09). */
export function ResultadoPaciente({ paciente, saldo, elegido, onElegir }: {
  paciente: PacienteBilling
  saldo: number
  elegido?: boolean
  onElegir: () => void
}) {
  return (
    <button
      type="button"
      data-fila-paciente
      aria-current={elegido || undefined}
      onClick={onElegir}
      className={cn(
        TARJETA_INTERNA,
        'flex w-full items-center gap-2.5 p-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-ring',
        elegido ? 'bg-dash-count-bg' : 'hover:bg-surface-subtle',
      )}
    >
      <Avatar initials={initials(paciente.nombre)} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[13px] font-semibold text-ink">{paciente.nombre}</span>
        {/* Typo tal cual el Figma: "Las payment" en vez de "Last payment". Ver billing.md. */}
        <span className="truncate text-[11px] text-ink-muted">Las payment {paciente.ultimoPago}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-[11px] text-ink-faint">Balance</span>
        <span className="text-dash-blue block text-[12px] font-semibold tabular-nums">{moneda(saldo)}</span>
      </span>
    </button>
  )
}

/* Entrada sutil, estilo Apple: aparece desenfocándose apenas, 2px y una curva que frena suave (billing.md, 2026-10-09). */
const ENTRADA = 'motion-safe:animate-[paciente-entra_360ms_cubic-bezier(0.32,0.72,0,1)_both]'

/* El paciente que se está viendo, de borde a borde arriba de Find Patient. Entra con la ENTRADA; la X vuelve al
   resumen de la clínica (billing.md, segunda vuelta del 2026-10-09). */
export function PacienteElegido({ paciente, onCerrar }: { paciente: PacienteBilling; onCerrar: () => void }) {
  return (
    <div className={cn('flex items-center gap-3 border-b border-line-row bg-dash-count-bg px-5 py-3', ENTRADA)}>
      <Avatar initials={initials(paciente.nombre)} size={40} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-dash-blue truncate text-[14px] font-semibold" title={paciente.nombre}>{paciente.nombre}</span>
        <span className="text-[11px] leading-snug text-ink-muted">
          {paciente.rol === 'Guarantor' ? 'Guarantor' : `Patient · Guarantor: ${paciente.garante}`}
        </span>
      </span>
      <button type="button" aria-label="Clear selected patient" title="Back to all activity" onClick={onCerrar} className={ICONO_SUELTO}>
        <X className="size-4" />
      </button>
    </div>
  )
}

/* Recent Billing Activity. Sin paciente: toda la clínica, con las pestañas del tipo y filas que eligen al paciente. Con uno:
   su nombre en el título, Patient / Guarantor View y sólo sus movimientos, sin saldos ni columna Balance (son de la cuenta de todas las locations); cada fila se despliega
   con el detalle del Ledger según el tipo (billing.md y ledger.md, 2026-10-14). */
export function ActividadReciente({
  filas, sinActividad, filtro, onFiltro, paciente, vista, onVista, onElegir, className, abierta,
}: {
  /** Las filas ya filtradas: por tipo en el resumen, por paciente o garante con uno elegido. */
  filas: (Movimiento & { saldo: number })[]
  /** Todavía no se posteó nada (no es un filtro sin resultados). */
  sinActividad?: boolean
  filtro: FiltroActividad
  onFiltro: (f: FiltroActividad) => void
  paciente?: PacienteBilling
  vista: VistaPaciente
  onVista: (v: VistaPaciente) => void
  onElegir: (nombre: string) => void
  /** Ya no se usan: los botones de pago van en la fila del título de la página (billing.md, 2026-11-19). */
  onAccion?: (tipo: TipoAjusteBilling) => void
  onExportar?: () => void
  className?: string
  /** Con paciente: la fila que arranca desplegada (Storybook). */
  abierta?: string
}) {
  /* View full record y la referencia de una aplicación abren la transacción en el registro de sólo lectura del Ledger. */
  const [enModal, setEnModal] = useState<(Movimiento & { saldo: number }) | null>(null)
  /* Columns va en el encabezado, al lado de las pestañas del tipo, como red.dev: la tabla recibe las ocultas de afuera. */
  const [ocultas, setOcultas] = useState<string[]>([])
  const columnas = columnasDe(!!paciente && vista === 'Patient view')
  const elegibles = columnas.filter((c) => !c.locked)
  const ver = (x: Movimiento) => setEnModal(filas.find((f) => f.id === x.id) ?? ACTIVIDAD_RECIENTE.find((f) => f.id === x.id) ?? null)
  return (
    <Panel
      title={paciente ? `${paciente.nombre} — Recent billing activity` : 'Recent billing activity'}
      /* Título pegado y sin padding arriba del cuerpo, como Find patient y Today (billing.md, 2026-11-20). */
      className={cn('min-w-0', TITULO_PEGADO, className)}
      bodyClassName="pt-0"
      /* Pestañas y Columns en la fila del título, como red.dev: sin paciente, el tipo; con uno, Patient / Guarantor view
         (billing.md, 2026-11-25). */
      controls={
        <div className="flex flex-wrap items-center gap-2">
          {paciente
            ? <Tabs size="sm" aria-label="Whose activity" tabs={VISTAS_PACIENTE} value={vista} onChange={onVista} />
            : <Tabs size="sm" aria-label="Activity type" tabs={FILTROS_ACTIVIDAD} value={filtro} onChange={onFiltro} />}
          <ColumnPicker
            size="sm"
            columnas={elegibles.map((c) => ({ id: c.key, label: c.header }))}
            ocultas={ocultas.filter((k) => elegibles.some((c) => c.key === k))}
            onToggle={(k) => setOcultas((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]))}
            onReset={() => setOcultas([])}
          />
        </div>
      }
    >
      {/* En el resumen, clic en una fila abre la vista de ese paciente. */}
      <DataTable
        columns={columnas}
        hiddenColumns={ocultas}
        rows={filas}
        rowKey={(m) => m.id}
        rowLabel={(m) => m.paciente}
        onRowClick={paciente ? undefined : (m) => onElegir(m.paciente)}
        defaultExpanded={paciente && abierta ? [abierta] : undefined}
        rowDetail={paciente ? (m) => (
          <DetalleMovimiento m={{ ...m, saldo: undefined }} aplicaciones={APLICACIONES_BILLING} movimientos={ACTIVIDAD_RECIENTE} onVerTransaccion={ver} />
        ) : undefined}
        density="compact"
        empty={paciente
          ? { icon: CreditCard, title: 'No billing activity yet.', detail: 'Payments and adjustments posted for this patient show up here.' }
          : sinActividad
            ? { icon: CreditCard, title: 'No financial transaction has been posted yet.' }
            : { icon: CreditCard, title: 'No entries', detail: 'Nothing matches the current filter.' }}
      />
      {enModal && (
        <LedgerRowModal key={enModal.id} m={{ ...enModal, saldo: undefined }} aplicaciones={APLICACIONES_BILLING} movimientos={ACTIVIDAD_RECIENTE} onVerTransaccion={ver} onClose={() => setEnModal(null)} />
      )}
    </Panel>
  )
}

/* Find Patient: arriba el paciente que se está viendo; abajo el buscador y los resultados como InnerCard, como la lista
   lateral de Patients. */

/* El título más cerca de lo que sigue (Patients y Billing; billing.md, 2026-10-19). */
const TITULO_PEGADO = '[&>header]:min-h-10'
/** Pacientes de Find Patient antes de "Show N more" en el celular y la tablet, y el mínimo desde 1024px, donde los
    cuenta `usePacientesQueEntran`. */
const LIMITE_PACIENTES = 3
/** Alto mínimo de las tres cards de Today en fila (56 + 8 + 56 + 8 + 56): lo que Find Patient le deja siempre. */
const MINIMO_HOY = 184

/** Desde 1024px la columna derecha mide lo mismo que la tabla: Find Patient muestra los pacientes enteros que entran
    dejándole a Today su mínimo, con "Show N more" pegado a la última fila, y Today se queda con el resto hasta el final
    de la tabla (billing.md, 2026-11-24). Cuenta con lo que mide la columna izquierda, que no se estira. */
function usePacientesQueEntran(izq: RefObject<HTMLElement | null>, buscar: RefObject<HTMLElement | null>, hoy: RefObject<HTMLElement | null>) {
  const [cuantos, setCuantos] = useState(LIMITE_PACIENTES)
  useLayoutEffect(() => {
    const medir = () => {
      const [a, b, c] = [izq.current, buscar.current, hoy.current]
      if (!a || !b || !c) return
      if (!window.matchMedia('(min-width: 1024px)').matches) { setCuantos(LIMITE_PACIENTES); return }
      const fila = b.querySelector<HTMLElement>('[data-fila-paciente]')
      const lista = b.querySelector<HTMLElement>('[data-show-more-lista]')
      const cajaHoy = c.querySelector<HTMLElement>('[data-hoy]')
      if (!fila || !lista || !cajaHoy) return
      const gap = 12
      const paso = fila.offsetHeight + gap
      /* Encabezado, buscador y aire de Find Patient, sin la lista; y lo de Today sin sus cards. */
      const fijo = b.offsetHeight - lista.offsetHeight
      const boton = (b.querySelector<HTMLElement>('[data-show-more]')?.offsetHeight ?? 18) + 8
      const hoyMinimo = c.offsetHeight - cajaHoy.offsetHeight + MINIMO_HOY
      const libre = a.offsetHeight - 16 - hoyMinimo - fijo - boton
      /* Nunca menos de tres: con un paciente elegido la tabla queda corta y el elegido no puede esconderse detrás de
         "Show N more". Ahí la columna derecha queda más larga que la tabla. */
      const n = Math.max(LIMITE_PACIENTES, Math.floor((libre + gap) / paso))
      setCuantos((p) => (p === n ? p : n))
    }
    medir()
    const ro = new ResizeObserver(medir)
    for (const r of [izq, buscar]) if (r.current) ro.observe(r.current)
    return () => ro.disconnect()
  }, [izq, buscar, hoy])
  return cuantos
}

export function BuscarPaciente({ busqueda, onBusqueda, paciente, saldoDe, onElegir, onCerrar, filas = LIMITE_PACIENTES, className }: {
  className?: string
  /** Cuántos pacientes se ven antes de "Show N more". */
  filas?: number
  busqueda: string
  onBusqueda: (q: string) => void
  paciente?: PacienteBilling
  saldoDe: (nombre: string) => number
  onElegir: (nombre: string) => void
  onCerrar: () => void
}) {
  const resultados = buscarPacientes(busqueda)
  return (
    <Panel
      title="Find patient"
      className={cn(TITULO_PEGADO, className)}
      bodyClassName="min-h-0 gap-2 pt-0"
      top={<div aria-live="polite">{paciente && <PacienteElegido key={paciente.nombre} paciente={paciente} onCerrar={onCerrar} />}</div>}
    >
      <SearchInput
        size="sm" clearable value={busqueda} onChange={onBusqueda}
        placeholder="Search by name, last name, email or DOB" aria-label="Find patient"
        className="flex-none shrink-0 sm:max-w-none"
      />

      {resultados.length === 0 ? (
        <EmptyState title="No recent patients/guarantors to show yet." className="py-6" />
      ) : (
        /* Se ven los que entran y "Show N more" abre el resto con scroll adentro, sin estirar el panel: la regla de las
           listas largas (ui/show-more, como Patients). Al buscar, el scroll vuelve a cero. */
        <ShowMore key={`${busqueda}:${filas}`} total={resultados.length} limit={filas} enCaja label="patients" className="flex flex-col gap-3">
          {(cuantos) => resultados.slice(0, cuantos).map((p) => (
            <ResultadoPaciente
              key={p.nombre}
              paciente={p}
              saldo={saldoDe(p.nombre)}
              elegido={p.nombre === paciente?.nombre}
              onElegir={() => onElegir(p.nombre)}
            />
          ))}
        </ShowMore>
      )}
    </Panel>
  )
}

/* Los pagos y ajustes son de un paciente: con uno elegido, los tres botones van en la fila del título, al lado de Export
   CSV, como red.dev y el Ledger (billing.md, 2026-11-19). */
export function AccionesPaciente({ onAccion }: {
  onAccion: (tipo: TipoAjusteBilling) => void
  /** Ya no se usa: Export statement salió de Billing (no está en red.dev). */
  onExportar?: () => void
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', ENTRADA)}>
      <Button size="md" onClick={() => onAccion('Patient Payment')}><Wallet /> Patient payment (-)</Button>
      <Button size="md" onClick={() => onAccion('Credit Adjustment')}><MinusCircle /> Credit adjustment (-)</Button>
      <Button size="md" onClick={() => onAccion('Charge Adjustment')}><PlusCircle /> Charge adjustment (+)</Button>
    </div>
  )
}

/* `inicial` sólo lo usan las stories (Pages › Parts › Billing): la ruta abre en el resumen, sin paciente. */
const [MES_HOY, DIA_HOY, ANIO_HOY] = HOY_BILLING.split('/').map(Number)
/** El día de hoy de los datos de prueba (un cargo no se postea con fecha futura). */
const HOY = new Date(ANIO_HOY, MES_HOY - 1, DIA_HOY)

export default function Billing({ inicial }: {
  inicial?: { seleccionado?: string; vista?: VistaPaciente; filtro?: FiltroActividad; busqueda?: string; vacia?: boolean }
} = {}) {
  const [actividad, setActividad] = useState(inicial?.vacia ? [] : ACTIVIDAD_RECIENTE)
  const [filtro, setFiltro] = useState<FiltroActividad>(inicial?.filtro ?? 'All')
  const [busqueda, setBusqueda] = useState(inicial?.busqueda ?? '')
  const [seleccionado, setSeleccionado] = useState<string | null>(inicial?.seleccionado ?? null)
  const [vista, setVista] = useState<VistaPaciente>(inicial?.vista ?? 'Patient view')
  const [modal, setModal] = useState<TipoAjusteBilling | null>(null)
  const refElegido = useRef<HTMLDivElement>(null)
  const subir = useRef(false)
  const refIzq = useRef<HTMLDivElement>(null)
  const refBuscar = useRef<HTMLDivElement>(null)
  const refHoy = useRef<HTMLDivElement>(null)
  const pacientesQueEntran = usePacientesQueEntran(refIzq, refBuscar, refHoy)

  const pacienteSeleccionado = seleccionado ? PACIENTES_BILLING.find((p) => p.nombre === seleccionado) : undefined
  const grupo = useMemo(() => (seleccionado ? grupoDeGarante(seleccionado) : []), [seleccionado])
  /* El guarantor del paciente elegido: Apply to ofrece a él (todo el hogar) y a los pacientes a su cargo. */
  const garanteDe = grupo.find((p) => p.rol === 'Guarantor')?.nombre ?? seleccionado ?? ''
  /* Resumen: por tipo. Paciente: lo suyo (Patient View) o todo lo de su garante (Guarantor View). */
  const filas = useMemo(() => {
    if (!seleccionado) return actividad.filter((m) => coincideFiltro(m, filtro))
    const quienes = vista === 'Guarantor view' ? grupo.map((p) => p.nombre) : [seleccionado]
    return actividad.filter((m) => quienes.includes(m.paciente))
  }, [actividad, filtro, seleccionado, vista, grupo])

  /* Cada paciente nuevo arranca en Patient View. */
  const elegir = (nombre: string) => {
    setSeleccionado(nombre)
    setVista('Patient view')
  }
  /* En el celular Find Patient queda debajo de la tabla: al elegir ahí se sube hasta sus botones (billing.md). */
  const elegirDeLaLista = (nombre: string) => {
    subir.current = nombre !== seleccionado
    elegir(nombre)
  }
  useEffect(() => {
    if (!subir.current) return
    subir.current = false
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    refElegido.current?.scrollIntoView({ block: 'nearest', behavior: quieto ? 'auto' : 'smooth' })
  }, [seleccionado])

  /* `saldoDe` (de data/billing.ts) lee el mock estático: acá hace falta el
     saldo con lo que ya se posteó en esta sesión, así que se calcula sobre
     `actividad` -si no, la card de "Open Balance" se queda vieja apenas se
     postea un primer pago. */
  const saldoActual = (paciente: string) => actividad.find((m) => m.paciente === paciente)?.saldo ?? 0

  /* Un movimiento por transacción; lo que aplicó a cada cargo se suma a las aplicaciones para que esos cargos dejen de
     figurar como abiertos (billing.md, 2026-11-19). */
  const registrarPago = (m: Omit<Movimiento, 'id'>, aplicado: Record<string, number>) => {
    const id = `act-${Date.now()}`
    registrarAplicaciones(Object.entries(aplicado).map(([cargo, monto], i) => ({ id: `ap-${id}-${i}`, origen: id, cargo, fecha: m.fecha, monto })))
    setActividad((p) => [{ ...m, id, saldo: saldoActual(m.paciente) + m.monto }, ...p])
    aviso.ok(`${m.descripcion} of ${moneda(Math.abs(m.monto))} posted for ${m.paciente}.`)
    setModal(null)
  }

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* Como red.dev y el Ledger: con un paciente, sus tres botones en la fila del título; Export CSV exporta la
          actividad de la clínica y con un paciente se apaga (billing.md, 2026-11-13 y 2026-11-19). */}
      <div ref={refElegido} className="flex scroll-mt-4 flex-wrap items-start justify-between gap-3">
        <PageTitle>Billing</PageTitle>
        <div className="flex flex-wrap items-center gap-2">
          {pacienteSeleccionado && <AccionesPaciente key={pacienteSeleccionado.nombre} onAccion={setModal} />}
          <Button
            variant="secondary"
            size="md"
            disabled={!!seleccionado}
            title={seleccionado ? 'Clear the selected patient to export all activity' : undefined}
            onClick={() => { exportarCsv(filas); aviso.ok(`${filas.length} transactions exported.`) }}
          >
            <Download /> Export CSV
          </Button>
        </div>
      </div>

      {/* Los cinco números de borde a borde, como red.dev y las métricas del Ledger. */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-6 xl:grid-cols-5">
        {STATS_BILLING.map((s, i) => <Stat key={s.label} {...s} enFila className={cn(LUGAR_NUMERO[i], 'xl:col-span-1')} />)}
      </div>

      {/* La actividad a la izquierda; Find Patient y Today a la derecha, como red.dev. La columna derecha mide lo mismo que
          la tabla: Find Patient con los pacientes que entran y Today hasta el final (billing.md, 2026-11-24). La izquierda
          no se estira: su alto es el que se mide. */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div ref={refIzq} className="flex min-w-0 flex-col gap-4 lg:self-start">
          <ActividadReciente
            className="flex-1"
            filas={filas}
            sinActividad={actividad.length === 0}
            filtro={filtro}
            onFiltro={setFiltro}
            paciente={pacienteSeleccionado}
            vista={vista}
            onVista={setVista}
            onElegir={elegir}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div ref={refBuscar} className="shrink-0">
            <BuscarPaciente
              filas={pacientesQueEntran}
              busqueda={busqueda}
              onBusqueda={setBusqueda}
              paciente={pacienteSeleccionado}
              saldoDe={saldoActual}
              onElegir={elegirDeLaLista}
              onCerrar={() => setSeleccionado(null)}
            />
          </div>
          {/* Las tres cards siempre a la vista: con poco alto pasan a una fila cada una y se reparten el alto (el
              contenedor `hoy` y `filaSiNoEntra` de ui/stat-card); con lugar, enteras. */}
          <div ref={refHoy} className="flex flex-col lg:flex-1">
            <Panel title="Today" className={cn('lg:flex-1', TITULO_PEGADO)} bodyClassName="gap-3 pt-0">
              <div data-hoy className="lg:min-h-[184px] lg:flex-1 lg:[container:hoy/size]">
                <div className="flex flex-col gap-3 lg:h-full [@container_hoy_(max-height:339px)]:gap-2">
                  {STATS_HOY.map((s) => <Stat key={s.label} interna filaSiNoEntra {...s} />)}
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {modal && seleccionado && (
        <PostPaymentDialog
          tipoInicial={modal}
          movs={actividad}
          aplicaciones={APLICACIONES_BILLING}
          garante={garanteDe}
          dependientes={grupo.filter((p) => p.nombre !== garanteDe).map((p) => p.nombre)}
          alcanceInicial={vista === 'Guarantor view' ? ALCANCE_GUARANTOR : seleccionado}
          hoy={HOY}
          providers={[...PROVIDERS_BILLING]}
          onClose={() => setModal(null)}
          onGuardar={registrarPago}
        />
      )}
    </div>
  )
}
