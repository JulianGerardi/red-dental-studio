import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './tabs'

const TABS = ['ASAP', 'Waiting List', 'Cancelled'] as const

const meta = {
  title: 'Components/UI/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ variant }: { variant: 'muted' | 'primary' }) {
  const [v, setV] = useState<(typeof TABS)[number]>('ASAP')
  return <Tabs tabs={TABS} value={v} onChange={setV} variant={variant} />
}

export const Muted: Story = { args: { tabs: TABS, value: 'ASAP', onChange: () => {} }, render: () => <Demo variant="muted" /> }
export const Primary: Story = { args: { tabs: TABS, value: 'ASAP', onChange: () => {} }, render: () => <Demo variant="primary" /> }
