import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentDetailsDrawer } from './AppointmentDetailsDrawer'

const meta = {
  title: 'Components/Scheduling/AppointmentDetailsDrawer',
  component: AppointmentDetailsDrawer,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: {
    patient: 'Maria Abril Viola',
    estado: 'Check-in',
    hora: '08:15 AM',
    duracion: 2.5,
    fecha: new Date(2022, 4, 30),
    provider: 'Dr. Elena Martinez',
    room: 'Operatory 2',
    reason: 'Routine cleaning appointment',
    anchor: new DOMRect(80, 140, 240, 120),
    onClose: () => {},
  },
  decorators: [(Story) => <div className="relative h-[560px]"><Story /></div>],
} satisfies Meta<typeof AppointmentDetailsDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const CheckIn: Story = {}
export const Booked: Story = { args: { estado: 'Booked' } }
export const Proposed: Story = { args: { estado: 'Proposed' } }
export const Cancelled: Story = { args: { estado: 'Cancelled' } }
`})))()}export{n,i as r,r as t};