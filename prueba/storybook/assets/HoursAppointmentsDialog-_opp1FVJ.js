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

/* Turnos Proposed o Booked que quedan fuera de las horas nuevas de la locación (CON-1546, resolución de CON-2890).
   Cada uno se resuelve aparte —Edit appointment para moverlo de día, hora o provider; Cancel o No Show— o Confirm los
   que quedan pasan a Waiting List. Nada se aplica hasta Confirm: Cancel vuelve al panel sin guardar. El texto de
   CON-2890 habla del provider; acá se adaptó a la locación. Ver figma/modulos/locations.md (2026-11-16). */

const TONO: Record<EstadoTurnoLocacion, PillTone> = {
  Proposed: 'purple', Booked: 'info', Cancelled: 'danger', 'No Show': 'neutral', 'Waiting List': 'warning',
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

  const cambiar = (t: TurnoLocacion) => setBorrador((p) => p.map((x) => (x.id === t.id ? t : x)))
  const marcar = (t: TurnoLocacion, estado: EstadoTurnoLocacion) => cambiar({ ...t, estado })
  const original = (t: TurnoLocacion) => afectados.find((x) => x.id === t.id)!

  const guardarTurno = (d: DatosTurno) => {
    if (!editando) return
    const [dd, mm, yyyy] = (d.date ?? '').split('-').map(Number)
    const estado = d.status === 'Proposed' || d.status === 'Booked' ? d.status : editando.estado
    const nuevo = { ...editando, fecha: new Date(yyyy, mm - 1, dd, hora24(d.start)), provider: d.primary || editando.provider, estado }
    cambiar(nuevo)
    if (fueraDeHorario(nuevo)) aviso.info(\`The appointment for \${nuevo.paciente} is still outside the new working hours.\`)
    else aviso.ok(\`Appointment for \${nuevo.paciente} updated.\`)
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
      title="Affected appointments"
      confirmLabel="Confirm"
      onCancel={onCancel}
      onConfirm={() => onConfirm(borrador.map((t) => (pendiente(t) && fueraDeHorario(t) ? { ...t, estado: 'Waiting List' } : t)))}
    >
      <p>
        There are scheduled appointments outside the new working hours. You can review and manage each appointment
        individually, or confirm to move all appointments to the waiting list.
      </p>
      {/* Paciente y acciones arriba; fecha y horario; provider. El estado, badge a la derecha. Ver locations.md, 2026-11-16. */}
      <p className="mt-3 font-semibold text-ink">Appointments ({borrador.length})</p>
      <ul className="mt-1 flex max-h-72 flex-col divide-y divide-line-soft overflow-y-auto">
        {borrador.map((t) => {
          const adentro = pendiente(t) && !fueraDeHorario(t)
          const cambio = t !== original(t)
          return (
            <li key={t.id} className="flex items-start justify-between gap-3 py-3 leading-snug">
              <span className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-[14px] font-semibold text-ink">{t.paciente}</span>
                {/* En celular el horario baja entero, sin cortarse en el guion. */}
                <span className="text-ink-soft tabular-nums">
                  {cuando(t.fecha)[0]} · <span className="whitespace-nowrap">{cuando(t.fecha)[1]}</span>
                </span>
                <span className="text-ink-muted">{t.provider}</span>
                {/* Movido adentro del horario: el estado sigue siendo el mismo, así que se dice aparte. */}
                {adentro && <span className="text-[12px] text-dash-ok-fg">Now within the new working hours.</span>}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <Pill tone={TONO[t.estado]} size="sm">{t.estado}</Pill>
                <RowActionsMenu label={\`appointment for \${t.paciente}\`}>
                  <DropdownMenuItem onSelect={() => setEditando(t)}>Edit appointment</DropdownMenuItem>
                  {t.estado !== 'Cancelled' && <DropdownMenuItem onSelect={() => marcar(t, 'Cancelled')}>Cancel appointment</DropdownMenuItem>}
                  {t.estado !== 'No Show' && <DropdownMenuItem onSelect={() => marcar(t, 'No Show')}>Mark as No Show</DropdownMenuItem>}
                  {cambio && <DropdownMenuItem onSelect={() => cambiar(original(t))}>Undo changes</DropdownMenuItem>}
                </RowActionsMenu>
              </span>
            </li>
          )
        })}
      </ul>
    </ConfirmDialog>
  )
}
`})))()}export{n,i as r,r as t};