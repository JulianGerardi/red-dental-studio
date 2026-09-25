import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkTreatmentPlanDrawer } from './LinkTreatmentPlanDrawer'

const meta = {
  title: 'Components/Scheduling/LinkTreatmentPlanDrawer',
  component: LinkTreatmentPlanDrawer,
  parameters: { layout: 'fullscreen' },
  args: { onClose: () => {} },
} satisfies Meta<typeof LinkTreatmentPlanDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
