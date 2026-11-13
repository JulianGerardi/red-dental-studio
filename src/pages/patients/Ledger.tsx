import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Search, Receipt, Wallet, HandCoins, Download, MoveHorizontal, FileText, ListChecks,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { RowChevron } from '@/components/ui/data-table'
import { SearchButton } from '@/components/ui/search-button'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import { FilterMenu } from '@/components/ui/filter-menu'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StatStrip, type Stat } from '@/components/dashboard/StatStrip'
import {
  APLICACIONES, MOVIMIENTOS, TIPOS, GUARANTOR, DEPENDIENTES, alcanceDe, coberturaSeguro, conSaldo, fechaCorta, moneda,
  pendienteDe, tieneCredito, type Aplicacion, type Movimiento,
} from '@/data/ledger'
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Avatar, inicialesDe } from '@/components/ui/avatar'
import { tratamientoDe } from '@/components/clinical/RecordDetail'
import { PROCEDIMIENTOS } from '@/data/clinical-mode'
import { TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { Pill } from '@/components/ui/pill'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { ColumnPicker } from '@/components/patients/ledger/ColumnPicker'
import { useAnchoColumnas, useAnchoVisible, ManijaResize } from '@/components/patients/ledger/useAnchoColumnas'
import { LedgerRowDetail, LedgerRowModal, BotonExpandirTodo, FilaConTooltip, TONO_TIPO, nombreTipo } from '@/components/patients/ledger/LedgerRowDetail'
import { PatientPaymentPanel } from '@/components/patients/ledger/PatientPaymentPanel'
import { CreditAdjustmentPanel } from '@/components/patients/ledger/CreditAdjustmentPanel'
import { ChargeAdjustmentPanel } from '@/components/patients/ledger/ChargeAdjustmentPanel'
import { AplicarCreditoModal } from '@/components/patients/ledger/AplicarCreditoModal'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'
import { Tabs } from '@/components/ui/tabs'
import { formatMDY } from '@/lib/fecha'

/* Figma 4582:28487 / 4588:84886. Ver design-reference/figma/modulos/ledger.md. */

/* Type con los nombres de CON-3753 (Procedure, Patient Payment…); el código va en su propia columna, CDT Code.
   Ver ledger.md (2026-11-12). */
/** Un cargo (procedimiento o Charge Adjustment): lo que tiene saldo propio. */
const esCargo = (m: Movimiento) => m.tipo !== 'Insurance' && m.monto > 0

/* No es un `tipo` real -es una condición sobre `creditoDisponible`-, así que
   se agrega como una opción más al lado de Charge/Payment/Adjustment/
   Insurance en el mismo filtro, no como un filtro aparte. */
const FILTRO_CREDITO = 'Unapplied Credits'
const OPCIONES_FILTRO = [...TIPOS, FILTRO_CREDITO]

/* Columnas de CON-3753 / CON-3755 (ledger.md, 2026-11-12). Unapplied Credit es opcional: arranca oculta. */
type ColLedger = 'fecha' | 'codigo' | 'paciente' | 'tipo' | 'desc' | 'provider' | 'monto' | 'pendiente' | 'saldo' | 'credito'

const ANCHO_BASE: Record<ColLedger, number> = {
  fecha: 84, codigo: 64, paciente: 120, tipo: 132, desc: 180, provider: 120, monto: 88, pendiente: 88, saldo: 96, credito: 136,
}
const OCULTAS_DE_ENTRADA: ColLedger[] = ['credito']

/* Piso de cada columna: hasta acá pueden encoger para que la tabla entre
   entera cuando el menú lateral y el panel del paciente están abiertos, en
   vez de desbordar y pedir scroll. Medidos contra el contenido real:
   "March 17, 2025" 93px, la pastilla "Ins Payment" 86, "-$9,850.00" 71.
   Patient/Description/Provider truncan y ya tienen tooltip. */
const ANCHO_MINIMO: Record<ColLedger, number> = {
  fecha: 76, codigo: 48, paciente: 72, tipo: 124, desc: 120, provider: 80, monto: 76, pendiente: 76, saldo: 76, credito: 128,
}

/* Techo de Description: pasado eso, lo que sobra se reparte entre las
   demás. 280 deja intacto el ancho de escritorio -a 934px la columna llega
   a 230- y sólo entra en juego cuando se ocultan columnas. */
const MAX_ELASTICA = 280

type ColumnaLedger = {
  id: ColLedger; label: string
  elastica?: boolean; derecha?: boolean; bloqueada?: boolean
  claseCelda?: string
  titulo?: (m: Fila) => string
  celda: (m: Fila) => React.ReactNode
}
type Fila = Movimiento & { saldo: number; pendiente?: number }

const COLUMNAS: ColumnaLedger[] = [
  { id: 'fecha', label: 'Trans. Date', bloqueada: true, claseCelda: 'tabular-nums', celda: (m) => fechaCorta(m.fecha) },
  { id: 'codigo', label: 'CDT Code', claseCelda: 'text-[12px] font-medium tabular-nums', celda: (m) => (m.tipo === 'Charge' ? m.codigo : '—') },
  /* Un pago o crédito de la cuenta (scope guarantor) no es de un paciente: CON-3755. */
  {
    id: 'paciente', label: 'Patient / Account', claseCelda: 'truncate text-ink',
    titulo: (m) => cuentaDe(m), celda: (m) => cuentaDe(m),
  },
  { id: 'tipo', label: 'Type', celda: (m) => <Pill tone={TONO_TIPO[nombreTipo(m)]} className="whitespace-nowrap">{nombreTipo(m)}</Pill> },
  { id: 'desc', label: 'Description', elastica: true, claseCelda: 'truncate text-ink', titulo: (m) => m.descripcion, celda: (m) => m.descripcion },
  { id: 'provider', label: 'Provider', claseCelda: 'truncate', titulo: (m) => m.provider, celda: (m) => m.provider },
  /* Los negativos bajan la cuenta: van en verde. */
  {
    id: 'monto', label: 'Amount', derecha: true, claseCelda: 'font-medium tabular-nums',
    celda: (m) => <span className={m.monto < 0 ? 'text-dash-ok-fg' : 'text-ink'}>{moneda(m.monto)}</span>,
  },
  /* Trans. Bal.: lo que falta del cargo; un pago o crédito no tiene saldo propio (—). Ledger Bal.: la cuenta corrida. */
  {
    id: 'pendiente', label: 'Trans. Bal.', derecha: true, claseCelda: 'tabular-nums text-ink',
    celda: (m) => (m.pendiente === undefined ? <span className="text-ink-faint">—</span> : moneda(m.pendiente)),
  },
  { id: 'saldo', label: 'Ledger Bal.', derecha: true, bloqueada: true, claseCelda: 'font-semibold tabular-nums text-ink', celda: (m) => moneda(m.saldo) },
  {
    /* Opcional (CON-3753): Apply credit también está en el ⋮ y en el detalle de la fila. */
    id: 'credito', label: 'Unapplied Credit', derecha: true,
    celda: (m) => {
      if (!tieneCredito(m)) return null
      return (
        <button
          type="button"
          data-apply-credit
          aria-label={`Apply ${moneda(m.creditoDisponible ?? 0)} credit from ${m.descripcion}`}
          className="text-dash-blue inline-flex items-center gap-1.5 rounded-md border border-[#c7d9fb] bg-info-bg px-1.5 py-1 text-[12px] font-medium whitespace-nowrap tabular-nums hover:bg-[#e3edff]"
        >
          <HandCoins className="size-3.5 shrink-0" />
          {moneda(m.creditoDisponible ?? 0)} · Apply
        </button>
      )
    },
  },
]
/** Saldo corrido y lo que falta de cada cargo, de lo más nuevo a lo más viejo. */
const filasDe = (lista: Movimiento[], apls: Aplicacion[]): Fila[] =>
  conSaldo(lista).map((m) => ({ ...m, pendiente: esCargo(m) ? pendienteDe(m, apls) : undefined })).reverse()
const cuentaDe = (m: Movimiento) => (alcanceDe(m) === 'guarantor' ? 'Guarantor / Account' : m.paciente)

/** El caso de Treatment Plan de un procedimiento, por su vínculo; de ahí sale Estimation details del ⋮. */
const casoDelCargo = (m: Movimiento) => {
  const pr = m.procedimiento ? PROCEDIMIENTOS.find((p) => p.id === m.procedimiento) : undefined
  return pr ? tratamientoDe(pr)?.caso : undefined
}

/* El ⋮ de la fila (CON-3753): Apply credit con crédito sin aplicar y Estimation details en un procedimiento con caso. Sin
   acciones no hay ⋮: un menú que dice "No actions available" es un clic perdido (ledger.md, 2026-11-12). */
function AccionesFila({ m, onAplicar, onAbrirCaso, onOpenChange }: {
  m: Movimiento; onAplicar: () => void; onAbrirCaso: (caso: string) => void; onOpenChange: (open: boolean) => void
}) {
  const caso = casoDelCargo(m)
  const credito = tieneCredito(m)
  if (!credito && !caso) return null
  return (
    <RowActionsMenu label={m.descripcion} onOpenChange={onOpenChange}>
      {credito && (
        <DropdownMenuItem onSelect={onAplicar}>
          <HandCoins /> Apply credit
        </DropdownMenuItem>
      )}
      {credito && caso && <DropdownMenuSeparator />}
      {caso && (
        <>
          <DropdownMenuLabel className="text-xs text-ink-muted">Estimation details</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => onAbrirCaso(caso.id)}>
            <FileText /> <span className="truncate">{caso.nombre}</span>
          </DropdownMenuItem>
        </>
      )}
    </RowActionsMenu>
  )
}

