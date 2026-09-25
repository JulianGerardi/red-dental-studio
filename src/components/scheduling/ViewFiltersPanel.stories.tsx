import type { Meta, StoryObj } from '@storybook/react-vite'
import { ViewFiltersPanel } from './ViewFiltersPanel'

const meta = {
  title: 'Components/Scheduling/ViewFiltersPanel',
  component: ViewFiltersPanel,
  args: { onClose: () => {} },
  decorators: [(Story) => <div className="relative h-[560px] w-[460px]"><Story /></div>],
} satisfies Meta<typeof ViewFiltersPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
