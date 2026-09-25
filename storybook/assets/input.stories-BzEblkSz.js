import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
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
`})))()}n();export{t as default};