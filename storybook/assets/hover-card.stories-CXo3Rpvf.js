import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'

const meta = {
  title: 'Components/UI/HoverCard',
  component: HoverCard,
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="p-24">
      <HoverCard defaultOpen>
        <HoverCardTrigger asChild><a className="text-dash-blue cursor-pointer text-sm font-medium">Sarah Stone</a></HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm font-bold">Sarah Stone</p>
          <p className="text-xs text-ink-muted">DOB 04/02/1991 · Patient ID 12345432</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}
`})))()}export{n,i as r,r as t};