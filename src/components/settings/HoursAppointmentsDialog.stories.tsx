import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilaTurno, HoursAppointmentsDialog, HoursBlockedDialog } from './HoursAppointmentsDialog'
import { Bloque, Lienzo, Tabla, TablaPartes } from '@/design-system/kit'
import { esperar, pulsar, pulsarRol, secuencia } from '@/design-system/play'
import { Button } from '@/components/ui/button'
import { TURNOS_LOCACION, type TurnoLocacion } from '@/data/location-detail'

/* Sunday 09:00 - 14:00 aplicado a Monday y Tuesday: pierden cobertura el turno de las 15:00 del lunes y el de las 08:00
   del martes. */
const INICIALES = TURNOS_LOCACION.filter((t) => t.id === 'wh1' || t.id === 'wh2')
const fuera = (t: TurnoLocacion) => {
  const m = t.fecha.getHours() * 60
  return (t.fecha.getDay() === 1 || t.fecha.getDay() === 2) && !(m >= 9 * 60 && m + 60 <= 14 * 60)
}
const pendiente = (t: TurnoLocacion) => t.estado === 'Proposed' || t.estado === 'Booked'

const meta = {
  title: 'Components/Settings/HoursAppointmentsDialog',
  component: HoursAppointmentsDialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 560 },
      jira: ['CON-4167', 'CON-4164', 'CON-4165', 'CON-4166'],
      description: {
        component: [
          'Citas que pierden cobertura con un cambio de Working Hours (CON-4167, HU 8): guardar el panel, borrar una franja con la ✕ o cerrar un día. Es un `ConfirmDialog` primary con `icon="warning"` y la lista de citas.',
          '',
          '**Por cita**, el ⋮ (`RowActionsMenu`): *Edit appointment* (moverla de día, hora o provider), *Cancel appointment* o *Mark as No Show*. Se guarda en el momento y no se deshace con Cancel; la cita resuelta **sale de la lista** y el contador *Appointments (N)* baja. Si no queda ninguna, se vuelve a la acción de origen.',
          '',
          '**Confirm** aplica el cambio y pasa a *Waiting List* las que siguen afectadas. **Cancel** no cambia los horarios. Si alguna cita afectada está en Check In o In Progress, en lugar de este aviso sale *Unable to change working hours* (`HoursBlockedDialog`) y no se aplica nada.',
          '',
          '**Probalo:** en *Playground*, en el ⋮ de John Smith elegí *Mark as No Show*: la fila sale y el contador pasa a 1.',
        ].join('\n'),
      },
    },
  },
  args: { afectados: INICIALES, fueraDeHorario: fuera, operatorios: ['Operatory 1', 'Operatory 2', 'Operatory 3'], onCambiar: () => {}, onCancel: () => {}, onConfirm: () => {} },
} satisfies Meta<typeof HoursAppointmentsDialog>

export default meta
type Story = StoryObj<typeof meta>

