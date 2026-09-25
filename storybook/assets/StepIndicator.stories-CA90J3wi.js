import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepIndicator } from './StepIndicator'

const meta = {
  title: 'Components/Clinical/StepIndicator',
  component: StepIndicator,
  args: { total: 3, current: 2 },
} satisfies Meta<typeof StepIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FirstStep: Story = { args: { current: 1 } }
export const LastStep: Story = { args: { total: 4, current: 4 } }
`})))()}export{n,i as r,r as t};