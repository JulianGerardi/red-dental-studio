import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat } from './Billing'

const meta = { title: 'Pages/Parts/Billing', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const StatCell: Story = { render: () => <div className="flex w-[260px] flex-col gap-3"><Stat label="Payments today" value="$1,240.00" caption="8 payments" /><Stat label="Open balance" value="$8,930.00" caption="12 patients" /></div> }
`})))()}export{n,i as r,r as t};