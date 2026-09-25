import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback } from './avatar'

const meta = {
  title: 'Components/UI/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Initials: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {[24, 32, 40, 56].map((s) => (
        <Avatar key={s} style={{ width: s, height: s }}>
          <AvatarFallback style={{ fontSize: s / 2.6 }}>SS</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}
`})))()}export{n,i as r,r as t};