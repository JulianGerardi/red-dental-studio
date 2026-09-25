import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
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

/* En un finding ya tratado, "Start Treatment" queda deshabilitado: el
   tratamiento sólo puede arrancar sobre algo todavía abierto. */
export const StartTreatmentDisabledWhenTreated: Story = {
  args: { finding: { ...FINDING, status: 'Treated' } },
  play: async (c) => {
    const { userEvent, within } = await import('storybook/test')
    await userEvent.click(await within(c.canvasElement).findByRole('button'))
  },
}
`})))()}export{n,i as r,r as t};