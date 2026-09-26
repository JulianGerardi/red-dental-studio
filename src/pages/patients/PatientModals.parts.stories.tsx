import type { Meta, StoryObj } from '@storybook/react-vite'
import { conPacientes } from '@/design-system/decorators'
import { EditContactModal } from './EditContactModal'
import { EditPatientForm, EditPatientModal } from './EditPatient'
import { NewPatientModal } from './NewPatientModal'

const meta = {
  title: 'Pages/Parts/Patient modals',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 640 } } },
  decorators: [conPacientes],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const NewPatient: Story = { render: () => <NewPatientModal onClose={() => {}} /> }
export const NewPatientWithGuardian: Story = { render: () => <NewPatientModal title="New Patient" forceGuardian onClose={() => {}} /> }
export const EditContact: Story = { render: () => <EditContactModal onClose={() => {}} /> }
export const EditPatient: Story = { render: () => <EditPatientModal onClose={() => {}} /> }
export const EditPatientFormOnly: Story = { parameters: { layout: 'padded' }, render: () => <EditPatientForm /> }
