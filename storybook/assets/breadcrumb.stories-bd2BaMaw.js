import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './breadcrumb'

const meta = {
  title: 'Components/UI/Breadcrumb',
  component: Breadcrumb,
  args: { items: [{ label: 'Settings', to: '/settings' }, { label: 'Consents' }] },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ThreeLevels: Story = {
  args: { items: [{ label: 'Patients', to: '/patients' }, { label: 'Sarah Stone', to: '/patients/1' }, { label: 'Ledger' }] },
}
`})))()}n();export{t as default};