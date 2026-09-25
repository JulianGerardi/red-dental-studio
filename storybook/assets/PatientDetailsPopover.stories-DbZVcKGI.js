import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientDetailsPopover } from './PatientDetailsPopover'

const meta = {
  title: 'Components/Dashboard/PatientDetailsPopover',
  component: PatientDetailsPopover,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { name: 'Noah James', initials: 'NJ', anchor: new DOMRect(120, 120, 300, 90), onClose: () => {} },
} satisfies Meta<typeof PatientDetailsPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="relative h-[520px]">
      <div className="absolute rounded-lg border border-dashed border-line-strong bg-surface-subtle" style={{ left: 120, top: 120, width: 300, height: 90 }} />
      <PatientDetailsPopover {...args} />
    </div>
  ),
}
`})))()}export{n,i as r,r as t};