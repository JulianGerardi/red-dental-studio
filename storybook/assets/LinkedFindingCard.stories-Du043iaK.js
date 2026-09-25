import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
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
`})))()}export{n,i as r,r as t};