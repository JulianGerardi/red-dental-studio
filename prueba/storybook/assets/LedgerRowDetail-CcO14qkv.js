import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Maximize2, ChevronsDownUp, ChevronsUpDown, HandCoins } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { aviso } from '@/components/ui/toaster'
import { EnlaceRegistro, Entrada, FilaDetalle, NotaDetalle, Vacio } from '@/components/ui/detail-list'
import { cn } from '@/lib/utils'
import {
  APLICACIONES, MOVIMIENTOS, aplicadoA, aplicadoDesde, fechaCorta, moneda, pendienteDe, sedeDe, tieneCredito, totalAplicado,
  type Aplicacion, type Movimiento,
} from '@/data/ledger'

/* Resumen de la fila al pasar el mouse, para leerla completa sin abrirla.
   Reemplaza a los \`title\` que tenían las celdas que truncan: con los dos
   puestos aparecían dos tooltips distintos sobre la misma celda. */
export function FilaConTooltip({
  m, abierta, children,
}: {
  m: Movimiento & { saldo?: number }
  /** Con la fila desplegada el detalle ya está a la vista: sobra el tooltip. */
  abierta?: boolean
  children: React.ReactNode
}) {
  const pieza = [m.diente && \`Tooth \${m.diente}\`, m.superficie].filter(Boolean).join(' · ')
  if (abierta) return <>{children}</>
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {/* Al costado, no arriba ni abajo: la fila ocupa todo el ancho de la
          tabla, así que un tooltip vertical le tapa sí o sí los datos de la
          fila vecina. \`side="right"\` no tiene lugar y Radix lo voltea al
          margen izquierdo, fuera de la tabla. */}
      <TooltipContent side="right" align="center" sideOffset={8} collisionPadding={12} className="max-w-sm bg-ink text-white">
        <span className="flex flex-col gap-0.5">
          <span className="font-semibold">{m.descripcion}</span>
          <span className="text-white/70">
            {m.paciente} · {m.provider}
            {m.codigo !== '—' && \` · \${m.codigo}\`}
            {pieza && \` · \${pieza}\`}
          </span>
          <span className="tabular-nums text-white/70">
            {moneda(m.monto)} · {m.estado}
            {m.saldo !== undefined && \` · balance \${moneda(m.saldo)}\`}
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

/* ── Lo del cobro (2026-10-14) ──────────────────────────────────────

   Julián (prototipo "Expanded transaction detail"): Clinic location, Financial details y Applied transactions van en el
   detalle de la fila del Ledger y de Billing, no en Clinical Mode. Un cargo dice dónde se hizo, cuánto se pagó, con qué
   y cuánto falta; un pago, ajuste o pago del seguro, a qué cargos fue y cuánto queda sin aplicar. Ver ledger.md. */

/** Lo que el detalle lee para el cobro: las aplicaciones al día (Apply credit suma las suyas) y las transacciones. */
export type DatosCobro = {
  aplicaciones?: Aplicacion[]
  movimientos?: Movimiento[]
  /** Abre otra transacción (la referencia de una aplicación) en su registro de sólo lectura. */
  onVerTransaccion?: (m: Movimiento) => void
}

const etiquetaTipo = (m: Movimiento) =>
  m.tipo === 'Insurance' ? 'Insurance Payment'
    : m.tipo === 'Payment' ? 'Patient Payment'
      : m.tipo === 'Adjustment' ? (m.monto < 0 ? 'Credit Adjustment' : 'Charge Adjustment')
        : 'Charge'

/** Un número de Financial details; el último (lo que falta o lo que queda) va destacado. El monto va abajo: si un rótulo
    se parte, los números siguen alineados. */
export function Metrica({ label, valor, destacado }: { label: string; valor: number; destacado?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col">
      <dt className="text-[11px] text-ink-muted">{label}</dt>
      <dd className={cn('mt-auto pt-1 text-[15px] tabular-nums', destacado ? 'text-dash-blue font-semibold' : 'font-medium text-ink')}>{moneda(valor)}</dd>
    </div>
  )
}

/** Clinic location, Financial details y Applied transactions de una transacción, como filas de ui/detail-list. */
export function FilasCobro({ m, aplicaciones = APLICACIONES, movimientos = MOVIMIENTOS, onVerTransaccion }: DatosCobro & { m: Movimiento }) {
  const esCargo = m.monto > 0
  const ver = onVerTransaccion ?? ((x: Movimiento) => aviso.info(\`Opens \${x.descripcion}.\`))
  const filas = (esCargo ? aplicadoA(m.id, aplicaciones) : aplicadoDesde(m.id, aplicaciones))
    .map((a) => ({ a, otra: movimientos.find((x) => x.id === (esCargo ? a.origen : a.cargo)) }))
    .filter((f): f is { a: Aplicacion; otra: Movimiento } => !!f.otra)
  const deTipo = (tipo: Movimiento['tipo']) => totalAplicado(filas.filter((f) => f.otra.tipo === tipo).map((f) => f.a))
  const aplicado = totalAplicado(filas.map((f) => f.a))
  const sinAplicar = m.estado === 'Denied' ? 0 : m.creditoDisponible ?? Math.max(-m.monto - aplicado, 0)
  return (
    <>
      <FilaDetalle titulo="Clinic location"><Entrada><span className="text-[12px] text-ink">{sedeDe(m)}</span></Entrada></FilaDetalle>
      <FilaDetalle titulo="Financial details">
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(112px,1fr))] gap-x-6 gap-y-3 py-0.5">
          {esCargo ? (
            <>
              <Metrica label="Original charge" valor={m.monto} />
              <Metrica label="Insurance paid" valor={deTipo('Insurance')} />
              <Metrica label="Payments applied" valor={deTipo('Payment')} />
              <Metrica label="Credit adjustments applied" valor={deTipo('Adjustment')} />
              <Metrica label="Outstanding balance" valor={pendienteDe(m, aplicaciones)} destacado />
            </>
          ) : (
            <>
              <Metrica label={m.tipo === 'Insurance' ? 'Paid by insurance' : m.tipo === 'Payment' ? 'Amount received' : 'Credit amount'} valor={m.estado === 'Denied' ? 0 : -m.monto} />
              <Metrica label="Applied to charges" valor={aplicado} />
              <Metrica label="Unapplied credit" valor={sinAplicar} destacado />
            </>
          )}
        </dl>
        <NotaDetalle>
          {esCargo ? 'Balance of this charge only, not the patient or guarantor balance.'
            : m.estado === 'Denied' ? 'Denied claim: nothing was paid or applied.' : 'What this transaction paid, not the patient or guarantor balance.'}
        </NotaDetalle>
      </FilaDetalle>
      <FilaDetalle titulo="Applied transactions" cuenta={filas.length}>
        {filas.length === 0 ? (
          <Vacio>{esCargo ? 'Nothing applied to this charge yet.' : 'Not applied to any charge yet.'}</Vacio>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead className="text-[11px] text-ink-muted">
                  <tr>
                    <th className="py-1.5 pr-3 font-medium">Date applied</th>
                    <th className="py-1.5 pr-3 font-medium">Type</th>
                    <th className="py-1.5 pr-3 font-medium">{esCargo ? 'Reference / description' : 'Charge'}</th>
                    <th className="py-1.5 text-right font-medium">Applied amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map(({ a, otra }) => (
                    <tr key={a.id} className="border-t border-line-soft">
                      <td className="py-2 pr-3 whitespace-nowrap text-ink">{fechaCorta(a.fecha)}</td>
                      <td className="py-2 pr-3 whitespace-nowrap text-ink">{etiquetaTipo(otra)}</td>
                      <td className="py-2 pr-3">
                        <EnlaceRegistro onClick={() => ver(otra)}>{otra.codigo !== '—' ? \`\${otra.codigo} · \${otra.descripcion}\` : otra.descripcion}</EnlaceRegistro>
                      </td>
                      <td className="py-2 text-right font-medium whitespace-nowrap text-ink tabular-nums">{moneda(a.monto)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <NotaDetalle>{esCargo ? 'Only the part applied to this charge, not the full amount of each transaction.' : 'Only the part of this transaction applied to each charge.'}</NotaDetalle>
          </>
        )}
      </FilaDetalle>
    </>
  )
}

/* Lo del cobro debajo de los datos de la transacción, separado por una línea; las filas, como en ui/detail-list. */
const Cobro = (p: DatosCobro & { m: Movimiento }) => (
  <div className="@container mt-4 flex flex-col border-t border-line-row pt-3"><FilasCobro {...p} /></div>
)

/** El contenido del detalle, sin el marco: los datos de la transacción, lo del cobro y el pie. Lo usan el Ledger y la
    tabla de Billing (que pone su propio marco, el de DataTable). */
export function DetalleMovimiento({
  m, onVerTodo, onAplicarCredito, ...cobro
}: DatosCobro & {
  m: Movimiento & { saldo?: number }
  onVerTodo: () => void
  onAplicarCredito?: () => void
}) {
  return (
    <>
      <Campos m={m} />
      <Cobro m={m} {...cobro} />
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onVerTodo}
          className="text-dash-blue inline-flex items-center gap-1.5 text-[12px] font-semibold hover:underline"
        >
          <Maximize2 className="size-3.5" /> View full record
        </button>
        {onAplicarCredito && (
          <button
            type="button"
            onClick={onAplicarCredito}
            className="text-dash-blue inline-flex items-center gap-1.5 rounded-md border border-[#c7d9fb] bg-info-bg px-2.5 py-1 text-[12px] font-medium hover:bg-[#e3edff]"
          >
            <HandCoins className="size-3.5" /> Apply credit
          </button>
        )}
      </div>
    </>
  )
}

export function LedgerRowDetail({
  m, onVerTodo, onAplicarCredito, ...cobro
}: DatosCobro & {
  m: Movimiento & { saldo?: number }
  onVerTodo: () => void
  /** Sólo viene si la fila tiene crédito sin aplicar -ver \`tieneCredito\` en
      Ledger.tsx-, así que alcanza con chequear que exista. */
  onAplicarCredito?: () => void
}) {
  return (
    <div className="border-t border-line-row bg-surface-subtle px-3 py-3">
      {/* La fila vive dentro del ancho mínimo de la tabla, que en pantallas
          chicas es más ancho que la vista. Sin esto el detalle nacía de 864px
          y había que scrollear para leerlo -lo contrario de para qué está-.
          \`sticky left-0\` lo deja fijo en la parte visible mientras la tabla
          se mueve, y el ancho sale de \`--tabla-visible\` (lo publica el
          contenedor); cuando la tabla entra entera, ese valor ya es el 100%.
          Menos el padding del contenedor (24px): si no, lo alineado a la derecha (Applied amount) quedaba cortado. */}
      <div className="sticky left-3 w-[calc(var(--tabla-visible,calc(100%+1.5rem))-1.5rem)]">
        <DetalleMovimiento m={m} onVerTodo={onVerTodo} onAplicarCredito={onAplicarCredito} {...cobro} />
      </div>
    </div>
  )
}

export function LedgerRowModal({
  m, onClose, ...cobro
}: DatosCobro & {
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
      <Cobro m={m} {...cobro} />
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};