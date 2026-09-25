import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ViewToggle, type DashboardView } from './ViewToggle'

const meta = {
  title: 'Components/Dashboard/ViewToggle',
  component: ViewToggle,
  args: { value: 'Recepcionista', onChange: () => {} },
} satisfies Meta<typeof ViewToggle>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [v, setV] = useState<DashboardView>('Recepcionista')
  return <ViewToggle value={v} onChange={setV} />
}

export const Default: Story = { render: () => <Demo /> }

/* Segmento elegido: el pill activo se pinta de azul. */
export const ProviderSelected: Story = { args: { value: 'Provider' } }
`})))()}export{n,i as r,r as t};