import type { Meta, StoryObj } from '@storybook/react-vite'
import { HOUR_PX } from './calendar-data'
import { TurnoCalendario } from './TurnoCalendario'

/* La página completa, con los siete estados y las otras cards de turno, está
   en Elements / Appointment cards. */
const meta = {
  title: 'Components/Scheduling/TurnoCalendario',
  component: TurnoCalendario,
  args: { evento: { start: 9.5, patient: 'Noah James Smith', state: 'Booked' }, forma: 'bloque' },
  argTypes: { forma: { control: 'inline-radio', options: ['bloque', 'chip', 'fila'] } },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TurnoCalendario>

export default meta
type Story = StoryObj<typeof meta>

export const Block: Story = { args: { className: 'w-40', style: { height: HOUR_PX } } }
export const Chip: Story = { args: { forma: 'chip', className: 'w-36' } }
export const PhoneRow: Story = { name: 'Phone row', args: { forma: 'fila', className: 'w-72' } }
