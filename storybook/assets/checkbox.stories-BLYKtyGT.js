import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './checkbox'

const meta = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  args: { label: 'Select row', on: false, onChange: () => {} },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

function Interactivo(args: React.ComponentProps<typeof Checkbox>) {
  const [on, setOn] = useState(false)
  return <Checkbox {...args} on={on} onChange={setOn} />
}

export const Interactive: Story = { render: (args) => <Interactivo {...args} /> }

export const States: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Checkbox {...args} on={false} label="Unchecked" />
      <Checkbox {...args} on label="Checked" />
    </div>
  ),
}
`})))()}n();export{t as default};