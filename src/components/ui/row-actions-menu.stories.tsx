import type { Meta, StoryObj } from '@storybook/react-vite'
import { RowActionsMenu } from './row-actions-menu'
import { DropdownMenuItem } from './dropdown-menu'

const meta = {
  title: 'Components/UI/RowActionsMenu',
  component: RowActionsMenu,
  args: { label: 'Sarah Stone', children: null },
} satisfies Meta<typeof RowActionsMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="h-48">
      <RowActionsMenu {...args}>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </RowActionsMenu>
    </div>
  ),
}

/* `abierto` deja el menú a la vista sin bloquear la página: sólo para documentar. */
export const Open: Story = {
  render: (args) => (
    <div className="h-48">
      <RowActionsMenu {...args} abierto>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </RowActionsMenu>
    </div>
  ),
}
