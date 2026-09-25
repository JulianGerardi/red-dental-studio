import type { Meta, StoryObj } from '@storybook/react-vite'
import { TreatmentPlanList } from './TreatmentPlanList'

const meta = {
  title: 'Components/Clinical/TreatmentPlanList',
  component: TreatmentPlanList,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TreatmentPlanList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
