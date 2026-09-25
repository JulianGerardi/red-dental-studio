import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PendingTaskCard } from './PendingTaskCard'

const meta = {
  title: 'Components/Dashboard/PendingTaskCard',
  component: PendingTaskCard,
  args: { task: { kind: 'Lab Orders', state: 'Requested', person: 'Elena Marquez', initials: 'EM', register: '02/28/2026', expiration: '03/07/2026' } },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof PendingTaskCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
`})))()}export{n,i as r,r as t};