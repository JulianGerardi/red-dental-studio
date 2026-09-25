import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { FindingActionsMenu } from './FindingActionsMenu'

const FINDING = {
  id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026',
  status: 'Active' as const, tooth: 3, provider: 'Elena Martinez', surfaces: ['O'], notes: '', linked: [], diagnoses: [],
}

const meta = {
  title: 'Components/Clinical/Dental/FindingActionsMenu',
  component: FindingActionsMenu,
  args: { finding: FINDING, onEdit: () => {}, onAction: () => {} },
  decorators: [(Story) => <div className="h-72 w-64"><Story /></div>],
} satisfies Meta<typeof FindingActionsMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
export const Treated: Story = { args: { finding: { ...FINDING, status: 'Treated' } } }
`})))()}n();export{t as default};