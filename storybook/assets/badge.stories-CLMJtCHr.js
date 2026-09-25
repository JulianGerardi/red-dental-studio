import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const meta = {
  title: 'Components/UI/Badge',
  component: Badge,
  args: { children: 'Active', variant: 'active' },
  argTypes: { variant: { control: 'select', options: ['active', 'inactive', 'neutral', 'self', 'warning'] } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['active', 'inactive', 'neutral', 'self', 'warning'] as const).map((v) => <Badge key={v} variant={v}>{v}</Badge>)}
    </div>
  ),
}
`})))()}n();export{t as default};