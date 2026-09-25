import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecordPagination, RecordRow, RecordToolbar } from './RecordRow'

const meta = {
  title: 'Components/Clinical/RecordRow',
  component: RecordRow,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { provider: 'Tomy Gi', providerRole: 'Dentist', status: 'Pending', created: '30/09/2026', updated: '30/09/2026', expires: '30/10/2026' },
  argTypes: { status: { control: 'select', options: ['Pending', 'Requested', 'Delivered', 'Active', 'Expired', 'Cancelled', 'Completed'] } },
} satisfies Meta<typeof RecordRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithToolbarAndPagination: Story = {
  render: (args) => (
    <div className="w-[820px]">
      <RecordToolbar newLabel="New lab order" />
      <RecordRow {...args} />
      <RecordPagination total={12} />
    </div>
  ),
}
`})))()}export{n,i as r,r as t};