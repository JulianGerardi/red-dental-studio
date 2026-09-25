import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { useState } from 'react'
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
`})))()}n();export{t as default};