import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkedFindingCard } from './LinkedFindingCard'

const meta = {
  title: 'Components/Clinical/Dental/LinkedFindingCard',
  component: LinkedFindingCard,
  args: { finding: { id: 'L-1', tooth: 14, date: 'May 12, 2026', status: 'Active' }, linked: false, onToggle: () => {} },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
} satisfies Meta<typeof LinkedFindingCard>

export default meta
type Story = StoryObj<typeof meta>

function Demo(args: React.ComponentProps<typeof LinkedFindingCard>) {
  const [linked, setLinked] = useState(false)
  return <LinkedFindingCard {...args} linked={linked} onToggle={setLinked} />
}

export const Default: Story = { render: (args) => <Demo {...args} /> }
