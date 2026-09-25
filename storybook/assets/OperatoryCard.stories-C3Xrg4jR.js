import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperatoryCard } from './OperatoryCard'

const meta = {
  title: 'Components/Dashboard/OperatoryCard',
  component: OperatoryCard,
  args: { room: { name: 'Operatory 2', status: 'Available', patientsToday: 4, provider: 'Daniel Anderson' } },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
} satisfies Meta<typeof OperatoryCard>

export default meta
type Story = StoryObj<typeof meta>

export const Available: Story = {}
export const Busy: Story = { args: { room: { name: 'Operatory 3', status: 'Busy', patientsToday: 6, provider: 'Emily Chen' } } }
export const Unavailable: Story = { args: { room: { name: 'Operatory 4', status: 'Unavailable', patientsToday: 0, provider: 'Unassigned' } } }
`})))()}export{n,i as r,r as t};