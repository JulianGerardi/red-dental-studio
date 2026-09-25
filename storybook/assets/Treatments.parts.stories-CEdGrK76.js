import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PLANS, TreatmentCard } from './Treatments'

const meta = { title: 'Pages/Parts/Treatments', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Card de plan: completado (verde) y vencido (rojo). */
export const PlanCards: Story = {
  render: () => <div className="flex w-[340px] flex-col gap-3"><TreatmentCard plan={PLANS[0]} /><TreatmentCard plan={PLANS[4]} /></div>,
}
`})))()}export{n,i as r,r as t};