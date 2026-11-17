import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pill, type PillTone } from '@/components/ui/pill'
import { aviso } from '@/components/ui/toaster'
import { formatDMY } from '@/components/ui/date-picker'
import { NewAppointmentModal, type DatosTurno } from '@/components/scheduling/NewAppointmentModal'
import { hora24 } from '@/components/scheduling/AppointmentSlotPicker'
import type { EstadoTurnoLocacion, TurnoLocacion } from '@/data/location-detail'

/* Citas que pierden cobertura con un cambio de Working Hours (CON-4167, HU 8). La lista la calcula la pantalla con los
   turnos de ese momento: lo que se gestiona acá (Edit appointment, Cancel, No Show) se guarda enseguida, no se deshace
   con Cancel y, si deja de estar afectado, sale de la lista. Confirm pasa el resto a Waiting List. Ver
   figma/modulos/locations.md (2026-11-16). */

const TONO: Record<EstadoTurnoLocacion, PillTone> = {
  Proposed: 'purple', Booked: 'info', 'Check In': 'success', 'In Progress': 'success',
  Cancelled: 'danger', 'No Show': 'neutral', 'Waiting List': 'warning',
}
/* "Monday, November 23 · 3:00–4:00 PM": fecha y horario completo del turno (dura una hora). */
const hora = (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
const cuando = (d: Date) => {
  const fin = new Date(d.getTime() + 60 * 60 * 1000)
  const [a, b] = [hora(d), hora(fin)]
  const rango = a.slice(-2) === b.slice(-2) ? \`\${a.slice(0, -3)}–\${b}\` : \`\${a}–\${b}\`
  return [d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }), rango] as const
}
/* Las horas del drawer de turnos ("09 AM"): la agenda va de hora en hora. */
const horaTurno = (h: number) => \`\${String(h % 12 || 12).padStart(2, '0')} \${h < 12 ? 'AM' : 'PM'}\`

/* Una cita: paciente, fecha y horario, provider; el estado como badge a la derecha. */
export function FilaTurno({ t, acciones }: { t: TurnoLocacion; acciones?: React.ReactNode }) {
  const [dia, rango] = cuando(t.fecha)
  return (
    <li className="flex items-start justify-between gap-3 py-3 leading-snug">
      <span className="flex min-w-0 flex-col gap-1">
        <span className="truncate text-[14px] font-semibold text-ink">{t.paciente}</span>
        {/* En celular el horario baja entero, sin cortarse en el guion. */}
        <span className="text-ink-soft tabular-nums">{dia} · <span className="whitespace-nowrap">{rango}</span></span>
        <span className="text-ink-muted">{t.provider}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <Pill tone={TONO[t.estado]} size="sm">{t.estado}</Pill>
        {acciones}
      </span>
    </li>
  )
}

export function HoursAppointmentsDialog({
  afectados, fueraDeHorario, operatorios, onCambiar, onCancel, onConfirm,
}: {
  /** Las citas que siguen afectadas, recalculadas por la pantalla con los turnos de ese momento. */
  afectados: TurnoLocacion[]
  /** Si una cita (ya editada) sigue perdiendo cobertura con el cambio. */
  fueraDeHorario: (t: TurnoLocacion) => boolean
  /** Salas activas de la locación, para el drawer de Edit Appointment. */
  operatorios: string[]
  /** Guarda en el momento lo que se hizo con una cita: no espera a Confirm ni se deshace con Cancel. */
  onCambiar: (t: TurnoLocacion) => void
  onCancel: () => void
  /** Aplica el cambio de horarios y pasa a Waiting List las citas que siguen afectadas. */
  onConfirm: () => void
}) {
  const [editando, setEditando] = useState<TurnoLocacion | null>(null)

  const marcar = (t: TurnoLocacion, estado: EstadoTurnoLocacion) => {
    onCambiar({ ...t, estado })
    aviso.ok(estado === 'Cancelled' ? \`Appointment for \${t.paciente} cancelled.\` : \`Appointment for \${t.paciente} marked as No Show.\`)
  }

  const guardarTurno = (d: DatosTurno) => {
    if (!editando) return
    const [dd, mm, yyyy] = (d.date ?? '').split('-').map(Number)
    const estado = d.status === 'Proposed' || d.status === 'Booked' ? d.status : editando.estado
    const nuevo = { ...editando, fecha: new Date(yyyy, mm - 1, dd, hora24(d.start)), provider: d.primary || editando.provider, estado }
    onCambiar(nuevo)
    if (fueraDeHorario(nuevo)) aviso.info(\`The appointment for \${nuevo.paciente} is still outside the new working hours.\`)
    else aviso.ok(\`Appointment for \${nuevo.paciente} updated.\`)
    return true
  }

  /* Mientras se edita una cita, el aviso se esconde y vuelve al cerrar el drawer (igual que Rooms). */
  if (editando) {
    return (
      <NewAppointmentModal
        edicion
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
    <ConfirmDialog icon="warning" title="Affected appointments" confirmLabel="Confirm" onCancel={onCancel} onConfirm={onConfirm}>
      <p>
        There are scheduled appointments outside the new working hours. You can review and manage each appointment
        individually, or confirm to move all appointments to the waiting list.
      </p>
      {/* El contador es el de las citas pendientes: las resueltas salen de la lista (CON-4167). */}
      <p className="mt-3 font-semibold text-ink">Appointments ({afectados.length})</p>
      <ul className="mt-1 flex max-h-72 flex-col divide-y divide-line-soft overflow-y-auto">
        {afectados.map((t) => (
          <FilaTurno
            key={t.id}
            t={t}
            acciones={
              <RowActionsMenu label={\`appointment for \${t.paciente}\`}>
                <DropdownMenuItem onSelect={() => setEditando(t)}>Edit appointment</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => marcar(t, 'Cancelled')}>Cancel appointment</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => marcar(t, 'No Show')}>Mark as No Show</DropdownMenuItem>
              </RowActionsMenu>
            }
          />
        ))}
      </ul>
    </ConfirmDialog>
  )
}

/* Bloqueo de CON-4167: si el cambio deja afuera una cita en Check In o In Progress, no se aplica nada. Sólo Close. */
export function HoursBlockedDialog({ turnos, onClose }: { turnos: TurnoLocacion[]; onClose: () => void }) {
  return (
    <ConfirmDialog icon="warning" title="Unable to change working hours" confirmLabel="Close" hideCancel onCancel={onClose} onConfirm={onClose}>
      <p>Working hours cannot be changed because there are affected appointments in Check In or In Progress status.</p>
      <ul className="mt-2 flex flex-col divide-y divide-line-soft">
        {turnos.map((t) => <FilaTurno key={t.id} t={t} />)}
      </ul>
    </ConfirmDialog>
  )
}
`})))()}export{n,i as r,r as t};