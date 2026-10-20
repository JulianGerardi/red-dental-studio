import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type CSSProperties, type Ref } from 'react'
import {
  CreditCard, Search, X, Download, Wallet, MinusCircle, PlusCircle,
} from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { moneda, type Movimiento } from '@/data/ledger'
import {
  APLICACIONES_BILLING, PACIENTES_BILLING, buscarPacientes, grupoDeGarante, ACTIVIDAD_RECIENTE, STATS_BILLING, STATS_HOY, FILTROS_ACTIVIDAD,
  VISTAS_PACIENTE, type FiltroActividad, type PacienteBilling, type TipoAjusteBilling, type VistaPaciente,
} from '@/data/billing'
import { PostPaymentDialog } from '@/components/billing/PostPaymentDialog'
import { DetalleMovimiento, LedgerRowModal } from '@/components/patients/ledger/LedgerRowDetail'
import { Pill, type PillTone } from '@/components/ui/pill'
import { AmountCell, DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { CONTENEDOR_PAGINA, ICONO_SUELTO, TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'
import { Tabs } from '@/components/ui/tabs'
import { ShowMore } from '@/components/ui/show-more'
import { Panel } from '@/components/dashboard/primitives'
import { InfoTip } from '@/components/ui/info-tip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

/* Figma 4481:9881 "Billing". Ver design-reference/figma/modulos/billing.md.
   Las 4 pantallas del frame son estados de una sola vista: vacía, poblada,
   con el modal "Post payment" encima y con un paciente elegido -acá son
   \`filas.length === 0\`, el modal y \`seleccionado\`, no rutas separadas.
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

/* Sobre el fondo gris es card de página; adentro de Today, InnerCard. \`info\` suma el círculo
   de info arriba a la derecha (billing.md, 2026-10-09). */
export function Stat({ label, value, caption, info, interna, enFila, compacta, className }: {
  label: string; value: string; caption: string; info?: string; interna?: boolean
  /** Today: etiqueta y bajada a la izquierda, el número a la derecha, en una sola fila baja (billing.md, 2026-10-19). */
  compacta?: boolean
  /** En una fila de cards: etiqueta, número y bajada se alinean con los de al lado (subgrid de tres filas). */
  enFila?: boolean
  className?: string
}) {
  if (compacta) {
    return (
      <div className={cn('flex min-w-0 items-center justify-between gap-2.5 p-2.5', interna ? TARJETA_INTERNA : TARJETA_PANEL, className)}>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="flex items-center gap-1 text-[13px] leading-snug font-semibold text-ink">
            {label}
            {info && <InfoTip title={label}>{info}</InfoTip>}
          </p>
          <p className="line-clamp-2 text-[11px] leading-snug text-ink-muted" title={caption}>{caption}</p>
        </div>
        <p className="text-dash-blue shrink-0 text-base font-bold tabular-nums">{value}</p>
      </div>
    )
  }
  return (
    <div className={cn('min-w-0', enFila ? 'p-3' : 'p-4', interna ? TARJETA_INTERNA : TARJETA_PANEL, enFila && 'row-span-3 grid grid-rows-subgrid gap-y-0', className)}>
      {/* En una card angosta la etiqueta y la bajada pasan a dos líneas en vez de cortarse (billing.md, 2026-10-13). */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs leading-snug text-ink-muted">{label}</p>
        {info && <InfoTip title={label}>{info}</InfoTip>}
      </div>
      <p className="text-dash-blue mt-1 text-xl font-bold tabular-nums">{value}</p>
      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink-faint" title={caption}>{caption}</p>
    </div>
  )
}

/* Los cinco números en la columna izquierda: cinco en fila desde 1280px; antes, 3 + 2 del mismo ancho por fila; en el
   celular 2 + 2 y el último entero. */
const LUGAR_NUMERO = ['sm:col-span-2', 'sm:col-span-2', 'sm:col-span-2', 'sm:col-span-3', 'col-span-2 sm:col-span-3']

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
  { key: 'paciente', header: 'Patient', width: 124, cell: (m) => <TextCell>{m.paciente}</TextCell> },
  {
    key: 'tipo', header: 'Type', width: 92, cell: (m) => {
      const t = detalleTipo(m)
      return m.tipo === 'Charge' ? t.texto : <Pill tone={t.tono}>{t.texto}</Pill>
    },
  },
  { key: 'desc', header: 'Description', cell: (m) => <TextCell>{m.descripcion}</TextCell> },
  { key: 'provider', header: 'Provider', width: 124, cell: (m) => <TextCell>{m.provider}</TextCell> },
  { key: 'monto', header: 'Amount', width: 88, align: 'right', cell: (m) => <AmountCell value={m.monto} /> },
]

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
        <span className="block text-[10px] text-ink-faint">Balance</span>
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
          {paciente.rol === 'Guarantor' ? 'Guarantor' : \`Patient · Guarantor: \${paciente.garante}\`}
        </span>
      </span>
      <button type="button" aria-label="Clear selected patient" title="Back to all activity" onClick={onCerrar} className={ICONO_SUELTO}>
        <X className="size-4" />
      </button>
    </div>
  )
}

/* Recent Billing Activity. Sin paciente: toda la clínica, con las Tabs de tipo y filas que eligen al paciente. Con uno:
   su nombre en el título, Patient / Guarantor View y sólo sus movimientos, sin saldos ni columna Balance (son de la cuenta de todas las locations); cada fila se despliega
   con el detalle del Ledger según el tipo (billing.md y ledger.md, 2026-10-14). */
export function ActividadReciente({
  filas, sinActividad, filtro, onFiltro, paciente, vista, onVista, onElegir, onAccion, onExportar, refElegido, className, abierta,
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
  /** Los botones de pago y ajuste, arriba del título, sólo con paciente. */
  onAccion: (tipo: TipoAjusteBilling) => void
  onExportar: () => void
  refElegido?: Ref<HTMLDivElement>
  className?: string
  /** Con paciente: la fila que arranca desplegada (Storybook). */
  abierta?: string
}) {
  /* View full record y la referencia de una aplicación abren la transacción en el registro de sólo lectura del Ledger. */
  const [enModal, setEnModal] = useState<(Movimiento & { saldo: number }) | null>(null)
  const ver = (x: Movimiento) => setEnModal(filas.find((f) => f.id === x.id) ?? ACTIVIDAD_RECIENTE.find((f) => f.id === x.id) ?? null)
  return (
    <Panel
      title={paciente ? \`\${paciente.nombre} — Recent Billing Activity\` : 'Recent Billing Activity'}
      className={cn('min-w-0', className)}
      top={paciente && (
        <div ref={refElegido} className="scroll-mt-4">
          <AccionesPaciente key={paciente.nombre} onAccion={onAccion} onExportar={onExportar} />
        </div>
      )}
      controls={paciente
        ? <Tabs size="sm" aria-label="Whose activity" tabs={VISTAS_PACIENTE} value={vista} onChange={onVista} />
        : <Tabs size="sm" aria-label="Filter activity" tabs={FILTROS_ACTIVIDAD} value={filtro} onChange={onFiltro} />}
    >
      {/* En el resumen, clic en una fila abre la vista de ese paciente. */}
      <DataTable
        columns={COLUMNAS}
        rows={filas}
        rowKey={(m) => m.id}
        rowLabel={(m) => m.paciente}
        onRowClick={paciente ? undefined : (m) => onElegir(m.paciente)}
        defaultExpanded={paciente && abierta ? [abierta] : undefined}
        rowDetail={paciente ? (m) => (
          <DetalleMovimiento m={{ ...m, saldo: undefined }} aplicaciones={APLICACIONES_BILLING} movimientos={ACTIVIDAD_RECIENTE} onVerTransaccion={ver} onVerTodo={() => setEnModal(m)} />
        ) : undefined}
        density="compact"
        pageSize={PAGINA_ACTIVIDAD}
        itemLabel="entries"
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
/** Filas por página de la actividad: con ocho la pantalla entra entera a 1440 × 900, sin scroll. */
const PAGINA_ACTIVIDAD = 8

/** Arranque de cuántos pacientes se ven en Find Patient antes de "Show N more": su \`ShowMore llenarAlto\` mide cuántas
    filas enteras entran en el alto que le deja el flex-1 (billing.md, 2026-10-19), así que este valor es sólo el
    primer render, antes de esa medición. */
/* El título más cerca de lo que sigue (Patients y Billing; billing.md, 2026-10-19). */
const TITULO_PEGADO = '[&>header]:min-h-10'
const LIMITE_PACIENTES = 3

export function BuscarPaciente({ busqueda, onBusqueda, paciente, saldoDe, onElegir, onCerrar, className }: {
  className?: string
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
      title="Find Patient"
      className={cn(TITULO_PEGADO, className)}
      bodyClassName="min-h-0 gap-2 pt-0"
      top={<div aria-live="polite">{paciente && <PacienteElegido key={paciente.nombre} paciente={paciente} onCerrar={onCerrar} />}</div>}
    >
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
        /* Se ven tres y "Show N more" abre el resto con scroll adentro, sin estirar el panel: la regla de las listas largas
           (ui/show-more, como Patients). Al buscar, el scroll vuelve a cero. */
        <ShowMore key={busqueda} total={resultados.length} limit={LIMITE_PACIENTES} enCaja llenarAlto label="patients" className="flex flex-col gap-3">
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

/* Los pagos y ajustes son de un paciente: los botones aparecen con uno elegido, arriba del título de su actividad
   (captura de Julián, 2026-10-13). Botones del design system, md (32px) como dentro de un panel. */
export function AccionesPaciente({ onAccion, onExportar }: {
  onAccion: (tipo: TipoAjusteBilling) => void
  onExportar: () => void
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2 px-4 pt-4', ENTRADA)}>
      <Button size="md" onClick={() => onAccion('Patient Payment')}><Wallet /> Patient Payment (-)</Button>
      <Button size="md" onClick={() => onAccion('Credit Adjustment')}><MinusCircle /> Credit Adjustment (-)</Button>
      <Button size="md" onClick={() => onAccion('Charge Adjustment')}><PlusCircle /> Charge Adjustment (+)</Button>
      <Button size="md" variant="secondary" iconOnly aria-label="Export statement" onClick={onExportar}><Download /></Button>
    </div>
  )
}

/* \`inicial\` sólo lo usan las stories (Pages › Parts › Billing): la ruta abre en el resumen, sin paciente. */
export default function Billing({ inicial }: {
  inicial?: { seleccionado?: string; vista?: VistaPaciente; filtro?: FiltroActividad; busqueda?: string; vacia?: boolean }
} = {}) {
  const [actividad, setActividad] = useState(inicial?.vacia ? [] : ACTIVIDAD_RECIENTE)
  const [filtro, setFiltro] = useState<FiltroActividad>(inicial?.filtro ?? 'All')
  const [busqueda, setBusqueda] = useState(inicial?.busqueda ?? '')
  const [seleccionado, setSeleccionado] = useState<string | null>(inicial?.seleccionado ?? null)
  const [vista, setVista] = useState<VistaPaciente>(inicial?.vista ?? 'Patient View')
  const [modal, setModal] = useState<TipoAjusteBilling | null>(null)
  const refElegido = useRef<HTMLDivElement>(null)
  const subir = useRef(false)
  const refIzquierda = useRef<HTMLDivElement>(null)
  const [altoResumen, setAltoResumen] = useState<number>()

  const pacienteSeleccionado = seleccionado ? PACIENTES_BILLING.find((p) => p.nombre === seleccionado) : undefined
  const grupo = useMemo(() => (seleccionado ? grupoDeGarante(seleccionado) : []), [seleccionado])
  /* Resumen: por tipo. Paciente: lo suyo (Patient View) o todo lo de su garante (Guarantor View). */
  const filas = useMemo(() => {
    if (!seleccionado) return actividad.filter((m) => coincideFiltro(m, filtro))
    const quienes = vista === 'Guarantor View' ? grupo.map((p) => p.nombre) : [seleccionado]
    return actividad.filter((m) => quienes.includes(m.paciente))
  }, [actividad, filtro, seleccionado, vista, grupo])

  /* Cada paciente nuevo arranca en Patient View. */
  const elegir = (nombre: string) => {
    setSeleccionado(nombre)
    setVista('Patient View')
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

  /* El alto del resumen se guarda para que el bento no se achique al entrar a un paciente (su tabla es más corta). */
  useEffect(() => {
    const el = refIzquierda.current
    if (!el || seleccionado) return
    const medir = () => setAltoResumen(el.offsetHeight)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
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
      <PageTitle>Billing</PageTitle>

      {/* Bento: la columna derecha toma el alto medido de refIzquierda (--billing-alto, de altoResumen) en vez de
          estirarse contra ella -estirarse las dos entre sí crea un bucle: cuántas filas entran en Find Patient
          dependería de su propio alto ya estirado, que a su vez depende de cuántas filas decide mostrar- (Julián,
          2026-10-19). items-start en vez de stretch: cada columna toma sólo el alto que se le da. Adentro, Find
          Patient (flex-1) se queda con lo que sobra después de Today (shrink-0). Con un paciente, altoResumen deja de
          medirse (ver el efecto de arriba) y la columna derecha queda al alto del resumen, así no salta al entrar. */}
      <div
        className="mt-5 grid grid-cols-1 items-start gap-4 lg:min-h-[var(--billing-alto,0px)] lg:grid-cols-[minmax(0,1fr)_280px]"
        style={altoResumen ? ({ '--billing-alto': \`\${altoResumen}px\` } as CSSProperties) : undefined}
      >
        <div ref={refIzquierda} className="flex min-w-0 flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 xl:grid-cols-5">
            {STATS_BILLING.map((s, i) => <Stat key={s.label} {...s} enFila className={cn(LUGAR_NUMERO[i], 'xl:col-span-1')} />)}
          </div>
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
            onAccion={setModal}
            onExportar={() => aviso.ok('Statement exported.')}
            refElegido={refElegido}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:h-[var(--billing-alto,auto)]">
          {/* flex-1: abraza el resto del alto de la columna (lg:h-[var(--billing-alto)] arriba), después de Today.
              min-h-[220px]: una actividad muy corta (un paciente con pocos movimientos) deja a Today -shrink-0- de
              igual pidiendo más alto que toda la columna; sin este piso, Find Patient quedaba en 0 y desaparecía. */}
          <BuscarPaciente
            className="min-h-[220px] flex-1"
            busqueda={busqueda}
            onBusqueda={setBusqueda}
            paciente={pacienteSeleccionado}
            saldoDe={saldoActual}
            onElegir={elegirDeLaLista}
            onCerrar={() => setSeleccionado(null)}
          />
          <Panel title="Today" className={cn('shrink-0', TITULO_PEGADO)} bodyClassName="gap-3 pt-0">
            {STATS_HOY.map((s) => <Stat key={s.label} interna compacta {...s} />)}
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