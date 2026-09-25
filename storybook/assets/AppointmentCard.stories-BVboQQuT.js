import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentCard } from './AppointmentCard'

const meta = {
  title: 'Components/Dashboard/AppointmentCard',
  component: AppointmentCard,
  args: {
    appt: { name: 'Noah James', initials: 'NJ', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time: '10:00', accion: 'Check Out' },
  },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
} satisfies Meta<typeof AppointmentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Selected: Story = { args: { activa: true } }
export const Cancel: Story = { args: { appt: { name: 'Sarah Stone', initials: 'SS', provider: 'Dr. Emily Chen', operatory: 'Operatory 1', time: '11:30', accion: 'Cancel' } } }
export const Compact: Story = { args: { compact: true } }
`})))()}export{n,i as r,r as t};