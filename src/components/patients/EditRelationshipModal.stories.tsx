import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditRelationshipModal } from './EditRelationshipModal'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Patients/EditRelationshipModal',
  component: EditRelationshipModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { persona: { name: 'Michael Miller', initials: 'MM', dob: 'May 14, 1982', email: 'mm.thompson@yahoo.com' }, onClose: () => {} },
} satisfies Meta<typeof EditRelationshipModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}
