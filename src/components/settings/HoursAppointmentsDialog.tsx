import { useState } from 'react'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pill, type PillTone } from '@/components/ui/pill'
import { aviso } from '@/components/ui/toaster'
import { formatDMY } from '@/components/ui/date-picker'
import { NewAppointmentModal, type DatosTurno } from '@/components/scheduling/NewAppointmentModal'
import { hora24 } from '@/components/scheduling/AppointmentSlotPicker'
import type { EstadoTurnoLocacion, TurnoLocacion } from '@/data/location-detail'
import { cn } from '@/lib/utils'

/* Turnos Proposed o Booked que quedan fuera de las horas nuevas de la locación (CON-1546, resolución de CON-2890).
   Cada uno se resuelve aparte —Edit appointment para moverlo de día, hora o provider; Cancel o No Show— o Confirm los
   que quedan pasan a Waiting List. Nada se aplica hasta Confirm: Cancel vuelve al panel sin guardar. El texto de
   CON-2890 habla del provider; acá se adaptó a la locación. Ver figma/modulos/locations.md (2026-11-16). */

const TONO: Record<EstadoTurnoLocacion, PillTone> = {
  Proposed: 'purple', Booked: 'info', Cancelled: 'danger', 'No Show': 'neutral', 'Waiting List': 'warning',
}
const fecha = (d: Date) =>
  d.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
/* Las horas del drawer de turnos ("09 AM"): la agenda va de hora en hora. */
const horaTurno = (h: number) => `${String(h % 12 || 12).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
const pendiente = (t: TurnoLocacion) => t.estado === 'Proposed' || t.estado === 'Booked'

export function HoursAppointmentsDialog({
  afectados, fueraDeHorario, operatorios, onCancel, onConfirm,
}: {
  /** Los turnos que las horas nuevas dejan afuera, tal como están hoy. */
  afectados: TurnoLocacion[]
  /** Si un turno (ya editado) sigue fuera de las horas nuevas. */
  fueraDeHorario: (t: TurnoLocacion) => boolean
  /** Salas activas de la locación, para el drawer de Edit Appointment. */
  operatorios: string[]
  onCancel: () => void
  /** Recibe cada turno como queda: los que siguen pendientes ya en Waiting List. */
  onConfirm: (turnos: TurnoLocacion[]) => void
}) {
  const [borrador, setBorrador] = useState(afectados)
  const [editando, setEditando] = useState<TurnoLocacion | null>(null)
  const sinResolver = borrador.filter((t) => pendiente(t) && fueraDeHorario(t))

  const cambiar = (t: TurnoLocacion) => setBorrador((p) => p.map((x) => (x.id === t.id ? t : x)))
  const marcar = (t: TurnoLocacion, estado: EstadoTurnoLocacion) => cambiar({ ...t, estado })
  const original = (t: TurnoLocacion) => afectados.find((x) => x.id === t.id)!

  const guardarTurno = (d: DatosTurno) => {
    if (!editando) return
    const [dd, mm, yyyy] = (d.date ?? '').split('-').map(Number)
    const estado = d.status === 'Proposed' || d.status === 'Booked' ? d.status : editando.estado
    const nuevo = { ...editando, fecha: new Date(yyyy, mm - 1, dd, hora24(d.start)), provider: d.primary || editando.provider, estado }
    cambiar(nuevo)
    if (fueraDeHorario(nuevo)) aviso.info(`The appointment for ${nuevo.paciente} is still outside the new working hours.`)
    else aviso.ok(`Appointment for ${nuevo.paciente} updated.`)
    return true
  }

  /* Mientras se edita un turno, el aviso se esconde y vuelve al cerrar el drawer (igual que Rooms). */
  if (editando) {
    return (
      <NewAppointmentModal
        titulo="Edit Appointment"
        inicial={{
          patient: editando.paciente, primary: editando.provider, date: formatDMY(editando.fecha),
          start: horaTurno(editando.fecha.getHours()), end: horaTurno(editando.fecha.getHours() + 1),
          operatory: operatorios[0], status: editando.estado,
        }}
        operatorios={operatorios}
        onGuardar={guardarTurno}
        onClose={() => setEditando(null)}
      />
    )
  }

  return (
    <ConfirmDialog
      icon="warning"
      title="These hours affect scheduled appointments"
      confirmLabel="Confirm"
      onCancel={onCancel}
      onConfirm={() => onConfirm(borrador.map((t) => (pendiente(t) && fueraDeHorario(t) ? { ...t, estado: 'Waiting List' } : t)))}
    >
      <p>
        There are scheduled appointments outside the new working hours. You can review and manage each appointment
        individually, or confirm to move all appointments to the waiting list.
      </p>
      <p className="mt-3 font-semibold text-ink">Affected Appointments ({borrador.length})</p>
      <ul className="mt-1.5 flex max-h-64 flex-col divide-y divide-line-soft overflow-y-auto">
        {borrador.map((t) => {
          const queda = pendiente(t) && fueraDeHorario(t)
          const cambio = t !== original(t)
          return (
            <li key={t.id} className="flex items-start justify-between gap-3 py-2 leading-snug">
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-medium text-ink tabular-nums">{fecha(t.fecha)}</span>
                  <Pill tone={TONO[t.estado]} size="sm">{t.estado}</Pill>
                </span>
                <span className="block">{t.provider} · Patient: {t.paciente}</span>
                <span className={cn('block text-[12px]', queda ? 'text-warn-fg' : 'text-dash-ok-fg')}>
                  {queda
                    ? 'Moves to the waiting list on Confirm.'
                    : pendiente(t) ? 'Now within the new working hours.' : `Will be marked as ${t.estado}.`}
                </span>
              </span>
              <RowActionsMenu label={`appointment for ${t.paciente}`} className="shrink-0">
                <DropdownMenuItem onSelect={() => setEditando(t)}>Edit appointment</DropdownMenuItem>
                {t.estado !== 'Cancelled' && <DropdownMenuItem onSelect={() => marcar(t, 'Cancelled')}>Cancel appointment</DropdownMenuItem>}
                {t.estado !== 'No Show' && <DropdownMenuItem onSelect={() => marcar(t, 'No Show')}>Mark as No Show</DropdownMenuItem>}
                {cambio && <DropdownMenuItem onSelect={() => cambiar(original(t))}>Undo changes</DropdownMenuItem>}
              </RowActionsMenu>
            </li>
          )
        })}
      </ul>
      <p className="mt-2 text-[12px] text-ink-muted">
        {sinResolver.length
          ? `${sinResolver.length} ${sinResolver.length === 1 ? 'appointment' : 'appointments'} will move to the waiting list.`
          : 'All affected appointments are managed.'}
      </p>
    </ConfirmDialog>
  )
}
