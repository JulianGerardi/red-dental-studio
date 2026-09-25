import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, Toggle } from './primitives'

const meta = {
  title: 'Components/Settings/Card and Toggle',
  component: Card,
  parameters: { layout: 'padded' },
  args: { children: null },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

function ConToggle() {
  const [on, setOn] = useState(true)
  return (
    <Card title="Preferences" className="w-[360px]">
      <Toggle label="Send appointment reminders" on={on} onChange={setOn} />
    </Card>
  )
}

export const Default: Story = { render: () => <ConToggle /> }
export const WithoutTitle: Story = { render: () => <Card className="w-[360px]">Plain card body.</Card> }
`})))()}n();export{t as default};