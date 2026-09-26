import { useState } from 'react'
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
