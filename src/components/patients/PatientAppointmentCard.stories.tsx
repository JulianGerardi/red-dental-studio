import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientAppointmentCard } from './PatientAppointmentCard'

/* La página completa, con las otras tres cards de turno, está en
   Elements / Appointment cards. */
const meta = {
  title: 'Components/Patients/PatientAppointmentCard',
  component: PatientAppointmentCard,
  args: {
    name: 'Maria Abril Viola', initials: 'av', status: 'Booked', reason: 'Routine cleaning appointment',
    when: '12 Mar 2025 · 10:00 - 11:00 AM', place: 'Los Angeles - 789 N Sunrise Street', onCancel: () => {},
  },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
} satisfies Meta<typeof PatientAppointmentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Booked: Story = {}
export const Fulfilled: Story = { args: { status: 'Fulfilled', onCancel: undefined } }
export const NoShow: Story = { name: 'No show', args: { status: 'No Show', onCancel: undefined } }
export const Cancelled: Story = { args: { status: 'Cancelled', onCancel: undefined } }
