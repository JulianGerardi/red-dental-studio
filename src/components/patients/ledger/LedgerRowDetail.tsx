import { ChevronsDownUp, ChevronsUpDown, HandCoins } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModalShell } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { Pill } from '@/components/ui/pill'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { EnlaceRegistro, Entrada, FilaDetalle, ListaDetalle, NotaDetalle, Vacio, VerRegistroCompleto } from '@/components/ui/detail-list'
import { tratamientoDe } from '@/components/clinical/RecordDetail'
import { TONO_CASO } from '@/components/clinical/TreatmentPlanSection'
import { PROCEDIMIENTOS } from '@/data/clinical-mode'
import {
  APLICACIONES, MOVIMIENTOS, aplicadoA, aplicadoDesde, fechaCorta, moneda, pendienteDe, sedeDe, tieneCredito, totalAplicado,
  type Aplicacion, type Movimiento,
} from '@/data/ledger'

/* Resumen de la fila al pasar el mouse, para leerla completa sin abrirla.
   Reemplaza a los `title` que tenían las celdas que truncan: con los dos
   puestos aparecían dos tooltips distintos sobre la misma celda. */
export function FilaConTooltip({
  m, abierta, children,
}: {
  m: Movimiento & { saldo?: number }
  /** Con la fila desplegada el detalle ya está a la vista: sobra el tooltip. */
  abierta?: boolean
  children: React.ReactNode
}) {
  const pieza = [m.diente && `Tooth ${m.diente}`, m.superficie].filter(Boolean).join(' · ')
  if (abierta) return <>{children}</>
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {/* Al costado, no arriba ni abajo: la fila ocupa todo el ancho de la
          tabla, así que un tooltip vertical le tapa sí o sí los datos de la
          fila vecina. `side="right"` no tiene lugar y Radix lo voltea al
          margen izquierdo, fuera de la tabla. */}
      <TooltipContent side="right" align="center" sideOffset={8} collisionPadding={12} className="max-w-sm bg-ink text-white">
        <span className="flex flex-col gap-0.5">
          <span className="font-semibold">{m.descripcion}</span>
          <span className="text-white/70">
            {m.paciente} · {m.provider}
            {m.codigo !== '—' && ` · ${m.codigo}`}
            {pieza && ` · ${pieza}`}
          </span>
          <span className="tabular-nums text-white/70">
            {moneda(m.monto)} · {m.estado}
            {m.saldo !== undefined && ` · balance ${moneda(m.saldo)}`}
          </span>
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

/* Abrir/cerrar de una todas las filas que hay en pantalla. Va al lado del
   título de cada tabla del Ledger, y sólo desde que hay algo abierto: con
   todo cerrado no hay nada que colapsar y el botón era ruido. */
export function BotonExpandirTodo({
  todasAbiertas, hayAlgunaAbierta, onExpandirTodo, onColapsarTodo,
}: {
  todasAbiertas: boolean
  hayAlgunaAbierta: boolean
  onExpandirTodo: () => void
  onColapsarTodo: () => void
}) {
  if (!hayAlgunaAbierta) return null
  const clase = 'flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink-muted hover:bg-surface-muted'
  return (
    <span className="flex items-center gap-2">
      {/* Colapsar está desde la primera fila abierta: obligar a expandir
          todo para poder cerrar una sola no tiene sentido. "Expand all"
          acompaña mientras queden filas por abrir. */}
      <button type="button" onClick={onColapsarTodo} className={clase}>
        <ChevronsDownUp className="size-3.5" /> Collapse all
      </button>
      {!todasAbiertas && (
        <button type="button" onClick={onExpandirTodo} className={clase}>
          <ChevronsUpDown className="size-3.5" /> Expand all
        </button>
      )}
    </span>
  )
}

/* Con las filas cargadas de datos, la celda truncada no alcanza: la fila se
   despliega y muestra todo. Ver design-reference/figma/modulos/ledger.md. */

function campos(m: Movimiento & { saldo?: number }) {
  return [
    { label: 'Transaction date', valor: m.fecha },
    { label: 'Patient', valor: m.paciente },
    { label: 'Type', valor: m.tipo },
    { label: 'Code', valor: m.codigo },
    { label: 'Provider', valor: m.provider },
    { label: 'Status', valor: m.estado },
    { label: 'Tooth', valor: m.diente ?? '—' },
    { label: 'Surface', valor: m.superficie ?? '—' },
    { label: 'Amount', valor: moneda(m.monto) },
    ...(m.saldo !== undefined ? [{ label: 'Balance', valor: moneda(m.saldo) }] : []),
    ...(tieneCredito(m) ? [{ label: 'Credit available', valor: moneda(m.creditoDisponible ?? 0) }] : []),
  ]
}

export function Campos({ m }: { m: Movimiento & { saldo?: number } }) {
  return (
    <>
      <div>
        <dt className="text-[11px] font-medium text-ink-muted">Description</dt>
        <dd className="mt-0.5 text-[13px] text-ink">{m.descripcion}</dd>
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        {campos(m).map(({ label, valor }) => (
          <div key={label}>
            <dt className="text-[11px] font-medium text-ink-muted">{label}</dt>
            <dd className="mt-0.5 text-[13px] break-words text-ink">{valor}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

/* ── El detalle de la fila (2026-10-13) ─────────────────────────────

   La misma lista de Clinical Mode (ui/detail-list): un cargo dice de qué tratamiento sale, en qué sede se hizo, cuánto
   se pagó y con qué, y cuánto falta; un pago, ajuste o pago del seguro dice a qué cargos fue y cuánto queda sin aplicar.
   Ver design-reference/figma/modulos/ledger.md. */

/** A dónde lleva un link del detalle: Clinical Mode con el caso o el procedimiento abiertos. */
export type DestinoClinica = { caso?: string; procedimiento?: string }

const etiquetaTipo = (m: Movimiento) =>
  m.tipo === 'Insurance' ? 'Insurance Payment'
    : m.tipo === 'Payment' ? 'Patient Payment'
      : m.tipo === 'Adjustment' ? (m.monto < 0 ? 'Credit Adjustment' : 'Charge Adjustment')
        : 'Charge'

/** Un número del bloque financiero; el último (lo que falta o lo que queda) va destacado. */
export function Metrica({ label, valor, destacado }: { label: string; valor: number; destacado?: boolean }) {
  return (
    // El monto va abajo de todo: si un rótulo se parte en dos líneas, los números siguen alineados.
    <div className="flex min-w-0 flex-col">
      <dt className="text-[11px] text-ink-muted">{label}</dt>
      <dd className={cn('mt-auto pt-1 text-[15px] tabular-nums', destacado ? 'text-dash-blue font-semibold' : 'font-medium text-ink')}>{moneda(valor)}</dd>
    </div>
  )
}

/** Las aplicaciones de un cargo (o de un pago): fecha, tipo, la otra transacción como link y el monto aplicado. */
export function TablaAplicaciones({ filas, columnaRef, onVer }: {
  filas: { a: Aplicacion; otra: Movimiento }[]
  columnaRef: string
  onVer: (m: Movimiento) => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[12px]">
        <thead className="text-[11px] text-ink-muted">
          <tr>
            <th className="py-1.5 pr-3 font-medium">Date applied</th>
            <th className="py-1.5 pr-3 font-medium">Type</th>
            <th className="py-1.5 pr-3 font-medium">{columnaRef}</th>
            <th className="py-1.5 text-right font-medium">Applied amount</th>
          </tr>
        </thead>
        <tbody>
          {filas.map(({ a, otra }) => (
            <tr key={a.id} className="border-t border-line-soft">
              <td className="py-2 pr-3 whitespace-nowrap text-ink">{fechaCorta(a.fecha)}</td>
              <td className="py-2 pr-3 whitespace-nowrap text-ink">{etiquetaTipo(otra)}</td>
              <td className="py-2 pr-3">
                <EnlaceRegistro onClick={() => onVer(otra)}>{otra.codigo !== '—' ? `${otra.codigo} · ${otra.descripcion}` : otra.descripcion}</EnlaceRegistro>
              </td>
              <td className="py-2 text-right font-medium whitespace-nowrap text-ink tabular-nums">{moneda(a.monto)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** El caso de Treatment Plan del que sale el cargo (el del procedimiento de Clinical Mode), con la visita. */
export function TratamientoDelCargo({ m, onAbrir }: { m: Movimiento; onAbrir: (d: DestinoClinica) => void }) {
  const proc = m.procedimiento ? PROCEDIMIENTOS.find((p) => p.id === m.procedimiento) : undefined
  const t = proc && tratamientoDe(proc)
  if (!t) return <Vacio>No treatment plan linked.</Vacio>
  return (
    <Entrada
      estado={<Pill tone={TONO_CASO[t.caso.estado]} size="sm" className="whitespace-nowrap">{t.caso.estado}</Pill>}
      sub={t.visita && `${t.visita.nombre} · this procedure`}
    >
      <EnlaceRegistro onClick={() => onAbrir({ caso: t.caso.id })}>{t.caso.nombre}</EnlaceRegistro>
    </Entrada>
  )
}

export function LedgerRowDetail({
  m, onVerTodo, onAplicarCredito, aplicaciones = APLICACIONES, movimientos = MOVIMIENTOS, onVerTransaccion, onAbrirClinica,
}: {
  m: Movimiento & { saldo?: number }
  onVerTodo: () => void
  /** Sólo viene si la fila tiene crédito sin aplicar -ver `tieneCredito` en
      Ledger.tsx-, así que alcanza con chequear que exista. */
  onAplicarCredito?: () => void
  /** Las aplicaciones al día (Apply credit suma las suyas). */
  aplicaciones?: Aplicacion[]
  movimientos?: Movimiento[]
  /** Abre otra transacción de la lista (la referencia de una aplicación). */
  onVerTransaccion?: (m: Movimiento) => void
  onAbrirClinica?: (d: DestinoClinica) => void
}) {
  const esCargo = m.monto > 0
  const porId = (id: string) => movimientos.find((x) => x.id === id)
  const abrir = onAbrirClinica ?? (() => aviso.info('Opens Clinical Mode.'))
  const ver = onVerTransaccion ?? ((x: Movimiento) => aviso.info(`Opens ${x.descripcion}.`))
  const filas = (esCargo ? aplicadoA(m.id, aplicaciones) : aplicadoDesde(m.id, aplicaciones))
    .map((a) => ({ a, otra: porId(esCargo ? a.origen : a.cargo) }))
    .filter((f): f is { a: Aplicacion; otra: Movimiento } => !!f.otra)
  const lado = [m.diente && `Tooth ${m.diente}`, m.superficie && `Surface ${m.superficie}`].filter(Boolean).join(' · ')
  const deTipo = (tipo: Movimiento['tipo']) => totalAplicado(filas.filter((f) => f.otra.tipo === tipo).map((f) => f.a))

  return (
    <div className="border-t border-line-row bg-surface-subtle px-3 py-3">
      {/* La fila vive dentro del ancho mínimo de la tabla, que en pantallas
          chicas es más ancho que la vista. Sin esto el detalle nacía de 864px
          y había que scrollear para leerlo -lo contrario de para qué está-.
          `sticky left-0` lo deja fijo en la parte visible mientras la tabla
          se mueve, y el ancho sale de `--tabla-visible` (lo publica el
          contenedor); cuando la tabla entra entera, ese valor ya es el 100%. */}
      {/* Menos el padding del contenedor (24px): si no, lo alineado a la derecha quedaba cortado. */}
      <div className="sticky left-3 w-[calc(var(--tabla-visible,calc(100%+1.5rem))-1.5rem)]">
        <ListaDetalle
          titulo={m.codigo !== '—' ? `${m.codigo} · ${m.descripcion}` : m.descripcion}
          lado={lado}
          pie={(
            <>
              {m.procedimiento && <EnlaceRegistro onClick={() => abrir({ procedimiento: m.procedimiento })}>View procedure</EnlaceRegistro>}
              <VerRegistroCompleto onClick={onVerTodo} />
              {onAplicarCredito && (
                <button
                  type="button"
                  onClick={onAplicarCredito}
                  className="text-dash-blue inline-flex items-center gap-1.5 rounded-md border border-[#c7d9fb] bg-info-bg px-2.5 py-1 text-[12px] font-medium hover:bg-[#e3edff]"
                >
                  <HandCoins className="size-3.5" /> Apply credit
                </button>
              )}
            </>
          )}
        >
          {esCargo && m.tipo === 'Charge' && <FilaDetalle titulo="Treatment"><TratamientoDelCargo m={m} onAbrir={abrir} /></FilaDetalle>}
          <FilaDetalle titulo="Location"><Entrada><span className="text-[12px] text-ink">{sedeDe(m)}</span></Entrada></FilaDetalle>
          <FilaDetalle titulo="Financial details">
            {esCargo ? (
              <>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 py-0.5 @xl:grid-cols-5">
                  <Metrica label="Original charge" valor={m.monto} />
                  <Metrica label="Insurance paid" valor={deTipo('Insurance')} />
                  <Metrica label="Payments applied" valor={deTipo('Payment')} />
                  <Metrica label="Credit adjustments applied" valor={deTipo('Adjustment')} />
                  <Metrica label="Outstanding balance" valor={pendienteDe(m, aplicaciones)} destacado />
                </dl>
                <NotaDetalle>Balance of this charge only, not the patient or guarantor balance.</NotaDetalle>
              </>
            ) : (
              <>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 py-0.5 @xl:grid-cols-3">
                  <Metrica label={m.tipo === 'Insurance' ? 'Paid by insurance' : m.tipo === 'Payment' ? 'Amount received' : 'Credit amount'} valor={-m.monto} />
                  <Metrica label="Applied to charges" valor={totalAplicado(filas.map((f) => f.a))} />
                  <Metrica label="Unapplied credit" valor={m.creditoDisponible ?? 0} destacado />
                </dl>
                {m.estado === 'Denied' && <NotaDetalle>Denied claim: nothing was applied.</NotaDetalle>}
              </>
            )}
          </FilaDetalle>
          <FilaDetalle titulo={esCargo ? 'Applied transactions' : 'Applied to'} cuenta={filas.length}>
            {filas.length === 0 ? (
              <Vacio>{esCargo ? 'Nothing applied to this charge yet.' : 'Not applied to any charge yet.'}</Vacio>
            ) : (
              <>
                <TablaAplicaciones filas={filas} columnaRef={esCargo ? 'Reference / description' : 'Charge'} onVer={ver} />
                {esCargo && <NotaDetalle>Only the part applied to this charge, not the full amount of each transaction.</NotaDetalle>}
              </>
            )}
          </FilaDetalle>
        </ListaDetalle>
      </div>
    </div>
  )
}

export function LedgerRowModal({
  m, onClose,
}: {
  m: Movimiento & { saldo?: number }
  onClose: () => void
}) {
  return (
    <ModalShell
      title={m.descripcion}
      onClose={onClose}
      width="max-w-[620px]"
      /* Sólo lectura: un Close, no el par Cancel/Save que implicaría que
         hay algo para guardar. */
      footer={(
        <button
          type="button"
          onClick={onClose}
          className="h-9 shrink-0 rounded-md border border-line bg-white px-6 text-[13px] font-medium hover:bg-surface-subtle"
        >
          Close
        </button>
      )}
    >
      <Campos m={m} />
    </ModalShell>
  )
}
