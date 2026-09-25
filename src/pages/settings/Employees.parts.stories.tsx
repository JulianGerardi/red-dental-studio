import type { Meta, StoryObj } from '@storybook/react-vite'
import { EstadoPill, ProviderPill } from './Employees'

const meta = { title: 'Pages/Parts/Team', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const StatusPills: Story = { render: () => <div className="flex gap-2"><EstadoPill estado="Active" /><EstadoPill estado="Inactive" /></div> }
export const ProviderPills: Story = { render: () => <div className="flex gap-2"><ProviderPill si /><ProviderPill si={false} /></div> }
