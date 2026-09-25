import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfirmProcedureDialog } from './ConfirmProcedureDialog'

const FINDING = {
  id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026',
  status: 'Active' as const, tooth: 3, provider: 'Elena Martinez', surfaces: ['O'], notes: '', linked: ['F-2'], diagnoses: [],
}

const meta = {
  title: 'Components/Clinical/Dental/ConfirmProcedureDialog',
  component: ConfirmProcedureDialog,
  parameters: { layout: 'fullscreen' },
  args: { action: 'treated', finding: FINDING, linkedConditions: [{ ...FINDING, id: 'F-2', area: 'Tooth 4' }], onCancel: () => {}, onConfirm: () => {} },
} satisfies Meta<typeof ConfirmProcedureDialog>

export default meta
type Story = StoryObj<typeof meta>

export const MarkAsTreated: Story = {}
export const Discard: Story = { args: { action: 'discard' } }
