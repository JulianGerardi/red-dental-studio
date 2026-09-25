import type { Meta, StoryObj } from '@storybook/react-vite'
import { InnerCard, Panel, StatusPill } from './primitives'

const meta = {
  title: 'Components/Dashboard/Panel and StatusPill',
  component: Panel,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

export const PanelWithInnerCards: Story = {
  args: { title: 'Today Appointments' },
  render: (args) => (
    <Panel {...args} className="w-[380px]" bodyClassName="flex flex-col gap-3 p-4 pt-0">
      <InnerCard className="p-3 text-sm">First card</InnerCard>
      <InnerCard className="p-3 text-sm">Second card</InnerCard>
    </Panel>
  ),
}

export const StatusPills: Story = {
  args: { title: '' },
  render: () => (
    <div className="flex gap-2">
      <StatusPill tone="ok">Available</StatusPill>
      <StatusPill tone="busy">Busy</StatusPill>
      <StatusPill tone="bad">Unavailable</StatusPill>
    </div>
  ),
}
