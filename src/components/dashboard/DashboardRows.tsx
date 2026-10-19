import { ArrowRight, Check, Clock, FileText, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { StatusPill } from './primitives'
import { ACCION_TURNO, MenuCard, accionTurno, type Appointment } from './AppointmentCard'
import { completarTarea, type PendingTask } from './PendingTaskCard'
import { Avatar } from '@/components/ui/avatar'

/* Las filas del Dashboard con volumen (propuesta del 2026-10-12, ver design-reference/figma/modulos/dashboard.md): lo
   mismo que cada card del Figma, en una fila. Mismos datos, mismos chips y mismas acciones; cambia sólo cómo se acomodan.
   Con @container la fila se adapta al ancho de su lista: en renglones en angosto, en columnas cuando entra. */

/* Los chips TR y CC de la card de turno (AppointmentCard), a 24px de alto. */
export function ChipsTurno() {
  return (
    <span className="flex shrink-0 items-center gap-1">
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
export function AppointmentRow({ appt, id, activa, onSelect, onEdit }: PropsTurno) {
  const accion = appt.accion ?? 'Check Out'
  const iniciales = <Avatar initials={appt.initials} size={28} />
  const boton = (
    <Button size="sm" variant={ACCION_TURNO[accion]} className="shrink-0" onClick={(e) => { e.stopPropagation(); accionTurno(appt) }}>{accion} <ArrowRight /></Button>
  )
  const menu = <MenuCard nombre={appt.name} onEdit={onEdit && (() => onEdit(appt))} />
  const donde = `${appt.provider} · ${appt.operatory}`

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
              <ChipsTurno />
              {menu}
            </div>
            {/* Si no entra, el botón baja a su propio renglón en vez de cortar el provider. */}
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
              <span className="flex min-w-[min(220px,100%)] flex-1 items-center gap-1.5">
                {CHECK_IN}
                <span className="truncate text-[11px] text-ink-muted" title={donde}>{donde}</span>
              </span>
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
          <span className="w-24 shrink-0 truncate text-[12px] text-ink-soft">{appt.operatory}</span>
          <ChipsTurno />
          <span className="flex w-28 shrink-0 justify-end">{boton}</span>
          {menu}
        </div>
      </div>
    </div>
  )
}

/* El documento y "Expired date" de la card de tarea. */
export function DocYVencida() {
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <button
        type="button" aria-label="Open document"
        className="bg-dash-bad-chip border-dash-bad-fg flex size-7 shrink-0 items-center justify-center rounded-md border"
      >
        <FileText className="text-dash-bad-fg size-3.5" />
      </button>
      <span className="flex shrink-0 items-center gap-1 rounded-md border border-amber-400 bg-amber-50 px-2 py-1.5 text-[11px] font-medium text-amber-700">
        <TriangleAlert className="size-3" /> Expired date
      </span>
    </span>
  )
}

/* Una tarea: lo mismo que PendingTaskCard (tipo, Requested, paciente, documento, Expired date, Register, Expiration
   date y Complete this Task), en el mismo orden pero más compacta. En columnas recién desde 1024px de lista: tiene más
   partes que el turno. */
export function TaskRow({ task }: { task: PendingTask }) {
  const tipo = <span className="text-dash-name truncate text-sm leading-none font-bold">{task.kind}</span>
  const persona = (
    <span className="flex min-w-0 items-center gap-2">
      <Avatar initials={task.initials} size={28} />
      <span className="text-dash-name truncate text-[13px] font-semibold">{task.person}</span>
    </span>
  )
  const estado = (
    <span className="text-dash-blue flex shrink-0 items-center gap-1.5 text-xs">
      <span className="bg-dash-blue size-1.5 rounded-full" /> {task.state}
    </span>
  )
  const fecha = (rotulo: string, valor: string, color: string) => (
    <span className="flex flex-col gap-0.5 text-[11px]">
      <span className="text-dash-delta">{rotulo}</span>
      <span className={cn('font-medium whitespace-nowrap', color)}>{valor}</span>
    </span>
  )
  const fechas = (
    <span className="flex gap-4">
      {fecha('Register', task.register, 'text-dash-blue')}
      {fecha('Expiration date', task.expiration, 'text-dash-bad-fg')}
    </span>
  )
  const boton = (
    <Button size="sm" className="shrink-0" onClick={() => completarTarea(task)}>Complete this Task <ArrowRight /></Button>
  )

  /* Cada parte pegada a la que acompaña, como en la card: el tipo con Requested, el paciente con el documento y
     Expired date. El aire libre va antes del botón, no entre los datos (Julián, 2026-10-13). En angosto el documento y
     Expired date van contra el borde derecho, alineados con el botón azul (2026-10-18). */
  return (
    <div className="@container">
      <div className="flex flex-col gap-2 p-2.5 @5xl:hidden">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">{tipo}{estado}</div>
        <div className="flex flex-wrap items-center gap-2">{persona}<span className="ml-auto"><DocYVencida /></span></div>
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          {fechas}
          <span className="ml-auto">{boton}</span>
        </div>
      </div>

      <div className="hidden items-center gap-5 p-2.5 @5xl:flex">
        <span className="flex w-48 shrink-0 items-center gap-2.5">{tipo}{estado}</span>
        <span className="flex w-40 shrink-0">{persona}</span>
        <DocYVencida />
        {fechas}
        <span className="ml-auto">{boton}</span>
      </div>
    </div>
  )
}
