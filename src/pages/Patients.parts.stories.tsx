import type { Meta, StoryObj } from '@storybook/react-vite'
import { Globo } from './Patients'

const meta = { title: 'Pages/Parts/Patients', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CountBubble: Story = { render: () => <div className="flex gap-2"><Globo n={3} /><Globo n={12} /></div> }
