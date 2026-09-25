import type { Meta, StoryObj } from '@storybook/react-vite'
import { LabOrderPanel as LegacyLabOrderPanel, PatientSummaryPanel, PrescriptionPanel, ReferralPanel, TreatmentPanel, TreatmentPlanPanel } from './panels'

const meta = {
  title: 'Components/Clinical/Panels',
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TreatmentPlan: Story = { render: () => <TreatmentPlanPanel /> }
export const Treatment: Story = { render: () => <TreatmentPanel /> }
export const PatientSummary: Story = { render: () => <PatientSummaryPanel /> }

export const Prescription: Story = { render: () => <PrescriptionPanel /> }
export const Referral: Story = { render: () => <ReferralPanel /> }

/* Duplicado del LabOrderPanel real (clinical/LabOrderPanel.tsx): ningún archivo
   de la app importa este `panels.tsx`, es código sin uso. */
export const LegacyLabOrders: Story = { render: () => <LegacyLabOrderPanel /> }
