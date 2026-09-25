import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExceptionsTab, InformationTab, RoomsTab, SwitchOpenClose, WorkingHoursTab } from './LocationDetail'

const meta = { title: 'Pages/Parts/Location detail', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Switch() {
  const [on, setOn] = useState(true)
  return <SwitchOpenClose on={on} onChange={setOn} />
}

/* Interruptor Open / Closed de cada día del horario. */
export const OpenClosedSwitch: Story = { render: () => <Switch /> }
export const InformationTabView: Story = { render: () => <InformationTab nombreLocacion="Abril" /> }
export const WorkingHoursTabView: Story = { render: () => <WorkingHoursTab /> }
export const RoomsTabView: Story = { render: () => <RoomsTab /> }
export const ExceptionsTabView: Story = { render: () => <ExceptionsTab /> }
`})))()}export{n,i as r,r as t};