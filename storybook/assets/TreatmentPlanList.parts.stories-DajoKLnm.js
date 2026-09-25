import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PLANES } from '@/data/clinical-mode'
import { Dato, PlanCard } from './TreatmentPlanList'

const meta = { title: 'Components/Clinical/TreatmentPlanList parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const DataBox: Story = {
  render: () => <div className="flex gap-2"><Dato label="Created On" valor="23/04/2025" azul /><Dato label="Total Procedures" valor="5" /><Dato label="Total Amount" valor="$231.12" /></div>,
}
export const PlanCardVariants: Story = {
  render: () => <div className="w-[300px]"><PlanCard p={PLANES[0]} /></div>,
}
`})))()}export{n,i as r,r as t};