import { Maximize2, ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { moneda, type Movimiento } from '@/data/ledger'

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
      <TooltipContent side="right" align="center" sideOffset={8} collisionPadding={12} className="max-w-sm bg-[#09090b] text-white">
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
  todasAbiertas, hayAlgunaAbierta, onToggle,
}: {
  todasAbiertas: boolean
  hayAlgunaAbierta: boolean
  onToggle: () => void
}) {
  if (!hayAlgunaAbierta) return null
  const Icono = todasAbiertas ? ChevronsDownUp : ChevronsUpDown
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-1.5 rounded-md border border-[#e4e4e7] px-2.5 py-1.5 text-[12px] font-medium text-[#71717a] hover:bg-[#f4f4f5]"
    >
      <Icono className="size-3.5" />
      {todasAbiertas ? 'Collapse all' : 'Expand all'}
    </button>
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
  ]
}

function Campos({ m }: { m: Movimiento & { saldo?: number } }) {
  return (
    <>
      <div>
        <dt className="text-[11px] font-medium text-[#71717a]">Description</dt>
        <dd className="mt-0.5 text-[13px] text-[#09090b]">{m.descripcion}</dd>
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        {campos(m).map(({ label, valor }) => (
          <div key={label}>
            <dt className="text-[11px] font-medium text-[#71717a]">{label}</dt>
            <dd className="mt-0.5 text-[13px] break-words text-[#09090b]">{valor}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export function LedgerRowDetail({
  m, onVerTodo,
}: {
  m: Movimiento & { saldo?: number }
  onVerTodo: () => void
}) {
  return (
    <div className="border-t border-[#e7e7e7] bg-[#fafafa] px-3 py-3">
      {/* La fila vive dentro del ancho mínimo de la tabla, que en pantallas
          chicas es más ancho que la vista. Sin esto el detalle nacía de 864px
          y había que scrollear para leerlo -lo contrario de para qué está-.
          `sticky left-0` lo deja fijo en la parte visible mientras la tabla
          se mueve, y el ancho sale de `--tabla-visible` (lo publica el
          contenedor); cuando la tabla entra entera, ese valor ya es el 100%. */}
      <div className="sticky left-0 w-[var(--tabla-visible,100%)]">
        <Campos m={m} />
        <button
          type="button"
          onClick={onVerTodo}
          className="text-dash-blue mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold hover:underline"
        >
          <Maximize2 className="size-3.5" /> View full record
        </button>
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
          className="h-9 shrink-0 rounded-md border border-[#e4e4e7] bg-white px-6 text-[13px] font-medium hover:bg-[#fafafa]"
        >
          Close
        </button>
      )}
    >
      <Campos m={m} />
    </ModalShell>
  )
}
