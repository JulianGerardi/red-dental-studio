import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { useState } from 'react'
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
`})))()}n();export{t as default};