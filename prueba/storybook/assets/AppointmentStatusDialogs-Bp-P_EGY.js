import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { SelectField } from '@/components/patients/form'
import { MOTIVOS_CANCELACION } from './dashboard-data'

/* Las preguntas del kebab del Dashboard para cerrar una cita sin atenderla. Son distintas y no se reemplazan: No Show
   registra que el paciente no vino; Cancel, que la cita se canceló. Ver design-reference/figma/modulos/dashboard.md. */

/* CON-1827: el motivo es obligatorio; sin él no se confirma. */
export function CancelAppointmentDialog({ nombre, onConfirm, onCancel }: {
  nombre: string
  onConfirm: (motivo: string) => void
  onCancel: () => void
}) {
  const [motivo, setMotivo] = useState('')
  return (
    <ConfirmDialog
      title="Cancel this appointment?" tone="danger" confirmLabel="Cancel appointment" cancelLabel="Keep appointment"
      confirmDisabled={!motivo} onConfirm={() => onConfirm(motivo)} onCancel={onCancel}
    >
      <div className="flex flex-col gap-3">
        <p>{nombre}'s appointment will be cancelled and the time slot freed. Select the reason for canceling it.</p>
        <SelectField label="Reason" required placeholder="Select a reason" options={MOTIVOS_CANCELACION} value={motivo} onChange={setMotivo} />
      </div>
    </ConfirmDialog>
  )
}

/* CON-1828: sólo una cita Booked; el lugar en la agenda no se libera. */
export function NoShowDialog({ nombre, hora, onConfirm, onCancel }: {
  nombre: string
  hora: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <ConfirmDialog title="Mark as no show?" icon="warning" confirmLabel="Mark as no show" onConfirm={onConfirm} onCancel={onCancel}>
      {nombre} didn't arrive for the {hora} appointment. The appointment status changes to No Show and the time slot stays booked.
    </ConfirmDialog>
  )
}
`})))()}export{n,i as r,r as t};