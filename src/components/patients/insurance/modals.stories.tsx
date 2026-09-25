import type { Meta, StoryObj } from '@storybook/react-vite'
import { ManageSubscriptionModal, NewDependerModal, NewSubscriptionModal } from './modals'

const meta = {
  title: 'Components/Patients/Insurance modals',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const NewSubscription: Story = { render: () => <NewSubscriptionModal onClose={() => {}} /> }
export const ManageSubscription: Story = { render: () => <ManageSubscriptionModal onNuevoDependiente={() => {}} onClose={() => {}} /> }
export const NewDependent: Story = { render: () => <NewDependerModal onClose={() => {}} /> }
