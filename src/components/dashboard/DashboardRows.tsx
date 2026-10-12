import { useNavigate } from 'react-router-dom'
import { CalendarDays, Check, FlaskConical, NotebookPen, Pencil, Pill as PillIcon, Send, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { BLOCK_STYLE } from '@/components/scheduling/calendar-data'
import { TARJETA_PANEL } from '@/lib/estilos'
import { InnerCard } from './primitives'
import type { Operatory } from './OperatoryCard'
import type { Appointment } from './AppointmentCard'
import type { PendingTask } from './PendingTaskCard'
import { AHORA_DEMO, type EnEspera, type Turno } from './dashboard-data'

/* Las filas del Dashboard con volumen (variantes A y B de la propuesta del 2026-10-12, ver
   design-reference/figma/modulos/dashboard.md): una fila por turno o tarea en lugar de una card de 190px, la barra de
   color del estado del calendario de Scheduling y una sola acción, la que sigue. Con @container la fila se adapta al
   ancho de su lista: angosta en dos renglones (menos de 384px, los minutos van abajo), ancha en columnas desde 768px. */

export type EtapaTurno = 'upcoming' | 'waiting' | 'in-chair' | 'done'

/* Cada etapa con su estado de Scheduling (el color de la barra) y la acción que la hace avanzar. */
export const ETAPAS: Record<EtapaTurno, { estado: keyof typeof BLOCK_STYLE; rotulo: string; accion?: string }> = {
  upcoming: { estado: 'Booked', rotulo: 'Booked', accion: 'Check In' },
  waiting: { estado: 'Check-in', rotulo: 'Waiting', accion: 'Seat' },
  'in-chair': { estado: 'In progress', rotulo: 'In chair', accion: 'Check Out' },
  done: { estado: 'Fulfilled', rotulo: 'Fulfilled' },
}

const aMinutos = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5))

/* Minutos que lleva en la etapa: en la sala de espera o en el sillón. */
export function minutosEnEtapa(appt: Turno & EnEspera, etapa: EtapaTurno) {
  if (etapa === 'waiting') return appt.espera ?? 0
  if (etapa === 'in-chair' && appt.enSillon) return Math.max(0, aMinutos(AHORA_DEMO) - aMinutos(appt.enSillon))
  return undefined
}

/* Espera: desde 15 minutos en ámbar y desde 25 en rojo (umbral a validar con recepción). */
export const tonoEspera = (min: number) => (min >= 25 ? 'text-dash-bad-fg' : min >= 15 ? 'text-warn-fg' : 'text-ink-muted')

export function MenuTurno({ nombre, onEdit }: { nombre: string; onEdit?: () => void }) {
  const navigate = useNavigate()
  return (
    <RowActionsMenu label={nombre} className="shrink-0">
      <DropdownMenuItem onSelect={() => onEdit?.()}><Pencil className="size-4 shrink-0" /> Edit appointment</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => navigate('/scheduling')}><CalendarDays className="size-4 shrink-0" /> Go to appointment</DropdownMenuItem>
    </RowActionsMenu>
  )
}

type PropsTurno = {
  appt: Turno & EnEspera
  /** Identifica la fila: el popover del paciente marca la que lo abrió. */
  id?: string
  /** Con la ficha rápida abierta desde esta fila. */
  activa?: boolean
  onSelect?: (appt: Appointment, el: HTMLElement, id?: string) => void
  onEdit?: () => void
  /** La acción de la etapa: Check In, Seat o Check Out. */
  onAccion?: () => void
}

/* El nombre abre la ficha rápida, como en la card: la fila entera no puede ser un botón porque tiene otros adentro. */
export function NombreTurno({ appt, id, activa, onSelect, className, children }: Pick<PropsTurno, 'appt' | 'id' | 'activa' | 'onSelect'> & { className?: string; children: React.ReactNode }) {
  if (!onSelect) return <span className={className}>{children}</span>
  return (
    <button
      type="button" aria-expanded={!!activa}
      onClick={(e) => onSelect(appt, e.currentTarget.closest<HTMLElement>('[data-appt-row]')!, id)}
      className={cn('rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue', className)}
    >
      {children}
    </button>
  )
}

