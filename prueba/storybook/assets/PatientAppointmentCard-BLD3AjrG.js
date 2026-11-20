import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { PillTone } from '@/components/ui/pill'
import { Button } from '@/components/ui/button'
import { TarjetaTurno } from '@/components/scheduling/TarjetaTurno'

/* Un turno en el Overview del paciente (bloque Appointments). Es la misma card que las solicitudes de
   Scheduling (TarjetaTurno): barra y pill del color del estado. Ver Elements / Appointment cards y
   patient-dashboard.md (2026-10-12).

   Por qué así:
   - El estado va en la pill y en la barra, con los tonos de toda la app: Booked azul, Fulfilled verde,
     No Show ámbar, Cancelled rojo.
   - Cancel sólo en los turnos que todavía se pueden cancelar: en uno cumplido o ya cancelado no hay
     nada que cancelar. */

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
    <TarjetaTurno
      tono={PATIENT_APPOINTMENT_TONES[status]}
      etiqueta={status}
      nombre={name}
      iniciales={initials}
      motivo={reason}
      cuando={when}
      lugar={place}
      acciones={onCancel && <Button variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>}
    />
  )
}
`})))()}export{n,i as r,r as t};