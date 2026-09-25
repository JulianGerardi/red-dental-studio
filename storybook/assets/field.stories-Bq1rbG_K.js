import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eye } from 'lucide-react'
import { Field } from './field'

const meta = {
  title: 'Components/UI/Field',
  component: Field,
  args: { label: 'Email', id: 'email', placeholder: 'name@clinic.com', colSpan: 'col-span-12' },
  decorators: [(Story) => <div className="grid w-[320px] grid-cols-12"><Story /></div>],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAdornment: Story = {
  args: {
    label: 'Password',
    id: 'password',
    type: 'password',
    adornment: <Eye className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-faint" />,
  },
}
`})))()}n();export{t as default};