import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Maximize2, ChevronsDownUp, ChevronsUpDown, HandCoins } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { moneda, tieneCredito, type Movimiento } from '@/data/ledger'

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

export function LedgerRowDetail({
  m, onVerTodo, onAplicarCredito,
}: {
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
          contenedor); cuando la tabla entra entera, ese valor ya es el 100%. */}
      <div className="sticky left-0 w-[var(--tabla-visible,100%)]">
        <Campos m={m} />
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
`})))()}export{n,i as r,r as t};