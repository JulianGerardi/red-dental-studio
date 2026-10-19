import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { ChevronsDownUp, ChevronsUpDown, HandCoins } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { aviso } from '@/components/ui/toaster'
import { Pill } from '@/components/ui/pill'
import { EnlaceRegistro, Entrada, FilaDetalle, ListaDetalle, Vacio, VerRegistroCompleto } from '@/components/ui/detail-list'
import { cn } from '@/lib/utils'
import { tratamientoDe } from '@/components/clinical/RecordDetail'
import { TONO_CASO } from '@/components/clinical/TreatmentPlanSection'
import { PROCEDIMIENTOS } from '@/data/clinical-mode'
import {
  APLICACIONES, MOVIMIENTOS, alcanceDe, aplicadoA, aplicadoDesde, fechaCorta, moneda, pendienteDe, refDe, sedeDe, tieneCredito,
  totalAplicado, type Aplicacion, type Movimiento,
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

/* ── El detalle de cada tipo (2026-10-14) ─────────────────────────────

   Historia de usuario de Julián con el prototipo "Ledger · Transaction relationships": al desplegar una fila se ve su
   contexto, el detalle financiero y las transacciones relacionadas, en filas compactas (ui/detail-list), sin abrir el
   registro completo. Procedure, Charge Adjustment, Patient Payment y Credit Adjustment; Insurance Payment queda fuera y
   sigue con los datos de siempre. Sólo lectura. Ver design-reference/figma/modulos/ledger.md. */

export type TipoDetalle = 'Procedure' | 'Charge Adjustment' | 'Patient Payment' | 'Credit Adjustment'

/** El tipo del detalle; null para lo que queda fuera (Insurance Payment). */
export const tipoDetalle = (m: Movimiento): TipoDetalle | null =>
  m.tipo === 'Charge' ? 'Procedure'
    : m.tipo === 'Payment' ? 'Patient Payment'
      : m.tipo === 'Adjustment' ? (m.monto > 0 ? 'Charge Adjustment' : 'Credit Adjustment')
        : null

const nombreTipo = (m: Movimiento) => tipoDetalle(m) ?? 'Insurance Payment'
const esCargo = (m: Movimiento) => m.monto > 0
const cuenta = (m: Movimiento) => (alcanceDe(m) === 'guarantor' ? 'Guarantor / Account' : m.paciente)
const motivoDe = (m: Movimiento) => m.motivo ?? (m.descripcion && m.descripcion !== '—' ? m.descripcion : undefined)

/** Lo que el detalle lee: las aplicaciones al día (Apply credit suma las suyas), las transacciones y a dónde llevan los
    links. */
export type DatosCobro = {
  aplicaciones?: Aplicacion[]
  movimientos?: Movimiento[]
  /** Un registro relacionado: la pantalla lleva a su fila y la despliega si está en la tabla; si no, abre su registro. */
  onVerTransaccion?: (m: Movimiento) => void
  /** Clinical Mode con el caso o el procedimiento abiertos. */
  onAbrirClinica?: (d: { caso?: string; procedimiento?: string }) => void
}

/** Un número de Financial details; el que importa (lo que falta del cargo, el crédito sin aplicar) va destacado. El
    monto va abajo: si un rótulo se parte, los números siguen alineados. */
export function Metrica({ label, valor, destacado }: { label: string; valor: number; destacado?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col">
      <dt className="text-[11px] text-ink-muted">{label}</dt>
      <dd className={cn('mt-auto pt-1 text-[15px] tabular-nums', destacado ? 'text-dash-blue font-semibold' : 'font-medium text-ink')}>{moneda(valor)}</dd>
    </div>
  )
}

const Texto = ({ children }: { children: ReactNode }) => <Entrada><span className="text-[12px] text-ink">{children}</span></Entrada>
const Pista = ({ children, arriba }: { children: ReactNode; arriba?: boolean }) => (
  <p className={cn('text-[11px] leading-[1.5] text-ink-muted', arriba ? 'mb-1 flex min-h-6 items-center' : 'mt-2')}>{children}</p>
)

/** El caso de Treatment Plan del procedimiento que se cobra (por su vínculo, nunca por código): el aceptado primero,
    con la visita, y después los históricos. */
export function TratamientoDelCargo({ m, onAbrir }: { m: Movimiento; onAbrir: (caso: string) => void }) {
  const pr = m.procedimiento ? PROCEDIMIENTOS.find((p) => p.id === m.procedimiento) : undefined
  const t = pr && tratamientoDe(pr)
  if (!t) return <Vacio>No treatment linked.</Vacio>
  const casos = [t.caso, ...t.grupo.filter((c) => c.id !== t.caso.id && c.estado === 'Discarded')]
    .sort((a, b) => Number(b.estado === 'Accepted') - Number(a.estado === 'Accepted'))
  return (
    <div>
      {casos.map((c) => (
        <div key={c.id}>
          <Entrada rotulo={c.id === t.caso.id ? undefined : 'Historical'} estado={<Pill tone={TONO_CASO[c.estado]} size="sm" className="whitespace-nowrap">{c.estado}</Pill>}>
            <EnlaceRegistro onClick={() => onAbrir(c.id)}>{c.nombre}</EnlaceRegistro>
          </Entrada>
          {/* El modelo no tiene fases: Phase no se muestra hasta que exista. */}
          {c.id === t.caso.id && t.visita && <p className="text-[11px] text-ink-muted">{t.visita.nombre} · This procedure</p>}
        </div>
      ))}
    </div>
  )
}

/** Las filas del detalle según el tipo, en el orden de la historia. */
export function FilasTransaccion({ m, aplicaciones = APLICACIONES, movimientos = MOVIMIENTOS, onVerTransaccion, onAbrirClinica }: DatosCobro & { m: Movimiento }) {
  const tipo = tipoDetalle(m)
  if (!tipo) return null
  const cargo = esCargo(m)
  const ver = onVerTransaccion ?? ((x: Movimiento) => aviso.info(\`Opens \${nombreTipo(x)} \${refDe(x)}.\`))
  const abrirCaso = (caso: string) => (onAbrirClinica ? onAbrirClinica({ caso }) : aviso.info('Opens the case in Treatment Plan.'))
  const filas = (cargo ? aplicadoA(m.id, aplicaciones) : aplicadoDesde(m.id, aplicaciones))
    .map((a) => ({ a, otra: movimientos.find((x) => x.id === (cargo ? a.origen : a.cargo)) }))
    .filter((f): f is { a: Aplicacion; otra: Movimiento } => !!f.otra)
  const aplicado = totalAplicado(filas.map((f) => f.a))
  const deTipo = (t: string) => totalAplicado(filas.filter((f) => nombreTipo(f.otra) === t).map((f) => f.a))
  const sinAplicar = m.creditoDisponible ?? Math.max(-m.monto - aplicado, 0)
  const sede = sedeDe(m)
  const alcance = alcanceDe(m) === 'guarantor' ? 'guarantor · Household credit' : \`patient · \${m.paciente}\`

  return (
    <>
      {tipo === 'Procedure' && <FilaDetalle titulo="Treatment"><TratamientoDelCargo m={m} onAbrir={abrirCaso} /></FilaDetalle>}
      {!cargo && <FilaDetalle titulo="Scope"><Texto>{alcance}</Texto></FilaDetalle>}
      <FilaDetalle titulo="Location">{sede ? <Texto>{sede}</Texto> : <Vacio>Location unavailable.</Vacio>}</FilaDetalle>
      <FilaDetalle titulo="Financial details">
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(112px,1fr))] gap-x-6 gap-y-3 py-0.5">
          {cargo ? (
            <>
              <Metrica label="Original charge" valor={m.monto} />
              <Metrica label="Payments applied" valor={deTipo('Patient Payment')} />
              <Metrica label="Credit adjustments applied" valor={deTipo('Credit Adjustment')} />
              {/* Insurance Payment queda fuera de la historia, pero si cubrió parte del cargo sin esto los números no
                  cierran: va sólo cuando hay (ledger.md, 2026-10-14). */}
              {deTipo('Insurance Payment') > 0 && <Metrica label="Insurance applied" valor={deTipo('Insurance Payment')} />}
              <Metrica label="Outstanding transaction balance" valor={pendienteDe(m, aplicaciones)} destacado />
            </>
          ) : (
            <>
              <Metrica label={tipo === 'Patient Payment' ? 'Original payment' : 'Original credit'} valor={-m.monto} />
              <Metrica label="Applied to charges" valor={aplicado} />
              <Metrica label="Unapplied credit" valor={sinAplicar} destacado />
              <Metrica label="Transaction balance" valor={0} />
            </>
          )}
        </dl>
      </FilaDetalle>
      <FilaDetalle titulo={cargo ? 'Payments & credits applied to this charge' : 'Charges paid or credited by this transaction'} cuenta={filas.length}>
        <Pista arriba>{cargo ? 'Incoming applications: the payments and credits that reduced this charge.' : 'Outgoing applications: the charges this payment or credit was applied to.'}</Pista>
        {filas.length === 0 ? (
          <Vacio>{cargo ? 'No payments or credits have been applied to this charge.' : 'This transaction has not been applied to any charges.'}</Vacio>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[12px]">
              <thead className="text-[11px] text-ink-muted">
                <tr>
                  <th className="py-1.5 pr-3 font-medium">Date applied</th>
                  <th className="py-1.5 pr-3 font-medium">{cargo ? 'Source transaction' : 'Destination charge'}</th>
                  <th className="py-1.5 pr-3 font-medium">Patient / Account</th>
                  <th className="py-1.5 pr-3 font-medium">{cargo ? 'Reference / reason' : 'Procedure / reason'}</th>
                  <th className="py-1.5 text-right font-medium">Applied amount</th>
                </tr>
              </thead>
              <tbody>
                {filas.map(({ a, otra }) => (
                  <tr key={a.id} className="border-t border-line-soft">
                    <td className="py-2 pr-3 whitespace-nowrap text-ink">{fechaCorta(a.fecha)}</td>
                    <td className="py-2 pr-3"><EnlaceRegistro onClick={() => ver(otra)}>{nombreTipo(otra)} · {refDe(otra)}</EnlaceRegistro></td>
                    <td className="py-2 pr-3 text-ink">{cuenta(otra)}</td>
                    <td className="py-2 pr-3 text-ink">{otra.tipo === 'Charge' ? \`\${otra.codigo} · \${otra.descripcion}\` : motivoDe(otra) ?? '—'}</td>
                    <td className="py-2 text-right font-medium whitespace-nowrap text-ink tabular-nums">{moneda(a.monto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </FilaDetalle>
    </>
  )
}

const BOTON_CREDITO = 'text-dash-blue inline-flex items-center gap-1.5 rounded-md border border-[#c7d9fb] bg-info-bg px-2.5 py-1 text-[12px] font-medium hover:bg-[#e3edff]'

/** El contenido del detalle, sin el marco. Las cuatro transacciones de la historia llevan su lista (título, filas y pie
    con su acción y Read-only summary); Insurance Payment, los datos de siempre. Lo usan el Ledger y la tabla de Billing
    (que pone su propio marco, el de DataTable). */
export function DetalleMovimiento({
  m, onVerTodo, onAplicarCredito, ...datos
}: DatosCobro & {
  m: Movimiento & { saldo?: number }
  /** El registro completo de la transacción. */
  onVerTodo: () => void
  /** Sólo con crédito sin aplicar y permiso: abre Apply credit (Unapplied Credit Management) con esta fuente. */
  onAplicarCredito?: () => void
}) {
  const tipo = tipoDetalle(m)
  if (!tipo) {
    return (
      <>
        <Campos m={m} />
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <VerRegistroCompleto onClick={onVerTodo} />
        </div>
      </>
    )
  }
  /* View procedure abre el procedimiento del paciente; sin vínculo, el registro. */
  const verProcedimiento = m.procedimiento && datos.onAbrirClinica ? () => datos.onAbrirClinica!({ procedimiento: m.procedimiento }) : onVerTodo
  const lado = [refDe(m), m.estado, m.diente && \`Tooth \${m.diente}\`, m.superficie && \`Surface \${m.superficie}\`].filter(Boolean).join(' · ')
  return (
    <ListaDetalle
      titulo={m.tipo === 'Charge' ? \`\${m.codigo} · \${m.descripcion}\` : m.descripcion}
      lado={lado}
      pie={(
        <>
          <VerRegistroCompleto onClick={tipo === 'Procedure' ? verProcedimiento : onVerTodo} />
          {onAplicarCredito && (
            <button type="button" onClick={onAplicarCredito} className={BOTON_CREDITO}><HandCoins className="size-3.5" /> Apply credit</button>
          )}
        </>
      )}
    >
      <FilasTransaccion m={m} {...datos} />
    </ListaDetalle>
  )
}

export function LedgerRowDetail({
  m, onVerTodo, onAplicarCredito, sangria = 40, ...datos
}: DatosCobro & {
  m: Movimiento & { saldo?: number }
  onVerTodo: () => void
  /** Sólo viene si la fila tiene crédito sin aplicar -ver \`tieneCredito\` en
      Ledger.tsx-, así que alcanza con chequear que exista. */
  onAplicarCredito?: () => void
  /** Dónde arranca el detalle, en px: alineado con la primera columna, después de la flecha de la fila (\`RowChevron\`). */
  sangria?: number
}) {
  return (
    <div className="border-t border-line-row bg-surface-subtle py-3 pr-3" style={{ paddingLeft: sangria }}>
      {/* La fila vive dentro del ancho mínimo de la tabla, que en pantallas
          chicas es más ancho que la vista. Sin esto el detalle nacía de 864px
          y había que scrollear para leerlo -lo contrario de para qué está-.
          \`sticky\` lo deja fijo en la parte visible mientras la tabla
          se mueve, y el ancho sale de \`--tabla-visible\` (lo publica el
          contenedor); cuando la tabla entra entera, ese valor ya es el 100%.
          Menos el padding del contenedor (\`--resto\`): si no, lo alineado a la derecha (Applied amount) quedaba cortado. */}
      <div
        className="sticky w-[calc(var(--tabla-visible,calc(100%+var(--resto)))-var(--resto))]"
        style={{ left: sangria, '--resto': \`\${sangria + 12}px\` } as React.CSSProperties}
      >
        <DetalleMovimiento m={m} onVerTodo={onVerTodo} onAplicarCredito={onAplicarCredito} {...datos} />
      </div>
    </div>
  )
}

/** El registro completo: todos los datos de la transacción y, para las cuatro de la historia, sus filas sin plegar. */
export function LedgerRowModal({
  m, onClose, ...datos
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
      {tipoDetalle(m) && (
        <div className="@container mt-4 flex flex-col border-t border-line-row pt-3"><FilasTransaccion m={m} {...datos} /></div>
      )}
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};