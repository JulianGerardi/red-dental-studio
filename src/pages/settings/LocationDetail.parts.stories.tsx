import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExceptionsTab, FranjasDia, InformationTab, RoomsTab, SwitchOpenClose, WorkingHoursTab } from './LocationDetail'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { esperar, pulsar, pulsarRol, secuencia } from '@/design-system/play'

const meta = { title: 'Pages/Parts/Location detail', parameters: { docs: { jira: ['CON-1590', 'CON-4019', 'CON-1173'] }, layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Switch() {
  const [on, setOn] = useState(true)
  return <SwitchOpenClose on={on} onChange={setOn} />
}

/* Interruptor Open / Closed de cada día del horario. */
export const OpenClosedSwitch: Story = { render: () => <Switch /> }
export const InformationTabView: Story = { render: () => <InformationTab nombreLocacion="Abril" /> }
export const WorkingHoursTabView: Story = { render: () => <WorkingHoursTab /> }
export const RoomsTabView: Story = { render: () => <RoomsTab /> }
export const ExceptionsTabView: Story = { render: () => <ExceptionsTab /> }

/* Franjas de un día: todas a la vista si entran; si no, las que caben y "+N" (2026-11-16). */
const CUATRO = ['08:00 AM - 01:00 PM', '02:00 PM - 06:00 PM', '06:30 PM - 08:00 PM', '08:15 PM - 09:00 PM']
export const DayHoursFit: Story = { render: () => <div className="w-[900px]"><FranjasDia label="Monday" rangos={CUATRO} onQuitar={() => {}} onEditar={() => {}} /></div> }
export const DayHoursOverflow: Story = { render: () => <div className="w-[420px]"><FranjasDia label="Monday" rangos={CUATRO} onQuitar={() => {}} onEditar={() => {}} /></div> }

/* Working Hours: borrar una franja (CON-4166), cerrar un día (CON-4165) y el bloqueo por citas en curso (CON-4167). */
export const DeleteHoursQuestion: Story = {
  name: 'Working Hours · Delete working hours?',
  parameters: { docs: { jira: ['CON-4166'] } },
  render: () => <WorkingHoursTab />,
  play: secuencia(pulsar(/^Delete 02:00 PM - 06:00 PM on Tuesday/), esperar(/This will delete the working hours from 02:00 PM to 06:00 PM on Tuesday/)),
}
export const CloseDayQuestion: Story = {
  name: 'Working Hours · Close working hours?',
  parameters: { docs: { jira: ['CON-4165'] } },
  render: () => <WorkingHoursTab />,
  play: secuencia(pulsarRol('switch', /^Thursday open$/), esperar(/This will close the location every Thursday/)),
}
export const ChangeBlocked: Story = {
  name: 'Working Hours · Unable to change',
  parameters: { docs: { jira: ['CON-4167'] } },
  render: () => <WorkingHoursTab />,
  play: secuencia(pulsar(/^Delete 08:00 AM - 01:00 PM on Monday/), pulsar(/^Confirm$/), esperar(/Unable to change working hours/)),
}

/* Qué hace cada acción de la tabla de Working Hours (2026-11-16). */
export const WorkingHoursStates: Story = {
  name: 'Working Hours · States',
  parameters: { docs: { jira: ['CON-4160', 'CON-4161', 'CON-4162', 'CON-4164', 'CON-4165', 'CON-4166', 'CON-4167'] } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="Toda acción pasa por pregunta, impacto en las citas y aplicación. Cancel en cualquier paso deja la tabla como estaba.">
        <Tabla encabezado={['Action', 'Question', 'Then', 'Story']} minimo={720}>
          <tr><td className="font-semibold">✕ de una franja</td><td>Delete working hours? (danger, tacho). Si es la última del día: "Monday will be closed."; si es la última de la locación: "The location will have no working hours."</td><td>Sale sólo esa franja; sin franjas, el día queda Closed. Toast con Undo.</td><td>Delete working hours?</td></tr>
          <tr><td className="font-semibold">Switch a Closed</td><td>Close working hours? (danger): "This will close the location every Monday."</td><td>El día conserva sus franjas; reabrirlo las trae a Set working hours.</td><td>Close working hours?</td></tr>
          <tr><td className="font-semibold">Save del panel</td><td>Replace working hours? si pisa otro día abierto con otro horario.</td><td>Reemplaza el horario de cada día elegido.</td><td>LocationHoursModal</td></tr>
          <tr><td className="font-semibold">Citas que pierden cobertura</td><td>Affected appointments (HoursAppointmentsDialog).</td><td>Confirm pasa las pendientes a Waiting List.</td><td>HoursAppointmentsDialog</td></tr>
          <tr><td className="font-semibold">Cita afectada en Check In o In Progress</td><td>Unable to change working hours (sólo Close).</td><td>No se aplica nada.</td><td>Unable to change</td></tr>
          <tr><td className="font-semibold">Franjas que no entran en la fila</td><td>—</td><td>Las que caben y "+N", que despliega el resto.</td><td>Day Hours Overflow</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
