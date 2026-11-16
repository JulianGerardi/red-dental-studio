import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExceptionsTab, FranjasDia, InformationTab, RoomsTab, SwitchOpenClose, WorkingHoursTab } from './LocationDetail'

const meta = { title: 'Pages/Parts/Location detail', parameters: { docs: { jira: ['CON-1590', 'CON-4019', 'CON-1173'] }, layout: 'padded' } } satisfies Meta

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

/* Franjas de un día: todas a la vista si entran; si no, las que caben y "+N" (2026-11-16). */
const CUATRO = ['08:00 AM - 01:00 PM', '02:00 PM - 06:00 PM', '06:30 PM - 08:00 PM', '08:15 PM - 09:00 PM']
export const DayHoursFit: Story = { render: () => <div className="w-[900px]"><FranjasDia label="Monday" rangos={CUATRO} onQuitar={() => {}} onEditar={() => {}} /></div> }
export const DayHoursOverflow: Story = { render: () => <div className="w-[420px]"><FranjasDia label="Monday" rangos={CUATRO} onQuitar={() => {}} onEditar={() => {}} /></div> }
