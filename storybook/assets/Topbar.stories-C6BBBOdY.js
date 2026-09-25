import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { Topbar } from './Topbar'

const meta = {
  title: 'Components/Layout/Topbar',
  component: Topbar,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { expanded: true, onToggleSidebar: () => {}, notificaciones: NOTIFICACIONES },
} satisfies Meta<typeof Topbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutNotifications: Story = { args: { notificaciones: [] } }
`})))()}export{n,i as r,r as t};