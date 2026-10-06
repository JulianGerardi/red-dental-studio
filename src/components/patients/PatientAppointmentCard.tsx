import { Clock, MapPin } from 'lucide-react'
import { InnerCard } from '@/components/dashboard/primitives'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Button } from '@/components/ui/button'

/* Un turno en el Overview del paciente (bloque Appointments). Ver
   Elements / Appointment cards.

   Por qué así:
   - Barra azul a la izquierda en vez de un borde completo: es la misma barra
     de acento que tienen los turnos del calendario de Scheduling, así un
     turno se reconoce igual en las dos pantallas.
   - El estado va en una Pill arriba a la derecha, con los tonos de toda la
     app: Booked azul, Fulfilled verde, No Show ámbar, Cancelled rojo.
   - Motivo, fecha y lugar en gris, un renglón cada uno y recortados: la
     columna del Overview es angosta y la card no tiene que crecer.
   - Cancel sólo en los turnos que todavía se pueden cancelar: en uno
     cumplido o ya cancelado no hay nada que cancelar. */

export type PatientAppointmentStatus = 'Booked' | 'Cancelled' | 'Fulfilled' | 'No Show'

export const PATIENT_APPOINTMENT_TONES: Record<PatientAppointmentStatus, PillTone> = {
  Booked: 'info',
  Cancelled: 'danger',
  Fulfilled: 'success',
  'No Show': 'warning',
}

export function PatientAppointmentCard({
  name,
  initials,
  status,
  reason,
  when,
  place,
  onCancel,
}: {
  name: string
  initials: string
  status: PatientAppointmentStatus
  reason: string
  when: string
  place: string
  /** Sólo en los turnos que se pueden cancelar: sin handler no hay botón. */
  onCancel?: () => void
}) {
  return (
    <InnerCard className="p-2.5">
      <div className="flex items-start gap-2">
        <span className="bg-dash-blue-hover flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white">{initials}</span>
        <span className="min-w-0 flex-1 truncate text-xs font-semibold text-ink">{name}</span>
        <Pill tone={PATIENT_APPOINTMENT_TONES[status]} className="shrink-0">{status}</Pill>
      </div>
      <p className="mt-1 truncate text-[11px] text-ink-muted">{reason}</p>
      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-muted">
        <Clock className="size-3 shrink-0" /> {when}
      </p>
      <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-ink-muted">
        <MapPin className="size-3 shrink-0" /> {place}
      </p>
      {onCancel && (
        <Button variant="secondary" size="sm" onClick={onCancel} className="mt-2 ml-auto flex">
          Cancel
        </Button>
      )}
    </InnerCard>
  )
}
