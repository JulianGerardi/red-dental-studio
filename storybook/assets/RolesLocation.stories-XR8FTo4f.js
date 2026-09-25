import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
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
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  render: () => <AssignRoleModal onGuardar={() => {}} onClose={() => {}} />,
}
`})))()}n();export{t as default};