/* Guarantor View: quiénes comparten la cuenta, como en red.dev (CON-4076). */
function Household() {
  const personas = [{ nombre: GUARANTOR, rol: 'Guarantor' }, ...DEPENDIENTES.map((nombre) => ({ nombre, rol: 'Dependent' }))]
  return (
    <section aria-labelledby="ledger-household" className={cn(TARJETA_PANEL, 'mt-4 p-4')}>
      <h2 id="ledger-household" className="text-[15px] font-semibold text-ink">Household</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {personas.map((p) => (
          <li key={p.nombre} className={cn(TARJETA_INTERNA, 'flex min-w-0 items-center gap-3 p-3')}>
            <Avatar aria-hidden initials={inicialesDe(p.nombre)} size={36} />
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink" title={p.nombre}>{p.nombre}</span>
            <Pill tone={p.rol === 'Guarantor' ? 'info' : 'neutral'} size="sm">{p.rol}</Pill>
          </li>
        ))}
      </ul>
    </section>
  )
}

const VISTAS = ['Patient View', 'Guarantor View'] as const
type Vista = (typeof VISTAS)[number]

const TABS = [
  { id: 'transacciones', label: 'Transactions', titulo: 'Ledger' },
  { id: 'pago', label: 'Patient Payment (-)', titulo: 'New Patient Payment (-)' },
  { id: 'credito', label: 'Credit Adjustment (-)', titulo: 'New Credit (-) Adjustment' },
  { id: 'cargo', label: 'Charge Adjustment (+)', titulo: 'Enter Charge (+) Adjustment' },
] as const
type Tab = (typeof TABS)[number]['id']