export function AppointmentRow({ appt, etapa, id, activa, onSelect, onEdit, onAccion }: PropsTurno & { etapa: EtapaTurno }) {
  const { estado, rotulo, accion } = ETAPAS[etapa]
  const min = minutosEnEtapa(appt, etapa)
  const hecho = etapa === 'done'
  return (
    <div className="@container">
      <div data-appt-row className={cn('relative flex items-center gap-2.5 py-2 pr-2 pl-4 @3xl:gap-4', activa && 'bg-info-bg')}>
        <span aria-hidden className="absolute inset-y-2 left-1.5 w-[3px] rounded-full" style={{ backgroundColor: BLOCK_STYLE[estado]!.bar }} />
        <span className={cn('w-10 shrink-0 text-[13px] font-semibold tabular-nums', hecho ? 'text-ink-muted' : 'text-ink')}>{appt.time}</span>
        <NombreTurno appt={appt} id={id} activa={activa} onSelect={onSelect} className="min-w-0 flex-1 @3xl:w-52 @3xl:flex-none">
          <span className="flex items-center gap-1.5">
            <span className={cn('truncate text-[13px] font-semibold', hecho ? 'text-ink-muted' : 'text-ink')}>{appt.name}</span>
            {appt.nuevo && <Pill tone="purple" size="sm" className="shrink-0">New</Pill>}
          </span>
          <span className="block truncate text-[11px] text-ink-muted @3xl:hidden">
            {/* Muy angosta, los minutos bajan a este renglón para no comerse el nombre. */}
            {min !== undefined && <span className={cn('font-semibold @sm:hidden', etapa === 'waiting' ? tonoEspera(min) : 'text-ink-medium')}>{min} min · </span>}
            {appt.provider} · {appt.operatory}
          </span>
        </NombreTurno>
        <span className="hidden min-w-0 flex-1 truncate text-[12px] text-ink-soft @3xl:block">{appt.provider}</span>
        <span className="hidden w-28 shrink-0 truncate text-[12px] text-ink-soft @3xl:block">{appt.operatory}</span>
        {/* Angosta, sólo los minutos; ancha, la etapa y los minutos en su columna. */}
        <span className={cn('hidden shrink-0 text-right text-[12px] font-semibold tabular-nums @3xl:block @3xl:w-28', min !== undefined && '@sm:block', etapa === 'waiting' ? tonoEspera(min ?? 0) : 'text-ink-muted')}>
          <span className="hidden font-medium @3xl:inline">{rotulo}{min !== undefined && ' · '}</span>
          {min !== undefined && `${min} min`}
        </span>
        <span className={cn('flex shrink-0 justify-end @3xl:w-24', hecho && 'hidden @3xl:flex')}>
          {accion && <Button size="sm" variant="secondary" onClick={onAccion}>{accion}</Button>}
        </span>
        {hecho && <Check aria-label="Fulfilled" className="size-4 shrink-0 text-dash-ok-fg @3xl:hidden" />}
        <MenuTurno nombre={appt.name} onEdit={onEdit} />
      </div>
    </div>
  )
}

/* El próximo paciente: la única fila con la acción en azul y a lo ancho. Es el turno en foco; los demás van en filas. */
export function NextAppointment({ appt, id, activa, onSelect, onEdit, onAccion }: PropsTurno) {
  return (
    <div data-appt-row className={cn('flex flex-col gap-3 rounded-lg bg-info-bg p-3', activa && 'shadow-[inset_0_0_0_2px_var(--color-dash-blue)]')}>
      <div className="flex items-start gap-3">
        <span className="bg-dash-blue flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white">{appt.initials}</span>
        <NombreTurno appt={appt} id={id} activa={activa} onSelect={onSelect} className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[11px] font-semibold tracking-wide text-dash-blue uppercase">Next · {appt.time}</span>
          <span className="truncate text-[15px] leading-tight font-bold text-ink">{appt.name}</span>
          <span className="truncate text-[12px] text-ink-muted">{appt.provider} · {appt.operatory}</span>
        </NombreTurno>
        <MenuTurno nombre={appt.name} onEdit={onEdit} />
      </div>
      <Button size="lg" className="w-full" onClick={onAccion}>Check In</Button>
    </div>
  )
}

const ICONO_TAREA: Record<string, LucideIcon> = {
  'Clinical Note': NotebookPen, 'Lab Orders': FlaskConical, Prescriptions: PillIcon, Referrals: Send,
}

