import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta = {
  title: 'Components/UI/Input',
  component: Input,
  args: { placeholder: 'Search patient…', className: 'w-[280px]' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithValue: Story = { args: { defaultValue: 'Sarah Stone' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Read only' } }
`})))()}export{r as n,n as r,i as t};