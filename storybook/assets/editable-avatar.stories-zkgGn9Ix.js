import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditableAvatar } from './editable-avatar'

const meta = {
  title: 'Components/UI/EditableAvatar',
  component: EditableAvatar,
  args: { foto: null, iniciales: 'SS', label: 'Sarah Stone', onChange: () => {}, avatarClassName: 'size-14 rounded-full bg-dash-blue text-white text-lg' },
} satisfies Meta<typeof EditableAvatar>

export default meta
type Story = StoryObj<typeof meta>

function Demo(args: React.ComponentProps<typeof EditableAvatar>) {
  const [foto, setFoto] = useState<string | null>(null)
  return <EditableAvatar {...args} foto={foto} onChange={setFoto} />
}

export const Circle: Story = { render: (args) => <Demo {...args} /> }

export const Square: Story = {
  args: { avatarClassName: 'size-14 rounded-lg bg-brand-tint text-dash-blue text-lg' },
  render: (args) => <Demo {...args} />,
}
`})))()}export{n,i as r,r as t};