import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Button',
  component: Button,
  args: { children: 'Save' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'success', 'outline', 'ghost', 'link'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(['default', 'secondary', 'destructive', 'success', 'outline', 'ghost', 'link'] as const).map((v) => (
        <Button key={v} {...args} variant={v}>{v}</Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="icon" aria-label="Add"><Plus /></Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(['default', 'secondary', 'destructive', 'success'] as const).map((v) => (
        <Button key={v} {...args} variant={v} disabled>{v}</Button>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
  args: { children: <><Plus /> New appointment</> },
}
`})))()}export{n,i as r,r as t};