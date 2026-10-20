import { Calendar, Check, ChevronDown, User } from 'lucide-react'
import { StatusPill } from './primitives'
import type { Appointment } from './AppointmentCard'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export type OperatoryStatus = 'Available' | 'Busy' | 'Unavailable'

export type Operatory = {
  name: string
  status: OperatoryStatus
  patientsToday: number
  provider: string
}

const TONE = {
  Available: 'ok',
  Busy: 'busy',
  Unavailable: 'bad',
} as const

/* La card toma el color de su estado (borde y fondo, los de su pill): de un vistazo se ve qué sala está libre (Julián,
   2026-10-17; los vuelve a pedir el 2026-10-19 en el acordeón). Ver design-reference/figma/modulos/dashboard.md. */
export const OPERATORY_SURFACES = {
  Available: 'border-dash-ok-fg bg-dash-ok-bg',
  Busy: 'border-dash-busy-fg bg-dash-busy-bg',
  Unavailable: 'border-dash-bad-fg bg-dash-bad-bg',
} as const

/* Una sala del Dashboard, con el diseño del 2026-10-19 (artifact de Julián): nombre, estado, cuántos pacientes tiene hoy y
   el profesional. Con `onToggle` es un acordeón: tocarla despliega la línea del día de esa sala -hora, paciente, motivo,
   profesional y si ya se atendió o viene-, y no filtra nada de afuera. Va adentro de un panel (card interna, blanca).
   Ver design-reference/figma/modulos/dashboard.md. */
export function OperatoryCard({ room, turnos, abierta, onToggle, onSelect }: {
  room: Operatory
  /** Los turnos del día en esta sala. Con ellos, "Patients today" es su cantidad y coincide con la línea. */
  turnos?: Appointment[]
  abierta?: boolean
  /** La card se vuelve un botón (aria-expanded) que despliega la línea. */
  onToggle?: () => void
  /** Tocar un turno de la línea (abre la ficha del paciente). */
  onSelect?: (appt: Appointment, el: HTMLElement) => void
}) {
  const cuantos = turnos ? turnos.length : room.patientsToday
  const cabecera = (
    <>
      <span className="flex items-center justify-between gap-2">
        <span className="text-dash-name truncate text-sm leading-none font-semibold">{room.name}</span>
        <span className="flex shrink-0 items-center gap-1.5">
          <StatusPill tone={TONE[room.status]}>{room.status}</StatusPill>
          {onToggle && <ChevronDown aria-hidden className={cn('text-ink-muted size-4 transition-transform', abierta && 'rotate-180')} />}
        </span>
      </span>
      <span className="text-dash-muted flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs">
        <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
          <Calendar className="size-3.5 shrink-0" />
          <span>Patients today:</span>
          <span className="bg-dash-count-bg text-dash-blue-hover rounded-full px-2 py-[3px] text-[11px] leading-none font-medium">{cuantos}</span>
        </span>
        <span className="flex min-w-0 items-center gap-1.5">
          <User className="size-3.5 shrink-0" />
          <span className="truncate">{room.provider}</span>
        </span>
      </span>
    </>
  )

  return (
    <div className={cn('flex flex-col overflow-hidden rounded-lg border', OPERATORY_SURFACES[room.status], abierta && 'shadow-panel')}>
      {onToggle ? (
        <button
          type="button" aria-expanded={!!abierta} onClick={onToggle} title={abierta ? `Hide ${room.name}'s day` : `Show ${room.name}'s day`}
          className="flex w-full min-w-0 flex-col gap-1.5 rounded-lg px-3.5 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
        >
          {cabecera}
        </button>
      ) : (
        <div className="flex w-full min-w-0 flex-col gap-1.5 px-3.5 py-3">{cabecera}</div>
      )}
      {abierta && (
        <div className={cn('border-t bg-white', OPERATORY_SURFACES[room.status].split(' ')[0])}>
          <LineaDelDia room={room} turnos={turnos ?? []} onSelect={onSelect} />
        </div>
      )}
    </div>
  )
}

/* La línea de la sala: a la izquierda la hora y el punto (tilde verde si ya se atendió, aro azul si viene), unidos por una
   línea; a la derecha el turno. Los que vienen van resaltados en azul. */
export function LineaDelDia({ room, turnos, onSelect }: {
  room: Operatory
  turnos: Appointment[]
  onSelect?: (appt: Appointment, el: HTMLElement) => void
}) {
  const ordenados = [...turnos].sort((a, b) => a.time.localeCompare(b.time))
  if (ordenados.length === 0) {
    return <p className="text-ink-muted px-3.5 pb-3 text-xs">No appointments in {room.name} today.</p>
  }
  return (
    <ol aria-label={`${room.name} today`} className="flex flex-col px-3.5 pt-3 pb-3 motion-safe:animate-[loc-in_160ms_ease-out]">
      {ordenados.map((t, i) => {
        const hecho = !!(t as { completado?: boolean }).completado
        const ultimo = i === ordenados.length - 1
        const contenido = (
          <>
            <Avatar initials={t.initials} size={28} />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-dash-name truncate text-[13px] font-semibold" title={t.name}>{t.name}</span>
              <span className="flex items-center justify-between gap-2 text-[11px]">
                <span className="text-ink-muted truncate">{t.motivo ?? 'Check-up'}</span>
                <span className={cn('shrink-0 font-semibold', hecho ? 'text-dash-ok-fg' : 'text-dash-blue')}>
                  {hecho ? 'Complete' : 'Upcoming'}
                </span>
              </span>
              <span className="text-ink-muted flex items-center gap-1 truncate text-[11px]"><User className="size-3 shrink-0" />{t.provider}</span>
            </span>
          </>
        )
        const claseCard = cn(
          'flex w-full min-w-0 items-start gap-2 rounded-lg border p-2 text-left',
          hecho ? 'border-line-row bg-white' : 'border-dash-blue bg-info-bg',
        )
        return (
          <li key={i} className="grid grid-cols-[44px_minmax(0,1fr)] gap-2">
            <div className="relative flex flex-col items-center pt-2">
              <span className="text-dash-name text-[11px] leading-none font-semibold tabular-nums">{t.time}</span>
              <span
                aria-hidden
                className={cn('z-10 mt-1.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-white', hecho ? 'bg-dash-ok-fg text-white' : 'border-dash-blue border-[3px]')}
              >
                {hecho && <Check className="size-2.5" strokeWidth={3} />}
              </span>
              {!ultimo && <span aria-hidden className="bg-line absolute top-[34px] -bottom-2 w-px" />}
            </div>
            <div className="pb-2">
              {onSelect ? (
                <button type="button" onClick={(e) => onSelect(t, e.currentTarget)} className={cn(claseCard, 'hover:shadow-inner-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue')}>
                  {contenido}
                </button>
              ) : <div className={claseCard}>{contenido}</div>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
