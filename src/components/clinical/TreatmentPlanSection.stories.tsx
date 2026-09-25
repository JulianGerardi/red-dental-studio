import type { Meta, StoryObj } from '@storybook/react-vite'
import { TreatmentPlanSection } from './TreatmentPlanSection'

const meta = {
  title: 'Components/Clinical/TreatmentPlanSection',
  component: TreatmentPlanSection,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TreatmentPlanSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
