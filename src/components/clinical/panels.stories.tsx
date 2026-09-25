import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientSummaryPanel, TreatmentPanel, TreatmentPlanPanel } from './panels'

const meta = {
  title: 'Components/Clinical/Panels',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TreatmentPlan: Story = { render: () => <TreatmentPlanPanel /> }
export const Treatment: Story = { render: () => <TreatmentPanel /> }
export const PatientSummary: Story = { render: () => <PatientSummaryPanel /> }
