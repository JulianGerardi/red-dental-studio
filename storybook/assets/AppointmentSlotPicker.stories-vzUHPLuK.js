import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
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

/* La franja de las 09 AM está ocupada: el botón queda deshabilitado y no
   acepta turnos. */
export const BusySlotDisabled: Story = { args: { seleccion: undefined } }
`})))()}export{n,i as r,r as t};