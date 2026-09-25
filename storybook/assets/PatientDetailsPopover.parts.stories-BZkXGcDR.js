import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays, Mail, Phone } from 'lucide-react'
import { FilaDato } from './PatientDetailsPopover'

const meta = { title: 'Components/Dashboard/PatientDetailsPopover parts' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Fila de dato con ícono: en una línea o, con \`wrap\`, partida cuando el texto es largo. */
export const DataRow: Story = {
  render: () => (
    <div className="flex w-[260px] flex-col gap-2">
      <FilaDato icon={CalendarDays} label="Date of Birth" value="May 14, 1982" />
      <FilaDato icon={Phone} label="Phone" value="(555) 123-4567" />
      <FilaDato icon={Mail} label="Email" value="a-very-long-email-address@example-clinic.com" wrap />
    </div>
  ),
}
`})))()}export{n,i as r,r as t};