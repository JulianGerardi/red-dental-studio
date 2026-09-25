import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Empleado } from '@/data/employees'
import { LinkExistingPerson } from './LinkExistingPerson'

const meta = {
  title: 'Components/Settings/LinkExistingPerson',
  component: LinkExistingPerson,
  args: { vincular: true, onVincular: () => {}, vinculado: null, onSeleccionar: () => {} },
  decorators: [(Story) => <div className="h-72 w-[420px]"><Story /></div>],
} satisfies Meta<typeof LinkExistingPerson>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [vincular, setVincular] = useState(true)
  const [persona, setPersona] = useState<Empleado | null>(null)
  return <LinkExistingPerson vincular={vincular} onVincular={setVincular} vinculado={persona} onSeleccionar={setPersona} />
}

export const Default: Story = { render: () => <Demo /> }
`})))()}export{n,i as r,r as t};