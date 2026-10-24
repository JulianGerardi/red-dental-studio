import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { TarjetaTurno } from './TarjetaTurno'

/* La base de PatientAppointmentCard y SolicitudCard. La página completa (las dos lado a lado, partes, estados y
   specs) está en Elements / Appointment cards. */
const meta = {
  title: 'Components/Scheduling/TarjetaTurno',
  component: TarjetaTurno,
  args: {
    tono: 'info', etiqueta: 'Booked', nombre: 'Maria Abril Viola', motivo: 'Routine cleaning appointment',
    cuando: '12 Mar 2025 · 10:00 - 11:00 AM', lugar: 'Los Angeles - 789 N Sunrise Street',
  },
  argTypes: {
    tono: { control: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral', 'purple'], description: 'Tono de la pill y de la barra.' },
    acciones: { table: { disable: true } },
  },
  decorators: [(Story) => <div className="w-[248px]"><Story /></div>],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TarjetaTurno>

export default meta
type Story = StoryObj<typeof meta>

export const Appointment: Story = { args: { acciones: <Button variant="secondary" size="sm">Cancel</Button> } }
export const Request: Story = {
  args: {
    tono: 'danger', etiqueta: 'ASAP', nombre: 'Elias Aguirre', motivo: 'Broken crown, in pain',
    cuando: '12 Mar 2025 · 14 PM - 15 PM',
    acciones: <><Button variant="secondary" size="sm">Cancel</Button><Button size="sm">Schedule</Button></>,
  },
}
export const NoActions: Story = { name: 'No actions', args: { tono: 'success', etiqueta: 'Fulfilled' } }
export const LongName: Story = { name: 'Long name', args: { nombre: 'Maria Abril Viola Fernández de la Torre' } }
