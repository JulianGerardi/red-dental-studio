import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditProcedureModal } from './EditProcedureModal'

const meta = {
  title: 'Components/Clinical/Dental/EditProcedureModal',
  component: EditProcedureModal,
  parameters: { layout: 'fullscreen' },
  args: {
    finding: { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026', status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [] },
    onClose: () => {},
    onSave: () => {},
  },
} satisfies Meta<typeof EditProcedureModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
