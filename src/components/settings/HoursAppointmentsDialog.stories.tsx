import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoursAppointmentsDialog } from './HoursAppointmentsDialog'
import { Bloque, Lienzo, Tabla, TablaPartes } from '@/design-system/kit'
import { esperar, pulsar, pulsarRol, secuencia } from '@/design-system/play'
import { Button } from '@/components/ui/button'
import { TURNOS_LOCACION, type TurnoLocacion } from '@/data/location-detail'

/* Sunday 09:00 - 14:00 aplicado a Monday y Tuesday: quedan afuera el turno de las 15:00 del lunes y el de las 08:00 del martes. */
const AFECTADOS = TURNOS_LOCACION.filter((t) => t.id === 'wh1' || t.id === 'wh2')
const fuera = (t: TurnoLocacion) => {
  const m = t.fecha.getHours() * 60
  return (t.fecha.getDay() === 1 || t.fecha.getDay() === 2) && !(m >= 9 * 60 && m + 60 <= 14 * 60)
}

const meta = {
  title: 'Components/Settings/HoursAppointmentsDialog',
  component: HoursAppointmentsDialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 560 },
      jira: ['CON-1546', 'CON-2890'],
      description: {
        component: [
          'Aviso previo a guardar *Set working hours* cuando las horas nuevas dejan afuera turnos **Proposed** o **Booked** de la locación. Es un `ConfirmDialog` primary con `icon="warning"` y la lista de turnos.',
          '',
          '**Por turno**, el ⋮ (`RowActionsMenu`): *Edit appointment* abre el drawer de la agenda para moverlo de día, hora o provider; *Cancel appointment*; *Mark as No Show*; *Undo changes* vuelve al original. Cada fila dice qué le va a pasar y abajo se cuenta cuántos pasan a la lista de espera.',
          '',
          '**Nada se aplica hasta Confirm**: Confirm guarda las horas y pasa los que quedan a *Waiting List*; Cancel vuelve al panel sin guardar ni las horas ni los turnos. El texto es el de CON-2890 adaptado a la locación (la historia habla del provider).',
          '',
          '**Probalo:** en *Playground*, en el ⋮ de John Smith elegí *Mark as No Show* y mirá cómo cambia la cuenta de abajo.',
        ].join('\n'),
      },
    },
  },
  args: { afectados: AFECTADOS, fueraDeHorario: fuera, operatorios: ['Operatory 1', 'Operatory 2', 'Operatory 3'], onCancel: () => {}, onConfirm: () => {} },
} satisfies Meta<typeof HoursAppointmentsDialog>

export default meta
type Story = StoryObj<typeof meta>

function Demo(args: React.ComponentProps<typeof HoursAppointmentsDialog>) {
  const [abierto, setAbierto] = useState(true)
  return (
    <div className="p-6">
      <Button onClick={() => setAbierto(true)}>Save working hours</Button>
      {abierto && <HoursAppointmentsDialog {...args} onCancel={() => setAbierto(false)} onConfirm={() => setAbierto(false)} />}
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo {...args} /> }

/* Un turno resuelto (No Show) y otro que todavía pasa a la lista de espera. */
export const PartlyManaged: Story = {
  render: (args) => <Demo {...args} />,
  play: secuencia(pulsar(/Actions for appointment for John Smith/), pulsarRol('menuitem', /Mark as No Show/), esperar(/1 appointment will move/)),
}

/* Todos resueltos: Confirm sólo guarda las horas. */
export const AllManaged: Story = {
  render: (args) => <Demo {...args} />,
  play: secuencia(
    pulsar(/Actions for appointment for John Smith/), pulsarRol('menuitem', /Cancel appointment/),
    pulsar(/Actions for appointment for Maria Abril Viola/), pulsarRol('menuitem', /Mark as No Show/),
    esperar(/All affected appointments are managed/),
  ),
}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Header', 'Ícono de alerta ámbar de 16 px y "These hours affect scheduled appointments".', 'ConfirmDialog icon="warning"'],
          ['Message', '"There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list."', 'Texto de CON-2890, adaptado'],
          ['Affected Appointments (N)', 'Fecha y hora, estado (Pill), provider y paciente, y qué le va a pasar. Scroll adentro desde 256px.', 'Lista con divisores'],
          ['Row actions', 'Edit appointment · Cancel appointment · Mark as No Show · Undo changes.', 'RowActionsMenu'],
          ['Summary', '"N appointments will move to the waiting list." o "All affected appointments are managed."', 'Texto 12px ink-muted'],
          ['Footer', 'Cancel y Confirm.', 'ConfirmDialog'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="Por fila. Cada uno se ve en vivo en las stories de esta página.">
        <Tabla encabezado={['Row state', 'Line under the row', 'Color']} minimo={560}>
          <tr><td className="font-semibold">Pending (Booked / Proposed, afuera)</td><td>Moves to the waiting list on Confirm.</td><td>warn-fg</td></tr>
          <tr><td className="font-semibold">Moved inside the hours (Edit appointment)</td><td>Now within the new working hours.</td><td>dash-ok-fg</td></tr>
          <tr><td className="font-semibold">Cancelled / No Show</td><td>Will be marked as Cancelled / No Show.</td><td>dash-ok-fg</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>420px, la del ConfirmDialog.</td></tr>
          <tr><td className="font-semibold">Affected</td><td>Turnos de una hora que no caben enteros en ninguna franja de los días elegidos.</td></tr>
          <tr><td className="font-semibold">Edit appointment</td><td>Abre NewAppointmentModal (Edit Appointment) y esconde el aviso hasta cerrarlo. Si el turno sigue afuera, toast info.</td></tr>
          <tr><td className="font-semibold">Confirm</td><td>"Hours saved for 3 days. 1 appointment was moved to the waiting list."</td></tr>
          <tr><td className="font-semibold">Out of scope</td><td>El bloqueo por turnos Check In / In Progress de CON-2890.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
