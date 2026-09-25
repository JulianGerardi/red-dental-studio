import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentSlotPicker } from './AppointmentSlotPicker'

const meta = {
  title: 'Components/Scheduling/AppointmentSlotPicker',
  component: AppointmentSlotPicker,
  args: { onPick: () => {}, paciente: 'Maria Abril Viola' },
} satisfies Meta<typeof AppointmentSlotPicker>

export default meta
type Story = StoryObj<typeof meta>

function Demo(args: React.ComponentProps<typeof AppointmentSlotPicker>) {
  const [hora, setHora] = useState('10 AM')
  return <AppointmentSlotPicker {...args} seleccion={hora} onPick={setHora} />
}

export const Default: Story = { render: (args) => <Demo {...args} /> }
`})))()}n();export{t as default};