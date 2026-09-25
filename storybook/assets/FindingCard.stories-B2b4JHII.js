import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { FindingCard } from './FindingCard'
import type { Finding, FindingStatus } from './data'

const BASE: Finding = {
  id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026',
  status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [],
}

const ESTADOS: FindingStatus[] = ['Active', 'Monitoring', 'In Treatment', 'Treated', 'Externally Treated', 'No Treatment Needed', 'Patient Declined', 'Clinic Declined', 'Discarded']

const meta = {
  title: 'Components/Clinical/Dental/FindingCard',
  component: FindingCard,
  args: { finding: BASE },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
} satisfies Meta<typeof FindingCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {ESTADOS.map((status) => <FindingCard key={status} finding={{ ...BASE, id: status, status }} />)}
    </div>
  ),
}
`})))()}export{n,i as r,r as t};