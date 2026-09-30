import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewAppointmentModal } from './NewAppointmentModal'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Scheduling/NewAppointmentModal',
  component: NewAppointmentModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { onClose: () => {} },
} satisfies Meta<typeof NewAppointmentModal>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {}
export const Edit: Story = {
  args: { titulo: 'Edit Appointment', inicial: { patient: 'Maria Abril Viola', reason: 'Routine cleaning appointment' } },
}

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^continue$/i), esperar(/required|at least|must|invalid/i)),
}
