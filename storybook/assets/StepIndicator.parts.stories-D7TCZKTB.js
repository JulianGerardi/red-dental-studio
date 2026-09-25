import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Conector, Insignia } from './StepIndicator'

const meta = { title: 'Components/Clinical/StepIndicator parts' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* La insignia numerada, en sus tres estados. */
export const Badges: Story = {
  render: () => (
    <div className="flex items-start gap-6">
      <Insignia estado="complete" numero={1} />
      <Insignia estado="active" numero={2} />
      <Insignia estado="pending" numero={3} />
    </div>
  ),
}

/* El conector entre pasos: lleno o vacío. */
export const Connectors: Story = {
  render: () => <div className="flex w-64 items-center gap-6"><Conector lleno /><Conector lleno={false} /></div>,
}
`})))()}export{n,i as r,r as t};