/* Vencimiento en palabras, como Pending documents: "Overdue 3 days", "Due today", "Due in 4 days". */
export function venceTexto(t: PendingTask) {
  const v = t.vence
  if (v === undefined) return `Due ${t.expiration}`
  if (v < 0) return `Overdue ${-v} ${v === -1 ? 'day' : 'days'}`
  return v === 0 ? 'Due today' : `Due in ${v} ${v === 1 ? 'day' : 'days'}`
}

export const tonoVence = (v?: number) =>
  v === undefined || v > 0 ? { texto: 'text-ink-muted', icono: 'bg-brand-tint text-dash-blue' }
  : v < 0 ? { texto: 'text-dash-bad-fg', icono: 'bg-dash-bad-bg text-dash-bad-fg' }
  : { texto: 'text-warn-fg', icono: 'bg-warn-bg text-warn-fg' }

export function TaskRow({ task, onComplete }: { task: PendingTask; onComplete?: () => void }) {
  const Icono = ICONO_TAREA[task.kind] ?? NotebookPen
  const tono = tonoVence(task.vence)
  return (
    <div className="@container">
      <div className="flex items-center gap-2.5 py-2 pr-2 pl-3 @3xl:gap-4">
        <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg', tono.icono)}><Icono className="size-4" /></span>
        <span className="min-w-0 flex-1 @3xl:w-52 @3xl:flex-none">
          <span className="block truncate text-[13px] font-semibold text-ink">{task.kind}</span>
          <span className="block truncate text-[11px] text-ink-muted @3xl:hidden">
            {task.person} · <span className={cn('font-medium', tono.texto)}>{venceTexto(task)}</span>
          </span>
        </span>
        <span className="hidden min-w-0 flex-1 truncate text-[12px] text-ink-soft @3xl:block">{task.person}</span>
        <span className={cn('hidden w-32 shrink-0 text-right text-[12px] font-semibold @3xl:block', tono.texto)}>{venceTexto(task)}</span>
        <Button size="sm" variant="secondary" onClick={onComplete}>Complete</Button>
      </div>
    </div>
  )
}

/* Una sala en dos líneas: el nombre con el punto de su estado, y abajo el estado y quién está (o el provider, si está
   libre). El estado va en texto y no en pill: con pill, siete salas no entraban en una fila. */
const PUNTO_SALA: Record<Operatory['status'], { punto: string; texto: string }> = {
  Available: { punto: 'bg-dash-ok-fg', texto: 'text-dash-ok-fg' },
  Busy: { punto: 'bg-dash-blue', texto: 'text-dash-blue' },
  Unavailable: { punto: 'bg-dash-bad-fg', texto: 'text-dash-bad-fg' },
}

export function RoomTile({ room }: { room: Operatory }) {
  const c = PUNTO_SALA[room.status]
  return (
    <InnerCard className="flex h-full flex-col gap-0.5 px-3 py-2">
      <span className="flex items-center gap-1.5">
        <span aria-hidden className={cn('size-2 shrink-0 rounded-full', c.punto)} />
        <span className="truncate text-[13px] font-semibold text-ink">{room.name}</span>
      </span>
      <span className="truncate text-[11px] text-ink-muted">
        <span className={cn('font-semibold', c.texto)}>{room.status}</span>
        {' · '}{room.status === 'Busy' && room.paciente ? room.paciente : room.provider}
      </span>
    </InnerCard>
  )
}

/* Las salas como un mapa de una fila: de un vistazo, cuáles están ocupadas y por quién. Con muchas, se desliza. */
export function RoomStrip({ rooms }: { rooms: Operatory[] }) {
  const ocupadas = rooms.filter((r) => r.status === 'Busy').length
  return (
    <section aria-label="Rooms" className={cn(TARJETA_PANEL, 'flex flex-col gap-3 p-4 lg:flex-row lg:items-center')}>
      <div className="flex shrink-0 items-baseline gap-2 lg:w-24 lg:flex-col lg:gap-0.5">
        <h2 className="text-[15px] font-bold text-ink">Rooms</h2>
        <span className="text-[12px] text-ink-muted">{ocupadas} of {rooms.length} busy</span>
      </div>
      <ul className="flex min-w-0 flex-1 gap-2 overflow-x-auto p-px">
        {rooms.map((r, i) => <li key={i} className="min-w-[132px] flex-1"><RoomTile room={r} /></li>)}
      </ul>
    </section>
  )
}
