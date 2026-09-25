import type { Meta, StoryObj } from '@storybook/react-vite'
import { AssignRoleModal, RolesLocation } from './RolesLocation'

const meta = {
  title: 'Components/Settings/RolesLocation',
  component: RolesLocation,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RolesLocation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const AssignRole: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => <AssignRoleModal onGuardar={() => {}} onClose={() => {}} />,
}
