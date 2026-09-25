import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { conHelp } from '@/design-system/decorators'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Components/Layout/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  decorators: [conHelp, (Story) => <div className="flex h-[720px]"><Story /></div>],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = { args: { expanded: true } }
export const Collapsed: Story = { args: { expanded: false } }
`})))()}n();export{t as default};