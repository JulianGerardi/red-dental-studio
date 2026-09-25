import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShieldHalf } from 'lucide-react'
import { FilaLectura, ManageSubscriptionModal, NewDependerModal, NewSubscriptionModal } from './modals'
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

/* Fila de sólo lectura de la ficha de la suscripción. */
export const ReadOnlyRow: Story = {
  render: () => <div className="w-[300px]"><FilaLectura icon={ShieldHalf} label="Carrier" value="Delta Dental" /></div>,
}
