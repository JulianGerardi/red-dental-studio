import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterMenu } from './FilterMenu'

const meta = {
  title: 'Components/Dashboard/FilterMenu',
  component: FilterMenu,
  args: { label: 'Provider', options: ['Dr. Elena Martinez', 'Dr. Emily Chen', 'Dr. Daniel Anderson'], value: [], onChange: () => {} },
} satisfies Meta<typeof FilterMenu>

export default meta
type Story = StoryObj<typeof meta>

function Demo(args: React.ComponentProps<typeof FilterMenu>) {
  const [v, setV] = useState<string[]>(['Dr. Emily Chen'])
  return <div className="h-64"><FilterMenu {...args} value={v} onChange={setV} /></div>
}

export const Default: Story = { render: (args) => <Demo {...args} /> }
`})))()}export{n,i as r,r as t};