/* Las citas viven afuera, como en la pantalla: lo resuelto deja de estar afectado y sale de la lista. */
function Demo(args: React.ComponentProps<typeof HoursAppointmentsDialog>) {
  const [abierto, setAbierto] = useState(true)
  const [turnos, setTurnos] = useState(INICIALES)
  const afectados = turnos.filter((t) => pendiente(t) && fuera(t))
  return (
    <div className="p-6">
      <Button onClick={() => { setTurnos(INICIALES); setAbierto(true) }}>Save working hours</Button>
      {abierto && afectados.length > 0 && (
        <HoursAppointmentsDialog
          {...args}
          afectados={afectados}
          onCambiar={(t) => setTurnos((p) => p.map((x) => (x.id === t.id ? t : x)))}
          onCancel={() => setAbierto(false)}
          onConfirm={() => setAbierto(false)}
        />
      )}
      {abierto && afectados.length === 0 && <p className="mt-4 text-sm text-ink-muted">No affected appointments left: back to the action that started it.</p>}
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo {...args} /> }

/* Una cita resuelta (No Show): sale de la lista y el contador baja a 1. */
export const PartlyManaged: Story = {
  render: (args) => <Demo {...args} />,
  play: secuencia(pulsar(/Actions for appointment for John Smith/), pulsarRol('menuitem', /Mark as No Show/), esperar(/Appointments \(1\)/)),
}

/* Todas resueltas: el aviso se cierra y se vuelve a la acción de origen. */
export const AllManaged: Story = {
  render: (args) => <Demo {...args} />,
  play: secuencia(
    pulsar(/Actions for appointment for John Smith/), pulsarRol('menuitem', /Cancel appointment/),
    pulsar(/Actions for appointment for Maria Abril Viola/), pulsarRol('menuitem', /Mark as No Show/),
    esperar(/No affected appointments left/),
  ),
}

/* Bloqueo: una cita afectada está en Check In. */
export const Blocked: Story = {
  render: () => <HoursBlockedDialog turnos={TURNOS_LOCACION.filter((t) => t.estado === 'Check in')} onClose={() => {}} />,
}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Header', 'Ícono de alerta azul de 16 px y "Affected appointments".', 'ConfirmDialog icon="warning"'],
          ['Message', '"There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list."', 'Texto de CON-2890, adaptado'],
          ['Appointments (N)', 'El único contador: las citas pendientes. Por fila: paciente; fecha y horario completo ("Monday, November 23 · 3:00–4:00 PM"); provider. Scroll adentro desde 288px.', 'Lista con divisores'],
          ['Status', 'Badge a la derecha, separado del texto, junto al ⋮.', 'Pill sm'],
          ['Row actions', 'Edit appointment · Cancel appointment · Mark as No Show. Se guardan en el momento.', 'RowActionsMenu'],
          ['Footer', 'Cancel y Confirm.', 'ConfirmDialog'],
          ['Blocked', '"Unable to change working hours" con las citas en Check In o In Progress y sólo Close.', 'HoursBlockedDialog'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="La consecuencia del traslado no se repite por fila ni al pie: la dice el mensaje (CON-4167).">
        <Tabla encabezado={['State', 'What happens', 'Story']} minimo={560}>
          <tr><td className="font-semibold">Affected</td><td>Las citas Proposed o Booked que pierden cobertura, con su contador.</td><td>Playground</td></tr>
          <tr><td className="font-semibold">One managed</td><td>La cita resuelta sale de la lista y el contador baja.</td><td>Partly Managed</td></tr>
          <tr><td className="font-semibold">None left</td><td>El aviso se cierra y se vuelve a la acción de origen (el panel o la pregunta de borrar o cerrar), sin mover nada a Waiting List.</td><td>All Managed</td></tr>
          <tr><td className="font-semibold">Blocked</td><td>Una cita afectada en Check In o In Progress: no se aplica nada, sólo Close.</td><td>Blocked</td></tr>
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
          <tr><td className="font-semibold">Affected</td><td>Citas de una hora que estaban cubiertas por un día Open y dejan de estarlo. Las que ya estaban afuera no cuentan.</td></tr>
          <tr><td className="font-semibold">Starts from</td><td>Save de Set working hours, la ✕ de una franja (Delete working hours?) y el switch de un día (Close working hours?).</td></tr>
          <tr><td className="font-semibold">Cancel</td><td>No cambia los horarios ni revierte lo que se guardó cita por cita.</td></tr>
          <tr><td className="font-semibold">Confirm</td><td>"Monday is now closed. 1 appointment was moved to the waiting list." (con Undo al borrar o cerrar).</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Una fila suelta: paciente, fecha y horario, provider y el estado como badge a la derecha. */
export const AppointmentRow: Story = {
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => <ul className="w-[380px] text-[13px]"><FilaTurno t={INICIALES[0]} /></ul>,
}
