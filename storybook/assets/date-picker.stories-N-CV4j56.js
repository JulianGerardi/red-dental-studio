import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './date-picker'

const meta = {
  title: 'Components/UI/DatePicker',
  component: DatePicker,
  args: { value: null, onChange: () => {} },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ conMarcados }: { conMarcados?: boolean }) {
  const hoy = new Date()
  const [d, setD] = useState<Date | null>(conMarcados ? hoy : null)
  const marcados = conMarcados ? [1, 5, 9].map((n) => new Date(hoy.getFullYear(), hoy.getMonth(), n)) : []
  return <div className="h-[380px] w-64"><DatePicker value={d} onChange={setD} marked={marcados} /></div>
}

export const Default: Story = { render: () => <Demo /> }
export const WithMarkedDays: Story = { render: () => <Demo conMarcados /> }

function ConError() {
  const [d, setD] = useState<Date | null>(null)
  return <div className="h-[100px] w-64"><DatePicker value={d} onChange={setD} error /></div>
}

/* Estado de error: borde rojo, para campos obligatorios sin fecha. */
export const WithError: Story = { render: () => <ConError /> }

function ConFecha() {
  const [d, setD] = useState<Date | null>(new Date(2026, 8, 25))
  return <div className="h-[380px] w-64"><DatePicker value={d} onChange={setD} /></div>
}

/* Con una fecha elegida el campo la muestra en formato dd-mm-aaaa. */
export const SelectedDate: Story = { render: () => <ConFecha /> }
`})))()}export{n,i as r,r as t};