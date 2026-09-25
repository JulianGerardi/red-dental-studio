import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
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
`})))()}n();export{t as default};