export default function Ledger() {
  const { id = 'john-smith' } = useParams()
  const [movs, setMovs] = useState(MOVIMIENTOS)
  /* A qué cargo fue cada pago o ajuste: lo lee el detalle de la fila (Financial details, Applied transactions) y lo suma
     Apply credit. Ver ledger.md (2026-10-14). */
  const [aplicaciones, setAplicaciones] = useState(APLICACIONES)
  const [vista, setVista] = useState<Vista>('Patient View')
  const [q, setQ] = useState('')
  const [tipos, setTipos] = useState<string[]>([])
  const [tab, setTab] = useState<Tab>('transacciones')
  const [pagina, setPagina] = useState(1)
  const [expandidas, setExpandidas] = useState<string[]>([])
  const [ocultas, setOcultas] = useState<ColLedger[]>(OCULTAS_DE_ENTRADA)
  const alternarCol = (id: ColLedger) =>
    setOcultas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const [enModal, setEnModal] = useState<Fila | null>(null)
  /* La fila a la que se llegó desde el link de otra transacción: se resalta un momento. */
  const [resaltada, setResaltada] = useState<string | null>(null)
  const navegar = useNavigate()
  const [enCredito, setEnCredito] = useState<Fila | null>(null)
  const [menuDe, setMenuDe] = useState<string | null>(null)
  const anchos = useAnchoColumnas<ColLedger>(ANCHO_BASE)
  const refVisible = useAnchoVisible<HTMLDivElement>()

  const alternarFila = (id: string) =>
    setExpandidas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  /* Aplicar crédito no genera un movimiento nuevo -esa plata ya está
     contada en el saldo desde que el Payment/Adjustment se registró-, sólo
     descuenta lo aplicado del remanente de la transacción de origen. */
  const aplicarCredito = (id: string, monto: number, porCargo: Record<string, number>) => {
    setMovs((prev) => prev.map((mv) =>
      mv.id === id ? { ...mv, creditoDisponible: Math.max((mv.creditoDisponible ?? 0) - monto, 0) } : mv,
    ))
    const hoy = formatMDY(new Date())
    setAplicaciones((p) => [...p, ...Object.entries(porCargo).map(([cargo, m], i) => ({ id: `a-${Date.now()}-${i}`, origen: id, cargo, fecha: hoy, monto: m }))])
    aviso.ok(`${moneda(monto)} of credit applied.`)
    setEnCredito(null)
  }

  /* Una columna movida a mano se queda donde la dejaron: no encoge ni
     crece. El resto cede hasta su piso para que la tabla entre entera, y al
     sobrar lugar Description se lo queda primero (peso alto) hasta su
     techo; recién ahí el excedente se reparte entre las demás. */
  const estilo = (c: ColumnaLedger) => {
    const fijada = anchos.manual(c.id) !== undefined
    if (fijada) {
      return { width: anchos.ancho(c.id), minWidth: anchos.ancho(c.id), flexGrow: 0, flexShrink: 0 }
    }
    return {
      width: anchos.ancho(c.id),
      minWidth: ANCHO_MINIMO[c.id],
      maxWidth: c.elastica ? MAX_ELASTICA : undefined,
      flexGrow: c.elastica ? 1000 : 1,
      flexShrink: 1,
    }
  }
  const columnasVisibles = COLUMNAS.filter((c) => !ocultas.includes(c.id))

  /* + la flecha de la fila (16 y su gap). */
  const anchoMinimo = columnasVisibles.reduce(
    (a, c) => a + (anchos.manual(c.id) ?? ANCHO_MINIMO[c.id]), 0,
  ) + columnasVisibles.length * 12 + 16 + 24 + 28 + 12

  /* Ledger Bal. corre en orden de fecha sobre lo que muestra la vista (en Patient View, sólo lo del paciente: así la
     primera fila da el Patient balance), y la tabla va de lo más nuevo a lo más viejo (CON-3753, ledger.md 2026-11-12). */
  const enOrden = useMemo(() => {
    const fecha = (m: Movimiento) => new Date(m.fecha).getTime() || 0
    return movs.map((m, i) => ({ m, i })).sort((a, b) => fecha(a.m) - fecha(b.m) || a.i - b.i).map((x) => x.m)
  }, [movs])
  const conSaldoTotal = useMemo(() => filasDe(enOrden, aplicaciones), [enOrden, aplicaciones])
  const delaVista = useMemo(
    () => (vista === 'Guarantor View' ? conSaldoTotal : filasDe(enOrden.filter((m) => m.paciente === GUARANTOR), aplicaciones)),
    [conSaldoTotal, enOrden, vista, aplicaciones],
  )

  const filas = useMemo(
    () => delaVista.filter(
      (m) =>
        (tipos.length === 0 || tipos.includes(m.tipo) || (tipos.includes(FILTRO_CREDITO) && tieneCredito(m))) &&
        `${m.codigo} ${m.descripcion} ${m.provider} ${m.paciente}`.toLowerCase().includes(q.trim().toLowerCase()),
    ),
    [delaVista, q, tipos],
  )
  const TAM_PAGINA = 8
  const paginas = Math.max(1, Math.ceil(filas.length / TAM_PAGINA))
  const paginaActual = Math.min(pagina, paginas)
  const filasPagina = filas.slice((paginaActual - 1) * TAM_PAGINA, paginaActual * TAM_PAGINA)

  /* "todas" es sobre lo que se ve en pantalla, no sobre la cuenta entera:
     abrir 26 filas de golpe en una tabla paginada no le sirve a nadie. */
  const todasAbiertas = filasPagina.length > 0 && filasPagina.every((m) => expandidas.includes(m.id))
  const hayAlgunaAbierta = filasPagina.some((m) => expandidas.includes(m.id))
  const expandirTodo = () =>
    setExpandidas((p) => [...new Set([...p, ...filasPagina.map((m) => m.id)])])
  const colapsarTodo = () =>
    setExpandidas((p) => p.filter((id) => !filasPagina.some((m) => m.id === id)))

  /* Las cuatro de red.dev con los textos de sus ⓘ; las tres primeras salen de CON-3753 / CON-3755 (ledger.md, 2026-11-12). */
  const stats: Stat[] = useMemo(() => {
    const cuenta = vista === 'Guarantor View'
    const abiertos = delaVista.filter((m) => (m.pendiente ?? 0) > 0)
    const saldo = delaVista.reduce((a, m) => a + m.monto, 0)
    /* Con el reclamo pendiente, el paciente debe sólo lo que el seguro no cubriría. */
    const responsabilidad = abiertos.reduce(
      (a, m) => a + (m.pendiente ?? 0) * (m.estado === 'Pending' ? 1 - coberturaSeguro(m.codigo) : 1), 0,
    )
    const credito = delaVista.filter((m) => tieneCredito(m) && (cuenta || alcanceDe(m) === 'patient'))
      .reduce((a, m) => a + (m.creditoDisponible ?? 0), 0)
    return [
      cuenta
        ? { label: 'Guarantor balance', value: moneda(saldo), icon: Wallet, info: 'Consolidated balance of the household ledger. A negative value means available credit.' }
        : { label: 'Patient balance', value: moneda(saldo), icon: Wallet, info: 'What the patient owes in this ledger. A negative value means available credit.' },
      cuenta
        ? { label: 'Guarantor responsibility', value: moneda(responsabilidad), icon: Receipt, info: 'The portion of the household balance the guarantor is responsible for.' }
        : { label: 'Patient responsibility', value: moneda(responsabilidad), icon: Receipt, info: 'The portion of the balance the patient is responsible for.' },
      { label: 'Unapplied credits', value: moneda(credito), icon: HandCoins, info: cuenta ? 'Household credit that is still available.' : 'Credit originated by this patient that is still available.' },
      { label: 'Open charges', value: String(abiertos.length), icon: ListChecks, info: 'Charges with a remaining balance greater than zero.' },
    ]
  }, [delaVista, vista])

  const agregar = (m: Omit<Movimiento, 'id'>) => {
    setMovs((p) => [...p, { ...m, id: `m${p.length + 1}-${Date.now()}` }])
  }

  const cargosDeLaCuenta = movs.filter((m) => m.tipo === 'Charge')
  /* El link a otra transacción (ledger.md, 2026-10-14): si está en la tabla con la búsqueda y el filtro de ahora, va a
     su página, la despliega y la resalta; si no, abre su registro. Nunca cambia los filtros. */
  const verTransaccion = (x: Movimiento) => {
    const i = filas.findIndex((f) => f.id === x.id)
    if (i < 0) return setEnModal(conSaldoTotal.find((f) => f.id === x.id) ?? null)
    setEnModal(null)
    setPagina(Math.floor(i / TAM_PAGINA) + 1)
    setExpandidas((p) => (p.includes(x.id) ? p : [...p, x.id]))
    setResaltada(x.id)
  }
  const abrirClinica = ({ caso, procedimiento }: { caso?: string; procedimiento?: string }) =>
    navegar(`/patients/${id}/clinical-mode?${new URLSearchParams(caso ? { case: caso } : { procedure: procedimiento ?? '' })}`)
  useEffect(() => {
    if (!resaltada) return
    document.getElementById(`fila-${resaltada}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const t = setTimeout(() => setResaltada(null), 1800)
    return () => clearTimeout(t)
  }, [resaltada])
  const volver = () => setTab('transacciones')
  const tituloActivo = TABS.find((t) => t.id === tab)?.titulo ?? 'Ledger'

  return (
    <div className={CONTENEDOR_PAGINA}>
      <PatientBreadcrumb name="John Smith" section="Ledger" />
      <div className="flex flex-col gap-5 lg:flex-row">
        <PatientSidePanel
          name="John Smith" initials="JS" section="Ledger"
          basePath={`/patients/${id}`}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <h1 className="text-xl leading-[1.3] font-semibold text-ink">{tituloActivo}</h1>

          <Tabs className="mt-4" aria-label="Ledger sections" tabs={TABS.map((t) => ({ value: t.id, label: t.label }))} value={tab} onChange={setTab} />

          {tab === 'transacciones' && (
            <>
              <div className="mt-4">
                <StatStrip stats={stats} apilada />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    value={q}
                    onChange={(e) => { setQ(e.target.value); setPagina(1) }}
                    placeholder="Search by code, description or provider"
                    className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
                  />
                </div>
                <SearchButton onClick={() => setPagina(1)} className="h-9" />
                <FilterMenu label="Filter entries" options={OPCIONES_FILTRO} value={tipos} onChange={(v) => { setTipos(v); setPagina(1) }} />
                {filasPagina.length > 0 && (
                  <BotonExpandirTodo todasAbiertas={todasAbiertas} hayAlgunaAbierta={hayAlgunaAbierta}
                  onExpandirTodo={expandirTodo} onColapsarTodo={colapsarTodo} />
                )}

                <div className="ml-auto flex flex-wrap items-center gap-3">
                  <Tabs className="shrink-0" aria-label="Ledger view" tabs={VISTAS} value={vista} onChange={(v) => { setVista(v); setPagina(1) }} />
                  <ColumnPicker
                    columnas={COLUMNAS}
                    ocultas={ocultas}
                    onToggle={alternarCol}
                    onReset={() => setOcultas(OCULTAS_DE_ENTRADA)}
                    porDefecto={OCULTAS_DE_ENTRADA}
                  />
                  <button
                    type="button"
                    onClick={() => aviso.ok('Statement exported.')}
                    className="flex h-9 items-center gap-2 rounded-md border border-line bg-white px-4 text-[13px] font-medium hover:bg-surface-subtle"
                  >
                    <Download className="size-4" /> Export statement
                  </button>
                </div>
              </div>

              {/* `skipDelayDuration={0}`: sin esto Radix deja una ventana de gracia
                  y al barrer la tabla el tooltip de la fila siguiente abre al
                  instante -y alcanza a mostrar el contenido de la anterior-, que
                  es el parpadeo que hacía imposible leerlo. */}
              <TooltipProvider delayDuration={500} skipDelayDuration={0}>
              <div ref={refVisible} data-tabla-scroll className="mt-4 w-full overflow-x-auto rounded-lg border border-line-row bg-white lg:flex lg:flex-1 lg:flex-col">
                <div style={{ minWidth: anchoMinimo }} className="lg:flex lg:flex-1 lg:flex-col">
                  <div data-tabla-header className="group/fila flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
                    <span className="w-4 shrink-0" aria-hidden />
                    {columnasVisibles.map((c, i) => (
                      <span
                        key={c.id}
                        data-elastica={c.elastica || undefined}
                        style={estilo(c)}
                        className={cn('relative flex items-center', c.derecha && 'justify-end')}
                      >
                        <span className="truncate">{c.label}</span>
                        <ManijaResize id={c.id} label={c.label} estado={anchos} indice={i} />
                      </span>
                    ))}
                    <span className="relative w-7 shrink-0"><span className="sr-only">Actions</span></span>
                  </div>

                  {filasPagina.length === 0 ? (
                    <EmptyState icon={Receipt} title="No entries" detail="Nothing matches the current search or filters." />
                  ) : (
                    filasPagina.map((m) => {
                      const abierta = expandidas.includes(m.id)
                      return (
                      <div
                        key={m.id}
                        id={`fila-${m.id}`}
                        className={cn(
                          'border-t border-line-row',
                          /* Barra azul de 4px al borde de las filas con crédito
                             sin aplicar; cubre también el detalle si se expande. */
                          tieneCredito(m) && 'relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-dash-blue',
                        )}
                      >
                        <FilaConTooltip m={m} abierta={abierta} callado={menuDe === m.id}>
                        <div
                          role="button"
                          tabIndex={0}
                          aria-expanded={abierta}
                          aria-label={`Toggle details for ${m.descripcion}`}
                          onClick={(e) => {
                            if ((e.target as HTMLElement).closest('[role="separator"]')) return
                            /* El botón "Apply credit" vive adentro de la celda de
                               Description -no tiene sentido un handler propio por
                               columna sólo para esto-, así que se intercepta acá
                               igual que el `separator` del resize de columnas. */
                            if ((e.target as HTMLElement).closest('[data-apply-credit]')) { setEnCredito(m); return }
                            alternarFila(m.id)
                          }}
                          onKeyDown={(e) => {
                            if (e.target !== e.currentTarget) return
                            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternarFila(m.id) }
                          }}
                          className={cn(
                            'group/fila flex cursor-pointer items-center gap-3 px-3 py-3 text-[13px] text-ink-soft transition-colors duration-700 hover:bg-surface-subtle',
                            resaltada === m.id ? 'bg-dash-count-bg' : abierta && 'bg-surface-subtle',
                          )}
                        >
                          <RowChevron open={abierta} />
                          {columnasVisibles.map((c) => (
                            <span
                              key={c.id}
                              style={estilo(c)}
                              className={cn('relative', c.derecha && 'text-right', c.claseCelda)}
                            >
                              {c.celda(m)}
                            </span>
                          ))}
                          {/* El menú vive en un portal pero sus clics suben por React: se cortan acá para no abrir la fila. Las
                              teclas no: la fila ya ignora las que no son suyas, y cortarlas acá dejaba sin Escape al menú. */}
                          <span className="flex w-7 shrink-0 justify-end" onClick={(e) => e.stopPropagation()}>
                            <AccionesFila m={m} onAplicar={() => setEnCredito(m)} onAbrirCaso={(caso) => abrirClinica({ caso })}
                              onOpenChange={(open) => setMenuDe(open ? m.id : null)} />
                          </span>
                        </div>
                        </FilaConTooltip>
                        {abierta && (
                          <LedgerRowDetail
                            m={m}
                            aplicaciones={aplicaciones}
                            movimientos={movs}
                            onVerTransaccion={verTransaccion}
                            onAbrirClinica={abrirClinica}
                            onAplicarCredito={tieneCredito(m) ? () => setEnCredito(m) : undefined}
                          />
                        )}
                      </div>
                      )
                    })
                  )}

                  {/* El resumen cierra la tabla: adentro del mismo borde y
                      arriba del paginado, no suelto afuera de la card. */}
                  <div className="flex justify-end border-t border-line-row px-3 py-3">
                    <dl className="w-fit overflow-hidden rounded-md border border-line text-[13px]">
                      <div className="flex items-center">
                        <dt className="w-36 bg-surface-alt px-3 py-2 text-right font-medium text-ink-soft">Balance due</dt>
                        <dd className="text-dash-blue w-24 px-3 py-2 text-right font-semibold tabular-nums">
                          {moneda(delaVista.reduce((a, m) => a + m.monto, 0))}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3 lg:mt-auto">
                    <span className="flex items-center gap-3 text-xs font-semibold text-ink-muted">
                      Showing {filasPagina.length} of {filas.length} entries
                      {anchos.avisando && (
                        <span className="motion-safe:animate-[col-hint_2.4s_ease-in-out_both] hidden items-center gap-1.5 font-medium text-ink-faint lg:flex">
                          <MoveHorizontal className="size-3.5" /> Drag column edges to resize · double-click to reset
                        </span>
                      )}
                      {anchos.hayCambios && (
                        <button type="button" onClick={anchos.resetear} className="text-dash-blue hidden hover:underline lg:inline">
                          Reset column widths
                        </button>
                      )}
                    </span>
                    <Pagination pagina={paginaActual} paginas={paginas} onChange={setPagina} />
                  </div>
                </div>
              </div>
              </TooltipProvider>
              {vista === 'Guarantor View' && <Household />}
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

      {enModal && <LedgerRowModal key={enModal.id} m={enModal} aplicaciones={aplicaciones} movimientos={movs} onVerTransaccion={verTransaccion} onAbrirClinica={abrirClinica} onClose={() => setEnModal(null)} />}
      {enCredito && (
        <AplicarCreditoModal
          m={enCredito}
          /* Lo que falta de cada cargo, no su monto original: lo ya pagado no se vuelve a cubrir. */
          cargos={cargosDeLaCuenta.filter((c) => c.paciente === enCredito.paciente && pendienteDe(c, aplicaciones) > 0).map((c) => ({ ...c, monto: pendienteDe(c, aplicaciones) }))}
          onClose={() => setEnCredito(null)}
          onAplicar={(monto, porCargo) => aplicarCredito(enCredito.id, monto, porCargo)}
        />
      )}
    </div>
  )
}
