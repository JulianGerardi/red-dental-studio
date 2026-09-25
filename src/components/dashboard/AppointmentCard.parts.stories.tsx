import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentCardCompacta, MenuCard } from './AppointmentCard'

const meta = { title: 'Components/Dashboard/AppointmentCard parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const appt = { name: 'Noah James', initials: 'NJ', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time: '10:00' }

export const CompactRow: Story = { render: () => <div className="w-[280px]"><AppointmentCardCompacta appt={appt} /></div> }
export const CardMenu: Story = { render: () => <div className="h-40"><MenuCard nombre="Noah James" onEdit={() => {}} /></div> }
