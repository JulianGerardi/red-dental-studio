import { ArrowRight, Check, ClipboardList, Clock, FileText, FlaskConical, Pill, Send, TriangleAlert, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { StatusPill } from './primitives'
import { ACCION_TURNO, MenuCard, accionTurno, type Appointment } from './AppointmentCard'
import { completarTarea, type PendingTask } from './PendingTaskCard'
import { Avatar } from '@/components/ui/avatar'
import { Pill as PillTag } from '@/components/ui/pill'

/* Las filas del Dashboard con volumen (propuesta del 2026-10-12, ver design-reference/figma/modulos/dashboard.md): lo
   mismo que cada card del Figma, en una fila. Mismos datos, mismos chips y mismas acciones; cambia sólo cómo se acomodan.
   Con @container la fila se adapta al ancho de su lista: en renglones en angosto, en columnas cuando entra. */

/* Los chips TR y CC de la card de turno (AppointmentCard), a 24px de alto. */
export function ChipsTurno({ className }: { className?: string }) {
  return (
    <span className={cn('flex shrink-0 items-center gap-1', className)}>
      <span className="flex h-6 items-center gap-0.5 rounded-md bg-green-soft px-1.5 text-[11px] text-ink">
        TR <Check className="text-dash-ok-fg size-3.5" strokeWidth={2.5} />
      </span>
      <span className="flex h-6 items-center gap-0.5 rounded-md bg-dash-bad-chip px-1.5 text-[11px] text-ink">
        CC <X className="size-3.5 text-field-error" strokeWidth={2.5} />
      </span>
    </span>
  )
}

type PropsTurno = {
  appt: Appointment
  /** Identifica la fila: la ficha rápida marca la que la abrió. */
  id?: string
  /** Con la ficha rápida abierta desde esta fila. */
  activa?: boolean
  onSelect?: (appt: Appointment, el: HTMLElement, id?: string) => void
  onEdit?: (appt: Appointment) => void
  /** La sala de arriba ya la dice el chip del título: repetirla en cada fila es ruido (Julián, 2026-10-19). */
  ocultarOperatorio?: boolean
}

/* El nombre abre la ficha rápida y es el camino con teclado: la fila entera no puede ser un botón porque tiene otros adentro. */
export function NombreTurno({ appt, id, activa, onSelect, className }: Omit<PropsTurno, 'onEdit'> & { className?: string }) {
  const texto = <span className="truncate text-[13px] font-semibold text-ink">{appt.name}</span>
  if (!onSelect) return <span className={cn('flex min-w-0', className)} title={appt.name}>{texto}</span>
  return (
    <button
      type="button" aria-expanded={!!activa} title={appt.name}
      onClick={(e) => onSelect(appt, e.currentTarget.closest<HTMLElement>('[data-appt-row]')!, id)}
      className={cn('flex min-w-0 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue', className)}
    >
      {texto}
    </button>
  )
}

const CHECK_IN = <StatusPill tone="ok" className="px-1.5 py-[2px] text-[10px]">Check In</StatusPill>

/* Un turno: hora, iniciales, nombre con Check In, provider y operatorio, TR y CC, Check Out o Cancel y el kebab con
   Edit appointment. Angosta en dos renglones; ancha en columnas. */
export function AppointmentRow({ appt, id, activa, onSelect, onEdit, ocultarOperatorio }: PropsTurno) {
  const accion = appt.accion ?? 'Check Out'
  const iniciales = <Avatar initials={appt.initials} size={28} />
  const boton = (
    <Button size="sm" variant={ACCION_TURNO[accion]} className="shrink-0" onClick={(e) => { e.stopPropagation(); accionTurno(appt) }}>{accion} <ArrowRight /></Button>
  )
  const menu = <MenuCard nombre={appt.name} onEdit={onEdit && (() => onEdit(appt))} />
  const donde = ocultarOperatorio ? appt.provider : `${appt.provider} · ${appt.operatory}`

  return (
    <div className="@container">
      {/* Tocar la fila abre la ficha, como la card (Julián, 2026-10-19); los botones, links y menús de adentro hacen lo
          suyo. Con el teclado se llega por el nombre. */}
      <div
        data-appt-row
        onClick={onSelect && ((e) => {
          if ((e.target as HTMLElement).closest('button, a, [role="menu"], [role="menuitem"]')) return
          onSelect(appt, e.currentTarget, id)
        })}
        className={cn('rounded-lg p-2.5 transition-colors', onSelect && 'cursor-pointer hover:bg-surface-alt', activa && 'bg-info-bg hover:bg-info-bg')}
      >
        {/* La hora en la caja gris de la card (reloj y hora), del alto de la fila: suelta arriba quedaba descolgada
            (Julián, 2026-10-13). */}
        <div className="flex items-stretch gap-2.5 @4xl:hidden">
          <span className="bg-dash-field flex w-12 shrink-0 flex-col items-center justify-center gap-1 rounded-lg py-2">
            <Clock className="size-3.5 text-ink-medium" />
            <span className="text-[12px] font-semibold text-ink tabular-nums">{appt.time}</span>
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex min-h-7 items-center gap-2">
              {iniciales}
              <NombreTurno appt={appt} id={id} activa={activa} onSelect={onSelect} className="flex-1" />
              <ChipsTurno className="@max-sm:hidden" />
              {menu}
            </div>
            {/* En una columna angosta (desde 1280px son cuatro) el nombre se cortaba: los chips bajan junto a Check In y el
                provider va en su renglón (2026-10-19). Si no entra, el botón baja a su propio renglón. */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="flex items-center gap-1.5">
                {CHECK_IN}
                <ChipsTurno className="@sm:hidden" />
              </span>
              <span className="min-w-0 basis-full truncate text-[11px] text-ink-muted @sm:min-w-[140px] @sm:flex-1 @sm:basis-0" title={donde}>{donde}</span>
              <span className="ml-auto">{boton}</span>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-4 @4xl:flex">
          <span className="bg-dash-field flex h-8 w-[72px] shrink-0 items-center justify-center gap-1.5 rounded-lg text-[12px] font-semibold text-ink tabular-nums">
            <Clock className="size-3.5 text-ink-medium" />{appt.time}
          </span>
          {iniciales}
          <span className="flex w-52 shrink-0 items-center gap-2">
            <NombreTurno appt={appt} id={id} activa={activa} onSelect={onSelect} />
            {CHECK_IN}
          </span>
          <span className="min-w-0 flex-1 truncate text-[12px] text-ink-soft">{appt.provider}</span>
          {!ocultarOperatorio && <span className="w-24 shrink-0 truncate text-[12px] text-ink-soft">{appt.operatory}</span>}
          <ChipsTurno />
          <span className="flex w-28 shrink-0 justify-end">{boton}</span>
          {menu}
        </div>
      </div>
    </div>
  )
}

const ICONO_TAREA: Record<string, LucideIcon> = {
  'Clinical Note': ClipboardList, 'Lab Orders': FlaskConical, Prescriptions: Pill, Referrals: Send,
}

/* Una tarea con el diseño de Pending documents (Julián, 2026-10-19): el ícono del tipo en su cuadrado, el tipo con su
   estado en pills, quién y cuándo se registró abajo, el vencimiento a la derecha, el documento y Complete this Task.
   Son las mismas partes que la card (tipo, Requested, paciente, documento, Expired date, Register, Expiration date,
   botón). Va adentro de la lista con divisores de PendingTaskList. Ver design-reference/figma/modulos/dashboard.md. */
export function TaskRow({ task }: { task: PendingTask }) {
  const Icono = ICONO_TAREA[task.kind] ?? ClipboardList
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-bg text-dash-busy-fg"><Icono className="size-4" /></span>
      {/* El nombre pide 14rem: en una columna angosta el vencimiento y el botón bajan a otro renglón en vez de aplastarlo. */}
      <span className="min-w-0 flex-1 basis-56">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold text-ink">{task.kind}</span>
          <PillTag tone="info" size="sm">{task.state}</PillTag>
          <PillTag tone="warning" size="sm"><TriangleAlert className="mr-1 size-2.5" />Expired date</PillTag>
        </span>
        <span className="block truncate text-[12px] text-ink-muted" title={task.person}>{task.person} · Register {task.register}</span>
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-3">
        <span className="flex flex-col items-end gap-0.5 text-right">
          <span className="text-dash-bad-fg text-[12px] font-semibold tabular-nums">{task.expiration}</span>
          <span className="text-[11px] text-ink-muted">Expiration date</span>
        </span>
        <button
          type="button" aria-label="Open document"
          className="bg-dash-bad-chip border-dash-bad-fg flex size-7 shrink-0 items-center justify-center rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
        >
          <FileText className="text-dash-bad-fg size-3.5" />
        </button>
        <Button size="sm" className="shrink-0" onClick={() => completarTarea(task)}>Complete this Task <ArrowRight /></Button>
      </span>
    </div>
  )
}
