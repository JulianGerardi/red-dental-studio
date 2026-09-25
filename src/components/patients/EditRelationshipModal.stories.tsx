import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditRelationshipModal } from './EditRelationshipModal'

const meta = {
  title: 'Components/Patients/EditRelationshipModal',
  component: EditRelationshipModal,
  parameters: { layout: 'fullscreen' },
  args: { persona: { name: 'Michael Miller', initials: 'MM', dob: 'May 14, 1982', email: 'mm.thompson@yahoo.com' }, onClose: () => {} },
} satisfies Meta<typeof EditRelationshipModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
