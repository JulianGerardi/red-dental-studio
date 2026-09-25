import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewAppointmentModal } from './NewAppointmentModal'

const meta = {
  title: 'Components/Scheduling/NewAppointmentModal',
  component: NewAppointmentModal,
  parameters: { layout: 'fullscreen' },
  args: { onClose: () => {} },
} satisfies Meta<typeof NewAppointmentModal>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {}
export const Edit: Story = {
  args: { titulo: 'Edit Appointment', inicial: { patient: 'Maria Abril Viola', reason: 'Routine cleaning appointment' } },
}
