import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ManageSubscriptionModal, NewDependerModal, NewSubscriptionModal } from './modals'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Patients/Insurance modals',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const NewSubscription: Story = { render: () => <NewSubscriptionModal onClose={() => {}} /> }
export const ManageSubscription: Story = { render: () => <ManageSubscriptionModal onNuevoDependiente={() => {}} onClose={() => {}} /> }
export const NewDependent: Story = { render: () => <NewDependerModal onClose={() => {}} /> }

/* Estado de error: Save con los campos obligatorios vacíos. */
export const NewSubscriptionWithErrors: Story = { ...NewSubscription, play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)) }
export const ManageSubscriptionWithErrors: Story = {
  render: () => <ManageSubscriptionModal onNuevoDependiente={() => {}} onClose={() => {}} />,
  play: async (c) => {
    const { userEvent, within } = await import('storybook/test')
    const campo = within(c.canvasElement.ownerDocument.body).getAllByRole('textbox')[0]
    await userEvent.clear(campo)
    await pulsar(/^save$/i)(c)
  },
}
export const NewDependentWithErrors: Story = { ...NewDependent, play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)) }
`})))()}export{r as n,n as r,i as t};