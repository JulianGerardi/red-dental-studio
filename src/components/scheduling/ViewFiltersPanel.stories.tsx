import type { Meta, StoryObj } from '@storybook/react-vite'
import { Group, ViewFiltersPanel } from './ViewFiltersPanel'
import { pulsar } from '@/design-system/play'

const meta = {
  title: 'Components/Scheduling/ViewFiltersPanel',
  component: ViewFiltersPanel,
  args: { onClose: () => {} },
  decorators: [(Story) => <div className="relative h-[560px] w-[460px]"><Story /></div>],
} satisfies Meta<typeof ViewFiltersPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Otra opción elegida: la fila toma fondo lila y el radio se llena. */
export const OtherOptionSelected: Story = {
  play: pulsar(/check in/i),
}

/* Un grupo de opciones tipo radio, con la primera elegida. */
export const OptionGroup: Story = {
  render: () => <div className="w-[260px]"><Group rows={[{ id: 'a', label: 'Proposed' }, { id: 'b', label: 'Check In' }, { id: 'c', label: 'Cancelled' }]} value="a" onChange={() => {}} /></div>,
}
