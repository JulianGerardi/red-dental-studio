import type { Meta, StoryObj } from '@storybook/react-vite'
import { BotonVerTodos, Globo } from './Patients'

const meta = { title: 'Pages/Parts/Patients', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CountBubble: Story = { render: () => <div className="flex gap-2"><Globo n={3} /><Globo n={12} /></div> }
export const ViewAllToggle: Story = {
  render: () => (
    <div className="flex gap-6">
      <BotonVerTodos total={12} cantidad={5} mostrando={false} onToggle={() => {}} />
      <BotonVerTodos total={12} cantidad={5} mostrando onToggle={() => {}} />
    </div>
  ),
}
